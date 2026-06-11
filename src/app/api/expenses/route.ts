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
        { payee: { contains: search } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (branchId) {
      where.branchId = branchId;
    }

    if (dateFrom || dateTo) {
      where.paidAt = {
        ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
        ...(dateTo ? { lte: new Date(dateTo) } : {}),
      };
    }

    const [expenses, count] = await Promise.all([
      db.expense.findMany({
        where,
        skip,
        take: limit,
        orderBy: { paidAt: 'desc' },
        include: {
          branch: {
            select: { id: true, name: true, city: true },
          },
        },
      }),
      db.expense.count({ where }),
    ]);

    const aggregate = await db.expense.aggregate({
      _sum: { amount: true },
      _avg: { amount: true },
      where,
    });

    return NextResponse.json({
      data: expenses,
      count,
      page,
      limit,
      totalAmount: aggregate._sum.amount || 0,
      avgAmount: aggregate._avg.amount || 0,
    });
  } catch (error) {
    console.error('Expenses GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, category, description, branchId, payee, receiptUrl, paidAt } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'amount must be a positive number' }, { status: 400 });
    }

    const expense = await db.expense.create({
      data: {
        amount,
        category: category || 'OPERATIONAL',
        description: description || null,
        branchId: branchId || null,
        payee: payee || null,
        receiptUrl: receiptUrl || null,
        paidAt: paidAt ? new Date(paidAt) : new Date(),
      },
      include: {
        branch: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ data: expense }, { status: 201 });
  } catch (error) {
    console.error('Expense POST error:', error);
    return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
  }
}
