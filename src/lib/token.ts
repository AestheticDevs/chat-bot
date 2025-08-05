import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret",
);

export function checkToken(token: string | undefined | null): boolean {
  if (!token) return false;

  try {
    jwtVerify(token, JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
}
