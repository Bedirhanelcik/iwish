"use client";

import Link from "next/link";
import AddWishModal from "@/components/AddWishModal";
import {
  useEffect,
  useState,
} from "react";
import EditWishlistModal from "@/components/EditWishlistModal";
import { supabase } from "@/lib/supabase";

import {
  Plus,
  Pencil,
  Trash2,
  ArrowUpDown,
  ChevronRight,
  Search,
} from "lucide-react";

export default function WishlistDetailPage({
  params,
}: {
  params: Promise<{
    wishlistId: string;
  }>;
}) {
  const [wishlist, setWishlist] =
    useState<any>(null);

const [wishes, setWishes] =
  useState<any[]>([]);

  const [loading, setLoading] =
  
    useState(true);

const [openAddWish, setOpenAddWish] =
  useState(false);
const [openEditWishlist, setOpenEditWishlist] =
  useState(false);
const [profileData, setProfileData] =
  useState<any>(null);

  useEffect(() => {
    const fetchWishlist =
      async () => {
        const {
          wishlistId,
        } = await params;

        const { data, error } =
          await supabase
            .from("wishlists")
            .select("*")
            .eq(
              "slug",
              wishlistId
            )
            .single();

  if (!error && data) {
  setWishlist(data);

  const { data: wishesData } =
    await supabase
      .from("wishes")
      .select("*")
      .eq(
        "wishlist_id",
        data.id
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

  if (wishesData) {
    setWishes(wishesData);
  }
}

const {
  data: {
    user,
  },
} =
  await supabase.auth.getUser();

if (user) {
  const {
    data: profile,
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

  if (profile) {
    setProfileData(
      profile
    );
  }
}

        setLoading(false);
      };

    fetchWishlist();
  }, [params]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa] text-[30px] font-bold">
        Loading...
      </div>
    );
  }

  if (!wishlist) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa] text-[30px] font-bold">
        Wishlist not found
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fafafa]">
      {/* NAVBAR */}
      <nav className="mx-auto flex h-[78px] w-full max-w-[1450px] items-center justify-between px-7">
        {/* LEFT */}
        <div className="flex items-center gap-11">
          {/* LOGO */}
          <Link
            href="/wishlist"
            className="flex items-center"
          >
            <img
              src="/mainlogo.png"
              alt="logo"
              className="h-[118px] w-auto object-contain"
            />
          </Link>

          {/* NAV ITEMS */}
          <div className="hidden items-center gap-8 lg:flex">
         
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

            <button className="text-[13px] font-semibold text-[#6f6f6f] transition hover:text-black">
              Gift Ideas
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <div className="hidden h-[44px] w-[360px] items-center gap-3 rounded-full border border-[#e6e6e6] bg-white px-5 md:flex">
            <Search
              size={16}
              className="text-[#9c9c9c]"
            />

            <input
              placeholder="Search products"
              className="w-full bg-transparent text-[13px] font-medium caret-black outline-none placeholder:text-[#9c9c9c]"
            />
          </div>

    {/* PROFILE */}
<Link
  href="/profile"
  className="h-10 w-10 overflow-hidden rounded-full"
>
  {profileData?.avatar_url ? (
    <img
      src={profileData.avatar_url}
      alt="profile"
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#00897b] text-[15px] font-semibold text-white">
      {profileData?.full_name?.charAt(0) || "M"}
    </div>
  )}
