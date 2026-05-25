export interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  goal: string;
  progress: number;
  healthScore: number;
  stamina: string;
  sleepQuality: string;
  coatHealth: string; // for Leo the pet or general metabolic/hair/skin vitality
  nextScanDays: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  premiumSelection: boolean;
  tags: string[];
  stars: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'In Transit' | 'Delivered' | 'Processing';
  total: number;
  items: OrderItem[];
  carrier: string;
  trackingNumber: string;
  shippingAddress: {
    name: string;
    line1: string;
    cityStateZip: string;
  };
  stepperIndex: number; // 1 to 5 corresponding to the stages
}

export interface Referral {
  id: string;
  name: string;
  joinedDate: string;
  status: 'Successful' | 'Pending';
  credit: number;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  groundingSources?: { title: string; uri: string }[];
}
