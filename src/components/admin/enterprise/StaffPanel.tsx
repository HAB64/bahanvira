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
import { Users, Plus, Search, Pencil, Trash2, Loader2 } from 'lucide-react';
import { getStaff, addStaff, updateStaff, deleteStaff } from '@/lib/storage';
import type { Staff, StaffRole } from '@/types';
import { staffRoleLabels } from '@/types';
import { formatNumber, formatDate, formatCurrency } from './utils';

const roleOptions: { value: StaffRole; label: string }[] = (Object.keys(staffRoleLabels) as StaffRole[]).map(
  (key) => ({ value: key, label: staffRoleLabels[key] })
);

const staffStatusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-red-100 text-red-800',
};

const staffStatusLabels: Record<string, string> = {
  active: 'فعال',
  inactive: 'غیرفعال',
};

interface StaffForm {
  name: string;
  phone: string;
  email: string;
  role: StaffRole;
  branchId: string;
  branchName: string;
  hireDate: string;
  salary: string;
  status: 'active' | 'inactive';
  nationalId: string;
  address: string;
  emergencyContact: string;
  notes: string;
}

const emptyForm: StaffForm = {
  name: '', phone: '', email: '', role: 'receptionist',
  branchId: '', branchName: '', hireDate: new Date().toISOString().split('T')[0],
  salary: '', status: 'active', nationalId: '', address: '', emergencyContact: '', notes: '',
};

