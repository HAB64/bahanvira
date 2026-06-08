'use client';

import { Users, UserPlus, TrendingUp, DollarSign, ClipboardList, Gift, Zap, PieChart, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { leadSourceLabels, type LeadSource } from '@/types';

interface DashboardStatsProps {
  stats: {
    totalStudents: number;
    activeStudents: number;
    totalLeads: number;
    newLeadsThisMonth: number;
    conversionRate: number;
    totalRevenue: number;
    monthlyRevenue: number;
    upcomingClasses: number;
    activeExams: number;
    pendingReferrals: number;
    leadSources: { source: LeadSource; count: number; percentage: number }[];
  };
  setActiveTab?: (tab: string) => void;
}

function formatNumber(num: number): string {
  return num.toLocaleString('fa-IR');
}

function formatCurrency(num: number): string {
  if (num >= 1000000) {
    return `${formatNumber(Math.round(num / 1000000))} میلیون`;
  }
  return `${formatNumber(Math.round(num / 1000))} هزار`;
}

export default function DashboardStats({ stats, setActiveTab }: DashboardStatsProps) {
  const cards = [
    {
      title: 'کل کارآموزان',
      value: formatNumber(stats.totalStudents),
      description: `${formatNumber(stats.activeStudents)} فعال`,
      icon: Users,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      title: 'کارآموزان فعال',
      value: formatNumber(stats.activeStudents),
      description: 'در حال حاضر',
      icon: UserPlus,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
    },
    {
      title: 'سرنخ‌های جدید',
      value: formatNumber(stats.newLeadsThisMonth),
      description: `${formatNumber(stats.totalLeads)} سرنخ کل`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      title: 'نرخ تبدیل',
      value: `%${formatNumber(stats.conversionRate)}`,
      description: 'سرنخ به ثبت‌نام',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      title: 'درآمد کل',
      value: formatCurrency(stats.totalRevenue),
      description: `${formatCurrency(stats.monthlyRevenue)} این ماه`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      title: 'درآمد ماهانه',
      value: formatCurrency(stats.monthlyRevenue),
      description: 'این ماه',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      title: 'آزمون‌های فعال',
      value: formatNumber(stats.activeExams),
      description: 'آزمون آماده',
      icon: ClipboardList,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200',
    },
    {
      title: 'معرف‌های در انتظار',
      value: formatNumber(stats.pendingReferrals),
      description: 'نیاز به پیگیری',
      icon: Gift,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
    },
  ];

  // Lead source data for the chart
  const leadSourceData = stats.leadSources.map(({ source, count, percentage }) => ({
    source: leadSourceLabels[source] || source,
    count,
    percentage,
  }));

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className={`border ${card.borderColor} hover:shadow-md transition-shadow`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                <p className="text-xs text-gray-500 mt-1">{card.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Sources Chart */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <PieChart className="w-5 h-5 text-amber-600" />
              منابع سرنخ‌ها
            </CardTitle>
          </CardHeader>
          <CardContent>
            {leadSourceData.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">داده‌ای موجود نیست</p>
            ) : (
              <div className="space-y-3">
                {leadSourceData.map(({ source, count, percentage }) => (
                  <div key={source} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-24 text-right shrink-0">{source}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full flex items-center justify-end px-2 transition-all"
                        style={{ width: `${Math.max(percentage, 8)}%` }}
                      >
                        <span className="text-xs text-white font-medium">{count}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 w-10 text-left">{percentage}%</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-teal-200">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-5 h-5 text-teal-600" />
              دسترسی سریع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => setActiveTab?.('leads')}
                className="gap-2 justify-center h-auto py-3"
              >
                <Plus className="w-4 h-4" />
                افزودن سرنخ
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveTab?.('students')}
                className="gap-2 justify-center h-auto py-3"
              >
                <UserPlus className="w-4 h-4" />
                افزودن کارآموز
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveTab?.('exams')}
                className="gap-2 justify-center h-auto py-3"
              >
                <ClipboardList className="w-4 h-4" />
                مشاهده آزمون‌ها
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveTab?.('referrals')}
                className="gap-2 justify-center h-auto py-3"
              >
                <Gift className="w-4 h-4" />
                پیگیری معرف‌ها
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
