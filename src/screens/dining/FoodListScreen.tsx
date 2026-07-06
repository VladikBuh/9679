import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { EmptyState } from '../../components/common/EmptyState';
import { menuCategories } from '../../data/menu';
import { useFavoriteDishes } from '../../hooks/useFavoriteDishes';
import { DiningStackParamList } from '../../navigation/DiningStack';

import { Colors, Layout, Radius, Spacing, Typography } from '../../theme';
import { FoodCard } from './FoodCard';

type Nav = NativeStackNavigationProp<DiningStackParamList, 'FoodList'>;
type Rt = RouteProp<DiningStackParamList, 'FoodList'>;

export function FoodListScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const insets = useSafeAreaInsets();
  const { isFavorite, toggleFavorite } = useFavoriteDishes();
  const [query, setQuery] = useState('');

  const category =
    menuCategories.find(c => c.id === route.params.categoryId) ??
    menuCategories[0];
  const dishes = category.dishes.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <View style={styles.FoodListScreenRoot}>
      <ScrollView
        contentContainerStyle={[
          styles.FoodListScreenContent,
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
          style={styles.FoodListScreenBack}
        >
          <Text style={styles.FoodListScreenBackText}>‹ Back</Text>
        </AnimatedPressable>

        <Animated.View entering={FadeInUp.duration(400)}>
          <Text style={styles.FoodListScreenTitle}>
            {category.emoji} {category.title}
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(400).delay(60)}
          style={styles.FoodListScreenSearchWrap}
        >
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search dishes..."
            placeholderTextColor={Colors.textSecondary}
            style={styles.FoodListScreenSearchInput}
          />
        </Animated.View>

        {dishes.length === 0 ? (
          <EmptyState
            emoji="🍽️"
            title="No dishes found"
            description="Try a different search term."
          />
        ) : (
          dishes.map((dish, index) => (
            <Animated.View
              key={dish.id}
              entering={FadeInUp.duration(400).delay(120 + index * 70)}
              style={styles.FoodListScreenCardWrap}
            >
              <FoodCard
                dish={dish}
                onPress={() =>
                  navigation.navigate('FoodDetail', { dishId: dish.id })
                }
                onAdd={() =>
                  navigation.navigate('FoodDetail', { dishId: dish.id })
                }
                isFavorite={isFavorite(dish.id)}
                onToggleFavorite={() => toggleFavorite(dish.id)}
              />
            </Animated.View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  FoodListScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  FoodListScreenContent: {
    paddingHorizontal: Layout.screenPadding,
  },
  FoodListScreenBack: {
    marginBottom: Spacing.lg,
    alignSelf: 'flex-start',
  },
  FoodListScreenBackText: {
    ...Typography.body,
    color: Colors.gold,
  },
  FoodListScreenTitle: {
    ...Typography.largeTitle,
    fontSize: 26,
    marginBottom: Spacing.lg,
  },

  FoodListScreenSearchWrap: {
    marginBottom: Layout.cardGap,
  },

  FoodListScreenSearchInput: {
    ...Typography.body,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    color: Colors.textPrimary,
  },
  FoodListScreenCardWrap: {
    marginBottom: Layout.cardGap,
  },
});
