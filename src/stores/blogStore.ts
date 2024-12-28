import { create } from "zustand";

// Define types for the blog data
// Assuming you have something like this for CardBlogProps
// export interface CardBlogProps {
//   id: string;
//   title: string;
//   content: string;
//   date: string;
//   category: string;
//   desc: string; // Add missing prop 'desc'
//   likes: number;
//   author: string;
//   image: string; // Add missing prop 'image'
// }
// blogStore.ts

export interface CardBlogProps {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  desc: string;
  likes: number;
  author: string;
  image: string;
}

// Define types for the store state
interface BlogStore {
  blogs: CardBlogProps[];
  isLoading: boolean;
  error: string | null;
  fetchBlogs: () => Promise<void>;
  addBlog: (newBlog: CardBlogProps) => Promise<void>;
  updateBlog: (id: string, updatedBlog: CardBlogProps) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
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

  const addBlog = async (newBlog: CardBlogProps) => {
    try {
      const response = await fetch("/api/blogpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        throw new Error("Failed to add blog");
      }

      const savedBlog: CardBlogProps = await response.json();
      set((state) => ({ blogs: [...state.blogs, savedBlog] }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  };

  const updateBlog = async (id: string, updatedBlog: CardBlogProps) => {
    try {
      const response = await fetch(`/api/blogpost/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlog),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      const updatedData: CardBlogProps = await response.json();
      set((state) => ({
        blogs: state.blogs.map((blog) => (blog.id === id ? updatedData : blog)),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      const response = await fetch(`/api/blogpost/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      set((state) => ({
        blogs: state.blogs.filter((blog) => blog.id !== id),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  };

  // Immediately fetch blogs upon store initialization
  fetchBlogs();

  return {
    blogs: [],
    isLoading: false,
    error: null,
    fetchBlogs,
    addBlog,
    updateBlog,
    deleteBlog,
  };
});

export default useBlogStore;