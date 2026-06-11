'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClipboardList, Plus, Search, Pencil, Trash2, Loader2 } from 'lucide-react';
import { formatNumber, getStatusBadgeClass, getStatusLabel } from './utils';

interface Exam {
  id: string;
  title: string;
  description: string | null;
  type: string;
  level: string;
  courseId: string | null;
  duration: number;
  totalScore: number;
  passingScore: number;
  status: string;
  createdAt: string;
  course: { id: string; title: string } | null;
  _count: { attempts: number };
}

interface SimpleCourse { id: string; title: string }

const typeOptions = [
  { value: 'PLACEMENT', label: 'سنجش' },
  { value: 'LESSON_QUIZ', label: 'آزمون درس' },
  { value: 'MIDTERM', label: 'میان‌ترم' },
  { value: 'FINAL', label: 'پایان‌ترم' },
  { value: 'COMPETITION', label: 'مسابقات' },
  { value: 'PRACTICE', label: 'تمرینی' },
];

const levelOptions = [
  { value: 'BEGINNER', label: 'مقدماتی' },
  { value: 'INTERMEDIATE', label: 'متوسط' },
  { value: 'ADVANCED', label: 'پیشرفته' },
  { value: 'COMPETITION', label: 'مسابقات' },
];

const statusOptions = [
  { value: 'DRAFT', label: 'پیش‌نویس' },
  { value: 'PUBLISHED', label: 'منتشر شده' },
  { value: 'ACTIVE', label: 'فعال' },
  { value: 'CLOSED', label: 'بسته شده' },
  { value: 'ARCHIVED', label: 'بایگانی' },
];

export default function ExamsPanel() {
  const [items, setItems] = useState<Exam[]>([]);
  const [courses, setCourses] = useState<SimpleCourse[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Exam | null>(null);
  const [saving, setSaving] = useState(false);
  const pageSize = 10;

  const [form, setForm] = useState({
    title: '', description: '', type: 'PRACTICE', level: 'BEGINNER',
    courseId: '', duration: '30', totalScore: '100', passingScore: '60', status: 'DRAFT',
  });

  const fetchExams = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: String(page), limit: String(pageSize) });
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      const res = await fetch(`/api/exams?${params}`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.data || []);
        setCount(json.count || 0);
      }
    } catch (err) {
      console.error('Failed to fetch exams:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => { fetchExams(); }, [fetchExams]);
  useEffect(() => {
    fetch('/api/courses?limit=100').then(r => r.json()).then(j => setCourses(j.data || [])).catch(() => {});
  }, []);

  const openAddDialog = () => {
    setEditingItem(null);
    setForm({ title: '', description: '', type: 'PRACTICE', level: 'BEGINNER', courseId: '', duration: '30', totalScore: '100', passingScore: '60', status: 'DRAFT' });
    setDialogOpen(true);
  };

  const openEditDialog = (exam: Exam) => {
    setEditingItem(exam);
    setForm({
      title: exam.title, description: exam.description || '', type: exam.type, level: exam.level,
      courseId: exam.courseId || '', duration: String(exam.duration),
      totalScore: String(exam.totalScore), passingScore: String(exam.passingScore), status: exam.status,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const body = {
        title: form.title, description: form.description || null, type: form.type, level: form.level,
        courseId: form.courseId || null, duration: parseInt(form.duration) || 30,
        totalScore: parseInt(form.totalScore) || 100, passingScore: parseInt(form.passingScore) || 60,
        status: form.status,
      };
      if (editingItem) {
        await fetch(`/api/exams/${editingItem.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        });
      } else {
        await fetch('/api/exams', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        });
      }
      setDialogOpen(false);
      fetchExams();
    } catch (err) {
      console.error('Failed to save exam:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این آزمون اطمینان دارید؟')) return;
    try {
      await fetch(`/api/exams/${id}`, { method: 'DELETE' });
      fetchExams();
    } catch (err) {
      console.error('Failed to delete exam:', err);
    }
  };

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="جستجوی عنوان آزمون..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pr-9" />
          </div>
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v === 'ALL' ? '' : v); setPage(1); }}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="وضعیت" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه</SelectItem>
              {statusOptions.map(s => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAddDialog} className="bg-amber-600 hover:bg-amber-700 gap-2">
          <Plus className="w-4 h-4" />
          افزودن آزمون
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-amber-600" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">عنوان</TableHead>
                  <TableHead className="text-right">نوع</TableHead>
                  <TableHead className="text-right">سطح</TableHead>
                  <TableHead className="text-right">دوره</TableHead>
                  <TableHead className="text-right">مدت</TableHead>
                  <TableHead className="text-right">نمره</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-400">آزمونی یافت نشد</TableCell></TableRow>
                ) : items.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium">{exam.title}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{getStatusLabel(exam.type)}</Badge></TableCell>
                    <TableCell><Badge className={getStatusBadgeClass(exam.level)}>{getStatusLabel(exam.level)}</Badge></TableCell>
                    <TableCell className="text-sm">{exam.course?.title || '—'}</TableCell>
                    <TableCell>{formatNumber(exam.duration)} دقیقه</TableCell>
                    <TableCell>{formatNumber(exam.passingScore)}/{formatNumber(exam.totalScore)}</TableCell>
                    <TableCell><Badge className={getStatusBadgeClass(exam.status)}>{getStatusLabel(exam.status)}</Badge></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(exam)}><Pencil className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDelete(exam.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{formatNumber(count)} آزمون — صفحه {formatNumber(page)} از {formatNumber(totalPages)}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>قبلی</Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>بعدی</Button>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader><DialogTitle>{editingItem ? 'ویرایش آزمون' : 'افزودن آزمون جدید'}</DialogTitle></DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2"><Label>عنوان</Label><Input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div className="space-y-2"><Label>توضیحات</Label><Input value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نوع</Label>
                <Select value={form.type} onValueChange={(v) => setForm(f => ({ ...f, type: v }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{typeOptions.map(t => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>سطح</Label>
                <Select value={form.level} onValueChange={(v) => setForm(f => ({ ...f, level: v }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{levelOptions.map(l => (<SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>))}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>دوره</Label>
              <Select value={form.courseId} onValueChange={(v) => setForm(f => ({ ...f, courseId: v === 'NONE' ? '' : v }))}>
                <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب دوره" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="NONE">بدون دوره</SelectItem>
                  {courses.map(c => (<SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2"><Label>مدت (دقیقه)</Label><Input type="number" dir="ltr" value={form.duration} onChange={(e) => setForm(f => ({ ...f, duration: e.target.value }))} /></div>
              <div className="space-y-2"><Label>نمره کل</Label><Input type="number" dir="ltr" value={form.totalScore} onChange={(e) => setForm(f => ({ ...f, totalScore: e.target.value }))} /></div>
              <div className="space-y-2"><Label>نمره قبولی</Label><Input type="number" dir="ltr" value={form.passingScore} onChange={(e) => setForm(f => ({ ...f, passingScore: e.target.value }))} /></div>
            </div>
            <div className="space-y-2">
              <Label>وضعیت</Label>
              <Select value={form.status} onValueChange={(v) => setForm(f => ({ ...f, status: v }))}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>{statusOptions.map(s => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}</SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-amber-600 hover:bg-amber-700">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingItem ? 'ذخیره' : 'افزودن'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
