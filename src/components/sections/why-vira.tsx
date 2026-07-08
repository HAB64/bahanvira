"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { CheckCircle2, Sparkles, Flame, Trophy, Users, MapPin } from "lucide-react";

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

const advantages = [
  { title: "روش آموزشی منحصر به فرد", desc: "ترکیب چرتکه فیزیکی و تمرینات دیجیتال برای بهترین نتیجه", color: "#2F80ED" },
  { title: "مربیان دارای گواهینامه بین‌المللی", desc: "تمام مربیان ما گواهینامه معتبر بین‌المللی دارند", color: "#27AE60" },
  { title: "کلاس‌های حضوری و آنلاین", desc: "انعطاف‌پذیری کامل در نحوه حضور و زمان‌بندی کلاس‌ها", color: "#F2994A" },
  { title: "گزارش پیشرفت هفتگی", desc: "والدین همیشه از وضعیت فرزندشان مطلع هستند", color: "#8B5CF6" },
  { title: "آزمون‌های دوره‌ای استاندارد", desc: "سنجش مستمر و دقیق پیشرفت دانش‌آموزان", color: "#14B8A6" },
  { title: "گیمیفیکیشن و مسابقات داخلی", desc: "ایجاد انگیزه از طریق رقابت سالم و جوایز ویژه", color: "#FFD54F" },
];

const gamificationBadges = [
  { icon: Flame, label: "۳۰ روز متوالی تمرین", color: "#F2994A" },
  { icon: Trophy, label: "۱۰ مدال طلای مسابقات", color: "#27AE60" },
  { icon: Sparkles, label: "۲۰۰۰+ XP کسب‌شده", color: "#8B5CF6" },
  { icon: Users, label: "۵۰۰+ فعال هر ماه", color: "#2F80ED" },
];

export default function WhyVira() {
  return (
    <section id="why-vira" className="relative overflow-hidden bg-white py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -top-20 left-[20%] h-[350px] w-[350px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #2F80ED 0%, transparent 70%)" }} />
      <div className="animate-float-slow pointer-events-none absolute top-24 right-[8%] h-5 w-5 rounded-lg bg-[#27AE60]/15 rotate-12" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "radial-gradient(circle, #102A43 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <RevealOnScroll className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">
            <Sparkles className="w-4 h-4" />
            مزایای ویرا
          </span>
          <h2 className="section-heading">چرا ویرا متفاوت است؟</h2>
          <p className="section-subheading mx-auto max-w-2xl">تفاوت ما با سایر آموزشگاه‌ها در کیفیت، روش و نتایج است</p>
        </RevealOnScroll>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 items-start">
          <div className="space-y-4">
            {advantages.map((item, index) => (
              <RevealOnScroll key={item.title} delay={index * 60}>
                <div className="premium-card-static group flex items-start gap-4 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${item.color}12` }}>
                    <CheckCircle2 size={20} style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#102A43]">{item.title}</h3>
                    <p className="mt-1 text-xs leading-6 text-[#718096]">{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={300}>
            <div className="glass-card p-8 flex flex-col items-center relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #2F80ED 0%, transparent 70%)" }} />
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #27AE60 0%, transparent 70%)" }} />

              {/* Gamification badges showcase */}
              <div className="relative w-full mb-6">
                <h4 className="text-center text-sm font-bold text-[#102A43] mb-4">گیمیفیکیشن و انگیزش</h4>
                <div className="grid grid-cols-2 gap-3">
                  {gamificationBadges.map((badge) => (
                    <div key={badge.label} className="rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105" style={{ backgroundColor: `${badge.color}06`, border: `1px solid ${badge.color}12` }}>
                      <badge.icon size={22} className="mx-auto mb-2" style={{ color: badge.color }} />
                      <p className="text-[11px] font-medium text-[#2D3748] leading-5">{badge.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap justify-center gap-3 relative">
                {[
                  { num: "+۵۰۰", label: "دانش‌آموز", color: "#F2994A" },
                  { num: "+۳۰", label: "نمایندگی", color: "#27AE60" },
                  { num: "+۲۰", label: "شهر", color: "#8B5CF6" },
                ].map((badge) => (
                  <div key={badge.label} className="rounded-2xl px-5 py-3 text-center" style={{ backgroundColor: `${badge.color}08`, border: `1px solid ${badge.color}15` }}>
                    <div className="text-base font-extrabold" style={{ color: badge.color }}>{badge.num}</div>
                    <div className="text-[11px] text-[#718096]">{badge.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}