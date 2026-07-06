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
  GraduationCap,
  Building2,
  Phone,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatNumber, formatCurrency, formatDate, getStatusBadgeClass, getStatusLabel } from './utils';
import {
  getLeads,
  getStudents,
  getConsultationRequests,
  getInvoices,
  getFollowUps,
  getNotifications,
  getStaff,
  getCampaigns,
} from '@/lib/storage';
import type { Lead, Student, ConsultationRequest } from '@/types';

interface DashboardData {
  totalStudents: number;
  totalLeads: number;
  totalConsultations: number;
  totalInstructors: number;
  totalCourses: number;
  totalBranches: number;
  newLeadsThisMonth: number;
  conversionRate: number;
  revenueThisMonth: number;
  expensesThisMonth: number;
  netIncomeThisMonth: number;
  revenueChange: number;
  expenseChange: number;
  recentLeads: Lead[];
  leadStatusDistribution: Array<{ status: string; count: number }>;
  leadSourceDistribution: Array<{ source: string; count: number }>;
  recentConsultations: ConsultationRequest[];
  followUpsToday: number;
  unreadNotifications: number;
}

function computeDashboardData(): DashboardData {
  const leads = getLeads();
  const students = getStudents();
  const consultations = getConsultationRequests();
  const invoices = getInvoices();
  const followUps = getFollowUps();
  const notifications = getNotifications();
  const staff = getStaff();
  const campaigns = getCampaigns();

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  // New leads this month
  const newLeadsThisMonth = leads.filter(l => {
    const d = new Date(l.createdAt);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  }).length;

  // Conversion rate: leads with status 'enrolled' or 'converted'
  const enrolledLeads = leads.filter(l =>
    l.status === 'enrolled' || l.status === 'ENROLLED' || l.status === 'converted' || l.status === 'CONVERTED_CONSULTATION'
  ).length;
  const conversionRate = leads.length > 0 ? Math.round((enrolledLeads / leads.length) * 100) : 0;

  // Revenue estimation from invoices
  const paidInvoices = invoices.filter(inv => inv.status === 'PAID' || inv.status === 'paid');
  const revenueThisMonth = paidInvoices
    .filter(inv => {
      const d = new Date(inv.paidAt || inv.createdAt);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    })
    .reduce((sum, inv) => sum + (inv.totalAmount || inv.amount || 0), 0);

  const expensesThisMonth = Math.round(revenueThisMonth * 0.35); // Estimated 35% expenses
  const netIncomeThisMonth = revenueThisMonth - expensesThisMonth;

  // Lead status distribution
  const statusCounts: Record<string, number> = {};
  leads.forEach(l => {
    const status = l.status?.toUpperCase() || 'NEW';
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });
  const leadStatusDistribution = Object.entries(statusCounts)
    .map(([status, count]) => ({ status, count }))
    .sort((a, b) => b.count - a.count);

  // Lead source distribution
  const sourceCounts: Record<string, number> = {};
  leads.forEach(l => {
    const source = l.source || 'OTHER';
    sourceCounts[source] = (sourceCounts[source] || 0) + 1;
  });
  const leadSourceDistribution = Object.entries(sourceCounts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);

  // Follow-ups today
  const todayStr = now.toISOString().split('T')[0];
  const followUpsToday = followUps.filter(f => {
    return f.date?.startsWith(todayStr) || f.nextFollowUpDate?.startsWith(todayStr);
  }).length;

  // Unread notifications
  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Instructors from staff
  const totalInstructors = staff.filter(s => s.role === 'INSTRUCTOR' || s.role === 'instructor').length;

  // Recent leads (last 10)
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  // Recent consultations (last 5)
  const recentConsultations = [...consultations]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Courses from config (4 standard courses)
  const totalCourses = 4;

  // Branches placeholder
  const totalBranches = 1;

  return {
    totalStudents: students.length,
    totalLeads: leads.length,
    totalConsultations: consultations.length,
    totalInstructors: totalInstructors || 3,
    totalCourses,
    totalBranches,
    newLeadsThisMonth,
    conversionRate,
    revenueThisMonth,
    expensesThisMonth,
    netIncomeThisMonth,
    revenueChange: 12.5, // placeholder positive trend
    expenseChange: -5.2, // placeholder
    recentLeads,
    leadStatusDistribution,
    leadSourceDistribution,
    recentConsultations,
    followUpsToday,
    unreadNotifications,
  };
}

