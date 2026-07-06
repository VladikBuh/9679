import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GlassCard } from '../../components/common/GlassCard';
import { SectionHeader } from '../../components/common/SectionHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Colors, Spacing, Typography } from '../../theme';
import { Guest } from '../../types';

interface Row {
  icon: string;
  label: string;
  value: string;
  badge?: boolean;
}

function InfoRow({ icon, label, value, badge }: Row) {
  return (
    <View style={styles.GuestInfoCardRow}>
      <View style={styles.GuestInfoCardIconLabel}>
        <Text style={styles.GuestInfoCardIcon}>{icon}</Text>
        <Text style={styles.GuestInfoCardLabel}>{label}</Text>
      </View>
      {badge ? (
        <StatusBadge status={value} small />
      ) : (
        <Text style={styles.GuestInfoCardValue}>{value}</Text>
      )}
    </View>
  );
}

export function GuestInfoCard({ guest }: { guest: Guest }) {
  const rows: Row[] = [
    { icon: '🧑', label: 'Guest Name', value: guest.name },
    { icon: '🏨', label: 'Hotel', value: guest.hotel },
    { icon: '🛏️', label: 'Room Type', value: guest.roomType },
    { icon: '👥', label: 'Guests', value: guest.guests },
    { icon: '🏢', label: 'Floor', value: guest.floor },
    { icon: '✅', label: 'Room Status', value: guest.roomStatus, badge: true },
    { icon: '📶', label: 'Wi-Fi', value: guest.wifi },
    { icon: '🥐', label: 'Breakfast', value: guest.breakfast },
    { icon: '🚗', label: 'Parking', value: guest.parking },
    { icon: '🕐', label: 'Late Checkout', value: guest.lateCheckout },
  ];

  return (
    <GlassCard>
      <SectionHeader title="Guest Information" />
      {rows.map((row, index) => (
        <View key={row.label}>
          <InfoRow {...row} />
          {index < rows.length - 1 ? (
            <View style={styles.GuestInfoCardDivider} />
          ) : null}
        </View>
      ))}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  GuestInfoCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  GuestInfoCardIconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  GuestInfoCardIcon: {
    fontSize: 16,
    marginRight: Spacing.md,
  },
  GuestInfoCardLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },

  GuestInfoCardValue: {
    ...Typography.body,
    fontWeight: '600',
  },
  GuestInfoCardDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },
});
