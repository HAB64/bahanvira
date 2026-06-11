import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const branchId = searchParams.get('branchId') || '';
    const isActive = searchParams.get('isActive');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { user: { name: { contains: search } } },
        { user: { email: { contains: search } } },
        { specialties: { contains: search } },
        { bio: { contains: search } },
      ];
    }

    if (branchId) {
      where.branchId = branchId;
    }

    if (isActive !== null && isActive !== undefined && isActive !== '') {
      where.isActive = isActive === 'true';
    }

    const [instructors, count] = await Promise.all([
      db.instructor.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              avatar: true,
              isActive: true,
            },
          },
          branch: {
            select: {
              id: true,
              name: true,
              city: true,
            },
          },
          _count: {
            select: {
              classInstructor: true,
              examCreator: true,
              salaryRecords: true,
            },
          },
        },
      }),
      db.instructor.count({ where }),
    ]);

    return NextResponse.json({ data: instructors, count, page, limit });
  } catch (error) {
    console.error('Instructors GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch instructors' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, specialties, bio, rating, totalClasses, hireDate, salaryBase, isActive, branchId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const instructor = await db.instructor.create({
      data: {
        userId,
        specialties: specialties || '[]',
        bio: bio || null,
        rating: rating || 0,
        totalClasses: totalClasses || 0,
        hireDate: hireDate ? new Date(hireDate) : null,
        salaryBase: salaryBase || 0,
        isActive: isActive !== undefined ? isActive : true,
        branchId: branchId || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
        branch: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
    });

    return NextResponse.json({ data: instructor }, { status: 201 });
  } catch (error: unknown) {
    console.error('Instructor POST error:', error);
    const errMsg = error instanceof Error && error.message.includes('Unique')
      ? 'Instructor for this user already exists'
      : 'Failed to create instructor';
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
