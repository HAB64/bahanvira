// ═══════════════════════════════════════════════════════════
//  POST /api/portal/login — Portal User Login
// ═══════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { createPortalSession, getBearerToken, verifyPortalSession, PORTAL_MAX_AGE } from '@/lib/portal-auth';
import { loginRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rateResult = loginRateLimit(ip);
  if (!rateResult.allowed) {
    return NextResponse.json(
      { error: 'تعداد تلاش بیش از حد مجاز' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(rateResult.resetInMs / 1000)) } }
    );
  }

  // For now, portal auth uses localStorage-based tokens
  // When a database is connected, this will verify against stored users
  try {
    const body = await request.json();
    const { phone, code } = body;

    if (!phone || !code) {
      return NextResponse.json({ error: 'شماره تلفن و کد الزامی است' }, { status: 400 });
    }

    // TODO: Verify phone/code against database when available
    // For now, create a session token
    const token = await createPortalSession(phone, 'student');

    return NextResponse.json({
      success: true,
      token,
      expiresIn: PORTAL_MAX_AGE,
    });
  } catch {
    return NextResponse.json({ error: 'درخواست نامعتبر' }, { status: 400 });
  }
}

// ── Verify portal session ────────────────────────────

export async function GET(request: NextRequest) {
  const token = getBearerToken(request.headers.get('authorization'));
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const session = await verifyPortalSession(token);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, userId: session.sub, role: session.role });
}