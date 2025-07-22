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
    console.log("DEBUG: ENV ->", {
      hasDatabaseURL: !!process.env.DATABASE_URL,
      hasSecret: !!process.env.JWT_SECRET,
    });

    const user = await prisma.users.findUnique({ where: { username } });
    console.log("DEBUG: Prisma query result ->", user);

    if (!user) return { error: "User not found" };

    const isValid = await bcrypt.compare(password, user.hashed_password);
    if (!isValid) return { error: "Invalid credentials" };

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    console.log("DEBUG: Login success -> token set");
    return { success: true };
  } catch (err: any) {
    console.error("DEBUG: loginAction crashed ->", err.message, err.stack);
    return { error: `Server error -> ${err.message}` };
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
