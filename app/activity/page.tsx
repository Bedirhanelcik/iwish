"use client";

"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";
import Link from "next/link";

import {
  Search,
  UserPlus,
  Bell,
} from "lucide-react";

import AddFriendsModal from "@/components/AddFriendsModal";

export default function ActivityPage() {

  useEffect(() => {
  const loadProfile =
    async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      const {
        data,
      } = await supabase
        .from("profiles")
        .select(
          "full_name, avatar_url"
        )
        .eq(
          "id",
          user.id
        )
        .single();

      if (data) {
        setProfileData(data);
      }
    };

  loadProfile();
}, []);

  const [profileData, setProfileData] =
    useState<any>(null);

    const [openFriends, setOpenFriends] =
  useState(false);
  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* NAVBAR */}
      <nav className="flex h-[72px] items-center justify-between px-12">

        {/* LEFT */}
        <div className="flex items-center">

          <Link
            href="/"
            className="flex items-center"
          >
            <img
              src="/mainlogo.png"
              alt="logo"
              className="ml-3 h-[108px] object-contain"
            />
          </Link>

          <div className="ml-5 flex items-center gap-8">

            <Link
              href="/wishlist"
              className="text-[14px] font-semibold text-[#6f6f6f] hover:text-black"
            >
              Wishlist
            </Link>

            <Link
              href="/activity"
              className="text-[14px] font-semibold text-black"
            >
              Activity
            </Link>

            <button className="text-[14px] font-semibold text-[#6f6f6f] hover:text-black">
              Gift Ideas
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
<div
  className="
    flex h-[44px] w-[420px]
    items-center gap-3
    rounded-full
    border border-[#e5e5e5]
    bg-white px-4
    shadow-sm
    transition-all duration-200
    hover:shadow-md
    focus-within:border-[#4f8cff]
    focus-within:ring-2
    focus-within:ring-[#4f8cff]/20
    focus-within:shadow-md
  "
>

            <Search
              size={17}
              className="text-[#9b9b9b]"
            />

      <input
  placeholder="Search users"
  className="
    w-full
    bg-transparent
    text-[14px]
    outline-none
    placeholder:text-[#9b9b9b]
  "
/>
          </div>


          {/* NOTIFICATION */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full">
            <Bell size={19} />
          </button>

          {/* PROFILE */}
<Link
  href="/profile"
  className="h-10 w-10 overflow-hidden rounded-full"
>
  {profileData?.avatar_url ? (
  <img
  src={profileData.avatar_url}
  onError={(e) => {
    (
      e.target as HTMLImageElement
    ).style.display = "none";
  }}
      alt="profile"
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center text-[18px] font-semibold text-white">
      {profileData?.full_name?.charAt(
        0
      ) || "M"}
    </div>
  )}
</Link>
        </div>
      </nav>

      {/* PAGE */}
      <div className="mx-auto max-w-[1340px] px-6 pt-2">

        {/* TITLE */}
        <h1 className="mb-5 text-[58px] font-bold tracking-[-3px] text-black">
          Activity
        </h1>

        {/* EMPTY STATE */}
        <div className="flex h-[340px] flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-[#dddddd] bg-[#fcfcfc]">

          {/* ICON */}
          <div className="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-[#f3f3f3]">

            <UserPlus
              size={34}
              strokeWidth={1.8}
            />
          </div>

          {/* TITLE */}
          <h2 className="mt-7 text-[44px] font-bold tracking-[-1.8px] text-black">
            No friends yet
          </h2>

          {/* TEXT */}
          <p className="mt-3 text-[20px] text-[#8b8b8b]">
            Start following friends to see their activity and wishlists
          </p>

          {/* BUTTON */}
      <button
  onClick={() =>
    setOpenFriends(true)
  }
  className="mt-8 flex h-[50px] items-center gap-3 rounded-full bg-black px-7 text-[15px] font-semibold text-white transition hover:scale-[1.02]"
>
  <Search size={17} />
  Add Friends
</button>
        </div>

        {/* FOOTER */}
        <div className="mt-20 border-t border-[#ececec] pt-14">

          <img
            src="/mainlogo.png"
            alt="logo"
            className="h-[92px] object-contain"
          />

          <p className="mt-4 max-w-[520px] text-[18px] leading-[1.6] text-[#707070]">
            Create wishlists and discover products you'll love.
            The modern wishlist maker for every occasion.
          </p>

          <div className="mt-6 flex gap-5">

            <img
              src="/instagram.png"
              alt=""
              className="h-6 w-6 opacity-70"
            />

            <img
              src="/tiktok.png"
              alt=""
              className="h-6 w-6 opacity-70"
            />

            <img
              src="/pinterest.png"
              alt=""
              className="h-6 w-6 opacity-70"
            />

            <img
              src="/x.png"
              alt=""
              className="h-6 w-6 opacity-70"
            />
          </div>
        </div>
      </div>
      <AddFriendsModal
  open={openFriends}
  onClose={() =>
    setOpenFriends(false)
  }
/>
    </div>
  );
}