import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

function Star({ delay }: { delay: number }) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 600 }),
          withTiming(0.3, { duration: 600 }),
        ),
        -1,
        true,
      ),
    );
  }, [delay, opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.Text style={[styles.TwinklingStarsStar, style]}>✨</Animated.Text>
  );
}

export function TwinklingStars() {
  return (
    <View style={styles.TwinklingStarsRow}>
      <Star delay={0} />
      <Star delay={200} />
      <Star delay={400} />
    </View>
  );
}

const styles = StyleSheet.create({
  TwinklingStarsRow: {
    flexDirection: 'row',
    marginTop: 8,
  },

  TwinklingStarsStar: {
    fontSize: 14,
    marginRight: 4,
  },
});
