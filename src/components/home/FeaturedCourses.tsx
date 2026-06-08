'use client';

import { Calculator, Brain, Trophy, Medal, Clock, Users, CheckCircle } from 'lucide-react';
import { courses } from '@/data/courses';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  Brain,
  Trophy,
  Medal,
};

export default function FeaturedCourses() {
  return (
    <section id="courses" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-amber-600 font-bold text-sm mb-3 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
            دوره‌های آموزشی
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            دوره‌های <span className="text-amber-600">تخصصی</span> ویرا
          </h2>
          <p className="text-gray-600 leading-7">
            دوره‌های آموزشی ما با بهره‌گیری از جدیدترین روش‌های آموزشی و با هدف تقویت
            مهارت‌های ذهنی و ریاضی کودکان و نوجوانان طراحی شده‌اند.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {courses.map((course) => {
            const Icon = iconMap[course.icon] || Calculator;
            return (
              <div
                key={course.id}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-amber-200 transition-all duration-300"
              >
                {/* Top gradient bar */}
                <div className={`h-2 bg-gradient-to-l ${course.color}`} />

                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{course.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="bg-gray-100 px-2.5 py-0.5 rounded-full text-xs font-medium">
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

                  {/* Features */}
                  <div className="space-y-2.5 mb-6">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
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

                  {/* CTA */}
                  <div className="mt-5">
                    <Button
                      className={`w-full bg-gradient-to-l ${course.color} hover:opacity-90 text-white rounded-xl py-5 font-bold`}
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
