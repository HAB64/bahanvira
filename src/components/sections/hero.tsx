"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden abacus-gradient pt-12 pb-20 sm:pt-20 sm:pb-28"
    >
      <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-amber-400/10 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <Badge variant="secondary" className="bg-white/15 text-white border-white/20 backdrop-blur-sm">
            روش نوین آموزش چرتکه دهگانی
          </Badge>
        </div>

        <h1 className="text-center text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl max-w-3xl mx-auto">
          آموزش چرتکه دهگانی
          <br />
          و حساب ذهنی
        </h1>

        <p className="mt-5 text-center text-base leading-relaxed text-white/85 sm:text-lg max-w-2xl mx-auto">
          با آموزش تخصصی چرتکه دهگانی ویرا، فرزند شما علاوه بر تسلط بر محاسبات ذهنی، تمرکز، اعتماد به نفس و هوش ریاضی خود را به‌طور چشمگیری تقویت می‌کند.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-xl px-6 shadow-lg" asChild>
            <a href="#register">ثبت‌نام مشاوره رایگان</a>
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-6" asChild>
            <a href="#courses">مشاهده دوره‌ها</a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-white sm:text-4xl">۵۰۰+</div>
            <div className="text-sm text-white/70 mt-1">کارآموز</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-white sm:text-4xl">۴۵+</div>
            <div className="text-sm text-white/70 mt-1">رتبه برتر</div>
          </div>
        </div>
      </div>
    </section>
  );
}