'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Clock, FileText, Hash, Award, BarChart3 } from 'lucide-react';
import type { Exam, ExamType } from '@/types';
import { examTypeLabels, studentLevelLabels } from '@/types';

interface ExamTableProps {
  exams: Exam[];
}

const examTypeColors: Record<ExamType, string> = {
  placement: 'bg-purple-100 text-purple-800',
  lesson_quiz: 'bg-blue-100 text-blue-800',
  midterm: 'bg-amber-100 text-amber-800',
  final: 'bg-rose-100 text-rose-800',
  competition: 'bg-red-100 text-red-800',
  practice: 'bg-teal-100 text-teal-800',
};

export default function ExamTable({ exams }: ExamTableProps) {
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredExams = exams.filter((exam) => {
    return typeFilter === 'all' || exam.type === typeFilter;
  });

  // Calculate stats
  const totalExams = exams.length;
  const totalQuestions = exams.reduce((sum, e) => sum + e.questions.length, 0);
  const totalDuration = exams.reduce((sum, e) => sum + e.duration, 0);
  const avgPassingScore = exams.length > 0
    ? Math.round(exams.reduce((sum, e) => sum + (e.passingScore / e.totalScore * 100), 0) / exams.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
          <FileText className="w-5 h-5 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-700">{totalExams}</p>
          <p className="text-xs text-purple-600">کل آزمون‌ها</p>
        </div>
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-center">
          <Hash className="w-5 h-5 text-teal-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-teal-700">{totalQuestions}</p>
          <p className="text-xs text-teal-600">کل سؤالات</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <Clock className="w-5 h-5 text-amber-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-amber-700">{totalDuration}</p>
          <p className="text-xs text-amber-600">مجموع زمان (دقیقه)</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
          <BarChart3 className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-emerald-700">٪{avgPassingScore}</p>
          <p className="text-xs text-emerald-600">میانگین حد نصاب</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="نوع آزمون" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه انواع</SelectItem>
            {Object.entries(examTypeLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-right">عنوان آزمون</TableHead>
                <TableHead className="text-right">نوع</TableHead>
                <TableHead className="text-right hidden sm:table-cell">سطح</TableHead>
                <TableHead className="text-right hidden md:table-cell">زمان (دقیقه)</TableHead>
                <TableHead className="text-right hidden md:table-cell">تعداد سؤالات</TableHead>
                <TableHead className="text-right hidden lg:table-cell">نمره کل</TableHead>
                <TableHead className="text-right">حد نصاب</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExams.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    آزمونی یافت نشد
                  </TableCell>
                </TableRow>
              ) : (
                filteredExams.map((exam) => (
                  <TableRow key={exam.id} className="hover:bg-purple-50/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{exam.title}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1 max-w-[200px]">{exam.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${examTypeColors[exam.type]}`}>
                        {examTypeLabels[exam.type]}
                      </span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">
                      {studentLevelLabels[exam.level]}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {exam.duration}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm">
                      {exam.questions.length}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm font-medium">
                      {exam.totalScore}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-500" />
                        <span className="text-sm font-medium">{exam.passingScore}</span>
                        <span className="text-xs text-gray-400">/ {exam.totalScore}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
