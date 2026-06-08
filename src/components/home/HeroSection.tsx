'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      dir="rtl"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-bl from-amber-50 via-orange-50 to-teal-50" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-300 rounded-full blur-3xl" />
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-32 right-[15%] animate-bounce delay-100">
        <div className="w-3 h-3 rounded-full bg-amber-400 opacity-60" />
      </div>
      <div className="absolute top-48 left-[20%] animate-bounce delay-300">
        <div className="w-2 h-2 rounded-full bg-teal-400 opacity-60" />
      </div>
      <div className="absolute bottom-40 right-[25%] animate-bounce delay-500">
        <div className="w-4 h-4 rounded-full bg-orange-300 opacity-50" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-100/80 backdrop-blur-sm text-amber-800 px-4 py-2 rounded-full text-sm font-medium border border-amber-200">
              <Sparkles className="w-4 h-4" />
              <span>روش نوین آموزش چرتکه دهگانی</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span className="text-gray-900">آموزش </span>
              <span className="bg-gradient-to-l from-amber-600 via-orange-500 to-teal-600 bg-clip-text text-transparent">
                چرتکه دهگانی
              </span>
              <br />
              <span className="text-gray-900">و حساب ذهنی</span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 leading-8 max-w-lg mx-auto lg:mx-0">
              با آموزش تخصصی چرتکه دهگانی ویرا، فرزند شما علاوه بر تسلط بر محاسبات ذهنی،
              تمرکز، اعتماد به نفس و هوش ریاضی خود را به‌طور چشمگیری تقویت می‌کند.
            </p>

            {/* Stats mini */}
            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm">
              <div className="flex items-center gap-1.5 text-amber-700">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold">۵۰۰+</span>
                <span className="text-gray-500">کارآموز</span>
              </div>
              <div className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-1.5 text-teal-700">
                <Star className="w-4 h-4 fill-teal-400 text-teal-400" />
                <span className="font-bold">۴۵+</span>
                <span className="text-gray-500">رتبه برتر</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl px-8 py-6 text-base font-bold shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-300 transition-all"
                onClick={() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                ثبت‌نام مشاوره رایگان
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl px-8 py-6 text-base font-bold"
                onClick={() => {
                  document.querySelector('#courses')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                مشاهده دوره‌ها
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-200 via-orange-200 to-teal-200 rounded-3xl blur-2xl opacity-40" />
              <Image
                src="/images/hero-bg.png"
                alt="چرتکه دهگانی ویرا"
                width={600}
                height={400}
                className="relative rounded-3xl shadow-2xl shadow-amber-200/50 object-cover"
                priority
              />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-4 bg-white rounded-2xl shadow-xl p-4 border border-amber-100 z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl font-black">
                  و
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">ویرا</p>
                  <p className="text-xs text-gray-500">چرتکه دهگانی</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
