import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  Bookmark,
  BookOpen,
  ArrowUpRight,
  Filter,
} from "lucide-react";

interface FAQItem {
  id: string;
  category: "purity" | "pediatric" | "bioavailability" | "pets" | "safety";
  question: string;
  answer: string;
  citation: { title: string; url: string };
}

interface FAQsProps {
  onAskQuestion: (questionText: string) => void;
}

export default function FAQs({ onAskQuestion }: FAQsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Topics" },
    { id: "purity", label: "Purity & Sourcing" },
    { id: "pediatric", label: "Pediatric Dosing" },
    { id: "bioavailability", label: "Bioavailability" },
    { id: "pets", label: "Veterinary Safety" },
  ];

  const faqsData: FAQItem[] = [
    {
      id: "faq-1",
      category: "purity",
      question: "What makes a supplement 'DiXon Verified'?",
      answer:
        "Every supplement listed must satisfy our strict Dixon Purity Shield Charter. This requires verifying 100% molecular purity, complete lack of synthetic binders/fillers, zero GMOs, zero artificial colorings, and verified sovereign supply chains from clean-room FDA-registered facilities.",
      citation: {
        title: "DiXon Purity Shield Charter Sec. 4",
        url: "https://dixon.com/charter",
      },
    },
    {
      id: "faq-2",
      category: "pediatric",
      question: "Are pediatric dosages customized for age or weight?",
      answer:
        "Yes, children's active mineral and vitamin requirements (such as Pediatric D3, elemental zinc, and bio-available magnesium) differ significantly from adults. Our Family Profile allows you to input ages, allowing our Intelligent Advisor to calculate custom nutrient ranges in accordance with pediatric endocrinology standards.",
      citation: {
        title: "Pediatric Mineral & Endocrinology Guidelines 2025",
        url: "https://dixon.com/pediatrics",
      },
    },
    {
      id: "faq-3",
      category: "bioavailability",
      question: "Can I co-administer prenatal vitamins and active iron?",
      answer:
        "We advise spacing them. Active iron absorption is heavily inhibited by calcium and high-dose magnesium found in standard prenatal capsules. To maximize therapeutic bioavailability, space your prenatal supplement and active iron by at least 2 to 3 hours.",
      citation: {
        title: "Clinical Bioavailability Journal, Vol. 12",
        url: "https://dixon.com/bioavailability",
      },
    },
    {
      id: "faq-4",
      category: "purity",
      question: "How does the third-party testing process work?",
      answer:
        "Brands submit production batches directly from source laboratories to ISO/IEC 17025 accredited independent labs. Testing verifies complete absence of heavy metals (lead, cadmium), residual chemical solvents, micro-toxins, and pesticides. Results are published openly in our weekly transparency reports.",
      citation: {
        title: "ISO/IEC Purity Verification Protocols",
        url: "https://dixon.com/iso-testing",
      },
    },
    {
      id: "faq-5",
      category: "pets",
      question: "Are organic coatings safer for family pets?",
      answer:
        "Yes. Many veterinary supplements use hydrogenated oils, beef binders, or synthetic glazing agents which can stress a pet's liver over long-term use. DiXon-verified canine and feline formulas utilize only cold-pressed organic oils, organic beeswax, or tapioca-based coatings.",
      citation: {
        title: "Companion Animal Holistic Health Review",
        url: "https://dixon.com/pet-safety",
      },
    },
    {
      id: "faq-6",
      category: "bioavailability",
      question: "Why should families prefer liposomal nutrient delivery?",
      answer:
        "Liposomal supplements encapsulate active elements (like Glutathione or Vitamin C) in a bilayer of nano-phospholipids. This mimics human cell membranes, protecting molecules from harsh stomach acids and allowing up to 15x higher absorption rates straight into the blood stream.",
      citation: {
        title: "Nano-lipid Encapsulation Research",
        url: "https://dixon.com/liposomal",
      },
    },
    {
      id: "faq-7",
      category: "safety",
      question: "What is the recommended threshold for pediatric Vitamin D3?",
      answer:
        "For kids aged 1-12, the daily fundamental baseline is generally 400-600 IU unless a clinical deficiency is present. Supplementing over 2000 IU daily without clinical supervision can lead to hypercalcemia. We advise consulting our customized dose calculator during seasonal transitions.",
      citation: {
        title: "Endocrine Society Pediatric Guidelines",
        url: "https://dixon.com/vit-d3",
      },
    },
  ];

  const filteredFaqs = faqsData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07110c] p-6 md:p-8 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.45)] space-y-8">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[420px] h-[420px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[320px] h-[320px] rounded-full bg-cyan-400/10 blur-[100px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col xl:flex-row justify-between gap-6 xl:items-end">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 text-[11px] uppercase tracking-[0.22em] font-semibold mb-5">
            <ShieldCheck className="w-4 h-4" />
            Clinical Knowledge Base
          </div>

          <h3 className="font-serif text-4xl md:text-5xl text-white font-semibold tracking-tight leading-[1.05]">
            Premium Wellness <span className="text-emerald-300">Research</span>
          </h3>

          <p className="mt-4 text-sm md:text-base text-white/55 leading-relaxed max-w-xl">
            Browse transparency reports, pediatric supplementation guidance,
            molecular absorption research, and pet-safe wellness standards.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full xl:w-[340px] shrink-0">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
            <Search className="w-4 h-4" />
          </div>

          <input
            type="text"
            placeholder="Search research topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-12 pr-5 rounded-2xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder:text-white/30 outline-none focus:border-emerald-400/40 focus:bg-white/[0.07] transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="relative z-10 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`group relative overflow-hidden px-5 py-3 rounded-2xl text-[11px] uppercase tracking-[0.18em] font-semibold transition-all duration-300 cursor-pointer border ${
              selectedCategory === cat.id
                ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-black border-transparent shadow-[0_10px_30px_rgba(52,211,153,0.25)]"
                : "bg-white/[0.04] text-white/60 border-white/10 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {cat.id !== "all" && (
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
              )}
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="relative z-10 space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;

            return (
              <motion.div
                key={faq.id}
                layout
                className={`overflow-hidden rounded-[1.7rem] border transition-all duration-300 ${
                  isExpanded
                    ? "bg-white/[0.06] border-emerald-400/20 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                    : "bg-white/[0.03] border-white/8 hover:border-white/15 hover:bg-white/[0.05]"
                }`}
              >
                {/* Trigger */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`shrink-0 p-3 rounded-2xl border ${
                        isExpanded
                          ? "bg-emerald-400/15 border-emerald-400/20 text-emerald-300"
                          : "bg-white/[0.05] border-white/10 text-white/50"
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono">
                          {faq.category}
                        </span>
                      </div>

                      <h4
                        className={`text-sm md:text-base font-medium leading-relaxed transition-colors ${
                          isExpanded ? "text-white" : "text-white/85"
                        }`}
                      >
                        {faq.question}
                      </h4>
                    </div>
                  </div>

                  <div
                    className={`shrink-0 mt-1 transition-colors ${
                      isExpanded ? "text-emerald-300" : "text-white/35"
                    }`}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Expanded */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-white/10 pt-6 space-y-6">
                          <p className="text-sm leading-8 text-white/65">
                            {faq.answer}
                          </p>

                          <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                            {/* Citation */}
                            <a
                              href={faq.citation.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition-all"
                            >
                              <div className="p-2 rounded-xl bg-emerald-400/10 text-emerald-300">
                                <Bookmark className="w-4 h-4" />
                              </div>

                              <div className="text-left">
                                <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 font-mono">
                                  Research Source
                                </p>

                                <div className="flex items-center gap-1 mt-1">
                                  <span className="text-xs font-semibold text-emerald-300">
                                    {faq.citation.title}
                                  </span>

                                  <ArrowUpRight className="w-3 h-3 text-emerald-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </div>
                              </div>
                            </a>

                            {/* AI Button */}
                            <button
                              onClick={() => onAskQuestion(faq.question)}
                              className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold text-xs uppercase tracking-[0.18em] shadow-[0_10px_30px_rgba(52,211,153,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                            >
                              <Sparkles className="w-4 h-4" />
                              Ask AI Advisor
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        ) : (
          <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] py-16 px-6 text-center">
            <div className="w-16 h-16 rounded-3xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-5">
              <Filter className="w-7 h-7 text-white/25" />
            </div>

            <h4 className="text-white font-medium text-lg">
              No matching articles found
            </h4>

            <p className="text-sm text-white/40 mt-2 max-w-md mx-auto leading-relaxed">
              Try adjusting your search keywords or switching to another
              knowledge category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
