export interface Guest {
  name: string;
  hotel: string;
  room: string;
  roomType: string;
  guests: string;
  floor: string;
  roomStatus: string;
  wifi: string;
  breakfast: string;
  parking: string;
  lateCheckout: string;
  checkIn: string;
  checkOut: string;
  cardNumber: string;
}

export interface RequestCategory {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

export type RequestPriority = 'Standard' | 'Urgent' | 'Scheduled';
export type RequestDeliveryTime = 'ASAP' | '30 Minutes' | '1 Hour' | 'Custom Time';

export type RequestStatus =
  | 'Submitted'
  | 'Received'
  | 'Assigned'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export interface GuestRequest {
  id: string;
  categoryId: string;
  categoryTitle: string;
  emoji: string;
  description: string;
  priority: RequestPriority;
  deliveryTime: RequestDeliveryTime;
  customTime?: string;
  notes?: string;
  status: RequestStatus;
  department: string;
  estimatedArrival: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClimateModeState {
  cooling: boolean;
  heating: boolean;
  fanSpeed: 'Low' | 'Medium' | 'High' | 'Turbo';
  sleepMode: boolean;
}

export interface ClimateHistoryEntry {
  id: string;
  time: string;
  icon: string;
  title: string;
  detail: string;
}

export interface ClimateAutomations {
  autoCool: boolean;
  autoHeat: boolean;
  autoFan: boolean;
  nightAdjustment: boolean;
  vacationMode: boolean;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  prepTime: string;
  ingredients: string[];
  rating: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  image: string;
  chefRecommended?: boolean;
}

export interface MenuCategory {
  id: string;
  emoji: string;
  title: string;
  dishes: Dish[];
}

export interface CartItem {
  dishId: string;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Received' | 'Preparing' | 'Cooking' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
  estimatedDelivery: string;
  deliveryNotes?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  role: 'guest' | 'concierge';
  text: string;
  timestamp: string;
}
