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
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpen, FileText, CheckCircle, Clock, Plus, Search, Pencil, Trash2 } from 'lucide-react';
import {
  getCourseContent, addCourseContent, updateCourseContent, deleteCourseContent,
} from '@/lib/storage';
import type { CourseContent, ContentType } from '@/types';
import { contentTypeLabels } from '@/types';
import { formatNumber, formatDate, getStatusBadgeClass } from './utils';

const contentTypeOptions: { value: ContentType; label: string }[] = [
  { value: 'video', label: 'ویدیو' },
  { value: 'document', label: 'سند' },
  { value: 'audio', label: 'صوتی' },
  { value: 'image', label: 'تصویر' },
  { value: 'link', label: 'لینک' },
  { value: 'presentation', label: 'ارائه' },
  { value: 'worksheet', label: 'کاربرگ' },
];

const emptyForm = {
  courseId: '',
  sessionId: '1',
  title: '',
  type: 'video' as ContentType,
  url: '',
  description: '',
  order: '1',
  isPublished: false,
};

export default function ContentPanel() {
  const [items, setItems] = useState<CourseContent[]>(() => getCourseContent());
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [publishFilter, setPublishFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CourseContent | null>(null);
  const [form, setForm] = useState(emptyForm);

  const loadData = () => {
    setItems(getCourseContent());
  };

  // Stats
  const totalContent = items.length;
  const publishedCount = items.filter(c => c.isPublished).length;
  const draftCount = items.filter(c => !c.isPublished).length;
  const typeBreakdown: Record<string, number> = {};
  items.forEach(c => {
    typeBreakdown[c.type] = (typeBreakdown[c.type] || 0) + 1;
  });

  // Filtered data
  const filtered = items.filter(item => {
    const matchSearch = !search || item.title.includes(search) || item.courseId.includes(search) || item.description.includes(search);
    const matchCourse = !courseFilter || item.courseId === courseFilter;
    const matchType = !typeFilter || item.type === typeFilter;
    const matchPublish = !publishFilter ||
      (publishFilter === 'published' && item.isPublished) ||
      (publishFilter === 'draft' && !item.isPublished);
    return matchSearch && matchCourse && matchType && matchPublish;
  });

  // Unique course IDs for filter
  const courseIds = Array.from(new Set(items.map(c => c.courseId))).sort();

  const openAddDialog = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (item: CourseContent) => {
    setEditingItem(item);
    setForm({
      courseId: item.courseId,
      sessionId: String(item.sessionId),
      title: item.title,
      type: item.type,
      url: item.url || '',
      description: item.description,
      order: String(item.order),
      isPublished: item.isPublished,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const now = new Date().toISOString();
    if (editingItem) {
      updateCourseContent(editingItem.id, {
        courseId: form.courseId,
        sessionId: parseInt(form.sessionId) || 1,
        title: form.title,
        type: form.type,
        url: form.url || undefined,
        description: form.description,
        order: parseInt(form.order) || 1,
        isPublished: form.isPublished,
        updatedAt: now,
      });
    } else {
      const newItem: CourseContent = {
        id: crypto.randomUUID(),
        courseId: form.courseId,
        sessionId: parseInt(form.sessionId) || 1,
        title: form.title,
        type: form.type,
        url: form.url || undefined,
        description: form.description,
        order: parseInt(form.order) || 1,
        isPublished: form.isPublished,
        createdAt: now,
        updatedAt: now,
      };
      addCourseContent(newItem);
    }
    setDialogOpen(false);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این محتوا اطمینان دارید؟')) return;
    deleteCourseContent(id);
    loadData();
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100"><BookOpen className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="text-xs text-blue-700">کل محتوا</p>
                <p className="text-lg font-bold text-blue-700">{formatNumber(totalContent)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100"><CheckCircle className="w-5 h-5 text-green-600" /></div>
              <div>
                <p className="text-xs text-green-700">منتشر شده</p>
                <p className="text-lg font-bold text-green-700">{formatNumber(publishedCount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100"><Clock className="w-5 h-5 text-amber-600" /></div>
              <div>
                <p className="text-xs text-amber-700">پیش‌نویس</p>
                <p className="text-lg font-bold text-amber-700">{formatNumber(draftCount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100"><FileText className="w-5 h-5 text-purple-600" /></div>
              <div>
                <p className="text-xs text-purple-700">نوع محتوا</p>
                <p className="text-lg font-bold text-purple-700">{formatNumber(Object.keys(typeBreakdown).length)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Type Breakdown */}
      {Object.keys(typeBreakdown).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(typeBreakdown).map(([type, count]) => (
            <Badge key={type} variant="outline" className={getStatusBadgeClass(type.toUpperCase())}>
              {contentTypeLabels[type as ContentType]}: {formatNumber(count)}
            </Badge>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="جستجوی عنوان، توضیحات..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
          </div>
          <Select value={courseFilter} onValueChange={(v) => setCourseFilter(v === 'ALL' ? '' : v)}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="دوره" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه دوره‌ها</SelectItem>
              {courseIds.map(id => (<SelectItem key={id} value={id}>{id}</SelectItem>))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v === 'ALL' ? '' : v)}>
            <SelectTrigger className="w-[120px]"><SelectValue placeholder="نوع" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه انواع</SelectItem>
              {contentTypeOptions.map(t => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
            </SelectContent>
          </Select>
          <Select value={publishFilter} onValueChange={(v) => setPublishFilter(v === 'ALL' ? '' : v)}>
            <SelectTrigger className="w-[120px]"><SelectValue placeholder="وضعیت انتشار" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه</SelectItem>
              <SelectItem value="published">منتشر شده</SelectItem>
              <SelectItem value="draft">پیش‌نویس</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAddDialog} className="bg-amber-600 hover:bg-amber-700 gap-2">
          <Plus className="w-4 h-4" />
          افزودن محتوا
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">عنوان</TableHead>
                <TableHead className="text-right">شناسه دوره</TableHead>
                <TableHead className="text-right">جلسه</TableHead>
                <TableHead className="text-right">نوع</TableHead>
                <TableHead className="text-right">ترتیب</TableHead>
                <TableHead className="text-right">وضعیت</TableHead>
                <TableHead className="text-right">تاریخ ایجاد</TableHead>
                <TableHead className="text-right">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-400">محتوایی یافت نشد</TableCell></TableRow>
              ) : filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      {item.description && <p className="text-xs text-gray-500 max-w-[200px] truncate">{item.description}</p>}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm" dir="ltr">{item.courseId}</TableCell>
                  <TableCell className="text-sm">{formatNumber(item.sessionId)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(item.type.toUpperCase())}>
                      {contentTypeLabels[item.type]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{formatNumber(item.order)}</TableCell>
                  <TableCell>
                    <Badge className={item.isPublished ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                      {item.isPublished ? 'منتشر شده' : 'پیش‌نویس'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{formatDate(item.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
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
            <DialogTitle>{editingItem ? 'ویرایش محتوا' : 'افزودن محتوای جدید'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>شناسه دوره</Label>
                <Input dir="ltr" value={form.courseId} onChange={(e) => setForm(f => ({ ...f, courseId: e.target.value }))} placeholder="course-1" />
              </div>
              <div className="space-y-2">
                <Label>شماره جلسه</Label>
                <Input type="number" dir="ltr" value={form.sessionId} onChange={(e) => setForm(f => ({ ...f, sessionId: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>عنوان</Label>
              <Input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نوع محتوا</Label>
                <Select value={form.type} onValueChange={(v) => setForm(f => ({ ...f, type: v as ContentType }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {contentTypeOptions.map(t => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>ترتیب</Label>
                <Input type="number" dir="ltr" value={form.order} onChange={(e) => setForm(f => ({ ...f, order: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>آدرس (URL)</Label>
              <Input dir="ltr" value={form.url} onChange={(e) => setForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label>توضیحات</Label>
              <Textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} rows={3} />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="isPublished"
                checked={form.isPublished}
                onCheckedChange={(checked) => setForm(f => ({ ...f, isPublished: !!checked }))}
              />
              <Label htmlFor="isPublished" className="cursor-pointer">منتشر شده</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700">
              {editingItem ? 'ذخیره' : 'افزودن'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
