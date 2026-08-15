import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Strict Protection for Admin Routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Explicit server-side role check
    if (token.role !== "admin") {
      const unauthorizedUrl = new URL("/admin/login", req.url);
      unauthorizedUrl.searchParams.set("error", "AccessDenied");
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  // 2. Attach Strict Security Headers
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(self)");

  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
