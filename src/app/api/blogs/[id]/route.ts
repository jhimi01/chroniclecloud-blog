import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params; // Access `id` from params

  try {
    const blog = await prisma.blogPost.findUnique({
      where: { id }, // Finding the blog by `id`
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
