'use client';

import { Users, Calendar, Award, Heart, Music, Megaphone, MapPin, Building2, Handshake } from 'lucide-react';
import { stats } from '@/data/courses';
import Image from 'next/image';
import ChildFriendlyBackground from './ChildFriendlyBackground';

const iconMap: Record<string, React.ElementType> = {
  Users,
  Calendar,
  Award,
  Heart,
  MapPin,
  Building2,
  Handshake,
};

const statColors = [
  'from-amber-400 to-orange-400',
  'from-teal-400 to-emerald-400',
  'from-pink-400 to-rose-400',
  'from-violet-400 to-purple-400',
];

const statTextColors = [
  'text-amber-600',
  'text-teal-600',
  'text-pink-600',
  'text-violet-600',
];

const statBgs = [
  'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100',
  'bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-100',
  'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-100',
  'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100',
];

export default function TrustSection() {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-b from-teal-100/40 via-emerald-50/30 to-amber-50/30" />
      <ChildFriendlyBackground variant="light" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-amber-600 font-bold text-sm mb-3 bg-gradient-to-l from-amber-50 to-yellow-50 px-5 py-2 rounded-full border border-amber-200 shadow-sm">
            <span className="text-base">🏆</span>
            چرا ویرا
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            اعتماد والدین، <span className="bg-gradient-to-l from-amber-500 to-orange-500 bg-clip-text text-transparent">افتخار ما</span>
          </h2>
          <p className="text-gray-600 leading-7">
            سال‌ها تجربه آموزش تخصصی چرتکه دهگانی و رضایت بالای والدین، بهترین تضمین
            کیفیت خدمات آموزشی ماست. آمار و ارقام گویای تعهد ما به تعالی آموزشی است.
          </p>
        </div>

        {/* Stats Grid - Playful rounded cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Users;
            return (
              <div
                key={stat.label}
                className={`text-center p-6 md:p-8 rounded-3xl border-2 ${statBgs[i]} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${statColors[i]} flex items-center justify-center mx-auto mb-3 shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className={`text-3xl md:text-4xl font-black mb-1 ${statTextColors[i]}`}>
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Trust Badges - Warm and inviting */}
        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-teal-50 rounded-[2rem] p-8 md:p-12 border border-amber-100 shadow-sm relative overflow-hidden">
          <ChildFriendlyBackground variant="light" />
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8 relative z-10">
            مزایای آموزش چرتکه دهگانی
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {[
              {
                title: 'تقویت تمرکز',
                desc: 'تمرینات چرتکه باعث افزایش چشمگیر تمرکز و دقت توجه کودک در تمامی فعالیت‌های روزانه و تحصیلی می‌شود.',
                emoji: '🎯',
                color: 'from-amber-100 to-yellow-50 border-amber-200',
              },
              {
                title: 'افزایش سرعت محاسبه',
                desc: 'دانش‌آموزان چرتکه آموزش‌دیده، توانایی محاسبات ذهنی بسیار سریع‌تر از همسالان خود را کسب می‌کنند.',
                emoji: '⚡',
                color: 'from-teal-100 to-emerald-50 border-teal-200',
              },
              {
                title: 'تقویت حافظه',
                desc: 'تصویرسازی ذهنی چرتکه و تمرینات مرتبط، حافظه کوتاه‌مدت و بلندمدت کودک را به‌طور مؤثری تقویت می‌کند.',
                emoji: '🧠',
                color: 'from-pink-100 to-rose-50 border-pink-200',
              },
              {
                title: 'اعتماد به نفس',
                desc: 'موفقیت در محاسبات ذهنی و کسب رتبه‌های برتر، اعتماد به نفس کودک را در تمامی جنبه‌های زندگی افزایش می‌دهد.',
                emoji: '💪',
                color: 'from-violet-100 to-purple-50 border-violet-200',
              },
              {
                title: 'خلاقیت و تفکر',
                desc: 'آموزش چرتکه نیمکره راست مغز را فعال کرده و خلاقیت، تفکر تحلیلی و مهارت حل مسئله را تقویت می‌کند.',
                emoji: '🎨',
                color: 'from-orange-100 to-amber-50 border-orange-200',
              },
              {
                title: 'عملکرد تحصیلی بهتر',
                desc: 'تحقیقات نشان داده کودکان آموزش‌دیده چرتکه، میانگین نمرات بالاتری در دروس مختلف به‌ویژه ریاضی کسب می‌کنند.',
                emoji: '📊',
                color: 'from-cyan-100 to-teal-50 border-cyan-200',
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`bg-gradient-to-br ${item.color} rounded-2xl p-5 border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vira Anthem & Promo Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* سرود ویرا */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border-2 border-gray-100 hover:shadow-2xl hover:border-amber-200 transition-all duration-500 hover:-translate-y-1">
            <div className="relative h-56 md:h-64 overflow-hidden">
              <Image
                src="/images/abacus-anthem.jpg"
                alt="سرود ویرا"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4">
                <div className="flex items-center gap-2 text-white">
                  <Music className="w-5 h-5" />
                  <span className="font-bold text-sm">سرود ویرا</span>
                </div>
                <p className="text-white/80 text-xs mt-1">
                  سرود انگیزشی آموزشگاه چرتکه دهگانی ویرا
                </p>
              </div>
            </div>
          </div>

          {/* اولین آگهی */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border-2 border-gray-100 hover:shadow-2xl hover:border-amber-200 transition-all duration-500 hover:-translate-y-1">
            <div className="relative h-56 md:h-64 overflow-hidden">
              <Image
                src="/images/abacus-ad.jpg"
                alt="آگهی ویرا"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4">
                <div className="flex items-center gap-2 text-white">
                  <Megaphone className="w-5 h-5" />
                  <span className="font-bold text-sm">اخبار و آگهی‌ها</span>
                </div>
                <p className="text-white/80 text-xs mt-1">
                  جدیدترین اخبار و اطلاعیه‌های آموزشگاه ویرا
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
