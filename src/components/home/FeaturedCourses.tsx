'use client';

import { Calculator, Brain, Trophy, Medal, Clock, Users, CheckCircle } from 'lucide-react';
import { courses } from '@/data/courses';
import { Button } from '@/components/ui/button';
import ChildFriendlyBackground from './ChildFriendlyBackground';

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  Brain,
  Trophy,
  Medal,
};

export default function FeaturedCourses() {
  return (
    <section id="courses" className="py-16 md:py-24 relative overflow-hidden" dir="rtl">
      {/* Child-friendly gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/40 via-yellow-50/30 to-teal-50/20" />
      <ChildFriendlyBackground variant="section" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-amber-600 font-bold text-sm mb-3 bg-gradient-to-l from-amber-50 to-yellow-50 px-5 py-2 rounded-full border border-amber-200 shadow-sm">
            <span className="text-base">🎓</span>
            دوره‌های آموزشی
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            دوره‌های <span className="bg-gradient-to-l from-amber-500 to-orange-500 bg-clip-text text-transparent">تخصصی</span> ویرا
          </h2>
          <p className="text-gray-600 leading-7">
            دوره‌های آموزشی ما با بهره‌گیری از جدیدترین روش‌های آموزشی و با هدف تقویت
            مهارت‌های ذهنی و ریاضی کودکان و نوجوانان طراحی شده‌اند.
          </p>
        </div>

        {/* Courses Grid - Playful rounded cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {courses.map((course) => {
            const Icon = iconMap[course.icon] || Calculator;
            return (
              <div
                key={course.id}
                className="group bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:border-amber-200 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Top gradient bar with playful curve */}
                <div className={`h-2.5 bg-gradient-to-l ${course.color} relative`}>
                  <div className="absolute inset-0 bg-white/20" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{course.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="bg-gradient-to-l from-gray-50 to-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                          {course.level}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {course.ageRange}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-7 mb-5">{course.description}</p>

                  {/* Features - playful checkmarks */}
                  <div className="space-y-2.5 mb-6">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm">
                        <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle className="w-3.5 h-3.5 text-teal-500" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom info */}
                  <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span>{course.sessions} جلسه</span>
                    </div>
                    <div className="text-left">
                      <span className="text-xs text-gray-400">شهریه</span>
                      <p className="font-bold text-amber-700">
                        {course.price} <span className="text-xs font-normal text-gray-500">تومان</span>
                      </p>
                    </div>
                  </div>

                  {/* CTA - Playful button */}
                  <div className="mt-5">
                    <Button
                      className={`w-full bg-gradient-to-l ${course.color} hover:opacity-90 text-white rounded-2xl py-5 font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]`}
                      onClick={() => {
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      ثبت‌نام و مشاوره رایگان
                    </Button>
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
