import { useUserStore } from "@/store/userStore";
import { FlatList, Text, View } from "react-native";

export default function UsersScreen() {
  const users = useUserStore((state) => state.users);

  return (
    <FlatList
      className="flex-1 bg-white dark:bg-slate-950"
      contentContainerStyle={{ padding: 16 }}
      data={users}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <Text className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
          Users
        </Text>
      }
      renderItem={({ item }) => (
        <View className="mb-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
          <Text className="text-lg font-semibold text-slate-900 dark:text-white">
            {item.name}
          </Text>
          <Text className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            {item.email}
          </Text>
          <Text className="text-slate-400 dark:text-slate-500 text-xs mt-1 font-medium tracking-wide">
            @{item.username}
          </Text>
        </View>
      )}
    />
  );
}