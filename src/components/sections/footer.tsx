"use client";

import { Instagram, Send, Phone, MapPin, Mail, Clock, GraduationCap, Heart, ArrowUpLeft } from "lucide-react";

const quickLinks = [
  { label: "صفحه اصلی", href: "/" },
  { label: "دوره‌های آموزشی", href: "/courses" },
  { label: "چرتکه دهگانی", href: "/abacus" },
  { label: "آزمون آنلاین", href: "/exam" },
  { label: "پنل دانش‌آموز", href: "/portal" },
  { label: "بلاگ", href: "/blog" },
];

const courseLinks = [
  "چرتکه مبتدی (سطح ۱-۳)",
  "چرتکه متوسط (سطح ۴-۶)",
  "چرتکه پیشرفته (سطح ۷-۹)",
  "حساب ذهنی",
  "آمادگی مسابقات",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#102A43" }}>
      {/* Top gradient line */}
      <div className="h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(47,128,237,0.3) 30%, rgba(139,92,246,0.3) 50%, rgba(39,174,96,0.3) 70%, transparent 100%)" }} />

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand */}
          <div className="rounded-2xl p-6 border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, #2F80ED, #8B5CF6)" }}>
                <GraduationCap className="h-5 w-5 text-white" />
                <div className="absolute -top-0.5 -left-0.5 h-2.5 w-2.5 rounded-full bg-[#27AE60] border-2 border-[#102A43]" />
              </div>
              <div>
                <h3 className="text-white text-sm font-extrabold">ویرا | چرتکه دهگانی</h3>
                <p className="text-white/30 text-[10px]">آموزگاه تخصصی چرتکه و حساب ذهنی</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-7 mb-5">
              آموزشگاه تخصصی چرتکه دهگانی و حساب ذهنی برای کودکان و نوجوانان با بیش از ۱۰ سال تجربه و بیش از ۴۵ رتبه برتر کشوری.
            </p>
            <div className="mt-auto flex items-center gap-2">
              {[
                { icon: Instagram, href: "https://instagram.com/bahanvira", hoverBg: "hover:bg-pink-500/20 hover:text-pink-400" },
                { icon: Send, href: "https://t.me/bahanvira", hoverBg: "hover:bg-sky-500/20 hover:text-sky-400" },
                { icon: Phone, href: "tel:02191302584", hoverBg: "hover:bg-emerald-500/20 hover:text-emerald-400" },
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.href} className={`flex h-10 w-10 items-center justify-center rounded-xl text-white/40 transition-all duration-300 ${social.hoverBg}`} style={{ background: "rgba(255,255,255,0.04)" }}>
                  <social.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="rounded-2xl p-6 border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.03)" }}>
            <h4 className="text-white text-sm font-bold mb-5 flex items-center gap-2">
              <ArrowUpLeft size={14} className="text-[#2F80ED]" />
              دسترسی سریع
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a key={link.href} href={link.href} className="block text-sm text-white/50 hover:text-[#2F80ED] transition-colors duration-200 hover:pr-2">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Courses */}
          <div className="rounded-2xl p-6 border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.03)" }}>
            <h4 className="text-white text-sm font-bold mb-5 flex items-center gap-2">
              <GraduationCap size={14} className="text-[#27AE60]" />
              دوره‌های آموزشی
            </h4>
            <nav className="space-y-3">
              {courseLinks.map((course) => (
                <a key={course} href="/courses" className="block text-sm text-white/50 hover:text-[#2F80ED] transition-colors duration-200 hover:pr-2">
                  {course}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="rounded-2xl p-6 border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.03)" }}>
            <h4 className="text-white text-sm font-bold mb-5">تماس با ما</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 shrink-0 text-white/30" />
                <span className="text-sm text-white/50 leading-6">تهران، خیابان انقلاب، پلاک ۱۲۳</span>
              </div>
              <a href="tel:02191302584" className="flex items-center gap-3 text-sm text-white/50 hover:text-[#2F80ED] transition-colors">
                <Phone className="h-4 w-4 shrink-0 text-white/30" />
                <span dir="ltr">۰۲۱-۹۱۳۰۲۵۸۴</span>
              </a>
              <a href="mailto:info@bahanvira.ir" className="flex items-center gap-3 text-sm text-white/50 hover:text-[#2F80ED] transition-colors">
                <Mail className="h-4 w-4 shrink-0 text-white/30" />
                <span dir="ltr">info@bahanvira.ir</span>
              </a>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-white/30" />
                <span className="text-sm text-white/50 leading-6">شنبه تا پنجشنبه ۸:۰۰ - ۱۸:۰۰</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 flex items-center gap-1">
            ساخته شده با <Heart size={12} className="text-[#F2994A]" /> در ویرا — ۱۴۰۵
          </p>
          <div className="flex items-center gap-1.5 text-xs text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">حریم خصوصی</a>
            <span className="text-white/15">|</span>
            <a href="#" className="hover:text-white/60 transition-colors">قوانین و مقررات</a>
          </div>
        </div>
      </div>
    </footer>
  );
}