import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { createStore } from './createStore';

const STORAGE_KEY = '@windsor_hub/favorite_dishes';

const favoritesStore = createStore<string[]>([]);

AsyncStorage.getItem(STORAGE_KEY).then(raw => {
  if (raw) {
    try {
      favoritesStore.setState(JSON.parse(raw));
    } catch {
      favoritesStore.setState([]);
    }
  }
});

function persist(ids: string[]) {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids)).catch(() => undefined);
}

export function useFavoriteDishes() {
  const favoriteIds = favoritesStore.useStore(s => s);

  const toggleFavorite = useCallback((dishId: string) => {
    favoritesStore.setState(prev => {
      const next = prev.includes(dishId) ? prev.filter(id => id !== dishId) : [...prev, dishId];
      persist(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((dishId: string) => favoriteIds.includes(dishId), [favoriteIds]);

  return { favoriteIds, toggleFavorite, isFavorite };
}

export function useIsFavoriteDish(dishId: string) {
  return favoritesStore.useStore(s => s.includes(dishId));
}
