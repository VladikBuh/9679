import React, { useId } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

interface Props {
  height?: `${number}%` | number;
  style?: ViewStyle;
}

export function ImageBottomScrim({ height = '55%', style }: Props) {
  const gradientId = `scrim-${useId().replace(/:/g, '')}`;

  return (
    <View
      pointerEvents="none"
      style={[styles.ImageBottomScrimRoot, { height }, style]}
    >
      <Svg width="100%" height="100%" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#000000" stopOpacity="0" />
            <Stop offset="0.55" stopColor="#000000" stopOpacity="0.35" />
            <Stop offset="1" stopColor="#000000" stopOpacity="0.75" />
          </LinearGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#${gradientId})`}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  ImageBottomScrimRoot: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
