"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  ShoppingCart,
  Star,
  Users,
  Sparkles,
  Truck,
  Gift,
  Brain,
  LogOut,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  ShieldCheck,
  Trash2,
  Lock,
  Wallet,
  Coins,
} from "lucide-react";

import { Product, Order, FamilyMember } from "../lib/types";
import SplashScreen from "../components/SplashScreen";
import Onboarding from "../components/Onboarding";
import AuthScreens from "../components/AuthScreens";
import FamilyDashboard from "../components/FamilyDashboard";
import WellnessAdvisor from "../components/WellnessAdvisor";
import Marketplace from "../components/Marketplace";
import DeliveryTracking from "../components/DeliveryTracking";
import RewardsSharing from "../components/RewardsSharing";

export default function Home() {
  const [appState, setAppState] = useState<
    "splash" | "onboarding" | "auth" | "platform"
  >("splash");
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "advisor" | "marketplace" | "delivery" | "rewards"
  >("dashboard");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  // Cart logic
  const [cart, setCart] = useState<
    { product: Product; qty: number; isSub: boolean }[]
  >([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentCredits, setCurrentCredits] = useState(140.0);
  const [checkoutStep, setCheckoutStep] = useState<
    "none" | "processing" | "success"
  >("none");
  const [lastTxId, setLastTxId] = useState("");

  const [advisorOverride, setAdvisorOverride] = useState("");

  // Mobile Menu Layout Toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleAskAdvisor = (query: string) => {
    setAdvisorOverride(query);
    setActiveTab("advisor");
  };

  const handleAddToCart = (product: Product, qty: number, isSub: boolean) => {
    setCart((prev) => {
      const exists = prev.find(
        (item) => item.product.id === product.id && item.isSub === isSub,
      );
      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id && item.isSub === isSub
            ? { ...item, qty: item.qty + qty }
            : item,
        );
      }
      return [...prev, { product, qty, isSub }];
    });
  };

  const handleRemoveFromCart = (productId: string, isSub: boolean) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.isSub === isSub),
      ),
    );
  };

  // Safe credit deduction
  const applyRedeemCredits = (amount: number) => {
    setCurrentCredits((prev) => Math.max(0, prev - amount));
  };

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);

    setAppState("platform");
  };

  const handleFlutterwaveCheckout = () => {
    setCheckoutStep("processing");
    const mockTxId = "FLW-TX-" + Math.floor(100000 + Math.random() * 900000);
    setLastTxId(mockTxId);

    // Simulate payment response
    setTimeout(() => {
      setCheckoutStep("success");
      setCart([]);
    }, 2800);
  };

  // Calc cart prices
  const cartSubtotal = cart.reduce((total, item) => {
    const unitPrice = item.isSub
      ? item.product.price * 0.85
      : item.product.price;
    return total + unitPrice * item.qty;
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.qty, 0);

  // Transitions inside components
  if (appState === "splash") {
    return <SplashScreen onComplete={() => setAppState("onboarding")} />;
  }

  if (appState === "onboarding") {
    return <Onboarding onComplete={() => setAppState("auth")} />;
  }

  if (appState === "auth") {
    return <AuthScreens onSuccess={handleAuthSuccess} />;
  }

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-[#061b0e] text-cream" : "bg-cream text-primary"} transition-colors duration-300 font-sans flex flex-col`}
    >
      {/* Platform Header */}
      <nav
        className={`fixed top-0 w-full h-20 z-40 flex items-center justify-between px-6 md:px-16 border-b ${
          theme === "dark"
            ? "bg-[#061b0e]/82 border-white/10"
            : "bg-cream/82 border-outline-variant/10"
        } backdrop-blur-md`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#C5A059] to-[#8E6D31] rounded-full flex items-center justify-center shrink-0">
            <span className="text-black text-xs font-serif font-extrabold">
              DX
            </span>
          </div>
          <span className="font-sans text-2xl font-bold tracking-tighter text-white">
            DIXON
          </span>
          <div className="h-6 w-[1px] bg-white/20 hidden md:block"></div>
          <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#C5A059]">
            <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></div>
            Verified Platform Status: Active
          </div>
        </div>

        {/* Large Screen Navigation Tabs */}
        <div className="hidden lg:flex items-center gap-1.5 bg-cream-dark/40 dark:bg-primary-container/20 p-1.5 rounded-full border border-outline-variant/5">
          {[
            {
              id: "dashboard",
              label: "My Family",
              icon: <Users className="w-4 h-4" />,
            },
            {
              id: "advisor",
              label: "AI consultation",
              icon: <Brain className="w-4 h-4" />,
            },
            {
              id: "marketplace",
              label: "Supplement store",
              icon: <Star className="w-4 h-4 text-secondary-container" />,
            },
            {
              id: "delivery",
              label: "Active shipments",
              icon: <Truck className="w-4 h-4" />,
            },
            {
              id: "rewards",
              label: "Wellness awards",
              icon: <Gift className="w-4 h-4" />,
            },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold leading-none rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? "bg-primary text-white shadow-md font-sans"
                    : "text-outline hover:bg-cream dark:hover:bg-white/5"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Controls Side */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Mode Switch */}
          <button
            onClick={toggleTheme}
            className="p-2.5 bg-white/40 dark:bg-white/10 rounded-full border border-outline-variant/10 hover:shadow-sm cursor-pointer transition-all"
            title="Toggle theme visual model"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-primary" />
            )}
          </button>

          {/* Cart Icon trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2.5 bg-white/40 dark:bg-white/10 rounded-full border border-outline-variant/10 hover:shadow-sm cursor-pointer relative transition-all"
          >
            <ShoppingCart className="w-4 h-4 text-primary dark:text-cream" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold font-mono h-4 w-4 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Log Out */}
          <button
            onClick={() => {
              setUser(null);
              setAppState("auth");
            }}
            className="p-2.5 bg-white/40 dark:bg-white/10 rounded-full border border-outline-variant/10 hover:bg-red-50 dark:hover:bg-red-950/20 text-outline hover:text-red-600 cursor-pointer transition-colors"
            title="Logout and Lock Account"
          >
            <LogOut className="w-4 h-4" />
          </button>

          {/* Mobile responsive toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 bg-primary text-white rounded-xl cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-20 w-full z-30 flex flex-col space-y-4 p-6 border-b lg:hidden ${
              theme === "dark"
                ? "bg-[#061b0e] border-white/10"
                : "bg-cream border-outline-variant/10"
            }`}
          >
            {[
              {
                id: "dashboard",
                label: "My Family",
                icon: <Users className="w-4 h-4" />,
              },
              {
                id: "advisor",
                label: "AI consultation",
                icon: <Brain className="w-4 h-4" />,
              },
              {
                id: "marketplace",
                label: "Supplement store",
                icon: <Star className="w-4 h-4" />,
              },
              {
                id: "delivery",
                label: "Active shipments",
                icon: <Truck className="w-4 h-4" />,
              },
              {
                id: "rewards",
                label: "Wellness awards",
                icon: <Gift className="w-4 h-4" />,
              },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 p-4 text-sm font-bold font-sans rounded-2xl w-full text-left cursor-pointer transition-all ${
                    isSelected
                      ? "bg-primary text-white"
                      : "text-outline hover:bg-cream-dark/20"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main workspace workspace area */}
      <main className="flex-grow pt-28 pb-16 px-6 md:px-16 max-w-7xl mx-auto w-full">
        {/* User Greeting Indicator */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-light-outline/5 pb-5">
          <div className="font-sans">
            <span className="text-[10px] font-mono tracking-widest text-outline uppercase">
              Welcome to your workspace
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-primary dark:text-cream leading-none mt-1">
              Sarah's Wellness Sanctuary
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs bg-white/75 dark:bg-white/5 border border-outline-variant/10 px-4.5 py-2.5 rounded-full font-sans font-semibold">
            <div className="p-1 bgColor bg-secondary text-white rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            Dixon Identity Verified Member
          </div>
        </div>

        {/* Navigation Router views */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
          >
            {activeTab === "dashboard" && (
              <FamilyDashboard onAskAdvisor={handleAskAdvisor} />
            )}

            {activeTab === "advisor" && (
              <WellnessAdvisor
                overridePrompt={advisorOverride}
                clearOverride={() => setAdvisorOverride("")}
              />
            )}

            {activeTab === "marketplace" && (
              <Marketplace
                onAddToCart={handleAddToCart}
                activeCartCount={cartCount}
              />
            )}

            {activeTab === "delivery" && <DeliveryTracking />}

            {activeTab === "rewards" && (
              <RewardsSharing
                currentCredits={currentCredits}
                onRedeemCredits={applyRedeemCredits}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Dynamic Slide Drawer for Shopping Cart */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-[#061b0e] z-50 cursor-pointer"
            />

            {/* Slide block */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className={`fixed top-0 right-0 h-full w-full max-w-md z-50 shadow-2xl flex flex-col justify-between ${
                theme === "dark"
                  ? "bg-[#092212] text-cream border-l border-white/5"
                  : "bg-white text-primary border-l border-outline-variant/20"
              }`}
            >
              {/* Cart Drawer Header */}
              <div className="p-6 border-b border-light-outline/5 bg-cream/10 flex justify-between items-center bg-cream/35">
                <div className="flex items-center gap-1.5">
                  <ShoppingCart className="w-5 h-5 text-secondary" />
                  <h4 className="font-serif text-xl font-bold">
                    Shopping Cart
                  </h4>
                  <span className="text-xs px-2.5 py-0.5 bg-primary/5 text-primary border border-outline-variant/10 rounded-full font-bold ml-1">
                    {cartCount} items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 hover:bg-primary/5 rounded-full cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-none">
                {/* Checkout processing overlays */}
                {checkoutStep === "processing" && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-4 border-secondary border-t-transparent animate-spin" />
                      <Lock className="w-6 h-6 text-[#2c676c] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-bold text-[#336d72]">
                        Flutterwave Processing
                      </h4>
                      <p className="text-xs text-outline mt-1.5 max-w-xs mx-auto leading-relaxed">
                        Initializing secure payment gateways. Validating
                        credentials and card details across verification
                        accounts...
                      </p>
                    </div>
                  </div>
                )}

                {checkoutStep === "success" && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-5 px-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-700 mx-auto shadow">
                      <CheckCircle2 className="w-10 h-10 animate-bounce" />
                    </div>
                    <div className="space-y-1 font-sans">
                      <h4 className="font-serif text-2xl font-bold text-primary">
                        Transaction Secured!
                      </h4>
                      <p className="text-[10px] font-mono text-outline uppercase tracking-wider">
                        CODE SCAN APPROVED
                      </p>
                    </div>
                    <p className="text-xs text-outline max-w-xs leading-relaxed">
                      We've successfully debited coordinates via secure
                      Flutterwave client parameter rules. Transaction code:
                    </p>
                    <span className="font-mono bg-cream py-1.5 px-4 rounded-xl border border-outline-variant/20 text-xs font-bold font-mono text-primary select-all">
                      {lastTxId}
                    </span>
                    <button
                      onClick={() => {
                        setCheckoutStep("none");
                        setIsCartOpen(false);
                        setActiveTab("delivery");
                      }}
                      className="px-6 h-10 bg-primary hover:bg-neutral-800 text-white font-bold rounded-full text-xs transition-colors cursor-pointer"
                    >
                      Track Order Delivery
                    </button>
                  </div>
                )}

                {/* Normal cart items layout */}
                {checkoutStep === "none" && (
                  <>
                    {cart.length === 0 ? (
                      <div className="h-72 flex flex-col items-center justify-center text-center text-outline">
                        <ShoppingCart className="w-8 h-8 text-[#eae8e3] mb-3" />
                        <p className="text-xs font-semibold">
                          Your supplement cart is currently empty.
                        </p>
                        <p className="text-[11px] mt-1 text-outline-variant shadow-inner">
                          Browse the supplement store to add selections.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item, idx) => {
                          const unitPrice = item.isSub
                            ? item.product.price * 0.85
                            : item.product.price;
                          return (
                            <div
                              key={idx}
                              className="p-3.5 bg-cream/35 dark:bg-white/5 rounded-2xl border border-outline-variant/10 flex gap-3.5 items-center justify-between"
                            >
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                referrerPolicy="no-referrer"
                                className="w-14 h-14 rounded-xl object-cover shrink-0"
                              />

                              <div className="flex-1 min-w-0 font-sans">
                                <h5 className="font-serif text-xs font-bold text-primary dark:text-cream truncate">
                                  {item.product.name}
                                </h5>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-[10px] text-outline">
                                    Qty: {item.qty}
                                  </span>
                                  <span className="text-[10px] font-bold text-primary bg-primary/5 dark:bg-white/10 dark:text-cream rounded-full px-2">
                                    {item.isSub
                                      ? "Monthly Subscription"
                                      : "One-Time"}
                                  </span>
                                </div>
                              </div>

                              <div className="text-right shrink-0">
                                <p className="font-serif text-xs font-bold text-primary dark:text-cream price font-bold">
                                  ${(unitPrice * item.qty).toFixed(2)}
                                </p>
                                <button
                                  onClick={() =>
                                    handleRemoveFromCart(
                                      item.product.id,
                                      item.isSub,
                                    )
                                  }
                                  className="text-[10px] font-semibold text-red-600 hover:underline mt-1 cursor-pointer inline-flex items-center gap-1 align-middle"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Cart Drawer Footer */}
              {checkoutStep === "none" && cart.length > 0 && (
                <div className="p-6 border-t border-outline-variant/15 bg-cream/15">
                  <div className="space-y-3 font-sans">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-outline font-medium">
                        Subtotal Selected
                      </span>
                      <span className="font-bold text-primary dark:text-cream font-mono">
                        ${cartSubtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Applied Credits if any */}
                    <div className="flex justify-between items-center text-xs py-1 text-green-700">
                      <span className="font-semibold flex items-center gap-1 text-xs">
                        <Wallet className="w-3.5 h-3.5 text-green-700" />{" "}
                        Applicable Credits Discount (100% applied)
                      </span>
                      <span className="font-bold font-mono">
                        -${Math.min(cartSubtotal, currentCredits).toFixed(2)}
                      </span>
                    </div>

                    <div className="border-t border-outline-variant/10 my-3" />

                    {/* Final Pay Amount */}
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-bold text-primary dark:text-cream">
                        Grand Total Billed
                      </span>
                      <span
                        className="font-serif text-3xl font-extrabold text-[#11351e]"
                        id="cart-grand-total"
                      >
                        ${Math.max(0, cartSubtotal - currentCredits).toFixed(2)}
                      </span>
                    </div>

                    {/* Flutterwave Pay secure action */}
                    <button
                      onClick={handleFlutterwaveCheckout}
                      className="w-full h-12 bg-primary text-white hover:bg-neutral-800 rounded-full font-serif text-md font-bold transition-all shadow-lg flex items-center justify-center gap-2 mt-4 cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-white" />
                      Secure with Flutterwave Gateway
                    </button>

                    <p className="text-[10px] text-center text-outline leading-tight mt-1 pt-1.5 font-sans">
                      By proceeding, you agree to DiXon subscription terms.
                      Cancel penalty free via dashboard at any time. Verified
                      non-toxic.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Humble Footer brand credits */}
      <footer className="py-8 bg-cream-dark/15 border-t border-light-outline/5 text-center text-xs text-outline font-medium shrink-0 font-sans">
        <p>© 2026 DiXon Premium Supplement Marketplace. All rights reserved.</p>
        <p className="text-[10px] text-[#737973] uppercase tracking-widest mt-1">
          Nurtured Trust & Security
        </p>
      </footer>
    </div>
  );
}
