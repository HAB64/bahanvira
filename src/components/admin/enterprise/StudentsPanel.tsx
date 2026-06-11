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
import { UserCheck, Plus, Search, Pencil, Trash2, Loader2 } from 'lucide-react';
import { formatNumber, formatDate, getStatusBadgeClass, getStatusLabel } from './utils';
import { getStudents, addStudent, updateStudent, saveStudents } from '@/lib/storage';

interface Student {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  age: number;
  parentName: string | null;
  parentPhone: string | null;
  level: string;
  province: string | null;
  city: string | null;
  isActive: boolean;
  branchId: string | null;
  createdAt: string;
  branch: { id: string; name: string; city: string } | null;
  _count: { enrollments: number; tuitions: number };
}

interface SimpleBranch {
  id: string;
  name: string;
  city: string;
}

const levelOptions = [
  { value: 'BEGINNER', label: 'مقدماتی' },
  { value: 'INTERMEDIATE', label: 'متوسط' },
  { value: 'ADVANCED', label: 'پیشرفته' },
  { value: 'COMPETITION', label: 'مسابقات' },
];

export default function StudentsPanel() {
  const [students, setStudents] = useState<Student[]>([]);
  const [branches, setBranches] = useState<SimpleBranch[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Student | null>(null);
  const [saving, setSaving] = useState(false);
  const pageSize = 10;

  const [form, setForm] = useState({
    name: '', phone: '', email: '', age: '7', parentName: '', parentPhone: '',
    level: 'BEGINNER', province: '', city: '', branchId: '', isActive: true,
  });

  const loadStudents = useCallback(() => {
    try {
      setLoading(true);
      let allStudents = getStudents() as Student[];

      if (search) {
        const q = search.toLowerCase();
        allStudents = allStudents.filter(s =>
          s.name?.toLowerCase().includes(q) || s.phone?.toLowerCase().includes(q)
        );
      }
      if (levelFilter) {
        allStudents = allStudents.filter(s => s.level === levelFilter);
      }

      setCount(allStudents.length);
      const start = (page - 1) * pageSize;
      const paged = allStudents.slice(start, start + pageSize);
      setStudents(paged);
    } catch (err) {
      console.error('Failed to load students:', err);
      setStudents([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, [page, search, levelFilter]);

  useEffect(() => { loadStudents(); }, [loadStudents]);

  useEffect(() => {
    try {
      const storedBranches = localStorage.getItem('vira_branches');
      if (storedBranches) {
        setBranches(JSON.parse(storedBranches));
      }
    } catch {}
  }, []);

  const openAddDialog = () => {
    setEditingItem(null);
    setForm({ name: '', phone: '', email: '', age: '7', parentName: '', parentPhone: '', level: 'BEGINNER', province: '', city: '', branchId: '', isActive: true });
    setDialogOpen(true);
  };

  const openEditDialog = (student: Student) => {
    setEditingItem(student);
    setForm({
      name: student.name, phone: student.phone, email: student.email || '', age: String(student.age),
      parentName: student.parentName || '', parentPhone: student.parentPhone || '',
      level: student.level, province: student.province || '', city: student.city || '',
      branchId: student.branchId || '', isActive: student.isActive,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    try {
      setSaving(true);
      const body = {
        name: form.name, phone: form.phone, email: form.email || null, age: parseInt(form.age) || 7,
        parentName: form.parentName || null, parentPhone: form.parentPhone || null,
        level: form.level, province: form.province || null, city: form.city || null,
        branchId: form.branchId || null, isActive: form.isActive,
      };
      if (editingItem) {
        updateStudent(editingItem.id, body);
      } else {
        addStudent({
          id: `stu_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          ...body,
          enrolledCourses: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as any);
      }
      setDialogOpen(false);
      loadStudents();
    } catch (err) {
      console.error('Failed to save student:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این کارآموز اطمینان دارید؟')) return;
    try {
      const all = getStudents().filter(s => s.id !== id);
      saveStudents(all);
      loadStudents();
    } catch (err) {
      console.error('Failed to delete student:', err);
    }
  };

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="جستجوی نام، تلفن..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pr-9" />
          </div>
          <Select value={levelFilter} onValueChange={(v) => { setLevelFilter(v === 'ALL' ? '' : v); setPage(1); }}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="سطح" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه سطوح</SelectItem>
              {levelOptions.map(l => (<SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAddDialog} className="bg-amber-600 hover:bg-amber-700 gap-2">
          <Plus className="w-4 h-4" />
          افزودن کارآموز
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
                  <TableHead className="text-right">نام</TableHead>
                  <TableHead className="text-right">تلفن</TableHead>
                  <TableHead className="text-right">سن</TableHead>
                  <TableHead className="text-right">ولی</TableHead>
                  <TableHead className="text-right">سطح</TableHead>
                  <TableHead className="text-right">شعبه</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-400">
                    {search || levelFilter
                      ? 'کارآموزی با این فیلترها یافت نشد. فیلترها را تغییر دهید.'
                      : 'هنوز کارآموزی ثبت نشده است. با کلیک روی «افزودن کارآموز» شروع کنید.'}
                  </TableCell></TableRow>
                ) : students.map((st) => (
                  <TableRow key={st.id}>
                    <TableCell className="font-medium">{st.name}</TableCell>
                    <TableCell dir="ltr">{st.phone}</TableCell>
                    <TableCell>{formatNumber(st.age)}</TableCell>
                    <TableCell className="text-sm">{st.parentName || '—'}</TableCell>
                    <TableCell><Badge className={getStatusBadgeClass(st.level)}>{getStatusLabel(st.level)}</Badge></TableCell>
                    <TableCell>{st.branch?.name || '—'}</TableCell>
                    <TableCell>
                      <Badge className={st.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {st.isActive ? 'فعال' : 'غیرفعال'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(st)}><Pencil className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDelete(st.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
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
          <span className="text-gray-500">{formatNumber(count)} کارآموز — صفحه {formatNumber(page)} از {formatNumber(totalPages)}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>قبلی</Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>بعدی</Button>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader><DialogTitle>{editingItem ? 'ویرایش کارآموز' : 'افزودن کارآموز جدید'}</DialogTitle></DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>نام</Label><Input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div className="space-y-2"><Label>تلفن</Label><Input dir="ltr" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>ایمیل</Label><Input type="email" dir="ltr" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} /></div>
              <div className="space-y-2"><Label>سن</Label><Input type="number" dir="ltr" value={form.age} onChange={(e) => setForm(f => ({ ...f, age: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>نام ولی</Label><Input value={form.parentName} onChange={(e) => setForm(f => ({ ...f, parentName: e.target.value }))} /></div>
              <div className="space-y-2"><Label>تلفن ولی</Label><Input dir="ltr" value={form.parentPhone} onChange={(e) => setForm(f => ({ ...f, parentPhone: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>سطح</Label>
                <Select value={form.level} onValueChange={(v) => setForm(f => ({ ...f, level: v }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{levelOptions.map(l => (<SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>))}</SelectContent>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>استان</Label><Input value={form.province} onChange={(e) => setForm(f => ({ ...f, province: e.target.value }))} /></div>
              <div className="space-y-2"><Label>شهر</Label><Input value={form.city} onChange={(e) => setForm(f => ({ ...f, city: e.target.value }))} /></div>
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
