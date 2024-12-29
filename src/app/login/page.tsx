"use client";

import { useCookie } from "@/hooks/useCookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { setCookie } = useCookie({
    key: "authToken",
    days: 7,
    defaultValue: "",
  });

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

      if (res.ok) {
        const data = await res.json();
        // Set the token using the useCookie hook
        setCookie(data.token);
        alert("Login successful!");
        router.push("/");
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
        // Redirect to the signup page if the user is not found
        if (res.status === 404) {
          window.location.href = "/signup"; // Redirect to signup page
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-20">
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
          <Link href="/signup" className="underline text-secondary text-xs">
            are you new here? signup
          </Link>
        </div>
      </form>
    </div>
    </div>
    
    </div>
  );
}
