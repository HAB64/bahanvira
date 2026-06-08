'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import type { Student } from '@/types';
import { courses } from '@/data/courses';
import { studentLevelLabels } from '@/types';

interface CourseProgressProps {
  student: Student;
}

// Simulated progress based on student level
function getProgressForCourse(student: Student, courseId: string): number {
  const course = courses.find(c => c.id === courseId);
  if (!course) return 0;

  if (student.level === 'advanced' || student.level === 'competition') {
    if (course.level === 'مقدماتی') return 100;
    if (course.level === 'متوسط') return 100;
    if (course.level === 'پیشرفته') return 75;
  }
  if (student.level === 'intermediate') {
    if (course.level === 'مقدماتی') return 100;
    if (course.level === 'متوسط') return 60;
  }
  if (student.level === 'beginner') {
    if (course.level === 'مقدماتی') return 45;
  }
  return 30;
}

export default function CourseProgress({ student }: CourseProgressProps) {
  const enrolledCourseDetails = student.enrolledCourses
    .map(cId => courses.find(c => c.id === cId))
    .filter(Boolean);

  const allCourses = courses;

  return (
    <div className="space-y-6">
      {/* Enrolled Courses */}
      <Card className="border-2 border-amber-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            دوره‌های ثبت‌نام شده
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {enrolledCourseDetails.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">
              هنوز دوره‌ای ثبت‌نام نکرده‌اید
            </p>
          ) : (
            enrolledCourseDetails.map((course) => {
              if (!course) return null;
              const progress = getProgressForCourse(student, course.id);
              return (
                <div
                  key={course.id}
                  className="p-4 rounded-xl bg-gradient-to-l from-amber-50 to-orange-50 border border-amber-200 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">{course.title}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.duration}
                        </span>
                        <span>{course.sessions} جلسه</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">پیشرفت</span>
                      <span className="font-bold text-amber-700">{progress}٪</span>
                    </div>
                    <Progress value={progress} className="h-2 [&>div]:bg-amber-500" />
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Available Courses */}
      <Card className="border-2 border-teal-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            دوره‌های پیشنهادی
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {allCourses
            .filter(c => !student.enrolledCourses.includes(c.id))
            .map((course) => (
              <div
                key={course.id}
                className="p-4 rounded-xl border border-gray-200 hover:border-teal-300 hover:bg-teal-50/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{course.ageRange} • {course.duration}</p>
                  </div>
                  <Badge className="bg-teal-100 text-teal-800 text-xs">
                    {course.level}
                  </Badge>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-purple-600" />
            دستاوردها
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {student.level !== 'beginner' && (
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-center">
                <div className="text-2xl mb-1">🏅</div>
                <p className="text-xs font-medium text-green-800">تکمیل دوره مقدماتی</p>
              </div>
            )}
            {(student.level === 'advanced' || student.level === 'competition') && (
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-center">
                <div className="text-2xl mb-1">🏆</div>
                <p className="text-xs font-medium text-purple-800">تکمیل دوره متوسط</p>
              </div>
            )}
            {student.level === 'competition' && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-center">
                <div className="text-2xl mb-1">🥇</div>
                <p className="text-xs font-medium text-rose-800">شرکت در مسابقات</p>
              </div>
            )}
            {student.referralCode && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <div className="text-2xl mb-1">🤝</div>
                <p className="text-xs font-medium text-amber-800">دعوت از دوستان</p>
              </div>
            )}
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-center opacity-50">
              <div className="text-2xl mb-1">⭐</div>
              <p className="text-xs font-medium text-gray-500">قفل شده</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
