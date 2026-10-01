import "server-only";

import { cookies } from "next/headers";

export class ApiError extends Error {
  constructor(message, status = 500, payload = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

function apiUrl(path) {
  const base = (process.env.API_URL || "http://localhost:5000/api").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function api(path, options = {}) {
  const {
    method = "GET",
    body,
    auth = true,
    headers: suppliedHeaders,
  } = options;

  const headers = new Headers(suppliedHeaders);
  let requestBody = body;

  if (auth) {
    const cookieStore = await cookies();
    const token = cookieStore.get("stars_align_token")?.value;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  if (body && !(body instanceof FormData) && typeof body !== "string") {
    headers.set("Content-Type", "application/json");
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(apiUrl(path), {
    method,
    headers,
    body: requestBody,
    cache: "no-store",
  });

  if (response.status === 204) {
    return null;
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      payload?.message || payload?.error || "The request could not be completed.",
      response.status,
      payload,
    );
  }

  return payload;
}
