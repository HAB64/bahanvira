'use client';

import { Grid3X3, Brain, Zap, Trophy, Rocket, BookOpen, Clock, Users, ArrowLeft } from 'lucide-react';

const courses = [
  {
    badge: { text: 'پرطرفدار', color: 'bg-orange-100 text-orange-600' },
    icon: Grid3X3,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    title: 'چرتکه مبتدی',
    desc: 'آموزش اصول اولیه چرتکه دهگانی برای سنین ۵ تا ۸ سال',
    duration: '۳۶ ساعته',
    sessions: '۱۲ جلسه',
    accentColor: 'hover:border-orange-200',
  },
  {
    badge: { text: 'پرطرفدار', color: 'bg-teal-100 text-teal-600' },
    icon: Brain,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-500',
    title: 'حساب ذهنی ۱',
    desc: 'تقویت محاسبات ذهنی بدون چرتکه فیزیکی',
    duration: '۲۴ ساعته',
    sessions: '۸ جلسه',
    accentColor: 'hover:border-teal-200',
  },
  {
    badge: { text: 'جدید', color: 'bg-purple-100 text-purple-600' },
    icon: Zap,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-500',
    title: 'چرتکه متوسط',
    desc: 'تکمیل مهارت‌های چرتکه و ورود به محاسبات پیچیده',
    duration: '۴۸ ساعته',
    sessions: '۱۶ جلسه',
    accentColor: 'hover:border-purple-200',
  },
  {
    badge: null,
    icon: Trophy,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
    title: 'آمادگی مسابقات',
    desc: 'تمرین‌های ویژه برای آمادگی شرکت در مسابقات ملی و بین‌المللی',
    duration: '۲۰ ساعته',
    sessions: '۱۰ جلسه',
    accentColor: 'hover:border-purple-200',
  },
  {
    badge: { text: 'ظرفیت محدود', color: 'bg-rose-100 text-rose-600' },
    icon: Rocket,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-500',
    title: 'چرتکه پیشرفته',
    desc: 'محاسبات چندرقمی پیچیده و سرعت‌بخشی حرفه‌ای',
    duration: '۶۰ ساعته',
    sessions: '۲۰ جلسه',
    accentColor: 'hover:border-rose-200',
  },
  {
    badge: null,
    icon: BookOpen,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    title: 'مربی‌گری چرتکه',
    desc: 'دوره تربیت مربی چرتکه برای علاقه‌مندان به تدریس',
    duration: '۸۰ ساعته',
    sessions: '۲۵ جلسه',
    accentColor: 'hover:border-blue-200',
  },
];

export default function Courses() {
  return (
    <section id="courses" className="py-16 sm:py-20 relative overflow-hidden section-warm">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold text-orange-600 mb-4">
            دوره‌های آموزشی
          </span>
          <h2 className="section-heading text-3xl sm:text-4xl">دوره‌های پرطرفدار ما</h2>
          <p className="section-subheading mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            دوره‌هایی که بیشترین تقاضا را دارند و نتایج فوق‌العاده‌ای ارائه داده‌اند.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => {
            const IconComponent = course.icon;
            return (
              <a
                key={course.title}
                href="#"
                className={`bright-card overflow-hidden group block p-5 transition-all duration-300 ${course.accentColor}`}
              >
                {/* Badge */}
                <div className="flex justify-start mb-4">
                  {course.badge && (
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${course.badge.color}`}>
                      {course.badge.text}
                    </span>
                  )}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${course.iconBg} flex items-center justify-center mb-4`}>
                  <IconComponent className={`w-7 h-7 ${course.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {course.desc}
                </p>

                {/* Meta Row */}
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-3 border-t border-gray-100">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {course.sessions}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors duration-200"
          >
            مشاهده همه دوره‌ها
            <ArrowLeft className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}