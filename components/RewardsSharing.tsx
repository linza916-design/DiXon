import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Gift,
  Copy,
  Check,
  ArrowRight,
  Clock,
  CheckCircle2,
  Heart,
  Coins,
  BadgePercent,
  Banknote,
} from "lucide-react";
import { Referral } from "../lib/types";
import { initialReferrals } from "../lib/data";

interface RewardsSharingProps {
  currentCredits: number;
  onRedeemCredits: (amount: number) => void;
}

export default function RewardsSharing({
  currentCredits,
  onRedeemCredits,
}: RewardsSharingProps) {
  const [referrals, setReferrals] = useState<Referral[]>(initialReferrals);
  const [copiedLink, setCopiedLink] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState<number>(20);
  const [redeemSuccess, setRedeemSuccess] = useState(false);

  // Referral campaign links
  const referralLink = "https://dixon.com/welcome/jenkins55";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (redeemAmount <= 0 || redeemAmount > currentCredits) return;

    onRedeemCredits(redeemAmount);
    setRedeemSuccess(true);
    setTimeout(() => {
      setRedeemSuccess(false);
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      {/* Rewards Campaign Intro Panel */}
      <div className="lg:col-span-1 bg-gradient-to-br from-[#1b3022] to-primary text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-md">
        {/* Glow ambient background circles */}
        <div className="absolute top-[-20%] right-[-10%] w-60 h-60 bg-secondary/10 rounded-full blur-[70px]" />

        <div className="relative space-y-4">
          <div className="inline-flex p-3 bg-white/10 rounded-2xl">
            <Gift className="w-6 h-6 text-secondary-container" />
          </div>

          <h3 className="font-serif text-3xl font-extrabold text-[#fbf9f4]">
            Share the Gift of Wellness
          </h3>

          <p className="text-xs text-cream/80 leading-relaxed font-sans">
            Introduce trusted medicine transparency to other families you care
            about. When a family completes their initial verification scanner
            diagnostic, both accounts receive a <b>$20.00 wellness credit</b>{" "}
            automatically.
          </p>
        </div>

        <div className="relative pt-8 space-y-3 font-sans">
          <p className="text-[10px] font-mono tracking-widest text-[#b2edf2]/80 uppercase leading-none">
            Your Private Referral Link
          </p>
          <div className="flex h-11 bg-white/10 rounded-xl overflow-hidden border border-white/20 items-center justify-between px-3">
            <span className="text-xs truncate font-mono text-cream-dark/95 w-44">
              {referralLink}
            </span>
            <button
              onClick={handleCopyLink}
              className="p-1.5 hover:bg-white/20 rounded transition-colors cursor-pointer shrink-0 ml-1"
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-[#b2edf2] animate-bounce" />
              ) : (
                <Copy className="w-4 h-4 text-[#fbf9f4]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Wellness credit account & Redemption portal */}
      <div className="lg:col-span-2 space-y-6">
        {/* Credit details visual bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bento Slot 1: Credit Balance */}
          <div className="bg-white rounded-3xl p-6 border border-outline-variant/20 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 text-emerald-600/10">
              <Coins className="w-16 h-16" />
            </div>

            <div className="space-y-1 z-10 w-full font-sans">
              <span className="text-[10px] font-mono tracking-widest uppercase text-outline block leading-none">
                Available Credits
              </span>
              <h2 className="font-serif text-5xl font-extrabold text-primary">
                ${currentCredits.toFixed(2)}
              </h2>
            </div>

            <div className="pt-4 flex items-center gap-1 text-[11px] font-bold text-secondary font-sans leading-relaxed">
              <Sparkles className="w-3.5 h-3.5" /> Applied automatically at
              check-out
            </div>
          </div>

          {/* Bento Slot 2: Redeem Credit Interactive Tool */}
          <div className="bg-white rounded-3xl p-6 border border-outline-variant/20 shadow-sm flex flex-col justify-between">
            <div className="space-y-1.5 mb-4">
              <span className="text-[10px] font-mono tracking-widest uppercase text-outline block leading-none">
                Redeem Portal
              </span>
              <h4 className="font-serif text-md font-bold text-primary">
                Apply Credits to Next Order
              </h4>
            </div>

            <form onSubmit={handleRedeem} className="space-y-3 font-sans">
              <div className="flex gap-2 h-11 items-center">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-primary text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    min="5"
                    max={currentCredits}
                    value={redeemAmount}
                    onChange={(e) =>
                      setRedeemAmount(
                        Math.min(
                          currentCredits,
                          Math.max(0, Number(e.target.value)),
                        ),
                      )
                    }
                    className="w-full h-11 pl-7 pr-3 bg-cream/30 border border-outline-variant/20 rounded-xl focus:border-secondary text-sm font-bold focus:ring-1 focus:ring-secondary/50 outline-none"
                    placeholder="20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={
                    redeemAmount <= 0 ||
                    redeemAmount > currentCredits ||
                    redeemSuccess
                  }
                  className="px-5 h-11 bg-primary text-white hover:bg-neutral-800 disabled:bg-primary/45 disabled:cursor-not-allowed hover:opacity-90 font-bold rounded-xl text-xs transition-colors cursor-pointer whitespace-nowrap active:scale-95"
                >
                  {redeemSuccess ? "Applied ✓" : "Redeem"}
                </button>
              </div>

              {redeemSuccess && (
                <p className="text-[11px] font-bold text-green-700 flex items-center gap-1.5 animate-pulse leading-none pt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Applied! Check your
                  active cart or next order discount.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* History Stream references list */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/20 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-serif text-lg font-bold text-primary">
              Referral Track history
            </h4>
            <span className="text-[11px] font-semibold text-secondary flex items-center gap-1 font-sans">
              <Coins className="w-3.5 h-3.5" /> 3 Referrals Registered
            </span>
          </div>

          <div className="divide-y divide-light-outline/10 text-xs">
            {referrals.map((ref) => (
              <div
                key={ref.id}
                className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0"
              >
                <div className="space-y-1 font-sans">
                  <p className="font-bold text-primary">{ref.name}</p>
                  <p className="text-[10px] text-outline">
                    Registered on {ref.joinedDate}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      ref.status === "Successful"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700 animate-pulse"
                    }`}
                  >
                    {ref.status}
                  </span>

                  <span className="font-mono font-bold text-primary text-sm">
                    +${ref.credit.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
