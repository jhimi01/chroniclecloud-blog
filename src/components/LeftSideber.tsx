"use client";
import useBlogStore from "@/stores/blogStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { userStore } from "@/stores/userStore";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function LeftSideber({
  blogsCategory,
}: {
  blogsCategory?: any;
}) {
  const { blogs } = useBlogStore();
  const pathname = usePathname();
  const userInfo = userStore((state) => state.userInfo);
  const categoryFromPathname = pathname.split("/")[2];
  const categories = [
    { type: "fashion" },
    { type: "technology" },
    { type: "travel" },
    { type: "photography" },
    { type: "health" },
  ];

  const contentId = pathname.split("/")[2];
  const findDataById = blogs.find((blog) => blog.id === contentId);
  const categoryData = findDataById?.category;
  // console.log("category ", categoryData);

  const reletedfilteredBlogs = blogs.filter(
    (blog) => blog.category === categoryData && blog.id !== contentId
  );

  return (
    <>
      {/* for desktop */}
      <div className="p-3 md:block hidden bg-white">
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
              {userInfo?.blogs && userInfo.blogs.length >= 0 ? (
                <div className="space-y-3">
                  {userInfo.blogs.map((content, index) => (
                    <Link
                      key={index}
                      href="/blogs/id"
                      className="flex px-2 flex-row gap-1 hover:shadow-lg bg-accent cursor-pointer"
                    >
                      <Image
                        height={500}
                        width={500}
                        priority
                        alt="related contents"
                        className="h-14 w-14"
                        src={content?.image}
                      />
                      <h3>{content?.title}</h3>
                    </Link>
                  ))}
                </div>
              ) : (
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
                          priority
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
      <div className="mt-5 bg-white">
            <div className="w-full bg-primary h-12 flex items-center pl-5 font-normal text-lg">
              <h2 className="text-white">Social Links</h2>
            </div>
            <div className="p-3">
              <ul className="mt-3 space-y-3 text-white text-lg">
                <li className="p-2 cursor-pointer  flex justify-between bg-blue-500 ">
                  <Facebook /> | Link our page
                </li>
                <li className="p-2 cursor-pointer flex justify-between bg-cyan-500 ">
                  <Twitter /> | Follow US
                </li>
                <li className="p-2 cursor-pointer flex justify-between bg-red-500 ">
                  <Youtube /> | Subscribe
                </li>
                <li className="p-2 cursor-pointer flex justify-between bg-pink-500 ">
                  <Instagram /> | Follow
                </li>
              </ul>
            </div>
          </div>
    </>
  );
}
