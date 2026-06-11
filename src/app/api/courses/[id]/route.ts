import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { slug, title, description, level, ageRange, duration, sessions, sessionsPerWeek, sessionDuration, price, features, icon, color, status, capacity, enrolledCount, startDate, endDate, branchId } = body;
    const course = await db.course.update({
      where: { id },
      data: {
        ...(slug !== undefined && { slug }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(level !== undefined && { level }),
        ...(ageRange !== undefined && { ageRange }),
        ...(duration !== undefined && { duration }),
        ...(sessions !== undefined && { sessions }),
        ...(sessionsPerWeek !== undefined && { sessionsPerWeek }),
        ...(sessionDuration !== undefined && { sessionDuration }),
        ...(price !== undefined && { price }),
        ...(features !== undefined && { features }),
        ...(icon !== undefined && { icon }),
        ...(color !== undefined && { color }),
        ...(status !== undefined && { status }),
        ...(capacity !== undefined && { capacity }),
        ...(enrolledCount !== undefined && { enrolledCount }),
        ...(startDate !== undefined && { startDate: startDate ? new Date(startDate) : null }),
        ...(endDate !== undefined && { endDate: endDate ? new Date(endDate) : null }),
        ...(branchId !== undefined && { branchId }),
      },
      include: {
        branch: { select: { id: true, name: true } },
        creator: { select: { id: true, name: true } },
      },
    });
    return NextResponse.json({ data: course });
  } catch (error) {
    console.error('Course PUT error:', error);
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.course.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Course DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
