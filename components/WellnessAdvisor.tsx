import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Brain,
  Trash2,
  Lock,
  User,
  Activity,
  HeartPulse,
  Info,
} from "lucide-react";
import { Message, FamilyMember } from "../lib/types";
import { initialFamilyMembers } from "../lib/data";
import FAQs from "./FAQs";

interface WellnessAdvisorProps {
  onSendMessage?: (msg: string) => void;
  overridePrompt?: string;
  clearOverride?: () => void;
}

export default function WellnessAdvisor({
  overridePrompt,
  clearOverride,
}: WellnessAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-init",
      sender: "ai",
      text: "Hello! I am your Intelligent DiXon Wellness Advisor. Ask me anything regarding ingredients, custom pediatric mineral doses, organic pet coatings, or how to bridge nutritional gaps highlighted on your diagnostic reports.",
      timestamp: "Today",
      groundingSources: [
        {
          title: "DiXon Purity Shield Charter",
          uri: "https://dixon.com/charter",
        },
      ],
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Trigger from family dashboard
  useEffect(() => {
    if (overridePrompt) {
      setInputText(overridePrompt);
      if (clearOverride) clearOverride();
    }
  }, [overridePrompt, clearOverride]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = {
      id: "u-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: textToSend,
          familyContext: initialFamilyMembers,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to communicate with medical transparency model. Details: `,
        );
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: data.text || "I was unable to structure an advice sheet now.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        groundingSources: data.sources || [],
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      console.error(err);
      const errorMessage: Message = {
        id: "ai-err-" + Date.now(),
        sender: "ai",
        text: "I experienced high server load while compiling research papers. Please verify your connection or retry in a moment.",
        timestamp: "Now",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputText);
  };

  const quickPrompts = [
    "D3 rules for pre-school kids?",
    "Zinc vs magnesium differences?",
    "Omega oils for pet joint health?",
    "Why sugar-free drops matter?",
  ];

  const clearChat = () => {
    setMessages([
      {
        id: "m-init",
        sender: "ai",
        text: "Chats cleared. I am ready for your next premium health inquiry.",
        timestamp: "Now",
      },
    ]);
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Advisor Meta Side Panel */}
        <div className="lg:col-span-1 space-y-5">
          <div className="bg-white rounded-3xl p-5 md:p-6 border border-outline-variant/20 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary-container text-white rounded-2xl">
                <Brain className="w-5 h-5 text-secondary-container" />
              </div>
              <div>
                <h4 className="font-serif text-md font-bold text-primary leading-none">
                  Intelligence Engine
                </h4>
                <p className="text-[10px] font-mono tracking-wider text-[#737973] uppercase mt-1">
                  Gemini 3.5 AI
                </p>
              </div>
            </div>
            <p className="text-xs text-outline leading-relaxed">
              All consultations are securely processed on our protected server.
              Gemini scans open-web biomedical directories, combining medical
              transparency benchmarks with your family diagnostic reports.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#336d72] bg-secondary-container/10 px-3 py-1.5 rounded-xl border border-[#b2edf2]/20">
              <Lock className="w-3 h-3 text-[#336d72]" />
              AES-256 PIPEDA SECURE
            </div>
          </div>

          {/* Quick Prompts Bento Selection */}
          <div className="bg-white rounded-3xl p-5 md:p-6 border border-outline-variant/20 shadow-sm">
            <span className="text-[10px] font-mono tracking-widest uppercase text-outline block mb-3">
              Suggested Inquiries
            </span>
            <div className="flex flex-col gap-2">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(p)}
                  className="w-full text-left p-3 bg-cream/50 text-xs font-semibold text-primary hover:bg-cream rounded-xl border border-outline-variant/10 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>{p}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-secondary shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Panel */}
        <div className="lg:col-span-3 bg-white rounded-3xl overflow-hidden border border-outline-variant/20 shadow-sm flex flex-col h-[600px] justify-between">
          {/* Header bar */}
          <div className="px-6 py-4 border-b border-light-outline/10 bg-cream/30 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5 text-secondary-container animate-pulse" />
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h4 className="font-serif text-md font-bold text-primary flex items-center gap-1.5">
                  Intelligent Advisor
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                </h4>
                <p className="text-[10px] font-mono text-[#737973] uppercase tracking-wider leading-none">
                  Continuous Science Verification
                </p>
              </div>
            </div>

            <button
              onClick={clearChat}
              className="p-2 text-outline hover:text-red-600 rounded-full hover:bg-red-50 hover:border-red-100 border border-transparent transition-all cursor-pointer"
              title="Clear Consultation Details"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-none">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3.5 max-w-[85%] ${
                  m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Profile Bubble Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs uppercase shadow-inner ${
                    m.sender === "user"
                      ? "bg-secondary text-white"
                      : "bg-primary-container text-[#fbf9f4]"
                  }`}
                >
                  {m.sender === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Brain className="w-4 h-4 text-secondary-container" />
                  )}
                </div>

                <div className="space-y-1.5">
                  {/* Text Bubble */}
                  <div
                    className={`p-4 rounded-2xl text-[13px] md:text-sm leading-relaxed whitespace-pre-wrap ${
                      m.sender === "user"
                        ? "bg-secondary text-white rounded-tr-none"
                        : "bg-cream/70 text-primary rounded-tl-none border border-outline-variant/15"
                    }`}
                  >
                    {m.text}

                    {/* Sources Grounding links if any */}
                    {m.groundingSources && m.groundingSources.length > 0 && (
                      <div className="mt-4 pt-3.5 border-t border-outline-variant/10 space-y-2">
                        <span className="text-[9px] font-mono tracking-widest text-outline uppercase block">
                          Science Citations:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {m.groundingSources.map((source, sIdx) => (
                            <a
                              key={sIdx}
                              href={source.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-white text-secondary text-[10px] font-bold px-2.5 py-1 rounded-full border border-secondary/20 hover:border-secondary hover:text-primary transition-all transition-colors"
                            >
                              <span>{source.title}</span>
                              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className={`text-[9px] font-mono tracking-wider uppercase text-outline px-1 ${
                      m.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {/* Shimmering AI Loader */}
            {loading && (
              <div className="flex gap-3.5 mr-auto max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center animate-spin">
                  <Activity className="w-4 h-4 text-secondary-container" />
                </div>
                <div className="bg-cream/40 p-4 rounded-2xl rounded-tl-none border border-outline-variant/15 space-y-2 w-72">
                  <div className="h-4 bg-primary/10 rounded animate-pulse w-full" />
                  <div className="h-4 bg-primary/10 rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-primary/10 rounded animate-pulse w-4/6" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar Form */}
          <div className="p-4 border-t border-outline-variant/15 bg-cream/15 shrink-0">
            <form className="flex gap-2" onSubmit={handleFormSubmit}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Advisor about omega levels, child safety drops, magnesium etc..."
                disabled={loading}
                className="flex-1 h-12 px-4 text-sm bg-white border border-outline-variant/20 rounded-xl focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none transition-all placeholder-outline-variant/50"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || loading}
                className="w-12 h-12 bg-primary hover:bg-neutral-800 disabled:bg-primary/40 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Interactive FAQs component */}
      <FAQs onAskQuestion={(qText) => handleSend(qText)} />
    </div>
  );
}
