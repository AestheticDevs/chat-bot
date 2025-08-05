import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { API_URL } from "@/lib/shared";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req: Request) {
  try {
    // Ambil token dari cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = await jwtVerify(token.value, JWT_SECRET);
    const userId = payload.id as string; // id dari token
    const formData = await req.formData();

    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const id_collection = formData.get("id_collection") as string;

    const proxyFormData = new FormData();
    proxyFormData.set("file", file);

    // const res = await fetch(
    //   `${API_URL}/upload?vector_store=qdrant&id_collection=${id_collection}&force_recreate=false`,
    //   {
    //     method: "POST",
    //     body: proxyFormData, // this will send as multipart/form-data
    //   },
    // );

    // const data = await res.json();

    // if (!res.ok) {
    //   return NextResponse.json(
    //     { error: data.message || "Upload failed" },
    //     { status: res.status },
    //   );
    // }

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

    return NextResponse.json({ agent });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
