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
import { BookOpen, Plus, Search, Pencil, Trash2, Loader2 } from 'lucide-react';
import { formatNumber, formatCurrency, getStatusBadgeClass, getStatusLabel } from './utils';

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  level: string;
  ageRange: string | null;
  sessions: number;
  sessionsPerWeek: number;
  sessionDuration: number;
  price: number;
  status: string;
  capacity: number;
  enrolledCount: number;
  branchId: string | null;
  createdAt: string;
  branch: { id: string; name: string } | null;
  _count: { enrollments: number; classes: number };
}

interface SimpleBranch {
  id: string;
  name: string;
}

const STORAGE_KEY = 'vira_courses';

function getLocalCourses(): Course[] {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch { return []; }
}

function saveLocalCourses(courses: Course[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

const levelOptions = [
  { value: 'BEGINNER', label: 'مقدماتی' },
  { value: 'INTERMEDIATE', label: 'متوسط' },
  { value: 'ADVANCED', label: 'پیشرفته' },
  { value: 'COMPETITION', label: 'مسابقات' },
];

const statusOptions = [
  { value: 'UPCOMING', label: 'پیش‌رو' },
  { value: 'ACTIVE', label: 'فعال' },
  { value: 'COMPLETED', label: 'تکمیل شده' },
  { value: 'CANCELLED', label: 'لغو شده' },
];

export default function CoursesPanel() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [branches, setBranches] = useState<SimpleBranch[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Course | null>(null);
  const [saving, setSaving] = useState(false);
  const pageSize = 10;

  const [form, setForm] = useState({
    title: '', slug: '', description: '', level: 'BEGINNER', ageRange: '',
    sessions: '12', sessionsPerWeek: '2', sessionDuration: '60', price: '0',
    capacity: '15', branchId: '', status: 'ACTIVE',
  });

  const loadCourses = useCallback(() => {
    try {
      setLoading(true);
      let allCourses = getLocalCourses();

      if (search) {
        const q = search.toLowerCase();
        allCourses = allCourses.filter(c => c.title?.toLowerCase().includes(q));
      }
      if (statusFilter) {
        allCourses = allCourses.filter(c => c.status === statusFilter);
      }

      setCount(allCourses.length);
      const start = (page - 1) * pageSize;
      setCourses(allCourses.slice(start, start + pageSize));
    } catch (err) {
      console.error('Failed to load courses:', err);
      setCourses([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => { loadCourses(); }, [loadCourses]);

  useEffect(() => {
    try {
      const storedBranches = localStorage.getItem('vira_branches');
      if (storedBranches) setBranches(JSON.parse(storedBranches));
    } catch {}
  }, []);

  const openAddDialog = () => {
    setEditingItem(null);
    setForm({ title: '', slug: '', description: '', level: 'BEGINNER', ageRange: '', sessions: '12', sessionsPerWeek: '2', sessionDuration: '60', price: '0', capacity: '15', branchId: '', status: 'ACTIVE' });
    setDialogOpen(true);
  };

  const openEditDialog = (course: Course) => {
    setEditingItem(course);
    setForm({
      title: course.title, slug: course.slug, description: course.description || '',
      level: course.level, ageRange: course.ageRange || '', sessions: String(course.sessions),
      sessionsPerWeek: String(course.sessionsPerWeek), sessionDuration: String(course.sessionDuration),
      price: String(course.price), capacity: String(course.capacity), branchId: course.branchId || '',
      status: course.status,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    try {
      setSaving(true);
      const all = getLocalCourses();
      const slug = form.slug || form.title.replace(/\s+/g, '-').replace(/[^\w\u0600-\u06FF-]/g, '');
      const data = {
        title: form.title, slug, description: form.description || null, level: form.level,
        ageRange: form.ageRange || null, sessions: parseInt(form.sessions) || 12,
        sessionsPerWeek: parseInt(form.sessionsPerWeek) || 2,
        sessionDuration: parseInt(form.sessionDuration) || 60,
        price: parseInt(form.price) || 0, capacity: parseInt(form.capacity) || 15,
        branchId: form.branchId || null, status: form.status,
      };
      if (editingItem) {
        const idx = all.findIndex(c => c.id === editingItem.id);
        if (idx !== -1) {
          all[idx] = { ...all[idx], ...data };
        }
      } else {
        all.unshift({
          id: `course_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          ...data,
          enrolledCount: 0,
          branch: null,
          createdAt: new Date().toISOString(),
          _count: { enrollments: 0, classes: 0 },
        });
      }
      saveLocalCourses(all);
      setDialogOpen(false);
      loadCourses();
    } catch (err) {
      console.error('Failed to save course:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این دوره اطمینان دارید؟')) return;
    try {
      saveLocalCourses(getLocalCourses().filter(c => c.id !== id));
      loadCourses();
    } catch (err) {
      console.error('Failed to delete course:', err);
    }
  };

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="جستجوی عنوان دوره..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pr-9" />
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
          افزودن دوره
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
                  <TableHead className="text-right">سطح</TableHead>
                  <TableHead className="text-right">جلسات</TableHead>
                  <TableHead className="text-right">قیمت</TableHead>
                  <TableHead className="text-right">ظرفیت</TableHead>
                  <TableHead className="text-right">ثبت‌نام</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-400">
                    {search || statusFilter
                      ? 'دوره‌ای با این فیلترها یافت نشد.'
                      : 'هنوز دوره‌ای ثبت نشده است. با کلیک روی «افزودن دوره» شروع کنید.'}
                  </TableCell></TableRow>
                ) : courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell><Badge className={getStatusBadgeClass(course.level)}>{getStatusLabel(course.level)}</Badge></TableCell>
                    <TableCell>{formatNumber(course.sessions)} جلسه</TableCell>
                    <TableCell>{formatCurrency(course.price)}</TableCell>
                    <TableCell>{formatNumber(course.capacity)}</TableCell>
                    <TableCell>{formatNumber(course.enrolledCount)}</TableCell>
                    <TableCell><Badge className={getStatusBadgeClass(course.status)}>{getStatusLabel(course.status)}</Badge></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(course)}><Pencil className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDelete(course.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
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
          <span className="text-gray-500">{formatNumber(count)} دوره — صفحه {formatNumber(page)} از {formatNumber(totalPages)}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>قبلی</Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>بعدی</Button>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader><DialogTitle>{editingItem ? 'ویرایش دوره' : 'افزودن دوره جدید'}</DialogTitle></DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>عنوان</Label><Input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div className="space-y-2"><Label>اسلاگ</Label><Input dir="ltr" value={form.slug} onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="auto-generated" /></div>
            </div>
            <div className="space-y-2"><Label>توضیحات</Label><Input value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>سطح</Label>
                <Select value={form.level} onValueChange={(v) => setForm(f => ({ ...f, level: v }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{levelOptions.map(l => (<SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>))}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>محدوده سنی</Label><Input value={form.ageRange} onChange={(e) => setForm(f => ({ ...f, ageRange: e.target.value }))} placeholder="7-12" /></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2"><Label>جلسات</Label><Input type="number" dir="ltr" value={form.sessions} onChange={(e) => setForm(f => ({ ...f, sessions: e.target.value }))} /></div>
              <div className="space-y-2"><Label>جلسات/هفته</Label><Input type="number" dir="ltr" value={form.sessionsPerWeek} onChange={(e) => setForm(f => ({ ...f, sessionsPerWeek: e.target.value }))} /></div>
              <div className="space-y-2"><Label>مدت (دقیقه)</Label><Input type="number" dir="ltr" value={form.sessionDuration} onChange={(e) => setForm(f => ({ ...f, sessionDuration: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2"><Label>قیمت (ریال)</Label><Input type="number" dir="ltr" value={form.price} onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))} /></div>
              <div className="space-y-2"><Label>ظرفیت</Label><Input type="number" dir="ltr" value={form.capacity} onChange={(e) => setForm(f => ({ ...f, capacity: e.target.value }))} /></div>
              <div className="space-y-2">
                <Label>وضعیت</Label>
                <Select value={form.status} onValueChange={(v) => setForm(f => ({ ...f, status: v }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{statusOptions.map(s => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>شعبه</Label>
              <Select value={form.branchId} onValueChange={(v) => setForm(f => ({ ...f, branchId: v === 'NONE' ? '' : v }))}>
                <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب شعبه" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="NONE">بدون شعبه</SelectItem>
                  {branches.map(b => (<SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>))}
                </SelectContent>
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
