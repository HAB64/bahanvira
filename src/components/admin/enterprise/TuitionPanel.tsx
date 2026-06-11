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
import { getInvoices, addInvoice, updateInvoice, deleteInvoice, getInstallmentPlans, getStudents } from '@/lib/storage';

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

const STORAGE_KEY = 'vira_tuitions';

function getLocalTuitions(): Tuition[] {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch { return []; }
}

function saveLocalTuitions(items: Tuition[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

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

  const loadTuitions = useCallback(() => {
    try {
      setLoading(true);
      let allItems = getLocalTuitions();

      // Also derive from invoices
      const invoices = getInvoices();
      const invoiceTuitions: Tuition[] = invoices.map(inv => ({
        id: `inv_tui_${inv.id}`,
        studentId: inv.studentId || '',
        courseId: inv.courseId || '',
        totalAmount: inv.total || inv.amount || 0,
        paidAmount: inv.status === 'paid' ? (inv.total || inv.amount || 0) : (inv.paidAmount || 0),
        discount: inv.discount || 0,
        paymentType: inv.paymentType || 'CASH',
        installments: inv.installments || 1,
        status: inv.status === 'paid' ? 'PAID' : inv.status === 'partial' ? 'PARTIAL' : inv.status === 'overdue' ? 'OVERDUE' : 'PENDING',
        dueDate: inv.dueDate || null,
        createdAt: inv.createdAt || new Date().toISOString(),
        student: inv.studentId ? { id: inv.studentId, name: inv.studentName || '', phone: '' } : { id: '', name: '', phone: '' },
        course: inv.courseId ? { id: inv.courseId, title: inv.courseName || '' } : { id: '', title: '' },
      }));

      // Merge: avoid duplicates
      const existingIds = new Set(allItems.map(t => t.id));
      for (const it of invoiceTuitions) {
        if (!existingIds.has(it.id)) {
          allItems.push(it);
        }
      }

      if (search) {
        const q = search.toLowerCase();
        allItems = allItems.filter(t =>
          t.student?.name?.toLowerCase().includes(q) || t.course?.title?.toLowerCase().includes(q)
        );
      }
      if (statusFilter) {
        allItems = allItems.filter(t => t.status === statusFilter);
      }

      setCount(allItems.length);
      setTotalAmount(allItems.reduce((sum, t) => sum + (t.totalAmount || 0), 0));
      setTotalPaid(allItems.reduce((sum, t) => sum + (t.paidAmount || 0), 0));
      const start = (page - 1) * pageSize;
      setItems(allItems.slice(start, start + pageSize));
    } catch (err) {
      console.error('Failed to load tuitions:', err);
      setItems([]);
      setCount(0);
      setTotalAmount(0);
      setTotalPaid(0);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => { loadTuitions(); }, [loadTuitions]);

  useEffect(() => {
    try {
      const allStudents = getStudents();
      setStudents(allStudents.map(s => ({ id: s.id, name: s.name })));
      const storedCourses = localStorage.getItem('vira_courses');
      if (storedCourses) {
        setCourses(JSON.parse(storedCourses).map((c: any) => ({ id: c.id, title: c.title })));
      }
    } catch {}
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

  const handleSave = () => {
    try {
      setSaving(true);
      const all = getLocalTuitions();
      const student = form.studentId ? students.find(s => s.id === form.studentId) : null;
      const course = form.courseId ? courses.find(c => c.id === form.courseId) : null;
      const data = {
        studentId: form.studentId, courseId: form.courseId,
        totalAmount: parseInt(form.totalAmount) || 0, discount: parseInt(form.discount) || 0,
        paymentType: form.paymentType, installments: parseInt(form.installments) || 1,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
        student: student ? { id: student.id, name: student.name, phone: '' } : { id: '', name: '', phone: '' },
        course: course ? { id: course.id, title: course.title } : { id: '', title: '' },
        paidAmount: 0,
        status: 'PENDING',
      };
      if (editingItem) {
        const idx = all.findIndex(t => t.id === editingItem.id);
        if (idx !== -1) {
          all[idx] = { ...all[idx], ...data };
        }
      } else {
        all.unshift({
          id: `tui_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          ...data,
          createdAt: new Date().toISOString(),
        });
      }
      saveLocalTuitions(all);
      setDialogOpen(false);
      loadTuitions();
    } catch (err) {
      console.error('Failed to save tuition:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این شهریه اطمینان دارید؟')) return;
    try {
      saveLocalTuitions(getLocalTuitions().filter(t => t.id !== id));
      loadTuitions();
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
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-400">
                    {search || statusFilter
                      ? 'شهریه‌ای با این فیلترها یافت نشد.'
                      : 'هنوز شهریه‌ای ثبت نشده است. با ثبت فاکتور یا کلیک روی «ثبت شهریه» شروع کنید.'}
                  </TableCell></TableRow>
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
