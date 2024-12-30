import jwt from "jsonwebtoken";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, username: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error("Token validation error:", error);
    const message =
      error.name === "JsonWebTokenError" || error.name === "TokenExpiredError"
        ? "Invalid or expired token"
        : "Internal server error";

    return new Response(JSON.stringify({ message }), {
      status: error.name === "JsonWebTokenError" ? 401 : 500,
    });
  }
}
