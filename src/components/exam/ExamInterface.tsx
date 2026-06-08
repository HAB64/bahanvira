'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import type { Exam, ExamAnswer, ExamAttempt, ExamResult } from '@/types';
import { addExamAttempt, addStudentResult } from '@/lib/storage';

interface ExamInterfaceProps {
  exam: Exam;
  studentId: string;
  studentName: string;
  onComplete: (attempt: ExamAttempt, result: ExamResult) => void;
  onCancel: () => void;
}

export default function ExamInterface({
  exam,
  studentId,
  studentName,
  onComplete,
  onCancel,
}: ExamInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<ExamAnswer[]>(
    exam.questions.map((q) => ({
      questionId: q.id,
      answer: '',
      isCorrect: undefined,
      timeSpent: 0,
    }))
  );
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60); // seconds
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  // Use a ref for the submit handler so the timer can call it
  const handleSubmitRef = useRef<() => void>(() => {});

  const handleSubmit = useCallback(() => {
    // Calculate scores
    let totalScore = 0;
    const gradedAnswers = answers.map((answer, index) => {
      const q = exam.questions[index];
      const isCorrect = answer.answer === q.correctAnswer;
      if (isCorrect) totalScore += q.points;
      return { ...answer, isCorrect };
    });

    const percentage = Math.round((totalScore / exam.totalScore) * 100);
    const passed = totalScore >= exam.passingScore;
    const duration = exam.duration * 60 - timeLeft;

    const attempt: ExamAttempt = {
      id: `attempt-${Date.now()}`,
      examId: exam.id,
      studentId,
      studentName,
      answers: gradedAnswers,
      score: totalScore,
      maxScore: exam.totalScore,
      percentage,
      passed,
      startedAt: new Date(Date.now() - duration * 1000).toISOString(),
      completedAt: new Date().toISOString(),
      duration,
    };

    const result: ExamResult = {
      examId: exam.id,
      examTitle: exam.title,
      examType: exam.type,
      score: totalScore,
      maxScore: exam.totalScore,
      percentage,
      passed,
      completedAt: new Date().toISOString(),
      duration,
    };

    addExamAttempt(attempt);
    addStudentResult(result);

    onComplete(attempt, result);
  }, [answers, exam, studentId, studentName, timeLeft, onComplete]);

  // Keep ref updated
  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [handleSubmit]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-submit when time is up
  useEffect(() => {
    if (timeUp) {
      handleSubmitRef.current();
    }
  }, [timeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const question = exam.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / exam.questions.length) * 100;
  const answeredCount = answers.filter((a) => a.answer !== '').length;

  const handleAnswer = useCallback((optionId: string) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = {
        ...newAnswers[currentQuestion],
        answer: optionId,
      };
      return newAnswers;
    });
  }, [currentQuestion]);

  const timeWarning = timeLeft < 60; // Less than 1 minute

  return (
    <div className="max-w-3xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{exam.title}</h2>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          timeWarning ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
        }`}>
          <Clock className="w-4 h-4" />
          <span className="font-mono font-bold" dir="ltr">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>سؤال {currentQuestion + 1} از {exam.questions.length}</span>
          <span>{answeredCount} پاسخ داده شده</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Navigation */}
      <div className="flex flex-wrap gap-2">
        {exam.questions.map((_, index) => {
          const isAnswered = answers[index].answer !== '';
          const isCurrent = index === currentQuestion;
          return (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                isCurrent
                  ? 'bg-amber-600 text-white'
                  : isAnswered
                  ? 'bg-teal-100 text-teal-700'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* Question Card */}
      <Card className="border-2 border-amber-200">
        <CardContent className="p-6 space-y-6">
          {/* Question text */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                سؤال {currentQuestion + 1}
              </span>
              <span className="text-sm text-gray-500">
                ({question.points} نمره)
              </span>
            </div>
            <p className="text-lg font-medium leading-8 text-gray-900">
              {question.question}
            </p>
          </div>

          {/* Options */}
          {question.options && (
            <RadioGroup
              value={answers[currentQuestion].answer as string}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    answers[currentQuestion].answer === option.id
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
                  }`}
                  onClick={() => handleAnswer(option.id)}
                >
                  <RadioGroupItem
                    value={option.id}
                    id={`option-${option.id}`}
                    className="border-amber-400"
                  />
                  <Label
                    htmlFor={`option-${option.id}`}
                    className="flex-1 cursor-pointer text-base font-medium"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </CardContent>
      </Card>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="gap-2"
        >
          <ChevronRight className="w-4 h-4" />
          قبلی
        </Button>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="text-red-500 border-red-300 hover:bg-red-50"
          >
            انصراف
          </Button>

          {currentQuestion === exam.questions.length - 1 ? (
            <Button
              onClick={() => {
                if (answeredCount < exam.questions.length) {
                  setShowConfirmSubmit(true);
                } else {
                  handleSubmit();
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              ثبت پاسخ‌ها
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(Math.min(exam.questions.length - 1, currentQuestion + 1))}
              className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
            >
              بعدی
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Confirm submit dialog */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-sm w-full" dir="rtl">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-600">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-lg font-bold">تأیید ثبت پاسخ‌ها</h3>
              </div>
              <p className="text-gray-600">
                شما {exam.questions.length - answeredCount} سؤال را بدون پاسخ گذاشته‌اید.
                آیا مطمئن هستید که می‌خواهید آزمون را پایان دهید؟
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                >
                  بله، ثبت کن
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmSubmit(false)}
                  className="flex-1"
                >
                  بازگشت
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
