'use client';

import { useState } from 'react';
import {
  Users,
  GraduationCap,
  Lock,
  LogOut,
  BarChart3,
  BookOpen,
  Settings,
  ChevronDown,
  Bell,
  Home,
  FolderOpen,
  Shield,
  PieChart,
  CreditCard,
  ClipboardList,
  UserCheck,
  UserPlus,
  TrendingUp,
  Award,
  MessageSquare,
  Phone,
  Mail,
  CalendarDays,
  FileText,
  Megaphone,
  Building2,
  Gift,
  Send,
  HelpCircle as SupportIcon,
  Play,
  X,
  Plus,
  Search,
  Eye,
  Edit3,
  Trash2,
  Calendar as CalendarIcon,
} from 'lucide-react';

// Tab components
import MarketersTab from '@/components/admin/marketers';
import AgenciesTab from '@/components/admin/agencies';
import LMSTab from '@/components/admin/lms';
import CalendarTab from '@/components/admin/calendar';
import ReportsTab from '@/components/admin/reports';
import SupportTab from '@/components/admin/support';
import FilesTab from '@/components/admin/files';
import PaymentsTab from '@/components/admin/payments';
import MarketingTab from '@/components/admin/marketing';
import EmailsTab from '@/components/admin/emails';

/* ═══════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════ */

type TabKey =
  | 'dashboard'
  | 'students'
  | 'classes'
  | 'exams'
  | 'crm'
  | 'financial'
  | 'users'
  | 'settings'
  | 'marketers'
  | 'agencies'
  | 'lms'
  | 'calendar'
  | 'reports'
  | 'support'
  | 'files'
  | 'payments'
  | 'marketing'
  | 'emails';

interface MenuItem {
  key: TabKey;
  label: string;
  icon: React.ElementType;
}

interface MenuCategory {
  title: string;
  icon: React.ElementType;
  items: MenuItem[];
}

/* ═══════════════════════════════════════════════════
   Sidebar Config — Complete like bahanrayaneh.ir
   ═══════════════════════════════════════════════════ */

const sidebarCategories: MenuCategory[] = [
  {
    title: 'داشبورد و گزارشات',
    icon: BarChart3,
    items: [
      { key: 'dashboard', label: 'داشبورد', icon: Home },
      { key: 'reports', label: 'گزارش‌ها و تحلیل', icon: BarChart3 },
    ],
  },
  {
    title: 'مدیریت آموزشی',
    icon: BookOpen,
    items: [
      { key: 'students', label: 'دانش‌آموزان', icon: Users },
      { key: 'classes', label: 'کلاس‌ها', icon: BookOpen },
      { key: 'exams', label: 'آزمون‌ها', icon: ClipboardList },
      { key: 'lms', label: 'مدیریت محتوا (LMS)', icon: Play },
      { key: 'calendar', label: 'تقویم و برنامه‌ریزی', icon: CalendarDays },
    ],
  },
  {
    title: 'مدیریت و پیکربندی',
    icon: Settings,
    items: [
      { key: 'users', label: 'کاربران و نقش‌ها', icon: Shield },
      { key: 'payments', label: 'پرداخت و فاکتورها', icon: CreditCard },
      { key: 'financial', label: 'مدیریت مالی', icon: TrendingUp },
      { key: 'files', label: 'مدیریت فایل‌ها', icon: FileText },
      { key: 'settings', label: 'تنظیمات', icon: Settings },
    ],
  },
  {
    title: 'پشتیبانی و CRM',
    icon: UserCheck,
    items: [
      { key: 'crm', label: 'مدیریت CRM', icon: UserCheck },
      { key: 'support', label: 'پشتیبانی (تیکت)', icon: SupportIcon },
    ],
  },
  {
    title: 'بازاریابی و فروش',
    icon: Megaphone,
    items: [
      { key: 'marketers', label: 'بازاریاب‌ها و پورسانت', icon: Gift },
      { key: 'agencies', label: 'نمایندگی‌ها', icon: Building2 },
      { key: 'marketing', label: 'کمپین‌ها و بازاریابی', icon: Megaphone },
      { key: 'emails', label: 'قالب ایمیل و پیامک', icon: Send },
    ],
  },
];

/* ═══════════════════════════════════════════════════
   Dashboard Data (inline — main overview)
   ═══════════════════════════════════════════════════ */

