import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import QRCode from 'react-native-qrcode-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { guest } from '../../data/guest';
import { Colors, Spacing, Typography } from '../../theme';

export function ExpandedQRScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [brightnessBoosted, setBrightnessBoosted] = useState(false);

  return (
    <View
      style={[
        styles.ExpandedQRScreenRoot,
        brightnessBoosted && styles.ExpandedQRScreenRootBoosted,
      ]}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.ExpandedQRScreenContent,
            {
              paddingTop: insets.top + Spacing.xxl,
              paddingBottom: insets.bottom + Spacing.xxl,
            },
          ]}
        >
          <Animated.View
            entering={ZoomIn.duration(500).springify()}
            style={styles.ExpandedQRScreenQRWrap}
          >
            <QRCode
              value={`WINDSOR-GUEST:${guest.cardNumber}`}
              size={260}
              color={Colors.background}
              backgroundColor="#FFFFFF"
            />
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(500).delay(200)}
            style={styles.ExpandedQRScreenInfo}
          >
            <Text style={styles.ExpandedQRScreenGuestName}>{guest.name}</Text>
            <Text style={styles.ExpandedQRScreenRoom}>Room {guest.room}</Text>
            <Text style={styles.ExpandedQRScreenHotel}>{guest.hotel}</Text>
          </Animated.View>

          <View style={styles.ExpandedQRScreenButtons}>
            <PrimaryButton
              title={
                brightnessBoosted ? 'Restore Brightness' : 'Increase Brightness'
              }
              icon={brightnessBoosted ? '🔅' : '🔆'}
              onPress={() => setBrightnessBoosted(v => !v)}
              style={styles.ExpandedQRScreenButtonSpacing}
            />
            <SecondaryButton title="Done" onPress={() => navigation.goBack()} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ExpandedQRScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  ExpandedQRScreenRootBoosted: {
    backgroundColor: '#2E2E2E',
  },

  ExpandedQRScreenContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
  },

  ExpandedQRScreenQRWrap: {
    padding: Spacing.xl,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    marginBottom: Spacing.xxl,
  },
  ExpandedQRScreenInfo: {
    alignItems: 'center',
    marginBottom: Spacing.huge,
  },
  ExpandedQRScreenGuestName: {
    ...Typography.largeTitle,
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  ExpandedQRScreenRoom: {
    ...Typography.body,
    color: Colors.gold,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  ExpandedQRScreenHotel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  ExpandedQRScreenButtons: {
    width: '100%',
  },

  ExpandedQRScreenButtonSpacing: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
});
