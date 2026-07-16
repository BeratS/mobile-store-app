import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Uniwind, useUniwind } from 'uniwind';

interface AppBarProps {
  title: string;
  showThemeToggle?: boolean;
}

export function AppBar({ title, showThemeToggle = true }: AppBarProps) {
  const { theme } = useUniwind();
  const router = useRouter();

  const insets = useSafeAreaInsets(); // Keeps the bar safely below the notch/camera cutouts

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    Uniwind.setTheme(nextTheme);
  };

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="bg-slate-200 dark:bg-cardBg border-b border-slate-100 dark:border-slate-800"
    >
      <View className="h-16 px-6 flex-row justify-between items-center">
        {/* Left: App Title / Page Title */}
        <Text className="text-slate-900 dark:text-lightText text-xl font-bold tracking-tight">
          {title}
        </Text>

        <View className="flex flex-row items-center gap-2">
          {/* Notifications Trigger Bell */}
          <TouchableOpacity
            onPress={() => router.push('/notifications')}
            className="bg-slate-50/50 dark:bg-zinc-950/10 p-2.5 rounded-full relative"
          >
            <IconSymbol name="bell.fill" size={20} color="#ff5640" />
            {/* Red Pulse Badge indicator representing the critical alarm */}
            <View className="absolute right-2 top-2 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-cardBg" />
          </TouchableOpacity>

          {/* Right: Interactive Theme Switcher */}
          {showThemeToggle && (
            <TouchableOpacity
              onPress={toggleTheme}
              activeOpacity={0.7}
              className="bg-slate-50/50 dark:bg-zinc-950/10 p-2.5 rounded-full"
            >
              <IconSymbol
                name={theme === 'dark' ? 'sun.max.fill' : 'moon.fill'}
                size={18}
                color="#ff5640"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}