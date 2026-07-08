"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Brain,
  Calculator,
  Star,
  Users,
  Award,
  Phone,
  ChevronLeft,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  Trophy,
  Flame,
} from "lucide-react";

/* ── Floating Math Symbols ─────────────────────────── */
const mathSymbols = [
  { char: "+", size: "text-2xl", color: "text-[#2F80ED]/20", delay: "0s", top: "8%", left: "12%" },
  { char: "×", size: "text-xl", color: "text-[#27AE60]/20", delay: "0.5s", top: "15%", left: "75%" },
  { char: "÷", size: "text-2xl", color: "text-[#F2994A]/15", delay: "1s", top: "60%", left: "5%" },
  { char: "=", size: "text-lg", color: "text-[#8B5CF6]/20", delay: "1.5s", top: "75%", left: "80%" },
  { char: "۹", size: "text-3xl", color: "text-[#2F80ED]/10", delay: "0.3s", top: "30%", left: "88%" },
  { char: "۳", size: "text-2xl", color: "text-[#27AE60]/12", delay: "0.8s", top: "80%", left: "15%" },
  { char: "۷", size: "text-xl", color: "text-[#F2994A]/15", delay: "1.2s", top: "45%", left: "3%" },
  { char: "√", size: "text-2xl", color: "text-[#8B5CF6]/15", delay: "0.6s", top: "20%", left: "55%" },
  { char: "π", size: "text-xl", color: "text-[#FFD54F]/20", delay: "1.8s", top: "70%", left: "65%" },
  { char: "۵", size: "text-3xl", color: "text-[#2F80ED]/8", delay: "0.9s", top: "50%", left: "92%" },
];

