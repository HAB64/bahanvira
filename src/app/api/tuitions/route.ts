import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const studentId = searchParams.get('studentId') || '';
    const courseId = searchParams.get('courseId') || '';
    const status = searchParams.get('status') || '';
    const paymentType = searchParams.get('paymentType') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { student: { name: { contains: search } } },
        { course: { title: { contains: search } } },
      ];
    }

    if (studentId) {
      where.studentId = studentId;
    }

    if (courseId) {
      where.courseId = courseId;
    }

    if (status) {
      where.status = status;
    }

    if (paymentType) {
      where.paymentType = paymentType;
    }

    const [tuitions, count] = await Promise.all([
      db.tuition.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              phone: true,
              email: true,
              level: true,
            },
          },
          course: {
            select: {
              id: true,
              title: true,
              level: true,
              price: true,
            },
          },
          payments: {
            orderBy: { paidAt: 'desc' },
          },
          _count: {
            select: { payments: true },
          },
        },
      }),
      db.tuition.count({ where }),
    ]);

    // Aggregate tuition info
    const aggregate = await db.tuition.aggregate({
      _sum: { totalAmount: true, paidAmount: true, discount: true },
      where,
    });

    return NextResponse.json({
      data: tuitions,
      count,
      page,
      limit,
      totalAmount: aggregate._sum.totalAmount || 0,
      totalPaid: aggregate._sum.paidAmount || 0,
      totalDiscount: aggregate._sum.discount || 0,
    });
  } catch (error) {
    console.error('Tuitions GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch tuitions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      studentId,
      courseId,
      totalAmount,
      paidAmount,
      discount,
      paymentType,
      installments,
      status,
      dueDate,
    } = body;

    if (!studentId || !courseId || !totalAmount) {
      return NextResponse.json(
        { error: 'studentId, courseId, and totalAmount are required' },
        { status: 400 }
      );
    }

    const tuition = await db.tuition.create({
      data: {
        studentId,
        courseId,
        totalAmount,
        paidAmount: paidAmount || 0,
        discount: discount || 0,
        paymentType: paymentType || 'CASH',
        installments: installments || 1,
        status: status || 'PENDING',
        dueDate: dueDate ? new Date(dueDate) : null,
      },
      include: {
        student: { select: { id: true, name: true, phone: true } },
        course: { select: { id: true, title: true } },
        payments: true,
      },
    });

    return NextResponse.json({ data: tuition }, { status: 201 });
  } catch (error) {
    console.error('Tuition POST error:', error);
    return NextResponse.json({ error: 'Failed to create tuition' }, { status: 500 });
  }
}
