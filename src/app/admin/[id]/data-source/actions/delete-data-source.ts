"use server";

import { API_URL } from "@/lib/shared";
import { revalidatePath } from "next/cache";

export default async function deleteDataSourceAction(
  id: number,
  collectionId: string,
) {
  // console.log(`Deleting data source with ID: ${id} from collection: ${collectionId}`);
  const res = await fetch(`${API_URL}/documents/${collectionId}/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    revalidatePath(`/admin/${collectionId}/data-source`);
    return { message: "Data source deleted successfully" };
  } else {
    const error = await res.text();
    return { message: `Failed to delete data source: ${error}` };
  }
}
