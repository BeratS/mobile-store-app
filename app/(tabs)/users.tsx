import { useUserStore } from "@/store/userStore";
import { ScrollView, Text, View } from "react-native";

export default function UsersScreen() {
  const users = useUserStore((state) => state.users);

  return (
    // Outer canvas responds to system appearance: plain light background shifts to a modern deep slate
    <View className="flex-1 p-4 bg-white dark:bg-slate-950">
      <Text className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
        Users
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {users.map((user) => (
          <View
            key={user.id}
            className="mb-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50"
          >
            <Text className="text-lg font-semibold text-slate-900 dark:text-white">
              {user.name}
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
              {user.email}
            </Text>
            <Text className="text-slate-400 dark:text-slate-500 text-xs mt-1 font-medium tracking-wide">
              @{user.username}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}