'use client';

import { Check } from 'lucide-react';
import { Trophy, Users, GraduationCap, Medal } from 'lucide-react';

const features = [
  'دارای مجوز رسمی از سازمان آموزش و پرورش',
  'عضو انجمن چرتکه ایران',
  'دارای گواهینامه بین‌المللی ISO',
];

const stats = [
  { icon: GraduationCap, value: '۵۰۰+', label: 'فارغ‌التحصیل' },
  { icon: Trophy, value: '۴۵+', label: 'رتبه برتر' },
  { icon: Users, value: '۳', label: 'شعبه فعال' },
  { icon: Medal, value: '۱۰+', label: 'سال تجربه' },
];

export default function About() {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-heading">درباره ویرا</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            بیش از یک دهه تجربه در آموزش چرتکه و حساب ذهنی
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Text Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              چرتکه دهگانی ویرا
            </h3>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
              آموزشگاه چرتکه دهگانی ویرا از سال ۱۳۹۳ فعالیت خود را در زمینه آموزش
              چرتکه و حساب ذهنی آغاز کرده است. ما با بهره‌گیری از جدیدترین
              متدهای آموزشی و تیمی از مربیان مجرب، توانسته‌ایم هزاران دانش‌آموز
              را در مسیر پیشرفت تحصیلی قرار دهیم.
            </p>

            {/* Feature Items */}
            <ul className="space-y-4">
              {features.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/15 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-teal-400" />
                  </div>
                  <span className="text-sm text-slate-300 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column — Decorative Card */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-6 text-center">
              ویرا در یک نگاه
            </h3>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    <Icon className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                    <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Achievement Badge */}
            <div className="text-center p-5 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/5 border border-teal-500/15">
              <div className="text-4xl mb-3">🧮</div>
              <p className="text-sm text-slate-300 leading-relaxed">
                <span className="font-bold text-teal-400">آیا می‌دانستید؟</span>{' '}
                کارآموزان آموزشگاه ویرا تاکنون موفق به کسب بیش از ۴۵ رتبه برتر
                کشوری در مسابقات چرتکه و محاسبات ذهنی شده‌اند.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}