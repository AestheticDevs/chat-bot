"use server";

import { prisma } from "@/lib/prisma";
import { API_URL } from "@/lib/shared";
import { checkToken } from "@/lib/token";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function addDataSourceAction(
  formData: FormData,
) {
  try {
    // Token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return { message: "Unauthorized", status: false };
    }

    const isTokenValid = checkToken(token.value);

    if (!isTokenValid) {
      return { message: "Unauthorized", status: false };
    }

    // Extract file and collection ID
    const file = formData.get("file") as File | null;
    const id_collection = formData.get("id_collection") as string;

    if (!file) {
      return { message: "No file uploaded", status: false };
    }

    const proxyFormData = new FormData();
    proxyFormData.set("file", file);

    const res = await fetch(
      `${API_URL}/upload?vector_store=qdrant&id_collection=${id_collection}&force_recreate=false`,
      {
        method: "POST",
        body: proxyFormData,
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return { message: data.message || "Upload failed", status: res.status };
    }

    const agent = await prisma.agents.findFirst({
      where: {
        id_collection: id_collection,
      },
    });

    if (agent) {
      await prisma.data_sources.create({
        data: {
          name: file.name,
          source_type: file.type,
          file_size: file.size,
          id_collection: id_collection,
          agent_id: agent.id,
        },
      });
    }

    revalidatePath(`/admin/${id_collection}/data-source`);
    return { message: "Upload successful", status: true };
  } catch (error) {
    console.error(error);
    return { message: "Internal Server Error", status: true };
  }
}
