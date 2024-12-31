"use client";
import { useCookie } from "@/hooks/useCookie";
 // Import the custom hook
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface User {
  name: string;
  email: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const { getCookie } = useCookie({
    key: "authToken",
    days: 7,
    defaultValue: "",
  });

 // To get the auth token from cookies
  const router = useRouter();

  useEffect(() => {
    const token = getCookie(); // Assuming the token is stored in the cookie

    if (!token) {
      router.push("/login"); // Redirect to login if no token is found
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await fetch("/api/validate-token", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Send token in the Authorization header
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.error);
          return;
        }

        const userData = await res.json();
        setUser(userData); // Store user data to display in the profile page
      } catch (err) {
        setError("An error occurred while fetching the profile.");
      }
    };

    fetchUserProfile();
  }, [router]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  console.log("user", user)

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      {/* Render more user data */}
    </div>
  );
}
