'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import {
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Timer,
  Award,
  Play,
  RotateCcw,
} from 'lucide-react';

/* ─────────── Types ─────────── */
interface ExamDef {
  id: string;
  title: string;
  questionCount: number;
  timeMinutes: number;
  icon: string;
}

interface Question {
  text: string;
  options: string[];
  correctIndex: number;
}

type ExamPhase = 'selection' | 'inProgress' | 'completed';

/* ─────────── Data ─────────── */
const exams: ExamDef[] = [
  { id: 'level1', title: 'آزمون سطح ۱ - جمع و تفریق ساده', questionCount: 10, timeMinutes: 10, icon: '📐' },
  { id: 'level3', title: 'آزمون سطح ۳ - جمع و تفریق چندرقمی', questionCount: 10, timeMinutes: 15, icon: '🧮' },
  { id: 'level5', title: 'آزمون سطح ۵ - ضرب ساده', questionCount: 8, timeMinutes: 15, icon: '✖️' },
  { id: 'speed', title: 'آزمون سرعت', questionCount: 20, timeMinutes: 5, icon: '⚡' },
  { id: 'comprehensive', title: 'آزمون جامع', questionCount: 30, timeMinutes: 30, icon: '🏆' },
];

const toPersian = (n: number): string =>
  n.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);

/* ─────────── Question Generator ─────────── */
function generateQuestions(examId: string, count: number): Question[] {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    let a: number, b: number, op: string, answer: number;

    if (examId === 'level1') {
      a = Math.floor(Math.random() * 50) + 10;
      b = Math.floor(Math.random() * 30) + 5;
      op = Math.random() > 0.5 ? '+' : '−';
      answer = op === '+' ? a + b : a - b;
    } else if (examId === 'level3') {
      a = Math.floor(Math.random() * 900) + 100;
      b = Math.floor(Math.random() * 400) + 100;
      op = Math.random() > 0.5 ? '+' : '−';
      answer = op === '+' ? a + b : a - b;
    } else if (examId === 'level5') {
      a = Math.floor(Math.random() * 9) + 2;
      b = Math.floor(Math.random() * 9) + 2;
      op = '×';
      answer = a * b;
    } else if (examId === 'speed') {
      const type = Math.random();
      if (type < 0.33) {
        a = Math.floor(Math.random() * 90) + 10;
        b = Math.floor(Math.random() * 90) + 10;
        op = '+';
        answer = a + b;
      } else if (type < 0.66) {
        a = Math.floor(Math.random() * 90) + 20;
        b = Math.floor(Math.random() * 20) + 5;
        op = '−';
        answer = a - b;
      } else {
        a = Math.floor(Math.random() * 9) + 2;
        b = Math.floor(Math.random() * 9) + 2;
        op = '×';
        answer = a * b;
      }
    } else {
      const type = Math.random();
      if (type < 0.35) {
        a = Math.floor(Math.random() * 500) + 100;
        b = Math.floor(Math.random() * 300) + 50;
        op = '+';
        answer = a + b;
      } else if (type < 0.7) {
        a = Math.floor(Math.random() * 500) + 200;
        b = Math.floor(Math.random() * 200) + 50;
        op = '−';
        answer = a - b;
      } else {
        a = Math.floor(Math.random() * 12) + 2;
        b = Math.floor(Math.random() * 12) + 2;
        op = '×';
        answer = a * b;
      }
    }

    const text = `${toPersian(a)} ${op} ${toPersian(b)} = ?`;
    const options = [answer];
    const usedAnswers = new Set<number>([answer]);

    while (options.length < 4) {
      let wrong: number;
      const offset = Math.floor(Math.random() * 20) + 1;
      wrong = Math.random() > 0.5 ? answer + offset : answer - offset;
      if (!usedAnswers.has(wrong)) {
        usedAnswers.add(wrong);
        options.push(wrong);
      }
    }

    // Shuffle options
    const shuffled = [...options];
    for (let j = shuffled.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [shuffled[j], shuffled[k]] = [shuffled[k], shuffled[j]];
    }

    questions.push({
      text,
      options: shuffled.map(toPersian),
      correctIndex: shuffled.indexOf(answer),
    });
  }

  return questions;
}

