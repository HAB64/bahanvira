'use client';

import { Check } from 'lucide-react';
import { Trophy, Users, GraduationCap, Medal } from 'lucide-react';

const features = [
  'دارای مجوز رسمی از سازمان آموزش و پرورش',
  'عضو انجمن چرتکه ایران',
  'دارای گواهینامه بین‌المللی ISO',
];

const stats = [
  { icon: GraduationCap, value: '۵۰۰+', label: 'فارغ‌التحصیل', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: Trophy, value: '۴۵+', label: 'رتبه برتر', color: 'text-teal-500', bg: 'bg-teal-50' },
  { icon: Users, value: '۳', label: 'شعبه فعال', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: Medal, value: '۱۰+', label: 'سال تجربه', color: 'text-blue-500', bg: 'bg-blue-50' },
];

export default function About() {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-white">
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
            <h3 className="text-xl font-bold text-slate-900 mb-4">چرتکه دهگانی ویرا</h3>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-8">
              آموزشگاه چرتکه دهگانی ویرا از سال ۱۳۹۳ فعالیت خود را در زمینه آموزش
              چرتکه و حساب ذهنی آغاز کرده است. ما با بهره‌گیری از جدیدترین
              متدهای آموزشی و تیمی از مربیان مجرب، توانسته‌ایم هزاران دانش‌آموز
              را در مسیر پیشرفت تحصیلی قرار دهیم.
            </p>

            <ul className="space-y-4">
              {features.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-orange-500" />
                  </div>
                  <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column — Stats Card */}
          <div className="bright-card p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">ویرا در یک نگاه</h3>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className={`text-center p-4 rounded-xl ${stat.bg}`}>
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Did You Know */}
            <div className="text-center p-5 rounded-xl bg-gradient-to-br from-orange-50 to-teal-50 border border-orange-100">
              <p className="text-sm text-slate-600 leading-relaxed">
                <span className="font-bold text-orange-600">آیا می‌دانستید؟</span>{' '}
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