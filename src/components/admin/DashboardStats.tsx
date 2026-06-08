'use client';

import { Users, UserPlus, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardStatsProps {
  stats: {
    totalStudents: number;
    totalLeads: number;
    newLeadsThisMonth: number;
    conversionRate: number;
    totalRevenue: number;
    monthlyRevenue: number;
    pendingReferrals: number;
  };
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

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const cards = [
    {
      title: 'کل کارآموزان',
      value: formatNumber(stats.totalStudents),
      description: `${formatNumber(stats.totalLeads)} سرنخ کل`,
      icon: Users,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      title: 'سرنخ‌های جدید',
      value: formatNumber(stats.newLeadsThisMonth),
      description: 'این ماه',
      icon: UserPlus,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
    },
    {
      title: 'نرخ تبدیل',
      value: `%${formatNumber(stats.conversionRate)}`,
      description: 'سرنخ به ثبت‌نام',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
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
  ];

  return (
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
  );
}
