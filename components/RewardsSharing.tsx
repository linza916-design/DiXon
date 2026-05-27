import React, { useState } from "react";
import { Sparkles, Gift, Copy, Check, CheckCircle2, Coins } from "lucide-react";

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
  const [referrals] = useState<Referral[]>(initialReferrals);
  const [copiedLink, setCopiedLink] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState<number>(20);
  const [redeemSuccess, setRedeemSuccess] = useState(false);

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
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 font-sans">
      {/* LEFT FEATURE PANEL */}

      <div className="xl:col-span-1 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 p-8 shadow-2xl border border-white/10">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-emerald-300/10 blur-[120px]" />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-teal-300/10 blur-[120px]" />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20">
              <Gift className="w-8 h-8 text-emerald-200" />
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-4xl font-bold text-white leading-tight">
                Share Wellness.
                <br />
                Earn Together.
              </h3>

              <p className="text-sm leading-relaxed text-emerald-100/85">
                Invite families to trusted wellness transparency. Each completed
                verification unlocks a shared
                <span className="font-bold text-white"> $20 health credit</span>
                .
              </p>
            </div>
          </div>

          <div className="pt-10 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-200/70 font-semibold">
              Private Referral Link
            </p>

            <div className="flex items-center justify-between bg-white/10 border border-white/15 backdrop-blur-xl rounded-2xl px-4 py-4">
              <span className="truncate text-sm text-white/90 font-mono max-w-[190px]">
                {referralLink}
              </span>

              <button
                onClick={handleCopyLink}
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                {copiedLink ? (
                  <Check className="w-5 h-5 text-emerald-300" />
                ) : (
                  <Copy className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT */}

      <div className="xl:col-span-2 space-y-8">
        {/* CREDIT GRID */}

        <div className="grid md:grid-cols-2 gap-6">
          {/* BALANCE */}

          <div className="relative overflow-hidden rounded-[2rem] bg-white p-8 border border-zinc-200 shadow-xl">
            <div className="absolute top-4 right-4 opacity-10">
              <Coins className="w-28 h-28 text-emerald-700" />
            </div>

            <div className="space-y-3 relative z-10">
              <p className="text-[11px] tracking-[0.25em] uppercase text-zinc-500 font-semibold">
                Available Credits
              </p>

              <h2 className="font-serif text-6xl font-bold text-zinc-900">
                ${currentCredits.toFixed(2)}
              </h2>

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                Auto-applied at checkout
              </div>
            </div>
          </div>

          {/* REDEEM */}

          <div className="rounded-[2rem] bg-white p-8 border border-zinc-200 shadow-xl">
            <p className="text-[11px] tracking-[0.25em] uppercase text-zinc-500 font-semibold">
              Redeem Credits
            </p>

            <h4 className="font-serif text-2xl font-bold text-zinc-900 mt-3">
              Apply To Next Order
            </h4>

            <form onSubmit={handleRedeem} className="space-y-4 mt-8">
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
                className="w-full h-14 rounded-2xl border border-zinc-200 px-5 text-lg font-bold outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <button
                type="submit"
                disabled={
                  redeemAmount <= 0 ||
                  redeemAmount > currentCredits ||
                  redeemSuccess
                }
                className="w-full h-14 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold transition-all disabled:opacity-40"
              >
                {redeemSuccess ? "Applied ✓" : "Redeem Credits"}
              </button>

              {redeemSuccess && (
                <p className="flex items-center gap-2 text-sm text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Credits successfully applied
                </p>
              )}
            </form>
          </div>
        </div>

        {/* HISTORY */}

        <div className="rounded-[2rem] bg-white border border-zinc-200 shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-serif text-2xl font-bold text-zinc-900">
              Referral History
            </h4>

            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <Coins className="w-4 h-4" />
              {referrals.length} Registered
            </div>
          </div>

          <div className="divide-y divide-zinc-100">
            {referrals.map((ref) => (
              <div
                key={ref.id}
                className="py-5 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-zinc-900">{ref.name}</p>

                  <p className="text-sm text-zinc-500">
                    Joined {ref.joinedDate}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-bold ${
                      ref.status === "Successful"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {ref.status}
                  </span>

                  <span className="font-bold text-lg text-zinc-900">
                    +$
                    {ref.credit.toFixed(2)}
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
