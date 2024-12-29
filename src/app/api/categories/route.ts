// import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

// const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category } = req.query;

  if (req.method === "GET") {
    try {
      if (category) {
        const blogs = await prisma.blogPost.findMany({
          where: { category: String(category) },
        });
        return res.status(200).json(blogs);
      }

      const allBlogs = await prisma.blogPost.findMany();
      return res.status(200).json(allBlogs);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching blogs" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
