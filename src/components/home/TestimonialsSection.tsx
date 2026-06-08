'use client';

import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/courses';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-amber-600 font-bold text-sm mb-3 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
            نظرات والدین
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            خانواده‌ها درباره <span className="text-amber-600">ویرا</span> چه می‌گویند؟
          </h2>
          <p className="text-gray-600 leading-7">
            رضایت والدین و موفقیت فرزندانشان، بزرگ‌ترین افتخار ماست. نظرات واقعی والدین
            کارآموزان ویرا را در ادامه بخوانید.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 hover:border-amber-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="w-10 h-10 text-amber-200 mb-4" />

              {/* Content */}
              <p className="text-gray-700 leading-8 mb-6 text-sm md:text-base">
                &laquo;{t.content}&raquo;
              </p>

              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
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
