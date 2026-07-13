import { IconSymbol } from '@/components/ui/icon-symbol';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Dashboard() {
  return (
    <ScrollView className="flex-1 bg-white dark:bg-darkBg px-6 pt-12">
      {/* Header */}
      <View className="mb-8 flex-row justify-between items-center">
        <View>
          <Text className="text-slate-500 dark:text-mutedText text-sm font-medium">Welcome back,</Text>
          <Text className="text-slate-900 dark:text-lightText text-2xl font-bold">Alex Mercer</Text>
        </View>
        <View className="bg-primary px-3 py-1.5 rounded-full">
          <Text className="text-white font-semibold text-xs">HQ • Floor 4</Text>
        </View>
      </View>

      {/* Quick Metrics */}
      <View className="flex-row gap-4 mb-8">
        <View className="flex-1 bg-slate-100 dark:bg-cardBg p-4 rounded-2xl border border-slate-200/60 dark:border-transparent">
          <Text className="text-slate-500 dark:text-mutedText text-xs uppercase font-bold tracking-wider mb-1">Desk Status</Text>
          <Text className="text-slate-800 dark:text-lightText text-lg font-bold">Desk #402</Text>
        </View>
        <View className="flex-1 bg-slate-100 dark:bg-cardBg p-4 rounded-2xl border border-slate-200/60 dark:border-transparent">
          <Text className="text-slate-500 dark:text-mutedText text-xs uppercase font-bold tracking-wider mb-1">Parking</Text>
          <Text className="text-primary text-lg font-bold">Spot P-12</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text className="text-slate-900 dark:text-lightText text-lg font-bold mb-4">Quick Actions</Text>
      <View className="gap-4">
        
        {/* Action Item 1 - NFC Access */}
        <TouchableOpacity className="flex-row items-center bg-slate-100 dark:bg-cardBg p-5 rounded-2xl border border-slate-200 dark:border-slate-700/50">
          <View className="bg-primary/10 dark:bg-primary/20 p-3 rounded-xl mr-4">
            <IconSymbol name="shield.fill" size={24} color="#ff5640" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-900 dark:text-lightText font-bold text-base">NFC Quick Access</Text>
            <Text className="text-slate-500 dark:text-mutedText text-xs mt-0.5">Hold near office doors to unlock</Text>
          </View>
        </TouchableOpacity>

        {/* Action Item 2 - Parking Marketplace */}
        <TouchableOpacity className="flex-row items-center bg-slate-100 dark:bg-cardBg p-5 rounded-2xl border border-slate-200 dark:border-slate-700/50">
          <View className="bg-blue-500/10 dark:bg-blue-500/20 p-3 rounded-xl mr-4">
            <IconSymbol name="car.fill" size={24} color="#3b82f6" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-900 dark:text-lightText font-bold text-base">Release My Parking Spot</Text>
            <Text className="text-slate-500 dark:text-mutedText text-xs mt-0.5">Share your spot with the marketplace today</Text>
          </View>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}