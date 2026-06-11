import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, code, province, city, address, phone, managerName, isActive } = body;
    const branch = await db.branch.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(code !== undefined && { code }),
        ...(province !== undefined && { province }),
        ...(city !== undefined && { city }),
        ...(address !== undefined && { address }),
        ...(phone !== undefined && { phone }),
        ...(managerName !== undefined && { managerName }),
        ...(isActive !== undefined && { isActive }),
      },
    });
    return NextResponse.json({ data: branch });
  } catch (error) {
    console.error('Branch PUT error:', error);
    return NextResponse.json({ error: 'Failed to update branch' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.branch.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Branch DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete branch' }, { status: 500 });
  }
}
