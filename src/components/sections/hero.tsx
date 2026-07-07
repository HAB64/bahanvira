"use client";

import { useState } from "react";
import {
  Brain,
  Calculator,
  Star,
  Users,
  Award,
  Phone,
  ChevronLeft,
} from "lucide-react";

const stats = [
  { value: "۱۰+", label: "سال تجربه", icon: Award },
  { value: "۲,۰۰۰+", label: "دانش‌آموز", icon: Users },
  { value: "۹۵%", label: "رضایت والدین", icon: Star },
  { value: "۵۰+", label: "مرکز آموزشی", icon: Calculator },
];

export default function Hero() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] overflow-hidden hero-gradient flex items-center"
    >
      {/* ── Decorative floating elements ── */}
      <div className="absolute top-[8%] right-[6%] w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/20 animate-float" />
      <div
        className="absolute top-[18%] right-[12%] w-8 h-8 rounded-full bg-orange-400/15 border border-orange-400/20 animate-float"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute top-[35%] right-[3%] w-12 h-12 rounded-full bg-teal-400/8 border border-teal-400/15 animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-[20%] right-[8%] w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/15 animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-[12%] left-[4%] w-20 h-20 rounded-full bg-teal-500/6 border border-teal-500/10 animate-float"
        style={{ animationDelay: "0.8s" }}
      />
      <div
        className="absolute bottom-[30%] left-[6%] w-10 h-10 rounded-full bg-orange-400/10 border border-orange-400/15 animate-float"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="absolute bottom-[10%] left-[15%] w-14 h-14 rounded-full bg-teal-400/5 border border-teal-400/10 animate-float"
        style={{ animationDelay: "2s" }}
      />
      {/* Large soft glows */}
      <div className="absolute top-[-10%] right-[-5%] h-[420px] w-[420px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-8%] h-[360px] w-[360px] rounded-full bg-orange-500/8 blur-[100px] pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── Left Column: Text + Stats ── */}
          <div className="flex-1 w-full text-center lg:text-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/15 border border-teal-500/25 px-5 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-teal-300 text-sm font-medium">
                آموزشگاه تخصصی چرتکه دهگانی
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-extrabold leading-tight text-white max-w-2xl mx-auto lg:mx-0">
              قدرت ذهن فرزندتان را
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-teal-300 to-teal-500">
                {" "}
                با چرتکه شکوفا کنید{" "}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              آموزشگاه چرتکه دهگانی ویرا با بیش از ۱۰ سال تجربه، بهترین
              روش آموزش چرتکه و حساب ذهنی را به کودکان و نوجوانان ارائه
              می‌دهد.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center">
              <a
                href="#register"
                className="btn-primary text-base px-10 py-4 w-full sm:w-auto"
              >
                <Brain className="w-5 h-5" />
                شروع رایگان
              </a>
              <a
                href="#courses"
                className="btn-ghost text-base px-8 py-4 w-full sm:w-auto"
              >
                مشاهده دوره‌ها
                <ChevronLeft className="w-4 h-4" />
              </a>
            </div>

            {/* Stats Row */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto lg:mx-0">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="stat-card">
                    <Icon className="w-5 h-5 text-teal-400 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-extrabold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right Column: Consult Form ── */}
          <div className="w-full max-w-md lg:max-w-sm flex-shrink-0">
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              {/* Form Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  مشاوره رایگان
                </h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                نام و شمارهتان را بگذارید، مشاوران ما تماس می‌گیرند
              </p>

              {/* Form Body */}
              <div className="space-y-4">
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
                <button className="btn-primary w-full text-base py-4">
                  دریافت مشاوره رایگان
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Form Footer */}
              <p className="mt-4 text-center text-xs text-slate-500">
                پاسخگویی در کمتر از ۲۴ ساعت
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}