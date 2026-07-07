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
  iconBg: string;
  iconColor: string;
  btnBg: string;
  hoverBorder: string;
}

const tools = [
  {
    icon: Calculator,
    title: 'چرتکه دهگانی ویرا',
    desc: 'چرتکه دیجیتال تعاملی برای تمرین روزانه',
    btnText: 'شروع تمرین',
    href: '/abacus',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    btnBg: 'bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200 hover:border-orange-300',
    hoverBorder: 'hover:border-orange-200',
  },
  {
    icon: Clock,
    title: 'تایمر تمرین سرعت',
    desc: 'تایمر هوشمند برای تمرین سرعت‌بخشی محاسبات',
    btnText: 'شروع',
    href: '#',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-500',
    btnBg: 'bg-teal-50 text-teal-600 hover:bg-teal-100 border-teal-200 hover:border-teal-300',
    hoverBorder: 'hover:border-teal-200',
  },
  {
    icon: FileText,
    title: 'آزمون آنلاین',
    desc: 'آزمون‌های دوره‌ای برای سنجش پیشرفت',
    btnText: 'شرکت در آزمون',
    href: '/exam',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
    btnBg: 'bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200 hover:border-purple-300',
    hoverBorder: 'hover:border-purple-200',
  },
  {
    icon: Award,
    title: 'گواهینامه دیجیتال',
    desc: 'دریافت گواهینامه پس از اتمام هر سطح',
    btnText: 'مشاهده نمونه',
    href: '#',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-500',
    btnBg: 'bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200 hover:border-amber-300',
    hoverBorder: 'hover:border-amber-200',
  },
];

export default function PracticeTools() {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-white">
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
              <div key={tool.title} className={`bright-card p-6 flex flex-col group transition-all duration-300 ${tool.hoverBorder}`}>
                <div className={`w-12 h-12 rounded-xl ${tool.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${tool.iconColor}`} />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3">{tool.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500 mb-6 flex-1">{tool.desc}</p>

                <Link
                  href={tool.href}
                  className={`inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${tool.btnBg}`}
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