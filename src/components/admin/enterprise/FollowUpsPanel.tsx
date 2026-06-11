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
import { Phone, Plus, Search, Pencil, Trash2, CheckCircle2, Clock, PhoneCall, ListChecks, Loader2 } from 'lucide-react';
import { getFollowUps, addFollowUp, updateFollowUp, saveFollowUps } from '@/lib/storage';
import type { FollowUp } from '@/types';
import { formatNumber, formatDate, getStatusBadgeClass, getStatusLabel } from './utils';

const typeOptions = [
  { value: 'call', label: 'تماس تلفنی' },
  { value: 'whatsapp', label: 'واتساپ' },
  { value: 'meeting', label: 'جلسه حضوری' },
  { value: 'email', label: 'ایمیل' },
];

const statusOptions = [
  { value: 'all', label: 'همه' },
  { value: 'pending', label: 'در انتظار' },
  { value: 'completed', label: 'انجام شده' },
];

const typeKeyMap: Record<string, string> = {
  call: 'CALL',
  whatsapp: 'WHATSAPP',
  meeting: 'MEETING',
  email: 'EMAIL',
};

export default function FollowUpsPanel() {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FollowUp | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    leadId: '',
    scheduledAt: '',
    type: 'call' as FollowUp['type'],
    note: '',
  });

  const loadData = () => {
    try {
      setLoading(true);
      const data = getFollowUps();
      setFollowUps(data);
    } catch (err) {
      console.error('Failed to load follow-ups:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // Stats
  const totalFollowUps = followUps.length;
  const pendingCount = followUps.filter(f => !f.completed).length;
  const completedCount = followUps.filter(f => f.completed).length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayCount = followUps.filter(f => {
    const d = new Date(f.scheduledAt).toISOString().split('T')[0];
    return d === todayStr;
  }).length;

  // Filtering
  const filtered = followUps.filter(f => {
    const matchesSearch = !search ||
      (f.note && f.note.includes(search)) ||
      f.id.includes(search);
    const matchesType = !typeFilter || f.type === typeFilter;
    const matchesStatus =
      !statusFilter ||
      (statusFilter === 'pending' && !f.completed) ||
      (statusFilter === 'completed' && f.completed);
    return matchesSearch && matchesType && matchesStatus;
  });

  const openAddDialog = () => {
    setEditingItem(null);
    setForm({
      leadId: '',
      scheduledAt: new Date().toISOString().slice(0, 16),
      type: 'call',
      note: '',
    });
    setDialogOpen(true);
  };

  const openEditDialog = (item: FollowUp) => {
    setEditingItem(item);
    setForm({
      leadId: (item as FollowUp & { leadId?: string }).leadId || '',
      scheduledAt: item.scheduledAt ? new Date(item.scheduledAt).toISOString().slice(0, 16) : '',
      type: item.type,
      note: item.note || '',
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    try {
      setSaving(true);
      if (editingItem) {
        updateFollowUp(editingItem.id, {
          scheduledAt: form.scheduledAt ? new Date(form.scheduledAt).toISOString() : editingItem.scheduledAt,
          type: form.type,
          note: form.note || undefined,
        });
      } else {
        const newFollowUp: FollowUp = {
          id: crypto.randomUUID(),
          scheduledAt: form.scheduledAt ? new Date(form.scheduledAt).toISOString() : new Date().toISOString(),
          type: form.type,
          note: form.note || undefined,
          completed: false,
        };
        addFollowUp(newFollowUp);
      }
      setDialogOpen(false);
      loadData();
    } catch (err) {
      console.error('Failed to save follow-up:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleMarkCompleted = (item: FollowUp) => {
    try {
      updateFollowUp(item.id, {
        completed: true,
        completedAt: new Date().toISOString(),
      });
      loadData();
    } catch (err) {
      console.error('Failed to mark follow-up as completed:', err);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این پیگیری اطمینان دارید؟')) return;
    try {
      const updated = followUps.filter(f => f.id !== id);
      saveFollowUps(updated);
      loadData();
    } catch (err) {
      console.error('Failed to delete follow-up:', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <ListChecks className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-amber-700">کل پیگیری‌ها</p>
                <p className="text-lg font-bold text-amber-700">{formatNumber(totalFollowUps)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-orange-700">در انتظار</p>
                <p className="text-lg font-bold text-orange-700">{formatNumber(pendingCount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-green-700">انجام شده</p>
                <p className="text-lg font-bold text-green-700">{formatNumber(completedCount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <PhoneCall className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-blue-700">پیگیری امروز</p>
                <p className="text-lg font-bold text-blue-700">{formatNumber(todayCount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Add Button */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="جستجوی یادداشت..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v === 'all' ? '' : v)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="نوع پیگیری" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه انواع</SelectItem>
              {typeOptions.map(t => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v === 'all' ? '' : v)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="وضعیت" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(s => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAddDialog} className="bg-amber-600 hover:bg-amber-700 gap-2">
          <Plus className="w-4 h-4" />
          افزودن پیگیری
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-amber-600" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">تاریخ پیگیری</TableHead>
                  <TableHead className="text-right">نوع</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">یادداشت</TableHead>
                  <TableHead className="text-right">تاریخ انجام</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                      پیگیری‌ای یافت نشد
                    </TableCell>
                  </TableRow>
                ) : filtered.map((item) => (
                  <TableRow key={item.id} className={item.completed ? 'opacity-60' : ''}>
                    <TableCell className="text-sm">{formatDate(item.scheduledAt)}</TableCell>
                    <TableCell>
                      <Badge className={`text-[10px] ${getStatusBadgeClass(typeKeyMap[item.type] || item.type)}`}>
                        {getStatusLabel(typeKeyMap[item.type] || item.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-[10px] ${getStatusBadgeClass(item.completed ? 'COMPLETED_FOLLOWUP' : 'PENDING_FOLLOWUP')}`}>
                        {item.completed ? 'انجام شده' : 'در انتظار'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm max-w-[250px] truncate">{item.note || '—'}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {item.completedAt ? formatDate(item.completedAt) : '—'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {!item.completed && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-600 hover:text-green-800"
                            onClick={() => handleMarkCompleted(item)}
                            title="علامت‌گذاری انجام شده"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(item)}>
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'ویرایش پیگیری' : 'افزودن پیگیری جدید'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>شناسه سرنخ</Label>
              <Input
                placeholder="شناسه سرنخ مرتبط..."
                value={form.leadId}
                onChange={(e) => setForm(f => ({ ...f, leadId: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>تاریخ و زمان پیگیری</Label>
              <Input
                type="datetime-local"
                dir="ltr"
                value={form.scheduledAt}
                onChange={(e) => setForm(f => ({ ...f, scheduledAt: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>نوع پیگیری</Label>
              <Select value={form.type} onValueChange={(v) => setForm(f => ({ ...f, type: v as FollowUp['type'] }))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map(t => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>یادداشت</Label>
              <Textarea
                value={form.note}
                onChange={(e) => setForm(f => ({ ...f, note: e.target.value }))}
                rows={3}
                placeholder="توضیحات پیگیری..."
              />
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
