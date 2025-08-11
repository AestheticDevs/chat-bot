import { prisma } from "@/lib/prisma";
import { API_URL } from "@/lib/shared";
import { markdownToHtml } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { message, id_collection, session_id } = body;

  const chatSession = await prisma.chat_session.findFirst({
    where: {
      id: session_id,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        take: 20,
      },
    },
  });

  const history: { question: string; answer: string; date: string }[] = [];
  let pendingQuestion: { message: string; date: string } | null = null;

  for (const msg of chatSession?.messages ?? []) {
    const dateStr = msg.createdAt.toISOString().replace("T", " ").slice(0, 19);

    if (msg.sender === "user") {
      // Start a new Q
      pendingQuestion = { message: msg.message, date: dateStr };
    } else if (msg.sender === "bot" && pendingQuestion) {
      // Pair the bot reply with the last Q
      history.push({
        question: pendingQuestion.message,
        answer: msg.message,
        date: pendingQuestion.date, // or dateStr if you want bot's time
      });
      pendingQuestion = null;
    }
  }
  // console.log("Received message:", message, id_collection);
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      id_collection: id_collection,
      vector_store: "qdrant",
      chat_memory: {
        id_cookie: session_id,
        history,
      },
    }),
  });
  console.log(
    {
      message,
      id_collection: id_collection,
      vector_store: "qdrant",
      chat_memory: {
        id_cookie: session_id,
        history,
      },
    },
  );

  if (!res.ok) {
    return NextResponse.json({
      status: "error",
      message: "Failed to retrieve answer",
    });
  }

  const data = await res.json();
  const answerHtml = await markdownToHtml(data.answer);
  const answer = data.answer || "No answer found";

  await prisma.chat_message.createMany({
    data: [
      {
        sessionId: session_id,
        sender: "user",
        message: message,
      },
      {
        sessionId: session_id,
        sender: "bot",
        message: answer,
      },
    ],
  });

  const response = new Response(
    JSON.stringify({
      status: "success",
      message: "Answer retrieved successfully",
      result: {
        answer,
        answerHtml,
        message,
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // allow all origins
      },
    },
  );
  return response;
}

export async function GET(req: Request) {}

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
