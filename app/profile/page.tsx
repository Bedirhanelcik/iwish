"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import {
  Camera,
  ChevronDown,
  Copy,
  Globe,
  LogOut,
  Share2,
  Trash2,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function ProfilePage() {

const [showToast, setShowToast] =
  useState(false);

const router = useRouter();

const [loading, setLoading] = useState(true);

const [saving, setSaving] = useState(false);

const [userId, setUserId] = useState("");

const [email, setEmail] = useState("");

const [fullName, setFullName] = useState("");

const [username, setUsername] = useState("");

const [bio, setBio] = useState("");

const [country, setCountry] = useState("Türkiye");

const [slug, setSlug] = useState("");

const [avatarUrl, setAvatarUrl] =
  useState("");

const [avatarFile, setAvatarFile] =
  useState<File | null>(null);

const [avatarPreview, setAvatarPreview] =
  useState("");

useEffect(() => {

  const loadProfile = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/");
      return;
    }
      setUserId(user.id);

      setEmail(user.email || "");

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
setAvatarUrl(
  data.avatar_url || ""
);

setAvatarPreview(
  data.avatar_url || ""
);
        setFullName(data.full_name || "");

        setUsername(data.username || "");

        setBio(data.bio || "");

        setCountry(data.country || "Türkiye");

        setSlug(data.public_slug || "");
      }

      else {

        const generatedSlug =
          (user.user_metadata?.username || "user") +
          "-" +
          Math.floor(Math.random() * 999999);

        const generatedUsername =
          user.user_metadata?.username ||
          user.email?.split("@")[0] ||
          "user";

        const generatedName =
          user.user_metadata?.full_name ||
          generatedUsername;

        await supabase.from("profiles").insert({
          id: user.id,

          full_name: generatedName,

          username: generatedUsername,

          bio: "",

          country: "Türkiye",

          public_slug: generatedSlug,
        });

        setFullName(generatedName);

        setUsername(generatedUsername);

        setSlug(generatedSlug);
      }
setLoading(false);
};

loadProfile();

}, [router]);

  
  
  const saveProfile = async () => {

    if (!fullName.trim()) return;

    if (!username.trim()) return;

    if (fullName.length > 40) return;

    if (username.length > 20) return;

    if (bio.length > 300) return;

    setSaving(true);

    const updatedSlug =
      username
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "") +
      "-" +
      userId.slice(0, 6);

      let uploadedAvatarUrl = avatarUrl;

if (avatarFile) {
  const fileExt =
    avatarFile.name.split(".").pop();

  const fileName =
    `${userId}-${Date.now()}.${fileExt}`;

const { data: uploadData, error: uploadError } =
  await supabase.storage
    .from("avatars")
    .upload(
      fileName,
      avatarFile,
      {
        cacheControl: "3600",
        upsert: true,
      }
    );

console.log(uploadData);
console.log(uploadError);

if (uploadError) {
  console.error(uploadError);
}
if (!uploadError) {

  const { data } =
    supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

uploadedAvatarUrl =
  data.publicUrl;

  setAvatarUrl(
    uploadedAvatarUrl
  );

  setAvatarPreview(
    uploadedAvatarUrl
  );
}
}
    const { error } = await supabase
      .from("profiles")
.upsert({
  id: userId,

  full_name: fullName,

  username,

  bio,

  country,

avatar_url:
  uploadedAvatarUrl,

  public_slug: updatedSlug,
});
if (error) {
  console.error(
    "PROFILE ERROR:",
    error
  );

  alert(
    "Profile Error: " +
      error.message
  );
} else {

  setAvatarUrl(
    uploadedAvatarUrl
  );

  setAvatarPreview(
    uploadedAvatarUrl
  );

  setShowToast(true);

setTimeout(() => {
  setShowToast(false);
}, 3000);
}
    if (!error) {
      setSlug(updatedSlug);
    }

    setSaving(false);
  };

  const logout = async () => {

    await supabase.auth.signOut();

    router.push("/");
  };

