"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  PackageCheck,
  Copy,
  Check,
  Navigation,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Clock3,
  MapPin,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface OrderItem {
  id: string;
  title: string;
  qty: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: "Processing" | "In Transit" | "Delivered";
  date: string;
  carrier: string;
  trackingNumber: string;
  stepperIndex: number;
  eta: string;
  shippingAddress: {
    name: string;
    line1: string;
    cityStateZip: string;
  };
  items: OrderItem[];
}

const initialOrders: Order[] = [
  {
    id: "o-1",
    orderNumber: "DX-20491",
    status: "In Transit",
    date: "Sep 24",
    carrier: "DiXon Premium Logistics",
    trackingNumber: "DIX-PL-88A291",
    stepperIndex: 4,
    eta: "Arriving Today",
    shippingAddress: {
      name: "Sarah Jenkins",
      line1: "221 Wellness Avenue",
      cityStateZip: "Seattle, WA 98109",
    },
    items: [
      { id: "i1", title: "Liposomal Zinc", qty: 2 },
      { id: "i2", title: "Omega Complex", qty: 1 },
    ],
  },
  {
    id: "o-2",
    orderNumber: "DX-20488",
    status: "Processing",
    date: "Sep 22",
    carrier: "Clinical Freight",
    trackingNumber: "DIX-CL-73P182",
    stepperIndex: 2,
    eta: "Ships Tomorrow",
    shippingAddress: {
      name: "Sarah Jenkins",
      line1: "221 Wellness Avenue",
      cityStateZip: "Seattle, WA 98109",
    },
    items: [
      { id: "i3", title: "Active Magnesium", qty: 1 },
      { id: "i4", title: "Vitamin D3", qty: 2 },
      { id: "i5", title: "Probiotic Formula", qty: 1 },
    ],
  },
  {
    id: "o-3",
    orderNumber: "DX-20471",
    status: "Delivered",
    date: "Sep 18",
    carrier: "DiXon Shield Carrier",
    trackingNumber: "DIX-SH-11K812",
    stepperIndex: 5,
    eta: "Delivered",
    shippingAddress: {
      name: "Sarah Jenkins",
      line1: "221 Wellness Avenue",
      cityStateZip: "Seattle, WA 98109",
    },
    items: [{ id: "i6", title: "Immunity Stack", qty: 1 }],
  },
];

