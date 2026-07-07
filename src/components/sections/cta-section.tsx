'use client';

import { Phone, ArrowLeft } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-l from-[#0d9488] to-[#0f766e] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            آموزش چرتکه را همین امروز شروع کنید!
          </h2>
          <p className="mt-3 text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            اولین جلسه مشاوره و ارزیابی رایگان است
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {/* Primary CTA */}
            <button className="inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-200 bg-white text-teal-700 hover:bg-white/90 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5">
              ثبت‌نام رایگان
              <ArrowLeft className="h-4 w-4" />
            </button>

            {/* Secondary CTA */}
            <button className="inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-200 text-white border border-white/30 bg-transparent hover:bg-white/10 hover:border-white/50">
              <Phone className="h-4 w-4" />
              تماس با ما
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}