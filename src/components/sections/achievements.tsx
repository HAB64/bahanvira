import { Medal, Trophy, Users, GraduationCap } from "lucide-react";

const achievements = [
  {
    icon: Medal,
    title: "۵۰+ مدال استانی",
    description: "دانش‌آموزان بهان ویرا تاکنون بیش از ۵۰ مدال در مسابقات استانی چرتکه کسب کرده‌اند.",
  },
  {
    icon: Trophy,
    title: "۱۲ مدال کشوری",
    description: "حضور موفق در مسابقات کشوری و کسب رتبه‌های برتر توسط دانش‌آموزان آموزشگاه.",
  },
  {
    icon: Users,
    title: "۳,۰۰۰+ دانش‌آموز",
    description: "بیش از سه هزار کودک و نوجوان از آموزشگاه بهان ویرا فارغ‌التحصیل شده‌اند.",
  },
  {
    icon: GraduationCap,
    title: "مربیان مجرب بین‌المللی",
    description: "تمامی مربیان دارای گواهینامه بین‌المللی آموزش چرتکه و سال‌ها تجربه هستند.",
  },
];

export default function Achievements() {
  return (
    <section className="py-16 sm:py-24 abacus-gradient text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white border border-white/20">
            افتخارات ما
          </span>
          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl text-white">
            دستاوردهای آموزشگاه بهان ویرا
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 text-center transition-all hover:bg-white/15"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}