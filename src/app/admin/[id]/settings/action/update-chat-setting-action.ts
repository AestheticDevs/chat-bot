"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type UpdateChatSettingActionReturn = {
  message: string;
  success: boolean | null;
};

export default async function updateChatSettingAction(
  prev: UpdateChatSettingActionReturn,
  formData: FormData,
) {
  try {
    const data = Object.fromEntries(formData.entries());

    const { greetings, agentId, collectionId } = data;

    const missingFields: string[] = [];

    if (!greetings) missingFields.push("Nama");
    if (!agentId) {
      return {
        message: "Something went wrong.",
        success: false,
      };
    }
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

    await prisma.setting.upsert({
      where: {
        agent_id: parseInt(agentId as string),
      },
      create: {
        agent_id: parseInt(agentId as string),
        greetings: greetings as string,
      },
      update: {
        greetings: greetings as string,
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
