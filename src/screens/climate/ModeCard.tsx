import React from 'react';
import { Switch, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../../theme';

interface Props {
  icon: string;
  title: string;
  description: string;
  toggled?: boolean;
  onToggle?: (value: boolean) => void;
  footer?: React.ReactNode;
  wide?: boolean;
}

export function ModeCard({
  icon,
  title,
  description,
  toggled,
  onToggle,
  footer,
  wide,
}: Props) {
  return (
    <View style={[styles.ModeCardSurface, wide && styles.ModeCardSurfaceWide]}>
      <View style={styles.ModeCardHeaderRow}>
        <Text style={styles.ModeCardIcon}>{icon}</Text>
        {onToggle ? (
          <Switch
            value={toggled}
            onValueChange={onToggle}
            trackColor={{ false: Colors.card, true: Colors.gold }}
            thumbColor="#FFFFFF"
          />
        ) : null}
      </View>
      <Text style={styles.ModeCardTitle}>{title}</Text>
      <Text style={styles.ModeCardDescription}>{description}</Text>
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  ModeCardSurface: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },

  ModeCardSurfaceWide: {
    width: '100%',
  },
  ModeCardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  ModeCardIcon: {
    fontSize: 26,
  },

  ModeCardTitle: {
    ...Typography.cardTitle,
    fontSize: 16,
    marginBottom: 2,
  },
  ModeCardDescription: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
