"use client";

import { useState } from "react";
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
} from "lucide-react";

const stats = [
  {
    value: "۱۰+",
    label: "سال تجربه",
    icon: Award,
    color: "text-[#F2994A]",
    bg: "bg-[#F2994A]/[0.08]",
  },
  {
    value: "۲,۰۰۰+",
    label: "دانش‌آموز",
    icon: Users,
    color: "text-[#27AE60]",
    bg: "bg-[#27AE60]/[0.08]",
  },
  {
    value: "۹۵٪",
    label: "رضایت والدین",
    icon: Star,
    color: "text-[#8B5CF6]",
    bg: "bg-[#8B5CF6]/[0.08]",
  },
  {
    value: "۵۰+",
    label: "مرکز آموزشی",
    icon: Calculator,
    color: "text-[#2F80ED]",
    bg: "bg-[#2F80ED]/[0.08]",
  },
];

export default function Hero() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section
      id="hero"
      dir="rtl"
      className="relative min-h-[92vh] overflow-hidden hero-gradient flex items-center"
    >
      {/* ═══════════════════════════════════════════════════════
          BLUR BLOBS — soft depth layers
          ═══════════════════════════════════════════════════════ */}
      <div className="absolute top-[-8%] right-[-6%] h-[500px] w-[500px] rounded-full bg-[#2F80ED]/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-8%] h-[450px] w-[450px] rounded-full bg-[#27AE60]/[0.06] blur-[110px] pointer-events-none" />
      <div className="absolute top-[35%] left-[25%] h-[350px] w-[350px] rounded-full bg-[#8B5CF6]/[0.05] blur-[100px] pointer-events-none" />

      {/* ═══════════════════════════════════════════════════════
          FLOATING GEOMETRIC SHAPES — organic, low opacity
          ═══════════════════════════════════════════════════════ */}

      {/* 1 — Blue circle, top-right area */}
      <div
        className="absolute top-[6%] right-[5%] w-16 h-16 rounded-full bg-[#2F80ED]/[0.08] animate-float-slow"
        style={{ animationDelay: "0s" }}
      />

      {/* 2 — Green rounded-rect, right-center */}
      <div
        className="absolute top-[22%] right-[12%] w-10 h-10 rounded-2xl bg-[#27AE60]/[0.07] border border-[#27AE60]/[0.05] animate-float"
        style={{ animationDelay: "0.4s" }}
      />

      {/* 3 — Purple circle, top-left area */}
      <div
        className="absolute top-[10%] left-[8%] w-20 h-20 rounded-full bg-[#8B5CF6]/[0.06] animate-float-slow"
        style={{ animationDelay: "0.7s" }}
      />

      {/* 4 — Orange rounded-rect, right-lower */}
      <div
        className="absolute top-[55%] right-[3%] w-12 h-12 rounded-2xl bg-[#F2994A]/[0.08] border border-[#F2994A]/[0.05] animate-bounce-soft"
        style={{ animationDelay: "1s" }}
      />

      {/* 5 — Blue rounded-rect, bottom-left */}
      <div
        className="absolute bottom-[18%] left-[5%] w-14 h-14 rounded-3xl bg-[#2F80ED]/[0.05] animate-float"
        style={{ animationDelay: "0.5s" }}
      />

      {/* 6 — Green circle, bottom-right area */}
      <div
        className="absolute bottom-[25%] right-[10%] w-8 h-8 rounded-full bg-[#27AE60]/[0.1] animate-float-slow"
        style={{ animationDelay: "1.3s" }}
      />

      {/* 7 — Purple rounded-rect, mid-left */}
      <div
        className="absolute top-[45%] left-[2%] w-10 h-10 rounded-xl bg-[#8B5CF6]/[0.07] border border-[#8B5CF6]/[0.04] animate-bounce-soft"
        style={{ animationDelay: "1.6s" }}
      />

      {/* 8 — Orange circle, top-center */}
      <div
        className="absolute top-[4%] left-[35%] w-6 h-6 rounded-full bg-[#F2994A]/[0.12] animate-float-reverse"
        style={{ animationDelay: "0.9s" }}
      />

      {/* ═══════════════════════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          {/* ── Left Column: Text + Stats ──────────────────── */}
          <div className="flex-1 w-full text-center lg:text-right">
            {/* Badge */}
            <div className="section-badge animate-slide-up mb-8">
              <Sparkles className="w-4 h-4" />
              <span>آموزگاه تخصصی چرتکه دهگانی ویرا</span>
            </div>

            {/* Heading */}
            <h1 className="animate-slide-up text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-black leading-[1.15] tracking-tight max-w-2xl mx-auto lg:mx-0" style={{ animationDelay: "0.1s" }}>
              <span className="text-[#102A43]">
                قدرت ذهن فرزندتان را
              </span>
              <br className="hidden sm:block" />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-l from-[#8B5CF6] via-[#2F80ED] to-[#2F80ED]"
              >
                {" "}با چرتکه شکوفا کنید{" "}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="animate-slide-up mt-7 text-lg sm:text-xl text-[#718096] leading-[1.85] max-w-xl mx-auto lg:mx-0 font-normal"
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
              <a
                href="#register"
                className="btn-primary text-[15px] px-10 py-4 w-full sm:w-auto rounded-2xl"
              >
                <Brain className="w-5 h-5" />
                شروع رایگان
              </a>
              <a
                href="#courses"
                className="btn-ghost text-[15px] px-8 py-4 w-full sm:w-auto rounded-2xl"
              >
                مشاهده دوره‌ها
                <ChevronLeft className="w-4 h-4" />
              </a>
            </div>

            {/* ── Stats Row ──────────────────────────────── */}
            <div
              className="animate-slide-up mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto lg:mx-0"
              style={{ animationDelay: "0.4s" }}
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="stat-card group hover:shadow-lg hover:shadow-[#102A43]/[0.06] cursor-default"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div className="text-2xl sm:text-[1.65rem] font-black text-[#102A43] leading-none">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-[13px] text-[#718096] mt-2 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right Column: Abacus Image + Consult Form ─── */}
          <div className="w-full max-w-md lg:max-w-[400px] flex-shrink-0">
            {/* ── Abacus Image ───────────────────────────── */}
            <div
              className="animate-slide-up relative mb-7 rounded-3xl overflow-hidden border border-white/60 bg-white/40 backdrop-blur-sm"
              style={{ animationDelay: "0.3s" }}
            >
              {/* Animated glow border */}
              <div
                className="absolute -inset-[1px] rounded-3xl z-0 animate-pulse-glow opacity-70 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(47,128,237,0.2) 0%, rgba(139,92,246,0.15) 40%, rgba(39,174,96,0.15) 70%, rgba(242,153,74,0.2) 100%)",
                }}
              />
              {/* Inner glow gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#2F80ED]/[0.06] via-transparent to-[#27AE60]/[0.06] z-10 pointer-events-none rounded-3xl" />

              <div className="relative z-20 p-5">
                <Image
                  src="/chertke-dohgani-vira.png"
                  alt="چرتکه دهگانی ویرا"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* ── Consult Form — Glassmorphic Card ──────── */}
            <div
              className="animate-slide-up glass-card p-7 sm:p-8"
              style={{ animationDelay: "0.5s" }}
            >
              {/* Form Header */}
              <div className="flex items-center gap-3.5 mb-2">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2F80ED] to-[#1A6DD1] flex items-center justify-center shadow-lg shadow-[#2F80ED]/25">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#102A43] leading-tight">
                    مشاوره رایگان
                  </h3>
                  <p className="text-[12px] text-[#718096] font-medium mt-0.5">
                    بدون هزینه، بدون تعهد
                  </p>
                </div>
              </div>

              <p className="text-[13px] text-[#718096] leading-relaxed mb-6">
                نام و شمارهتان را بگذارید، مشاوران ما در کمتر از ۲۴ ساعت
                تماس می‌گیرند.
              </p>

              {/* Form Body */}
              <div className="space-y-3.5">
                <div>
                  <input
                    type="text"
                    placeholder="نام و نام خانوادگی"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-dark"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="شماره همراه"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-dark"
                    dir="ltr"
                    style={{ textAlign: "left" }}
                  />
                </div>
                <button className="btn-primary w-full text-[14px] py-4 rounded-2xl">
                  دریافت مشاوره رایگان
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Indicators */}
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
          </div>
        </div>
      </div>
    </section>
  );
}