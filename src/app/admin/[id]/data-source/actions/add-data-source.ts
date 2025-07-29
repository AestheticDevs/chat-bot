"use server";

import { API_URL } from "@/lib/shared";
import { ActionStateType } from "../add-data-source-dialog";
import { revalidatePath } from "next/cache";

export default async function addDataSourceAction(
  // prevState: ActionStateType,
  // formData: FormData,
  id_collection: string,
) {
  // const file = formData.get("file") as File;
  // const id_collection = formData.get("id_collection") as string;

  // if (!file || !(file instanceof File)) {
  //   return { message: "No file provided" };
  // }

  // const proxyFormData = new FormData();
  // proxyFormData.set("file", file);

  // const res = await fetch(
  //   `${API_URL}/upload?vector_store=qdrant&id_collection=${id_collection}&force_recreate=false`,
  //   {
  //     method: "POST",
  //     body: proxyFormData, // this will send as multipart/form-data
  //   },
  // );
  revalidatePath(`/admin/${id_collection}/data-source`);

  // if (res.ok) {
  //   revalidatePath(`/admin/${id_collection}/data-source`);
  //   return { message: "Upload success" };
  // } else {
  //   const error = await res.text();
  //   return { message: `Upload failed: ${error}` };
  // }
}
