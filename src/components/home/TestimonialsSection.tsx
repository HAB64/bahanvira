'use client';

import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/courses';
import ChildFriendlyBackground from './ChildFriendlyBackground';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100/30 via-amber-50/30 to-yellow-50/30" />
      <ChildFriendlyBackground variant="light" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-amber-600 font-bold text-sm mb-3 bg-gradient-to-l from-amber-50 to-yellow-50 px-5 py-2 rounded-full border border-amber-200 shadow-sm">
            <span className="text-base">💬</span>
            نظرات والدین
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            خانواده‌ها درباره <span className="bg-gradient-to-l from-amber-500 to-orange-500 bg-clip-text text-transparent">ویرا</span> چه می‌گویند؟
          </h2>
          <p className="text-gray-600 leading-7">
            رضایت والدین و موفقیت فرزندانشان، بزرگ‌ترین افتخار ماست. نظرات واقعی والدین
            کارآموزان ویرا را در ادامه بخوانید.
          </p>
        </div>

        {/* Testimonials Grid - Warm cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 border-2 border-gray-100 hover:border-amber-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Quote icon - colorful */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-4">
                <Quote className="w-5 h-5 text-amber-500" />
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-8 mb-6 text-sm md:text-base">
                &laquo;{t.content}&raquo;
              </p>

              {/* Rating - playful stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
