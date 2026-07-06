import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';

interface Stat {
  label: string;
  value: string;
  emoji?: string;
}

interface Props {
  stats: Stat[];
}

export function StatRow({ stats }: Props) {
  return (
    <View style={styles.StatRowContainer}>
      {stats.map((stat, index) => (
        <React.Fragment key={stat.label}>
          <View style={styles.StatRowItem}>
            {stat.emoji ? (
              <Text style={styles.StatRowEmoji}>{stat.emoji}</Text>
            ) : null}
            <Text style={styles.StatRowValue}>{stat.value}</Text>
            <Text style={styles.StatRowLabel}>{stat.label}</Text>
          </View>
          {index < stats.length - 1 ? (
            <View style={styles.StatRowDivider} />
          ) : null}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  StatRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  StatRowItem: {
    flex: 1,
    alignItems: 'center',
  },
  StatRowEmoji: {
    fontSize: 20,
    marginBottom: Spacing.xs,
  },

  StatRowValue: {
    ...Typography.cardTitle,
    color: Colors.gold,
  },

  StatRowLabel: {
    ...Typography.smallLabel,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  StatRowDivider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.border,
  },
});
