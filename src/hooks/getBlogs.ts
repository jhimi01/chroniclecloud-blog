
import { useState, useEffect } from "react";

type User = {
  id: string | number;
  name: string;
  username: string;
  email: string;
  created_at?: string; // Optional if it might be undefined
};

export default function useBlogs() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/blogpost");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array to fetch data on mount

  return { users, loading, error, refetch: fetchUsers };
}


// return { users, setUsers };