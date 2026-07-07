"use client";

import { useState } from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import {
  Clock,
  Users,
  BookOpen,
  Star,
  Phone,
  Filter,
  GraduationCap,
} from "lucide-react";

interface Course {
  title: string;
  description: string;
  duration: string;
  sessions: string;
  price: string;
  isFree: boolean;
  level: string;
  age: string;
  badge?: { label: string; color: string };
  category: string;
}

const courses: Course[] = [
  {
    title: "چرتکه مبتدی (سطح ۱-۳)",
    description: "یادگیری اصول اولیه چرتکه دهگانی شامل شناخت چرتکه، حرکت مهره‌ها و عملیات ساده جمع و تفریق. مناسب برای سنین ۵ تا ۸ سال.",
    duration: "۳۶ ساعته", sessions: "۱۲ جلسه", price: "۲,۵۰۰,۰۰۰ تومان", isFree: false, level: "مبتدی", age: "۵-۸ سال",
    badge: { label: "پرطرفدار", color: "bg-orange-100 text-orange-600" }, category: "چرتکه",
  },
  {
    title: "چرتکه متوسط (سطح ۴-۶)",
    description: "تسلط بر جمع و تفریق چندرقمی و آشنایی اولیه با ضرب. تقویت تمرکز و سرعت عمل.",
    duration: "۴۸ ساعته", sessions: "۱۶ جلسه", price: "۳,۲۰۰,۰۰۰ تومان", isFree: false, level: "متوسط", age: "۷-۱۱ سال",
    badge: { label: "پرطرفدار", color: "bg-orange-100 text-orange-600" }, category: "چرتکه",
  },
  {
    title: "چرتکه پیشرفته (سطح ۷-۹)",
    description: "محاسبات چندرقمی پیچیده شامل ضرب و تقسیم. آمادگی برای ورود به حساب ذهنی.",
    duration: "۶۰ ساعته", sessions: "۲۰ جلسه", price: "۴,۰۰۰,۰۰۰ تومان", isFree: false, level: "پیشرفته", age: "۹-۱۴ سال",
    badge: { label: "جدید", color: "bg-purple-100 text-purple-600" }, category: "چرتکه",
  },
  {
    title: "حساب ذهنی ۱ (سطح ۱۰-۱۲)",
    description: "انتقال مهارت چرتکه به ذهن. انجام جمع و تفریق بدون چرتکه فیزیکی.",
    duration: "۲۴ ساعته", sessions: "۸ جلسه", price: "۳,۰۰۰,۰۰۰ تومان", isFree: false, level: "پیشرفته", age: "۱۰-۱۵ سال",
    category: "حساب ذهنی",
  },
  {
    title: "حساب ذهنی ۲ (سطح ۱۳-۱۵)",
    description: "محاسبات ذهنی ضرب و تقسیم. افزایش سرعت و دقت محاسبات.",
    duration: "۳۰ ساعته", sessions: "۱۰ جلسه", price: "۳,۵۰۰,۰۰۰ تومان", isFree: false, level: "حرفه‌ای", age: "۱۱-۱۶ سال",
    category: "حساب ذهنی",
  },
  {
    title: "آمادگی مسابقات",
    description: "تمرین‌های ویژه سرعت و دقت. آمادگی برای مسابقات منطقه‌ای، ملی و بین‌المللی.",
    duration: "۲۰ ساعته", sessions: "۱۰ جلسه", price: "۲,۸۰۰,۰۰۰ تومان", isFree: false, level: "پیشرفته", age: "۸-۱۶ سال",
    badge: { label: "ویژه", color: "bg-purple-100 text-purple-600" }, category: "مسابقات",
  },
  {
    title: "دوره مربی‌گری چرتکه",
    description: "آموزش کامل روش‌های تدریس چرتکه. مناسب برای علاقه‌مندان به حرفه مربی‌گری.",
    duration: "۸۰ ساعته", sessions: "۲۵ جلسه", price: "۸,۵۰۰,۰۰۰ تومان", isFree: false, level: "حرفه‌ای", age: "۱۸+ سال",
    category: "مربی‌گری",
  },
  {
    title: "جلسه معارفه و ارزیابی",
    description: "جلسه رایگان آشنایی با چرتکه و ارزیابی سطح دانش‌آموز. بدون تعهد.",
    duration: "۹۰ دقیقه", sessions: "۱ جلسه", price: "رایگان", isFree: true, level: "همه سطوح", age: "۵+ سال",
    badge: { label: "رایگان", color: "bg-green-100 text-green-600" }, category: "چرتکه",
  },
];

const tabs = [
  { label: "همه دوره‌ها", value: "all" },
  { label: "چرتکه", value: "چرتکه" },
  { label: "حساب ذهنی", value: "حساب ذهنی" },
  { label: "مربی‌گری", value: "مربی‌گری" },
  { label: "مسابقات", value: "مسابقات" },
];

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bright-card p-6 flex flex-col gap-4 transition-all duration-300 relative">
      {course.badge && (
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center gap-1 ${course.badge.color} text-xs font-bold px-3 py-1 rounded-full`}>
            <Star className="w-3 h-3" />
            {course.badge.label}
          </span>
        </div>
      )}
      <h3 className="text-lg font-bold text-slate-900 leading-relaxed mt-1">{course.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{course.description}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 border-t border-gray-100 pt-4">
        <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-orange-500" />{course.duration}</span>
        <span className="inline-flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-orange-500" />{course.sessions}</span>
        <span className="inline-flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-orange-500" />{course.level}</span>
        <span className="inline-flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-orange-500" />{course.age}</span>
      </div>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
        <span className={`text-base font-bold ${course.isFree ? "text-green-600" : "text-orange-500"}`}>{course.price}</span>
        <button className="btn-ghost text-xs px-4 py-2">اطلاعات بیشتر</button>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const filtered = activeTab === "all" ? courses : courses.filter((c) => c.category === activeTab);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-[#f9fafb]">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <section className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">دوره‌های آموزشی چرتکه ویرا</h1>
            <p className="mt-3 text-slate-500 text-base leading-relaxed">دوره‌ای مناسب برای هر سطح و هر سن</p>
          </section>

          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.value
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                    : "bg-white text-slate-500 border border-gray-200 hover:bg-gray-50 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <CourseCard key={course.title} course={course} />
            ))}
          </div>

          <section className="mt-16">
            <div className="bright-card p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">دوره مورد نظرتان را پیدا نکردید؟</h2>
                <p className="mt-2 text-slate-500 text-sm sm:text-base">با کارشناسان ما تماس بگیرید</p>
              </div>
              <a href="tel:02191309000" className="inline-flex items-center gap-2 btn-primary shrink-0">
                <Phone className="w-4 h-4" />۰۲۱-۹۱۳۰۹۰۰۰
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}