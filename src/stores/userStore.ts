// stores/userStore.ts

import { create } from "zustand";

interface UserStore {
  userInfo: any;  // You can replace `any` with a more specific type
  setUserInfo: (userInfo: any) => void;
}

export const userStore = create<UserStore>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }), // Correctly updating userInfo state
}));
