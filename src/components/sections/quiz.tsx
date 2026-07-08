"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, RotateCcw, ArrowLeft } from "lucide-react";

const questions = [
  {
    id: 1,
    title: "هدف اصلی شما چیست؟",
    options: [
      {
        label: "بهبود نمرات ریاضی فرزندم",
        value: "math",
      },
      {
        label: "تقویت تمرکز و حافظه",
        value: "focus",
      },
      {
        label: "مشارکت در مسابقات",
        value: "compete",
      },
      {
        label: "تفریح و سرگرمی هوشمند",
        value: "fun",
      },
    ],
  },
  {
    id: 2,
    title: "سن فرزند شما چقدر است؟",
    options: [
      { label: "۵ تا ۷ سال", value: "5-7" },
      { label: "۷ تا ۱۰ سال", value: "7-10" },
      { label: "۱۰ تا ۱۴ سال", value: "10-14" },
    ],
  },
  {
    id: 3,
    title: "آیا فرزندتان قبلاً چرتکه کار کرده؟",
    options: [
      { label: "خیر، تازه شروع می‌کنیم", value: "no" },
      { label: "بله، کمی تجربه دارد", value: "some" },
      { label: "بله، در سطح بالایی است", value: "yes" },
    ],
  },
];

const results: Record<string, { level: string; desc: string; color: string }> = {
  "math_5-7_no": { level: "سطح ۱ (مبتدی)", desc: "با توجه به سن کم فرزندتان و هدف بهبود ریاضی، سطح مبتدی بهترین نقطه شروع است.", color: "border-emerald-400 bg-emerald-50/50" },
  "math_7-10_no": { level: "سطح ۱ (مبتدی)", desc: "سن مناسب برای شروع! از سطح مبتدی شروع می‌کنید و سریعاً پیشرفت خواهید کرد.", color: "border-emerald-400 bg-emerald-50/50" },
  "math_10-14_no": { level: "سطح ۱ (مبتدی) — فشرده", desc: "با توجه به سن بالاتر، ممکن است پیشرفت سریع‌تری داشته باشید. مشاوران ما برنامه فشرده پیشنهاد می‌دهند.", color: "border-emerald-400 bg-emerald-50/50" },
  "focus_no": { level: "سطح ۱ (مبتدی)", desc: "تمرینات چرتکه از همان جلسات اول بر تمرکز تأثیر می‌گذارد. سطح مبتدی بهترین انتخاب است.", color: "border-emerald-400 bg-emerald-50/50" },
  "compete_no": { level: "سطح ۱ → مسیر سریع به سطح ۴", desc: "برای مسابقات باید از مبانی قوی شروع کنید. مشاوران ما مسیر تسریع‌شده طراحی می‌کنند.", color: "border-rose-400 bg-rose-50/50" },
  "fun_no": { level: "سطح ۱ (مبتدی)", desc: "یادگیری چرتکه برای کودکان بسیار جذاب و سرگرم‌کننده است! از سطح مبتدی لذت ببرید.", color: "border-emerald-400 bg-emerald-50/50" },
  "math_some": { level: "سطح ۲ (متوسط)", desc: "با تجربه قبلی، می‌توانید مستقیماً سطح متوسط را شروع کنید.", color: "border-teal-400 bg-teal-50/50" },
  "focus_some": { level: "سطح ۲ (متوسط)", desc: "ادامه یادگیری از سطح متوسط، تأثیر بیشتری بر تمرکز و حافظه خواهد داشت.", color: "border-teal-400 bg-teal-50/50" },
  "compete_some": { level: "سطح ۲ → ۳", desc: "با تجربه قبلی، مسیر سریع‌تری به سمت سطح مسابقات دارید.", color: "border-amber-400 bg-amber-50/50" },
  "math_yes": { level: "سطح ۳ (پیشرفته)", desc: "فرزندتان پایه قوی دارد! سطح پیشرفته چالش‌های جدیدی برایش ایجاد می‌کند.", color: "border-amber-400 bg-amber-50/50" },
  "compete_yes": { level: "سطح ۴ (مسابقات)", desc: "عالی! با تجربه قبلی، مستقیماً وارد camp مسابقات شوید.", color: "border-rose-400 bg-rose-50/50" },
  "focus_yes": { level: "سطح ۳ (پیشرفته)", desc: "در سطح پیشرفته، تصویرسازی ذهنی به شدت تمرکز و حافظه را تقویت می‌کند.", color: "border-amber-400 bg-amber-50/50" },
};

function getResultKey(answers: Record<number, string>): string {
  const goal = answers[1] || "math";
  const age = answers[2] || "7-10";
  const exp = answers[3] || "no";

  const directKey = `${goal}_${exp}`;
  if (results[directKey]) return directKey;
  const ageKey = `${goal}_${age}_${exp}`;
  if (results[ageKey]) return ageKey;

  // Fallbacks
  if (exp === "yes") return `${goal}_yes`;
  if (exp === "some") return `${goal}_some`;
  return `${goal}_${age}_no`;
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const currentQ = questions[step];

  function handleSelect(value: string) {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  }

  function handleReset() {
    setStep(0);
    setAnswers({});
    setShowResult(false);
  }

  const resultKey = getResultKey(answers);
  const result = results[resultKey] || results["math_7-10_no"];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent-foreground">
            تست هوشمند
          </span>
          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            فرزند شما کدام سطح است؟
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            با پاسخ به ۳ سوال کوتاه، بهترین سطح آموزشی را برای فرزندتان
            پیدا کنید.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          {!showResult ? (
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardContent className="p-6 sm:p-8">
                {/* Progress */}
                <div className="mb-6 flex items-center justify-center gap-2">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i <= step
                          ? "w-8 bg-primary"
                          : "w-2 bg-muted"
                      }`}
                    />
                  ))}
                </div>

                <h3 className="text-center text-lg font-bold text-foreground">
                  {currentQ.title}
                </h3>

                <div className="mt-6 space-y-3">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className="w-full rounded-xl border border-border bg-card px-5 py-3.5 text-right text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-primary/5 hover:shadow-sm active:scale-[0.98]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className={`border-2 ${result.color} shadow-lg`}>
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  پیشنهاد ما برای شما:
                </h3>
                <p className="mt-2 text-2xl font-extrabold text-primary">
                  {result.level}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {result.desc}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6"
                    asChild
                  >
                    <a href="#register">
                      ثبت‌نام
                      <ArrowLeft className="mr-1.5 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl px-6"
                    onClick={handleReset}
                  >
                    <RotateCcw className="ml-1.5 h-4 w-4" />
                      آزمون مجدد
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}