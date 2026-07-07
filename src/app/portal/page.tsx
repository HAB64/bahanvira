'use client';

import { useState } from 'react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import {
  BookOpen,
  Award,
  Calendar,
  CheckSquare,
  Download,
  TrendingUp,
  Star,
  Clock,
} from 'lucide-react';

/* ─────────── Data ─────────── */
const activeCourses = [
  { name: 'چرتکه متوسط (سطح ۴-۶)', progress: 65 },
  { name: 'حساب ذهنی ۱', progress: 20 },
];

const recentExams = [
  { title: 'آزمون جمع و تفریق', date: '۱۴۰۴/۰۳/۱۵', score: '۸/۱۰', passed: true },
  { title: 'آزمون ضرب', date: '۱۴۰۴/۰۳/۱۰', score: '۶/۱۰', passed: true },
  { title: 'آزمون سرعت', date: '۱۴۰۴/۰۲/۲۸', score: '۱۵/۲۰', passed: true },
];

const dailyTasks = [
  '۱۰ دقیقه تمرین آزاد',
  '۵ مسئله جمع',
  '۵ مسئله تفریق',
  'تمرین سرعت',
];

const certificates = [
  { title: 'چرتکه مبتدی - سطح ۳', date: '۱۴۰۴/۰۲/۱۵' },
  { title: 'حساب ذهنی پایه', date: '۱۴۰۴/۰۱/۲۰' },
  { title: 'مسابقات منطقه‌ای', date: '۱۴۰۳/۱۱/۱۰' },
];

const stats = [
  { label: 'جلسه حضور', value: '۱۲', icon: Calendar, color: 'text-[#0d9488]' },
  { label: 'میانگین نمرات', value: '۸۵٪', icon: TrendingUp, color: 'text-[#f97316]' },
  { label: 'گواهینامه', value: '۳', icon: Award, color: 'text-[#eab308]' },
  { label: 'روز متوالی تمرین', value: '۷', icon: Star, color: 'text-[#ec4899]' },
];

/* ─────────── Component ─────────── */
export default function PortalPage() {
  const [checkedTasks, setCheckedTasks] = useState<boolean[]>(
    new Array(dailyTasks.length).fill(false)
  );

  const toggleTask = (index: number) => {
    setCheckedTasks((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const completedTasks = checkedTasks.filter(Boolean).length;

  return (
    <div dir="rtl" className="pt-24 pb-16 bg-[#0a1628] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 w-full">
        {/* ─── Title ─── */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">پنل دانش‌آموز</h1>
          <p className="text-slate-400 mt-2">علی محمدی</p>
        </div>

        {/* ─── Welcome Bar ─── */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">خوش آمدید، علی!</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#0d9488]/15 text-[#0d9488] border border-[#0d9488]/30 rounded-full px-3 py-1">
                  <TrendingUp className="w-3 h-3" />
                  سطح ۴ - متوسط
                </span>
              </div>
            </div>
            <div className="sm:w-64">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">پیشرفت کلی</span>
                <span className="text-white font-bold">۶۵٪</span>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-[#0d9488] to-[#0f766e]"
                  style={{ width: '65%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Stats Row ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-card-lite rounded-2xl p-5 text-center">
                <Icon className={`w-6 h-6 mx-auto mb-3 ${stat.color}`} />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* ─── Two Column Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Left Column ── */}
          <div className="space-y-6">
            {/* Active Courses */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <BookOpen className="w-5 h-5 text-[#0d9488]" />
                <h3 className="text-lg font-bold text-white">دوره‌های فعال</h3>
              </div>
              <div className="space-y-5">
                {activeCourses.map((course) => (
                  <div key={course.name}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-300">{course.name}</span>
                      <span className="text-white font-bold">{course.progress}٪</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          course.progress >= 60
                            ? 'bg-gradient-to-l from-[#0d9488] to-[#0f766e]'
                            : 'bg-gradient-to-l from-[#f97316] to-[#ea580c]'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Exams */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="w-5 h-5 text-[#f97316]" />
                <h3 className="text-lg font-bold text-white">آزمون‌های اخیر</h3>
              </div>
              <div className="space-y-3">
                {recentExams.map((exam, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{exam.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{exam.date}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 mr-4">
                      <span className="text-sm font-bold text-white">{exam.score}</span>
                      <span className="text-xs font-bold bg-[#0d9488]/15 text-[#0d9488] border border-[#0d9488]/30 rounded-full px-2.5 py-0.5">
                        {exam.passed ? 'قبول' : 'مردود'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="space-y-6">
            {/* Daily Practice */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-[#eab308]" />
                  <h3 className="text-lg font-bold text-white">تمرین امروز</h3>
                </div>
                <span className="text-xs text-slate-400">
                  {completedTasks}/{dailyTasks.length} انجام شده
                </span>
              </div>

              {/* Practice progress */}
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-5">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-[#eab308] to-[#ca8a04] transition-all duration-300"
                  style={{ width: `${(completedTasks / dailyTasks.length) * 100}%` }}
                />
              </div>

              <div className="space-y-3">
                {dailyTasks.map((task, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer transition-all hover:bg-white/[0.08]"
                  >
                    <div className="relative shrink-0">
                      <input
                        type="checkbox"
                        checked={checkedTasks[idx]}
                        onChange={() => toggleTask(idx)}
                        className="peer sr-only"
                      />
                      <div
                        className={`
                          w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center
                          ${
                            checkedTasks[idx]
                              ? 'bg-[#0d9488] border-[#0d9488]'
                              : 'border-white/20 bg-transparent'
                          }
                        `}
                      >
                        {checkedTasks[idx] && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span
                      className={`text-sm transition-all ${
                        checkedTasks[idx] ? 'text-slate-500 line-through' : 'text-slate-300'
                      }`}
                    >
                      {task}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Award className="w-5 h-5 text-[#eab308]" />
                <h3 className="text-lg font-bold text-white">گواهینامه‌های من</h3>
              </div>
              <div className="space-y-3">
                {certificates.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-[#eab308]/15 flex items-center justify-center">
                        <Award className="w-5 h-5 text-[#eab308]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">{cert.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{cert.date}</p>
                      </div>
                    </div>
                    <button className="shrink-0 mr-3 flex items-center gap-1.5 text-xs font-bold text-[#0d9488] hover:text-[#0f766e] transition-colors bg-[#0d9488]/10 border border-[#0d9488]/20 rounded-lg px-3 py-1.5">
                      <Download className="w-3.5 h-3.5" />
                      دانلود
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}