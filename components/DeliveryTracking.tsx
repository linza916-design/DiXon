import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  MapPin,
  CheckCircle,
  Calendar,
  ChevronRight,
  History,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  Clock,
  Navigation,
} from "lucide-react";
import { Order } from "../lib/types";
import { initialOrders } from "../lib/data";

export default function DeliveryTracking() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("o-1");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const steps = [
    {
      title: "Order Placed",
      date: "Sep 22, 11:30 AM",
      desc: "Successfully authorized via Flutterwave Client.",
    },
    {
      title: "Processing & Tested",
      date: "Sep 23, 09:12 AM",
      desc: "Batch tested for purity in Dixon sterile labs.",
    },
    {
      title: "Dispatched from Hub",
      date: "Sep 23, 02:40 PM",
      desc: "Released to Premium Logistics with courier scan.",
    },
    {
      title: "In Transit",
      date: "Sep 24, 08:00 AM",
      desc: "Courier vehicle is nearby on route.",
    },
    {
      title: "Delivered Shield",
      date: "Pending",
      desc: "Requires member signature or OTP scan.",
    },
  ];

  const activeStep = activeOrder.stepperIndex; // e.g. 3 corresponds to Step 4 "In Transit" (0-indexed)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      {/* Side Panel: Shipment selector & Details */}
      <div className="lg:col-span-1 space-y-5">
        {/* Active tracking cards */}
        <div className="bg-white rounded-3xl p-5 md:p-6 border border-outline-variant/20 shadow-sm space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-[#737973] uppercase block mb-3">
            Shipment Dossier
          </span>

          <div className="space-y-3">
            {orders.map((o) => {
              const isSelected = o.id === selectedOrderId;
              return (
                <button
                  key={o.id}
                  onClick={() => setSelectedOrderId(o.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-colors cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-primary text-white border-primary"
                      : "bg-cream/40 border-outline-variant/15 hover:bg-cream text-primary"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Truck
                        className={`w-4 h-4 ${isSelected ? "text-secondary-container" : "text-secondary"}`}
                      />
                      <span className="text-xs font-mono font-bold">
                        {o.orderNumber}
                      </span>
                    </div>
                    <div
                      className={`text-[10px] ${isSelected ? "text-cream/80" : "text-outline"}`}
                    >
                      {o.date} • {o.items.length} items
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      isSelected
                        ? "bg-white/10 text-[#b2edf2] border border-white/20"
                        : o.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Deliver Address Details Card */}
        <div className="bg-white rounded-3xl p-5 md:p-6 border border-outline-variant/20 shadow-sm space-y-4 text-xs">
          <span className="text-[10px] font-mono tracking-widest text-[#737973] uppercase block mb-1">
            Shipping Details
          </span>
          <div className="space-y-3 font-sans">
            <div>
              <p className="font-bold text-primary mb-1">Consignee</p>
              <p className="text-outline">{activeOrder.shippingAddress.name}</p>
            </div>
            <div>
              <p className="font-bold text-primary mb-1">Destination Address</p>
              <p className="text-outline">
                {activeOrder.shippingAddress.line1}
              </p>
              <p className="text-outline">
                {activeOrder.shippingAddress.cityStateZip}
              </p>
            </div>
            <div>
              <p className="font-bold text-primary mb-0.5">Carrier Service</p>
              <p className="text-outline">{activeOrder.carrier}</p>
            </div>
            <div>
              <p className="font-bold text-primary mb-1">
                Waybill tracking code
              </p>
              <div className="flex items-center gap-2">
                <span className="font-mono bg-cream/60 py-1 px-2.5 rounded border border-outline-variant/10 text-primary">
                  {activeOrder.trackingNumber}
                </span>
                <button
                  onClick={() => handleCopyCode(activeOrder.trackingNumber)}
                  className="p-1.5 hover:bg-primary/5 rounded transition-colors cursor-pointer"
                >
                  {copiedId === activeOrder.trackingNumber ? (
                    <Check className="w-3.5 h-3.5 text-green-600 animate-pulse" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-outline" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main interactive tracking route view */}
      <div className="lg:col-span-2 space-y-6">
        {/* Live Map vector representation */}
        <div className="bg-white rounded-3xl overflow-hidden border border-outline-variant/20 shadow-sm flex flex-col justify-between h-[230px] p-6 relative">
          {/* Cover map grid design */}
          <div className="absolute inset-0 bg-[#f4f7f5] grid grid-cols-6 grid-rows-4 gap-1 opacity-25 p-2 pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="border border-outline-variant/10 rounded-sm"
              />
            ))}
          </div>

          <div className="relative flex justify-between items-start z-10 w-full">
            <div>
              <span className="text-[9px] font-mono tracking-widest uppercase text-outline block leading-none mb-1">
                Live Courier Dispatch
              </span>
              <h4 className="font-serif text-xl font-bold text-primary flex items-center gap-1.5 leading-none">
                In Transit - Route Active
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-ping" />
              </h4>
            </div>

            <span className="text-[10px] font-mono bg-white px-2.5 py-1 rounded-full border border-outline-variant/15 text-primary flex items-center gap-1">
              <Navigation className="w-3 h-3 text-secondary" />
              0.8 miles away
            </span>
          </div>

          {/* SVG Map route track */}
          <div className="relative flex items-center justify-center flex-1 h-20 w-full z-10 py-6">
            <svg
              className="w-full max-w-lg h-12"
              viewBox="0 0 400 30"
              fill="none"
            >
              {/* Route line */}
              <line
                x1="20"
                y1="15"
                x2="380"
                y2="15"
                stroke="#eae8e3"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Highlight completed path */}
              <line
                x1="20"
                y1="15"
                x2="260"
                y2="15"
                stroke="#2c676c"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Starting warehouse anchor */}
              <circle cx="20" cy="15" r="8" fill="#061b0e" />
              <circle cx="20" cy="15" r="4" fill="#fbf9f4" />

              {/* Current truck location */}
              <g transform="translate(250, 0)">
                <ellipse
                  cx="10"
                  cy="15"
                  rx="14"
                  ry="10"
                  fill="#2c676c"
                  className="animate-pulse"
                />
                <path
                  d="M6 15h8M8 12h4"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>

              {/* Delivery destination house */}
              <circle cx="380" cy="15" r="8" fill="#737973" />
              <circle cx="380" cy="15" r="4" fill="#fbf9f4" />
            </svg>

            {/* Courier Labels floating */}
            <span className="absolute left-[3%] bottom-0 text-[9px] font-mono uppercase text-[#737973]">
              Origin Hub
            </span>
            <span className="absolute left-[60%] bottom-0 text-[9px] font-bold text-secondary flex items-center gap-1">
              Active Vehicle PLE-88
            </span>
            <span className="absolute right-[3%] bottom-0 text-[9px] font-mono uppercase text-[#737973]">
              Sarah's Suite
            </span>
          </div>
        </div>

        {/* Stepper details */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/20 shadow-sm relative space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-[#737973] uppercase block mb-2">
            Transit Timeline
          </span>

          <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-cream-dark">
            {steps.map((st, sIdx) => {
              const checkCompleted = sIdx < activeStep;
              const checkCurrent = sIdx === activeStep - 1;

              return (
                <div
                  key={sIdx}
                  className="flex gap-6 items-start relative z-10"
                >
                  {/* Stepper Indicator bubble */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                      checkCompleted
                        ? "bg-secondary border-secondary text-white"
                        : checkCurrent
                          ? "bg-white border-primary text-primary shadow-md ring-4 ring-primary/5 scale-105"
                          : "bg-white border-cream-dark text-[#737973]"
                    }`}
                  >
                    {checkCompleted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-xs font-mono font-bold">
                        {sIdx + 1}
                      </span>
                    )}
                  </div>

                  {/* Stepper details */}
                  <div className="space-y-0.5">
                    <div className="flex gap-2 items-baseline">
                      <h5
                        className={`font-serif text-md font-bold leading-none ${
                          checkCompleted || checkCurrent
                            ? "text-primary"
                            : "text-outline/80 font-normal"
                        }`}
                      >
                        {st.title}
                      </h5>
                      <span className="text-[10px] font-mono text-[#737973] uppercase whitespace-nowrap">
                        {st.date}
                      </span>
                    </div>
                    <p
                      className={`text-xs ${
                        checkCurrent
                          ? "text-primary font-medium"
                          : "text-outline"
                      }`}
                    >
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-normal">
              <span className="font-bold">Member Purity Verification:</span>{" "}
              This package holds clinical diagnostics sample collection vials.
              Please store the test boxes in cooling chambers upon reception
              directly. No raw freeze needed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
