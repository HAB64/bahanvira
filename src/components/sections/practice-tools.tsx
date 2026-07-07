"use client";

import { Button } from "@/components/ui/button";
import { Calculator, Layers, Timer, ClipboardCheck, ArrowLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Tool {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const tools: Tool[] = [
  {
    icon: Calculator,
    title: "چرتکه مجازی",
    description:
      "با چرتکه آنلاین ما، هر زمان و هر مکان تمرین کنید. رابط کاربری ساده و جذاب برای یادگیری آسان.",
    href: "/abacus",
  },
  {
    icon: Layers,
    title: "فلش کارت",
    description:
      "فلش کارت‌های دیجیتال با سطح‌بندی مختلف برای تقویت سرعت تشخیص اعداد و محاسبات ذهنی.",
    href: "/abacus",
  },
  {
    icon: Timer,
    title: "تمرین سرعت",
    description:
      "تمرینات زمان‌دار برای افزایش سرعت و دقت محاسبات ذهنی با پیشرفت مرحله‌به‌مرحله.",
    href: "/exam",
  },
  {
    icon: ClipboardCheck,
    title: "آزمون آنلاین",
    description:
      "آزمون‌های استاندارد با نتایج فوری برای ارزیابی دقیق سطح مهارت و ردیابی پیشرفت.",
    href: "/exam",
  },
];

export default function PracticeTools() {
  return (
    <section id="practice-tools" className="py-16 sm:py-20 lg:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">
            ابزارهای تمرین آنلاین
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            با ابزارهای تعاملی و آنلاین ویرا، یادگیری چرتکه از کلاس درس فراتر می‌رود
            و در هر لحظه امکان تمرین و پیشرفت دارید.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.title}
                className="group relative border border-border rounded-2xl p-6 bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-accent" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground mb-6 flex-1">
                  {tool.description}
                </p>

                {/* CTA */}
                <Button
                  variant="ghost"
                  className="w-full justify-center gap-2 text-accent hover:text-accent hover:bg-accent/5 font-medium p-0 h-auto"
                  asChild
                >
                  <a href={tool.href}>
                    شروع تمرین
                    <ArrowLeft className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}