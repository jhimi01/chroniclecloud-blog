"use client";

import SideNavLayout from "./sidenav/layout";
import CardBlog from "@/components/CardBlog";
import Hero from "@/components/Hero";
import LeftSideber from "@/components/LeftSideber";
import useBlogStore, { CardBlogProps } from "@/stores/blogStore";

export default function Home() {
  const { blogs, isLoading, error } = useBlogStore();



  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  // const displayBlogs = searchTerm ? filteredBlogs() : blogs;

  return (
    // <SideNavLayout>
 <div>
<Hero />
<div className="flex">
        <div className="w-full md:w-[80%] space-y-5 md:space-y-7 md:mr-5">
        {blogs.length === 0 ? (
            <h2 className="text-center text-2xl font-semibold">No value available</h2> // Show this when no blogs match search or when no blogs exist
          ) : (
            <div className="space-y-3">
              {blogs.map((blog: CardBlogProps, index: number) => (
                <CardBlog key={index} {...blog} />
              ))}
            </div>
          )}
        </div>
        <div>
          <LeftSideber />
        </div>
      </div>

 </div>
    // {/* </SideNavLayout> */}
  );
}
