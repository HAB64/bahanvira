'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClipboardList, CheckCircle, Clock, BarChart3, Plus, Search, Pencil, Trash2, Eye } from 'lucide-react';
import {
  getAssignments, addAssignment, updateAssignment, deleteAssignment,
} from '@/lib/storage';
import type { Assignment, AssignmentSubmission } from '@/types';
import { assignmentTypeLabels } from '@/types';
import { formatNumber, formatDate, formatCurrencyFull, getStatusBadgeClass } from './utils';

const assignmentTypeOptions: { value: Assignment['type']; label: string }[] = [
  { value: 'homework', label: 'تکلیف' },
  { value: 'project', label: 'پروژه' },
  { value: 'practice', label: 'تمرین' },
  { value: 'research', label: 'تحقیق' },
];

const assignmentStatusOptions = [
  { value: 'active', label: 'فعال' },
  { value: 'closed', label: 'بسته شده' },
  { value: 'graded', label: 'نمره‌گذاری شده' },
];

const submissionStatusMap: Record<AssignmentSubmission['status'], string> = {
  submitted: 'ارسال شده',
  late: 'دیرتر از موعد',
  graded: 'نمره‌گذاری شده',
  returned: 'بازگشت داده شده',
};

const emptyForm = {
  courseId: '',
  sessionId: '',
  title: '',
  description: '',
  type: 'homework' as Assignment['type'],
  dueDate: '',
  maxScore: '20',
};

