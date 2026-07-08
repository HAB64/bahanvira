// ═══════════════════════════════════════════════════════════
//  احراز هویت معرف — چرتکه دهگانی ویرا
//  Referrer Authentication with httpOnly cookie
// ═══════════════════════════════════════════════════════════

import { SignJWT, jwtVerify } from 'jose';

const SESSION_SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'fallback-secret-change-me'
);

const COOKIE_NAME = 'referrer_session';
const MAX_AGE = 7 * 24 * 60 * 60; // 7 days

// ── Create referrer session ────────────────────────────

export async function createReferrerSession(referrerId: string, code: string): Promise<string> {
  return new SignJWT({
    sub: referrerId,
    code,
    type: 'referrer',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(SESSION_SECRET);
}

// ── Verify referrer session ────────────────────────────

export async function verifyReferrerSession(token: string): Promise<{ sub: string; code: string } | null> {
  try {
    const { payload } = await jwtVerify(token, SESSION_SECRET);
    if (payload.type !== 'referrer') return null;
    return { sub: payload.sub as string, code: payload.code as string };
  } catch {
    return null;
  }
}

// ── Parse token from cookie ────────────────────────────

export function getReferrerTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export const referrerCookieOptions = {
  name: COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: MAX_AGE,
};