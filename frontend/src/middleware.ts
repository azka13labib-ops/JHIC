import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // 1. Explicit server-side role check for admin routes
    if (pathname.startsWith("/x9j2k4m7") && pathname !== "/x9j2k4m7/login") {
      if (token?.role !== "admin") {
        const unauthorizedUrl = new URL("/x9j2k4m7/login", req.url);
        unauthorizedUrl.searchParams.set("error", "AccessDenied");
        return NextResponse.redirect(unauthorizedUrl);
      }
    }

    // 1.5. Prevent logged-in users from accessing the login page
    if (pathname === "/x9j2k4m7/login") {
      if (token && token.role === "admin") {
        return NextResponse.redirect(new URL("/x9j2k4m7/dashboard", req.url));
      }
    }

    const response = NextResponse.next();
    
    // 2. Attach Strict Security Headers
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(self)");

    // 3. Prevent Back-Forward Cache (bfcache) on protected routes
    if (pathname.startsWith("/x9j2k4m7")) {
      response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      response.headers.set("Pragma", "no-cache");
      response.headers.set("Expires", "0");
    }

    return response;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // If it's a protected route, require a token. Otherwise, allow.
        if (req.nextUrl.pathname.startsWith("/x9j2k4m7") && req.nextUrl.pathname !== "/x9j2k4m7/login") {
          return !!token;
        }
        return true;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
);

// Match all routes except internal Next.js static assets and media files
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
