// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

// Allow a partial mapping: we only map a subset of SF Symbol names to Material icons
type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
type IconMapping = Record<string, MaterialIconName>;
type IconSymbolName = keyof typeof MAPPING | (string & {});

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: IconMapping = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  calendar: 'event',
  'bubble.left.and.bubble.right.fill': 'chat',
  'person.badge.key.fill': 'badge',
  'shield.fill': 'shield',
  'car.fill': 'directions-car',
  'monitor.fill': 'desktop-windows',
  'light.down.fill': 'light-mode',
  'dark.mode.fill': 'dark-mode',
  sparkles: 'auto-awesome',
  cpu: 'memory',
  'bag.fill': 'shopping-bag',
  'laptop': 'laptop',
  'chair': 'chair',
  'table': 'table-restaurant',
  'clock.fill': 'access-time',
  'announcement.fill': 'campaign',
  'bell.fill': 'notifications',
  'flame.fill': 'local-fire-department'
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color = '',
  style = {},
  className = '',
}: {
  name: IconSymbolName;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
  className?: string;
}) {
  const mappedName = MAPPING[name] ?? 'help-outline';

  return <MaterialIcons color={color} size={size} name={mappedName} style={style} className={className || ''} />;
}
