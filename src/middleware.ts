import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Retrieve the token from the cookies
  const token = req.cookies.get("authToken")?.value;
  const url = req.nextUrl;

  // If no token is found and the user is not already on the login/signup page
  if (!token && url.pathname !== "/login" && url.pathname !== "/signup") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If the user is authenticated, prevent access to login/signup pages
  if (token && (url.pathname === "/login" || url.pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Specify which paths should use this middleware
export const config = {
  matcher: ["/blogs/upload-blog"],
};