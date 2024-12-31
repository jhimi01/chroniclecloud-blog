import jwt from "jsonwebtoken";
import prisma from "@/lib/db";

export async function GET(req: any) {
  try {
    // Step 1: Check if token exists in the Authorization header
    const token = req.headers.get("Authorization")?.split(" ")[1]; // Assuming "Bearer <token>"
    
    if (!token) {
      return new Response(JSON.stringify({ error: "Token is required" }), { status: 401 });
    }

    // Step 2: Verify the token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not set");
      return new Response(JSON.stringify({ error: "JWT_SECRET is not defined" }), { status: 500 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    } catch (err) {
      console.error("Error verifying token:", err);
      return new Response(JSON.stringify({ error: "Invalid or expired token" }), { status: 401 });
    }

    // Step 3: Fetch data with userId (from decoded token)
    const userId = decoded.id; // Assuming the token contains userId
    const loggedinUser = await prisma.session.findMany({
      where: {
        userId: userId, // Only fetch loggedinUser for the specific user
      },
    });

    // Step 4: Return the data
    return new Response(JSON.stringify(loggedinUser), { status: 200 });

  } catch (err) {
    console.error("Error fetching loggedinUser:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch loggedinUser" }), { status: 500 });
  }
}
