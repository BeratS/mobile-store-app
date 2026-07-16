import { IconSymbol } from '@/components/ui/icon-symbol';
import { Accelerometer } from 'expo-sensors';
import React, { useEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

function EmployeeDigitalCard() {
    const rotateX = useSharedValue(0);
    const rotateY = useSharedValue(0);

    useEffect(() => {
        if (Platform.OS === 'web') return;
        let subscription: { remove: () => void } | undefined;

        (async () => {
            const available = await Accelerometer.isAvailableAsync();
            if (!available) return;

            Accelerometer.setUpdateInterval(16);

            subscription = Accelerometer.addListener(({ x, y }) => {
                rotateY.value = withSpring(
                    Math.min(Math.max(x * 30, -12), 12),
                    { damping: 20, stiffness: 150, mass: 0.5 }
                );
                rotateX.value = withSpring(
                    Math.min(Math.max(-y * 30, -12), 12),
                    { damping: 20, stiffness: 150, mass: 0.5 }
                );
            });
        })();

        return () => subscription?.remove();
    }, []);

    const cardAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            { perspective: 1200 },
            { rotateX: `${rotateX.value}deg` },
            { rotateY: `${rotateY.value}deg` },
        ],
    }));

    const holoShimmerStyle = useAnimatedStyle(() => {
        const translateX = interpolate(rotateY.value, [-12, 12], [-180, 180], Extrapolate.CLAMP);
        const translateY = interpolate(rotateX.value, [-12, 12], [-120, 120], Extrapolate.CLAMP);
        const opacity = interpolate(
            Math.abs(rotateX.value) + Math.abs(rotateY.value),
            [0, 24],
            [0.03, 0.18],
            Extrapolate.CLAMP
        );
        return { transform: [{ translateX }, { translateY }], opacity };
    });

    const depthShadowStyle = useAnimatedStyle(() => {
        const tilt = Math.abs(rotateX.value) + Math.abs(rotateY.value);
        return {
            shadowOpacity: interpolate(tilt, [0, 24], [0.25, 0.45], Extrapolate.CLAMP),
            shadowRadius: interpolate(tilt, [0, 24], [12, 24], Extrapolate.CLAMP),
        };
    });

    return (
        <Animated.View
            style={[cardAnimatedStyle, depthShadowStyle]}
            className="w-full bg-slate-800 dark:bg-slate-950 aspect-[1.58/1] rounded-3xl p-6 relative overflow-hidden mb-6 border border-slate-700/60 dark:border-slate-800"
        >
            <Animated.View
                style={[holoShimmerStyle]}
                className="absolute w-[200%] h-[200%] bg-white rounded-full blur-2xl top-[-50%] left-[-50%] pointer-events-none"
            />

            <View className="absolute -right-20 -bottom-20 w-56 h-56 bg-primary/10 rounded-full border border-primary/10" />
            <View className="absolute -left-12 -top-12 w-36 h-36 bg-slate-900/60 rounded-full" />

            <View className="flex-row justify-between items-start z-10">
                <View>
                    <Text className="text-white text-lg font-black tracking-widest leading-none">ENDAVA</Text>
                    <Text className="text-primary text-[9px] font-bold uppercase tracking-widest mt-1">
                        Senior Developer (Engineer)
                    </Text>
                </View>
                <View className="bg-slate-900/90 border border-slate-700 p-2.5 rounded-xl">
                    <IconSymbol name="cpu" size={20} color="#ff5640" />
                </View>
            </View>

            <View className="mt-auto flex-row justify-between items-end z-10">
                <View>
                    <Text className="text-white font-extrabold text-base tracking-wide">Berat Sulimani</Text>
                    <Text className="text-slate-400 text-[10px] font-medium tracking-widest mt-0.5">
                        Product Engineering • ID: #88241
                    </Text>
                </View>
                <View className="bg-white p-2 rounded-xl shadow-inner">
                    <IconSymbol name="shield.fill" size={24} color="#192b37" />
                </View>
            </View>
        </Animated.View>
    );
}

export default EmployeeDigitalCard;