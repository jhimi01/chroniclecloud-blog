"use client";

import BlogSection from "@/components/BlogSection";
import CardBlog from "@/components/CardBlog";
import Hero from "@/components/Hero";
import LeftSideber from "@/components/LeftSideber";
import Testimonials from "@/components/Testimonials";
import { Skeleton } from "@/components/ui/skeleton";
import useCategory from "@/hooks/useCategory";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import useBlogStore, { CardBlogProps } from "@/stores/blogStore";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Home() {
  const { blogs, isLoading, error } = useBlogStore();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  
  return (
    // <SideNavLayout>
    <div>
    <div>
    <Hero />
    </div>
      <div>
      <BlogSection  />
      </div>

      <Testimonials />
    </div>
    // {/* </SideNavLayout> */}
  );
}
