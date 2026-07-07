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
} from "lucide-react";

const stats = [
  { value: "۱۰+", label: "سال تجربه", icon: Award, color: "text-orange-500" },
  { value: "۲,۰۰۰+", label: "دانش‌آموز", icon: Users, color: "text-teal-500" },
  { value: "۹۵%", label: "رضایت والدین", icon: Star, color: "text-purple-500" },
  { value: "۵۰+", label: "مرکز آموزشی", icon: Calculator, color: "text-blue-500" },
];

export default function Hero() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] overflow-hidden hero-gradient flex items-center"
    >
      {/* Decorative floating shapes — playful for kids */}
      <div className="absolute top-[8%] right-[6%] w-14 h-14 rounded-2xl bg-orange-400/15 border border-orange-400/20 animate-float-slow rotate-12" />
      <div
        className="absolute top-[18%] right-[14%] w-8 h-8 rounded-full bg-teal-400/20 border border-teal-400/25 animate-bounce-soft"
        style={{ animationDelay: "0.3s" }}
      />
      <div
        className="absolute top-[35%] right-[3%] w-10 h-10 rounded-xl bg-purple-400/15 border border-purple-400/20 animate-float"
        style={{ animationDelay: "0.8s" }}
      />
      <div
        className="absolute bottom-[20%] right-[8%] w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/25 animate-float-slow"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="absolute top-[12%] left-[4%] w-16 h-16 rounded-full bg-teal-400/10 border border-teal-400/15 animate-float"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute bottom-[30%] left-[6%] w-10 h-10 rounded-xl bg-orange-400/10 border border-orange-400/15 animate-float-slow"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-[10%] left-[15%] w-12 h-12 rounded-2xl bg-purple-400/8 border border-purple-400/10 animate-bounce-soft"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Soft background blobs */}
      <div className="absolute top-[-5%] right-[-5%] h-[400px] w-[400px] rounded-full bg-orange-300/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-8%] h-[350px] w-[350px] rounded-full bg-teal-300/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] h-[250px] w-[250px] rounded-full bg-purple-200/10 blur-[80px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column: Text + Stats */}
          <div className="flex-1 w-full text-center lg:text-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100/80 border border-orange-200/60 px-5 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-orange-700 text-sm font-semibold">
                آموزشگاه تخصصی چرتکه دهگانی
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-extrabold leading-tight text-slate-900 max-w-2xl mx-auto lg:mx-0">
              قدرت ذهن فرزندتان را
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-orange-500 via-orange-400 to-amber-500">
                {" "}با چرتکه شکوفا کنید{" "}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
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
                  <div key={stat.label} className="stat-card hover:shadow-md transition-shadow">
                    <Icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
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

          {/* Right Column: Abacus Image + Consult Form */}
          <div className="w-full max-w-md lg:max-w-sm flex-shrink-0">
            {/* Abacus Image */}
            <div className="relative mb-6 rounded-2xl overflow-hidden shadow-xl shadow-orange-500/10 border border-orange-100/50">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-100/40 to-teal-100/40 z-10 pointer-events-none" />
              <Image
                src="/images/abacus-real.png"
                alt="چرتکه دهگانی ویرا"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Consult Form */}
            <div className="bright-card p-6 sm:p-7">
              {/* Form Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/20">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  مشاوره رایگان
                </h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-5">
                نام و شمارهتان را بگذارید، مشاوران ما تماس می‌گیرند
              </p>

              {/* Form Body */}
              <div className="space-y-3">
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
                <button className="btn-primary w-full text-base py-3.5">
                  دریافت مشاوره رایگان
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-teal-500" />
                  رایگان
                </span>
                <span>پاسخگویی زیر ۲۴ ساعت</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}