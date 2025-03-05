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

    console.log("tokennnnnnnnn", token)
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
        const errorText = await res.text();
        console.error("Failed to fetch all users:", errorText);
        // Handle unauthorized access (401 or 403)
        if (res.status === 403) {
          console.log("Access denied. Admins only.");
        }
        return;
      }

      const data = await res.json();
      if (data?.users) {
        set({ allUsers: data.users }); // Store all users in Zustand store
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  },

  logout: () => set({ userInfo: null }),
}));
