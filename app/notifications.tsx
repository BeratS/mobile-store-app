import IconSymbol from '@/components/ui/icon-symbol';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function NotificationsScreen() {
  return (
    <View className="flex-1 bg-white dark:bg-darkBg p-6">

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">

        {/* CRITICAL ALERTS SECTION */}
        <Text className="text-red-500 uppercase text-xs font-bold tracking-widest mb-3">Critical Updates</Text>

        {/* Fire Alarm Notice */}
        <View className="bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900/50 p-5 flex-row items-start mb-6">
          <View className="bg-red-500/10 dark:bg-red-500/20 p-3 rounded-xl mr-4">
            <IconSymbol name="flame.fill" size={24} color="#ef4444" />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center">
              <Text className="text-red-800 dark:text-red-400 font-extrabold text-xs">CRITICAL</Text>
              <Text className="text-slate-400 dark:text-mutedText text-[10px]">10m ago</Text>
            </View>
            <Text className="text-slate-900 dark:text-lightText font-bold text-base mt-1">Scheduled Fire Alarm Test</Text>
            <Text className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-1.5">
              Testing scheduled for tomorrow between <Text className="font-bold">09:00 AM and 11:00 AM</Text>. Alarms will sound intermittently. Evacuation is not required.
            </Text>
          </View>
        </View>

        {/* GENERAL ALERTS SECTION */}
        <Text className="text-slate-500 dark:text-mutedText uppercase text-xs font-bold tracking-widest mb-3">Recent Activity</Text>

        {/* Announcement: Office Renovation */}
        <View className="bg-slate-100 dark:bg-cardBg rounded-2xl border border-slate-200/60 dark:border-slate-800 p-5 flex-row items-start mb-4">
          <View className="bg-primary/10 dark:bg-primary/20 p-3 rounded-xl mr-4">
            <IconSymbol name="announcement.fill" size={24} color="#ff5640" />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center">
              <Text className="text-slate-900 dark:text-lightText font-bold text-sm">Office Renovation Notice</Text>
              <Text className="text-slate-400 dark:text-mutedText text-[10px]">2h ago</Text>
            </View>
            <Text className="text-slate-500 dark:text-mutedText text-xs leading-relaxed mt-1">
              Floors 1 to 3 are getting a major hardware upgrade this weekend. Expect temporary noise interruptions.
            </Text>
          </View>
        </View>

        {/* Announcement: Parking Spot Released */}
        <View className="bg-slate-100 dark:bg-cardBg rounded-2xl border border-slate-200/60 dark:border-slate-800 p-5 flex-row items-start mb-4">
          <View className="bg-blue-500/10 dark:bg-blue-500/20 p-3 rounded-xl mr-4">
            <IconSymbol name="car.fill" size={24} color="#3b82f6" />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center">
              <Text className="text-slate-900 dark:text-lightText font-bold text-sm">Parking Spot Released</Text>
              <Text className="text-slate-400 dark:text-mutedText text-[10px]">Yesterday</Text>
            </View>
            <Text className="text-slate-500 dark:text-mutedText text-xs leading-relaxed mt-1">
              You successfully listed your parking spot **Spot P-12** on the marketplace for tomorrow.
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}