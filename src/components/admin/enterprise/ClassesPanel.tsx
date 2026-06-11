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
import { Calendar, Plus, Search, Pencil, Trash2, Loader2 } from 'lucide-react';
import { formatNumber, getStatusBadgeClass, getStatusLabel } from './utils';
import { getStaff } from '@/lib/storage';

interface ClassItem {
  id: string;
  courseId: string;
  instructorId: string | null;
  branchId: string | null;
  dayOfWeek: string | null;
  startTime: string;
  endTime: string;
  location: string | null;
  isOnline: boolean;
  status: string;
  createdAt: string;
  course: { id: string; title: string; level: string };
  instructor: { id: string; user: { name: string } } | null;
  branch: { id: string; name: string } | null;
}

interface SimpleCourse { id: string; title: string }
interface SimpleInstructor { id: string; name: string }
interface SimpleBranch { id: string; name: string }

const STORAGE_KEY = 'vira_classes';

function getLocalClasses(): ClassItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch { return []; }
}

function saveLocalClasses(items: ClassItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const dayOptions = [
  { value: 'SATURDAY', label: 'شنبه' },
  { value: 'SUNDAY', label: 'یکشنبه' },
  { value: 'MONDAY', label: 'دوشنبه' },
  { value: 'TUESDAY', label: 'سه‌شنبه' },
  { value: 'WEDNESDAY', label: 'چهارشنبه' },
  { value: 'THURSDAY', label: 'پنج‌شنبه' },
  { value: 'FRIDAY', label: 'جمعه' },
];

export default function ClassesPanel() {
  const [items, setItems] = useState<ClassItem[]>([]);
  const [courses, setCourses] = useState<SimpleCourse[]>([]);
  const [instructors, setInstructors] = useState<SimpleInstructor[]>([]);
  const [branches, setBranches] = useState<SimpleBranch[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ClassItem | null>(null);
  const [saving, setSaving] = useState(false);
  const pageSize = 10;

  const [form, setForm] = useState({
    courseId: '', instructorId: '', branchId: '', dayOfWeek: 'SATURDAY',
    startTime: '16:00', endTime: '17:30', location: '', isOnline: false,
  });

  const loadClasses = useCallback(() => {
    try {
      setLoading(true);
      let allItems = getLocalClasses();

      if (search) {
        const q = search.toLowerCase();
        allItems = allItems.filter(c =>
          c.course?.title?.toLowerCase().includes(q) || c.location?.toLowerCase().includes(q)
        );
      }

      setCount(allItems.length);
      const start = (page - 1) * pageSize;
      setItems(allItems.slice(start, start + pageSize));
    } catch (err) {
      console.error('Failed to load classes:', err);
      setItems([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { loadClasses(); }, [loadClasses]);

  // Load dropdown data from localStorage
  useEffect(() => {
    try {
      // Courses
      const storedCourses = localStorage.getItem('vira_courses');
      if (storedCourses) {
        setCourses(JSON.parse(storedCourses).map((c: any) => ({ id: c.id, title: c.title })));
      }
      // Instructors (from staff with role=instructor)
      const staff = getStaff().filter(s => s.role === 'instructor');
      setInstructors(staff.map(s => ({ id: s.id, name: s.name })));
      // Branches
      const storedBranches = localStorage.getItem('vira_branches');
      if (storedBranches) {
        setBranches(JSON.parse(storedBranches).map((b: any) => ({ id: b.id, name: b.name })));
      }
    } catch {}
  }, []);

  const openAddDialog = () => {
    setEditingItem(null);
    setForm({ courseId: '', instructorId: '', branchId: '', dayOfWeek: 'SATURDAY', startTime: '16:00', endTime: '17:30', location: '', isOnline: false });
    setDialogOpen(true);
  };

  const openEditDialog = (item: ClassItem) => {
    setEditingItem(item);
    setForm({
      courseId: item.courseId, instructorId: item.instructorId || '', branchId: item.branchId || '',
      dayOfWeek: item.dayOfWeek || 'SATURDAY', startTime: item.startTime, endTime: item.endTime,
      location: item.location || '', isOnline: item.isOnline,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    try {
      setSaving(true);
      const all = getLocalClasses();
      const course = courses.find(c => c.id === form.courseId);
      const instructor = form.instructorId ? instructors.find(i => i.id === form.instructorId) : null;
      const branch = form.branchId ? branches.find(b => b.id === form.branchId) : null;

      const data = {
        courseId: form.courseId, instructorId: form.instructorId || null,
        branchId: form.branchId || null, dayOfWeek: form.dayOfWeek,
        startTime: form.startTime, endTime: form.endTime,
        location: form.location || null, isOnline: form.isOnline,
        course: course ? { id: course.id, title: course.title, level: '' } : { id: '', title: '', level: '' },
        instructor: instructor ? { id: instructor.id, user: { name: instructor.name } } : null,
        branch: branch ? { id: branch.id, name: branch.name } : null,
      };

      if (editingItem) {
        const idx = all.findIndex(c => c.id === editingItem.id);
        if (idx !== -1) {
          all[idx] = { ...all[idx], ...data };
        }
      } else {
        all.unshift({
          id: `class_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          ...data,
          status: 'SCHEDULED',
          createdAt: new Date().toISOString(),
        });
      }
      saveLocalClasses(all);
      setDialogOpen(false);
      loadClasses();
    } catch (err) {
      console.error('Failed to save class:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این کلاس اطمینان دارید؟')) return;
    try {
      saveLocalClasses(getLocalClasses().filter(c => c.id !== id));
      loadClasses();
    } catch (err) {
      console.error('Failed to delete class:', err);
    }
  };

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="جستجوی دوره، مکان..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pr-9" />
        </div>
        <Button onClick={openAddDialog} className="bg-amber-600 hover:bg-amber-700 gap-2">
          <Plus className="w-4 h-4" />
          افزودن کلاس
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
                  <TableHead className="text-right">دوره</TableHead>
                  <TableHead className="text-right">استاد</TableHead>
                  <TableHead className="text-right">شعبه</TableHead>
                  <TableHead className="text-right">روز</TableHead>
                  <TableHead className="text-right">ساعت</TableHead>
                  <TableHead className="text-right">نوع</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-400">
                    {search
                      ? 'کلاسی با این عبارت یافت نشد.'
                      : 'هنوز کلاسی ثبت نشده است. ابتدا دوره و استاد اضافه کنید، سپس کلاس تعریف کنید.'}
                  </TableCell></TableRow>
                ) : items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.course?.title || '—'}</TableCell>
                    <TableCell>{item.instructor?.user?.name || '—'}</TableCell>
                    <TableCell>{item.branch?.name || '—'}</TableCell>
                    <TableCell><Badge variant="outline">{item.dayOfWeek ? getStatusLabel(item.dayOfWeek) : '—'}</Badge></TableCell>
                    <TableCell dir="ltr">{item.startTime} - {item.endTime}</TableCell>
                    <TableCell>
                      <Badge className={item.isOnline ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                        {item.isOnline ? 'آنلاین' : 'حضوری'}
                      </Badge>
                    </TableCell>
                    <TableCell><Badge className={getStatusBadgeClass(item.status)}>{getStatusLabel(item.status)}</Badge></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(item)}><Pencil className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDelete(item.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
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
          <span className="text-gray-500">{formatNumber(count)} کلاس — صفحه {formatNumber(page)} از {formatNumber(totalPages)}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>قبلی</Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>بعدی</Button>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader><DialogTitle>{editingItem ? 'ویرایش کلاس' : 'افزودن کلاس جدید'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>دوره</Label>
              <Select value={form.courseId} onValueChange={(v) => setForm(f => ({ ...f, courseId: v }))}>
                <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب دوره" /></SelectTrigger>
                <SelectContent>{courses.map(c => (<SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>استاد</Label>
                <Select value={form.instructorId} onValueChange={(v) => setForm(f => ({ ...f, instructorId: v === 'NONE' ? '' : v }))}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب استاد" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">بدون استاد</SelectItem>
                    {instructors.map(i => (<SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>))}
                  </SelectContent>
                </Select>
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
            <div className="space-y-2">
              <Label>روز هفته</Label>
              <Select value={form.dayOfWeek} onValueChange={(v) => setForm(f => ({ ...f, dayOfWeek: v }))}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>{dayOptions.map(d => (<SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>ساعت شروع</Label><Input dir="ltr" value={form.startTime} onChange={(e) => setForm(f => ({ ...f, startTime: e.target.value }))} /></div>
              <div className="space-y-2"><Label>ساعت پایان</Label><Input dir="ltr" value={form.endTime} onChange={(e) => setForm(f => ({ ...f, endTime: e.target.value }))} /></div>
            </div>
            <div className="space-y-2"><Label>مکان</Label><Input value={form.location} onChange={(e) => setForm(f => ({ ...f, location: e.target.value }))} /></div>
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
