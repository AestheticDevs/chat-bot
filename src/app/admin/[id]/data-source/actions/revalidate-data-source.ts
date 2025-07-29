"use server";

import { revalidatePath } from "next/cache";

export default async function revalidateDataSourceAction(id_collection: string) {
  revalidatePath(`/admin/${id_collection}/data-source`);
}
