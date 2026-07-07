'use client';

import { Phone, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-l from-orange-500 via-orange-500 to-amber-500 py-16 sm:py-20 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[5%] w-20 h-20 rounded-full bg-white/10 animate-float-slow" />
          <div className="absolute bottom-[15%] left-[8%] w-14 h-14 rounded-full bg-white/10 animate-float" />
          <div className="absolute top-[50%] left-[20%] w-8 h-8 rounded-full bg-white/5 animate-bounce-soft" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Abacus decorative image */}
          <div className="flex justify-center mb-6">
            <Image
              src="/chertke-dohgani-vira.png"
              alt="چرتکه دهگانی ویرا"
              width={240}
              height={120}
              className="h-24 sm:h-32 w-auto object-contain drop-shadow-lg opacity-30"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            آموزش چرتکه را همین امروز شروع کنید!
          </h2>
          <p className="mt-3 text-white/80 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            اولین جلسه مشاوره و ارزیابی رایگان است
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button className="inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-200 bg-white text-orange-600 hover:bg-white/90 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5">
              ثبت‌نام رایگان
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button className="inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-200 text-white border-2 border-white/30 bg-transparent hover:bg-white/15 hover:border-white/50">
              <Phone className="h-4 w-4" />
              تماس با ما
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}