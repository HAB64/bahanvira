'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, Plus, Search, Pencil, Trash2, Loader2 } from 'lucide-react';
import { formatNumber, formatDate, formatCurrency, formatCurrencyFull, getStatusLabel } from './utils';
import { getInvoices, addInvoice, updateInvoice, deleteInvoice } from '@/lib/storage';

interface Revenue {
  id: string;
  amount: number;
  category: string;
  description: string | null;
  branchId: string | null;
  receivedAt: string;
  createdAt: string;
  branch: { id: string; name: string } | null;
}

interface SimpleBranch { id: string; name: string }

const STORAGE_KEY = 'vira_revenues';

function getLocalRevenues(): Revenue[] {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch { return []; }
}

function saveLocalRevenues(items: Revenue[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const categoryOptions = [
  { value: 'TUITION', label: 'شهریه' },
  { value: 'EXAM_FEE', label: 'هزینه آزمون' },
  { value: 'CERTIFICATE_FEE', label: 'هزینه گواهینامه' },
  { value: 'CONSULTATION_FEE', label: 'هزینه مشاوره' },
  { value: 'MATERIAL_SALE', label: 'فروش مواد' },
  { value: 'OTHER', label: 'سایر' },
];

export default function RevenuePanel() {
  const [items, setItems] = useState<Revenue[]>([]);
  const [branches, setBranches] = useState<SimpleBranch[]>([]);
  const [count, setCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Revenue | null>(null);
  const [saving, setSaving] = useState(false);
  const pageSize = 10;

  const [form, setForm] = useState({
    amount: '', category: 'TUITION', description: '', branchId: '', receivedAt: '',
  });

  const loadRevenues = useCallback(() => {
    try {
      setLoading(true);
      let allItems = getLocalRevenues();

      // Also try to derive revenue from paid invoices
      const invoices = getInvoices().filter(i => i.status === 'paid');
      const invoiceRevenues: Revenue[] = invoices.map(inv => ({
        id: `inv_rev_${inv.id}`,
        amount: inv.total || inv.amount || 0,
        category: 'TUITION',
        description: `فاکتور ${inv.invoiceNumber || inv.id}`,
        branchId: null,
        receivedAt: inv.paidAt || inv.createdAt || new Date().toISOString(),
        createdAt: inv.createdAt || new Date().toISOString(),
        branch: null,
      }));

      // Merge: local revenues first, then invoice-derived (avoid duplicates)
      const existingIds = new Set(allItems.map(r => r.id));
      for (const ir of invoiceRevenues) {
        if (!existingIds.has(ir.id)) {
          allItems.push(ir);
        }
      }

      if (search) {
        const q = search.toLowerCase();
        allItems = allItems.filter(r => r.description?.toLowerCase().includes(q));
      }
      if (categoryFilter) {
        allItems = allItems.filter(r => r.category === categoryFilter);
      }

      setCount(allItems.length);
      setTotalAmount(allItems.reduce((sum, r) => sum + (r.amount || 0), 0));
      const start = (page - 1) * pageSize;
      setItems(allItems.slice(start, start + pageSize));
    } catch (err) {
      console.error('Failed to load revenues:', err);
      setItems([]);
      setCount(0);
      setTotalAmount(0);
    } finally {
      setLoading(false);
    }
  }, [page, search, categoryFilter]);

  useEffect(() => { loadRevenues(); }, [loadRevenues]);

  useEffect(() => {
    try {
      const storedBranches = localStorage.getItem('vira_branches');
      if (storedBranches) setBranches(JSON.parse(storedBranches));
    } catch {}
  }, []);

  const openAddDialog = () => {
    setEditingItem(null);
    setForm({ amount: '', category: 'TUITION', description: '', branchId: '', receivedAt: new Date().toISOString().split('T')[0] });
    setDialogOpen(true);
  };

  const openEditDialog = (item: Revenue) => {
    setEditingItem(item);
    setForm({
      amount: String(item.amount), category: item.category, description: item.description || '',
      branchId: item.branchId || '', receivedAt: item.receivedAt ? new Date(item.receivedAt).toISOString().split('T')[0] : '',
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    try {
      setSaving(true);
      const all = getLocalRevenues();
      const branch = form.branchId ? branches.find(b => b.id === form.branchId) : null;
      const data = {
        amount: parseInt(form.amount) || 0, category: form.category,
        description: form.description || null, branchId: form.branchId || null,
        receivedAt: form.receivedAt ? new Date(form.receivedAt).toISOString() : new Date().toISOString(),
        branch: branch ? { id: branch.id, name: branch.name } : null,
      };
      if (editingItem) {
        const idx = all.findIndex(r => r.id === editingItem.id);
        if (idx !== -1) {
          all[idx] = { ...all[idx], ...data };
        }
      } else {
        all.unshift({
          id: `rev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          ...data,
          createdAt: new Date().toISOString(),
        });
      }
      saveLocalRevenues(all);
      setDialogOpen(false);
      loadRevenues();
    } catch (err) {
      console.error('Failed to save revenue:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این درآمد اطمینان دارید؟')) return;
    try {
      saveLocalRevenues(getLocalRevenues().filter(r => r.id !== id));
      loadRevenues();
    } catch (err) {
      console.error('Failed to delete revenue:', err);
    }
  };

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100"><TrendingUp className="w-5 h-5 text-green-600" /></div>
              <div>
                <p className="text-sm text-green-700">مجموع درآمدها</p>
                <p className="text-xl font-bold text-green-700">{formatCurrencyFull(totalAmount)}</p>
              </div>
            </div>
            <span className="text-sm text-green-600">{formatNumber(count)} رکورد</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="جستجوی توضیحات..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pr-9" />
          </div>
          <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v === 'ALL' ? '' : v); setPage(1); }}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="دسته‌بندی" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه</SelectItem>
              {categoryOptions.map(c => (<SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAddDialog} className="bg-green-600 hover:bg-green-700 gap-2">
          <Plus className="w-4 h-4" />
          ثبت درآمد
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-green-600" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">مبلغ</TableHead>
                  <TableHead className="text-right">دسته‌بندی</TableHead>
                  <TableHead className="text-right">توضیحات</TableHead>
                  <TableHead className="text-right">شعبه</TableHead>
                  <TableHead className="text-right">تاریخ دریافت</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-gray-400">
                    {search || categoryFilter
                      ? 'درآمدی با این فیلترها یافت نشد.'
                      : 'هنوز درآمدی ثبت نشده است. با ثبت فاکتور پرداخت‌شده یا کلیک روی «ثبت درآمد» شروع کنید.'}
                  </TableCell></TableRow>
                ) : items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-green-700">{formatCurrencyFull(item.amount)}</TableCell>
                    <TableCell><Badge variant="outline">{getStatusLabel(item.category)}</Badge></TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate">{item.description || '—'}</TableCell>
                    <TableCell className="text-sm">{item.branch?.name || '—'}</TableCell>
                    <TableCell className="text-sm text-gray-500">{formatDate(item.receivedAt)}</TableCell>
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
          <DialogHeader><DialogTitle>{editingItem ? 'ویرایش درآمد' : 'ثبت درآمد جدید'}</DialogTitle></DialogHeader>
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
              <div className="space-y-2"><Label>تاریخ دریافت</Label><Input type="date" dir="ltr" value={form.receivedAt} onChange={(e) => setForm(f => ({ ...f, receivedAt: e.target.value }))} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-green-600 hover:bg-green-700">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingItem ? 'ذخیره' : 'ثبت'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
