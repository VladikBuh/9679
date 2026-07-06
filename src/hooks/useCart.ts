import { useCallback } from 'react';
import { findDishById } from '../data/menu';
import { CartItem, Order } from '../types';
import { createStore } from './createStore';

interface CartState {
  items: CartItem[];
  lastOrder: Order | null;
}

const cartStore = createStore<CartState>({ items: [], lastOrder: null });

export function useCart() {
  const items = cartStore.useStore(s => s.items);
  const lastOrder = cartStore.useStore(s => s.lastOrder);

  const addItem = useCallback((dishId: string, quantity: number, specialInstructions?: string) => {
    cartStore.setState(prev => {
      const existing = prev.items.find(i => i.dishId === dishId);
      if (existing) {
        return {
          ...prev,
          items: prev.items.map(i =>
            i.dishId === dishId
              ? { ...i, quantity: i.quantity + quantity, specialInstructions: specialInstructions ?? i.specialInstructions }
              : i,
          ),
        };
      }
      return { ...prev, items: [...prev.items, { dishId, quantity, specialInstructions }] };
    });
  }, []);

  const removeItem = useCallback((dishId: string) => {
    cartStore.setState(prev => ({ ...prev, items: prev.items.filter(i => i.dishId !== dishId) }));
  }, []);

  const updateQuantity = useCallback((dishId: string, quantity: number) => {
    cartStore.setState(prev => ({
      ...prev,
      items:
        quantity <= 0
          ? prev.items.filter(i => i.dishId !== dishId)
          : prev.items.map(i => (i.dishId === dishId ? { ...i, quantity } : i)),
    }));
  }, []);

  const clearCart = useCallback(() => {
    cartStore.setState(prev => ({ ...prev, items: [] }));
  }, []);

  const placeOrder = useCallback((deliveryNotes?: string) => {
    const state = cartStore.getState();
    const total = state.items.reduce((sum, item) => {
      const dish = findDishById(item.dishId);
      return sum + (dish ? dish.price * item.quantity : 0);
    }, 0);
    const order: Order = {
      id: 'ORD-240728',
      items: state.items,
      total,
      status: 'Preparing',
      createdAt: new Date().toISOString(),
      estimatedDelivery: '35 Minutes',
      deliveryNotes,
    };
    cartStore.setState({ items: [], lastOrder: order });
    return order;
  }, []);

  const subtotal = items.reduce((sum, item) => {
    const dish = findDishById(item.dishId);
    return sum + (dish ? dish.price * item.quantity : 0);
  }, 0);

  return {
    items,
    lastOrder,
    subtotal,
    total: subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    placeOrder,
  };
}
