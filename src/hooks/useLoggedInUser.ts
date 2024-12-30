import { useState } from "react";

export function useLoggedInUser() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchUserInfo(token: string) {
    try {
      const response = await fetch("/api/validate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(message);
        throw new Error(message);
      }

      const { user } = await response.json();
      setUser(user);
      return user;
    } catch (err) {
      console.log("Error fetching user info:", err);
      setError(err.message);
      throw err;
    }
  }

  return { user, error, fetchUserInfo };
}
