// src/store/useLoadingStore.ts
import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  toggleLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (value) => set({ isLoading: value }),
  toggleLoading: () => set((state) => ({ isLoading: !state.isLoading })),
}));
