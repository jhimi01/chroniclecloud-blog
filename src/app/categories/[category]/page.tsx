import useCategory from "@/hooks/useCategory"; // Optional, for refetch in Client Component
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fetchCategoryBlogs(category: string) {
  const blogs = await prisma.blogPost.findMany({
    where: { category },
  });
  return blogs;
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const blogs = await fetchCategoryBlogs(params.category);

  if (blogs.length === 0) {
    return <p>No blogs found for this category.</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Category: {params.category}</h1>
      <div className="grid gap-4 mt-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="p-4 border rounded">
            <h2 className="text-lg font-semibold">{blog.title}</h2>
            <p>{blog.desc}</p>
            <small>
              By {blog.author} on {new Date(blog.date).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
