"use client";

import { User, Phone, Calendar, MessageSquare } from "lucide-react";

const ageOptions = ["۴ سال", "۵ سال", "۶ سال", "۷ سال", "۸ سال", "۹ سال", "۱۰ سال", "۱۱ سال", "۱۲ سال", "بزرگ‌تر از ۱۲ سال"];

export default function ConsultForm() {
  return (
    <section id="register" className="section-cool relative overflow-hidden py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -top-20 right-[20%] h-[350px] w-[350px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #2F80ED 0%, transparent 70%)" }} />
      <div className="animate-float-slow pointer-events-none absolute bottom-20 left-[10%] h-5 w-5 rounded-lg bg-[#27AE60]/15 rotate-12" />

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-10 sm:mb-12 text-center">
          <span className="section-badge">ثبت‌نام و مشاوره</span>
          <h2 className="section-heading">مشاوره رایگان</h2>
          <p className="section-subheading mx-auto max-w-xl">فرم زیر را پر کنید، کارشناسان ما در کمترین زمان ممکن با شما تماس می‌گیرند.</p>
        </div>

        <div className="glass-card p-6 sm:p-8">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <User className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0AEC0] pointer-events-none" />
              <input type="text" placeholder="نام و نام خانوادگی" className="input-dark pr-10" />
            </div>
            <div className="relative">
              <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0AEC0] pointer-events-none" />
              <input type="tel" placeholder="شماره تماس" dir="ltr" className="input-dark pr-10 text-left" />
            </div>
            <div className="relative">
              <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0AEC0] pointer-events-none" />
              <select className="input-dark pr-10 appearance-none cursor-pointer">
                <option value="" disabled selected>سن فرزند</option>
                {ageOptions.map((age) => (
                  <option key={age} value={age} className="bg-white text-[#2D3748]">{age}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <MessageSquare className="absolute right-3.5 top-3.5 h-4 w-4 text-[#A0AEC0] pointer-events-none" />
              <textarea placeholder="پیام اختیاری..." rows={3} className="input-dark pr-10 resize-none" />
            </div>
            <button type="submit" className="btn-primary w-full py-4 text-base rounded-2xl">
              دریافت مشاوره رایگان
            </button>
            <p className="text-center text-xs text-[#A0AEC0]">بدون هزینه، بدون تعهد. پاسخگویی زیر ۲۴ ساعت.</p>
          </form>
        </div>
      </div>
    </section>
  );
}