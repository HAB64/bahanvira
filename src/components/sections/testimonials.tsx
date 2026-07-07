'use client';

import { Star } from 'lucide-react';

const stats = [
  { value: '۴.۹', label: 'از ۵ امتیاز' },
  { value: '۹۸٪', label: 'رضایت والدین' },
  { value: '۲,۰۰۰+', label: 'نظر مثبت' },
];

const testimonials = [
  {
    text: 'پسرم بعد از ۶ ماه آموزش چرتکه، نمرات ریاضی‌اش از ۱۴ به ۱۹ رسید. واقعاً ممنونیم از تیم ویرا.',
    name: 'مادر سارا',
    role: 'دانش‌آموز سطح ۳',
    rating: 5,
    initial: 'س',
  },
  {
    text: 'روش آموزش مربیان ویرا بسیار جذاب و کودک‌پسند است. دخترم با اشتیاق هر هفته به کلاس می‌رود.',
    name: 'پدر امیرعلی',
    role: 'دانش‌آموز سطح ۵',
    rating: 5,
    initial: 'ا',
  },
  {
    text: 'حساب ذهنی فرزندم به قدری تقویت شده که دیگر هیچ مشکلی با ریاضی مدرسه ندارد.',
    name: 'مادر نیکان',
    role: 'دانش‌آموز سطح ۷',
    rating: 5,
    initial: 'ن',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            نظرات والدین و دانش‌آموزان
          </h2>
          <p className="text-slate-400 mt-3 leading-relaxed max-w-2xl mx-auto">
            صدای واقعی خانواده‌هایی که تجربه آموزش چرتکه ویرا را داشته‌اند
          </p>
        </div>

        {/* Stats Row */}
        <div className="mt-10 grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass-card-lite rounded-2xl p-4 sm:p-5 text-center">
              <div className="text-xl sm:text-2xl font-bold text-teal-400">{s.value}</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="glass-card rounded-2xl p-6 flex flex-col">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed text-slate-300 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-white/10 mt-5 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white font-bold text-sm shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}