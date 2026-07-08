"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  ArrowRight,
  X,
  Shield,
  Bell,
  Heart,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
console.log("AddWishModal loaded");

interface Props {
  open: boolean;
  onClose: () => void;
  wishlistId: string;
}

export default function AddWishModal({
  open,
  onClose,
  wishlistId,
}: Props) {
  const [mounted, setMounted] =
    useState(false);

  const [step, setStep] =
    useState<
      | "default"
      | "loading"
      | "product"
    >("default");

  const [productLink, setProductLink] =
    useState("");

  const [productData, setProductData] =
    useState<any>(null);

    const [quantity, setQuantity] =
  useState(1);

const [currency, setCurrency] =
  useState("TRY");

  const [saving, setSaving] =
  useState(false);

  const [showSuccess, setShowSuccess] =
  useState(false);

  const [wishlists, setWishlists] =
  useState<any[]>([]);

const [selectedWishlist, setSelectedWishlist] =
  useState<any>(null);

const [wishlistOpen, setWishlistOpen] =
  useState(false);
  const [productTitle, setProductTitle] =
  useState("");

  useEffect(() => {
    if (open) {
      setMounted(true);

      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "auto";

      const timeout = setTimeout(() => {
        setMounted(false);

        setTimeout(() => {
          setStep("default");

          setProductLink("");

          setProductData(null);
        }, 150);
      }, 420);

      return () => clearTimeout(timeout);
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [open]);

  useEffect(() => {
  const loadWishlists =
    async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      const { data } =
        await supabase
          .from("wishlists")
          .select("*")
          .eq(
            "user_id",
            user.id
          )
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (!data) return;

      setWishlists(data);

      const current =
        data.find(
          (w) =>
            w.id ===
            wishlistId
        );

      setSelectedWishlist(
        current ||
          data[0]
      );
    };

  if (open) {
    loadWishlists();
  }
}, [open, wishlistId]);

  if (!mounted) return null;

const saveWish =
  async () => {
    try {
      setSaving(true);

      const {
        data: {
          user,
        },
      } =
        await supabase.auth.getUser();

      if (!user) return;


      const parsedUrl =
        new URL(
          productLink
        );

      const store =
        parsedUrl.hostname
          .replace(
            "www.",
            ""
          )
          .split(".")[0];

      const {
        error,
      } = await supabase
        .from("wishes")
        .insert({
          wishlist_id:
  selectedWishlist?.id,

title:
  productTitle,


          image:
            productData?.image,

          gallery_images:
            productData?.galleryImages,

          price:
            productData?.price,
            
            currency,
            store,

          domain:
  productData?.domain,

          product_url:
            productLink,

          quantity,

          description: "",
        });

      if (error) {
        console.error(
          error
        );

     alert(error.message);

        return;
      }

    

     setShowSuccess(true);

setTimeout(() => {
  onClose();

  window.location.reload();
}, 2600);

    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleContinue =
    async () => {
      if (
        !productLink.trim()
      )
        return;

      try {
        setStep("loading");

        const response =
          await fetch(
            "/api/product-preview",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                {
                  url: productLink,
                }
              ),
            }
          );

        const data =
          await response.json();

        console.log(data);

       if (data.error) {
  alert(data.error);

  setStep("default");

  return;
}

setCurrency(
  data.currency || "TRY"
);

setProductData(data);

setProductTitle(
  (
    data.title || ""
  )
    .replace(
      "Loading interface...Loading",
      ""
    )
    .trim()
);

setTimeout(() => {
  setStep("product");
}, 700);

      } catch (err) {
        console.error(err);

        setStep("default");
      }
    };

 const stores = [
  {
    name: "Amazon",
    image: "/brands2/amazon.png",
    url: "https://www.amazon.com",
  },

  {
    name: "Akakçe",
    image: "/brands2/akakce.png",
    url: "https://www.akakce.com",
  },

  {
    name: "ÇiçekSepeti",
    image: "/brands2/ciceksepeti.jpeg",
    url: "https://www.ciceksepeti.com",
  },

  {
    name: "MediaMarkt",
    image: "/brands2/media.png",
    url: "https://www.mediamarkt.com.tr",
  },

  {
    name: "Nike",
    image: "/brands2/Nike_Logo_1.png",
    url: "https://www.nike.com",
  },

  {
    name: "Sephora",
    image: "/brands2/sephora.png",
    url: "https://www.sephora.com",
  },

  {
    name: "Shein",
    image: "/brands2/shein.png",
    url: "https://www.shein.com",
  },

  {
    name: "Temu",
    image: "/brands2/temu.png",
    url: "https://www.temu.com",
  },

  {
    name: "Pull&Bear",
    image: "/brands2/pb.png",
    url: "https://www.pullandbear.com",
  },

  {
    name: "Sahibinden",
    image: "/brands2/sahibinden.png",
    url: "https://www.sahibinden.com",
  },

  {
    name: "Wraith",
    image: "/brands2/wraith.png",
    url: "https://wraithesports.com",
  },

  {
    name: "Stradivarius",
    image: "/brands2/Stradivarius.png",
    url: "https://www.stradivarius.com",
  },
];
  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-500 ${
        open
          ? "opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/45 backdrop-blur-[5px] transition-all duration-500 ${
          open
            ? "opacity-100"
            : "opacity-0"
        }`}
      />
{showSuccess && (
  <div className="absolute left-1/2 top-6 z-[99999] flex w-[360px] -translate-x-1/2 items-center gap-4 rounded-[22px] border border-[#ececec] bg-white px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)] animate-[fadeIn_.25s_ease]">
    
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
      ✓
    </div>

    <div>
      <p className="text-[15px] font-semibold text-black">
        Saved to your list!
      </p>

      <p className="mt-0.5 text-[13px] text-[#777]">
        Product added successfully
      </p>
    </div>
  </div>
)}
      {/* MODAL */}
      <div
        className={`relative z-20 w-[92%] max-w-[560px] rounded-[30px] bg-white px-6 pb-6 pt-6 shadow-[0_35px_120px_rgba(0,0,0,0.22)] transition-all duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-[22px] scale-[0.92] opacity-0"
        }`}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f3f3] transition-all duration-200 hover:scale-[1.04] hover:bg-[#ebebeb]"
        >
          <X size={20} />
        </button>

        {/* DEFAULT */}
        {step === "default" && (
          <div className="animate-[fadeIn_.35s_ease]">
            {/* TITLE */}
          <h1 className="text-[28px] tracking-[-1.7px] text-black">
  Add Wish
</h1>

            {/* STORES */}
            <div className="mt-5">
           <p className="mb-4 text-[18px] text-black">
  Popular Stores
</p>

              <div className="grid grid-cols-4 gap-2.5">
                {stores.map(
                  (store) => (
                   <a
  href={store.url}
  target="_blank"
  rel="noopener noreferrer"
  key={
    store.name
  }
                      className="flex h-[84px] flex-col items-center justify-center overflow-hidden rounded-[16px] border border-[#ebebeb] bg-white transition-all duration-200 hover:scale-[1.02] hover:border-[#dcdcdc] hover:bg-[#fafafa]"
                    >
                      <img
                        src={
                          store.image
                        }
                        alt={
                          store.name
                        }
                        className={`object-contain ${
                          store.name ===
                          "Wraith"
                            ? "max-h-[78px] max-w-[70px]"
                            : store.name ===
                                "Sahibinden"
                              ? "max-h-[72px] max-w-[62px]"
                              : store.name ===
                                  "Akakçe"
                                ? "max-h-[36px] max-w-[36px]"
                                : store.name ===
                                    "Pull&Bear"
                                  ? "max-h-[34px] max-w-[34px]"
                                  : "max-h-[34px] max-w-[34px]"
                        }`}
                      />

                      <p className="mt-2 px-1 text-center text-[10px] font-medium leading-[1.15] text-[#2a2a2a]">
                        {
                          store.name
                        }
                      </p>
                    </a>
                  )
                )}
              </div>
            </div>

            {/* LINK */}
            <div className="mt-6">
              <p className="mb-2 text-[13px] text-[#6f6f6f]">
                Paste
                product links
                from{" "}
                <span className="font-semibold text-black">
                  any store
                </span>
              </p>

              <input
                value={
                  productLink
                }
                onChange={(
                  e
                ) =>
                  setProductLink(
                    e.target
                      .value
                  )
                }
                placeholder="Paste link (e.g. https://amazon.com...)"
                className="h-[50px] w-full rounded-full border border-[#dcdcdc] bg-white px-5 text-[14px] outline-none transition-all duration-200 focus:border-black"
              />

              <button
                onClick={
                  handleContinue
                }
                className="mt-3 flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-black text-[15px] font-semibold text-white transition-all duration-200 hover:scale-[1.01]"
              >
                Continue

                <ArrowRight
                  size={17}
                />
              </button>
            </div>

            {/* DIVIDER */}
            <div className="my-5 flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-[#ececec]" />

              <span className="text-[13px] text-[#9c9c9c]">
                or
              </span>

              <div className="h-[1px] flex-1 bg-[#ececec]" />
            </div>

            {/* SEARCH */}
            <div>
              <p className="mb-3 text-[15px] font-semibold text-black">
                Search
                products &
                brands
              </p>

              <div className="flex items-center gap-2">
                <div className="flex h-[50px] flex-1 items-center gap-3 rounded-full border border-[#e4e4e4] bg-[#fafafa] px-4">
                  <Search
                    size={17}
                    className="text-[#9c9c9c]"
                  />

                  <input
                    placeholder="Search any product, brand or retailer"
                    className="w-full bg-transparent text-[14px] outline-none placeholder:text-[#9c9c9c]"
                  />
                </div>

                <button className="h-[50px] rounded-full bg-[#8d8d8d] px-6 text-[15px] font-semibold text-white transition hover:bg-[#7d7d7d]">
                  Search
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LOADING */}
        {step === "loading" && (
          <div className="flex h-[560px] flex-col items-center justify-center animate-[fadeIn_.25s_ease]">
            <div className="h-12 w-12 animate-spin rounded-full border-[4px] border-black border-t-transparent" />

            <h2 className="mt-6 text-[18px] font-bold text-black">
              Loading
            </h2>

            <p className="mt-1 text-[15px] text-[#6f6f6f]">
              Fetching
              product
              information...
            </p>
          </div>
        )}

{/* PRODUCT */}
{step === "product" && (
  <div className="animate-[fadeIn_.35s_ease]">
    {/* TITLE */}
    <h1 className="text-[30px] font-bold tracking-[-1.7px] text-black">
      Add Wish
    </h1>

 <div className="mt-3">
  {/* IMAGE */}
  <div className="relative h-[145px] w-full overflow-hidden rounded-[24px] border border-[#ececec] bg-[#fafafa]">
    <img
      src={
        productData?.image ||
        "/placeholder-logo.png"
      }
      alt="product"
      onError={(e) => {
        (
          e.target as HTMLImageElement
        ).src =
          "/placeholder-logo.png";
      }}
      className="h-full w-full object-contain scale-[1.22] p-2 transition-transform duration-300"
    />

    <a
      href={productLink}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all duration-200 hover:scale-105"
    >
      ↗
    </a>
  </div>

  {/* NAME */}
  <div className="mt-5">
    <p className="mb-2 text-[15px] font-semibold text-black">
      Name *
    </p>

  <textarea
  value={productTitle}
  onChange={(e) =>
    setProductTitle(
      e.target.value
    )
  }
  rows={2}
  className="
    min-h-[60px]
    max-h-[100px]
    w-full
    resize-none
    rounded-[22px]
    border
    border-[#dddddd]
    bg-white
    px-5
    py-4
    text-[15px]
    outline-none
    overflow-y-auto
  "
  style={{
    scrollbarWidth: "thin",
    scrollbarColor:
      "#111 #f3f3f3",
  }}
/>

  </div>

  {/* PRICE + QUANTITY */}
  <div className="mt-4 flex items-end gap-3">
    {/* PRICE */}
    <div className="w-[105px]">
      <p className="mb-2 text-[15px] font-semibold text-black">
        Price *
      </p>

      <input
        defaultValue={
          productData?.price || ""
        }
        className="h-[48px] w-full rounded-full border border-[#dddddd] bg-white px-5 text-[16px] font-medium outline-none transition focus:border-black"
      />
    </div>

    {/* CURRENCY */}
    <div className="w-[90px]">
      <select
  value={currency}
  onChange={(e) =>
    setCurrency(
      e.target.value
    )
  }
  className="h-[48px] w-full cursor-pointer rounded-full border border-[#dddddd] bg-[#fafafa] px-5 text-[14px] font-semibold outline-none transition hover:border-black"
>
        <option>TRY</option>
        <option>USD</option>
        <option>EUR</option>
        <option>GBP</option>
      </select>
    </div>

    {/* QUANTITY */}
    <div className="w-[220PX]">
      <p className="mb-2 text-[15px] font-semibold text-black">
        Quantity
      </p>

      <div className="flex h-[48px] items-center overflow-hidden rounded-full border border-[#dddddd] bg-white">
        <button
          type="button"
          onClick={() =>
            setQuantity((q) =>
              Math.max(1, q - 1)
            )
          }
          className="flex h-full w-[46px] items-center justify-center text-[24px] text-[#555] transition hover:bg-[#f5f5f5]"
        >
          -
        </button>

        <div className="flex h-full flex-1 items-center justify-center border-x border-[#dddddd] text-[15px] font-semibold">
          {quantity}
        </div>

        <button
          type="button"
          onClick={() =>
            setQuantity((q) =>
              q + 1
            )
          }
          className="flex h-full w-[46px] items-center justify-center text-[18px] text-[#555] transition hover:bg-[#f5f5f5]"
        >
          +
        </button>
      </div>
    </div>
  </div>
</div>
    {/* DESCRIPTION */}
    <div className="mt-4">
      <p className="mb-2 text-[15px] font-semibold text-black">
        Description
      </p>

      <textarea
      rows={1}
        placeholder="e.g. Size, Color, etc."
        className="min-h-[90px] w-full resize-none rounded-[22px] border border-[#dddddd] bg-white px-5 py-3 text-[15px] outline-none transition focus:border-black"
      />
    </div>

    {/* WISHLIST */}
    <div className="mt-3 flex items-end gap-2">
      <div className="flex-1">
        <p className="mb-2 text-[15px] font-semibold text-black">
          Wishlist *
        </p>

   <div className="relative">
  <button
    type="button"
    onClick={() =>
      setWishlistOpen(
        !wishlistOpen
      )
    }
    className="flex h-[46px] w-full items-center justify-between rounded-full border border-[#dddddd] bg-white px-5 text-[15px] font-medium"
  >
    <span>
      {selectedWishlist?.title ||
        "Select Wishlist"}
    </span>

    <span>⌄</span>
  </button>

  {wishlistOpen && (
    <div
      className="absolute top-[52px] z-50 max-h-[220px] w-full overflow-y-auto rounded-[18px] border border-[#dddddd] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor:
          "#111 #f3f3f3",
      }}
    >
      {wishlists.map(
        (wishlist) => (
          <button
            key={wishlist.id}
            type="button"
            onClick={() => {
              setSelectedWishlist(
                wishlist
              );

              setWishlistOpen(
                false
              );
            }}
            className="flex w-full items-center justify-between px-5 py-3 text-left transition hover:bg-[#f7f7f7]"
          >
            <span>
              {wishlist.title}
            </span>

            {selectedWishlist?.id ===
              wishlist.id && (
              <span>✓</span>
            )}
          </button>
        )
      )}
    </div>
  )}
</div>
      </div>

      <button className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-[#dddddd] bg-[#fafafa] text-[28px] transition hover:border-black">
        +
      </button>
    </div>

    {/* SAVE */}
    <button
  onClick={saveWish}
  className="mt-3 h-[52px] w-full rounded-full bg-black text-[17px] font-semibold text-white transition-all duration-200 hover:scale-[1.01]">
      {saving
  ? "Saving..."
  : "Save Wish"}
    </button>

    {/* BOTTOM FEATURES */}
    <div className="mt-2 grid grid-cols-3 gap-0 overflow-hidden rounded-[18px] border border-[#ececec] bg-[#fafafa]">
      {/* ITEM */}
      <div className="flex min-h-[52px] flex-col justify-center gap-1 px-3 py-1">
<Shield
  size={15}
  className="text-[#ffb800]"
/>

        <div>
          <p className="text-[13px] font-semibold text-black">
            Secure & Private
          </p>

          <p className="mt-1 text-[11px] leading-[1.4] text-[#8b8b8b]">
            Your wishes are safe
          </p>
        </div>
      </div>

      {/* ITEM */}
      <div className="flex min-h-[52px] flex-col justify-center gap-1 border-x border-[#ececec] px-4 py-2">
<Bell
  size={15}
  className="text-[#ffb800]"
/>

        <div>
          <p className="text-[15px] font-semibold text-black">
            Price Alerts
          </p>

          <p className="mt-1 text-[11px] leading-[1.4] text-[#8b8b8b]">
            Get notified when price drops
          </p>
        </div>
      </div>

      {/* ITEM */}
      <div className="flex min-h-[52px] flex-col justify-center gap-1 px-3 py-1">
<Heart
  size={15}
  className="text-[#ffb800]"
/>

        <div>
          <p className="text-[15px] font-semibold text-black">
            Organize Easily
          </p>

          <p className="mt-1 text-[11px] leading-[1.4] text-[#8b8b8b]">
            Keep your wishes organized
          </p>
        </div>
      </div>
    </div>
  </div>
)}

  
      </div>
    </div>
  );
}