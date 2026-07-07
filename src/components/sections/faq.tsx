'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'چه سنی برای شروع آموزش چرتکه مناسب است؟',
    a: 'بهترین سن شروع آموزش چرتکه ۵ تا ۱۲ سالگی است. در این سنین، مغز کودک بیشترین قابلیت انعطاف‌پذیری را دارد.',
  },
  {
    q: 'آیا چرتکه باعث بهبود نمرات مدرسه می‌شود؟',
    a: 'بله، تحقیقات نشان داده آموزش چرتکه به‌طور مستقیم بر عملکرد ریاضی و حتی دروس دیگر تأثیر مثبت دارد.',
  },
  {
    q: 'طول هر دوره آموزشی چقدر است؟',
    a: 'هر سطح معمولاً ۳ ماه طول می‌کشد و شامل ۱۲ جلسه ۹۰ دقیقه‌ای است.',
  },
  {
    q: 'آیا کلاس‌های آنلاین هم دارید؟',
    a: 'بله، ما کلاس‌های حضوری و آنلاین ارائه می‌دهیم. کلاس‌های آنلاین با همان کیفیت کلاس‌های حضوری برگزار می‌شوند.',
  },
  {
    q: 'گواهینامه پایان دوره معتبر است؟',
    a: 'بله، گواهینامه‌های صادر شده توسط آموزشگاه ویرا دارای اعتبار رسمی از سازمان‌های مرتبط است.',
  },
  {
    q: 'هزینه دوره‌ها چقدر است؟',
    a: 'هزینه دوره‌ها بسته به سطح و نوع دوره متفاوت است. برای اطلاع از قیمت‌ها با ما تماس بگیرید.',
  },
  {
    q: 'آیا امکان شرکت در مسابقات وجود دارد؟',
    a: 'بله، دانش‌آموزان ویرا هر ساله در مسابقات منطقه‌ای، ملی و بین‌المللی شرکت می‌کنند.',
  },
  {
    q: 'تفاوت چرتکه دهگانی با چرتکه معمولی چیست؟',
    a: 'چرتکه دهگانی یک مهره بالایی دارد که برای نمایش اعداد ۰ تا ۹ در هر ستون استفاده می‌شود و محاسبات را ساده‌تر و سریع‌تر می‌کند.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">سوالات متداول</h2>
          <p className="text-slate-400 mt-3 leading-relaxed max-w-2xl mx-auto">
            پاسخ سوالات رایج درباره آموزش چرتکه و دوره‌های ما
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-10 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`glass-card rounded-2xl transition-all duration-300 ${
                  isOpen ? 'border-teal-500/30' : ''
                }`}
              >
                {/* Trigger */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-3 p-5 text-right"
                >
                  <span
                    className={`text-sm font-bold transition-colors duration-200 ${
                      isOpen ? 'text-teal-400' : 'text-white'
                    }`}
                  >
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-teal-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-500 shrink-0" />
                  )}
                </button>

                {/* Content */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? '300px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}