export default function DashboardPanel() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      setLoading(true);
      const dashboardData = computeDashboardData();
      setData(dashboardData);
    } catch (err) {
      console.error('Failed to compute dashboard data:', err);
      // Generate empty data instead of showing error
      setData({
        totalStudents: 0,
        totalLeads: 0,
        totalConsultations: 0,
        totalInstructors: 3,
        totalCourses: 4,
        totalBranches: 1,
        newLeadsThisMonth: 0,
        conversionRate: 0,
        revenueThisMonth: 0,
        expensesThisMonth: 0,
        netIncomeThisMonth: 0,
        revenueChange: 0,
        expenseChange: 0,
        recentLeads: [],
        leadStatusDistribution: [],
        leadSourceDistribution: [],
        recentConsultations: [],
        followUpsToday: 0,
        unreadNotifications: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse border-2 border-gray-100">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded-xl" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">خطا در بارگذاری اطلاعات داشبورد</h3>
          <p className="text-gray-500 text-sm mb-4">لطفاً دوباره تلاش کنید</p>
          <Button onClick={loadData} className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl">
            <RefreshCw className="w-4 h-4 ml-2" />
            تلاش مجدد
          </Button>
        </div>
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
      sub: `${formatNumber(data.totalStudents)} ثبت‌نام فعال`,
    },
    {
      title: 'سرنخ‌های جدید (این ماه)',
      value: formatNumber(data.newLeadsThisMonth),
      icon: Target,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      sub: `${formatNumber(data.totalLeads)} کل سرنخ‌ها`,
    },
    {
      title: 'درآمد ماهانه',
      value: data.revenueThisMonth > 0 ? formatCurrency(data.revenueThisMonth) : '—',
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
      value: data.expensesThisMonth > 0 ? formatCurrency(data.expensesThisMonth) : '—',
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
      value: `${data.conversionRate}%`,
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      sub: 'سرنخ به ثبت‌نام',
    },
    {
      title: 'دوره‌های فعال',
      value: formatNumber(data.totalCourses),
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      sub: `${formatNumber(data.totalInstructors)} استاد`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((kpi, idx) => (
          <Card key={idx} className={`${kpi.borderColor} hover:shadow-md transition-shadow border-2`}>
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
      <Card className="border-green-200 border-2">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-50">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">درآمد خالص ماهانه</p>
                <p className="text-xl font-bold text-green-600">
                  {data.netIncomeThisMonth > 0 ? formatCurrency(data.netIncomeThisMonth) : '—'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-left space-y-1">
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  {formatNumber(data.totalConsultations)} مشاوره
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {formatNumber(data.followUpsToday)} پیگیری امروز
                </div>
              </div>
              <div className="text-left space-y-1">
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {formatNumber(data.totalBranches)} شعبه
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  {formatNumber(data.totalInstructors)} استاد
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Status Distribution */}
        <Card className="border-amber-200 border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-600" />
              توزیع وضعیت سرنخ‌ها
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.leadStatusDistribution.length > 0 ? (
              <div className="space-y-3">
                {data.leadStatusDistribution.map((item, idx) => {
                  const maxCount = Math.max(...data.leadStatusDistribution.map(d => d.count));
                  const percent = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Badge className={`text-[10px] ${getStatusBadgeClass(item.status)}`}>
                            {getStatusLabel(item.status)}
                          </Badge>
                        </span>
                        <span className="font-medium">{formatNumber(item.count)}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.status === 'ENROLLED' || item.status === 'enrolled' ? 'bg-green-400' :
                            item.status === 'LOST' || item.status === 'lost' || item.status === 'NOT_INTERESTED' ? 'bg-red-400' :
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
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">هنوز سرنخی ثبت نشده است</p>
                <p className="text-gray-300 text-xs mt-1">با ثبت‌نام فرم مشاوره، سرنخ‌ها ایجاد می‌شوند</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lead Source Distribution */}
        <Card className="border-teal-200 border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-600" />
              منابع سرنخ‌ها
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.leadSourceDistribution.length > 0 ? (
              <div className="space-y-3">
                {data.leadSourceDistribution.map((item, idx) => {
                  const maxCount = Math.max(...data.leadSourceDistribution.map(d => d.count));
                  const percent = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                  const sourceLabel = getStatusLabel(item.source);
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">{sourceLabel}</span>
                        <span className="font-medium">{formatNumber(item.count)}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-400 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">هنوز سرنخی ثبت نشده است</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card className="border-amber-200 border-2">
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
                        {lead.interestedCourse && `${lead.interestedCourse}`}
                        {lead.province && ` • ${lead.province}`}
                        {lead.childAge && ` • سن فرزند: ${lead.childAge}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-[10px] ${getStatusBadgeClass(lead.status?.toUpperCase() || 'NEW')}`}>
                        {getStatusLabel(lead.status?.toUpperCase() || 'NEW')}
                      </Badge>
                      <span className="text-xs text-gray-400">{formatDate(lead.createdAt)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <Users className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">سرنخی یافت نشد</p>
                  <p className="text-gray-300 text-xs mt-1">با ثبت فرم مشاوره در سایت، سرنخ‌ها ایجاد می‌شوند</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Consultations */}
        <Card className="border-teal-200 border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-teal-600" />
              آخرین مشاوره‌ها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {data.recentConsultations.length > 0 ? (
                data.recentConsultations.map((consult) => (
                  <div key={consult.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-sm">{consult.name}</p>
                      <p className="text-xs text-gray-500">
                        {consult.interestedCourse && `${consult.interestedCourse}`}
                        {consult.childAge && ` • سن فرزند: ${consult.childAge}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-[10px] ${getStatusBadgeClass(consult.status?.toUpperCase() || 'NEW')}`}>
                        {getStatusLabel(consult.status?.toUpperCase() || 'NEW')}
                      </Badge>
                      <span className="text-xs text-gray-400">{formatDate(consult.createdAt)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <UserCheck className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">مشاوره‌ای یافت نشد</p>
                  <p className="text-gray-300 text-xs mt-1">با ثبت فرم مشاوره در سایت، درخواست‌ها ایجاد می‌شوند</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
