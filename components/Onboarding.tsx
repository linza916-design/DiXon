import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Brain,
  Users,
  Truck,
  ArrowRight,
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
        "Introduce your family to modern wellness. Browse premium, medical-grade supplements tailored precisely to the nutritional guidelines and metabolic markers that safeguard your family.",
      icon: <Sparkles className="w-16 h-16 text-secondary" />,
      colorClass: "bg-secondary-container/20 text-on-secondary-container",
      badgeText: "PREMIUM STANDARD",
    },
    {
      title: "100% Purity Verification",
      subtitle: "Rigorous Safety & Certified Brands",
      description:
        "Unlike general stores, only pre-screened wellness companies can offer products here. Every booster, powder, and infant nutrient carries a verified DiXon purity and non-toxic badge.",
      icon: <ShieldCheck className="w-16 h-16 text-primary" />,
      colorClass: "bg-primary-container/20 text-on-primary-container",
      badgeText: "CLINICAL TRANSPARENCY",
    },
    {
      title: "AI-Powered Diagnostics",
      subtitle: "Personalized Intelligent Wellness",
      description:
        "Gain live diagnostic insights backed by the server-side Gemini model. Receive continuous recommendations, optimal dosage amounts, and clear evaluations that eliminate nutritional gaps.",
      icon: <Brain className="w-16 h-16 text-secondary" />,
      colorClass: "bg-secondary-container/25 text-on-secondary-container",
      badgeText: "GEMINI 3.5 AI INSIGHT",
    },
    {
      title: "Family Health Management",
      subtitle: "Multi-profile Dynamic Metrics",
      description:
        "Manage individual schedules, clinical dosages, and health indicators for everyone. Seamless child tracking, wellness profiles, and yes—complete health scans for your faithful pets!",
      icon: <Users className="w-16 h-16 text-primary" />,
      colorClass: "bg-primary-container/25 text-on-primary",
      badgeText: "FAMILY & PET ECOSYSTEM",
    },
    {
      title: "Predictive Smart Delivery",
      subtitle: "Seamless Concierge Subscriptions",
      description:
        "Never run out of essential family buffers again. Get active tracking, courier routing, live maps updates, and simple automated monthly restock cycles that support the wellness path.",
      icon: <Truck className="w-16 h-16 text-secondary" />,
      colorClass: "bg-secondary-container/20 text-on-secondary-container",
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
    <div className="relative min-h-screen bg-cream flex flex-col justify-between p-6 overflow-hidden md:p-12">
      {/* Background decorations */}
      <div className="absolute top-[5%] right-[-15%] w-[450px] h-[450px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <div className="flex justify-between items-center w-full z-10">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-secondary" />
          <span className="font-serif text-2xl font-bold tracking-tight text-primary">
            DiXon
          </span>
        </div>
        <button
          onClick={onComplete}
          className="text-sm font-sans tracking-wide text-outline hover:text-primary transition-colors cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Main Slide Carousel (Animated) */}
      <div className="flex-1 flex justify-center items-center py-8 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full max-w-lg bg-white/70 backdrop-blur-md p-8 md:p-12 rounded-[24px] border border-white/60 shadow-[0px_10px_40px_rgba(6,27,14,0.03)] flex flex-col items-center text-center"
          >
            {/* Visual Icon Badge */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`p-6 rounded-[20px] ${step.colorClass} mb-8 flex justify-center items-center shadow-inner`}
            >
              {step.icon}
            </motion.div>

            {/* Custom tags/Status badge */}
            <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-mono tracking-widest rounded-full mb-4 uppercase">
              {step.badgeText}
            </span>

            {/* Typography */}
            <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold tracking-tight mb-2">
              {step.title}
            </h2>
            <h4 className="font-sans text-md font-semibold text-secondary mb-4 leading-none">
              {step.subtitle}
            </h4>
            <p className="font-sans text-sm md:text-base text-outline leading-relaxed max-w-sm">
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation Bar */}
      <div className="w-full max-w-md mx-auto z-10 flex flex-col items-center gap-6 pb-6">
        {/* Step Indicators */}
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentStep ? "w-8 bg-primary" : "w-2 bg-primary/25"
              }`}
            />
          ))}
        </div>

        {/* Buttons Controls */}
        <div className="flex justify-between items-center w-full gap-4">
          <button
            onClick={handleBack}
            className={`px-6 py-3 font-sans text-sm font-semibold transition-all ${
              currentStep === 0
                ? "text-transparent pointer-events-none"
                : "text-outline hover:text-primary cursor-pointer"
            }`}
          >
            Back
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-serif text-md font-bold hover:bg-neutral-800 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            {currentStep === steps.length - 1 ? "Enter DiXon" : "Continue"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
