import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const studentId = searchParams.get('studentId') || '';
    const courseId = searchParams.get('courseId') || '';
    const branchId = searchParams.get('branchId') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { student: { name: { contains: search } } },
        { course: { title: { contains: search } } },
        { notes: { contains: search } },
      ];
    }

    if (studentId) {
      where.studentId = studentId;
    }

    if (courseId) {
      where.courseId = courseId;
    }

    if (branchId) {
      where.branchId = branchId;
    }

    if (status) {
      where.status = status;
    }

    const [enrollments, count] = await Promise.all([
      db.enrollment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { enrolledAt: 'desc' },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              phone: true,
              email: true,
              level: true,
              age: true,
            },
          },
          course: {
            select: {
              id: true,
              title: true,
              level: true,
              slug: true,
              color: true,
              icon: true,
            },
          },
          branch: {
            select: { id: true, name: true, city: true },
          },
        },
      }),
      db.enrollment.count({ where }),
    ]);

    return NextResponse.json({ data: enrollments, count, page, limit });
  } catch (error) {
    console.error('Enrollments GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch enrollments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      studentId,
      courseId,
      branchId,
      status,
      progress,
      notes,
      discountCode,
      referralCode,
      enrolledAt,
      completedAt,
    } = body;

    if (!studentId || !courseId) {
      return NextResponse.json(
        { error: 'studentId and courseId are required' },
        { status: 400 }
      );
    }

    const enrollment = await db.enrollment.create({
      data: {
        studentId,
        courseId,
        branchId: branchId || null,
        status: status || 'ACTIVE',
        progress: progress || 0,
        notes: notes || null,
        discountCode: discountCode || null,
        referralCode: referralCode || null,
        enrolledAt: enrolledAt ? new Date(enrolledAt) : new Date(),
        completedAt: completedAt ? new Date(completedAt) : null,
      },
      include: {
        student: { select: { id: true, name: true, phone: true, level: true } },
        course: { select: { id: true, title: true, level: true, color: true } },
        branch: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ data: enrollment }, { status: 201 });
  } catch (error) {
    console.error('Enrollment POST error:', error);
    return NextResponse.json({ error: 'Failed to create enrollment' }, { status: 500 });
  }
}
