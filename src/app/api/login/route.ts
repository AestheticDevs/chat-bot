import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Cari user berdasarkan username
    const user = await prisma.users.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        full_name: true,
        role: true,
        is_active: true,
        hashed_password: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.is_active) {
      return NextResponse.json({ error: "User is inactive" }, { status: 403 });
    }

    // Cek password hash
    const isPasswordValid = await bcrypt.compare(
      password,
      user.hashed_password,
    );
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" },
    );

    return NextResponse.json({
      message: "Login success",
      token,
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
