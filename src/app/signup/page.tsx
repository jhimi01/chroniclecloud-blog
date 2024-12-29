"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define schema with Zod
const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(1, "Name is required"),
    username: z
      .string()
      .min(4, "username must be at least 4 characters")
      .regex(/\d{2}/, "Username must include at least one two-digit number"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "at least one special character"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Signup successful! You can now log in.");
        router.push("/login");
      } else {
        const errorData = await res.json();
        alert(`Signup error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className=" mt-5">
       <div>
       <CardTitle className="text-center text-2xl font-semibold mb-4">Sign up</CardTitle>
      <Card className="w-full mx-auto max-w-md rounded-none">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="pt-5">
              <Label htmlFor="email" className="text-lg">Email</Label>
              <Input
                id="email"
                type="email"
                className="rounded-none"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.email.message)}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <Label className="text-lg" htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                className="rounded-none"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.name.message)}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <Label className="text-lg" htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                className="rounded-none"
                placeholder="Choose a username"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.username.message)}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label className="text-lg" htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="rounded-none"
                placeholder="Create a password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label className="text-lg" htmlFor="confirmPassword">Re-type</Label>
              <Input
                id="confirmPassword"
                type="password"
                className="rounded-none"
                placeholder="Re-type your password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.confirmPassword.message)}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full rounded-none">
              Sign up
            </Button>

            {/* Login Link */}
            <div className="text-center text-sm mt-2">
              <p>
                Already have an account?{" "}
                <Link href="/login" className="text-secondary underline">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
       </div>
    </div>
  );
}