export default function StaffPanel() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Staff | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<StaffForm>({ ...emptyForm });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      setLoading(true);
      const data = getStaff();
      setStaff(data);
    } catch (err) {
      console.error('Failed to load staff:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter
  const filtered = staff.filter((s) => {
    const matchSearch = !search || s.name.includes(search) || s.phone.includes(search) || (s.email && s.email.includes(search));
    const matchRole = !roleFilter || s.role === roleFilter;
    const matchStatus = !statusFilter || s.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  // Stats
  const totalStaff = staff.length;
  const activeStaff = staff.filter((s) => s.status === 'active').length;
  const inactiveStaff = staff.filter((s) => s.status === 'inactive').length;
  const roleBreakdown = roleOptions.map((r) => ({
    role: r.value,
    label: r.label,
    count: staff.filter((s) => s.role === r.value).length,
  })).filter((r) => r.count > 0);

  const openAddDialog = () => {
    setEditingItem(null);
    setForm({ ...emptyForm });
    setDialogOpen(true);
  };

  const openEditDialog = (item: Staff) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      phone: item.phone,
      email: item.email || '',
      role: item.role,
      branchId: item.branchId || '',
      branchName: item.branchName || '',
      hireDate: item.hireDate ? new Date(item.hireDate).toISOString().split('T')[0] : '',
      salary: String(item.salary),
      status: item.status,
      nationalId: item.nationalId || '',
      address: item.address || '',
      emergencyContact: item.emergencyContact || '',
      notes: item.notes || '',
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    try {
      setSaving(true);
      const now = new Date().toISOString();
      const staffData: Staff = {
        id: editingItem ? editingItem.id : crypto.randomUUID(),
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        role: form.role,
        branchId: form.branchId || undefined,
        branchName: form.branchName || undefined,
        hireDate: form.hireDate ? new Date(form.hireDate).toISOString() : now,
        salary: parseInt(form.salary) || 0,
        status: form.status,
        nationalId: form.nationalId || undefined,
        address: form.address || undefined,
        emergencyContact: form.emergencyContact || undefined,
        notes: form.notes || undefined,
        createdAt: editingItem ? editingItem.createdAt : now,
        updatedAt: now,
      };

      if (editingItem) {
        updateStaff(staffData.id, staffData);
      } else {
        addStaff(staffData);
      }
      setDialogOpen(false);
      loadData();
    } catch (err) {
      console.error('Failed to save staff:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این کارمند اطمینان دارید؟')) return;
    try {
      deleteStaff(id);
      loadData();
    } catch (err) {
      console.error('Failed to delete staff:', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">کل کارکنان</p>
                <p className="text-2xl font-bold text-blue-700">{formatNumber(totalStaff)}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-100"><Users className="w-5 h-5 text-blue-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">فعال</p>
                <p className="text-2xl font-bold text-green-700">{formatNumber(activeStaff)}</p>
              </div>
              <div className="p-2 rounded-lg bg-green-100"><Users className="w-5 h-5 text-green-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">غیرفعال</p>
                <p className="text-2xl font-bold text-red-700">{formatNumber(inactiveStaff)}</p>
              </div>
              <div className="p-2 rounded-lg bg-red-100"><Users className="w-5 h-5 text-red-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-amber-600 mb-2">تفکیک نقش</p>
              <div className="flex flex-wrap gap-1">
                {roleBreakdown.map((r) => (
                  <Badge key={r.role} variant="outline" className="text-[10px]">
                    {r.label}: {formatNumber(r.count)}
                  </Badge>
                ))}
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
            <Input placeholder="جستجوی نام، تلفن..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
          </div>
          <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v === 'ALL' ? '' : v)}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="نقش" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه نقش‌ها</SelectItem>
              {roleOptions.map((r) => (<SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v === 'ALL' ? '' : v)}>
            <SelectTrigger className="w-[120px]"><SelectValue placeholder="وضعیت" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه</SelectItem>
              <SelectItem value="active">فعال</SelectItem>
              <SelectItem value="inactive">غیرفعال</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAddDialog} className="bg-amber-600 hover:bg-amber-700 gap-2">
          <Plus className="w-4 h-4" />
          افزودن کارمند
        </Button>
      </div>

      {/* Table */}
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
                  <TableHead className="text-right">نقش</TableHead>
                  <TableHead className="text-right">شعبه</TableHead>
                  <TableHead className="text-right">حقوق</TableHead>
                  <TableHead className="text-right">تاریخ استخدام</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-400">کارمندی یافت نشد</TableCell></TableRow>
                ) : filtered.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell dir="ltr">{s.phone}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{staffRoleLabels[s.role]}</Badge></TableCell>
                    <TableCell className="text-sm">{s.branchName || '—'}</TableCell>
                    <TableCell className="text-sm">{formatCurrency(s.salary)}</TableCell>
                    <TableCell className="text-sm text-gray-500">{formatDate(s.hireDate)}</TableCell>
                    <TableCell>
                      <Badge className={staffStatusColors[s.status]}>{staffStatusLabels[s.status]}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(s)}><Pencil className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDelete(s.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="text-sm text-gray-500">{formatNumber(filtered.length)} کارمند</div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader><DialogTitle>{editingItem ? 'ویرایش کارمند' : 'افزودن کارمند جدید'}</DialogTitle></DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>نام</Label><Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} /></div>
              <div className="space-y-2"><Label>تلفن</Label><Input dir="ltr" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>ایمیل</Label><Input type="email" dir="ltr" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} /></div>
              <div className="space-y-2">
                <Label>نقش</Label>
                <Select value={form.role} onValueChange={(v) => setForm((f) => ({ ...f, role: v as StaffRole }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{roleOptions.map((r) => (<SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>))}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>شناسه شعبه</Label><Input value={form.branchId} onChange={(e) => setForm((f) => ({ ...f, branchId: e.target.value }))} /></div>
              <div className="space-y-2"><Label>نام شعبه</Label><Input value={form.branchName} onChange={(e) => setForm((f) => ({ ...f, branchName: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>تاریخ استخدام</Label><Input type="date" dir="ltr" value={form.hireDate} onChange={(e) => setForm((f) => ({ ...f, hireDate: e.target.value }))} /></div>
              <div className="space-y-2"><Label>حقوق (ریال)</Label><Input type="number" dir="ltr" value={form.salary} onChange={(e) => setForm((f) => ({ ...f, salary: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>کد ملی</Label><Input dir="ltr" value={form.nationalId} onChange={(e) => setForm((f) => ({ ...f, nationalId: e.target.value }))} /></div>
              <div className="space-y-2">
                <Label>وضعیت</Label>
                <Select value={form.status} onValueChange={(v) => setForm((f) => ({ ...f, status: v as 'active' | 'inactive' }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">فعال</SelectItem>
                    <SelectItem value="inactive">غیرفعال</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>آدرس</Label><Input value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} /></div>
              <div className="space-y-2"><Label>تماس اضطراری</Label><Input dir="ltr" value={form.emergencyContact} onChange={(e) => setForm((f) => ({ ...f, emergencyContact: e.target.value }))} /></div>
            </div>
            <div className="space-y-2"><Label>یادداشت</Label><Textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} rows={3} /></div>
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
