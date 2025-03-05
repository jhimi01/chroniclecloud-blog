import LeftSideber from "@/components/LeftSideber";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/db";
import {
  CalendarDays,
  CircleUserRound,
  ChevronRight,
  ThumbsUp,
  File,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Create a shared Prisma instance to avoid re-instantiating it

async function fetchCategoryBlogs(category: string) {
  const blogs = await prisma.blogPost.findMany({
    where: { category },
  });
  return blogs;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const availableCategories = await prisma.blogPost.findMany({
    select: { category: true },
    distinct: ['category'],
  });
  console.log("Available categories:", availableCategories);

  const blogs = await prisma.blogPost.findMany({
    where: { category },
  });


  if (!blogs) {
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
          {blogs.length === 0 ? (
            <div className="md:flex gap-5 mt-10 container mx-auto text-3xl text-gray-900 items-center justify-center">
              There is no blog post available
            </div>
          ) : (
            <div className="space-y-2">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="hover:bg-accent  border bg-accent md:bg-transparent "
                >
                  <div className="md:flex gap-2">
                    <Image
                      width={800}
                      height={800}
                      src={blog?.image || "/placeholder.jpg"} // Fallback image if no image exists
                      alt="blog post"
                      className="md:w-48"
                      priority
                    />
                    <div className="space-y-2 md:space-y-3 p-5 w-full my-2 md:my-0">
                      <h2 className="md:text-2xl text-xl hover:text-secondary text-black">
                        {blog.title}
                      </h2>
                      <div className="md:flex gap-4">
                        <div className="flex text-gray-400 items-center gap-1 text-sm">
                          <CalendarDays size={16} strokeWidth={1.75} />
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
        </div>
      </div>
    </div>
  );
}
