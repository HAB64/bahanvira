'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  BarChart3,
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
  UserCheck,
  CreditCard,
} from 'lucide-react';
import { formatNumber, formatCurrency, formatDate, getStatusBadgeClass, getStatusLabel } from './utils';

interface DashboardData {
  totalStudents: number;
  totalLeads: number;
  totalInstructors: number;
  totalCourses: number;
  totalBranches: number;
  totalEnrollments: number;
  activeCourses: number;
  activeEnrollments: number;
  newLeadsThisMonth: number;
  conversionRate: number;
  pendingTuitions: number;
  outstandingAmount: number;
  revenueThisMonth: number;
  expensesThisMonth: number;
  netIncomeThisMonth: number;
  revenueChange: number;
  expenseChange: number;
  recentLeads: Array<{
    id: string;
    name: string;
    phone: string;
    source: string;
    status: string;
    childName?: string;
    createdAt: string;
    assignedTo?: { id: string; name: string };
    branch?: { id: string; name: string };
  }>;
  recentEnrollments?: Array<{
    id: string;
    student: { name: string };
    course: { title: string };
    enrolledAt: string;
    status: string;
  }>;
  leadStatusDistribution: Array<{ status: string; _count: { status: number } }>;
  enrollmentByCourse: Array<{ courseName: string; count: number }>;
  monthlyRevenue: Array<{ amount: number; receivedAt: string }>;
  monthlyExpenses: Array<{ amount: number; paidAt: string }>;
}