/* ── Animated Counter ──────────────────────────────── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const step = value / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <div ref={ref}>{count.toLocaleString("fa-IR")}{suffix}</div>;
}

/* ── Stats Data ────────────────────────────────────── */
const stats = [
  { value: 10, suffix: "+", label: "سال تجربه", icon: Award, color: "text-[#F2994A]", bg: "bg-[#F2994A]/[0.08]" },
  { value: 2000, suffix: "+", label: "دانش‌آموز", icon: Users, color: "text-[#27AE60]", bg: "bg-[#27AE60]/[0.08]" },
  { value: 95, suffix: "٪", label: "رضایت والدین", icon: Star, color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/[0.08]" },
  { value: 50, suffix: "+", label: "مرکز آموزشی", icon: Calculator, color: "text-[#2F80ED]", bg: "bg-[#2F80ED]/[0.08]" },
];

/* ── Hero Section ──────────────────────────────────── */
export default function Hero() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section id="hero" dir="rtl" className="relative min-h-[100vh] overflow-hidden hero-gradient flex items-center">
      {/* ═══ Background Layers ═══ */}
      {/* Mesh gradient blobs */}
      <div className="absolute top-[-10%] right-[-8%] h-[600px] w-[600px] rounded-full bg-[#2F80ED]/[0.06] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-12%] left-[-10%] h-[550px] w-[550px] rounded-full bg-[#27AE60]/[0.05] blur-[130px] pointer-events-none" />
      <div className="absolute top-[30%] left-[20%] h-[400px] w-[400px] rounded-full bg-[#8B5CF6]/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute top-[60%] right-[15%] h-[300px] w-[300px] rounded-full bg-[#F2994A]/[0.04] blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #102A43 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Floating Math Symbols */}
      {mathSymbols.map((s, i) => (
        <span key={i} className={`absolute pointer-events-none font-black ${s.size} ${s.color} animate-float-slow`} style={{ top: s.top, left: s.left, animationDelay: s.delay, animationDuration: `${4 + Math.random() * 3}s` }}>
          {s.char}
        </span>
      ))}

      {/* Floating Geometric Shapes */}
      <div className="absolute top-[6%] right-[5%] w-16 h-16 rounded-full bg-[#2F80ED]/[0.08] animate-float-slow border border-[#2F80ED]/[0.05]" />
      <div className="absolute top-[22%] right-[14%] w-10 h-10 rounded-2xl bg-[#27AE60]/[0.07] animate-float" />
      <div className="absolute top-[10%] left-[8%] w-20 h-20 rounded-full bg-[#8B5CF6]/[0.06] animate-float-slow" />
      <div className="absolute top-[55%] right-[3%] w-12 h-12 rounded-2xl bg-[#F2994A]/[0.08] animate-bounce-soft" />
      <div className="absolute bottom-[18%] left-[5%] w-14 h-14 rounded-3xl bg-[#2F80ED]/[0.05] animate-float" />
      <div className="absolute bottom-[25%] right-[10%] w-8 h-8 rounded-full bg-[#27AE60]/[0.1] animate-float-slow" />

      {/* ═══ Main Content ═══ */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-24 sm:py-28 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* ── Left Column: Text + Stats ──────────────── */}
          <div className="flex-1 w-full text-center lg:text-right">
            {/* Badge with glow */}
            <div className="animate-slide-up mb-8 inline-flex">
              <div className="section-badge relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer" />
                <Sparkles className="w-4 h-4 relative z-10" />
                <span className="relative z-10">آموزگاه تخصصی چرتکه دهگانی ویرا</span>
              </div>
            </div>

            {/* Heading */}
            <h1
              className="animate-slide-up text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black leading-[1.12] tracking-tight max-w-2xl mx-auto lg:mx-0"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="text-[#102A43]">قدرت ذهن فرزندتان را</span>
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#8B5CF6] via-[#2F80ED] to-[#27AE60] animate-gradient-x">
                {" "}با چرتکه شکوفا کنید{" "}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="animate-slide-up mt-7 text-lg sm:text-xl text-[#718096] leading-[1.9] max-w-xl mx-auto lg:mx-0 font-normal"
              style={{ animationDelay: "0.2s" }}
            >
              آموزشگاه چرتکه دهگانی ویرا با بیش از ۱۰ سال تجربه، بهترین
              روش آموزش چرتکه و حساب ذهنی را به کودکان و نوجوانان ۶ تا ۱۶
              سال ارائه می‌دهد.
            </p>

            {/* CTA Buttons */}
            <div
              className="animate-slide-up mt-10 flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center"
              style={{ animationDelay: "0.3s" }}
            >
              <a href="#register" className="btn-primary text-[15px] px-10 py-4 w-full sm:w-auto rounded-2xl group relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer opacity-30" />
                <Brain className="w-5 h-5 relative z-10" />
                <span className="relative z-10">شروع رایگان</span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </a>
              <a href="#courses" className="btn-ghost text-[15px] px-8 py-4 w-full sm:w-auto rounded-2xl">
                مشاهده دوره‌ها
                <ChevronLeft className="w-4 h-4" />
              </a>
            </div>

            {/* Trust badges row */}
            <div className="animate-slide-up mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3" style={{ animationDelay: "0.35s" }}>
              {[
                { icon: ShieldCheck, label: "ضمانت کیفیت", color: "#27AE60" },
                { icon: Zap, label: "نتیجه در ۳۰ روز", color: "#F2994A" },
                { icon: Trophy, label: "برنده مسابقات", color: "#8B5CF6" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 text-xs font-medium text-[#718096] bg-white/60 backdrop-blur-sm rounded-full px-3.5 py-1.5 border border-[#E8EDF3]/60">
                  <item.icon size={13} style={{ color: item.color }} />
                  {item.label}
                </div>
              ))}
            </div>

            {/* ── Stats Row ──────────────────────────── */}
            <div
              className="animate-slide-up mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto lg:mx-0"
              style={{ animationDelay: "0.4s" }}
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="stat-card group hover:shadow-lg hover:shadow-[#102A43]/[0.06] cursor-default">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div className="text-2xl sm:text-[1.65rem] font-black text-[#102A43] leading-none">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs sm:text-[13px] text-[#718096] mt-2 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right Column: Abacus + Form ──────────── */}
          <div className="w-full max-w-md lg:max-w-[420px] flex-shrink-0">
            {/* Animated Abacus Image */}
            <div
              className="animate-slide-up relative mb-7 rounded-3xl overflow-hidden"
              style={{ animationDelay: "0.25s" }}
            >
              {/* Animated glow border */}
              <div className="absolute -inset-[1px] rounded-3xl z-0 animate-pulse-glow opacity-60 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(47,128,237,0.2) 0%, rgba(139,92,246,0.15) 40%, rgba(39,174,96,0.15) 70%, rgba(242,153,74,0.2) 100%)" }} />
              <div className="relative z-10 rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm p-2">
                <Image
                  src="/chertke-dohgani-vira.png"
                  alt="چرتکه دهگانی ویرا"
                  width={500}
                  height={400}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* ── Consult Form ────────────────────────── */}
            <div className="animate-slide-up glass-card p-7 sm:p-8" style={{ animationDelay: "0.45s" }}>
              <div className="flex items-center gap-3.5 mb-2">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2F80ED] to-[#1A6DD1] flex items-center justify-center shadow-lg shadow-[#2F80ED]/25">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#102A43] leading-tight">مشاوره رایگان</h3>
                  <p className="text-[12px] text-[#718096] font-medium mt-0.5">بدون هزینه، بدون تعهد</p>
                </div>
              </div>

              <p className="text-[13px] text-[#718096] leading-relaxed mb-6">
                نام و شمارهتان را بگذارید، مشاوران ما در کمتر از ۲۴ ساعت تماس می‌گیرند.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center py-6 text-center animate-scale-in">
                  <div className="w-14 h-14 rounded-full bg-[#27AE60]/10 flex items-center justify-center mb-4">
                    <Flame className="w-7 h-7 text-[#27AE60]" />
                  </div>
                  <p className="text-base font-bold text-[#102A43] mb-1">درخواست شما ثبت شد!</p>
                  <p className="text-sm text-[#718096]">به‌زودی با شما تماس می‌گیریم</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <input type="text" placeholder="نام و نام خانوادگی" value={name} onChange={(e) => setName(e.target.value)} className="input-dark" required />
                  <input type="tel" placeholder="شماره همراه" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-dark" dir="ltr" style={{ textAlign: "left" }} required />
                  <button type="submit" className="btn-primary w-full text-[14px] py-4 rounded-2xl group relative overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer opacity-20" />
                    <span className="relative z-10">دریافت مشاوره رایگان</span>
                    <ChevronLeft className="w-4 h-4 relative z-10" />
                  </button>
                </form>
              )}

              <div className="mt-5 flex items-center justify-center gap-5 text-[12px] text-[#A0AEC0] font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#27AE60]" />
                  رایگان
                </span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#2F80ED]" />
                  پاسخگویی زیر ۲۴ ساعت
                </span>
              </div>
            </div>

            {/* ── Phone Numbers ────────────────────────── */}
            <div className="animate-slide-up flex items-center justify-center gap-6 mt-5" style={{ animationDelay: "0.5s" }}>
              <a href="tel:09111277194" className="flex items-center gap-2 text-sm font-bold text-[#2F80ED] hover:text-[#1A6DD1] transition-colors">
                <Phone className="w-4 h-4" />
                <span dir="ltr">۰۹۱۱۱۲۷۷۱۹۴</span>
              </a>
              <span className="text-[#E8EDF3]">|</span>
              <a href="tel:01144746441" className="flex items-center gap-2 text-sm font-bold text-[#2F80ED] hover:text-[#1A6DD1] transition-colors">
                <Phone className="w-4 h-4" />
                <span dir="ltr">۰۱۱-۴۴۷۴۶۴۴۱</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave separator */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" className="w-full h-auto block" preserveAspectRatio="none">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="white" fillOpacity="0.6" />
          <path d="M0,55 C360,80 720,20 1080,55 C1260,70 1380,60 1440,55 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}