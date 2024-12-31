"use client";

import { useCookie } from "@/hooks/useCookie"; // if you're planning to store the token in cookies
import { userStore } from "@/stores/userStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setCookie } = useCookie({
    key: "authToken", // Set the key for the cookie (can be 'token' or something else)
    days: 7, // Expiration in days
    defaultValue: "", // Default value if the cookie doesn't exist
  });

  // Access setUserInfo function from Zustand store
  const setUserInfo = userStore((state) => state.setUserInfo);
// jhimi123@
// tanha123@
// rimi123@


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
        if (res.status === 404) {
          router.push("/signup");
        }
        return;
      }

      const data = await res.json();
      const { token } = data;

      if (token) {
        setCookie(token); // Set the token in the cookie

        const userInfo = await fetchUserInfo(token); // Fetch the user info
        setUserInfo(userInfo);
        console.log("userInfo", userInfo) // Update Zustand store with user info
        alert("Login successful!");
        router.push("/"); // Redirect to home or dashboard
      } else {
        alert("Login failed. No token received.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchUserInfo = async (token: string) => {
    const res = await fetch("/api/validate-token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ensure token is passed as a Bearer token
      },
    });
  
    if (!res.ok) {
      console.error("Error response:", await res.text());
      throw new Error("Failed to fetch user info");
    }
    return res.json();
  };
  
  
  

  return (
    <div className="mt-5">
      <div>
        <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
        <div className="max-w-md mx-auto p-6 border rounded-none shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-primary w-full text-white py-2 px-4 rounded-none"
            >
              Login
            </button>
            <div>
              <p className="text-sm">
                are you new here? &nbsp;
                <Link href="/signup" className="underline text-secondary ">
                  signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
