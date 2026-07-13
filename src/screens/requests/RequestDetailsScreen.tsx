import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { GlassCard } from '../../components/common/GlassCard';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useRequests } from '../../hooks/useRequests';
import { RequestsStackParamList } from '../../navigation/RequestsStack';
import { Colors, Layout, Spacing, Typography } from '../../theme';

type Rt = RouteProp<RequestsStackParamList, 'RequestDetails'>;

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.RequestDetailsScreenRow}>
      <Text style={styles.RequestDetailsScreenRowLabel}>{label}</Text>
      <Text style={styles.RequestDetailsScreenRowValue}>{value}</Text>
    </View>
  );
}

export function RequestDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<Rt>();
  const insets = useSafeAreaInsets();
  const { getRequestById, cancelRequest } = useRequests();
  const request = getRequestById(route.params.requestId);

  if (!request) {
    return null;
  }

  const handleCancel = () => {
    Alert.alert('Cancel Request?', 'This will mark the request as cancelled.', [
      { text: 'Keep Request', style: 'cancel' },
      {
        text: 'Cancel Request',
        style: 'destructive',
        onPress: () => {
          cancelRequest(request.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.RequestDetailsScreenRoot}
      contentContainerStyle={[
        styles.RequestDetailsScreenContent,
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
        style={styles.RequestDetailsScreenBack}
      >
        <Text style={styles.RequestDetailsScreenBackText}>‹ Back</Text>
      </AnimatedPressable>

      <Animated.View entering={FadeInUp.duration(400)}>
        <Text style={styles.RequestDetailsScreenTitle}>Request Details</Text>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(100)}
        style={styles.RequestDetailsScreenSection}
      >
        <GlassCard>
          <View style={styles.RequestDetailsScreenStatusRow}>
            <StatusBadge status={request.status} />
          </View>
          <DetailRow
            label="Category"
            value={`${request.emoji}  ${request.categoryTitle}`}
          />
          <View style={styles.RequestDetailsScreenDivider} />
          <DetailRow label="Description" value={request.description} />
          <View style={styles.RequestDetailsScreenDivider} />
          <DetailRow label="Priority" value={request.priority} />
          <View style={styles.RequestDetailsScreenDivider} />
          <DetailRow label="Assigned Department" value={request.department} />
          <View style={styles.RequestDetailsScreenDivider} />
          <DetailRow
            label="Estimated Arrival"
            value={request.estimatedArrival}
          />
          <View style={styles.RequestDetailsScreenDivider} />
          <DetailRow label="Request Number" value={request.id} />
          <View style={styles.RequestDetailsScreenDivider} />
          <DetailRow label="Creation Time" value={request.createdAt} />
          <View style={styles.RequestDetailsScreenDivider} />
          <DetailRow label="Last Updated" value={request.updatedAt} />
          {request.notes ? (
            <>
              <View style={styles.RequestDetailsScreenDivider} />
              <DetailRow label="Additional Notes" value={request.notes} />
            </>
          ) : null}
        </GlassCard>
      </Animated.View>

      {request.status !== 'Completed' && request.status !== 'Cancelled' ? (
        <Animated.View
          entering={FadeInUp.duration(400).delay(200)}
          style={styles.RequestDetailsScreenSection}
        >
          <SecondaryButton
            title="Cancel Request"
            onPress={handleCancel}
            icon="✕"
          />
        </Animated.View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  RequestDetailsScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  RequestDetailsScreenContent: {
    paddingHorizontal: Layout.screenPadding,
  },
  RequestDetailsScreenBack: {
    marginBottom: Spacing.lg,
    alignSelf: 'flex-start',
  },

  RequestDetailsScreenBackText: {
    ...Typography.body,
    color: Colors.gold,
  },
  RequestDetailsScreenTitle: {
    ...Typography.largeTitle,
    fontSize: 28,
  },

  RequestDetailsScreenSection: {
    marginTop: Layout.cardGap,
    marginBottom: 80,
  },
  RequestDetailsScreenStatusRow: {
    marginBottom: Spacing.lg,
  },
  RequestDetailsScreenRow: {
    paddingVertical: Spacing.sm,
  },
  RequestDetailsScreenRowLabel: {
    ...Typography.smallLabel,
    marginBottom: 2,
  },
  RequestDetailsScreenRowValue: {
    ...Typography.body,
    fontWeight: '600',
  },

  RequestDetailsScreenDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },
});
