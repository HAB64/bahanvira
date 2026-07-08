// ═══════════════════════════════════════════════════════════
//  Middleware — Security Headers, Admin Protection, Tracking
//  Vira Abacus — Security Middleware
// ═══════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromCookie, verifyAdminSession } from '@/lib/admin-auth';

// ── Security Headers ──────────────────────────────────

const securityHeaders = new Headers({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://fonts.googleapis.com",
    "frame-ancestors 'none'",
  ].join('; '),
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
});

// ── No-cache headers for dynamic routes ──────────────

const noCacheHeaders = new Headers({
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
});

// ── Paths that don't need admin auth ──────────────────

const PUBLIC_ADMIN_PATHS = ['/admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // ── Apply security headers to all responses ────────
  for (const [key, value] of securityHeaders.entries()) {
    response.headers.set(key, value);
  }

  // ── Admin route protection ─────────────────────────
  if (pathname.startsWith('/admin')) {
    // No-cache for all admin routes
    for (const [key, value] of noCacheHeaders.entries()) {
      response.headers.set(key, value);
    }

    // Allow the admin root (login page) through
    if (PUBLIC_ADMIN_PATHS.some(p => pathname === p)) {
      return response;
    }

    // Check admin session cookie
    const token = getTokenFromCookie(request.headers.get('cookie'));

    if (!token) {
      const loginUrl = new URL('/admin', request.url);
      return NextResponse.redirect(loginUrl);
    }

    const valid = await verifyAdminSession(token);
    if (!valid) {
      const loginUrl = new URL('/admin', request.url);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  // ── Portal route protection ────────────────────────
  if (pathname.startsWith('/portal')) {
    for (const [key, value] of noCacheHeaders.entries()) {
      response.headers.set(key, value);
    }
    return response;
  }

  // ── API route protection ───────────────────────────
  if (pathname.startsWith('/api/admin')) {
    const token = getTokenFromCookie(request.headers.get('cookie'));

    // Allow login endpoint
    if (pathname === '/api/admin/login') {
      return response;
    }

    if (!token) {
      return NextResponse.json({ error: 'احراز هویت نشده' }, { status: 401 });
    }

    const valid = await verifyAdminSession(token);
    if (!valid) {
      return NextResponse.json({ error: 'نشست منقضی شده' }, { status: 401 });
    }

    return response;
  }

  // ── CRM webhook verification ───────────────────────
  if (pathname === '/api/crm') {
    const webhookSecret = process.env.WEBHOOK_SECRET;
    const providedSecret = request.headers.get('X-Webhook-Secret');

    if (webhookSecret && providedSecret !== webhookSecret) {
      return NextResponse.json({ error: 'Invalid webhook secret' }, { status: 403 });
    }

    return response;
  }

  // ── Visitor tracking cookies ───────────────────────
  const sessionCookie = request.cookies.get('br_session');
  if (!sessionCookie) {
    const sessionId = crypto.randomUUID();
    response.cookies.set('br_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 90 * 24 * 60 * 60, // 90 days
    });
  }

  // UTM / campaign tracking
  const url = request.nextUrl;
  const utmSource = url.searchParams.get('utm_source');
  if (utmSource && !request.cookies.get('br_campaign')) {
    response.cookies.set('br_campaign', utmSource, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
  }

  // Referrer tracking
  const referrer = request.headers.get('referer');
  if (referrer && !request.cookies.get('br_referrer')) {
    response.cookies.set('br_referrer', referrer, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
  }

  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|images).*)',
};