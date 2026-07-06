import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { Colors, Layout, Radius, Shadows, Typography } from '../../theme';
import { AnimatedPressable } from './AnimatedPressable';

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

export function PrimaryButton({
  title,
  onPress,
  style,
  disabled,
  loading,
  icon,
}: Props) {
  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.PrimaryButtonSurface,
        disabled && styles.PrimaryButtonDisabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={Colors.background} />
      ) : (
        <Text style={styles.PrimaryButtonLabel}>
          {icon ? `${icon}  ` : ''}
          {title}
        </Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  PrimaryButtonSurface: {
    height: Layout.buttonHeight,
    borderRadius: Radius.md,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    ...Shadows.gold,
  },
  PrimaryButtonDisabled: {
    opacity: 0.5,
  },

  PrimaryButtonLabel: {
    ...Typography.cardTitle,
    color: Colors.background,
  },
});
