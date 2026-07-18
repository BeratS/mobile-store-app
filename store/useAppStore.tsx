import { create } from "zustand";

type AppState = {
  darkMode: boolean;
  biometricEnabled: boolean;
  toggleBiometric: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  darkMode: true,
  biometricEnabled: true,
  toggleBiometric: () => set((s) => ({ biometricEnabled: !s.biometricEnabled })),
}));