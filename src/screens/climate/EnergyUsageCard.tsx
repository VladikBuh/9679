import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Polyline } from 'react-native-svg';
import { GlassCard } from '../../components/common/GlassCard';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Colors, Spacing, Typography } from '../../theme';

const CHART_WIDTH_FALLBACK = 280;
const CHART_HEIGHT = 80;

const AnimatedPolyline = Animated.createAnimatedComponent(Polyline);

interface Props {
  todayUsage: number;
  efficiency: string;
  ecoScore: string;
  graph: number[];
}

export function EnergyUsageCard({
  todayUsage,
  efficiency,
  ecoScore,
  graph,
}: Props) {
  const [chartWidth, setChartWidth] = useState(CHART_WIDTH_FALLBACK);
  const progress = useSharedValue(0);
  const max = Math.max(...graph);
  const min = Math.min(...graph);
  const range = max - min || 1;

  const points = graph
    .map((value, index) => {
      const x = (index / (graph.length - 1)) * (chartWidth - 12) + 6;
      const y =
        CHART_HEIGHT - ((value - min) / range) * (CHART_HEIGHT - 12) - 6;
      return `${x},${y}`;
    })
    .join(' ');

  const pathLength = chartWidth * 1.4;

  const handleChartLayout = (event: LayoutChangeEvent) => {
    setChartWidth(event.nativeEvent.layout.width);
  };

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1200 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: pathLength * (1 - progress.value),
  }));

  const lastPoint = points.split(' ').pop()?.split(',');

  return (
    <GlassCard>
      <SectionHeader
        title="Today's Energy Usage"
        subtitle={`${todayUsage}% of average consumption`}
      />
      <View style={styles.EnergyUsageCardStatsRow}>
        <View>
          <Text style={styles.EnergyUsageCardStatValue}>{efficiency}</Text>
          <Text style={styles.EnergyUsageCardStatLabel}>Efficiency</Text>
        </View>
        <View>
          <Text style={styles.EnergyUsageCardStatValue}>{ecoScore}</Text>
          <Text style={styles.EnergyUsageCardStatLabel}>Eco Score</Text>
        </View>
      </View>
      <View
        style={styles.EnergyUsageCardChartWrap}
        onLayout={handleChartLayout}
      >
        <Svg width={chartWidth} height={CHART_HEIGHT}>
          <AnimatedPolyline
            points={points}
            fill="none"
            stroke={Colors.gold}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${pathLength}, ${pathLength}`}
            animatedProps={animatedProps}
          />
          {lastPoint ? (
            <Circle
              cx={Number(lastPoint[0])}
              cy={Number(lastPoint[1])}
              r={5}
              fill={Colors.gold}
            />
          ) : null}
        </Svg>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  EnergyUsageCardStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
    width: '60%',
  },
  EnergyUsageCardStatValue: {
    ...Typography.cardTitle,
    color: Colors.gold,
  },

  EnergyUsageCardStatLabel: {
    ...Typography.smallLabel,
    marginTop: 2,
  },
  EnergyUsageCardChartWrap: {
    width: '100%',
    alignItems: 'center',
  },
});
