"use server";

import { prisma } from "@/lib/prisma";
import { API_URL } from "@/lib/shared";
import { revalidatePath } from "next/cache";

export default async function deleteDataSourceAction(
  dbId: number,
  collectionId: string,
  documentId: number,
) {
  // console.log(`Deleting data source with ID: ${id} from collection: ${collectionId}`);
  const res = await fetch(`${API_URL}/documents/${collectionId}/${documentId}`, {
    method: "DELETE",
  });

  await prisma.data_sources.delete({
    where: { id: dbId },
  });

  if (res.ok) {
    revalidatePath(`/admin/${collectionId}/data-source`);
    return { message: "Data source deleted successfully" };
  } else {
    const error = await res.text();
    return { message: `Failed to delete data source: ${error}` };
  }
}
