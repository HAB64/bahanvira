"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { Brain, Target, Calculator, Sparkles, Puzzle, GraduationCap } from "lucide-react";

/* ── Scroll Reveal Wrapper ─────────────────────────── */
function RevealOnScroll({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const benefits = [
  { icon: Brain, title: "توسعه هوش ریاضی", description: "تمرین مداوم چرتکه باعث تقویت بخش‌های مختلف مغز و افزایش توانایی محاسبات ذهنی می‌شود. تحقیقات علمی نشان داده‌اند که کودکانی که چرتکه تمرین می‌کنند، در آزمون‌های هوش ریاضی تا ۳۰ درصد بهتر عمل می‌کنند و این مهارت به‌صورت ماندگار در حافظه بلندمدت آن‌ها ثبت می‌شود و بستری محکم برای موفقیت تحصیلی فراهم می‌کند.", color: "#2F80ED", bgColor: "bg-blue-500/10" },
  { icon: Target, title: "تمرکز و دقت بالا", description: "حرکت مهره‌ها بر روی چرتکه نیازمند تمرکز دقیق و مداوم است و این مهارت به تمام بخش‌های زندگی روزمره و تحصیلی منتقل می‌شود. والدین گزارش داده‌اند که پس از تنها ۳ ماه آموزش چرتکه، تمرکز فرزندانشان در انجام تکالیف مدرسه به‌طور محسوسی بهبود یافته و مدت زمان انجام تکالیف کاهش چشمگیری داشته است.", color: "#27AE60", bgColor: "bg-emerald-500/10" },
  { icon: Calculator, title: "سرعت محاسبه ذهنی", description: "دانش‌آموزان پس از آموزش چرتکه قادر به انجام چهار عمل اصلی ریاضی با سرعت خیره‌کننده و بدون نیاز به ماشین حساب هستند. در مسابقات بین‌المللی، دانش‌آموزان آموزشگاه ویرا توانسته‌اند در کمتر از ۳ ثانیه محاسبات چندرقمی پیچیده را به‌صورت ذهنی انجام دهند.", color: "#F2994A", bgColor: "bg-orange-500/10" },
  { icon: Sparkles, title: "خلاقیت و تصویرسازی ذهنی", description: "تصویرسازی چرتکه در ذهن باعث فعال‌سازی همزمان هر دو نیمکره مغز و تقویت خلاقیت و قدرت تجسم می‌شود. این روش منحصربه‌فرد، مهارت‌های فضایی و بصری کودکان را به‌طور همزمان تقویت می‌کند و تأثیر مستقیمی بر درک هندسه و مفاهیم انتزاعی در ریاضیات و علوم دارد.", color: "#8B5CF6", bgColor: "bg-purple-500/10" },
  { icon: Puzzle, title: "حل مسئله و استدلال", description: "روش‌های متنوع محاسبه ذهنی مهارت حل مسئله و تفکر منطقی و تحلیلی کودکان را به شکل چشمگیری تقویت می‌کند. دانش‌آموزان یاد می‌گیرند که یک مسأله ریاضی را از زوایای مختلف بررسی کنند و بهترین راه‌حل را در کمترین زمان پیدا کنند.", color: "#FFD54F", bgColor: "bg-amber-400/10" },
  { icon: GraduationCap, title: "اعتماد به نفس تحصیلی", description: "موفقیت در مسابقات و آزمون‌های چرتکه اعتماد به نفس دانش‌آموز را در تمامی دروس مدرسه به طرز معناداری افزایش می‌دهد. تجربه کسب مقام‌های برتر و دریافت مدال‌ها، حس موفقیت و توانمندی را در کودکان نهادینه می‌کند و این اعتماد به نفس به سایر حوزه‌های زندگی نیز سرایت می‌کند.", color: "#14B8A6", bgColor: "bg-teal-500/10" },
];

export default function Benefits() {
  return (
    <section className="section-benefits bg-noise relative overflow-hidden py-20 sm:py-24" dir="rtl">
      {/* Background layers */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #2F80ED 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[450px] w-[450px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #27AE60 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "radial-gradient(circle, #102A43 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* Floating decorative shapes */}
      <div className="animate-float pointer-events-none absolute top-16 right-[10%] h-4 w-4 rounded-full bg-[#2F80ED]/20" />
      <div className="animate-float-slow pointer-events-none absolute top-32 left-[15%] h-6 w-6 rounded-lg bg-[#27AE60]/15 rotate-45" />
      <div className="animate-float-reverse pointer-events-none absolute bottom-24 right-[20%] h-5 w-5 rounded-full bg-[#F2994A]/20" />
      <div className="animate-bounce-soft pointer-events-none absolute bottom-32 left-[25%] h-3 w-8 rounded-full bg-[#8B5CF6]/15" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <RevealOnScroll className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">مزایای آموزش چرتکه</span>
          <h2 className="section-heading">چرا چرتکه دهگانی ویرا؟</h2>
          <p className="section-subheading mx-auto max-w-2xl">
            آموزش چرتکه نه تنها مهارت‌های ریاضی را ارتقا می‌دهد، بلکه روی تمام ابعاد رشد ذهنی و شخصیتی کودکان تأثیر مثبت و عمیق می‌گذارد.
          </p>
        </RevealOnScroll>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <RevealOnScroll key={index} delay={index * 80}>
                <div className="premium-card group relative p-7 sm:p-8 h-full">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(ellipse at 30% 20%, ${benefit.color}06 0%, transparent 70%)` }} />

                  <div className="relative">
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${benefit.bgColor} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon size={28} style={{ color: benefit.color }} />
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-[#102A43]">{benefit.title}</h3>
                    <p className="text-sm leading-7 text-[#718096]">{benefit.description}</p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 right-0 left-0 h-1 origin-right scale-x-0 rounded-b-2xl transition-transform duration-500 group-hover:scale-x-100" style={{ background: `linear-gradient(90deg, ${benefit.color}, ${benefit.color}80)` }} />
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}