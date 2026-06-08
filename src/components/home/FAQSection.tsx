'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '@/data/courses';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-amber-600 font-bold text-sm mb-3 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
            سؤالات متداول
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            پاسخ به <span className="text-amber-600">سؤالات</span> شما
          </h2>
          <p className="text-gray-600 leading-7">
            در این بخش به رایج‌ترین سؤالات والدین درباره آموزش چرتکه دهگانی پاسخ داده‌ایم.
            اگر سؤال دیگری دارید، با ما تماس بگیرید.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl border-2 transition-all duration-300 ${
                  isOpen
                    ? 'border-amber-300 bg-amber-50/50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-amber-200'
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
                  <ChevronDown
                    className={`w-5 h-5 text-amber-600 shrink-0 mr-3 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
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
