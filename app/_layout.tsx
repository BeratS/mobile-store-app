import { ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import 'react-native-reanimated';

import "../global.css";

import IconSymbol from '@/components/ui/icon-symbol';
import { getAppTheme } from '@/constants/theme';
import { AuthProvider, useAuth } from '@/contexts/auth.context';
import { useEffect, useState } from 'react';
import { useUniwind } from 'uniwind';

// 1. Import your AuthProvider and useAuth hook

export const unstable_settings = {
  anchor: '(tabs)',
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// --- Outer Wrapper Component ---
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

// --- Inner Layout & Navigation Guard ---
function RootLayoutNav() {
  const { theme } = useUniwind();
  const router = useRouter();
  const segments = useSegments();
  
  // Get authentication state from React Context
  const { user, isLoading: isAuthLoading } = useAuth();
  const [loaded, setLoaded] = useState(false);

  // Handle initial Splash Screen Loading
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000); // Simulate a 1-second loading time

    return () => clearTimeout(timer);
  }, [loaded]);

  // 2. Authentication Guard Redirect Logic
  useEffect(() => {
    if (!loaded || isAuthLoading) return;

    // Check if the user is currently on an authentication route (e.g., in the (auth) group)
    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Redirect to Login if not signed in
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Redirect to Home tabs if signed in and trying to access login
      router.replace('/(tabs)');
    }
  }, [user, isAuthLoading, loaded, segments]);

  // Show a clean dark fallback loading state if resources or auth check are active
  if (!loaded || isAuthLoading) {
    return (
      <View className="flex-1 bg-slate-950 items-center justify-center">
        <ActivityIndicator size="large" color="#ff5640" />
      </View>
    );
  }

  return (
    <ThemeProvider value={getAppTheme(theme)}>
      <Stack>
        {/* Auth Group screens (Login/Signup) */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        {/* Main Application Screens */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="nfc-simulate" options={{ headerShown: false }} />
        
        <Stack.Screen name="booking" options={{
          headerShown: true,
          headerTitle: 'Booking',
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <View className="flex flex-row items-center gap-2 pl-2 pr-4" >
                <IconSymbol name="arrow.left" size={24} className="text-primary" />
                <Text className='text-primary'>Home</Text>
              </View>
            </Pressable>
          ),
        }} />

        <Stack.Screen name="notifications" options={{
          headerShown: true,
          headerTitle: 'Notifications',
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <View className="flex flex-row items-center gap-2 pl-2 pr-4" >
                <IconSymbol name="arrow.left" size={24} className="text-primary" />
                <Text className='text-primary'>Home</Text>
              </View>
            </Pressable>
          ),
        }} />

        <Stack.Screen name="add-product" options={{
          headerShown: true,
          headerTitle: 'Add Product',
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <View className="flex flex-row items-center gap-2 pl-2 pr-4" >
                <IconSymbol name="arrow.left" size={24} className="text-primary" />
                <Text className='text-primary'>Home</Text>
              </View>
            </Pressable>
          ),
        }} />

        <Stack.Screen name="device-native" options={{
          headerShown: true,
          headerTitle: 'Device - Native Communication',
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <View className="flex flex-row items-center gap-2 pl-2 pr-4" >
                <IconSymbol name="arrow.left" size={24} className="text-primary" />
                <Text className='text-primary'>Home</Text>
              </View>
            </Pressable>
          ),
        }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}