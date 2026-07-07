"use client";

import { Target, Brain, Zap, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: Target,
    title: "افزایش تمرکز",
    description:
      "تمرین منظم با چرتکه باعث بهبود قابل‌توجه تمرکز و توجه پایدار در کودکان می‌شود و اثر مثبتی بر عملکرد تحصیلی آن‌ها دارد.",
  },
  {
    icon: Brain,
    title: "تقویت حافظه",
    description:
      "محاسبات ذهنی و تصویرسازی چرتکه در ذهن، حافظه کوتاه‌مدت و بلندمدت را به‌طور چشمگیری تقویت می‌کند.",
  },
  {
    icon: Zap,
    title: "افزایش سرعت محاسبات",
    description:
      "با تمرین مستمر، کودکان قادر می‌شوند عملیات ریاضی پیچیده را در کسری از ثانیه و بدون استفاده از ماشین‌حساب انجام دهند.",
  },
  {
    icon: GraduationCap,
    title: "آموزش استاندارد",
    description:
      "سرفصل‌های آموزشی بر اساس استانداردهای بین‌المللی چرتکه دهگانی تدوین شده و با به‌روزترین متدهای آموزشی ارائه می‌شوند.",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">
            چرا چرتکه دهگانی؟
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            آموزش چرتکه دهگانی ویرا فراتر از یک دوره محاسبه ذهنی است؛
            این روش تحولی در رشد شناختی و هوش ریاضی فرزند شما ایجاد می‌کند.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group relative border border-border rounded-2xl p-6 bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}