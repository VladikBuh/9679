import { Guest } from '../types';

function formatStayDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

function formatYymmdd(date: Date): string {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yy}${mm}${dd}`;
}

const today = new Date();
const checkout = new Date(today);
checkout.setDate(today.getDate() + 3);

export const guest: Guest = {
  name: 'Guest',
  hotel: 'Caesars Windsor Casino Stay',
  room: '1028',
  roomType: 'Presidential Suite',
  guests: '2 Adults',
  floor: '18',
  roomStatus: 'Ready',
  wifi: 'Connected',
  breakfast: 'Included',
  parking: 'Included',
  lateCheckout: 'Available',
  checkIn: formatStayDate(today),
  checkOut: formatStayDate(checkout),
  cardNumber: `CW-${formatYymmdd(today)}`,
};
