"use client";

import { Phone, ArrowLeft, Sparkles, Zap, ShieldCheck, Gift } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative py-16 sm:py-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #2F80ED 0%, #1A6DD1 40%, #8B5CF6 100%)" }}>
        {/* Animated mesh background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[5%] h-20 w-20 rounded-full bg-white/10 animate-float-slow" />
          <div className="absolute bottom-[15%] left-[8%] h-14 w-14 rounded-full bg-white/10 animate-float" />
          <div className="absolute top-[50%] left-[20%] h-8 w-8 rounded-full bg-white/5 animate-bounce-soft" />
          <div className="absolute top-[20%] left-[60%] h-6 w-6 rounded-lg bg-white/5 animate-float-reverse rotate-45" />
          <div className="absolute bottom-[30%] right-[25%] h-10 w-10 rounded-full bg-white/[0.07] animate-float-slow" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white/90 border border-white/20 backdrop-blur-sm">
            <Sparkles size={16} />
            شروع سفر موفقیت فرزندتان
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
            آموزش چرتکه را همین امروز شروع کنید!
          </h2>
          <p className="mt-4 text-white/80 text-base sm:text-lg leading-8 max-w-xl mx-auto">
            اولین جلسه مشاوره و ارزیابی کاملاً رایگان است. بدون هیچ تعهدی.
          </p>

          {/* Benefits pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { icon: Zap, label: "نتیجه در ۳۰ روز" },
              { icon: ShieldCheck, label: "ضمانت بازگشت وجه" },
              { icon: Gift, label: "جلسه اول رایگان" },
            ].map((item) => (
              <span key={item.label} className="flex items-center gap-1.5 text-xs font-medium text-white/80 bg-white/10 rounded-full px-4 py-1.5 border border-white/10">
                <item.icon size={13} />
                {item.label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#register" className="inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-2xl text-sm transition-all duration-300 bg-white text-[#2F80ED] hover:bg-white/95 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-0.5 group">
              ثبت‌نام رایگان
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </a>
            <a href="tel:02191302584" className="inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-2xl text-sm transition-all duration-300 text-white border-2 border-white/30 bg-transparent hover:bg-white/15 hover:border-white/50">
              <Phone className="h-4 w-4" />
              تماس با ما
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}