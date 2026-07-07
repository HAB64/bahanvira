'use client'

import { BarChart3, TrendingUp, Users, Award, Star } from 'lucide-react'

const summaryCards = [
  {
    title: 'کل دانش‌آموزان',
    value: '۲۴۸',
    change: '+۱۲٪',
    positive: true,
    icon: Users,
    color: 'blue',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
  },
  {
    title: 'درآمد ماهانه',
    value: '۴۵,۰۰۰,۰۰۰',
    change: '+۸٪',
    positive: true,
    icon: BarChart3,
    color: 'emerald',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
  },
  {
    title: 'میانگین نمره آزمون',
    value: '۸۷.۵',
    change: '+۳.۲',
    positive: true,
    icon: Award,
    color: 'purple',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
  },
  {
    title: 'نرخ رشد',
    value: '۱۸٪',
    change: '+۵٪',
    positive: true,
    icon: TrendingUp,
    color: 'orange',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
  },
]

const monthlyRegistrations = [
  { month: 'فروردین', value: 85 },
  { month: 'اردیبهشت', value: 62 },
  { month: 'خرداد', value: 95 },
  { month: 'تیر', value: 78 },
  { month: 'مرداد', value: 110 },
  { month: 'شهریور', value: 88 },
]

const revenueData = [
  { month: 'فروردین', value: 32 },
  { month: 'اردیبهشت', value: 28 },
  { month: 'خرداد', value: 45 },
  { month: 'تیر', value: 38 },
  { month: 'مرداد', value: 52 },
  { month: 'شهریور', value: 41 },
]

const topPerformers = [
  { rank: 1, name: 'فاطمه حسینی', score: 98.5, class: 'چرتکه پیشرفته', trend: 'up' },
  { rank: 2, name: 'علی رضایی', score: 97.2, class: 'چرتکه پیشرفته', trend: 'up' },
  { rank: 3, name: 'زهرا محمدی', score: 96.8, class: 'حساب ذهنی ۳', trend: 'same' },
  { rank: 4, name: 'حسین کریمی', score: 95.4, class: 'چرتکه متوسط', trend: 'up' },
  { rank: 5, name: 'مریم احمدی', score: 94.1, class: 'حساب ذهنی ۳', trend: 'down' },
]

const maxRegistration = Math.max(...monthlyRegistrations.map((d) => d.value))
const maxRevenue = Math.max(...revenueData.map((d) => d.value))

export default function ReportsTab() {
  return (
    <div dir="rtl" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">گزارش‌ها و آمار</h2>
        <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-100 px-4 py-2 text-sm text-slate-500">
          <BarChart3 className="w-4 h-4 text-orange-500" />
          دوره گزارش: تیر ۱۴۰۴
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-400 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-slate-800">{card.value}</p>
              </div>
              <div className={`${card.bg} p-2.5 rounded-xl`}>
                <card.icon className={`w-5 h-5 ${card.text}`} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">{card.change}</span>
              <span className="text-xs text-slate-400 mr-1">نسبت به ماه قبل</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Registrations Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-bold text-slate-800">ثبت‌نام ماهانه</h3>
          </div>
          <div className="flex items-end justify-between gap-3 h-48">
            {monthlyRegistrations.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-slate-700">{item.value}</span>
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-orange-500 hover:to-orange-400 cursor-pointer min-h-[8px]"
                  style={{ height: `${(item.value / maxRegistration) * 160}px` }}
                />
                <span className="text-[10px] text-slate-400">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-800">روند درآمد (میلیون تومان)</h3>
          </div>
          <div className="flex items-end justify-between gap-3 h-48">
            {revenueData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-slate-700">{item.value}</span>
                <div
                  className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all hover:from-orange-500 hover:to-orange-400 cursor-pointer min-h-[8px]"
                  style={{ height: `${(item.value / maxRevenue) * 160}px` }}
                />
                <span className="text-[10px] text-slate-400">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-2 p-6 pb-4">
          <Star className="w-5 h-5 text-orange-500" />
          <h3 className="text-sm font-bold text-slate-800">برترین دانش‌آموزان</h3>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50">
              <th className="text-right py-3 px-6 font-medium">رتبه</th>
              <th className="text-right py-3 px-6 font-medium">نام دانش‌آموز</th>
              <th className="text-right py-3 px-6 font-medium">کلاس</th>
              <th className="text-right py-3 px-6 font-medium">نمره</th>
              <th className="text-right py-3 px-6 font-medium">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {topPerformers.map((student) => (
              <tr
                key={student.rank}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-3.5 px-6">
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold
                      ${student.rank === 1 ? 'bg-yellow-100 text-yellow-700' : ''}
                      ${student.rank === 2 ? 'bg-gray-100 text-gray-600' : ''}
                      ${student.rank === 3 ? 'bg-orange-100 text-orange-700' : ''}
                      ${student.rank > 3 ? 'bg-slate-50 text-slate-500' : ''}
                    `}
                  >
                    {student.rank}
                  </span>
                </td>
                <td className="py-3.5 px-6 text-sm font-medium text-slate-800">{student.name}</td>
                <td className="py-3.5 px-6 text-sm text-slate-500">{student.class}</td>
                <td className="py-3.5 px-6 text-sm font-bold text-slate-800">{student.score}</td>
                <td className="py-3.5 px-6">
                  <span className="flex items-center gap-1 text-xs">
                    {student.trend === 'up' && (
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                    {student.trend === 'up' && <span className="text-emerald-600 font-medium">صعودی</span>}
                    {student.trend === 'same' && <span className="text-slate-400 font-medium">ثابت</span>}
                    {student.trend === 'down' && <span className="text-red-500 font-medium">نزولی</span>}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}