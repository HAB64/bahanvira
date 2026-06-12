'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Star, Rainbow } from 'lucide-react';
import Image from 'next/image';
import ChildFriendlyBackground from './ChildFriendlyBackground';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      dir="rtl"
    >
      {/* Background image from uploaded advertisement - using Image component for reliable basePath handling */}
      <Image
        src="/images/hero-ad.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />

      {/* Semi-transparent overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-bl from-amber-900/70 via-black/50 to-teal-900/60" />

      {/* Subtle animated accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Animated child-friendly background - subtle sparkles over image */}
      <ChildFriendlyBackground variant="hero" />

      {/* Soft wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L48 55C96 50 192 40 288 45C384 50 480 70 576 75C672 80 768 70 864 60C960 50 1056 40 1152 45C1248 50 1344 70 1392 80L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="white" fillOpacity="0.6" />
          <path d="M0 80L48 75C96 70 192 60 288 65C384 70 480 90 576 95C672 100 768 90 864 80C960 70 1056 60 1152 65C1248 70 1344 90 1392 100L1440 110V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V80Z" fill="white" />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-right">
            {/* Badge - playful style with glass effect on dark bg */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-bold border border-white/25 shadow-lg animate-bounce-gentle">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>روش نوین آموزش چرتکه دهگانی</span>
              <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight drop-shadow-lg">
              <span className="text-white">آموزش </span>
              <span className="bg-gradient-to-l from-amber-300 via-orange-300 to-teal-300 bg-clip-text text-transparent">
                چرتکه دهگانی
              </span>
              <br />
              <span className="text-white">و حساب ذهنی</span>
            </h1>

            <p className="text-base md:text-lg text-white/85 leading-8 max-w-lg mx-auto lg:mx-0 drop-shadow">
              با آموزش تخصصی چرتکه دهگانی ویرا، فرزند شما علاوه بر تسلط بر محاسبات ذهنی،
              تمرکز، اعتماد به نفس و هوش ریاضی خود را به‌طور چشمگیری تقویت می‌کند.
            </p>

            {/* Stats mini - glass pills on dark bg */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm">
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20">
                <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span className="font-bold">۵۰۰+</span>
                <span className="text-white/80">کارآموز</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20">
                <Star className="w-4 h-4 fill-teal-300 text-teal-300" />
                <span className="font-bold">۴۵+</span>
                <span className="text-white/80">رتبه برتر</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-l from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-2xl px-8 py-6 text-base font-bold shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-400/50 transition-all hover:scale-105"
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
                className="border-2 border-white/40 text-white hover:bg-white/15 backdrop-blur-sm rounded-2xl px-8 py-6 text-base font-bold hover:scale-105 transition-all"
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
              {/* Decorative rotating border */}
              <div className="absolute -inset-6 bg-gradient-to-br from-amber-200 via-yellow-200 to-teal-200 rounded-[2rem] blur-2xl opacity-50 animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute -inset-3 bg-gradient-to-br from-amber-300/30 via-orange-200/20 to-teal-300/30 rounded-[1.8rem] animate-wiggle" />
              <Image
                src="/images/abacus-hero.jpg"
                alt="چرتکه دهگانی ویرا"
                width={600}
                height={400}
                className="relative rounded-3xl shadow-2xl shadow-amber-200/50 object-cover border-4 border-white/50"
                priority
              />

              {/* Playful floating decorative elements around image */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center shadow-lg animate-bounce-gentle">
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-teal-400 rounded-full shadow-lg animate-bounce-gentle" style={{ animationDelay: '1s' }}>
              </div>
              <div className="absolute top-1/4 -left-5 w-6 h-6 bg-pink-300 rounded-lg rotate-45 shadow-md animate-float" style={{ animationDuration: '6s' }}>
              </div>
              <div className="absolute bottom-1/4 -right-5 w-5 h-5 bg-violet-300 rounded-full shadow-md animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }}>
              </div>
            </div>

            {/* Floating badge with real logo */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-4 bg-white rounded-2xl shadow-xl p-3 border border-teal-100 z-10 animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>
              <Image
                src="/logo.webp"
                alt="لوگو ویرا"
                width={52}
                height={52}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
