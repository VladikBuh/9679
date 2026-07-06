import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Typography } from '../../theme';

const DIAL_SIZE = 260;
const STROKE_WIDTH = 16;
const RADIUS = (DIAL_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = DIAL_SIZE / 2;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  temperature: number;
  minTemp: number;
  maxTemp: number;
  onChange: (value: number) => void;
}

export function TemperatureDial({
  temperature,
  minTemp,
  maxTemp,
  onChange,
}: Props) {
  const percent = (temperature - minTemp) / (maxTemp - minTemp);
  const glow = useSharedValue(0.3);
  const lastTemp = useSharedValue(temperature);

  const updateTempOnJS = useCallback(
    (value: number) => {
      ReactNativeHapticFeedback.trigger('impactLight');
      onChange(value);
    },
    [onChange],
  );

  const handleGesture = Gesture.Pan()
    .onBegin(() => {
      glow.value = withTiming(0.7, { duration: 200 });
    })
    .onUpdate(event => {
      const dx = event.x - CENTER;
      const dy = event.y - CENTER;
      let angle = Math.atan2(dy, dx) + Math.PI / 2;
      if (angle < 0) angle += 2 * Math.PI;
      const p = angle / (2 * Math.PI);
      const value = Math.round(minTemp + p * (maxTemp - minTemp));
      if (value !== lastTemp.value) {
        lastTemp.value = value;
        runOnJS(updateTempOnJS)(value);
      }
    })
    .onFinalize(() => {
      glow.value = withTiming(0.3, { duration: 300 });
    });

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - percent),
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  return (
    <View style={styles.TemperatureDialWrap}>
      <Animated.View style={[styles.TemperatureDialGlow, glowStyle]} />
      <GestureDetector gesture={handleGesture}>
        <View style={styles.TemperatureDialTouchArea}>
          <Svg width={DIAL_SIZE} height={DIAL_SIZE}>
            <Circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              stroke={Colors.border}
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />
            <AnimatedCircle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              stroke={Colors.gold}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${CIRCUMFERENCE}, ${CIRCUMFERENCE}`}
              animatedProps={animatedProps}
              rotation={-90}
              origin={`${CENTER}, ${CENTER}`}
            />
          </Svg>
          <View style={styles.TemperatureDialCenter} pointerEvents="none">
            <Text style={styles.TemperatureDialValue}>{temperature}°</Text>
            <Text style={styles.TemperatureDialUnit}>Target Temperature</Text>
          </View>
        </View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  TemperatureDialWrap: {
    width: DIAL_SIZE,
    height: DIAL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 12,
  },

  TemperatureDialGlow: {
    position: 'absolute',
    width: DIAL_SIZE + 40,
    height: DIAL_SIZE + 40,
    borderRadius: (DIAL_SIZE + 40) / 2,
    backgroundColor: Colors.gold,
    opacity: 0.2,
  },
  TemperatureDialTouchArea: {
    width: DIAL_SIZE,
    height: DIAL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },

  TemperatureDialCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  TemperatureDialValue: {
    ...Typography.largeTitle,
    fontSize: 56,
    color: Colors.gold,
  },
  TemperatureDialUnit: {
    ...Typography.smallLabel,
    marginTop: 4,
  },
});
