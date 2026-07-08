// ═══════════════════════════════════════════════════════════
//  POST /api/admin/login — Admin Login with Rate Limiting
// ═══════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, createAdminSession, adminCookieOptions } from '@/lib/admin-auth';
import { loginRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // ── Rate limiting ──────────────────────────────
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  const rateResult = loginRateLimit(ip);
  if (!rateResult.allowed) {
    return NextResponse.json(
      { error: 'تعداد تلاش بیش از حد مجاز. لطفاً چند دقیقه صبر کنید.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(rateResult.resetInMs / 1000)),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  // ── Parse body ─────────────────────────────────
  let password: string;
  try {
    const body = await request.json();
    password = String(body.password || '').trim();
  } catch {
    return NextResponse.json({ error: 'درخواست نامعتبر' }, { status: 400 });
  }

  if (!password) {
    return NextResponse.json({ error: 'رمز عبور الزامی است' }, { status: 400 });
  }

  // ── Verify password ────────────────────────────
  const valid = await verifyAdminPassword(password);
  if (!valid) {
    return NextResponse.json(
      { error: 'رمز عبور اشتباه است' },
      {
        status: 401,
        headers: { 'X-RateLimit-Remaining': String(rateResult.remaining) },
      }
    );
  }

  // ── Create session ─────────────────────────────
  const token = await createAdminSession();

  // ── Set httpOnly cookie ────────────────────────
  const response = NextResponse.json({
    success: true,
    message: 'ورود موفق',
  });

  response.cookies.set(adminCookieOptions.name, token, {
    httpOnly: adminCookieOptions.httpOnly,
    secure: adminCookieOptions.secure,
    sameSite: adminCookieOptions.sameSite,
    path: adminCookieOptions.path,
    maxAge: adminCookieOptions.maxAge,
  });

  return response;
}