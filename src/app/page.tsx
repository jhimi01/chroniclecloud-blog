"use client";

import CardBlog from "@/components/CardBlog";
import Hero from "@/components/Hero";
import LeftSideber from "@/components/LeftSideber";
import useCategory from "@/hooks/useCategory";
import useBlogStore, { CardBlogProps } from "@/stores/blogStore";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Home() {
  const { blogs, isLoading, error } = useBlogStore();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    // <SideNavLayout>
    <div>
      <Hero />
      <div>
        <div className="flex container mx-auto mt-20">
          <div className="w-full  p-7 bg-accent md:w-9/12 space-y-5 md:space-y-7 md:mr-5">
            <div className="w-full bg-primary h-12 flex items-center pl-5 font-normal text-lg">
              <h2 className="text-white">Latest News</h2>
            </div>
            {blogs.length === 0 ? (
              <h2 className="text-center text-2xl font-semibold">
                No value available
              </h2> // Show this when no blogs match search or when no blogs exist
            ) : (
              <div className="space-y-7">
                {blogs.map((blog: CardBlogProps, index: number) => (
                  <CardBlog key={index} {...blog} />
                ))}
              </div>
            )}
          </div>
          <div className="p-7 bg-accent space-y-7">
            <div className="w-full bg-primary h-12 flex items-center pl-5 font-normal text-lg">
              <h2 className="text-white">ShortCut</h2>
            </div>
            <div className=" md:block hidden">
              <LeftSideber />
              <div className="mt-5 bg-white">
                <div className="w-full bg-primary h-12 flex items-center pl-5 font-normal text-lg">
                  <h2 className="text-white">Social Links</h2>
                </div>
                <div className="p-3">
                  <ul className="mt-3 space-y-3 text-white text-lg">
                    <li className="p-2 cursor-pointer  flex justify-between bg-blue-500 "><Facebook /> | Link our page</li>
                    <li className="p-2 cursor-pointer flex justify-between bg-cyan-500 "><Twitter  /> | Follow US</li>
                    <li className="p-2 cursor-pointer flex justify-between bg-red-500 "><Youtube /> | Subscribe</li>
                    <li className="p-2 cursor-pointer flex justify-between bg-pink-500 "><Instagram /> | Follow</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // {/* </SideNavLayout> */}
  );
}
