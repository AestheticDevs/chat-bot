import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

function getTokenFromCookies(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
  return match ? match[1] : null;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const collectionId = (await params).id;

  const data = await prisma.agents.findFirst({
    where: {
      id_collection: collectionId,
    },
    include: {
      setting: true
    }
  });

  const response = new Response(
    JSON.stringify({
      status: "success",
      message: "",
      result: data,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    },
  );
  return response;
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function DELETE(req: Request, { params }: { params: any }) {
  try {
    const token = getTokenFromCookies(req.headers.get("cookie"));
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.id as string;

    // Gunakan params.id, tidak perlu req.json()
    const deletedAgent = await prisma.agents.deleteMany({
      where: {
        id: Number(params.id),
        owner_id: Number(userId),
      },
    });

    if (deletedAgent.count === 0) {
      return NextResponse.json(
        { error: "Agent not found or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Agent deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
