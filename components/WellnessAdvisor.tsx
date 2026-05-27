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
} from "lucide-react";

import { Message } from "../lib/types";
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

  useEffect(() => {
    if (overridePrompt) {
      setInputText(overridePrompt);
      clearOverride?.();
    }
  }, [overridePrompt, clearOverride]);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

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

      const data = await response.json();

      const aiMessage: Message = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: data.text || "Unable to generate advice.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        groundingSources: data.sources || [],
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "ai",
          text: "I experienced server congestion. Please retry shortly.",
          timestamp: "Now",
        },
      ]);
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

  const clearChat = () =>
    setMessages([
      {
        id: "m-init",
        sender: "ai",
        text: "Chat cleared. Ready for your next health inquiry.",
        timestamp: "Now",
      },
    ]);

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* LEFT PANEL */}

        <aside className="space-y-6">
          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/70 shadow-lg p-6 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="rounded-2xl bg-emerald-600 p-4 shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-emerald-950">
                  DiXon AI Engine
                </h3>

                <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-500 font-medium">
                  Gemini Intelligence
                </p>
              </div>
            </div>

            <p className="text-sm text-emerald-800 leading-relaxed">
              Premium biomedical intelligence for personalized family wellness.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-white px-4 py-2 text-xs font-semibold text-emerald-700">
              <Lock className="w-4 h-4" />
              AES-256 Protected
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-zinc-100 shadow-lg p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 mb-4">
              Suggested Questions
            </p>

            <div className="space-y-3">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(p)}
                  className="group w-full rounded-2xl border border-zinc-100 bg-zinc-50 hover:bg-emerald-50 px-4 py-4 text-left transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-800">
                      {p}
                    </span>

                    <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CHAT */}

        <main className="xl:col-span-3 rounded-[2rem] overflow-hidden border border-zinc-100 bg-white shadow-2xl">
          {/* HEADER */}

          <header className="border-b bg-gradient-to-r from-emerald-50 to-white px-7 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative rounded-2xl bg-emerald-600 p-3 shadow-md">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-zinc-900 flex gap-2 items-center">
                  Wellness Advisor
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </h3>

                <p className="text-xs tracking-[0.15em] uppercase text-zinc-500">
                  Real-time scientific validation
                </p>
              </div>
            </div>

            <button
              onClick={clearChat}
              className="rounded-xl p-3 hover:bg-red-50 text-zinc-500 hover:text-red-600 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </header>

          {/* MESSAGES */}

          <div className="h-[640px] overflow-y-auto p-8 space-y-7 bg-gradient-to-b from-white to-zinc-50/60">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[78%] rounded-3xl px-6 py-5 shadow-sm ${
                    m.sender === "user"
                      ? "bg-emerald-600 text-white"
                      : "bg-white border border-zinc-100"
                  }`}
                >
                  <p className="text-[15px] leading-relaxed">{m.text}</p>

                  {m.groundingSources && m.groundingSources.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-zinc-100 flex flex-wrap gap-2">
                      {m.groundingSources.map((source, i) => (
                        <a
                          key={i}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                        >
                          {source.title}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}

                  <p className="mt-3 text-[10px] uppercase tracking-[0.18em] opacity-70">
                    {m.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}

            {loading && (
              <div className="flex gap-4">
                <div className="rounded-full bg-emerald-600 p-3 animate-spin">
                  <Activity className="w-4 h-4 text-white" />
                </div>

                <div className="rounded-3xl border bg-white p-5 w-72 space-y-3">
                  <div className="h-4 rounded bg-zinc-100 animate-pulse" />
                  <div className="h-4 rounded bg-zinc-100 animate-pulse w-4/5" />
                  <div className="h-4 rounded bg-zinc-100 animate-pulse w-2/3" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}

          <footer className="border-t bg-white p-5">
            <form onSubmit={handleFormSubmit} className="flex gap-3">
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about vitamins, minerals, wellness..."
                disabled={loading}
                className="flex-1 rounded-2xl border border-zinc-200 px-5 h-14 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="h-14 w-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </footer>
        </main>
      </div>

      <FAQs onAskQuestion={(q) => handleSend(q)} />
    </section>
  );
}
