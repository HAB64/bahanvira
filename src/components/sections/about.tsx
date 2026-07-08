"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { Check, Trophy, Users, GraduationCap, Medal, Sparkles, Star, Quote } from "lucide-react";

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

const features = [
  "دارای مجوز رسمی از سازمان آموزش و پرورش",
  "عضو انجمن چرتکه ایران",
  "دارای گواهینامه بین‌المللی ISO 9001",
];

const stats = [
  { icon: GraduationCap, value: "۵۰۰+", label: "فارغ‌التحصیل", color: "#F2994A", bgColor: "bg-orange-500/10" },
  { icon: Trophy, value: "۴۵+", label: "رتبه برتر", color: "#27AE60", bgColor: "bg-emerald-500/10" },
  { icon: Users, value: "۳", label: "شعبه فعال", color: "#8B5CF6", bgColor: "bg-purple-500/10" },
  { icon: Medal, value: "۱۰+", label: "سال تجربه", color: "#2F80ED", bgColor: "bg-blue-500/10" },
];

const testimonials = [
  { text: "پسرم بعد از ۶ ماه آموزش چرتکه، نمرات ریاضی‌اش از ۱۴ به ۱۹ رسید. تمرکزش در تمام دروس به‌طرز شگفت‌انگیزی بهبود پیدا کرد. واقعاً ممنونیم از تیم ویرا و روش آموزشی عالیشان.", name: "مادر سارا", role: "دانش‌آموز سطح ۳", rating: 5, initial: "س", color: "#F2994A", bgColor: "bg-orange-500/10" },
  { text: "روش آموزش مربیان ویرا بسیار جذاب و کودک‌پسند است. دخترم با اشتیاق هر هفته به کلاس می‌رود. حتی در تعطیلات هم خودش تمرین می‌کند و پیشرفتش قابل توجه است.", name: "پدر امیرعلی", role: "دانش‌آموز سطح ۵", rating: 5, initial: "ا", color: "#27AE60", bgColor: "bg-emerald-500/10" },
  { text: "حساب ذهنی فرزندم به قدری تقویت شده که دیگر هیچ مشکلی با ریاضی مدرسه ندارد و حتی در مسابقات هم شرکت می‌کند. بهترین سرمایه‌گذاری برای آینده فرزندمان بود.", name: "مادر نیکان", role: "دانش‌آموز سطح ۷", rating: 5, initial: "ن", color: "#8B5CF6", bgColor: "bg-purple-500/10" },
];

export default function About() {
  return (
    <section className="section-growth relative overflow-hidden py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -top-20 right-[5%] h-[350px] w-[350px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #27AE60 0%, transparent 70%)" }} />
      <div className="animate-float pointer-events-none absolute top-16 left-[10%] h-4 w-4 rounded-full bg-[#27AE60]/20" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "radial-gradient(circle, #102A43 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* About Section */}
        <RevealOnScroll className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">درباره ما</span>
          <h2 className="section-heading">درباره چرتکه دهگانی ویرا</h2>
          <p className="section-subheading mx-auto max-w-2xl">بیش از یک دهه تجربه در آموزش چرتکه و حساب ذهنی با رویکردی نوین و حرفه‌ای</p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#27AE60]/10">
                <Sparkles size={24} className="text-[#27AE60]" />
              </div>
              <h3 className="text-xl font-bold text-[#102A43]">چرتکه دهگانی ویرا</h3>
            </div>
            <p className="text-sm sm:text-base text-[#718096] leading-8 mb-6">
              آموزشگاه چرتکه دهگانی ویرا از سال ۱۳۹۳ فعالیت خود را در زمینه آموزش چرتکه و حساب ذهنی آغاز کرده است. ما با بهره‌گیری از جدیدترین متدهای آموزشی و تیمی از مربیان مجرب بین‌المللی، توانسته‌ایم هزاران دانش‌آموز را در مسیر پیشرفت تحصیلی قرار دهیم و به یکی از معتبرترین مراکز آموزش چرتکه در ایران تبدیل شویم.
            </p>
            <p className="text-sm sm:text-base text-[#718096] leading-8 mb-8">
              رویکرد ما ترکیب روش‌های سنتی چرتکه با فناوری‌های نوین آموزشی است. هر دانش‌آموز مسیر یادگیری اختصاصی خود را طی می‌کند و پیشرفت آن‌ها به‌صورت مستمر توسط هوش مصنوعی پلتفرم و مربیان مجرب رصد می‌شود.
            </p>
            <ul className="space-y-4">
              {features.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#27AE60]/10">
                    <Check size={14} className="text-[#27AE60]" />
                  </div>
                  <span className="text-sm text-[#2D3748] leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="glass-card p-6 sm:p-8">
              <h3 className="mb-6 text-center text-lg font-bold text-[#102A43]">ویرا در یک نگاه</h3>
              <div className="mb-6 grid grid-cols-2 gap-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className={`rounded-2xl p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-md ${stat.bgColor}`}>
                      <Icon size={24} className="mx-auto mb-2" style={{ color: stat.color }} />
                      <div className="mb-1 text-2xl sm:text-3xl font-extrabold text-[#102A43]">{stat.value}</div>
                      <div className="text-xs font-medium text-[#718096]">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
              <div className="rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg, rgba(47,128,237,0.06) 0%, rgba(39,174,96,0.06) 100%)", border: "1px solid rgba(47,128,237,0.1)" }}>
                <p className="text-sm leading-7 text-[#2D3748]">
                  <span className="font-bold text-[#2F80ED]">آیا می‌دانستید؟</span>{" "}
                  کارآموزان آموزشگاه ویرا تاکنون موفق به کسب بیش از ۴۵ رتبه برتر کشوری در مسابقات چرتکه و محاسبات ذهنی شده‌اند.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Testimonials */}
        <div className="mt-20 sm:mt-24">
          <RevealOnScroll className="mb-12 text-center">
            <span className="section-badge">
              <Star className="w-4 h-4" />
              نظرات والدین
            </span>
            <h2 className="section-heading">صدای واقعی خانواده‌ها</h2>
            <p className="section-subheading mx-auto max-w-2xl">تجربه والدینی که فرزندانشان در مسیر یادگیری چرتکه ویرا قرار گرفته‌اند</p>
          </RevealOnScroll>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, index) => (
              <RevealOnScroll key={t.name} delay={index * 100}>
                <div className="premium-card p-6 sm:p-7 flex flex-col h-full">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote size={20} className="text-[#E8EDF3]" />
                  </div>
                  <p className="flex-1 text-sm leading-8 text-[#2D3748]">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-[#E8EDF3] pt-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${t.bgColor} text-sm font-bold shrink-0`} style={{ color: t.color, boxShadow: `0 0 0 2px ${t.color}15` }}>
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#102A43]">{t.name}</p>
                      <p className="text-xs text-[#718096]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}