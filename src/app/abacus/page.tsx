"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import {
  RotateCcw,
  Volume2,
  VolumeX,
  Play,
  Timer,
  CheckCircle,
  XCircle,
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════ */

const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

function toPersian(n: number): string {
  return n.toString().replace(/\d/g, (d) => persianDigits[+d]);
}

function formatPersian(n: number): string {
  if (n === 0) return "۰";
  return toPersian(n).replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
}

/* ═══════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════ */

interface ColumnState {
  upper: boolean;
  lower: [boolean, boolean, boolean, boolean];
}

type Mode = "free" | "practice" | "exam";

interface Problem {
  a: number;
  b: number;
  op: "+" | "-";
  answer: number;
}

/* ═══════════════════════════════════════════════════
   Constants & Pure Functions
   ═══════════════════════════════════════════════════ */

const NUM_COLS = 13;

function createInitialColumns(): ColumnState[] {
  return Array.from({ length: NUM_COLS }, () => ({
    upper: false,
    lower: [false, false, false, false],
  }));
}

function getColumnValue(col: ColumnState): number {
  return (col.upper ? 5 : 0) + col.lower.filter(Boolean).length;
}

function getAbacusTotal(columns: ColumnState[]): number {
  return columns.reduce(
    (sum, col, i) => sum + getColumnValue(col) * 10 ** i,
    0
  );
}

function generateProblem(): Problem {
  const op: "+" | "-" = Math.random() > 0.5 ? "+" : "-";
  let a = Math.floor(Math.random() * 900) + 100;
  let b = Math.floor(Math.random() * 900) + 100;
  if (op === "-" && a < b) [a, b] = [b, a];
  return { a, b, op, answer: op === "+" ? a + b : a - b };
}

/* ═══════════════════════════════════════════════════
   AbacusColumn — single rod with 1 upper + 4 lower beads
   ═══════════════════════════════════════════════════ */

