'use client';

import { useState } from 'react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import {
  Users,
  GraduationCap,
  DollarSign,
  Lock,
  LogOut,
  Search,
  Plus,
  BarChart3,
  BookOpen,
  Settings,
} from 'lucide-react';

/* ─────────── Types ─────────── */
type TabKey = 'dashboard' | 'students' | 'classes' | 'exams';

/* ─────────── Data ─────────── */
const dashboardStats = [
  { label: 'دانش‌آموز فعال', value: '۱۲۳', icon: Users, color: 'text-[#0d9488]', bgColor: 'bg-[#0d9488]/15' },
  { label: 'مربی', value: '۸', icon: GraduationCap, color: 'text-[#f97316]', bgColor: 'bg-[#f97316]/15' },
  { label: 'کلاس فعال', value: '۱۵', icon: BookOpen, color: 'text-[#eab308]', bgColor: 'bg-[#eab308]/15' },
  { label: 'درآمد ماهانه (تومان)', value: '۲,۵۰۰,۰۰۰', icon: DollarSign, color: 'text-[#ec4899]', bgColor: 'bg-[#ec4899]/15' },
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

const allStudents = [
  { name: 'سارا احمدی', phone: '۰۹۱۲۱۲۳۴۵۶۷', level: 'سطح ۳', date: '۱۴۰۴/۰۱/۱۵', status: 'فعال' },
  { name: 'محمد رضایی', phone: '۰۹۳۵۶۷۸۹۰۱۲', level: 'سطح ۲', date: '۱۴۰۴/۰۲/۰۵', status: 'فعال' },
  { name: 'فاطمه حسینی', phone: '۰۹۱۰۳۴۵۶۷۸۹', level: 'سطح ۵', date: '۱۴۰۳/۱۲/۲۰', status: 'فعال' },
  { name: 'امیر کریمی', phone: '۰۹۲۱۲۳۴۵۶۷۸', level: 'سطح ۱', date: '۱۴۰۴/۰۳/۰۱', status: 'در انتظار' },
  { name: 'نازنین عباسی', phone: '۰۹۳۸۹۰۱۲۳۴۵', level: 'سطح ۴', date: '۱۴۰۴/۰۱/۱۰', status: 'غیرفعال' },
  { name: 'رضا طاهری', phone: '۰۹۱۵۶۷۸۱۲۳۴', level: 'سطح ۲', date: '۱۴۰۴/۰۲/۲۰', status: 'فعال' },
  { name: 'مینا کاظمی', phone: '۰۹۳۳۴۵۶۷۸۹۰', level: 'سطح ۶', date: '۱۴۰۳/۱۱/۰۵', status: 'فعال' },
  { name: 'علی محمدی', phone: '۰۹۲۰۱۲۳۴۵۶۷', level: 'سطح ۴', date: '۱۴۰۴/۰۱/۲۵', status: 'فعال' },
];

const classData = [
  { name: 'چرتکه مبتدی - گروه الف', instructor: 'استاد رضایی', students: 18, schedule: 'شنبه و دوشنبه - ۱۶:۰۰' },
  { name: 'چرتکه مبتدی - گروه ب', instructor: 'استاد احمدی', students: 15, schedule: 'یکشنبه و سه‌شنبه - ۱۵:۰۰' },
  { name: 'چرتکه متوسط', instructor: 'استاد کریمی', students: 12, schedule: 'شنبه و چهارشنبه - ۱۷:۰۰' },
  { name: 'چرتکه پیشرفته', instructor: 'استاد حسینی', students: 8, schedule: 'دوشنبه و پنجشنبه - ۱۴:۰۰' },
  { name: 'حساب ذهنی ۱', instructor: 'استاد محمدی', students: 20, schedule: 'سه‌شنبه و پنجشنبه - ۱۶:۰۰' },
  { name: 'آمادگی مسابقات', instructor: 'استاد رضایی', students: 6, schedule: 'پنجشنبه - ۱۰:۰۰' },
];

const examData = [
  { name: 'آزمون سطح ۱', students: 35, avgScore: '۸۵٪', date: '۱۴۰۴/۰۳/۱۵', status: 'بسته شده' },
  { name: 'آزمون سطح ۳', students: 28, avgScore: '۷۸٪', date: '۱۴۰۴/۰۳/۱۰', status: 'بسته شده' },
  { name: 'آزمون سرعت', students: 42, avgScore: '۷۲٪', date: '۱۴۰۴/۰۲/۲۸', status: 'بسته شده' },
  { name: 'آزمون جامع', students: 15, avgScore: '۸۰٪', date: '۱۴۰۴/۰۳/۲۲', status: 'فعال' },
  { name: 'آزمون ضرب', students: 30, avgScore: '۸۲٪', date: '۱۴۰۴/۰۳/۲۵', status: 'فعال' },
];

const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: 'dashboard', label: 'داشبورد', icon: BarChart3 },
  { key: 'students', label: 'دانش‌آموزان', icon: Users },
  { key: 'classes', label: 'کلاس‌ها', icon: BookOpen },
  { key: 'exams', label: 'آزمون‌ها', icon: GraduationCap },
];

