// ═══════════════════════════════════════════════════════════
//  GET /api/admin/me — Check if admin session is valid
// ═══════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromCookie, verifyAdminSession } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  const token = getTokenFromCookie(request.headers.get('cookie'));

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const valid = await verifyAdminSession(token);
  if (!valid) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    role: 'admin',
  });
}