export default function DeliveryTracking() {
  const [orders] = useState<Order[]>(initialOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("o-1");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeOrder = useMemo(
    () => orders.find((o) => o.id === selectedOrderId) || initialOrders[0],
    [orders, selectedOrderId],
  );

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(code);

      setTimeout(() => {
        setCopiedId(null);
      }, 1800);
    } catch (error) {
      console.error("Failed to copy tracking code:", error);
    }
  };

  const steps = [
    {
      title: "Order Placed",
      date: "Sep 22 · 11:30 AM",
      desc: "Secure payment verified through Flutterwave.",
    },
    {
      title: "Lab Processing",
      date: "Sep 23 · 09:12 AM",
      desc: "Supplement batch screened in sterile facilities.",
    },
    {
      title: "Courier Dispatch",
      date: "Sep 23 · 02:40 PM",
      desc: "Shipment released to premium logistics partner.",
    },
    {
      title: "In Transit",
      date: "Sep 24 · 08:00 AM",
      desc: "Vehicle is currently active within your route zone.",
    },
    {
      title: "Delivered",
      date: "Pending",
      desc: "Requires OTP confirmation and secure handoff.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#06110b] text-white relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-12rem] right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-8">
        {/* Hero Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-emerald-300 backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5" />
            Premium Delivery Tracking
          </div>

          <div className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="font-serif text-4xl md:text-6xl font-semibold tracking-tight text-white leading-none">
                Shipment Intelligence
              </h1>

              <p className="mt-4 text-sm md:text-base text-white/55 max-w-2xl leading-relaxed">
                Monitor every supplement shipment with real-time logistics,
                molecular integrity handling, and secure delivery verification.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15">
                <ShieldCheck className="w-6 h-6 text-emerald-300" />
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-200/70">
                  Active Security Layer
                </p>
                <p className="text-sm font-semibold text-white">
                  Clinical Chain Protected
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Orders */}
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5 md:p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                    Shipment Queue
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">Active Orders</h3>
                </div>

                <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-emerald-300" />
                </div>
              </div>

              <div className="space-y-3">
                {orders.map((order) => {
                  const selected = order.id === selectedOrderId;

                  return (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      key={order.id}
                      onClick={() => setSelectedOrderId(order.id)}
                      className={`w-full rounded-3xl p-4 text-left transition-all border ${
                        selected
                          ? "border-emerald-400/40 bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                          : "border-white/8 bg-white/[0.03] hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <Truck
                              className={`w-4 h-4 ${
                                selected ? "text-emerald-300" : "text-white/50"
                              }`}
                            />

                            <span className="font-mono text-xs font-bold tracking-wider">
                              {order.orderNumber}
                            </span>
                          </div>

                          <p
                            className={`mt-2 text-xs ${
                              selected ? "text-white/70" : "text-white/45"
                            }`}
                          >
                            {order.date} • {order.items.length} Items
                          </p>
                        </div>

                        <div
                          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                            order.status === "Delivered"
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/20"
                              : order.status === "In Transit"
                                ? "bg-cyan-500/15 text-cyan-300 border border-cyan-400/20"
                                : "bg-amber-500/15 text-amber-300 border border-amber-400/20"
                          }`}
                        >
                          {order.status}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-white/50">
                          ETA: {order.eta}
                        </span>

                        <ChevronRight className="w-4 h-4 text-white/35" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Shipping Details */}
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                    Delivery Details
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">Destination</h3>
                </div>

                <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-cyan-300" />
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/35 mb-1">
                    Consignee
                  </p>

                  <p className="font-medium text-white">
                    {activeOrder.shippingAddress.name}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/35 mb-1">
                    Address
                  </p>

                  <p className="text-sm text-white/70 leading-relaxed">
                    {activeOrder.shippingAddress.line1}
                    <br />
                    {activeOrder.shippingAddress.cityStateZip}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/35 mb-1">
                    Carrier
                  </p>

                  <p className="text-sm text-white/70">{activeOrder.carrier}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/35 mb-2">
                    Tracking Code
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 font-mono text-xs tracking-wider text-emerald-300 overflow-hidden">
                      {activeOrder.trackingNumber}
                    </div>

                    <button
                      onClick={() => handleCopyCode(activeOrder.trackingNumber)}
                      className="h-12 w-12 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center"
                    >
                      {copiedId === activeOrder.trackingNumber ? (
                        <Check className="w-4 h-4 text-emerald-300" />
                      ) : (
                        <Copy className="w-4 h-4 text-white/60" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Live Route */}
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-2xl overflow-hidden p-6 md:p-8 relative">
              {/* grid */}
              <div className="absolute inset-0 opacity-[0.07]">
                <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-white/10" />
                  ))}
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      Live Courier Route
                    </p>

                    <h2 className="mt-2 font-serif text-3xl md:text-4xl font-semibold flex items-center gap-3">
                      In Transit
                      <span className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300"></span>
                      </span>
                    </h2>

                    <p className="mt-3 max-w-xl text-sm text-white/55 leading-relaxed">
                      Your courier is currently navigating the final delivery
                      route with environmental temperature monitoring enabled.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3">
                    <div className="flex items-center gap-2 text-cyan-200">
                      <Navigation className="w-4 h-4" />

                      <span className="text-xs uppercase tracking-wider font-semibold">
                        0.8 Miles Away
                      </span>
                    </div>
                  </div>
                </div>

                {/* Route SVG */}
                <div className="mt-10 relative">
                  <svg
                    className="w-full h-[140px]"
                    viewBox="0 0 900 140"
                    fill="none"
                  >
                    {/* Base Route */}
                    <path
                      d="M60 70 C 200 70, 220 40, 360 70 S 560 100, 700 70 S 820 40, 860 70"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />

                    {/* Active Path */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 0.72 }}
                      transition={{ duration: 2 }}
                      d="M60 70 C 200 70, 220 40, 360 70 S 560 100, 700 70 S 820 40, 860 70"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />

                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>

                    {/* Start */}
                    <circle cx="60" cy="70" r="14" fill="#10b981" />

                    {/* Vehicle */}
                    <motion.g
                      animate={{
                        x: [0, 15, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <circle
                        cx="620"
                        cy="82"
                        r="22"
                        fill="#0f172a"
                        stroke="#22d3ee"
                        strokeWidth="4"
                      />

                      <Truck
                        x={608}
                        y={70}
                        width={24}
                        height={24}
                        color="#ffffff"
                      />
                    </motion.g>

                    {/* Destination */}
                    <circle
                      cx="860"
                      cy="70"
                      r="14"
                      fill="#ffffff"
                      opacity="0.5"
                    />
                  </svg>

                  <div className="flex justify-between mt-2 text-[11px] uppercase tracking-[0.18em] text-white/40">
                    <span>Origin Hub</span>
                    <span className="text-cyan-300">Vehicle PLE-88</span>
                    <span>Sarah's Suite</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                    Delivery Timeline
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold">
                    Transit Progress
                  </h3>
                </div>

                <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <Clock3 className="w-4 h-4 text-amber-300" />
                  <span className="text-xs text-white/70">
                    Updated 2 mins ago
                  </span>
                </div>
              </div>

              <div className="mt-10 relative">
                <div className="absolute left-[18px] top-0 bottom-0 w-px bg-white/10" />

                <div className="space-y-8">
                  {steps.map((step, index) => {
                    const completed = index < activeOrder.stepperIndex - 1;

                    const current = index === activeOrder.stepperIndex - 1;

                    return (
                      <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        key={index}
                        className="relative flex gap-5"
                      >
                        <div
                          className={`relative z-10 h-10 w-10 rounded-full border flex items-center justify-center ${
                            completed
                              ? "bg-emerald-500 border-emerald-400"
                              : current
                                ? "bg-cyan-400/10 border-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.3)]"
                                : "bg-black/20 border-white/10"
                          }`}
                        >
                          {completed ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : (
                            <span
                              className={`text-xs font-bold ${
                                current ? "text-cyan-200" : "text-white/50"
                              }`}
                            >
                              {index + 1}
                            </span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h4
                              className={`font-semibold text-lg ${
                                completed || current
                                  ? "text-white"
                                  : "text-white/45"
                              }`}
                            >
                              {step.title}
                            </h4>

                            <span className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                              {step.date}
                            </span>
                          </div>

                          <p
                            className={`mt-2 text-sm leading-relaxed ${
                              current ? "text-cyan-100" : "text-white/50"
                            }`}
                          >
                            {step.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Alert */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOrder.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-500/10 p-5 flex items-start gap-4"
                >
                  <div className="h-12 w-12 rounded-2xl bg-amber-400/10 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5 text-amber-300" />
                  </div>

                  <div>
                    <h5 className="font-semibold text-amber-100">
                      Temperature Sensitive Delivery
                    </h5>

                    <p className="mt-1 text-sm leading-relaxed text-amber-100/70">
                      This package contains active wellness compounds and
                      diagnostic materials. Store in a cool environment
                      immediately after reception.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: PackageCheck,
                  title: "Package Integrity",
                  value: "98.8%",
                  desc: "Environmental stability maintained.",
                },
                {
                  icon: ShieldCheck,
                  title: "Security Validation",
                  value: "Protected",
                  desc: "Biometric delivery confirmation active.",
                },
                {
                  icon: Clock3,
                  title: "Estimated Arrival",
                  value: activeOrder.eta,
                  desc: "Dynamic route optimization enabled.",
                },
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5"
                >
                  <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <card.icon className="w-5 h-5 text-emerald-300" />
                  </div>

                  <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-white/40">
                    {card.title}
                  </p>

                  <h4 className="mt-2 text-2xl font-semibold">{card.value}</h4>

                  <p className="mt-2 text-sm text-white/50 leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
