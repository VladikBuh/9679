import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../../theme';
import { ImageBottomScrim } from './ImageBottomScrim';

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
        style={[StyleSheet.absoluteFill, { width: '100%' }]}
        resizeMode="cover"
      />
      <ImageBottomScrim height="75%" />
      <View style={styles.HeroBannerContent} pointerEvents="box-none">
        <Text style={styles.HeroBannerTitle}>{title}</Text>
        <View style={styles.HeroBannerFooter}>
          <Text
            style={[
              styles.HeroBannerSubtitle,
              badge ? styles.HeroBannerSubtitleWithBadge : null,
            ]}
          >
            {subtitle}
          </Text>
          {badge ? (
            <View style={styles.HeroBannerBadge}>
              <Text style={styles.HeroBannerBadgeText}>{badge}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeroBannerContainer: {
    borderRadius: Radius.card,
    overflow: 'hidden',
    backgroundColor: Colors.card,
  },
  HeroBannerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Spacing.xl,
    zIndex: 2,
  },
  HeroBannerTitle: {
    ...Typography.largeTitle,
    fontSize: 26,
    marginBottom: Spacing.xs,
  },
  HeroBannerFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  HeroBannerSubtitle: {
    ...Typography.body,
    color: 'rgba(255,255,255,0.85)',
    flex: 1,
  },
  HeroBannerSubtitleWithBadge: {
    marginRight: Spacing.sm,
  },
  HeroBannerBadge: {
    backgroundColor: Colors.gold,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    flexShrink: 0,
  },

  HeroBannerBadgeText: {
    ...Typography.smallLabel,
    color: Colors.background,
    fontWeight: '700',
  },
});
