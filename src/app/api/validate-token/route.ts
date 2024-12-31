import jwt from "jsonwebtoken";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    // Read the token from the Authorization header
    const token = req.headers.get("Authorization")?.split(" ")[1]; // Assuming "Bearer <token>"

    if (!token) {
      console.error("Token is missing");
      return new Response(JSON.stringify({ message: "Token is required" }), {
        status: 400,
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not set");
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    console.log("Decoded token:", decoded);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { blogs: true },
    });

    if (!user) {
      console.error("User not found with id:", decoded.id);
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const sessionToken = jwt.sign({ id: user.id }, secret, { expiresIn: "7d" });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.session.upsert({
      where: { token },
      create: { userId: user.id, token: sessionToken, expiresAt },
      update: { expiresAt },
    });

    return new Response(
      JSON.stringify({ message: "Session updated", user, sessionToken }),
      { status: 200 }
    );
  } catch (error:any) {
    console.error("Error during token validation:", error);
    const message =
      error.name === "JsonWebTokenError" || error.name === "TokenExpiredError"
        ? "Invalid or expired token"
        : "Internal server error";
    return new Response(JSON.stringify({ message }), {
      status: error.name === "JsonWebTokenError" ? 401 : 500,
    });
  }
}


