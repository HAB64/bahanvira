import {
  Brain,
  Eye,
  Zap,
  Heart,
  Target,
  TrendingUp,
} from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "سرعت محاسبه ذهنی",
    description:
      "کودکان پس از یادگیری چرتکه، عملیات جمع، تفریق، ضرب و تقسیم را بدون ماشین‌حساب و با سرعت بالا انجام می‌دهند. این مهارت پایه‌ای قوی برای ریاضیات مدرسه و زندگی روزمره ایجاد می‌کند.",
  },
  {
    icon: Brain,
    title: "تقویت تمرکز و حافظه",
    description:
      "تمرین منظم چرتکه نیمکره چپ و راست مغز را همزمان فعال می‌کند. تحقیقات نشان داده کودکانی که چرتکه کار می‌کنند، تمرکز و حافظه کوتاه‌مدت بهتری دارند.",
  },
  {
    icon: Eye,
    title: "تصویرسازی ذهنی",
    description:
      "در سطوح بالاتر، کودکان یاد می‌گیرند بدون چرتکه فیزیکی و فقط با تصویرسازی ذهنی محاسبات را انجام دهند. این مهارت خلاقیت و توانایی حل مسئله را به شدت افزایش می‌دهد.",
  },
  {
    icon: Heart,
    title: "اعتمادبه‌نفس",
    description:
      "هنگامی که کودک می‌بیند می‌تواند محاسبات پیچیده را سریع‌تر از بزرگسالان حل کند، اعتمادبه‌نفس او به شدت افزایش یافته و این اعتمادبه‌نفس به سایر حوزه‌های زندگی هم سرایت می‌کند.",
  },
  {
    icon: Target,
    title: "دقت و توجه به جزئیات",
    description:
      "آموزش چرتکه نیازمند دقت بالا در جایگذاری مهره‌ها و انجام عملیات است. این تمرین مستمر، دقت و توجه به جزئیات را در کودکان تقویت می‌کند.",
  },
  {
    icon: TrendingUp,
    title: "پیشرفت تحصیلی",
    description:
      "بسیاری از والدین گزارش کرده‌اند که پس از ثبت‌نام فرزندانشان در دوره چرتکه، نمرات ریاضی و حتی دروس دیگر بهبود قابل توجهی داشته است.",
  },
];

export default function WhyAbacus() {
  return (
    <section id="why" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            چرا چرتکه؟
          </span>
          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            چرتکه چه تأثیری روی فرزند شما دارد؟
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            چرتکه فقط یک ابزار محاسبه نیست — یک برنامه تمرینی کامل برای ذهن
            کودکان است که مهارت‌های اساسی زندگی را تقویت می‌کند.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}