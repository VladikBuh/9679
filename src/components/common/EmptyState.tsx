import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';
import { PrimaryButton } from './PrimaryButton';

interface Props {
  emoji: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  emoji,
  title,
  description,
  actionLabel,
  onAction,
}: Props) {
  return (
    <View style={styles.EmptyStateContainer}>
      <Text style={styles.EmptyStateEmoji}>{emoji}</Text>
      <Text style={styles.EmptyStateTitle}>{title}</Text>
      <Text style={styles.EmptyStateDescription}>{description}</Text>
      {actionLabel && onAction ? (
        <PrimaryButton
          title={actionLabel}
          onPress={onAction}
          style={styles.EmptyStateButton}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  EmptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.huge,
    paddingHorizontal: Spacing.xxl,
  },

  EmptyStateEmoji: {
    fontSize: 56,
    marginBottom: Spacing.lg,
  },
  EmptyStateTitle: {
    ...Typography.cardTitle,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  EmptyStateDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },

  EmptyStateButton: {
    minWidth: 200,
  },
});
