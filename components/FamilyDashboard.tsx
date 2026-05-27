import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ArrowRight,
  Award,
  Sparkles,
  Share2,
  Download,
  CheckCircle,
  Clock,
  Dna,
  HeartPulse,
  Activity,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  Info,
} from "lucide-react";
import { FamilyMember } from "../lib/types";
import { initialFamilyMembers } from "../lib/data";

interface FamilyDashboardProps {
  onAskAdvisor: (customQuestion: string) => void;
}

export default function FamilyDashboard({
  onAskAdvisor,
}: FamilyDashboardProps) {
  const [members, setMembers] = useState<FamilyMember[]>(initialFamilyMembers);
  const [selectedId, setSelectedId] = useState<string>("m-1");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const activeMember = members.find((m) => m.id === selectedId) || members[0];

  const triggerDownload = () => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);

      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-10 font-sans">
      {/* TOP OVERVIEW */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* SCORE CARD */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07110c] p-7 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
          {/* Ambient */}
          <div className="absolute top-[-20%] right-[-20%] w-[240px] h-[240px] rounded-full bg-emerald-400/10 blur-[80px]" />
          <div className="absolute bottom-[-20%] left-[-20%] w-[220px] h-[220px] rounded-full bg-cyan-400/10 blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-full flex justify-between items-center mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-mono">
                  Family Health Score
                </p>

                <h4 className="text-white text-lg font-semibold mt-1">
                  Clinical Wellness Index
                </h4>
              </div>

              <div className="px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 text-[10px] font-bold uppercase tracking-[0.18em]">
                Optimal
              </div>
            </div>

            {/* Gauge */}
            <div className="relative w-52 h-52 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="104"
                  cy="104"
                  r="84"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="12"
                  fill="transparent"
                />

                <motion.circle
                  cx="104"
                  cy="104"
                  r="84"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 84}
                  initial={{ strokeDashoffset: 2 * Math.PI * 84 }}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 84 * (1 - 0.855),
                  }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                  strokeLinecap="round"
                />

                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute flex flex-col items-center">
                <span className="text-6xl font-black text-white tracking-tight">
                  85.5
                </span>

                <span className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/35 font-mono">
                  Excellent Index
                </span>
              </div>
            </div>

            <p className="mt-8 text-sm text-white/55 leading-relaxed max-w-xs">
              Metabolic variance stands at{" "}
              <span className="text-emerald-300 font-semibold">-3%</span> below
              baseline. Nutritional reserves remain clinically stable.
            </p>
          </div>
        </div>

        {/* REPORT PANEL */}
        <div className="xl:col-span-2 relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#08140d] via-[#0b1d13] to-[#10291a] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.4)]">
          <div className="absolute top-[-15%] right-[-10%] w-[360px] h-[360px] rounded-full bg-emerald-400/10 blur-[120px]" />

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-3 items-center mb-6">
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.22em] text-white/45 font-mono">
                  Verified Diagnostic
                </div>

                <div className="inline-flex items-center gap-2 text-[11px] text-emerald-300 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  Updated 12 hrs ago
                </div>
              </div>

              <h3 className="font-serif text-4xl md:text-5xl leading-[1.05] text-white font-semibold max-w-3xl">
                Family Genomic & Wellness Intelligence Report
              </h3>

              <p className="mt-5 max-w-2xl text-white/55 leading-relaxed text-sm md:text-base">
                Your complete 42-page metabolic handbook contains nutrient
                analytics, pediatric growth markers, immunity optimization
                protocols, and pet vitality diagnostics.
              </p>
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-4">
              <button
                onClick={triggerDownload}
                disabled={isDownloading}
                className="group h-14 px-7 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold text-sm shadow-[0_15px_40px_rgba(52,211,153,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                {isDownloading ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    Generating Dossier...
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Download Complete
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download Full PDF Report
                  </>
                )}
              </button>

              <button
                onClick={() =>
                  onAskAdvisor(
                    `How do I improve my family's metabolic index of 85.5?`,
                  )
                }
                className="h-14 px-7 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] text-white text-sm font-semibold transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                Ask Gemini Advisor
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MEMBERS */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#3e5a4a] font-mono mb-2">
              Wellness Profiles
            </p>

            <h3 className="font-serif text-4xl text-[#07110c] font-semibold tracking-tight">
              Family Members
            </h3>
          </div>

          <p className="text-sm text-[#6b7d73]">
            Select a profile to review detailed metabolic insights.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {members.map((m) => {
            const isSelected = m.id === selectedId;

            return (
              <motion.button
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={`group relative overflow-hidden rounded-[1.8rem] border p-5 text-left transition-all min-h-[220px] ${
                  isSelected
                    ? "bg-[#07110c] border-emerald-400/20 shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
                    : "bg-white border-[#eef2ef] hover:border-[#d8e6dc] shadow-sm"
                }`}
              >
                {/* Glow */}
                {isSelected && (
                  <div className="absolute top-[-20%] right-[-20%] w-[180px] h-[180px] rounded-full bg-emerald-400/10 blur-[70px]" />
                )}

                {/* Selected */}
                {isSelected && (
                  <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-black shadow-lg">
                    <UserCheck className="w-4 h-4" />
                  </div>
                )}

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="relative w-fit">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        referrerPolicy="no-referrer"
                        className={`w-16 h-16 rounded-2xl object-cover border transition-all ${
                          isSelected ? "border-white/20" : "border-[#f3f4f3]"
                        }`}
                      />

                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white" />
                    </div>

                    <div className="mt-5">
                      <h4
                        className={`font-serif text-2xl leading-none transition-colors ${
                          isSelected ? "text-white" : "text-[#07110c]"
                        }`}
                      >
                        {m.name}
                      </h4>

                      <p
                        className={`mt-2 text-[10px] uppercase tracking-[0.22em] font-mono ${
                          isSelected ? "text-white/40" : "text-[#708277]"
                        }`}
                      >
                        {m.role}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 border ${
                        isSelected
                          ? "bg-white/[0.04] border-white/10"
                          : "bg-[#f7faf8] border-[#eef2ef]"
                      }`}
                    >
                      <span
                        className={`text-[10px] uppercase tracking-[0.2em] font-mono ${
                          isSelected ? "text-white/35" : "text-[#708277]"
                        }`}
                      >
                        Health Index
                      </span>

                      <span
                        className={`font-bold text-sm ${
                          isSelected ? "text-emerald-300" : "text-[#07110c]"
                        }`}
                      >
                        {m.healthScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE MEMBER DETAILS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-[2rem] border border-[#edf1ee] bg-white p-7 md:p-8 shadow-[0_15px_60px_rgba(0,0,0,0.06)]"
        >
          {/* Ambient */}
          <div className="absolute top-[-10%] right-[-10%] w-[260px] h-[260px] rounded-full bg-emerald-400/5 blur-[90px]" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-5 pb-8 border-b border-[#edf1ee]">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#708277] font-mono mb-3">
                  Diagnostic Overview
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-serif text-4xl text-[#07110c] font-semibold tracking-tight">
                    {activeMember.name}
                  </h3>

                  <div className="px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-700 text-xs font-bold">
                    Health Index: {activeMember.healthScore}%
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  onAskAdvisor(
                    `What is the recommended vitamin D3 dosage and cognitive stack for my ${activeMember.role} (${activeMember.name}), considering their wellness goal of: ${activeMember.goal}?`,
                  )
                }
                className="h-14 px-7 rounded-2xl bg-[#07110c] text-white hover:bg-black transition-all text-sm font-semibold flex items-center justify-center gap-3 cursor-pointer shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                Analyze Goals with AI
              </button>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-8">
              {/* Goal */}
              <div className="rounded-[1.8rem] border border-[#eef2ef] bg-[#f9fbfa] p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#708277] font-mono">
                    Active Goal
                  </span>

                  <HeartPulse className="w-5 h-5 text-emerald-600" />
                </div>

                <h4 className="font-serif text-3xl leading-tight text-[#07110c]">
                  {activeMember.goal}
                </h4>

                <div className="mt-8">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-[#6b7d73] font-medium">Progress</span>

                    <span className="font-bold text-[#07110c]">
                      {activeMember.progress}%
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-white border border-[#e5ece8] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${activeMember.progress}%`,
                      }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </div>

              {/* Parameters */}
              <div className="rounded-[1.8rem] border border-[#eef2ef] bg-[#f9fbfa] p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#708277] font-mono">
                    Genomic Parameters
                  </span>

                  <Activity className="w-5 h-5 text-cyan-600" />
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#708277]">
                      Physical Stamina
                    </span>

                    <div className="flex items-center gap-2 font-bold text-[#07110c]">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      {activeMember.stamina}
                    </div>
                  </div>

                  <div className="w-full h-px bg-[#e8efea]" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#708277]">Deep Sleep</span>

                    <span className="font-bold text-[#07110c]">
                      {activeMember.sleepQuality}
                    </span>
                  </div>

                  <div className="w-full h-px bg-[#e8efea]" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#708277]">
                      Cellular Vitality
                    </span>

                    <span className="font-bold text-[#07110c]">
                      {activeMember.coatHealth}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scan */}
              <div className="rounded-[1.8rem] border border-[#eef2ef] bg-[#07110c] p-6 text-white relative overflow-hidden">
                <div className="absolute bottom-[-20%] right-[-20%] w-[180px] h-[180px] rounded-full bg-emerald-400/10 blur-[70px]" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/35 font-mono">
                      Next Metabolic Scan
                    </span>

                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>

                  <div className="flex items-end justify-center gap-2">
                    <span className="text-7xl font-black text-white leading-none">
                      {activeMember.nextScanDays}
                    </span>

                    <span className="text-sm font-semibold text-white/50 mb-2">
                      Days
                    </span>
                  </div>

                  <p className="mt-6 text-center text-sm leading-relaxed text-white/55">
                    Clinical sensor delivery kit dispatched. Follow the dossier
                    instructions before your next scan session.
                  </p>
                </div>
              </div>
            </div>

            {/* NOTICE */}
            <div className="mt-8 rounded-[1.7rem] border border-emerald-400/20 bg-emerald-400/5 p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5 text-emerald-700" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#07110c] mb-2">
                  Clinical Directive
                </h4>

                <p className="text-sm leading-relaxed text-[#557062]">
                  Supplement compliance has remained stable. Our Gemini module
                  recommends augmenting mineral routines with{" "}
                  <span className="font-semibold text-[#07110c]">
                    200mg Metabolic Zinc Liposomal
                  </span>{" "}
                  during the dry winter session to support respiratory mucous
                  integrity.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
