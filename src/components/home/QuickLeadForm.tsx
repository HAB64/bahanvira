'use client';

import { useState } from 'react';
import { Send, User, Phone, MessageSquare, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QuickLeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    childAge: '',
    course: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <section id="contact" className="py-16 md:py-24 bg-gray-50" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center bg-white rounded-2xl p-8 md:p-12 border border-green-200 shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">درخواست شما ثبت شد!</h3>
            <p className="text-gray-600 leading-7">
              از تماس شما سپاسگزاریم. مشاوران ما در اسرع وقت با شما تماس خواهند گرفت.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Info Side */}
          <div className="space-y-6">
            <div>
              <span className="inline-block text-amber-600 font-bold text-sm mb-3 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
                مشاوره رایگان
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                فرم <span className="text-amber-600">مشاوره رایگان</span>
              </h2>
              <p className="text-gray-600 leading-7">
                با تکمیل فرم زیر، مشاوران آموزشی ما با شما تماس خواهند گرفت و بهترین
                مسیر آموزشی را بر اساس سن و سطح فرزندتان پیشنهاد می‌دهند. مشاوره ما
                کاملاً رایگان و بدون تعهد است.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'مشاوره تخصصی',
                  desc: 'ارزیابی سطح و ارائه برنامه آموزشی مناسب',
                  color: 'bg-amber-100 text-amber-700',
                },
                {
                  title: 'کلاس آزمایشی',
                  desc: 'شرکت در یک جلسه آزمایشی رایگان',
                  color: 'bg-teal-100 text-teal-700',
                },
                {
                  title: 'تخفیف ویژه',
                  desc: 'تخفیف ۱۵٪ برای ثبت‌نام آنلاین',
                  color: 'bg-rose-100 text-rose-700',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 bg-white p-4 rounded-xl border border-gray-200"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold ${item.color}`}
                  >
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-5"
          >
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-600" />
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-sm"
                placeholder="نام شما"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-600" />
                شماره تماس
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-sm"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                dir="ltr"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-600" />
                  سن فرزند
                </label>
                <input
                  type="text"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-sm"
                  placeholder="مثلاً ۷ سال"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  دوره مورد نظر
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-sm bg-white"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="beginner">چرتکه مقدماتی</option>
                  <option value="intermediate">حساب ذهنی متوسط</option>
                  <option value="advanced">چرتکه پیشرفته</option>
                  <option value="competition">آمادگی مسابقات</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-600" />
                توضیحات (اختیاری)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-sm resize-none"
                placeholder="سؤال یا توضیحات اضافی..."
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl py-6 text-base font-bold shadow-lg shadow-amber-200 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  در حال ارسال...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  ارسال درخواست مشاوره
                  <Send className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
