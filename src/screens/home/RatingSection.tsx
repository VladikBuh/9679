import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { GlassCard } from '../../components/common/GlassCard';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { Colors, Radius, Spacing, Typography } from '../../theme';

const MAX_LENGTH = 500;

function Star({ filled, onPress }: { filled: boolean; onPress: () => void }) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={() => {
        scale.value = withSpring(1.3, { damping: 6 }, () => {
          scale.value = withSpring(1);
        });
        onPress();
      }}
      style={styles.RatingSectionStarTouch}
    >
      <Animated.Text
        style={[
          styles.RatingSectionStar,
          animatedStyle,
          filled && styles.RatingSectionStarFilled,
        ]}
      >
        {filled ? '★' : '☆'}
      </Animated.Text>
    </AnimatedPressable>
  );
}

export function RatingSection() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setRating(0);
    setComment('');
  };

  return (
    <GlassCard>
      <Text style={styles.RatingSectionTitle}>Rate Your Stay</Text>
      <Text style={styles.RatingSectionSubtitle}>
        Help us improve your guest experience.
      </Text>

      <View style={styles.RatingSectionStarsRow}>
        {[1, 2, 3, 4, 5].map(i => (
          <Star key={i} filled={i <= rating} onPress={() => setRating(i)} />
        ))}
      </View>

      {!submitted ? (
        <>
          <View style={styles.RatingSectionInputWrap}>
            <TextInput
              value={comment}
              onChangeText={text => setComment(text.slice(0, MAX_LENGTH))}
              placeholder="Share your experience..."
              placeholderTextColor={Colors.textSecondary}
              style={styles.RatingSectionInput}
              multiline
              maxLength={MAX_LENGTH}
              textAlignVertical="top"
            />
            <Text style={styles.RatingSectionCounter}>
              {comment.length}/{MAX_LENGTH}
            </Text>
          </View>
          <PrimaryButton
            title="Submit Review"
            onPress={handleSubmit}
            disabled={rating === 0}
            style={styles.RatingSectionSubmitButton}
          />
        </>
      ) : (
        <Animated.View
          entering={FadeIn.duration(400)}
          style={styles.RatingSectionSuccessCard}
        >
          <Text style={styles.RatingSectionSuccessCheck}>✅</Text>
          <Text style={styles.RatingSectionSuccessTitle}>Review Submitted</Text>
          <Text style={styles.RatingSectionSuccessSubtitle}>
            Thank you for sharing your experience.
          </Text>
          <AnimatedPressable onPress={handleReset}>
            <Text style={styles.RatingSectionSuccessReset}>Rate again</Text>
          </AnimatedPressable>
        </Animated.View>
      )}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  RatingSectionTitle: {
    ...Typography.sectionTitle,
    marginBottom: Spacing.xs,
  },
  RatingSectionSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  RatingSectionStarsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },

  RatingSectionStarTouch: {
    padding: Spacing.sm,
  },
  RatingSectionStar: {
    fontSize: 40,
    color: Colors.textSecondary,
  },
  RatingSectionStarFilled: {
    color: Colors.gold,
  },
  RatingSectionInputWrap: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },

  RatingSectionInput: {
    ...Typography.body,
    minHeight: 100,
    color: Colors.textPrimary,
  },
  RatingSectionCounter: {
    ...Typography.smallLabel,
    textAlign: 'right',
    marginTop: Spacing.sm,
  },
  RatingSectionSubmitButton: {
    width: '100%',
  },
  RatingSectionSuccessCard: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  RatingSectionSuccessCheck: {
    fontSize: 40,
    marginBottom: Spacing.md,
  },
  RatingSectionSuccessTitle: {
    ...Typography.cardTitle,
    color: Colors.success,
    marginBottom: Spacing.xs,
  },
  RatingSectionSuccessSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },

  RatingSectionSuccessReset: {
    ...Typography.body,
    color: Colors.gold,
    fontWeight: '600',
  },
});
