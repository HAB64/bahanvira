"use client";

import { useState } from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  Clock,
  Users,
  Calculator,
  Brain,
  Trophy,
  Medal,
  ArrowLeft,
  Star,
  GraduationCap,
  BookOpen,
  Target,
  Sparkles,
} from "lucide-react";

/* ───────────────── course data ───────────────── */

const courses = [
  {
    title: "دوره چرتکه مقدماتی",
    level: "مقدماتی" as const,
    levelColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    age: "۵ تا ۸ سال",
    description:
      "آشنایی با چرتکه دهگانی، یادگیری اعداد و عملیات ساده جمع و تفریق. این دوره مبنای اصلی آموزش چرتکه است و کودکان با بازی‌های آموزشی جذاب با مفاهیم پایه آشنا می‌شوند.",
    skills: [
      "آشنایی با ساختار چرتکه دهگانی",
      "یادگیری اعداد ۱ تا ۹۹۹",
      "جمع و تفریق یک‌رقمی و دو‌رقمی",
      "بازی‌های تعاملی و آموزشی",
      "تقویت تمرکز و دقت",
    ],
    duration: "۳ ماه",
    sessions: 24,
    price: "۲,۸۰۰,۰۰۰",
    icon: Calculator,
    gradient: "from-amber-400 to-orange-500",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    title: "دوره حساب ذهنی متوسط",
    level: "متوسط" as const,
    levelColor: "bg-blue-100 text-blue-700 border-blue-200",
    age: "۷ تا ۱۱ سال",
    description:
      "گذر از چرتکه فیزیکی به محاسبات ذهنی. کودکان یاد می‌گیرند بدون استفاده از چرتکه فیزیکی، عملیات ریاضی را در ذهن خود انجام دهند و سرعت محاسبه آن‌ها به‌طور چشمگیری افزایش می‌یابد.",
    skills: [
      "محاسبات ذهنی جمع و تفریق",
      "ضرب و تقسیم پایه",
      "تصویرسازی ذهنی چرتکه",
      "افزایش سرعت محاسبه ۳ برابری",
      "تمرینات تمرکز حسی",
    ],
    duration: "۴ ماه",
    sessions: 32,
    price: "۳,۵۰۰,۰۰۰",
    icon: Brain,
    gradient: "from-teal-400 to-emerald-500",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    title: "دوره چرتکه پیشرفته",
    level: "پیشرفته" as const,
    levelColor: "bg-purple-100 text-purple-700 border-purple-200",
    age: "۹ تا ۱۵ سال",
    description:
      "عملیات پیچیده ریاضی شامل ضرب و تقسیم چندرقمی، اعشار و کاربرد چرتکه در مسائل روزمره. این دوره دانش‌آموزان را برای شرکت در مسابقات داخلی و بین‌المللی آماده می‌کند.",
    skills: [
      "ضرب و تقسیم چندرقمی ذهنی",
      "محاسبات اعشاری",
      "حل مسائل ترکیبی",
      "آمادگی مسابقات داخلی",
      "گواهینامه رسمی پایان دوره",
    ],
    duration: "۶ ماه",
    sessions: 48,
    price: "۴,۸۰۰,۰۰۰",
    icon: Trophy,
    gradient: "from-rose-400 to-pink-500",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    title: "دوره آمادگی مسابقات",
    level: "پیشرفته" as const,
    levelColor: "bg-purple-100 text-purple-700 border-purple-200",
    age: "۸ تا ۱۵ سال",
    description:
      "آمادگی تخصصی برای شرکت در مسابقات چرتکه داخلی و بین‌المللی. تمرینات فشرده سرعت و دقت، شبیه‌سازی شرایط مسابقه و تکنیک‌های مدیریت زمان.",
    skills: [
      "تمرینات سرعت و دقت فشرده",
      "شبیه‌سازی آزمون مسابقه",
      "تکنیک‌های مدیریت زمان",
      "مشاوره روانشناسی مسابقات",
      "شرکت در مسابقات ملی",
    ],
    duration: "۲ ماه",
    sessions: 16,
    price: "۲,۵۰۰,۰۰۰",
    icon: Medal,
    gradient: "from-violet-400 to-purple-500",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
];

const learningPath = [
  {
    label: "مقدماتی",
    icon: Star,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    borderColor: "border-emerald-300",
    ringColor: "ring-emerald-200",
    description: "یادگیری اصول پایه",
  },
  {
    label: "متوسط",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-300",
    ringColor: "ring-blue-200",
    description: "محاسبات ذهنی",
  },
  {
    label: "پیشرفته",
    icon: GraduationCap,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-300",
    ringColor: "ring-purple-200",
    description: "عملیات پیچیده",
  },
  {
    label: "مسابقات",
    icon: Target,
    color: "text-rose-600",
    bgColor: "bg-rose-100",
    borderColor: "border-rose-300",
    ringColor: "ring-rose-200",
    description: "آمادگی رقابتی",
  },
];

/* ───────────────── Course Card ───────────────── */

function CourseCard({
  course,
}: {
  course: (typeof courses)[number];
}) {
  const IconComp = course.icon;

  return (
    <Card className="overflow-hidden border-border/60 hover:shadow-xl transition-all duration-300 group py-0 gap-0">
      {/* Image placeholder with gradient */}
      <div
        className={`relative h-44 bg-gradient-to-br ${course.gradient} flex items-center justify-center overflow-hidden`}
      >
        {/* Decorative circles */}
        <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
        <div
          className={`absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/5`}
        />

        {/* Icon */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <IconComp className="h-8 w-8 text-white" />
          </div>
          <span className="text-white/80 text-sm font-medium">
            {course.level}
          </span>
        </div>
      </div>

      <CardHeader className="pt-5 pb-0 px-6">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg font-bold text-foreground leading-relaxed">
            {course.title}
          </CardTitle>
          <Badge
            variant="outline"
            className={`text-xs font-semibold shrink-0 ${course.levelColor}`}
          >
            {course.level}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 pt-3 flex flex-col gap-4">
        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {course.description}
        </p>

        {/* Skills */}
        <ul className="space-y-2">
          {course.skills.map((skill) => (
            <li key={skill} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-foreground/80">{skill}</span>
            </li>
          ))}
        </ul>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {course.age}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            {course.sessions} جلسه
          </span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div>
            <span className="text-[10px] text-muted-foreground block">
              شهریه دوره
            </span>
            <p className="text-xl font-extrabold text-primary">
              {course.price}
              <span className="text-xs font-normal text-muted-foreground mr-1">
                تومان
              </span>
            </p>
          </div>
          <Button
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl px-6 shadow-sm hover:shadow-md transition-all"
            asChild
          >
            <a href="/#register">ثبت‌نام</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* ───────────────── Learning Path ───────────────── */

function LearningPath() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-accent" />
          مسیر یادگیری
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          از مبتدی تا حرفه‌ای، مسیر رشد خود را طی کنید
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
        {learningPath.map((step, i) => {
          const StepIcon = step.icon;
          return (
            <div key={step.label} className="flex items-center gap-4 sm:gap-0">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 rounded-2xl ${step.bgColor} ${step.borderColor} border-2 flex items-center justify-center shadow-sm ring-4 ${step.ringColor}`}
                >
                  <StepIcon className={`h-7 w-7 ${step.color}`} />
                </div>
                <span
                  className={`mt-2 text-sm font-bold ${step.color}`}
                >
                  {step.label}
                </span>
                <span className="text-[11px] text-muted-foreground mt-0.5">
                  {step.description}
                </span>
              </div>
              {i < learningPath.length - 1 && (
                <ArrowLeft className="hidden sm:block h-6 w-6 text-muted-foreground/40 mx-3 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────── Main Page ───────────────── */

export default function CoursesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-10 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
              آموزش تخصصی
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
              دوره‌های آموزشی
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              دوره‌های آموزشی ما با بهره‌گیری از جدیدترین روش‌های آموزشی و با
              هدف تقویت مهارت‌های ذهنی و ریاضی کودکان و نوجوانان طراحی
              شده‌اند.
            </p>
          </div>
        </section>

        {/* Learning Path */}
        <section className="py-8 sm:py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <LearningPath />
          </div>
        </section>

        {/* Course Cards Grid */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {courses.map((course) => (
                <CourseCard key={course.title} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-2xl bg-gradient-to-br from-primary to-blue-800 p-8 sm:p-12 shadow-xl text-white relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/5" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold">
                  هنوز مطمئن نیستید؟
                </h2>
                <p className="mt-3 text-white/80 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                  با مشاوران ما تماس بگیرید تا بهترین دوره را متناسب با سن و سطح
                  فرزندتان پیشنهاد دهند. مشاوره اولیه کاملاً رایگان است.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl px-8 shadow-lg"
                    asChild
                  >
                    <a href="/#register">ثبت‌نام و مشاوره رایگان</a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-xl px-8 border-white/30 text-white hover:bg-white/10 hover:text-white"
                    asChild
                  >
                    <a href="/abacus">چرتکه مجازی را امتحان کنید</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}