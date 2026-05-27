"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Users,
  ShieldAlert,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  LockKeyhole,
  Bell,
  RefreshCw,
  Sparkles,
  Star,
  CheckCircle2,
} from "lucide-react";

interface AuthScreensProps {
  onSuccess: (userData: { name: string; email: string }) => void;
}

export default function AuthScreens({ onSuccess }: AuthScreensProps) {
  const [view, setView] = useState<"login" | "register" | "otp">("login");

  // Inputs
  const [email, setEmail] = useState("sarah.jenkins@dixon.com");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("Sarah Jenkins");
  const [familyRole, setFamilyRole] = useState("parent");

  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  // OTP
  const [otp, setOtp] = useState<string[]>(["1", "2", "3", "4", "5", "6"]);

  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpFailed, setOtpFailed] = useState(false);

  const otpRefs = useRef<HTMLInputElement[]>([]);

  const assignRef = (el: HTMLInputElement | null, idx: number) => {
    if (el) otpRefs.current[idx] = el;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView("otp");
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView("otp");
  };

  const handleOtpChange = (val: string, index: number) => {
    if (isNaN(Number(val)) && val !== "") return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val !== "" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();

    setOtpVerifying(true);
    setOtpFailed(false);

    setTimeout(() => {
      const code = otp.join("");

      if (code.length === 6) {
        setOtpVerifying(false);

        onSuccess({
          name: fullName,
          email,
        });
      } else {
        setOtpVerifying(false);
        setOtpFailed(true);
      }
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07110d] text-white">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-120px] left-[-100px] h-[320px] w-[320px] rounded-full bg-[#1e8d6d]/20 blur-[120px]" />
        <div className="absolute bottom-[-140px] right-[-120px] h-[380px] w-[380px] rounded-full bg-[#d7b36a]/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)]" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b border-white/10 bg-black/20 px-6 backdrop-blur-xl md:px-14">
        <div className="flex items-center gap-3">
          {view === "otp" && (
            <button
              onClick={() => setView("login")}
              className="rounded-full border border-white/10 bg-white/5 p-2 transition-all hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 text-white" />
            </button>
          )}

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d7b36a] to-[#8f6b2d] shadow-lg shadow-[#d7b36a]/20">
              <Sparkles className="h-5 w-5 text-black" />
            </div>

            <div>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-white">
                DiXon
              </h1>

              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Wellness Intelligence
              </p>
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 md:flex">
          <ShieldCheck className="h-4 w-4 text-[#d7b36a]" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Clinical-grade Security
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 pb-12 pt-32">
        <div className="grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2">
          {/* LEFT PANEL */}
          <div className="hidden flex-col justify-center lg:flex">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d7b36a]/20 bg-[#d7b36a]/10 px-4 py-2">
                  <Star className="h-4 w-4 text-[#d7b36a]" />

                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d7b36a]">
                    Premium Family Wellness
                  </span>
                </div>

                <h2 className="max-w-xl font-serif text-6xl font-bold leading-[1.05] tracking-tight text-white">
                  Wellness Built Around Your Family.
                </h2>

                <p className="max-w-xl text-lg leading-relaxed text-white/60">
                  Secure access to personalized supplement intelligence,
                  pediatric health insights, metabolic analytics, and premium
                  wellness tracking.
                </p>
              </div>

              {/* Bento Cards */}
              <div className="grid grid-cols-2 gap-5">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d7b36a]/10">
                    <ShieldCheck className="h-6 w-6 text-[#d7b36a]" />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-white">
                    Clinical Security
                  </h3>

                  <p className="text-sm leading-relaxed text-white/55">
                    AES-256 encrypted family wellness records with
                    biometric-level account verification.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2f8f74]/10">
                    <Users className="h-6 w-6 text-[#7be0c2]" />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-white">
                    Family Profiles
                  </h3>

                  <p className="text-sm leading-relaxed text-white/55">
                    Organize wellness journeys for children, parents, pets, and
                    caregivers.
                  </p>
                </div>

                <div className="col-span-2 rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0f2b22] to-[#081611] p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d7b36a]">
                      Health Intelligence
                    </span>

                    <div className="rounded-full border border-[#7be0c2]/20 bg-[#7be0c2]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#7be0c2]">
                      Active
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <h4 className="font-serif text-5xl font-bold text-white">
                        98.4%
                      </h4>

                      <p className="mt-2 text-sm text-white/55">
                        wellness optimization score
                      </p>
                    </div>

                    <div className="space-y-2">
                      {[
                        "AI wellness advisor",
                        "Supplement purity tracking",
                        "Metabolic dashboards",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-sm text-white/70"
                        >
                          <CheckCircle2 className="h-4 w-4 text-[#7be0c2]" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              {/* LOGIN */}
              {view === "login" && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md rounded-[34px] border border-white/10 bg-white/10 p-7 shadow-2xl backdrop-blur-2xl md:p-9"
                >
                  <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#d7b36a] to-[#8f6b2d] shadow-xl shadow-[#d7b36a]/20">
                      <LockKeyhole className="h-9 w-9 text-black" />
                    </div>

                    <h2 className="font-serif text-4xl font-bold text-white">
                      Welcome Back
                    </h2>

                    <p className="mt-2 text-sm text-white/55">
                      Continue your premium wellness experience.
                    </p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-5">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />

                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#d7b36a]/40 focus:bg-black/30"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                          Password
                        </label>

                        <button
                          type="button"
                          className="text-xs font-semibold text-[#d7b36a]"
                        >
                          Forgot Password?
                        </button>
                      </div>

                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />

                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 pl-12 pr-12 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#d7b36a]/40 focus:bg-black/30"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#d7b36a] to-[#b48842] text-sm font-bold text-black shadow-xl shadow-[#d7b36a]/20 transition-all hover:scale-[1.01]"
                    >
                      Access Wellness Hub
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="my-7 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10" />

                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                      continue with
                    </span>

                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  {/* Social */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setView("otp")}
                      className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white transition-all hover:bg-white/10"
                    >
                      Continue with Apple
                    </button>

                    <button
                      onClick={() => setView("otp")}
                      className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white transition-all hover:bg-white/10"
                    >
                      Continue with Google
                    </button>
                  </div>

                  <div className="mt-7 text-center">
                    <p className="text-sm text-white/45">
                      New to DiXon?{" "}
                      <button
                        onClick={() => setView("register")}
                        className="font-bold text-[#d7b36a]"
                      >
                        Create account
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* REGISTER */}
              {view === "register" && (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md rounded-[34px] border border-white/10 bg-white/10 p-7 shadow-2xl backdrop-blur-2xl md:p-9"
                >
                  <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#1d7d61] to-[#0f4938] shadow-xl shadow-[#1d7d61]/20">
                      <Users className="h-9 w-9 text-[#7be0c2]" />
                    </div>

                    <h2 className="font-serif text-4xl font-bold text-white">
                      Join DiXon
                    </h2>

                    <p className="mt-2 text-sm text-white/55">
                      Build a connected wellness ecosystem for your family.
                    </p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                        Full Name
                      </label>

                      <div className="relative">
                        <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />

                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 pl-12 pr-4 text-sm text-white outline-none transition-all focus:border-[#d7b36a]/40"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />

                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 pl-12 pr-4 text-sm text-white outline-none transition-all focus:border-[#d7b36a]/40"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                        Password
                      </label>

                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />

                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 pl-12 pr-12 text-sm text-white outline-none transition-all focus:border-[#d7b36a]/40"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                        Family Role
                      </label>

                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />

                        <select
                          value={familyRole}
                          onChange={(e) => setFamilyRole(e.target.value)}
                          className="h-14 w-full appearance-none rounded-2xl border border-white/10 bg-black/20 pl-12 pr-12 text-sm text-white outline-none transition-all focus:border-[#d7b36a]/40"
                        >
                          <option value="parent" className="bg-[#07110d]">
                            Parent
                          </option>

                          <option value="caregiver" className="bg-[#07110d]">
                            Caregiver
                          </option>

                          <option value="provider" className="bg-[#07110d]">
                            Wellness Provider
                          </option>
                        </select>

                        <ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-1"
                      />

                      <p className="text-xs leading-relaxed text-white/55">
                        I agree to the{" "}
                        <span className="font-bold text-[#d7b36a]">
                          Terms of Service
                        </span>{" "}
                        and wellness data processing policies.
                      </p>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={!termsAccepted}
                      className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#1d7d61] to-[#0f4938] text-sm font-bold text-white shadow-xl shadow-[#1d7d61]/20 transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Create Wellness Account
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>

                  <div className="mt-7 text-center">
                    <p className="text-sm text-white/45">
                      Already have an account?{" "}
                      <button
                        onClick={() => setView("login")}
                        className="font-bold text-[#d7b36a]"
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* OTP */}
              {view === "otp" && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md rounded-[34px] border border-white/10 bg-white/10 p-7 shadow-2xl backdrop-blur-2xl md:p-9"
                >
                  <div className="mb-8 text-center">
                    <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#d7b36a] to-[#8f6b2d] shadow-2xl shadow-[#d7b36a]/20">
                      <LockKeyhole className="h-10 w-10 text-black" />

                      <div className="absolute -right-1 top-2 rounded-full bg-[#7be0c2] p-1">
                        <Sparkles className="h-3 w-3 text-black" />
                      </div>
                    </div>

                    <h2 className="font-serif text-4xl font-bold text-white">
                      Verify Identity
                    </h2>

                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/55">
                      We sent a secure 6-digit verification code to{" "}
                      <span className="font-semibold text-[#d7b36a]">
                        {email}
                      </span>
                    </p>
                  </div>

                  <form onSubmit={handleVerifyOtp} className="space-y-8">
                    {/* OTP */}
                    <div className="flex justify-center gap-3">
                      {[...Array(6)].map((_, idx) => (
                        <input
                          key={idx}
                          ref={(el) => assignRef(el, idx)}
                          type="text"
                          maxLength={1}
                          value={otp[idx]}
                          onChange={(e) => handleOtpChange(e.target.value, idx)}
                          onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                          className="h-16 w-12 rounded-2xl border border-white/10 bg-black/20 text-center font-serif text-2xl font-bold text-white outline-none transition-all focus:border-[#d7b36a]/40 focus:bg-black/30"
                        />
                      ))}
                    </div>

                    {otpFailed && (
                      <div className="flex items-center justify-center gap-2 text-sm font-semibold text-red-400">
                        <ShieldAlert className="h-4 w-4" />
                        Invalid security code.
                      </div>
                    )}

                    {/* Button */}
                    <button
                      type="submit"
                      disabled={otpVerifying}
                      className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#d7b36a] to-[#b48842] text-sm font-bold text-black shadow-xl shadow-[#d7b36a]/20 transition-all hover:scale-[1.01]"
                    >
                      {otpVerifying ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify & Continue
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setOtp(["2", "5", "8", "1", "9", "0"])}
                        className="text-sm font-semibold text-[#d7b36a]"
                      >
                        Resend verification code
                      </button>
                    </div>
                  </form>

                  {/* Trust Cards */}
                  <div className="mt-8 grid grid-cols-1 gap-3 border-t border-white/10 pt-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                      <ShieldCheck className="mb-3 h-5 w-5 text-[#7be0c2]" />

                      <h4 className="mb-1 text-sm font-bold text-white">
                        Secure Encryption
                      </h4>

                      <p className="text-xs leading-relaxed text-white/50">
                        Clinical-grade 256-bit encryption for wellness records.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                      <Bell className="mb-3 h-5 w-5 text-[#d7b36a]" />

                      <h4 className="mb-1 text-sm font-bold text-white">
                        Instant Alerts
                      </h4>

                      <p className="text-xs leading-relaxed text-white/50">
                        Real-time notifications for account activity and
                        updates.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
