import { API_URL } from "@/lib/shared";
import { markdownToHtml } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { message, id_collection } = body;

  console.log("Received message:", message, id_collection);
  const res = await fetch(
    `${API_URL}/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        id_collection: id_collection,
        vector_store: "qdrant",
      }),
    },
  );
  console.log(res)

  if (!res.ok) {
    return NextResponse.json({
      status: "error",
      message: "Failed to retrieve answer",
    });
  }

  const data = await res.json();
  const answerHtml = await markdownToHtml(data.answer);
  const answer = data.answer || "No answer found";

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
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
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
