import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Clock, Users, ArrowLeft } from "lucide-react";

const courses = [
  {
    title: "دوره چرتکه مقدماتی",
    level: "مقدماتی",
    age: "۵ تا ۸ سال",
    desc: "آشنایی با چرتکه دهگانی، یادگیری اعداد و عملیات ساده جمع و تفریق. این دوره مبنای اصلی آموزش چرتکه است و کودکان با بازی‌های آموزشی جذاب با مفاهیم پایه آشنا می‌شوند.",
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
    highlight: null,
  },
  {
    title: "دوره حساب ذهنی متوسط",
    level: "متوسط",
    age: "۷ تا ۱۱ سال",
    desc: "گذر از چرتکه فیزیکی به محاسبات ذهنی. کودکان یاد می‌گیرند بدون استفاده از چرتکه فیزیکی، عملیات ریاضی را در ذهن خود انجام دهند و سرعت محاسبه آن‌ها به‌طور چشمگیری افزایش می‌یابد.",
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
    highlight: null,
  },
  {
    title: "دوره چرتکه پیشرفته",
    level: "پیشرفته",
    age: "۹ تا ۱۵ سال",
    desc: "عملیات پیچیده ریاضی شامل ضرب و تقسیم چندرقمی، اعشار و کاربرد چرتکه در مسائل روزمره. این دوره دانش‌آموزان را برای شرکت در مسابقات داخلی و بین‌المللی آماده می‌کند.",
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
    highlight: null,
  },
  {
    title: "دوره آمادگی مسابقات",
    level: "پیشرفته",
    age: "۸ تا ۱۵ سال",
    desc: "آمادگی تخصصی برای شرکت در مسابقات چرتکه داخلی و بین‌المللی. تمرینات فشرده سرعت و دقت، شبیه‌سازی شرایط مسابقه و تکنیک‌های مدیریت زمان.",
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
    highlight: null,
  },
];

export default function Courses() {
  return (
    <section id="courses" className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            دوره‌های آموزشی
          </span>
          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            دوره‌های تخصصی ویرا
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            دوره‌های آموزشی ما با بهره‌گیری از جدیدترین روش‌های آموزشی و با هدف تقویت مهارت‌های ذهنی و ریاضی کودکان و نوجوانان طراحی شده‌اند.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course.title}
              className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{course.title}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">{course.level}</Badge>
                    <span className="text-xs text-muted-foreground">{course.age}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground mb-5">
                {course.desc}
              </p>

              <ul className="space-y-2 mb-6">
                {course.skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-foreground/80">{skill}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {course.sessions} جلسه
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-xs text-muted-foreground">شهریه</span>
                  <p className="text-lg font-extrabold text-primary">{course.price}<span className="text-xs font-normal text-muted-foreground mr-1">تومان</span></p>
                </div>
              </div>

              <Button className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl" asChild>
                <a href="#register">ثبت‌نام و مشاوره رایگان</a>
              </Button>
            </div>
          ))}

          {/* View all courses button */}
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl gap-2 px-8 border-2 hover:bg-primary/5 hover:text-primary hover:border-primary/30"
              asChild
            >
              <a href="/courses">
                مشاهده همه دوره‌ها
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}