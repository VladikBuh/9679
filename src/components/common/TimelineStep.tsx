import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';

type TimelineState = 'done' | 'current' | 'upcoming';

interface Props {
  icon: string;
  title: string;
  timestamp?: string;
  description?: string;
  state: TimelineState;
  isLast?: boolean;
}

const STATE_COLOR: Record<TimelineState, string> = {
  done: Colors.success,
  current: Colors.gold,
  upcoming: Colors.textSecondary,
};

export function TimelineStep({
  icon,
  title,
  timestamp,
  description,
  state,
  isLast,
}: Props) {
  const color = STATE_COLOR[state];
  return (
    <View style={styles.TimelineStepRow}>
      <View style={styles.TimelineStepIconColumn}>
        <View style={[styles.TimelineStepIconCircle, { borderColor: color }]}>
          <Text style={styles.TimelineStepIconText}>{icon}</Text>
        </View>
        {!isLast ? (
          <View
            style={[
              styles.TimelineStepConnector,
              { backgroundColor: state === 'upcoming' ? Colors.border : color },
            ]}
          />
        ) : null}
      </View>
      <View style={styles.TimelineStepContent}>
        <View style={styles.TimelineStepHeaderRow}>
          <Text
            style={[
              styles.TimelineStepTitle,
              {
                color:
                  state === 'upcoming'
                    ? Colors.textSecondary
                    : Colors.textPrimary,
              },
            ]}
          >
            {title}
          </Text>
          {timestamp ? (
            <Text style={styles.TimelineStepTimestamp}>{timestamp}</Text>
          ) : null}
        </View>
        {description ? (
          <Text style={styles.TimelineStepDescription}>{description}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TimelineStepRow: {
    flexDirection: 'row',
  },
  TimelineStepIconColumn: {
    alignItems: 'center',
    width: 40,
  },

  TimelineStepIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
  },
  TimelineStepIconText: {
    fontSize: 14,
  },
  TimelineStepConnector: {
    width: 2,
    flex: 1,
    minHeight: 24,
    marginVertical: 4,
  },

  TimelineStepContent: {
    flex: 1,
    paddingBottom: Spacing.lg,
    paddingLeft: Spacing.sm,
  },
  TimelineStepHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TimelineStepTitle: {
    ...Typography.body,
    fontWeight: '600',
  },
  TimelineStepTimestamp: {
    ...Typography.smallLabel,
  },
  TimelineStepDescription: {
    ...Typography.caption,
    marginTop: 2,
  },
});
