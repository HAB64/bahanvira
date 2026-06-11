import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const branchId = searchParams.get('branchId') || '';
    const dateFrom = searchParams.get('dateFrom') || '';
    const dateTo = searchParams.get('dateTo') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { description: { contains: search } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (branchId) {
      where.branchId = branchId;
    }

    if (dateFrom || dateTo) {
      where.receivedAt = {
        ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
        ...(dateTo ? { lte: new Date(dateTo) } : {}),
      };
    }

    const [revenues, count] = await Promise.all([
      db.revenue.findMany({
        where,
        skip,
        take: limit,
        orderBy: { receivedAt: 'desc' },
        include: {
          branch: {
            select: { id: true, name: true, city: true },
          },
        },
      }),
      db.revenue.count({ where }),
    ]);

    // Also return aggregate for the filtered set
    const aggregate = await db.revenue.aggregate({
      _sum: { amount: true },
      _avg: { amount: true },
      where,
    });

    return NextResponse.json({
      data: revenues,
      count,
      page,
      limit,
      totalAmount: aggregate._sum.amount || 0,
      avgAmount: aggregate._avg.amount || 0,
    });
  } catch (error) {
    console.error('Revenues GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch revenues' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, category, description, branchId, receivedAt } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'amount must be a positive number' }, { status: 400 });
    }

    const revenue = await db.revenue.create({
      data: {
        amount,
        category: category || 'TUITION',
        description: description || null,
        branchId: branchId || null,
        receivedAt: receivedAt ? new Date(receivedAt) : new Date(),
      },
      include: {
        branch: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ data: revenue }, { status: 201 });
  } catch (error) {
    console.error('Revenue POST error:', error);
    return NextResponse.json({ error: 'Failed to create revenue' }, { status: 500 });
  }
}
