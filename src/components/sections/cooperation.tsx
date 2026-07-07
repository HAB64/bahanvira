'use client';

import { Building2, UserPlus, Handshake, ArrowLeft } from 'lucide-react';

const cards = [
  {
    icon: Building2,
    title: 'همکاری آموزشگاهی',
    desc: 'آموزگاه‌های سراسر کشور می‌توانند نماینده رسمی ویرا شوند و از مزایای ویژه بهره‌مند گردند.',
    button: 'درخواست همکاری',
  },
  {
    icon: UserPlus,
    title: 'استخدام مربی',
    desc: 'اگر مربی چرتکه با تجربه هستید، به تیم ما بپیوندید.',
    button: 'ارسال رزومه',
  },
  {
    icon: Handshake,
    title: 'فرانشیز',
    desc: 'راه‌اندازی شعبه آموزشگاه چرتکه ویرا در شهر شما.',
    button: 'اطلاعات بیشتر',
  },
];

export default function Cooperation() {
  return (
    <section id="cooperation" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">همکاری با ویرا</h2>
          <p className="text-slate-400 mt-3 leading-relaxed max-w-2xl mx-auto">
            فرصت‌های همکاری برای آموزشگاه‌ها و مربیان
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="glass-card rounded-2xl p-6 flex flex-col items-center text-center group"
              >
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 border border-teal-500/20 mb-5 group-hover:bg-teal-500/20 transition-colors duration-300">
                  <Icon className="h-7 w-7 text-teal-400" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white">{card.title}</h3>

                {/* Desc */}
                <p className="text-sm text-slate-400 mt-3 leading-relaxed flex-1">
                  {card.desc}
                </p>

                {/* Button */}
                <button className="btn-ghost mt-6">
                  {card.button}
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}