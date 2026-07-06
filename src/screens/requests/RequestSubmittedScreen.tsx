import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassCard } from '../../components/common/GlassCard';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useRequests } from '../../hooks/useRequests';
import { RequestsStackParamList } from '../../navigation/RequestsStack';
import { Colors, Layout, Spacing, Typography } from '../../theme';

type Nav = NativeStackNavigationProp<
  RequestsStackParamList,
  'RequestSubmitted'
>;
type Rt = RouteProp<RequestsStackParamList, 'RequestSubmitted'>;

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <View style={styles.RequestSubmittedScreenRow}>
      <Text style={styles.RequestSubmittedScreenRowLabel}>{label}</Text>
      {typeof value === 'string' ? (
        <Text style={styles.RequestSubmittedScreenRowValue}>{value}</Text>
      ) : (
        value
      )}
    </View>
  );
}

export function RequestSubmittedScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const insets = useSafeAreaInsets();
  const { getRequestById } = useRequests();
  const request = getRequestById(route.params.requestId);

  return (
    <View style={[styles.RequestSubmittedScreenRoot]}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingTop: insets.top + Spacing.huge,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={ZoomIn.duration(500).springify()}
          style={styles.RequestSubmittedScreenCheckWrap}
        >
          <Text style={styles.RequestSubmittedScreenCheck}>✅</Text>
        </Animated.View>

        <Animated.View entering={FadeIn.duration(400).delay(150)}>
          <Text style={styles.RequestSubmittedScreenTitle}>
            Request Submitted
          </Text>
          <Text style={styles.RequestSubmittedScreenSubtitle}>
            Our team has received your request.
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeIn.duration(400).delay(300)}
          style={styles.RequestSubmittedScreenCardWrap}
        >
          <GlassCard>
            <DetailRow label="Request ID" value={request?.id ?? '—'} />
            <View style={styles.RequestSubmittedScreenDivider} />
            <DetailRow label="Category" value={request?.categoryTitle ?? '—'} />
            <View style={styles.RequestSubmittedScreenDivider} />
            <DetailRow
              label="Status"
              value={
                <StatusBadge status={request?.status ?? 'Submitted'} small />
              }
            />
            <View style={styles.RequestSubmittedScreenDivider} />
            <DetailRow
              label="Estimated Response"
              value={request?.estimatedArrival ?? '15 Minutes'}
            />
          </GlassCard>
        </Animated.View>

        <Animated.View
          entering={FadeIn.duration(400).delay(450)}
          style={styles.RequestSubmittedScreenButtons}
        >
          <PrimaryButton
            title="Track Request"
            onPress={() =>
              request &&
              navigation.replace('RequestTracking', { requestId: request.id })
            }
            style={styles.RequestSubmittedScreenButtonSpacing}
          />
          <SecondaryButton
            title="Return Home"
            onPress={() => navigation.popToTop()}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  RequestSubmittedScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Layout.screenPadding,
    alignItems: 'center',
  },
  RequestSubmittedScreenCheckWrap: {
    marginBottom: Spacing.xl,
  },
  RequestSubmittedScreenCheck: {
    fontSize: 72,
  },

  RequestSubmittedScreenTitle: {
    ...Typography.largeTitle,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },

  RequestSubmittedScreenSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  RequestSubmittedScreenCardWrap: {
    width: '100%',
    marginBottom: Spacing.xxl,
  },
  RequestSubmittedScreenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  RequestSubmittedScreenRowLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  RequestSubmittedScreenRowValue: {
    ...Typography.body,
    fontWeight: '600',
  },
  RequestSubmittedScreenDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  RequestSubmittedScreenButtons: {
    width: '100%',
  },

  RequestSubmittedScreenButtonSpacing: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
});
