import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const isActive = searchParams.get('isActive');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { code: { contains: search } },
        { city: { contains: search } },
        { province: { contains: search } },
      ];
    }

    if (isActive !== null && isActive !== undefined && isActive !== '') {
      where.isActive = isActive === 'true';
    }

    const [branches, count] = await Promise.all([
      db.branch.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: {
              students: true,
              instructors: true,
              classes: true,
              courses: true,
              enrollments: true,
            },
          },
        },
      }),
      db.branch.count({ where }),
    ]);

    return NextResponse.json({ data: branches, count, page, limit });
  } catch (error) {
    console.error('Branches GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch branches' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, code, province, city, address, phone, managerName, isActive } = body;

    if (!name || !code || !province || !city) {
      return NextResponse.json(
        { error: 'name, code, province, and city are required' },
        { status: 400 }
      );
    }

    const branch = await db.branch.create({
      data: {
        name,
        code,
        province,
        city,
        address: address || null,
        phone: phone || null,
        managerName: managerName || null,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({ data: branch }, { status: 201 });
  } catch (error: unknown) {
    console.error('Branch POST error:', error);
    const errMsg = error instanceof Error && error.message.includes('Unique')
      ? 'Branch code already exists'
      : 'Failed to create branch';
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
