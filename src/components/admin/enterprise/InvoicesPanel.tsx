'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Receipt, CheckCircle, Clock, AlertTriangle, Plus, Search, Pencil, Trash2, Eye, Printer } from 'lucide-react';
import {
  getInvoices, addInvoice, updateInvoice, deleteInvoice,
} from '@/lib/storage';
import type { Invoice, InvoiceItem, InvoiceStatus, PaymentMethod } from '@/types';
import { invoiceStatusLabels, paymentMethodLabels } from '@/types';
import { formatNumber, formatDate, formatCurrencyFull, getStatusBadgeClass } from './utils';

const invoiceStatusOptions: { value: InvoiceStatus; label: string }[] = [
  { value: 'draft', label: 'پیش‌نویس' },
  { value: 'sent', label: 'ارسال شده' },
  { value: 'paid', label: 'پرداخت شده' },
  { value: 'partial', label: 'پرداخت جزئی' },
  { value: 'overdue', label: 'سررسید گذشته' },
  { value: 'cancelled', label: 'لغو شده' },
];

const emptyItemForm = { description: '', quantity: '1', unitPrice: '0' };

function generateInvoiceNumber(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const seq = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
  return `INV-${y}${m}${d}-${seq}`;
}

const emptyForm = {
  invoiceNumber: '',
  studentId: '',
  studentName: '',
  items: [{ ...emptyItemForm }] as Array<{ description: string; quantity: string; unitPrice: string }>,
  discount: '0',
  tax: '0',
  status: 'draft' as InvoiceStatus,
  dueDate: '',
  notes: '',
  paidAmount: '0',
  paymentMethod: '' as PaymentMethod | '',
};

