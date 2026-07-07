import { CheckCircle2 } from "lucide-react";

const highlights = [
  "تأسیس با بیش از ۱۰ سال سابقه در آموزش چرتکه",
  "استفاده از روش استاندارد دهگانی (ژاپنی)",
  "برگزاری دوره‌های حضوری و آنلاین",
  "حضور موفق در مسابقات کشوری و بین‌المللی",
  "ارائه گواهینامه معتبر پایان دوره",
  "پشتیبانی ۲۴ ساعته کارآموزان",
];

const stats = [
  { value: "۵۰۰+", label: "فارغ‌التحصیل موفق" },
  { value: "۴۵+", label: "رتبه برتر در مسابقات" },
  { value: "۱۰+", label: "سال فعالیت مستمر" },
  { value: "۳", label: "شعبه فعال" },
];

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">
            درباره آموزشگاه ویرا
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Text Column */}
          <div>
            <p className="text-base sm:text-lg text-foreground leading-relaxed mb-6">
              آموزشگاه چرتکه دهگانی ویرا از سال ۱۳۹۳ با هدف ارتقای سطح هوش ریاضی و
              مهارت‌های شناختی کودکان و نوجوانان ایرانی تأسیس شده است. ما با بهره‌گیری
              از روش نوین چرتکه دهگانی (مبتنی بر استاندارد ژاپنی)، بستری فراهم
              کرده‌ایم که یادگیری ریاضی را به تجربه‌ای جذاب و مؤثر تبدیل کند.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              مأموریت ما رشد همه‌جانبه ذهنی نسل آینده است. ما باور داریم هر کودکی
              ظرفیت‌های نهفته‌ای دارد که با آموزش صحیح و منظم، می‌تواند به بالاترین
              سطح توانمندی دست یابد.
            </p>

            {/* Highlight Points */}
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats Column */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-foreground mb-6">
              ویرا در یک نگاه
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-muted/50"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Extra info */}
            <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-bold text-primary">آیا می‌دانستید؟</span>{" "}
                کارآموزان آموزشگاه ویرا تاکنون موفق به کسب بیش از ۴۵ رتبه برتر
                کشوری در مسابقات چرتکه و محاسبات ذهنی شده‌اند.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}