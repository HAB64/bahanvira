"use client";

import { Award, BookOpen, Star } from "lucide-react";

const instructors = [
  { name: "استاد فاطمه محمدی", role: "مدیر آموزشگاه و سرمربی", exp: "۱۵ سال سابقه", bio: "فارغ‌التحصیل کارشناسی ارشد ریاضی و دارای گواهینامه بین‌المللی مربی‌گری چرتکه از ژاپن", initials: "ف.م", color: "#F2994A", bgColor: "bg-orange-500/10" },
  { name: "استاد علی حسینی", role: "مربی پیشرفته و مسابقات", exp: "۱۰ سال سابقه", bio: "قهرمان مسابقات ملی چرتکه و مربی تیم ملی. تخصص در آمادگی دانش‌آموزان برای مسابقات بین‌المللی", initials: "ا.ح", color: "#27AE60", bgColor: "bg-emerald-500/10" },
  { name: "استاد مریم رضایی", role: "مربی مبتدی و کودک", exp: "۸ سال سابقه", bio: "متخصص آموزش چرتکه به کودکان سنین ۵ تا ۱۰ سال با روش‌های بازی‌محور و خلاقانه", initials: "م.ر", color: "#8B5CF6", bgColor: "bg-purple-500/10" },
];

export default function Instructors() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -top-24 left-[15%] h-[400px] w-[400px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-24 right-[15%] h-[350px] w-[350px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #2F80ED 0%, transparent 70%)" }} />
      <div className="animate-float pointer-events-none absolute top-20 right-[12%] h-4 w-4 rounded-full bg-[#8B5CF6]/20" />
      <div className="animate-float-slow pointer-events-none absolute bottom-28 left-[8%] h-5 w-5 rounded-lg bg-[#2F80ED]/15 rotate-45" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">تیم آموزشی</span>
          <h2 className="section-heading">مربیان مجرب ما</h2>
          <p className="section-subheading mx-auto max-w-2xl">با بهترین مربیان چرتکه کشور، فرزندتان بهترین آموزش حرفه‌ای را دریافت می‌کند.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {instructors.map((inst) => (
            <div key={inst.name} className="premium-card group p-7 sm:p-8 flex flex-col items-center text-center">
              <div className={`flex h-20 w-20 items-center justify-center rounded-full ${inst.bgColor} transition-transform duration-300 group-hover:scale-105`}>
                <span className="text-2xl font-bold" style={{ color: inst.color }}>{inst.initials}</span>
              </div>
              <h3 className="mt-5 mb-1 text-lg font-bold text-[#102A43]">{inst.name}</h3>
              <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-1" style={{ backgroundColor: `${inst.color}12`, color: inst.color }}>{inst.role}</span>
              <div className="flex items-center gap-1.5 text-xs text-[#718096] mb-4">
                <Award size={13} />
                {inst.exp}
              </div>
              <p className="text-sm leading-7 text-[#718096]">{inst.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}