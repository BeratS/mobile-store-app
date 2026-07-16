import { IconSymbol } from '@/components/ui/icon-symbol';
import EmployeeDigitalCard from '@/components/widgets/employee-card';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  // Mock states for interactive settings
  const [biometricsActive, setBiometricsActive] = useState(true);
  const [nfcFastPass, setNfcFastPass] = useState(false);

  return (
    <View className="flex-1 bg-white dark:bg-darkBg">
      <ScrollView className="flex-1 px-6 pt-12" showsVerticalScrollIndicator={false}>
        
        {/* 1. Profile Header & Active Node */}
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-row items-center gap-4">
            {/* Elegant initials badge */}
            <View className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 items-center justify-center">
              <Text className="text-primary font-black text-lg">BS</Text>
            </View>
            <View>
              <Text className="text-slate-900 dark:text-lightText text-xl font-extrabold leading-none">Berat Sulimani</Text>
              <Text className="text-slate-500 dark:text-mutedText text-xs font-semibold mt-1">Senior Developer • Endava</Text>
            </View>
          </View>
          {/* Real-time system connection indicator */}
          <View className="bg-emerald-500/10 px-3 py-1.5 rounded-full flex-row items-center gap-1.5 border border-emerald-500/20">
            <View className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Text className="text-emerald-500 font-extrabold text-[10px] uppercase tracking-wider">Connected</Text>
          </View>
        </View>

        {/* 2. Security ID Card (ID-1 Aspect Ratio) */}
        <EmployeeDigitalCard />

        {/* 3. Corporate KPI Quick Stats Grid */}
        <View className="flex-row gap-3 mb-8">
          <View className="flex-1 bg-slate-100/50 dark:bg-cardBg p-3.5 rounded-2xl items-center border border-slate-200/40 dark:border-slate-800">
            <Text className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Access Taps</Text>
            <Text className="text-slate-900 dark:text-lightText font-extrabold text-base">248</Text>
          </View>
          <View className="flex-1 bg-slate-100/50 dark:bg-cardBg p-3.5 rounded-2xl items-center border border-slate-200/40 dark:border-slate-800">
            <Text className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Active Bookings</Text>
            <Text className="text-primary font-extrabold text-base">2</Text>
          </View>
          <View className="flex-1 bg-slate-100/50 dark:bg-cardBg p-3.5 rounded-2xl items-center border border-slate-200/40 dark:border-slate-800">
            <Text className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Store Points</Text>
            <Text className="text-slate-900 dark:text-lightText font-extrabold text-base">1,420</Text>
          </View>
        </View>

        {/* 4. Security Credentials info */}
        <View className="w-full bg-slate-100/60 dark:bg-cardBg/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 mb-8">
          <Text className="text-slate-500 dark:text-mutedText text-center text-xs leading-relaxed">
            🛡️ Your digital ID is biometrically encrypted with device credentials. It can be dynamically revoked by the company MDM admin console.
          </Text>
        </View>

        {/* 5. Settings Segment: Credentials & Security */}
        <Text className="text-slate-900 dark:text-lightText text-lg font-bold mb-3">Security & Access</Text>
        <View className="bg-slate-100/30 dark:bg-cardBg/30 rounded-2xl border border-slate-200/40 dark:border-slate-800 mb-6 overflow-hidden">
          
          {/* Row 3: Native Device */}
          <View className="flex-row justify-between items-center px-4 py-4 border-b border-slate-200/40 dark:border-slate-800">
            <View className="flex-row items-center gap-3">
              <IconSymbol name="shield.fill" size={18} color="#ff5640" />
              <View>
                <Text className="text-slate-900 dark:text-lightText font-bold text-sm">Biometric Lock</Text>
                <Text className="text-slate-500 dark:text-mutedText text-[11px]">Require FaceID to unlock the pass</Text>
              </View>
            </View>
          </View>

          {/* Row 2: Biometric Access */}
          <View className="flex-row justify-between items-center px-4 py-4 border-b border-slate-200/40 dark:border-slate-800">
            <View className="flex-row items-center gap-3">
              <IconSymbol name="shield.fill" size={18} color="#ff5640" />
              <View>
                <Text className="text-slate-900 dark:text-lightText font-bold text-sm">Biometric Lock</Text>
                <Text className="text-slate-500 dark:text-mutedText text-[11px]">Require FaceID to unlock the pass</Text>
              </View>
            </View>
            <Switch 
              value={biometricsActive} 
              onValueChange={setBiometricsActive} 
              trackColor={{ true: '#ff5640', false: '#cbd5e1' }}
            />
          </View>

          {/* Row 3: NFC Fast Pass */}
          <View className="flex-row justify-between items-center px-4 py-4">
            <View className="flex-row items-center gap-3">
              <IconSymbol name="cpu" size={18} color="#3b82f6" />
              <View>
                <Text className="text-slate-900 dark:text-lightText font-bold text-sm">NFC Background Pass</Text>
                <Text className="text-slate-500 dark:text-mutedText text-[11px]">Allow tapping without opening the app</Text>
              </View>
            </View>
            <Switch 
              value={nfcFastPass} 
              onValueChange={setNfcFastPass} 
              trackColor={{ true: '#ff5640', false: '#cbd5e1' }}
            />
          </View>

        </View>

        {/* 6. Settings Segment: Preferences */}
        <Text className="text-slate-900 dark:text-lightText text-lg font-bold mb-3">General Preferences</Text>
        <View className="bg-slate-100/30 dark:bg-cardBg/30 rounded-2xl border border-slate-200/40 dark:border-slate-800 mb-12 overflow-hidden">
          
          {/* Row 1: Theme Setup */}
          <TouchableOpacity className="flex-row justify-between items-center px-4 py-4 border-b border-slate-200/40 dark:border-slate-800">
            <View className="flex-row items-center gap-3">
              <IconSymbol name="sparkles" size={18} color="#f59e0b" />
              <Text className="text-slate-900 dark:text-lightText font-bold text-sm">Appearance Settings</Text>
            </View>
            <IconSymbol name="chevron.right" size={16} color="#64748b" />
          </TouchableOpacity>

          {/* Row 2: Sign Out */}
          <TouchableOpacity className="flex-row justify-between items-center px-4 py-4">
            <View className="flex-row items-center gap-3">
              <IconSymbol name="person.badge.key.fill" size={18} color="#ef4444" />
              <Text className="text-red-500 font-extrabold text-sm">Disconnect Card</Text>
            </View>
            <IconSymbol name="chevron.right" size={16} color="#ef4444" />
          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
}