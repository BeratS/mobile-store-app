import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { AppBar } from '@/components/ui/app-bar';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useUniwind } from 'uniwind';

export default function TabLayout() {
  const { theme } = useUniwind();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: Colors[theme].tabBarBackground,
          borderTopColor: Colors[theme].tabBarBorder,
          height: 65,
          paddingBottom: 10,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="house.fill" color={color} />,
          header: () => <AppBar title="Endava - Smart App" />
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Store',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="bag.fill" color={color} />,
          header: () => <AppBar title="Endava - Store" />
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: 'AI Copilot',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="bubble.left.and.bubble.right.fill" color={color} />,
          header: () => <AppBar title="Endava - AI Copilot" />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Digital ID',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="person.badge.key.fill" color={color} />,
          header: () => <AppBar title="Endava - Digital ID" />
        }}
      />
    </Tabs>
  );
}
