import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { API_URL } from "@/lib/shared";
import { revalidatePath } from "next/cache";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

function getTokenFromCookies(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
  return match ? match[1] : null;
}

export async function POST(req: Request) {
  try {
    // Ambil token dari cookies
    const token = getTokenFromCookies(req.headers.get("cookie"));
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verifikasi token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.id as string; // id dari token
    const formData = await req.formData();

    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const id_collection = formData.get("id_collection") as string;

    const proxyFormData = new FormData();
    proxyFormData.set("file", file);

    const res = await fetch(
      `${API_URL}/upload?vector_store=qdrant&id_collection=${id_collection}&force_recreate=false`,
      {
        method: "POST",
        body: proxyFormData, // this will send as multipart/form-data
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "Upload failed" },
        { status: res.status },
      );
    }

    revalidatePath(`/admin/${id_collection}/data-source`);

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
