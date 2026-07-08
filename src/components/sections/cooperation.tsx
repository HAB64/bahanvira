"use client";

import { Building2, UserPlus, Handshake, ArrowLeft } from "lucide-react";

const cards = [
  { icon: Building2, title: "همکاری آموزشگاهی", desc: "آموزشگاه‌های سراسر کشور می‌توانند نماینده رسمی ویرا شوند و از مزایای ویژه آموزشی و تجاری بهره‌مند گردند.", button: "درخواست همکاری", color: "#2F80ED", bgColor: "bg-blue-500/10" },
  { icon: UserPlus, title: "استخدام مربی", desc: "اگر مربی چرتکه با تجربه هستید و به دنبال محیط حرفه‌ای می‌گردید، به تیم ما بپیوندید.", button: "ارسال رزومه", color: "#27AE60", bgColor: "bg-emerald-500/10" },
  { icon: Handshake, title: "فرانشیز", desc: "راه‌اندازی شعبه آموزشگاه چرتکه ویرا در شهر شما با پشتیبانی کامل و آموزش جامع.", button: "اطلاعات بیشتر", color: "#8B5CF6", bgColor: "bg-purple-500/10" },
];

export default function Cooperation() {
  return (
    <section id="cooperation" className="section-creative relative overflow-hidden py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -top-20 left-[10%] h-[400px] w-[400px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }} />
      <div className="animate-float pointer-events-none absolute top-24 right-[15%] h-4 w-4 rounded-full bg-[#2F80ED]/20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">فرصت‌های همکاری</span>
          <h2 className="section-heading">همکاری با ویرا</h2>
          <p className="section-subheading mx-auto max-w-2xl">فرصت‌های جذاب همکاری برای آموزشگاه‌ها، مربیان و کارآفرینان علاقه‌مند</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="premium-card group p-7 sm:p-8 flex flex-col items-center text-center">
                <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${card.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={28} style={{ color: card.color }} />
                </div>
                <h3 className="text-lg font-bold text-[#102A43]">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#718096]">{card.desc}</p>
                <button className="btn-ghost mt-6 text-sm" style={{ borderColor: `${card.color}30`, color: card.color }}>{card.button}<ArrowLeft className="h-4 w-4" /></button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}