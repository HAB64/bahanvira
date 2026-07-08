// ═══════════════════════════════════════════════════════════
//  احراز هویت پورتال کاربران — چرتکه دهگانی ویرا
//  Portal Authentication (localStorage + Bearer token)
// ═══════════════════════════════════════════════════════════

import { SignJWT, jwtVerify } from 'jose';

const SESSION_SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'fallback-secret-change-me'
);

const MAX_AGE = 7 * 24 * 60 * 60; // 7 days

// ── Create portal session token ────────────────────────

export async function createPortalSession(userId: string, role: string): Promise<string> {
  return new SignJWT({
    sub: userId,
    role,
    type: 'portal',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(SESSION_SECRET);
}

// ── Verify portal session token ────────────────────────

export async function verifyPortalSession(token: string): Promise<{ sub: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, SESSION_SECRET);
    if (payload.type !== 'portal') return null;
    return { sub: payload.sub as string, role: payload.role as string };
  } catch {
    return null;
  }
}

// ── Parse Bearer token from Authorization header ───────

export function getBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  return parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : null;
}

export const PORTAL_MAX_AGE = MAX_AGE;