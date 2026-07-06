import { GuestRequest, RequestCategory } from '../types';

export const requestCategories: RequestCategory[] = [
  {
    id: 'room-comfort',
    emoji: '🛏️',
    title: 'Room Comfort & Amenities',
    description: 'Extra towels, pillows, blankets and room accessories.',
  },
  {
    id: 'housekeeping',
    emoji: '🏠',
    title: 'Housekeeping Services',
    description: 'Cleaning, room refresh and housekeeping assistance.',
  },
  {
    id: 'food-beverage',
    emoji: '🍽️',
    title: 'Food & Beverage Orders',
    description: 'Additional drinks, snacks and special dining requests.',
  },
  {
    id: 'laundry',
    emoji: '👕',
    title: 'Laundry & Garment Care',
    description: 'Laundry, dry cleaning and garment pressing.',
  },
  {
    id: 'maintenance',
    emoji: '🔧',
    title: 'Maintenance & Technical Support',
    description: 'Report room maintenance or technical issues.',
  },
  {
    id: 'transportation',
    emoji: '🚗',
    title: 'Transportation & Concierge',
    description: 'Taxi bookings, transportation and concierge services.',
  },
  {
    id: 'special',
    emoji: '🎁',
    title: 'Special Requests & Celebrations',
    description: 'Birthday surprises, decorations and special arrangements.',
  },
];

const departmentByCategory: Record<string, string> = {
  'room-comfort': 'Guest Amenities',
  housekeeping: 'Housekeeping',
  'food-beverage': 'Room Service',
  laundry: 'Laundry',
  maintenance: 'Engineering',
  transportation: 'Concierge',
  special: 'Guest Experience',
};

export function getDepartment(categoryId: string) {
  return departmentByCategory[categoryId] ?? 'Guest Services';
}

export const initialRequests: GuestRequest[] = [
  {
    id: 'REQ-240711',
    categoryId: 'housekeeping',
    categoryTitle: 'Housekeeping Services',
    emoji: '🏠',
    description: 'Please refresh the room and replace bath towels.',
    priority: 'Standard',
    deliveryTime: '1 Hour',
    status: 'In Progress',
    department: 'Housekeeping',
    estimatedArrival: '15 Minutes',
    createdAt: '10:35 AM',
    updatedAt: '10:52 AM',
  },
  {
    id: 'REQ-240710',
    categoryId: 'room-comfort',
    categoryTitle: 'Room Comfort & Amenities',
    emoji: '🛏️',
    description: 'Two extra pillows and a spare blanket, please.',
    priority: 'Standard',
    deliveryTime: '30 Minutes',
    status: 'Assigned',
    department: 'Guest Amenities',
    estimatedArrival: '20 Minutes',
    createdAt: '09:10 AM',
    updatedAt: '09:22 AM',
  },
];

export const requestStats = {
  active: 2,
  completed: 18,
  averageResponse: '15 min',
};
