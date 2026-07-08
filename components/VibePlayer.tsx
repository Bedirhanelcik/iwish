"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Star,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { Slider } from "@/components/ui/slider";

const vibes = [
  "VIBING",
  "VIBEANDO",
  "雰囲気",
  "ВАЙБ",
  "AMBIANCE",
  "MOOD",
];

const songs = [
  {
    title: "Stolen Dance",
    artist: "Milky Chance",
    src: "/music/1.sarki.mp3",
    cover: "/musics/sfoto4.jpg",
  },

  {
    title: "Beauty and a Beat",
    artist:
      "Justin Bieber & Nicki Minaj",
    src: "/music/2.sarki.mp3",
    cover: "/musics/sfoto1.jpg",
  },

  {
    title: "In Time",
    artist: "Robbie Robb",
    src: "/music/3.sarki.mp3",
    cover: "/musics/sfoto3.jpg",
  },

  {
    title: "Let It Happen",
    artist: "Tame Impala",
    src: "/music/4.sarki.mp3",
    cover: "/musics/sfoto2.jpg",
  },
];

export default function VibePlayer() {
  const [vibeIndex, setVibeIndex] =
    useState(0);

  const [started, setStarted] =
    useState(false);

  const [playing, setPlaying] =
    useState(false);

  const [songIndex, setSongIndex] =
    useState(0);

  const [progress, setProgress] =
    useState(0);

  const [volume, setVolume] =
    useState([100]);

  const [muted, setMuted] =
    useState(false);

  const [showRating, setShowRating] =
    useState(false);

  const [rating, setRating] =
    useState(0);

  const [ratings, setRatings] =
    useState<number[]>(
      Array(songs.length).fill(0)
    );

  const [direction, setDirection] =
    useState<"up" | "down">("down");

  const audioRef =
    useRef<HTMLAudioElement | null>(
      null
    );

  useEffect(() => {
    const interval = setInterval(() => {
      setVibeIndex((prev) =>
        prev === vibes.length - 1
          ? 0
          : prev + 1
      );
    }, 2000);

    return () =>
      clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.src =
      songs[songIndex].src;

    audioRef.current.load();

    audioRef.current.volume =
      muted
        ? 0
        : volume[0] / 100;

    if (playing) {
      setTimeout(() => {
        audioRef.current
          ?.play()
          .catch(() => {});
      }, 120);
    }

    setProgress(0);

    setShowRating(false);

    setRating(
      ratings[songIndex] || 0
    );
  }, [songIndex]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume =
      muted
        ? 0
        : volume[0] / 100;
  }, [volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateProgress = () => {
      if (!audio.duration) return;

      setProgress(
        (audio.currentTime /
          audio.duration) *
          100
      );
    };

    audio.addEventListener(
      "timeupdate",
      updateProgress
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        updateProgress
      );
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();

      setPlaying(false);
    } else {
      await audioRef.current
        .play()
        .catch(() => {});

      setPlaying(true);
    }
  };

  const nextSong = () => {
    setDirection("down");

    setSongIndex((prev) =>
      prev === songs.length - 1
        ? 0
        : prev + 1
    );
  };

  const previousSong = () => {
    setDirection("up");

    setSongIndex((prev) =>
      prev === 0
        ? songs.length - 1
        : prev - 1
    );
  };

  const handleRate = (
    selected: number
  ) => {
    setRating(selected);

    const updated = [...ratings];

    updated[songIndex] = selected;

    setRatings(updated);
  };

  return (
    <>
      <audio
        ref={audioRef}
        onEnded={nextSong}
      />

      {/* SABİT PANEL */}
      <div className="mx-auto mt-20 w-fit">
      
        <motion.div
          animate={{
            width: started
              ? 540
              : 455,

            height: started
              ? showRating
                ? 495
                : 410
              : 295,
          }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
          className="overflow-hidden rounded-[38px] border border-[#ececec] bg-[#fbfbfb] p-9 shadow-[0_15px_55px_rgba(0,0,0,0.08)]"
        >
          {!started ? (
            <div className="flex h-full flex-col justify-between">
              <div>
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={vibeIndex}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="text-[70px] font-bold tracking-[-4px] text-black"
                  >
                    {vibes[vibeIndex]}
                  </motion.h1>
                </AnimatePresence>

                <p className="mt-5 max-w-[340px] text-[19px] leading-[1.75] text-[#727272]">
                  Vibelamanız için seçtiğimiz
                  müzikleri dinleyin ve
                  tadını çıkarın.
                </p>
              </div>

              {/* START BUTTON */}
              <button
                onClick={() => {
                  setStarted(true);

                  setTimeout(() => {
                    toggleMusic();
                  }, 100);
                }}
                className="mt-5 flex h-[66px] items-center justify-center rounded-full bg-black text-[20px] font-semibold text-white transition hover:scale-[1.01]"
              >
                Start Vibing
              </button>
            </div>
          ) : (
            <div className="flex h-full flex-col">
              {/* TOP */}
              <div className="-mt-1 flex gap-6">
                <AnimatePresence
                  mode="wait"
                >
                  <motion.img
                    key={songIndex}
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -12,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: "easeInOut",
                    }}
                    src={
                      songs[songIndex]
                        .cover
                    }
                    alt="cover"
                    className="h-[148px] w-[148px] rounded-[30px] object-cover shadow-[0_10px_30px_rgba(0,0,0,0.16)]"
                  />
                </AnimatePresence>

                <div className="flex flex-1 flex-col justify-center overflow-hidden">
                  <p className="text-[12px] font-semibold tracking-[4px] text-[#8a8a8a]">
                    NOW PLAYING
                  </p>

                  <div className="mt-4 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={songIndex}
                        initial={{
                          opacity: 0,
                          y:
                            direction ===
                            "down"
                              ? 14
                              : -14,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y:
                            direction ===
                            "down"
                              ? -14
                              : 14,
                        }}
                        transition={{
                          duration: 0.45,
                          ease: "easeInOut",
                        }}
                      >
                        <h1 className="leading-[1.02] text-[33px] font-bold tracking-[-2px] text-black">
                          {
                            songs[
                              songIndex
                            ].title
                          }
                        </h1>

                        <p className="mt-3 text-[15px] leading-[1.45] text-[#747474]">
                          {
                            songs[
                              songIndex
                            ].artist
                          }
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* PROGRESS */}
              <div className="mt-6">
                <Slider
                  value={[progress]}
                  max={100}
                  step={1}
                  onValueChange={(
                    value
                  ) => {
                    setProgress(
                      value[0]
                    );

                    if (
                      audioRef.current
                    ) {
                      const duration =
                        audioRef
                          .current
                          .duration;

                      audioRef.current.currentTime =
                        (value[0] /
                          100) *
                        duration;
                    }
                  }}
                />
              </div>

              {/* PLAYER BUTTONS */}
              <div className="mt-7 flex items-center justify-center gap-8">
                <button
                  onClick={
                    previousSong
                  }
                  className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#f2f2f2] transition hover:scale-105"
                >
                  <SkipBack
                    size={23}
                  />
                </button>

                <button
                  onClick={
                    toggleMusic
                  }
                  className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-black text-white transition hover:scale-105"
                >
                  {playing ? (
                    <Pause
                      size={31}
                    />
                  ) : (
                    <Play
                      size={31}
                    />
                  )}
                </button>

                <button
                  onClick={nextSong}
                  className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#f2f2f2] transition hover:scale-105"
                >
                  <SkipForward
                    size={23}
                  />
                </button>
              </div>

              {/* VOLUME */}
              <div className="mt-7 flex items-center gap-4">
                <button
                  onClick={() =>
                    setMuted(
                      !muted
                    )
                  }
                >
                  {muted ? (
                    <VolumeX
                      size={21}
                      className="text-[#777]"
                    />
                  ) : (
                    <Volume2
                      size={21}
                      className="text-[#777]"
                    />
                  )}
                </button>

                <Slider
                  value={volume}
                  max={100}
                  step={1}
                  onValueChange={(
                    value
                  ) => {
                    setVolume(
                      value
                    );
                  }}
                />
              </div>

              {/* RATE */}
              {!showRating ? (
                <button
                  onClick={() =>
                    setShowRating(
                      true
                    )
                  }
                  className="mt-7 rounded-full border border-[#e5e5e5] bg-white py-3 text-[14px] font-semibold text-black transition hover:bg-[#f7f7f7]"
                >
                  Rate This Song
                </button>
              ) : (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-7 rounded-[24px] bg-[#f5f5f5] p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#777]"
                    >
                      Rate This Song
                    </p>

                    <button
                      onClick={() =>
                        setShowRating(
                          false
                        )
                      }
                      className="text-[12px] font-semibold text-[#8a8a8a] transition hover:text-black"
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-[3px]">
                    {[
                      1, 2, 3, 4, 5,
                      6, 7, 8, 9, 10,
                    ].map((star) => (
                      <button
                        key={star}
                        onClick={() =>
                          handleRate(
                            star
                          )
                        }
                        className="transition hover:scale-110"
                      >
                        <Star
                          size={21}
                          className={`${
                            rating >=
                            star
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-[#cccccc]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <p className="mt-4 text-center text-[13px] text-[#777]"
                  >
                    Your rating:{" "}
                    <span className="font-semibold text-black">
                      {rating}/10
                    </span>
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}