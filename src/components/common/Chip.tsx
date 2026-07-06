import React from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../../theme';
import { AnimatedPressable } from './AnimatedPressable';

interface Props {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Chip({ label, selected, onPress, style }: Props) {
  return (
    <AnimatedPressable
      onPress={onPress}
      haptic={!!onPress}
      style={[
        styles.ChipSurface,
        selected && styles.ChipSurfaceSelected,
        style,
      ]}
    >
      <Text style={[styles.ChipLabel, selected && styles.ChipLabelSelected]}>
        {label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  ChipSurface: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ChipSurfaceSelected: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },

  ChipLabel: {
    ...Typography.smallLabel,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  ChipLabelSelected: {
    color: Colors.background,
  },
});
