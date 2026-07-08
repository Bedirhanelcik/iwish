"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  X,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  wishlist: any;
  onUpdated: (updated: any) => void;
};

export default function EditWishlistModal({
  open,
  onClose,
  wishlist,
  onUpdated,
}: Props) {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [eventDate, setEventDate] =
    useState("");

  useEffect(() => {
    if (!wishlist) return;

    setTitle(
      wishlist.title || ""
    );

    setDescription(
      wishlist.description || ""
    );

    setEventDate(
      wishlist.event_date || ""
    );
  }, [wishlist]);

  if (!open) return null;

  const saveWishlist = async () => {
    console.log(
  "WISHLIST ID:",
  wishlist?.id
);
  if (!wishlist?.id) {
    alert("Wishlist not found");
    return;
  }

  const { data, error } =
    await supabase
      .from("wishlists")
      .update({
        title,
        description,
        event_date:
          eventDate || null,
      })
      .eq(
        "id",
        wishlist.id
      )
      .select();

  console.log(
    "UPDATE DATA:",
    data
  );

  console.log(
    "UPDATE ERROR:",
    error
  );

  if (error) {
    alert(error.message);
    return;
  }

  if (
    !data ||
    data.length === 0
  ) {
    alert(
      "Update returned no rows"
    );
    return;
  }

  onUpdated(data[0]);

  onClose();
};

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-black/10 backdrop-blur-[1px]"
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="absolute left-1/2 top-1/2 w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-[26px] bg-white p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f5]"
        >
          <X size={18} />
        </button>

        <h2 className="mb-6 text-[28px] font-bold">
          Edit Wishlist
        </h2>

        <label className="mb-2 block text-[14px] font-medium">
          Title *
        </label>

        <input
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="mb-5 h-[56px] w-full rounded-full border border-[#e8e8e8] px-5 outline-none"
        />

        <label className="mb-2 block text-[14px] font-medium">
          Event Date
        </label>

        <input
          type="date"
          value={eventDate}
          onChange={(e) =>
            setEventDate(
              e.target.value
            )
          }
          className="mb-5 h-[56px] w-full rounded-full border border-[#e8e8e8] px-5 outline-none"
        />

        <label className="mb-2 block text-[14px] font-medium">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          placeholder="Enter a description"
          className="h-[95px] w-full resize-none rounded-[18px] border border-[#e8e8e8] p-4 outline-none"
        />

        <button className="mt-5 flex w-full items-center justify-between py-2 text-[18px] font-medium">
          <div className="flex items-center gap-3">
            <SlidersHorizontal
              size={18}
            />
            More Options
          </div>

          <ChevronDown
            size={18}
          />
        </button>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-full bg-[#f3f3f3] px-6 py-3 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={saveWishlist}
            className="rounded-full bg-black px-6 py-3 font-semibold text-white"
          >
            Save Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}