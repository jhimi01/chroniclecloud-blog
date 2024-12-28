import {
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  File,
  PersonStanding,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Profiler } from "react";

interface CardBlogProps {
  id: string;
  title: string;
  date: string;
  category: string;
  desc: string;
  likes: number;
  author: string;
  image: string;
}

export default function CardBlog({
  id,
  title,
  date,
  category,
  desc,
  likes,
  author,
  image,
}: CardBlogProps) {
  return (
    <div className="hover:bg-accent bg-accent md:bg-transparent hover:shadow-md w-11/12 mr-auto md:w-full">
     {/* <Link href={`/blogs/${id}`} > */}
     <div className="md:flex gap-5 ">
        <Image
          width={800}
          height={800}
          src={'/img/bg.jpg'}
          alt="blog post"
          className="w-48 h-48"
        />
        <div className="space-y-2 md:space-y-3 p-5 w-full my-2 md:my-0">
          <h2 className=" md:text-2xl text-xl text-black">{title}</h2>
          <div className="md:flex gap-4">
            <div className="flex text-gray-400 items-center gap-1 text-sm">
              <CalendarDays size={16} strokeWidth={1.75} className="" />
              <p>{date}</p>
            </div>
            <div className="flex text-gray-400 items-center gap-1 text-sm">
              <File size={16} strokeWidth={1.75} />
              <p>{category}</p>
            </div>
            <div className="flex text-gray-400 items-center gap-1 text-sm">
              <ThumbsUp size={16} strokeWidth={1.75} />
              <p>{likes}</p>
            </div>
          </div>
          <div>
            <p className="text-base text-gray-600">{desc}</p>
          </div>
          <hr />
          <div className="md:flex justify-between  text-gray-400">
            <h3 className="text-sm flex items-center gap-1">
              <CircleUserRound size={16} strokeWidth={1.75} /> {author}
            </h3>
            <Link
              className="text-[#1eafed] text-sm font-semibold flex items-center"
              href={`/blogs/${id}`}
            >
              Read More
              <ChevronRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    {/* </Link> */}
     </div>
  );
}
