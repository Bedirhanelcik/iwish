"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Flame,
  Laugh,
  Star,
  Share2,
  Trash2,
  Pencil,
  Send,
  X,
} from "lucide-react";

export default function WishPage({
  params,
}: {
  params: Promise<{
    wishId: string;
  }>;
}) {
  const [wish, setWish] =
    useState<any>(null);
const MAX_COMMENT = 100;
  const [profile, setProfile] =
    useState<any>(null);
const [showAllComments, setShowAllComments] =
  useState(false);
  const [currentImage, setCurrentImage] =
    useState(0);

const [comment, setComment] =
  useState("");

const [comments, setComments] =
  useState<any[]>([]);

const [selectedReaction, setSelectedReaction] =
  useState<string | null>(null);

const [reactions, setReactions] =
  useState<any[]>([]);

  useEffect(() => {
    const loadWish = async () => {
      const { wishId } =
        await params;

      const { data } =
        await supabase
          .from("wishes")
          .select("*")
          .eq("id", wishId)
          .single();

      setWish(data);

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (user) {
        const {
          data: profileData,
        } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile(profileData);
        const { data: commentsData } =
  await supabase
    .from("wish_comments")
    .select(`
      *,
      profiles (
        full_name,
        avatar_url
      )
    `)
    .eq("wish_id", wishId)
    .order("created_at", {
      ascending: false,
    });

setComments(commentsData || []);

const { data: reactionData } =
  await supabase
    .from("wish_reactions")
    .select("*")
    .eq("wish_id", wishId);

setReactions(reactionData || []);

const myReaction =
  reactionData?.find(
    (r) => r.user_id === user.id
  );

if (myReaction) {
  setSelectedReaction(
    myReaction.reaction
  );
}
      }
    };

    loadWish();
  }, [params]);

  if (!wish) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  const images = [
    wish.image,
    ...(wish.gallery_images || []),
  ];

  const nextImage = () => {
    setCurrentImage(
      (prev) =>
        (prev + 1) %
        images.length
    );
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) =>
        prev === 0
          ? images.length - 1
          : prev - 1
    );
  };
  const sendComment = async () => {
  if (!comment.trim()) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from("wish_comments")
    .insert({
      wish_id: wish.id,
      user_id: user.id,
      comment,
    });

  const { data } =
    await supabase
      .from("wish_comments")
      .select(`
        *,
        profiles (
          full_name,
          avatar_url
        )
      `)
      .eq("wish_id", wish.id)
      .order("created_at", {
        ascending: false,
      });

  setComments(data || []);

  setComment("");
};
const react = async (emoji: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } =
    await supabase
      .from("wish_reactions")
      .upsert(
        {
          wish_id: wish.id,
          user_id: user.id,
          reaction: emoji,
        },
        {
          onConflict:
            "wish_id,user_id",
        }
      )
      .select();

  console.log("REACTION DATA:", data);
  console.log("REACTION ERROR:", error);

  if (error) return;

  setSelectedReaction(emoji);

  const { data: reactionsData } =
    await supabase
      .from("wish_reactions")
      .select("*")
      .eq("wish_id", wish.id);

  setReactions(reactionsData || []);
};
return (
  <div className="h-screen overflow-hidden bg-black/20 p-6 backdrop-blur-sm">

    <div className="relative mx-auto flex h-[92vh] max-w-[1600px] gap-6 rounded-[32px] bg-white p-4 shadow-xl">
      <button
  onClick={() => history.back()}
className="absolute right-5 top-5 z-[999] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#f3f3f3] transition-all duration-200 hover:scale-110 hover:bg-[#ececec]"
>
  <X size={22} />
</button>
        {/* LEFT */}
        <div className="relative w-[52%]">

          <div className="relative flex h-full min-h-[620px] items-center justify-center overflow-hidden rounded-[20px] border border-[#ececec] bg-white">

            <img
              src={
                images[currentImage]
              }
              alt={wish.title}
              className="h-[95%] w-[95%] object-contain"
            />

            <button
              onClick={
                prevImage
              }
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={
                nextImage
              }
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow"
            >
              <ChevronRight />
            </button>
          </div>

        
</div>
        {/* RIGHT */}
        <div className="flex w-[48%] flex-col py-4">

        <div className="flex items-start justify-between">

  <div>
    <p className="font-semibold text-[15px]">
      {profile?.full_name || "User"}
    </p>
  </div>


</div>

          <h1 className="mt-4 text-[26px] font-bold leading-[1.25]">
            {wish.title}
          </h1>

          <div className="mt-6 flex gap-3">

            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4f4f4]">
              <Pencil size={18} />
            </button>

            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4f4f4]">
              <Trash2 size={18} />
            </button>

            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4f4f4]">
              <Star size={18} />
            </button>

            <button className="rounded-full bg-[#f4f4f4] px-5">
              Share
            </button>
          </div>

          <div className="mt-4 text-[18px] font-semibold">
            {wish.price}
          </div>

          <p className="mt-3 text-sm text-[#8d8d8d]">
            {wish.description ||
              "No description"}
          </p>
