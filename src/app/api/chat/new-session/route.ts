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

    const public_user = await prisma.public_users.findFirst({
      where: {
        email: email,
      },
    });

    const now = new Date();
    const endedAt = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      0,
    );

    if (!public_user) {
      const public_user = await prisma.public_users.create({
        data: {
          name: name,
          email: email,
        },
      });

      const session = await prisma.chat_session.create({
        data: {
          agentId: agent.id,
          publicUserId: public_user.id,
          endedAt: endedAt,
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
    }

    if (public_user) {
      const session = await prisma.chat_session.findFirst({
        where: {
          agentId: agent.id,
          publicUserId: public_user.id,
          endedAt: {
            gt: now,
          },
        },
      });

      if (!session) {
        const newSession = await prisma.chat_session.create({
          data: {
            agentId: agent.id,
            publicUserId: public_user.id,
            endedAt: endedAt,
          },
        });

        return new Response(
          JSON.stringify({
            status: "success",
            message: "Chat session created.",
            result: newSession,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*", // allow all origins
            },
          },
        );
      }

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
    }
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
