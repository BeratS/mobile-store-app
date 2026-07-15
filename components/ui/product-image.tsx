import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

interface ProductImageProps {
  imageUri?: string;
  iconName: any;
  size?: number;
}

export function ProductImageOrIcon({ imageUri, iconName, size = 22 }: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  // Reset error state if the image URI changes dynamically
  useEffect(() => {
    setImageError(false);
  }, [imageUri]);

  if (imageUri && !imageError) {
    return (
      <Image
        source={{ uri: imageUri }}
        className="w-full h-full rounded-2xl"
        resizeMode="cover"
        onError={() => setImageError(true)} // Handle broken link fallback dynamically
      />
    );
  }

  // Fallback Icon Frame
  return (
    <View className="w-full h-full items-center justify-center">
      <IconSymbol name={iconName} size={size} color="#ff5640" />
    </View>
  );
}