"use server";

import { API_URL } from "@/lib/shared";

export default async function chatWithCollection(
  question: string,
  collectionId: string,
) {
  const res = await fetch(
    `${API_URL}/chat?vector_store_type=qdrant&id_collection=${collectionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: question,
        id_collection: collectionId,
        vector_store: "qdrant",
      }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    return {
      question,
      answer: { text: JSON.stringify(data), isLoading: false, isError: true },
    };
  }

  return { question, answer: { text: data.answer, isLoading: false } };
}
