import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { EmojiIcon } from '../components/common/EmojiIcon';
import { Colors, Typography } from '../theme';
import { ChatStack } from './ChatStack';
import { ClimateStack } from './ClimateStack';
import { DiningStack } from './DiningStack';
import { HomeStack } from './HomeStack';
import { RequestsStack } from './RequestsStack';

export type TabParamList = {
  HomeTab: undefined;
  RequestsTab: undefined;
  ClimateTab: undefined;
  DiningTab: undefined;
  ChatTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TABS: Array<{
  name: keyof TabParamList;
  emoji: string;
  label: string;
  component: React.ComponentType;
}> = [
  { name: 'HomeTab', emoji: '🏠', label: 'Home', component: HomeStack },
  {
    name: 'RequestsTab',
    emoji: '🛎️',
    label: 'Requests',
    component: RequestsStack,
  },
  {
    name: 'ClimateTab',
    emoji: '❄️',
    label: 'Climate',
    component: ClimateStack,
  },
  { name: 'DiningTab', emoji: '🍽️', label: 'Dining', component: DiningStack },
  { name: 'ChatTab', emoji: '💬', label: 'Chat', component: ChatStack },
];

function TabBarLabel({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text
      style={[
        styles.tabLabel,
        { color: focused ? Colors.gold : Colors.textSecondary },
      ]}
    >
      {label}
    </Text>
  );
}

function TabBarIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return <EmojiIcon emoji={emoji} active={focused} size={20} />;
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.backgroundSecondary,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: 'absolute',
          height: 88,
          paddingTop: 10,
        },
      }}
    >
      {TABS.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon emoji={tab.emoji} focused={focused} />
            ),
            tabBarLabel: ({ focused }) => (
              <TabBarLabel label={tab.label} focused={focused} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    ...Typography.smallLabel,
    fontWeight: '600',
    marginTop: 5,
  },
});
