"use client";

import { Check, Trophy, Users, GraduationCap, Medal, Sparkles } from "lucide-react";

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

export default function About() {
  return (
    <section className="section-growth relative overflow-hidden py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -top-20 right-[5%] h-[350px] w-[350px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #27AE60 0%, transparent 70%)" }} />
      <div className="animate-float pointer-events-none absolute top-16 left-[10%] h-4 w-4 rounded-full bg-[#27AE60]/20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">درباره ما</span>
          <h2 className="section-heading">درباره چرتکه دهگانی ویرا</h2>
          <p className="section-subheading mx-auto max-w-2xl">بیش از یک دهه تجربه در آموزش چرتکه و حساب ذهنی با رویکردی نوین و حرفه‌ای</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#27AE60]/10">
                <Sparkles size={24} className="text-[#27AE60]" />
              </div>
              <h3 className="text-xl font-bold text-[#102A43]">چرتکه دهگانی ویرا</h3>
            </div>
            <p className="text-sm sm:text-base text-[#718096] leading-8 mb-8">
              آموزشگاه چرتکه دهگانی ویرا از سال ۱۳۹۳ فعالیت خود را در زمینه آموزش چرتکه و حساب ذهنی آغاز کرده است. ما با بهره‌گیری از جدیدترین متدهای آموزشی و تیمی از مربیان مجرب بین‌المللی، توانسته‌ایم هزاران دانش‌آموز را در مسیر پیشرفت تحصیلی قرار دهیم و به یکی از معتبرترین مراکز آموزش چرتکه در ایران تبدیل شویم.
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
          </div>

          <div className="glass-card p-6 sm:p-8">
            <h3 className="mb-6 text-center text-lg font-bold text-[#102A43]">ویرا در یک نگاه</h3>
            <div className="mb-6 grid grid-cols-2 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className={`rounded-2xl p-5 text-center transition-transform duration-300 hover:scale-105 ${stat.bgColor}`}>
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
        </div>
      </div>
    </section>
  );
}