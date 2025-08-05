import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path as needed

export async function POST(req: Request) {
  try {
    const { name, email, agentId } = await req.json();

    if (!name || !email || !agentId) {
      return NextResponse.json(
        { status: "error", message: "Name and email are required." },
        { status: 400 },
      );
    }

    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || null;

    const session = await prisma.chatSession.create({
      data: {
        name,
        email,
        agentId: agentId,
        ipAddress: ip,
        userAgent,
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Chat session created.",
        result: session,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[CREATE_CHAT_SESSION]", err);
    return NextResponse.json(
      { status: "error", message: "Failed to create chat session." },
      { status: 500 },
    );
  }
}
