import { IconSymbol } from '@/components/ui/icon-symbol';
import { Gyroscope } from 'expo-sensors';
import React, { useEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

function EmployeeDigitalCard() {
    // Shared values for the gyroscope rotation offsets
    const rotateX = useSharedValue(0);
    const rotateY = useSharedValue(0);

    useEffect(() => {
        // Web does not support standard native sensors directly this way
        if (Platform.OS === 'web') return;

        // Set sample update interval (60 frames per second for ultra-smooth responsiveness)
        Gyroscope.setUpdateInterval(16);

        const subscription = Gyroscope.addListener((data) => {
            // Apply a low-pass filter to smooth out sudden spikes and jitter
            const friction = 0.15;

            // Gyroscope measures angular velocity. We accumulate/adjust values based on rotation direction.
            // We clamp the maximum tilt angle to about 15 degrees in either direction.
            rotateX.value = withTiming(
                Math.min(Math.max(rotateX.value + data.y * friction, -12), 12),
                { duration: 100 }
            );
            rotateY.value = withTiming(
                Math.min(Math.max(rotateY.value + data.x * friction, -12), 12),
                { duration: 100 }
            );
        });

        return () => {
            subscription.remove();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Animated style for 3D perspective tilt on the card container
    const cardAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { perspective: 1000 },
                { rotateX: `${rotateX.value}deg` },
                { rotateY: `${rotateY.value}deg` },
            ],
        };
    });

    // Animated style to slide a shiny hologram effect across the card based on tilt
    const holoShimmerStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            rotateY.value,
            [-12, 12],
            [-150, 150],
            Extrapolate.CLAMP
        );
        const translateY = interpolate(
            rotateX.value,
            [-12, 12],
            [-100, 100],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ translateX }, { translateY }],
        };
    });

    return (
        <Animated.View
            style={cardAnimatedStyle}
            className="w-full bg-slate-800 dark:bg-slate-950 aspect-[1.58/1] rounded-3xl p-6 shadow-2xl relative overflow-hidden mb-6 border border-slate-700/60 dark:border-slate-800"
        >
            {/* 🌟 Dynamic Holographic Shimmer Highlight */}
            <Animated.View
                style={[holoShimmerStyle]}
                className="absolute w-[200%] h-[200%] bg-white/5 dark:bg-white/10 rounded-full blur-2xl top-[-50%] left-[-50%] pointer-events-none"
            />

            {/* Cybernetic geometric background vectors */}
            <View className="absolute -right-20 -bottom-20 w-56 h-56 bg-primary/10 rounded-full border border-primary/10" />
            <View className="absolute -left-12 -top-12 w-36 h-36 bg-slate-900/60 rounded-full" />

            {/* Card Top Row */}
            <View className="flex-row justify-between items-start z-10">
                <View>
                    <Text className="text-white text-lg font-black tracking-widest leading-none">ENDAVA</Text>
                    <Text className="text-primary text-[9px] font-bold uppercase tracking-widest mt-1">
                        Senior Developer (Engineer)
                    </Text>
                </View>

                {/* Corporate smartchip icon */}
                <View className="bg-slate-900/90 border border-slate-700 p-2.5 rounded-xl">
                    <IconSymbol name="cpu" size={20} color="#ff5640" />
                </View>
            </View>

            {/* Card Bottom Row */}
            <View className="mt-auto flex-row justify-between items-end z-10">
                <View>
                    <Text className="text-white font-extrabold text-base tracking-wide">Berat Sulimani</Text>
                    <Text className="text-slate-400 text-[10px] font-medium tracking-widest mt-0.5">
                        Product Engineering • ID: #88241
                    </Text>
                </View>

                {/* Hologram-style security badge */}
                <View className="bg-white p-2 rounded-xl shadow-inner">
                    <IconSymbol name="shield.fill" size={24} color="#192b37" />
                </View>
            </View>
        </Animated.View>
    );
}

export default EmployeeDigitalCard;