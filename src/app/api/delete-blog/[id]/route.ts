import prisma from "@/lib/db";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // Await the params promise

    if (!id) {
      return new Response(
        JSON.stringify({ message: "Blog ID is required." }),
        { status: 400 }
      );
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({ message: "Blog deleted successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete blog." }),
      { status: 500 }
    );
  }
}
