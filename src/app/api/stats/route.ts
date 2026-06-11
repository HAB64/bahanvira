import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const branchId = searchParams.get('branchId') || undefined;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Total counts
    const [
      totalStudents,
      totalLeads,
      totalInstructors,
      totalCourses,
      totalBranches,
      totalEnrollments,
      totalExams,
    ] = await Promise.all([
      db.student.count({ where: branchId ? { branchId } : {} }),
      db.lead.count({ where: branchId ? { branchId } : {} }),
      db.instructor.count({ where: branchId ? { branchId } : {} }),
      db.course.count({ where: branchId ? { branchId } : {} }),
      db.branch.count(),
      db.enrollment.count({ where: branchId ? { branchId } : {} }),
      db.exam.count(),
    ]);

    // Revenue this month
    const revenueThisMonth = await db.revenue.aggregate({
      _sum: { amount: true },
      where: {
        receivedAt: { gte: startOfMonth },
        ...(branchId ? { branchId } : {}),
      },
    });

    // Revenue last month
    const revenueLastMonth = await db.revenue.aggregate({
      _sum: { amount: true },
      where: {
        receivedAt: { gte: startOfLastMonth, lte: endOfLastMonth },
        ...(branchId ? { branchId } : {}),
      },
    });

    // Expenses this month
    const expensesThisMonth = await db.expense.aggregate({
      _sum: { amount: true },
      where: {
        paidAt: { gte: startOfMonth },
        ...(branchId ? { branchId } : {}),
      },
    });

    // Expenses last month
    const expensesLastMonth = await db.expense.aggregate({
      _sum: { amount: true },
      where: {
        paidAt: { gte: startOfLastMonth, lte: endOfLastMonth },
        ...(branchId ? { branchId } : {}),
      },
    });

    // Active courses
    const activeCourses = await db.course.count({
      where: {
        status: 'ACTIVE',
        ...(branchId ? { branchId } : {}),
      },
    });

    // New leads this month
    const newLeadsThisMonth = await db.lead.count({
      where: {
        createdAt: { gte: startOfMonth },
        ...(branchId ? { branchId } : {}),
      },
    });

    // Enrolled leads (conversion)
    const enrolledLeads = await db.lead.count({
      where: {
        status: 'ENROLLED',
        ...(branchId ? { branchId } : {}),
      },
    });

    // Conversion rate
    const conversionRate = totalLeads > 0 ? (enrolledLeads / totalLeads) * 100 : 0;

    // Active enrollments
    const activeEnrollments = await db.enrollment.count({
      where: {
        status: 'ACTIVE',
        ...(branchId ? { branchId } : {}),
      },
    });

    // Pending tuitions
    const pendingTuitions = await db.tuition.count({
      where: { status: { in: ['PENDING', 'PARTIAL', 'OVERDUE'] } },
    });

    // Tuition outstanding amount
    const tuitionOutstanding = await db.tuition.aggregate({
      _sum: { totalAmount: true, paidAmount: true },
      where: { status: { in: ['PENDING', 'PARTIAL', 'OVERDUE'] } },
    });

    const outstandingAmount =
      (tuitionOutstanding._sum.totalAmount || 0) - (tuitionOutstanding._sum.paidAmount || 0);

    // Recent leads (last 5)
    const recentLeads = await db.lead.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      where: branchId ? { branchId } : {},
      include: {
        assignedTo: { select: { id: true, name: true } },
        branch: { select: { id: true, name: true } },
      },
    });

    // Revenue by month (last 6 months)
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const revenues = await db.revenue.findMany({
      where: {
        receivedAt: { gte: sixMonthsAgo },
        ...(branchId ? { branchId } : {}),
      },
      select: { amount: true, receivedAt: true },
    });

    const expenses = await db.expense.findMany({
      where: {
        paidAt: { gte: sixMonthsAgo },
        ...(branchId ? { branchId } : {}),
      },
      select: { amount: true, paidAt: true },
    });

    // Lead status distribution
    const leadStatusDistribution = await db.lead.groupBy({
      by: ['status'],
      _count: { status: true },
      where: branchId ? { branchId } : {},
    });

    // Enrollment by course
    const enrollmentByCourse = await db.enrollment.groupBy({
      by: ['courseId'],
      _count: { courseId: true },
      where: {
        status: 'ACTIVE',
        ...(branchId ? { branchId } : {}),
      },
    });

    // Get course names for enrollment by course
    const courseIds = enrollmentByCourse.map((e) => e.courseId);
    const courses = await db.course.findMany({
      where: { id: { in: courseIds } },
      select: { id: true, title: true },
    });
    const courseMap = new Map(courses.map((c) => [c.id, c.title]));

    const enrollmentByCourseNamed = enrollmentByCourse.map((e) => ({
      courseId: e.courseId,
      courseName: courseMap.get(e.courseId) || 'Unknown',
      count: e._count.courseId,
    }));

    const currentRevenue = revenueThisMonth._sum.amount || 0;
    const lastRevenue = revenueLastMonth._sum.amount || 0;
    const currentExpenses = expensesThisMonth._sum.amount || 0;
    const lastExpenses = expensesLastMonth._sum.amount || 0;

    const revenueChange = lastRevenue > 0 ? ((currentRevenue - lastRevenue) / lastRevenue) * 100 : 0;
    const expenseChange = lastExpenses > 0 ? ((currentExpenses - lastExpenses) / lastExpenses) * 100 : 0;

    return NextResponse.json({
      data: {
        totalStudents,
        totalLeads,
        totalInstructors,
        totalCourses,
        totalBranches,
        totalEnrollments,
        totalExams,
        activeCourses,
        activeEnrollments,
        newLeadsThisMonth,
        conversionRate: Math.round(conversionRate * 100) / 100,
        pendingTuitions,
        outstandingAmount,
        revenueThisMonth: currentRevenue,
        expensesThisMonth: currentExpenses,
        netIncomeThisMonth: currentRevenue - currentExpenses,
        revenueLastMonth: lastRevenue,
        expensesLastMonth: lastExpenses,
        revenueChange: Math.round(revenueChange * 100) / 100,
        expenseChange: Math.round(expenseChange * 100) / 100,
        recentLeads,
        leadStatusDistribution,
        enrollmentByCourse: enrollmentByCourseNamed,
        monthlyRevenue: revenues,
        monthlyExpenses: expenses,
      },
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}
