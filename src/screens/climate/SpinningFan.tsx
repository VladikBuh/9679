import React, { useEffect } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const SPEED_DURATION: Record<string, number> = {
  Low: 3000,
  Medium: 1800,
  High: 1000,
  Turbo: 500,
};

export function SpinningFan({
  speed,
  size = 22,
}: {
  speed: string;
  size?: number;
}) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(rotation);
    rotation.value = withRepeat(
      withTiming(rotation.value + 360, {
        duration: SPEED_DURATION[speed] ?? 1800,
        easing: Easing.linear,
      }),
      -1,
    );
    return () => cancelAnimation(rotation);
  }, [speed, rotation]);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return <Animated.Text style={[{ fontSize: size }, style]}>🌀</Animated.Text>;
}
