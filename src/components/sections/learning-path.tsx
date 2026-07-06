import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";

const pathItems = [
  {
    title: "چرتکه مقدماتی",
    en: "Beginner Abacus",
    desc: "شروع مسیر یادگیری با آشنایی ساختار چرتکه و مفاهیم پایه اعداد و عملیات ساده",
    icon: "🔢",
  },
  {
    title: "حساب ذهنی",
    en: "Mental Math",
    desc: "تقویت توانایی محاسبات ذهنی بدون نیاز به چرتکه فیزیکی و افزایش سرعت عمل",
    icon: "🧠",
  },
  {
    title: "چرتکه پیشرفته",
    en: "Advanced Abacus",
    desc: "تسلط بر عملیات پیچیده و آمادگی برای مسابقات و آزمون‌های تخصصی",
    icon: "⚡",
  },
  {
    title: "آمادگی مسابقات",
    en: "Competition Prep",
    desc: "تمرینات فشرده و تکنیک‌های ویژه برای کسب رتبه برتر در مسابقات",
    icon: "🏆",
  },
];

export default function LearningPath() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            حوزه‌های آموزشی
          </span>
          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            مسیر آموزشی ویرا
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            ما در آموزشگاه ویرا، مسیر آموزشی منسجم و علمی را برای رشد مهارت‌های ریاضی و ذهنی فرزند شما طراحی کرده‌ایم. هر حوزه آموزشی با هدف تقویت توانمندی‌های خاص کودک برنامه‌ریزی شده است.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pathItems.map((item) => (
            <div
              key={item.en}
              className="group rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 text-center"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-3 font-mono" dir="ltr">{item.en}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}