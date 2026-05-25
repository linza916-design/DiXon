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
    <div className="space-y-8 font-sans">
      {/* Overview Card: Family Health Index Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Gauge Panel */}
        <div className="lg:col-span-1 bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/20 shadow-sm flex flex-col justify-between items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Dna className="w-24 h-24 text-primary" />
          </div>

          <div className="w-full flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Family Health Score
            </span>
            <span className="px-2.5 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full">
              OPTIMAL
            </span>
          </div>

          {/* SVG Radial Gauge */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="74"
                className="stroke-cream-dark"
                strokeWidth="10"
                fill="transparent"
              />
              <motion.circle
                cx="88"
                cy="88"
                r="74"
                className="stroke-primary"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 74}
                initial={{ strokeDashoffset: 2 * Math.PI * 74 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 74 * (1 - 0.855) }} // Mean of scores
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="font-serif text-5xl font-extrabold text-primary">
                85.5
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#737973] uppercase mt-1">
                Excellent Index
              </span>
            </div>
          </div>

          <div className="mt-6 text-center space-y-1">
            <p className="text-xs text-outline leading-snug">
              Metabolic variance stands at <b>-3%</b> below normal baseline.
              Premium mineral reserves are adequate.
            </p>
          </div>
        </div>

        {/* Detailed Insights PDF Download Panel */}
        <div className="lg:col-span-2 bg-gradient-to-br from-primary-container to-[#0b2413] text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-lg">
          {/* Ambient Glow */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-secondary/15 blur-[80px]" />

          <div className="relative space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold font-mono tracking-widest uppercase">
                Verified Diagnostic
              </span>
              <span className="text-secondary-container flex items-center gap-1 text-[11px] font-bold font-sans">
                <ShieldCheck className="w-3.5 h-3.5" /> Checked 12 hrs ago
              </span>
            </div>

            <h3 className="font-serif text-3xl md:text-4xl font-semibold leading-tight text-[#fbf9f4]">
              Family Genomic & Supplement Analysis Report
            </h3>

            <p className="text-sm text-cream/80 max-w-xl leading-relaxed">
              Your customized 42-page metabolic handbook containing molecular
              nutrient levels, pet joint vitality metrics (Leo), pediatric
              growth indexes (Mia), and active immunity optimization guidelines
              is fully updated.
            </p>
          </div>

          <div className="relative pt-6 flex flex-col md:flex-row gap-3 items-center">
            <button
              onClick={triggerDownload}
              disabled={isDownloading}
              className="w-full md:w-auto px-6 h-12 bg-cream text-primary text-xs font-bold rounded-full hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {isDownloading ? (
                <>
                  <Clock className="w-4 h-4 animate-spin text-primary" />
                  Generating Dossier...
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600 animate-pulse" />
                  Purity Dossier Downloaded!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-primary" />
                  Download 42-page Breakdown (PDF)
                </>
              )}
            </button>

            <button
              onClick={() =>
                onAskAdvisor(
                  `How do I improve my family's metabolic index of 85.5?`,
                )
              }
              className="w-full md:w-auto px-6 h-12 border border-white/20 hover:bg-white/15 text-xs font-bold rounded-full text-white cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              Ask Gemini Advisor
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Toggles & Snapshots */}
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <h4 className="font-serif text-2xl font-bold text-primary">
            Wellness Hub Members
          </h4>
          <span className="text-xs text-outline font-medium">
            Select a profile to view specific metrics
          </span>
        </div>

        {/* Carousel / Member Selection Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {members.map((m) => {
            const isSelected = m.id === selectedId;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={`p-4 md:p-5 text-left rounded-3xl border transition-all cursor-pointer relative group flex flex-col justify-between min-h-[160px] ${
                  isSelected
                    ? "bg-white border-primary shadow-md ring-1 ring-primary/20"
                    : "bg-white/50 hover:bg-white border-outline-variant/15 hover:shadow-sm"
                }`}
              >
                {/* Checkmark indicator for selected member */}
                {isSelected && (
                  <span className="absolute top-4 right-4 p-1 bg-primary text-white rounded-full">
                    <UserCheck className="w-3 h-3" />
                  </span>
                )}

                {/* Avatar */}
                <div className="relative">
                  <img
                    src={m.avatar}
                    alt={m.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-cream shadow-inner group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -bottom-1 -right-1 p-0.5 bg-white rounded-full shadow">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full border border-white" />
                  </div>
                </div>

                {/* Profile Meta */}
                <div className="mt-4 space-y-1">
                  <h5 className="font-serif text-md font-bold text-primary leading-tight group-hover:text-secondary transition-colors">
                    {m.name}
                  </h5>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-[#737973]">
                    {m.role}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Member Details Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/20 shadow-sm"
        >
          {/* Header row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-light-outline/10">
            <div className="space-y-1.5Packed font-sans">
              <span className="text-[10px] font-mono tracking-widest text-[#737973] uppercase leading-none">
                Diagnostic Screen
              </span>
              <h3 className="font-serif text-3xl font-bold text-primary flex items-center gap-2">
                {activeMember.name} Metrics
                <span className="text-secondary-container bg-secondary/15 rounded-full px-2 py-0.5 text-xs font-bold">
                  Health Index: {activeMember.healthScore}%
                </span>
              </h3>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              {/* Custom Ask Gemini about this person */}
              <button
                onClick={() =>
                  onAskAdvisor(
                    `What is the recommended vitamin D3 dosage and cognitive stack for my ${activeMember.role} (${activeMember.name}), considering their wellness goal of: ${activeMember.goal}?`,
                  )
                }
                className="flex-grow md:flex-grow-0 px-5 py-2.5 bg-primary text-white hover:bg-neutral-800 text-xs font-medium rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-secondary-container" />
                Analyze Goals with AI
              </button>
            </div>
          </div>

          {/* Quick Metrics Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {/* Metric Column 1: Core Goal */}
            <div className="p-5 bg-cream/30 rounded-2xl border border-outline-variant/10 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono tracking-widest text-outline uppercase">
                  Active Target & Goal
                </span>
                <HeartPulse className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-primary leading-tight mb-2">
                  {activeMember.goal}
                </p>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Adherence Progress</span>
                    <span>{activeMember.progress}%</span>
                  </div>
                  <div className="w-full bg-[#fbf9f4] border border-outline-variant/20 h-2 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: `${activeMember.progress}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Metric Column 2: System Levels */}
            <div className="p-5 bg-cream/30 rounded-2xl border border-outline-variant/10 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono tracking-widest text-outline uppercase">
                  Genomic Parameters
                </span>
                <Activity className="w-4 h-4 text-primary" />
              </div>

              <div className="space-y-3 font-sans">
                <div className="flex justify-between items-center text-sm py-1.5 border-b border-outline-variant/10">
                  <span className="text-outline font-medium text-xs">
                    Physical Stamina
                  </span>
                  <span className="font-bold text-primary flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    {activeMember.stamina}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm py-1.5 border-b border-outline-variant/10">
                  <span className="text-outline font-medium text-xs">
                    Deep Sleep Latency
                  </span>
                  <span className="font-bold text-[#336d72]">
                    {activeMember.sleepQuality}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm py-1.5">
                  <span className="text-outline font-medium text-xs">
                    Cellular Vitality (Coat)
                  </span>
                  <span className="font-bold text-primary">
                    {activeMember.coatHealth}
                  </span>
                </div>
              </div>
            </div>

            {/* Metric Column 3: Maintenance Scans */}
            <div className="p-5 bg-cream/30 rounded-2xl border border-outline-variant/10 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono tracking-widest text-outline uppercase">
                  Next Metabolic Scan
                </span>
                <Clock className="w-4 h-4 text-amber-600" />
              </div>

              <div>
                <div className="text-center py-2">
                  <span className="font-serif text-5xl font-extrabold text-primary">
                    {activeMember.nextScanDays}
                  </span>
                  <span className="text-xs font-bold text-primary"> Days</span>
                </div>
                <p className="text-[11px] leading-snug text-center text-[#737973] mt-3">
                  Automatic clinical sensor delivery kit dispatched. Please
                  follow instructions in page dossier on day of scan.
                </p>
              </div>
            </div>
          </div>

          {/* Expert Wellness Advice Prompt */}
          <div className="mt-6 p-4 bg-secondary-container/10 border border-[#b2edf2]/40 rounded-2xl flex items-start gap-3">
            <Info className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-[#336d72]">
              <span className="font-bold text-primary">
                Clinical Directive:
              </span>{" "}
              Supplement compliance has remained stable. Our server-side Gemini
              module suggests augmenting daily mineral routines with{" "}
              <b>200mg Metabolic Zinc Liposomal</b> during the dry winter
              session to support respiratory mucous integrity.
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
