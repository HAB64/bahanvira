"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { q: "چه سنی برای شروع آموزش چرتکه مناسب است؟", a: "بهترین سن شروع آموزش چرتکه ۵ تا ۱۲ سالگی است. در این سنین، مغز کودک بیشترین قابلیت انعطاف‌پذیری و یادگیری را دارد و تأثیر آموزش چرتکه بر رشد شناختی به حداکثر می‌رسد." },
  { q: "آیا چرتکه باعث بهبود نمرات مدرسه می‌شود؟", a: "بله، تحقیقات علمی متعدد نشان داده‌اند که آموزش چرتکه به‌طور مستقیم بر عملکرد ریاضی و حتی دروس دیگر مانند علوم و حل مسئله تأثیر مثبت و قابل измерی دارد." },
  { q: "طول هر دوره آموزشی چقدر است؟", a: "هر سطح معمولاً ۳ ماه طول می‌کشد و شامل ۱۲ جلسه ۹۰ دقیقه‌ای است. جلسات هفته‌ای دو بار برگزار می‌شوند و در پایان هر سطح آزمون ارزیابی برگزار می‌گردد." },
  { q: "آیا کلاس‌های آنلاین هم دارید؟", a: "بله، ما کلاس‌های حضوری و آنلاین ارائه می‌دهیم. کلاس‌های آنلاین با همان کیفیت و ساختار کلاس‌های حضوری و با امکانات تعاملی کامل برگزار می‌شوند." },
  { q: "گواهینامه پایان دوره معتبر است؟", a: "بله، گواهینامه‌های صادر شده توسط آموزشگاه ویرا دارای اعتبار رسمی از سازمان‌های مرتبط و قابل استناد در مدارس و مراکز آموزشی است." },
  { q: "هزینه دوره‌ها چقدر است؟", a: "هزینه دوره‌ها بسته به سطح و نوع دوره متفاوت است. برای اطلاع از قیمت‌ها و شرایط ویژه تخفیف با شماره ۰۲۱-۹۱۳۰۲۵۸۴ تماس بگیرید یا فرم مشاوره را پر کنید." },
  { q: "آیا امکان شرکت در مسابقات وجود دارد؟", a: "بله، دانش‌آموزان ویرا هر ساله در مسابقات منطقه‌ای، ملی و بین‌المللی شرکت می‌کنند و تاکنون بیش از ۴۵ رتبه برتر کشوری کسب کرده‌اند." },
  { q: "تفاوت چرتکه دهگانی با چرتکه معمولی چیست؟", a: "چرتکه دهگانی یک مهره بالایی دارد که برای نمایش اعداد ۰ تا ۹ در هر ستون استفاده می‌شود. این ویژگی محاسبات را ساده‌تر، سریع‌تر و دقیق‌تر می‌کند." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -bottom-20 right-[15%] h-[300px] w-[300px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #F2994A 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">سوالات متداول</span>
          <h2 className="section-heading">پاسخ سوالات شما</h2>
          <p className="section-subheading mx-auto max-w-2xl">پاسخ رایج‌ترین سوالات درباره آموزش چرتکه و دوره‌های آموزشگاه ویرا</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`premium-card-static overflow-hidden transition-all duration-300 ${isOpen ? "shadow-lg ring-1 ring-[#2F80ED]/10" : ""}`}>
                <button onClick={() => toggle(i)} className="flex w-full items-center justify-between gap-3 p-5 text-right">
                  <span className={`text-sm font-bold transition-colors duration-200 ${isOpen ? "text-[#2F80ED]" : "text-[#102A43]"}`}>{faq.q}</span>
                  {isOpen ? <ChevronUp className="h-5 w-5 shrink-0 text-[#2F80ED]" /> : <ChevronDown className="h-5 w-5 shrink-0 text-[#A0AEC0]" />}
                </button>
                <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}>
                  <p className="px-5 pb-5 text-sm leading-7 text-[#718096]">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}