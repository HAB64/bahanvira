import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const source = searchParams.get('source') || '';
    const priority = searchParams.get('priority') || '';
    const branchId = searchParams.get('branchId') || '';
    const assignedToId = searchParams.get('assignedToId') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
        { childName: { contains: search } },
        { interestedCourse: { contains: search } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (source) {
      where.source = source;
    }

    if (priority) {
      where.priority = priority;
    }

    if (branchId) {
      where.branchId = branchId;
    }

    if (assignedToId) {
      where.assignedToId = assignedToId;
    }

    const [leads, count] = await Promise.all([
      db.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          assignedTo: {
            select: { id: true, name: true, email: true, avatar: true },
          },
          branch: {
            select: { id: true, name: true, city: true },
          },
          _count: {
            select: { followUps: true, leadNotes: true },
          },
          consultation: {
            select: { id: true, scheduledAt: true, completedAt: true, result: true },
          },
        },
      }),
      db.lead.count({ where }),
    ]);

    return NextResponse.json({ data: leads, count, page, limit });
  } catch (error) {
    console.error('Leads GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      childName,
      childAge,
      interestedCourse,
      province,
      city,
      source,
      status,
      priority,
      notes,
      referralCode,
      assignedToId,
      branchId,
    } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'name and phone are required' }, { status: 400 });
    }

    const lead = await db.lead.create({
      data: {
        name,
        phone,
        email: email || null,
        childName: childName || null,
        childAge: childAge || null,
        interestedCourse: interestedCourse || null,
        province: province || null,
        city: city || null,
        source: source || 'WEBSITE_FORM',
        status: status || 'NEW',
        priority: priority || 'MEDIUM',
        notes: notes || null,
        referralCode: referralCode || null,
        assignedToId: assignedToId || null,
        branchId: branchId || null,
      },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        branch: { select: { id: true, name: true } },
        _count: { select: { followUps: true, leadNotes: true } },
      },
    });

    return NextResponse.json({ data: lead }, { status: 201 });
  } catch (error) {
    console.error('Lead POST error:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
