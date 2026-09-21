import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getImage } from '../../assets/images';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { GlassCard } from '../../components/common/GlassCard';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { StatusBadge } from '../../components/common/StatusBadge';
import { TimelineStep } from '../../components/common/TimelineStep';
import { guest } from '../../data/guest';

import { allDishes, findDishById } from '../../data/menu';
import { useCart } from '../../hooks/useCart';

import { DiningStackParamList } from '../../navigation/DiningStack';
import { Colors, Layout, Radius, Spacing, Typography } from '../../theme';

type Nav = NativeStackNavigationProp<DiningStackParamList, 'OrderConfirm'>;
const TIMELINE = [
  'Received',
  'Preparing',
  'Cooking',
  'Out for Delivery',
  'Delivered',
];

export function OrderConfirmScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { lastOrder, addItem } = useCart();
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  const currentIndex = 1; // Preparing

  const orderDishIds = new Set(lastOrder?.items.map(i => i.dishId));
  const suggested = allDishes.filter(d => !orderDishIds.has(d.id)).slice(0, 4);

  return (
    <ScrollView
      style={styles.OrderConfirmScreenRoot}
      contentContainerStyle={[
        styles.OrderConfirmScreenContent,
        {
          paddingTop: insets.top + Spacing.huge,
          paddingBottom: insets.bottom + Spacing.xxl,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        entering={ZoomIn.duration(500).springify()}
        style={styles.OrderConfirmScreenIllustrationWrap}
      >
        <Text style={styles.OrderConfirmScreenIllustration}>🎉</Text>
      </Animated.View>

      <Animated.View entering={FadeIn.duration(400).delay(150)}>
        <Text style={styles.OrderConfirmScreenTitle}>Order Confirmed</Text>
        <Text style={styles.OrderConfirmScreenSubtitle}>
          Our chefs have started preparing your order.
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(250)}
        style={styles.OrderConfirmScreenSection}
      >
        <GlassCard>
          <View style={styles.OrderConfirmScreenRow}>
            <Text style={styles.OrderConfirmScreenRowLabel}>Order Number</Text>
            <Text style={styles.OrderConfirmScreenRowValue}>
              {lastOrder?.id ?? '—'}
            </Text>
          </View>
          <View style={styles.OrderConfirmScreenDivider} />
          <View style={styles.OrderConfirmScreenRow}>
            <Text style={styles.OrderConfirmScreenRowLabel}>Guest Name</Text>
            <Text style={styles.OrderConfirmScreenRowValue}>{guest.name}</Text>
          </View>
          <View style={styles.OrderConfirmScreenDivider} />
          <View style={styles.OrderConfirmScreenRow}>
            <Text style={styles.OrderConfirmScreenRowLabel}>Room Number</Text>
            <Text style={styles.OrderConfirmScreenRowValue}>1028</Text>
          </View>
          <View style={styles.OrderConfirmScreenDivider} />
          <View style={styles.OrderConfirmScreenRow}>
            <Text style={styles.OrderConfirmScreenRowLabel}>
              Estimated Delivery
            </Text>
            <Text style={styles.OrderConfirmScreenRowValue}>
              {lastOrder?.estimatedDelivery ?? '35 Minutes'}
            </Text>
          </View>
          <View style={styles.OrderConfirmScreenDivider} />
          <View style={styles.OrderConfirmScreenRow}>
            <Text style={styles.OrderConfirmScreenRowLabel}>Order Total</Text>
            <Text style={styles.OrderConfirmScreenRowValue}>
              ${(lastOrder?.total ?? 0).toFixed(2)}
            </Text>
          </View>
          <View style={styles.OrderConfirmScreenDivider} />
          <View style={styles.OrderConfirmScreenRow}>
            <Text style={styles.OrderConfirmScreenRowLabel}>Status</Text>
            <StatusBadge status="Preparing" small />
          </View>
        </GlassCard>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(320)}
        style={styles.OrderConfirmScreenSection}
      >
        <GlassCard>
          {TIMELINE.map((step, index) => (
            <TimelineStep
              key={step}
              icon={['📥', '👨‍🍳', '🔥', '🚗', '🎉'][index]}
              title={step}
              state={
                index < currentIndex
                  ? 'done'
                  : index === currentIndex
                  ? 'current'
                  : 'upcoming'
              }
              isLast={index === TIMELINE.length - 1}
            />
          ))}
        </GlassCard>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(380)}
        style={styles.OrderConfirmScreenSection}
      >
        <AnimatedPressable
          onPress={() => setDetailsExpanded(v => !v)}
          haptic={false}
        >
          <GlassCard>
            <View style={styles.OrderConfirmScreenExpandRow}>
              <Text style={styles.OrderConfirmScreenExpandTitle}>
                Order Details
              </Text>
              <Text style={styles.OrderConfirmScreenExpandChevron}>
                {detailsExpanded ? '▾' : '▸'}
              </Text>
            </View>
            {detailsExpanded ? (
              <Animated.View entering={FadeIn.duration(250)}>
                {lastOrder?.items.map(item => {
                  const dish = findDishById(item.dishId);
                  if (!dish) return null;
                  return (
                    <View
                      key={item.dishId}
                      style={styles.OrderConfirmScreenDetailRow}
                    >
                      <Text style={styles.OrderConfirmScreenDetailName}>
                        {item.quantity}× {dish.name}
                      </Text>
                      <Text style={styles.OrderConfirmScreenDetailPrice}>
                        ${(dish.price * item.quantity).toFixed(2)}
                      </Text>
                    </View>
                  );
                })}
                <View style={styles.OrderConfirmScreenDivider} />
                <View style={styles.OrderConfirmScreenRow}>
                  <Text style={styles.OrderConfirmScreenRowLabel}>Taxes</Text>
                  <Text style={styles.OrderConfirmScreenRowValue}>
                    Included
                  </Text>
                </View>
                <View style={styles.OrderConfirmScreenRow}>
                  <Text style={styles.OrderConfirmScreenExpandTitle}>
                    Total
                  </Text>
                  <Text style={styles.OrderConfirmScreenTotalValue}>
                    ${(lastOrder?.total ?? 0).toFixed(2)}
                  </Text>
                </View>
              </Animated.View>
            ) : null}
          </GlassCard>
        </AnimatedPressable>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(440)}
        style={styles.OrderConfirmScreenSection}
      >
        <Text style={styles.OrderConfirmScreenSuggestedTitle}>
          You May Also Like
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {suggested.map(dish => (
            <View key={dish.id} style={styles.OrderConfirmScreenSuggestedCard}>
              <Image
                source={getImage(dish.image)}
                style={styles.OrderConfirmScreenSuggestedImage}
                resizeMode="cover"
              />
              <Text
                style={styles.OrderConfirmScreenSuggestedName}
                numberOfLines={1}
              >
                {dish.name}
              </Text>
              <Text style={styles.OrderConfirmScreenSuggestedPrice}>
                ${dish.price}
              </Text>
              <AnimatedPressable
                onPress={() => addItem(dish.id, 1)}
                style={styles.OrderConfirmScreenSuggestedAdd}
              >
                <Text style={styles.OrderConfirmScreenSuggestedAddText}>
                  Quick Add
                </Text>
              </AnimatedPressable>
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(500)}
        style={[styles.OrderConfirmScreenSection, { marginBottom: 50 }]}
      >
        <PrimaryButton
          title="Done"
          onPress={() => navigation.popToTop()}
          style={styles.OrderConfirmScreenDoneButton}
        />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  OrderConfirmScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  OrderConfirmScreenContent: {
    paddingHorizontal: Layout.screenPadding,
    alignItems: 'center',
  },
  OrderConfirmScreenIllustrationWrap: {
    marginBottom: Spacing.xl,
  },
  OrderConfirmScreenIllustration: {
    fontSize: 72,
  },
  OrderConfirmScreenTitle: {
    ...Typography.largeTitle,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  OrderConfirmScreenSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  OrderConfirmScreenSection: {
    width: '100%',
    marginTop: Layout.cardGap,
  },
  OrderConfirmScreenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  OrderConfirmScreenRowLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  OrderConfirmScreenRowValue: {
    ...Typography.body,
    fontWeight: '600',
  },
  OrderConfirmScreenDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },

  OrderConfirmScreenExpandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  OrderConfirmScreenExpandTitle: {
    ...Typography.cardTitle,
    fontSize: 17,
  },

  OrderConfirmScreenExpandChevron: {
    ...Typography.body,
    color: Colors.gold,
  },
  OrderConfirmScreenDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    marginTop: Spacing.md,
  },
  OrderConfirmScreenDetailName: {
    ...Typography.body,
    flex: 1,
  },
  OrderConfirmScreenDetailPrice: {
    ...Typography.body,
    fontWeight: '600',
  },
  OrderConfirmScreenTotalValue: {
    ...Typography.cardTitle,
    color: Colors.gold,
  },
  OrderConfirmScreenSuggestedTitle: {
    ...Typography.sectionTitle,
    fontSize: 20,
    marginBottom: Spacing.lg,
    alignSelf: 'flex-start',
  },
  OrderConfirmScreenSuggestedCard: {
    width: 140,
    marginRight: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
  },
  OrderConfirmScreenSuggestedImage: {
    width: '100%',
    height: 80,
    borderRadius: Radius.sm,
    marginBottom: Spacing.sm,
  },

  OrderConfirmScreenSuggestedName: {
    ...Typography.smallLabel,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  OrderConfirmScreenSuggestedPrice: {
    ...Typography.smallLabel,
    color: Colors.gold,
    marginTop: 2,
    marginBottom: Spacing.sm,
  },
  OrderConfirmScreenSuggestedAdd: {
    backgroundColor: Colors.gold,
    borderRadius: Radius.sm,
    paddingVertical: 6,
    alignItems: 'center',
  },
  OrderConfirmScreenSuggestedAddText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.background,
  },
  OrderConfirmScreenDoneButton: {
    width: '100%',
  },
});
