// app/form-example/actions.ts
"use server";

import { API_URL } from "@/lib/shared";
import { revalidatePath } from "next/cache";

export async function deleteCollection(id: string) {
  const res = await fetch(`${API_URL}/collections/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  console.log(data);
  revalidatePath("/admin/dashboard");
  // return { message: data.message, success: data.success };
}
