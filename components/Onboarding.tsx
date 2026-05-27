import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Brain,
  Users,
  Truck,
  ChevronRight,
  Award,
} from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

interface Step {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  badgeText: string;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      title: "Elevating Family Wellness",
      subtitle: "Welcome to DiXon Collective",
      description:
        "Introduce your family to modern wellness. Browse premium, medical-grade supplements tailored precisely to nutritional and metabolic wellness markers.",
      icon: <Sparkles className="w-14 h-14 text-emerald-200" />,
      colorClass: "bg-emerald-500/10 border border-emerald-400/20",
      badgeText: "PREMIUM STANDARD",
    },
    {
      title: "100% Purity Verification",
      subtitle: "Rigorous Safety & Certified Brands",
      description:
        "Every supplement passes verified non-toxic screening, ingredient transparency reviews, and advanced quality assurance standards.",
      icon: <ShieldCheck className="w-14 h-14 text-emerald-200" />,
      colorClass: "bg-emerald-500/10 border border-emerald-400/20",
      badgeText: "CLINICAL TRANSPARENCY",
    },
    {
      title: "AI-Powered Diagnostics",
      subtitle: "Personalized Intelligent Wellness",
      description:
        "Receive intelligent health insights, dosage recommendations, and personalized nutritional support powered by modern AI systems.",
      icon: <Brain className="w-14 h-14 text-emerald-200" />,
      colorClass: "bg-emerald-500/10 border border-emerald-400/20",
      badgeText: "GEMINI 3.5 AI INSIGHT",
    },
    {
      title: "Family Health Management",
      subtitle: "Multi-profile Dynamic Metrics",
      description:
        "Manage children, adults, and pet wellness profiles from one seamless health workspace with advanced tracking tools.",
      icon: <Users className="w-14 h-14 text-emerald-200" />,
      colorClass: "bg-emerald-500/10 border border-emerald-400/20",
      badgeText: "FAMILY & PET ECOSYSTEM",
    },
    {
      title: "Predictive Smart Delivery",
      subtitle: "Seamless Concierge Subscriptions",
      description:
        "Automated supplement restocking, real-time delivery tracking, and concierge wellness logistics designed for busy families.",
      icon: <Truck className="w-14 h-14 text-emerald-200" />,
      colorClass: "bg-emerald-500/10 border border-emerald-400/20",
      badgeText: "CONCIERGE DELIVERY",
    },
  ];

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-emerald-50/40 to-zinc-50 flex flex-col justify-between px-6 py-8 md:px-10 lg:px-16">
      {/* Ambient Background */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[36rem] h-[36rem] rounded-full bg-emerald-300/20 blur-[140px]" />

        <div className="absolute bottom-[-15%] left-[-10%] w-[32rem] h-[32rem] rounded-full bg-teal-200/20 blur-[120px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_55%)]" />
      </div>

      {/* Header */}

      <header className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-zinc-900">
              DiXon
            </h1>

            <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">
              Trusted Family Wellness
            </p>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="h-11 px-5 rounded-full border border-zinc-200 bg-white/70 backdrop-blur-xl text-sm font-semibold text-zinc-700 hover:bg-white transition-all"
        >
          Skip
        </button>
      </header>

      {/* Main Slide */}

      <main className="relative z-10 flex-1 flex items-center justify-center py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -30,
              scale: 0.96,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/80 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
          >
            {/* Glow */}

            <div className="absolute top-[-30%] right-[-20%] w-[24rem] h-[24rem] rounded-full bg-emerald-200/20 blur-[120px]" />

            {/* Content */}

            <div className="relative p-8 md:p-14 text-center">
              {/* Icon */}

              <motion.div
                initial={{
                  scale: 0.8,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.1,
                }}
                className={`w-28 h-28 mx-auto rounded-[2rem] flex items-center justify-center shadow-inner backdrop-blur-xl ${step.colorClass}`}
              >
                {step.icon}
              </motion.div>

              {/* Badge */}

              <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

                <span className="text-[11px] tracking-[0.22em] uppercase font-bold text-emerald-700">
                  {step.badgeText}
                </span>
              </div>

              {/* Typography */}

              <div className="mt-8 space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight tracking-tight text-zinc-900">
                  {step.title}
                </h2>

                <h4 className="text-lg font-semibold text-emerald-700">
                  {step.subtitle}
                </h4>

                <p className="max-w-xl mx-auto text-base leading-relaxed text-zinc-600">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}

      <footer className="relative z-10 max-w-xl mx-auto w-full flex flex-col items-center gap-8 pb-4">
        {/* Indicators */}

        <div className="flex items-center gap-3">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentStep
                  ? "w-12 h-3 bg-emerald-600"
                  : "w-3 h-3 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}

        <div className="flex items-center justify-between w-full">
          <button
            onClick={handleBack}
            className={`h-12 px-6 rounded-full text-sm font-semibold transition-all ${
              currentStep === 0
                ? "opacity-0 pointer-events-none"
                : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            Back
          </button>

          <button
            onClick={handleNext}
            className="h-14 px-8 rounded-full bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-800 hover:to-emerald-700 text-white shadow-xl flex items-center gap-3 font-bold text-base transition-all active:scale-[0.98]"
          >
            {currentStep === steps.length - 1 ? "Enter DiXon" : "Continue"}

            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
