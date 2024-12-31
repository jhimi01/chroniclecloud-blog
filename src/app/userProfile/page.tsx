"use client";

import { useCookie } from "@/hooks/useCookie"; // Import the custom hook
import { userStore } from "@/stores/userStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const { getCookie } = useCookie({
    key: "authToken",
    days: 7,
    defaultValue: "",
  });

  const router = useRouter();
  const userInfo = userStore((state) => state.userInfo);
  const fetchUserInfo = userStore((state) => state.fetchUserInfo);

  console.log("userInfo", userInfo)

  useEffect(() => {
    const token = getCookie();
    if (!token) {
      router.push("/login"); // Redirect to login if no token is found
      return;
    }

    // Fetch user info using Zustand store
    fetchUserInfo(token);
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome, {userInfo.name}</h2>
      <p>Email: {userInfo.email}</p>
      {/* Render more user data */}
    </div>
  );
}
