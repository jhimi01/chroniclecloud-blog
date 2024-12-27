import db from '@/lib/db';
// app/api/blogs/[id]/route.ts

import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Example: Assuming `db` is your database client and you have a `blogs` table or collection
    const blog = await db.blogPost.findUnique({
      where: {
        id, // Finding the blog by `id`
      },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
