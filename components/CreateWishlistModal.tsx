"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

import {
  X,
  ChevronDown,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Grip,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateWishlistModal({
  open,
  onClose,
}: Props) {
  const [showCalendar, setShowCalendar] =
    useState(false);

  const [showYearSelect, setShowYearSelect] =
    useState(false);

  const [showMonthSelect, setShowMonthSelect] =
    useState(false);

  const [mounted, setMounted] =
    useState(false);

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [eventDate, setEventDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentMonth, setCurrentMonth] =
    useState(new Date().getMonth());

  const [currentYear, setCurrentYear] =
    useState(new Date().getFullYear());

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
      }, 420);

      return () => clearTimeout(timeout);
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [open]);

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  const handleSaveWishlist = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

const slug =
  title
    .toLowerCase()
    .replace(/\s+/g, "-") +
  "-" +
  crypto.randomUUID().slice(0, 5);

      const { error } = await supabase
        .from("wishlists")
        .insert([
          {
            user_id: user.id,
            title,
            description,
            event_date: eventDate || null,
            slug,
          },
        ]);

      if (error) {
        console.error(error);
        return;
      }

      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center transition-opacity duration-500 ${
        open
          ? "opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/35 backdrop-blur-[8px] transition-all duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* MODAL */}
      <div
        className={`relative z-10 w-[560px] cursor-default rounded-[34px] bg-white px-9 pb-6 pt-6 shadow-[0_25px_80px_rgba(0,0,0,0.14)] transition-all duration-500 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-[12px] scale-[0.97] opacity-0"
        }`}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#f4f4f4] transition-all duration-200 hover:scale-[1.05] hover:bg-[#ececec]"
        >
          <X size={22} strokeWidth={2.3} />
        </button>

        {/* TITLE */}
        <h1 className="text-[38px] font-bold tracking-[-2px] text-black">
          Create Wishlist
        </h1>

        {/* TITLE INPUT */}
        <div className="mt-7">
          <p className="mb-3 text-[15px] font-semibold text-black">
            Title *
          </p>

          <input
            maxLength={40}
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Title (e.g. Birthday List)"
            className="h-[60px] w-full cursor-text rounded-full border border-[#dddddd] bg-white px-6 text-[16px] caret-black outline-none transition-all duration-200 focus:border-black focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]"
          />
        </div>

        {/* DATE */}
        <div className="relative mt-6">
          <p className="mb-3 text-[15px] font-semibold text-black">
            Event Date (optional)
          </p>

          <button
            onClick={() => {
              setShowCalendar(
                !showCalendar
              );

              if (!showCalendar) {
                setShowMonthSelect(false);
                setShowYearSelect(false);
              }
            }}
            className="flex h-[60px] w-full cursor-pointer items-center justify-between rounded-full border border-[#dddddd] bg-white px-6 text-[16px] text-[#7f7f7f] transition-all duration-200 hover:border-[#bfbfbf]"
          >
            {eventDate || "Pick a date"}

            <ChevronDown
              size={20}
              strokeWidth={2}
            />
          </button>

          {/* CALENDAR */}
          {showCalendar && (
            <div className="absolute left-0 top-[102px] z-50 w-[400px] rounded-[28px] border border-[#ececec] bg-white p-6 shadow-[0_25px_60px_rgba(0,0,0,0.14)] animate-[calendarShow_.24s_cubic-bezier(0.16,1,0.3,1)]">
              {/* HEADER */}
              <div className="mb-6 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (currentMonth === 0) {
                      setCurrentMonth(11);

                      setCurrentYear(
                        (prev) => prev - 1
                      );
                    } else {
                      setCurrentMonth(
                        (prev) => prev - 1
                      );
                    }
                  }}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f3f3f3]"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex items-center gap-3">
                  {/* MONTH */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowMonthSelect(
                          !showMonthSelect
                        );

                        setShowYearSelect(
                          false
                        );
                      }}
                      className="flex h-[42px] cursor-pointer items-center gap-2 rounded-[14px] border border-[#e5e5e5] px-5 text-[15px] font-medium"
                    >
                      {months[currentMonth]}

                      <ChevronDown size={16} />
                    </button>

                    {showMonthSelect && (
                      <div className="absolute top-[52px] z-50 h-[360px] w-[190px] overflow-y-auto rounded-[22px] border border-[#e5e5e5] bg-white p-2 shadow-2xl">
                        {months.map(
                          (
                            month,
                            index
                          ) => (
                            <button
                              key={month}
                              onClick={() => {
                                setCurrentMonth(
                                  index
                                );

                                setShowMonthSelect(
                                  false
                                );
                              }}
                              className={`mb-1 flex w-full cursor-pointer rounded-[14px] px-4 py-3 text-left text-[15px] transition ${
                                currentMonth ===
                                index
                                  ? "bg-black text-white"
                                  : "hover:bg-[#f3f3f3]"
                              }`}
                            >
                              {month}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  {/* YEAR */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowYearSelect(
                          !showYearSelect
                        );

                        setShowMonthSelect(
                          false
                        );
                      }}
                      className="flex h-[42px] cursor-pointer items-center gap-2 rounded-[14px] border border-[#e5e5e5] px-5 text-[15px] font-medium"
                    >
                      {currentYear}

                      <ChevronDown size={16} />
                    </button>

                    {showYearSelect && (
                      <div className="absolute top-[52px] z-50 h-[360px] w-[150px] overflow-y-auto rounded-[22px] border border-[#e5e5e5] bg-white p-2 shadow-2xl">
                        {Array.from(
                          {
                            length: 13,
                          },
                          (_, i) =>
                            2026 + i
                        ).map((year) => (
                          <button
                            key={year}
                            onClick={() => {
                              setCurrentYear(
                                year
                              );

                              setShowYearSelect(
                                false
                              );
                            }}
                            className={`mb-1 flex w-full cursor-pointer rounded-[14px] px-4 py-3 text-left text-[15px] transition ${
                              currentYear ===
                              year
                                ? "bg-black text-white"
                                : "hover:bg-[#f3f3f3]"
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (
                      currentMonth === 11
                    ) {
                      setCurrentMonth(0);

                      setCurrentYear(
                        (prev) => prev + 1
                      );
                    } else {
                      setCurrentMonth(
                        (prev) => prev + 1
                      );
                    }
                  }}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f3f3f3]"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* DAYS */}
              <div className="grid grid-cols-7 gap-y-3 text-center">
                {[
                  "Su",
                  "Mo",
                  "Tu",
                  "We",
                  "Th",
                  "Fr",
                  "Sa",
                ].map((day) => (
                  <div
                    key={day}
                    className="mb-2 text-[13px] font-medium text-[#9d9d9d]"
                  >
                    {day}
                  </div>
                ))}

                {Array.from({
                  length: firstDay,
                }).map((_, i) => (
                  <div key={i}></div>
                ))}

                {Array.from(
                  {
                    length:
                      daysInMonth,
                  },
                  (_, i) => i + 1
                ).map((day) => (
                  <button
                    key={day}
                    onClick={() => {
                      const formattedMonth =
                        String(
                          currentMonth + 1
                        ).padStart(
                          2,
                          "0"
                        );

                      const formattedDay =
                        String(day).padStart(
                          2,
                          "0"
                        );

                      setEventDate(
                        `${currentYear}-${formattedMonth}-${formattedDay}`
                      );

                      setShowCalendar(
                        false
                      );

                      setShowMonthSelect(
                        false
                      );

                      setShowYearSelect(
                        false
                      );
                    }}
                    className="mx-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[14px] text-black transition-all duration-150 hover:bg-black hover:text-white"
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">
          <p className="mb-3 text-[15px] font-semibold text-black">
            Description (optional)
          </p>

          <div className="relative">
            <textarea
              maxLength={500}
              ref={textareaRef}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Enter a description"
              className="min-h-[110px] max-h-[340px] w-full resize-y overflow-auto scroll-smooth cursor-text rounded-[24px] border border-[#dddddd] bg-white px-6 py-4 pr-12 text-[16px] caret-black outline-none transition-all duration-200 focus:border-black focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]"
            />

            <Grip
              size={15}
              className="pointer-events-none absolute bottom-4 right-4 text-[#bcbcbc]"
            />
          </div>
        </div>

        {/* OPTIONS */}
        <button className="mt-6 flex cursor-pointer items-center gap-2 text-[15px] font-semibold text-black transition hover:opacity-70">
          <SlidersHorizontal
            size={17}
            strokeWidth={2.2}
          />

          More Options

          <ChevronDown
            size={17}
            strokeWidth={2.2}
          />
        </button>

        {/* ACTIONS */}
        <div className="mt-8 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="h-[52px] cursor-pointer rounded-full bg-[#f3f3f3] px-8 text-[16px] font-medium text-black transition-all duration-200 hover:bg-[#ebebeb]"
          >
            Cancel
          </button>

          <button
            onClick={
              handleSaveWishlist
            }
            disabled={
              loading ||
              !title.trim()
            }
            className="h-[52px] cursor-pointer rounded-full bg-black px-9 text-[16px] font-semibold text-white transition-all duration-200 hover:scale-[1.015] active:scale-[0.98] disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Save Wishlist"}
          </button>
        </div>
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        textarea::-webkit-scrollbar,
        div::-webkit-scrollbar {
          width: 8px;
        }

        textarea::-webkit-scrollbar-thumb,
        div::-webkit-scrollbar-thumb {
          background: #d8d8d8;
          border-radius: 999px;
        }

        textarea::-webkit-scrollbar-thumb:hover,
        div::-webkit-scrollbar-thumb:hover {
          background: #bcbcbc;
        }

        @keyframes calendarShow {
          from {
            opacity: 0;
            transform: translateY(-8px)
              scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0)
              scale(1);
          }
        }
      `}</style>
    </div>
  );
}