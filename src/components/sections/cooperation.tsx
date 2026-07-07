'use client';

import { Building2, UserPlus, Handshake, ArrowLeft } from 'lucide-react';

const cards = [
  {
    icon: Building2,
    title: 'همکاری آموزشگاهی',
    desc: 'آموزشگاه‌های سراسر کشور می‌توانند نماینده رسمی ویرا شوند و از مزایای ویژه بهره‌مند گردند.',
    button: 'درخواست همکاری',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    hoverBorder: 'hover:border-orange-200',
  },
  {
    icon: UserPlus,
    title: 'استخدام مربی',
    desc: 'اگر مربی چرتکه با تجربه هستید، به تیم ما بپیوندید.',
    button: 'ارسال رزومه',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-500',
    hoverBorder: 'hover:border-teal-200',
  },
  {
    icon: Handshake,
    title: 'فرانشیز',
    desc: 'راه‌اندازی شعبه آموزشگاه چرتکه ویرا در شهر شما.',
    button: 'اطلاعات بیشتر',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
    hoverBorder: 'hover:border-purple-200',
  },
];

export default function Cooperation() {
  return (
    <section id="cooperation" className="py-16 sm:py-20 relative overflow-hidden section-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center">
          <h2 className="section-heading">همکاری با ویرا</h2>
          <p className="section-subheading max-w-2xl mx-auto">
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
                className={`bright-card p-6 flex flex-col items-center text-center group ${card.hoverBorder}`}
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${card.iconBg} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-7 w-7 ${card.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="text-sm text-slate-500 mt-3 leading-relaxed flex-1">{card.desc}</p>
                <button className="btn-ghost mt-6">{card.button}<ArrowLeft className="h-4 w-4" /></button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}