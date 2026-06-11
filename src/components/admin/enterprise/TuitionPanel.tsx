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
import { CreditCard, Plus, Search, Pencil, Trash2, Loader2 } from 'lucide-react';
import { formatNumber, formatCurrency, formatCurrencyFull, getStatusBadgeClass, getStatusLabel } from './utils';

interface Tuition {
  id: string;
  studentId: string;
  courseId: string;
  totalAmount: number;
  paidAmount: number;
  discount: number;
  paymentType: string;
  installments: number;
  status: string;
  dueDate: string | null;
  createdAt: string;
  student: { id: string; name: string; phone: string };
  course: { id: string; title: string };
}

interface SimpleStudent { id: string; name: string }
interface SimpleCourse { id: string; title: string }

const paymentTypeOptions = [
  { value: 'CASH', label: 'نقدی' },
  { value: 'INSTALLMENT', label: 'اقساطی' },
  { value: 'ONLINE', label: 'آنلاین' },
  { value: 'TRANSFER', label: 'انتقال' },
];

const statusOptions = [
  { value: 'PENDING', label: 'در انتظار' },
  { value: 'PARTIAL', label: 'پرداخت جزئی' },
  { value: 'PAID', label: 'پرداخت شده' },
  { value: 'OVERDUE', label: 'سررسید گذشته' },
  { value: 'CANCELLED', label: 'لغو شده' },
];

