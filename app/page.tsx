"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sun,
  Moon,
  ShoppingCart,
  Star,
  Users,
  Truck,
  Gift,
  Brain,
  LogOut,
  Menu,
  X,
  CheckCircle2,
  ShieldCheck,
  Trash2,
  Lock,
  Wallet,
} from "lucide-react";

import { Product } from "../lib/types";

import SplashScreen from "../components/SplashScreen";
import Onboarding from "../components/Onboarding";
import AuthScreens from "../components/AuthScreens";
import FamilyDashboard from "../components/FamilyDashboard";
import WellnessAdvisor from "../components/WellnessAdvisor";
import Marketplace from "../components/Marketplace";
import DeliveryTracking from "../components/DeliveryTracking";
import RewardsSharing from "../components/RewardsSharing";

type AppState = "splash" | "onboarding" | "auth" | "platform";
type Tab = "dashboard" | "advisor" | "marketplace" | "delivery" | "rewards";

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  const [appState, setAppState] = useState<AppState>("splash");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  const [cart, setCart] = useState<
    { product: Product; qty: number; isSub: boolean }[]
  >([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentCredits, setCurrentCredits] = useState(140);
  const [checkoutStep, setCheckoutStep] = useState<
    "none" | "processing" | "success"
  >("none");

  const [lastTxId, setLastTxId] = useState("");
  const [advisorOverride, setAdvisorOverride] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (!isCartOpen) return;

    const focusable =
      cartRef.current?.querySelectorAll<HTMLElement>(
        'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])',
      ) || [];

    focusable[0]?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isCartOpen]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleAddToCart = (product: Product, qty: number, isSub: boolean) => {
    setCart((prev) => {
      const found = prev.find(
        (i) => i.product.id === product.id && i.isSub === isSub,
      );

      if (found) {
        return prev.map((i) =>
          i.product.id === product.id && i.isSub === isSub
            ? { ...i, qty: i.qty + qty }
            : i,
        );
      }

      return [...prev, { product, qty, isSub }];
    });
  };

  const handleRemoveFromCart = (id: string, isSub: boolean) =>
    setCart((prev) =>
      prev.filter((i) => !(i.product.id === id && i.isSub === isSub)),
    );

  const cartSubtotal = cart.reduce((sum, item) => {
    const price = item.isSub ? item.product.price * 0.85 : item.product.price;

    return sum + price * item.qty;
  }, 0);

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);

  const handleCheckout = () => {
    setCheckoutStep("processing");

    const tx = "FLW-" + Math.floor(Math.random() * 999999);

    setLastTxId(tx);

    setTimeout(() => {
      setCheckoutStep("success");
      setCart([]);
    }, 2500);
  };

  if (appState === "splash")
    return <SplashScreen onComplete={() => setAppState("onboarding")} />;

  if (appState === "onboarding")
    return <Onboarding onComplete={() => setAppState("auth")} />;

  if (appState === "auth")
    return (
      <AuthScreens
        onSuccess={(u) => {
          setUser(u);
          setAppState("platform");
        }}
      />
    );

  const navItems = [
    { id: "dashboard", label: "Family", icon: Users },
    { id: "advisor", label: "Advisor", icon: Brain },
    { id: "marketplace", label: "Shop", icon: Star },
    { id: "delivery", label: "Delivery", icon: Truck },
    { id: "rewards", label: "Rewards", icon: Gift },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* Header */}
      <header
        className="fixed top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl"
        role="banner"
      >
        <nav
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8"
          aria-label="Primary navigation"
        >
          <button
            aria-label="Go home"
            className="flex items-center gap-3 focus-visible:ring-2 ring-offset-2 rounded-xl"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-emerald-700 flex items-center justify-center font-black text-black">
              DX
            </div>
            <span className="text-2xl font-bold tracking-tight">DiXon</span>
          </button>

          <div className="hidden lg:flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  aria-current={activeTab === item.id ? "page" : undefined}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`px-5 py-2 rounded-full font-medium transition focus-visible:ring-2
                  ${
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted focus-visible:ring-2"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              aria-label={`Shopping cart with ${cartCount} items`}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-muted focus-visible:ring-2"
            >
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              aria-label="Logout"
              onClick={() => {
                setUser(null);
                setAppState("auth");
              }}
              className="p-2 rounded-full hover:bg-muted focus-visible:ring-2"
            >
              <LogOut />
            </button>

            <button
              className="lg:hidden p-2 rounded-xl bg-primary text-white"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="pt-28 max-w-7xl mx-auto px-4 md:px-8 pb-20" role="main">
        <section className="mb-10 flex flex-wrap justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Trusted Family Wellness
            </p>
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome back, {user?.name}
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 text-sm">
            <ShieldCheck className="w-4 h-4" />
            Verified Family Member
          </div>
        </section>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -16 }}
          >
            {activeTab === "dashboard" && (
              <FamilyDashboard
                onAskAdvisor={function (customQuestion: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
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
                onRedeemCredits={setCurrentCredits}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsCartOpen(false)}
            />

            <motion.aside
              ref={cartRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-title"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background border-l shadow-2xl"
            >
              <div className="p-6 border-b flex justify-between items-center">
                <h2 id="cart-title" className="text-xl font-bold">
                  Shopping Cart
                </h2>

                <button
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close cart"
                >
                  <X />
                </button>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto h-[70%]">
                {cart.map((item) => (
                  <div key={item.product.id} className="rounded-2xl border p-4">
                    <h3 className="font-semibold">{item.product.name}</h3>

                    <p>Qty: {item.qty}</p>

                    <button
                      onClick={() =>
                        handleRemoveFromCart(item.product.id, item.isSub)
                      }
                      className="text-red-600 mt-2 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t space-y-4">
                <div className="flex justify-between">
                  <span>Total</span>
                  <strong>
                    ${Math.max(0, cartSubtotal - currentCredits).toFixed(2)}
                  </strong>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full rounded-full bg-primary text-white py-3 font-semibold"
                >
                  <Lock className="inline mr-2 w-4 h-4" />
                  Secure Checkout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © 2026 DiXon Family Wellness Marketplace
      </footer>
    </div>
  );
}
