"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const provinces = [
  "آذربایجان شرقی","آذربایجان غربی","اردبیل","اصفهان","البرز","ایلام","بوشهر",
  "تهران","چهارمحال و بختیاری","خراسان جنوبی","خراسان رضوی","خراسان شمالی",
  "خوزستان","زنجان","سمنان","سیستان و بلوچستان","فارس","قزوین","قم",
  "کردستان","کرمان","کرمانشاه","کهگیلویه و بویراحمد","گلستان","گیلان",
  "لرستان","مازندران","مرکزی","هرمزگان","همدان","یزد",
];

const courseOptions = ["چرتکه مقدماتی","حساب ذهنی متوسط","چرتکه پیشرفته","آمادگی مسابقات"];

const features = [
  { icon: "👩‍🏫", title: "مشاوره تخصصی", desc: "ارزیابی سطح و ارائه برنامه آموزشی مناسب" },
  { icon: "🧮", title: "کلاس آزمایشی", desc: "شرکت در یک جلسه آزمایشی رایگان" },
  { icon: "🎁", title: "تخفیف ویژه", desc: "تخفیف ۱۵٪ برای ثبت‌نام آنلاین" },
];

export default function ConsultForm() {
  return (
    <section id="register" className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            مشاوره رایگان
          </span>
          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            فرم مشاوره رایگان
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            با تکمیل فرم زیر، مشاوران آموزشی ما با شما تماس خواهند گرفت و بهترین مسیر آموزشی را بر اساس سن و سطح فرزندتان پیشنهاد می‌دهند. مشاوره ما کاملاً رایگان و بدون تعهد است.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-border/60 bg-card p-4 text-center">
              <span className="text-2xl">{f.icon}</span>
              <h4 className="font-bold text-foreground mt-2 text-sm">{f.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">نام و نام خانوادگی</Label>
                <Input id="name" placeholder="نام شما" required className="h-11 text-right rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">شماره تماس</Label>
                <Input id="phone" placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr" required className="h-11 text-right rounded-xl" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>استان</Label>
                <Select>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="انتخاب استان" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">سن فرزند</Label>
                <Input id="age" placeholder="مثلاً ۷ سال" className="h-11 text-right rounded-xl" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>دوره مورد نظر</Label>
              <Select>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  {courseOptions.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="code">کد تخفیف</Label>
                <Input id="code" placeholder="مثال: VIRA-A3K9" dir="ltr" className="h-11 text-right rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">سؤال یا توضیحات اضافی</Label>
                <Input id="notes" placeholder="سؤال یا توضیحات اضافی..." className="h-11 text-right rounded-xl" />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-base">
              ارسال درخواست مشاوره
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}