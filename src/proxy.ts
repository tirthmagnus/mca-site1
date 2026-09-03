import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Runs on every request. Sets security headers so they can't be
// forgotten on any individual route, and blocks the most common
// junk/scanner requests before they hit the app.
export function proxy(req: NextRequest) {
  const res = NextResponse.next();

  // Content-Security-Policy: only allow scripts/styles/connections we
  // actually use. Update this if you add new third-party domains
  // (a new pixel, a new widget) or the browser will silently block it.
  res.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://images.pexels.com https://www.facebook.com https://www.google-analytics.com",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
      "frame-ancestors 'none'",
    ].join("; ")
  );
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return res;
}

export const config = {
  matcher: "/:path*",
};
