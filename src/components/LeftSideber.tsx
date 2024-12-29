"use client";
import useBlogStore from "@/stores/blogStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function LeftSideber({
  blogsCategory,
}: {
  blogsCategory?: any;
}) {
  const { blogs } = useBlogStore();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const categoryFromPathname = pathname.split("/")[2];
  const categories = [
    { type: "fashion" },
    { type: "technology" },
    { type: "travel" },
    { type: "photography" },
    { type: "health" },
  ];

  const mycontetnts = [
    {
      author: "alexanderlee@example.com",
      title: "Traveling on a Budget",
      image: "/img/bg3.jpg",
      date: "2024-11-15",
      category: "Travel",
      desc: "Learn how to explore the world without breaking the bank with these budget travel hacks.",
      likes: 200,
    },
    {
      author: "emilywhite@example.com",
      title: "The Power of Minimalism",
      image: "/img/bg2.jpg",
      date: "2024-10-10",
      category: "Lifestyle",
      desc: "Understand how embracing minimalism can lead to a happier and more focused life.",
      likes: 150,
    },
    {
      author: "michaelbrown@example.com",
      title: "Mastering JavaScript in 2024",
      image: "/img/bg5.jpg",
      date: "2024-09-30",
      category: "Programming",
      desc: "An in-depth guide to improving your JavaScript skills and staying ahead in 2024.",
      likes: 320,
    },
  ];

  const contentId = pathname.split("/")[2];
  const findDataById = blogs.find((blog) => blog.id === contentId);
  const categoryData = findDataById?.category;
  // console.log("category ", categoryData);

  const reletedfilteredBlogs = blogs.filter(
    (blog) => blog.category === categoryData && blog.id !== contentId
  );

  console.log("category contents", reletedfilteredBlogs);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      {/* for desktop */}
      <div className="p-3 md:block hidden bg-white">
        <div className="input-container mt-3 mx-auto">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            name="text"
            className="input placeholder:text-gray-500"
            placeholder="Search blog"
          />
          <span className="icon">
            <svg
              width="19px"
              height="19px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  opacity="1"
                  d="M14 5H20"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  opacity="1"
                  d="M14 8H17"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                  stroke="#000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  opacity="1"
                  d="M22 22L20 20"
                  stroke="#000"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </span>
        </div>

        {/* category */}
        <div className="mt-8 text-slate-500">
          <h2 className="mb-1 px-2 text-xl">Categories</h2>

          <div>
            {categories?.map((category, index) => (
              <Link key={index} href={`/categories/${category.type}`}>
                <div
                  key={index}
                  className={` hover:bg-slate-200 cursor-pointer ${
                    index !== categories.length - 1
                      ? "border-b border-gray-300"
                      : ""
                  }`}
                >
                  <div
                    className={`flex flex-row items-center px-2 justify-between py-2 ${
                      category?.type === categoryFromPathname &&
                      "bg-gray-300 text-gray-700"
                    }`}
                  >
                    <h5 className="capitalize">{category?.type}</h5>
                    {/* <h5>({categories?.length})</h5> */}
                  </div>

                  {categories && categories.length == index - 1 ? <hr /> : ""}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* shortcut content */}
        {pathname == "/" ? (
          <div className="mt-8 text-slate-500">
            <h2 className="mb-1 px-2 text-xl ">My Contents</h2>

            <div>
              {mycontetnts && mycontetnts?.length !== 0 ? (
                <div>
                  <h3 className="p-2 bg-accent text-slate-400">
                    No content available
                  </h3>
                  <div className=" space-y-2 md:px-0 px-5">
                    <Skeleton className="h-10 w-full bg-gray-300 rounded-none" />
                    <Skeleton className="h-10 w-full bg-gray-300 rounded-none" />
                    <Skeleton className="h-10 w-full bg-gray-300 rounded-none" />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {mycontetnts?.map((content, index) => (
                    <Link
                      key={index}
                      href="/blogs/id"
                      className="flex px-2 flex-row gap-1 hover:shadow-lg bg-accent cursor-pointer"
                    >
                      <Image
                        height={500}
                        width={500}
                        alt="related contents"
                        className="h-14 w-14"
                        src={content?.image}
                      />
                      <h3>{content?.title}</h3>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-8 text-slate-500">
            <h2 className="mb-1 px-2 text-xl ">Related Contents</h2>
            <div className="space-y-3">
              {(blogsCategory?.length ?? 0) > 0 ||
              (reletedfilteredBlogs?.length ?? 0) > 0 ? (
                <div className="space-y-3 px-2">
                  {(blogsCategory || reletedfilteredBlogs)?.map(
                    (content: any, index: number) => (
                      <Link
                        key={index}
                        href={`/blogs/${content.id}`}
                        className="flex  items-center flex-row gap-1 hover:shadow-lg bg-accent cursor-pointer"
                      >
                        <Image
                          height={500}
                          width={500}
                          alt="related content"
                          className="h-14 w-14"
                          src={content?.image || "/placeholder.jpg"}
                        />
                        <h3 className="truncate w-full">{content?.title}</h3>
                      </Link>
                    )
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="p-2 bg-accent text-slate-400">
                    No content available
                  </h3>
                  <div className="space-y-2 px-5">
                    <Skeleton className="h-10 w-full bg-gray-300 rounded-none" />
                    <Skeleton className="h-10 w-full bg-gray-300 rounded-none" />
                    <Skeleton className="h-10 w-full bg-gray-300 rounded-none" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* for mobile */}
      <div className="fixed md:hidden border-t border-gray-400 bottom-0 w-full left-0 py-3 px-5 bg-gray-200 z-50">
        <p className="text-gray-600">this is a mobile nav</p>
      </div>
    </>
  );
}