const dashboardStats = [
  { label: 'دانش‌آموز فعال', value: '۱۲۳', icon: Users, color: 'text-orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  { label: 'مربی', value: '۸', icon: GraduationCap, color: 'text-teal-500', bgColor: 'bg-teal-50', borderColor: 'border-teal-200' },
  { label: 'کلاس فعال', value: '۱۵', icon: BookOpen, color: 'text-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  { label: 'درآمد ماهانه', value: '۲۵M', icon: TrendingUp, color: 'text-emerald-500', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
  { label: 'سرنخ CRM', value: '۴۷', icon: UserPlus, color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  { label: 'نرخ تبدیل', value: '۶۸٪', icon: PieChart, color: 'text-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  { label: 'بازاریاب فعال', value: '۱۲', icon: Gift, color: 'text-rose-500', bgColor: 'bg-rose-50', borderColor: 'border-rose-200' },
  { label: 'نمایندگی', value: '۸', icon: Building2, color: 'text-indigo-500', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
];

const quickModules = [
  { title: 'مدیریت CRM', desc: 'مدیریت ارتباط با مشتریان و پیگیری سرنخ‌ها', icon: UserCheck, color: 'from-orange-400 to-orange-600', count: 4, target: 'crm' as TabKey },
  { title: 'بازاریاب‌ها', desc: 'مدیریت بازاریاب‌ها و محاسبه پورسانت', icon: Gift, color: 'from-rose-400 to-rose-600', count: 2, target: 'marketers' as TabKey },
  { title: 'نمایندگی‌ها', desc: 'مدیریت شعب و نمایندگی‌های آموزشگاه', icon: Building2, color: 'from-indigo-400 to-indigo-600', count: 3, target: 'agencies' as TabKey },
  { title: 'مدیریت محتوا', desc: 'LMS و مدیریت جلسات آموزشی', icon: Play, color: 'from-teal-400 to-teal-600', count: 5, target: 'lms' as TabKey },
  { title: 'گزارشات پیشرفته', desc: 'تحلیل داده‌ها و نمودارهای عملکرد', icon: BarChart3, color: 'from-purple-400 to-purple-600', count: 2, target: 'reports' as TabKey },
  { title: 'پرداخت و فاکتور', desc: 'صدور فاکتور و پیگیری پرداخت‌ها', icon: CreditCard, color: 'from-emerald-400 to-emerald-600', count: 8, target: 'payments' as TabKey },
  { title: 'پشتیبانی', desc: 'مدیریت تیکت‌ها و پشتیبانی آنلاین', icon: SupportIcon, color: 'from-blue-400 to-blue-600', count: 5, target: 'support' as TabKey },
  { title: 'بازاریابی', desc: 'کمپین‌ها، ایمیل و پیامک', icon: Megaphone, color: 'from-amber-400 to-amber-600', count: 3, target: 'marketing' as TabKey },
];

const recentRegistrations = [
  { name: 'سارا احمدی', phone: '۰۹۱۲۱۲۳۴۵۶۷', date: '۱۴۰۴/۰۳/۲۰', course: 'چرتکه مبتدی', status: 'فعال' },
  { name: 'محمد رضایی', phone: '۰۹۳۵۶۷۸۹۰۱۲', date: '۱۴۰۴/۰۳/۱۹', course: 'حساب ذهنی ۱', status: 'در انتظار' },
  { name: 'فاطمه حسینی', phone: '۰۹۱۰۳۴۵۶۷۸۹', date: '۱۴۰۴/۰۳/۱۸', course: 'چرتکه متوسط', status: 'فعال' },
  { name: 'امیر کریمی', phone: '۰۹۲۱۲۳۴۵۶۷۸', date: '۱۴۰۴/۰۳/۱۷', course: 'چرتکه مبتدی', status: 'فعال' },
  { name: 'نازنین عباسی', phone: '۰۹۳۸۹۰۱۲۳۴۵', date: '۱۴۰۴/۰۳/۱۶', course: 'آمادگی مسابقات', status: 'غیرفعال' },
];

const recentExamResults = [
  { student: 'سارا احمدی', exam: 'آزمون جمع و تفریق', score: '۹/۱۰', date: '۱۴۰۴/۰۳/۲۰' },
  { student: 'محمد رضایی', exam: 'آزمون ضرب', score: '۷/۱۰', date: '۱۴۰۴/۰۳/۱۹' },
  { student: 'فاطمه حسینی', exam: 'آزمون سرعت', score: '۱۸/۲۰', date: '۱۴۰۴/۰۳/۱۸' },
  { student: 'امیر کریمی', exam: 'آزمون جامع', score: '۲۲/۳۰', date: '۱۴۰۴/۰۳/۱۷' },
  { student: 'نازنین عباسی', exam: 'آزمون سطح ۳', score: '۸/۱۰', date: '۱۴۰۴/۰۳/۱۶' },
];

const statusColors: Record<string, string> = {
  'فعال': 'bg-emerald-100 text-emerald-600 border-emerald-200',
  'در انتظار': 'bg-amber-100 text-amber-600 border-amber-200',
  'غیرفعال': 'bg-slate-100 text-slate-500 border-slate-200',
  'بسته شده': 'bg-slate-100 text-slate-500 border-slate-200',
};

/* ═══════════════════════════════════════════════════
   Inline Tabs (Dashboard, Students, Classes, Exams, CRM, Financial, Users, Settings)
   ═══════════════════════════════════════════════════ */

/* ─── Dashboard ─── */
function DashboardTab() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4">
              <div className={`shrink-0 w-12 h-12 rounded-xl ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-slate-900 truncate">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">ماژول‌های پیشنهادی</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div key={mod.title} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all text-right group cursor-pointer">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{mod.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{mod.desc}</p>
                <span className="text-xs text-orange-500 font-medium">{mod.count} آیتم فعال</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-slate-900">آخرین ثبت‌نام‌ها</h3>
            <Plus className="w-5 h-5 text-slate-400 cursor-pointer hover:text-orange-500 transition-colors" />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-gray-100">
                <th className="text-right pb-3 font-medium">نام</th>
                <th className="text-right pb-3 font-medium hidden sm:table-cell">دوره</th>
                <th className="text-right pb-3 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentRegistrations.map((r, idx) => (
                <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                  <td className="py-3 text-slate-900 font-medium">{r.name}</td>
                  <td className="py-3 text-slate-500 hidden sm:table-cell">{r.course}</td>
                  <td className="py-3"><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[r.status] || ''}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-slate-900">آزمون‌های اخیر</h3>
            <GraduationCap className="w-5 h-5 text-slate-400" />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-gray-100">
                <th className="text-right pb-3 font-medium">دانش‌آموز</th>
                <th className="text-right pb-3 font-medium hidden sm:table-cell">آزمون</th>
                <th className="text-right pb-3 font-medium">نمره</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentExamResults.map((r, idx) => (
                <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                  <td className="py-3 text-slate-900 font-medium">{r.student}</td>
                  <td className="py-3 text-slate-500 hidden sm:table-cell">{r.exam}</td>
                  <td className="py-3 text-emerald-600 font-bold">{r.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── Students (simplified — full data is demo) ─── */
function StudentsTab() {
  const [search, setSearch] = useState('');
  const students = [
    { name: 'سارا احمدی', phone: '۰۹۱۲۱۲۳۴۵۶۷', level: 'سطح ۳', date: '۱۴۰۴/۰۱/۱۵', status: 'فعال', paid: 'تسویه شده' },
    { name: 'محمد رضایی', phone: '۰۹۳۵۶۷۸۹۰۱۲', level: 'سطح ۲', date: '۱۴۰۴/۰۲/۰۵', status: 'فعال', paid: 'تسویه شده' },
    { name: 'فاطمه حسینی', phone: '۰۹۱۰۳۴۵۶۷۸۹', level: 'سطح ۵', date: '۱۴۰۳/۱۲/۲۰', status: 'فعال', paid: 'تسویه شده' },
    { name: 'امیر کریمی', phone: '۰۹۲۱۲۳۴۵۶۷۸', level: 'سطح ۱', date: '۱۴۰۴/۰۳/۰۱', status: 'در انتظار', paid: 'پرداخت نشده' },
    { name: 'نازنین عباسی', phone: '۰۹۳۸۹۰۱۲۳۴۵', level: 'سطح ۴', date: '۱۴۰۴/۰۱/۱۰', status: 'غیرفعال', paid: 'بدهکار' },
    { name: 'رضا طاهری', phone: '۰۹۱۵۶۷۸۱۲۳۴', level: 'سطح ۲', date: '۱۴۰۴/۰۲/۲۰', status: 'فعال', paid: 'تسویه شده' },
  ];
  const filtered = students.filter((s) => s.name.includes(search) || s.phone.includes(search));
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" dir="rtl">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-bold text-slate-900">لیست دانش‌آموزان</h3>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="جستجو..." className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" />
          </div>
          <button className="shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl flex items-center gap-1.5"><Plus className="w-4 h-4" />افزودن</button>
        </div>
      </div>
      <table className="w-full text-sm">
        <thead><tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50">
          <th className="text-right py-3 px-4 font-medium">نام</th><th className="text-right py-3 px-4 font-medium hidden md:table-cell">تلفن</th><th className="text-right py-3 px-4 font-medium">سطح</th><th className="text-right py-3 px-4 font-medium hidden sm:table-cell">تاریخ</th><th className="text-right py-3 px-4 font-medium">وضعیت</th><th className="text-right py-3 px-4 font-medium">عملیات</th>
        </tr></thead>
        <tbody className="divide-y divide-gray-50">
          {filtered.map((s, i) => (
            <tr key={i} className="hover:bg-orange-50/30 transition-colors">
              <td className="py-3 px-4 text-slate-900 font-medium">{s.name}</td>
              <td className="py-3 px-4 text-slate-500 hidden md:table-cell" dir="ltr">{s.phone}</td>
              <td className="py-3 px-4 text-slate-600">{s.level}</td>
              <td className="py-3 px-4 text-slate-500 hidden sm:table-cell">{s.date}</td>
              <td className="py-3 px-4"><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[s.status]}`}>{s.status}</span></td>
              <td className="py-3 px-4"><div className="flex gap-1"><button className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500"><Eye className="w-4 h-4" /></button><button className="p-1.5 rounded-lg hover:bg-orange-50 text-slate-400 hover:text-orange-500"><Edit3 className="w-4 h-4" /></button><button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Classes ─── */
function ClassesTab() {
  const classes = [
    { name: 'چرتکه مبتدی - گروه الف', instructor: 'استاد رضایی', students: 18, schedule: 'شنبه و دوشنبه - ۱۶:۰۰' },
    { name: 'چرتکه مبتدی - گروه ب', instructor: 'استاد احمدی', students: 15, schedule: 'یکشنبه و سه‌شنبه - ۱۵:۰۰' },
    { name: 'چرتکه متوسط', instructor: 'استاد کریمی', students: 12, schedule: 'شنبه و چهارشنبه - ۱۷:۰۰' },
    { name: 'چرتکه پیشرفته', instructor: 'استاد حسینی', students: 8, schedule: 'دوشنبه و پنجشنبه - ۱۴:۰۰' },
    { name: 'حساب ذهنی ۱', instructor: 'استاد محمدی', students: 20, schedule: 'سه‌شنبه و پنجشنبه - ۱۶:۰۰' },
    { name: 'آمادگی مسابقات', instructor: 'استاد رضایی', students: 6, schedule: 'پنجشنبه - ۱۰:۰۰' },
  ];
  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">لیست کلاس‌ها</h3>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl flex items-center gap-1.5"><Plus className="w-4 h-4" />ایجاد کلاس</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <h4 className="text-sm font-bold text-slate-900 leading-6 mb-4">{cls.name}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-500 flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" />مربی</span><span className="text-slate-900 font-medium">{cls.instructor}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />دانش‌آموز</span><span className="text-slate-900 font-medium">{cls.students} نفر</span></div>
              <div className="flex justify-between"><span className="text-slate-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />برنامه</span><span className="text-slate-900 font-medium text-xs">{cls.schedule}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Exams ─── */
function ExamsTab() {
  const exams = [
    { name: 'آزمون سطح ۱', students: 35, avgScore: '۸۵٪', date: '۱۴۰۴/۰۳/۱۵', status: 'بسته شده' },
    { name: 'آزمون سطح ۳', students: 28, avgScore: '۷۸٪', date: '۱۴۰۴/۰۳/۱۰', status: 'بسته شده' },
    { name: 'آزمون سرعت', students: 42, avgScore: '۷۲٪', date: '۱۴۰۴/۰۲/۲۸', status: 'بسته شده' },
    { name: 'آزمون جامع', students: 15, avgScore: '۸۰٪', date: '۱۴۰۴/۰۳/۲۲', status: 'فعال' },
    { name: 'آزمون ضرب', students: 30, avgScore: '۸۲٪', date: '۱۴۰۴/۰۳/۲۵', status: 'فعال' },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" dir="rtl">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">لیست آزمون‌ها</h3>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl flex items-center gap-1.5"><Plus className="w-4 h-4" />ایجاد آزمون</button>
      </div>
      <table className="w-full text-sm">
        <thead><tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50">
          <th className="text-right py-3 px-4 font-medium">نام آزمون</th><th className="text-right py-3 px-4 font-medium">شرکت‌کننده</th><th className="text-right py-3 px-4 font-medium hidden sm:table-cell">میانگین</th><th className="text-right py-3 px-4 font-medium">تاریخ</th><th className="text-right py-3 px-4 font-medium">وضعیت</th><th className="text-right py-3 px-4 font-medium">عملیات</th>
        </tr></thead>
        <tbody className="divide-y divide-gray-50">
          {exams.map((e, i) => (
            <tr key={i} className="hover:bg-orange-50/30 transition-colors">
              <td className="py-3 px-4 text-slate-900 font-medium">{e.name}</td>
              <td className="py-3 px-4 text-slate-600">{e.students} نفر</td>
              <td className="py-3 px-4 text-emerald-600 font-bold hidden sm:table-cell">{e.avgScore}</td>
              <td className="py-3 px-4 text-slate-500">{e.date}</td>
              <td className="py-3 px-4"><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[e.status]}`}>{e.status}</span></td>
              <td className="py-3 px-4"><div className="flex gap-1"><button className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500"><Eye className="w-4 h-4" /></button><button className="p-1.5 rounded-lg hover:bg-orange-50 text-slate-400 hover:text-orange-500"><Edit3 className="w-4 h-4" /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── CRM (simplified inline) ─── */
function CRMInlineTab() {
  const [search, setSearch] = useState('');
  const leads = [
    { name: 'زهرا محمدی', phone: '۰۹۱۲۳۴۵۶۷۸۹', source: 'اینستاگرام', status: 'ثبت‌نام شده', course: 'چرتکه مبتدی', date: '۱۴۰۴/۰۳/۲۰', assignee: 'مستر رضایی' },
    { name: 'علی حسینی', phone: '۰۹۳۵۶۷۸۹۰۱۲', source: 'وبسایت', status: 'تماس گرفته شد', course: 'حساب ذهنی ۱', date: '۱۴۰۴/۰۳/۱۹', assignee: 'مستر احمدی' },
    { name: 'مینا رضایی', phone: '۰۹۱۰۱۲۳۴۵۶۷', source: 'معرفی', status: 'جلسه مشاوره', course: 'چرتکه متوسط', date: '۱۴۰۴/۰۳/۱۸', assignee: 'مستر کریمی' },
    { name: 'امیر کریمی', phone: '۰۹۲۱۲۳۴۵۶۷۸', source: 'تلگرام', status: 'جدید', course: 'چرتکه مبتدی', date: '۱۴۰۴/۰۳/۲۲', assignee: '-' },
    { name: 'فاطمه عباسی', phone: '۰۹۱۵۶۷۸۱۲۳۴', source: 'اینستاگرام', status: 'غیرفعال', course: 'چرتکه پیشرفته', date: '۱۴۰۴/۰۲/۱۰', assignee: 'مستر رضایی' },
  ];
  const crmStatusColors: Record<string, string> = {
    'جدید': 'bg-blue-100 text-blue-600 border-blue-200',
    'تماس گرفته شد': 'bg-amber-100 text-amber-600 border-amber-200',
    'جلسه مشاوره': 'bg-purple-100 text-purple-600 border-purple-200',
    'ثبت‌نام شده': 'bg-emerald-100 text-emerald-600 border-emerald-200',
    'غیرفعال': 'bg-slate-100 text-slate-500 border-slate-200',
  };
  const filtered = leads.filter((l) => l.name.includes(search) || l.phone.includes(search));
  return (
    <div className="space-y-6" dir="rtl">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Object.entries({ 'جدید': 2, 'تماس گرفته شد': 1, 'جلسه مشاوره': 1, 'ثبت‌نام شده': 1, 'غیرفعال': 1 }).map(([status, count]) => (
          <div key={status} className={`p-4 rounded-2xl border text-center ${crmStatusColors[status]}`}>
            <div className="text-2xl font-bold">{count}</div>
            <div className="text-xs font-medium mt-1">{status}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="جستجوی سرنخ..." className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" />
        </div>
        <button className="shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl flex items-center gap-1.5"><UserPlus className="w-4 h-4" />سرنخ جدید</button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50">
            <th className="text-right py-3 px-4 font-medium">نام</th><th className="text-right py-3 px-4 font-medium hidden md:table-cell">تلفن</th><th className="text-right py-3 px-4 font-medium hidden lg:table-cell">منبع</th><th className="text-right py-3 px-4 font-medium">دوره</th><th className="text-right py-3 px-4 font-medium">وضعیت</th><th className="text-right py-3 px-4 font-medium hidden sm:table-cell">مسئول</th><th className="text-right py-3 px-4 font-medium">عملیات</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((l, i) => (
              <tr key={i} className="hover:bg-orange-50/30 transition-colors">
                <td className="py-3 px-4 text-slate-900 font-medium">{l.name}</td>
                <td className="py-3 px-4 text-slate-500 hidden md:table-cell" dir="ltr">{l.phone}</td>
                <td className="py-3 px-4 text-slate-600 hidden lg:table-cell">{l.source}</td>
                <td className="py-3 px-4 text-slate-600">{l.course}</td>
                <td className="py-3 px-4"><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${crmStatusColors[l.status]}`}>{l.status}</span></td>
                <td className="py-3 px-4 text-slate-600 hidden sm:table-cell">{l.assignee}</td>
                <td className="py-3 px-4"><div className="flex gap-1"><button className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500"><Eye className="w-4 h-4" /></button><button className="p-1.5 rounded-lg hover:bg-green-50 text-slate-400 hover:text-green-500"><PhoneIcon className="w-4 h-4" /></button><button className="p-1.5 rounded-lg hover:bg-purple-50 text-slate-400 hover:text-purple-500"><MessageSquare className="w-4 h-4" /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Financial ─── */
function FinancialTab() {
  const txs = [
    { desc: 'شهریه چرتکه مبتدی - سارا احمدی', amount: '+۲,۵۰۰,۰۰۰', date: '۱۴۰۴/۰۳/۲۰', type: 'درآمد', status: 'تسویه' },
    { desc: 'حقوق مربی رضایی - اردیبهشت', amount: '-۸,۰۰۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۵', type: 'هزینه', status: 'پرداخت شده' },
    { desc: 'شهریه حساب ذهنی - محمد رضایی', amount: '+۲,۰۰۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۹', type: 'درآمد', status: 'تسویه' },
    { desc: 'اجاره محل آموزشگاه', amount: '-۱۵,۰۰۰,۰۰۰', date: '۱۴۰۴/۰۳/۰۱', type: 'هزینه', status: 'پرداخت شده' },
  ];
  const finStatusColors: Record<string, string> = {
    'درآمد': 'bg-emerald-100 text-emerald-600 border-emerald-200',
    'هزینه': 'bg-rose-100 text-rose-600 border-rose-200',
    'تسویه': 'bg-emerald-100 text-emerald-600 border-emerald-200',
    'پرداخت شده': 'bg-slate-100 text-slate-500 border-slate-200',
  };
  return (
    <div className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100"><div className="text-xs text-slate-400 mb-1">کل درآمد</div><div className="text-2xl font-bold text-emerald-600">۴۵,۰۰۰,۰۰۰</div><div className="text-xs text-slate-400 mt-1">تومان</div></div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100"><div className="text-xs text-slate-400 mb-1">کل هزینه</div><div className="text-2xl font-bold text-rose-600">۲۴,۵۰۰,۰۰۰</div><div className="text-xs text-slate-400 mt-1">تومان</div></div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100"><div className="text-xs text-slate-400 mb-1">سود خالص</div><div className="text-2xl font-bold text-slate-900">۲۰,۵۰۰,۰۰۰</div><div className="text-xs text-slate-400 mt-1">تومان</div></div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">تراکنش‌های اخیر</h3>
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl flex items-center gap-1.5"><Plus className="w-4 h-4" />ثبت تراکنش</button>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50">
            <th className="text-right py-3 px-4 font-medium">توضیحات</th><th className="text-right py-3 px-4 font-medium">مبلغ</th><th className="text-right py-3 px-4 font-medium hidden sm:table-cell">نوع</th><th className="text-right py-3 px-4 font-medium">تاریخ</th><th className="text-right py-3 px-4 font-medium">وضعیت</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-50">
            {txs.map((tx, i) => (
              <tr key={i} className="hover:bg-orange-50/30 transition-colors">
                <td className="py-3 px-4 text-slate-900 font-medium">{tx.desc}</td>
                <td className={`py-3 px-4 font-bold ${tx.type === 'درآمد' ? 'text-emerald-600' : 'text-rose-600'}`}>{tx.amount}</td>
                <td className="py-3 px-4 hidden sm:table-cell"><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${finStatusColors[tx.type]}`}>{tx.type}</span></td>
                <td className="py-3 px-4 text-slate-500">{tx.date}</td>
                <td className="py-3 px-4"><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${finStatusColors[tx.status]}`}>{tx.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Users ─── */
function UsersTab() {
  const users = [
    { name: 'مستر رضایی', role: 'مدیر', phone: '۰۹۱۲۱۱۱۱۱۱۱۱', lastLogin: '۱۴۰۴/۰۳/۲۲ ۰۹:۳۰', status: 'آنلاین' },
    { name: 'مستر احمدی', role: 'مربی', phone: '۰۹۳۵۲۲۲۲۲۲۲', lastLogin: '۱۴۰۴/۰۳/۲۲ ۱۰:۱۵', status: 'آنلاین' },
    { name: 'مستر کریمی', role: 'مربی', phone: '۰۹۱۰۳۳۳۳۳۳۳', lastLogin: '۱۴۰۴/۰۳/۲۱ ۱۶:۴۵', status: 'آفلاین' },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" dir="rtl">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">کاربران و نقش‌ها</h3>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl flex items-center gap-1.5"><UserPlus className="w-4 h-4" />افزودن کاربر</button>
      </div>
      <table className="w-full text-sm">
        <thead><tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50">
          <th className="text-right py-3 px-4 font-medium">نام</th><th className="text-right py-3 px-4 font-medium">نقش</th><th className="text-right py-3 px-4 font-medium hidden sm:table-cell">تلفن</th><th className="text-right py-3 px-4 font-medium hidden md:table-cell">آخرین ورود</th><th className="text-right py-3 px-4 font-medium">وضعیت</th><th className="text-right py-3 px-4 font-medium">عملیات</th>
        </tr></thead>
        <tbody className="divide-y divide-gray-50">
          {users.map((u, i) => (
            <tr key={i} className="hover:bg-orange-50/30 transition-colors">
              <td className="py-3 px-4 text-slate-900 font-medium flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold shrink-0">{u.name.charAt(0)}</div>{u.name}
              </td>
              <td className="py-3 px-4"><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${u.role === 'مدیر' ? 'bg-purple-100 text-purple-600 border-purple-200' : 'bg-blue-100 text-blue-600 border-blue-200'}`}>{u.role}</span></td>
              <td className="py-3 px-4 text-slate-500 hidden sm:table-cell" dir="ltr">{u.phone}</td>
              <td className="py-3 px-4 text-slate-500 hidden md:table-cell">{u.lastLogin}</td>
              <td className="py-3 px-4"><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${u.status === 'آنلاین' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>{u.status}</span></td>
              <td className="py-3 px-4"><div className="flex gap-1"><button className="p-1.5 rounded-lg hover:bg-orange-50 text-slate-400 hover:text-orange-500"><Edit3 className="w-4 h-4" /></button><button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Settings ─── */
function SettingsTab() {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">تنظیمات عمومی</h3>
        <div className="space-y-5 max-w-lg">
          <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نام آموزشگاه</label><input type="text" defaultValue="چرتکه دهگانی ویرا" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" /></div>
          <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">شماره تماس</label><input type="tel" defaultValue="۰۲۱-۹۱۳۰۲۵۸۴" dir="ltr" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-left" /></div>
          <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">ایمیل</label><input type="email" defaultValue="info@bahanvira.ir" dir="ltr" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-left" /></div>
          <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">آدرس</label><textarea defaultValue="تهران، خیابان انقلاب، پلاک ۱۲۳" rows={2} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 resize-none" /></div>
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl">ذخیره تنظیمات</button>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">تنظیمات ارتباطی</h3>
        <div className="space-y-5 max-w-lg">
          <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">لینک اینستاگرام</label><input type="url" defaultValue="https://instagram.com/bahanvira" dir="ltr" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-left" /></div>
          <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">لینک تلگرام</label><input type="url" defaultValue="https://t.me/bahanvira" dir="ltr" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-left" /></div>
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl">ذخیره</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Main Admin Page Component
   ═══════════════════════════════════════════════════ */

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(sidebarCategories.map((c) => [c.title, true]))
  );

  const handleLogin = () => {
    if (password === 'vira2024') { setIsLoggedIn(true); setPasswordError(''); }
    else { setPasswordError('رمز عبور اشتباه است'); }
  };

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const navigateTo = (key: TabKey) => {
    setActiveTab(key);
    setMobileSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'students': return <StudentsTab />;
      case 'classes': return <ClassesTab />;
      case 'exams': return <ExamsTab />;
      case 'crm': return <CRMInlineTab />;
      case 'financial': return <FinancialTab />;
      case 'users': return <UsersTab />;
      case 'settings': return <SettingsTab />;
      case 'marketers': return <MarketersTab />;
      case 'agencies': return <AgenciesTab />;
      case 'lms': return <LMSTab />;
      case 'calendar': return <CalendarTab />;
      case 'reports': return <ReportsTab />;
      case 'support': return <SupportTab />;
      case 'files': return <FilesTab />;
      case 'payments': return <PaymentsTab />;
      case 'marketing': return <MarketingTab />;
      case 'emails': return <EmailsTab />;
    }
  };

  /* ─── Login ─── */
  if (!isLoggedIn) {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50/30 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl shadow-black/[0.06] p-8 w-full max-w-sm border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">ورود به پنل مدیریت</h1>
          <p className="text-sm text-slate-500 text-center mb-8">آموزگاه چرتکه دهگانی ویرا</p>
          <div className="space-y-4">
            <div>
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} placeholder="رمز عبور" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all" autoFocus />
              {passwordError && <p className="text-red-500 text-xs mt-2 text-center">{passwordError}</p>}
            </div>
            <button onClick={handleLogin} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3.5 rounded-xl transition-all shadow-md shadow-orange-500/20 hover:shadow-lg">ورود</button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Main Layout ─── */
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50/80 flex">
      {/* Mobile overlay */}
      {mobileSidebarOpen && <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden" onClick={() => setMobileSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 right-0 z-50 lg:z-10 h-screen w-72 bg-white border-l border-gray-100 flex flex-col transition-transform duration-300 ease-out ${mobileSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} shadow-xl lg:shadow-none`}>
        {/* Sidebar Header */}
        <div className="p-5 border-b border-gray-100 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-slate-900 truncate">ویرا | چرتکه دهگانی</h2>
            <p className="text-[11px] text-slate-400">پنل مدیریت جامع</p>
          </div>
          <button onClick={() => setMobileSidebarOpen(false)} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-slate-400"><X className="w-5 h-5" /></button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {sidebarCategories.map((cat) => (
            <div key={cat.title} className="mb-2">
              <button onClick={() => toggleCategory(cat.title)} className="flex items-center gap-2 w-full px-3 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-gray-50">
                <FolderOpen className="w-4 h-4 text-orange-400" />
                <span className="flex-1 text-right">{cat.title}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedCategories[cat.title] ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${expandedCategories[cat.title] ? 'max-h-96' : 'max-h-0'}`}>
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.key} onClick={() => navigateTo(item.key)} className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mb-0.5 ${activeTab === item.key ? 'bg-orange-50 text-orange-600 shadow-sm border border-orange-100' : 'text-slate-600 hover:bg-gray-50 hover:text-slate-900'}`}>
                      <Icon className={`w-4 h-4 ${activeTab === item.key ? 'text-orange-500' : 'text-slate-400'}`} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100 shrink-0">
          <button onClick={() => { setIsLoggedIn(false); setPassword(''); }} className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4" />
            خروج از پنل
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-slate-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h1 className="text-base sm:text-lg font-bold text-slate-900">
              {sidebarCategories.flatMap((c) => c.items).find((i) => i.key === activeTab)?.label || 'داشبورد'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">م</div>
              <span className="text-sm font-medium text-slate-700 hidden sm:block">مدیر</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}