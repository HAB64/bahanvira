'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, Plus, Search, Pencil, Trash2, Loader2 } from 'lucide-react';
import { formatNumber, formatDate } from './utils';

interface Branch {
  id: string;
  name: string;
  code: string;
  province: string;
  city: string;
  address: string | null;
  phone: string | null;
  managerName: string | null;
  isActive: boolean;
  createdAt: string;
  _count?: {
    students: number;
    instructors: number;
    classes: number;
  };
}

const STORAGE_KEY = 'vira_branches';

function getBranches(): Branch[] {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch { return []; }
}

function saveBranches(branches: Branch[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(branches));
}

export default function BranchesPanel() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [saving, setSaving] = useState(false);
  const pageSize = 10;

  const [form, setForm] = useState({
    name: '', code: '', province: '', city: '', address: '', phone: '', managerName: '', isActive: true,
  });

  const loadBranches = useCallback(() => {
    try {
      setLoading(true);
      let allBranches = getBranches();

      if (search) {
        const q = search.toLowerCase();
        allBranches = allBranches.filter(b =>
          b.name?.toLowerCase().includes(q) || b.code?.toLowerCase().includes(q) || b.city?.toLowerCase().includes(q)
        );
      }

      setCount(allBranches.length);
      const start = (page - 1) * pageSize;
      setBranches(allBranches.slice(start, start + pageSize));
    } catch (err) {
      console.error('Failed to load branches:', err);
      setBranches([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { loadBranches(); }, [loadBranches]);

  const openAddDialog = () => {
    setEditingBranch(null);
    setForm({ name: '', code: '', province: '', city: '', address: '', phone: '', managerName: '', isActive: true });
    setDialogOpen(true);
  };

  const openEditDialog = (branch: Branch) => {
    setEditingBranch(branch);
    setForm({
      name: branch.name, code: branch.code, province: branch.province, city: branch.city,
      address: branch.address || '', phone: branch.phone || '', managerName: branch.managerName || '',
      isActive: branch.isActive,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    try {
      setSaving(true);
      const all = getBranches();
      if (editingBranch) {
        const idx = all.findIndex(b => b.id === editingBranch.id);
        if (idx !== -1) {
          all[idx] = {
            ...all[idx],
            name: form.name, code: form.code, province: form.province, city: form.city,
            address: form.address || null, phone: form.phone || null, managerName: form.managerName || null,
            isActive: form.isActive,
          };
        }
      } else {
        all.unshift({
          id: `branch_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          name: form.name, code: form.code, province: form.province, city: form.city,
          address: form.address || null, phone: form.phone || null, managerName: form.managerName || null,
          isActive: form.isActive, createdAt: new Date().toISOString(),
        });
      }
      saveBranches(all);
      setDialogOpen(false);
      loadBranches();
    } catch (err) {
      console.error('Failed to save branch:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این شعبه اطمینان دارید؟')) return;
    try {
      saveBranches(getBranches().filter(b => b.id !== id));
      loadBranches();
    } catch (err) {
      console.error('Failed to delete branch:', err);
    }
  };

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="جستجوی نام، کد، شهر..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pr-9" />
        </div>
        <Button onClick={openAddDialog} className="bg-amber-600 hover:bg-amber-700 gap-2">
          <Plus className="w-4 h-4" />
          افزودن شعبه
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
                  <TableHead className="text-right">کد</TableHead>
                  <TableHead className="text-right">استان</TableHead>
                  <TableHead className="text-right">شهر</TableHead>
                  <TableHead className="text-right">تلفن</TableHead>
                  <TableHead className="text-right">مدیر</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {branches.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-400">
                    {search
                      ? 'شعبه‌ای با این عبارت یافت نشد.'
                      : 'هنوز شعبه‌ای ثبت نشده است. با کلیک روی «افزودن شعبه» شروع کنید.'}
                  </TableCell></TableRow>
                ) : branches.map((branch) => (
                  <TableRow key={branch.id}>
                    <TableCell className="font-medium">{branch.name}</TableCell>
                    <TableCell><Badge variant="outline">{branch.code}</Badge></TableCell>
                    <TableCell>{branch.province}</TableCell>
                    <TableCell>{branch.city}</TableCell>
                    <TableCell dir="ltr">{branch.phone || '—'}</TableCell>
                    <TableCell>{branch.managerName || '—'}</TableCell>
                    <TableCell>
                      <Badge className={branch.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {branch.isActive ? 'فعال' : 'غیرفعال'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(branch)}><Pencil className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDelete(branch.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
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
          <span className="text-gray-500">{formatNumber(count)} شعبه — صفحه {formatNumber(page)} از {formatNumber(totalPages)}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>قبلی</Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>بعدی</Button>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader><DialogTitle>{editingBranch ? 'ویرایش شعبه' : 'افزودن شعبه جدید'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>نام شعبه</Label><Input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div className="space-y-2"><Label>کد شعبه</Label><Input dir="ltr" value={form.code} onChange={(e) => setForm(f => ({ ...f, code: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>استان</Label><Input value={form.province} onChange={(e) => setForm(f => ({ ...f, province: e.target.value }))} /></div>
              <div className="space-y-2"><Label>شهر</Label><Input value={form.city} onChange={(e) => setForm(f => ({ ...f, city: e.target.value }))} /></div>
            </div>
            <div className="space-y-2"><Label>آدرس</Label><Input value={form.address} onChange={(e) => setForm(f => ({ ...f, address: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>تلفن</Label><Input dir="ltr" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
              <div className="space-y-2"><Label>مدیر شعبه</Label><Input value={form.managerName} onChange={(e) => setForm(f => ({ ...f, managerName: e.target.value }))} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-amber-600 hover:bg-amber-700">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingBranch ? 'ذخیره' : 'افزودن'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
