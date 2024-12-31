import jwt from "jsonwebtoken";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    // Fetch the user and include blogs
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        blogs: true, // Include all blogs associated with the user
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Create or update session
    const sessionToken = jwt.sign(
      { id: user.id },
      secret,
      { expiresIn: "7d" } // Optional: You can set a different expiration for the session token
    );

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

    // Upsert session (create if not exists, otherwise update)
    await prisma.session.upsert({
      where: { token },
      create: {
        // userEmail: user.email,
        userId: user.id,
        token: sessionToken,
        expiresAt,
      },
      update: {
        expiresAt,
      },
    });

    // Return all user data, including blogs
    return new Response(
      JSON.stringify({
        message: "Session updated",
        user,
        sessionToken,
      }),
      { status: 200 }
    );
  } catch (error: any) {
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
