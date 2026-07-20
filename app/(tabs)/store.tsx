import IconSymbol from '@/components/ui/icon-symbol';
import { ProductImageOrIcon } from '@/components/ui/product-image';
import { useCartStore } from '@/store/useCartStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Default seed items can contain images or icons
const SEED_PRODUCTS = [
  { id: '1', name: 'Ergonomic Desk', price: 299, icon: 'table' as const, category: 'Furniture', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80' },
  { id: '2', name: '4K UltraWide Monitor', price: 450, icon: 'monitor.fill' as const, category: 'Electronics', image: undefined }, // This has no image, will show icon!
  { id: '3', name: 'Pro Laptop 16"', price: 1299, icon: 'laptop' as const, category: 'Electronics', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80' },
  { id: '4', name: 'Posture Lumbar Chair', price: 189, icon: 'chair' as const, category: 'Furniture', image: undefined },
];

const CATEGORIES = ['All', 'Electronics', 'Furniture'];

export default function StoreScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mergedProducts, setMergedProducts] = useState(SEED_PRODUCTS);
  const { items, addItem, total, clear } = useCartStore();

  useFocusEffect(
    useCallback(() => {
      const loadCustomProducts = async () => {
        try {
          const storedData = await AsyncStorage.getItem('@endava_products');
          if (storedData) {
            const customProducts = JSON.parse(storedData);
            setMergedProducts([...customProducts, ...SEED_PRODUCTS]);
          } else {
            setMergedProducts(SEED_PRODUCTS);
          }
        } catch (error) {
          console.error(error);
        }
      };
      loadCustomProducts();
    }, [])
  );

  const handleDeleteProduct = async (id: string) => {
    try {
      const storedData = await AsyncStorage.getItem('@endava_products');
      if (storedData) {
        const customProducts = JSON.parse(storedData);
        const filtered = customProducts.filter((p: any) => p.id !== id);
        await AsyncStorage.setItem('@endava_products', JSON.stringify(filtered));
        setMergedProducts([...filtered, ...SEED_PRODUCTS]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredProducts = selectedCategory === 'All'
    ? mergedProducts
    : mergedProducts.filter(p => p.category === selectedCategory);

  const totalItemsCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <View className="flex-1 bg-white dark:bg-darkBg">

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: totalItemsCount > 0 ? 140 : 32,
        }}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View className="pt-10 pb-4 flex-row justify-between items-center">
              <View>
                <Text className="text-slate-400 dark:text-mutedText text-[10px] uppercase font-bold tracking-widest">
                  Enterprise Perks
                </Text>
                <Text className="text-slate-900 dark:text-lightText text-2xl font-black">
                  Endava Store
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => router.push("/add-product")}
                className="bg-primary/10 border border-primary/20 px-4 py-2.5 rounded-2xl flex-row items-center gap-2"
              >
                <IconSymbol name="sparkles" size={14} color="#ff5640" />
                <Text className="text-primary font-black text-xs">
                  Add Product
                </Text>
              </TouchableOpacity>
            </View>

            {/* Category Chips */}
            <View className="mb-6">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full border ${selectedCategory === cat
                      ? "bg-primary border-primary"
                      : "bg-slate-100 dark:bg-cardBg border-slate-200/40 dark:border-slate-800"
                      }`}
                  >
                    <Text
                      className={`text-xs font-bold ${selectedCategory === cat
                        ? "text-white"
                        : "text-slate-600 dark:text-lightText"
                        }`}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        }
        renderItem={({ item }) => {
          const cartQty = items.find((i) => i.id === item.id)?.qty || 0;

          return (
            <View className="w-[48%] bg-slate-50 dark:bg-cardBg p-4 rounded-3xl border border-slate-200/40 dark:border-slate-800/80">
              {cartQty > 0 && (
                <View className="absolute top-3 right-3 bg-primary w-6 h-6 rounded-full items-center justify-center z-20">
                  <Text className="text-white text-[10px] font-black">
                    {cartQty}
                  </Text>
                </View>
              )}

              <View className="bg-slate-200 dark:bg-slate-900/60 w-full aspect-4/3 rounded-2xl justify-center items-center mb-4 overflow-hidden border border-slate-200/20 dark:border-slate-800">
                <ProductImageOrIcon
                  imageUri={item.image}
                  iconName={item.icon}
                  size={28}
                />
              </View>

              <View className="mb-4">
                <Text className="text-[9px] text-slate-400 dark:text-mutedText uppercase font-bold tracking-widest mb-1">
                  {item.category}
                </Text>
                <Text
                  className="text-slate-800 dark:text-lightText font-extrabold text-sm leading-tight h-10"
                  numberOfLines={2}
                >
                  {item.name}
                </Text>
                <Text className="text-slate-900 dark:text-lightText font-black text-base mt-1.5">
                  ${item.price}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  addItem({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                  })
                }
                className="bg-primary w-full py-3 rounded-xl items-center"
              >
                <Text className="text-white font-bold text-xs">
                  Add to Order
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {/* Checkout Drawer Overlay */}
      {totalItemsCount > 0 && (
        <View className="absolute bottom-6 left-6 right-6 bg-slate-950 dark:bg-cardBg rounded-3xl p-5 shadow-2xl flex-row items-center justify-between border border-slate-800">
          <View>
            <Text className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Your Order ({totalItemsCount})</Text>
            <Text className="text-white text-lg font-black mt-0.5">${total()}</Text>
          </View>
          <View className="flex-row gap-2">
            <TouchableOpacity onPress={clear} className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl items-center justify-center">
              <IconSymbol name="trash.fill" size={16} color="#ef4444" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-primary px-6 py-3.5 rounded-2xl flex-row items-center gap-2">
              <Text className="text-white font-black text-xs">Order Now</Text>
              <IconSymbol name="chevron.right" size={12} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}

    </View>
  );
}