"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Cari user
  const user = await prisma.users.findUnique({
    where: { username },
  });
  if (!user) {
    return { error: "User not found" };
  }

  // console.log("User found:", user);

  // Validasi password
  const isValid = await bcrypt.compare(password, user.hashed_password);
  if (!isValid) {
    return { error: "Invalid credentials" };
  }

  // Buat token
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "8h",
  });

  const isLocalhost = process.env.NODE_ENV !== "production";

  // Simpan ke cookie
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: "/",
    secure: !isLocalhost, // Hanya aktif kalau production
  });

  cookieStore.set(
    "user",
    JSON.stringify({
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
      full_name: user.full_name,
    }),
    {
      httpOnly: true,
      maxAge: 60 * 60 * 8,

    },
  );

  redirect("/admin/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("user");
  redirect("/login");
}
