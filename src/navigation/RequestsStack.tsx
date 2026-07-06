import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RequestCreateScreen } from '../screens/requests/RequestCreateScreen';
import { RequestDetailsScreen } from '../screens/requests/RequestDetailsScreen';
import { RequestSubmittedScreen } from '../screens/requests/RequestSubmittedScreen';
import { RequestTrackingScreen } from '../screens/requests/RequestTrackingScreen';
import { RequestsScreen } from '../screens/requests/RequestsScreen';

export type RequestsStackParamList = {
  RequestsList: undefined;
  RequestCreate: { categoryId: string };
  RequestSubmitted: { requestId: string };
  RequestTracking: { requestId: string };
  RequestDetails: { requestId: string };
};

const Stack = createNativeStackNavigator<RequestsStackParamList>();

export function RequestsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RequestsList" component={RequestsScreen} />
      <Stack.Screen name="RequestCreate" component={RequestCreateScreen} />
      <Stack.Screen name="RequestSubmitted" component={RequestSubmittedScreen} />
      <Stack.Screen name="RequestTracking" component={RequestTrackingScreen} />
      <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} />
    </Stack.Navigator>
  );
}
