import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { amount, category, description, branchId, receivedAt } = body;
    const revenue = await db.revenue.update({
      where: { id },
      data: {
        ...(amount !== undefined && { amount }),
        ...(category !== undefined && { category }),
        ...(description !== undefined && { description }),
        ...(branchId !== undefined && { branchId }),
        ...(receivedAt !== undefined && { receivedAt: receivedAt ? new Date(receivedAt) : new Date() }),
      },
      include: { branch: { select: { id: true, name: true } } },
    });
    return NextResponse.json({ data: revenue });
  } catch (error) {
    console.error('Revenue PUT error:', error);
    return NextResponse.json({ error: 'Failed to update revenue' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.revenue.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Revenue DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete revenue' }, { status: 500 });
  }
}
