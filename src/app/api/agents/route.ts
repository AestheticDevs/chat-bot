import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

function getTokenFromCookies(
  cookieHeader: string | null,
): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
  return match ? match[1] : null;
}

export async function GET(req: Request) {
  try {
    const token = getTokenFromCookies(req.headers.get("cookie"));

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verifikasi token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = Number(payload.id);

    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Ambil agents
    const agents = await prisma.agents.findMany({
      where: { owner_id: userId },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(agents);
  } catch (error: any) {
    console.error("API Error (GET agents):", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    // Ambil token dari cookies
    const token = getTokenFromCookies(req.headers.get("cookie"));
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verifikasi token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.id as string; // id dari token

    const body = await req.json();
    const { name, description, system_prompt } = body;

    // Insert ke table agents
    const newAgent = await prisma.agents.create({
      data: {
        name,
        description,
        system_prompt,
        is_active: true,
        owner_id: Number(userId),
      },
    });

    return NextResponse.json(newAgent);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
