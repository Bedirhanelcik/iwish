  "use client";

  import VibePlayer from "@/components/VibePlayer";
  import Link from "next/link";
  import CreateWishlistModal from "@/components/CreateWishlistModal";
  import { useState } from "react";
  import LinkedinCard from "@/components/LinkedinCard";
  import { useEffect } from "react";
  import { supabase } from "@/lib/supabase";
  import {
    Gift,
    Settings,
    Plus,
    Search,
    Instagram,
    Music2,
  } from "lucide-react";

  export default function WishlistPage() {
    const [openModal, setOpenModal] =
      useState(false);

    const [wishlists, setWishlists] = useState<any[]>([]);
    const [wishlistPreviews, setWishlistPreviews] =
  useState<Record<string, any[]>>({});

    const [loadingWishlists, setLoadingWishlists] =
      useState(true);
    const [profile, setProfile] =
  useState<any>(null);
  const [pageReady, setPageReady] =
useState(false);
  const [loading, setLoading] =
  useState(true);

 

useEffect(() => {
  const fetchWishlists = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profileData } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

      setProfile(profileData);

      const { data, error } =
        await supabase
          .from("wishlists")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          });

      if (error) {
        console.error(error);
        return;
      }

      setWishlists(data || []);
      const previews: Record<string, any[]> = {};

for (const wishlist of data || []) {
  const { data: wishes } =
    await supabase
      .from("wishes")
      .select("image")
      .eq("wishlist_id", wishlist.id)
      .limit(4);

  previews[wishlist.id] =
    wishes || [];
}

