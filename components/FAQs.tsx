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
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
      {/* FAQ Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] mb-1.5 font-mono">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            Educated Family Health Decisions
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-light text-white tracking-tight">
            Premium Supplement <span className="italic">Knowledge Base</span>
          </h3>
          <p className="text-xs text-white/50 mt-1 max-w-xl">
            Browse clinically audited insights regarding molecular safety,
            pediatric dosing, and biochemical absorption models.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search common questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 text-xs bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#C5A059] outline-none transition-all"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
        </div>
      </div>

      {/* Category Tabs / Filters */}
      <div className="flex flex-wrap gap-1.5 border-b border-white/5 pb-4 scrollbar-none overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-[#C5A059] text-black font-bold"
                : "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5"
            }`}
          >
            {cat.id !== "all" && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1.5 align-middle" />
            )}
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQs Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-300 ${
                  isExpanded
                    ? "bg-black/60 border-[#C5A059]/30 shadow-lg"
                    : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10"
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full px-5 py-4.5 flex items-center justify-between text-left cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-[#C5A059]/10 rounded-lg text-[#C5A059] shrink-0 mt-0.5">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-sans text-sm md:text-md font-medium text-white transition-colors group-hover:text-[#C5A059]">
                      {faq.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="hidden md:inline-block text-[10px] uppercase tracking-wider text-white/30 font-mono">
                      {faq.category}
                    </span>
                    <div className="text-white/40">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Question Info Content with height transition */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1.5 border-t border-white/5 space-y-4">
                        <p className="text-xs md:text-sm text-white/70 leading-relaxed font-sans">
                          {faq.answer}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3.5 border-t border-white/5">
                          {/* Citation metadata */}
                          <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono">
                            <Bookmark className="w-3 h-3 text-[#C5A059]" />
                            <span>SOURCE REFERENCE:</span>
                            <a
                              href={faq.citation.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#C5A059] hover:underline flex items-center gap-0.5 transition-all font-semibold"
                            >
                              {faq.citation.title}
                              <ArrowUpRight className="w-2.5 h-2.5" />
                            </a>
                          </div>

                          {/* Ask AI Trigger Button */}
                          <button
                            onClick={() => onAskQuestion(faq.question)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C5A059]/20 hover:bg-[#C5A059] border border-[#C5A059]/30 text-[#C5A059] hover:text-black rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            Ask AI Advisor
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-black/30 border border-white/5 rounded-2xl">
            <Filter className="w-8 h-8 text-white/20 mx-auto mb-2" />
            <p className="text-xs font-semibold text-white/50">
              No questions found matching your filter Criteria.
            </p>
            <p className="text-[10px] text-white/30 mt-1">
              Try relaxing your search term or selecting another topic filter
              above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
