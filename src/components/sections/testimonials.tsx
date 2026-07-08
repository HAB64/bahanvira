"use client";

import { Star } from "lucide-react";

const stats = [
  { value: "۴.۹", label: "از ۵ امتیاز", color: "#F2994A" },
  { value: "۹۸٪", label: "رضایت والدین", color: "#27AE60" },
  { value: "۲,۰۰۰+", label: "نظر مثبت", color: "#2F80ED" },
];

const testimonials = [
  { text: "پسرم بعد از ۶ ماه آموزش چرتکه، نمرات ریاضی‌اش از ۱۴ به ۱۹ رسید. واقعاً ممنونیم از تیم ویرا و روش آموزشی عالیشان.", name: "مادر سارا", role: "دانش‌آموز سطح ۳", rating: 5, initial: "س", color: "#F2994A", bgColor: "bg-orange-500/10" },
  { text: "روش آموزش مربیان ویرا بسیار جذاب و کودک‌پسند است. دخترم با اشتیاق هر هفته به کلاس می‌رود و پیشرفتش قابل توجه است.", name: "پدر امیرعلی", role: "دانش‌آموز سطح ۵", rating: 5, initial: "ا", color: "#27AE60", bgColor: "bg-emerald-500/10" },
  { text: "حساب ذهنی فرزندم به قدری تقویت شده که دیگر هیچ مشکلی با ریاضی مدرسه ندارد و حتی در مسابقات هم شرکت می‌کند.", name: "مادر نیکان", role: "دانش‌آموز سطح ۷", rating: 5, initial: "ن", color: "#8B5CF6", bgColor: "bg-purple-500/10" },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-warm relative overflow-hidden py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -top-20 right-[10%] h-[350px] w-[350px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #F2994A 0%, transparent 70%)" }} />
      <div className="animate-float-slow pointer-events-none absolute top-20 left-[8%] h-4 w-4 rounded-full bg-[#F2994A]/20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">نظرات والدین</span>
          <h2 className="section-heading">صدای واقعی خانواده‌ها</h2>
          <p className="section-subheading mx-auto max-w-2xl">تجربه والدینی که فرزندانشان در مسیر یادگیری چرتکه ویرا قرار گرفته‌اند</p>
        </div>

        <div className="mb-10 grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="premium-card-static p-4 sm:p-5 text-center">
              <div className="text-xl sm:text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</div>
              <div className="mt-1 text-xs sm:text-sm text-[#718096]">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="premium-card p-6 sm:p-7 flex flex-col">
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="flex-1 text-sm leading-8 text-[#2D3748]">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 border-t border-[#E8EDF3] pt-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${t.bgColor} text-sm font-bold shrink-0`} style={{ color: t.color }}>
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#102A43]">{t.name}</p>
                  <p className="text-xs text-[#718096]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}