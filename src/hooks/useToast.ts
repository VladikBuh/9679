import { useCallback } from 'react';
import { createStore } from './createStore';

interface ToastState {
  message: string | null;
}

const toastStore = createStore<ToastState>({ message: null });
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

export function useToast() {
  const message = toastStore.useStore(s => s.message);

  const showToast = useCallback((text: string) => {
    if (hideTimeout) clearTimeout(hideTimeout);
    toastStore.setState({ message: text });
    hideTimeout = setTimeout(() => {
      toastStore.setState({ message: null });
    }, 1800);
  }, []);

  return { message, showToast };
}
