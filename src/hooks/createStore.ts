import { useSyncExternalStore } from 'react';

export function createStore<T>(initialState: T) {
  let state = initialState;
  const listeners = new Set<() => void>();

  function getState() {
    return state;
  }

  function setState(updater: T | ((prev: T) => T)) {
    state = typeof updater === 'function' ? (updater as (prev: T) => T)(state) : updater;
    listeners.forEach(listener => listener());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function useStore<S>(selector: (state: T) => S): S {
    return useSyncExternalStore(subscribe, () => selector(state));
  }

  return { getState, setState, subscribe, useStore };
}
