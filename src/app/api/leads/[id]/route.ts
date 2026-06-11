import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, phone, email, childName, childAge, interestedCourse, province, city, source, status, priority, notes, referralCode, assignedToId, branchId } = body;
    const lead = await db.lead.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(email !== undefined && { email }),
        ...(childName !== undefined && { childName }),
        ...(childAge !== undefined && { childAge }),
        ...(interestedCourse !== undefined && { interestedCourse }),
        ...(province !== undefined && { province }),
        ...(city !== undefined && { city }),
        ...(source !== undefined && { source }),
        ...(status !== undefined && { status }),
        ...(priority !== undefined && { priority }),
        ...(notes !== undefined && { notes }),
        ...(referralCode !== undefined && { referralCode }),
        ...(assignedToId !== undefined && { assignedToId }),
        ...(branchId !== undefined && { branchId }),
      },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        branch: { select: { id: true, name: true } },
        _count: { select: { followUps: true, leadNotes: true } },
      },
    });
    return NextResponse.json({ data: lead });
  } catch (error) {
    console.error('Lead PUT error:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.lead.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
