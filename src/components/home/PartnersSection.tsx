'use client';

import {
  Building2,
  GraduationCap,
  Baby,
  BookOpen,
  MapPin,
  Handshake,
  Phone,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChildFriendlyBackground from './ChildFriendlyBackground';

const partners = [
  {
    icon: Baby,
    title: 'مهدکودک‌ها',
    description:
      'قرارداد آموزشی با مهدکودک‌ها برای ارائه دوره‌های چرتکه مقدماتی متناسب با گروه سنی ۵ تا ۷ سال. آموزش در محیط آشنا و دوستانه کودک، با بازی‌های تعاملی و جذاب انجام می‌شود و نتایج چشمگیری در تقویت تمرکز و هوش ریاضی کودکان به همراه دارد.',
    color: 'from-pink-400 to-rose-500',
    bg: 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 hover:border-pink-400 hover:shadow-pink-100',
    emoji: '🧒',
  },
  {
    icon: GraduationCap,
    title: 'مدارس ابتدایی',
    description:
      'همکاری با مدارس ابتدایی برای اجرای برنامه آموزش چرتکه به‌صورت فوق‌برنامه یا در قالب هنرستان ریاضی. ارائه دوره‌های تخصصی حساب ذهنی و چرتکه پیشرفته برای دانش‌آموزان پایه‌های اول تا ششم که منجر به ارتقای سطح ریاضی مدرسه و کسب رتبه‌های برتر در مسابقات می‌شود.',
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400 hover:shadow-amber-100',
    emoji: '🏫',
  },
  {
    icon: BookOpen,
    title: 'کانون‌های دانش‌آموزی',
    description:
      'قرارداد با کانون‌های دانش‌آموزی و فرهنگی برای برگزاری دوره‌های چرتکه دهگانی در تمامی سطوح. کانون‌ها با بهره‌گیری از برند معتبر ویرا و اساتید مجرب، می‌توانند خدمت آموزشی متمایزی به اعضای خود ارائه دهند و جذب دانش‌آموز جدید داشته باشند.',
    color: 'from-teal-400 to-emerald-500',
    bg: 'bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200 hover:border-teal-400 hover:shadow-teal-100',
    emoji: '📚',
  },
  {
    icon: Building2,
    title: 'پژوهشسراها',
    description:
      'همکاری با پژوهشسراهای دانش‌آموزی برای ارائه دوره‌های تخصصی و پیشرفته چرتکه و حساب ذهنی. این دوره‌ها در راستای اهداف پژوهشی و علمی پژوهشسراها طراحی شده و دانش‌آموزان را برای شرکت در مسابقات علمی و پژوهشی آماده می‌کند.',
    color: 'from-violet-400 to-purple-500',
    bg: 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200 hover:border-violet-400 hover:shadow-violet-100',
    emoji: '🔬',
  },
];

const benefits = [
  {
    icon: Handshake,
    title: 'قرارداد رسمی آموزشی',
    desc: 'عقد قرارداد شفاف و رسمی با تعیین دقیق شرایط، تعرفه‌ها و برنامه آموزشی',
    emoji: '🤝',
  },
  {
    icon: MapPin,
    title: 'پوشش سراسری',
    desc: 'حضور فعال در استان‌ها و شهرهای مختلف کشور با شبکه نمایندگی‌های مجرب',
    emoji: '🗺️',
  },
  {
    icon: GraduationCap,
    title: 'اساتید متخصص',
    desc: 'اعزام اساتید آموزش‌دیده و مجرب ویرا به محل مؤسسه همکار',
    emoji: '👨‍🏫',
  },
  {
    icon: BookOpen,
    title: 'برنامه آموزشی استاندارد',
    desc: 'ارائه سرفصل‌ها و برنامه آموزشی استاندارد ویرا متناسب با سطح و سن دانش‌آموزان',
    emoji: '📋',
  },
];

export default function PartnersSection() {
  return (
    <section id="partners" className="py-16 md:py-24 relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/40 via-orange-50/30 to-teal-50/30" />
      <ChildFriendlyBackground variant="light" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-teal-600 font-bold text-sm mb-3 bg-gradient-to-l from-teal-50 to-emerald-50 px-5 py-2 rounded-full border border-teal-200 shadow-sm">
            <span className="text-base">🤝</span>
            همکاری و نمایندگی
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            همکاری با <span className="bg-gradient-to-l from-teal-500 to-emerald-500 bg-clip-text text-transparent">مؤسسات آموزشی</span> سراسر کشور
          </h2>
          <p className="text-gray-600 leading-8">
            آموزشگاه چرتکه دهگانی ویرا با مهدکودک‌ها، مدارس، کانون‌های دانش‌آموزی و پژوهشسراها
            در شهرها و استان‌های مختلف کشور قرارداد آموزشی می‌بندد. همچنین در بسیاری از شهرها
            نمایندگی رسمی ویرا فعالیت می‌کند و خدمات آموزشی تخصصی چرتکه دهگانی را به کودکان
            و نوجوانان ارائه می‌دهد.
          </p>
        </div>

        {/* Partner Types - Playful cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {partners.map((partner) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.title}
                className={`group p-6 md:p-8 rounded-3xl border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${partner.bg}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-2xl">{partner.emoji}</div>
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${partner.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      {partner.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-7">
                  {partner.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Benefits - Warm and inviting */}
        <div className="bg-gradient-to-br from-teal-50 via-amber-50 to-teal-50 rounded-[2rem] p-8 md:p-12 mb-12 border border-teal-100 shadow-sm relative overflow-hidden">
          <ChildFriendlyBackground variant="light" />
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8 relative z-10">
            مزایای همکاری با ویرا
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-sm hover:shadow-lg transition-all duration-300 text-center hover:-translate-y-1"
                >
                  <div className="text-2xl mb-2">{benefit.emoji}</div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-5">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Representative CTA */}
        <div className="bg-gradient-to-l from-amber-500 via-orange-500 to-teal-600 rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
          <ChildFriendlyBackground variant="hero" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-20 w-48 h-48 bg-white rounded-full blur-2xl" />
          </div>
          <div className="relative z-10">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
              دریافت نمایندگی ویرا در شهر شما
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-8 max-w-2xl mx-auto mb-8">
              اگر در زمینه آموزش کودکان فعالیت دارید و علاقه‌مند به همکاری با برند معتبر
              چرتکه دهگانی ویرا هستید، با ما تماس بگیرید. شرایط ویژه‌ای برای نمایندگی‌های
              جدید در شهرهای فاقد نماینده در نظر گرفته‌ایم.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-amber-700 font-bold rounded-2xl px-8 py-6 hover:bg-gray-100 shadow-lg hover:scale-105 transition-all"
                onClick={() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                درخواست نمایندگی
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
              <a
                href="tel:01144746441"
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all border border-white/30 hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                <span>تماس مشاوره</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
