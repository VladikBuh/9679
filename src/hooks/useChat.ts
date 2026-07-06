import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { faqItems } from '../data/faq';
import { ChatMessage } from '../types';
import { createStore } from './createStore';

const RECENT_KEY = '@windsor_hub/recently_viewed_faq';
const FAVORITES_KEY = '@windsor_hub/favorite_faq';

interface ChatState {
  activeQuestionId: string | null;
  messages: ChatMessage[];
  recentlyViewed: string[];
  favorites: string[];
}

const chatStore = createStore<ChatState>({
  activeQuestionId: null,
  messages: [],
  recentlyViewed: [],
  favorites: [],
});

Promise.all([AsyncStorage.getItem(RECENT_KEY), AsyncStorage.getItem(FAVORITES_KEY)]).then(
  ([recentRaw, favRaw]) => {
    chatStore.setState(prev => ({
      ...prev,
      recentlyViewed: recentRaw ? JSON.parse(recentRaw) : [],
      favorites: favRaw ? JSON.parse(favRaw) : [],
    }));
  },
);

function formatNow() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function useChat() {
  const activeQuestionId = chatStore.useStore(s => s.activeQuestionId);
  const messages = chatStore.useStore(s => s.messages);
  const recentlyViewed = chatStore.useStore(s => s.recentlyViewed);
  const favorites = chatStore.useStore(s => s.favorites);

  const askQuestion = useCallback((questionId: string) => {
    const faq = faqItems.find(f => f.id === questionId);
    if (!faq) return;

    const guestMessage: ChatMessage = {
      id: `${questionId}-q-${Date.now()}`,
      role: 'guest',
      text: faq.question,
      timestamp: formatNow(),
    };

    chatStore.setState(prev => {
      const nextRecent = [questionId, ...prev.recentlyViewed.filter(id => id !== questionId)].slice(0, 5);
      AsyncStorage.setItem(RECENT_KEY, JSON.stringify(nextRecent)).catch(() => undefined);
      return {
        ...prev,
        activeQuestionId: questionId,
        messages: [...prev.messages, guestMessage],
        recentlyViewed: nextRecent,
      };
    });

    setTimeout(() => {
      const replyMessage: ChatMessage = {
        id: `${questionId}-a-${Date.now()}`,
        role: 'concierge',
        text: faq.answer,
        timestamp: formatNow(),
      };
      chatStore.setState(prev => ({ ...prev, messages: [...prev.messages, replyMessage] }));
    }, 900);
  }, []);

  const clearConversation = useCallback(() => {
    chatStore.setState(prev => ({ ...prev, activeQuestionId: null, messages: [] }));
  }, []);

  const toggleFavorite = useCallback((questionId: string) => {
    chatStore.setState(prev => {
      const next = prev.favorites.includes(questionId)
        ? prev.favorites.filter(id => id !== questionId)
        : [...prev.favorites, questionId];
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(next)).catch(() => undefined);
      return { ...prev, favorites: next };
    });
  }, []);

  return {
    activeQuestionId,
    messages,
    recentlyViewed,
    favorites,
    askQuestion,
    clearConversation,
    toggleFavorite,
  };
}
