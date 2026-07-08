"use client";

import {
  Search,
  X,
  Loader2,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
export default function AddFriendsModal({
  open,
  onClose,
}: Props) {
const [search, setSearch] =
  useState("");

const [users, setUsers] =
  useState<any[]>([]);

const [loading, setLoading] =
  useState(false);
  useEffect(() => {
  const searchUsers = async () => {
    if (!search.trim()) {
      setUsers([]);
      return;
    }

setLoading(true);

const {
  data: { user: currentUser },
} = await supabase.auth.getUser();

const { data, error } =
  await supabase
    .from("profiles")
    .select("*")
    .neq("id", currentUser?.id)
    .or(
      `username.ilike.%${search}%,full_name.ilike.%${search}%`
    )
    .limit(20);

if (!error) {
  setUsers(data || []);
}

setLoading(false);
};
  const timer = setTimeout(
    searchUsers,
    300
  );

  return () => clearTimeout(timer);
}, [search]);
 
if (!open) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[6px]"
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-5">

        <div
          className="
            relative
            flex
            h-[620px]
            w-full
            max-w-[680px]
            flex-col
            overflow-hidden
            rounded-[32px]
            bg-white
            shadow-[0_40px_120px_rgba(0,0,0,0.22)]
            animate-[slideUp_.25s_ease]
          "
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f5] transition hover:bg-[#ececec]"
          >
            <X size={22} />
          </button>

          {/* HEADER */}
          <div className="border-b border-[#efefef] px-8 pb-6 pt-8">

            <h2 className="text-center text-[38px] font-bold tracking-[-2px] text-black">
              Find Friends
            </h2>

            <p className="mt-2 text-center text-[15px] text-[#8a8a8a]">
              Discover users, browse wishlists and connect
              with people around the world.
            </p>

            {/* SEARCH */}
            <div className="relative mt-6">

              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8d8d8d]"
              />

              <input
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  placeholder="Search users..."
                className="
                  h-[58px]
                  w-full
                  rounded-full
                  border
                  border-[#e4e4e4]
                  bg-white
                  pl-14
                  pr-5
                  text-[16px]
                  font-medium
                  outline-none
                  transition
                  focus:border-black
                "
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto px-8 py-6">

            {/* LOADING */}

            {loading && (
              <div className="flex h-full flex-col items-center justify-center">

                <Loader2
                  size={40}
                  className="animate-spin"
                />

                <p className="mt-5 text-[16px] text-[#8a8a8a]">
                  Searching users...
                </p>
              </div>
            )}
{!loading &&
 search !== "" &&
 users.length === 0 && (
  <div className="flex h-full items-center justify-center">
    <p className="text-[#888]">
      No users found
    </p>
  </div>
)}
            {/* RESULTS */}

            {search !== "" &&
              !loading && (
                <div>

                  <h3 className="mb-5 text-[20px] font-bold text-black">
                    Search Results
                  </h3>

                  <div className="space-y-3">

                    {users.map(
                      (user) => (
                        <div
                          key={user.id}
                          className="
                            flex
                            items-center
                            justify-between
                            rounded-[20px]
                            border
                            border-[#ececec]
                            bg-white
                            p-4
                            transition-all
                            hover:border-[#d9d9d9]
                            hover:shadow-sm
                          "
                        >
                          <div className="flex items-center gap-4">

                            {user.avatar_url ? (
                              <img
                                src={user.avatar_url}
                                alt=""
                                className="h-14 w-14 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00897b] text-lg font-bold text-white">
                               {user.full_name?.charAt(0)}
                              </div>
                            )}

                            <div>

                              <h4 className="text-[17px] font-semibold text-black">
                                {user.full_name}
                              </h4>

                              <p className="text-[14px] text-[#777]">
                                {user.username}
                              </p>

                            </div>
                          </div>
<button
  className="
    h-[42px]
    cursor-pointer
    rounded-full
    bg-black
    px-6
    text-[13px]
    font-semibold
    text-white
    transition-all
    duration-300
    hover:scale-[1.05]
    hover:bg-[#3b82f6]
    hover:shadow-[0_8px_25px_rgba(59,130,246,0.35)]
    active:scale-[0.98]
  "
>
  Follow
</button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}