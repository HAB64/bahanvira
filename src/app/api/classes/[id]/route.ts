import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { courseId, instructorId, branchId, dayOfWeek, startTime, endTime, location, isOnline, onlineLink, status, classDate } = body;
    const cls = await db.class.update({
      where: { id },
      data: {
        ...(courseId !== undefined && { courseId }),
        ...(instructorId !== undefined && { instructorId }),
        ...(branchId !== undefined && { branchId }),
        ...(dayOfWeek !== undefined && { dayOfWeek }),
        ...(startTime !== undefined && { startTime }),
        ...(endTime !== undefined && { endTime }),
        ...(location !== undefined && { location }),
        ...(isOnline !== undefined && { isOnline }),
        ...(onlineLink !== undefined && { onlineLink }),
        ...(status !== undefined && { status }),
        ...(classDate !== undefined && { classDate: classDate ? new Date(classDate) : null }),
      },
      include: {
        course: { select: { id: true, title: true, level: true } },
        instructor: { select: { id: true, user: { select: { id: true, name: true } } } },
        branch: { select: { id: true, name: true } },
      },
    });
    return NextResponse.json({ data: cls });
  } catch (error) {
    console.error('Class PUT error:', error);
    return NextResponse.json({ error: 'Failed to update class' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.class.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Class DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete class' }, { status: 500 });
  }
}
