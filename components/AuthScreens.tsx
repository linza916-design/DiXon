"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

interface AuthScreensProps {
  onSuccess: (userData: { name: string; email: string }) => void;
}

export default function AuthScreens({ onSuccess }: AuthScreensProps) {
  const [view, setView] = useState<"login" | "register" | "otp">("login");

  // Input states
  const [email, setEmail] = useState("sarah.jenkins@dixon.com");
  const [password, setPassword] = useState("••••••••");
  const [fullName, setFullName] = useState("Sarah Jenkins");
  const [familyRole, setFamilyRole] = useState("parent");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  // OTP states
  const [otp, setOtp] = useState<string[]>(["1", "2", "3", "4", "5", "6"]);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpFailed, setOtpFailed] = useState(false);
  const otpRefs = useRef<HTMLInputElement[]>([]);

  // Focus ref array initialization
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

    // Auto-focus next input
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

    // Simulate OTP validation
    setTimeout(() => {
      const code = otp.join("");
      if (code.length === 6) {
        setOtpVerifying(false);
        onSuccess({ name: fullName, email: email });
      } else {
        setOtpVerifying(false);
        setOtpFailed(true);
      }
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-cream overflow-x-hidden flex flex-col font-sans">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-fixed opacity-15 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-secondary-container/10 opacity-20 blur-[100px] rounded-full" />
      </div>

      {/* Top Header & Brand Identity */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between h-20 px-6 md:px-16 bg-cream/70 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex items-center gap-1.5">
          {view === "otp" && (
            <button
              onClick={() => setView("login")}
              className="mr-2 p-1.5 hover:bg-primary/5 rounded-full transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          )}
          <span className="font-serif text-3xl font-bold tracking-tight text-primary leading-none">
            DiXon
          </span>
        </div>

        <div className="text-[11px] font-mono tracking-widest text-[#737973] uppercase hidden md:block">
          Premium Supplement Marketplace
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center px-6 pt-28 pb-12">
        <div className="w-full max-w-[440px] flex flex-col items-center">
          {/* VIEW 1: LOGIN MODULE */}
          {view === "login" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="font-serif text-3xl font-bold text-primary mb-2">
                  Welcome Back
                </h2>
                <p className="text-sm text-outline">
                  Continue your journey in family wellness.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 border border-outline-variant/20 shadow-md">
                <form className="space-y-4" onSubmit={handleLoginSubmit}>
                  {/* Email Field */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-xs font-semibold text-primary uppercase tracking-wider"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                      <input
                        id="email"
                        type="email"
                        required
                        className="w-full h-12 pl-12 pr-4 bg-cream/50 rounded-xl border border-outline-variant/30 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder-outline-variant/40"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label
                        className="text-xs font-semibold text-primary uppercase tracking-wider"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        className="text-xs text-secondary hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full h-12 pl-12 pr-12 bg-cream/50 rounded-xl border border-outline-variant/30 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder-outline-variant/30"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full h-12 bg-primary text-white text-sm font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-md mt-6"
                  >
                    Login
                  </button>
                </form>

                {/* Or Divider */}
                <div className="relative flex items-center my-6">
                  <div className="flex-grow border-t border-outline-variant/20"></div>
                  <span className="px-3 text-[10px] font-mono text-outline uppercase tracking-widest">
                    or
                  </span>
                  <div className="flex-grow border-t border-outline-variant/20"></div>
                </div>

                {/* Social Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setView("otp")}
                    className="w-full h-11 border border-outline-variant/30 hover:bg-cream/20 text-xs font-semibold text-primary rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.152 6.896c-.548 0-1.411.516-1.805.954-.471.525-.85 1.457-.85 2.39 0 1.574.899 2.457 1.745 2.457.441 0 1.055-.245 1.53-.245.457 0 1.144.245 1.597.245 1.055 0 2.007-.938 2.007-2.457 0-.961-.418-1.875-.85-2.39-.426-.499-1.282-.954-1.374-.954zm.193-4.146c-.504 0-1.077.291-1.428.694-.366.42-.64 1.104-.64 1.693 0 .432.222.846.426.968.514.306 1.13.252 1.488-.22.373-.491.602-1.123.602-1.728 0-.465-.184-.96-.448-1.407zM17.47 16.66c-.464-.673-1.221-1.185-2.022-1.185-.758 0-1.385.426-1.83.426-.457 0-1.01-.426-1.874-.426-1.34 0-2.316.894-3.085 2.03-.791 1.168-1.22 2.766-1.22 4.167 0 1.638.563 3.328 1.452 3.328.484 0 .863-.33 1.393-.33.513 0 .915.33 1.405.33 1.347 0 2.593-2.128 3.195-3.328a3.17 3.17 0 00-1.252-4.092z"></path>
                    </svg>
                    Continue with Apple
                  </button>
                  <button
                    onClick={() => setView("otp")}
                    className="w-full h-11 border border-outline-variant/30 hover:bg-cream/20 text-xs font-semibold text-primary rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 48 48">
                      <path
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        fill="#EA4335"
                      ></path>
                      <path
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        fill="#34A853"
                      ></path>
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-outline font-medium">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setView("register")}
                    className="text-secondary hover:underline font-bold font-sans cursor-pointer"
                  >
                    Join DiXon
                  </button>
                </p>
              </div>
            </motion.div>
          )}

          {/* VIEW 2: REGISTRATION MODULE */}
          {view === "register" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="font-serif text-3xl font-bold text-primary mb-2">
                  Join the Collective
                </h2>
                <div className="h-0.5 w-12 bg-secondary mx-auto rounded-full mb-3" />
                <p className="text-xs text-outline max-w-[340px] mx-auto">
                  Elevating family wellness through curated care and nurtured
                  trust.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 border border-outline-variant/20 shadow-md">
                <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                  {/* Full Name */}
                  <div className="flex flex-col gap-1">
                    <label
                      className="text-xs font-semibold text-primary uppercase tracking-wider"
                      htmlFor="reg-name"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                      <input
                        id="reg-name"
                        type="text"
                        required
                        className="w-full h-11 pl-11 pr-4 bg-cream/50 rounded-xl border border-outline-variant/30 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder-outline-variant/40"
                        placeholder="Sarah Jenkins"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label
                      className="text-xs font-semibold text-primary uppercase tracking-wider"
                      htmlFor="reg-email"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                      <input
                        id="reg-email"
                        type="email"
                        required
                        className="w-full h-11 pl-11 pr-4 bg-cream/50 rounded-xl border border-outline-variant/30 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder-outline-variant/40"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1">
                    <label
                      className="text-xs font-semibold text-primary uppercase tracking-wider"
                      htmlFor="reg-pass"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                      <input
                        id="reg-pass"
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full h-11 pl-11 pr-11 bg-cream/50 rounded-xl border border-outline-variant/30 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder-outline-variant/40"
                        placeholder="Min. 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Family Role Selector */}
                  <div className="flex flex-col gap-1">
                    <label
                      className="text-xs font-semibold text-primary uppercase tracking-wider"
                      htmlFor="reg-role"
                    >
                      Family Role
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                      <select
                        id="reg-role"
                        className="w-full h-11 pl-11 pr-10 bg-cream/50 rounded-xl border border-outline-variant/30 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all cursor-pointer appearance-none"
                        value={familyRole}
                        onChange={(e) => setFamilyRole(e.target.value)}
                      >
                        <option value="parent">Parent</option>
                        <option value="caregiver">Caregiver</option>
                        <option value="relative font-sans">
                          Family Member
                        </option>
                        <option value="provider">Wellness Provider</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4 pointer-events-none" />
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      id="reg-terms"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 rounded border-outline-variant/30 text-secondary focus:ring-secondary outline-none cursor-pointer"
                    />
                    <label
                      htmlFor="reg-terms"
                      className="text-[11px] leading-snug text-outline font-medium"
                    >
                      I agree to the{" "}
                      <span className="text-secondary hover:underline cursor-pointer font-bold">
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span className="text-secondary hover:underline cursor-pointer font-bold">
                        Privacy Policy
                      </span>
                      , including the processing of my family's wellness data.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!termsAccepted}
                    className="w-full h-12 bg-primary text-white text-sm font-semibold rounded-full hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 group shadow-md disabled:bg-primary/40 disabled:cursor-not-allowed mt-4"
                  >
                    Create Account
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>

              <div className="text-center">
                <p className="text-xs text-outline font-medium">
                  Already part of the collective?{" "}
                  <button
                    onClick={() => setView("login")}
                    className="text-secondary hover:underline font-bold font-sans cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </motion.div>
          )}

          {/* VIEW 3: OTP VERIFICATION SCREEN */}
          {view === "otp" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full space-y-8"
            >
              {/* Shield Icon Anchor */}
              <div className="flex justify-center mt-4">
                <div className="w-20 h-20 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-lg relative">
                  <LockKeyhole className="w-10 h-10 text-[#336d72]" />
                  <Sparkles className="w-4 h-4 text-primary absolute top-2 right-2 animate-pulse" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h2 className="font-serif text-3xl font-bold text-primary">
                  Verify Your Identity
                </h2>
                <p className="text-xs md:text-sm text-outline max-w-[325px] mx-auto leading-relaxed">
                  We've sent a 6-digit security code to{" "}
                  <span className="font-semibold text-primary">{email}</span>.
                  Please enter it below to continue.
                </p>
              </div>

              <form className="space-y-8" onSubmit={handleVerifyOtp}>
                {/* 6 Grid Inputs */}
                <div className="flex justify-center gap-2">
                  {[...Array(6)].map((_, idx) => (
                    <input
                      key={idx}
                      ref={(el) => assignRef(el, idx)}
                      type="text"
                      maxLength={1}
                      pattern="\d*"
                      required
                      value={otp[idx] || ""}
                      onChange={(e) => handleOtpChange(e.target.value, idx)}
                      onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                      className="w-12 h-16 md:w-14 md:h-18 text-center font-serif text-2xl font-bold bg-white text-primary border border-outline-variant/35 rounded-xl transition-all shadow-inner focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none"
                    />
                  ))}
                </div>

                {otpFailed && (
                  <div className="text-center text-xs text-error font-semibold flex items-center justify-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Interactive safety failed. Please enter complete digits.
                  </div>
                )}

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={otpVerifying}
                    className="w-full h-12 bg-primary text-white font-serif text-md font-bold rounded-full hover:opacity-90 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {otpVerifying ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        Verifying...
                      </>
                    ) : (
                      "Verify & Continue"
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setOtp(["2", "5", "8", "1", "9", "0"])}
                      className="text-xs text-secondary hover:underline font-bold cursor-pointer transition-all"
                    >
                      Didn't receive the code? Resend Code
                    </button>
                  </div>
                </div>
              </form>

              {/* Secure Trust Indicators (Bento Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-outline-variant/10">
                <div className="p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-outline-variant/15 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-primary font-sans leading-none mb-1">
                      Secure Encryption
                    </h4>
                    <p className="text-[10px] text-outline leading-tight">
                      Protected with 256-bit AES clinical standards.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-outline-variant/15 flex items-start gap-3">
                  <Bell className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-primary font-sans leading-none mb-1">
                      Instant Alerts
                    </h4>
                    <p className="text-[10px] text-outline leading-tight">
                      Prompt alerts on family account changes.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