const statusColors: Record<string, string> = {
  'فعال': 'bg-[#0d9488]/15 text-[#0d9488] border-[#0d9488]/30',
  'در انتظار': 'bg-[#eab308]/15 text-[#eab308] border-[#eab308]/30',
  'غیرفعال': 'bg-red-500/15 text-red-400 border-red-500/30',
  'بسته شده': 'bg-slate-500/15 text-slate-500 border-slate-500/30',
};

/* ─────────── Component ─────────── */
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [studentSearch, setStudentSearch] = useState('');

  const handleLogin = () => {
    if (password === 'vira2024') {
      setIsLoggedIn(true);
      setPasswordError('');
    } else {
      setPasswordError('رمز عبور اشتباه است');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  const filteredStudents = allStudents.filter((s) =>
    s.name.includes(studentSearch) || s.phone.includes(studentSearch)
  );

  /* ─── Login Screen ─── */
  if (!isLoggedIn) {
    return (
      <div dir="rtl" className="pt-24 pb-16 bg-[#f9fafb] min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6">
          <div className="glass-card rounded-2xl p-8 w-full max-w-sm">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#0d9488]/15 border border-[#0d9488]/30 flex items-center justify-center">
                <Lock className="w-8 h-8 text-[#0d9488]" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">ورود به پنل مدیریت</h1>
            <p className="text-sm text-slate-500 text-center mb-8">لطفاً رمز عبور خود را وارد کنید</p>

            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="رمز عبور"
                  className="input-dark text-center text-lg tracking-widest"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-red-400 text-xs mt-2 text-center">{passwordError}</p>
                )}
              </div>
              <button onClick={handleLogin} className="btn-primary w-full">
                <Lock className="w-4 h-4" />
                ورود
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ─── Dashboard Tab ─── */
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-slate-900">آخرین ثبت‌نام‌ها</h3>
            <Plus className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-900 transition-colors" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-xs border-b border-gray-200">
                  <th className="text-right pb-3 font-medium">نام</th>
                  <th className="text-right pb-3 font-medium hidden sm:table-cell">تلفن</th>
                  <th className="text-right pb-3 font-medium">دوره</th>
                  <th className="text-right pb-3 font-medium">وضعیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentRegistrations.map((r, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 text-slate-900 font-medium">{r.name}</td>
                    <td className="py-3 text-slate-500 hidden sm:table-cell" dir="ltr">{r.phone}</td>
                    <td className="py-3 text-slate-500">{r.course}</td>
                    <td className="py-3">
                      <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[r.status] || ''}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Exams */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-slate-900">آزمون‌های اخیر</h3>
            <GraduationCap className="w-5 h-5 text-slate-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-xs border-b border-gray-200">
                  <th className="text-right pb-3 font-medium">دانش‌آموز</th>
                  <th className="text-right pb-3 font-medium hidden sm:table-cell">آزمون</th>
                  <th className="text-right pb-3 font-medium">نمره</th>
                  <th className="text-right pb-3 font-medium">تاریخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentExamResults.map((r, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 text-slate-900 font-medium">{r.student}</td>
                    <td className="py-3 text-slate-500 hidden sm:table-cell">{r.exam}</td>
                    <td className="py-3 text-[#0d9488] font-bold">{r.score}</td>
                    <td className="py-3 text-slate-500">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── Students Tab ─── */
  const renderStudents = () => (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-lg font-bold text-slate-900">لیست دانش‌آموزان</h3>
        <div className="relative w-full sm:w-72">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            placeholder="جستجوی نام یا تلفن..."
            className="input-dark pr-10"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-gray-200">
              <th className="text-right pb-3 font-medium">نام</th>
              <th className="text-right pb-3 font-medium hidden md:table-cell">تلفن</th>
              <th className="text-right pb-3 font-medium">سطح</th>
              <th className="text-right pb-3 font-medium hidden sm:table-cell">تاریخ ثبت‌نام</th>
              <th className="text-right pb-3 font-medium">وضعیت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredStudents.map((s, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 text-slate-900 font-medium">{s.name}</td>
                <td className="py-3 text-slate-500 hidden md:table-cell" dir="ltr">{s.phone}</td>
                <td className="py-3 text-slate-600">{s.level}</td>
                <td className="py-3 text-slate-500 hidden sm:table-cell">{s.date}</td>
                <td className="py-3">
                  <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[s.status] || ''}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  نتیجه‌ای یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ─── Classes Tab ─── */
  const renderClasses = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">لیست کلاس‌ها</h3>
        <button className="btn-primary text-xs px-4 py-2">
          <Plus className="w-4 h-4" />
          ایجاد کلاس
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classData.map((cls, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-5">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900 leading-6">{cls.name}</h4>
              <Settings className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-900 transition-colors shrink-0" />
            </div>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  مربی
                </span>
                <span className="text-slate-900 font-medium">{cls.instructor}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  دانش‌آموز
                </span>
                <span className="text-slate-900 font-medium">{cls.students} نفر</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  برنامه
                </span>
                <span className="text-slate-900 font-medium text-xs">{cls.schedule}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── Exams Tab ─── */
  const renderExams = () => (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">لیست آزمون‌ها</h3>
        <button className="btn-primary text-xs px-4 py-2">
          <Plus className="w-4 h-4" />
          ایجاد آزمون
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-gray-200">
              <th className="text-right pb-3 font-medium">نام آزمون</th>
              <th className="text-right pb-3 font-medium">تعداد شرکت‌کننده</th>
              <th className="text-right pb-3 font-medium hidden sm:table-cell">میانگین نمره</th>
              <th className="text-right pb-3 font-medium">تاریخ</th>
              <th className="text-right pb-3 font-medium">وضعیت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {examData.map((exam, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 text-slate-900 font-medium">{exam.name}</td>
                <td className="py-3 text-slate-600">{exam.students} نفر</td>
                <td className="py-3 text-[#0d9488] font-bold hidden sm:table-cell">{exam.avgScore}</td>
                <td className="py-3 text-slate-500">{exam.date}</td>
                <td className="py-3">
                  <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[exam.status] || ''}`}>
                    {exam.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ─── Dashboard (after login) ─── */
  return (
    <div dir="rtl" className="pt-24 pb-16 bg-[#f9fafb] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        {/* ─── Title + Logout ─── */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-slate-900">پنل مدیریت ویرا</h1>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setPassword('');
            }}
            className="btn-ghost text-xs px-4 py-2"
          >
            <LogOut className="w-4 h-4" />
            خروج
          </button>
        </div>

        {/* ─── Stats Row ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {dashboardStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-card rounded-2xl p-5 flex items-center gap-4">
                <div className={`shrink-0 w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
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

        {/* ─── Tabs ─── */}
        <div className="flex items-center gap-1 p-1 glass-card-lite rounded-xl mb-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200
                  ${activeTab === tab.key
                    ? 'bg-[#0d9488]/20 text-[#0d9488] shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ─── Tab Content ─── */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'students' && renderStudents()}
        {activeTab === 'classes' && renderClasses()}
        {activeTab === 'exams' && renderExams()}
      </main>
      <Footer />
    </div>
  );
}