'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Award, ArrowLeft } from 'lucide-react';
import type { Exam } from '@/types';
import { examTypeLabels, studentLevelLabels } from '@/types';

interface ExamCardProps {
  exam: Exam;
  onStart: (exam: Exam) => void;
}

export default function ExamCard({ exam, onStart }: ExamCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-amber-200 group">
      {/* Header with gradient */}
      <div className="bg-gradient-to-l from-amber-500 to-orange-500 p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <Badge className="bg-white/20 text-white border-0 mb-2">
              {examTypeLabels[exam.type]}
            </Badge>
            <CardTitle className="text-xl font-bold">{exam.title}</CardTitle>
          </div>
          <div className="bg-white/20 rounded-full p-3">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <CardDescription className="text-gray-600 leading-7">
          {exam.description}
        </CardDescription>

        {/* Exam details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>{exam.duration} دقیقه</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BookOpen className="w-4 h-4 text-teal-500" />
            <span>{exam.questions.length} سؤال</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Award className="w-4 h-4 text-orange-500" />
            <span>نمره قبولی: {exam.passingScore}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-4 h-4 flex items-center justify-center text-xs font-bold text-purple-500">س</span>
            <span>سطح: {studentLevelLabels[exam.level]}</span>
          </div>
        </div>

        {/* Start button */}
        <Button
          onClick={() => onStart(exam)}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl group-hover:shadow-md transition-shadow"
        >
          شروع آزمون
          <ArrowLeft className="w-4 h-4 mr-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
