import { create } from "zustand";

const useBlogStore = create((set) => {
  const fetchBlogs = async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/blogpost");
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      set({ blogs: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  };

  const addBlog = async (newBlog) => {
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

      const savedBlog = await response.json();
      set((state) => ({ blogs: [...state.blogs, savedBlog] }));
    } catch (error) {
      set({ error: error.message });
    }
  };

  const updateBlog = async (id, updatedBlog) => {
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

      const updatedData = await response.json();
      set((state) => ({
        blogs: state.blogs.map((blog) => (blog.id === id ? updatedData : blog)),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  };

  const deleteBlog = async (id) => {
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
      set({ error: error.message });
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
