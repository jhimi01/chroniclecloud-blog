// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import prisma from "@/lib/db";

// export async function POST(req: any) {
//   try {
//     const { email, password } = await req.json();
//     console.log("Received data:", { email, password });

//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       console.warn("User not found for email:", email);
//       return new Response(JSON.stringify({ message: "User not found" }), {
//         status: 404,
//       });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       console.warn("Invalid password attempt for user:", email);
//       return new Response(
//         JSON.stringify({ message: "Invalid username or password" }),
//         { status: 401 }
//       );
//     }

//     const secret = process.env.JWT_SECRET;
//     if (!secret) {
//       console.error("JWT_SECRET environment variable is missing.");
//       throw new Error("JWT_SECRET is not defined in the environment variables");
//     }

//     const token = jwt.sign(
//       { id: user.id, username: user.username, email: user.email },
//       secret,
//       { expiresIn: "1h" }
//     );

//     console.log("Generated token:", token);

//     const session = await prisma.session.create({
//       data: {
//         userId: user.id,
//         token,
//         expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
//       },
//     });

//     console.log("Session created:", session);

//     return new Response(JSON.stringify({ token }), { status: 200 });
//   } catch (error) {
//     console.error("Login error:", error.message, error.stack);
//     return new Response(JSON.stringify({ message: "Internal server error" }), {
//       status: 500,
//     });
//   }
// }



import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: any) {
  try {
    const { email, password } = await req.json();

    // Find user by username
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
        JSON.stringify({ message: "Invalid username or password" }),
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
      { expiresIn: "1h" }
    );

    
    // const newsession = await prisma.session.create({
    //   data: {
    //     userId: user.id,
    //     token,
    //     expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    //   },
    // });



    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
