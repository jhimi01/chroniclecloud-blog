"use client";
import BlogSection from "@/components/BlogSection";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { useCookie } from "@/hooks/useCookie";
import useUser from "@/hooks/useUser";
import { userStore } from "@/stores/userStore";
import { useEffect, useState } from "react";
export default function Home() {

  const userInfo = userStore((state) => state.userInfo);
  console.log("userInfo", userInfo)


  return (
    <div>
      <div>
        <Hero />
      </div>
      <div></div>
      <div>
        <BlogSection />
      </div>
      <Testimonials />
    </div>
  );
}
