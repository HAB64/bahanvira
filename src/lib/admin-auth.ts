// ═══════════════════════════════════════════════════════════
//  احراز هویت ادمین — چرتکه دهگانی ویرا
//  Secure Admin Authentication with bcrypt + httpOnly cookies
// ═══════════════════════════════════════════════════════════

import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const SESSION_SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'fallback-secret-change-me'
);

const COOKIE_NAME = 'admin_session';
const MAX_AGE = 24 * 60 * 60; // 24 hours in seconds

// ── Verify username + password ───────────────────────────

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const hash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !hash) {
    console.error('[SECURITY] ADMIN_USERNAME or ADMIN_PASSWORD_HASH not set in .env');
    return false;
  }

  // Username check (case-sensitive)
  if (username.trim() !== expectedUsername.trim()) {
    return false;
  }

  // Password check with bcrypt
  try {
    return await bcrypt.compare(password, hash);
  } catch (e) {
    console.error('[SECURITY] bcrypt compare error:', e);
    return false;
  }
}

// Legacy alias (kept for backward compat)
export const verifyAdminPassword = (password: string) =>
  verifyAdminCredentials(process.env.ADMIN_USERNAME || 'admin', password);

// ── Create JWT session token ────────────────────────────

export async function createAdminSession(): Promise<string> {
  const token = await new SignJWT({
    role: 'admin',
    iat: Date.now(),
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(SESSION_SECRET);

  return token;
}

// ── Verify JWT session token ────────────────────────────

export async function verifyAdminSession(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, SESSION_SECRET);
    return true;
  } catch {
    return false;
  }
}

// ── Parse token from cookie header ─────────────────────

export function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

// ── Cookie options ──────────────────────────────────────

export const adminCookieOptions = {
  name: COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: MAX_AGE,
};

// ── Hash a new password (for future admin setup) ────────

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}