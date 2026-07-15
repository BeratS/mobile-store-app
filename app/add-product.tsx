import { IconSymbol } from '@/components/ui/icon-symbol';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ICON_OPTIONS = [
    { name: 'table' as const, label: 'Desk' },
    { name: 'monitor.fill' as const, label: 'Screen' },
    { name: 'laptop' as const, label: 'Computer' },
    { name: 'chair' as const, label: 'Chair' },
    { name: 'cpu' as const, label: 'Tech Gadget' },
    { name: 'sparkles' as const, label: 'Other' }
];

const CATEGORIES = ['Electronics', 'Furniture'];

export default function AddProductScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Electronics');
    const [selectedIcon, setSelectedIcon] = useState<'table' | 'monitor.fill' | 'laptop' | 'chair' | 'cpu' | 'sparkles'>('cpu');

    const handleSaveProduct = async () => {
        if (!name.trim() || !price.trim()) {
            Alert.alert('Incomplete Form', 'Please fill out the product name and price.');
            return;
        }

        const parsedPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            Alert.alert('Invalid Price', 'Please enter a valid positive price number.');
            return;
        }

        const newProduct = {
            id: `custom_${Date.now()}`, // Unique ID
            name: name.trim(),
            price: parsedPrice,
            icon: selectedIcon,
            category,
            isCustom: true // Track to allow deletion later if needed
        };

        try {
            // 1. Dismiss the software keyboard so it doesn't block or dismiss the Alert modal
            Keyboard.dismiss();

            // Fetch existing stored custom products
            const existingData = await AsyncStorage.getItem('@endava_products');
            const customProducts = existingData ? JSON.parse(existingData) : [];

            // Add new product
            customProducts.unshift(newProduct);

            // Save back to AsyncStorage
            await AsyncStorage.setItem('@endava_products', JSON.stringify(customProducts));

            Alert.alert('Success 🎉', `${name} has been added to the Store inventory!`, [
                { text: 'OK', onPress: () => router.back() }
            ]);

            router.back();

        } catch (error) {
            Alert.alert('Error', 'Failed to save product to local database.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white dark:bg-darkBg"
        >
            <ScrollView className="flex-1 px-6 pt-12" showsVerticalScrollIndicator={false}>
                {/* Navigation Header */}
                <View className="flex-row items-center gap-4 mb-8">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="bg-slate-100 dark:bg-cardBg p-3 rounded-full border border-slate-200/40 dark:border-slate-800"
                    >
                        <IconSymbol name="chevron.left.forwardslash.chevron.right" size={16} color="#ff5640" />
                    </TouchableOpacity>
                    <Text className="text-slate-900 dark:text-lightText text-xl font-black">Product description</Text>
                </View>

                {/* Input Name */}
                <Text className="text-slate-900 dark:text-lightText text-sm font-bold mb-2">Item Name</Text>
                <TextInput
                    className="bg-slate-50 dark:bg-cardBg px-4 py-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-slate-900 dark:text-lightText text-sm mb-6"
                    placeholder="e.g., Mechanical Keyboard"
                    placeholderTextColor="#64748b"
                    value={name}
                    onChangeText={setName}
                />

                {/* Input Price */}
                <Text className="text-slate-900 dark:text-lightText text-sm font-bold mb-2">Price ($)</Text>
                <TextInput
                    className="bg-slate-50 dark:bg-cardBg px-4 py-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-slate-900 dark:text-lightText text-sm mb-6"
                    placeholder="e.g., 120"
                    placeholderTextColor="#64748b"
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                />

                {/* Category Selector Chips */}
                <Text className="text-slate-900 dark:text-lightText text-sm font-bold mb-3">Category</Text>
                <View className="flex-row gap-3 mb-6">
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setCategory(cat)}
                            className={`px-5 py-3 rounded-2xl border flex-1 items-center ${category === cat
                                ? 'bg-primary border-primary'
                                : 'bg-slate-50 dark:bg-cardBg border-slate-200/40 dark:border-slate-800'
                                }`}
                        >
                            <Text className={`text-xs font-bold ${category === cat ? 'text-white' : 'text-slate-600 dark:text-lightText'}`}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Dynamic Icon Grid Selection */}
                <Text className="text-slate-900 dark:text-lightText text-sm font-bold mb-3">Assign Hardware Icon</Text>
                <View className="flex-row flex-wrap gap-3 mb-10">
                    {ICON_OPTIONS.map((opt) => (
                        <TouchableOpacity
                            key={opt.name}
                            onPress={() => setSelectedIcon(opt.name)}
                            className={`w-[30%] aspect-square items-center justify-center rounded-2xl border p-3 ${selectedIcon === opt.name
                                ? 'bg-primary/10 border-primary'
                                : 'bg-slate-50 dark:bg-cardBg border-slate-200/40 dark:border-slate-800'
                                }`}
                        >
                            <IconSymbol name={opt.name} size={24} color={selectedIcon === opt.name ? '#ff5640' : '#64748b'} />
                            <Text className={`text-[10px] font-bold mt-2 ${selectedIcon === opt.name ? 'text-primary' : 'text-slate-500'}`}>
                                {opt.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Action Save Button */}
                <TouchableOpacity
                    onPress={handleSaveProduct}
                    className="bg-primary w-full py-4 rounded-2xl items-center active:opacity-95 shadow-lg shadow-primary/20 mb-12"
                >
                    <Text className="text-white font-black text-sm">Save & List Item</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}