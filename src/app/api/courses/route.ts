import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const branchId = searchParams.get('branchId') || '';
    const status = searchParams.get('status') || '';
    const level = searchParams.get('level') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { slug: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (branchId) {
      where.branchId = branchId;
    }

    if (status) {
      where.status = status;
    }

    if (level) {
      where.level = level;
    }

    const [courses, count] = await Promise.all([
      db.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          branch: {
            select: { id: true, name: true, city: true },
          },
          creator: {
            select: { id: true, name: true },
          },
          _count: {
            select: {
              syllabus: true,
              classes: true,
              enrollments: true,
              exams: true,
              contents: true,
              assignments: true,
              tuitions: true,
            },
          },
        },
      }),
      db.course.count({ where }),
    ]);

    return NextResponse.json({ data: courses, count, page, limit });
  } catch (error) {
    console.error('Courses GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      slug,
      title,
      description,
      level,
      ageRange,
      duration,
      sessions,
      sessionsPerWeek,
      sessionDuration,
      price,
      features,
      icon,
      color,
      status,
      capacity,
      enrolledCount,
      startDate,
      endDate,
      createdById,
      branchId,
    } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: 'slug and title are required' }, { status: 400 });
    }

    const course = await db.course.create({
      data: {
        slug,
        title,
        description: description || null,
        level: level || 'BEGINNER',
        ageRange: ageRange || null,
        duration: duration || null,
        sessions: sessions || 12,
        sessionsPerWeek: sessionsPerWeek || 2,
        sessionDuration: sessionDuration || 60,
        price: price || 0,
        features: features || '[]',
        icon: icon || null,
        color: color || null,
        status: status || 'ACTIVE',
        capacity: capacity || 15,
        enrolledCount: enrolledCount || 0,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        createdById: createdById || null,
        branchId: branchId || null,
      },
      include: {
        branch: { select: { id: true, name: true } },
        creator: { select: { id: true, name: true } },
        _count: { select: { syllabus: true, classes: true, enrollments: true } },
      },
    });

    return NextResponse.json({ data: course }, { status: 201 });
  } catch (error: unknown) {
    console.error('Course POST error:', error);
    const errMsg = error instanceof Error && error.message.includes('Unique')
      ? 'Course slug already exists'
      : 'Failed to create course';
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
