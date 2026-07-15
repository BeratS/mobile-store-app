import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function NfcSimulateScreen() {
  const router = useRouter();
  const [nfcState, setNfcState] = useState<'scanning' | 'granted'>('scanning');

  // --- ANIMATION SHARDS ---
  const cardTranslateY = useSharedValue(SCREEN_HEIGHT);
  const cardRotateX = useSharedValue(0); // 3D Tilt X
  const cardRotateY = useSharedValue(0); // 3D Tilt Y
  const cardScale = useSharedValue(0.9);
  
  // Idle floating values
  const idleFloat = useSharedValue(0);

  // Staggered radar rings
  const ring1Scale = useSharedValue(0.8);
  const ring1Opacity = useSharedValue(0);
  const ring2Scale = useSharedValue(0.8);
  const ring2Opacity = useSharedValue(0);

  // Card light flash sheen overlay position
  const sheenTranslateX = useSharedValue(-200);

  // --- RUN SIMULATION LOGIC ---
  const runNfcSimulation = () => {
    setNfcState('scanning');
    
    // 1. Heavy premium entrance spring (card pops up and settles down)
    cardTranslateY.value = withSpring(0, { 
      damping: 12, 
      stiffness: 90, 
      mass: 1 
    });
    cardScale.value = withSpring(1, { damping: 15 });

    // Start idle hover floating (sine wave effect) after settling
    setTimeout(() => {
      idleFloat.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: 1500 }),
          withTiming(8, { duration: 1500 })
        ),
        -1,
        true
      );
    }, 800);

    // 2. Loop staggered multi-radar waves
    const ringTiming = { duration: 1600 };
    
    ring1Scale.value = withRepeat(withTiming(2.4, ringTiming), -1, false);
    ring1Opacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 200 }),
        withTiming(0, { duration: 1400 })
      ),
      -1,
      false
    );

    // Ring 2 starts with a slight phase delay
    setTimeout(() => {
      ring2Scale.value = withRepeat(withTiming(2.4, ringTiming), -1, false);
      ring2Opacity.value = withRepeat(
        withSequence(
          withTiming(0.6, { duration: 200 }),
          withTiming(0, { duration: 1400 })
        ),
        -1,
        false
      );
    }, 800);

    // 3. Trigger SUCCESS scenario (Card Taps Reader)
    setTimeout(() => {
      setNfcState('granted');
      
      // Cancel idle hover float & fade out the radar signals
      idleFloat.value = withSpring(0);
      ring1Opacity.value = withTiming(0, { duration: 200 });
      ring2Opacity.value = withTiming(0, { duration: 200 });

      // Clean, satisfying 3D Pop Tilt reaction on impact
      cardScale.value = withSequence(
        withSpring(1.05, { stiffness: 300, damping: 10 }),
        withSpring(1, { stiffness: 150, damping: 12 })
      );
      
      cardRotateX.value = withSequence(
        withTiming(-12, { duration: 150 }),
        withSpring(0, { damping: 10 })
      );

      // Trigger a brilliant visual metallic sheen glare sweep
      sheenTranslateX.value = withTiming(400, { duration: 850 });

      // 4. Slide-out and pop back page stack on completion
      setTimeout(() => {
        cardTranslateY.value = withTiming(SCREEN_HEIGHT, { duration: 450 }, (finished) => {
          if (finished) {
            scheduleOnRN(router.back);
          }
        });
      }, 1600);
    }, 2400);
  };

  useEffect(() => {
    runNfcSimulation();
  }, []);

  // --- ANIMATED STYLES ---
  
  // Composite card layout (Translates, Floats, Tilts, and Scales together)
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: cardTranslateY.value + idleFloat.value },
        { scale: cardScale.value },
        { perspective: 1000 },
        { rotateX: `${cardRotateX.value}deg` },
        { rotateY: `${cardRotateY.value}deg` }
      ],
    };
  });

  const animatedRing1 = useAnimatedStyle(() => ({
    transform: [{ scale: ring1Scale.value }],
    opacity: ring1Opacity.value,
  }));

  const animatedRing2 = useAnimatedStyle(() => ({
    transform: [{ scale: ring2Scale.value }],
    opacity: ring2Opacity.value,
  }));

  const animatedSheen = useAnimatedStyle(() => ({
    transform: [{ translateX: sheenTranslateX.value }, { rotate: '-25deg' }],
  }));

  return (
    <View className="flex-1 bg-slate-950 justify-end items-center px-6">
      
      {/* Header Bar */}
      <View className="absolute top-12 left-6 right-6 flex-row justify-between items-center z-10">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="bg-slate-900/80 p-2.5 rounded-full border border-slate-800"
        >
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={18} color="#ff5640" />
        </TouchableOpacity>
        <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest">NFC Simulation</Text>
        <View className="w-10 h-10 opacity-0" />
      </View>

      {/* Advanced Multi-Ring Signal Target */}
      <View className="items-center absolute top-[26%]">
        <View className="relative justify-center items-center w-40 h-40">
          
          {/* Layered Waves */}
          <Animated.View 
            style={animatedRing1}
            className="absolute w-24 h-24 rounded-full bg-primary/20 border border-primary/40"
          />
          <Animated.View 
            style={animatedRing2}
            className="absolute w-24 h-24 rounded-full bg-primary/10 border border-primary/20"
          />

          <View className={`w-24 h-24 rounded-full justify-center items-center shadow-lg ${
            nfcState === 'granted' 
              ? 'bg-emerald-500 shadow-emerald-500/40' 
              : 'bg-slate-900 border border-slate-800'
          }`}>
            <IconSymbol 
              name={nfcState === 'granted' ? 'shield.fill' : 'cpu'} 
              size={36} 
              color="#ffffff" 
            />
          </View>
        </View>
        
        <Text className="text-white text-lg font-extrabold mt-4 tracking-tight">
          {nfcState === 'granted' ? 'Access Granted' : 'Hold Near Reader'}
        </Text>
        <Text className="text-slate-500 text-xs mt-1 text-center px-8">
          {nfcState === 'granted' ? 'Welcome back, Berat' : 'Align your phone with the office terminal'}
        </Text>
      </View>

      {/* Corporate Access Pass */}
      <Animated.View 
        style={animatedCardStyle}
        className="w-full bg-slate-900 rounded-t-[40px] px-8 pt-8 pb-16 items-center shadow-2xl border-t border-slate-800"
      >
        <View className="w-12 h-1 bg-slate-700 rounded-full mb-10" />

        {/* Realistic Interactive Pass Canvas */}
        <View className={`w-full aspect-[1.58/1] rounded-3xl p-6 relative overflow-hidden bg-slate-950 border ${
          nfcState === 'granted' 
            ? 'border-emerald-500/80 shadow-lg shadow-emerald-500/20' 
            : 'border-slate-800'
        }`}>
          {/* Subtle design geometry layout elements */}
          <View className="absolute -right-16 -bottom-16 w-52 h-52 bg-primary/5 rounded-full" />
          <View className="absolute -left-10 -top-10 w-32 h-32 bg-slate-800/10 rounded-full" />

          {/* Glare Sheen Flash overlay element */}
          <Animated.View 
            style={[StyleSheet.absoluteFill, animatedSheen]} 
            className="w-20 bg-white/10 opacity-60"
          />

          {/* Card Headings */}
          <View className="flex-row justify-between items-start z-10">
            <View>
              <Text className="text-white text-lg font-black tracking-wider leading-none">Endava</Text>
              <Text className="text-primary text-[9px] font-bold uppercase tracking-widest mt-1">
                Senior Developer
              </Text>
            </View>
            <View className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl">
              <IconSymbol name="cpu" size={20} color="#ff5640" />
            </View>
          </View>

          {/* Card Footnotes */}
          <View className="mt-auto flex-row justify-between items-end z-10">
            <View>
              <Text className="text-white font-extrabold text-base tracking-wide">Berat Sulimani</Text>
              <Text className="text-slate-500 text-[10px] font-medium tracking-widest mt-0.5">
                ID: #88241 • SYSTEMS ENG
              </Text>
            </View>
            <View className="bg-primary p-2.5 rounded-2xl">
              <IconSymbol name="shield.fill" size={18} color="#ffffff" />
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}