import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images, { getImage } from '../../assets/images';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { HeroBanner } from '../../components/common/HeroBanner';

import { menuCategories } from '../../data/menu';
import { useCart } from '../../hooks/useCart';

import { useFavoriteDishes } from '../../hooks/useFavoriteDishes';
import { DiningStackParamList } from '../../navigation/DiningStack';
import { Colors, Layout, Spacing, Typography } from '../../theme';

type Nav = NativeStackNavigationProp<DiningStackParamList, 'DiningHome'>;

export function DiningScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { items } = useCart();
  const { favoriteIds } = useFavoriteDishes();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <ScrollView
      style={styles.DiningScreenRoot}
      contentContainerStyle={[
        styles.DiningScreenContent,
        {
          paddingTop: insets.top + Spacing.lg,
          paddingBottom: 88 + Spacing.xxl,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        entering={FadeInUp.duration(400)}
        style={styles.DiningScreenHeaderRow}
      >
        <View style={styles.DiningScreenHeaderTextGroup}>
          <Text style={styles.DiningScreenTitle}>Room Service</Text>
          <Text style={styles.DiningScreenSubtitle}>
            Freshly prepared meals delivered directly to your suite.
          </Text>
        </View>
        <View style={styles.DiningScreenHeaderActions}>
          <AnimatedPressable
            onPress={() => navigation.navigate('Favorites')}
            style={styles.DiningScreenHeaderIconButton}
          >
            <Text style={styles.DiningScreenHeaderIcon}>
              {favoriteIds.length > 0 ? '❤️' : '🤍'}
            </Text>
          </AnimatedPressable>
          <AnimatedPressable
            onPress={() => navigation.navigate('Cart')}
            style={styles.DiningScreenHeaderIconButton}
          >
            <Text style={styles.DiningScreenHeaderIcon}>🛒</Text>
            {cartCount > 0 ? (
              <View style={styles.DiningScreenCartBadge}>
                <Text style={styles.DiningScreenCartBadgeText}>
                  {cartCount}
                </Text>
              </View>
            ) : null}
          </AnimatedPressable>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(400).delay(80)}>
        <HeroBanner
          image={images.onboardBg5}
          title="Luxury Room Dining"
          subtitle="Premium meals prepared by our chefs."
          badge="Available 24/7"
          height={Layout.heroBannerHeight}
        />
      </Animated.View>

      {menuCategories.map((category, index) => (
        <Animated.View
          key={category.id}
          entering={FadeInUp.duration(400).delay(140 + index * 80)}
          style={styles.DiningScreenSection}
        >
          <AnimatedPressable
            onPress={() =>
              navigation.navigate('FoodList', { categoryId: category.id })
            }
            style={styles.DiningScreenCategoryCard}
          >
            <Image
              source={getImage(category.dishes[0].image)}
              style={[StyleSheet.absoluteFill, { width: '100%' }]}
              resizeMode="cover"
            />
            <View style={styles.DiningScreenCategoryOverlay} />
            <View style={styles.DiningScreenCategoryContent}>
              <View style={styles.DiningScreenCategoryTextGroup}>
                <Text style={styles.DiningScreenCategoryTitle}>
                  {category.emoji} {category.title}
                </Text>
                <Text style={styles.DiningScreenCategoryCount}>
                  {category.dishes.length} dishes
                </Text>
              </View>
              <Text style={styles.DiningScreenChevron}>›</Text>
            </View>
          </AnimatedPressable>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  DiningScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  DiningScreenContent: {
    paddingHorizontal: Layout.screenPadding,
  },
  DiningScreenHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.cardGap,
  },
  DiningScreenHeaderTextGroup: {
    flex: 1,
    marginRight: Spacing.md,
  },
  DiningScreenTitle: {
    ...Typography.largeTitle,
    marginBottom: Spacing.xs,
  },
  DiningScreenSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  DiningScreenHeaderActions: {
    flexDirection: 'row',
  },
  DiningScreenHeaderIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  DiningScreenHeaderIcon: {
    fontSize: 18,
  },

  DiningScreenCartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  DiningScreenCartBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.background,
  },

  DiningScreenSection: {
    marginTop: Layout.cardGap,
  },
  DiningScreenCategoryCard: {
    height: 140,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Colors.card,
  },
  DiningScreenCategoryOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.background,
    opacity: 0.55,
  },

  DiningScreenCategoryContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  DiningScreenCategoryTextGroup: {
    flex: 1,
  },
  DiningScreenCategoryTitle: {
    ...Typography.cardTitle,
    marginBottom: 2,
  },
  DiningScreenCategoryCount: {
    ...Typography.caption,
    color: 'rgba(255,255,255,0.8)',
  },

  DiningScreenChevron: {
    fontSize: 26,
    color: Colors.gold,
  },
});
