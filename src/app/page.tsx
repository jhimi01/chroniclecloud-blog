"use client";

import CardBlog from "@/components/CardBlog";
import Hero from "@/components/Hero";
import LeftSideber from "@/components/LeftSideber";
import useCategory from "@/hooks/useCategory";
import useBlogStore, { CardBlogProps } from "@/stores/blogStore";

export default function Home() {
  const { blogs, isLoading, error } = useBlogStore();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    // <SideNavLayout>
    <div>
      <Hero />
      <div className="flex container mx-auto py-10">
        <div className="w-full md:w-9/12 space-y-5 md:space-y-7 md:mr-5">
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
        <div>
          <LeftSideber />
        </div>
      </div>
    </div>
    // {/* </SideNavLayout> */}
  );
}
