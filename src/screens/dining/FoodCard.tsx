import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getImage } from '../../assets/images';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { Colors, Radius, Spacing, Typography } from '../../theme';

import { Dish } from '../../types';

interface Props {
  dish: Dish;
  onPress: () => void;
  onAdd: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  grid?: boolean;
}

export function FoodCard({
  dish,
  onPress,
  onAdd,
  isFavorite,
  onToggleFavorite,
  grid,
}: Props) {
  return (
    <AnimatedPressable
      onPress={onPress}
      style={[styles.FoodCardSurface, grid && styles.FoodCardSurfaceGrid]}
    >
      <View
        style={[styles.FoodCardImageWrap, grid && styles.FoodCardImageWrapGrid]}
      >
        <Image
          source={getImage(dish.image)}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
        {dish.chefRecommended ? (
          <View style={styles.FoodCardBadge}>
            <Text style={styles.FoodCardBadgeText}>Chef Recommended</Text>
          </View>
        ) : null}
        <AnimatedPressable
          onPress={onToggleFavorite}
          haptic
          style={styles.FoodCardHeartButton}
        >
          <Text style={styles.FoodCardHeartIcon}>
            {isFavorite ? '❤️' : '🤍'}
          </Text>
        </AnimatedPressable>
      </View>

      <View style={styles.FoodCardBody}>
        <Text style={styles.FoodCardName} numberOfLines={1}>
          {dish.name}
        </Text>
        {!grid ? (
          <Text style={styles.FoodCardDescription} numberOfLines={2}>
            {dish.description}
          </Text>
        ) : null}
        <View style={styles.FoodCardMetaRow}>
          <Text style={styles.FoodCardPrice}>${dish.price}</Text>
          <Text style={styles.FoodCardMetaDot}>·</Text>
          <Text style={styles.FoodCardMeta}>{dish.prepTime}</Text>
          <Text style={styles.FoodCardMetaDot}>·</Text>
          <Text style={styles.FoodCardMeta}>{dish.rating}★</Text>
        </View>

        <AnimatedPressable onPress={onAdd} style={styles.FoodCardAddButton}>
          <Text style={styles.FoodCardAddButtonText}>Add</Text>
        </AnimatedPressable>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  FoodCardSurface: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },

  FoodCardSurfaceGrid: {
    width: '100%',
  },
  FoodCardImageWrap: {
    height: 130,
  },
  FoodCardImageWrapGrid: {
    height: 100,
  },

  FoodCardBadge: {
    position: 'absolute',
    left: Spacing.sm,
    top: Spacing.sm,
    backgroundColor: Colors.gold,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  FoodCardBadgeText: {
    ...Typography.smallLabel,
    fontSize: 10,
    color: Colors.background,
    fontWeight: '700',
  },
  FoodCardHeartButton: {
    position: 'absolute',
    right: Spacing.sm,
    top: Spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(8,8,8,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FoodCardHeartIcon: {
    fontSize: 15,
  },

  FoodCardBody: {
    padding: Spacing.lg,
  },
  FoodCardName: {
    ...Typography.cardTitle,
    fontSize: 17,
    marginBottom: 4,
  },
  FoodCardDescription: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },

  FoodCardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  FoodCardPrice: {
    ...Typography.body,
    color: Colors.gold,
    fontWeight: '700',
  },
  FoodCardMetaDot: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginHorizontal: 6,
  },
  FoodCardMeta: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  FoodCardAddButton: {
    backgroundColor: Colors.gold,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  FoodCardAddButtonText: {
    ...Typography.smallLabel,
    color: Colors.background,
    fontWeight: '700',
  },
});
