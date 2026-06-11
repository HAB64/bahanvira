import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { studentId, courseId, totalAmount, paidAmount, discount, paymentType, installments, status, dueDate } = body;
    const tuition = await db.tuition.update({
      where: { id },
      data: {
        ...(studentId !== undefined && { studentId }),
        ...(courseId !== undefined && { courseId }),
        ...(totalAmount !== undefined && { totalAmount }),
        ...(paidAmount !== undefined && { paidAmount }),
        ...(discount !== undefined && { discount }),
        ...(paymentType !== undefined && { paymentType }),
        ...(installments !== undefined && { installments }),
        ...(status !== undefined && { status }),
        ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
      },
      include: {
        student: { select: { id: true, name: true, phone: true } },
        course: { select: { id: true, title: true } },
        payments: true,
      },
    });
    return NextResponse.json({ data: tuition });
  } catch (error) {
    console.error('Tuition PUT error:', error);
    return NextResponse.json({ error: 'Failed to update tuition' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.tuition.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tuition DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete tuition' }, { status: 500 });
  }
}
