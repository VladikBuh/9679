import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { Colors } from '../theme';
import { TabNavigator } from './TabNavigator';

type AppPhase = 'splash' | 'onboarding' | 'main';

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.background,
    card: Colors.backgroundSecondary,
    border: Colors.border,
    primary: Colors.gold,
    text: Colors.textPrimary,
  },
};

export function AppNavigator() {
  const [phase, setPhase] = useState<AppPhase>('splash');

  if (phase === 'splash') {
    return <SplashScreen onFinish={() => setPhase('onboarding')} />;
  }

  if (phase === 'onboarding') {
    return <OnboardingScreen onFinish={() => setPhase('main')} />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
}
