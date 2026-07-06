import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors, Radius, Shadows, Spacing } from '../../theme';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
}

export function GlassCard({ children, style, padded = true }: Props) {
  return (
    <View
      style={[
        styles.GlassCardSurface,
        padded && styles.GlassCardPadding,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  GlassCardSurface: {
    backgroundColor: 'rgba(28,28,30,0.72)',
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },

  GlassCardPadding: {
    padding: Spacing.xl,
  },
});