</Link>
        </div>
      </nav>

      {/* PAGE */}
      <div className="mx-auto max-w-[1450px] px-7 pb-16">
        {/* HEADER */}
        <div className="mt-4 flex flex-col items-center">
          {/* META */}
          <div className="flex items-center gap-2 text-[14px] text-[#8b8b8b]">
            <span className="font-semibold text-black">
              Bedirhan
            </span>

            <span>•</span>

            <span>
              {wishlist.created_at?.split(
                "T"
              )[0]}
            </span>
          </div>

          {/* TITLE */}
          <h1 className="mt-3 text-center text-[46px] font-bold leading-none tracking-[-2.3px] text-black">
            {wishlist.title}
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-5 max-w-[470px] text-center text-[15px] leading-[1.75] text-[#6f6f6f]">
            {wishlist.description ||
              "No description"}
          </p>

          {/* BUTTONS */}
          <div className="mt-7 flex items-center gap-3">
            {/* WISH */}
            <button
  onClick={() =>
    setOpenAddWish(true)
  }
  className="flex h-[44px] items-center gap-2 rounded-full bg-black px-5 text-[14px] font-semibold text-white transition-all duration-200 hover:scale-[1.02]">
              <Plus size={16} />

              Wish
            </button>

            {/* SHARE */}
            <button className="h-[44px] rounded-full bg-[#f2f2f2] px-5 text-[14px] font-medium text-black transition hover:bg-[#e9e9e9]">
              Share
            </button>

            {/* EDIT */}
           <button
  onClick={() =>
    setOpenEditWishlist(true)
  }
  className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#f2f2f2] transition hover:bg-[#e9e9e9]"
>
  <Pencil size={16} />
</button>

            {/* DELETE */}
            <button className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#f2f2f2] transition hover:bg-[#e9e9e9]">
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-16 flex flex-col gap-10 xl:flex-row xl:justify-between">
          {/* LEFT */}
          <div className="w-full xl:w-[315px]">
            {/* REORDER */}
            <button className="mb-4 flex items-center gap-2 text-[14px] font-medium text-[#5f5f5f] transition hover:text-black">
              <ArrowUpDown size={15} />

              Reorder
            </button>

            {/* ADD CARD */}
            <button
  onClick={() =>
    setOpenAddWish(true)
  }
  className="group flex h-[305px] w-full flex-col items-center justify-center rounded-[30px] border-2 border-dashed border-[#dddddd] bg-[#fcfcfc] transition-all duration-300 hover:border-[#c9c9c9] hover:bg-[#f7f7f7]">
              {/* PLUS */}
              <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#f1f1f1] transition-all duration-300 group-hover:scale-[1.04] group-hover:bg-[#ebebeb]">
                <Plus
                  size={30}
                  strokeWidth={2.3}
                />
              </div>

              {/* TEXT */}
              <h2 className="mt-6 text-[27px] font-bold tracking-[-1.2px] text-black">
                Add Wish
              </h2>
            </button>

            {/* META */}
            <div className="mt-8 space-y-2 text-[14px] text-[#8a8a8a]">
              <p>
                Created:{" "}
                {wishlist.created_at?.split(
                  "T"
                )[0]}
              </p>

              <p>Total Value: USD 0.00</p>
            </div>
          </div>

     {/* RIGHT */}
<div className="flex-1">

  {/* SORT */}
  <div className="mb-8 flex justify-end">
    <button className="text-[15px] font-medium text-[#444]">
      Sort by: Default
    </button>
  </div>
{/* WISH GRID */}
<div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">

{wishes.map((wish) => (
  <Link
    href={`/wish/${wish.id}`}
    key={wish.id}
    className="group block"
  >
    <div className="relative overflow-hidden rounded-[26px] bg-[#f4f4f4]">
      <img
        src={wish.image}
        alt={wish.title}
        className="h-[320px] w-full object-contain transition duration-300 group-hover:scale-[1.02]"
      />

      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
        <img
          src={`https://www.google.com/s2/favicons?domain=${wish.domain}&sz=64`}
          alt={wish.store}
          className="h-4 w-4 rounded-full object-contain"
        />

        <span className="text-[12px] font-semibold text-black">
          {wish.price}
        </span>
      </div>
    </div>

    <h3 className="mt-3 line-clamp-2 text-[15px] font-medium leading-[1.35] text-black">
      {wish.title}
    </h3>
  </Link>
))}
</div>

</div>

</div>
        {/* FOR YOU */}
        <div className="mt-12">
          <div className="flex items-center gap-3">
            <h2 className="text-[24px] font-bold tracking-[-1px] text-black">
              For You
            </h2>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f1f1]">
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </div>

  <AddWishModal
  open={openAddWish}
  onClose={() =>
    setOpenAddWish(false)
  }
  wishlistId={wishlist.id}
/>
<EditWishlistModal
  open={openEditWishlist}
  onClose={() =>
    setOpenEditWishlist(false)
  }
  wishlist={wishlist}
  onUpdated={(updated: any) =>
    setWishlist(updated)
  }
/>
    </div>
  );
}