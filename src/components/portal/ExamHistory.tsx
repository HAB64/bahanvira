'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock, Award } from 'lucide-react';
import type { ExamResult } from '@/types';
import { examTypeLabels } from '@/types';

interface ExamHistoryProps {
  results: ExamResult[];
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs} ثانیه`;
  return `${mins} دقیقه و ${secs} ثانیه`;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function ExamHistory({ results }: ExamHistoryProps) {
  if (results.length === 0) {
    return (
      <Card className="border-2 border-gray-200">
        <CardContent className="p-8 text-center">
          <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">هنوز آزمونی نداده‌اید</p>
          <p className="text-sm text-gray-400 mt-1">
            از بخش آزمون‌ها شروع کنید
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-green-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-green-700">
            {results.filter(r => r.passed).length}
          </p>
          <p className="text-xs text-green-600">قبول</p>
        </div>
        <div className="bg-red-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-red-700">
            {results.filter(r => !r.passed).length}
          </p>
          <p className="text-xs text-red-600">مردود</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-amber-700">
            {results.length > 0
              ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length)
              : 0}٪
          </p>
          <p className="text-xs text-amber-600">میانگین</p>
        </div>
      </div>

      {/* Results list */}
      <div className="space-y-3">
        {results.map((result, index) => (
          <Card
            key={index}
            className={`border ${
              result.passed ? 'border-green-200 hover:border-green-300' : 'border-red-200 hover:border-red-300'
            } transition-colors`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {result.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <h4 className="font-bold text-gray-900">{result.examTitle}</h4>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <Badge variant="outline" className="text-xs">
                      {examTypeLabels[result.examType]}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(result.duration)}
                    </span>
                    <span>{formatDate(result.completedAt)}</span>
                  </div>
                </div>
                <div className="text-left">
                  <p className={`text-2xl font-black ${
                    result.passed ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {result.percentage}٪
                  </p>
                  <p className="text-xs text-gray-500">
                    {result.score} از {result.maxScore}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
