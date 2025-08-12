"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { API_URL } from "@/lib/shared";

export type UpdateAgentActionReturn = {
  message: string;
  success: boolean | null;
};

export default async function updateAgentAction(
  prev: UpdateAgentActionReturn,
  formData: FormData,
) {
  try {
    const data = Object.fromEntries(formData.entries());

    const { name, description, collectionId } = data;

    const missingFields: string[] = [];

    if (!name) missingFields.push("Nama");
    if (!description) missingFields.push("Deskripsi");
    if (!collectionId) {
      return {
        message: "Something went wrong.",
        success: false,
      };
    }

    if (missingFields.length > 0) {
      return {
        message: `${missingFields.join(", ")} perlu diisi.`,
        success: false,
      };
    }

    const res = await fetch(`${API_URL}/collections/${collectionId}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collection_name: name, description: description }),
    });

    if (!res.ok) {
      return { message: "Gagal update collection API", success: false };
    }
    
    await prisma.agents.update({
      data: {
        name: name as string,
        description: description as string,
      },
      where: {
        id_collection: collectionId as string,
      },
    });

    revalidatePath(`/admin/${collectionId}/settings`);

    return {
      message: "Berhasil update data",
      success: true,
    };
  } catch (error) {
    return {
      message: JSON.stringify(error),
      success: false,
    };
  }
}
