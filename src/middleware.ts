import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret",
);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  let isValid = false;

  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      isValid = true;
      console.log("DEBUG: Token valid");
    } catch (err) {
      console.log("DEBUG: Token invalid/expired:", err);
    }
  }

  if (!isValid && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isValid && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
