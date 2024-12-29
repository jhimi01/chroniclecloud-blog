"use client";
import SideNavLayout from "@/app/sidenav/layout";
import LeftSideber from "@/components/LeftSideber";
import { use, useEffect, useState } from "react";
import {
  CalendarDays,
  CircleUserRound,
  Facebook,
  File,
  Instagram,
  ThumbsUp,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { CardBlogProps } from "@/stores/blogStore";

export default function Blog({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [blog, setBlog] = useState<CardBlogProps | null>(null);

  useEffect(() => {
    async function fetchBlogData() {
      const response = await fetch(`/api/blogs/${id}`);
      if (!response.ok) {
        console.error("Blog not found");
        return;
      }
      const data = await response.json();
      setBlog(data);
    }
    fetchBlogData();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    // <SideNavLayout>
    <div className="flex md:pr-0 pr-5 container mx-auto">
      <div className="my-4 space-y-3 md:space-y-5 md:w-[80%]">
        <h2 className="text-2xl md:text-5xl ">{blog?.title}</h2>
        <p className="text-gray-500 text-xs md:text-base ">{blog?.desc}</p>
        <div className="md:flex gap-4 text-gray-400">
          <h3 className="text-sm flex items-center gap-1">
            <CircleUserRound size={16} strokeWidth={1.75} /> {blog?.author}
          </h3>
          <div className="flex  items-center gap-1 text-sm">
            <CalendarDays size={16} strokeWidth={1.75} className="" />
            <p>{blog?.date}</p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <File size={16} strokeWidth={1.75} />
            <p>{blog?.category}</p>
          </div>
        </div>
        <Image
          src={blog?.image}
          alt="Picture of the author"
          width={500}
          height={500}
          sizes="100vw"
          className="md:w-[98%] "
          priority
        />

        <div className="text-gray-400 ">
          <div className="flex text-gray-600 items-center gap-1 text-sm">
            <ThumbsUp className="cursor-pointer" size={22} strokeWidth={1.75} />
            <p>{blog?.likes}</p>
          </div>
        </div>
      </div>

      {/* sidebar */}
      <div className="border">
        <div className="w-full bg-primary h-12 flex items-center pl-5 font-normal text-lg">
          <h2 className="text-white">ShortCut</h2>
        </div>
        <LeftSideber />
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
      </div>
    </div>
    // {/* </SideNavLayout> */}
  );
}
