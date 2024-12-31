"use client";
import BlogSection from "@/components/BlogSection";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import useBlogStore from "@/stores/blogStore";
import { userStore } from "@/stores/userStore";
export default function Home() {

  const userInfo = userStore((state) => state.userInfo);
  console.log("userInfo from home", userInfo)

  const { blogs } = useBlogStore()
  console.log(blogs)


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
