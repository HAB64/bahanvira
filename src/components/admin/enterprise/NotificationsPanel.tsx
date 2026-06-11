'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bell, Plus, Search, Trash2, CheckCheck, Eye, Loader2, Mail, MessageSquare, CreditCard, AlertTriangle, Calendar, Gift, UserPlus } from 'lucide-react';
import { getNotifications, addNotification, markNotificationRead, markAllNotificationsRead, deleteNotification, saveNotifications } from '@/lib/storage';
import type { Notification, NotificationType } from '@/types';
import { formatNumber, formatDate } from './utils';

const notificationTypeLabels: Record<NotificationType, string> = {
  new_lead: 'سرنخ جدید',
  new_enrollment: 'ثبت‌نام جدید',
  exam_result: 'نتیجه آزمون',
  follow_up_reminder: 'یادآوری پیگیری',
  referral_reward: 'جایزه معرف',
  class_reminder: 'یادآوری کلاس',
  payment: 'پرداخت',
  system: 'سیستم',
};

const notificationTypeColors: Record<NotificationType, string> = {
  new_lead: 'bg-blue-100 text-blue-800',
  new_enrollment: 'bg-green-100 text-green-800',
  exam_result: 'bg-purple-100 text-purple-800',
  follow_up_reminder: 'bg-amber-100 text-amber-800',
  referral_reward: 'bg-emerald-100 text-emerald-800',
  class_reminder: 'bg-teal-100 text-teal-800',
  payment: 'bg-cyan-100 text-cyan-800',
  system: 'bg-gray-100 text-gray-800',
};

const notificationTypeIcons: Record<NotificationType, typeof Bell> = {
  new_lead: UserPlus,
  new_enrollment: UserPlus,
  exam_result: CreditCard,
  follow_up_reminder: AlertTriangle,
  referral_reward: Gift,
  class_reminder: Calendar,
  payment: CreditCard,
  system: AlertTriangle,
};

const NOTIFICATIONS_INITIALIZED_KEY = 'vira_notifications_initialized';

