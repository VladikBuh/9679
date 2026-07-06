import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../../theme';

const STATUS_COLORS: Record<string, string> = {
  Submitted: '#4A90D9',
  Received: Colors.gold,
  Accepted: Colors.gold,
  Assigned: Colors.textSecondary,
  'In Progress': '#E39A3C',
  Preparing: '#E39A3C',
  Cooking: '#E39A3C',
  'Out for Delivery': Colors.gold,
  Delivered: Colors.success,
  Completed: Colors.success,
  Cancelled: Colors.error,
};

interface Props {
  status: string;
  small?: boolean;
}

export function StatusBadge({ status, small }: Props) {
  const color = STATUS_COLORS[status] ?? Colors.gold;
  return (
    <View
      style={[
        styles.StatusBadgeCapsule,
        small && styles.StatusBadgeCapsuleSmall,
        { borderColor: color, backgroundColor: `${color}22` },
      ]}
    >
      <View style={[styles.StatusBadgeDot, { backgroundColor: color }]} />
      <Text
        style={[
          styles.StatusBadgeLabel,
          small && styles.StatusBadgeLabelSmall,
          { color },
        ]}
      >
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  StatusBadgeCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },

  StatusBadgeCapsuleSmall: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  StatusBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: Spacing.xs,
  },

  StatusBadgeLabel: {
    ...Typography.smallLabel,
    fontWeight: '600',
  },
  StatusBadgeLabelSmall: {
    fontSize: 11,
  },
});
