"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { Building2, UserPlus, Handshake, ArrowLeft, Sparkles } from "lucide-react";

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

const cards = [
  { icon: Building2, title: "همکاری آموزشگاهی", desc: "آموزشگاه‌های سراسر کشور می‌توانند نماینده رسمی ویرا شوند و از مزایای ویژه آموزشی و تجاری بهره‌مند گردند. شامل پشتیبانی کامل، آموزش برندینگ و بازاریابی.", button: "درخواست همکاری", color: "#2F80ED", bgColor: "bg-blue-500/10" },
  { icon: UserPlus, title: "استخدام مربی", desc: "اگر مربی چرتکه با تجربه هستید و به دنبال محیط حرفه‌ای می‌گردید، به تیم ما بپیوندید. حقوق عالی، بیمه و فرصت رشد شغلی.", button: "ارسال رزومه", color: "#27AE60", bgColor: "bg-emerald-500/10" },
  { icon: Handshake, title: "فرانشیز", desc: "راه‌اندازی شعبه آموزشگاه چرتکه ویرا در شهر شما با پشتیبانی کامل، آموزش جامع و ROI تضمین‌شده.", button: "اطلاعات بیشتر", color: "#8B5CF6", bgColor: "bg-purple-500/10" },
];

export default function Cooperation() {
  return (
    <section id="cooperation" className="section-cooperation bg-noise relative overflow-hidden py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -top-20 left-[10%] h-[400px] w-[400px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }} />
      <div className="animate-float pointer-events-none absolute top-24 right-[15%] h-4 w-4 rounded-full bg-[#2F80ED]/20" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "radial-gradient(circle, #102A43 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <RevealOnScroll className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">
            <Sparkles className="w-4 h-4" />
            فرصت‌های همکاری
          </span>
          <h2 className="section-heading">همکاری با ویرا</h2>
          <p className="section-subheading mx-auto max-w-2xl">فرصت‌های جذاب همکاری برای آموزشگاه‌ها، مربیان و کارآفرینان علاقه‌مند</p>
        </RevealOnScroll>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <RevealOnScroll key={card.title} delay={index * 100}>
                <div className="premium-card group p-7 sm:p-8 flex flex-col items-center text-center h-full">
                  <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${card.bgColor} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon size={28} style={{ color: card.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-[#102A43]">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-[#718096]">{card.desc}</p>
                  <button className="btn-ghost mt-6 text-sm" style={{ borderColor: `${card.color}30`, color: card.color }}>
                    {card.button}
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}