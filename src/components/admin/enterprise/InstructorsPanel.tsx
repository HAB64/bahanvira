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
import { GraduationCap, Plus, Search, Pencil, Trash2, Loader2, Star } from 'lucide-react';
import { formatNumber } from './utils';
import { getStaff, addStaff, updateStaff, deleteStaff } from '@/lib/storage';

interface Instructor {
  id: string;
  userId: string;
  specialties: string;
  bio: string | null;
  rating: number;
  totalClasses: number;
  salaryBase: number;
  isActive: boolean;
  branchId: string | null;
  createdAt: string;
  user: { id: string; name: string; email: string; phone: string | null; avatar: string | null };
  branch: { id: string; name: string; city: string } | null;
  _count: { classInstructor: number };
}

interface SimpleBranch {
  id: string;
  name: string;
  city: string;
}

export default function InstructorsPanel() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [branches, setBranches] = useState<SimpleBranch[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Instructor | null>(null);
  const [saving, setSaving] = useState(false);
  const pageSize = 10;

  const [form, setForm] = useState({
    name: '', phone: '', specialties: '', bio: '', branchId: '', salaryBase: '', isActive: true,
  });

  const loadInstructors = useCallback(() => {
    try {
      setLoading(true);
      // Filter staff by role='instructor'
      let allStaff = getStaff().filter(s => s.role === 'instructor') as any[];

      if (search) {
        const q = search.toLowerCase();
        allStaff = allStaff.filter(s => s.name?.toLowerCase().includes(q));
      }

      // Map staff to Instructor interface
      const mapped: Instructor[] = allStaff.map(s => ({
        id: s.id,
        userId: s.id,
        specialties: s.specialties ? (Array.isArray(s.specialties) ? JSON.stringify(s.specialties) : s.specialties) : '[]',
        bio: s.bio || null,
        rating: s.rating || 0,
        totalClasses: s.totalClasses || 0,
        salaryBase: s.salaryBase || 0,
        isActive: s.isActive !== false,
        branchId: s.branchId || null,
        createdAt: s.createdAt || new Date().toISOString(),
        user: { id: s.id, name: s.name, email: s.email || '', phone: s.phone || null, avatar: null },
        branch: s.branchId ? { id: s.branchId, name: s.branchName || '—', city: '' } : null,
        _count: { classInstructor: 0 },
      }));

      setCount(mapped.length);
      const start = (page - 1) * pageSize;
      setInstructors(mapped.slice(start, start + pageSize));
    } catch (err) {
      console.error('Failed to load instructors:', err);
      setInstructors([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { loadInstructors(); }, [loadInstructors]);

  useEffect(() => {
    try {
      const storedBranches = localStorage.getItem('vira_branches');
      if (storedBranches) setBranches(JSON.parse(storedBranches));
    } catch {}
  }, []);

  const openAddDialog = () => {
    setEditingItem(null);
    setForm({ name: '', phone: '', specialties: '', bio: '', branchId: '', salaryBase: '', isActive: true });
    setDialogOpen(true);
  };

  const openEditDialog = (item: Instructor) => {
    setEditingItem(item);
    setForm({
      name: item.user?.name || '', phone: item.user?.phone || '',
      specialties: item.specialties, bio: item.bio || '',
      branchId: item.branchId || '', salaryBase: String(item.salaryBase), isActive: item.isActive,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    try {
      setSaving(true);
      if (editingItem) {
        updateStaff(editingItem.id, {
          name: form.name,
          phone: form.phone || null,
          specialties: form.specialties || '[]',
          bio: form.bio || null,
          branchId: form.branchId || null,
          salaryBase: parseInt(form.salaryBase) || 0,
          isActive: form.isActive,
        });
      } else {
        addStaff({
          id: `staff_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          name: form.name,
          phone: form.phone || '',
          email: '',
          role: 'instructor',
          specialties: form.specialties || '[]',
          bio: form.bio || null,
          branchId: form.branchId || null,
          salaryBase: parseInt(form.salaryBase) || 0,
          isActive: form.isActive,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as any);
      }
      setDialogOpen(false);
      loadInstructors();
    } catch (err) {
      console.error('Failed to save instructor:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این استاد اطمینان دارید؟')) return;
    try {
      deleteStaff(id);
      loadInstructors();
    } catch (err) {
      console.error('Failed to delete instructor:', err);
    }
  };

  const parseSpecialties = (s: string) => {
    try { return JSON.parse(s); } catch { return [s]; }
  };

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="جستجوی نام، تخصص..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pr-9" />
        </div>
        <Button onClick={openAddDialog} className="bg-amber-600 hover:bg-amber-700 gap-2">
          <Plus className="w-4 h-4" />
          افزودن استاد
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
                  <TableHead className="text-right">تخصص‌ها</TableHead>
                  <TableHead className="text-right">شعبه</TableHead>
                  <TableHead className="text-right">امتیاز</TableHead>
                  <TableHead className="text-right">کلاس‌ها</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instructors.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-gray-400">
                    {search
                      ? 'استادی با این عبارت یافت نشد.'
                      : 'هنوز استادی ثبت نشده است. با کلیک روی «افزودن استاد» شروع کنید.'}
                  </TableCell></TableRow>
                ) : instructors.map((inst) => (
                  <TableRow key={inst.id}>
                    <TableCell className="font-medium">{inst.user?.name || '—'}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {parseSpecialties(inst.specialties).map((s: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">{s}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{inst.branch?.name || '—'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{inst.rating.toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatNumber(inst.totalClasses)}</TableCell>
                    <TableCell>
                      <Badge className={inst.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {inst.isActive ? 'فعال' : 'غیرفعال'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(inst)}><Pencil className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDelete(inst.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
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
          <span className="text-gray-500">{formatNumber(count)} استاد — صفحه {formatNumber(page)} از {formatNumber(totalPages)}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>قبلی</Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>بعدی</Button>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader><DialogTitle>{editingItem ? 'ویرایش استاد' : 'افزودن استاد جدید'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>نام</Label><Input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="space-y-2"><Label>تلفن</Label><Input dir="ltr" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
            <div className="space-y-2">
              <Label>تخصص‌ها (JSON)</Label>
              <Input dir="ltr" value={form.specialties} onChange={(e) => setForm(f => ({ ...f, specialties: e.target.value }))} placeholder='["چرتکه","حساب ذهنی"]' />
            </div>
            <div className="space-y-2"><Label>بیوگرافی</Label><Input value={form.bio} onChange={(e) => setForm(f => ({ ...f, bio: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-4">
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
              <div className="space-y-2"><Label>حقوق پایه (ریال)</Label><Input type="number" dir="ltr" value={form.salaryBase} onChange={(e) => setForm(f => ({ ...f, salaryBase: e.target.value }))} /></div>
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
