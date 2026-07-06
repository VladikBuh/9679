import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ClimateScreen } from '../screens/climate/ClimateScreen';

export type ClimateStackParamList = {
  Climate: undefined;
};

const Stack = createNativeStackNavigator<ClimateStackParamList>();

export function ClimateStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Climate" component={ClimateScreen} />
    </Stack.Navigator>
  );
}
