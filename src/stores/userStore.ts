import { create } from "zustand";

interface Blog {
  id: string;
  title: string;
  image: string;
  date: string;
  category: string;
  desc: string;
  likes: number;
}

interface User {
  name: string;
  email: string;
  id: string;
  blogs: Blog[];
}

interface UserStore {
  userInfo: User | null;
  setUserInfo: (userInfo: User | null) => void;
  fetchUserInfo: (token: string) => Promise<void>;
  logout: () => void;
}

export const userStore = create<UserStore>((set) => ({
  userInfo: null,

  setUserInfo: (userInfo) => set({ userInfo }),

  fetchUserInfo: async (token) => {
    if (!token) {
      // Token is not available, leave userInfo as null
      console.log("No token found.");
      return;
    }

    try {
      const res = await fetch("/api/validate-token", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        // Token is invalid or expired, clear user info
        console.error("Failed to fetch user info", await res.text());
        set({ userInfo: null });
        return;
      }

      const userData: User = await res.json();
      // console.log("Fetched user data:", userData);
      set({ userInfo: userData }); // Store user data in Zustand store
    } catch (error) {
      console.error("Error fetching user info:", error);
      set({ userInfo: null });
    }
  },

  logout: () => set({ userInfo: null }),
}));
