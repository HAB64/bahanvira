'use client';

import { useState } from 'react';
import {
  UserPlus,
  DollarSign,
  TrendingUp,
  Phone,
  Eye,
  Edit3,
  Trash2,
  Gift,
  BarChart3,
  Users,
  Filter,
} from 'lucide-react';

interface Marketer {
  name: string;
  phone: string;
  code: string;
  referrals: number;
  commission: string;
  status: string;
}

interface CommissionRecord {
  marketer: string;
  student: string;
  amount: string;
  date: string;
  paid: string;
}

const marketersData: Marketer[] = [
  { name: 'مریم احمدی', phone: '۰۹۱۲۱۱۱۱۲۲۲', code: 'VIRA-001', referrals: 8, commission: '۲,۰۰۰,۰۰۰', status: 'فعال' },
  { name: 'حسین رضایی', phone: '۰۹۳۵۲۲۲۳۳۳۴', code: 'VIRA-002', referrals: 5, commission: '۱,۲۵۰,۰۰۰', status: 'فعال' },
  { name: 'زهرا کریمی', phone: '۰۹۱۰۳۳۳۴۴۴۵', code: 'VIRA-003', referrals: 12, commission: '۳,۰۰۰,۰۰۰', status: 'فعال' },
  { name: 'علی حسینی', phone: '۰۹۲۱۴۴۴۵۵۵۶', code: 'VIRA-004', referrals: 3, commission: '۷۵۰,۰۰۰', status: 'غیرفعال' },
  { name: 'نازنین محمدی', phone: '۰۹۳۸۵۵۵۶۶۶۷', code: 'VIRA-005', referrals: 7, commission: '۱,۷۵۰,۰۰۰', status: 'فعال' },
  { name: 'رضا موسوی', phone: '۰۹۱۹۶۶۶۷۷۷۸', code: 'VIRA-006', referrals: 2, commission: '۵۰۰,۰۰۰', status: 'غیرفعال' },
  { name: 'فاطمه جعفری', phone: '۰۹۳۳۷۷۷۸۸۸۹', code: 'VIRA-007', referrals: 9, commission: '۲,۲۵۰,۰۰۰', status: 'فعال' },
  { name: 'امیر صادقی', phone: '۰۹۱۲۸۸۸۹۹۹۰', code: 'VIRA-008', referrals: 4, commission: '۱,۰۰۰,۰۰۰', status: 'فعال' },
];

const commissionHistory: CommissionRecord[] = [
  { marketer: 'مریم احمدی', student: 'سارا نوری', amount: '۲۵۰,۰۰۰', date: '۱۴۰۴/۰۳/۲۰', paid: 'پرداخت شده' },
  { marketer: 'حسین رضایی', student: 'امیر کریمی', amount: '۲۵۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۹', paid: 'در انتظار' },
  { marketer: 'زهرا کریمی', student: 'نرگس رحمانی', amount: '۲۵۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۸', paid: 'پرداخت شده' },
  { marketer: 'مریم احمدی', student: 'دانیال قاسمی', amount: '۲۵۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۷', paid: 'پرداخت شده' },
  { marketer: 'نازنین محمدی', student: 'یاسمن عباسی', amount: '۲۵۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۶', paid: 'در انتظار' },
  { marketer: 'فاطمه جعفری', student: 'محمد تقوی', amount: '۲۵۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۵', paid: 'پرداخت شده' },
];

const summaryCards = [
  {
    title: 'بازاریاب فعال',
    value: '۱۲ نفر',
    icon: Users,
    color: 'from-teal-500 to-teal-600',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
  },
  {
    title: 'پورسانت پرداخت شده',
    value: '۸,۵۰۰,۰۰۰ تومان',
    icon: DollarSign,
    color: 'from-emerald-500 to-emerald-600',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'ثبت‌نام از طریق بازاریاب',
    value: '۳۵ نفر',
    icon: TrendingUp,
    color: 'from-purple-500 to-purple-600',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
];

export default function MarketersTab() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredMarketers = marketersData.filter((m) => {
    const matchesSearch =
      m.name.includes(search) ||
      m.phone.includes(search) ||
      m.code.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && m.status === 'فعال') ||
      (statusFilter === 'inactive' && m.status === 'غیرفعال');
    return matchesSearch && matchesStatus;
  });

  return (
    <div dir="rtl" className="space-y-6 p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex items-center gap-4"
            >
              <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-0.5">{card.title}</p>
                <p className="text-lg font-bold text-gray-800">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Marketers Section */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-bold text-gray-800">بازاریاب‌ها و پورسانت</h2>
          </div>
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
            <UserPlus className="w-4 h-4" />
            ثبت بازاریاب جدید
          </button>
        </div>

        {/* Filter / Search Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="جستجو بر اساس نام، شماره تماس یا کد معرفی..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all cursor-pointer"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="active">فعال</option>
              <option value="inactive">غیرفعال</option>
            </select>
          </div>
        </div>

        {/* Marketers Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">نام بازاریاب</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">شماره تماس</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">کد معرفی</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">تعداد ارجاع</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">پورسانت کل</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">وضعیت</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredMarketers.map((marketer) => (
                <tr
                  key={marketer.code}
                  className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                        {marketer.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">{marketer.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Phone className="w-3.5 h-3.5" />
                      <span className="text-xs tracking-wide" dir="ltr">{marketer.phone}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-orange-50 text-orange-600 border border-orange-200 text-xs font-mono px-2.5 py-1 rounded-lg" dir="ltr">
                      {marketer.code}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-700 font-medium">{marketer.referrals}</td>
                  <td className="px-5 py-4">
                    <span className="text-gray-800 font-medium">{marketer.commission}</span>
                    <span className="text-gray-400 text-xs mr-1">تومان</span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg border ${
                        marketer.status === 'فعال'
                          ? 'bg-emerald-100 text-emerald-600 border-emerald-200'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                    >
                      {marketer.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        title="مشاهده"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        title="ویرایش"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        title="حذف"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMarketers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-400 text-sm">
                    بازاریابی با این مشخصات یافت نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commission History Section */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center gap-2 p-5 border-b border-gray-100">
          <BarChart3 className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-bold text-gray-800">تاریخچه پورسانت‌ها</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">بازاریاب</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">دانش‌آموز</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">مبلغ پورسانت</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">تاریخ</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">وضعیت پرداخت</th>
              </tr>
            </thead>
            <tbody>
              {commissionHistory.map((record, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-gray-800">{record.marketer}</td>
                  <td className="px-5 py-4 text-gray-600">{record.student}</td>
                  <td className="px-5 py-4">
                    <span className="text-gray-800 font-medium">{record.amount}</span>
                    <span className="text-gray-400 text-xs mr-1">تومان</span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs" dir="ltr">{record.date}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg border ${
                        record.paid === 'پرداخت شده'
                          ? 'bg-emerald-100 text-emerald-600 border-emerald-200'
                          : 'bg-amber-100 text-amber-600 border-amber-200'
                      }`}
                    >
                      {record.paid}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}