import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { message: { contains: search } },
        { targetGroup: { contains: search } },
      ];
    }

    if (type) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    const [campaigns, count] = await Promise.all([
      db.campaign.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      db.campaign.count({ where }),
    ]);

    // Aggregate stats
    const aggregate = await db.campaign.aggregate({
      _sum: { totalSent: true, totalOpened: true, totalClicked: true },
      where,
    });

    return NextResponse.json({
      data: campaigns,
      count,
      page,
      limit,
      totalSent: aggregate._sum.totalSent || 0,
      totalOpened: aggregate._sum.totalOpened || 0,
      totalClicked: aggregate._sum.totalClicked || 0,
    });
  } catch (error) {
    console.error('Campaigns GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      type,
      status,
      targetGroup,
      message,
      scheduledAt,
      sentAt,
      totalSent,
      totalOpened,
      totalClicked,
    } = body;

    if (!title || !message) {
      return NextResponse.json(
        { error: 'title and message are required' },
        { status: 400 }
      );
    }

    const campaign = await db.campaign.create({
      data: {
        title,
        type: type || 'sms',
        status: status || 'draft',
        targetGroup: targetGroup || null,
        message,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        sentAt: sentAt ? new Date(sentAt) : null,
        totalSent: totalSent || 0,
        totalOpened: totalOpened || 0,
        totalClicked: totalClicked || 0,
      },
    });

    return NextResponse.json({ data: campaign }, { status: 201 });
  } catch (error) {
    console.error('Campaign POST error:', error);
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}
