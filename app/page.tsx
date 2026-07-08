"use client"

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import OnboardingModal from "@/components/OnboardingModal";
import { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal"
import { Search, ChevronRight, Bell } from "lucide-react"
import Image from "next/image"
import HowItWorks from "@/components/HowItWorks";
import { TestimonialsMinimal } from "@/components/AnimatedQuotes"
import ShimmerText from "@/components/ShimmerText"
import LogoMarquee from "@/components/LogoMarquee"

export default function ListfulLanding() {
  const [user, setUser] = useState<any>(null);
const [showOnboarding, setShowOnboarding] = useState(false);

useEffect(() => {
  const loadUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return;

    setUser(session.user);

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (!profile) {
      setShowOnboarding(true);
      return;
    }

    if (!profile.onboarding_completed) {
      setShowOnboarding(true);
      return;
    }

    setShowOnboarding(false);
  };

  loadUser();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (
        event === "SIGNED_IN" &&
        session?.user
      ) {
        setUser(session.user);

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (!profile) {
          setShowOnboarding(true);
          return;
        }

        if (!profile.onboarding_completed) {
          setShowOnboarding(true);
          return;
        }

        setShowOnboarding(false);
      }
    }
  );

  return () => {
    subscription.unsubscribe();
  };
}, []);
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  useEffect(() => {
  document.body.style.userSelect = "none";

  const preventDrag = (e: DragEvent) => {
    e.preventDefault();
  };

  document.addEventListener("dragstart", preventDrag);

  return () => {
    document.removeEventListener("dragstart", preventDrag);
  };
}, []);

