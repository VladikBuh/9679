import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ExpandedQRScreen } from '../screens/home/ExpandedQRScreen';
import { HomeScreen } from '../screens/home/HomeScreen';

export type HomeStackParamList = {
  Home: undefined;
  ExpandedQR: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ExpandedQR" component={ExpandedQRScreen} options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
    </Stack.Navigator>
  );
}
