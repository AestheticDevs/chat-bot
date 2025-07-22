// src/app/api/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose"; // jose support edge

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false });
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "dev-secret",
    );
    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({
      loggedIn: true,
      user: payload,
    });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}
