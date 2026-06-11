import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { specialties, bio, rating, totalClasses, hireDate, salaryBase, isActive, branchId } = body;
    const instructor = await db.instructor.update({
      where: { id },
      data: {
        ...(specialties !== undefined && { specialties }),
        ...(bio !== undefined && { bio }),
        ...(rating !== undefined && { rating }),
        ...(totalClasses !== undefined && { totalClasses }),
        ...(hireDate !== undefined && { hireDate: hireDate ? new Date(hireDate) : null }),
        ...(salaryBase !== undefined && { salaryBase }),
        ...(isActive !== undefined && { isActive }),
        ...(branchId !== undefined && { branchId }),
      },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        branch: { select: { id: true, name: true, city: true } },
      },
    });
    return NextResponse.json({ data: instructor });
  } catch (error) {
    console.error('Instructor PUT error:', error);
    return NextResponse.json({ error: 'Failed to update instructor' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.instructor.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Instructor DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete instructor' }, { status: 500 });
  }
}
