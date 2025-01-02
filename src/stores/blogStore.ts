import { create } from "zustand";

export interface CardBlogProps {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  desc: string;
  likes: number;
  userEmail: string;
  userId: string;
  image: string;
}

// Define types for the store state
export interface BlogStore {
  blogs: CardBlogProps[];
  isLoading: boolean;
  error: string | null;
  fetchBlogs: () => Promise<void>;
}

const useBlogStore = create<BlogStore>((set) => {
  const fetchBlogs = async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/blogpost");
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data: CardBlogProps[] = await response.json();
      set({ blogs: data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  };

  // Immediately fetch blogs upon store initialization
  fetchBlogs();

  return {
    blogs: [],
    isLoading: false,
    error: null,
    fetchBlogs,
  };
});

export default useBlogStore;
