import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid"; // For generating secure session tokens

export async function POST(req: any) {
  try {
    const { email, password } = await req.json();

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Check for JWT_SECRET
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email},
      secret,
      { expiresIn: "7d" }
    );

    // Create a session in the database
    const sessionToken = uuidv4(); // Generate a unique session token
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Session valid for 7 days

    await prisma.session.create({
      data: {
        userId: user.id,
        token: sessionToken,
        expiresAt,
      },
    });

    // Return the JWT token and session token to the client
    return new Response(
      JSON.stringify({ token, sessionToken }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
