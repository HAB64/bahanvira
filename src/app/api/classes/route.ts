import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const courseId = searchParams.get('courseId') || '';
    const instructorId = searchParams.get('instructorId') || '';
    const branchId = searchParams.get('branchId') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { course: { title: { contains: search } } },
        { location: { contains: search } },
      ];
    }

    if (courseId) {
      where.courseId = courseId;
    }

    if (instructorId) {
      where.instructorId = instructorId;
    }

    if (branchId) {
      where.branchId = branchId;
    }

    if (status) {
      where.status = status;
    }

    const [classes, count] = await Promise.all([
      db.class.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              slug: true,
              level: true,
              color: true,
            },
          },
          instructor: {
            select: {
              id: true,
              user: { select: { id: true, name: true, avatar: true } },
              specialties: true,
              rating: true,
            },
          },
          branch: {
            select: { id: true, name: true, city: true },
          },
          _count: {
            select: { attendance: true },
          },
        },
      }),
      db.class.count({ where }),
    ]);

    return NextResponse.json({ data: classes, count, page, limit });
  } catch (error) {
    console.error('Classes GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      courseId,
      instructorId,
      branchId,
      dayOfWeek,
      startTime,
      endTime,
      location,
      isOnline,
      onlineLink,
      status,
      classDate,
    } = body;

    if (!courseId) {
      return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
    }

    const cls = await db.class.create({
      data: {
        courseId,
        instructorId: instructorId || null,
        branchId: branchId || null,
        dayOfWeek: dayOfWeek || null,
        startTime: startTime || '16:00',
        endTime: endTime || '17:30',
        location: location || null,
        isOnline: isOnline || false,
        onlineLink: onlineLink || null,
        status: status || 'SCHEDULED',
        classDate: classDate ? new Date(classDate) : null,
      },
      include: {
        course: { select: { id: true, title: true, level: true } },
        instructor: {
          select: { id: true, user: { select: { id: true, name: true } } },
        },
        branch: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ data: cls }, { status: 201 });
  } catch (error) {
    console.error('Class POST error:', error);
    return NextResponse.json({ error: 'Failed to create class' }, { status: 500 });
  }
}
