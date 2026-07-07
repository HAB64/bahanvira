'use client';

import { useState } from 'react';

const steps = [
  {
    number: 1,
    title: 'آشنایی با چرتکه',
    level: 'سطح ۱-۳',
    desc: 'یادگیری حرکت مهره‌ها و عملیات ساده جمع و تفریق',
  },
  {
    number: 2,
    title: 'جمع و تفریق',
    level: 'سطح ۴-۶',
    desc: 'تسلط بر جمع و تفریق چندرقمی با چرتکه',
  },
  {
    number: 3,
    title: 'ضرب و تقسیم',
    level: 'سطح ۷-۹',
    desc: 'یادگیری ضرب و تقسیم با چرتکه دهگانی',
  },
  {
    number: 4,
    title: 'حساب ذهنی',
    level: 'سطح ۱۰-۱۲',
    desc: 'انجام محاسبات بدون چرتکه فیزیکی',
  },
  {
    number: 5,
    title: 'مسابقات',
    level: 'سطح حرفه‌ای',
    desc: 'آمادگی برای مسابقات سرعت و دقت',
  },
];

export default function LearningPath() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden section-gradient">
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
          {/* Step circles and connectors */}
          <div className="flex items-start justify-between w-full max-w-5xl relative">
            {/* Connector line behind circles */}
            <div className="absolute top-7 right-[10%] left-[10%] h-0.5 bg-white/10" />
            <div
              className="absolute top-7 right-[10%] h-0.5 bg-gradient-to-l from-teal-400 to-teal-600 transition-all duration-700 ease-out"
              style={{ width: `${(activeStep / (steps.length - 1)) * 80}%` }}
            />

            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex flex-col items-center flex-1 relative z-10 cursor-pointer"
                onClick={() => setActiveStep(index)}
              >
                {/* Circle */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 border-2 ${
                    index <= activeStep
                      ? 'bg-gradient-to-br from-teal-400 to-teal-600 border-teal-400 text-white shadow-lg shadow-teal-500/25'
                      : 'bg-white/5 border-white/15 text-white/40 hover:bg-white/10 hover:border-white/25'
                  }`}
                >
                  {index < activeStep ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>

                {/* Text below */}
                <div className="mt-4 text-center px-2">
                  <h3
                    className={`text-sm font-bold transition-colors duration-300 ${
                      index <= activeStep ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <span
                    className={`inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      index <= activeStep
                        ? 'bg-teal-500/15 text-teal-400'
                        : 'bg-white/5 text-white/30'
                    }`}
                  >
                    {step.level}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Active step detail card */}
          <div className="glass-card rounded-2xl p-6 mt-10 w-full max-w-2xl text-center transition-all duration-500">
            <span className="text-xs text-teal-400 font-bold tracking-wide">
              مرحله {steps[activeStep].number} از {steps.length}
            </span>
            <h3 className="text-xl font-bold text-white mt-2">
              {steps[activeStep].title}
            </h3>
            <p className="text-slate-400 mt-2 leading-relaxed text-sm sm:text-base">
              {steps[activeStep].desc}
            </p>
          </div>
        </div>

        {/* Mobile Vertical Stepper */}
        <div className="md:hidden space-y-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex gap-4 cursor-pointer"
              onClick={() => setActiveStep(index)}
            >
              {/* Line + Circle column */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-500 border-2 ${
                    index <= activeStep
                      ? 'bg-gradient-to-br from-teal-400 to-teal-600 border-teal-400 text-white shadow-lg shadow-teal-500/25'
                      : 'bg-white/5 border-white/15 text-white/40'
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
                  <div
                    className={`w-0.5 flex-1 min-h-[24px] mt-2 transition-colors duration-500 ${
                      index < activeStep ? 'bg-teal-500' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>

              {/* Content column */}
              <div className={`pb-8 ${index === steps.length - 1 ? 'pb-0' : ''}`}>
                <div className="glass-card rounded-2xl p-4">
                  <h3
                    className={`text-base font-bold transition-colors duration-300 ${
                      index <= activeStep ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <span
                    className={`inline-block mt-1.5 text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      index <= activeStep
                        ? 'bg-teal-500/15 text-teal-400'
                        : 'bg-white/5 text-white/30'
                    }`}
                  >
                    {step.level}
                  </span>
                  <p className="text-slate-400 mt-2 leading-relaxed text-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}