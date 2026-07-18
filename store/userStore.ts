import { create } from "zustand";

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface IUserStore {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));