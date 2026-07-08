"use client";

import { Grid3X3, Brain, Zap, Trophy, Rocket, BookOpen, Clock, Users, ArrowLeft } from "lucide-react";

const courses = [
  { badge: "محبوب‌ترین", badgeColor: "#F2994A", icon: Grid3X3, iconBg: "bg-orange-500/10", iconColor: "#F2994A", title: "چرتکه مبتدی", desc: "آموزش اصول اولیه چرتکه دهگانی برای سنین ۵ تا ۸ سال. شروعی مطمئن و جذاب برای مسیر یادگیری چرتکه.", duration: "۳۶ ساعت", sessions: "۱۲ جلسه", ageGroup: "۵ تا ۸ سال" },
  { badge: "پرطرفدار", badgeColor: "#27AE60", icon: Brain, iconBg: "bg-emerald-500/10", iconColor: "#27AE60", title: "حساب ذهنی ۱", desc: "تقویت محاسبات ذهنی بدون چرتکه فیزیکی. تمرکز بر تصویرسازی ذهنی اعداد و افزایش سرعت پردازش.", duration: "۲۴ ساعت", sessions: "۸ جلسه", ageGroup: "۷ تا ۱۲ سال" },
  { badge: "جدید", badgeColor: "#8B5CF6", icon: Zap, iconBg: "bg-purple-500/10", iconColor: "#8B5CF6", title: "چرتکه متوسط", desc: "تکمیل مهارت‌های چرتکه و ورود به محاسبات پیچیده‌تر. آمادگی برای مرحله پیشرفته.", duration: "۴۸ ساعت", sessions: "۱۶ جلسه", ageGroup: "۸ تا ۱۲ سال" },
  { badge: null, badgeColor: "#2F80ED", icon: Trophy, iconBg: "bg-blue-500/10", iconColor: "#2F80ED", title: "آمادگی مسابقات", desc: "تمرین‌های ویژه برای آمادگی شرکت در مسابقات ملی و بین‌المللی چرتکه. تکنیک‌های سرعت.", duration: "۲۰ ساعت", sessions: "۱۰ جلسه", ageGroup: "۸ تا ۱۵ سال" },
  { badge: "ظرفیت محدود", badgeColor: "#E53E3E", icon: Rocket, iconBg: "bg-rose-500/10", iconColor: "#E53E3E", title: "چرتکه پیشرفته", desc: "محاسبات چندرقمی پیچیده و سرعت‌بخشی حرفه‌ای. برای دانش‌آموزان مستعد و آماده.", duration: "۶۰ ساعت", sessions: "۲۰ جلسه", ageGroup: "۱۰ تا ۱۶ سال" },
  { badge: null, badgeColor: "#14B8A6", icon: BookOpen, iconBg: "bg-teal-500/10", iconColor: "#14B8A6", title: "مربی‌گری چرتکه", desc: "دوره تربیت مربی چرتکه برای علاقه‌مندان به تدریس. کسب مدرک معتبر و شروع کار.", duration: "۸۰ ساعت", sessions: "۲۵ جلسه", ageGroup: "بالای ۱۸ سال" },
];

export default function Courses() {
  return (
    <section id="courses" className="section-cool relative overflow-hidden py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -top-20 left-[10%] h-[400px] w-[400px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #2F80ED 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-20 right-[10%] h-[350px] w-[350px] rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }} />
      <div className="animate-float pointer-events-none absolute top-20 right-[8%] h-3 w-3 rounded-full bg-[#2F80ED]/30" />
      <div className="animate-float-slow pointer-events-none absolute bottom-28 left-[12%] h-5 w-5 rounded-lg bg-[#27AE60]/20 rotate-12" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">دوره‌های آموزشی</span>
          <h2 className="section-heading">مسیر یادگیری حرفه‌ای چرتکه</h2>
          <p className="section-subheading mx-auto max-w-2xl">دوره‌های متنوع با طراحی علمی برای هر سنی. از مبتدی تا سطح مسابقات بین‌المللی.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <a key={index} href="#" className="premium-card group block overflow-hidden p-6 sm:p-7">
                {course.badge && (
                  <span className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: course.badgeColor }}>
                    {course.badge}
                  </span>
                )}
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${course.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={28} style={{ color: course.iconColor }} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#102A43] transition-colors duration-200 group-hover:text-[#2F80ED]">{course.title}</h3>
                <p className="mb-5 text-sm leading-7 text-[#718096]">{course.desc}</p>
                <div className="flex items-center gap-4 border-t border-[#E8EDF3] pt-4 text-xs text-[#718096]">
                  <span className="flex items-center gap-1.5"><Users size={14} />{course.ageGroup}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} />{course.duration}</span>
                  <span className="flex items-center gap-1.5"><Grid3X3 size={14} />{course.sessions}</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#2F80ED] opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span>اطلاعات بیشتر</span>
                  <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <a href="/courses" className="btn-ghost">مشاهده همه دوره‌ها</a>
        </div>
      </div>
    </section>
  );
}