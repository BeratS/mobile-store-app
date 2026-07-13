import { IconSymbol } from '@/components/ui/icon-symbol';
import { Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-white dark:bg-darkBg px-6 pt-12 items-center">
      <Text className="text-slate-900 dark:text-lightText text-2xl font-bold self-start mb-8">Digital Corporate Card</Text>

      {/* Enterprise Security Access Smart Card */}
      <View className="w-full bg-slate-900 dark:bg-cardBg aspect-[1.58/1] rounded-2xl p-6 shadow-xl relative overflow-hidden mb-8">
        <View className="absolute -right-16 -bottom-16 w-48 h-48 bg-primary/10 rounded-full" />
        
        <View className="flex-row justify-between items-start mb-6">
          <View>
            <Text className="text-white text-xl font-black uppercase tracking-wider">ACME CORP</Text>
            <Text className="text-primary text-xs font-bold uppercase tracking-widest mt-0.5">Enterprise Staff</Text>
          </View>
          <IconSymbol name="cpu" size={28} color="#ff5640" />
        </View>

        <View className="mt-auto flex-row justify-between items-end">
          <View>
            <Text className="text-white text-lg font-bold">Alex Mercer</Text>
            <Text className="text-slate-400 dark:text-mutedText text-xs">Product Engineering • ID: #88241</Text>
          </View>
          <View className="bg-white p-2 rounded-lg">
            <IconSymbol name="shield.fill" size={40} color="#192b37" />
          </View>
        </View>
      </View>

      {/* Security Credentials info */}
      <View className="w-full bg-slate-50 dark:bg-cardBg/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <Text className="text-slate-500 dark:text-mutedText text-center text-xs leading-relaxed">
          🛡️ Biometrically encrypted with Device FaceID / Fingerprint. Revocable via enterprise dashboard MDM console.
        </Text>
      </View>
    </View>
  );
}