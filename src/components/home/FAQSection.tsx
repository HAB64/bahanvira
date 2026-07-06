'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '@/data/courses';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-b from-[#7B4FD4] via-[#9B59B6]/60 to-[#9B59B6]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-[#FFD166] font-bold text-sm mb-3 bg-gradient-to-l from-[#FFD166]/20 to-[#9B59B6]/20 px-5 py-2 rounded-full border border-[#FFD166]/40 shadow-sm">
            <span className="text-base">❓</span>
            سؤالات متداول
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#FFFCF9] mb-4">
            پاسخ به <span className="bg-gradient-to-l from-[#FFD166] to-[#F0A050] bg-clip-text text-transparent">سؤالات</span> شما
          </h2>
          <p className="text-purple-200 leading-7">
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
                    ? 'border-[#FFD166]/50 bg-gradient-to-br from-[#FFD166]/20 to-[#9B59B6]/20 shadow-lg shadow-purple-900/30'
                    : 'border-[#A07ED8]/30 bg-[#8B5FC7]/70 hover:border-[#FFD166]/40 hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-right"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-[#FFFCF9] text-sm md:text-base leading-7 flex-1">
                    {item.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mr-3 transition-all duration-300 ${isOpen ? 'bg-amber-400 text-white rotate-180' : 'bg-[#FFD166]/20 text-[#FFD166]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm md:text-base text-purple-200 leading-8 border-t border-[#FFD166]/40/50 pt-4">
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
