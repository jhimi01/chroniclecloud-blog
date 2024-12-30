"use client";
import BlogSection from "@/components/BlogSection";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { useCookie } from "@/hooks/useCookie";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
export default function Home() {
//  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

// const { user } = useUser()
// console.log("user", user)

  return (
    <div>
      <div>
        <Hero />
      </div>
      <div>
        <BlogSection />
      </div>
      <Testimonials />
    </div>
  );
}
