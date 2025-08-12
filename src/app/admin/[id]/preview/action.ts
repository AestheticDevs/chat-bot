"use server";

import { API_URL } from "@/lib/shared";
import { markdownToHtml } from "@/lib/utils";

export default async function chatWithCollection(
  question: string,
  collectionId: string,
) {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: question.trim(),
      id_collection: collectionId,
      vector_store: "qdrant",
    }),
  });
  
  const data = await res.json();
  
  if (!res.ok) {
    return {
      question,
      answer: { text: JSON.stringify(data), isLoading: false, isError: true },
    };
  }
  
  const answerHTML = await markdownToHtml(data.answer);
  return {
    question,
    answer: { text: data.answer, html: answerHTML, isLoading: false },
  };
}
