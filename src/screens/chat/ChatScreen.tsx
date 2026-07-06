import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { GlassCard } from '../../components/common/GlassCard';
import { SectionHeader } from '../../components/common/SectionHeader';
import { faqItems } from '../../data/faq';
import { guest } from '../../data/guest';
import { useChat } from '../../hooks/useChat';

import { ChatStackParamList } from '../../navigation/ChatStack';
import { Colors, Layout, Radius, Spacing, Typography } from '../../theme';

type Nav = NativeStackNavigationProp<ChatStackParamList, 'ChatHome'>;

export function ChatScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { recentlyViewed, favorites, toggleFavorite } = useChat();
  const [query, setQuery] = useState('');

  const filtered = faqItems.filter(f =>
    f.question.toLowerCase().includes(query.toLowerCase()),
  );
  const recentQuestions = recentlyViewed
    .map(id => faqItems.find(f => f.id === id))
    .filter((f): f is (typeof faqItems)[number] => !!f);
  const favoriteQuestions = faqItems.filter(f => favorites.includes(f.id));

  const openConversation = (questionId: string) =>
    navigation.navigate('Conversation', { questionId });

  return (
    <ScrollView
      style={styles.ChatScreenRoot}
      contentContainerStyle={[
        styles.ChatScreenContent,
        {
          paddingTop: insets.top + Spacing.lg,
          paddingBottom: 88 + Spacing.xxl,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInUp.duration(400)}>
        <Text style={styles.ChatScreenTitle}>Hotel Concierge</Text>
        <Text style={styles.ChatScreenSubtitle}>
          Find quick answers to the most common hotel questions.
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(80)}
        style={styles.ChatScreenSection}
      >
        <GlassCard>
          <View style={styles.ChatScreenWelcomeRow}>
            <View style={styles.ChatScreenWelcomeAvatar}>
              <Text style={styles.ChatScreenWelcomeAvatarIcon}>🎩</Text>
            </View>
            <Text style={styles.ChatScreenWelcomeText}>
              Hello, {guest.name}.{'\n'}How can we assist you today?
            </Text>
          </View>
        </GlassCard>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(140)}
        style={styles.ChatScreenSection}
      >
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search questions..."
          placeholderTextColor={Colors.textSecondary}
          style={styles.ChatScreenSearchInput}
        />
      </Animated.View>

      {recentQuestions.length > 0 && !query ? (
        <Animated.View
          entering={FadeInUp.duration(400).delay(180)}
          style={styles.ChatScreenSection}
        >
          <SectionHeader title="Recently Viewed" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentQuestions.map(item => (
              <AnimatedPressable
                key={item.id}
                onPress={() => openConversation(item.id)}
                style={styles.ChatScreenRecentChip}
              >
                <Text style={styles.ChatScreenRecentChipText} numberOfLines={2}>
                  {item.question}
                </Text>
              </AnimatedPressable>
            ))}
          </ScrollView>
        </Animated.View>
      ) : null}

      {favoriteQuestions.length > 0 && !query ? (
        <Animated.View
          entering={FadeInUp.duration(400).delay(220)}
          style={styles.ChatScreenSection}
        >
          <SectionHeader title="Favorites" />
          {favoriteQuestions.map((item, index) => (
            <FaqRow
              key={item.id}
              question={item.question}
              isFavorite
              onPress={() => openConversation(item.id)}
              onToggleFavorite={() => toggleFavorite(item.id)}
              delay={index * 60}
            />
          ))}
        </Animated.View>
      ) : null}

      <Animated.View
        entering={FadeInUp.duration(400).delay(260)}
        style={styles.ChatScreenSection}
      >
        <SectionHeader title="Frequently Asked Questions" />
        {filtered.map((item, index) => (
          <FaqRow
            key={item.id}
            question={item.question}
            isFavorite={favorites.includes(item.id)}
            onPress={() => openConversation(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
            delay={index * 50}
          />
        ))}
      </Animated.View>
    </ScrollView>
  );
}

function FaqRow({
  question,
  isFavorite,
  onPress,
  onToggleFavorite,
  delay,
}: {
  question: string;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  delay: number;
}) {
  return (
    <Animated.View
      entering={FadeInUp.duration(350).delay(delay)}
      style={styles.ChatScreenFaqCardWrap}
    >
      <AnimatedPressable onPress={onPress} style={styles.ChatScreenFaqCard}>
        <Text style={styles.ChatScreenFaqQuestion} numberOfLines={2}>
          {question}
        </Text>
        <View style={styles.ChatScreenFaqActions}>
          <AnimatedPressable
            onPress={onToggleFavorite}
            haptic
            style={styles.ChatScreenFaqHeart}
          >
            <Text style={styles.ChatScreenFaqHeartIcon}>
              {isFavorite ? '❤️' : '🤍'}
            </Text>
          </AnimatedPressable>
          <Text style={styles.ChatScreenChevron}>›</Text>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ChatScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  ChatScreenContent: {
    paddingHorizontal: Layout.screenPadding,
  },
  ChatScreenTitle: {
    ...Typography.largeTitle,
    marginBottom: Spacing.xs,
  },
  ChatScreenSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  ChatScreenSection: {
    marginTop: Layout.cardGap,
  },
  ChatScreenWelcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ChatScreenWelcomeAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },

  ChatScreenWelcomeAvatarIcon: {
    fontSize: 26,
  },
  ChatScreenWelcomeText: {
    ...Typography.body,
    flex: 1,
    lineHeight: 22,
  },
  ChatScreenSearchInput: {
    ...Typography.body,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    color: Colors.textPrimary,
  },

  ChatScreenRecentChip: {
    width: 160,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginRight: Spacing.md,
  },
  ChatScreenRecentChipText: {
    ...Typography.caption,
    color: Colors.textPrimary,
  },
  ChatScreenFaqCardWrap: {
    marginBottom: Spacing.md,
  },

  ChatScreenFaqCard: {
    minHeight: 70,
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ChatScreenFaqQuestion: {
    ...Typography.body,
    flex: 1,
    marginRight: Spacing.md,
  },
  ChatScreenFaqActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ChatScreenFaqHeart: {
    marginRight: Spacing.sm,
  },

  ChatScreenFaqHeartIcon: {
    fontSize: 16,
  },
  ChatScreenChevron: {
    fontSize: 22,
    color: Colors.gold,
  },
});
