"use client";

import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  setMode: (mode: "login" | "signup") => void;
}   

export default function AuthModal({
  isOpen,
  onClose,
  mode,
  setMode,
}: AuthModalProps) {
const handleGoogleLogin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000",
    },
  });
};
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-[4px]"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[420px] rounded-[28px] bg-white px-7 pt-10 pb-7 shadow-[0_20px_80px_rgba(0,0,0,0.16)] animate-in fade-in zoom-in duration-200">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f5] text-[28px] font-light text-black transition-all duration-200 hover:bg-[#ececec]"
        >
          ×
        </button>

        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <Image
            src="iwishlogo.png"
            alt="Iwish"
            width={110}
            height={24}
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h1
          className={`text-center font-bold tracking-[-2px] text-black leading-none ${
            mode === "login"
              ? "text-[30px]"
              : "text-[28px]"
          }`}
        >
          {mode === "login"
            ? "Welcome back"
            : "Create your account"}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-center text-[14px] text-[#7b7b7b]">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
            <span
  onClick={() => setMode("signup")}
  className="cursor-pointer font-medium text-black underline underline-offset-2 hover:opacity-70"
>
  Sign Up
</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
          <span
  onClick={() => setMode("login")}
  className="cursor-pointer font-medium text-black underline underline-offset-2 hover:opacity-70"
>
  Login
</span>
            </>
          )}
        </p>

        {/* Google Button */}
        <button 
        onClick={handleGoogleLogin}
        className="mt-6 flex h-[56px] w-full items-center justify-center gap-3 rounded-full border border-[#e7e7e7] bg-white text-[17px] font-medium text-black transition-all duration-200 hover:bg-[#f8f8f8]">

          {/* Google Icon */}
          <svg width="21" height="21" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303C33.659 32.657 29.233 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="M6.306 14.691l6.571 4.819C14.655 16.108 19.003 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.211 0-9.623-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303c-.793 2.311-2.231 4.328-4.084 5.57.001-.001 6.19 5.238 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>

          {mode === "login"
            ? "Sign in with Google"
            : "Sign up with Google"}
        </button>

        {/* Divider */}
        <div className="my-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#e7e7e7]" />
          <span className="text-[12px] font-medium text-[#a0a0a0]">
            OR
          </span>
          <div className="h-px flex-1 bg-[#e7e7e7]" />
        </div>

        {/* Email */}
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email address"
            className="h-[58px] w-full rounded-full border border-[#e7e7e7] bg-white px-7 text-[17px] text-black outline-none transition-all duration-200 placeholder:text-[#9f9f9f] focus:border-[#d2d2d2]"
          />

          <button className="h-[58px] w-full rounded-full bg-black text-[19px] font-semibold text-white transition-all duration-200 hover:bg-[#111] active:scale-[0.99]">
            Continue
          </button>
        </div>

        {/* Terms */}
        {mode === "signup" && (
          <p className="mt-5 px-5 text-center text-[11px] leading-5 text-[#9b9b9b]">
            By signing up you agree to our Terms of Service,
            Arbitration Provision and Privacy Policy
          </p>
        )}
      </div>
    </div>
  );
}