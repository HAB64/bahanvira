'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  Star,
  Target,
} from 'lucide-react';
import type { ExamAttempt, ExamResult as ExamResultType, Exam } from '@/types';
import { examTypeLabels } from '@/types';

interface ExamResultProps {
  attempt: ExamAttempt;
  result: ExamResultType;
  exam: Exam;
  onRetry: () => void;
  onBack: () => void;
}

export default function ExamResult({ attempt, result, exam, onRetry, onBack }: ExamResultProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} دقیقه و ${secs} ثانیه`;
  };

  // Determine result message
  const getResultMessage = () => {
    if (result.percentage >= 90) {
      return { text: 'عالی! عملکرد فوق‌العاده‌ای داشتی! 🌟', color: 'text-green-600', bg: 'bg-green-50' };
    } else if (result.percentage >= 70) {
      return { text: 'آفرین! نتیجه خیلی خوبی گرفتی! 👏', color: 'text-teal-600', bg: 'bg-teal-50' };
    } else if (result.passed) {
      return { text: 'قبول شدی! ادامه بده! 💪', color: 'text-amber-600', bg: 'bg-amber-50' };
    } else {
      return { text: 'متأسفانه قبول نشدی. دوباره تلاش کن!', color: 'text-red-600', bg: 'bg-red-50' };
    }
  };

  // Calculate category breakdown
  const categoryBreakdown: Record<string, { total: number; correct: number; points: number; earned: number }> = {};
  exam.questions.forEach((q, i) => {
    const cat = q.category || 'عمومی';
    if (!categoryBreakdown[cat]) {
      categoryBreakdown[cat] = { total: 0, correct: 0, points: 0, earned: 0 };
    }
    categoryBreakdown[cat].total++;
    categoryBreakdown[cat].points += q.points;
    if (attempt.answers[i]?.isCorrect) {
      categoryBreakdown[cat].correct++;
      categoryBreakdown[cat].earned += q.points;
    }
  });

  const categoryLabels: Record<string, string> = {
    addition: 'جمع',
    subtraction: 'تفریق',
    multiplication: 'ضرب',
    division: 'تقسیم',
    abacus_reading: 'خواندن چرتکه',
    number_sequence: 'دنباله اعداد',
    mixed: 'ترکیبی',
    'عمومی': 'عمومی',
  };

  const message = getResultMessage();

  // Level recommendation based on placement exam
  const getLevelRecommendation = () => {
    if (exam.type !== 'placement') return null;
    if (result.percentage >= 80) return { level: 'پیشرفته', color: 'text-purple-700', bg: 'bg-purple-50' };
    if (result.percentage >= 50) return { level: 'متوسط', color: 'text-teal-700', bg: 'bg-teal-50' };
    return { level: 'مقدماتی', color: 'text-amber-700', bg: 'bg-amber-50' };
  };

  const levelRec = getLevelRecommendation();

  return (
    <div className="max-w-3xl mx-auto space-y-6" dir="rtl">
      {/* Result Header */}
      <Card className={`border-2 ${result.passed ? 'border-green-300' : 'border-red-300'}`}>
        <CardContent className="p-8 text-center space-y-6">
          {/* Icon */}
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
            result.passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {result.passed ? (
              <Trophy className="w-12 h-12 text-green-600" />
            ) : (
              <XCircle className="w-12 h-12 text-red-500" />
            )}
          </div>

          {/* Score */}
          <div>
            <h2 className="text-3xl font-black text-gray-900">
              {result.percentage}٪
            </h2>
            <p className="text-gray-500 mt-1">
              {result.score} از {result.maxScore} نمره
            </p>
          </div>

          {/* Message */}
          <div className={`inline-block px-6 py-3 rounded-xl ${message.bg}`}>
            <p className={`font-bold text-lg ${message.color}`}>
              {message.text}
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center justify-center gap-4">
            <Badge className={`${result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-sm px-3 py-1`}>
              {result.passed ? 'قبول' : 'مردود'}
            </Badge>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{formatDuration(result.duration)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level Recommendation (for placement exam) */}
      {levelRec && (
        <Card className="border-2 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${levelRec.bg}`}>
                <Target className={`w-6 h-6 ${levelRec.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">سطح پیشنهادی شما</h3>
                <p className={`text-xl font-black ${levelRec.color}`}>
                  دوره {levelRec.level}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Score Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">جزئیات نمره</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">نمره کل</span>
            <span className="font-bold">{result.percentage}٪</span>
          </div>
          <Progress
            value={result.percentage}
            className={`h-4 ${result.passed ? '[&>div]:bg-green-500' : '[&>div]:bg-red-400'}`}
          />
          <div className="flex justify-between text-xs text-gray-500 pt-1">
            <span>نمره قبولی: {Math.round((exam.passingScore / exam.totalScore) * 100)}٪</span>
            <span>نمره شما: {result.percentage}٪</span>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">عملکرد بر اساس دسته‌بندی</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(categoryBreakdown).map(([cat, data]) => {
            const catPercent = Math.round((data.earned / data.points) * 100);
            return (
              <div key={cat} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{categoryLabels[cat] || cat}</span>
                  <span className="text-gray-500">
                    {data.correct} از {data.total} صحیح
                  </span>
                </div>
                <Progress
                  value={catPercent}
                  className={`h-2 ${catPercent >= 70 ? '[&>div]:bg-green-500' : catPercent >= 40 ? '[&>div]:bg-amber-500' : '[&>div]:bg-red-400'}`}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Questions Review */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">مرور سؤالات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-96 overflow-y-auto">
          {exam.questions.map((q, index) => {
            const answer = attempt.answers[index];
            const isCorrect = answer?.isCorrect;
            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border-2 ${
                  isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-2 flex-1">
                    <p className="font-medium text-sm">{q.question}</p>
                    <div className="text-xs space-y-1">
                      <p className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                        پاسخ شما: {answer?.answer ? q.options?.find(o => o.id === answer.answer)?.text || answer.answer : 'بدون پاسخ'}
                      </p>
                      {!isCorrect && (
                        <p className="text-green-700">
                          پاسخ صحیح: {q.options?.find(o => o.isCorrect)?.text || q.correctAnswer}
                        </p>
                      )}
                      {q.explanation && (
                        <p className="text-gray-500 mt-1">
                          💡 {q.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onRetry}
          className="flex-1 bg-amber-600 hover:bg-amber-700 text-white gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          تلاش دوباره
        </Button>
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به آزمون‌ها
        </Button>
      </div>
    </div>
  );
}
