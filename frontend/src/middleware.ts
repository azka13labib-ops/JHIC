import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const { pathname, search } = req.nextUrl;
    const host = req.headers.get("host") || "";
    const token = req.nextauth.token;

    // Detect if this request is on the CP subdomain (e.g. cp.smaspgri1lumajang.sch.id or cp.localhost:3000)
    const isCpHost = host.startsWith("cp.") || host.includes("cp.localhost");

    // 1. CP Subdomain Routing
    if (isCpHost) {
      // 1.1. Login Route on CP Subdomain
      if (pathname === "/login" || pathname === "/admin/login") {
        if (token && token.role === "admin") {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        const rewriteRes = NextResponse.rewrite(new URL(`/admin/login${search}`, req.url));
        addSecurityHeaders(rewriteRes, true);
        return rewriteRes;
      }

      // 1.2. Root '/' on CP Subdomain
      if (pathname === "/" || pathname === "/admin") {
        if (token && token.role === "admin") {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        } else {
          return NextResponse.redirect(new URL("/login", req.url));
        }
      }

      // 1.3. Role check for all other routes on CP Subdomain
      if (token?.role !== "admin") {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("error", "AccessDenied");
        return NextResponse.redirect(loginUrl);
      }

      // 1.4. Authenticated admin routes on CP Subdomain
      const cleanPath = pathname.replace(/^\/admin/, "");
      const targetUrl = new URL(`/admin${cleanPath}${search}`, req.url);
      const response = NextResponse.rewrite(targetUrl);
      addSecurityHeaders(response, true);
      return response;
    }

    // 2. Fallback /admin direct path on main domain (useful for dev and fallback)
    if (pathname.startsWith("/admin")) {
      if (pathname !== "/admin/login" && token?.role !== "admin") {
        const loginUrl = new URL("/admin/login", req.url);
        loginUrl.searchParams.set("error", "AccessDenied");
        return NextResponse.redirect(loginUrl);
      }
      if (pathname === "/admin/login" && token && token.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      const response = NextResponse.next();
      addSecurityHeaders(response, true);
      return response;
    }

    // 3. Public Web Pages
    const response = NextResponse.next();
    addSecurityHeaders(response, false);
    return response;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        const host = req.headers.get("host") || "";
        const isCpHost = host.startsWith("cp.") || host.includes("cp.localhost");

        // Static files and assets are open
        if (pathname.startsWith("/_next") || pathname.startsWith("/api/auth") || pathname.includes(".")) {
          return true;
        }

        // On CP Subdomain: /login and / are handled in middleware function
        if (isCpHost) {
          if (pathname === "/login" || pathname === "/admin/login" || pathname === "/" || pathname === "/admin") {
            return true;
          }
          return !!token;
        }

        // On Main domain: /admin/login is public, other /admin routes require auth
        if (pathname.startsWith("/admin")) {
          if (pathname === "/admin/login") {
            return true;
          }
          return !!token;
        }

        // Public site is open
        return true;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
);

function addSecurityHeaders(response: NextResponse, isCpRoute: boolean) {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(self)");

  if (isCpRoute) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