function AbacusColumn({
  state,
  onToggleUpper,
  onToggleLower,
}: {
  state: ColumnState;
  onToggleUpper: () => void;
  onToggleLower: (beadIndex: number) => void;
}) {
  return (
    <div
      className="flex flex-col items-center flex-1 min-w-0"
      style={{ minWidth: 24 }}
    >
      <div
        className="relative flex flex-col items-center w-full"
        style={{ height: 230 }}
      >
        {/* ── Vertical rod ── */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full rounded-full bg-white/[0.12] z-0" />

        {/* ── Upper (heaven) area ── */}
        <div className="relative flex-1 flex items-center justify-center w-full z-10">
          <button
            onClick={onToggleUpper}
            className={`
              w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10
              rounded-full border-2
              transition-all duration-150 select-none cursor-pointer
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50
              relative
              ${
                state.upper
                  ? "bg-gradient-to-br from-amber-400 to-orange-500 border-amber-500/70 shadow-[0_0_16px_rgba(245,158,11,0.5)] translate-y-5 sm:translate-y-7 md:translate-y-8"
                  : "bg-gradient-to-br from-amber-800/25 to-orange-900/15 border-amber-700/20 -translate-y-5 sm:-translate-y-7 md:-translate-y-8 hover:border-amber-600/35"
              }
            `}
            aria-label="مهره بالا"
          >
            {state.upper && (
              <div
                className="absolute rounded-full bg-white/30 blur-[1px]"
                style={{ width: 8, height: 8, top: 5, right: 6 }}
              />
            )}
          </button>
        </div>

        {/* ── Horizontal bar ── */}
        <div className="w-full h-[7px] sm:h-2 md:h-[9px] bg-gradient-to-b from-white/[0.18] to-white/[0.08] z-20 flex-shrink-0" />

        {/* ── Lower (earth) area ── */}
        <div className="relative flex-1 flex flex-col items-center w-full z-10">
          {/* Active beads — grouped at the top, touching the bar */}
          {[0, 1, 2, 3].map((i) =>
            state.lower[i] ? (
              <button
                key={`a-${i}`}
                onClick={() => onToggleLower(i)}
                className="
                  w-5 h-[14px] sm:w-7 sm:h-[18px] md:w-9 md:h-[22px]
                  rounded-full border-2
                  bg-gradient-to-br from-teal-300 to-teal-500 border-teal-400/60
                  shadow-[0_0_10px_rgba(20,184,166,0.35)]
                  transition-all duration-150 select-none cursor-pointer
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/50
                  relative flex-shrink-0
                "
                aria-label={`مهره پایین ${i + 1}`}
              >
                <div
                  className="absolute rounded-full bg-white/25 blur-[1px]"
                  style={{ width: 6, height: 6, top: 2, right: 5 }}
                />
              </button>
            ) : null
          )}

          {/* Flexible spacer pushes inactive beads to the bottom */}
          <div className="flex-1 min-h-0" />

          {/* Inactive beads — resting at the bottom, away from the bar */}
          {[0, 1, 2, 3].map((i) =>
            !state.lower[i] ? (
              <button
                key={`i-${i}`}
                onClick={() => onToggleLower(i)}
                className="
                  w-5 h-[14px] sm:w-7 sm:h-[18px] md:w-9 md:h-[22px]
                  rounded-full border-2
                  bg-gradient-to-br from-teal-800/20 to-teal-900/10 border-teal-700/15
                  hover:border-teal-500/30
                  transition-all duration-150 select-none cursor-pointer
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/50
                  flex-shrink-0
                "
                aria-label={`مهره پایین ${i + 1}`}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ModeButton — reusable glass button
   ═══════════════════════════════════════════════════ */

function GlassButton({
  children,
  onClick,
  variant = "default",
  icon: Icon,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "emerald" | "amber" | "red";
  icon?: React.ElementType;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium border transition-all duration-200 cursor-pointer select-none";
  const variants: Record<string, string> = {
    default:
      "bg-white/[0.05] border-white/[0.08] text-white/60 hover:bg-white/[0.08] hover:text-white/80",
    emerald:
      "bg-emerald-500/15 border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/25",
    amber:
      "bg-amber-500/15 border-amber-500/25 text-amber-300 hover:bg-amber-500/25",
    red: "bg-red-500/15 border-red-500/25 text-red-300 hover:bg-red-500/25",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════════ */

export default function AbacusPage() {
  /* ── Abacus state ── */
  const [columns, setColumns] = useState<ColumnState[]>(createInitialColumns);

  /* ── UI state ── */
  const [mode, setMode] = useState<Mode>("free");
  const [soundOn, setSoundOn] = useState(false);

  /* ── Practice state ── */
  const [problem, setProblem] = useState<Problem | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  /* ── Exam state ── */
  const [examProblems, setExamProblems] = useState<Problem[]>([]);
  const [examIdx, setExamIdx] = useState(0);
  const [examScore, setExamScore] = useState(0);
  const [examTime, setExamTime] = useState(60);
  const [examActive, setExamActive] = useState(false);
  const [examDone, setExamDone] = useState(false);
  const [examResults, setExamResults] = useState<boolean[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Cleanup timer on unmount ── */
  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
    },
    []
  );

  /* ── Exam countdown timer ── */
  useEffect(() => {
    if (examActive && !examDone && examTime > 0) {
      timerRef.current = setInterval(() => {
        setExamTime((t) => {
          if (t <= 1) {
            setExamDone(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [examActive, examDone]);

  /* ═══════════════════════════════════════
     Handlers
     ═══════════════════════════════════════ */

  const toggleUpper = useCallback((colIndex: number) => {
    setColumns((prev) =>
      prev.map((col, i) =>
        i === colIndex ? { ...col, upper: !col.upper } : col
      )
    );
  }, []);

  const toggleLower = useCallback((colIndex: number, beadIndex: number) => {
    setColumns((prev) =>
      prev.map((col, i) => {
        if (i !== colIndex) return col;
        const earthActive = col.lower.filter(Boolean).length;
        const newActive = beadIndex < earthActive ? beadIndex : beadIndex + 1;
        return {
          ...col,
          lower: ([0, 1, 2, 3].map((k) => k < newActive) as [
            boolean,
            boolean,
            boolean,
            boolean,
          ]),
        };
      })
    );
  }, []);

  const resetAbacus = useCallback(() => {
    setColumns(createInitialColumns());
    setFeedback(null);
  }, []);

  const handleGenerateProblem = useCallback(() => {
    setProblem(generateProblem());
    setFeedback(null);
    resetAbacus();
  }, [resetAbacus]);

  const handleCheckAnswer = useCallback(() => {
    if (!problem) return;
    const ok = getAbacusTotal(columns) === problem.answer;
    setFeedback(ok ? "correct" : "wrong");
    setScore((s) => ({
      correct: s.correct + (ok ? 1 : 0),
      total: s.total + 1,
    }));
  }, [problem, columns]);

  const handleStartExam = useCallback(() => {
    const problems = Array.from({ length: 10 }, () => generateProblem());
    setExamProblems(problems);
    setExamIdx(0);
    setExamScore(0);
    setExamTime(60);
    setExamActive(true);
    setExamDone(false);
    setExamResults([]);
    resetAbacus();
  }, [resetAbacus]);

  const handleExamSubmit = useCallback(() => {
    if (examIdx >= examProblems.length) return;
    const ok = getAbacusTotal(columns) === examProblems[examIdx].answer;
    const newResults = [...examResults, ok];
    setExamResults(newResults);
    if (ok) setExamScore((s) => s + 1);

    if (examIdx + 1 >= examProblems.length) {
      setExamDone(true);
    } else {
      setTimeout(() => {
        setExamIdx((i) => i + 1);
        resetAbacus();
      }, 700);
    }
  }, [examIdx, examProblems, columns, examResults, resetAbacus]);

  const switchMode = useCallback(
    (newMode: Mode) => {
      setMode(newMode);
      resetAbacus();
      setProblem(null);
      setFeedback(null);
      setScore({ correct: 0, total: 0 });
      setExamActive(false);
      setExamDone(false);
      if (timerRef.current) clearInterval(timerRef.current);
    },
    [resetAbacus]
  );

  /* ── Derived values ── */
  const total = getAbacusTotal(columns);
  const currentProblem =
    mode === "exam" && examActive && !examDone
      ? examProblems[examIdx]
      : problem;

  /* ═══════════════════════════════════════
     Render
     ═══════════════════════════════════════ */

  return (
    <div className="min-h-screen flex flex-col bg-[#0a1628]">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6" dir="rtl">
          {/* ───── Page Title ───── */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
              آباکوس مجازی
            </h1>
            <p className="text-white/40 text-sm sm:text-base">
              چرتکه دیجیتال تعاملی برای تمرین روزانه
            </p>
          </div>

          {/* ───── Mode Selector ───── */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-8">
            {(
              [
                ["free", "آزاد"],
                ["practice", "تمرین"],
                ["exam", "آزمون"],
              ] as const
            ).map(([m, label]) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`
                  px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-medium
                  border transition-all duration-200 cursor-pointer select-none
                  ${
                    mode === m
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.12)]"
                      : "bg-white/[0.04] border-white/[0.08] text-white/45 hover:text-white/65 hover:bg-white/[0.07]"
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ───── Exam Timer + Problem Counter ───── */}
          {mode === "exam" && examActive && !examDone && (
            <div className="flex items-center justify-center gap-5 mb-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <Timer className="w-4 h-4" />
                <span
                  className={`font-mono text-base ${
                    examTime <= 10
                      ? "text-red-400 font-bold animate-pulse"
                      : "text-white/70"
                  }`}
                >
                  {toPersian(examTime)}
                </span>
                <span>ثانیه</span>
              </span>
              <span className="w-px h-4 bg-white/10" />
              <span>
                سؤال {toPersian(examIdx + 1)} از {toPersian(examProblems.length)}
              </span>
            </div>
          )}

          {/* ───── Problem Display ───── */}
          {currentProblem && !examDone && (
            <div className="text-center mb-6">
              <div className="inline-block bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] rounded-2xl px-6 sm:px-10 py-4 sm:py-5">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wider" dir="ltr">
                  <span>{toPersian(currentProblem.a)}</span>
                  <span
                    className={`mx-2 sm:mx-3 ${
                      currentProblem.op === "+" ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {currentProblem.op === "+" ? "+" : "−"}
                  </span>
                  <span>{toPersian(currentProblem.b)}</span>
                  <span className="mx-2 sm:mx-3 text-white/30">=</span>
                  <span className="text-white/30">?</span>
                </div>
              </div>
            </div>
          )}

          {/* ───── Feedback ───── */}
          {feedback && problem && mode === "practice" && (
            <div
              className={`mb-5 text-center text-sm sm:text-base font-medium transition-all ${
                feedback === "correct" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {feedback === "correct" ? (
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  آفرین! پاسخ درست است
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  پاسخ اشتباه است · پاسخ صحیح:{" "}
                  <span className="font-bold">{formatPersian(problem.answer)}</span>
                </span>
              )}
            </div>
          )}

          {/* ───── Abacus Frame ───── */}
          <div className="relative mb-6">
            {/* Subtle glow behind the frame */}
            <div className="absolute -inset-6 bg-gradient-to-b from-amber-500/[0.035] via-transparent to-teal-500/[0.035] rounded-3xl pointer-events-none" />

            <div className="relative bg-[#0c1c38]/90 backdrop-blur-sm border border-white/[0.07] rounded-2xl p-2.5 sm:p-4 md:p-5 overflow-hidden">
              {/* Top decorative rail */}
              <div className="h-2.5 sm:h-3 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent rounded-full mb-1.5" />

              {/* Columns container — RTL so index 0 (units) is on the right */}
              <div
                className="flex gap-[2px] sm:gap-1 md:gap-1.5 overflow-x-auto"
                style={{ scrollbarWidth: "none" }}
              >
                {columns.map((col, i) => (
                  <AbacusColumn
                    key={i}
                    state={col}
                    onToggleUpper={() => toggleUpper(i)}
                    onToggleLower={(bi) => toggleLower(i, bi)}
                  />
                ))}
              </div>

              {/* Bottom decorative rail */}
              <div className="h-2.5 sm:h-3 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent rounded-full mt-1.5" />
            </div>
          </div>

          {/* ───── Value Display ───── */}
          <div className="text-center mb-8">
            <div className="inline-block bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] rounded-2xl px-8 sm:px-12 py-4 sm:py-5">
              <span className="block text-[11px] sm:text-xs text-white/35 mb-1.5 tracking-wide">
                مقدار عدد
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[0.12em] font-mono" dir="ltr">
                {formatPersian(total)}
              </span>
            </div>
          </div>

          {/* ───── Practice Mode Controls ───── */}
          {mode === "practice" && (
            <div className="space-y-4 mb-6">
              <div className="flex flex-wrap justify-center gap-3">
                <GlassButton
                  icon={Play}
                  variant="emerald"
                  onClick={handleGenerateProblem}
                >
                  تولید مسئله
                </GlassButton>
                {problem && (
                  <GlassButton
                    icon={CheckCircle}
                    variant="amber"
                    onClick={handleCheckAnswer}
                  >
                    بررسی پاسخ
                  </GlassButton>
                )}
              </div>
              {score.total > 0 && (
                <p className="text-center text-sm text-white/45">
                  امتیاز:{" "}
                  <span className="text-emerald-400 font-bold">
                    {toPersian(score.correct)}
                  </span>{" "}
                  از{" "}
                  <span className="text-white/65 font-bold">
                    {toPersian(score.total)}
                  </span>
                </p>
              )}
            </div>
          )}

          {/* ───── Exam Mode Controls ───── */}
          {mode === "exam" && !examActive && !examDone && (
            <div className="text-center mb-6">
              <GlassButton
                icon={Play}
                variant="amber"
                onClick={handleStartExam}
                className="px-8 py-3 text-base"
              >
                شروع آزمون
              </GlassButton>
              <p className="text-white/35 text-sm mt-3">
                ۱۰ مسئله تصادفی · محدودیت ۶۰ ثانیه
              </p>
            </div>
          )}

          {mode === "exam" && examActive && !examDone && (
            <div className="flex justify-center mb-6">
              <GlassButton
                icon={CheckCircle}
                variant="amber"
                onClick={handleExamSubmit}
              >
                ثبت پاسخ
              </GlassButton>
            </div>
          )}

          {/* ───── Exam Results ───── */}
          {mode === "exam" && examDone && (
            <div className="mb-8">
              <div className="max-w-md mx-auto bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] rounded-2xl p-6 sm:p-8 text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-5">
                  نتایج آزمون
                </h2>

                {/* Score */}
                <div className="mb-5">
                  <span className="text-5xl sm:text-6xl font-extrabold text-amber-400">
                    {toPersian(examScore)}
                  </span>
                  <span className="text-2xl sm:text-3xl text-white/30 mx-2">
                    /
                  </span>
                  <span className="text-2xl sm:text-3xl text-white/50">
                    {toPersian(examResults.length)}
                  </span>
                </div>

                {/* Time */}
                <p className="text-white/40 text-sm mb-6">
                  <Timer className="inline w-3.5 h-3.5 ml-1" />
                  زمان استفاده‌شده:{" "}
                  <span className="text-white/60 font-medium">
                    {toPersian(60 - examTime)} ثانیه
                  </span>
                </p>

                {/* Per-problem results */}
                <div className="flex justify-center gap-1.5 sm:gap-2 mb-6 flex-wrap">
                  {examResults.map((ok, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center border transition-all ${
                        ok
                          ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-400"
                          : "bg-red-500/15 border-red-500/25 text-red-400"
                      }`}
                      title={
                        ok
                          ? "پاسخ درست"
                          : `پاسخ اشتباه · صحیح: ${toPersian(examProblems[i]?.answer)}`
                      }
                    >
                      {ok ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Percentage */}
                <p className="text-sm text-white/40 mb-6">
                  {examResults.length > 0 && (
                    <>
                      درصد موفقیت:{" "}
                      <span
                        className={`font-bold ${
                          examScore / examResults.length >= 0.7
                            ? "text-emerald-400"
                            : examScore / examResults.length >= 0.4
                            ? "text-amber-400"
                            : "text-red-400"
                        }`}
                      >
                        {toPersian(
                          Math.round((examScore / examResults.length) * 100)
                        )}
                        ٪
                      </span>
                    </>
                  )}
                </p>

                {/* Restart */}
                <GlassButton
                  icon={RotateCcw}
                  onClick={handleStartExam}
                  className="px-6 py-2.5"
                >
                  تلاش مجدد
                </GlassButton>
              </div>
            </div>
          )}

          {/* ───── Bottom Controls Bar ───── */}
          <div className="flex justify-center gap-3">
            <GlassButton icon={RotateCcw} onClick={resetAbacus}>
              ریست
            </GlassButton>
            <GlassButton
              icon={soundOn ? Volume2 : VolumeX}
              onClick={() => setSoundOn(!soundOn)}
            >
              صدای مهره
            </GlassButton>
          </div>

          {/* ───── Free Mode Hint ───── */}
          {mode === "free" && total === 0 && (
            <p className="text-center text-white/25 text-xs sm:text-sm mt-8 leading-relaxed">
              روی مهره‌ها کلیک کنید تا آن‌ها را جابجا کنید. مهره‌های بالایی ارزش
              ۵ و مهره‌های پایینی ارزش ۱ واحد دارند.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}