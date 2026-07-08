import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";

const levels = [
  {
    level: 1,
    title: "مبتدی",
    subtitle: "شناخت چرتکه و اصول اولیه",
    duration: "۱۶ جلسه",
    age: "۵ تا ۱۴ سال",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    dotColor: "bg-emerald-500",
    skills: [
      "شناخت ساختار چرتکه",
      "جمع و تفریق یک‌رقمی",
      "تمرین حرکات دست",
      "آشنایی با عددنویسی چرتکه‌ای",
    ],
    highlight: null,
  },
  {
    level: 2,
    title: "متوسط",
    subtitle: "تسلط بر عملیات پایه",
    duration: "۲۴ جلسه",
    age: "۶ تا ۱۴ سال",
    color: "bg-teal-100 text-teal-800 border-teal-200",
    dotColor: "bg-teal-500",
    skills: [
      "جمع و تفریق چندرقمی",
      "ضرب و تقسیم مقدماتی",
      "افزایش سرعت محاسبه",
      "شروع تصویرسازی ذهنی",
    ],
    highlight: null,
  },
  {
    level: 3,
    title: "پیشرفته",
    subtitle: "محاسبه ذهنی پیشرفته",
    duration: "۲۴ جلسه",
    age: "۷ تا ۱۴ سال",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    dotColor: "bg-amber-500",
    skills: [
      "محاسبه کاملاً ذهنی (بدون چرتکه)",
      "اعمال کسری و اعشاری",
      "سرعت فوق‌العاده بالا",
      "حل مسائل ترکیبی",
    ],
    highlight: "محبوب‌ترین سطح",
  },
  {
    level: 4,
    title: "مسابقات",
    subtitle: "آمادگی برای رقابت‌ها",
    duration: "تا زمان مسابقه",
    age: "۸ تا ۱۴ سال",
    color: "bg-rose-100 text-rose-800 border-rose-200",
    dotColor: "bg-rose-500",
    skills: [
      "تکنیک‌های سرعت‌بخشی",
      "تمرینات زمان‌دار",
      "آشنایی با قوانین مسابقات",
      "شبیه‌سازی رقابت‌ها",
    ],
    highlight: "ظرفیت محدود",
  },
];

export default function Levels() {
  return (
    <section id="levels" className="py-16 sm:py-24 warm-gradient">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            سطوح آموزشی
          </span>
          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            مسیر یادگیری چرتکه
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            هر کودک از سطح مبتدی شروع می‌کند و با پیشرفت خود به سطوح بالاتر
            می‌رسد. تمام سطوح بر اساس استانداردهای بین‌المللی چرتکه طراحی
            شده‌اند.
          </p>
        </div>

        {/* Levels Path */}
        <div className="mt-14 relative">
          {/* Connecting line (desktop) */}
          <div className="absolute top-14 right-[12.5%] left-[12.5%] hidden lg:block h-0.5 bg-gradient-to-l from-emerald-300 via-amber-300 to-rose-300" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {levels.map((item) => (
              <div
                key={item.level}
                className="group relative rounded-2xl border border-border/60 bg-card p-6 transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                {/* Highlight Badge */}
                {item.highlight && (
                  <Badge className="absolute -top-3 right-4 bg-amber-500 text-amber-950 hover:bg-amber-400 text-xs font-bold px-3">
                    {item.highlight}
                  </Badge>
                )}

                {/* Level Number */}
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-white font-bold text-lg ${item.dotColor}`}
                  >
                    {item.level}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="mb-4 flex gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-muted px-2.5 py-1">
                    {item.duration}
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-1">
                    {item.age}
                  </span>
                </div>

                {/* Skills List */}
                <ul className="space-y-2">
                  {item.skills.map((skill) => (
                    <li key={skill} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-foreground/80">{skill}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant="outline"
                  className="mt-5 w-full rounded-xl text-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                  asChild
                >
                  <a href="#register">
                    ثبت‌نام این سطح
                    <ArrowLeft className="mr-1.5 h-4 w-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Age Recommendation */}
        <div className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 text-center">
          <h3 className="text-lg font-bold text-foreground">
            سن فرزندتان چقدر است؟
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
            بهترین سن شروع یادگیری چرتکه بین ۵ تا ۱۰ سالگی است.
            هرچه زودتر شروع کنید، تأثیر بیشتری بر رشد ذهنی کودک خواهد داشت.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {["۵ تا ۷ سال", "۷ تا ۱۰ سال", "۱۰ تا ۱۴ سال"].map(
              (age) => (
                <span
                  key={age}
                  className="rounded-full bg-card border border-border px-4 py-2 text-sm font-medium text-foreground"
                >
                  {age}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}