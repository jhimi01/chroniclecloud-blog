import prisma from "@/lib/db";

export async function GET(req: any) {
    try{
      const blogs = await prisma.blogPost.findMany();
      return new Response(JSON.stringify(blogs))
    } catch (err) {
        console.error("error fetching blogs:", err)
        return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
    }
}