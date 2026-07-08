"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Bell,
  Search,
} from "lucide-react";

export default function Brands() {
  const [profile, setProfile] =
    useState<any>(null);


  const [pageReady, setPageReady] =
    useState(false);
  useEffect(() => {
    const loadUser =
      async () => {
        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        if (!user) return;

        const {
          data: profileData,
        } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile(profileData);
      };
setTimeout(() => {
  setPageReady(true);
}, 150);
    loadUser();
  }, []);


const brands = [
  {
    name: "Adidas",
    image: "/brands3/adidas.png",
    url: "https://www.adidas.com",
  },
  {
    name: "Alo Yoga",
    image: "/brands3/alo.jpeg",
    url: "https://www.aloyoga.com",
  },
  {
    name: "Altinyildiz Classics",
    image: "/brands3/altınyıldız.jpeg",
    url: "https://www.altinyildiz.com.tr",
  },
  {
    name: "Amazon",
    image: "/brands3/amazon.png",
    url: "https://www.amazon.com",
  },
  {
    name: "Apple",
    image: "/brands3/apple.png",
    url: "https://www.apple.com",
  },
  {
    name: "Beymen",
    image: "/brands3/beymen.png",
    url: "https://www.beymen.com",
  },
  {
    name: "Calvin Klein",
    image: "/brands3/calvinklein.png",
    url: "https://www.calvinklein.com",
  },
  {
    name: "Chanel",
    image: "/brands3/chanel.png",
    url: "https://www.chanel.com",
  },
  {
    name: "Creed",
    image: "/brands3/creed-1760-seeklogo.png",
    url: "https://www.creedfragrance.com",
  },
  {
    name: "Dior",
    image: "/brands3/dior.png",
    url: "https://www.dior.com",
  },
  {
    name: "eBay",
    image: "/brands3/ebay.png",
    url: "https://www.ebay.com",
  },
  {
    name: "Emporio Armani",
    image: "/brands3/emporio-armani.png",
    url: "https://www.armani.com",
  },
  {
    name: "English Home",
    image: "/brands3/englishhome.jpeg",
    url: "https://www.englishhome.com",
  },
  {
    name: "Etsy",
    image: "/brands3/etsy.png",
    url: "https://www.etsy.com",
  },

  {
    name: "Gymshark",
    image: "/brands3/gym.png",
    url: "https://www.gymshark.com",
  },
  {
    name: "H&M",
    image: "/brands3/hm.png",
    url: "https://www.hm.com",
  },
  {
    name: "Huawei",
    image: "/brands3/huawei.png",
    url: "https://consumer.huawei.com",
  },
  {
    name: "IKEA",
    image: "/brands3/icea.png",
    url: "https://www.ikea.com",
  },
  {
    name: "Jean Paul Gaultier",
    image: "/brands3/jpg.jpg",
    url: "#",
  },
  {
    name: "Karaca",
    image: "/brands3/karaca.png",
    url: "https://www.karaca.com",
  },
  {
    name: "Korkmaz",
    image: "/brands3/korkmaz.png",
    url: "https://www.korkmaz.com.tr",
  },
  {
    name: "Lacoste",
    image: "/brands3/lacoste.jpeg",
    url: "https://www.lacoste.com",
  },
  {
    name: "LEGO",
    image: "/brands3/lego.png",
    url: "https://www.lego.com",
  },
  {
    name: "Madame Coco",
    image: "/brands3/madamecoco.jpeg",
    url: "https://www.madamecoco.com",
  },
  {
    name: "N11",
    image: "/brands3/n11.png",
    url: "https://www.n11.com",
  },
  {
    name: "Nike",
    image: "/brands3/Nike_Logo_1.png",
    url: "https://www.nike.com",
  },
  {
    name: "Nishane",
    image: "/brands3/nishane.jpeg",
    url: "https://www.nishane.com",
  },
  {
    name: "Pandora",
    image: "/brands3/pandora.png",
    url: "https://www.pandora.net/",
  },
  {
    name: "Pasabahce",
    image: "/brands3/pasabahce.jpeg",
    url: "https://www.pasabahce.com",
  },
  {
    name: "Polo Ralph Lauren",
    image: "/brands3/polo.png",
    url: "https://www.ralphlauren.com",
  },
  {
    name: "Puma",
    image: "/brands3/puma.png",
    url: "https://www.puma.com",
  },
  {
    name: "Sephora",
    image: "/brands3/sephora.png",
    url: "https://www.sephora.com",
  },
  {
    name: "Shein",
    image: "/brands3/shein.png",
    url: "https://www.shein.com",
  },
  {
    name: "Stanley",
    image: "/brands3/stanley.png",
    url: "https://www.stanley1913.com",
  },
  {
    name: "Stradivarius",
    image: "/brands3/Stradivarius.png",
    url: "https://www.stradivarius.com",
  },
  {
    name: "Target",
    image: "/brands3/target.png",
    url: "https://www.target.com",
  },
  {
    name: "Temu",
    image: "/brands3/temu.png",
    url: "https://www.temu.com",
  },
  {
    name: "Tom Ford",
    image: "/brands3/tomford.jpeg",
    url: "https://www.tomford.com",
  },
  {
    name: "Tommy Hilfiger",
    image: "/brands3/tommy.jpeg",
    url: "https://www.tommy.com",
  },
  {
    name: "Trendyol",
    image: "/brands3/trendyol.png",
    url: "https://www.trendyol.com",
  },
  {
    name: "UGG",
    image: "/brands3/ugg.jpeg",
    url: "https://www.ugg.com",
  },
  {
    name: "Urban Outfitters",
    image: "/brands3/urban.jpeg",
    url: "https://www.urbanoutfitters.com",
  },
  {
    name: "Victoria's Secret",
    image: "/brands3/vs.png",
    url: "https://www.victoriassecret.com",
  },
  {
    name: "Walmart",
    image: "/brands3/walmart.png",
    url: "https://www.walmart.com",
  },
  {
    name: "Watsons",
    image: "/brands3/watsons.jpeg",
    url: "https://www.watsons.com.tr",
  },
  {
    name: "Yves Saint Laurent",
    image: "/brands3/yves-saint-laurent-logo.png",
    url: "https://www.ysl.com",
  },
  {
    name: "Zara",
    image: "/brands3/zara.png",
    url: "https://www.zara.com",
  },
];
if (!pageReady) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
      <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-[#e5e5e5] border-t-[#3B82F6]" />
    </div>
  );
}
return (
  <div className="min-h-screen bg-[#fafafa]">

      {/* NAVBAR */}
      <div className="sticky top-0 z-50 border-b border-[#ececec] bg-white">

        <div className="mx-auto flex h-[82px] max-w-[1700px] items-center justify-between px-12">

          <div className="ml-9 flex items-center gap-12">

          <Link href="/">
  <img
    src="/mainlogo.png"
    alt="logo"
    className="h-[105px] w-auto object-contain"
  />
</Link>

            <div className="mt-2 flex items-center gap-8 text-[16px] font-medium">

           <Link href="/wishlist">
  Wishlist
</Link>

              <Link href="/activity">
                Activity
              </Link>

              <Link href="/gift-ideas">
                Gift Ideas
              </Link>

            </div>
          </div>

          <div className="ml-auto flex items-center gap-5">

            <div className="flex h-[46px] w-[420px] items-center gap-3 rounded-full border border-[#e8e8e8] px-5">

              <Search size={18} />

              <input
                placeholder="Search products"
                className="w-full bg-transparent outline-none"
              />

            </div>

            <button>
              <Bell size={20} />
            </button>

            <Link href="/profile">

              {profile?.avatar_url ? (
                <img
                  src={
                    profile.avatar_url
                  }
                  alt=""
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                  {profile?.full_name?.[0] ||
                    "U"}
                </div>
              )}

            </Link>

          </div>

        </div>

      </div>

 {/* CONTENT */}

<div className="mx-auto max-w-[1350px] px-8 py-10">

        <h1 className="mb-10 text-[56px] font-bold tracking-[-2px]">
          Brands
        </h1>

        <div className="grid grid-cols-10 gap-x-8 gap-y-9">

          {brands.map((brand) => (
            <a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noreferrer"
              className="group text-center"
            >
              <div className="flex h-[86px] w-[86px] items-center justify-center rounded-[18px] border border-[#ececec] bg-white transition-all duration-200 group-hover:scale-105 group-hover:shadow-md">

                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={60}
                  height={60}
                  className="max-h-[58px] w-auto object-contain"
                />

              </div>

              <p className="mt-3 text-[15px] font-medium text-black">
                {brand.name}
              </p>

            </a>
          ))}

        </div>

      </div>

      {/* FOOTER */}

      <div className="mt-24 border-t border-[#ececec] bg-white">

        <div className="mx-auto flex max-w-[1500px] items-center justify-between px0 py-14">

          <div className="flex flex-col justify-start">

            <img
              src="/logo.png"
              alt=""
              className="mb-5 h-12"
            />

          {/* LOGO */}
             <img
               src="/mainlogo.png"
               alt="logo"
               className="h-[122px] w-fit object-contain"
             />
       
             {/* TEXT */}
             <p className="mt-3 max-w-[500px] text-[16px] leading-[1.5] text-[#707070]">
                Create wishlists, discover products
    and organize everything you want
    in one beautiful place with IWish.
             </p>
       
             {/* SOCIALS */}
       <div className="mt-4 flex items-center gap-4">
       
         <a
           href="https://instagram.com"
           target="_blank"
           className="transition hover:opacity-100"
         >
           <img
             src="/instagram.png"
             alt="instagram"
             className="h-[22px] w-[22px] object-contain opacity-70"
           />
         </a>
       
         <a
           href="https://tiktok.com"
           target="_blank"
           className="transition hover:opacity-100"
         >
           <img
             src="/tiktok.png"
             alt="tiktok"
             className="h-[22px] w-[22px] object-contain opacity-70"
           />
         </a>
       
         <a
           href="https://pinterest.com"
           target="_blank"
           className="transition hover:opacity-100"
         >
           <img
             src="/pinterest.png"
             alt="pinterest"
             className="h-[22px] w-[22px] object-contain opacity-70"
           />
         </a>
       
         <a
           href="https://x.com"
           target="_blank"
           className="transition hover:opacity-100"
         >
           <img
             src="/x.png"
             alt="x"
             className="h-[22px] w-[22px] object-contain opacity-70"
           />
         </a>   
       </div>
       
       

          </div>

          <img
            src="/qr.png"
            alt=""
            className="h-[140px]"
          />

        </div>

      </div>

    </div>
  );
}