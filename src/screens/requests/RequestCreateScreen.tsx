import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { Chip } from '../../components/common/Chip';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { requestCategories } from '../../data/requests';
import { useRequests } from '../../hooks/useRequests';
import { RequestsStackParamList } from '../../navigation/RequestsStack';
import { Colors, Layout, Radius, Spacing, Typography } from '../../theme';
import { RequestDeliveryTime, RequestPriority } from '../../types';

type Nav = NativeStackNavigationProp<RequestsStackParamList, 'RequestCreate'>;
type Rt = RouteProp<RequestsStackParamList, 'RequestCreate'>;

const PRIORITIES: RequestPriority[] = ['Standard', 'Urgent', 'Scheduled'];
const DELIVERY_TIMES: RequestDeliveryTime[] = [
  'ASAP',
  '30 Minutes',
  '1 Hour',
  'Custom Time',
];
const CUSTOM_TIME_SLOTS = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
];
const MAX_LENGTH = 500;
const MAX_NOTES_LENGTH = 250;

export function RequestCreateScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const insets = useSafeAreaInsets();
  const { submitRequest } = useRequests();

  const category =
    requestCategories.find(c => c.id === route.params.categoryId) ??
    requestCategories[0];

  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<RequestPriority>('Standard');
  const [deliveryTime, setDeliveryTime] = useState<RequestDeliveryTime>('ASAP');
  const [customTime, setCustomTime] = useState(CUSTOM_TIME_SLOTS[0]);
  const [notes, setNotes] = useState('');

  const canSubmit = description.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const request = submitRequest(
      category,
      description.trim(),
      priority,
      deliveryTime,
      deliveryTime === 'Custom Time' ? customTime : undefined,
      notes.trim() || undefined,
    );
    navigation.replace('RequestSubmitted', { requestId: request.id });
  };

  return (
    <KeyboardAvoidingView
      style={styles.RequestCreateScreenRoot}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.RequestCreateScreenContent,
          {
            paddingTop: insets.top + Spacing.lg,
            paddingBottom: insets.bottom + 140,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <AnimatedPressable
          onPress={() => navigation.goBack()}
          haptic={false}
          style={styles.RequestCreateScreenBack}
        >
          <Text style={styles.RequestCreateScreenBackText}>‹ Back</Text>
        </AnimatedPressable>

        <Animated.View entering={FadeInUp.duration(400)}>
          <Text style={styles.RequestCreateScreenTitle}>{category.title}</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(400).delay(60)}
          style={styles.RequestCreateScreenIllustration}
        >
          <Text style={styles.RequestCreateScreenIllustrationEmoji}>
            {category.emoji}
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(400).delay(120)}
          style={styles.RequestCreateScreenSection}
        >
          <Text style={styles.RequestCreateScreenLabel}>
            Describe your request
          </Text>
          <View style={styles.RequestCreateScreenTextAreaWrap}>
            <TextInput
              value={description}
              onChangeText={text => setDescription(text.slice(0, MAX_LENGTH))}
              placeholder="Describe your request..."
              placeholderTextColor={Colors.textSecondary}
              style={styles.RequestCreateScreenTextArea}
              multiline
              maxLength={MAX_LENGTH}
              textAlignVertical="top"
            />
          </View>
          <Text style={styles.RequestCreateScreenCounter}>
            {description.length}/{MAX_LENGTH}
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(400).delay(180)}
          style={styles.RequestCreateScreenSection}
        >
          <Text style={styles.RequestCreateScreenLabel}>Priority</Text>
          <View style={styles.RequestCreateScreenChipRow}>
            {PRIORITIES.map(p => (
              <Chip
                key={p}
                label={p}
                selected={priority === p}
                onPress={() => setPriority(p)}
                style={styles.RequestCreateScreenChip}
              />
            ))}
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(400).delay(240)}
          style={styles.RequestCreateScreenSection}
        >
          <Text style={styles.RequestCreateScreenLabel}>
            Preferred Delivery Time
          </Text>
          <View style={styles.RequestCreateScreenSegmentedControl}>
            {DELIVERY_TIMES.map(time => (
              <AnimatedPressable
                key={time}
                onPress={() => setDeliveryTime(time)}
                style={[
                  styles.RequestCreateScreenSegment,
                  deliveryTime === time &&
                    styles.RequestCreateScreenSegmentActive,
                ]}
              >
                <Text
                  style={[
                    styles.RequestCreateScreenSegmentText,
                    deliveryTime === time &&
                      styles.RequestCreateScreenSegmentTextActive,
                  ]}
                  numberOfLines={1}
                >
                  {time}
                </Text>
              </AnimatedPressable>
            ))}
          </View>

          {deliveryTime === 'Custom Time' ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.RequestCreateScreenTimeSlotRow}
            >
              {CUSTOM_TIME_SLOTS.map(slot => (
                <Chip
                  key={slot}
                  label={slot}
                  selected={customTime === slot}
                  onPress={() => setCustomTime(slot)}
                  style={styles.RequestCreateScreenTimeSlotChip}
                />
              ))}
            </ScrollView>
          ) : null}
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(400).delay(300)}
          style={styles.RequestCreateScreenSection}
        >
          <Text style={styles.RequestCreateScreenLabel}>
            Additional Notes (optional)
          </Text>
          <View style={styles.RequestCreateScreenNotesWrap}>
            <TextInput
              value={notes}
              onChangeText={text => setNotes(text.slice(0, MAX_NOTES_LENGTH))}
              placeholder="Anything else our team should know?"
              placeholderTextColor={Colors.textSecondary}
              style={styles.RequestCreateScreenNotes}
              multiline
              maxLength={MAX_NOTES_LENGTH}
              textAlignVertical="top"
            />
          </View>
        </Animated.View>
        <View
          style={[
            styles.RequestCreateScreenFooter,
            { paddingBottom: insets.bottom + Spacing.lg },
          ]}
        >
          <PrimaryButton
            title="Submit Request"
            onPress={handleSubmit}
            disabled={!canSubmit}
            style={styles.RequestCreateScreenSubmitButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  RequestCreateScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  RequestCreateScreenContent: {
    paddingHorizontal: Layout.screenPadding,
  },
  RequestCreateScreenBack: {
    marginBottom: Spacing.lg,
    alignSelf: 'flex-start',
  },

  RequestCreateScreenBackText: {
    ...Typography.body,
    color: Colors.gold,
  },
  RequestCreateScreenTitle: {
    ...Typography.largeTitle,
    fontSize: 28,
    marginBottom: Spacing.xl,
  },
  RequestCreateScreenIllustration: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.cardGap,
  },
  RequestCreateScreenIllustrationEmoji: {
    fontSize: 56,
  },
  RequestCreateScreenSection: {
    marginBottom: Layout.cardGap,
  },

  RequestCreateScreenLabel: {
    ...Typography.smallLabel,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  RequestCreateScreenTextAreaWrap: {
    minHeight: 180,
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
  },
  RequestCreateScreenTextArea: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },

  RequestCreateScreenCounter: {
    ...Typography.smallLabel,
    textAlign: 'right',
    marginTop: Spacing.sm,
  },
  RequestCreateScreenChipRow: {
    flexDirection: 'row',
  },
  RequestCreateScreenChip: {
    marginRight: Spacing.md,
  },
  RequestCreateScreenSegmentedControl: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 4,
  },

  RequestCreateScreenSegment: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  RequestCreateScreenSegmentActive: {
    backgroundColor: Colors.gold,
  },
  RequestCreateScreenSegmentText: {
    ...Typography.smallLabel,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  RequestCreateScreenSegmentTextActive: {
    color: Colors.background,
  },
  RequestCreateScreenTimeSlotRow: {
    marginTop: Spacing.md,
  },
  RequestCreateScreenTimeSlotChip: {
    marginRight: Spacing.sm,
  },
  RequestCreateScreenNotesWrap: {
    minHeight: 90,
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
  },
  RequestCreateScreenNotes: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },
  RequestCreateScreenFooter: {
    paddingTop: Spacing.lg,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  RequestCreateScreenSubmitButton: {
    width: '100%',
    height: 60,
    borderRadius: Radius.lg,
  },
});
