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
  return (
    <View style={[styles.EmojiIconActiveBadge, { width: size + 20, height: size + 20, borderRadius: (size + 20) / 2 }]}>
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