setWishlistPreviews(previews);
setPageReady(true);
    } catch (err) {
      console.error(err);
    } finally {
  setLoadingWishlists(false);
  setLoading(false);
}
  };

  fetchWishlists();
}, []);
if (!pageReady) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
      <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-[#e5e5e5] border-t-[#3B82F6]"></div>
    </div>
  );
}

    return (
      <div className="min-h-screen bg-[#fafafa]">

        {/* NAVBAR */}
        <nav className="flex h-[72px] items-center justify-between bg-[#fafafa] px-12">

          {/* LEFT */}
          <div className="flex items-center">

            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center"
            >
              <img
                src="/mainlogo.png"
                alt="logo"
                className="mt-[2px] ml-5 h-[118px] object-contain"
              />
            </Link>

            {/* NAV ITEMS */}
            <div className="ml-4 mt-[8px] flex items-center gap-7">

              <button className="cursor-pointer text-[14px] font-semibold text-black">
                Wishlist
              </button>

                    <Link
  href="/activity"
  className="cursor-pointer text-[15px] font-semibold text-[#7b7b7b] transition hover:text-black"
>
  Activity
</Link>

        
              <button className="cursor-pointer text-[14px] font-semibold text-[#6f6f6f] transition-all duration-200 hover:text-black">
                Gift Ideas
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <div className="flex h-[40px] w-[350px] items-center gap-3 rounded-full border border-[#e4e4e4] bg-white px-4 transition-all duration-200 focus-within:border-[#cfcfcf]">

              <Search
                size={17}
                className="text-[#9c9c9c]"
              />

              <input
                placeholder="Search products"
                className="w-full cursor-text bg-transparent text-[14px] font-medium caret-black outline-none placeholder:text-[#9c9c9c]"
              />
            </div>

{/* USER */}
<Link
  href="/profile"
  className="flex h-10 w-10 overflow-hidden rounded-full"
>
  {profile?.avatar_url ? (
    <img
      src={profile.avatar_url}
      alt="profile"
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#00897b] text-[19px] font-medium text-white">
      {profile?.full_name?.charAt(0) || "U"}
    </div>
  )}
</Link>

</div>
</nav>

{/* PAGE */}
<div className="mx-auto flex max-w-[1380px] flex-col items-center px-6 pt-6 pb-8">
{/* AVATAR */}
<div className="relative">

  <div className="h-[98px] w-[98px] overflow-hidden rounded-full border-[4px] border-white shadow-md">
    {profile?.avatar_url ? (
      <img
        src={profile.avatar_url}
        alt="profile"
        className="h-full w-full object-cover"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-[#00897b] text-[54px] font-medium text-white">
        {profile?.full_name?.charAt(0) || "U"}
      </div>
    )}
  </div>

  <Link
    href="/profile"
    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black text-white shadow-lg transition hover:scale-[1.05]"
  >
    ✎
  </Link>

</div>
          {/* NAME */}
          <h1 className="mt-4 text-[40px] font-bold leading-none tracking-[-2px] text-black">
            {profile?.full_name || "User"}
          </h1>

          {/* USERNAME */}
          <p className="mt-1 text-[18px] text-[#8d8d8d]">
            @{profile?.username || "username"}
          </p>

  {/* BUTTONS */}
  <div className="mt-5 flex items-center gap-3">

    <button
      onClick={() => {
  if (wishlists.length >= 20) {
    alert("Maximum 20 wishlists allowed");
    return;
  }

  setOpenModal(true);
}}
      className="flex h-[46px] cursor-pointer items-center gap-2 rounded-full bg-black px-6 text-[15px] font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02]"
    >

      <Plus size={17} />

      Wishlist
    </button>

            <button className="h-[46px] cursor-pointer rounded-full bg-[#f3f3f3] px-6 text-[15px] font-medium text-black transition hover:bg-[#ebebeb]">
              Share
            </button>

  <Link
  href="/profile"
  className="flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-full bg-[#f3f3f3] text-black transition hover:bg-[#ebebeb]"
>
  <Settings size={18} />
</Link>
</div>
{/* WISHLISTS */}
<div className="mt-10 w-full">

  {!loadingWishlists && (
    <>
      {wishlists.length === 0 ? (

        /* EMPTY STATE */
        <button
          onClick={() => setOpenModal(true)}
          className="mx-auto flex h-[440px] w-full max-w-[1480px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[34px] border-2 border-dashed border-[#dddddd] bg-[#fcfcfc] transition-all duration-300 hover:border-[#c8c8c8] hover:bg-[#f8f8f8]"
        >

          

          {/* PLUS */}
          <div className="relative z-10 flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#f1f1f1] transition-all duration-300 group-hover:scale-[1.05] group-hover:bg-[#ebebeb]">

            <Plus
              size={40}
              strokeWidth={2.3}
            />
          </div>

          {/* TITLE */}
          <h2 className="relative z-10 mt-10 text-[48px] font-bold tracking-[-2px] text-black">
            Create Wishlist
          </h2>

          {/* TEXT */}
          <p className="relative z-10 mt-3 text-[17px] text-[#8b8b8b]">
            Create a new collection
          </p>
        </button>

      ) : (

        /* GRID */
        <div className="grid w-full grid-cols-4 gap-7">

          {/* USER WISHLISTS */}
          {wishlists.map((wishlist) => (
            <Link
  href={`/wishlist/${wishlist.slug}`}
  key={wishlist.id}
              className="block w-full text-left transition-all duration-300 hover:scale-[1.01]"
            >
<div className="grid h-[330px] w-full grid-cols-2 grid-rows-2 overflow-hidden rounded-[34px] bg-[#f1f1f1]">

  {[0, 1, 2, 3].map((index) => {
    const image =
      wishlistPreviews[wishlist.id]?.[
        index
      ]?.image;

    return (
      <div
        key={index}
        className="border border-[#f8f8f8]"
      >
        {image ? (
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
    );
  })}

</div>
<div className="mt-4 px-2">

  <h2 className="mt-3 text-[20px] font-bold leading-none text-black">
    {wishlist.title}
  </h2>

  <div className="mt-2 flex items-center gap-2 text-[15px] text-[#8a8a8a]">

    <span>
      {wishlistPreviews[wishlist.id]?.length || 0} Wishes
    </span>

    <span>•</span>

    <span>
      {wishlist.event_date || "No date"}
    </span>

  </div>

</div>
            

            </Link>
          ))}

          {/* CREATE */}
{wishlists.length < 20 && (
  <button
    onClick={() => setOpenModal(true)}
    className="group relative flex h-[380px] w-full flex-col items-center justify-center overflow-hidden rounded-[34px] border-2 border-dashed border-[#dddddd] bg-[#fcfcfc] transition-all duration-300 hover:border-[#bdbdbd] hover:bg-[#f7f7f7]"
  >
    <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/[0.02]" />

    <div className="relative z-10 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-[#f0f0f0] transition-all duration-300 group-hover:scale-[1.05] group-hover:bg-[#e9e9e9]">
      <Plus
        size={32}
        strokeWidth={2.3}
      />
    </div>

    <h3 className="relative z-10 mt-6 text-[24px] font-bold tracking-[-1.3px] text-black">
      Create Wishlist
    </h3>

    <p className="relative z-10 mt-2 text-[15px] text-[#8b8b8b]">
      Create a new collection
    </p>
  </button>
)}

        </div>
      )}
    </>
  )}
</div>

{/* DISCOVER BRANDS */}
<div className="mt-12 w-full">

  <Link
    href="/brands"
    className="group mb-7 flex w-fit items-center gap-3"
  >
    <h2 className="text-[21px] font-bold tracking-[-0.6px] text-black">
      Discover Brands
    </h2>

    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f2f2] text-[22px] text-black transition-all duration-200 group-hover:bg-[#e7e7e7] group-hover:scale-110">
      ›
    </div>
  </Link>

    {/* BRANDS */}
    <div className="flex items-start justify-between">

  {[
    {
      image: "amazon.png",
      name: "Amazon",
    },

    {
      image: "sephora.png",
      name: "Sephora",
    },

    {
      image: "ciceksepeti.jpeg",
      name: "ÇiçekSepeti",
    },

    {
      image: "media.png",
      name: "MediaMarkt",
    },

    {
      image: "akakce.png",
      name: "Akakçe",
    },

    {
      image: "Nike_Logo_1.png",
      name: "Nike",
    },

    {
      image: "pb.png",
      name: "Pull&Bear",
    },

    {
      image: "shein.png",
      name: "Shein",
    },

    {
      image: "Stradivarius.png",
      name: "Stradivarius",
    },

    {
      image: "temu.png",
      name: "Temu",
    },

    {
      image: "wraith.png",
      name: "Wraith",
    },

    {
      image: "sahibinden.png",
      name: "Sahibinden",
    },
  ].map((brand) => (
        <div
          key={brand.name}
          className="flex w-[74px] flex-col items-center"
        >

          {/* BOX */}
          <button className="flex h-[74px] w-[74px] items-center justify-center rounded-[18px] border border-[#ececec] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition hover:scale-[1.03]">

        <img
    src={`/brands2/${brand.image}`}
    alt={brand.name}
    className={`object-contain ${
      brand.image === "wraith.png"
        ? "max-h-[115px] max-w-[100px]"
        : brand.image === "akakce.png"
        ? "max-h-[46px] max-w-[46px]"
        : brand.image === "pb.png"
        ? "max-h-[40px] max-w-[40px]"
        : brand.image === "sahibinden.png"
        ? "max-h-[128px] max-w-[78px]"
        : "max-h-[36px] max-w-[36px]"
    }`}
  />
  </button>

          {/* NAME */}
          <p className="mt-3 text-center text-[13px] font-medium leading-[1.15] text-[#222222]">
            {brand.name}
          </p>
        </div>
      ))}
    </div>
  </div>

{/* VIEW MORE */}
<div className="mt-10 flex w-full justify-center">
  <Link
    href="/brands"
    className="rounded-full bg-black px-8 py-3 text-[15px] font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02]"
  >
    View More
  </Link>
</div>

<div className="mt-10 flex w-full justify-between items-start">
  <footer className="w-[420px]">
    <img
      src="/mainlogo.png"
      alt="logo"
      className="h-[120px] w-fit object-contain"
    />

    <p className="mt-5 max-w-[500px] text-[16px] leading-[1.5] text-[#707070]">
      Create wishlists, discover products
      and organize everything you want
      in one beautiful place with IWish.
    </p>

    <div className="mt-6 flex items-center gap-4">
      <a href="https://instagram.com" target="_blank">
        <img
          src="/instagram.png"
          alt="instagram"
          className="h-[22px] w-[22px] object-contain opacity-70"
        />
      </a>

      <a href="https://tiktok.com" target="_blank">
        <img
          src="/tiktok.png"
          alt="tiktok"
          className="h-[22px] w-[22px] object-contain opacity-70"
        />
      </a>

      <a href="https://pinterest.com" target="_blank">
        <img
          src="/pinterest.png"
          alt="pinterest"
          className="h-[22px] w-[22px] object-contain opacity-70"
        />
      </a>

      <a href="https://x.com" target="_blank">
        <img
          src="/x.png"
          alt="x"
          className="h-[22px] w-[22px] object-contain opacity-70"
        />
      </a>

      <LinkedinCard />
    </div>
  </footer>

<div className="relative -top-24 left-24">
  <VibePlayer />
</div>
</div>
</div>

  

<CreateWishlistModal
  open={openModal}
  onClose={() => setOpenModal(false)}
/>


</div>
  );
}