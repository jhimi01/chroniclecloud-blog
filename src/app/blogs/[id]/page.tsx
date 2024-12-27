import SideNavLayout from "@/app/sidenav/layout";
import LeftSideber from "@/components/LeftSideber";
import {
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  File,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Blog() {
  const blog = {
    author: "janesmith@example.com",
    title: "10 Tips for Healthy Eating",
    image: "/img/bg5.jpg",
    date: "2024-12-20",
    category: "Health",
    desc: "Discover simple yet effective tips to maintain a healthy diet in your busy life.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati omnis, fuga sed excepturi sapiente unde ab sequi nisi. Ex totam quo id labore voluptate numquam at itaque, tenetur consequatur ipsum illum odio, officiis ad est? Iusto amet, voluptate tempora itaque et laboriosam delectus, esse officia nam at sed eligendi obcaecati ea quis minima excepturi inventore rerum! Mollitia magni facere molestiae!",
    likes: 85,
  };

  return (
    <SideNavLayout>
      <div className="flex md:pr-0 pr-5 ">
        <div className="my-4 space-y-3 md:space-y-5 md:w-[80%]">
          <h2 className="text-2xl md:text-5xl font-serif">{blog?.title}</h2>
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
              <ThumbsUp
                className="cursor-pointer"
                size={22}
                strokeWidth={1.75}
              />
              <p>{blog?.likes}</p>
            </div>
          </div>
        </div>

        {/* sidebar */}

        <LeftSideber />
      </div>
    </SideNavLayout>
  );
}
