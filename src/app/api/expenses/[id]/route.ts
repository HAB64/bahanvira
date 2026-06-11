import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { amount, category, description, branchId, payee, receiptUrl, paidAt } = body;
    const expense = await db.expense.update({
      where: { id },
      data: {
        ...(amount !== undefined && { amount }),
        ...(category !== undefined && { category }),
        ...(description !== undefined && { description }),
        ...(branchId !== undefined && { branchId }),
        ...(payee !== undefined && { payee }),
        ...(receiptUrl !== undefined && { receiptUrl }),
        ...(paidAt !== undefined && { paidAt: paidAt ? new Date(paidAt) : new Date() }),
      },
      include: { branch: { select: { id: true, name: true } } },
    });
    return NextResponse.json({ data: expense });
  } catch (error) {
    console.error('Expense PUT error:', error);
    return NextResponse.json({ error: 'Failed to update expense' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.expense.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Expense DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete expense' }, { status: 500 });
  }
}
