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
  'from-[#FFD166] to-[#F0A050]',
  'from-[#EF476F] to-[#D6365E]',
  'from-[#EF476F] to-[#D6365E]',
  'from-[#9B59B6] to-[#6C3CE1]',
];

const statTextColors = [
  'text-[#FFD166]',
  'text-[#EF476F]',
  'text-pink-600',
  'text-violet-600',
];

const statBgs = [
  'bg-gradient-to-br from-[#FFD166]/20 to-[#9B59B6]/20 border-[#FFD166]/30',
  'bg-gradient-to-br from-[#EF476F]/10 to-[#9B59B6]/10 border-teal-100',
  'bg-gradient-to-br from-[#EF476F]/10 to-[#D6365E]/10 border-pink-100',
  'bg-gradient-to-br from-[#9B59B6]/10 to-[#6C3CE1]/10 border-violet-100',
];

export default function TrustSection() {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-b from-[#6C3CE1] via-[#8B5FC7]/50 to-[#9B59B6]" />
      <ChildFriendlyBackground variant="light" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-[#FFD166] font-bold text-sm mb-3 bg-gradient-to-l from-[#FFD166]/20 to-[#9B59B6]/20 px-5 py-2 rounded-full border border-[#FFD166]/40 shadow-sm">
            <span className="text-base">🏆</span>
            چرا ویرا
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#FFFCF9] mb-4">
            اعتماد والدین، <span className="bg-gradient-to-l from-[#FFD166] to-[#F0A050] bg-clip-text text-transparent">افتخار ما</span>
          </h2>
          <p className="text-purple-200 leading-7">
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
                <p className="text-sm text-purple-200 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Trust Badges - Warm and inviting */}
        <div className="bg-gradient-to-br from-[#6C3CE1]/30 via-[#9B59B6]/20 to-[#9B59B6]/30 rounded-[2rem] p-8 md:p-12 border border-[#FFD166]/30 shadow-sm relative overflow-hidden">
          <ChildFriendlyBackground variant="light" />
          <h3 className="text-xl md:text-2xl font-bold text-[#FFFCF9] text-center mb-8 relative z-10">
            مزایای آموزش چرتکه دهگانی
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {[
              {
                title: 'تقویت تمرکز',
                desc: 'تمرینات چرتکه باعث افزایش چشمگیر تمرکز و دقت توجه کودک در تمامی فعالیت‌های روزانه و تحصیلی می‌شود.',
                emoji: '🎯',
                color: 'from-[#FFD166]/20 to-[#9B59B6]/20 border-[#FFD166]/40',
              },
              {
                title: 'افزایش سرعت محاسبه',
                desc: 'دانش‌آموزان چرتکه آموزش‌دیده، توانایی محاسبات ذهنی بسیار سریع‌تر از همسالان خود را کسب می‌کنند.',
                emoji: '⚡',
                color: 'from-teal-100 to-emerald-50 border-[#EF476F]/30',
              },
              {
                title: 'تقویت حافظه',
                desc: 'تصویرسازی ذهنی چرتکه و تمرینات مرتبط، حافظه کوتاه‌مدت و بلندمدت کودک را به‌طور مؤثری تقویت می‌کند.',
                emoji: '🧠',
                color: 'from-[#EF476F]/10 to-[#D6365E]/10 border-pink-100',
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
                color: 'from-[#FFD166]/20 to-[#9B59B6]/10 border-orange-200',
              },
              {
                title: 'عملکرد تحصیلی بهتر',
                desc: 'تحقیقات نشان داده کودکان آموزش‌دیده چرتکه، میانگین نمرات بالاتری در دروس مختلف به‌ویژه ریاضی کسب می‌کنند.',
                emoji: '📊',
                color: 'from-[#9B59B6]/20 to-[#6C3CE1]/10 border-cyan-200',
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`bg-gradient-to-br ${item.color} rounded-2xl p-5 border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h4 className="font-bold text-[#FFFCF9] mb-2">{item.title}</h4>
                <p className="text-sm text-purple-200 leading-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vira Anthem & Promo Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* سرود ویرا */}
          <div className="bg-[#8B5FC7]/80 backdrop-blur-sm rounded-3xl overflow-hidden border-2 border-[#A07ED8]/30 hover:shadow-2xl hover:border-[#FFD166]/40 transition-all duration-500 hover:-translate-y-1">
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
          <div className="bg-[#8B5FC7]/80 backdrop-blur-sm rounded-3xl overflow-hidden border-2 border-[#A07ED8]/30 hover:shadow-2xl hover:border-[#FFD166]/40 transition-all duration-500 hover:-translate-y-1">
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
