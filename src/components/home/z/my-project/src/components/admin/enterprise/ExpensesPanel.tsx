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
import { TrendingDown, Plus, Search, Pencil, Trash2, Loader2 } from 'lucide-react';
import { formatNumber, formatDate, formatCurrency, formatCurrencyFull, getStatusLabel } from './utils';
import { getSalaryRecords, addSalaryRecord, updateSalaryRecord, saveSalaryRecords } from '@/lib/storage';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string | null;
  branchId: string | null;
  payee: string | null;
  paidAt: string;
  createdAt: string;
  branch: { id: string; name: string } | null;
}

interface SimpleBranch { id: string; name: string }

const STORAGE_KEY = 'vira_expenses';

function getLocalExpenses(): Expense[] {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch { return []; }
}

function saveLocalExpenses(items: Expense[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const categoryOptions = [
  { value: 'OPERATIONAL', label: 'عملیاتی' },
  { value: 'SALARY', label: 'حقوق' },
  { value: 'RENT', label: 'اجاره' },
  { value: 'UTILITIES', label: 'قبوض' },
  { value: 'MARKETING', label: 'بازاریابی' },
  { value: 'EQUIPMENT', label: 'تجهیزات' },
  { value: 'MATERIALS', label: 'مواد اولیه' },
  { value: 'OTHER', label: 'سایر' },
];

export default function ExpensesPanel() {
  const [items, setItems] = useState<Expense[]>([]);
  const [branches, setBranches] = useState<SimpleBranch[]>([]);
  const [count, setCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Expense | null>(null);
  const [saving, setSaving] = useState(false);
  const pageSize = 10;

  const [form, setForm] = useState({
    amount: '', category: 'OPERATIONAL', description: '', branchId: '', payee: '', paidAt: '',
  });

  const loadExpenses = useCallback(() => {
    try {
      setLoading(true);
      let allItems = getLocalExpenses();

      // Also derive expenses from salary records
      const salaries = getSalaryRecords();
      const salaryExpenses: Expense[] = salaries.map(s => ({
        id: `sal_exp_${s.id}`,
        amount: s.baseAmount || s.amount || 0,
        category: 'SALARY',
        description: `حقوق ${s.staffName || s.staffId || ''} - ${s.month || ''}`,
        branchId: null,
        payee: s.staffName || null,
        paidAt: s.paidAt || s.createdAt || new Date().toISOString(),
        createdAt: s.createdAt || new Date().toISOString(),
        branch: null,
      }));

      // Merge: avoid duplicates
      const existingIds = new Set(allItems.map(e => e.id));
      for (const se of salaryExpenses) {
        if (!existingIds.has(se.id)) {
          allItems.push(se);
        }
      }

      if (search) {
        const q = search.toLowerCase();
        allItems = allItems.filter(e =>
          e.description?.toLowerCase().includes(q) || e.payee?.toLowerCase().includes(q)
        );
      }
      if (categoryFilter) {
        allItems = allItems.filter(e => e.category === categoryFilter);
      }

      setCount(allItems.length);
      setTotalAmount(allItems.reduce((sum, e) => sum + (e.amount || 0), 0));
      const start = (page - 1) * pageSize;
      setItems(allItems.slice(start, start + pageSize));
    } catch (err) {
      console.error('Failed to load expenses:', err);
      setItems([]);
      setCount(0);
      setTotalAmount(0);
    } finally {
      setLoading(false);
    }
  }, [page, search, categoryFilter]);

  useEffect(() => { loadExpenses(); }, [loadExpenses]);

  useEffect(() => {
    try {
      const storedBranches = localStorage.getItem('vira_branches');
      if (storedBranches) setBranches(JSON.parse(storedBranches));
    } catch {}
  }, []);

  const openAddDialog = () => {
    setEditingItem(null);
    setForm({ amount: '', category: 'OPERATIONAL', description: '', branchId: '', payee: '', paidAt: new Date().toISOString().split('T')[0] });
    setDialogOpen(true);
  };

  const openEditDialog = (item: Expense) => {
    setEditingItem(item);
    setForm({
      amount: String(item.amount), category: item.category, description: item.description || '',
      branchId: item.branchId || '', payee: item.payee || '',
      paidAt: item.paidAt ? new Date(item.paidAt).toISOString().split('T')[0] : '',
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    try {
      setSaving(true);
      const all = getLocalExpenses();
      const branch = form.branchId ? branches.find(b => b.id === form.branchId) : null;
      const data = {
        amount: parseInt(form.amount) || 0, category: form.category,
        description: form.description || null, branchId: form.branchId || null,
        payee: form.payee || null,
        paidAt: form.paidAt ? new Date(form.paidAt).toISOString() : new Date().toISOString(),
        branch: branch ? { id: branch.id, name: branch.name } : null,
      };
      if (editingItem) {
        const idx = all.findIndex(e => e.id === editingItem.id);
        if (idx !== -1) {
          all[idx] = { ...all[idx], ...data };
        }
      } else {
        all.unshift({
          id: `exp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          ...data,
          createdAt: new Date().toISOString(),
        });
      }
      saveLocalExpenses(all);
      setDialogOpen(false);
      loadExpenses();
    } catch (err) {
      console.error('Failed to save expense:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این هزینه اطمینان دارید؟')) return;
    try {
      saveLocalExpenses(getLocalExpenses().filter(e => e.id !== id));
      loadExpenses();
    } catch (err) {
      console.error('Failed to delete expense:', err);
    }
  };

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <Card className="border-red-200 bg-red-50/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100"><TrendingDown className="w-5 h-5 text-red-600" /></div>
              <div>
                <p className="text-sm text-red-700">مجموع هزینه‌ها</p>
                <p className="text-xl font-bold text-red-700">{formatCurrencyFull(totalAmount)}</p>
              </div>
            </div>
            <span className="text-sm text-red-600">{formatNumber(count)} رکورد</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="جستجوی توضیحات، ذی‌نفع..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pr-9" />
          </div>
          <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v === 'ALL' ? '' : v); setPage(1); }}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="دسته‌بندی" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه</SelectItem>
              {categoryOptions.map(c => (<SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAddDialog} className="bg-red-600 hover:bg-red-700 gap-2">
          <Plus className="w-4 h-4" />
          ثبت هزینه
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-red-600" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">مبلغ</TableHead>
                  <TableHead className="text-right">دسته‌بندی</TableHead>
                  <TableHead className="text-right">توضیحات</TableHead>
                  <TableHead className="text-right">ذی‌نفع</TableHead>
                  <TableHead className="text-right">شعبه</TableHead>
                  <TableHead className="text-right">تاریخ پرداخت</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-gray-400">
                    {search || categoryFilter
                      ? 'هزینه‌ای با این فیلترها یافت نشد.'
                      : 'هنوز هزینه‌ای ثبت نشده است. با ثبت حقوق کارکنان یا کلیک روی «ثبت هزینه» شروع کنید.'}
                  </TableCell></TableRow>
                ) : items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-red-700">{formatCurrencyFull(item.amount)}</TableCell>
                    <TableCell><Badge variant="outline">{getStatusLabel(item.category)}</Badge></TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate">{item.description || '—'}</TableCell>
                    <TableCell className="text-sm">{item.payee || '—'}</TableCell>
                    <TableCell className="text-sm">{item.branch?.name || '—'}</TableCell>
                    <TableCell className="text-sm text-gray-500">{formatDate(item.paidAt)}</TableCell>
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
          <span className="text-gray-500">{formatNumber(count)} رکورد — صفحه {formatNumber(page)} از {formatNumber(totalPages)}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>قبلی</Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>بعدی</Button>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader><DialogTitle>{editingItem ? 'ویرایش هزینه' : 'ثبت هزینه جدید'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>مبلغ (ریال)</Label><Input type="number" dir="ltr" value={form.amount} onChange={(e) => setForm(f => ({ ...f, amount: e.target.value }))} /></div>
            <div className="space-y-2">
              <Label>دسته‌بندی</Label>
              <Select value={form.category} onValueChange={(v) => setForm(f => ({ ...f, category: v }))}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>{categoryOptions.map(c => (<SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>توضیحات</Label><Input value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} /></div>
            <div className="space-y-2"><Label>ذی‌نفع</Label><Input value={form.payee} onChange={(e) => setForm(f => ({ ...f, payee: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>شعبه</Label>
                <Select value={form.branchId} onValueChange={(v) => setForm(f => ({ ...f, branchId: v === 'NONE' ? '' : v }))}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">بدون شعبه</SelectItem>
                    {branches.map(b => (<SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>تاریخ پرداخت</Label><Input type="date" dir="ltr" value={form.paidAt} onChange={(e) => setForm(f => ({ ...f, paidAt: e.target.value }))} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-red-600 hover:bg-red-700">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingItem ? 'ذخیره' : 'ثبت'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
