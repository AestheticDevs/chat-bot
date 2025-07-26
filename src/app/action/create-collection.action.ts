// app/form-example/actions.ts
"use server";

import { API_URL } from "@/lib/shared";
import { revalidatePath } from "next/cache";

export async function createCollection(prevState: any, formData?: FormData) {
  if (!formData) {
    return { message: "", success: null };
  }
  const collection_name = formData.get("collection_name");

  const res = await fetch(`${API_URL}/collections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collection_name: collection_name,
      vector_store: "qdrant",
      vector_size: 3072,
      distance: "Cosine",
    }),
  });

  const data = await res.json();
  console.log(data);
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(true);
  //   }, 400);
  // });

  revalidatePath("/admin/dashboard");
  return { message: data.message, success: data.success };
}
