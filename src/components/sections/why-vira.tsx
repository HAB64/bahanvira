"use client";

import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const advantages = [
  { title: "روش آموزشی منحصر به فرد", desc: "ترکیب چرتکه فیزیکی و تمرینات دیجیتال برای بهترین نتیجه", color: "#2F80ED" },
  { title: "مربیان دارای گواهینامه بین‌المللی", desc: "تمام مربیان ما گواهینامه معتبر بین‌المللی دارند", color: "#27AE60" },
  { title: "کلاس‌های حضوری و آنلاین", desc: "انعطاف‌پذیری کامل در نحوه حضور و زمان‌بندی کلاس‌ها", color: "#F2994A" },
  { title: "گزارش پیشرفت هفتگی", desc: "والدین همیشه از وضعیت فرزندشان مطلع هستند", color: "#8B5CF6" },
  { title: "آزمون‌های دوره‌ای استاندارد", desc: "سنجش مستمر و دقیق پیشرفت دانش‌آموزان", color: "#14B8A6" },
  { title: "محیط دوستانه و رقابتی", desc: "ایجاد انگیزه از طریق مسابقات داخلی و جوایز", color: "#FFD54F" },
];

export default function WhyVira() {
  return (
    <section id="why-vira" className="relative overflow-hidden bg-white py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -top-20 left-[20%] h-[350px] w-[350px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #2F80ED 0%, transparent 70%)" }} />
      <div className="animate-float-slow pointer-events-none absolute top-24 right-[8%] h-5 w-5 rounded-lg bg-[#27AE60]/15 rotate-12" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">مزایای ویرا</span>
          <h2 className="section-heading">چرا ویرا متفاوت است؟</h2>
          <p className="section-subheading mx-auto max-w-2xl">تفاوت ما با سایر آموزشگاه‌ها در کیفیت، روش و نتایج است</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 items-start">
          <div className="space-y-4">
            {advantages.map((item) => (
              <div key={item.title} className="premium-card-static group flex items-start gap-4 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${item.color}12` }}>
                  <CheckCircle2 size={20} style={{ color: item.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#102A43]">{item.title}</h3>
                  <p className="mt-1 text-xs leading-6 text-[#718096]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-8 flex flex-col items-center relative overflow-hidden">
            <div className="relative mb-8 w-full overflow-hidden rounded-2xl">
              <div className="absolute inset-0 z-10 rounded-2xl pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(47,128,237,0.1) 0%, rgba(39,174,96,0.1) 100%)" }} />
              <Image src="/chertke-dohgani-vira.png" alt="چرتکه دهگانی ویرا" width={500} height={350} className="w-full h-auto object-contain p-6 rounded-2xl" />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
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
        </div>
      </div>
    </section>
  );
}