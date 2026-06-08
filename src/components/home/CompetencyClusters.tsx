'use client';

import { Calculator, Brain, Trophy, Medal, Users, Calendar, Award, Heart } from 'lucide-react';
import { siteConfig } from '@/config/site';

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
  'from-amber-500 to-orange-500',
  'from-teal-500 to-emerald-500',
  'from-rose-500 to-pink-500',
  'from-violet-500 to-purple-500',
];

const categoryBgs = [
  'bg-amber-50 border-amber-200 hover:border-amber-400',
  'bg-teal-50 border-teal-200 hover:border-teal-400',
  'bg-rose-50 border-rose-200 hover:border-rose-400',
  'bg-violet-50 border-violet-200 hover:border-violet-400',
];

export default function CompetencyClusters() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-amber-600 font-bold text-sm mb-3 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
            حوزه‌های آموزشی
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            مسیر آموزشی <span className="text-amber-600">ویرا</span>
          </h2>
          <p className="text-gray-600 leading-7">
            ما در آموزشگاه ویرا، مسیر آموزشی منسجم و علمی را برای رشد مهارت‌های ریاضی
            و ذهنی فرزند شما طراحی کرده‌ایم. هر حوزه آموزشی با هدف تقویت توانمندی‌های
            خاص کودک برنامه‌ریزی شده است.
          </p>
        </div>

        {/* Clusters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Calculator;
            return (
              <div
                key={cat.slug}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${categoryBgs[i]}`}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${categoryColors[i]} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}
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
