import "server-only";

import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "stars_align_session";
const SESSION_TTL = 60 * 60 * 24 * 7;

function secret() {
  return process.env.SESSION_SECRET || null;
}

function sign(payload) {
  const sessionSecret = secret();
  if (!sessionSecret) return null;

  return createHmac("sha256", sessionSecret)
    .update(payload)
    .digest("base64url");
}

function encodeSession(user) {
  const signatureSecret = secret();

  if (!signatureSecret) {
    throw new Error("SESSION_SECRET is required for authentication.");
  }

  const payload = Buffer.from(
    JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + SESSION_TTL,
    }),
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

function decodeSession(value) {
  try {
    if (!value || !secret()) return null;

    const [payload, signature] = String(value).split(".");
    if (!payload || !signature) return null;

    const expected = sign(payload);
    if (!expected) return null;

    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);

    if (
      signatureBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return null;
    }

    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );

    if (!session.exp || session.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function createSession(user) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, encodeSession(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession() {
  const cookieStore = await cookies();
  return decodeSession(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function requireGuest() {
  const session = await getSession();

  if (!session) return;

  if (session.role === "employer") redirect("/employer/dashboard");
  if (session.role === "admin") redirect("/admin/dashboard");

  redirect("/");
}

export async function requireRole(role) {
  const session = await getSession();

  if (!session || session.role !== role) {
    redirect("/login");
  }

  return session;
}
