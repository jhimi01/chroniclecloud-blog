import React from "react";
import { Skeleton } from "./ui/skeleton";
import CardBlog from "./CardBlog";
import LeftSideber from "./LeftSideber";
import useBlogStore from "@/stores/blogStore";

export default function BlogSection() {
  const { blogs } = useBlogStore();

  return (
    <div className="flex container mx-auto mt-20">
      <div className="w-full   p-7 bg-accent md:w-9/12 space-y-5 md:space-y-7 md:mr-5">
        <div className="w-full bg-primary h-12 flex items-center pl-5 font-normal text-lg">
          <h2 className="text-white">Latest News</h2>
        </div>
        {blogs && blogs.length === 0 ? (
          <div className=" space-y-5 md:px-0 px-5 md:space-y-8">
            <Skeleton className="h-48 w-full bg-gray-300 rounded-none" />
            <Skeleton className="h-48 w-full bg-gray-300 rounded-none" />
            <Skeleton className="h-48 w-full bg-gray-300 rounded-none" />
          </div> // Show this when no blogs match search or when no blogs exist
        ) : (
          <div className="space-y-7">
            {blogs.slice(0, 4).map((blog, index: number) => (
              <CardBlog key={index} blog={blog} />
            ))}
          </div>
        )}
      </div>
      <div className="p-7 flex-1 bg-accent space-y-7 md:block hidden">
        <div className="w-full bg-primary h-12 flex items-center pl-5 font-normal text-lg">
          <h2 className="text-white">ShortCut</h2>
        </div>
        <div>
          <LeftSideber />
        </div>
      </div>
    </div>
  );
}
