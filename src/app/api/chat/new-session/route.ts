import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path as needed

export async function POST(req: Request) {
  try {
    const { name, email, collectionId } = await req.json();

    if (!name || !email || !collectionId) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Name and email are required.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // allow all origins
          },
        },
      );
    }

    const agent = await prisma.agents.findFirst({
      where: { id_collection: collectionId },
    });

    if (!agent) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Agent not found",
        }),
        {
          status: 422,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // allow all origins
          },
        },
      );
    }

    const userAgent = req.headers.get("user-agent") || null;

    const session = await prisma.chat_session.create({
      data: {
        name,
        email,
        agentId: agent.id,
        userAgent,
      },
    });

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Chat session created.",
        result: session,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // allow all origins
        },
      },
    );
  } catch (err) {
    console.error("[CREATE_CHAT_SESSION]", err);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to create chat session.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // allow all origins
        },
      },
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // allow all origins
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
