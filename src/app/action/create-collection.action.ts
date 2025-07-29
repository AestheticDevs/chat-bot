// app/form-example/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { API_URL } from "@/lib/shared";
import { CreateDataSourceResult } from "@/types/data-source.types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createCollection(prevState: any, formData?: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  if (!token) {
    return { message: "Unauthorized", success: false };
  }

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

  if (!res.ok) {
    return {
      message: "Failed to create collection",
      success: false,
    };
  }

  const data = (await res.json()) as CreateDataSourceResult;

  // await prisma.agents.create({
  //   data: {
  //     name: collection_name as string,
  //     description: "This is a new agent",
  //     id_collection: data.id_collection,
  //     is_active: true,
  //     owner_id: 
  //   }
  // });
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(true);
  //   }, 400);
  // });

  revalidatePath("/admin/dashboard");
  return { message: data.message, success: data.success };
}
