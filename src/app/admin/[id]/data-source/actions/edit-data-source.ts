"use server";

import { prisma } from "@/lib/prisma";
import { checkToken } from "@/lib/token";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { API_URL } from "@/lib/shared";

export default async function editDataSourceAction(formData: FormData) {
  try {
    // Token dari cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return { message: "Unauthorized", status: false };
    }

    const isTokenValid = checkToken(token.value);
    if (!isTokenValid) {
      return { message: "Unauthorized", status: false };
    }

    // Ambil data dari FormData
    const id_collection = formData.get("id_collection") as string;
    const savedAs = formData.get("savedAs") as string;
    const description = formData.get("description") as string;
    const dataSourceId = parseInt(formData.get("id") as string, 10);
    const document_id = formData.get("document_id") as any;

    const proxyFormData = new FormData();
    proxyFormData.set("savedAs", savedAs);
    proxyFormData.set("description", description);

    console.log("proxyFormData", Object.fromEntries(proxyFormData.entries()));
    console.log("document_id", document_id);

    const res = await fetch(
      `${API_URL}/update-meta-data/${document_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          savedAs,
          description,
        }),
      },
    );

    const data = await res.json();

    console.log("data", data);

    if (!res.ok) {
      return { message: data.message || "Upload failed", status: res.status };
    }

    // Update data source di database
    await prisma.data_sources.update({
      where: { id: dataSourceId },
      data: {
        savedAs: savedAs,
        description: description,
      },
    });

    revalidatePath(`/admin/${id_collection}/data-source`);
    return { message: "Data source updated successfully", status: true };

  } catch (error) {
    console.error(error);
    return { message: "Internal Server Error", status: false };
  }
}
