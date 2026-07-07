'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Landmark, CheckCircle, Clock, AlertTriangle, Plus, Search, Pencil, Trash2, Eye, CreditCard } from 'lucide-react';
import {
  getInstallmentPlans, addInstallmentPlan, updateInstallmentPlan, saveInstallmentPlans,
} from '@/lib/storage';
import type { InstallmentPlan, Installment, PaymentMethod } from '@/types';
import { installmentStatusLabels, paymentMethodLabels } from '@/types';
import { formatNumber, formatDate, formatCurrencyFull, getStatusBadgeClass } from './utils';

const planStatusOptions: { value: InstallmentPlan['status']; label: string }[] = [
  { value: 'active', label: 'فعال' },
  { value: 'completed', label: 'تکمیل شده' },
  { value: 'overdue', label: 'سررسید گذشته' },
  { value: 'cancelled', label: 'لغو شده' },
];

const emptyInstallmentForm = { amount: '', dueDate: '' };

const emptyForm = {
  studentId: '',
  studentName: '',
  courseId: '',
  courseName: '',
  totalAmount: '',
  installments: [{ ...emptyInstallmentForm }] as Array<{ amount: string; dueDate: string }>,
};

export default function InstallmentsPanel() {
  const [items, setItems] = useState<InstallmentPlan[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InstallmentPlan | null>(null);
  const [form, setForm] = useState(emptyForm);
  // View dialog
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingItem, setViewingItem] = useState<InstallmentPlan | null>(null);
  // Pay dialog
  const [payDialogOpen, setPayDialogOpen] = useState(false);
  const [payingInstallment, setPayingInstallment] = useState<{ plan: InstallmentPlan; installment: Installment } | null>(null);
  const [payForm, setPayForm] = useState({ paidAt: '', paymentMethod: '' as PaymentMethod | '' });

  const loadData = () => {
    setItems(getInstallmentPlans());
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadData(); }, []);

  // Stats
  const totalPlans = items.length;
  const activePlans = items.filter(p => p.status === 'active').length;
  const totalAmount = items.reduce((sum, p) => sum + p.totalAmount, 0);
  const paidAmount = items.reduce((sum, p) => sum + p.paidAmount, 0);
  const overdueAmount = items.reduce((sum, p) => {
    return sum + p.installments.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0);
  }, 0);

  // Filtered
  const filtered = items.filter(item => {
    const matchSearch = !search || item.studentName.includes(search) || item.courseName.includes(search);
    const matchStatus = !statusFilter || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const openAddDialog = () => {
    setEditingItem(null);
    setForm({ ...emptyForm, installments: [{ ...emptyInstallmentForm }] });
    setDialogOpen(true);
  };

  const openEditDialog = (item: InstallmentPlan) => {
    setEditingItem(item);
    setForm({
      studentId: item.studentId,
      studentName: item.studentName,
      courseId: item.courseId,
      courseName: item.courseName,
      totalAmount: String(item.totalAmount),
      installments: item.installments.map(i => ({
        amount: String(i.amount),
        dueDate: i.dueDate ? new Date(i.dueDate).toISOString().split('T')[0] : '',
      })),
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const now = new Date().toISOString();
    const planId = editingItem?.id || crypto.randomUUID();
    const installmentItems: Installment[] = form.installments.map((inst, idx) => ({
      id: editingItem ? (editingItem.installments[idx]?.id || crypto.randomUUID()) : crypto.randomUUID(),
      planId,
      amount: parseFloat(inst.amount) || 0,
      dueDate: inst.dueDate ? new Date(inst.dueDate).toISOString() : now,
      status: 'pending' as const,
    }));

    const totalAmt = installmentItems.reduce((sum, i) => sum + i.amount, 0);
    const paidAmt = editingItem ? editingItem.paidAmount : 0;
    const remaining = totalAmt - paidAmt;
    const planStatus = remaining <= 0 ? 'completed' : 'active';

    if (editingItem) {
      // Preserve paid installments
      const existingPaid = editingItem.installments.filter(i => i.status === 'paid');
      const mergedInstallments = [...existingPaid, ...installmentItems];
      updateInstallmentPlan(editingItem.id, {
        studentId: form.studentId,
        studentName: form.studentName,
        courseId: form.courseId,
        courseName: form.courseName,
        totalAmount: totalAmt,
        paidAmount: paidAmt,
        remainingAmount: totalAmt - paidAmt,
        installments: mergedInstallments,
        status: planStatus as InstallmentPlan['status'],
      });
    } else {
      const newItem: InstallmentPlan = {
        id: planId,
        studentId: form.studentId,
        studentName: form.studentName,
        courseId: form.courseId,
        courseName: form.courseName,
        totalAmount: totalAmt,
        paidAmount: 0,
        remainingAmount: totalAmt,
        installments: installmentItems,
        status: 'active',
        createdAt: now,
      };
      addInstallmentPlan(newItem);
    }
    setDialogOpen(false);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این طرح اقساط اطمینان دارید؟')) return;
    const updated = items.filter(p => p.id !== id);
    saveInstallmentPlans(updated);
    loadData();
  };

  const openViewDialog = (item: InstallmentPlan) => {
    setViewingItem(item);
    setViewDialogOpen(true);
  };

  const openPayDialog = (plan: InstallmentPlan, installment: Installment) => {
    setPayingInstallment({ plan, installment });
    setPayForm({
      paidAt: new Date().toISOString().split('T')[0],
      paymentMethod: '',
    });
    setPayDialogOpen(true);
  };

  const handlePaySave = () => {
    if (!payingInstallment) return;
    const { plan, installment } = payingInstallment;

    const updatedInstallments = plan.installments.map(i => {
      if (i.id === installment.id) {
        return {
          ...i,
          status: 'paid' as const,
          paidAt: payForm.paidAt ? new Date(payForm.paidAt).toISOString() : new Date().toISOString(),
          paymentMethod: payForm.paymentMethod || undefined,
        };
      }
      return i;
    });

    const newPaidAmount = updatedInstallments
      .filter(i => i.status === 'paid')
      .reduce((sum, i) => sum + i.amount, 0);
    const newRemaining = plan.totalAmount - newPaidAmount;
    const newStatus: InstallmentPlan['status'] = newRemaining <= 0 ? 'completed' : plan.status;

    updateInstallmentPlan(plan.id, {
      installments: updatedInstallments,
      paidAmount: newPaidAmount,
      remainingAmount: newRemaining,
      status: newStatus,
    });

    setPayDialogOpen(false);
    loadData();
    // Refresh view
    const refreshed = getInstallmentPlans().find(p => p.id === plan.id);
    if (refreshed && viewDialogOpen) setViewingItem(refreshed);
  };

  // Item management in form
  const addInstallment = () => {
    setForm(f => ({ ...f, installments: [...f.installments, { ...emptyInstallmentForm }] }));
  };

  const removeInstallment = (index: number) => {
    setForm(f => ({ ...f, installments: f.installments.filter((_, i) => i !== index) }));
  };

  const updateInstallment = (index: number, field: string, value: string) => {
    setForm(f => ({
      ...f,
      installments: f.installments.map((item, i) => i === index ? { ...item, [field]: value } : item),
    }));
  };

  const getInstallmentBadgeClass = (status: Installment['status']) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-200 text-gray-600';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanBadgeClass = (status: InstallmentPlan['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-200 text-gray-600';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100"><Landmark className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="text-xs text-blue-700">کل طرح‌ها</p>
                <p className="text-lg font-bold text-blue-700">{formatNumber(totalPlans)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100"><CheckCircle className="w-5 h-5 text-green-600" /></div>
              <div>
                <p className="text-xs text-green-700">فعال</p>
                <p className="text-lg font-bold text-green-700">{formatNumber(activePlans)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100"><CreditCard className="w-5 h-5 text-amber-600" /></div>
              <div>
                <p className="text-xs text-amber-700">مبلغ کل</p>
                <p className="text-sm font-bold text-amber-700">{formatCurrencyFull(totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100"><CheckCircle className="w-5 h-5 text-green-600" /></div>
              <div>
                <p className="text-xs text-green-700">پرداخت شده</p>
                <p className="text-sm font-bold text-green-700">{formatCurrencyFull(paidAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Summary */}
      {overdueAmount > 0 && (
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
              <div>
                <p className="text-sm text-red-700">مبلغ سررسید گذشته</p>
                <p className="text-lg font-bold text-red-700">{formatCurrencyFull(overdueAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="جستجوی نام کارآموز، دوره..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v === 'ALL' ? '' : v)}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="وضعیت" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه</SelectItem>
              {planStatusOptions.map(s => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAddDialog} className="bg-green-600 hover:bg-green-700 gap-2">
          <Plus className="w-4 h-4" />
          طرح اقساط جدید
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">کارآموز</TableHead>
                <TableHead className="text-right">دوره</TableHead>
                <TableHead className="text-right">مبلغ کل</TableHead>
                <TableHead className="text-right">پرداخت شده</TableHead>
                <TableHead className="text-right">مانده</TableHead>
                <TableHead className="text-right">تعداد اقساط</TableHead>
                <TableHead className="text-right">وضعیت</TableHead>
                <TableHead className="text-right">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-400">طرح اقساطی یافت نشد</TableCell></TableRow>
              ) : filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.studentName}</TableCell>
                  <TableCell className="text-sm">{item.courseName}</TableCell>
                  <TableCell className="text-sm">{formatCurrencyFull(item.totalAmount)}</TableCell>
                  <TableCell className="text-sm text-green-700">{formatCurrencyFull(item.paidAmount)}</TableCell>
                  <TableCell className="text-sm text-red-700">{formatCurrencyFull(item.remainingAmount)}</TableCell>
                  <TableCell className="text-sm">{formatNumber(item.installments.length)}</TableCell>
                  <TableCell>
                    <Badge className={getPlanBadgeClass(item.status)}>
                      {item.status === 'active' ? 'فعال' : item.status === 'completed' ? 'تکمیل شده' : item.status === 'overdue' ? 'سررسید گذشته' : 'لغو شده'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="مشاهده اقساط" onClick={() => openViewDialog(item)}>
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(item)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'ویرایش طرح اقساط' : 'طرح اقساط جدید'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[65vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>شناسه کارآموز</Label>
                <Input dir="ltr" value={form.studentId} onChange={(e) => setForm(f => ({ ...f, studentId: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>نام کارآموز</Label>
                <Input value={form.studentName} onChange={(e) => setForm(f => ({ ...f, studentName: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>شناسه دوره</Label>
                <Input dir="ltr" value={form.courseId} onChange={(e) => setForm(f => ({ ...f, courseId: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>نام دوره</Label>
                <Input value={form.courseName} onChange={(e) => setForm(f => ({ ...f, courseName: e.target.value }))} />
              </div>
            </div>

            {/* Installments */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>اقساط</Label>
                <Button type="button" variant="outline" size="sm" className="gap-1" onClick={addInstallment}>
                  <Plus className="w-3 h-3" /> افزودن قسط
                </Button>
              </div>
              {form.installments.map((inst, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-end border p-2 rounded-lg">
                  <div className="col-span-5">
                    {idx === 0 && <Label className="text-xs">مبلغ (ریال)</Label>}
                    <Input type="number" dir="ltr" value={inst.amount} onChange={(e) => updateInstallment(idx, 'amount', e.target.value)} className="mt-1" />
                  </div>
                  <div className="col-span-5">
                    {idx === 0 && <Label className="text-xs">سررسید</Label>}
                    <Input type="date" dir="ltr" value={inst.dueDate} onChange={(e) => updateInstallment(idx, 'dueDate', e.target.value)} className="mt-1" />
                  </div>
                  <div className="col-span-2 flex justify-end">
                    {form.installments.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => removeInstallment(idx)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-sm font-medium bg-gray-50 p-2 rounded-lg">
                <span>مجموع اقساط:</span>
                <span className="text-green-700">
                  {formatCurrencyFull(form.installments.reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0))}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              {editingItem ? 'ذخیره' : 'ایجاد طرح'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Installments Timeline Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>اقساط: {viewingItem?.studentName} — {viewingItem?.courseName}</DialogTitle>
          </DialogHeader>
          {viewingItem && (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-blue-700">مبلغ کل</p>
                  <p className="font-bold text-blue-700">{formatCurrencyFull(viewingItem.totalAmount)}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-green-700">پرداخت شده</p>
                  <p className="font-bold text-green-700">{formatCurrencyFull(viewingItem.paidAmount)}</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-red-700">مانده</p>
                  <p className="font-bold text-red-700">{formatCurrencyFull(viewingItem.remainingAmount)}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all"
                  style={{ width: `${viewingItem.totalAmount > 0 ? Math.round((viewingItem.paidAmount / viewingItem.totalAmount) * 100) : 0}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 text-center">
                {viewingItem.totalAmount > 0 ? Math.round((viewingItem.paidAmount / viewingItem.totalAmount) * 100) : 0}% پرداخت شده
              </p>

              {/* Installment Timeline */}
              <div className="space-y-3">
                {viewingItem.installments.map((inst, idx) => (
                  <div key={inst.id} className="flex items-start gap-3 border rounded-lg p-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        inst.status === 'paid' ? 'bg-green-500 text-white' :
                        inst.status === 'overdue' ? 'bg-red-500 text-white' :
                        'bg-amber-400 text-white'
                      }`}>
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{formatCurrencyFull(inst.amount)}</p>
                        <Badge className={getInstallmentBadgeClass(inst.status)}>
                          {installmentStatusLabels[inst.status]}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-sm text-gray-500">
                        <span>سررسید: {formatDate(inst.dueDate)}</span>
                        {inst.paidAt && <span className="text-green-600">پرداخت: {formatDate(inst.paidAt)}</span>}
                      </div>
                      {inst.paymentMethod && (
                        <p className="text-xs text-gray-400 mt-1">
                          روش پرداخت: {paymentMethodLabels[inst.paymentMethod]}
                        </p>
                      )}
                    </div>
                    {inst.status !== 'paid' && inst.status !== 'cancelled' && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 gap-1 h-8"
                        onClick={() => {
                          setViewDialogOpen(false);
                          openPayDialog(viewingItem, inst);
                        }}
                      >
                        <CreditCard className="w-3 h-3" />
                        پرداخت
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>بستن</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pay Installment Dialog */}
      <Dialog open={payDialogOpen} onOpenChange={setPayDialogOpen}>
        <DialogContent className="max-w-sm" dir="rtl">
          <DialogHeader>
            <DialogTitle>ثبت پرداخت قسط</DialogTitle>
          </DialogHeader>
          {payingInstallment && (
            <div className="space-y-4">
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-sm text-green-700">مبلغ قسط</p>
                <p className="text-lg font-bold text-green-700">{formatCurrencyFull(payingInstallment.installment.amount)}</p>
              </div>
              <div className="space-y-2">
                <Label>تاریخ پرداخت</Label>
                <Input type="date" dir="ltr" value={payForm.paidAt} onChange={(e) => setPayForm(f => ({ ...f, paidAt: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>روش پرداخت</Label>
                <Select value={payForm.paymentMethod || 'NONE'} onValueChange={(v) => setPayForm(f => ({ ...f, paymentMethod: v === 'NONE' ? '' : v as PaymentMethod }))}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">انتخاب نشده</SelectItem>
                    {Object.entries(paymentMethodLabels).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPayDialogOpen(false)}>انصراف</Button>
            <Button onClick={handlePaySave} className="bg-green-600 hover:bg-green-700">تأیید پرداخت</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
