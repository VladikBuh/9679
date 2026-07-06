import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CartScreen } from '../screens/dining/CartScreen';
import { DiningScreen } from '../screens/dining/DiningScreen';
import { FavoritesScreen } from '../screens/dining/FavoritesScreen';
import { FoodDetailScreen } from '../screens/dining/FoodDetailScreen';
import { FoodListScreen } from '../screens/dining/FoodListScreen';
import { OrderConfirmScreen } from '../screens/dining/OrderConfirmScreen';

export type DiningStackParamList = {
  DiningHome: undefined;
  FoodList: { categoryId: string };
  FoodDetail: { dishId: string };
  Cart: undefined;
  OrderConfirm: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<DiningStackParamList>();

export function DiningStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DiningHome" component={DiningScreen} />
      <Stack.Screen name="FoodList" component={FoodListScreen} />
      <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="OrderConfirm" component={OrderConfirmScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}
