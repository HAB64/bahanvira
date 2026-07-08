"use client";

import { CheckCircle, Trophy, Rocket, Crown, Star, Zap } from "lucide-react";

const levels = [
  { level: 1, title: "آشنایی با چرتکه", subtitle: "شروع سفر", description: "در این مرحله با ساختار چرتکه، مهره‌ها و نحوه نمایش اعداد آشنا می‌شوید. حرکت مهره‌ها و مفهوم ارزش مکانی را یاد می‌گیرید.", skills: ["شناخت چرتکه", "نمایش اعداد", "حرکت مهره‌ها"], icon: Zap, color: "#2F80ED", bgColor: "bg-blue-500/10" },
  { level: 2, title: "جمع و تفریق", subtitle: "تسلط بر پایه‌ها", description: "یادگیری جمع و تفریق یک‌رقمی و چندرقمی بر روی چرتکه. تمرکز بر سرعت و دقت در حرکت مهره‌ها و افزایش اعتماد به نفس.", skills: ["جمع یک‌رقمی", "تفریق یک‌رقمی", "اعداد چندرقمی"], icon: Rocket, color: "#14B8A6", bgColor: "bg-teal-500/10" },
  { level: 3, title: "ضرب و تقسیم", subtitle: "مهارت‌های پیشرفته", description: "یادگیری ضرب و تقسیم بر روی چرتکه و شروع تصویرسازی ذهنی. ترکیب چهار عمل اصلی در یک محاسبه پیچیده.", skills: ["ضرب ذهنی", "تقسیم ذهنی", "ترکیب اعمال"], icon: Star, color: "#F2994A", bgColor: "bg-orange-500/10" },
  { level: 4, title: "محاسبه ذهنی", subtitle: "چرتکه در ذهن", description: "بدون نیاز به چرتکه فیزیکی، تمام محاسبات را در ذهن انجام دهید. سرعت و دقت شما به سطح خیره‌کننده‌ای می‌رسد.", skills: ["تصویرسازی ذهنی", "سرعت بالا", "محاسبه بدون ابزار"], icon: CheckCircle, color: "#8B5CF6", bgColor: "bg-purple-500/10" },
  { level: 5, title: "قهرمان مسابقات", subtitle: "بالاترین سطح", description: "آمادگی کامل برای مسابقات ملی و بین‌المللی. تکنیک‌های پیشرفته و تمرینات ویژه برای رسیدن به رتبه‌های برتر.", skills: ["مسابقات ملی", "مسابقات بین‌المللی", "رکوردشکنی"], icon: Trophy, color: "#27AE60", bgColor: "bg-emerald-500/10" },
];

export default function LearningPath() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute top-0 right-0 h-full w-full opacity-30" style={{ background: "linear-gradient(135deg, rgba(39,174,96,0.08) 0%, transparent 40%, rgba(15,23,42,0.02) 100%)" }} />
      <div className="animate-float pointer-events-none absolute top-16 left-[8%] h-4 w-4 rounded-full bg-[#27AE60]/20" />
      <div className="animate-float-slow pointer-events-none absolute bottom-20 right-[12%] h-6 w-6 rounded-lg bg-[#2F80ED]/15 rotate-45" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-16 sm:mb-20 text-center">
          <span className="section-badge">مسیر یادگیری</span>
          <h2 className="section-heading">از مبتدی تا قهرمان</h2>
          <p className="section-subheading mx-auto max-w-2xl">یک مسیر مشخص و ساختارمند از شروع تا رسیدن به بالاترین سطح مهارت چرتکه. هر مرحله شما را یک قدم به قهرمانی نزدیک‌تر می‌کند.</p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute right-6 top-0 bottom-0 w-0.5 md:right-1/2 md:-translate-x-1/2" style={{ background: "linear-gradient(to bottom, #2F80ED, #14B8A6, #F2994A, #8B5CF6, #27AE60)" }} />

          <div className="space-y-10 sm:space-y-12">
            {levels.map((level, index) => {
              const Icon = level.icon;
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex items-start gap-6 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`premium-card-static flex-1 p-5 sm:p-6 md:w-[calc(50%-2rem)] ${isEven ? "md:ml-auto md:mr-12" : "md:mr-auto md:ml-12"}`}>
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${level.bgColor}`}>
                        <Icon size={24} style={{ color: level.color }} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold" style={{ color: level.color }}>{level.subtitle}</div>
                        <h3 className="text-lg font-bold text-[#102A43]">{level.title}</h3>
                      </div>
                    </div>
                    <p className="mb-4 text-sm leading-7 text-[#718096]">{level.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {level.skills.map((skill, i) => (
                        <span key={i} className="rounded-lg px-3 py-1.5 text-xs font-medium" style={{ backgroundColor: `${level.color}10`, color: level.color }}>{skill}</span>
                      ))}
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute right-6 top-4 z-10 hidden md:right-1/2 md:block md:-translate-x-1/2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 bg-white shadow-lg" style={{ borderColor: level.color }}>
                      <span className="text-sm font-extrabold" style={{ color: level.color }}>{level.level}</span>
                    </div>
                  </div>
                  <div className="absolute right-6 top-4 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 bg-white shadow-md md:hidden" style={{ borderColor: level.color }}>
                    <span className="text-xs font-extrabold" style={{ color: level.color }}>{level.level}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final Trophy */}
          <div className="mt-14 sm:mt-16 flex flex-col items-center text-center">
            <div className="animate-bounce-soft mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#27AE60]/10">
              <Crown size={32} className="text-[#27AE60]" />
            </div>
            <p className="text-lg font-bold text-[#102A43]">مسیر موفقیت شما از همینجا شروع می‌شود!</p>
            <a href="#register" className="btn-secondary-green mt-4">شروع یادگیری رایگان</a>
          </div>
        </div>
      </div>
    </section>
  );
}