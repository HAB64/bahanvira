'use client';

import { CheckCircle2 } from 'lucide-react';

const advantages = [
  {
    title: 'روش آموزشی منحصر به فرد',
    desc: 'ترکیب چرتکه فیزیکی و تمرینات دیجیتال',
  },
  {
    title: 'مربیان با تجربه و دارای گواهینامه',
    desc: 'تمام مربیان دارای گواهینامه بین‌المللی',
  },
  {
    title: 'کلاس‌های حضوری و آنلاین',
    desc: 'انعطاف‌پذیری کامل در نحوه حضور',
  },
  {
    title: 'گزارش پیشرفت هفتگی',
    desc: 'والدین همیشه از وضعیت فرزندشان مطلع هستند',
  },
  {
    title: 'آزمون‌های دوره‌ای استاندارد',
    desc: 'سنجش مستمر پیشرفت دانش‌آموزان',
  },
  {
    title: 'محیط دوستانه و رقابتی',
    desc: 'ایجاد انگیزه از طریق مسابقات داخلی',
  },
];

export default function WhyVira() {
  return (
    <section id="why-vira" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">چرا ویرا؟</h2>
          <p className="text-slate-400 mt-3 leading-relaxed max-w-2xl mx-auto">
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
                  className={`glass-card rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 ${
                    isEven ? 'hover:border-teal-500/30' : 'hover:border-emerald-500/30'
                  }`}
                >
                  <CheckCircle2
                    className={`h-6 w-6 shrink-0 mt-0.5 ${
                      isEven ? 'text-teal-400' : 'text-emerald-400'
                    }`}
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Decorative showcase card */}
          <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center min-h-[420px] relative">
            {/* Decorative abacus illustration */}
            <div className="relative w-full flex flex-col items-center justify-center flex-1">
              {/* Abacus frame */}
              <div className="relative w-64 sm:w-72">
                {/* Top bar */}
                <div className="h-2 bg-gradient-to-l from-teal-500 to-emerald-500 rounded-full mb-6" />

                {/* Bead rows */}
                {[0, 1, 2, 3, 4].map((row) => (
                  <div key={row} className="flex items-center justify-between mb-5">
                    {/* Rod */}
                    <div className="absolute right-[8%] left-[8%] h-px bg-white/10" />

                    {/* Upper bead */}
                    <div className="relative z-10 h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/20" />

                    {/* Lower beads */}
                    <div className="flex gap-2 relative z-10">
                      {[0, 1, 2, 3].map((b) => (
                        <div
                          key={b}
                          className="h-7 w-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 shadow-md shadow-teal-500/20"
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Bottom bar */}
                <div className="h-2 bg-gradient-to-l from-teal-500 to-emerald-500 rounded-full mt-2" />
              </div>

              {/* Achievement badges */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {[
                  { num: '+۵۰۰', label: 'دانش‌آموز' },
                  { num: '+۳۰', label: 'نمایندگی' },
                  { num: '+۲۰', label: 'شهر' },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="glass-card-lite rounded-xl px-4 py-2.5 text-center"
                  >
                    <div className="text-base font-bold text-teal-400">{badge.num}</div>
                    <div className="text-[11px] text-slate-500">{badge.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}