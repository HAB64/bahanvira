'use client';

import { User, Phone, Calendar, MessageSquare } from 'lucide-react';

const ageOptions = [
  '۴ سال',
  '۵ سال',
  '۶ سال',
  '۷ سال',
  '۸ سال',
  '۹ سال',
  '۱۰ سال',
  '۱۱ سال',
  '۱۲ سال',
  'بزرگ‌تر از ۱۲ سال',
];

export default function ConsultForm() {
  return (
    <section id="consult-form" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">مشاوره رایگان</h2>
          <p className="text-slate-400 mt-3 leading-relaxed max-w-xl mx-auto">
            فرم زیر را پر کنید، کارشناسان ما در کمترین زمان ممکن با شما تماس می‌گیرند.
          </p>
        </div>

        {/* Form */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 mt-10">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Name */}
            <div className="relative">
              <User className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                className="input-dark pr-10"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
              <input
                type="tel"
                placeholder="شماره تماس"
                dir="ltr"
                className="input-dark pr-10 text-left"
              />
            </div>

            {/* Child age select */}
            <div className="relative">
              <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
              <select className="input-dark pr-10 appearance-none cursor-pointer">
                <option value="" disabled selected>
                  سن فرزند
                </option>
                {ageOptions.map((age) => (
                  <option key={age} value={age} className="bg-[#0f1d32] text-white">
                    {age}
                  </option>
                ))}
              </select>
            </div>

            {/* Optional message */}
            <div className="relative">
              <MessageSquare className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-500 pointer-events-none" />
              <textarea
                placeholder="پیام اختیاری..."
                rows={3}
                className="input-dark pr-10 resize-none"
              />
            </div>

            {/* Submit */}
            <button type="submit" className="btn-primary w-full py-4 text-base">
              دریافت مشاوره رایگان
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}