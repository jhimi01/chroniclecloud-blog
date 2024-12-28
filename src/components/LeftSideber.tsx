"use client";
import useBlogs from "@/hooks/getBlogs";
import useBlogStore from "@/stores/blogStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type } from "node:os";
import React, { useState } from "react";

export default function LeftSideber() {
  const categories = [
    { type: "Fashion", amount: 6 },
    { type: "Technology", amount: 6 },
    { type: "Travel", amount: 8 },
    { type: "Photography", amount: 2 },
    { type: "Food", amount: 5 },
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
  const relatedcontetnts = [
    {
      author: "johndoe@example.com",
      title: "The Future of Web Development",
      image: "/img/bg.jpg",
      date: "2024-12-26",
      category: "Technology",
      desc: "Exploring the latest trends and predictions shaping the future of web development.",
      likes: 120,
    },
    {
      author: "janesmith@example.com",
      title: "10 Tips for Healthy Eating",
      image: "/img/bg5.jpg",
      date: "2024-12-20",
      category: "Health",
      desc: "Discover simple yet effective tips to maintain a healthy diet in your busy life.",
      likes: 85,
    },
  ];

  const [search, setSearch] = useState('');
  const pathname = usePathname();
  
  console.log(search)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

  };

  return (
    <>
      {/* for desktop */}
      <div className="border-l p-3 md:block hidden">
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
          <h2 className="mb-1 px-2 text-xl font-serif">Categories</h2>

          <div>
            {categories?.map((category, index) => (
              <div
                key={index}
                className={` px-2 hover:bg-slate-200 cursor-pointer ${
                  index !== categories.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <div className="flex flex-row items-center justify-between py-2">
                  <h5>{category?.type}</h5>
                  <h5>({category?.amount})</h5>
                </div>

                {categories.length == index - 1 ? <hr /> : ""}
              </div>
            ))}
          </div>
        </div>

        {pathname == "/" ? (
          <div className="mt-8 text-slate-500">
            <h2 className="mb-1 px-2 text-xl font-serif">My Contents</h2>

            <div>
              {mycontetnts?.length === 0 ? (
                <h3 className="px-2">No content</h3>
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
            <h2 className="mb-1 px-2 text-xl font-serif">Related Contents</h2>

            <div className="space-y-3">
              {mycontetnts?.length === 0 ? (
                <h3 className="px-2">No content</h3>
              ) : (
                <div className="space-y-3">
                  {relatedcontetnts?.map((content, index) => (
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
        )}
      </div>

      {/* for mobile */}
      <div className="fixed md:hidden border-t border-gray-400 bottom-0 w-full left-0 py-3 px-5 bg-gray-200 z-50">
        <p className="text-gray-600">this is a mobile nav</p>
      </div>
    </>
  );
}
