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
  role: string;
  blogs: Blog[];
}

interface UserStore {
  userInfo: User | null;
  allUsers: User[]; // New state for storing all users
  setUserInfo: (userInfo: User | null) => void;
  fetchUserInfo: (token: string) => Promise<void>;
  fetchAllUsers: (token: string) => Promise<void>; // New method to fetch all users
  logout: () => void;
}

export const userStore = create<UserStore>((set) => ({
  userInfo: null,
  allUsers: [],

  setUserInfo: (userInfo) => set({ userInfo }),

  fetchUserInfo: async (token) => {
    if (!token) {
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
      set({ userInfo: userData }); // Store user data in Zustand store
    } catch (error) {
      console.error("Error fetching user info:", error);
      set({ userInfo: null });
    }
  },
  fetchAllUsers: async (token) => {
    if (!token) {
      console.log("No token found.");
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch all users", await res.text());
        return;
      }

      const data = await res.json();
      set({ allUsers: data.users }); // Store all users in Zustand store
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  },

  logout: () => set({ userInfo: null }),
}));
