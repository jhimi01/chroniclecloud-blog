"use client";

import { create } from "zustand";

interface User {
  name: string;
  email: string;
  blogs: [];
}

interface UserStore {
  userInfo: User | null;
  setUserInfo: (userInfo: User | null) => void;
  fetchUserInfo: (token: string) => Promise<void>;
}

export const userStore = create<UserStore>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),

  fetchUserInfo: async (token) => {
    try {
      const res = await fetch("/api/validate-token", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the Authorization header
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch user info");
        set({ userInfo: null });
        return;
      }

      const userData: User = await res.json();
      set({ userInfo: userData }); // Store user data in the Zustand store
    } catch (error) {
      console.error("Error fetching user info:", error);
      set({ userInfo: null });
    }
  },
}));