export default function AssignmentsPanel() {
  const [items, setItems] = useState<Assignment[]>([]);
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Assignment | null>(null);
  const [form, setForm] = useState(emptyForm);
  // Submissions dialog
  const [submissionsDialogOpen, setSubmissionsDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  // Grade dialog
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [gradingSubmission, setGradingSubmission] = useState<AssignmentSubmission | null>(null);
  const [gradeForm, setGradeForm] = useState({ score: '', feedback: '' });

  const loadData = () => setItems(getAssignments());
  useEffect(() => { loadData(); }, []);

  // Stats
  const totalAssignments = items.length;
  const activeCount = items.filter(a => a.status === 'active').length;
  const gradedCount = items.filter(a => a.status === 'graded').length;
  const allSubmissions = items.flatMap(a => a.submissions || []);
  const gradedSubmissions = allSubmissions.filter(s => s.score !== undefined && s.score !== null);
  const avgScore = gradedSubmissions.length > 0
    ? Math.round(gradedSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) / gradedSubmissions.length)
    : 0;

  // Filtered data
  const filtered = items.filter(item => {
    const matchSearch = !search || item.title.includes(search) || item.courseId.includes(search) || item.description.includes(search);
    const matchCourse = !courseFilter || item.courseId === courseFilter;
    const matchType = !typeFilter || item.type === typeFilter;
    const matchStatus = !statusFilter || item.status === statusFilter;
    return matchSearch && matchCourse && matchType && matchStatus;
  });

  const courseIds = Array.from(new Set(items.map(a => a.courseId))).sort();

  const openAddDialog = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (item: Assignment) => {
    setEditingItem(item);
    setForm({
      courseId: item.courseId,
      sessionId: item.sessionId ? String(item.sessionId) : '',
      title: item.title,
      description: item.description,
      type: item.type,
      dueDate: item.dueDate ? new Date(item.dueDate).toISOString().split('T')[0] : '',
      maxScore: String(item.maxScore),
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const now = new Date().toISOString();
    if (editingItem) {
      updateAssignment(editingItem.id, {
        courseId: form.courseId,
        sessionId: form.sessionId ? parseInt(form.sessionId) : undefined,
        title: form.title,
        description: form.description,
        type: form.type,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : now,
        maxScore: parseInt(form.maxScore) || 20,
      });
    } else {
      const newItem: Assignment = {
        id: crypto.randomUUID(),
        courseId: form.courseId,
        sessionId: form.sessionId ? parseInt(form.sessionId) : undefined,
        title: form.title,
        description: form.description,
        type: form.type,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : now,
        maxScore: parseInt(form.maxScore) || 20,
        submissions: [],
        status: 'active',
        createdAt: now,
      };
      addAssignment(newItem);
    }
    setDialogOpen(false);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این تکلیف اطمینان دارید؟')) return;
    deleteAssignment(id);
    loadData();
  };

  const openSubmissionsDialog = (item: Assignment) => {
    setSelectedAssignment(item);
    setSubmissionsDialogOpen(true);
  };

  const openGradeDialog = (submission: AssignmentSubmission) => {
    setGradingSubmission(submission);
    setGradeForm({
      score: submission.score !== undefined && submission.score !== null ? String(submission.score) : '',
      feedback: submission.feedback || '',
    });
    setGradeDialogOpen(true);
  };

  const handleGradeSave = () => {
    if (!selectedAssignment || !gradingSubmission) return;
    const updatedSubmissions = (selectedAssignment.submissions || []).map(s => {
      if (s.id === gradingSubmission.id) {
        return {
          ...s,
          score: parseFloat(gradeForm.score) || 0,
          feedback: gradeForm.feedback,
          gradedAt: new Date().toISOString(),
          status: 'graded' as const,
        };
      }
      return s;
    });

    const allGraded = updatedSubmissions.length > 0 && updatedSubmissions.every(s => s.status === 'graded');
    updateAssignment(selectedAssignment.id, {
      submissions: updatedSubmissions,
      status: allGraded ? 'graded' : selectedAssignment.status,
    });
    setGradeDialogOpen(false);
    loadData();
    // Refresh selectedAssignment
    const updated = getAssignments().find(a => a.id === selectedAssignment.id);
    if (updated) setSelectedAssignment(updated);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'graded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'فعال';
      case 'closed': return 'بسته شده';
      case 'graded': return 'نمره‌گذاری شده';
      default: return status;
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100"><ClipboardList className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="text-xs text-blue-700">کل تکالیف</p>
                <p className="text-lg font-bold text-blue-700">{formatNumber(totalAssignments)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100"><Clock className="w-5 h-5 text-green-600" /></div>
              <div>
                <p className="text-xs text-green-700">فعال</p>
                <p className="text-lg font-bold text-green-700">{formatNumber(activeCount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100"><CheckCircle className="w-5 h-5 text-purple-600" /></div>
              <div>
                <p className="text-xs text-purple-700">نمره‌گذاری شده</p>
                <p className="text-lg font-bold text-purple-700">{formatNumber(gradedCount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100"><BarChart3 className="w-5 h-5 text-amber-600" /></div>
              <div>
                <p className="text-xs text-amber-700">میانگین نمره</p>
                <p className="text-lg font-bold text-amber-700">{formatNumber(avgScore)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="جستجوی عنوان، توضیحات..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
          </div>
          <Select value={courseFilter} onValueChange={(v) => setCourseFilter(v === 'ALL' ? '' : v)}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="دوره" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه دوره‌ها</SelectItem>
              {courseIds.map(id => (<SelectItem key={id} value={id}>{id}</SelectItem>))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v === 'ALL' ? '' : v)}>
            <SelectTrigger className="w-[120px]"><SelectValue placeholder="نوع" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه انواع</SelectItem>
              {assignmentTypeOptions.map(t => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v === 'ALL' ? '' : v)}>
            <SelectTrigger className="w-[120px]"><SelectValue placeholder="وضعیت" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه</SelectItem>
              {assignmentStatusOptions.map(s => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAddDialog} className="bg-amber-600 hover:bg-amber-700 gap-2">
          <Plus className="w-4 h-4" />
          افزودن تکلیف
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">عنوان</TableHead>
                <TableHead className="text-right">دوره</TableHead>
                <TableHead className="text-right">نوع</TableHead>
                <TableHead className="text-right">مهلت</TableHead>
                <TableHead className="text-right">نمره کل</TableHead>
                <TableHead className="text-right">ارسال‌ها</TableHead>
                <TableHead className="text-right">وضعیت</TableHead>
                <TableHead className="text-right">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-400">تکلیفی یافت نشد</TableCell></TableRow>
              ) : filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      {item.description && <p className="text-xs text-gray-500 max-w-[200px] truncate">{item.description}</p>}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm" dir="ltr">{item.courseId}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(item.type.toUpperCase())}>
                      {assignmentTypeLabels[item.type]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{formatDate(item.dueDate)}</TableCell>
                  <TableCell className="text-sm">{formatNumber(item.maxScore)}</TableCell>
                  <TableCell className="text-sm">{formatNumber((item.submissions || []).length)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(item.status)}>{getStatusLabel(item.status)}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="مشاهده ارسال‌ها" onClick={() => openSubmissionsDialog(item)}>
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(item)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'ویرایش تکلیف' : 'افزودن تکلیف جدید'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>شناسه دوره</Label>
                <Input dir="ltr" value={form.courseId} onChange={(e) => setForm(f => ({ ...f, courseId: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>شماره جلسه</Label>
                <Input type="number" dir="ltr" value={form.sessionId} onChange={(e) => setForm(f => ({ ...f, sessionId: e.target.value }))} placeholder="اختیاری" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>عنوان</Label>
              <Input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>توضیحات</Label>
              <Textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نوع</Label>
                <Select value={form.type} onValueChange={(v) => setForm(f => ({ ...f, type: v as Assignment['type'] }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {assignmentTypeOptions.map(t => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>نمره کل</Label>
                <Input type="number" dir="ltr" value={form.maxScore} onChange={(e) => setForm(f => ({ ...f, maxScore: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>مهلت ارسال</Label>
              <Input type="date" dir="ltr" value={form.dueDate} onChange={(e) => setForm(f => ({ ...f, dueDate: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700">
              {editingItem ? 'ذخیره' : 'افزودن'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Submissions Dialog */}
      <Dialog open={submissionsDialogOpen} onOpenChange={setSubmissionsDialogOpen}>
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>ارسال‌های تکلیف: {selectedAssignment?.title}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            {!selectedAssignment?.submissions || selectedAssignment.submissions.length === 0 ? (
              <p className="text-center py-8 text-gray-400">هنوز ارسالی ثبت نشده است</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">کارآموز</TableHead>
                    <TableHead className="text-right">تاریخ ارسال</TableHead>
                    <TableHead className="text-right">وضعیت</TableHead>
                    <TableHead className="text-right">نمره</TableHead>
                    <TableHead className="text-right">بازخورد</TableHead>
                    <TableHead className="text-right">عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedAssignment.submissions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.studentName}</TableCell>
                      <TableCell className="text-sm text-gray-500">{formatDate(sub.submittedAt)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(sub.status.toUpperCase())}>
                          {submissionStatusMap[sub.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{sub.score !== undefined && sub.score !== null ? formatNumber(sub.score) : '—'}</TableCell>
                      <TableCell className="text-sm max-w-[150px] truncate">{sub.feedback || '—'}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openGradeDialog(sub)}>
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSubmissionsDialogOpen(false)}>بستن</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Grade Dialog */}
      <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
        <DialogContent className="max-w-sm" dir="rtl">
          <DialogHeader>
            <DialogTitle>نمره‌گذاری: {gradingSubmission?.studentName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>نمره (از {selectedAssignment?.maxScore || 20})</Label>
              <Input type="number" dir="ltr" value={gradeForm.score} onChange={(e) => setGradeForm(f => ({ ...f, score: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>بازخورد</Label>
              <Textarea value={gradeForm.feedback} onChange={(e) => setGradeForm(f => ({ ...f, feedback: e.target.value }))} rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGradeDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleGradeSave} className="bg-green-600 hover:bg-green-700">ذخیره نمره</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
