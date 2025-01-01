import jwt from "jsonwebtoken";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  try {
    // Step 1: Get the token from the Authorization header
    const token = req.headers.get("Authorization")?.split(" ")[1]; // "Bearer <token>"

    if (!token) {
      return new Response(JSON.stringify({ error: "Token is required" }), {
        status: 401,
      });
    }

    // Step 2: Verify the token using the JWT_SECRET
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return new Response(
        JSON.stringify({ error: "JWT_SECRET is not defined" }),
        { status: 500 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 401 }
      );
    }

    // Step 3: Use the decoded userId to fetch the user's session and profile data
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { blogs: true }, // Include related blogs if needed
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    console.log("user info of logged in user", user);

    // Step 4: Return the user data
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Error fetching user profile" }),
      { status: 500 }
    );
  }
}