export default function InvoicesPanel() {
  const [items, setItems] = useState<Invoice[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Invoice | null>(null);
  const [form, setForm] = useState(emptyForm);
  // View dialog
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingItem, setViewingItem] = useState<Invoice | null>(null);

  const loadData = () => {
    setItems(getInvoices());
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadData(); }, []);

  // Stats
  const totalInvoices = items.length;
  const paidAmount = items.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);
  const pendingAmount = items.filter(i => i.status === 'sent' || i.status === 'partial').reduce((sum, i) => sum + (i.total - i.paidAmount), 0);
  const overdueCount = items.filter(i => i.status === 'overdue').length;

  // Filtered
  const filtered = items.filter(item => {
    const matchSearch = !search || item.studentName.includes(search) || item.invoiceNumber.includes(search);
    const matchStatus = !statusFilter || item.status === statusFilter;
    const matchDateFrom = !dateFrom || item.createdAt >= dateFrom;
    const matchDateTo = !dateTo || item.createdAt <= dateTo + 'T23:59:59';
    return matchSearch && matchStatus && matchDateFrom && matchDateTo;
  });

  // Calculate form totals
  const calcSubtotal = () => {
    return form.items.reduce((sum, item) => {
      const qty = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      return sum + (qty * price);
    }, 0);
  };
  const subtotal = calcSubtotal();
  const discount = parseFloat(form.discount) || 0;
  const tax = parseFloat(form.tax) || 0;
  const total = subtotal - discount + tax;

  const openAddDialog = () => {
    setEditingItem(null);
    setForm({
      ...emptyForm,
      invoiceNumber: generateInvoiceNumber(),
      items: [{ ...emptyItemForm }],
    });
    setDialogOpen(true);
  };

  const openEditDialog = (item: Invoice) => {
    setEditingItem(item);
    setForm({
      invoiceNumber: item.invoiceNumber,
      studentId: item.studentId,
      studentName: item.studentName,
      items: item.items.map(i => ({
        description: i.description,
        quantity: String(i.quantity),
        unitPrice: String(i.unitPrice),
      })),
      discount: String(item.discount),
      tax: String(item.tax),
      status: item.status,
      dueDate: item.dueDate ? new Date(item.dueDate).toISOString().split('T')[0] : '',
      notes: item.notes || '',
      paidAmount: String(item.paidAmount),
      paymentMethod: item.paymentMethod || '',
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const now = new Date().toISOString();
    const invoiceItems: InvoiceItem[] = form.items.map((item, idx) => ({
      id: editingItem ? (editingItem.items[idx]?.id || crypto.randomUUID()) : crypto.randomUUID(),
      description: item.description,
      quantity: parseFloat(item.quantity) || 0,
      unitPrice: parseFloat(item.unitPrice) || 0,
      total: (parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0),
    }));

    if (editingItem) {
      updateInvoice(editingItem.id, {
        invoiceNumber: form.invoiceNumber,
        studentId: form.studentId,
        studentName: form.studentName,
        items: invoiceItems,
        subtotal,
        discount,
        tax,
        total,
        status: form.status,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : now,
        notes: form.notes || undefined,
        paidAmount: parseFloat(form.paidAmount) || 0,
        paymentMethod: form.paymentMethod || undefined,
        updatedAt: now,
      });
    } else {
      const newItem: Invoice = {
        id: crypto.randomUUID(),
        invoiceNumber: form.invoiceNumber,
        studentId: form.studentId,
        studentName: form.studentName,
        items: invoiceItems,
        subtotal,
        discount,
        tax,
        total,
        status: form.status,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : now,
        paidAmount: parseFloat(form.paidAmount) || 0,
        notes: form.notes || undefined,
        createdAt: now,
        updatedAt: now,
      };
      addInvoice(newItem);
    }
    setDialogOpen(false);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این فاکتور اطمینان دارید؟')) return;
    deleteInvoice(id);
    loadData();
  };

  const openViewDialog = (item: Invoice) => {
    setViewingItem(item);
    setViewDialogOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  // Item management in form
  const addItem = () => {
    setForm(f => ({ ...f, items: [...f.items, { ...emptyItemForm }] }));
  };

  const removeItem = (index: number) => {
    setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== index) }));
  };

  const updateItem = (index: number, field: string, value: string) => {
    setForm(f => ({
      ...f,
      items: f.items.map((item, i) => i === index ? { ...item, [field]: value } : item),
    }));
  };

  const getInvoiceStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-orange-100 text-orange-800';
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
              <div className="p-2 rounded-lg bg-blue-100"><Receipt className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="text-xs text-blue-700">کل فاکتورها</p>
                <p className="text-lg font-bold text-blue-700">{formatNumber(totalInvoices)}</p>
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
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100"><Clock className="w-5 h-5 text-amber-600" /></div>
              <div>
                <p className="text-xs text-amber-700">در انتظار</p>
                <p className="text-sm font-bold text-amber-700">{formatCurrencyFull(pendingAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
              <div>
                <p className="text-xs text-red-700">سررسید گذشته</p>
                <p className="text-lg font-bold text-red-700">{formatNumber(overdueCount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="جستجوی نام، شماره فاکتور..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v === 'ALL' ? '' : v)}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="وضعیت" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه</SelectItem>
              {invoiceStatusOptions.map(s => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
            </SelectContent>
          </Select>
          <Input type="date" dir="ltr" className="w-[140px]" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} placeholder="از تاریخ" />
          <Input type="date" dir="ltr" className="w-[140px]" value={dateTo} onChange={(e) => setDateTo(e.target.value)} placeholder="تا تاریخ" />
        </div>
        <Button onClick={openAddDialog} className="bg-green-600 hover:bg-green-700 gap-2">
          <Plus className="w-4 h-4" />
          فاکتور جدید
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">شماره فاکتور</TableHead>
                <TableHead className="text-right">کارآموز</TableHead>
                <TableHead className="text-right">مبلغ کل</TableHead>
                <TableHead className="text-right">پرداخت شده</TableHead>
                <TableHead className="text-right">وضعیت</TableHead>
                <TableHead className="text-right">مهلت</TableHead>
                <TableHead className="text-right">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-gray-400">فاکتوری یافت نشد</TableCell></TableRow>
              ) : filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-sm" dir="ltr">{item.invoiceNumber}</TableCell>
                  <TableCell className="text-sm">{item.studentName}</TableCell>
                  <TableCell className="text-sm font-medium">{formatCurrencyFull(item.total)}</TableCell>
                  <TableCell className="text-sm text-green-700">{formatCurrencyFull(item.paidAmount)}</TableCell>
                  <TableCell>
                    <Badge className={getInvoiceStatusBadge(item.status)}>
                      {invoiceStatusLabels[item.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{formatDate(item.dueDate)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="مشاهده/چاپ" onClick={() => openViewDialog(item)}>
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
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'ویرایش فاکتور' : 'فاکتور جدید'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[65vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>شماره فاکتور</Label>
                <Input dir="ltr" value={form.invoiceNumber} onChange={(e) => setForm(f => ({ ...f, invoiceNumber: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>وضعیت</Label>
                <Select value={form.status} onValueChange={(v) => setForm(f => ({ ...f, status: v as InvoiceStatus }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {invoiceStatusOptions.map(s => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>
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

            {/* Items */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>آیتم‌های فاکتور</Label>
                <Button type="button" variant="outline" size="sm" className="gap-1" onClick={addItem}>
                  <Plus className="w-3 h-3" /> افزودن آیتم
                </Button>
              </div>
              {form.items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-end border p-2 rounded-lg">
                  <div className="col-span-5">
                    {idx === 0 && <Label className="text-xs">توضیحات</Label>}
                    <Input value={item.description} onChange={(e) => updateItem(idx, 'description', e.target.value)} placeholder="شرح آیتم" className="mt-1" />
                  </div>
                  <div className="col-span-2">
                    {idx === 0 && <Label className="text-xs">تعداد</Label>}
                    <Input type="number" dir="ltr" value={item.quantity} onChange={(e) => updateItem(idx, 'quantity', e.target.value)} className="mt-1" />
                  </div>
                  <div className="col-span-3">
                    {idx === 0 && <Label className="text-xs">قیمت واحد (ریال)</Label>}
                    <Input type="number" dir="ltr" value={item.unitPrice} onChange={(e) => updateItem(idx, 'unitPrice', e.target.value)} className="mt-1" />
                  </div>
                  <div className="col-span-1 text-center">
                    {idx === 0 && <Label className="text-xs">جمع</Label>}
                    <p className="text-sm mt-2">{formatNumber((parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0))}</p>
                  </div>
                  <div className="col-span-1">
                    {form.items.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => removeItem(idx)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>جمع کل:</span>
                  <span>{formatCurrencyFull(subtotal)}</span>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">تخفیف (ریال)</Label>
                  <Input type="number" dir="ltr" value={form.discount} onChange={(e) => setForm(f => ({ ...f, discount: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">مالیات (ریال)</Label>
                  <Input type="number" dir="ltr" value={form.tax} onChange={(e) => setForm(f => ({ ...f, tax: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between font-bold text-green-700">
                  <span>مبلغ نهایی:</span>
                  <span>{formatCurrencyFull(total)}</span>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">مبلغ پرداخت شده (ریال)</Label>
                  <Input type="number" dir="ltr" value={form.paidAmount} onChange={(e) => setForm(f => ({ ...f, paidAmount: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">روش پرداخت</Label>
                  <Select value={form.paymentMethod || 'NONE'} onValueChange={(v) => setForm(f => ({ ...f, paymentMethod: v === 'NONE' ? '' : v as PaymentMethod }))}>
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>مهلت پرداخت</Label>
                <Input type="date" dir="ltr" value={form.dueDate} onChange={(e) => setForm(f => ({ ...f, dueDate: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>یادداشت</Label>
              <Textarea value={form.notes} onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              {editingItem ? 'ذخیره' : 'ایجاد فاکتور'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View/Print Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>جزئیات فاکتور</DialogTitle>
          </DialogHeader>
          {viewingItem && (
            <div className="space-y-4 max-h-[65vh] overflow-y-auto print-area" id="invoice-print">
              <div className="flex justify-between items-start border-b pb-4">
                <div>
                  <h3 className="text-lg font-bold text-amber-700">بهان رایانه</h3>
                  <p className="text-sm text-gray-500">آموزشگاه چرتکه دهگانی</p>
                </div>
                <div className="text-left">
                  <p className="font-bold" dir="ltr">{viewingItem.invoiceNumber}</p>
                  <Badge className={getInvoiceStatusBadge(viewingItem.status)}>
                    {invoiceStatusLabels[viewingItem.status]}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">کارآموز:</p>
                  <p className="font-medium">{viewingItem.studentName}</p>
                </div>
                <div>
                  <p className="text-gray-500">مهلت پرداخت:</p>
                  <p className="font-medium">{formatDate(viewingItem.dueDate)}</p>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">شرح</TableHead>
                    <TableHead className="text-right">تعداد</TableHead>
                    <TableHead className="text-right">قیمت واحد</TableHead>
                    <TableHead className="text-right">جمع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {viewingItem.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-center">{formatNumber(item.quantity)}</TableCell>
                      <TableCell>{formatCurrencyFull(item.unitPrice)}</TableCell>
                      <TableCell>{formatCurrencyFull(item.total)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="border-t pt-3 space-y-1 text-sm">
                <div className="flex justify-between"><span>جمع کل:</span><span>{formatCurrencyFull(viewingItem.subtotal)}</span></div>
                {viewingItem.discount > 0 && <div className="flex justify-between text-red-600"><span>تخفیف:</span><span>-{formatCurrencyFull(viewingItem.discount)}</span></div>}
                {viewingItem.tax > 0 && <div className="flex justify-between"><span>مالیات:</span><span>+{formatCurrencyFull(viewingItem.tax)}</span></div>}
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>مبلغ نهایی:</span>
                  <span className="text-green-700">{formatCurrencyFull(viewingItem.total)}</span>
                </div>
                {viewingItem.paidAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>پرداخت شده:</span>
                    <span>{formatCurrencyFull(viewingItem.paidAmount)}</span>
                  </div>
                )}
                {viewingItem.paidAmount < viewingItem.total && (
                  <div className="flex justify-between text-red-600">
                    <span>مانده:</span>
                    <span>{formatCurrencyFull(viewingItem.total - viewingItem.paidAmount)}</span>
                  </div>
                )}
              </div>
              {viewingItem.notes && (
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  <p className="text-gray-500 mb-1">یادداشت:</p>
                  <p>{viewingItem.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handlePrint} className="gap-2">
              <Printer className="w-4 h-4" />
              چاپ
            </Button>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>بستن</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
