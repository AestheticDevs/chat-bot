"use server";

import { prisma } from "@/lib/prisma";
import { API_URL } from "@/lib/shared";
import { revalidatePath } from "next/cache";

export async function deleteAgentAction(collectionId: string, id: number) {
  try {
    await prisma.agents.delete({
      where: {
        id: id,
        id_collection: collectionId,
      },
    });
  } catch (error) {
    return {
      message: "Failed to delete agent",
      success: false,
    };
  }

  try {
    await fetch(`${API_URL}/collections/${collectionId}`, {
      method: "DELETE",
    });
    revalidatePath("/admin/dashboard");
  } catch (error) {
    return {
      message: "Failed to delete collection",
      success: false,
    };
  }

  return {
    message: "Agent deleted successfully",
    success: true,
  };
}
