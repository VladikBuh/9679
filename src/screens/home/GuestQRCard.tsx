import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { AnimatedPressable } from '../../components/common/AnimatedPressable';
import { GlassCard } from '../../components/common/GlassCard';
import { Colors, Radius, Spacing, Typography } from '../../theme';
import { Guest } from '../../types';

interface Props {
  guest: Guest;
  onPress: () => void;
}

function InfoColumn({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.GuestQRCardInfoColumn}>
      <Text style={styles.GuestQRCardInfoLabel}>{label}</Text>
      <Text style={styles.GuestQRCardInfoValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

export function GuestQRCard({ guest, onPress }: Props) {
  return (
    <AnimatedPressable onPress={onPress} scaleTo={0.98}>
      <GlassCard style={styles.GuestQRCardSurface}>
        <View style={styles.GuestQRCardCornerTopLeft} />
        <View style={styles.GuestQRCardCornerBottomRight} />

        <View style={styles.GuestQRCardHeaderRow}>
          <Text style={styles.GuestQRCardHeaderIcon}>👑</Text>
          <Text style={styles.GuestQRCardHeaderText}>Digital Guest Pass</Text>
        </View>

        <View style={styles.GuestQRCardBody}>
          <View style={styles.GuestQRCardQRWrap}>
            <QRCode
              value={`WINDSOR-GUEST:${guest.cardNumber}`}
              size={104}
              color={Colors.background}
              backgroundColor="#FFFFFF"
            />
          </View>
          <View style={styles.GuestQRCardFields}>
            <InfoColumn label="Guest Name" value={guest.name} />
            <InfoColumn label="Room Number" value={guest.room} />
            <InfoColumn label="Hotel" value={guest.hotel} />
          </View>
        </View>

        <View style={styles.GuestQRCardDivider} />

        <View style={styles.GuestQRCardFooterRow}>
          <InfoColumn label="Check-In" value={guest.checkIn} />
          <InfoColumn label="Check-Out" value={guest.checkOut} />
          <InfoColumn label="Card Number" value={guest.cardNumber} />
        </View>
      </GlassCard>
    </AnimatedPressable>
  );
}

const CORNER_SIZE = 22;

const styles = StyleSheet.create({
  GuestQRCardSurface: {
    overflow: 'hidden',
  },
  GuestQRCardCornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: Colors.gold,
    borderTopLeftRadius: Radius.card,
  },

  GuestQRCardCornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: Colors.gold,
    borderBottomRightRadius: Radius.card,
  },
  GuestQRCardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },

  GuestQRCardHeaderIcon: {
    fontSize: 18,
    marginRight: Spacing.sm,
  },
  GuestQRCardHeaderText: {
    ...Typography.smallLabel,
    color: Colors.gold,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  GuestQRCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  GuestQRCardQRWrap: {
    width: 120,
    height: 120,
    borderRadius: Radius.sm,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },
  GuestQRCardFields: {
    flex: 1,
    justifyContent: 'space-between',
    height: 100,
  },
  GuestQRCardInfoColumn: {
    marginBottom: Spacing.sm,
  },
  GuestQRCardInfoLabel: {
    ...Typography.smallLabel,
  },
  GuestQRCardInfoValue: {
    ...Typography.body,
    fontWeight: '600',
    marginTop: 2,
  },
  GuestQRCardDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xl,
  },
  GuestQRCardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
