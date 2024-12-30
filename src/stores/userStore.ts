// "use client"
import { create } from "zustand";
import { CardBlogProps } from "./blogStore";
import { useCookie } from "@/hooks/useCookie";

// export const useUserStore = create((set) => ({

export interface userStore {
  user: CardBlogProps[];
  isLoading: boolean;
  error: string | null;
  fetchuser: () => Promise<void>;
}

const userStore = create<userStore>((set) => {
  // const { getCookie } = useCookie({
  //   key: "authToken",
  //   days: 7,
  //   defaultValue: "",
  // });

  // const token = getCookie();

  const fetchuser = async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/user", {
        // headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data: CardBlogProps[] = await response.json();
      set({ user: data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  };

  // Immediately fetch blogs upon store initialization
  fetchuser();

  return {
    user: [],
    isLoading: false,
    error: null,
    fetchuser,
  };
});

export default userStore;
