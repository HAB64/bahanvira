'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  BookOpen,
  User,
  Phone,
  LogIn,
} from 'lucide-react';
import ExamCard from '@/components/exam/ExamCard';
import ExamInterface from '@/components/exam/ExamInterface';
import ExamResult from '@/components/exam/ExamResult';
import { sampleExams, initializeSampleData } from '@/lib/sample-data';
import { getPortalUser, loginPortal, getStudentResults } from '@/lib/storage';
import type { Exam, ExamAttempt, ExamResult as ExamResultType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

type ViewState = 'login' | 'exams' | 'taking' | 'result';

export default function ExamPage() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<ViewState>('login');
  const [phone, setPhone] = useState('');
  const [loginError, setLoginError] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [result, setResult] = useState<ExamResultType | null>(null);
  const [examResults, setExamResults] = useState<ExamResultType[]>([]);

  const checkExistingLogin = useCallback(() => {
    const user = getPortalUser();
    if (user) {
      setStudentId(user.studentId);
      setStudentName(user.name);
      setExamResults(getStudentResults());
      setView('exams');
    }
  }, []);

  useEffect(() => {
    initializeSampleData();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      checkExistingLogin();
    }
  }, [mounted, checkExistingLogin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = loginPortal(phone);
    if (user) {
      setStudentId(user.studentId);
      setStudentName(user.name);
      setExamResults(getStudentResults());
      setView('exams');
      setLoginError('');
    } else {
      setLoginError('شماره تماس یافت نشد. لطفاً شماره تماس ثبت‌نام شده را وارد کنید.');
    }
  };

  const handleStartExam = (exam: Exam) => {
    setSelectedExam(exam);
    setView('taking');
  };

  const handleExamComplete = (attemptData: ExamAttempt, resultData: ExamResultType) => {
    setAttempt(attemptData);
    setResult(resultData);
    setExamResults(getStudentResults());
    setView('result');
  };

  const handleRetry = () => {
    if (selectedExam) {
      setView('taking');
      setAttempt(null);
      setResult(null);
    }
  };

  const handleBackToExams = () => {
    setView('exams');
    setSelectedExam(null);
    setAttempt(null);
    setResult(null);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-bl from-amber-50 via-orange-50 to-teal-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-amber-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Image
                  src="/logo.webp"
                  alt={siteConfig.name.fullName}
                  width={36}
                  height={36}
                  className="rounded-lg"
                />
              </Link>
              <div>
                <h1 className="font-bold text-amber-700">آزمون‌های آنلاین</h1>
                <p className="text-[10px] text-gray-500 hidden sm:block">چرتکه دهگانی ویرا</p>
              </div>
            </div>
            {view !== 'login' && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <User className="w-3 h-3 ml-1" />
                  {studentName}
                </Badge>
                <Link href="/">
                  <Button variant="outline" size="sm" className="text-xs">
                    بازگشت به سایت
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Login View */}
        {view === 'login' && (
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-amber-200 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="p-4 bg-amber-100 rounded-full">
                      <BookOpen className="w-8 h-8 text-amber-600" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900">آزمون‌های آنلاین</h2>
                    <p className="text-gray-500 mt-2">
                      برای شرکت در آزمون، شماره تماس ثبت‌نام شده خود را وارد کنید
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        شماره تماس
                      </label>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setLoginError('');
                        }}
                        placeholder="مثال: ۰۹۱۲۱۲۳۴۵۶۷"
                        className="text-center"
                        dir="ltr"
                      />
                      {loginError && (
                        <p className="text-red-500 text-sm">{loginError}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl py-6"
                    >
                      <LogIn className="w-4 h-4 ml-2" />
                      ورود به آزمون‌ها
                    </Button>
                  </form>

                  <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-700">
                    <p className="font-medium mb-1">شماره‌های نمونه برای تست:</p>
                    <p className="text-xs" dir="ltr">09121111111 (سارینا محمدی)</p>
                    <p className="text-xs" dir="ltr">09143333333 (آریا احمدی)</p>
                  </div>

                  <Link href="/" className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 text-sm">
                    <ArrowRight className="w-4 h-4" />
                    بازگشت به صفحه اصلی
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Exams List View */}
        {view === 'exams' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-gray-900">آزمون‌های موجود</h2>
              <p className="text-gray-500">آزمون مورد نظر خود را انتخاب کنید</p>
            </div>

            {/* Previous Results */}
            {examResults.length > 0 && (
              <Card className="border-teal-200">
                <CardContent className="p-4">
                  <h3 className="font-bold text-sm text-teal-700 mb-3">نتایج قبلی شما</h3>
                  <div className="flex flex-wrap gap-2">
                    {examResults.map((r, i) => (
                      <Badge
                        key={i}
                        variant={r.passed ? 'default' : 'destructive'}
                        className={`text-xs ${r.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {r.examTitle}: {r.percentage}٪
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Exam Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleExams.map((exam) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  onStart={handleStartExam}
                />
              ))}
            </div>
          </div>
        )}

        {/* Taking Exam View */}
        {view === 'taking' && selectedExam && (
          <ExamInterface
            exam={selectedExam}
            studentId={studentId}
            studentName={studentName}
            onComplete={handleExamComplete}
            onCancel={handleBackToExams}
          />
        )}

        {/* Result View */}
        {view === 'result' && attempt && result && selectedExam && (
          <ExamResult
            attempt={attempt}
            result={result}
            exam={selectedExam}
            onRetry={handleRetry}
            onBack={handleBackToExams}
          />
        )}
      </main>
    </div>
  );
}
