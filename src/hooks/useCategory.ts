import { useState } from "react";

type User = {
  id: string | number;
  name: string;
  username: string;
  email: string;
  created_at?: string;
};

export default function useCategory() {
  const [category, setCategory] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (categoryName: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/blogpost?category=${categoryName}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setCategory(data);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // return { category, loading, error, refetch: fetchUsers };
}
