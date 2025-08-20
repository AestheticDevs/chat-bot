"use server";

import { prisma } from "@/lib/prisma";
import { API_URL } from "@/lib/shared";
import { CreateDataSourceResult } from "@/types/data-source.types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createAgentAction(prevState: any, formData?: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { message: "Unauthorized", success: false };
  }

  if (!formData) {
    return { message: "", success: null };
  }
  const collection_name = formData.get("name");
  const description = formData.get("description");

  console.log("Creating agent with name:", collection_name, description, "\n");

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

  console.log("Response from API:", res.ok);

  if (!res.ok) {
    const data = await res.json();
    console.error("Error creating collection:", data);
    return {
      message: "Failed to create collection",
      success: false,
    };
  }

  const data = (await res.json()) as CreateDataSourceResult;

  const user = JSON.parse(cookieStore.get("user")?.value || "{}");

  try {
    await prisma.agents.create({
      data: {
        name: collection_name as string,
        description: description as string,
        id_collection: data.id_collection,
        is_active: true,
        owner_id: user.id,
        setting: {
          create: {
            limitation: true,
            usage_limit: 10,
            greetings:
              "Hai sobat KSPSTK saya adalah asisten AI yang siap membantu Anda.",
          },
        },
      },
    });
    revalidatePath("/admin/dashboard");
    return { message: "Berhasi membuat agent", success: true };
  } catch (error) {
    console.error("Error creating agent in database:", error);
    return { message: "Failed to create agent in database", success: false };
  }
}
