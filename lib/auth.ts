/**
 * Auth token = HMAC-SHA256(SITE_PASSWORD, "aigency-loan-proposal-v1").
 * Uses the Web Crypto API so it runs in both the Edge middleware and the
 * Node route handler. The password itself never leaves the server; the client
 * only holds the derived token in an httpOnly cookie.
 */
export const AUTH_COOKIE = "pitch_auth";
const MESSAGE = "aigency-loan-proposal-v1";

function hex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmac(secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(MESSAGE));
  return hex(sig);
}

export async function expectedToken(): Promise<string> {
  const secret = process.env.SITE_PASSWORD;
  if (!secret) return "";
  return hmac(secret);
}

export function safeEqual(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function checkPassword(input: string): Promise<boolean> {
  const secret = process.env.SITE_PASSWORD;
  if (!secret) return false;
  return safeEqual(input, secret);
}