"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Clock, ThumbsUp } from "lucide-react";

const stats = [
  { value: "۵۰۰+", label: "کارآموز فعال", icon: Users },
  { value: "۴۵+", label: "رتبه برتر کشوری", icon: Trophy },
  { value: "۱۰+", label: "سال تجربه", icon: Clock },
  { value: "۹۸٪", label: "رضایت والدین", icon: ThumbsUp },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden abacus-gradient pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pt-28 lg:pb-36"
    >
      {/* Decorative background elements */}
      <div className="absolute top-[-5%] right-[-5%] h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute top-[20%] left-[-8%] h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[15%] h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="absolute bottom-[10%] left-[20%] h-40 w-40 rounded-full bg-white/5 blur-2xl" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="text-center mb-6 animate-[fadeInDown_0.6s_ease-out]">
          <Badge
            variant="secondary"
            className="bg-white/15 text-white border border-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 ml-2 animate-pulse" />
            آموزشگاه تخصصی چرتکه دهگانی ویرا
          </Badge>
        </div>

        {/* Main Heading */}
        <h1 className="text-center text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight text-white max-w-4xl mx-auto animate-[fadeInUp_0.7s_ease-out_0.1s_both]">
          آموزش چرتکه و محاسبات ذهنی
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-center text-base sm:text-lg lg:text-xl leading-relaxed text-white/80 sm:text-white/85 max-w-2xl mx-auto animate-[fadeInUp_0.7s_ease-out_0.25s_both]">
          با روش نوین چرتکه دهگانی ویرا، فرزند شما قابلیت‌های ذهنی خود را شکوفا می‌کند.
          افزایش تمرکز، تقویت حافظه، سرعت عمل در محاسبات و اعتماد به نفس بالا،
          تنها بخشی از دستاوردهای آموزش چرتکه برای کودکان و نوجوانان است.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fadeInUp_0.7s_ease-out_0.4s_both]">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white font-bold rounded-xl px-8 py-6 text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
            asChild
          >
            <a href="#register">
              شروع یادگیری
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-xl px-8 py-6 text-base transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
            asChild
          >
            <a href="#courses">
              مشاهده دوره‌ها
            </a>
          </Button>
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-3xl mx-auto animate-[fadeInUp_0.7s_ease-out_0.55s_both]">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center group"
              >
                <div className="flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5 text-white/50 ml-1.5 group-hover:text-accent transition-colors duration-300" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                    {stat.value}
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-white/60 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}