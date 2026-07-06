import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { EmptyState } from '../../components/common/EmptyState';
import { GlassCard } from '../../components/common/GlassCard';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { StatusBadge } from '../../components/common/StatusBadge';
import { guest } from '../../data/guest';
import { findDishById } from '../../data/menu';
import { useCart } from '../../hooks/useCart';
import { DiningStackParamList } from '../../navigation/DiningStack';
import { Colors, Layout, Radius, Spacing, Typography } from '../../theme';
import { CartItemCard } from './CartItemCard';

type Nav = NativeStackNavigationProp<DiningStackParamList, 'Cart'>;
const MAX_NOTES = 250;

export function CartScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { items, subtotal, updateQuantity, removeItem, placeOrder } = useCart();
  const [notes, setNotes] = useState('');
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      placeOrder(notes.trim() || undefined);
      navigation.replace('OrderConfirm');
    }, 700);
  };

  return (
    <View style={styles.CartScreenRoot}>
      <ScrollView
        contentContainerStyle={[
          styles.CartScreenContent,
          {
            paddingTop: insets.top + Spacing.lg,
            paddingBottom: items.length ? 140 : Spacing.xxl,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <AnimatedPressable
          onPress={() => navigation.goBack()}
          haptic={false}
          style={styles.CartScreenBack}
        >
          <Text style={styles.CartScreenBackText}>‹ Back</Text>
        </AnimatedPressable>

        <Animated.View entering={FadeInUp.duration(400)}>
          <Text style={styles.CartScreenTitle}>Shopping Cart</Text>
        </Animated.View>

        {items.length === 0 ? (
          <Animated.View
            entering={FadeIn.duration(400)}
            style={styles.CartScreenEmptyWrap}
          >
            <EmptyState
              emoji="🛒"
              title="Your cart is empty"
              description="Browse our menu and discover premium dishes."
              actionLabel="Browse Menu"
              onAction={() => navigation.navigate('DiningHome')}
            />
          </Animated.View>
        ) : (
          <>
            {items.map((item, index) => {
              const dish = findDishById(item.dishId);
              if (!dish) return null;
              return (
                <Animated.View
                  key={item.dishId}
                  entering={FadeInUp.duration(400).delay(80 + index * 60)}
                  style={styles.CartScreenItemWrap}
                >
                  <CartItemCard
                    item={item}
                    dish={dish}
                    onIncrease={() =>
                      updateQuantity(item.dishId, item.quantity + 1)
                    }
                    onDecrease={() =>
                      updateQuantity(item.dishId, item.quantity - 1)
                    }
                    onRemove={() => removeItem(item.dishId)}
                  />
                </Animated.View>
              );
            })}

            <Animated.View
              entering={FadeInUp.duration(400).delay(200)}
              style={styles.CartScreenSection}
            >
              <GlassCard>
                <View style={styles.CartScreenSummaryRow}>
                  <Text style={styles.CartScreenSummaryLabel}>Subtotal</Text>
                  <Text style={styles.CartScreenSummaryValue}>
                    ${subtotal.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.CartScreenSummaryRow}>
                  <Text style={styles.CartScreenSummaryLabel}>
                    Delivery Fee
                  </Text>
                  <Text style={styles.CartScreenSummaryValue}>Free</Text>
                </View>
                <View style={styles.CartScreenSummaryRow}>
                  <Text style={styles.CartScreenSummaryLabel}>Taxes</Text>
                  <Text style={styles.CartScreenSummaryValue}>Included</Text>
                </View>
                <View style={styles.CartScreenDivider} />
                <View style={styles.CartScreenSummaryRow}>
                  <Text style={styles.CartScreenTotalLabel}>Total</Text>
                  <Text style={styles.CartScreenTotalValue}>
                    ${subtotal.toFixed(2)}
                  </Text>
                </View>
              </GlassCard>
            </Animated.View>

            <Animated.View
              entering={FadeInUp.duration(400).delay(260)}
              style={styles.CartScreenSection}
            >
              <GlassCard>
                <View style={styles.CartScreenSummaryRow}>
                  <Text style={styles.CartScreenSummaryLabel}>
                    🚪 Room Number
                  </Text>
                  <Text style={styles.CartScreenSummaryValue}>
                    Room {guest.room}
                  </Text>
                </View>
                <View style={styles.CartScreenSummaryRow}>
                  <Text style={styles.CartScreenSummaryLabel}>
                    🧑 Guest Name
                  </Text>
                  <Text style={styles.CartScreenSummaryValue}>
                    {guest.name}
                  </Text>
                </View>
                <View style={styles.CartScreenSummaryRow}>
                  <Text style={styles.CartScreenSummaryLabel}>
                    📍 Delivery Location
                  </Text>
                  <Text style={styles.CartScreenSummaryValue}>
                    Presidential Suite
                  </Text>
                </View>
                <View style={styles.CartScreenSummaryRow}>
                  <Text style={styles.CartScreenSummaryLabel}>
                    ⏱️ Estimated Delivery
                  </Text>
                  <Text style={styles.CartScreenSummaryValue}>35 Minutes</Text>
                </View>
                <View style={styles.CartScreenSummaryRow}>
                  <Text style={styles.CartScreenSummaryLabel}>Status</Text>
                  <StatusBadge status="Preparing" small />
                </View>
              </GlassCard>
            </Animated.View>

            <Animated.View
              entering={FadeInUp.duration(400).delay(320)}
              style={styles.CartScreenSection}
            >
              <Text style={styles.CartScreenLabel}>Special Delivery Notes</Text>
              <View style={styles.CartScreenNotesWrap}>
                <TextInput
                  value={notes}
                  onChangeText={text => setNotes(text.slice(0, MAX_NOTES))}
                  placeholder="Please knock softly. Bring extra napkins."
                  placeholderTextColor={Colors.textSecondary}
                  style={styles.CartScreenNotesInput}
                  multiline
                  maxLength={MAX_NOTES}
                  textAlignVertical="top"
                />
              </View>
              <Text style={styles.CartScreenCounter}>
                {notes.length}/{MAX_NOTES}
              </Text>
            </Animated.View>
          </>
        )}

        {items.length > 0 ? (
          <View
            style={[
              styles.CartScreenFooter,
              { paddingBottom: insets.bottom + Spacing.lg },
            ]}
          >
            <PrimaryButton
              title="Place Order"
              onPress={handlePlaceOrder}
              loading={placing}
              style={styles.CartScreenCheckoutButton}
            />
          </View>
        ) : null}
      </ScrollView>
      {placing ? (
        <Animated.View
          entering={FadeIn.duration(200)}
          style={styles.CartScreenSuccessOverlay}
        >
          <Animated.View
            entering={ZoomIn.duration(400).springify()}
            style={styles.CartScreenSuccessCircle}
          >
            <Text style={styles.CartScreenSuccessCheck}>✓</Text>
          </Animated.View>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  CartScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  CartScreenContent: {
    paddingHorizontal: Layout.screenPadding,
  },
  CartScreenBack: {
    marginBottom: Spacing.lg,
    alignSelf: 'flex-start',
  },

  CartScreenBackText: {
    ...Typography.body,
    color: Colors.gold,
  },
  CartScreenTitle: {
    ...Typography.largeTitle,
    marginBottom: Spacing.lg,
  },
  CartScreenEmptyWrap: {
    marginTop: Spacing.xxl,
  },
  CartScreenItemWrap: {
    marginBottom: Spacing.md,
  },
  CartScreenSection: {
    marginTop: Layout.cardGap,
  },
  CartScreenSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  CartScreenSummaryLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  CartScreenSummaryValue: {
    ...Typography.body,
    fontWeight: '600',
  },

  CartScreenDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  CartScreenTotalLabel: {
    ...Typography.cardTitle,
  },
  CartScreenTotalValue: {
    ...Typography.cardTitle,
    color: Colors.gold,
  },
  CartScreenLabel: {
    ...Typography.smallLabel,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
  },

  CartScreenNotesWrap: {
    minHeight: 80,
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
  },
  CartScreenNotesInput: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },

  CartScreenCounter: {
    ...Typography.smallLabel,
    textAlign: 'right',
    marginTop: Spacing.sm,
  },
  CartScreenFooter: {
    paddingTop: Spacing.lg,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 10,
  },
  CartScreenCheckoutButton: {
    width: '100%',
    height: 60,
  },

  CartScreenSuccessOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(8,8,8,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CartScreenSuccessCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CartScreenSuccessCheck: {
    fontSize: 48,
    color: Colors.background,
    fontWeight: '700',
  },
});
