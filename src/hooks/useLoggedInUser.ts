// hooks/useLoggedInUser.ts
import { useCookie } from "@/hooks/useCookie"; // Assuming useCookie is a custom hook
import { useEffect, useState } from "react";

// Function to fetch logged-in user data
const fetchLoggedInUser = async (token: string) => {
  try {
    const res = await fetch("/api/loginuser", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("Error response:", await res.text());
      throw new Error("Failed to fetch logged-in user data");
    }

    const loggedInUser = await res.json();
    return loggedInUser;
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    return null; // Return null in case of error
  }
};

export const useLoggedInUser = () => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const { getCookie } = useCookie({
    key: "authToken",
    days: 7,
    defaultValue: "",
  });

  const token = getCookie(); // Get the token from the cookie

  useEffect(() => {
    const getUserData = async () => {
      if (token) {
        const data = await fetchLoggedInUser(token);
        setLoggedInUser(data); // Set the user data in the state
      }
    };

    // Only fetch user data when token is available
    if (token) {
      getUserData();
    }
  }, [token]); // Dependency array to run only when token changes

  return { loggedInUser, loading: loggedInUser === null };
};
