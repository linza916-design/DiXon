import { FamilyMember, Product, Order, Referral } from "./types";

export const initialFamilyMembers: FamilyMember[] = [
  {
    id: "m-1",
    name: "Sarah (You)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    role: "Wellness Leader",
    goal: "Mindful Presence & Immune Support",
    progress: 80,
    healthScore: 88,
    stamina: "Optimal",
    sleepQuality: "82%",
    coatHealth: "Healthy Radiant",
    nextScanDays: 3,
  },
  {
    id: "m-2",
    name: "David",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    role: "Active Father",
    goal: "Cardio Stamina & Metabolic Efficiency",
    progress: 60,
    healthScore: 78,
    stamina: "High",
    sleepQuality: "75%",
    coatHealth: "Sturdy Vitality",
    nextScanDays: 7,
  },
  {
    id: "m-3",
    name: "Leo",
    avatar: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=150&h=150", // Golden Retriever puppy
    role: "Family Guardian (Pet)",
    goal: "Coat Luster, Digestion & Joint Health",
    progress: 95,
    healthScore: 92,
    stamina: "Maximum",
    sleepQuality: "94%",
    coatHealth: "Exquisite Luster",
    nextScanDays: 2,
  },
  {
    id: "m-4",
    name: "Mia",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150", // Young daughter
    role: "Pre-schooler",
    goal: "Cognitive Growth & Purity Shield",
    progress: 70,
    healthScore: 84,
    stamina: "Superb",
    sleepQuality: "88%",
    coatHealth: "Nurtured Glow",
    nextScanDays: 5,
  }
];

export const premiumProducts: Product[] = [
  {
    id: "p-1",
    name: "The Synergy Core Bundle",
    description: "Designed carefully to sustain focus while naturally replenishing energy stores identified in your monthly metabolic report. Purity certified.",
    price: 112.00,
    originalPrice: 145.00,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400&h=300",
    category: "Bundles",
    premiumSelection: true,
    tags: ["Organic Ashwagandha", "Ionic Zinc", "B-Complex"],
    stars: 5,
  },
  {
    id: "p-2",
    name: "Evening Rest & Ritual Kit",
    description: "Further enhance sleep latency and quality with our small-batch artisanal magnesium soak combined with botanical sleep tincture droplets.",
    price: 89.00,
    originalPrice: 110.00,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400&h=300",
    category: "Rest Optimization",
    premiumSelection: true,
    tags: ["Sovereign Magnesium", "Lavender Tincture"],
    stars: 5,
  },
  {
    id: "p-3",
    name: "Enzyme+ Pet Booster Pack",
    description: "Clinically formulated to aid digestion, eliminate internal mineral deficiencies, and produce a radiant, lustrous coat for companion animals.",
    price: 34.00,
    originalPrice: 45.00,
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400&h=300",
    category: "Pet Health",
    premiumSelection: true,
    tags: ["Core Enzymes", "Lecithin Luster", "Active Probiotics"],
    stars: 5,
  },
  {
    id: "p-4",
    name: "D3 / K2 Kids Pure Daily Drops",
    description: "A sugar-free, cold-pressed glass bottle with a sterile dropper for highly precise pediatric absorption. 100% natural and transparent.",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&q=80&w=400&h=300",
    category: "Pediatric Care",
    premiumSelection: true,
    tags: ["Bioactive D3", "Vitamin K2 Menaquinone-7"],
    stars: 5,
  },
  {
    id: "p-5",
    name: "Metabolic Zinc & Purity Liposomal",
    description: "High-absorption liquid zinc supporting respiratory immunity, cellular repair, and daily vitality markers. Gentle on sensitive families.",
    price: 28.00,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=400&h=300",
    category: "Immunity",
    premiumSelection: false,
    tags: ["Liposomal Zinc", "Acerola Vitamin C"],
    stars: 4,
  }
];

export const initialOrders: Order[] = [
  {
    id: "o-1",
    orderNumber: "DX-99281",
    date: "Sep 24, 2026",
    status: "In Transit",
    total: 204.00,
    carrier: "Premium Logistics Express",
    trackingNumber: "PLE-7729-XJ",
    shippingAddress: {
      name: "Sarah Jenkins",
      line1: "742 Magnolia Drive, Apt 4B",
      cityStateZip: "New York, NY 10012"
    },
    stepperIndex: 3, // In Transit (Stage 1: Placed, Stage 2: Processing, Stage 3: In Transit, Stage 4: Out for Delivery, Stage 5: Delivered)
    items: [
      {
        productId: "p-5",
        name: "Metabolic Zinc & Purity Liposomal",
        image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=150&h=150",
         price: 84.00, // custom trial inclusion price or kit bundle
        qty: 1
      },
      {
        productId: "p-2",
        name: "Evening Rest & Ritual Kit",
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=150&h=150",
        price: 120.00,
        qty: 1
      }
    ]
  },
  {
    id: "o-2",
    orderNumber: "DX-88412",
    date: "Aug 22, 2026",
    status: "Delivered",
    total: 156.50,
    carrier: "Premium Logistics Express",
    trackingNumber: "PLE-8199-AA",
    shippingAddress: {
      name: "Sarah Jenkins",
      line1: "742 Magnolia Drive, Apt 4B",
      cityStateZip: "New York, NY 10012"
    },
    stepperIndex: 5,
    items: [
      {
        productId: "p-3",
        name: "Enzyme+ Pet Booster Pack",
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=150&h=150",
        price: 34.00,
        qty: 2
      },
      {
        productId: "p-4",
        name: "D3 / K2 Kids Pure Daily Drops",
        image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&q=80&w=150&h=150",
        price: 42.00,
        qty: 2
      }
    ]
  }
];

export const initialReferrals: Referral[] = [
  {
    id: "ref-1",
    name: "Emily S.",
    joinedDate: "May 24, 2026",
    status: "Successful",
    credit: 20
  },
  {
    id: "ref-2",
    name: "Marcus J.",
    joinedDate: "May 21, 2026",
    status: "Pending",
    credit: 20
  },
  {
    id: "ref-3",
    name: "Lila K.",
    joinedDate: "May 15, 2026",
    status: "Successful",
    credit: 20
  }
];
