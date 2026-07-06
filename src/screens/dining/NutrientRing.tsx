import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Spacing, Typography } from '../../theme';

const SIZE = 64;
const STROKE = 6;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  label: string;
  value: number;
  unit: string;
  max: number;
}

export function NutrientRing({ label, value, unit, max }: Props) {
  const progress = useSharedValue(0);
  const percent = Math.min(value / max, 1);

  useEffect(() => {
    progress.value = withTiming(percent, { duration: 900 });
  }, [percent, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
  }));

  return (
    <View style={styles.NutrientRingWrap}>
      <Svg width={SIZE} height={SIZE}>
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke={Colors.border}
          strokeWidth={STROKE}
          fill="none"
        />
        <AnimatedCircle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke={Colors.gold}
          strokeWidth={STROKE}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${CIRCUMFERENCE}, ${CIRCUMFERENCE}`}
          animatedProps={animatedProps}
          rotation={-90}
          origin={`${SIZE / 2}, ${SIZE / 2}`}
        />
      </Svg>
      <View style={styles.NutrientRingCenter} pointerEvents="none">
        <Text style={styles.NutrientRingValue}>{value}</Text>
      </View>
      <Text style={styles.NutrientRingLabel}>
        {label} ({unit})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  NutrientRingWrap: {
    alignItems: 'center',
    width: SIZE + Spacing.md,
  },
  NutrientRingCenter: {
    position: 'absolute',
    top: 0,
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },

  NutrientRingValue: {
    ...Typography.smallLabel,
    color: Colors.textPrimary,
    fontWeight: '700',
  },

  NutrientRingLabel: {
    ...Typography.smallLabel,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
});
