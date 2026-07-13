import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Sample product listing dataset
const PRODUCTS = [
  { id: '1', name: 'Ergonomic Desk', price: '$299', icon: 'table' as const, category: 'Furniture' },
  { id: '2', name: '4K UltraWide Monitor', price: '$450', icon: 'monitor.fill' as const, category: 'Electronics' },
  { id: '3', name: 'Pro Laptop 16"', price: '$1,299', icon: 'laptop' as const, category: 'Electronics' },
  { id: '4', name: 'Posture Lumbar Chair', price: '$189', icon: 'chair' as const, category: 'Furniture' },
];

export default function StoreScreen() {
  return (
    <View className="flex-1 bg-white dark:bg-darkBg">
        
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        <Text className="text-slate-500 dark:text-mutedText uppercase text-xs font-bold tracking-widest mb-4">
          Upgrade Your Workspace
        </Text>

        {/* 2-Column Grid Layout */}
        <View className="flex-row flex-wrap justify-between pb-10">
          {PRODUCTS.map((product) => (
            <View 
              key={product.id}
              className="w-[48%] bg-slate-100 dark:bg-cardBg p-4 rounded-2xl border border-slate-200/50 dark:border-transparent mb-4 flex-col justify-between"
            >
              {/* Product Icon Frame */}
              <View className="bg-slate-200/60 dark:bg-slate-800/40 w-12 h-12 rounded-xl justify-center items-center mb-3">
                <IconSymbol name={product.icon} size={24} color="#ff5640" />
              </View>

              {/* Product Info */}
              <View className="mb-4">
                <Text className="text-[10px] text-slate-400 dark:text-mutedText uppercase font-bold tracking-wider mb-0.5">
                  {product.category}
                </Text>
                <Text className="text-slate-800 dark:text-lightText font-bold text-sm leading-tight h-10" numberOfLines={2}>
                  {product.name}
                </Text>
                <Text className="text-slate-900 dark:text-lightText font-extrabold text-base mt-1">
                  {product.price}
                </Text>
              </View>

              {/* Buy Button */}
              <TouchableOpacity className="bg-primary w-full py-2.5 rounded-xl items-center active:opacity-80">
                <Text className="text-white font-bold text-xs">Add to Order</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}