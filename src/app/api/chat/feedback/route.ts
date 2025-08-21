import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // atau ganti "*" dengan origin tertentu jika mau restriksi
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
  try {
    const { sessionId, messageId, rating, comment } = await req.json();

    if (!sessionId) {
      return new Response(
        JSON.stringify({ status: "error", message: "sessionId is required" }),
        { status: 400, headers: corsHeaders },
      );
    }

    const session = await prisma.chat_session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return new Response(
        JSON.stringify({ status: "error", message: "Chat session not found" }),
        { status: 404, headers: corsHeaders },
      );
    }

    const feedback = await prisma.feedback.upsert({
      where: { 
        sessionId: sessionId,
        messageId: messageId,
      },
      create: { sessionId, messageId, rating, comment },
      update: { rating, comment },
    });

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Feedback submited successfully",
        result: feedback,
      }),
      { status: 201, headers: corsHeaders },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ status: "error", message: "Internal Server Error" }),
      { status: 500, headers: corsHeaders },
    );
  }
}
