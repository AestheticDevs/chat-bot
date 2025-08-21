import { prisma } from "@/lib/prisma";
import { API_URL } from "@/lib/shared";
import { markdownToHtml } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // atau ganti "*" dengan origin tertentu jika mau restriksi
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

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
        take: 6,
      },
    },
  });

  const agent = await prisma.agents.findFirst({
    where: {
      id_collection: id_collection,
    },
    include: {
      setting: true,
    },
  });

  if (!chatSession) {
    return new Response(
      JSON.stringify({ status: "fail", message: "Session not found" }),
      {
        status: 200,
        headers: corsHeaders,
      },
    );
  }

  if (!agent) {
    return new Response(
      JSON.stringify({ status: "fail", message: "Agent not found" }),
      {
        status: 200,
        headers: corsHeaders,
      },
    );
  }

  if (!agent.setting) {
    return new Response(
      JSON.stringify({ status: "fail", message: "Setting not found" }),
      {
        status: 200,
        headers: corsHeaders,
      },
    );
  }

  const limitation = agent.setting.limitation;
  const usageLimit = agent.setting.usage_limit;
  const usageCount = chatSession.usageCount;

  if (limitation === true) {
    if (usageCount >= usageLimit) {
      return new Response(
        JSON.stringify({ status: "fail", message: "Exceeded limit" }),
        {
          status: 200,
          headers: corsHeaders,
        },
      );
    }
  }

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

  if (chatSession) {
    await prisma.chat_session.update({
      where: {
        id: chatSession.id,
      },
      data: {
        usageCount: chatSession.usageCount + 1,
      },
    });
  }

  if (!res.ok) {
    const data = await res.json();

    return NextResponse.json({
      status: "error",
      message: res,
      data: {
        message,
        id_collection: id_collection,
        vector_store: "qdrant",
        chat_memory: {
          id_cookie: session_id,
          history,
        },
      },
    });
  }

  const data = await res.json();
  const answerHtml = await markdownToHtml(data.answer);
  const answer = data.answer || "No answer found";

  await prisma.chat_message.create({
    data: {
      sessionId: session_id,
      sender: "user",
      message: message,
    },
  });

  await prisma.chat_message.create({
    data: {
      sessionId: session_id,
      sender: "bot",
      message: answer,
    },
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

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return new Response(
      JSON.stringify({ status: "error", message: "Chat session needed" }),
      { status: 422, headers: corsHeaders },
    );
  }

  try {
    const data = await prisma.chat_session.findFirst({
      where: {
        id: sessionId,
      },
      include: {
        agent: {
          include: {
            setting: true,
          },
        },
        feedback: true,
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    
    const messageData = await Promise.all(
      data?.messages.map(async (msg) => ({
        ...msg,
        messageHtml:
          msg.sender === "bot"
            ? await markdownToHtml(msg.message)
            : msg.message,
      })) ?? [],
    );

    return new Response(
      JSON.stringify({
        status: "success",
        data: {
          ...data,
          messages: messageData,
        },
      }),
      {
        status: 200,
        headers: corsHeaders,
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error }), {
      status: 422,
      headers: corsHeaders,
    });
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
