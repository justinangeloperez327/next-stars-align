import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const TOKEN_COOKIE = "stars_align_token";
const USER_COOKIE = "stars_align_user";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

function encodeUser(user) {
  return Buffer.from(JSON.stringify(user)).toString("base64url");
}

function decodeUser(value) {
  try {
    return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

export async function createSession(token, user) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE, token, cookieOptions);
  cookieStore.set(USER_COOKIE, encodeUser(user), cookieOptions);
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
  cookieStore.delete(USER_COOKIE);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;
  const encodedUser = cookieStore.get(USER_COOKIE)?.value;

  if (!token || !encodedUser) {
    return null;
  }

  const user = decodeUser(encodedUser);

  if (!user) {
    return null;
  }

  return { token, user };
}

export async function requireGuest() {
  const session = await getSession();

  if (!session) return;

  if (session.user.role === "employer") redirect("/employer/dashboard");
  if (session.user.role === "admin") redirect("/admin/dashboard");

  redirect("/");
}

export async function requireRole(role) {
  const session = await getSession();

  if (!session || session.user.role !== role) {
    redirect("/login");
  }

  return session;
}
