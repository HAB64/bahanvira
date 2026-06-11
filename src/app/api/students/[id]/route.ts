import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, phone, email, age, parentName, parentPhone, level, province, city, address, isActive, branchId } = body;
    const student = await db.student.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(email !== undefined && { email }),
        ...(age !== undefined && { age }),
        ...(parentName !== undefined && { parentName }),
        ...(parentPhone !== undefined && { parentPhone }),
        ...(level !== undefined && { level }),
        ...(province !== undefined && { province }),
        ...(city !== undefined && { city }),
        ...(address !== undefined && { address }),
        ...(isActive !== undefined && { isActive }),
        ...(branchId !== undefined && { branchId }),
      },
      include: {
        branch: { select: { id: true, name: true, city: true } },
        user: { select: { id: true, name: true, email: true } },
      },
    });
    return NextResponse.json({ data: student });
  } catch (error) {
    console.error('Student PUT error:', error);
    return NextResponse.json({ error: 'Failed to update student' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.student.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Student DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 });
  }
}
