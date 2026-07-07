'use client';

import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const advantages = [
  { title: 'روش آموزشی منحصر به فرد', desc: 'ترکیب چرتکه فیزیکی و تمرینات دیجیتال' },
  { title: 'مربیان با تجربه و دارای گواهینامه', desc: 'تمام مربیان دارای گواهینامه بین‌المللی' },
  { title: 'کلاس‌های حضوری و آنلاین', desc: 'انعطاف‌پذیری کامل در نحوه حضور' },
  { title: 'گزارش پیشرفت هفتگی', desc: 'والدین همیشه از وضعیت فرزندشان مطلع هستند' },
  { title: 'آزمون‌های دوره‌ای استاندارد', desc: 'سنجش مستمر پیشرفت دانش‌آموزان' },
  { title: 'محیط دوستانه و رقابتی', desc: 'ایجاد انگیزه از طریق مسابقات داخلی' },
];

export default function WhyVira() {
  return (
    <section id="why-vira" className="py-16 sm:py-20 relative overflow-hidden section-cool">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center">
          <h2 className="section-heading">چرا ویرا؟</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            تفاوت ما با سایر آموزشگاه‌ها
          </p>
        </div>

        {/* Two-column layout */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2 items-start">
          {/* Left: Advantages */}
          <div className="space-y-4">
            {advantages.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={item.title}
                  className={`bright-card-flat p-5 flex items-start gap-4 transition-all duration-300 hover:shadow-md ${
                    isEven ? 'hover:border-orange-200' : 'hover:border-teal-200'
                  }`}
                >
                  <CheckCircle2
                    className={`h-6 w-6 shrink-0 mt-0.5 ${isEven ? 'text-orange-500' : 'text-teal-500'}`}
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Abacus showcase card */}
          <div className="bright-card p-8 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Abacus real image */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg mb-8">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-100/30 to-teal-100/30 z-10 pointer-events-none rounded-2xl" />
              <Image
                src="/chertke-dohgani-vira.png"
                alt="چرتکه دهگانی ویرا"
                width={500}
                height={350}
                className="w-full h-auto object-contain p-6 rounded-2xl"
              />
            </div>

            {/* Achievement badges */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { num: '+۵۰۰', label: 'دانش‌آموز', color: 'text-orange-500' },
                { num: '+۳۰', label: 'نمایندگی', color: 'text-teal-500' },
                { num: '+۲۰', label: 'شهر', color: 'text-purple-500' },
              ].map((badge) => (
                <div key={badge.label} className="bright-card-flat px-4 py-2.5 text-center">
                  <div className={`text-base font-bold ${badge.color}`}>{badge.num}</div>
                  <div className="text-[11px] text-slate-400">{badge.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}