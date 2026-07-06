import React, { useEffect } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import images from '../assets/images';
import { Colors, Spacing, Typography } from '../theme';

const SPLASH_DURATION = 3000;

interface Props {
  onFinish: () => void;
}

function Dot({ delay }: { delay: number }) {
  const opacity = useSharedValue(0.25);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.25, { duration: delay }),
        withTiming(1, { duration: 350 }),
        withTiming(0.25, { duration: 350 }),
      ),
      -1,
      false,
    );
  }, [delay, opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.View style={[styles.SplashScreenDot, style]} />;
}

export function SplashScreen({ onFinish }: Props) {
  const logoScale = useSharedValue(0.85);
  const glowOpacity = useSharedValue(0.25);

  useEffect(() => {
    logoScale.value = withTiming(1, { duration: SPLASH_DURATION });
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.55, { duration: 1000 }),
        withTiming(0.2, { duration: 1000 }),
      ),
      -1,
      true,
    );

    const timer = setTimeout(onFinish, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [logoScale, glowOpacity, onFinish]);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <ImageBackground
      source={images.loaderBg}
      style={styles.SplashScreenBackground}
      resizeMode="cover"
    >
      <View style={styles.SplashScreenOverlay} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.SplashScreenCenter}>
          <Animated.Image
            source={images.loaderIcon}
            style={[styles.SplashScreenEmblem, logoStyle]}
            resizeMode="contain"
          />
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 50,

              alignItems: 'center',
            }}
          >
            <Text style={styles.SplashScreenTitle}>
              Caesars Hub {'\n'}Windsor Casino
            </Text>
            <View style={styles.SplashScreenLoadingRow}>
              <Text style={styles.SplashScreenLoadingLabel}>Loading</Text>
              <Dot delay={0} />
              <Dot delay={150} />
              <Dot delay={300} />
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  SplashScreenRoot: {
    flex: 1,
  },
  SplashScreenBackground: {
    ...StyleSheet.absoluteFill,
  },
  SplashScreenOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000',
    opacity: 0.5,
  },

  SplashScreenCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  SplashScreenEmblem: {
    width: 250,
    height: 250,
    marginBottom: Spacing.xxl,
    borderRadius: 50,
  },
  SplashScreenTitle: {
    ...Typography.largeTitle,
    color: Colors.gold,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  SplashScreenLoadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  SplashScreenLoadingLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginRight: Spacing.sm,
  },
  SplashScreenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gold,
    marginHorizontal: 2,
  },
});
