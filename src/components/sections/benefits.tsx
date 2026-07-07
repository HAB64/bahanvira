"use client";

import { Brain, Target, Calculator, Sparkles, Puzzle, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const benefits: Benefit[] = [
  {
    icon: Brain,
    title: "تقویت حافظه",
    description: "با تمرین مداوم چرتکه، حافظه کوتاه‌مدت و بلندمدت کودکان به‌طور قابل توجهی تقویت می‌شود.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "hover:border-orange-200",
  },
  {
    icon: Target,
    title: "افزایش تمرکز",
    description: "یادگیری چرتکه نیازمند تمرکز بالا است و این مهارت به سایر بخش‌های زندگی هم منتقل می‌شود.",
    color: "text-teal-500",
    bgColor: "bg-teal-50",
    borderColor: "hover:border-teal-200",
  },
  {
    icon: Calculator,
    title: "محاسبه سریع",
    description: "دانش‌آموزان پس از دوره آموزش چرتکه، عملیات محاسباتی را بسیار سریع‌تر از روش‌های سنتی انجام می‌دهند.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "hover:border-purple-200",
  },
  {
    icon: Sparkles,
    title: "اعتماد به نفس",
    description: "موفقیت در محاسبات ذهنی و شرکت در مسابقات، اعتماد به نفس کودکان را بالا می‌برد.",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "hover:border-amber-200",
  },
  {
    icon: Puzzle,
    title: "تفکر منطقی",
    description: "چرتکه مهارت تفکر منطقی و تحلیلی را در کودکان پرورش می‌دهد.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "hover:border-blue-200",
  },
  {
    icon: GraduationCap,
    title: "آمادگی مدرسه",
    description: "دانش‌آموزان چرتکه در دروس ریاضی و حتی سایر دروس عملکرد بهتری نشان می‌دهند.",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "hover:border-rose-200",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-16 sm:py-20 relative overflow-hidden bg-white">
      {/* Soft background blobs */}
      <div
        className="pointer-events-none absolute -top-32 right-0 w-[500px] h-[500px] rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-0 w-[400px] h-[400px] rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(13,148,136,0.08), transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="section-heading">چرا چرتکه؟</h2>
          <p className="section-subheading">
            چرتکه دهگانی ویرا، ابزاری قدرتمند برای توسعه توانمندی‌های ذهنی کودکان و نوجوانان
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className={`bright-card p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 ${benefit.borderColor}`}
              >
                {/* Icon */}
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-2xl mb-5 ${benefit.bgColor}`}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: benefit.color.includes("text-") ? undefined : benefit.color }}
                    className={`w-7 h-7 ${benefit.color}`}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-3">{benefit.title}</h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-slate-500">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}