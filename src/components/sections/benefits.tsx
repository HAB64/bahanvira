"use client";

import { Brain, Target, Calculator, Sparkles, Puzzle, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const benefits: Benefit[] = [
  {
    icon: Brain,
    title: "تقویت حافظه",
    description: "با تمرین مداوم چرتکه، حافظه کوتاه‌مدت و بلندمدت کودکان به‌طور قابل توجهی تقویت می‌شود.",
    color: "#0d9488",
  },
  {
    icon: Target,
    title: "افزایش تمرکز",
    description: "یادگیری چرتکه نیازمند تمرکز بالا است و این مهارت به سایر بخش‌های زندگی هم منتقل می‌شود.",
    color: "#f97316",
  },
  {
    icon: Calculator,
    title: "محاسبه سریع",
    description: "دانش‌آموزان پس از دوره آموزش چرتکه، عملیات محاسباتی را بسیار سریع‌تر از روش‌های سنتی انجام می‌دهند.",
    color: "#0d9488",
  },
  {
    icon: Sparkles,
    title: "اعتماد به نفس",
    description: "موفقیت در محاسبات ذهنی و شرکت در مسابقات، اعتماد به نفس کودکان را بالا می‌برد.",
    color: "#f97316",
  },
  {
    icon: Puzzle,
    title: "تفکر منطقی",
    description: "چرتکه مهارت تفکر منطقی و تحلیلی را در کودکان پرورش می‌دهد.",
    color: "#0d9488",
  },
  {
    icon: GraduationCap,
    title: "آمادگی مدرسه",
    description: "دانش‌آموزان چرتکه در دروس ریاضی و حتی سایر دروس عملکرد بهتری نشان می‌دهند.",
    color: "#f97316",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-16 sm:py-20 relative overflow-hidden section-gradient">
      {/* Decorative background glows */}
      <div
        className="pointer-events-none absolute -top-32 right-0 w-[500px] h-[500px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #0d9488, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #f97316, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
                className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-2xl mb-5"
                  style={{ background: `${benefit.color}15` }}
                >
                  <Icon
                    className="w-12 h-12"
                    style={{ color: benefit.color }}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-slate-400">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}