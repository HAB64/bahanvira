'use client';

import { Star } from 'lucide-react';

const stats = [
  { value: '۴.۹', label: 'از ۵ امتیاز', color: 'text-orange-500' },
  { value: '۹۸٪', label: 'رضایت والدین', color: 'text-teal-500' },
  { value: '۲,۰۰۰+', label: 'نظر مثبت', color: 'text-purple-500' },
];

const testimonials = [
  {
    text: 'پسرم بعد از ۶ ماه آموزش چرتکه، نمرات ریاضی‌اش از ۱۴ به ۱۹ رسید. واقعاً ممنونیم از تیم ویرا.',
    name: 'مادر سارا',
    role: 'دانش‌آموز سطح ۳',
    rating: 5,
    initial: 'س',
    avatarColor: 'bg-gradient-to-br from-orange-400 to-amber-500',
  },
  {
    text: 'روش آموزش مربیان ویرا بسیار جذاب و کودک‌پسند است. دخترم با اشتیاق هر هفته به کلاس می‌رود.',
    name: 'پدر امیرعلی',
    role: 'دانش‌آموز سطح ۵',
    rating: 5,
    initial: 'ا',
    avatarColor: 'bg-gradient-to-br from-teal-400 to-cyan-500',
  },
  {
    text: 'حساب ذهنی فرزندم به قدری تقویت شده که دیگر هیچ مشکلی با ریاضی مدرسه ندارد.',
    name: 'مادر نیکان',
    role: 'دانش‌آموز سطح ۷',
    rating: 5,
    initial: 'ن',
    avatarColor: 'bg-gradient-to-br from-purple-400 to-violet-500',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-20 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="section-heading">نظرات والدین و دانش‌آموزان</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            صدای واقعی خانواده‌هایی که تجربه آموزش چرتکه ویرا را داشته‌اند
          </p>
        </div>

        {/* Stats Row */}
        <div className="mt-10 grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bright-card-flat p-4 sm:p-5 text-center">
              <div className={`text-xl sm:text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="bright-card p-6 flex flex-col hover:border-orange-200">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-sm leading-relaxed text-slate-600 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 border-t border-gray-100 mt-5 pt-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${t.avatarColor} text-white font-bold text-sm shrink-0`}>
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}