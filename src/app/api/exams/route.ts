import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const courseId = searchParams.get('courseId') || '';
    const type = searchParams.get('type') || '';
    const status = searchParams.get('status') || '';
    const level = searchParams.get('level') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (courseId) {
      where.courseId = courseId;
    }

    if (type) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    if (level) {
      where.level = level;
    }

    const [exams, count] = await Promise.all([
      db.exam.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          course: {
            select: { id: true, title: true, level: true, color: true },
          },
          creator: {
            select: {
              id: true,
              user: { select: { id: true, name: true } },
            },
          },
          _count: {
            select: { attempts: true },
          },
        },
      }),
      db.exam.count({ where }),
    ]);

    return NextResponse.json({ data: exams, count, page, limit });
  } catch (error) {
    console.error('Exams GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch exams' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      type,
      level,
      courseId,
      duration,
      totalScore,
      passingScore,
      status,
      questions,
      availableFrom,
      availableTo,
      creatorId,
    } = body;

    if (!title) {
      return NextResponse.json({ error: 'title is required' }, { status: 400 });
    }

    const exam = await db.exam.create({
      data: {
        title,
        description: description || null,
        type: type || 'PRACTICE',
        level: level || 'BEGINNER',
        courseId: courseId || null,
        duration: duration || 30,
        totalScore: totalScore || 100,
        passingScore: passingScore || 60,
        status: status || 'DRAFT',
        questions: questions || '[]',
        availableFrom: availableFrom ? new Date(availableFrom) : null,
        availableTo: availableTo ? new Date(availableTo) : null,
        creatorId: creatorId || null,
      },
      include: {
        course: { select: { id: true, title: true } },
        creator: {
          select: { id: true, user: { select: { id: true, name: true } } },
        },
        _count: { select: { attempts: true } },
      },
    });

    return NextResponse.json({ data: exam }, { status: 201 });
  } catch (error) {
    console.error('Exam POST error:', error);
    return NextResponse.json({ error: 'Failed to create exam' }, { status: 500 });
  }
}
