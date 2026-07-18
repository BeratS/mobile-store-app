// hooks/useInitializeUsers.ts
import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { useUsersQuery } from "./useUsersQuery";

export const useFetchInitialize = (isLoggedIn: boolean) => {
  const { data, ...query } = useUsersQuery(isLoggedIn);
  const setUsers = useUserStore((state) => state.setUsers);

  useEffect(() => {
    if (!isLoggedIn) return
    if (data) {
      setUsers(data);
    }
  }, [data, isLoggedIn, setUsers]);

  return query;
};