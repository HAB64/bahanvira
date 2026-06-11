'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClipboardCheck, Search, Eye, ArrowUpDown, FileText, CheckCircle, XCircle, Clock, Trophy } from 'lucide-react';
import { getExamAttempts } from '@/lib/storage';
import type { ExamAttempt, ExamAnswer, AttemptStatus } from '@/types';
import { examTypeLabels } from '@/types';
import { formatNumber, formatDate, getStatusBadgeClass, getStatusLabel } from './utils';

const attemptStatusLabels: Record<AttemptStatus, string> = {
  in_progress: 'در حال انجام',
  completed: 'تکمیل شده',
  timeout: 'پایان زمان',
  abandoned: 'رها شده',
};

const attemptStatusColors: Record<AttemptStatus, string> = {
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  timeout: 'bg-amber-100 text-amber-800',
  abandoned: 'bg-red-100 text-red-800',
};

type SortField = 'score' | 'date' | 'duration';

export default function ResultsPanel() {
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [detailDialog, setDetailDialog] = useState<ExamAttempt | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      setLoading(true);
      const data = getExamAttempts();
      setAttempts(data);
    } catch (err) {
      console.error('Failed to load exam attempts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filtering
  const filtered = attempts.filter((a) => {
    const matchSearch =
      !search ||
      a.studentName.includes(search) ||
      a.examId.includes(search) ||
      String(a.score).includes(search);
    const matchStatus = !statusFilter || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortField === 'score') cmp = a.percentage - b.percentage;
    else if (sortField === 'date') cmp = new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime();
    else if (sortField === 'duration') cmp = a.duration - b.duration;
    return sortAsc ? cmp : -cmp;
  });

  // Stats
  const totalAttempts = attempts.length;
  const completedAttempts = attempts.filter((a) => a.status === 'completed' || a.status === 'timeout');
  const passRate = completedAttempts.length > 0
    ? Math.round((completedAttempts.filter((a) => a.passed).length / completedAttempts.length) * 100)
    : 0;
  const avgScore = completedAttempts.length > 0
    ? Math.round(completedAttempts.reduce((s, a) => s + a.percentage, 0) / completedAttempts.length)
    : 0;
  const avgDuration = completedAttempts.length > 0
    ? Math.round(completedAttempts.reduce((s, a) => s + a.duration, 0) / completedAttempts.length)
    : 0;

  const formatDuration = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${formatNumber(m)}:${String(s).padStart(2, '0')}`;
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(false); }
  };

  const exportSummary = () => {
    const lines = [
      '═══ خلاصه نتایج آزمون‌ها ═══',
      `تعداد کل: ${totalAttempts}`,
      `نرخ قبولی: ${passRate}%`,
      `میانگین نمره: ${avgScore}%`,
      `میانگین زمان: ${formatDuration(avgDuration)}`,
      '',
      ...sorted.map((a, i) =>
        `${i + 1}. ${a.studentName} | نمره: ${a.percentage}% | ${a.passed ? 'قبول' : 'مردود'} | ${formatDate(a.startedAt)}`
      ),
    ];
    setExportText(lines.join('\n'));
    setExportDialog(true);
  };

  const [exportDialog, setExportDialog] = useState(false);
  const [exportText, setExportText] = useState('');

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">کل آزمون‌ها</p>
                <p className="text-2xl font-bold text-blue-700">{formatNumber(totalAttempts)}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-100"><ClipboardCheck className="w-5 h-5 text-blue-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">نرخ قبولی</p>
                <p className="text-2xl font-bold text-green-700">{passRate}%</p>
              </div>
              <div className="p-2 rounded-lg bg-green-100"><Trophy className="w-5 h-5 text-green-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">میانگین نمره</p>
                <p className="text-2xl font-bold text-amber-700">{avgScore}%</p>
              </div>
              <div className="p-2 rounded-lg bg-amber-100"><CheckCircle className="w-5 h-5 text-amber-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">میانگین زمان</p>
                <p className="text-2xl font-bold text-purple-700">{formatDuration(avgDuration)}</p>
              </div>
              <div className="p-2 rounded-lg bg-purple-100"><Clock className="w-5 h-5 text-purple-600" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="جستجوی نام، شناسه آزمون..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v === 'ALL' ? '' : v)}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="وضعیت" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه</SelectItem>
              {(Object.keys(attemptStatusLabels) as AttemptStatus[]).map((s) => (
                <SelectItem key={s} value={s}>{attemptStatusLabels[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={exportSummary} variant="outline" className="gap-2">
          <FileText className="w-4 h-4" />
          خروجی متنی
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">نام کارآموز</TableHead>
                <TableHead className="text-right">شناسه آزمون</TableHead>
                <TableHead className="text-right cursor-pointer select-none" onClick={() => toggleSort('score')}>
                  <span className="flex items-center gap-1">
                    نمره <ArrowUpDown className="w-3 h-3" />
                  </span>
                </TableHead>
                <TableHead className="text-right">قبول/مردود</TableHead>
                <TableHead className="text-right cursor-pointer select-none" onClick={() => toggleSort('duration')}>
                  <span className="flex items-center gap-1">
                    مدت <ArrowUpDown className="w-3 h-3" />
                  </span>
                </TableHead>
                <TableHead className="text-right">وضعیت</TableHead>
                <TableHead className="text-right cursor-pointer select-none" onClick={() => toggleSort('date')}>
                  <span className="flex items-center gap-1">
                    تاریخ <ArrowUpDown className="w-3 h-3" />
                  </span>
                </TableHead>
                <TableHead className="text-right">جزئیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-400">نتیجه‌ای یافت نشد</TableCell></TableRow>
              ) : sorted.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.studentName}</TableCell>
                  <TableCell className="text-sm text-gray-500">{a.examId}</TableCell>
                  <TableCell>
                    <span className={`font-bold ${a.percentage >= 60 ? 'text-green-700' : 'text-red-700'}`}>
                      {a.percentage}%
                    </span>
                    <span className="text-xs text-gray-400 mr-1">({formatNumber(a.score)}/{formatNumber(a.maxScore)})</span>
                  </TableCell>
                  <TableCell>
                    {a.passed ? (
                      <Badge className="bg-green-100 text-green-800 gap-1"><CheckCircle className="w-3 h-3" /> قبول</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800 gap-1"><XCircle className="w-3 h-3" /> مردود</Badge>
                    )}
                  </TableCell>
                  <TableCell dir="ltr">{formatDuration(a.duration)}</TableCell>
                  <TableCell>
                    <Badge className={attemptStatusColors[a.status || 'completed']}>
                      {attemptStatusLabels[a.status || 'completed']}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{formatDate(a.startedAt)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDetailDialog(a)}>
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="text-sm text-gray-500">{formatNumber(sorted.length)} نتیجه</div>

      {/* Detail Dialog */}
      <Dialog open={!!detailDialog} onOpenChange={() => setDetailDialog(null)}>
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>جزئیات نتیجه آزمون</DialogTitle>
          </DialogHeader>
          {detailDialog && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">نام</p>
                  <p className="font-medium">{detailDialog.studentName}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">نمره</p>
                  <p className={`font-bold text-lg ${detailDialog.passed ? 'text-green-700' : 'text-red-700'}`}>
                    {detailDialog.percentage}%
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">مدت آزمون</p>
                  <p className="font-medium" dir="ltr">{formatDuration(detailDialog.duration)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">وضعیت</p>
                  <Badge className={attemptStatusColors[detailDialog.status || 'completed']}>
                    {attemptStatusLabels[detailDialog.status || 'completed']}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">نمره کسب‌شده</p>
                  <p className="font-medium">{formatNumber(detailDialog.score)} از {formatNumber(detailDialog.maxScore)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">تاریخ شروع</p>
                  <p className="font-medium">{formatDate(detailDialog.startedAt)}</p>
                </div>
              </div>

              {/* Answers List */}
              {detailDialog.answers && detailDialog.answers.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 text-sm border-b pb-2">پاسخ‌ها ({formatNumber(detailDialog.answers.length)} سوال)</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {detailDialog.answers.map((ans: ExamAnswer, idx: number) => (
                      <div
                        key={ans.questionId}
                        className={`flex items-center justify-between p-3 rounded-lg text-sm ${
                          ans.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">سوال {formatNumber(idx + 1)}</span>
                          {ans.isCorrect ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <span className="text-gray-700">پاسخ: {String(ans.answer)}</span>
                        </div>
                        {ans.timeSpent != null && (
                          <span className="text-xs text-gray-500" dir="ltr">{formatDuration(ans.timeSpent)}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <span className="text-green-700 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      صحیح: {formatNumber(detailDialog.answers.filter((a: ExamAnswer) => a.isCorrect).length)}
                    </span>
                    <span className="text-red-700 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      غلط: {formatNumber(detailDialog.answers.filter((a: ExamAnswer) => !a.isCorrect).length)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialog} onOpenChange={setExportDialog}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader><DialogTitle>خروجی متنی نتایج</DialogTitle></DialogHeader>
          <pre className="bg-gray-50 rounded-lg p-4 text-sm whitespace-pre-wrap max-h-80 overflow-y-auto" dir="rtl">
            {exportText}
          </pre>
          <Button onClick={() => setExportDialog(false)} className="bg-amber-600 hover:bg-amber-700">بستن</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
