'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '@/data/courses';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-violet-50/20 to-white" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-amber-600 font-bold text-sm mb-3 bg-gradient-to-l from-amber-50 to-yellow-50 px-5 py-2 rounded-full border border-amber-200 shadow-sm">
            <span className="text-base">❓</span>
            سؤالات متداول
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            پاسخ به <span className="bg-gradient-to-l from-amber-500 to-orange-500 bg-clip-text text-transparent">سؤالات</span> شما
          </h2>
          <p className="text-gray-600 leading-7">
            در این بخش به رایج‌ترین سؤالات والدین درباره آموزش چرتکه دهگانی پاسخ داده‌ایم.
            اگر سؤال دیگری دارید، با ما تماس بگیرید.
          </p>
        </div>

        {/* FAQ Items - Playful rounded */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border-2 transition-all duration-300 ${
                  isOpen
                    ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-lg shadow-amber-100/50'
                    : 'border-gray-100 bg-white/80 hover:border-amber-200 hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-right"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-gray-900 text-sm md:text-base leading-7 flex-1">
                    {item.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mr-3 transition-all duration-300 ${isOpen ? 'bg-amber-400 text-white rotate-180' : 'bg-amber-100 text-amber-600'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm md:text-base text-gray-600 leading-8 border-t border-amber-200/50 pt-4">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
