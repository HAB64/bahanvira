'use client';

import { useState } from 'react';
import {
  BookOpen,
  Play,
  FileText,
  Download,
  Upload,
  Plus,
  Eye,
  Edit3,
  Trash2,
  Clock,
  Users,
  CheckCircle,
  Video,
  Image,
  File,
} from 'lucide-react';

interface Lesson {
  title: string;
  type: string;
  duration: string;
  status: string;
}

interface Course {
  name: string;
  lessons: Lesson[];
}

const courses: Course[] = [
  {
    name: 'چرتکه مبتدی (سطح ۱-۳)',
    lessons: [
      { title: 'آشنایی با چرتکه دهگانی', type: 'ویدیو', duration: '۱۵:۳۰', status: 'فعال' },
      { title: 'نحوه حرکت مهره‌ها - جمع', type: 'ویدیو', duration: '۲۲:۰۰', status: 'فعال' },
      { title: 'تمرین جمع ساده', type: 'تمرین', duration: '۱۰:۰۰', status: 'فعال' },
      { title: 'جزوه سطح ۱', type: 'فایل PDF', duration: '-', status: 'فعال' },
      { title: 'نحوه حرکت مهره‌ها - تفریق', type: 'ویدیو', duration: '۲۵:۰۰', status: 'پیش‌نویس' },
    ],
  },
  {
    name: 'حساب ذهنی ۱',
    lessons: [
      { title: 'تصویرسازی ذهنی چرتکه', type: 'ویدیو', duration: '۱۸:۰۰', status: 'فعال' },
      { title: 'تمرین تصویرسازی', type: 'تمرین', duration: '۱۲:۰۰', status: 'فعال' },
      { title: 'جمع ذهنی دو رقم', type: 'ویدیو', duration: '۲۰:۰۰', status: 'فعال' },
    ],
  },
  {
    name: 'چرتکه متوسط (سطح ۴-۶)',
    lessons: [
      { title: 'ضرب مهره‌ای', type: 'ویدیو', duration: '۲۸:۰۰', status: 'فعال' },
      { title: 'تقسیم مقدماتی', type: 'ویدیو', duration: '۳۰:۰۰', status: 'پیش‌نویس' },
    ],
  },
];

function getTypeIcon(type: string) {
  switch (type) {
    case 'ویدیو':
      return <Play className="w-4 h-4" />;
    case 'فایل PDF':
      return <FileText className="w-4 h-4" />;
    case 'تمرین':
      return <File className="w-4 h-4" />;
    default:
      return <File className="w-4 h-4" />;
  }
}

function getTypeBadgeClasses(type: string) {
  switch (type) {
    case 'ویدیو':
      return 'bg-blue-100 text-blue-500';
    case 'فایل PDF':
      return 'bg-rose-100 text-rose-500';
    case 'تمرین':
      return 'bg-amber-100 text-amber-500';
    default:
      return 'bg-gray-100 text-gray-500';
  }
}

function getStatusClasses(status: string) {
  switch (status) {
    case 'فعال':
      return 'bg-emerald-100 text-emerald-600 border-emerald-200';
    case 'پیش‌نویس':
      return 'bg-amber-100 text-amber-600 border-amber-200';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function LMSTab() {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(0);

  const toggleCourse = (index: number) => {
    setExpandedCourse((prev) => (prev === index ? null : index));
  };

  const summaryCards = [
    {
      label: 'دوره فعال',
      value: '۶',
      icon: BookOpen,
      color: 'orange',
      bgClass: 'bg-orange-50',
      iconBgClass: 'bg-orange-100',
      iconTextClass: 'text-orange-500',
      valueClass: 'text-orange-600',
    },
    {
      label: 'جلسه آموزشی',
      value: '۴۸',
      icon: Play,
      color: 'teal',
      bgClass: 'bg-teal-50',
      iconBgClass: 'bg-teal-100',
      iconTextClass: 'text-teal-500',
      valueClass: 'text-teal-600',
    },
    {
      label: 'محتوای بارگذاری شده',
      value: '۱۲۵',
      icon: FileText,
      color: 'purple',
      bgClass: 'bg-purple-50',
      iconBgClass: 'bg-purple-100',
      iconTextClass: 'text-purple-500',
      valueClass: 'text-purple-600',
    },
    {
      label: 'نرخ تکمیل',
      value: '۷۸٪',
      icon: CheckCircle,
      color: 'emerald',
      bgClass: 'bg-emerald-50',
      iconBgClass: 'bg-emerald-100',
      iconTextClass: 'text-emerald-500',
      valueClass: 'text-emerald-600',
    },
  ];

  return (
    <div dir="rtl" className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.label}
              className={`${card.bgClass} rounded-2xl border border-gray-100 p-5 flex items-center gap-4 transition-shadow hover:shadow-md`}
            >
              <div className={`${card.iconBgClass} ${card.iconTextClass} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-0.5">{card.label}</p>
                <p className={`text-2xl font-bold ${card.valueClass}`}>{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Content Management */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">مدیریت محتوای دوره‌ها</h2>
          <span className="text-sm text-gray-400">
            {courses.length} دوره · {courses.reduce((sum, c) => sum + c.lessons.length, 0)} درس
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {courses.map((course, courseIndex) => {
            const isExpanded = expandedCourse === courseIndex;
            return (
              <div key={courseIndex}>
                {/* Course Header (Accordion Trigger) */}
                <button
                  onClick={() => toggleCourse(courseIndex)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-right">
                      <h3 className="font-semibold text-gray-800 text-sm">{course.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{course.lessons.length} درس</p>
                    </div>
                  </div>
                  <ChevronIcon expanded={isExpanded} />
                </button>

                {/* Expanded Lessons Table */}
                {isExpanded && (
                  <div className="px-6 pb-4">
                    <div className="bg-gray-50/70 rounded-xl overflow-hidden border border-gray-100">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-gray-500 text-xs border-b border-gray-100">
                            <th className="text-right font-medium px-4 py-3">عنوان درس</th>
                            <th className="text-right font-medium px-4 py-3">نوع</th>
                            <th className="text-right font-medium px-4 py-3">مدت</th>
                            <th className="text-right font-medium px-4 py-3">وضعیت</th>
                            <th className="text-center font-medium px-4 py-3">عملیات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {course.lessons.map((lesson, lessonIndex) => (
                            <tr
                              key={lessonIndex}
                              className="border-b border-gray-100 last:border-b-0 hover:bg-white transition-colors"
                            >
                              <td className="px-4 py-3 font-medium text-gray-700">
                                <div className="flex items-center gap-2.5">
                                  <span className="text-xs text-gray-400 w-5 shrink-0">
                                    {lessonIndex + 1}
                                  </span>
                                  {lesson.title}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${getTypeBadgeClasses(lesson.type)}`}
                                >
                                  {getTypeIcon(lesson.type)}
                                  {lesson.type}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className="inline-flex items-center gap-1 text-gray-500 text-xs">
                                  <Clock className="w-3.5 h-3.5" />
                                  {lesson.duration}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusClasses(lesson.status)}`}
                                >
                                  {lesson.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                                    title="مشاهده"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                                    title="ویرایش"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    title="حذف"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-800 mb-1">بارگذاری محتوا</h3>
            <p className="text-sm text-gray-400">
              ویدیو، فایل PDF یا تمرین جدید به دوره‌ها اضافه کنید
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-gradient-to-l from-indigo-500 to-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-[0.97]">
            <Upload className="w-4 h-4" />
            بارگذاری محتوای جدید
          </button>
        </div>
      </div>
    </div>
  );
}