'use client';

import Link from 'next/link';
import { Calculator, Clock, FileText, Award, ArrowLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Tool {
  icon: LucideIcon;
  title: string;
  desc: string;
  btnText: string;
  href: string;
}

const tools: Tool[] = [
  {
    icon: Calculator,
    title: 'آباکوس مجازی',
    desc: 'چرتکه دیجیتال تعاملی برای تمرین روزانه',
    btnText: 'شروع تمرین',
    href: '/abacus',
  },
  {
    icon: Clock,
    title: 'تایمر تمرین سرعت',
    desc: 'تایمر هوشمند برای تمرین سرعت‌بخشی محاسبات',
    btnText: 'شروع',
    href: '#',
  },
  {
    icon: FileText,
    title: 'آزمون آنلاین',
    desc: 'آزمون‌های دوره‌ای برای سنجش پیشرفت',
    btnText: 'شرکت در آزمون',
    href: '/exam',
  },
  {
    icon: Award,
    title: 'گواهینامه دیجیتال',
    desc: 'دریافت گواهینامه پس از اتمام هر سطح',
    btnText: 'مشاهده نمونه',
    href: '#',
  },
];

export default function PracticeTools() {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-heading">ابزارهای تمرین آنلاین</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            با ابزارهای تعاملی، یادگیری چرتکه را سرعت ببخشید
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.title}
                className="glass-card rounded-2xl p-6 flex flex-col group transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-5 group-hover:bg-teal-500/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-teal-400" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3">
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-slate-400 mb-6 flex-1">
                  {tool.desc}
                </p>

                {/* CTA Button */}
                <Link
                  href={tool.href}
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 hover:text-teal-300 border border-teal-500/20 hover:border-teal-500/30"
                >
                  {tool.btnText}
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}