if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
      <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-[#e5e5e5] border-t-[#3B82F6]"></div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#fafafa]">

{showToast && (
  <div className="fixed left-1/2 top-7 z-[9999] -translate-x-1/2 animate-[toast_0.35s_ease] rounded-[22px] border border-[#ececec] bg-white px-6 py-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

    <div className="flex items-center gap-4">

      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
        ✓
      </div>

      <div>
        <p className="text-[16px] font-semibold text-black">
          Success!
        </p>

        <p className="text-[14px] text-[#777]">
          Your profile picture has been updated!
        </p>
      </div>
    </div>
  </div>
)}

      {/* NAVBAR */}
      <nav className="flex h-[78px] items-center justify-between px-12">

        <div className="ml-8 flex items-center gap-20">

<Link href="/wishlist">

  <Image
    src="/mainlogo.png"
    alt="logo"
    width={185}
    height={60}
    className="cursor-pointer object-contain"
  />

</Link>

        <div className="flex items-center gap-6">

          <Link
  href="/wishlist"
  className="cursor-pointer text-[15px] font-semibold text-black"
>
  Wishlist
</Link>

        <Link
  href="/activity"
  className="cursor-pointer text-[15px] font-semibold text-[#7b7b7b] transition hover:text-black"
>
  Activity
</Link>
            <button className="cursor-pointer text-[15px] font-semibold text-[#7b7b7b] transition hover:text-black">
              Inspiration
            </button>

            <button className="cursor-pointer text-[15px] font-semibold text-[#7b7b7b] transition hover:text-black">
              Guides
            </button>

            <button className="cursor-pointer text-[15px] font-semibold text-[#7b7b7b] transition hover:text-black">
              Gift Ideas
            </button>
          </div>
        </div>



       <div className="flex h-[46px] w-[370px] items-center gap-3 rounded-full border border-[#e7e7e7] bg-white px-5 transition-all duration-200 focus-within:border-[#7ab8ff] focus-within:shadow-[0_0_0_4px_rgba(64,145,255,0.10)]">

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#9a9a9a]"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>

  <input
    placeholder="Search products"
    className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#9d9d9d]"
  />
</div>

     <div className="mr-4 flex h-12 w-12 overflow-hidden rounded-full border border-[#ececec] shadow-sm">

  {avatarPreview ? (
    <img
      src={avatarPreview}
      alt="profile"
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center text-[22px] font-semibold text-white">
      {fullName.charAt(0)}
    </div>
  )}
</div>
      </nav>

      {/* CONTENT */}
      <div className="mx-auto flex w-full max-w-[1450px] justify-center px-8 pb-24 pt-10">

        <div className="w-full max-w-[540px]">

          {/* HEADER */}
          <div className="overflow-hidden rounded-[34px] border border-[#ebebeb] bg-white">

            <div className="relative h-[170px] bg-[#d9d9d9]">
<input
  type="file"
  accept="image/*"
  id="avatar-upload"
  className="hidden"
  onChange={(e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setAvatarFile(file);

    setAvatarPreview(
      URL.createObjectURL(file)
    );
  }}
/>
          <button
  onClick={() =>
    document
      .getElementById(
        "avatar-upload"
      )
      ?.click()
  }
  className="absolute right-5 top-5 flex h-[42px] cursor-pointer items-center gap-2 rounded-full bg-white px-5 text-[14px] font-semibold text-black transition hover:bg-[#f3f3f3]"
>
  <Camera size={16} />
  Edit
</button>
            </div>

          <div className="relative px-8 pb-8">

  <div className="absolute -top-14 left-1/2 -translate-x-1/2">

    <div className="h-[110px] w-[110px] overflow-hidden rounded-full border-[5px] border-white bg-[#efefef] shadow-sm">

{avatarPreview ? (
  <img
    src={avatarPreview}
    alt="profile"
    className="h-full w-full object-cover"
  />
) : (
  <div className="flex h-full w-full items-center justify-center text-[42px] font-bold text-black">
    {fullName.charAt(0)}
  </div>
)}

    </div>

  </div>

  <div className="pt-16 text-center">

    <h1 className="text-[44px] font-bold tracking-[-2px] text-black">
      {fullName}
    </h1>

    <p className="mt-1 text-[21px] text-[#8d8d8d]">
      @{username}
    </p>

  </div>

</div>
</div>

          {/* SHARE */}
          <div className="mt-7 rounded-[34px] border border-[#ebebeb] bg-white p-7">

            <h2 className="text-[33px] font-bold tracking-[-1.5px] text-black">
              Share Your Profile
            </h2>

            <div className="mt-5 flex items-center gap-3">

              <div className="flex h-[58px] flex-1 items-center rounded-full border border-[#e5e5e5] bg-[#fafafa] px-6 text-[16px] text-[#666666]">

                iwish.com/{slug}
              </div>

              <button className="h-[58px] cursor-pointer rounded-full border border-[#e5e5e5] bg-white px-7 text-[16px] font-semibold text-black transition hover:bg-[#f3f3f3]">

                Copy
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4">

              {["↑", "f", "X", "r", "w"].map((item, index) => (
                <button
                  key={index}
                  className="flex h-[56px] w-[56px] cursor-pointer items-center justify-center rounded-full bg-black text-[22px] font-bold text-white transition hover:scale-[1.05]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* PROFILE INFO */}
          <div className="mt-7 rounded-[34px] border border-[#ebebeb] bg-white p-7">

            <h2 className="text-[34px] font-bold tracking-[-1.5px] text-black">
              Profile Info
            </h2>

            {/* FULL NAME */}
            <div className="mt-6">

              <p className="mb-2 text-[15px] font-semibold text-black">
                Full Name
              </p>

              <input
                maxLength={40}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-[58px] w-full rounded-full border border-[#e5e5e5] bg-[#fafafa] px-6 text-[16px] outline-none transition focus:border-black"
              />
            </div>

            {/* USERNAME */}
            <div className="mt-5">

              <p className="mb-2 text-[15px] font-semibold text-black">
                Username
              </p>

              <input
                maxLength={20}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-[58px] w-full rounded-full border border-[#e5e5e5] bg-[#fafafa] px-6 text-[16px] outline-none transition focus:border-black"
              />
            </div>

            {/* BIO */}
            <div className="mt-5">

              <p className="mb-2 text-[15px] font-semibold text-black">
                Bio
              </p>

              <textarea
                maxLength={300}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="h-[140px] w-full resize-none rounded-[24px] border border-[#e5e5e5] bg-[#fafafa] px-6 py-5 text-[16px] outline-none transition focus:border-black"
              />
            </div>

            {/* COUNTRY */}
            <div className="mt-5">

              <p className="mb-2 text-[15px] font-semibold text-black">
                Country
              </p>

              <div className="relative">

                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="h-[58px] w-full cursor-pointer appearance-none rounded-full border border-[#e5e5e5] bg-[#fafafa] px-6 text-[16px] outline-none"
                >
                  <option>Türkiye</option>
                  <option>United States</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Italy</option>
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-[#888888]"
                />
              </div>
            </div>

            {/* SAVE */}
            <button
              onClick={saveProfile}
              className="mt-7 flex h-[62px] w-full cursor-pointer items-center justify-center rounded-full bg-black text-[18px] font-semibold text-white transition hover:scale-[1.01]"
            >
              {saving ? "Saving..." : "Save Profile Changes"}
            </button>
          </div>

          {/* SETTINGS */}
          <div className="mt-7 rounded-[34px] border border-[#ebebeb] bg-white p-7">

            <div className="flex items-center justify-between border-b border-[#efefef] pb-6">

              <p className="text-[16px] font-semibold text-black">
                Profile Visibility
              </p>

              <button className="h-[46px] rounded-full bg-[#f5f5f5] px-6 text-[15px] font-semibold text-black">
                Public (default)
              </button>
            </div>

            <div className="flex items-center justify-between pt-6">

              <button
                onClick={logout}
                className="cursor-pointer text-[18px] font-semibold text-black transition hover:opacity-70"
              >
                Log Out
              </button>

              <button className="cursor-pointer text-[18px] font-semibold text-red-500 transition hover:opacity-70">
                Delete Account
              </button>
            </div>
          </div>
                      <style jsx global>{`
  @keyframes toast {
    from {
      opacity: 0;
      transform: translate(-50%, -20px);
    }

    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`}</style>
        </div>
      </div>
    </div>
  );
}