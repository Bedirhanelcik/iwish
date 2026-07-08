"use client";

import Image from "next/image";

const logos = [
  { src: "/brands/apple.png", className: "w-[42px]" },
  { src: "/brands/walmart.png", className: "w-[45px]" },
  { src: "/brands/gym.png", className: "w-[70px]" },
  { src: "/brands/icea.png", className: "w-[80px]" },
  { src: "/brands/etsy.png", className: "w-[55px]" },
  { src: "/brands/amazon.png", className: "w-[90px]" },
  { src: "/brands/Nike_Logo_1.png", className: "w-[85px]" },
  { src: "/brands/sneaksup.png", className: "w-[108px]" },
  { src: "/brands/trendyol.png", className: "w-[94px]" },
  { src: "/brands/zara.png", className: "w-[85px]" },
];


export default function LogoMarquee() {
  return (
    <section className="w-full py-20 overflow-hidden bg-white">
      <div className="w-full">
        <h2 className="text-center text-3xl font-bold text-black mb-16 mt-4">
          Add items from any store
        </h2>

        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r bg-gradient-to-r from-[#f8f8f8] to-transparent to-transparent pointer-events-none" />

          {/* Right Fade */}
          <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l bg-gradient-to-r from-white to-transparent to-transparent pointer-events-none" />

          <div className="flex min-w-max animate-marquee items-center gap-28 px-10">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex h-[72px] min-w-[140px] items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt="brand"
                  width={220}
                  height={80}
                  className={`h-auto object-contain transition-transform duration-300 hover:scale-105 ${logo.className}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}