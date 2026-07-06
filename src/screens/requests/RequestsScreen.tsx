import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { GlassCard } from '../../components/common/GlassCard';
import { StatRow } from '../../components/common/StatRow';
import { requestCategories } from '../../data/requests';
import { useRequests } from '../../hooks/useRequests';
import { RequestsStackParamList } from '../../navigation/RequestsStack';
import { Colors, Layout, Radius, Spacing, Typography } from '../../theme';

type Nav = NativeStackNavigationProp<RequestsStackParamList, 'RequestsList'>;

export function RequestsScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { activeCount, completedCount, averageResponse } = useRequests();

  return (
    <ScrollView
      style={styles.RequestsScreenRoot}
      contentContainerStyle={[
        styles.RequestsScreenContent,
        {
          paddingTop: insets.top + Spacing.lg,
          paddingBottom: 88 + Spacing.xxl,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInUp.duration(400)}>
        <Text style={styles.RequestsScreenTitle}>Guest Requests</Text>
        <Text style={styles.RequestsScreenSubtitle}>
          Request hotel services directly from your room.
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(80)}
        style={styles.RequestsScreenSection}
      >
        <GlassCard>
          <StatRow
            stats={[
              {
                emoji: '🛎️',
                label: 'Active Requests',
                value: String(activeCount),
              },
              {
                emoji: '✅',
                label: 'Completed Requests',
                value: String(completedCount),
              },
              {
                emoji: '⏱️',
                label: 'Average Response',
                value: averageResponse,
              },
            ]}
          />
        </GlassCard>
      </Animated.View>

      {requestCategories.map((category, index) => (
        <Animated.View
          key={category.id}
          entering={FadeInUp.duration(400).delay(120 + index * 60)}
          style={styles.RequestsScreenSection}
        >
          <AnimatedPressable
            onPress={() =>
              navigation.navigate('RequestCreate', { categoryId: category.id })
            }
            style={styles.RequestsScreenCategoryCard}
          >
            <Text style={styles.RequestsScreenCategoryIcon}>
              {category.emoji}
            </Text>
            <View style={styles.RequestsScreenCategoryTextGroup}>
              <Text style={styles.RequestsScreenCategoryTitle}>
                {category.title}
              </Text>
              <Text
                style={styles.RequestsScreenCategoryDescription}
                numberOfLines={2}
              >
                {category.description}
              </Text>
            </View>
            <Text style={styles.RequestsScreenChevron}>›</Text>
          </AnimatedPressable>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  RequestsScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  RequestsScreenContent: {
    paddingHorizontal: Layout.screenPadding,
  },
  RequestsScreenTitle: {
    ...Typography.largeTitle,
    marginBottom: Spacing.xs,
  },
  RequestsScreenSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  RequestsScreenSection: {
    marginTop: Layout.cardGap,
  },
  RequestsScreenCategoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: Layout.categoryCardHeight,
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },

  RequestsScreenCategoryIcon: {
    fontSize: 30,
    marginRight: Spacing.lg,
  },

  RequestsScreenCategoryTextGroup: {
    flex: 1,
  },
  RequestsScreenCategoryTitle: {
    ...Typography.cardTitle,
    fontSize: 17,
    marginBottom: 2,
  },
  RequestsScreenCategoryDescription: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  RequestsScreenChevron: {
    fontSize: 26,
    color: Colors.gold,
    marginLeft: Spacing.sm,
  },
});
