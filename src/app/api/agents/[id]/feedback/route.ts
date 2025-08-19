import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkToken } from "@/lib/token";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // ambil cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // check cookie
    const payload = await checkToken(token.value);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // ambil id dari param
    const agentId = params.id;

    // ambil search query
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const skip = (page - 1) * limit;

    // select dengan pagination
    const [feedbacks, total] = await Promise.all([
      prisma.feedback.findMany({
        where: {
          session: {
            agentId: parseInt(agentId),
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.feedback.count({
        where: {
          session: {
            agentId: parseInt(agentId),
          },
        },
      }),
    ]);

    return NextResponse.json(
      {
        data: feedbacks,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
