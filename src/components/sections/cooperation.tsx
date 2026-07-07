import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const institutions = [
  {
    icon: "🧒",
    title: "مهدکودک‌ها",
    desc: "قرارداد آموزشی با مهدکودک‌ها برای ارائه دوره‌های چرتکه مقدماتی متناسب با گروه سنی ۵ تا ۷ سال. آموزش در محیط آشنا و دوستانه کودک، با بازی‌های تعاملی و جذاب انجام می‌شود و نتایج چشمگیری در تقویت تمرکز و هوش ریاضی کودکان به همراه دارد.",
  },
  {
    icon: "🏫",
    title: "مدارس ابتدایی",
    desc: "همکاری با مدارس ابتدایی برای اجرای برنامه آموزش چرتکه به‌صورت فوق‌برنامه یا در قالب هنرستان ریاضی. ارائه دوره‌های تخصصی حساب ذهنی و چرتکه پیشرفته برای دانش‌آموزان پایه‌های اول تا ششم که منجر به ارتقای سطح ریاضی مدرسه و کسب رتبه‌های برتر در مسابقات می‌شود.",
  },
  {
    icon: "📚",
    title: "کانون‌های دانش‌آموزی",
    desc: "قرارداد با کانون‌های دانش‌آموزی و فرهنگی برای برگزاری دوره‌های چرتکه دهگانی در تمامی سطوح. کانون‌ها با بهره‌گیری از برند معتبر ویرا و اساتید مجرب، می‌توانند خدمت آموزشی متمایزی به اعضای خود ارائه دهند و جذب دانش‌آموز جدید داشته باشند.",
  },
  {
    icon: "🔬",
    title: "پژوهشسراها",
    desc: "همکاری با پژوهشسراهای دانش‌آموزی برای ارائه دوره‌های تخصصی و پیشرفته چرتکه و حساب ذهنی. این دوره‌ها در راستای اهداف پژوهشی و علمی پژوهشسراها طراحی شده و دانش‌آموزان را برای شرکت در مسابقات علمی و پژوهشی آماده می‌کند.",
  },
];

const coopBenefits = [
  { icon: "🤝", title: "قرارداد رسمی آموزشی", desc: "عقد قرارداد شفاف و رسمی با تعیین دقیق شرایط، تعرفه‌ها و برنامه آموزشی" },
  { icon: "🗺️", title: "پوشش سراسری", desc: "حضور فعال در استان‌ها و شهرهای مختلف کشور با شبکه نمایندگی‌های مجرب" },
  { icon: "👨‍🏫", title: "اساتید متخصص", desc: "اعزام اساتید آموزش‌دیده و مجرب ویرا به محل مؤسسه همکار" },
  { icon: "📋", title: "برنامه آموزشی استاندارد", desc: "ارائه سرفصل‌ها و برنامه آموزشی استاندارد ویرا متناسب با سطح و سن دانش‌آموزان" },
];

export default function Cooperation() {
  return (
    <section id="cooperation" className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            همکاری و نمایندگی
          </span>
          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            همکاری با مؤسسات آموزشی سراسر کشور
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            آموزشگاه چرتکه دهگانی ویرا با مهدکودک‌ها، مدارس، کانون‌های دانش‌آموزی و پژوهشسراها در شهرها و استان‌های مختلف کشور قرارداد آموزشی می‌بندد. همچنین در بسیاری از شهرها نمایندگی رسمی ویرا فعالیت می‌کند و خدمات آموزشی تخصصی چرتکه دهگانی را به کودکان و نوجوانان ارائه می‌دهد.
          </p>
        </div>

        {/* Institutions */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {institutions.map((inst) => (
            <div key={inst.title} className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{inst.icon}</span>
                <h3 className="text-lg font-bold text-foreground">{inst.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{inst.desc}</p>
            </div>
          ))}
        </div>

        {/* Coop Benefits */}
        <div className="mt-14">
          <h3 className="text-lg font-bold text-foreground text-center mb-8">مزایای همکاری با ویرا</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coopBenefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border/60 bg-card p-5 text-center">
                <span className="text-3xl">{b.icon}</span>
                <h4 className="font-bold text-foreground mt-2 text-sm">{b.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 text-center">
          <h3 className="text-lg font-bold text-foreground">
            دریافت نمایندگی ویرا در شهر شما
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
            اگر در زمینه آموزش کودکان فعالیت دارید و علاقه‌مند به همکاری با برند معتبر چرتکه دهگانی ویرا هستید، با ما تماس بگیرید. شرایط ویژه‌ای برای نمایندگی‌های جدید در شهرهای فاقد نماینده در نظر گرفته‌ایم.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl" asChild>
              <a href="#register">درخواست نمایندگی</a>
            </Button>
            <Button variant="outline" className="rounded-xl" asChild>
              <a href="#contact">تماس مشاوره</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}