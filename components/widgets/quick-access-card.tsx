import IconSymbol from '@/components/ui/icon-symbol';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

// Wrap Pressable with Animated to allow scaling
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface IProps {
  title: string;
  description: string;
  iconName: 'shield.fill' | 'car.fill' | 'bag.fill' | 'calendar';
  iconColor: string;
  badgeText: string;
  badgeVariant: 'emerald' | 'blue' | 'primary';
  onPress?: () => void;
}

export function QuickAccessCard({
  title,
  description,
  iconName,
  iconColor,
  badgeText,
  badgeVariant,
  onPress,
}: IProps) {
  
  // 1. Shared value to track scale state
  const scale = useSharedValue(1);

  // 2. Animated style to apply spring scale
  const animatedScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    // Quickly scale down to 95% on press down
    scale.value = withSpring(0.95, { damping: 10, stiffness: 300 });
  };

  const handlePressOut = () => {
    // Spring back to 100% on release
    scale.value = withSpring(1, { damping: 10, stiffness: 300 });
  };

  const badgeStyles = {
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-500' },
    primary: { bg: 'bg-primary/10', text: 'text-primary' },
  }[badgeVariant];

  return (
    <AnimatedPressable 
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedScaleStyle}
      // Using Tailwind classes for sizing and borders
      className="w-64 bg-slate-100 dark:bg-cardBg p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 mr-4 shadow-sm"
    >
      <View className="flex-row justify-between items-start mb-4">
        {/* Render color variant for the icon background frame */}
        <View style={{ backgroundColor: `${iconColor}15` }} className="p-3 rounded-xl">
          <IconSymbol name={iconName} size={24} color={iconColor} />
        </View>
        
        {/* Status Badge */}
        <View className={`${badgeStyles.bg} px-2 py-1 rounded-md`}>
          <Text className={`${badgeStyles.text} font-extrabold text-[9px] uppercase tracking-wider`}>
            {badgeText}
          </Text>
        </View>
      </View>

      <Text className="text-slate-900 dark:text-lightText font-bold text-base">
        {title}
      </Text>
      <Text className="text-slate-500 dark:text-mutedText text-xs mt-1" numberOfLines={2}>
        {description}
      </Text>
    </AnimatedPressable>
  );
}