<div className="mb-3 flex justify-end">
  <span className="text-[14px] text-[#8b8b8b]">
    1d ago
  </span>
</div>
          <button
            onClick={() =>
              window.open(
                wish.product_url,
                "_blank"
              )
            }
            className="mt-5 flex h-[42px] w-full items-center justify-center gap-3 rounded-full bg-black font-semibold text-white"
          >
            <img
              src={`https://www.google.com/s2/favicons?domain=${wish.domain}&sz=64`}
              alt=""
              className="h-5 w-5"
            />

            Buy at {wish.store}
          </button>

          <button className="mt-3 h-[42px] w-full rounded-full border font-medium">
            Mark as purchased
          </button>

          {/* REACTIONS */}

          <div className="mt-8">

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                Reactions
              </h3>

              <span className="text-[#888]">
                {reactions.length} Reactions
              </span>
            </div>

            <div className="flex gap-3">

  {[
    "👍",
    "😍",
    "❤️",
    "🔥",
    "😂",
    "😭",
  ].map((emoji) => {

   

    const active =
      selectedReaction === emoji;

    return (
      <button
        key={emoji}
        onClick={() =>
          react(emoji)
        }
        className={`flex items-center gap-2 rounded-full border px-4 py-2 transition-all ${
         active
  ? "bg-[#2563EB] text-white border-[#2563EB] shadow-[0_8px_25px_rgba(17,24,39,0.25)] scale-105"
  : "bg-white hover:bg-[#f8f8f8]"
        }`}
        
      >
        <span>{emoji}</span>

    
      </button>
    );
  })}
</div>
          </div>
<div className="mt-8 space-y-4">

  {(showAllComments
  ? comments
  : comments.slice(0, 4)
).map((item) => (

    <div
      key={item.id}
      className="flex gap-3"
    >

      {item.profiles?.avatar_url ? (
        <img
          src={
            item.profiles.avatar_url
          }
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00897b] text-white">
          {item.profiles?.full_name?.charAt(0)}
        </div>
      )}

      <div>

        <p className="font-semibold">
          {item.profiles?.full_name}
        </p>

        <p className="text-[#666]">
          {item.comment}
        </p>

      </div>

    </div>
  ))}

</div>
  <div className="mt-auto pt-8">

  {comments.length > 4 &&
    !showAllComments && (
      <button
        onClick={() =>
          setShowAllComments(true)
        }
        className="mb-4 text-sm font-medium text-[#2563EB] hover:underline"
      >
        Read all {comments.length} comments
      </button>
    )}

  {comments.length > 4 &&
    showAllComments && (
      <button
        onClick={() =>
          setShowAllComments(false)
        }
        className="mb-4 text-sm font-medium text-[#2563EB] hover:underline"
      >
        Show less
      </button>
    )}

  <div className="flex items-center gap-4">

    {profile?.avatar_url ? (
      <img
        src={profile.avatar_url}
        alt=""
        className="h-12 w-12 rounded-full object-cover"
      />
    ) : (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00897b] text-white">
        {profile?.full_name?.charAt(0) || "U"}
      </div>
    )}

    <input
      value={comment}
      maxLength={MAX_COMMENT}
      onChange={(e) =>
        setComment(e.target.value)
      }
      placeholder="Add a comment..."
      className="h-[54px] flex-1 rounded-full bg-[#f4f4f4] px-5 outline-none"
    />

    <div className="w-[55px] text-center text-xs text-[#888]">
      {comment.length}/{MAX_COMMENT}
    </div>

    <button
      onClick={sendComment}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white"
    >
      <Send size={18} />
    </button>

  </div>
</div>
        </div>
      </div>
    </div>
)
}