/* ─────────── Component ─────────── */
export default function ExamPage() {
  const [phase, setPhase] = useState<ExamPhase>('selection');
  const [currentExam, setCurrentExam] = useState<ExamDef | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startExam = useCallback((exam: ExamDef) => {
    const qs = generateQuestions(exam.id, exam.questionCount);
    setCurrentExam(exam);
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setCurrentQ(0);
    setTimeLeft(exam.timeMinutes * 60);
    setStartTime(Date.now());
    setPhase('inProgress');
  }, []);

  const submitExam = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPhase('completed');
  }, []);

  useEffect(() => {
    if (phase !== 'inProgress') return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setPhase('completed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [phase]);

  const selectAnswer = (optionIndex: number) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentQ] = optionIndex;
      return copy;
    });
  };

  const resetExam = () => {
    setCurrentExam(null);
    setQuestions([]);
    setAnswers([]);
    setCurrentQ(0);
    setTimeLeft(0);
    setPhase('selection');
  };

  /* ─── Score Calculation ─── */
  const score =
    phase === 'completed' && currentExam
      ? answers.reduce(
          (acc, ans, idx) => acc + (ans === questions[idx]?.correctIndex ? 1 : 0),
          0
        )
      : 0;

  const timeTaken = phase === 'completed' ? Math.floor((Date.now() - startTime) / 1000) : 0;
  const minutesTaken = Math.floor(timeTaken / 60);
  const secondsTaken = timeTaken % 60;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${toPersian(m.toString().padStart(2, '0'))}:${toPersian(sec.toString().padStart(2, '0'))}`;
  };

  const progressPercent = currentExam ? ((currentQ + 1) / currentExam.questionCount) * 100 : 0;

  /* ─────────── Render: Selection ─────────── */
  if (phase === 'selection') {
    return (
      <div dir="rtl" className="pt-24 pb-16 bg-[#f9fafb] min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 w-full">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-2xl font-bold text-slate-900">آزمون آنلاین</h1>
            <p className="text-slate-500 mt-3">آزمون‌های دوره‌ای برای سنجش پیشرفت شما</p>
          </div>

          {/* Exam Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div key={exam.id} className="glass-card rounded-2xl p-6 flex flex-col justify-between min-h-[220px]">
                <div>
                  <span className="text-3xl mb-3 block">{exam.icon}</span>
                  <h3 className="text-slate-900 font-bold text-base mb-3 leading-7">{exam.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-[#0d9488]" />
                      {toPersian(exam.questionCount)} سوال
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Timer className="w-4 h-4 text-[#f97316]" />
                      {toPersian(exam.timeMinutes)} دقیقه
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => startExam(exam)}
                  className="btn-primary w-full mt-6 py-3"
                >
                  <Play className="w-4 h-4" />
                  شروع آزمون
                </button>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ─────────── Render: In Progress ─────────── */
  if (phase === 'inProgress' && currentExam && questions.length > 0) {
    const q = questions[currentQ];

    return (
      <div dir="rtl" className="pt-24 pb-16 bg-[#f9fafb] min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 w-full">
          {/* Top Bar */}
          <div className="glass-card rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h2 className="text-slate-900 font-bold text-sm sm:text-base">{currentExam.title}</h2>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-[#f97316]" />
                <span className={`font-mono font-bold text-base ${timeLeft < 60 ? 'text-red-400' : 'text-slate-900'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
            {/* Progress */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 whitespace-nowrap">
                سوال {toPersian(currentQ + 1)} از {toPersian(currentExam.questionCount)}
              </span>
              <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-[#0d9488] to-[#0f766e] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 mb-6">
            <p className="text-center text-2xl sm:text-3xl font-bold text-slate-900 mb-8 leading-relaxed tracking-wider">
              {q.text}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {q.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => selectAnswer(idx)}
                  className={`
                    rounded-xl p-4 text-lg font-bold text-center transition-all duration-200 border
                    ${
                      answers[currentQ] === idx
                        ? 'bg-[#0d9488]/20 border-[#0d9488] text-[#0d9488] shadow-[0_0_20px_rgba(13,148,136,0.15)]'
                        : 'bg-gray-100 border-gray-200 text-slate-600 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setCurrentQ((prev) => Math.max(0, prev - 1))}
              disabled={currentQ === 0}
              className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-4 h-4" />
              قبلی
            </button>

            <div className="flex items-center gap-1.5">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQ(idx)}
                  className={`
                    w-2.5 h-2.5 rounded-full transition-all duration-200
                    ${idx === currentQ ? 'bg-[#0d9488] scale-125' : answers[idx] !== null ? 'bg-[#0d9488]/50' : 'bg-white/20'}
                  `}
                  title={`سوال ${toPersian(idx + 1)}`}
                />
              ))}
            </div>

            {currentQ < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQ((prev) => prev + 1)}
                className="btn-ghost"
              >
                بعدی
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={submitExam}
                className="btn-accent"
              >
                <CheckCircle className="w-4 h-4" />
                ثبت و پایان آزمون
              </button>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ─────────── Render: Completed ─────────── */
  if (phase === 'completed' && currentExam) {
    const passed = score >= currentExam.questionCount * 0.6;
    const percentage = Math.round((score / currentExam.questionCount) * 100);

    return (
      <div dir="rtl" className="pt-24 pb-16 bg-[#f9fafb] min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 w-full">
          {/* Result Card */}
          <div className="glass-card rounded-2xl p-8 text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${passed ? 'bg-[#0d9488]/20' : 'bg-red-500/20'}`}>
                <Award className={`w-10 h-10 ${passed ? 'text-[#0d9488]' : 'text-red-400'}`} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {passed ? 'تبریک! آزمون را با موفقیت گذراندید' : 'متأسفانه قبول نشدید'}
            </h2>
            <p className="text-slate-500 mb-8">{currentExam.title}</p>

            {/* Score */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">{toPersian(score)}/{toPersian(currentExam.questionCount)}</p>
                <p className="text-sm text-slate-500 mt-1">پاسخ صحیح</p>
              </div>
              <div className="w-px bg-gray-100" />
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">{toPersian(percentage)}٪</p>
                <p className="text-sm text-slate-500 mt-1">درصد موفقیت</p>
              </div>
              <div className="w-px bg-gray-100" />
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">{toPersian(minutesTaken)}:{toPersian(secondsTaken.toString().padStart(2, '0'))}</p>
                <p className="text-sm text-slate-500 mt-1">زمان صرف‌شده</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${passed ? 'bg-gradient-to-l from-[#0d9488] to-[#0f766e]' : 'bg-gradient-to-l from-red-500 to-red-600'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setCurrentQ(0);
                  // Show details - just scroll to question review below
                }}
                className="btn-ghost w-full sm:w-auto"
              >
                مشاهده جزئیات
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => startExam(currentExam)}
                className="btn-primary w-full sm:w-auto"
              >
                <RotateCcw className="w-4 h-4" />
                آزمون مجدد
              </button>
            </div>
          </div>

          {/* Question Review */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 mb-4">بررسی پاسخ‌ها</h3>
            {questions.map((q, idx) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === q.correctIndex;

              return (
                <div key={idx} className="glass-card rounded-2xl p-5">
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 ${isCorrect ? 'bg-[#0d9488]/20' : 'bg-red-500/20'}`}>
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-[#0d9488]" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-500">سوال {toPersian(idx + 1)}</span>
                        <span className="text-base font-bold text-slate-900">{q.text}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                        {q.options.map((opt, optIdx) => (
                          <span
                            key={optIdx}
                            className={`
                              text-center text-sm py-1.5 px-2 rounded-lg
                              ${optIdx === q.correctIndex ? 'bg-[#0d9488]/20 text-[#0d9488] font-bold border border-[#0d9488]/30' : ''}
                              ${optIdx === userAnswer && !isCorrect ? 'bg-red-500/20 text-red-400 border border-red-500/30' : ''}
                              ${optIdx !== userAnswer && optIdx !== q.correctIndex ? 'bg-gray-100 text-slate-500' : ''}
                            `}
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                      {!isCorrect && userAnswer !== null && (
                        <p className="text-xs text-slate-500 mt-2">
                          پاسخ شما: <span className="text-red-400">{q.options[userAnswer]}</span>
                          {' · '}پاسخ صحیح: <span className="text-[#0d9488]">{q.options[q.correctIndex]}</span>
                        </p>
                      )}
                      {userAnswer === null && (
                        <p className="text-xs text-slate-500 mt-2">
                          بدون پاسخ · پاسخ صحیح: <span className="text-[#0d9488]">{q.options[q.correctIndex]}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Back button */}
          <div className="mt-8 text-center">
            <button onClick={resetExam} className="btn-ghost">
              بازگشت به لیست آزمون‌ها
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return null;
}