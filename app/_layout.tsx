import { ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import 'react-native-reanimated';

import "../global.css";

import { IconSymbol } from '@/components/ui/icon-symbol';
import { getAppTheme } from '@/constants/theme';
import { useEffect, useState } from 'react';
import { useUniwind } from 'uniwind';

export const unstable_settings = {
  anchor: '(tabs)',
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { theme } = useUniwind();
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    setTimeout(() => {
      setLoaded(true);
    }, 1000); // Simulate a 1-second loading time
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={getAppTheme(theme)}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="nfc-simulate" options={{
          headerShown: false,
        }} />
        <Stack.Screen name="booking" options={{
          headerShown: true,
          headerTitle: 'Booking',
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <View className="flex flex-row items-center gap-2 pl-2 pr-4" >
                <IconSymbol name="arrow.left" size={24} />
                <Text className='text-primary'>Home</Text>
              </View>
            </Pressable>
          ),
        }} />
        <Stack.Screen name="notifications" options={{
          headerShown: true,
          headerTitle: 'Notifications',
        }} />
        <Stack.Screen name="add-product" options={{
          headerShown: true,
          headerTitle: 'Add Product',
        }} />
        <Stack.Screen name="device-native" options={{
          headerShown: true,
          headerTitle: 'Device - Native Communication',
        }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
