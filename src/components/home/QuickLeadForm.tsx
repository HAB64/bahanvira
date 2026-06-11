'use client';

import { useState, useMemo } from 'react';
import { Send, User, Phone, MessageSquare, BookOpen, Gift, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addLead } from '@/lib/storage';
import { addConsultationRequest } from '@/lib/storage';
import { getReferralCodeFromURL } from '@/lib/referral';
import { provinces } from '@/data/provinces';
import type { Lead, ConsultationRequest } from '@/types';
import ChildFriendlyBackground from './ChildFriendlyBackground';

const courseMap: Record<string, string> = {
  beginner: 'دوره چرتکه مقدماتی',
  intermediate: 'دوره حساب ذهنی متوسط',
  advanced: 'دوره چرتکه پیشرفته',
  competition: 'دوره آمادگی مسابقات',
};

function getInitialReferralCode(): string | null {
  if (typeof window === 'undefined') return null;
  return getReferralCodeFromURL();
}

export default function QuickLeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    childAge: '',
    course: '',
    province: '',
    city: '',
    message: '',
    referralCode: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(getInitialReferralCode);

  const availableCities = useMemo(() => {
    const prov = provinces.find(p => p.name === formData.province);
    return prov ? prov.cities : [];
  }, [formData.province]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'province') {
      setFormData((prev) => ({ ...prev, province: value, city: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const effectiveReferralCode = referralCode || formData.referralCode || undefined;

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      childAge: formData.childAge ? parseInt(formData.childAge) : undefined,
      interestedCourse: courseMap[formData.course] || formData.course,
      province: formData.province || undefined,
      city: formData.city || undefined,
      source: effectiveReferralCode ? 'referral' : 'website_form',
      status: 'new',
      priority: 'medium',
      notes: formData.message || '',
      referralCode: effectiveReferralCode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addLead(newLead);

    const consultationRequest: ConsultationRequest = {
      id: `consult-${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      childAge: formData.childAge || undefined,
      interestedCourse: courseMap[formData.course] || formData.course,
      province: formData.province || undefined,
      city: formData.city || undefined,
      message: formData.message || undefined,
      source: effectiveReferralCode ? 'referral' : 'website',
      referralCode: effectiveReferralCode,
      status: 'new',
      createdAt: new Date().toISOString(),
      leadId: newLead.id,
    };
    addConsultationRequest(consultationRequest);

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <section id="contact" className="py-16 md:py-24 relative overflow-hidden" dir="rtl">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/30 via-green-50/20 to-white" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-green-200 shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">درخواست شما ثبت شد! 🎉</h3>
            <p className="text-gray-600 leading-7">
              از تماس شما سپاسگزاریم. مشاوران ما در اسرع وقت با شما تماس خواهند گرفت.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 via-yellow-50/20 to-white" />
      <ChildFriendlyBackground variant="light" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Info Side */}
          <div className="space-y-6">
            <div>
              <span className="inline-flex items-center gap-2 text-amber-600 font-bold text-sm mb-3 bg-gradient-to-l from-amber-50 to-yellow-50 px-5 py-2 rounded-full border border-amber-200 shadow-sm">
                <span className="text-base">📞</span>
                مشاوره رایگان
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                فرم <span className="bg-gradient-to-l from-amber-500 to-orange-500 bg-clip-text text-transparent">مشاوره رایگان</span>
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
                  color: 'bg-gradient-to-br from-amber-100 to-yellow-50 text-amber-700 border-amber-200',
                  emoji: '👩‍🏫',
                },
                {
                  title: 'کلاس آزمایشی',
                  desc: 'شرکت در یک جلسه آزمایشی رایگان',
                  color: 'bg-gradient-to-br from-teal-100 to-emerald-50 text-teal-700 border-teal-200',
                  emoji: '🧮',
                },
                {
                  title: 'تخفیف ویژه',
                  desc: 'تخفیف ۱۵٪ برای ثبت‌نام آنلاین',
                  color: 'bg-gradient-to-br from-pink-100 to-rose-50 text-pink-700 border-pink-200',
                  emoji: '🎁',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`flex items-start gap-4 bg-white/90 p-4 rounded-2xl border-2 ${item.color} transition-all hover:shadow-md hover:-translate-y-0.5`}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg">
                    {item.emoji}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side - Warm and inviting */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 border-2 border-amber-100 shadow-lg space-y-5"
          >
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-500" />
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all text-sm bg-white"
                placeholder="نام شما"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500" />
                شماره تماس
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all text-sm bg-white"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                dir="ltr"
              />
            </div>

            {/* Province and City */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  استان
                </label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all text-sm bg-white"
                >
                  <option value="">انتخاب استان</option>
                  {provinces.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  شهرستان
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!formData.province}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all text-sm bg-white disabled:bg-gray-50 disabled:text-gray-400"
                >
                  <option value="">انتخاب شهرستان</option>
                  {availableCities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-500" />
                  سن فرزند
                </label>
                <input
                  type="text"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all text-sm bg-white"
                  placeholder="مثلاً ۷ سال"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  دوره مورد نظر
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all text-sm bg-white"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="beginner">چرتکه مقدماتی</option>
                  <option value="intermediate">حساب ذهنی متوسط</option>
                  <option value="advanced">چرتکه پیشرفته</option>
                  <option value="competition">آمادگی مسابقات</option>
                </select>
              </div>
            </div>

            {/* Referral Code */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-500" />
                کد معرف (اختیاری)
              </label>
              <input
                type="text"
                name="referralCode"
                value={referralCode || formData.referralCode}
                onChange={handleChange}
                readOnly={!!referralCode}
                className={`w-full px-4 py-3 rounded-2xl border-2 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all text-sm bg-white ${referralCode ? 'bg-amber-50 border-amber-300' : 'border-gray-200'}`}
                placeholder="مثال: VIRA-A3K9"
                dir="ltr"
              />
              {referralCode && (
                <p className="text-xs text-amber-600 font-medium">کد معرف از لینک شما تشخیص داده شد ✓</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-500" />
                توضیحات (اختیاری)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all text-sm resize-none bg-white"
                placeholder="سؤال یا توضیحات اضافی..."
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-l from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl py-6 text-base font-bold shadow-lg shadow-amber-200/60 hover:shadow-xl hover:shadow-amber-300/60 disabled:opacity-60 transition-all hover:scale-[1.02]"
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
