import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function BookingScreen() {
  const [type, setType] = useState<'desk' | 'parking'>('desk');

  return (
    <View className="flex-1 bg-white dark:bg-darkBg px-6 pt-12">
      <Text className="text-slate-900 dark:text-lightText text-2xl font-bold mb-6">Reservations</Text>
      
      {/* Dynamic Selector Toggles */}
      <View className="flex-row bg-slate-100 dark:bg-cardBg p-1.5 rounded-xl mb-6">
        <TouchableOpacity 
          onPress={() => setType('desk')}
          className={`flex-1 flex-row justify-center items-center py-2.5 rounded-lg ${type === 'desk' ? 'bg-primary' : ''}`}
        >
          <IconSymbol name="monitor.fill" size={18} color={type === 'desk' ? '#fff' : '#64748b'} />
          <Text className={`font-semibold ml-2 ${type === 'desk' ? 'text-white' : 'text-slate-600 dark:text-mutedText'}`}>Workstation</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setType('parking')}
          className={`flex-1 flex-row justify-center items-center py-2.5 rounded-lg ${type === 'parking' ? 'bg-primary' : ''}`}
        >
          <IconSymbol name="car.fill" size={18} color={type === 'parking' ? '#fff' : '#64748b'} />
          <Text className={`font-semibold ml-2 ${type === 'parking' ? 'text-white' : 'text-slate-600 dark:text-mutedText'}`}>Parking Space</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-slate-500 dark:text-mutedText uppercase text-xs font-bold tracking-widest mb-3">Available Map & Selection</Text>
        <View className="bg-slate-50 dark:bg-cardBg aspect-video w-full rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 justify-center items-center mb-6">
          <Text className="text-slate-400 dark:text-mutedText text-sm">[ Interactive Office Map Grid View ]</Text>
        </View>

        <TouchableOpacity className="bg-primary w-full py-4 rounded-xl items-center shadow-lg">
          <Text className="text-white font-bold text-base">Confirm Tomorrow`s Selection</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}