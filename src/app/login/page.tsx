"use client";

import { useCookie } from "@/hooks/useCookie";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userinfo, setUserInfor] = useState("");
  const router = useRouter();
  
  const { fetchUserInfo, user, error } = useLoggedInUser();

  console.log("userinfo", user)

  console.log("user", userinfo)
  

  // jhimi123@

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
        setCookie(data.token);

        try {
          const userInfo = await fetchUserInfo(data.token);
          console.log("Logged-in user info:", userInfo);
          setUserInfor(userInfo);
        } catch (fetchError) {
          console.error("Error fetching user info:", fetchError.message);
        }

        alert("Login successful!");
        router.push("/");
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
        if (res.status === 404) {
          window.location.href = "/signup";
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
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
                are you new here?
                &nbsp;
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
