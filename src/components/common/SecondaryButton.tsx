import React from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors, Layout, Radius, Typography } from '../../theme';
import { AnimatedPressable } from './AnimatedPressable';

interface Props {
  title: string;
  onPress: () => void;
  icon?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export function SecondaryButton({
  title,
  onPress,
  icon,
  style,
  disabled,
}: Props) {
  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.SecondaryButtonSurface,
        disabled && styles.SecondaryButtonDisabled,
        style,
      ]}
    >
      <Text style={styles.SecondaryButtonLabel}>
        {icon ? `${icon}  ` : ''}
        {title}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  SecondaryButtonSurface: {
    height: Layout.secondaryButtonHeight,
    borderRadius: Radius.md,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    flexDirection: 'row',
  },

  SecondaryButtonDisabled: {
    opacity: 0.5,
  },
  SecondaryButtonLabel: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
