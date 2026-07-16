import { IconSymbol } from '@/components/ui/icon-symbol';
import { QuickAccessCard } from '@/components/widgets/quick-access-card';
import { useBookingStore } from '@/stores/useBookingStore';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Dashboard() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const { deskSlot, parkingSlot, deskFloor, parkingFloor } = useBookingStore();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const styles = StyleSheet.create({
    scrollView: {
      paddingBottom: 10,
    },
  });

  return (
    <View className="flex-1 bg-white dark:bg-darkBg">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

        {/* Main Content Padding container */}
        <View className="px-6 pt-12 pb-10">

          {/* 1. Header */}
          <View className="mb-6 flex-row justify-between items-center">
            <View>
              <Text className="text-slate-500 dark:text-mutedText text-sm font-medium">Welcome back,</Text>
              <Text className="text-slate-900 dark:text-lightText text-2xl font-bold">Berat Sulimani</Text>
            </View>
            <View className="bg-primary px-3 py-1.5 rounded-full">
              <Text className="text-white font-semibold text-xs">HQ • Floor 5</Text>
            </View>
          </View>

          {/* 2. Global CTA Book a Spot Button */}
          <TouchableOpacity
            onPress={() => router.push('/booking')}
            className="mb-8 p-4 pl-6 pr-6 rounded-2xl bg-primary flex-row items-center justify-between shadow-md"
          >
            <View className="flex-row items-center gap-3">
              <IconSymbol name="calendar" size={22} color="#ffffff" />
              <Text className="text-white font-bold text-base">Book a Desk or Parking</Text>
            </View>
            <IconSymbol name="chevron.right" size={18} color="#ffffff" />
          </TouchableOpacity>

          {/* 3. Horizontal Swipable Quick Actions Card Slider */}
          <Text className="text-slate-900 dark:text-lightText text-lg font-bold mb-3">Quick Actions</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row mb-8 -mx-6 px-6"
            snapToInterval={280}
            decelerationRate="fast"
          >
            {/* NFC Keycard Access Widget */}
            <QuickAccessCard
              title="NFC Office Access Card"
              description="Hold your device near secure office doors to instantly unlock."
              iconName="shield.fill"
              iconColor="#ff5640"
              badgeText="Active"
              badgeVariant="emerald"
              onPress={() => router.push('/nfc-simulate')}
            />

            {/* Smart Parking Card */}
            <QuickAccessCard
              title="NFC Smart Parking"
              description="Hold your device near secure parking slot to instantly unlock."
              iconName="car.fill"
              iconColor="#3b82f6"
              badgeText="Active"
              badgeVariant="emerald"
              onPress={() => router.push('/nfc-simulate')}
            />

          </ScrollView>

          {/* 4. Active Workspace Reservations Widgets */}
          <Text className="text-slate-900 dark:text-lightText text-lg font-bold mb-3">Today&apos;s Workspace</Text>
          <View className="flex-row gap-4 mb-8">

            {/* Desk Spot Status */}
            <View className="flex-1 bg-slate-100 dark:bg-cardBg p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800">
              <View className="flex-row items-center gap-2 mb-2">
                <IconSymbol name="monitor.fill" size={16} color="#ff5640" />
                <Text className="text-slate-500 dark:text-mutedText text-xs uppercase font-bold tracking-wider">Desk Spot</Text>
              </View>
              {!deskSlot ? (
                <Text className="text-slate-800 dark:text-lightText text-center px-2 font-extrabold">No Desk Reserved</Text>
              ) : (
                <>
                  <Text className="text-slate-800 dark:text-lightText text-lg font-extrabold">Desk: {deskSlot}</Text>
                  <Text className="text-slate-400 dark:text-slate-500 text-[10px] mt-1 font-medium">Floor: {deskFloor}</Text>
                </>
              )}
            </View>

            {/* Parking Spot Status */}
            <View className="flex-1 bg-slate-100 dark:bg-cardBg p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800">
              <View className="flex-row items-center gap-2 mb-2">
                <IconSymbol name="car.fill" size={16} color="#3b82f6" />
                <Text className="text-slate-500 dark:text-mutedText text-xs uppercase font-bold tracking-wider">Parking Spot</Text>
              </View>
              {!deskSlot ? (
                <Text className="text-slate-800 dark:text-lightText text-center px-2 font-extrabold">No Parking Reserved</Text>
              ) : (
                <>
                  <Text className="text-slate-800 dark:text-lightText text-lg font-extrabold">Spot: {parkingSlot}</Text>
                  <Text className="text-slate-400 dark:text-slate-500 text-[10px] mt-1 font-medium">Floor: {parkingFloor}</Text>
                </>
              )}
            </View>

          </View>

          {/* 5. Today's Meetings Widget */}
          <View className="mb-8">
            <Text className="text-slate-900 dark:text-lightText text-lg font-bold mb-3">Today&apos;s Meetings</Text>
            <View className="bg-slate-100 dark:bg-cardBg rounded-2xl border border-slate-200/60 dark:border-slate-800 p-4">

              {/* Meeting Item 1 */}
              <View className="flex-row items-start pb-4 border-b border-slate-200 dark:border-slate-800">
                <View className="items-center mr-4 w-12 pt-0.5">
                  <Text className="text-slate-950 dark:text-lightText font-bold text-sm">10:30</Text>
                  <Text className="text-slate-400 dark:text-mutedText text-[10px] font-medium uppercase">AM</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-slate-900 dark:text-lightText font-bold text-sm">Daily Standup Sync</Text>
                  <Text className="text-slate-400 dark:text-mutedText text-xs mt-0.5">Room 504 • Floor 5</Text>
                </View>
              </View>

              {/* Meeting Item 2 */}
              <View className="flex-row items-start pt-4">
                <View className="items-center mr-4 w-12 pt-0.5">
                  <Text className="text-slate-950 dark:text-lightText font-bold text-sm">02:15</Text>
                  <Text className="text-slate-400 dark:text-mutedText text-[10px] font-medium uppercase">PM</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-slate-900 dark:text-lightText font-bold text-sm">Client Meeting</Text>
                  <Text className="text-slate-400 dark:text-mutedText text-xs mt-0.5">Main Conference Boardroom</Text>
                </View>
              </View>

            </View>
          </View>

          {/* 6. Company Announcements Widget */}
          {/* 6. Company Announcements Widget */}
          <View className="mb-4">
            <Text className="text-slate-900 dark:text-lightText text-lg font-bold mb-3">Company Announcements</Text>
            <View className="gap-4">

              {/* CRITICAL: Fire Alarm Notice Widget */}
              <View className="bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900/50 p-5 flex-row items-start">
                <View className="bg-red-500/10 dark:bg-red-500/20 p-3 rounded-xl mr-4">
                  <IconSymbol name="flame.fill" size={24} color="#ef4444" />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-red-800 dark:text-red-400 font-extrabold text-sm">CRITICAL NOTICE</Text>
                    <View className="bg-red-500 w-2 h-2 rounded-full animate-pulse" />
                  </View>
                  <Text className="text-slate-900 dark:text-lightText font-bold text-base mt-1">Scheduled Fire Alarm Test</Text>
                  <Text className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-1.5">
                    The annual building-wide fire alarm and sprinkler safety system testing is scheduled for tomorrow between <Text className="font-bold">09:00 AM and 11:00 AM</Text>.
                  </Text>
                  <Text className="text-slate-500 dark:text-mutedText text-[11px] leading-relaxed mt-2 italic">
                    Alarms will sound intermittently on all floors. No building evacuation is required during these tests. Thank you for your cooperation.
                  </Text>
                </View>
              </View>

              {/* General Notice Widget */}
              <View className="bg-slate-100 dark:bg-cardBg rounded-2xl border border-slate-200/60 dark:border-slate-800 p-5 flex-row items-start">
                <View className="bg-primary/10 dark:bg-primary/20 p-3 rounded-xl mr-4">
                  <IconSymbol name="announcement.fill" size={24} color="#ff5640" />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-[900] dark:text-lightText font-bold text-sm">Office Renovation Notice</Text>
                  <Text className="text-slate-500 dark:text-mutedText text-xs leading-relaxed mt-1">
                    Floors 6 are getting a major hardware upgrade this weekend. Expect temporary noise interruptions.
                  </Text>
                  <Text className="text-primary font-bold text-[11px] mt-2.5">Read Details & Map Updates →</Text>
                </View>
              </View>

            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}