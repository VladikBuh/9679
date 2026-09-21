import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  emoji: string;
  active?: boolean;
  size?: number;
}

export function EmojiIcon({ emoji, active, size = 22 }: Props) {
  if (!active) {
    return <Text style={[styles.EmojiIconInactive, { fontSize: size }]}>{emoji}</Text>;
  }

  const badgeWidth = size + 28;
  const badgeHeight = size + 12;

  return (
    <View
      style={[
        styles.EmojiIconActiveBadge,
        {
          width: badgeWidth,
          height: badgeHeight,
          borderRadius: badgeHeight / 2,
        },
      ]}
    >
      <Text style={{ fontSize: size }}>{emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  EmojiIconInactive: {
    opacity: 0.45,
  },
  EmojiIconActiveBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(214,177,90,0.16)',
  },
});