const sampleNotifications: Notification[] = [
  {
    id: crypto.randomUUID(),
    userId: 'system',
    title: 'سرنخ جدید ثبت شد',
    message: 'یک سرنخ جدید از طریق فرم وبسایت ثبت شده است. لطفاً پیگیری کنید.',
    type: 'new_lead',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: crypto.randomUUID(),
    userId: 'system',
    title: 'ثبت‌نام موفق',
    message: 'کارآموز جدید با موفقیت در دوره چرتکه مقدماتی ثبت‌نام شد.',
    type: 'new_enrollment',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: crypto.randomUUID(),
    userId: 'system',
    title: 'نتیجه آزمون آماده',
    message: 'نتایج آزمون تعیین سطح شماره ۱ منتشر شده است.',
    type: 'exam_result',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: crypto.randomUUID(),
    userId: 'system',
    title: 'یادآوری پیگیری',
    message: 'زمان پیگیری سرنخ «علی محمدی» فرا رسیده است.',
    type: 'follow_up_reminder',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: crypto.randomUUID(),
    userId: 'system',
    title: 'جایزه معرف',
    message: 'جایزه معرفی کارآموز جدید توسط «سارا احمدی» آماده دریافت است.',
    type: 'referral_reward',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: crypto.randomUUID(),
    userId: 'system',
    title: 'یادآوری کلاس',
    message: 'کلاس چرتکه پیشرفته فردا ساعت ۱۶:۰۰ برگزار می‌شود.',
    type: 'class_reminder',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: crypto.randomUUID(),
    userId: 'system',
    title: 'پرداخت شهریه',
    message: 'شهریه ماهانه کارآموز «رضا کریمی» با موفقیت دریافت شد.',
    type: 'payment',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: crypto.randomUUID(),
    userId: 'system',
    title: 'به‌روزرسانی سیستم',
    message: 'سیستم مدیریت به نسخه جدید به‌روزرسانی شد. لطفاً تنظیمات خود را بررسی کنید.',
    type: 'system',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [readFilter, setReadFilter] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', type: 'system' as NotificationType, userId: '' });

  useEffect(() => {
    loadData();
    initSampleData();
  }, []);

  const initSampleData = () => {
    try {
      if (typeof window === 'undefined') return;
      const initialized = localStorage.getItem(NOTIFICATIONS_INITIALIZED_KEY);
      if (!initialized) {
        const existing = getNotifications();
        if (existing.length === 0) {
          saveNotifications(sampleNotifications);
          localStorage.setItem(NOTIFICATIONS_INITIALIZED_KEY, 'true');
          loadData();
        } else {
          localStorage.setItem(NOTIFICATIONS_INITIALIZED_KEY, 'true');
        }
      }
    } catch {
      // ignore
    }
  };

  const loadData = () => {
    try {
      setLoading(true);
      const data = getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter
  const filtered = notifications.filter((n) => {
    const matchSearch = !search || n.title.includes(search) || n.message.includes(search);
    const matchType = !typeFilter || n.type === typeFilter;
    const matchRead = readFilter === 'unread' ? !n.read : readFilter === 'read' ? n.read : true;
    return matchSearch && matchType && matchRead;
  });

  // Stats
  const totalNotifications = notifications.length;
  const unreadCount = notifications.filter((n) => !n.read).length;
  const typeBreakdown = (Object.keys(notificationTypeLabels) as NotificationType[]).map((t) => ({
    type: t,
    label: notificationTypeLabels[t],
    count: notifications.filter((n) => n.type === t).length,
  })).filter((t) => t.count > 0);

  const handleAdd = () => {
    try {
      const newNotification: Notification = {
        id: crypto.randomUUID(),
        userId: form.userId || 'system',
        title: form.title,
        message: form.message,
        type: form.type,
        read: false,
        createdAt: new Date().toISOString(),
      };
      addNotification(newNotification);
      setDialogOpen(false);
      setForm({ title: '', message: '', type: 'system', userId: '' });
      loadData();
    } catch (err) {
      console.error('Failed to add notification:', err);
    }
  };

  const handleMarkRead = (id: string) => {
    try {
      markNotificationRead(id);
      loadData();
    } catch (err) {
      console.error('Failed to mark read:', err);
    }
  };

  const handleMarkAllRead = () => {
    try {
      markAllNotificationsRead();
      loadData();
    } catch (err) {
      console.error('Failed to mark all read:', err);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این اعلان اطمینان دارید؟')) return;
    try {
      deleteNotification(id);
      loadData();
    } catch (err) {
      console.error('Failed to delete notification:', err);
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
                <p className="text-sm text-blue-600">کل اعلان‌ها</p>
                <p className="text-2xl font-bold text-blue-700">{formatNumber(totalNotifications)}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-100"><Bell className="w-5 h-5 text-blue-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">خوانده نشده</p>
                <p className="text-2xl font-bold text-amber-700">{formatNumber(unreadCount)}</p>
              </div>
              <div className="p-2 rounded-lg bg-amber-100"><Mail className="w-5 h-5 text-amber-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50 col-span-2">
          <CardContent className="p-4">
            <p className="text-sm text-green-600 mb-2">تفکیک نوع</p>
            <div className="flex flex-wrap gap-1">
              {typeBreakdown.map((t) => (
                <Badge key={t.type} variant="outline" className="text-[10px]">
                  {t.label}: {formatNumber(t.count)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="جستجوی عنوان، پیام..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
          </div>
          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v === 'ALL' ? '' : v)}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="نوع" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه</SelectItem>
              {(Object.keys(notificationTypeLabels) as NotificationType[]).map((t) => (
                <SelectItem key={t} value={t}>{notificationTypeLabels[t]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={readFilter} onValueChange={setReadFilter}>
            <SelectTrigger className="w-[130px]"><SelectValue placeholder="وضعیت خواندن" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه</SelectItem>
              <SelectItem value="unread">خوانده نشده</SelectItem>
              <SelectItem value="read">خوانده شده</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button onClick={handleMarkAllRead} variant="outline" className="gap-2 text-sm">
              <CheckCheck className="w-4 h-4" />
              خواندن همه
            </Button>
          )}
          <Button onClick={() => setDialogOpen(true)} className="bg-amber-600 hover:bg-amber-700 gap-2">
            <Plus className="w-4 h-4" />
            افزودن اعلان
          </Button>
        </div>
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
                  <TableHead className="text-right w-8"></TableHead>
                  <TableHead className="text-right">عنوان</TableHead>
                  <TableHead className="text-right">نوع</TableHead>
                  <TableHead className="text-right">تاریخ</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-gray-400">اعلانی یافت نشد</TableCell></TableRow>
                ) : filtered.map((n) => {
                  const IconComponent = notificationTypeIcons[n.type] || Bell;
                  return (
                    <TableRow key={n.id} className={n.read ? 'opacity-60' : ''}>
                      <TableCell>
                        <div className={`p-1.5 rounded ${notificationTypeColors[n.type]}`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className={`font-medium text-sm ${!n.read ? 'font-bold' : ''}`}>{n.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 max-w-xs truncate">{n.message}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-[10px] ${notificationTypeColors[n.type]}`}>
                          {notificationTypeLabels[n.type]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">{formatDate(n.createdAt)}</TableCell>
                      <TableCell>
                        {n.read ? (
                          <Badge className="bg-gray-100 text-gray-600 text-[10px]">خوانده شده</Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-800 text-[10px]">جدید</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {!n.read && (
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleMarkRead(n.id)} title="خواندن">
                              <Eye className="w-3.5 h-3.5" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDelete(n.id)}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="text-sm text-gray-500">{formatNumber(filtered.length)} اعلان</div>

      {/* Add Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader><DialogTitle>افزودن اعلان جدید</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>عنوان</Label><Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} /></div>
            <div className="space-y-2"><Label>پیام</Label><Textarea value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} rows={3} /></div>
            <div className="space-y-2">
              <Label>نوع</Label>
              <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v as NotificationType }))}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(notificationTypeLabels) as NotificationType[]).map((t) => (
                    <SelectItem key={t} value={t}>{notificationTypeLabels[t]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>شناسه کاربر (اختیاری)</Label><Input value={form.userId} onChange={(e) => setForm((f) => ({ ...f, userId: e.target.value }))} placeholder="system" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleAdd} disabled={!form.title || !form.message} className="bg-amber-600 hover:bg-amber-700">
              افزودن
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
