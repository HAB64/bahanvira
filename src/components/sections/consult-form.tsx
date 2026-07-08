"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { User, Phone, Calendar, MessageSquare, Sparkles, Check } from "lucide-react";

function RevealOnScroll({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${className}`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const ageOptions = ["۴ سال", "۵ سال", "۶ سال", "۷ سال", "۸ سال", "۹ سال", "۱۰ سال", "۱۱ سال", "۱۲ سال", "بزرگ‌تر از ۱۲ سال"];

const benefits = ["مشاوره رایگان", "بدون تعهد", "پاسخگویی زیر ۲۴ ساعت", "ارزیابی سطح رایگان"];

export default function ConsultForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", age: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSubmitted(true);
    }
  };

  return (
    <section id="register" className="section-consult bg-dots relative overflow-hidden py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -top-20 right-[20%] h-[350px] w-[350px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #2F80ED 0%, transparent 70%)" }} />
      <div className="animate-float-slow pointer-events-none absolute bottom-20 left-[10%] h-5 w-5 rounded-lg bg-[#27AE60]/15 rotate-12" />

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        <RevealOnScroll className="mb-10 sm:mb-12 text-center">
          <span className="section-badge">
            <Sparkles className="w-4 h-4" />
            ثبت‌نام و مشاوره
          </span>
          <h2 className="section-heading">مشاوره رایگان</h2>
          <p className="section-subheading mx-auto max-w-xl">فرم زیر را پر کنید، کارشناسان ما در کمترین زمان ممکن با شما تماس می‌گیرند.</p>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
            {/* Decorative corner glow */}
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #2F80ED 0%, transparent 70%)" }} />

            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-[#27AE60]/10 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-[#27AE60]" />
                </div>
                <h3 className="text-xl font-bold text-[#102A43] mb-2">درخواست شما ثبت شد!</h3>
                <p className="text-sm text-[#718096] mb-6">کارشناسان ویرا در کمتر از ۲۴ ساعت با شما تماس خواهند گرفت.</p>
                <button onClick={() => { setSubmitted(false); setFormData({ name: "", phone: "", age: "", message: "" }); }} className="btn-ghost text-sm">
                  ثبت درخواست جدید
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative">
                <div className="relative">
                  <User className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0AEC0] pointer-events-none" />
                  <input type="text" placeholder="نام و نام خانوادگی" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-dark pr-10" required />
                </div>
                <div className="relative">
                  <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0AEC0] pointer-events-none" />
                  <input type="tel" placeholder="شماره تماس" dir="ltr" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="input-dark pr-10 text-left" required />
                </div>
                <div className="relative">
                  <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0AEC0] pointer-events-none" />
                  <select value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="input-dark pr-10 appearance-none cursor-pointer">
                    <option value="" disabled>سن فرزند</option>
                    {ageOptions.map((age) => (
                      <option key={age} value={age} className="bg-white text-[#2D3748]">{age}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <MessageSquare className="absolute right-3.5 top-3.5 h-4 w-4 text-[#A0AEC0] pointer-events-none" />
                  <textarea placeholder="پیام اختیاری..." rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="input-dark pr-10 resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full py-4 text-base rounded-2xl group relative overflow-hidden">
                  <div className="absolute inset-0 animate-shimmer opacity-20" />
                  <span className="relative z-10">دریافت مشاوره رایگان</span>
                </button>
                <div className="flex flex-wrap justify-center gap-3">
                  {benefits.map((b) => (
                    <span key={b} className="text-[11px] font-medium text-[#A0AEC0] flex items-center gap-1">
                      <Check size={11} className="text-[#27AE60]" />
                      {b}
                    </span>
                  ))}
                </div>
              </form>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}