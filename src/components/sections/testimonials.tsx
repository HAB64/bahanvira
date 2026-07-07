import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "سمیرا محمدی",
    role: "مادر سارینا ۸ ساله",
    initial: "س",
    text: "از وقتی سارینا کلاس چرتکه ویرا رو شروع کرده، خیلی تغییر کرده. هم نمره‌های ریاضیش عالی شده، هم تمرکزش خیلی بیشتر شده. واقعاً ممنونم از اساتید صبور و حرفه‌ای ویرا.",
    rating: 5,
  },
  {
    name: "رضا کریمی",
    role: "پدر امیرعلی ۱۰ ساله",
    initial: "ر",
    text: "امیرعلی تو مسابقه چرتکه استان رتبه اول رو کسب کرد. آموزش‌های ویرا واقعاً متفاوته و روش تدریسشون بسیار جذاب و علمیه. توصیه می‌کنم به همه والدین.",
    rating: 5,
  },
  {
    name: "نازنین احمدی",
    role: "مادر آریا ۶ ساله",
    initial: "ن",
    text: "آریا عاشق کلاس چرتکه شده! هر هفته با اشتیاق میره کلاس و حتی تو خونه هم تمرین می‌کنه. معلم‌ها خیلی با بچه‌ها مهربون و صبورن. خوشحالم که انتخاب ویرا بودیم.",
    rating: 5,
  },
  {
    name: "مهدی حسینی",
    role: "پدر فاطمه ۱۲ ساله",
    initial: "م",
    text: "فاطمه با آموزش حساب ذهنی ویرا توانایی محاسبه سریع ذهنی رو پیدا کرده. الان تو کلاس ریاضی مدرسه از همه سریع‌تره و اعتماد به نفسش خیلی بالا رفته.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            نظرات والدین
          </span>
          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            خانواده‌ها درباره ویرا چه می‌گویند؟
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            رضایت والدین و موفقیت فرزندانشان، بزرگ‌ترین افتخار ماست. نظرات واقعی والدین کارآموزان ویرا را در ادامه بخوانید.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative rounded-2xl border border-border/60 bg-card p-6 transition-all hover:shadow-lg"
            >
              <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/10" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground/85 mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-border/50 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}