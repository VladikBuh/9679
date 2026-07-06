import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from '../../hooks/useToast';
import { Colors, Radius, Spacing, Typography } from '../../theme';

export function Toast() {
  const { message } = useToast();
  const insets = useSafeAreaInsets();

  if (!message) return null;

  return (
    <Animated.View
      entering={FadeInDown.duration(200)}
      exiting={FadeOutDown.duration(200)}
      style={[styles.ToastRoot, { bottom: insets.bottom + 100 }]}
      pointerEvents="none"
    >
      <Text style={styles.ToastText}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ToastRoot: {
    position: 'absolute',
    left: Spacing.xxl,
    right: Spacing.xxl,
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },

  ToastText: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
});
