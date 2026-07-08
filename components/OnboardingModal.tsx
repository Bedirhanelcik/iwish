"use client";

import Image from "next/image";
import {
  useMemo,
  useState,
  useEffect,
} from "react";
import { supabase } from "@/lib/supabase";

interface OnboardingModalProps {
  isOpen: boolean;
  user: any;
  onComplete: () => void;
}

const countries = [
  "Türkiye",
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Portugal",
  "Netherlands",
  "Belgium",
  "Switzerland",
  "Austria",
  "Poland",
  "Czech Republic",
  "Canada",
  "Australia",
  "New Zealand",
  "Japan",
  "South Korea",
  "China",
  "India",
  "Brazil",
  "Argentina",
  "Mexico",
  "Russia",
  "Ukraine",
  "Norway",
  "Sweden",
  "Denmark",
  "Finland",
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Egypt",
  "South Africa",
  "Indonesia",
  "Malaysia",
  "Singapore",
  "Thailand",
  "Vietnam",
];

export default function OnboardingModal({
  isOpen,
  user,
  onComplete,
}: OnboardingModalProps) {
  const [step, setStep] = useState(1);

  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [openCountries, setOpenCountries] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [age, setAge] = useState("18");
  const [gender, setGender] = useState("");
  const [openAge, setOpenAge] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState("");

  const [checkingUsername, setCheckingUsername] =
  useState(false);

const filteredCountries = useMemo(() => {
  return countries.filter((country) =>
    country.toLowerCase().includes(search.toLowerCase())
  );
}, [search]);

useEffect(() => {
  document.body.style.overflow =
    isOpen ? "hidden" : "auto";

  return () => {
    document.body.style.overflow =
      "auto";
  };
}, [isOpen]);

if (!isOpen) return null;

return (
  <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[7px]" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[470px] rounded-[28px] bg-white px-7 py-6 shadow-[0_25px_90px_rgba(0,0,0,0.16)]">

        {/* TOP */}
        <div className="flex items-center justify-between">

          <h2 className="text-[18px] font-bold tracking-[-0.5px] text-black">
            Fill out your profile
          </h2>

         <button
  onClick={async () => {
    await supabase.auth.signOut();
    window.location.reload();
  }}
  className="rounded-full bg-[#f5f5f5] px-4 py-[9px] text-[13px] font-semibold text-black transition hover:bg-[#ececec]"
>
  Logout
</button>
        </div>

        {step === 1 ? (
         <>
  {/* PROFILE IMAGE */}
  <div className="flex justify-center">

    <div className="relative">

      <Image
        src={
          previewImage ||
          user?.user_metadata?.avatar_url ||
          "/default-avatar.png"
        }
        alt="profile"
        width={92}
        height={92}
        className="h-[92px] w-[92px] rounded-full object-cover"
      />

      {/* EDIT BUTTON */}
      <label
        htmlFor="profile-upload"
        className="absolute bottom-0 right-0 flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full border-4 border-white bg-black text-white shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536M9 13l6.768-6.768a2.5 2.5 0 113.536 3.536L12.536 16.536A4 4 0 019.172 18H6v-3.172A4 4 0 017.464 11.464L14.232 4.696"
          />
        </svg>
      </label>

      <input
        id="profile-upload"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
onChange={async (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (
    ![
      "image/png",
      "image/jpeg",
      "image/jpg",
    ].includes(file.type)
  ) {
    alert("Only PNG and JPG allowed");
    return;
  }

  const imageUrl = URL.createObjectURL(file);

  setPreviewImage(imageUrl);

  const fileExt = file.name.split(".").pop();

  const fileName = `${user.id}-${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (error) {
    console.log(error);
    return;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  setUploadedAvatarUrl(publicUrl);
}}
      />
    </div>
  </div>

  {/* TITLE */}
  <h1 className="mt-6 text-[48px] font-black leading-[0.9] tracking-[-3px] text-black">
    Where are
    <br />
    you from?
  </h1>

  {/* COUNTRY */}
  <div className="relative mt-6">

    <button
      onClick={() =>
        setOpenCountries(!openCountries)
      }
      className="flex h-[58px] w-full items-center justify-between rounded-[20px] border border-[#ececec] bg-white px-5 transition hover:border-black"
    >
      <span
        className={`text-[16px] ${
          selectedCountry
            ? "text-black"
            : "text-[#9c9c9c]"
        }`}
      >
        {selectedCountry || "Select country"}
      </span>

      <svg
        className={`h-5 w-5 transition ${
          openCountries ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    {/* DROPDOWN */}
    {openCountries && (
      <div className="absolute left-0 top-[70px] z-50 w-full overflow-hidden rounded-[24px] border border-[#ececec] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]">

        {/* SEARCH */}
        <div className="p-3 pb-2">
          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search country..."
            className="h-[50px] w-full rounded-2xl bg-[#f7f7f7] px-4 text-[15px] outline-none placeholder:text-[#9c9c9c]"
          />
        </div>

 {/* LIST */}
<div className="max-h-[220px] overflow-y-auto px-3 pb-3">

  <div className="space-y-2">

    {filteredCountries.map((country) => (
      <button
        key={country}
        onClick={() => {
          setSelectedCountry(country);
          setOpenCountries(false);
        }}
        className={`flex h-[52px] w-full items-center rounded-2xl px-4 text-left text-[15px] font-medium transition ${
          selectedCountry === country
            ? "bg-black text-white"
            : "bg-[#f7f7f7] text-black hover:bg-[#efefef]"
        }`}
      >
        <div className="flex items-center gap-3">

          <span className="min-w-[24px] text-[13px] uppercase opacity-70">
            {country.slice(0, 2)}
          </span>

          <span>{country}</span>
        </div>
      </button>
    ))}
  </div>
</div>
      </div>
    )}
  </div>

  {/* FULL NAME */}
  <div className="mt-3">
    <input
      disabled
      value={user?.user_metadata?.full_name || ""}
      className="h-[58px] w-full rounded-[20px] border border-[#ececec] bg-white px-5 text-[16px] font-medium text-black outline-none"
    />
  </div>

{/* USERNAME */}
<div className="mt-3">

  <input
    value={username}
    onChange={async (e) => {
      const value = e.target.value;

      setUsername(value);

      if (value.length === 0) {
        setUsernameError("");
        return;
      }

      if (value.length < 3) {
        setUsernameError(
          "Username must be at least 3 characters."
        );
        return;
      }

      if (value.length > 20) {
        setUsernameError(
          "Username must be under 20 characters."
        );
        return;
      }

      setCheckingUsername(true);

      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", value)
        .maybeSingle();

      if (data) {
        setUsernameError(
          "This username is already taken"
        );
      } else {
        setUsernameError("");
      }

      setCheckingUsername(false);
    }}
    placeholder="Enter a username"
    className={`h-[58px] w-full rounded-[20px] border bg-white px-5 text-[16px] outline-none transition placeholder:text-[#9c9c9c] ${
      usernameError
        ? "border-red-400 text-red-500 focus:border-red-500"
        : "border-[#ececec] focus:border-black"
    }`}
  />

  {checkingUsername && (
    <p className="mt-2 pl-1 text-[14px] font-medium text-[#7d7d7d]">
      Checking username...
    </p>
  )}

  {submitted && usernameError && (
    <p className="mt-2 pl-1 text-[14px] font-medium text-red-500">
      {usernameError}
    </p>
  )}
</div>

  {/* CONTINUE */}
<button
  disabled={
  !selectedCountry ||
  !username.trim() ||
  !!usernameError ||
  checkingUsername
}
  onClick={() => {
    setSubmitted(true);

    if (username.trim().length < 3) {
      setUsernameError(
        "Your username must be at least 3 characters."
      );
      return;
    }

    if (username.trim().length > 20) {
      setUsernameError(
        "Your username must be under 20 characters."
      );
      return;
    }

    if (
      ["admin", "test", "user"].includes(
        username.toLowerCase()
      )
    ) {
      setUsernameError(
        "This username is already taken"
      );
      return;
    }

    setUsernameError("");
    setStep(2);
  }}
  className={`mt-5 flex h-[60px] w-full items-center justify-center rounded-full text-[19px] font-bold text-white transition ${
    !selectedCountry || !username.trim()
      ? "cursor-not-allowed bg-[#b5b5b5]"
      : "bg-black hover:bg-[#111]"
  }`}
>
  Continue
</button>
</>
        ) : (
          <>
            {/* TITLE */}
            <h1 className="mt-2 text-[48px] font-black leading-[0.92] tracking-[-3px] text-black">
              How old
              <br />
              are you?
            </h1>

            {/* AGE */}
            <div className="mt-6">

              <p className="mb-2 text-[17px] font-semibold text-black">
                Select Age
              </p>

   <div className="relative">

  {/* SELECT BUTTON */}
  <button
    onClick={() => setOpenAge(!openAge)}
    className="flex h-[58px] w-full items-center justify-between rounded-[20px] border border-[#ececec] bg-white px-5 text-[16px] text-black transition hover:border-black"
  >
    <span>{age}</span>

    <svg
      className={`h-5 w-5 text-[#8d8d8d] transition ${
        openAge ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  {/* DROPDOWN */}
  {openAge && (
    <div className="absolute left-0 top-[70px] z-50 w-full overflow-hidden rounded-[24px] border border-[#ececec] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]">

      <div className="max-h-[350px] overflow-y-auto p-2">

        <div className="space-y-1">

          {Array.from(
            { length: 83 },
            (_, i) => i + 18
          ).map((num) => (
            <button
              key={num}
              onClick={() => {
                setAge(String(num));
                setOpenAge(false);
              }}
              className={`flex h-[50px] w-full items-center justify-between rounded-2xl px-4 text-left text-[15px] font-medium transition ${
                age === String(num)
                  ? "bg-[#f3f3f3] text-black"
                  : "text-black hover:bg-[#f7f7f7]"
              }`}
            >
              <span>{num}</span>

              {age === String(num) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )}
</div>
            </div>

            {/* GENDER */}
            <div className="mt-5">

              <p className="mb-2 text-[17px] font-semibold text-black">
                Select Gender
              </p>

              <div className="space-y-2">

                {[
                  "Female",
                  "Male",
                  "Prefer not to say",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setGender(item)}
                    className={`flex h-[56px] w-full items-center rounded-[20px] border px-5 text-[16px] font-medium transition ${
                      gender === item
                        ? "border-black bg-black text-white"
                        : "border-[#ececec] bg-[#fafafa] text-black hover:bg-[#f4f4f4]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

           {/* SAVE */}
<button
  disabled={!gender}
  onClick={async () => {
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,

        full_name:
          user.user_metadata.full_name,

      avatar_url:
  uploadedAvatarUrl ||
  user.user_metadata.avatar_url,

        username,

        country: selectedCountry,

        age: Number(age),

        gender,

        onboarding_completed: true,
      });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      window.location.reload();
    }, 1000);
  }}
  className="mt-6 flex h-[60px] w-full items-center justify-center rounded-full bg-black text-[19px] font-bold text-white transition hover:bg-[#111] disabled:pointer-events-none disabled:opacity-40"
>
  {loading ? (
    <div className="flex items-center gap-2">

      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

      <span>Saving...</span>
    </div>
  ) : (
    "Continue"
  )}
</button>
          </>
        )}
      </div>
    </div>
  );
}