import { ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import "../global.css";

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
        }} />
        <Stack.Screen name="notifications" options={{
          headerShown: true,
          headerTitle: 'Notifications',
        }} />
        <Stack.Screen name="add-product" options={{
          headerShown: true,
          headerTitle: 'Add Product',
        }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
