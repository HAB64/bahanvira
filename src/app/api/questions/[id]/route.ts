import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { question, type, options, correctAnswer, points, difficulty, category, subject, explanation, imageUrl, aiGenerated, qualityScore } = body;
    const q = await db.questionBank.update({
      where: { id },
      data: {
        ...(question !== undefined && { question }),
        ...(type !== undefined && { type }),
        ...(options !== undefined && { options }),
        ...(correctAnswer !== undefined && { correctAnswer }),
        ...(points !== undefined && { points }),
        ...(difficulty !== undefined && { difficulty }),
        ...(category !== undefined && { category }),
        ...(subject !== undefined && { subject }),
        ...(explanation !== undefined && { explanation }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(aiGenerated !== undefined && { aiGenerated }),
        ...(qualityScore !== undefined && { qualityScore }),
      },
    });
    return NextResponse.json({ data: q });
  } catch (error) {
    console.error('Question PUT error:', error);
    return NextResponse.json({ error: 'Failed to update question' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.questionBank.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Question DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete question' }, { status: 500 });
  }
}
