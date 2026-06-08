'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowRight,
  User,
  Phone,
  LogIn,
  BookOpen,
  Award,
  ClipboardList,
  LogOut,
} from 'lucide-react';
import StudentProfile from '@/components/portal/StudentProfile';
import CourseProgress from '@/components/portal/CourseProgress';
import ExamHistory from '@/components/portal/ExamHistory';
import {
  initializeSampleData,
} from '@/lib/sample-data';
import {
  getPortalUser,
  loginPortal,
  logoutPortal,
  getStudents,
  getStudentResults,
} from '@/lib/storage';
import type { Student, ExamResult } from '@/types';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export default function PortalPage() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState('');
  const [loginError, setLoginError] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [results, setResults] = useState<ExamResult[]>([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [refreshKey, setRefreshKey] = useState(0);

  const checkExistingLogin = useCallback(() => {
    const user = getPortalUser();
    if (user && user.isLoggedIn) {
      const students = getStudents();
      const s = students.find(st => st.id === user.studentId);
      if (s) {
        setStudent(s);
        setResults(getStudentResults());
        setIsLoggedIn(true);
      }
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
  }, [mounted, checkExistingLogin, refreshKey]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = loginPortal(phone);
    if (user) {
      const students = getStudents();
      const s = students.find(st => st.id === user.studentId);
      if (s) {
        setStudent(s);
        setResults(getStudentResults());
        setIsLoggedIn(true);
        setLoginError('');
      }
    } else {
      setLoginError('شماره تماس یافت نشد. لطفاً شماره تماس ثبت‌نام شده را وارد کنید.');
    }
  };

  const handleLogout = () => {
    logoutPortal();
    setIsLoggedIn(false);
    setStudent(null);
    setResults([]);
  };

  if (!mounted) return null;

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-bl from-amber-50 via-orange-50 to-teal-50 flex items-center justify-center p-4" dir="rtl">
        <Card className="w-full max-w-md border-2 border-amber-200 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <Image
                  src="/logo.webp"
                  alt={siteConfig.name.fullName}
                  width={72}
                  height={72}
                  className="rounded-xl"
                />
              </div>

              <div>
                <h1 className="text-2xl font-black text-gray-900">پورتال کارآموز</h1>
                <p className="text-gray-500 mt-1">{siteConfig.name.fullName}</p>
              </div>

              <div className="flex justify-center">
                <div className="p-4 bg-teal-100 rounded-full">
                  <User className="w-8 h-8 text-teal-600" />
                </div>
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
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-6"
                >
                  <LogIn className="w-4 h-4 ml-2" />
                  ورود به پورتال
                </Button>
              </form>

              <div className="bg-teal-50 rounded-xl p-4 text-sm text-teal-700">
                <p className="font-medium mb-1">شماره‌های نمونه برای تست:</p>
                <p className="text-xs" dir="ltr">09121111111 (سارینا محمدی)</p>
                <p className="text-xs" dir="ltr">09143333333 (آریا احمدی)</p>
              </div>

              <a href="/" className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 text-sm">
                <ArrowRight className="w-4 h-4" />
                بازگشت به صفحه اصلی
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Portal Dashboard
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-teal-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <a href="/">
                <Image
                  src="/logo.webp"
                  alt={siteConfig.name.fullName}
                  width={36}
                  height={36}
                  className="rounded-lg"
                />
              </a>
              <div>
                <h1 className="font-bold text-teal-700">پورتال کارآموز</h1>
                <p className="text-[10px] text-gray-500 hidden sm:block">{student?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="/exam">
                <Button variant="outline" size="sm" className="text-xs gap-1">
                  <ClipboardList className="w-3 h-3" />
                  آزمون‌ها
                </Button>
              </a>
              <a href="/">
                <Button variant="outline" size="sm" className="text-xs">
                  بازگشت به سایت
                </Button>
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-500 border-red-200 hover:bg-red-50 text-xs"
              >
                <LogOut className="w-4 h-4 ml-1" />
                خروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Welcome banner */}
          <div className="bg-gradient-to-l from-amber-500 to-teal-500 rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">سلام {student?.name}! 👋</h2>
                <p className="text-white/80 mt-1">به پورتال کارآموز ویرا خوش آمدی</p>
              </div>
              <div className="hidden sm:block">
                <Badge className="bg-white/20 text-white border-0 text-sm px-3 py-1">
                  سطح {student?.level === 'beginner' ? 'مقدماتی' : student?.level === 'intermediate' ? 'متوسط' : student?.level === 'advanced' ? 'پیشرفته' : 'مسابقات'}
                </Badge>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white border shadow-sm w-full justify-start">
              <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">پروفایل</span>
              </TabsTrigger>
              <TabsTrigger value="courses" className="gap-2 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">دوره‌ها</span>
              </TabsTrigger>
              <TabsTrigger value="exams" className="gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">نتایج آزمون</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              {student && <StudentProfile student={student} />}
            </TabsContent>

            <TabsContent value="courses" className="mt-6">
              {student && <CourseProgress student={student} />}
            </TabsContent>

            <TabsContent value="exams" className="mt-6">
              <ExamHistory results={results} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