return (
<div
  className="min-h-screen select-none"
  style={{
   background:
  "linear-gradient(to bottom, #f8f8f8 0%, #f8f8f8 915px, white 915px, white 100%)"
  }}
  onContextMenu={(e) => e.preventDefault()}
>
    
    {/* Header */}
    <header className="relative z-[9999] w-full bg-[#f8f8f8]">
      
<div className="mx-auto flex h-[82px] w-full items-center justify-between px-[48px] xl:px-[72px] 2xl:px-[96px]">

  {/* LEFT */}
  <div className="flex items-center gap-14">

    {/* LOGO */}
    <div className="flex items-center gap-4 shrink-0 cursor-pointer">

      <Image
        src="/mainlogo.png"
        alt="Iwish Logo"
        width={102}
        height={52}
        className="object-contain scale-[2.05]"
      />
    </div>

{/* NAV LINKS */}
<nav className="relative z-[9999] hidden xl:flex items-center gap-10 select-none">

  <button
    onMouseEnter={(e) => {
      e.currentTarget.style.color = "#2563eb";
      e.currentTarget.style.textShadow =
        "0 0 12px rgba(37,99,235,0.25)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = "#6f6f6f";
      e.currentTarget.style.textShadow = "none";
    }}
    onClick={() => {
      if (!user) {
        setAuthMode("signup");
        setAuthOpen(true);
        return;
      }

      window.location.href = "/wishlist";
    }}
    className="relative top-[4px] cursor-pointer text-[15npx] font-semibold text-[#6f6f6f] transition-all duration-300"
  >
    Wishlist
  </button>

  <button
    onMouseEnter={(e) => {
      e.currentTarget.style.color = "#2563eb";
      e.currentTarget.style.textShadow =
        "0 0 12px rgba(37,99,235,0.25)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = "#6f6f6f";
      e.currentTarget.style.textShadow = "none";
    }}
    onClick={() => {
      if (!user) {
        setAuthMode("signup");
        setAuthOpen(true);
        return;
      }

      window.location.href = "/activity";
    }}
    className="relative top-[4px] cursor-pointer text-[15px] font-semibold text-[#6f6f6f] transition-all duration-300"
  >
    Activity
  </button>

  <button
    onMouseEnter={(e) => {
      e.currentTarget.style.color = "#2563eb";
      e.currentTarget.style.textShadow =
        "0 0 12px rgba(37,99,235,0.25)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = "#6f6f6f";
      e.currentTarget.style.textShadow = "none";
    }}
    onClick={() => {
      if (!user) {
        setAuthMode("signup");
        setAuthOpen(true);
        return;
      }
    }}
    className="relative top-[4px] cursor-pointer text-[15px] font-semibold text-[#6f6f6f] transition-all duration-300"
  >
    Gift Ideas
  </button>

</nav>
</div>
{/* RIGHT */}
<div className="flex items-center gap-5 shrink-0">

    {/* SEARCH */}
    <div className="hidden lg:flex items-center bg-[#efefef] rounded-full px-4 py-2.5 w-[260px]">
      <Search className="w-4 h-4 text-gray-400 mr-2" />

      <input
        type="text"
        placeholder="Find users"
        className="bg-transparent text-sm outline-none w-full text-gray-600 placeholder-gray-400"
      />
    </div>

    {/* LOGIN */}
    <button
      onClick={() => {
        setAuthMode("login")
        setAuthOpen(true)
      }}
      className="text-gray-800 font-medium text-sm hover:text-blue-500 transition-all duration-300 cursor-pointer"
    >
      Login
    </button>

    {/* SIGNUP */}
    <button
      onClick={() => {
        setAuthMode("signup")
        setAuthOpen(true)
      }}
      className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
    >
      Sign Up
    </button>
  </div>
</div>
      </header>

      {/* Main Content */}
      <main
  className="relative overflow-hidden px-6 py-12 select-none"
  onDragStart={(e) => e.preventDefault()}
>
        <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between gap-24 px-[72px] 2xl:px-[96px]">
          {/* Left Content */}
          <div className="w-[46%] max-w-[720px] pt-14">
            {/* Headline */}
            <h1 className="text-4xl lg:text-[52px] font-bold text-gray-900 leading-[1.05] mb-6">
Create Your{" "}
<ShimmerText
  variant="blue"
  className="font-bold relative top-[1px]"
>
  Wishlist
</ShimmerText>
            </h1>
            
            {/* Description */}
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              Create beautiful wishlists for fashion, tech, gaming, gifting & more. Save products from anywhere, organize your collections, and share your favorites with friends.
            </p>
            
            {/* CTA Button */}
            <div className="flex items-center gap-4 mb-10 -mt-3">
            <button
  onClick={() => {
    setAuthMode("signup");
    setAuthOpen(true);
  }}
  className="bg-gray-900 text-white px-6 py-3.5 rounded-full font-medium flex items-center gap-2 hover:bg-gray-800 transition-all hover:scale-[1.03] hover:shadow-lg"
>
  Get Started

  <ChevronRight className="w-4 h-4" />
</button>
              <span className="text-gray-400 text-sm">{"It's Free!"}</span>
            </div>
            <TestimonialsMinimal />
             </div>

          {/* Right Content - Browser Mockup */}
          <div className="relative flex w-[54%] justify-end">
         


<div
  className="absolute top-40 -right-12 w-32 h-32 rounded-full blur-3xl bg-blue-400/30"
></div>

<div
  className="absolute bottom-12 -left-10 w-28 h-28 rounded-full blur-3xl bg-blue-300/30"
></div>
          

            {/* Browser Window */}
            <div className="relative z-0 w-full overflow-hidden rounded-[28px] bg-white border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              {/* Browser Chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <div className="w-4 h-4 rounded bg-gray-200"></div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 bg-gray-100 rounded-full px-5 py-1.5 w-[320px]">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <span className="text-xs text-gray-500 font-medium">
  Iwish.app
</span>
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              {/* App Header */}
              <div className="flex items-center justify-between px-3 py1 border-b border-gray-100">
                <div className="flex items-center gap-0">
   
<div className="flex items-center w-[45px] overflow-visible">
  <img
    src="/mainlogo.png"
    alt="IWish"
    draggable={false}
    className="w-[90px] max-w-none object-contain scale-[1.6] origin-left"
  />
</div>
                </div>
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-gray-400" />
                  <img
  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200"
  alt="Profile"
  draggable={false}
  className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200"
/>
                </div>
              </div>
              
              {/* Wishlist Content */}
              <div className="p-5">
                {/* Avatars and Title */}
                <div className="flex items-start justify-between mb-4">
                  <div>
   
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-2xl tracking-tight text-[#000000]">
  My Dream Wishlist 🛍️
</h2>
                      <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-[13px]">
  Save products from any store and share them.
</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="1.5"/>
                        <circle cx="6" cy="12" r="1.5"/>
                        <circle cx="18" cy="12" r="1.5"/>
                      </svg>
                    </button>
                    <button className="px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">Share</button>
                    <button className="px-4 py-1.5 rounded-full bg-[#ef4444] text-white text-sm font-medium flex items-center gap-1 hover:bg-[#dc2626] transition-colors">
                      <span>+</span> Add Wish
                    </button>
                  </div>
                </div>
                
                {/* Product Grid */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {/* Nike Cortez */}
                  <div className="bg-[#7cf5a5] rounded-xl p-3 relative hover:scale-[1.03] hover:shadow-lg transition-transform cursor-pointer">
                    <span className="absolute top-2 left-2 bg-white text-xs px-2 py-0.5 rounded-full text-gray-600">Reserved</span>
                   <div className="h-24 flex items-center justify-center mb-3">
  <img
  draggable={false}
    src="/landingsafari/bag.png"
    alt="iPhone 17 Pro"
    className="h-full object-contain"
  />
</div>
                    <p className="text-xs font-medium text-[#2d5a3a]">Louis Vuitton Handbag</p>
                    <p className="text-xs text-[#3d7a4a]">$1,199</p>
                  </div>
                  
                  {/* MacBook Air M4 */}
                  <div className="bg-gray-50 rounded-xl p-3 hover:scale-[1.03] hover:shadow-lg transition-transform cursor-pointer">
                    <div className="h-24 flex items-center justify-center mb-3">
                      <img
  src="/landingsafari/mac.png"
  alt="MacBook"
  draggable={false}
  className="h-full object-contain"
/>
                    </div>
                    <p className="text-xs font-medium text-gray-800">MacBook Air M4</p>
                    <p className="text-xs text-gray-500">$1,099</p>
                  </div>
                  
                  {/* KitchenAid */}
                  <div className="bg-gray-50 rounded-xl p-3 hover:scale-[1.03] hover:shadow-lg transition-transform cursor-pointer">
                    <div className="h-24 flex items-center justify-center mb-3">
   <img
  src="/landingsafari/robot.png"
  alt="Elixir"
  draggable={false}
  className="h-full object-contain"
/>
                    </div>
                    <p className="text-xs font-medium text-gray-800">KitchenAid Stand Mixer</p>
                    <p className="text-xs text-gray-500">$549</p>
                  </div>
                  
                  {/*Impact Whey Protein */}
                  <div className="bg-gray-50 rounded-xl p-3 hover:scale-[1.03] hover:shadow-lg transition-transform cursor-pointer">
                    <div className="h-24 flex items-center justify-center mb-3">
                      <img
  src="/landingsafari/protein.png"
  alt="LEGO"
  draggable={false}
  className="h-full object-contain"
/>
                    </div>
                    <p className="text-xs font-medium text-gray-800">Impact Whey Protein</p>
                    <p className="text-xs text-gray-500">$69</p>
                  </div>
                  
                  {/* Sony Alpha A7 IV */}
                  <div className="bg-gray-50 rounded-xl p-3 hover:scale-[1.03] hover:shadow-lg transition-transform cursor-pointer">
                    <div className="h-24 flex items-center justify-center mb-3">
                      <img
  src="/landingsafari/sony.png"
  alt="Sony"
  draggable={false}
  className="h-full object-contain"
 />
                    </div>
                    <p className="text-xs font-medium text-gray-800">Sony Alpha A7 IV</p>
                    <p className="text-xs text-gray-500">$2,499</p>
                  </div>
                  
                  {/* Nike Free Run */}
                  <div className="bg-gray-50 rounded-xl p-3 hover:scale-[1.03] hover:shadow-lg transition-transform cursor-pointer">
                    <div className="h-24 flex items-center justify-center mb-3">
                      <img
  src="/landingsafari/nikeshoes.png"
  alt="Nike"
  draggable={false}
  className="h-full object-contain"
/>
                    </div>
                    <p className="text-xs font-medium text-gray-800">Nike Free Run</p>
                    <p className="text-xs text-gray-500">$150</p>
                  </div>
                  
                  {/* Weekender Bag */}
                  <div className="bg-gray-50 rounded-xl p-3 hover:scale-[1.03] hover:shadow-lg transition-transform cursor-pointer">
                    <div className="h-24 flex items-center justify-center mb-3">
                      <img
                      draggable={false}
  src="/landingsafari/lego.png"
  alt="Protein"
  className="h-full object-contain"
/>
                    </div>
                    <p className="text-xs font-medium text-gray-800">LEGO Star Wars</p>
                    <p className="text-xs text-gray-500">$120</p>
                  </div>
                  
                  {/* Jean Paul Gaultier Le Male Elixir */}
                  <div className="bg-gray-50 rounded-xl p-3 hover:scale-[1.03] hover:shadow-lg transition-transform cursor-pointer">
                    <div className="h-24 flex items-center justify-center mb-3">
                      <img
  src="/landingsafari/elixir.png"
  alt="KitchenAid"
  draggable={false}
  className="h-full object-contain"
/>
                    </div>
                    <p className="text-xs font-medium text-gray-800">Jean Paul Gaultier Le Male Elixir</p>
                    <p className="text-xs text-gray-500">$374</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 right-0 top-[800px] bottom-0 bg-white -z-10"></div>
<div className="mt-41 w-full overflow-hidden">
  <LogoMarquee />
</div>
<HowItWorks />
<AuthModal
  isOpen={authOpen}
  onClose={() => setAuthOpen(false)}
  mode={authMode}
  setMode={setAuthMode}
/>
<OnboardingModal
  isOpen={showOnboarding}
  user={user}
  onComplete={() => setShowOnboarding(false)}
/>
      </main>
    </div>
  )
}
