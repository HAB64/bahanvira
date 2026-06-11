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
import { UserCheck, Calendar, BarChart3, Plus, Search, Pencil, Trash2, Eye } from 'lucide-react';
import {
  getAttendanceRecords, addAttendanceRecord, updateAttendanceRecord, saveAttendanceRecords,
} from '@/lib/storage';
import type { AttendanceRecord, StudentAttendance } from '@/types';
import { attendanceStatusLabels } from '@/types';
import { formatNumber, formatDate, getStatusBadgeClass } from './utils';

const attendanceStatusOptions: { value: StudentAttendance['status']; label: string }[] = [
  { value: 'present', label: 'حاضر' },
  { value: 'absent', label: 'غایب' },
  { value: 'late', label: 'تأخیر' },
  { value: 'excused', label: 'مرخصی' },
];

const emptyForm = {
  classId: '',
  courseId: '',
  sessionId: '1',
  date: '',
  instructorId: '',
};

const emptyStudentForm = { studentId: '', studentName: '', status: 'present' as StudentAttendance['status'], notes: '' };

export default function AttendancePanel() {
  const [items, setItems] = useState<AttendanceRecord[]>(() => getAttendanceRecords());
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AttendanceRecord | null>(null);
  const [form, setForm] = useState(emptyForm);
  // Detail dialog
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  // Add student dialog
  const [addStudentDialogOpen, setAddStudentDialogOpen] = useState(false);
  const [studentForm, setStudentForm] = useState(emptyStudentForm);

  const loadData = () => {
    setItems(getAttendanceRecords());
  };

  // Stats
  const totalSessions = items.length;
  const allRecords = items.flatMap(r => r.records || []);
  const presentCount = allRecords.filter(r => r.status === 'present').length;
  const avgAttendance = allRecords.length > 0 ? Math.round((presentCount / allRecords.length) * 100) : 0;
  // Most common status
  const statusCounts: Record<string, number> = {};
  allRecords.forEach(r => { statusCounts[r.status] = (statusCounts[r.status] || 0) + 1; });
  const mostCommonStatus = Object.entries(statusCounts).sort((a, b) => b[1] - a[1])[0];

  // Filtered data
  const filtered = items.filter(item => {
    const matchSearch = !search || item.courseId.includes(search) || item.classId.includes(search);
    const matchCourse = !courseFilter || item.courseId === courseFilter;
    const matchDate = !dateFilter || item.date.startsWith(dateFilter);
    return matchSearch && matchCourse && matchDate;
  });

  const courseIds = Array.from(new Set(items.map(a => a.courseId))).sort();

  const openAddDialog = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (item: AttendanceRecord) => {
    setEditingItem(item);
    setForm({
      classId: item.classId,
      courseId: item.courseId,
      sessionId: String(item.sessionId),
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
      instructorId: item.instructorId,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const now = new Date().toISOString();
    if (editingItem) {
      updateAttendanceRecord(editingItem.id, {
        classId: form.classId,
        courseId: form.courseId,
        sessionId: parseInt(form.sessionId) || 1,
        date: form.date ? new Date(form.date).toISOString() : now,
        instructorId: form.instructorId,
      });
    } else {
      const newItem: AttendanceRecord = {
        id: crypto.randomUUID(),
        classId: form.classId,
        courseId: form.courseId,
        sessionId: parseInt(form.sessionId) || 1,
        date: form.date ? new Date(form.date).toISOString() : now,
        records: [],
        instructorId: form.instructorId,
        createdAt: now,
      };
      addAttendanceRecord(newItem);
    }
    setDialogOpen(false);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این جلسه حضور و غیاب اطمینان دارید؟')) return;
    const updated = items.filter(r => r.id !== id);
    saveAttendanceRecords(updated);
    loadData();
  };

  const openDetailDialog = (item: AttendanceRecord) => {
    setSelectedRecord(item);
    setDetailDialogOpen(true);
  };

  const toggleStudentStatus = (recordId: string, studentId: string, newStatus: StudentAttendance['status']) => {
    const updated = items.map(r => {
      if (r.id === recordId) {
        return {
          ...r,
          records: r.records.map(s =>
            s.studentId === studentId ? { ...s, status: newStatus } : s
          ),
        };
      }
      return r;
    });
    saveAttendanceRecords(updated);
    loadData();
    // Refresh selected record
    const refreshed = updated.find(r => r.id === recordId);
    if (refreshed) setSelectedRecord(refreshed);
  };

  const handleAddStudent = () => {
    if (!selectedRecord) return;
    const newStudent: StudentAttendance = {
      studentId: studentForm.studentId,
      studentName: studentForm.studentName,
      status: studentForm.status,
    };
    const updated = items.map(r => {
      if (r.id === selectedRecord.id) {
        return { ...r, records: [...r.records, newStudent] };
      }
      return r;
    });
    saveAttendanceRecords(updated);
    setAddStudentDialogOpen(false);
    setStudentForm(emptyStudentForm);
    loadData();
    const refreshed = updated.find(r => r.id === selectedRecord.id);
    if (refreshed) setSelectedRecord(refreshed);
  };

  const removeStudent = (studentId: string) => {
    if (!selectedRecord) return;
    const updated = items.map(r => {
      if (r.id === selectedRecord.id) {
        return { ...r, records: r.records.filter(s => s.studentId !== studentId) };
      }
      return r;
    });
    saveAttendanceRecords(updated);
    loadData();
    const refreshed = updated.find(r => r.id === selectedRecord.id);
    if (refreshed) setSelectedRecord(refreshed);
  };

  const getAttendanceBadgeClass = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-amber-100 text-amber-800';
      case 'excused': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100"><Calendar className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="text-xs text-blue-700">کل جلسات</p>
                <p className="text-lg font-bold text-blue-700">{formatNumber(totalSessions)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100"><UserCheck className="w-5 h-5 text-green-600" /></div>
              <div>
                <p className="text-xs text-green-700">میانگین حضور</p>
                <p className="text-lg font-bold text-green-700">{formatNumber(avgAttendance)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100"><BarChart3 className="w-5 h-5 text-amber-600" /></div>
              <div>
                <p className="text-xs text-amber-700">رایج‌ترین وضعیت</p>
                <p className="text-lg font-bold text-amber-700">
                  {mostCommonStatus ? attendanceStatusLabels[mostCommonStatus[0] as StudentAttendance['status']] : '—'}
                </p>
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
            <Input placeholder="جستجوی شناسه کلاس یا دوره..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
          </div>
          <Select value={courseFilter} onValueChange={(v) => setCourseFilter(v === 'ALL' ? '' : v)}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="دوره" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه دوره‌ها</SelectItem>
              {courseIds.map(id => (<SelectItem key={id} value={id}>{id}</SelectItem>))}
            </SelectContent>
          </Select>
          <Input type="date" dir="ltr" className="w-[150px]" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} placeholder="تاریخ" />
        </div>
        <Button onClick={openAddDialog} className="bg-amber-600 hover:bg-amber-700 gap-2">
          <Plus className="w-4 h-4" />
          ثبت جلسه
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">شناسه کلاس</TableHead>
                <TableHead className="text-right">دوره</TableHead>
                <TableHead className="text-right">جلسه</TableHead>
                <TableHead className="text-right">تاریخ</TableHead>
                <TableHead className="text-right">استاد</TableHead>
                <TableHead className="text-right">حاضران</TableHead>
                <TableHead className="text-right">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-gray-400">جلسه‌ای یافت نشد</TableCell></TableRow>
              ) : filtered.map((item) => {
                const present = (item.records || []).filter(r => r.status === 'present').length;
                const total = (item.records || []).length;
                return (
                  <TableRow key={item.id}>
                    <TableCell className="text-sm" dir="ltr">{item.classId}</TableCell>
                    <TableCell className="text-sm" dir="ltr">{item.courseId}</TableCell>
                    <TableCell className="text-sm">{formatNumber(item.sessionId)}</TableCell>
                    <TableCell className="text-sm text-gray-500">{formatDate(item.date)}</TableCell>
                    <TableCell className="text-sm" dir="ltr">{item.instructorId}</TableCell>
                    <TableCell className="text-sm">{formatNumber(present)} / {formatNumber(total)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="مشاهده جزئیات" onClick={() => openDetailDialog(item)}>
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
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Session Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'ویرایش جلسه' : 'ثبت جلسه جدید'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>شناسه کلاس</Label>
                <Input dir="ltr" value={form.classId} onChange={(e) => setForm(f => ({ ...f, classId: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>شناسه دوره</Label>
                <Input dir="ltr" value={form.courseId} onChange={(e) => setForm(f => ({ ...f, courseId: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>شماره جلسه</Label>
                <Input type="number" dir="ltr" value={form.sessionId} onChange={(e) => setForm(f => ({ ...f, sessionId: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>تاریخ</Label>
                <Input type="date" dir="ltr" value={form.date} onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>شناسه استاد</Label>
              <Input dir="ltr" value={form.instructorId} onChange={(e) => setForm(f => ({ ...f, instructorId: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700">
              {editingItem ? 'ذخیره' : 'ثبت'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>
              حضور و غیاب جلسه {selectedRecord ? formatNumber(selectedRecord.sessionId) : ''} — {selectedRecord ? formatDate(selectedRecord.date) : ''}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            {!selectedRecord?.records || selectedRecord.records.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">هنوز کارآموزی ثبت نشده است</p>
                <Button className="bg-green-600 hover:bg-green-700 gap-2" onClick={() => { setStudentForm(emptyStudentForm); setAddStudentDialogOpen(true); }}>
                  <Plus className="w-4 h-4" />
                  افزودن کارآموز
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">نام کارآموز</TableHead>
                    <TableHead className="text-right">وضعیت</TableHead>
                    <TableHead className="text-right">تغییر وضعیت</TableHead>
                    <TableHead className="text-right">عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedRecord.records.map((student) => (
                    <TableRow key={student.studentId}>
                      <TableCell className="font-medium">{student.studentName}</TableCell>
                      <TableCell>
                        <Badge className={getAttendanceBadgeClass(student.status)}>
                          {attendanceStatusLabels[student.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {attendanceStatusOptions.map(opt => (
                            <Button
                              key={opt.value}
                              variant={student.status === opt.value ? 'default' : 'outline'}
                              size="sm"
                              className={`h-7 text-xs ${student.status === opt.value ? getAttendanceBadgeClass(opt.value) : ''}`}
                              onClick={() => toggleStudentStatus(selectedRecord.id, student.studentId, opt.value)}
                            >
                              {opt.label}
                            </Button>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => removeStudent(student.studentId)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          {selectedRecord?.records && selectedRecord.records.length > 0 && (
            <DialogFooter>
              <Button className="bg-green-600 hover:bg-green-700 gap-2" onClick={() => { setStudentForm(emptyStudentForm); setAddStudentDialogOpen(true); }}>
                <Plus className="w-4 h-4" />
                افزودن کارآموز
              </Button>
              <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>بستن</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog open={addStudentDialogOpen} onOpenChange={setAddStudentDialogOpen}>
        <DialogContent className="max-w-sm" dir="rtl">
          <DialogHeader>
            <DialogTitle>افزودن کارآموز به جلسه</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>شناسه کارآموز</Label>
              <Input dir="ltr" value={studentForm.studentId} onChange={(e) => setStudentForm(f => ({ ...f, studentId: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>نام کارآموز</Label>
              <Input value={studentForm.studentName} onChange={(e) => setStudentForm(f => ({ ...f, studentName: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>وضعیت</Label>
              <Select value={studentForm.status} onValueChange={(v) => setStudentForm(f => ({ ...f, status: v as StudentAttendance['status'] }))}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {attendanceStatusOptions.map(o => (<SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddStudentDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleAddStudent} className="bg-green-600 hover:bg-green-700">افزودن</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
