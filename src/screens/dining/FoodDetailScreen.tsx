import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getImage } from '../../assets/images';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { Chip } from '../../components/common/Chip';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { findDishById } from '../../data/menu';

import { useCart } from '../../hooks/useCart';

import { useFavoriteDishes } from '../../hooks/useFavoriteDishes';
import { DiningStackParamList } from '../../navigation/DiningStack';
import { Colors, Layout, Radius, Spacing, Typography } from '../../theme';
import { NutrientRing } from './NutrientRing';

type Rt = RouteProp<DiningStackParamList, 'FoodDetail'>;
const MAX_NOTES = 250;

export function FoodDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<Rt>();
  const insets = useSafeAreaInsets();
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavoriteDishes();

  const dish = findDishById(route.params.dishId);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!dish) return null;

  const total = dish.price * quantity;

  return (
    <View style={styles.FoodDetailScreenRoot}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.FoodDetailScreenScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.FoodDetailScreenHero}>
          <Image
            source={getImage(dish.image)}
            style={[StyleSheet.absoluteFill, { width: '100%' }]}
            resizeMode="cover"
          />
          <View style={styles.FoodDetailScreenHeroOverlay} />
          <AnimatedPressable
            onPress={() => navigation.goBack()}
            haptic={false}
            style={[
              styles.FoodDetailScreenHeroButton,
              { top: insets.top + Spacing.md, left: Spacing.lg },
            ]}
          >
            <Text style={styles.FoodDetailScreenHeroButtonIcon}>‹</Text>
          </AnimatedPressable>
          <AnimatedPressable
            onPress={() => toggleFavorite(dish.id)}
            style={[
              styles.FoodDetailScreenHeroButton,
              { top: insets.top + Spacing.md, right: Spacing.lg },
            ]}
          >
            <Text style={styles.FoodDetailScreenHeroButtonIcon}>
              {isFavorite(dish.id) ? '❤️' : '🤍'}
            </Text>
          </AnimatedPressable>
        </View>

        <View style={styles.FoodDetailScreenContent}>
          <Animated.View entering={FadeInUp.duration(400)}>
            <Text style={styles.FoodDetailScreenName}>{dish.name}</Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.duration(400).delay(60)}
            style={styles.FoodDetailScreenChipsRow}
          >
            <Chip label={`$${dish.price}`} />
            <Chip
              label={`${dish.rating}★`}
              style={styles.FoodDetailScreenChip}
            />
            <Chip label={dish.prepTime} style={styles.FoodDetailScreenChip} />
            <Chip
              label={`${dish.calories} cal`}
              style={styles.FoodDetailScreenChip}
            />
            <Chip label="Available" style={styles.FoodDetailScreenChip} />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.duration(400).delay(120)}
            style={styles.FoodDetailScreenSection}
          >
            <Text style={styles.FoodDetailScreenSectionTitle}>Description</Text>
            <Text style={styles.FoodDetailScreenDescription}>
              {dish.description}
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.duration(400).delay(180)}
            style={styles.FoodDetailScreenSection}
          >
            <Text style={styles.FoodDetailScreenSectionTitle}>Ingredients</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dish.ingredients.map(ingredient => (
                <Chip
                  key={ingredient}
                  label={ingredient}
                  style={styles.FoodDetailScreenIngredientChip}
                />
              ))}
            </ScrollView>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.duration(400).delay(240)}
            style={styles.FoodDetailScreenSection}
          >
            <Text style={styles.FoodDetailScreenSectionTitle}>
              Nutritional Information
            </Text>
            <View style={styles.FoodDetailScreenNutritionRow}>
              <NutrientRing
                label="Protein"
                value={dish.protein}
                unit="g"
                max={80}
              />
              <NutrientRing label="Fat" value={dish.fat} unit="g" max={80} />
              <NutrientRing
                label="Carbs"
                value={dish.carbs}
                unit="g"
                max={120}
              />
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.duration(400).delay(300)}
            style={styles.FoodDetailScreenSection}
          >
            <Text style={styles.FoodDetailScreenSectionTitle}>Quantity</Text>
            <View style={styles.FoodDetailScreenQuantityRow}>
              <AnimatedPressable
                onPress={() => setQuantity(q => Math.max(1, q - 1))}
                style={styles.FoodDetailScreenQuantityButton}
              >
                <Text style={styles.FoodDetailScreenQuantityButtonText}>−</Text>
              </AnimatedPressable>
              <Text style={styles.FoodDetailScreenQuantityValue}>
                {quantity}
              </Text>
              <AnimatedPressable
                onPress={() => setQuantity(q => q + 1)}
                style={styles.FoodDetailScreenQuantityButton}
              >
                <Text style={styles.FoodDetailScreenQuantityButtonText}>+</Text>
              </AnimatedPressable>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.duration(400).delay(360)}
            style={styles.FoodDetailScreenSection}
          >
            <Text style={styles.FoodDetailScreenSectionTitle}>
              Special Instructions
            </Text>
            <View style={styles.FoodDetailScreenNotesWrap}>
              <TextInput
                value={notes}
                onChangeText={text => setNotes(text.slice(0, MAX_NOTES))}
                placeholder="Add special preparation instructions..."
                placeholderTextColor={Colors.textSecondary}
                style={styles.FoodDetailScreenNotesInput}
                multiline
                maxLength={MAX_NOTES}
                textAlignVertical="top"
              />
            </View>
            <Text style={styles.FoodDetailScreenCounter}>
              {notes.length}/{MAX_NOTES}
            </Text>
          </Animated.View>
        </View>
        <View
          style={[
            styles.FoodDetailScreenPurchaseBar,
            { paddingBottom: insets.bottom + Spacing.lg },
          ]}
        >
          <View>
            <Text style={styles.FoodDetailScreenPurchaseQty}>
              Qty {quantity}
            </Text>
            <Text style={styles.FoodDetailScreenPurchaseTotal}>
              ${total.toFixed(2)}
            </Text>
          </View>
          <PrimaryButton
            title="Add To Cart"
            onPress={() => {
              addItem(dish.id, quantity, notes.trim() || undefined);
              navigation.goBack();
            }}
            style={styles.FoodDetailScreenPurchaseButton}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  FoodDetailScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  FoodDetailScreenScrollContent: {
    paddingBottom: 140,
  },

  FoodDetailScreenHero: {
    height: 340,
    borderBottomLeftRadius: Radius.card,
    borderBottomRightRadius: Radius.card,
    overflow: 'hidden',
  },

  FoodDetailScreenHeroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.background,
    opacity: 0.25,
  },
  FoodDetailScreenHeroButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(8,8,8,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  FoodDetailScreenHeroButtonIcon: {
    fontSize: 20,
    color: Colors.textPrimary,
  },
  FoodDetailScreenContent: {
    paddingHorizontal: Layout.screenPadding,
    paddingTop: Layout.cardGap,
  },
  FoodDetailScreenName: {
    ...Typography.largeTitle,
    fontSize: 28,
    marginBottom: Spacing.lg,
  },

  FoodDetailScreenChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  FoodDetailScreenChip: {},
  FoodDetailScreenSection: {
    marginTop: Layout.cardGap,
  },
  FoodDetailScreenSectionTitle: {
    ...Typography.cardTitle,
    fontSize: 18,
    marginBottom: Spacing.md,
  },
  FoodDetailScreenDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  FoodDetailScreenIngredientChip: {
    marginRight: Spacing.sm,
  },
  FoodDetailScreenNutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  FoodDetailScreenQuantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FoodDetailScreenQuantityButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FoodDetailScreenQuantityButtonText: {
    fontSize: 22,
    color: Colors.gold,
  },
  FoodDetailScreenQuantityValue: {
    ...Typography.cardTitle,
    fontSize: 24,
    marginHorizontal: Spacing.xxl,
  },
  FoodDetailScreenNotesWrap: {
    minHeight: 90,
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
  },
  FoodDetailScreenNotesInput: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },
  FoodDetailScreenCounter: {
    ...Typography.smallLabel,
    textAlign: 'right',
    marginTop: Spacing.sm,
  },
  FoodDetailScreenPurchaseBar: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.screenPadding,
    paddingTop: Spacing.lg,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  FoodDetailScreenPurchaseQty: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  FoodDetailScreenPurchaseTotal: {
    ...Typography.cardTitle,
    color: Colors.gold,
  },
  FoodDetailScreenPurchaseButton: {
    minWidth: 180,
  },
});
