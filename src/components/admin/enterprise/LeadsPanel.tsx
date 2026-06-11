'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Target, Plus, Search, Pencil, Trash2, Loader2 } from 'lucide-react';
import { formatNumber, formatDate, getStatusBadgeClass, getStatusLabel } from './utils';
import { getLeads, addLead, updateLead, deleteLead, getStaff } from '@/lib/storage';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  childName: string | null;
  childAge: number | null;
  interestedCourse: string | null;
  province: string | null;
  city: string | null;
  source: string;
  status: string;
  priority: string;
  notes: string | null;
  assignedToId: string | null;
  branchId: string | null;
  createdAt: string;
  assignedTo: { id: string; name: string } | null;
  branch: { id: string; name: string } | null;
  _count: { followUps: number; leadNotes: number };
}

const sourceOptions = [
  { value: 'WEBSITE_FORM', label: 'فرم وبسایت' },
  { value: 'WHATSAPP', label: 'واتساپ' },
  { value: 'PHONE_CALL', label: 'تماس تلفنی' },
  { value: 'INSTAGRAM', label: 'اینستاگرام' },
  { value: 'TELEGRAM', label: 'تلگرام' },
  { value: 'REFERRAL', label: 'معرفی' },
  { value: 'WALK_IN', label: 'مراجعه حضوری' },
  { value: 'ADVERTISEMENT', label: 'تبلیغات' },
  { value: 'CAMPAIGN', label: 'کمپین' },
  { value: 'OTHER', label: 'سایر' },
];

const statusOptions = [
  { value: 'NEW', label: 'جدید' },
  { value: 'CONTACTED', label: 'تماس گرفته شده' },
  { value: 'CONSULTATION_SCHEDULED', label: 'مشاوره زمان‌بندی شده' },
  { value: 'CONSULTATION_DONE', label: 'مشاوره انجام شده' },
  { value: 'TRIAL_CLASS_SCHEDULED', label: 'کلاس آزمایشی' },
  { value: 'TRIAL_CLASS_DONE', label: 'کلاس آزمایشی انجام شده' },
  { value: 'ENROLLMENT_OFFERED', label: 'پیشنهاد ثبت‌نام' },
  { value: 'ENROLLED', label: 'ثبت‌نام شده' },
  { value: 'LOST', label: 'از دست رفته' },
  { value: 'NOT_INTERESTED', label: 'بدون علاقه' },
];

const priorityOptions = [
  { value: 'LOW', label: 'کم' },
  { value: 'MEDIUM', label: 'متوسط' },
  { value: 'HIGH', label: 'زیاد' },
  { value: 'URGENT', label: 'فوری' },
];

