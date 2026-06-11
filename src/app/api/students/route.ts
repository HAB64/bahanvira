import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const branchId = searchParams.get('branchId') || '';
    const level = searchParams.get('level') || '';
    const isActive = searchParams.get('isActive');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
        { parentName: { contains: search } },
      ];
    }

    if (branchId) {
      where.branchId = branchId;
    }

    if (level) {
      where.level = level;
    }

    if (isActive !== null && isActive !== undefined && isActive !== '') {
      where.isActive = isActive === 'true';
    }

    const [students, count] = await Promise.all([
      db.student.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          branch: {
            select: {
              id: true,
              name: true,
              city: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              enrollments: true,
              attendance: true,
              tuitions: true,
              examAttempts: true,
              certificates: true,
            },
          },
        },
      }),
      db.student.count({ where }),
    ]);

    return NextResponse.json({ data: students, count, page, limit });
  } catch (error) {
    console.error('Students GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      name,
      phone,
      email,
      age,
      parentName,
      parentPhone,
      level,
      province,
      city,
      address,
      referralCode,
      referredBy,
      isActive,
      branchId,
      enrolledAt,
    } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'name and phone are required' }, { status: 400 });
    }

    const student = await db.student.create({
      data: {
        userId: userId || null,
        name,
        phone,
        email: email || null,
        age: age || 7,
        parentName: parentName || null,
        parentPhone: parentPhone || null,
        level: level || 'BEGINNER',
        province: province || null,
        city: city || null,
        address: address || null,
        referralCode: referralCode || null,
        referredBy: referredBy || null,
        isActive: isActive !== undefined ? isActive : true,
        branchId: branchId || null,
        enrolledAt: enrolledAt ? new Date(enrolledAt) : new Date(),
      },
      include: {
        branch: {
          select: { id: true, name: true, city: true },
        },
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ data: student }, { status: 201 });
  } catch (error: unknown) {
    console.error('Student POST error:', error);
    const errMsg = error instanceof Error && error.message.includes('Unique')
      ? 'Student with this referral code or user already exists'
      : 'Failed to create student';
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
