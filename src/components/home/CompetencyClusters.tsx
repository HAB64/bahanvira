'use client';

import { Calculator, Brain, Trophy, Medal, Users, Calendar, Award, Heart } from 'lucide-react';
import { siteConfig } from '@/config/site';
import ChildFriendlyBackground from './ChildFriendlyBackground';

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  Brain,
  Trophy,
  Medal,
  Users,
  Calendar,
  Award,
  Heart,
};

const categoryColors = [
  'from-amber-400 to-orange-400',
  'from-teal-400 to-emerald-400',
  'from-pink-400 to-rose-400',
  'from-violet-400 to-purple-400',
];

const categoryBgs = [
  'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 hover:border-amber-400 hover:shadow-amber-100',
  'bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200 hover:border-teal-400 hover:shadow-teal-100',
  'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 hover:border-pink-400 hover:shadow-pink-100',
  'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200 hover:border-violet-400 hover:shadow-violet-100',
];

export default function CompetencyClusters() {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden" dir="rtl">
      {/* Warm background with floating shapes */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/50 via-yellow-50/40 to-orange-50/30" />
      <ChildFriendlyBackground variant="light" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-amber-600 font-bold text-sm mb-3 bg-gradient-to-l from-amber-50 to-yellow-50 px-5 py-2 rounded-full border border-amber-200 shadow-sm">
            <span className="text-base">✨</span>
            حوزه‌های آموزشی
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            مسیر آموزشی <span className="bg-gradient-to-l from-amber-500 to-orange-500 bg-clip-text text-transparent">ویرا</span>
          </h2>
          <p className="text-gray-600 leading-7">
            ما در آموزشگاه ویرا، مسیر آموزشی منسجم و علمی را برای رشد مهارت‌های ریاضی
            و ذهنی فرزند شما طراحی کرده‌ایم. هر حوزه آموزشی با هدف تقویت توانمندی‌های
            خاص کودک برنامه‌ریزی شده است.
          </p>
        </div>

        {/* Clusters - Playful cards with rounded corners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Calculator;
            return (
              <div
                key={cat.slug}
                className={`group relative p-6 rounded-3xl border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${categoryBgs[i]}`}
              >
                {/* Decorative corner dot */}
                <div className={`absolute top-3 left-3 w-2 h-2 rounded-full bg-gradient-to-br ${categoryColors[i]} opacity-40`} />

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${categoryColors[i]} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{cat.name}</h3>
                <p className="text-sm text-gray-500 mb-3" dir="ltr">
                  {cat.nameEn}
                </p>
                <p className="text-sm text-gray-600 leading-6">
                  {i === 0 &&
                    'شروع مسیر یادگیری با آشنایی ساختار چرتکه و مفاهیم پایه اعداد و عملیات ساده'}
                  {i === 1 &&
                    'تقویت توانایی محاسبات ذهنی بدون نیاز به چرتکه فیزیکی و افزایش سرعت عمل'}
                  {i === 2 &&
                    'تسلط بر عملیات پیچیده و آمادگی برای مسابقات و آزمون‌های تخصصی'}
                  {i === 3 &&
                    'تمرینات فشرده و تکنیک‌های ویژه برای کسب رتبه برتر در مسابقات'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
