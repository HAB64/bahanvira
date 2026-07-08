"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

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

const faqs = [
  { q: "چه سنی برای شروع آموزش چرتکه مناسب است؟", a: "بهترین سن شروع آموزش چرتکه ۵ تا ۱۲ سالگی است. در این سنین، مغز کودک بیشترین قابلیت انعطاف‌پذیری و یادگیری را دارد و تأثیر آموزش چرتکه بر رشد شناختی به حداکثر می‌رسد. البته بزرگسالان نیز می‌توانند در دوره‌های مربی‌گری شرکت کنند.", category: "عام" },
  { q: "آیا چرتکه باعث بهبود نمرات مدرسه می‌شود؟", a: "بله، تحقیقات علمی متعدد نشان داده‌اند که آموزش چرتکه به‌طور مستقیم بر عملکرد ریاضی و حتی دروس دیگر مانند علوم و حل مسئله تأثیر مثبت و قابل اندازه‌گیری دارد. والدین دانش‌آموزان ما به‌طور متوسط ۲۰٪ بهبود در نمرات گزارش کرده‌اند.", category: "نتایج" },
  { q: "طول هر دوره آموزشی چقدر است؟", a: "هر سطح معمولاً ۳ ماه طول می‌کشد و شامل ۱۲ جلسه ۹۰ دقیقه‌ای است. جلسات هفته‌ای دو بار برگزار می‌شوند و در پایان هر سطح آزمون ارزیابی برگزار می‌گردد. مجموع دوره کامل ۱۸ ماه تا ۲ سال است.", category: "دوره‌ها" },
  { q: "آیا کلاس‌های آنلاین هم دارید؟", a: "بله، ما کلاس‌های حضوری و آنلاین ارائه می‌دهیم. کلاس‌های آنلاین با همان کیفیت و ساختار کلاس‌های حضوری و با امکانات تعاملی کامل برگزار می‌شوند. پلتفرم آنلاین ما شامل تخته سفید تعاملی، تمرین زنده و آزمون‌های آنی است.", category: "دوره‌ها" },
  { q: "گواهینامه پایان دوره معتبر است؟", a: "بله، گواهینامه‌های صادر شده توسط آموزشگاه ویرا دارای اعتبار رسمی از سازمان‌های مرتبط و قابل استناد در مدارس و مراکز آموزشی است. همچنین گواهینامه‌های بین‌المللی برای سطوح پیشرفته صادر می‌شود.", category: "گواهینامه" },
  { q: "هزینه دوره‌ها چقدر است؟", a: "هزینه دوره‌ها بسته به سطح و نوع دوره متفاوت است. برای اطلاع از قیمت‌ها و شرایط ویژه تخفیف با شماره ۰۲۱-۹۱۳۰۲۵۸۴ تماس بگیرید یا فرم مشاوره رایگان را پر کنید. اولین جلسه ارزیابی کاملاً رایگان است.", category: "هزینه" },
  { q: "آیا امکان شرکت در مسابقات وجود دارد؟", a: "بله، دانش‌آموزان ویرا هر ساله در مسابقات منطقه‌ای، ملی و بین‌المللی شرکت می‌کنند و تاکنون بیش از ۴۵ رتبه برتر کشوری کسب کرده‌اند. ما تیم‌های مسابقاتی ویژه‌ای داریم که زیر نظر بهترین مربیان تمرین می‌کنند.", category: "مسابقات" },
  { q: "تفاوت چرتکه دهگانی با چرتکه معمولی چیست؟", a: "چرتکه دهگانی یک مهره بالایی دارد که برای نمایش اعداد ۰ تا ۹ در هر ستون استفاده می‌شود. این ویژگی محاسبات را ساده‌تر، سریع‌تر و دقیق‌تر می‌کند. روش دهگانی استاندارد جهانی است و در بیشتر کشورهای پیشرفته آموزش داده می‌شود.", category: "عام" },
];

const categories = ["همه", "عام", "نتایج", "دوره‌ها", "هزینه", "مسابقات", "گواهینامه"];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("همه");

  const filteredFaqs = activeCategory === "همه" ? faqs : faqs.filter((f) => f.category === activeCategory);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -bottom-20 right-[15%] h-[300px] w-[300px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #F2994A 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "radial-gradient(circle, #102A43 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <RevealOnScroll className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">
            <HelpCircle className="w-4 h-4" />
            سوالات متداول
          </span>
          <h2 className="section-heading">پاسخ سوالات شما</h2>
          <p className="section-subheading mx-auto max-w-2xl">پاسخ رایج‌ترین سوالات درباره آموزش چرتکه و دوره‌های آموزشگاه ویرا</p>
        </RevealOnScroll>

        {/* Category filters */}
        <RevealOnScroll className="mb-8 flex flex-wrap justify-center gap-2" delay={100}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setOpenIndex(null); }} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${activeCategory === cat ? "bg-[#2F80ED] text-white shadow-md shadow-[#2F80ED]/20" : "bg-[#F4F7FA] text-[#718096] hover:bg-[#2F80ED]/10 hover:text-[#2F80ED]"}`}>
              {cat}
            </button>
          ))}
        </RevealOnScroll>

        <div className="space-y-3">
          {filteredFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <RevealOnScroll key={faq.q} delay={i * 60}>
                <div className={`premium-card-static overflow-hidden transition-all duration-300 ${isOpen ? "shadow-lg ring-1 ring-[#2F80ED]/10" : ""}`}>
                  <button onClick={() => toggle(i)} className="flex w-full items-center justify-between gap-3 p-5 text-right">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2F80ED]/[0.06] text-xs font-bold text-[#2F80ED]">{i + 1}</span>
                      <span className={`text-sm font-bold transition-colors duration-200 ${isOpen ? "text-[#2F80ED]" : "text-[#102A43]"}`}>{faq.q}</span>
                    </div>
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "bg-[#2F80ED]/10 rotate-0" : "bg-[#F4F7FA] rotate-0"}`}>
                      {isOpen ? <ChevronUp className="h-4 w-4 text-[#2F80ED]" /> : <ChevronDown className="h-4 w-4 text-[#A0AEC0]" />}
                    </div>
                  </button>
                  <div className="overflow-hidden transition-all duration-400 ease-in-out" style={{ maxHeight: isOpen ? "400px" : "0px", opacity: isOpen ? 1 : 0 }}>
                    <p className="px-5 pb-5 pr-15 text-sm leading-7 text-[#718096]">{faq.a}</p>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}