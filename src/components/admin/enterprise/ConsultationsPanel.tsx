'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MessageSquare, Eye, UserCheck, TrendingUp, Loader2 } from 'lucide-react';
import { getConsultationRequests, updateConsultationRequest } from '@/lib/storage';
import type { ConsultationRequest } from '@/types';
import { formatNumber, formatDate, getStatusBadgeClass, getStatusLabel } from './utils';

const statusOptions = [
  { value: 'all', label: 'همه وضعیت‌ها' },
  { value: 'new', label: 'جدید' },
  { value: 'contacted', label: 'تماس گرفته شده' },
  { value: 'scheduled', label: 'برنامه‌ریزی شده' },
  { value: 'converted', label: 'تبدیل شده' },
  { value: 'lost', label: 'از دست رفته' },
];

const consultationStatusKeyMap: Record<string, string> = {
  new: 'NEW_CONSULTATION',
  contacted: 'CONTACTED_CONSULTATION',
  scheduled: 'SCHEDULED_CONSULTATION',
  converted: 'CONVERTED_CONSULTATION',
  lost: 'LOST_CONSULTATION',
};

const sourceLabels: Record<string, string> = {
  website: 'وبسایت',
  whatsapp: 'واتساپ',
  instagram: 'اینستاگرام',
  referral: 'معرفی',
};

export default function ConsultationsPanel() {
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ConsultationRequest | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [saving, setSaving] = useState(false);

  const loadData = () => {
    try {
      setLoading(true);
      const data = getConsultationRequests();
      setConsultations(data);
    } catch (err) {
      console.error('Failed to load consultations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // Stats
  const totalCount = consultations.length;
  const newCount = consultations.filter(c => c.status === 'new').length;
  const convertedCount = consultations.filter(c => c.status === 'converted').length;
  const conversionRate = totalCount > 0 ? Math.round((convertedCount / totalCount) * 100) : 0;

  // Filtering
  const filtered = consultations.filter(c => {
    return !statusFilter || c.status === statusFilter;
  });

  const openStatusDialog = (item: ConsultationRequest) => {
    setSelectedItem(item);
    setNewStatus(item.status);
    setStatusDialogOpen(true);
  };

  const openDetailDialog = (item: ConsultationRequest) => {
    setSelectedItem(item);
    setDetailDialogOpen(true);
  };

  const handleStatusUpdate = () => {
    if (!selectedItem || !newStatus) return;
    try {
      setSaving(true);
      updateConsultationRequest(selectedItem.id, { status: newStatus as ConsultationRequest['status'] });
      setStatusDialogOpen(false);
      loadData();
    } catch (err) {
      console.error('Failed to update consultation status:', err);
    } finally {
      setSaving(false);
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
                <MessageSquare className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-amber-700">کل درخواست‌ها</p>
                <p className="text-lg font-bold text-amber-700">{formatNumber(totalCount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <MessageSquare className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-blue-700">جدید</p>
                <p className="text-lg font-bold text-blue-700">{formatNumber(newCount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <UserCheck className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-green-700">تبدیل شده</p>
                <p className="text-lg font-bold text-green-700">{formatNumber(convertedCount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-teal-200 bg-teal-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-100">
                <TrendingUp className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-teal-700">نرخ تبدیل</p>
                <p className="text-lg font-bold text-teal-700">{formatNumber(conversionRate)}٪</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v === 'all' ? '' : v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="فیلتر وضعیت" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map(s => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
                  <TableHead className="text-right">نام</TableHead>
                  <TableHead className="text-right">تلفن</TableHead>
                  <TableHead className="text-right">نام فرزند</TableHead>
                  <TableHead className="text-right">دوره مورد نظر</TableHead>
                  <TableHead className="text-right">منبع</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">تاریخ</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-400">
                      درخواست مشاوره‌ای یافت نشد
                    </TableCell>
                  </TableRow>
                ) : filtered.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell dir="ltr" className="text-sm">{item.phone}</TableCell>
                    <TableCell className="text-sm">{item.childName || '—'}</TableCell>
                    <TableCell className="text-sm">{item.interestedCourse || '—'}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {sourceLabels[item.source] || item.source}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-[10px] ${getStatusBadgeClass(consultationStatusKeyMap[item.status] || item.status)}`}>
                        {getStatusLabel(consultationStatusKeyMap[item.status] || item.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{formatDate(item.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openDetailDialog(item)}
                          title="مشاهده جزئیات"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:text-blue-800"
                          onClick={() => openStatusDialog(item)}
                          title="تغییر وضعیت"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
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

      {/* Update Status Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent className="max-w-sm" dir="rtl">
          <DialogHeader>
            <DialogTitle>تغییر وضعیت مشاوره</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <p><strong>نام:</strong> {selectedItem.name}</p>
                <p><strong>تلفن:</strong> {selectedItem.phone}</p>
              </div>
              <div className="space-y-2">
                <Label>وضعیت جدید</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">جدید</SelectItem>
                    <SelectItem value="contacted">تماس گرفته شده</SelectItem>
                    <SelectItem value="scheduled">برنامه‌ریزی شده</SelectItem>
                    <SelectItem value="converted">تبدیل شده</SelectItem>
                    <SelectItem value="lost">از دست رفته</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleStatusUpdate} disabled={saving} className="bg-amber-600 hover:bg-amber-700">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'ذخیره'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle>جزئیات درخواست مشاوره</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-500">نام:</span>
                  <p className="font-medium">{selectedItem.name}</p>
                </div>
                <div>
                  <span className="text-gray-500">تلفن:</span>
                  <p className="font-medium" dir="ltr">{selectedItem.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-500">نام فرزند:</span>
                  <p className="font-medium">{selectedItem.childName || '—'}</p>
                </div>
                <div>
                  <span className="text-gray-500">سن فرزند:</span>
                  <p className="font-medium">{selectedItem.childAge || '—'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-500">دوره مورد نظر:</span>
                  <p className="font-medium">{selectedItem.interestedCourse || '—'}</p>
                </div>
                <div>
                  <span className="text-gray-500">منبع:</span>
                  <p className="font-medium">{sourceLabels[selectedItem.source] || selectedItem.source}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-500">استان:</span>
                  <p className="font-medium">{selectedItem.province || '—'}</p>
                </div>
                <div>
                  <span className="text-gray-500">شهر:</span>
                  <p className="font-medium">{selectedItem.city || '—'}</p>
                </div>
              </div>
              <div>
                <span className="text-gray-500">وضعیت:</span>
                <Badge className={`text-[10px] mr-2 ${getStatusBadgeClass(consultationStatusKeyMap[selectedItem.status] || selectedItem.status)}`}>
                  {getStatusLabel(consultationStatusKeyMap[selectedItem.status] || selectedItem.status)}
                </Badge>
              </div>
              {selectedItem.referralCode && (
                <div>
                  <span className="text-gray-500">کد معرف:</span>
                  <p className="font-medium" dir="ltr">{selectedItem.referralCode}</p>
                </div>
              )}
              {selectedItem.message && (
                <div>
                  <span className="text-gray-500">پیام:</span>
                  <p className="font-medium mt-1 p-3 bg-gray-50 rounded-lg">{selectedItem.message}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-500">تاریخ ثبت:</span>
                  <p className="font-medium">{formatDate(selectedItem.createdAt)}</p>
                </div>
                {selectedItem.leadId && (
                  <div>
                    <span className="text-gray-500">شناسه سرنخ:</span>
                    <p className="font-medium">{selectedItem.leadId}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>بستن</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
