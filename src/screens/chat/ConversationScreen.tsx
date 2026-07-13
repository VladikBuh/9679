import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Share, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInUp,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { EmptyState } from '../../components/common/EmptyState';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { faqItems } from '../../data/faq';
import { useChat } from '../../hooks/useChat';
import { ChatStackParamList } from '../../navigation/ChatStack';
import { Colors, Layout, Radius, Spacing, Typography } from '../../theme';

type Nav = NativeStackNavigationProp<ChatStackParamList, 'Conversation'>;
type Rt = RouteProp<ChatStackParamList, 'Conversation'>;

function TypingDots() {
  return (
    <View style={styles.ConversationScreenTypingBubble}>
      <Text style={styles.ConversationScreenTypingText}>● ● ●</Text>
    </View>
  );
}

export function ConversationScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const insets = useSafeAreaInsets();
  const { activeQuestionId, messages, askQuestion, clearConversation } =
    useChat();

  const [headerHeight, setHeaderHeight] = useState(insets.top + 56);
  const headerTranslateY = useSharedValue(0);
  const headerMaxTranslate = useSharedValue(insets.top + 56);
  const lastScrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const y = Math.max(event.contentOffset.y, 0);
      if (y <= 0) {
        headerTranslateY.value = 0;
      } else {
        const diff = y - lastScrollY.value;
        headerTranslateY.value = Math.min(
          Math.max(headerTranslateY.value + diff, 0),
          headerMaxTranslate.value,
        );
      }
      lastScrollY.value = y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -headerTranslateY.value }],
  }));

  useEffect(() => {
    if (route.params.questionId !== activeQuestionId) {
      askQuestion(route.params.questionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params.questionId]);

  const isWaitingForReply =
    messages.length > 0 && messages[messages.length - 1].role === 'guest';
  const currentFaq = faqItems.find(
    f => f.id === (activeQuestionId ?? route.params.questionId),
  );

  const handleClear = () => {
    Alert.alert(
      'Clear Conversation?',
      'This will remove the current conversation history.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearConversation },
      ],
    );
  };

  const handleShare = () => {
    if (!currentFaq) return;
    Share.share({
      message: `${currentFaq.question}\n\n${currentFaq.answer}\n\n— Caesars Hub Guide`,
    });
  };

  return (
    <View style={styles.ConversationScreenRoot}>
      <Animated.View
        style={[
          styles.ConversationScreenHeader,
          headerAnimatedStyle,
          { paddingTop: insets.top + Spacing.md },
        ]}
        onLayout={e => {
          const height = e.nativeEvent.layout.height;
          setHeaderHeight(height);
          headerMaxTranslate.value = height;
        }}
      >
        <AnimatedPressable onPress={() => navigation.goBack()} haptic={false}>
          <Text style={styles.ConversationScreenBackText}>‹ Back</Text>
        </AnimatedPressable>
        <Text style={styles.ConversationScreenHeaderTitle}>
          Hotel Concierge
        </Text>
        <AnimatedPressable onPress={handleClear} haptic={false}>
          <Text style={styles.ConversationScreenTrashIcon}>🗑️</Text>
        </AnimatedPressable>
      </Animated.View>

      {messages.length === 0 ? (
        <View style={[styles.ConversationScreenContent, { paddingTop: headerHeight }]}>
          <EmptyState
            emoji="💬"
            title="No Conversation Yet"
            description="Select a frequently asked question to begin chatting with our hotel concierge."
            actionLabel="Browse Questions"
            onAction={() => navigation.navigate('ChatHome')}
          />
        </View>
      ) : (
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={[
            styles.ConversationScreenScrollContent,
            { paddingTop: headerHeight + Spacing.xl },
            { paddingBottom: insets.bottom + Spacing.xl },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(message =>
            message.role === 'guest' ? (
              <Animated.View
                key={message.id}
                entering={FadeInUp.duration(300)}
                style={styles.ConversationScreenGuestBubbleWrap}
              >
                <View style={styles.ConversationScreenGuestBubble}>
                  <Text style={styles.ConversationScreenGuestText}>
                    {message.text}
                  </Text>
                </View>
                <Text style={styles.ConversationScreenTimestamp}>
                  {message.timestamp}
                </Text>
              </Animated.View>
            ) : (
              <Animated.View
                key={message.id}
                entering={FadeInUp.duration(300)}
                style={styles.ConversationScreenConciergeBubbleWrap}
              >
                <View style={styles.ConversationScreenConciergeAvatar}>
                  <Text style={styles.ConversationScreenConciergeAvatarIcon}>
                    🎩
                  </Text>
                </View>
                <View style={styles.ConversationScreenConciergeColumn}>
                  <View style={styles.ConversationScreenConciergeBubble}>
                    <Text style={styles.ConversationScreenConciergeText}>
                      {message.text}
                    </Text>
                  </View>
                  <Text style={styles.ConversationScreenTimestamp}>
                    {message.timestamp}
                  </Text>
                </View>
              </Animated.View>
            ),
          )}

          {isWaitingForReply ? (
            <Animated.View
              entering={FadeInUp.duration(200)}
              style={styles.ConversationScreenConciergeBubbleWrap}
            >
              <View style={styles.ConversationScreenConciergeAvatar}>
                <Text style={styles.ConversationScreenConciergeAvatarIcon}>
                  🎩
                </Text>
              </View>
              <TypingDots />
            </Animated.View>
          ) : null}

          {!isWaitingForReply && messages.length > 0 ? (
            <Animated.View
              entering={FadeInUp.duration(300).delay(150)}
              style={styles.ConversationScreenActions}
            >
              <SecondaryButton
                title="Share Answer"
                icon="↗"
                onPress={handleShare}
                style={styles.ConversationScreenActionButton}
              />
              <PrimaryButton
                title="Choose Another Question"
                onPress={() => navigation.navigate('ChatHome')}
                style={styles.ConversationScreenActionButton}
              />
            </Animated.View>
          ) : null}
        </Animated.ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ConversationScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  ConversationScreenHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 10,
    backgroundColor: Colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.screenPadding,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  ConversationScreenContent: {
    flex: 1,
  },
  ConversationScreenBackText: {
    ...Typography.body,
    color: Colors.gold,
  },
  ConversationScreenHeaderTitle: {
    ...Typography.cardTitle,
    fontSize: 17,
  },
  ConversationScreenTrashIcon: {
    fontSize: 18,
  },
  ConversationScreenScrollContent: {
    paddingHorizontal: Layout.screenPadding,
    paddingTop: Spacing.xl,
  },
  ConversationScreenGuestBubbleWrap: {
    alignItems: 'flex-end',
    marginBottom: Spacing.lg,
  },
  ConversationScreenGuestBubble: {
    maxWidth: '80%',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderBottomRightRadius: 4,
    padding: Spacing.lg,
  },
  ConversationScreenGuestText: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  ConversationScreenConciergeBubbleWrap: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    alignItems: 'flex-start',
  },
  ConversationScreenConciergeAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  ConversationScreenConciergeAvatarIcon: {
    fontSize: 16,
  },
  ConversationScreenConciergeColumn: {
    flex: 1,
    maxWidth: '80%',
  },
  ConversationScreenConciergeBubble: {
    backgroundColor: 'rgba(214,177,90,0.14)',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    borderBottomLeftRadius: 4,
    padding: Spacing.lg,
  },
  ConversationScreenConciergeText: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  ConversationScreenTimestamp: {
    ...Typography.smallLabel,
    marginTop: Spacing.xs,
  },
  ConversationScreenTypingBubble: {
    backgroundColor: 'rgba(214,177,90,0.14)',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    borderBottomLeftRadius: 4,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },

  ConversationScreenTypingText: {
    ...Typography.body,
    color: Colors.gold,
    letterSpacing: 2,
  },
  ConversationScreenActions: {
    marginTop: Spacing.lg,
    marginBottom: 50,
  },

  ConversationScreenActionButton: {
    width: '100%',
    marginBottom: Spacing.md,
  },
});
