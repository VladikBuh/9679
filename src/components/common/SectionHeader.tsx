import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';

interface Props {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, right }: Props) {
  return (
    <View style={styles.SectionHeaderRow}>
      <View style={styles.SectionHeaderTextGroup}>
        <Text style={styles.SectionHeaderTitle}>{title}</Text>
        {subtitle ? (
          <Text style={styles.SectionHeaderSubtitle}>{subtitle}</Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  SectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  SectionHeaderTextGroup: {
    flex: 1,
  },

  SectionHeaderTitle: {
    ...Typography.sectionTitle,
  },
  SectionHeaderSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});
