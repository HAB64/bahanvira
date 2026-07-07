"use client";

import { useState, useCallback } from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { RotateCcw, Info, ChevronDown, ChevronUp } from "lucide-react";

/* ───────────────── helpers ───────────────── */

const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

function toPersianNum(n: number): string {
  return n.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}

const COLUMN_LABELS = ["صدم‌ها", "دهم‌ها", "یکان", "دهگان", "صدگان"];

interface ColumnState {
  heavenActive: boolean;
  earthActive: number;
}

const NUM_COLUMNS = 5;

function makeInitial(): ColumnState[] {
  return Array.from({ length: NUM_COLUMNS }, () => ({
    heavenActive: false,
    earthActive: 0,
  }));
}

function columnValue(col: ColumnState): number {
  return (col.heavenActive ? 5 : 0) + col.earthActive;
}

/* ───────────────── Single Column ───────────────── */

function AbacusColumn({
  state,
  index,
  onToggleHeaven,
  onToggleEarth,
}: {
  state: ColumnState;
  index: number;
  onToggleHeaven: () => void;
  onToggleEarth: (beadIndex: number) => void;
}) {
  const val = columnValue(state);

  return (
    <div className="flex flex-col items-center" style={{ width: 60 }}>
      {/* Column label */}
      <span className="text-[10px] sm:text-xs font-bold text-amber-700/60 mb-1.5 select-none">
        {COLUMN_LABELS[index]}
      </span>

      {/* Column container */}
      <div className="relative flex flex-col items-center" style={{ height: 260, width: 52 }}>
        {/* Vertical rod */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[3px] h-full rounded-full bg-gradient-to-b from-amber-500/50 via-amber-600/70 to-amber-500/50 z-0" />

        {/* ─── Heaven area (top half) ─── */}
        <div className="relative flex-1 flex items-end justify-center w-full pb-0 z-10">
          <button
            onClick={onToggleHeaven}
            className={`
              w-11 h-11 sm:w-12 sm:h-12 rounded-full border-[3px] transition-all duration-300 ease-out select-none
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
              ${
                state.heavenActive
                  ? "bg-gradient-to-br from-accent to-orange-500 border-orange-700 shadow-[0_4px_14px_rgba(249,115,22,0.45)] translate-y-0 cursor-pointer hover:scale-105"
                  : "bg-gradient-to-br from-orange-200 to-orange-300 border-orange-300/60 shadow-none -translate-y-3 cursor-pointer hover:scale-105"
              }
            `}
            aria-label={`مهره آسمان ستون ${COLUMN_LABELS[index]}`}
          >
            {/* shine */}
            <div
              className="absolute w-3.5 h-3.5 rounded-full bg-white/40 blur-[2px]"
              style={{ top: 6, right: 8 }}
            />
          </button>
        </div>

        {/* ─── Separator bar ─── */}
        <div className="w-full h-3.5 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-sm z-20 shadow-md relative flex-shrink-0" />

        {/* ─── Earth area (bottom half) ─── */}
        <div className="relative flex-1 flex flex-col items-center justify-start w-full pt-0 z-10 gap-[3px]">
          {[0, 1, 2, 3].map((beadIndex) => {
            const isActive = beadIndex < state.earthActive;
            return (
              <button
                key={beadIndex}
                onClick={() => onToggleEarth(beadIndex)}
                className={`
                  w-11 h-9 sm:w-12 sm:h-10 rounded-full border-[3px] transition-all duration-200 ease-out select-none flex-shrink-0
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                  ${
                    isActive
                      ? "bg-gradient-to-br from-primary to-blue-600 border-blue-800 shadow-[0_3px_10px_rgba(30,58,138,0.35)] cursor-pointer hover:scale-105"
                      : "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-200/60 shadow-none opacity-60 cursor-pointer hover:opacity-80 hover:scale-105"
                  }
                `}
                aria-label={`مهره زمین ${beadIndex + 1} ستون ${COLUMN_LABELS[index]}`}
              >
                {isActive && (
                  <div
                    className="absolute w-3 h-3 rounded-full bg-white/30 blur-[1.5px]"
                    style={{ top: 5, right: 7 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Column value indicator */}
      <div
        className={`mt-2 w-11 sm:w-12 h-11 flex items-center justify-center rounded-lg font-bold text-lg transition-colors duration-200 ${
          val > 0
            ? "bg-primary/10 text-primary border border-primary/20"
            : "bg-muted/50 text-muted-foreground border border-transparent"
        }`}
      >
        {toPersianNum(val)}
      </div>
    </div>
  );
}

/* ───────────────── Main Page ───────────────── */

export default function AbacusPage() {
  const [columns, setColumns] = useState<ColumnState[]>(makeInitial);
  const [showInstructions, setShowInstructions] = useState(true);

  const toggleHeaven = useCallback((colIndex: number) => {
    setColumns((prev) =>
      prev.map((col, i) =>
        i === colIndex ? { ...col, heavenActive: !col.heavenActive } : col
      )
    );
  }, []);

  const toggleEarth = useCallback(
    (colIndex: number, beadIndex: number) => {
      setColumns((prev) =>
        prev.map((col, i) => {
          if (i !== colIndex) return col;
          if (beadIndex < col.earthActive) {
            return { ...col, earthActive: beadIndex };
          }
          return { ...col, earthActive: beadIndex + 1 };
        })
      );
    },
    []
  );

  const reset = useCallback(() => {
    setColumns(makeInitial());
  }, []);

  // Calculate total value (RTL: leftmost = hundreds, middle = tens, right = units)
  // columns[4]=صدگان, [3]=دهگان, [2]=یکان, [1]=دهم‌ها, [0]=صدم‌ها
  let totalInteger = 0;
  for (let i = 2; i <= 4; i++) {
    totalInteger = totalInteger * 10 + columnValue(columns[i]);
  }

  let totalDecimal = 0;
  for (let i = 1; i >= 0; i--) {
    totalDecimal = totalDecimal * 10 + columnValue(columns[i]);
  }

  const hasDecimal = totalDecimal > 0;
  const formatTotal = () => {
    if (hasDecimal) {
      const dec = totalDecimal.toString().padStart(2, "0");
      return `${toPersianNum(totalInteger)}.${toPersianNum(parseInt(dec))}`;
    }
    return toPersianNum(totalInteger);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-10 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent mb-4">
              ابزار تعاملی
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
              چرتکه مجازی
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              با چرتکه مجازی ویرا، مفاهیم چرتکه دهگانی را به‌صورت تعاملی
              تمرین کنید. مهره‌ها را جابجا کنید و مقدار عدد نمایش داده‌شده را
              مشاهده نمایید.
            </p>
          </div>
        </section>

        {/* Abacus Tool */}
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {/* Frame */}
            <div className="rounded-2xl border-4 border-amber-700/80 bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden">
              {/* Subtle wood grain */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(120,53,15,0.6) 18px, rgba(120,53,15,0.6) 19px)",
                }}
              />

              {/* Top rail */}
              <div className="h-4 bg-gradient-to-r from-amber-900/80 via-amber-800 to-amber-900/80 rounded-t-lg mb-3 shadow-inner" />

              {/* Columns */}
              <div className="flex justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
                {columns.map((col, i) => (
                  <AbacusColumn
                    key={i}
                    state={col}
                    index={i}
                    onToggleHeaven={() => toggleHeaven(i)}
                    onToggleEarth={(bi) => toggleEarth(i, bi)}
                  />
                ))}
              </div>

              {/* Bottom rail */}
              <div className="h-4 bg-gradient-to-r from-amber-900/80 via-amber-800 to-amber-900/80 rounded-b-lg mt-3 shadow-inner" />
            </div>

            {/* Value Display */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="bg-card border-2 border-primary/20 rounded-2xl px-8 py-5 shadow-lg text-center">
                <span className="block text-xs text-muted-foreground mb-1.5">
                  مقدار عدد
                </span>
                <span className="text-4xl sm:text-5xl font-extrabold text-primary tracking-widest">
                  {formatTotal()}
                </span>
              </div>

              <Button
                variant="outline"
                size="lg"
                onClick={reset}
                className="rounded-xl gap-2 h-12 px-6 border-2 hover:border-destructive/50 hover:text-destructive shrink-0"
              >
                <RotateCcw className="h-4 w-4" />
                بازنشانی
              </Button>
            </div>

            {/* Instructions toggle */}
            <div className="mt-10 text-center">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                <Info className="h-4 w-4" />
                راهنمای استفاده از چرتکه مجازی
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    showInstructions ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {showInstructions && (
              <div className="mt-4 rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">
                        مهره‌های آسمان (بالایی)
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        هر ستون یک مهره نارنجی‌رنگ در بالا دارد که ارزش آن{" "}
                        <span className="font-bold text-accent">۵</span>{" "}
                        واحد است. با کلیک روی آن فعال یا غیرفعال می‌شود.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <ChevronUp className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">
                        مهره‌های زمین (پایینی)
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        هر ستون چهار مهره آبی‌رنگ در پایین دارد که هر کدام
                        ارزش{" "}
                        <span className="font-bold text-primary">۱</span>{" "}
                        واحد دارند. با کلیک روی هر مهره، مهره‌های زیرین آن نیز
                        فعال می‌شوند.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 sm:col-span-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 font-bold">
                      ۹
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">
                        نحوه خواندن عدد
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        مقدار هر ستون از مجموع مهره‌های فعال بالایی و پایینی
                        به‌دست می‌آید. حداکثر مقدار هر ستون{" "}
                        <span className="font-bold">۹</span> است (۵ + ۴×۱).
                        ستون‌ها از راست به چپ شامل: صدم‌ها، دهم‌ها، یکان، دهگان
                        و صدگان هستند. دو ستون سمت راست برای اعداد اعشاری و سه
                        ستون سمت چپ برای بخش صحیح هستند.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}