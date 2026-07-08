"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { Brain, Timer, BarChart3, Gamepad2, Headphones, MonitorSmartphone, ArrowLeft, Sparkles } from "lucide-react";

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

const tools = [
  { icon: Timer, title: "تایمر تمرین هوشمند", description: "تایمر قابل تنظیم برای تمرین‌های روزانه با قابلیت تنظیم فاصله استراحت و نمایش آمار عملکرد هر جلسه تمرین به‌صورت نموداری و بصری.", color: "#2F80ED", bgColor: "bg-blue-500/10" },
  { icon: Brain, title: "آزمون‌های تطبیقی", description: "مجموعه‌ای از آزمون‌های محاسباتی با سطح‌بندی خودکار. هوش مصنوعی سوالات را بر اساس عملکرد شما تطبیق می‌دهد و نقطه بهینه چالش را پیدا می‌کند.", color: "#8B5CF6", bgColor: "bg-purple-500/10", ai: true },
  { icon: BarChart3, title: "داشبورد پیشرفت", description: "نمودارهای دقیق از پیشرفت شما در طول زمان. رصد سرعت، دقت و نقاط قوت و ضعف به صورت بصری و جذاب با قابلیت مقایسه با میانگین هم‌سن‌ها.", color: "#6366F1", bgColor: "bg-indigo-500/10" },
  { icon: Gamepad2, title: "بازی‌های آموزشی", description: "گیمیفیکیشن فرآیند یادگیری با بازی‌های جذاب. کسب امتیاز، باز کردن مراحل جدید، رقابت با دوستان و جمع‌آوری نشان‌های افتخار.", color: "#F2994A", bgColor: "bg-orange-500/10" },
  { icon: Headphones, title: "تمرین شنیداری", description: "تمرین محاسبات با روش شنیداری مشابه مسابقات واقعی. اعداد به صورت صوتی پخش و پاسخ ثبت می‌شود. مناسب برای تمرین مسابقات.", color: "#A855F7", bgColor: "bg-fuchsia-500/10" },
  { icon: MonitorSmartphone, title: "اپلیکیشن موبایل", description: "تمرین در هر زمان و مکان با اپلیکیشن اختصاصی. همگام‌سازی خودکار پیشرفت بین تمام دستگاه‌ها و اعلان‌های یادآوری تمرین.", color: "#2F80ED", bgColor: "bg-sky-500/10" },
];

export default function PracticeTools() {
  return (
    <section className="section-creative relative overflow-hidden py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -top-24 right-[5%] h-[400px] w-[400px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-24 left-[10%] h-[350px] w-[350px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #2F80ED 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "radial-gradient(circle, #102A43 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <div className="animate-float pointer-events-none absolute top-20 left-[12%] h-4 w-4 rounded-full bg-[#8B5CF6]/25" />
      <div className="animate-float-slow pointer-events-none absolute top-36 right-[8%] h-5 w-5 rounded-lg bg-[#2F80ED]/20 rotate-12" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <RevealOnScroll className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">
            <Sparkles className="w-4 h-4" />
            ابزارهای هوشمند
          </span>
          <h2 className="section-heading">تمرین هوشمند، پیشرفت سریع‌تر</h2>
          <p className="section-subheading mx-auto max-w-2xl">ابزارهای دیجیتال متنوع برای تمرین روزانه و پیگیری پیشرفت. یادگیری چرتکه هرگز این‌قدر جذاب نبوده است.</p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <RevealOnScroll key={index} delay={index * 80}>
                <div className="premium-card group relative overflow-hidden p-7 h-full">
                  {/* Hover gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `linear-gradient(135deg, ${tool.color}08 0%, transparent 60%)` }} />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tool.bgColor} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                        <Icon size={26} style={{ color: tool.color }} />
                      </div>
                      {tool.ai && (
                        <span className="flex items-center gap-1 text-[10px] font-bold bg-[#8B5CF6]/[0.08] text-[#8B5CF6] rounded-full px-2.5 py-0.5 border border-[#8B5CF6]/[0.12]">
                          <Sparkles size={10} />
                          هوش مصنوعی
                        </span>
                      )}
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-[#102A43]">{tool.title}</h3>
                    <p className="mb-5 text-sm leading-7 text-[#718096]">{tool.description}</p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ color: tool.color, transform: "translateX(-8px)" }}>
                      <span>کشف کنید</span>
                      <ArrowLeft size={14} />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll className="mt-12 sm:mt-14 flex flex-col items-center text-center" delay={200}>
          <p className="mb-4 text-sm text-[#718096]">و تمامی این ابزارها به‌صورت رایگان در اختیار دانش‌آموزان ما قرار دارد</p>
          <a href="#register" className="btn-purple">شروع تمرین رایگان</a>
        </RevealOnScroll>
      </div>
    </section>
  );
}