import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../../theme';

interface Props {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  badge?: string;
  height?: number;
}

export function HeroBanner({
  image,
  title,
  subtitle,
  badge,
  height = 240,
}: Props) {
  return (
    <View style={[styles.HeroBannerContainer, { height }]}>
      <Image
        source={image}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <View style={styles.HeroBannerOverlay} />
      <View style={styles.HeroBannerContent}>
        <Text style={styles.HeroBannerTitle}>{title}</Text>
        <Text style={styles.HeroBannerSubtitle}>{subtitle}</Text>
      </View>
      {badge ? (
        <View style={styles.HeroBannerBadge}>
          <Text style={styles.HeroBannerBadgeText}>{badge}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  HeroBannerContainer: {
    borderRadius: Radius.card,
    overflow: 'hidden',
    backgroundColor: Colors.card,
  },

  HeroBannerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.background,
    opacity: 0.45,
  },
  HeroBannerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Spacing.xl,
  },
  HeroBannerTitle: {
    ...Typography.largeTitle,
    fontSize: 26,
    marginBottom: Spacing.xs,
  },

  HeroBannerSubtitle: {
    ...Typography.body,
    color: 'rgba(255,255,255,0.85)',
  },
  HeroBannerBadge: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.lg,
    backgroundColor: Colors.gold,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
  },

  HeroBannerBadgeText: {
    ...Typography.smallLabel,
    color: Colors.background,
    fontWeight: '700',
  },
});
