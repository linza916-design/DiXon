import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  ShoppingCart,
  Star,
  Info,
  CheckCircle2,
  HelpCircle,
  Clock,
  BriefcaseMedical,
  Users2,
  CalendarCheck,
} from "lucide-react";
import { Product } from "../lib/types";
import { premiumProducts } from "../lib/data";

interface MarketplaceProps {
  onAddToCart: (p: Product, qty: number, isSub: boolean) => void;
  activeCartCount: number;
}

export default function Marketplace({
  onAddToCart,
  activeCartCount,
}: MarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [successProductId, setSuccessProductId] = useState<string | null>(null);

  // Stores premium products with toggled subscription configuration
  const [subToggles, setSubToggles] = useState<Record<string, boolean>>({
    "p-1": true, // default true
    "p-2": false,
    "p-3": true,
    "p-4": false,
    "p-5": false,
  });

  const categories = [
    "All",
    "Bundles",
    "Rest Optimization",
    "Pet Health",
    "Pediatric Care",
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? premiumProducts
      : premiumProducts.filter((p) => p.category === selectedCategory);

  const toggleSub = (pid: string) => {
    setSubToggles((prev) => ({ ...prev, [pid]: !prev[pid] }));
  };

  const handleBuyClick = (product: Product) => {
    const isSub = subToggles[product.id] || false;
    onAddToCart(product, 1, isSub);
    setSuccessProductId(product.id);
    setTimeout(() => {
      setSuccessProductId(null);
    }, 2000);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Curation Standards Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/20 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        <div className="md:col-span-1 space-y-2">
          <div className="inline-flex items-center gap-1.5 p-1 bg-secondary/10 rounded-full pr-3.5">
            <span className="p-1 bgColor bg-[#2c676c] text-white rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#2c676c] font-bold">
              100% Verified
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-primary">
            The DiXon Quality Lock
          </h3>
          <p className="text-xs text-outline leading-relaxed">
            Zero compromises. Only premium, non-sugar cold-pressed formulation
            labs get the certification seal.
          </p>
        </div>

        {/* Verification Seals */}
        <div className="md:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-cream/40 rounded-2xl border border-outline-variant/10 text-center space-y-1">
            <BriefcaseMedical className="w-5 h-5 text-secondary mx-auto mb-1" />
            <h5 className="text-xs font-bold text-primary">No Sugar-Syrups</h5>
            <p className="text-[10px] text-outline">
              Stevia and prebiotic natural fruit infusions only.
            </p>
          </div>
          <div className="p-4 bg-cream/40 rounded-2xl border border-outline-variant/10 text-center space-y-1">
            <CheckCircle2 className="w-5 h-5 text-secondary mx-auto mb-1" />
            <h5 className="text-xs font-bold text-primary">Heavy Metal Free</h5>
            <p className="text-[10px] text-outline">
              Third-party mass spec reports accessible via code scans.
            </p>
          </div>
          <div className="p-4 bg-cream/40 rounded-2xl border border-outline-variant/10 text-center space-y-1">
            <Clock className="w-5 h-5 text-secondary mx-auto mb-1" />
            <h5 className="text-xs font-bold text-primary">Cold-Pressed</h5>
            <p className="text-[10px] text-outline">
              Extracted at room temp to lock active cellular nutrients.
            </p>
          </div>
          <div className="p-4 bg-cream/40 rounded-2xl border border-outline-variant/10 text-center space-y-1">
            <Users2 className="w-5 h-5 text-secondary mx-auto mb-1" />
            <h5 className="text-xs font-bold text-primary">Pet Tolerant</h5>
            <p className="text-[10px] text-outline">
              Carefully separated botanicals completely safe for dogs.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Row */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-light-outline/10 pb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-none py-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold font-sans rounded-full whitespace-nowrap cursor-pointer transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-outline border border-outline-variant/20 hover:bg-cream"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-outline font-medium">
          Curation displaying <b>{filteredProducts.length}</b> premium
          supplements
        </div>
      </div>

      {/* Grid Layout of Curated Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((p) => {
            const isSub = subToggles[p.id] || false;
            const finalPrice = isSub ? p.price * 0.85 : p.price; // 15% discount for sub
            const isAddedSuccess = successProductId === p.id;

            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden border border-outline-variant/20 shadow-sm flex flex-col justify-between group h-full relative"
              >
                {/* Premium Lock badge */}
                {p.premiumSelection && (
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-primary text-white text-[9px] font-mono tracking-widest uppercase rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-secondary-container animate-pulse" />
                    Verified Selection
                  </span>
                )}

                {/* Cover Photo */}
                <div className="relative overflow-hidden aspect-[4/3] bg-cream">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Details info */}
                <div className="p-5 flex-grow space-y-4">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-serif text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                      {p.name}
                    </h4>
                    {/* Star ratings */}
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(p.stars)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-amber-500 stroke-amber-500"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-outline leading-relaxed">
                    {p.description}
                  </p>

                  {/* Active tags */}
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map((t, index) => (
                      <span
                        key={index}
                        className="text-[9px] font-mono bg-cream/60 px-2 py-0.5 rounded text-[#737973] uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sub vs One-Time selector */}
                <div className="px-5 pb-5 pt-2 border-t border-outline-variant/10 space-y-5 bg-cream/15">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary">
                      Delivery Model
                    </span>

                    {/* Switch Toggles */}
                    <button
                      onClick={() => toggleSub(p.id)}
                      className={`relative w-36 h-8 rounded-full border text-[10px] font-bold font-sans flex items-center p-0.5 transition-all cursor-pointer ${
                        isSub
                          ? "bg-secondary-container text-on-secondary-container border-[#b2edf2]/25"
                          : "bg-white text-outline border-outline-variant/20"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 h-7 rounded-full bg-white transition-all shadow-sm ${
                          isSub ? "left-[55%] w-[42%]" : "left-0.5 w-[52%]"
                        }`}
                      />
                      <span
                        className={`z-10 flex-1 text-center ${!isSub ? "text-primary font-extrabold" : "text-outline"}`}
                      >
                        One-time
                      </span>
                      <span
                        className={`z-10 flex-1 text-center ${isSub ? "text-[#336d72] font-extrabold" : "text-outline"}`}
                      >
                        Sub (15% off)
                      </span>
                    </button>
                  </div>

                  {/* Price display row with Add */}
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-2xl font-extrabold text-[#11351e]">
                          ${finalPrice.toFixed(2)}
                        </span>
                        {p.originalPrice && (
                          <span className="text-xs text-outline line-through">
                            ${p.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-[#737973]">
                        {isSub
                          ? "Billed every month"
                          : "One-time check out price"}
                      </span>
                    </div>

                    <button
                      onClick={() => handleBuyClick(p)}
                      disabled={isAddedSuccess}
                      className={`px-5 h-10 rounded-full font-serif text-sm font-bold shadow-md cursor-pointer transition-all flex items-center gap-2 ${
                        isAddedSuccess
                          ? "bg-green-600 text-white"
                          : "bg-primary text-white hover:bg-neutral-800 active:scale-95"
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {isAddedSuccess ? "Added ✓" : "Cart"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
