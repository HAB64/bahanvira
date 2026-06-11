import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, type, level, courseId, duration, totalScore, passingScore, status, questions, availableFrom, availableTo, creatorId } = body;
    const exam = await db.exam.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(type !== undefined && { type }),
        ...(level !== undefined && { level }),
        ...(courseId !== undefined && { courseId }),
        ...(duration !== undefined && { duration }),
        ...(totalScore !== undefined && { totalScore }),
        ...(passingScore !== undefined && { passingScore }),
        ...(status !== undefined && { status }),
        ...(questions !== undefined && { questions }),
        ...(availableFrom !== undefined && { availableFrom: availableFrom ? new Date(availableFrom) : null }),
        ...(availableTo !== undefined && { availableTo: availableTo ? new Date(availableTo) : null }),
        ...(creatorId !== undefined && { creatorId }),
      },
      include: {
        course: { select: { id: true, title: true } },
        creator: { select: { id: true, user: { select: { id: true, name: true } } } },
        _count: { select: { attempts: true } },
      },
    });
    return NextResponse.json({ data: exam });
  } catch (error) {
    console.error('Exam PUT error:', error);
    return NextResponse.json({ error: 'Failed to update exam' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.exam.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Exam DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete exam' }, { status: 500 });
  }
}
