// src/app/action/auth.ts
"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Pastikan JWT_SECRET sudah ada di .env dan di Vercel environment variables
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export async function loginAction(formData: FormData) {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    console.log("DEBUG: Login attempt ->", username);

    // Cari user
    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) {
      console.log("DEBUG: User not found");
      return { error: "User not found" };
    }

    // Cek password
    const isValid = await bcrypt.compare(password, user.hashed_password);
    if (!isValid) {
      console.log("DEBUG: Password invalid");
      return { error: "Invalid credentials" };
    }

    // Buat JWT
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Simpan token ke cookie
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60, // 1 jam
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    console.log("DEBUG: Login success -> token saved");
    return { success: true };
  } catch (err: any) {
    console.error("DEBUG: loginAction crashed ->", err);
    return { error: "Server error, check logs" };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    console.log("DEBUG: Logout success -> token removed");
    return { success: true };
  } catch (err: any) {
    console.error("DEBUG: logoutAction crashed ->", err);
    return { error: "Logout failed" };
  }
}