export default function TuitionPanel() {
  const [items, setItems] = useState<Tuition[]>([]);
  const [students, setStudents] = useState<SimpleStudent[]>([]);
  const [courses, setCourses] = useState<SimpleCourse[]>([]);
  const [count, setCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Tuition | null>(null);
  const [saving, setSaving] = useState(false);
  const pageSize = 10;

  const [form, setForm] = useState({
    studentId: '', courseId: '', totalAmount: '', discount: '0',
    paymentType: 'CASH', installments: '1', dueDate: '',
  });

  const fetchTuitions = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: String(page), limit: String(pageSize) });
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      const res = await fetch(`/api/tuitions?${params}`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.data || []);
        setCount(json.count || 0);
        setTotalAmount(json.totalAmount || 0);
        setTotalPaid(json.totalPaid || 0);
      }
    } catch (err) {
      console.error('Failed to fetch tuitions:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => { fetchTuitions(); }, [fetchTuitions]);
  useEffect(() => {
    Promise.all([
      fetch('/api/students?limit=100').then(r => r.json()),
      fetch('/api/courses?limit=100').then(r => r.json()),
    ]).then(([s, c]) => {
      setStudents(s.data || []);
      setCourses(c.data || []);
    }).catch(() => {});
  }, []);

  const openAddDialog = () => {
    setEditingItem(null);
    setForm({ studentId: '', courseId: '', totalAmount: '', discount: '0', paymentType: 'CASH', installments: '1', dueDate: '' });
    setDialogOpen(true);
  };

  const openEditDialog = (item: Tuition) => {
    setEditingItem(item);
    setForm({
      studentId: item.studentId, courseId: item.courseId, totalAmount: String(item.totalAmount),
      discount: String(item.discount), paymentType: item.paymentType,
      installments: String(item.installments), dueDate: item.dueDate ? new Date(item.dueDate).toISOString().split('T')[0] : '',
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const body = {
        studentId: form.studentId, courseId: form.courseId,
        totalAmount: parseInt(form.totalAmount) || 0, discount: parseInt(form.discount) || 0,
        paymentType: form.paymentType, installments: parseInt(form.installments) || 1,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
      };
      if (editingItem) {
        await fetch(`/api/tuitions/${editingItem.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        });
      } else {
        await fetch('/api/tuitions', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        });
      }
      setDialogOpen(false);
      fetchTuitions();
    } catch (err) {
      console.error('Failed to save tuition:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این شهریه اطمینان دارید؟')) return;
    try {
      await fetch(`/api/tuitions/${id}`, { method: 'DELETE' });
      fetchTuitions();
    } catch (err) {
      console.error('Failed to delete tuition:', err);
    }
  };

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100"><CreditCard className="w-5 h-5 text-amber-600" /></div>
              <div>
                <p className="text-sm text-amber-700">کل شهریه‌ها</p>
                <p className="text-lg font-bold text-amber-700">{formatCurrency(totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100"><CreditCard className="w-5 h-5 text-green-600" /></div>
              <div>
                <p className="text-sm text-green-700">پرداخت شده</p>
                <p className="text-lg font-bold text-green-700">{formatCurrency(totalPaid)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100"><CreditCard className="w-5 h-5 text-red-600" /></div>
              <div>
                <p className="text-sm text-red-700">مانده</p>
                <p className="text-lg font-bold text-red-700">{formatCurrency(totalAmount - totalPaid)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="جستجوی کارآموز، دوره..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pr-9" />
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
          ثبت شهریه
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
                  <TableHead className="text-right">کارآموز</TableHead>
                  <TableHead className="text-right">دوره</TableHead>
                  <TableHead className="text-right">مبلغ کل</TableHead>
                  <TableHead className="text-right">پرداخت شده</TableHead>
                  <TableHead className="text-right">تخفیف</TableHead>
                  <TableHead className="text-right">نوع</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-400">شهریه‌ای یافت نشد</TableCell></TableRow>
                ) : items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.student?.name || '—'}</TableCell>
                    <TableCell className="text-sm">{item.course?.title || '—'}</TableCell>
                    <TableCell>{formatCurrencyFull(item.totalAmount)}</TableCell>
                    <TableCell className="text-green-700">{formatCurrencyFull(item.paidAmount)}</TableCell>
                    <TableCell>{item.discount > 0 ? formatCurrencyFull(item.discount) : '—'}</TableCell>
                    <TableCell><Badge variant="outline">{getStatusLabel(item.paymentType)}</Badge></TableCell>
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
          <span className="text-gray-500">{formatNumber(count)} رکورد — صفحه {formatNumber(page)} از {formatNumber(totalPages)}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>قبلی</Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>بعدی</Button>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader><DialogTitle>{editingItem ? 'ویرایش شهریه' : 'ثبت شهریه جدید'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>کارآموز</Label>
              <Select value={form.studentId} onValueChange={(v) => setForm(f => ({ ...f, studentId: v }))}>
                <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب کارآموز" /></SelectTrigger>
                <SelectContent>{students.map(s => (<SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>دوره</Label>
              <Select value={form.courseId} onValueChange={(v) => setForm(f => ({ ...f, courseId: v }))}>
                <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب دوره" /></SelectTrigger>
                <SelectContent>{courses.map(c => (<SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>مبلغ کل (ریال)</Label><Input type="number" dir="ltr" value={form.totalAmount} onChange={(e) => setForm(f => ({ ...f, totalAmount: e.target.value }))} /></div>
              <div className="space-y-2"><Label>تخفیف (ریال)</Label><Input type="number" dir="ltr" value={form.discount} onChange={(e) => setForm(f => ({ ...f, discount: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نوع پرداخت</Label>
                <Select value={form.paymentType} onValueChange={(v) => setForm(f => ({ ...f, paymentType: v }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{paymentTypeOptions.map(p => (<SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>))}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>تعداد اقساط</Label><Input type="number" dir="ltr" value={form.installments} onChange={(e) => setForm(f => ({ ...f, installments: e.target.value }))} /></div>
            </div>
            <div className="space-y-2"><Label>تاریخ سررسید</Label><Input type="date" dir="ltr" value={form.dueDate} onChange={(e) => setForm(f => ({ ...f, dueDate: e.target.value }))} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-amber-600 hover:bg-amber-700">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingItem ? 'ذخیره' : 'ثبت'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
