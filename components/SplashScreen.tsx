import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          }, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="relative min-h-screen bg-cream flex flex-col justify-between items-center px-6 overflow-hidden">
      {/* Soft glowing ambient bubbles */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[50%] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow-1 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[100px] animate-pulse-glow-2 pointer-events-none" />

      {/* Particle Simulation effect */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-secondary/15"
            style={{
              width: Math.random() * 20 + 8,
              height: Math.random() * 20 + 8,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 90}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        {/* Main animated premium logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="inline-flex p-3 bg-primary-container text-white rounded-2xl mb-6 shadow-xl relative"
          >
            <Sparkles className="w-8 h-8 text-secondary-container" />
          </motion.div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-primary leading-none">
            DiXon
          </h1>
          <div className="mt-2 h-1 w-16 bg-secondary mx-auto rounded-full" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-4 font-sans text-sm tracking-[0.1em] text-outline uppercase font-medium"
          >
            Trusted wellness for every family
          </motion.p>
        </motion.div>
      </div>

      {/* Progress & Bottom copyright branding */}
      <div className="pb-16 w-full max-w-xs flex flex-col items-center gap-6">
        <div className="w-full bg-primary/5 h-1 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-2 text-outline/80 font-mono text-[11px] tracking-widest uppercase">
          <Activity className="w-3.5 h-3.5 text-secondary animate-pulse" />
          Verified Secure Cryptography
        </div>
      </div>
    </div>
  );
}
