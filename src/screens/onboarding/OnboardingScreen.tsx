import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../assets/images';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { Colors, Spacing, Typography } from '../../theme';

interface OnboardingStep {
  title: string;
  subtitle: string;
  image: any;
}

const STEPS: OnboardingStep[] = [
  {
    title: 'Welcome to Luxury Hospitality',
    subtitle:
      'Discover a premium hotel companion designed to simplify every part of your stay.',
    image: images.onboardBg1,
  },
  {
    title: 'Digital Guest Pass',
    subtitle:
      'Access your digital guest card with a QR code for quick identification during your stay.',
    image: images.onboardBg2,
  },
  {
    title: 'Hotel Services',
    subtitle:
      'Request housekeeping, amenities, transportation, maintenance, and personalized services directly from your phone.',
    image: images.onboardBg3,
  },
  {
    title: 'Room Comfort',
    subtitle:
      'Control your room temperature and comfort settings anytime with a beautiful climate dashboard.',
    image: images.onboardBg4,
  },
  {
    title: 'Dining & Assistance',
    subtitle:
      'Order premium meals, browse hotel services, and instantly find answers to common questions.',
    image: images.onboardBg5,
  },
];

interface Props {
  onFinish: () => void;
}

export function OnboardingScreen({ onFinish }: Props) {
  const [step, setStep] = useState(0);
  const insets = useSafeAreaInsets();
  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  const goNext = () => {
    if (isLast) {
      onFinish();
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <ImageBackground
      source={current.image}
      resizeMode="cover"
      style={styles.OnboardingScreenRoot}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.OnboardingScreenTopRow,
            { top: insets.top + Spacing.lg },
          ]}
        >
          <View style={styles.OnboardingScreenIndicatorRow}>
            {STEPS.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.OnboardingScreenDot,
                  i === step && styles.OnboardingScreenDotActive,
                ]}
              />
            ))}
          </View>
          {!isLast ? (
            <AnimatedPressable onPress={onFinish} haptic={false}>
              <Text style={styles.OnboardingScreenSkip}>Skip</Text>
            </AnimatedPressable>
          ) : null}
        </View>

        <Animated.View
          key={`text-${step}`}
          entering={FadeIn.duration(400).delay(100)}
          style={[
            styles.OnboardingScreenBottom,
            { paddingBottom: insets.bottom + Spacing.xl },
          ]}
        >
          <Text style={styles.OnboardingScreenTitle}>{current.title}</Text>
          <Text style={styles.OnboardingScreenSubtitle}>
            {current.subtitle}
          </Text>
          <PrimaryButton
            title={isLast ? 'Get Started' : 'Next'}
            onPress={goNext}
            style={styles.OnboardingScreenButton}
          />
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  OnboardingScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  OnboardingScreenOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.background,
    opacity: 0.55,
  },
  OnboardingScreenTopRow: {
    position: 'absolute',
    left: Spacing.xl,
    right: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  OnboardingScreenIndicatorRow: {
    flexDirection: 'row',
  },

  OnboardingScreenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginRight: Spacing.sm,
  },
  OnboardingScreenDotActive: {
    backgroundColor: Colors.gold,
    width: 20,
  },
  OnboardingScreenSkip: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  OnboardingScreenBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: Spacing.xxl,
  },

  OnboardingScreenTitle: {
    ...Typography.largeTitle,
    marginBottom: Spacing.md,
  },
  OnboardingScreenSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
    lineHeight: 24,
  },

  OnboardingScreenButton: {
    width: '100%',
  },
});
