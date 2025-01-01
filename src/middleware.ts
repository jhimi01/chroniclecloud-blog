import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of protected routes
const protectedRoutes = ["/blogs/upload-blog", "/userProfile", "/settings"]; // Add paths you want to protect

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  // If the user tries to access a protected route without a token
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) && !token) {
    // Redirect to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Define the routes where the middleware should apply
export const config = {
  matcher: ["/blogs/upload-blog", "/userProfile", "/settings/:path*"], // Adjust to match your protected routes
};
