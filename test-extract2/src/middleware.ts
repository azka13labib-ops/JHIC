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
      if (pathname === "/login" || pathname === "/cp/login") {
        if (token && token.role === "admin") {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        const rewriteRes = NextResponse.rewrite(new URL(`/cp/login${search}`, req.url));
        addSecurityHeaders(rewriteRes, true);
        return rewriteRes;
      }

      // 1.2. Root '/' on CP Subdomain
      if (pathname === "/" || pathname === "/cp") {
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
      const cleanPath = pathname.replace(/^\/cp/, "");
      const targetUrl = new URL(`/cp${cleanPath}${search}`, req.url);
      const response = NextResponse.rewrite(targetUrl);
      addSecurityHeaders(response, true);
      return response;
    }

    // 2. Legacy / Admin Routes accessed on Main Domain -> Redirect to CP domain
    if (pathname.startsWith("/x9j2k4m7") || pathname.startsWith("/admin")) {
      const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
      const targetDomain = isLocal ? "http://cp.localhost:3000" : "https://cp.smaspgri1lumajang.sch.id";
      return NextResponse.redirect(new URL(`${targetDomain}/login`));
    }

    // 3. Fallback /cp direct path on main domain (useful for dev and fallback)
    if (pathname.startsWith("/cp")) {
      if (pathname !== "/cp/login" && token?.role !== "admin") {
        const loginUrl = new URL("/cp/login", req.url);
        loginUrl.searchParams.set("error", "AccessDenied");
        return NextResponse.redirect(loginUrl);
      }
      if (pathname === "/cp/login" && token && token.role === "admin") {
        return NextResponse.redirect(new URL("/cp/dashboard", req.url));
      }
      const response = NextResponse.next();
      addSecurityHeaders(response, true);
      return response;
    }

    // 4. Public Web Pages
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
          if (pathname === "/login" || pathname === "/cp/login" || pathname === "/" || pathname === "/cp") {
            return true;
          }
          return !!token;
        }

        // On Main domain: /cp/login is public, other /cp routes require auth
        if (pathname.startsWith("/cp")) {
          if (pathname === "/cp/login") {
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
