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

  const [subToggles, setSubToggles] = useState<Record<string, boolean>>({
    "p-1": true,
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
    <div className="space-y-10 font-sans">
      {/* HERO CURATION BANNER */}
      <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br from-[#07150e] via-[#0c2117] to-[#10291c] p-7 md:p-10 shadow-[0_30px_120px_rgba(0,0,0,0.18)]">
        {/* ambient */}
        <div className="absolute -top-20 -right-10 h-72 w-72 rounded-full bg-[#5cf2c8]/10 blur-[110px]" />
        <div className="absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-[#7de2ff]/10 blur-[120px]" />

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-4 items-center">
          <div className="lg:col-span-1 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">
              <div className="rounded-full bg-[#1d8b78] p-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-white" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9be7db]">
                Verified Formulations
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-3xl md:text-4xl font-black leading-tight text-white">
                The DiXon
                <span className="block text-[#9be7db]">
                  Premium Wellness Standard
                </span>
              </h3>

              <p className="max-w-sm text-sm leading-relaxed text-white/70">
                Every supplement is medically screened, purity tested, and
                optimized for modern family wellness protocols.
              </p>
            </div>
          </div>

          {/* Feature Bento */}
          <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: BriefcaseMedical,
                title: "No Sugar Fillers",
                desc: "Only clean natural sweetening systems.",
              },
              {
                icon: CheckCircle2,
                title: "Heavy Metal Tested",
                desc: "Third-party validated purity reports.",
              },
              {
                icon: Clock,
                title: "Cold Pressed",
                desc: "Preserves active nutrient compounds.",
              },
              {
                icon: Users2,
                title: "Family Safe",
                desc: "Pet & pediatric wellness aligned.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="group rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.08]"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3">
                  <item.icon className="h-5 w-5 text-[#9be7db]" />
                </div>

                <h5 className="text-sm font-bold text-white">{item.title}</h5>

                <p className="mt-1 text-[11px] leading-relaxed text-white/60">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-5 rounded-[28px] border border-black/5 bg-white/80 px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="flex gap-2 overflow-x-auto scrollbar-none py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative overflow-hidden rounded-full px-5 py-2.5 text-xs font-bold tracking-wide transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[#0f2418] text-white shadow-lg"
                  : "border border-black/5 bg-[#f8faf8] text-[#647067] hover:bg-[#eef6f0]"
              }`}
            >
              {selectedCategory === cat && (
                <motion.div
                  layoutId="marketplace-category-pill"
                  className="absolute inset-0 bg-gradient-to-r from-[#10261a] to-[#163827]"
                />
              )}

              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-full bg-[#f3f7f4] px-4 py-2 text-xs font-semibold text-[#4d5d54]">
          <Sparkles className="h-3.5 w-3.5 text-[#1d8b78]" />

          <span>
            Showing <b>{filteredProducts.length}</b> premium wellness products
          </span>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((p) => {
            const isSub = subToggles[p.id] || false;
            const finalPrice = isSub ? p.price * 0.85 : p.price;
            const isAddedSuccess = successProductId === p.id;

            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-[0_15px_60px_rgba(0,0,0,0.06)]"
              >
                {/* top glow */}
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#6ce5b8]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* badge */}
                {p.premiumSelection && (
                  <div className="absolute left-5 top-5 z-20 flex items-center gap-1 rounded-full bg-[#10271a] px-3 py-1.5 shadow-lg">
                    <Sparkles className="h-3 w-3 text-[#9be7db]" />

                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white">
                      Verified
                    </span>
                  </div>
                )}

                {/* IMAGE */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f7f5]">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="space-y-5 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-serif text-2xl font-black leading-tight text-[#10261a] transition-colors group-hover:text-[#1d8b78]">
                        {p.name}
                      </h4>

                      <p className="mt-2 text-xs leading-relaxed text-[#69756d]">
                        {p.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-0.5 rounded-full bg-[#fff7e8] px-2 py-1">
                      {[...Array(p.stars)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-[#ffb400] stroke-[#ffb400]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* tags */}
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-[#dfe8e1] bg-[#f8faf8] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#5f6d65]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* FOOTER */}
                <div className="space-y-5 border-t border-black/5 bg-[#fafcfb] p-6">
                  {/* SUB SWITCH */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-[#10261a]">
                        Delivery Plan
                      </p>

                      <p className="mt-1 text-[11px] text-[#6d7a72]">
                        Subscription unlocks 15% savings
                      </p>
                    </div>

                    <button
                      onClick={() => toggleSub(p.id)}
                      className={`relative flex h-9 w-40 items-center rounded-full border p-1 transition-all duration-300 ${
                        isSub
                          ? "border-[#8ee0cc] bg-[#dff8f1]"
                          : "border-[#e5ebe7] bg-white"
                      }`}
                    >
                      <motion.div
                        layout
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                        className={`absolute top-1 h-7 rounded-full bg-white shadow-md ${
                          isSub ? "left-[52%] w-[45%]" : "left-1 w-[48%]"
                        }`}
                      />

                      <span
                        className={`z-10 flex-1 text-center text-[10px] font-bold ${
                          !isSub ? "text-[#10261a]" : "text-[#7b8880]"
                        }`}
                      >
                        One-time
                      </span>

                      <span
                        className={`z-10 flex-1 text-center text-[10px] font-bold ${
                          isSub ? "text-[#1d8b78]" : "text-[#7b8880]"
                        }`}
                      >
                        Subscribe
                      </span>
                    </button>
                  </div>

                  {/* PRICE + CTA */}
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="flex items-end gap-2">
                        <span className="font-serif text-3xl font-black text-[#10261a]">
                          ${finalPrice.toFixed(2)}
                        </span>

                        {p.originalPrice && (
                          <span className="pb-1 text-sm text-[#8b9890] line-through">
                            ${p.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-[11px] text-[#6f7b74]">
                        {isSub ? "Auto-renews monthly" : "Single purchase"}
                      </p>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleBuyClick(p)}
                      disabled={isAddedSuccess}
                      className={`flex h-12 items-center gap-2 rounded-full px-6 text-sm font-bold shadow-lg transition-all ${
                        isAddedSuccess
                          ? "bg-green-600 text-white"
                          : "bg-[#10261a] text-white hover:bg-[#183826]"
                      }`}
                    >
                      <ShoppingCart className="h-4 w-4" />

                      {isAddedSuccess ? "Added ✓" : "Add to Cart"}
                    </motion.button>
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
