import prisma from "@/lib/db";

// const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Parse the incoming request body (blog post data)
    const { title, userEmail, userId, category, desc, file } = await req.json();

    if (!title || !userEmail || !category || !desc || !file) {
      return new Response(
        JSON.stringify({ message: "All fields are required." }),
        { status: 400 }
      );
    }

    // Create the blog post
    const newBlogPost = await prisma.blogPost.create({
      data: {
        title,
        image: file, // Assuming file is the image URL
        category,
        desc,
        userEmail,
        userId, // Email of the author
      },
    });

    return new Response(
      JSON.stringify({ message: "Blog posted successfully.", newBlogPost }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating blog post:", error);

    return new Response(
      JSON.stringify({
        message: "Error creating blog post.",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
