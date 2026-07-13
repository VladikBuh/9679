import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../assets/images';
import { HeroBanner } from '../../components/common/HeroBanner';
import { guest } from '../../data/guest';
import { HomeStackParamList } from '../../navigation/HomeStack';
import { Colors, Layout, Spacing } from '../../theme';
import { GuestInfoCard } from './GuestInfoCard';
import { GuestQRCard } from './GuestQRCard';
import { RatingSection } from './RatingSection';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.HomeScreenRoot}
      contentContainerStyle={[
        styles.HomeScreenContent,
        {
          paddingTop: insets.top + Spacing.lg,
          paddingBottom: 88 + Spacing.xxl,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInUp.duration(500).delay(0)}>
        <HeroBanner
          image={images.onboardBg1}
          title="Welcome to Caesars Guest Hub"
          subtitle="Experience luxury hospitality from your mobile device."
          height={Layout.heroBannerHeight}
        />
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(500).delay(100)}
        style={styles.HomeScreenSection}
      >
        <GuestQRCard
          guest={guest}
          onPress={() => navigation.navigate('ExpandedQR')}
        />
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(500).delay(200)}
        style={styles.HomeScreenSection}
      >
        <GuestInfoCard guest={guest} />
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(500).delay(300)}
        style={styles.HomeScreenSection}
      >
        <RatingSection />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  HomeScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  HomeScreenContent: {
    paddingHorizontal: Layout.screenPadding,
  },

  HomeScreenSection: {
    marginTop: Layout.cardGap,
  },
});
