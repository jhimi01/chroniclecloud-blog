import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    // Check for the Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Authorization header is missing" },
        { status: 401 }
      );
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Invalid token format" },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = verifyToken(token); // Replace with your token verification logic
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

       // Check if the user has the ADMIN role
       if (decoded.role !== 'ADMIN') {
        return NextResponse.json(
          { success: false, message: 'Access denied. Admins only.' },
          { status: 403 },
        );
      }

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
