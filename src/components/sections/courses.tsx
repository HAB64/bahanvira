"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { Grid3X3, Brain, Zap, Trophy, Rocket, BookOpen, Clock, Users, ArrowLeft, Flame, Star } from "lucide-react";

/* ── Scroll Reveal ─────────────────────────────────── */
function RevealOnScroll({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${className}`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const courses = [
  { badge: "محبوب‌ترین", badgeColor: "#F2994A", icon: Grid3X3, iconBg: "bg-orange-500/10", iconColor: "#F2994A", title: "چرتکه مبتدی", desc: "آموزش اصول اولیه چرتکه دهگانی برای سنین ۵ تا ۸ سال. شروعی مطمئن و جذاب برای مسیر یادگیری چرتکه با بازی‌ها و تمرین‌های تعاملی.", duration: "۳۶ ساعت", sessions: "۱۲ جلسه", ageGroup: "۵ تا ۸ سال", rating: 4.9, students: 320, difficulty: "مبتدی" },
  { badge: "پرطرفدار", badgeColor: "#27AE60", icon: Brain, iconBg: "bg-emerald-500/10", iconColor: "#27AE60", title: "حساب ذهنی ۱", desc: "تقویت محاسبات ذهنی بدون چرتکه فیزیکی. تمرکز بر تصویرسازی ذهنی اعداد و افزایش سرعت پردازش به سطح خیره‌کننده.", duration: "۲۴ ساعت", sessions: "۸ جلسه", ageGroup: "۷ تا ۱۲ سال", rating: 4.8, students: 280, difficulty: "متوسط" },
  { badge: "جدید", badgeColor: "#8B5CF6", icon: Zap, iconBg: "bg-purple-500/10", iconColor: "#8B5CF6", title: "چرتکه متوسط", desc: "تکمیل مهارت‌های چرتکه و ورود به محاسبات پیچیده‌تر. آمادگی برای مرحله پیشرفته و شرکت در مسابقات.", duration: "۴۸ ساعت", sessions: "۱۶ جلسه", ageGroup: "۸ تا ۱۲ سال", rating: 4.9, students: 195, difficulty: "متوسط" },
  { badge: null, badgeColor: "#2F80ED", icon: Trophy, iconBg: "bg-blue-500/10", iconColor: "#2F80ED", title: "آمادگی مسابقات", desc: "تمرین‌های ویژه برای آمادگی شرکت در مسابقات ملی و بین‌المللی چرتکه. تکنیک‌های سرعت و استراتژی‌های رقابتی.", duration: "۲۰ ساعت", sessions: "۱۰ جلسه", ageGroup: "۸ تا ۱۵ سال", rating: 5.0, students: 85, difficulty: "پیشرفته" },
  { badge: "ظرفیت محدود", badgeColor: "#E53E3E", icon: Rocket, iconBg: "bg-rose-500/10", iconColor: "#E53E3E", title: "چرتکه پیشرفته", desc: "محاسبات چندرقمی پیچیده و سرعت‌بخشی حرفه‌ای. برای دانش‌آموزان مستعد و آماده‌ای که می‌خواهند رکورد بزنند.", duration: "۶۰ ساعت", sessions: "۲۰ جلسه", ageGroup: "۱۰ تا ۱۶ سال", rating: 4.9, students: 62, difficulty: "پیشرفته" },
  { badge: null, badgeColor: "#14B8A6", icon: BookOpen, iconBg: "bg-teal-500/10", iconColor: "#14B8A6", title: "مربی‌گری چرتکه", desc: "دوره تربیت مربی چرتکه برای علاقه‌مندان به تدریس. کسب مدرک معتبر و شروع حرفه‌ای تدریس چرتکه.", duration: "۸۰ ساعت", sessions: "۲۵ جلسه", ageGroup: "بالای ۱۸ سال", rating: 4.7, students: 40, difficulty: "حرفه‌ای" },
];

const difficultyColors: Record<string, string> = { "مبتدی": "#27AE60", "متوسط": "#F2994A", "پیشرفته": "#8B5CF6", "حرفه‌ای": "#2F80ED" };

export default function Courses() {
  return (
    <section id="courses" className="section-cool relative overflow-hidden py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -top-20 left-[10%] h-[400px] w-[400px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #2F80ED 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-20 right-[10%] h-[350px] w-[350px] rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }} />
      <div className="animate-float pointer-events-none absolute top-20 right-[8%] h-3 w-3 rounded-full bg-[#2F80ED]/30" />
      <div className="animate-float-slow pointer-events-none absolute bottom-28 left-[12%] h-5 w-5 rounded-lg bg-[#27AE60]/20 rotate-12" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <RevealOnScroll className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">دوره‌های آموزشی</span>
          <h2 className="section-heading">مسیر یادگیری حرفه‌ای چرتکه</h2>
          <p className="section-subheading mx-auto max-w-2xl">دوره‌های متنوع با طراحی علمی برای هر سنی. از مبتدی تا سطح مسابقات بین‌المللی.</p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => {
            const Icon = course.icon;
            const diffColor = difficultyColors[course.difficulty] || "#718096";
            return (
              <RevealOnScroll key={index} delay={index * 80}>
                <a href="#" className="premium-card group block overflow-hidden h-full relative">
                  <div className="p-6 sm:p-7">
                    {/* Top: badge + difficulty */}
                    <div className="flex items-center justify-between mb-4">
                      {course.badge ? (
                        <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: course.badgeColor }}>
                          <Flame size={12} />
                          {course.badge}
                        </span>
                      ) : <span />}
                      <span className="text-[11px] font-semibold rounded-full px-2.5 py-0.5" style={{ backgroundColor: `${diffColor}10`, color: diffColor, border: `1px solid ${diffColor}20` }}>
                        {course.difficulty}
                      </span>
                    </div>

                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${course.iconBg} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon size={28} style={{ color: course.iconColor }} />
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-[#102A43] transition-colors duration-200 group-hover:text-[#2F80ED]">{course.title}</h3>
                    <p className="mb-4 text-sm leading-7 text-[#718096]">{course.desc}</p>

                    {/* Rating + Students */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-[#102A43]">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#718096]">
                        <Users size={14} />
                        {course.students.toLocaleString("fa-IR")} دانش‌آموز
                      </div>
                    </div>

                    <div className="flex items-center gap-4 border-t border-[#E8EDF3] pt-4 text-xs text-[#718096]">
                      <span className="flex items-center gap-1.5"><Users size={14} />{course.ageGroup}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} />{course.duration}</span>
                      <span className="flex items-center gap-1.5"><Grid3X3 size={14} />{course.sessions}</span>
                    </div>
                  </div>

                  {/* Hover CTA overlay */}
                  <div className="absolute bottom-0 right-0 left-0 p-4 bg-gradient-to-t from-white via-white/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#2F80ED]">
                      <span>اطلاعات بیشتر</span>
                      <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
                    </div>
                  </div>
                </a>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll className="mt-10 sm:mt-12 text-center" delay={200}>
          <a href="/courses" className="btn-ghost">مشاهده همه دوره‌ها</a>
        </RevealOnScroll>
      </div>
    </section>
  );
}