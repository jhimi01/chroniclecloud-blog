import prisma from "@/lib/db";

export async function Delete(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return new Response(JSON.stringify({ message: "Blog ID is required." }), {
        status: 400,
      });
    }

    const blog = await prisma.blogPost.findUnique({
      where: {
        id,
      },
    });
    if (!blog) {
      return new Response(JSON.stringify({ message: "Blog post not found." }), {
        status: 404,
      });
    }

    await prisma.blogPost.delete({
      where: {
        id,
      },
    });

    return new Response(
      JSON.stringify({ message: "Blog post deleted successfully." }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Error deleting blog post:", err);
    return new Response(
      JSON.stringify({
        message: "Failed to delete blog post.",
      }),
      { status: 500 }
    );
  }
}
