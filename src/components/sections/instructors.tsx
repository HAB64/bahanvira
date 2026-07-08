"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { Award, BookOpen, Star, Quote } from "lucide-react";

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

const instructors = [
  { name: "استاد فاطمه محمدی", role: "مدیر آموزشگاه و سرمربی", exp: "۱۵ سال سابقه", bio: "فارغ‌التحصیل کارشناسی ارشد ریاضی و دارای گواهینامه بین‌المللی مربی‌گری چرتکه از ژاپن. بیش از ۵۰۰ دانش‌آموز را تربیت کرده و تیم‌های ویرا را به رتبه‌های برتر کشوری رسانده است.", initials: "ف.م", color: "#F2994A", bgColor: "bg-orange-500/10", achievements: ["مدال طلای بین‌المللی", "مربی تیم ملی"] },
  { name: "استاد علی حسینی", role: "مربی پیشرفته و مسابقات", exp: "۱۰ سال سابقه", bio: "قهرمان مسابقات ملی چرتکه و مربی تیم ملی. تخصص در آمادگی دانش‌آموزان برای مسابقات بین‌المللی با بیش از ۳۰ مدال طلای کشوری.", initials: "ا.ح", color: "#27AE60", bgColor: "bg-emerald-500/10", achievements: ["قهرمان ملی", "۳۰+ مدال طلای دانش‌آموزان"] },
  { name: "استاد مریم رضایی", role: "مربی مبتدی و کودک", exp: "۸ سال سابقه", bio: "متخصص آموزش چرتکه به کودکان سنین ۵ تا ۱۰ سال با روش‌های بازی‌محور و خلاقانه. نرخ رضایت والدین دانش‌آموزان ایشان ۹۹ درصد است.", initials: "م.ر", color: "#8B5CF6", bgColor: "bg-purple-500/10", achievements: ["متخصص آموزش کودک", "رضایت ۹۹٪"] },
];

export default function Instructors() {
  return (
    <section className="section-instructors bg-noise relative overflow-hidden py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -top-24 left-[15%] h-[400px] w-[400px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-24 right-[15%] h-[350px] w-[350px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #2F80ED 0%, transparent 70%)" }} />
      <div className="animate-float pointer-events-none absolute top-20 right-[12%] h-4 w-4 rounded-full bg-[#8B5CF6]/20" />
      <div className="animate-float-slow pointer-events-none absolute bottom-28 left-[8%] h-5 w-5 rounded-lg bg-[#2F80ED]/15 rotate-45" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "radial-gradient(circle, #102A43 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <RevealOnScroll className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">تیم آموزشی</span>
          <h2 className="section-heading">مربیان مجرب ما</h2>
          <p className="section-subheading mx-auto max-w-2xl">با بهترین مربیان چرتکه کشور، فرزندتان بهترین آموزش حرفه‌ای را دریافت می‌کند.</p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {instructors.map((inst, index) => (
            <RevealOnScroll key={inst.name} delay={index * 120}>
              <div className="premium-card group p-7 sm:p-8 flex flex-col items-center text-center h-full">
                {/* Avatar with ring */}
                <div className="relative mb-5">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-full ${inst.bgColor} transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg`} style={{ boxShadow: `0 0 0 4px white, 0 0 0 6px ${inst.color}20` }}>
                    <span className="text-2xl font-bold" style={{ color: inst.color }}>{inst.initials}</span>
                  </div>
                  <div className="absolute -bottom-1 -left-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md border border-[#E8EDF3]">
                    <Award size={14} style={{ color: inst.color }} />
                  </div>
                </div>

                <h3 className="mb-1 text-lg font-bold text-[#102A43]">{inst.name}</h3>
                <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-1" style={{ backgroundColor: `${inst.color}12`, color: inst.color, border: `1px solid ${inst.color}15` }}>{inst.role}</span>
                <div className="flex items-center gap-1.5 text-xs text-[#718096] mb-4">
                  <BookOpen size={13} />
                  {inst.exp}
                </div>
                <p className="text-sm leading-7 text-[#718096] flex-1">{inst.bio}</p>

                {/* Achievement tags */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {inst.achievements.map((a) => (
                    <span key={a} className="text-[11px] font-medium text-[#718096] bg-[#F4F7FA] rounded-full px-3 py-1">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}