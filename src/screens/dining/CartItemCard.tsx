import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { getImage } from '../../assets/images';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { Colors, Radius, Spacing, Typography } from '../../theme';
import { CartItem, Dish } from '../../types';

interface Props {
  item: CartItem;
  dish: Dish;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItemCard({
  item,
  dish,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <Swipeable
      renderRightActions={() => (
        <AnimatedPressable
          onPress={onRemove}
          style={styles.CartItemCardRemoveAction}
        >
          <Text style={styles.CartItemCardRemoveIcon}>🗑️</Text>
        </AnimatedPressable>
      )}
    >
      <View style={styles.CartItemCardSurface}>
        <Image
          source={getImage(dish.image)}
          style={styles.CartItemCardImage}
          resizeMode="cover"
        />
        <View style={styles.CartItemCardBody}>
          <Text style={styles.CartItemCardName} numberOfLines={1}>
            {dish.name}
          </Text>
          <Text style={styles.CartItemCardMeta} numberOfLines={1}>
            {dish.prepTime}
          </Text>
          <Text style={styles.CartItemCardPrice}>
            ${(dish.price * item.quantity).toFixed(2)}
          </Text>
        </View>
        <View style={styles.CartItemCardQuantity}>
          <AnimatedPressable
            onPress={onDecrease}
            style={styles.CartItemCardQuantityButton}
          >
            <Text style={styles.CartItemCardQuantityButtonText}>−</Text>
          </AnimatedPressable>
          <Text style={styles.CartItemCardQuantityValue}>{item.quantity}</Text>
          <AnimatedPressable
            onPress={onIncrease}
            style={styles.CartItemCardQuantityButton}
          >
            <Text style={styles.CartItemCardQuantityButtonText}>+</Text>
          </AnimatedPressable>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  CartItemCardSurface: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    alignItems: 'center',
  },
  CartItemCardImage: {
    width: 64,
    height: 64,
    borderRadius: Radius.sm,
    marginRight: Spacing.md,
  },

  CartItemCardBody: {
    flex: 1,
  },
  CartItemCardName: {
    ...Typography.body,
    fontWeight: '600',
  },

  CartItemCardMeta: {
    ...Typography.smallLabel,
    marginTop: 2,
  },
  CartItemCardPrice: {
    ...Typography.body,
    color: Colors.gold,
    fontWeight: '700',
    marginTop: 4,
  },
  CartItemCardQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  CartItemCardQuantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CartItemCardQuantityButtonText: {
    fontSize: 16,
    color: Colors.gold,
  },
  CartItemCardQuantityValue: {
    ...Typography.body,
    fontWeight: '600',
    marginHorizontal: Spacing.sm,
    minWidth: 16,
    textAlign: 'center',
  },

  CartItemCardRemoveAction: {
    width: 72,
    marginLeft: Spacing.sm,
    backgroundColor: Colors.error,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CartItemCardRemoveIcon: {
    fontSize: 22,
  },
});
