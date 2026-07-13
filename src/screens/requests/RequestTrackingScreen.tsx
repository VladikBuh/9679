import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { GlassCard } from '../../components/common/GlassCard';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { TimelineStep } from '../../components/common/TimelineStep';
import { useRequests } from '../../hooks/useRequests';
import { RequestsStackParamList } from '../../navigation/RequestsStack';
import { Colors, Layout, Spacing, Typography } from '../../theme';
import { RequestStatus } from '../../types';

type Nav = NativeStackNavigationProp<RequestsStackParamList, 'RequestTracking'>;
type Rt = RouteProp<RequestsStackParamList, 'RequestTracking'>;

const STEP_ORDER: RequestStatus[] = [
  'Submitted',
  'Received',
  'Assigned',
  'In Progress',
  'Completed',
];

const STEP_META: Record<RequestStatus, { icon: string; description: string }> =
  {
    Submitted: {
      icon: '📝',
      description: 'Your request has been received by our system.',
    },
    Received: {
      icon: '📥',
      description: 'Our concierge team has reviewed your request.',
    },
    Assigned: {
      icon: '👤',
      description: 'A team member has been assigned to your request.',
    },
    'In Progress': {
      icon: '🔧',
      description: 'Your request is currently being handled.',
    },
    Completed: { icon: '✅', description: 'Your request has been completed.' },
    Cancelled: { icon: '✕', description: 'This request was cancelled.' },
  };

export function RequestTrackingScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const insets = useSafeAreaInsets();
  const { getRequestById } = useRequests();
  const request = getRequestById(route.params.requestId);

  const currentIndex = request ? STEP_ORDER.indexOf(request.status) : 0;

  return (
    <ScrollView
      style={styles.RequestTrackingScreenRoot}
      contentContainerStyle={[
        styles.RequestTrackingScreenContent,
        {
          paddingTop: insets.top + Spacing.lg,
          paddingBottom: insets.bottom + Spacing.xxl,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <AnimatedPressable
        onPress={() => navigation.goBack()}
        haptic={false}
        style={styles.RequestTrackingScreenBack}
      >
        <Text style={styles.RequestTrackingScreenBackText}>‹ Back</Text>
      </AnimatedPressable>

      <Animated.View entering={FadeInUp.duration(400)}>
        <Text style={styles.RequestTrackingScreenTitle}>Request Tracking</Text>
        <Text style={styles.RequestTrackingScreenSubtitle}>
          {request?.categoryTitle ?? 'Guest Request'}
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(100)}
        style={styles.RequestTrackingScreenSection}
      >
        <GlassCard>
          {STEP_ORDER.map((step, index) => {
            const meta = STEP_META[step];
            const state =
              index < currentIndex
                ? 'done'
                : index === currentIndex
                ? 'current'
                : 'upcoming';
            return (
              <TimelineStep
                key={step}
                icon={meta.icon}
                title={step}
                description={meta.description}
                timestamp={
                  index === 0
                    ? request?.createdAt
                    : index === currentIndex
                    ? request?.updatedAt
                    : undefined
                }
                state={state}
                isLast={index === STEP_ORDER.length - 1}
              />
            );
          })}
        </GlassCard>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(200)}
        style={styles.RequestTrackingScreenSection}
      >
        <SecondaryButton
          title="View Request Details"
          onPress={() =>
            request &&
            navigation.navigate('RequestDetails', { requestId: request.id })
          }
        />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  RequestTrackingScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  RequestTrackingScreenContent: {
    paddingHorizontal: Layout.screenPadding,
  },
  RequestTrackingScreenBack: {
    marginBottom: Spacing.lg,
    alignSelf: 'flex-start',
  },
  RequestTrackingScreenBackText: {
    ...Typography.body,
    color: Colors.gold,
  },
  RequestTrackingScreenTitle: {
    ...Typography.largeTitle,
    fontSize: 28,
    marginBottom: Spacing.xs,
  },
  RequestTrackingScreenSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  RequestTrackingScreenSection: {
    marginTop: Layout.cardGap,
    marginBottom: 80,
  },
});
