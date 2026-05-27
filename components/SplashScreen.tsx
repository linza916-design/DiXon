import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Activity } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);

          setTimeout(() => {
            onComplete();
          }, 450);

          return 100;
        }

        return prev + 5;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-emerald-50/60 to-zinc-50 flex flex-col justify-between items-center px-6">
      {/* Premium Ambient Layers */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] right-[-10%] w-[42rem] h-[42rem] rounded-full bg-emerald-200/30 blur-[180px] animate-pulse" />

        <div className="absolute bottom-[-18%] left-[-12%] w-[36rem] h-[36rem] rounded-full bg-teal-200/20 blur-[160px] animate-pulse" />

        <div className="absolute top-[25%] left-[35%] w-[20rem] h-[20rem] rounded-full bg-white/60 blur-[120px]" />
      </div>

      {/* Floating particles */}

      <div className="absolute inset-0 pointer-events-none opacity-50">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-300/25"
            style={{
              width: Math.random() * 18 + 6,
              height: Math.random() * 18 + 6,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.15, 0.7, 0.15],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main center */}

      <div className="flex-1 flex flex-col justify-center items-center text-center z-10">
        {/* Rotating glow ring */}

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative mb-10"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-emerald-400/20 blur-2xl scale-125" />

          <div className="relative p-6 rounded-[2rem] bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-2xl border border-white/30">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Brand */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
        >
          <h1 className="font-serif text-6xl md:text-8xl font-bold tracking-tight text-zinc-900 leading-none">
            DiXon
          </h1>

          <div className="mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.45,
              duration: 0.8,
            }}
            className="mt-6 text-sm md:text-base tracking-[0.25em] uppercase text-zinc-500 font-medium"
          >
            Trusted Wellness For Families
          </motion.p>
        </motion.div>
      </div>

      {/* Footer loader */}

      <div className="pb-16 w-full max-w-sm flex flex-col items-center gap-8 z-10">
        {/* Progress */}

        <div className="w-full h-2 rounded-full bg-zinc-200/70 overflow-hidden shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}

        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-semibold">
          Initializing Secure Health Systems · {progress}%
        </p>

        {/* Verification */}

        <div className="flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-xl border border-zinc-100 px-5 py-3 shadow-lg">
          <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />

          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-zinc-600">
            Verified Cryptographic Security
          </span>
        </div>
      </div>
    </div>
  );
}
