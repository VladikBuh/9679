import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { Chip } from '../../components/common/Chip';
import { EmptyState } from '../../components/common/EmptyState';
import { allDishes } from '../../data/menu';
import { useCart } from '../../hooks/useCart';
import { useFavoriteDishes } from '../../hooks/useFavoriteDishes';
import { useToast } from '../../hooks/useToast';
import { DiningStackParamList } from '../../navigation/DiningStack';
import { Colors, Layout, Spacing, Typography } from '../../theme';
import { FoodCard } from './FoodCard';

type Nav = NativeStackNavigationProp<DiningStackParamList, 'Favorites'>;
type SortOption = 'Alphabetical' | 'Price' | 'Prep Time' | 'Most Popular';
const SORT_OPTIONS: SortOption[] = [
  'Alphabetical',
  'Price',
  'Prep Time',
  'Most Popular',
];

export function FavoritesScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { favoriteIds, isFavorite, toggleFavorite } = useFavoriteDishes();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [sort, setSort] = useState<SortOption>('Alphabetical');

  const favoriteDishes = allDishes.filter(d => favoriteIds.includes(d.id));

  const sorted = [...favoriteDishes].sort((a, b) => {
    switch (sort) {
      case 'Price':
        return a.price - b.price;
      case 'Prep Time':
        return a.prepTime.localeCompare(b.prepTime);
      case 'Most Popular':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <ScrollView
      style={styles.FavoritesScreenRoot}
      contentContainerStyle={[
        styles.FavoritesScreenContent,
        {
          paddingTop: insets.top + Spacing.lg,
          paddingBottom: 88 + Spacing.xxl,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <AnimatedPressable
        onPress={() => navigation.goBack()}
        haptic={false}
        style={styles.FavoritesScreenBack}
      >
        <Text style={styles.FavoritesScreenBackText}>‹ Back</Text>
      </AnimatedPressable>

      <Animated.View entering={FadeInUp.duration(400)}>
        <Text style={styles.FavoritesScreenTitle}>Favorites</Text>
      </Animated.View>

      {sorted.length === 0 ? (
        <EmptyState
          emoji="🤍"
          title="No favorites yet"
          description="Tap the heart icon on any dish to save it here."
          actionLabel="Browse Menu"
          onAction={() => navigation.navigate('DiningHome')}
        />
      ) : (
        <>
          <Animated.View
            entering={FadeInUp.duration(400).delay(60)}
            style={styles.FavoritesScreenSortRow}
          >
            {SORT_OPTIONS.map(option => (
              <Chip
                key={option}
                label={option}
                selected={sort === option}
                onPress={() => setSort(option)}
                style={styles.FavoritesScreenSortChip}
              />
            ))}
          </Animated.View>

          <View style={styles.FavoritesScreenGrid}>
            {sorted.map((dish, index) => (
              <Animated.View
                key={dish.id}
                entering={FadeInUp.duration(400).delay(120 + index * 60)}
                style={styles.FavoritesScreenGridItem}
              >
                <FoodCard
                  dish={dish}
                  grid
                  onPress={() =>
                    navigation.navigate('FoodDetail', { dishId: dish.id })
                  }
                  onAdd={() => {
                    addItem(dish.id, 1);
                    showToast(`Added ${dish.name} to cart`);
                  }}
                  isFavorite={isFavorite(dish.id)}
                  onToggleFavorite={() => toggleFavorite(dish.id)}
                />
              </Animated.View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  FavoritesScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  FavoritesScreenContent: {
    paddingHorizontal: Layout.screenPadding,
  },
  FavoritesScreenBack: {
    marginBottom: Spacing.lg,
    alignSelf: 'flex-start',
  },
  FavoritesScreenBackText: {
    ...Typography.body,
    color: Colors.gold,
  },

  FavoritesScreenTitle: {
    ...Typography.largeTitle,
    marginBottom: Spacing.lg,
  },
  FavoritesScreenSortRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.cardGap,
  },
  FavoritesScreenSortChip: {
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },

  FavoritesScreenGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  FavoritesScreenGridItem: {
    width: '48%',
    marginBottom: 20,
  },
});