export default function DashboardPanel() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/stats');
      if (res.ok) {
        const json = await res.json();
        setData(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12 text-gray-500">
        خطا در بارگذاری اطلاعات داشبورد
      </div>
    );
  }

  const kpiCards = [
    {
      title: 'کل کارآموزان',
      value: formatNumber(data.totalStudents),
      icon: Users,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      sub: `${formatNumber(data.activeEnrollments)} ثبت‌نام فعال`,
    },
    {
      title: 'سرنخ‌های جدید',
      value: formatNumber(data.newLeadsThisMonth),
      icon: Target,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      sub: `${formatNumber(data.totalLeads)} کل سرنخ‌ها`,
    },
    {
      title: 'درآمد ماهانه',
      value: formatCurrency(data.revenueThisMonth),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      sub: data.revenueChange >= 0 ? (
        <span className="text-green-600 flex items-center gap-1">
          <ArrowUpRight className="w-3 h-3" />
          {Math.abs(data.revenueChange).toFixed(1)}%
        </span>
      ) : (
        <span className="text-red-600 flex items-center gap-1">
          <ArrowDownRight className="w-3 h-3" />
          {Math.abs(data.revenueChange).toFixed(1)}%
        </span>
      ),
    },
    {
      title: 'هزینه ماهانه',
      value: formatCurrency(data.expensesThisMonth),
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      sub: data.expenseChange >= 0 ? (
        <span className="text-red-600 flex items-center gap-1">
          <ArrowUpRight className="w-3 h-3" />
          {Math.abs(data.expenseChange).toFixed(1)}%
        </span>
      ) : (
        <span className="text-green-600 flex items-center gap-1">
          <ArrowDownRight className="w-3 h-3" />
          {Math.abs(data.expenseChange).toFixed(1)}%
        </span>
      ),
    },
    {
      title: 'نرخ تبدیل',
      value: `${data.conversionRate.toFixed(1)}%`,
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      sub: 'سرنخ به ثبت‌نام',
    },
    {
      title: 'دوره‌های فعال',
      value: formatNumber(data.activeCourses),
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      sub: `${formatNumber(data.totalCourses)} کل دوره‌ها`,
    },
  ];

  // Prepare monthly revenue vs expenses chart data
  const monthlyData = prepareMonthlyData(data.monthlyRevenue, data.monthlyExpenses);

  // Lead source distribution
  const leadSourceData = data.leadStatusDistribution || [];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((kpi, idx) => (
          <Card key={idx} className={`${kpi.borderColor} hover:shadow-md transition-shadow`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">{kpi.title}</p>
                  <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                  <div className="text-xs text-gray-500">{kpi.sub}</div>
                </div>
                <div className={`p-2.5 rounded-xl ${kpi.bgColor}`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Financial Summary */}
      <Card className="border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-50">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">درآمد خالص ماهانه</p>
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(data.netIncomeThisMonth)}
                </p>
              </div>
            </div>
            <div className="text-left space-y-1">
              <div className="text-xs text-gray-500">
                شهریه‌های معلق: <span className="text-amber-600 font-medium">{formatCurrency(data.outstandingAmount)}</span>
              </div>
              <div className="text-xs text-gray-500">
                تعداد: <span className="font-medium">{formatNumber(data.pendingTuitions)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Chart */}
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              درآمد و هزینه ۶ ماه اخیر
            </CardTitle>
          </CardHeader>
          <CardContent>
            {monthlyData.length > 0 ? (
              <div className="space-y-3">
                {monthlyData.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{item.month}</span>
                      <span className="flex gap-3">
                        <span className="text-green-600">درآمد: {formatCurrency(item.revenue)}</span>
                        <span className="text-red-600">هزینه: {formatCurrency(item.expense)}</span>
                      </span>
                    </div>
                    <div className="flex gap-1 h-6">
                      <div
                        className="bg-green-400 rounded-sm transition-all duration-500"
                        style={{
                          width: `${item.revenuePercent}%`,
                          minWidth: item.revenue > 0 ? '4px' : '0',
                        }}
                      />
                      <div
                        className="bg-red-400 rounded-sm transition-all duration-500"
                        style={{
                          width: `${item.expensePercent}%`,
                          minWidth: item.expense > 0 ? '4px' : '0',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400 text-sm">
                داده‌ای برای نمایش وجود ندارد
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lead Status Distribution */}
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-600" />
              توزیع وضعیت سرنخ‌ها
            </CardTitle>
          </CardHeader>
          <CardContent>
            {leadSourceData.length > 0 ? (
              <div className="space-y-3">
                {leadSourceData.map((item, idx) => {
                  const maxCount = Math.max(...leadSourceData.map(d => d._count.status));
                  const percent = maxCount > 0 ? (item._count.status / maxCount) * 100 : 0;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Badge className={getStatusBadgeClass(item.status)}>
                            {getStatusLabel(item.status)}
                          </Badge>
                        </span>
                        <span className="font-medium">{formatNumber(item._count.status)}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.status === 'ENROLLED' ? 'bg-green-400' :
                            item.status === 'LOST' || item.status === 'NOT_INTERESTED' ? 'bg-red-400' :
                            'bg-amber-400'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400 text-sm">
                داده‌ای برای نمایش وجود ندارد
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card className="border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-600" />
              آخرین سرنخ‌ها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {data.recentLeads.length > 0 ? (
                data.recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-sm">{lead.name}</p>
                      <p className="text-xs text-gray-500">
                        {lead.childName && `فرزند: ${lead.childName}`}
                        {lead.assignedTo && ` • مسئول: ${lead.assignedTo.name}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-[10px] ${getStatusBadgeClass(lead.status)}`}>
                        {getStatusLabel(lead.status)}
                      </Badge>
                      <span className="text-xs text-gray-400">{formatDate(lead.createdAt)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-400 text-sm">سرنخی یافت نشد</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enrollment by Course */}
        <Card className="border-teal-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-teal-600" />
              ثبت‌نام بر اساس دوره
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {data.enrollmentByCourse.length > 0 ? (
                data.enrollmentByCourse.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-sm">{item.courseName}</p>
                    </div>
                    <Badge className="bg-teal-100 text-teal-800">
                      {formatNumber(item.count)} ثبت‌نام
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-400 text-sm">ثبت‌نامی یافت نشد</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function prepareMonthlyData(
  revenues: Array<{ amount: number; receivedAt: string }>,
  expenses: Array<{ amount: number; paidAt: string }>
) {
  const months: Record<string, { revenue: number; expense: number }> = {};

  for (const r of revenues) {
    const d = new Date(r.receivedAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!months[key]) months[key] = { revenue: 0, expense: 0 };
    months[key].revenue += r.amount;
  }

  for (const e of expenses) {
    const d = new Date(e.paidAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!months[key]) months[key] = { revenue: 0, expense: 0 };
    months[key].expense += e.amount;
  }

  const sortedKeys = Object.keys(months).sort().slice(-6);
  const maxVal = Math.max(
    ...sortedKeys.map(k => Math.max(months[k].revenue, months[k].expense)),
    1
  );

  const persianMonths = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];

  return sortedKeys.map(key => {
    const [y, m] = key.split('-').map(Number);
    // Simple mapping - note this is approximate
    const monthName = persianMonths[(m - 1)] || key;
    const rev = months[key].revenue;
    const exp = months[key].expense;
    return {
      month: monthName,
      revenue: rev,
      expense: exp,
      revenuePercent: (rev / maxVal) * 100,
      expensePercent: (exp / maxVal) * 100,
    };
  });
}
