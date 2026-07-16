import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/contexts/auth.context';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function LoginScreen() {
    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            // Simulate network request delays
            await new Promise((resolve) => setTimeout(resolve, 1200));
            // Call your context sign-in method
            await signIn(email, password);
        } catch (e) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-slate-950"
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-1 justify-center px-8 py-12">

                    {/* 1. Header Branding */}
                    <View className="items-center mb-10">
                        <View className="bg-slate-900 border border-slate-800 p-4 rounded-3xl mb-4 shadow-xl">
                            <IconSymbol name="shield.fill" size={32} color="#ff5640" />
                        </View>
                        <Text className="text-white text-3xl font-black tracking-tight">Endava Access</Text>
                        <Text className="text-slate-500 text-xs mt-1 text-center">
                            Secure single sign-on portal for corporate systems.
                        </Text>
                    </View>

                    {/* 2. Error Banner */}
                    {error ? (
                        <View className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl mb-6 flex-row items-center gap-3">
                            {/* Use a supported icon name */}
                            <IconSymbol name="megaphone.fill" size={16} color="#ef4444" />
                            <Text className="text-red-400 text-xs font-semibold flex-1">{error}</Text>
                        </View>
                    ) : null}

                    {/* 3. Input Fields */}
                    <View className="gap-4 mb-8">

                        {/* Email Input */}
                        <View>
                            <Text className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-2 pl-1">
                                Corporate Email
                            </Text>
                            <View className="flex-row gap-3 items-center bg-slate-900 border border-slate-800 rounded-2xl px-4 min-h-14 focus-within:border-primary">
                                <IconSymbol name="person.badge.key.fill" size={16} color="#64748b" />
                                <TextInput
                                    placeholder="name@endava.com"
                                    placeholderTextColor="#475569"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    className="flex-1 text-white text-sm font-semibold h-5 pb-1"
                                />
                            </View>
                        </View>

                        {/* Password Input */}
                        <View>
                            <Text className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-2 pl-1">
                                Access Token / Password
                            </Text>
                            <View className="flex-row gap-3 items-center bg-slate-900 border border-slate-800 rounded-2xl px-4 min-h-14">
                                <IconSymbol name="cpu" size={16} color="#64748b" />
                                <TextInput
                                    placeholder="••••••••••••"
                                    placeholderTextColor="#475569"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                    className="flex-1 text-white text-sm font-semibold h-5 pb-1"
                                />
                            </View>
                        </View>

                    </View>

                    {/* 4. Action Button */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.8}
                        className="bg-primary w-full py-4 rounded-2xl items-center justify-center shadow-lg shadow-primary/20"
                    >
                        {loading ? (
                            <ActivityIndicator color="#ffffff" size="small" />
                        ) : (
                            <Text className="text-white font-black text-sm tracking-wide">
                                Sign In Securely
                            </Text>
                        )}
                    </TouchableOpacity>

                    {/* 5. Helpful Footer Info */}
                    <View className="mt-8 flex-row justify-center items-center gap-1.5">
                        <IconSymbol name="clock.fill" size={11} color="#64748b" />
                        <Text className="text-[10px] text-slate-600 font-bold tracking-wide text-center">
                            Protected by Endava Security Protocols.
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
