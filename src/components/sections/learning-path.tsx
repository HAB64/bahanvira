'use client';

import { useState } from 'react';
import Image from 'next/image';

const steps = [
  {
    number: 1,
    title: 'آشنایی با چرتکه',
    level: 'سطح ۱-۳',
    desc: 'یادگیری حرکت مهره‌ها و عملیات ساده جمع و تفریق',
    color: 'orange',
  },
  {
    number: 2,
    title: 'جمع و تفریق',
    level: 'سطح ۴-۶',
    desc: 'تسلط بر جمع و تفریق چندرقمی با چرتکه',
    color: 'teal',
  },
  {
    number: 3,
    title: 'ضرب و تقسیم',
    level: 'سطح ۷-۹',
    desc: 'یادگیری ضرب و تقسیم با چرتکه دهگانی',
    color: 'purple',
  },
  {
    number: 4,
    title: 'حساب ذهنی',
    level: 'سطح ۱۰-۱۲',
    desc: 'انجام محاسبات بدون چرتکه فیزیکی',
    color: 'blue',
  },
  {
    number: 5,
    title: 'مسابقات',
    level: 'سطح حرفه‌ای',
    desc: 'آمادگی برای مسابقات سرعت و دقت',
    color: 'amber',
  },
];

const colorMap: Record<string, { active: string; bg: string; text: string; badge: string; line: string }> = {
  orange: { active: 'bg-gradient-to-br from-orange-400 to-orange-600 border-orange-400 shadow-orange-500/25', bg: 'bg-orange-50', text: 'text-orange-500', badge: 'bg-orange-100 text-orange-600', line: 'bg-orange-400' },
  teal: { active: 'bg-gradient-to-br from-teal-400 to-teal-600 border-teal-400 shadow-teal-500/25', bg: 'bg-teal-50', text: 'text-teal-500', badge: 'bg-teal-100 text-teal-600', line: 'bg-teal-400' },
  purple: { active: 'bg-gradient-to-br from-purple-400 to-purple-600 border-purple-400 shadow-purple-500/25', bg: 'bg-purple-50', text: 'text-purple-500', badge: 'bg-purple-100 text-purple-600', line: 'bg-purple-400' },
  blue: { active: 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-400 shadow-blue-500/25', bg: 'bg-blue-50', text: 'text-blue-500', badge: 'bg-blue-100 text-blue-600', line: 'bg-blue-400' },
  amber: { active: 'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-400 shadow-amber-500/25', bg: 'bg-amber-50', text: 'text-amber-500', badge: 'bg-amber-100 text-amber-600', line: 'bg-amber-400' },
};

export default function LearningPath() {
  const [activeStep, setActiveStep] = useState(0);

  const stepColors = steps.map(s => colorMap[s.color]);

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-heading">مسیر یادگیری چرتکه</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            از مبتدی تا حرفه‌ای، مسیر یادگیری چرتکه در ۵ مرحله
          </p>
        </div>

        {/* Desktop Horizontal Stepper */}
        <div className="hidden md:flex flex-col items-center">
          <div className="flex items-start justify-between w-full max-w-5xl relative">
            {/* Connector line behind circles */}
            <div className="absolute top-7 right-[10%] left-[10%] h-0.5 bg-gray-200" />
            <div
              className="absolute top-7 right-[10%] h-0.5 bg-gradient-to-l from-orange-400 to-teal-500 transition-all duration-700 ease-out"
              style={{ width: `${(activeStep / (steps.length - 1)) * 80}%` }}
            />

            {steps.map((step, index) => {
              const colors = colorMap[step.color];
              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center flex-1 relative z-10 cursor-pointer"
                  onClick={() => setActiveStep(index)}
                >
                  {/* Circle */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 border-2 ${
                      index <= activeStep
                        ? `${colors.active} text-white shadow-lg`
                        : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    {index < activeStep ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>

                  {/* Text below */}
                  <div className="mt-4 text-center px-2">
                    <h3 className={`text-sm font-bold transition-colors duration-300 ${index <= activeStep ? 'text-slate-900' : 'text-gray-400'}`}>
                      {step.title}
                    </h3>
                    <span className={`inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      index <= activeStep ? colors.badge : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step.level}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active step detail card */}
          <div className="bright-card p-6 mt-10 w-full max-w-2xl text-center transition-all duration-500">
            <span className={`text-xs font-bold tracking-wide ${colorMap[steps[activeStep].color].text}`}>
              مرحله {steps[activeStep].number} از {steps.length}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-2">
              {steps[activeStep].title}
            </h3>
            <p className="text-slate-500 mt-2 leading-relaxed text-sm sm:text-base">
              {steps[activeStep].desc}
            </p>
          </div>
        </div>

        {/* Mobile Vertical Stepper */}
        <div className="md:hidden space-y-0">
          {steps.map((step, index) => {
            const colors = colorMap[step.color];
            return (
              <div key={step.number} className="flex gap-4 cursor-pointer" onClick={() => setActiveStep(index)}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-500 border-2 ${
                      index <= activeStep
                        ? `${colors.active} text-white shadow-lg`
                        : 'bg-gray-50 border-gray-200 text-gray-400'
                    }`}
                  >
                    {index < activeStep ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-0.5 flex-1 min-h-[24px] mt-2 transition-colors duration-500 ${index < activeStep ? 'bg-orange-400' : 'bg-gray-200'}`} />
                  )}
                </div>

                <div className={`pb-8 ${index === steps.length - 1 ? 'pb-0' : ''}`}>
                  <div className="bright-card-flat p-4 rounded-xl">
                    <h3 className={`text-base font-bold transition-colors duration-300 ${index <= activeStep ? 'text-slate-900' : 'text-gray-400'}`}>
                      {step.title}
                    </h3>
                    <span className={`inline-block mt-1.5 text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      index <= activeStep ? colors.badge : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step.level}
                    </span>
                    <p className="text-slate-500 mt-2 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}