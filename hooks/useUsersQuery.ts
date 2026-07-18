import { IUser } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async (): Promise<IUser[]> => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

export const useUsersQuery = (enabled: boolean) =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
    enabled
  });