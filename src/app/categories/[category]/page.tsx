import LeftSideber from "@/components/LeftSideber";
import { Skeleton } from "@/components/ui/skeleton";
import { PrismaClient } from "@prisma/client";
import {
  CalendarDays,
  CircleUserRound,
  ChevronRight,
  ThumbsUp,
  File,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const prisma = new PrismaClient();

async function fetchCategoryBlogs(category: string) {
  const blogs = await prisma.blogPost.findMany({
    where: { category },
  });
  return blogs;
}
async function fetchsession() {
  const users = await prisma.session.findMany({});
  return users;
}

fetchsession();
console.log(fetchsession());

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const blogs = await fetchCategoryBlogs(category);

  if (blogs && blogs.length === 0) {
    return (
      <div className="md:flex gap-5 mt-10 container mx-auto">
        <div className="md:w-[70%] space-y-5 md:px-0 px-5 md:space-y-8">
          <Skeleton className="h-48 w-full bg-gray-300 rounded-none" />
          <Skeleton className="h-48 w-full bg-gray-300 rounded-none" />
          <Skeleton className="h-48 w-full bg-gray-300 rounded-none" />
        </div>
        <div className="md:w-[30%] hidden md:block">
          <Skeleton className="h-[600px] bg-gray-300 rounded-none" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8">
      <div className="flex gap-6">
        <div className="md:w-[75%] w-full md:px-0 px-5 space-y-5">
          {blogs && blogs.length === 0 ? (
            <p>No blogs found for this category.</p>
          ) : (
            <div className="space-y-2">
              {blogs?.map((blog) => (
                <div
                  key={blog.id}
                  className="hover:bg-accent  border bg-accent md:bg-transparent "
                >
                  <div className="md:flex gap-2">
                    <Image
                      width={800}
                      height={800}
                      src={blog?.image}
                      alt="blog post"
                      className=" md:w-48"
                      priority
                    />
                    <div className="space-y-2 md:space-y-3 p-5 w-full my-2 md:my-0">
                      <h2 className="md:text-2xl text-xl hover:text-secondary text-black">
                        {blog.title}
                      </h2>
                      <div className="md:flex gap-4">
                        <div className="flex text-gray-400 items-center gap-1 text-sm">
                          <CalendarDays size={16} strokeWidth={1.75} />
                          {/* Format the date here */}
                          <p>{new Date(blog.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex text-gray-400 items-center gap-1 text-sm">
                          <File size={16} strokeWidth={1.75} />
                          <p>{blog.category}</p>
                        </div>
                        <div className="flex text-gray-400 items-center gap-1 text-sm">
                          <ThumbsUp size={16} strokeWidth={1.75} />
                          <p>{blog.likes}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-base text-gray-600">{blog?.desc}</p>
                      </div>
                      <hr />
                      <div className="md:flex justify-between text-gray-400">
                        <h3 className="text-sm flex items-center gap-1">
                          <CircleUserRound size={16} strokeWidth={1.75} />{" "}
                          {blog?.userEmail}
                        </h3>
                        <Link
                          className="text-secondary text-sm font-semibold flex items-center"
                          href={`/blogs/${blog.id}`}
                        >
                          Read More
                          <ChevronRight size={16} strokeWidth={2} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* leftsidebar */}
        <div className="w-[25%] border hidden md:block">
          <div className="w-full bg-primary h-12 flex items-center pl-5 font-normal text-lg">
            <h2 className="text-white">ShortCut</h2>
          </div>
          <LeftSideber blogsCategory={blogs} />
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
    </div>
  );
}
