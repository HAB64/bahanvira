import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const difficulty = searchParams.get('difficulty') || '';
    const category = searchParams.get('category') || '';
    const subject = searchParams.get('subject') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { question: { contains: search } },
        { category: { contains: search } },
        { subject: { contains: search } },
        { explanation: { contains: search } },
      ];
    }

    if (type) {
      where.type = type;
    }

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (category) {
      where.category = category;
    }

    if (subject) {
      where.subject = subject;
    }

    const [questions, count] = await Promise.all([
      db.questionBank.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      db.questionBank.count({ where }),
    ]);

    return NextResponse.json({ data: questions, count, page, limit });
  } catch (error) {
    console.error('Questions GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      question,
      type,
      options,
      correctAnswer,
      points,
      difficulty,
      category,
      subject,
      explanation,
      imageUrl,
      aiGenerated,
      qualityScore,
    } = body;

    if (!question) {
      return NextResponse.json({ error: 'question is required' }, { status: 400 });
    }

    const q = await db.questionBank.create({
      data: {
        question,
        type: type || 'MULTIPLE_CHOICE',
        options: options || null,
        correctAnswer: correctAnswer || null,
        points: points || 10,
        difficulty: difficulty || 'MEDIUM',
        category: category || null,
        subject: subject || null,
        explanation: explanation || null,
        imageUrl: imageUrl || null,
        aiGenerated: aiGenerated || false,
        qualityScore: qualityScore || null,
        usageCount: 0,
      },
    });

    return NextResponse.json({ data: q }, { status: 201 });
  } catch (error) {
    console.error('Question POST error:', error);
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 });
  }
}
