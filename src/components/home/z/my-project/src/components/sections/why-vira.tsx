import { Button } from "@/components/ui/button";

const stats = [
  { value: "۵۰۰+", label: "کارآموز فعال" },
  { value: "۲۰+", label: "شهر و استان" },
  { value: "۳۰+", label: "نمایندگی فعال" },
  { value: "۱۰۰+", label: "قرارداد آموزشی" },
];

const benefits = [
  {
    icon: "🎯",
    title: "تقویت تمرکز",
    desc: "تمرینات چرتکه باعث افزایش چشمگیر تمرکز و دقت توجه کودک در تمامی فعالیت‌های روزانه و تحصیلی می‌شود.",
  },
  {
    icon: "⚡",
    title: "افزایش سرعت محاسبه",
    desc: "دانش‌آموزان چرتکه آموزش‌دیده، توانایی محاسبات ذهنی بسیار سریع‌تر از همسالان خود را کسب می‌کنند.",
  },
  {
    icon: "🧠",
    title: "تقویت حافظه",
    desc: "تصویرسازی ذهنی چرتکه و تمرینات مرتبط، حافظه کوتاه‌مدت و بلندمدت کودک را به‌طور مؤثری تقویت می‌کند.",
  },
  {
    icon: "💪",
    title: "اعتماد به نفس",
    desc: "موفقیت در محاسبات ذهنی و کسب رتبه‌های برتر، اعتماد به نفس کودک را در تمامی جنبه‌های زندگی افزایش می‌دهد.",
  },
  {
    icon: "🎨",
    title: "خلاقیت و تفکر",
    desc: "آموزش چرتکه نیمکره راست مغز را فعال کرده و خلاقیت، تفکر تحلیلی و مهارت حل مسئله را تقویت می‌کند.",
  },
  {
    icon: "📊",
    title: "عملکرد تحصیلی بهتر",
    desc: "تحقیقات نشان داده کودکان آموزش‌دیده چرتکه، میانگین نمرات بالاتری در دروس مختلف به‌ویژه ریاضی کسب می‌کنند.",
  },
];

export default function WhyVira() {
  return (
    <section id="why" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            چرا ویرا
          </span>
          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            اعتماد والدین، افتخار ما
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            سال‌ها تجربه آموزش تخصصی چرتکه دهگانی و رضایت بالای والدین، بهترین تضمین کیفیت خدمات آموزشی ماست. آمار و ارقام گویای تعهد ما به تعالی آموزشی است.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border/60 bg-card p-5 text-center">
              <div className="text-2xl font-extrabold text-primary sm:text-3xl">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mt-14">
          <h3 className="text-lg font-bold text-foreground text-center mb-8">مزایای آموزش چرتکه دهگانی</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border/60 bg-card p-5 transition-all hover:shadow-md">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h4 className="font-bold text-foreground">{b.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}