export default function LeadsPanel() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [users, setUsers] = useState<Array<{ id: string; name: string }>>([]);
  const [branches, setBranches] = useState<Array<{ id: string; name: string }>>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Lead | null>(null);
  const [saving, setSaving] = useState(false);
  const pageSize = 10;

  const [form, setForm] = useState({
    name: '', phone: '', email: '', childName: '', childAge: '',
    interestedCourse: '', province: '', city: '', source: 'WEBSITE_FORM',
    status: 'NEW', priority: 'MEDIUM', notes: '', assignedToId: '', branchId: '',
  });

  const loadLeads = useCallback(() => {
    try {
      setLoading(true);
      let allLeads = getLeads() as Lead[];

      // Apply search filter
      if (search) {
        const q = search.toLowerCase();
        allLeads = allLeads.filter(l =>
          l.name?.toLowerCase().includes(q) || l.phone?.toLowerCase().includes(q)
        );
      }
      // Apply status filter
      if (statusFilter) {
        allLeads = allLeads.filter(l => l.status === statusFilter);
      }
      // Apply source filter
      if (sourceFilter) {
        allLeads = allLeads.filter(l => l.source === sourceFilter);
      }

      setCount(allLeads.length);
      // Apply pagination
      const start = (page - 1) * pageSize;
      const paged = allLeads.slice(start, start + pageSize);
      setLeads(paged);
    } catch (err) {
      console.error('Failed to load leads:', err);
      setLeads([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter, sourceFilter]);

  useEffect(() => { loadLeads(); }, [loadLeads]);

  // Load users (staff) and branches from localStorage
  useEffect(() => {
    try {
      const staff = getStaff();
      setUsers(staff.map(s => ({ id: s.id, name: s.name })));
      // Branches stored in localStorage key 'vira_branches'
      const storedBranches = localStorage.getItem('vira_branches');
      if (storedBranches) {
        setBranches(JSON.parse(storedBranches).map((b: { id: string; name: string }) => ({ id: b.id, name: b.name })));
      }
    } catch {}
  }, []);

  const openAddDialog = () => {
    setEditingItem(null);
    setForm({ name: '', phone: '', email: '', childName: '', childAge: '', interestedCourse: '', province: '', city: '', source: 'WEBSITE_FORM', status: 'NEW', priority: 'MEDIUM', notes: '', assignedToId: '', branchId: '' });
    setDialogOpen(true);
  };

  const openEditDialog = (lead: Lead) => {
    setEditingItem(lead);
    setForm({
      name: lead.name, phone: lead.phone, email: lead.email || '', childName: lead.childName || '',
      childAge: lead.childAge ? String(lead.childAge) : '', interestedCourse: lead.interestedCourse || '',
      province: lead.province || '', city: lead.city || '', source: lead.source, status: lead.status,
      priority: lead.priority, notes: lead.notes || '', assignedToId: lead.assignedToId || '',
      branchId: lead.branchId || '',
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    try {
      setSaving(true);
      const body = {
        name: form.name, phone: form.phone, email: form.email || null,
        childName: form.childName || null, childAge: form.childAge ? parseInt(form.childAge) : null,
        interestedCourse: form.interestedCourse || null, province: form.province || null,
        city: form.city || null, source: form.source, status: form.status, priority: form.priority,
        notes: form.notes || null, assignedToId: form.assignedToId || null,
        branchId: form.branchId || null,
      };
      if (editingItem) {
        updateLead(editingItem.id, body);
      } else {
        addLead({
          id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          ...body,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as any);
      }
      setDialogOpen(false);
      loadLeads();
    } catch (err) {
      console.error('Failed to save lead:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این سرنخ اطمینان دارید؟')) return;
    try {
      deleteLead(id);
      loadLeads();
    } catch (err) {
      console.error('Failed to delete lead:', err);
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
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v === 'ALL' ? '' : v); setPage(1); }}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="وضعیت" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه</SelectItem>
              {statusOptions.map(s => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={(v) => { setSourceFilter(v === 'ALL' ? '' : v); setPage(1); }}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="منبع" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه منابع</SelectItem>
              {sourceOptions.map(s => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAddDialog} className="bg-amber-600 hover:bg-amber-700 gap-2">
          <Plus className="w-4 h-4" />
          افزودن سرنخ
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
                  <TableHead className="text-right">دوره مورد نظر</TableHead>
                  <TableHead className="text-right">شهر</TableHead>
                  <TableHead className="text-right">منبع</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">اولویت</TableHead>
                  <TableHead className="text-right">مسئول</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.length === 0 ? (
                  <TableRow><TableCell colSpan={9} className="text-center py-8 text-gray-400">
                    {search || statusFilter || sourceFilter
                      ? 'سرنخی با این فیلترها یافت نشد. فیلترها را تغییر دهید.'
                      : 'هنوز سرنخی ثبت نشده است. با کلیک روی «افزودن سرنخ» شروع کنید.'}
                  </TableCell></TableRow>
                ) : leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        {lead.childName && <p className="text-xs text-gray-500">فرزند: {lead.childName}</p>}
                      </div>
                    </TableCell>
                    <TableCell dir="ltr">{lead.phone}</TableCell>
                    <TableCell className="text-sm">{lead.interestedCourse || '—'}</TableCell>
                    <TableCell className="text-sm">{lead.city || '—'}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{getStatusLabel(lead.source)}</Badge></TableCell>
                    <TableCell><Badge className={`text-[10px] ${getStatusBadgeClass(lead.status)}`}>{getStatusLabel(lead.status)}</Badge></TableCell>
                    <TableCell><Badge className={`text-[10px] ${getStatusBadgeClass(lead.priority)}`}>{getStatusLabel(lead.priority)}</Badge></TableCell>
                    <TableCell className="text-sm">{lead.assignedTo?.name || '—'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(lead)}><Pencil className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDelete(lead.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
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
          <span className="text-gray-500">{formatNumber(count)} سرنخ — صفحه {formatNumber(page)} از {formatNumber(totalPages)}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>قبلی</Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>بعدی</Button>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader><DialogTitle>{editingItem ? 'ویرایش سرنخ' : 'افزودن سرنخ جدید'}</DialogTitle></DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>نام</Label><Input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div className="space-y-2"><Label>تلفن</Label><Input dir="ltr" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>ایمیل</Label><Input type="email" dir="ltr" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} /></div>
              <div className="space-y-2"><Label>نام فرزند</Label><Input value={form.childName} onChange={(e) => setForm(f => ({ ...f, childName: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>سن فرزند</Label><Input type="number" dir="ltr" value={form.childAge} onChange={(e) => setForm(f => ({ ...f, childAge: e.target.value }))} /></div>
              <div className="space-y-2"><Label>دوره مورد علاقه</Label><Input value={form.interestedCourse} onChange={(e) => setForm(f => ({ ...f, interestedCourse: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>استان</Label><Input value={form.province} onChange={(e) => setForm(f => ({ ...f, province: e.target.value }))} /></div>
              <div className="space-y-2"><Label>شهر</Label><Input value={form.city} onChange={(e) => setForm(f => ({ ...f, city: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>منبع</Label>
                <Select value={form.source} onValueChange={(v) => setForm(f => ({ ...f, source: v }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{sourceOptions.map(s => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>وضعیت</Label>
                <Select value={form.status} onValueChange={(v) => setForm(f => ({ ...f, status: v }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{statusOptions.map(s => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>اولویت</Label>
                <Select value={form.priority} onValueChange={(v) => setForm(f => ({ ...f, priority: v }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{priorityOptions.map(p => (<SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>))}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>مسئول پیگیری</Label>
                <Select value={form.assignedToId} onValueChange={(v) => setForm(f => ({ ...f, assignedToId: v === 'NONE' ? '' : v }))}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">بدون مسئول</SelectItem>
                    {users.map(u => (<SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2"><Label>یادداشت</Label><Textarea value={form.notes} onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} /></div>
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
