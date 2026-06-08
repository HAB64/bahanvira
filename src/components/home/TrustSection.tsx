'use client';

import { Users, Calendar, Award, Heart, Music, Megaphone, MapPin, Building2, Handshake } from 'lucide-react';
import { stats } from '@/data/courses';
import Image from 'next/image';

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
  'text-amber-600',
  'text-teal-600',
  'text-rose-600',
  'text-violet-600',
];

const statBgs = [
  'bg-amber-50',
  'bg-teal-50',
  'bg-rose-50',
  'bg-violet-50',
];

export default function TrustSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-amber-600 font-bold text-sm mb-3 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
            چرا ویرا
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            اعتماد والدین، <span className="text-amber-600">افتخار ما</span>
          </h2>
          <p className="text-gray-600 leading-7">
            سال‌ها تجربه آموزش تخصصی چرتکه دهگانی و رضایت بالای والدین، بهترین تضمین
            کیفیت خدمات آموزشی ماست. آمار و ارقام گویای تعهد ما به تعالی آموزشی است.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Users;
            return (
              <div
                key={stat.label}
                className={`text-center p-6 md:p-8 rounded-2xl ${statBgs[i]} border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-3 ${statColors[i]}`} />
                <p className={`text-3xl md:text-4xl font-black mb-1 ${statColors[i]}`}>
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="bg-gradient-to-l from-amber-50 via-orange-50 to-teal-50 rounded-3xl p-8 md:p-12">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">
            مزایای آموزش چرتکه دهگانی
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'تقویت تمرکز',
                desc: 'تمرینات چرتکه باعث افزایش چشمگیر تمرکز و دقت توجه کودک در تمامی فعالیت‌های روزانه و تحصیلی می‌شود.',
                emoji: '🎯',
              },
              {
                title: 'افزایش سرعت محاسبه',
                desc: 'دانش‌آموزان چرتکه آموزش‌دیده، توانایی محاسبات ذهنی بسیار سریع‌تر از همسالان خود را کسب می‌کنند.',
                emoji: '⚡',
              },
              {
                title: 'تقویت حافظه',
                desc: 'تصویرسازی ذهنی چرتکه و تمرینات مرتبط، حافظه کوتاه‌مدت و بلندمدت کودک را به‌طور مؤثری تقویت می‌کند.',
                emoji: '🧠',
              },
              {
                title: 'اعتماد به نفس',
                desc: 'موفقیت در محاسبات ذهنی و کسب رتبه‌های برتر، اعتماد به نفس کودک را در تمامی جنبه‌های زندگی افزایش می‌دهد.',
                emoji: '💪',
              },
              {
                title: 'خلاقیت و تفکر',
                desc: 'آموزش چرتکه نیمکره راست مغز را فعال کرده و خلاقیت، تفکر تحلیلی و مهارت حل مسئله را تقویت می‌کند.',
                emoji: '🎨',
              },
              {
                title: 'عملکرد تحصیلی بهتر',
                desc: 'تحقیقات نشان داده کودکان آموزش‌دیده چرتکه، میانگین نمرات بالاتری در دروس مختلف به‌ویژه ریاضی کسب می‌کنند.',
                emoji: '📊',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-5 border border-white shadow-sm hover:shadow-md transition-all duration-300"
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
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="relative h-56 md:h-64 overflow-hidden">
              <Image
                src="/images/abacus-anthem.jpg"
                alt="سرود ویرا"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="relative h-56 md:h-64 overflow-hidden">
              <Image
                src="/images/abacus-ad.jpg"
                alt="آگهی ویرا"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
