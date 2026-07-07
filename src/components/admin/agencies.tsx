'use client';

import { useState, useMemo } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Users,
  Plus,
  Eye,
  Edit3,
  Trash2,
  Star,
  TrendingUp,
  Globe,
} from 'lucide-react';

interface Agency {
  id: number;
  name: string;
  city: string;
  manager: string;
  phone: string;
  students: number;
  status: 'فعال' | 'در انتظار تایید' | 'غیرفعال';
}

const sampleAgencies: Agency[] = [
  { id: 1, name: 'نمایندگی مشهد', city: 'مشهد', manager: 'مستر نوری', phone: '۰۵۱-۳۷۶۵۴۳۲۱', students: 65, status: 'فعال' },
  { id: 2, name: 'نمایندگی اصفهان', city: 'اصفهان', manager: 'مستر رحیمی', phone: '۰۳۱-۳۴۵۶۷۸۹۰', students: 48, status: 'فعال' },
  { id: 3, name: 'نمایندگی شیراز', city: 'شیراز', manager: 'مستر صادقی', phone: '۰۷۱-۳۲۳۴۵۶۷', students: 35, status: 'فعال' },
  { id: 4, name: 'نمایندگی تبریز', city: 'تبریز', manager: 'مستر قاسمی', phone: '۰۴۱-۳۳۴۵۶۷۸۹', students: 22, status: 'در انتظار تایید' },
  { id: 5, name: 'نمایندگی کرج', city: 'کرج', manager: 'مستر عباسی', phone: '۰۲۶-۳۳۴۵۶۷۸', students: 18, status: 'غیرفعال' },
];

const statusColorMap: Record<Agency['status'], string> = {
  'فعال': 'bg-emerald-100 text-emerald-600 border-emerald-200',
  'در انتظار تایید': 'bg-amber-100 text-amber-600 border-amber-200',
  'غیرفعال': 'bg-slate-100 text-slate-500 border-slate-200',
};

const summaryCards = [
  { label: 'نمایندگی فعال', value: '۸', icon: Building2, color: 'orange' },
  { label: 'شهر تحت پوشش', value: '۱۲', icon: MapPin, color: 'teal' },
  { label: 'دانش‌آموز نمایندگی', value: '۴۵۰', icon: Users, color: 'purple' },
  { label: 'میانگین ثبت‌نام ماهانه', value: '۳۵', icon: TrendingUp, color: 'emerald' },
] as const;

const cardColorClasses: Record<string, { bg: string; icon: string; text: string }> = {
  orange: { bg: 'bg-orange-50', icon: 'bg-orange-100 text-orange-500', text: 'text-orange-600' },
  teal: { bg: 'bg-teal-50', icon: 'bg-teal-100 text-teal-500', text: 'text-teal-600' },
  purple: { bg: 'bg-purple-50', icon: 'bg-purple-100 text-purple-500', text: 'text-purple-600' },
  emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-100 text-emerald-500', text: 'text-emerald-600' },
};

const topRankColors = [
  { star: 'text-yellow-500', ring: 'ring-yellow-400', label: 'رتبه اول' },
  { star: 'text-gray-400', ring: 'ring-gray-300', label: 'رتبه دوم' },
  { star: 'text-amber-700', ring: 'ring-amber-600', label: 'رتبه سوم' },
];

export default function AgenciesTab() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('همه');

  const filteredAgencies = useMemo(() => {
    return sampleAgencies.filter((agency) => {
      const matchesSearch =
        search.trim() === '' ||
        agency.name.includes(search.trim()) ||
        agency.city.includes(search.trim());
      const matchesStatus =
        statusFilter === 'همه' || agency.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const topAgencies = useMemo(() => {
    return [...sampleAgencies]
      .sort((a, b) => b.students - a.students)
      .slice(0, 3);
  }, []);

  return (
    <div dir="rtl" className="space-y-8 p-2 md:p-4">
      {/* ─── Summary Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaryCards.map((card) => {
          const colors = cardColorClasses[card.color];
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`rounded-2xl border border-gray-100 ${colors.bg} p-5 flex items-center gap-4 shadow-sm`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center shrink-0`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className={`text-2xl font-bold ${colors.text} mt-0.5`}>
                  {card.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Toolbar: Add + Search + Filter ─── */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm shrink-0">
          <Plus className="w-5 h-5" />
          ثبت نمایندگی جدید
        </button>

        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="جستجو بر اساس نام یا شهر..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pe-4 ps-11 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition"
            />
            <Globe className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition appearance-none cursor-pointer min-w-[160px]"
          >
            <option value="همه">همه وضعیت‌ها</option>
            <option value="فعال">فعال</option>
            <option value="در انتظار تایید">در انتظار تایید</option>
            <option value="غیرفعال">غیرفعال</option>
          </select>
        </div>
      </div>

      {/* ─── Agencies Cards Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredAgencies.map((agency) => (
          <div
            key={agency.id}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-base leading-tight">
                    {agency.name}
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {agency.city}
                  </span>
                </div>
              </div>
              <span
                className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg border ${statusColorMap[agency.status]}`}
              >
                {agency.status}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-2.5 mb-5 flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-gray-400 shrink-0" />
                <span>مدیر: {agency.manager}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                <span dir="ltr" className="text-left w-full">
                  {agency.phone}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-gray-400 shrink-0" />
                <span>
                  تعداد دانش‌آموز:{' '}
                  <span className="font-semibold text-gray-800">
                    {agency.students}
                  </span>
                  نفر
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <button className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-500 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
                مشاهده
              </button>
              <button className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                <Edit3 className="w-4 h-4" />
                ویرایش
              </button>
              <button className="inline-flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors mr-auto">
                <Trash2 className="w-4 h-4" />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredAgencies.length === 0 && (
        <div className="text-center py-16">
          <Building2 className="w-14 h-14 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">نمایندگی‌ای یافت نشد</p>
          <p className="text-sm text-gray-400 mt-1">
            عبارت جستجو یا فیلتر وضعیت را تغییر دهید
          </p>
        </div>
      )}

      {/* ─── Top Agencies Ranking ─── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
          <Star className="w-5 h-5 text-orange-400" />
          برترین نمایندگی‌ها
        </h2>

        <div className="space-y-4">
          {topAgencies.map((agency, index) => {
            const rank = topRankColors[index];
            return (
              <div
                key={agency.id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                  index === 0
                    ? 'border-yellow-200 bg-yellow-50/60'
                    : index === 1
                      ? 'border-gray-200 bg-gray-50/60'
                      : 'border-amber-200 bg-amber-50/40'
                }`}
              >
                {/* Rank Medal */}
                <div
                  className={`w-10 h-10 rounded-full ${rank.ring} ring-2 flex items-center justify-center shrink-0 bg-white`}
                >
                  <Star
                    className={`w-5 h-5 ${rank.star} fill-current`}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm">
                    {agency.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{agency.city}</p>
                </div>

                {/* Students count */}
                <div className="text-left shrink-0">
                  <p className="text-lg font-bold text-gray-800">
                    {agency.students}
                  </p>
                  <p className="text-xs text-gray-400">{rank.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}