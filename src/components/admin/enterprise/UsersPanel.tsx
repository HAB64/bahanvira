'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Plus, Search, Pencil, Trash2, Loader2 } from 'lucide-react';
import { formatNumber, formatDate, getStatusBadgeClass, getStatusLabel } from './utils';
import { getStaff, addStaff, updateStaff, deleteStaff, getStudents, saveStudents } from '@/lib/storage';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

const STORAGE_KEY = 'vira_users';

function getLocalUsers(): User[] {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch { return []; }
}

function saveLocalUsers(users: User[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

const roleOptions = [
  { value: 'SUPER_ADMIN', label: 'مدیر ارشد' },
  { value: 'ADMIN', label: 'مدیر' },
  { value: 'BRANCH_MANAGER', label: 'مدیر شعبه' },
  { value: 'INSTRUCTOR', label: 'استاد' },
  { value: 'STAFF', label: 'کارمند' },
  { value: 'STUDENT', label: 'کارآموز' },
  { value: 'PARENT', label: 'ولی' },
];

export default function UsersPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);
  const pageSize = 10;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'STAFF',
    password: '',
    isActive: true,
  });

  const loadUsers = useCallback(() => {
    try {
      setLoading(true);
      let allUsers = getLocalUsers();

      // Also derive users from staff and students
      const staff = getStaff();
      const students = getStudents();

      // Map staff to User format
      const staffUsers: User[] = staff.map(s => ({
        id: s.id,
        name: s.name,
        email: s.email || '',
        phone: s.phone || null,
        role: s.role === 'instructor' ? 'INSTRUCTOR' : s.role === 'admin' ? 'ADMIN' : (s.role || 'STAFF').toUpperCase(),
        isActive: s.isActive !== false,
        createdAt: s.createdAt || new Date().toISOString(),
        lastLoginAt: null,
      }));

      // Map students to User format
      const studentUsers: User[] = students.map(s => ({
        id: s.id,
        name: s.name,
        email: s.email || '',
        phone: s.phone || null,
        role: 'STUDENT',
        isActive: true,
        createdAt: s.createdAt || new Date().toISOString(),
        lastLoginAt: null,
      }));

      // Merge: local users first, then staff, then students (avoid duplicates by id)
      const existingIds = new Set(allUsers.map(u => u.id));
      for (const su of staffUsers) {
        if (!existingIds.has(su.id)) {
          allUsers.push(su);
          existingIds.add(su.id);
        }
      }
      for (const stu of studentUsers) {
        if (!existingIds.has(stu.id)) {
          allUsers.push(stu);
          existingIds.add(stu.id);
        }
      }

      // Apply filters
      if (search) {
        const q = search.toLowerCase();
        allUsers = allUsers.filter(u =>
          u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u.phone?.toLowerCase().includes(q)
        );
      }
      if (roleFilter) {
        allUsers = allUsers.filter(u => u.role === roleFilter);
      }

      setCount(allUsers.length);
      const start = (page - 1) * pageSize;
      setUsers(allUsers.slice(start, start + pageSize));
    } catch (err) {
      console.error('Failed to load users:', err);
      setUsers([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, [page, search, roleFilter]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const openAddDialog = () => {
    setEditingUser(null);
    setForm({ name: '', email: '', phone: '', role: 'STAFF', password: '', isActive: true });
    setDialogOpen(true);
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      password: '',
      isActive: user.isActive,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    try {
      setSaving(true);
      const all = getLocalUsers();
      const data = {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        role: form.role,
        isActive: form.isActive,
      };
      if (editingUser) {
        const idx = all.findIndex(u => u.id === editingUser.id);
        if (idx !== -1) {
          all[idx] = { ...all[idx], ...data };
        }
        // Also update in staff/student storage
        if (['INSTRUCTOR', 'STAFF', 'ADMIN', 'BRANCH_MANAGER', 'SUPER_ADMIN'].includes(form.role)) {
          updateStaff(editingUser.id, {
            name: form.name,
            email: form.email || '',
            phone: form.phone || '',
            role: form.role === 'INSTRUCTOR' ? 'instructor' : 'staff',
            isActive: form.isActive,
          });
        }
      } else {
        all.unshift({
          id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          ...data,
          createdAt: new Date().toISOString(),
          lastLoginAt: null,
        });
        // Also add to staff storage if role is staff/instructor
        if (['INSTRUCTOR', 'STAFF', 'ADMIN', 'BRANCH_MANAGER', 'SUPER_ADMIN'].includes(form.role)) {
          addStaff({
            id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            name: form.name,
            email: form.email || '',
            phone: form.phone || '',
            role: form.role === 'INSTRUCTOR' ? 'instructor' : 'staff',
            isActive: form.isActive,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as any);
        }
      }
      saveLocalUsers(all);
      setDialogOpen(false);
      loadUsers();
    } catch (err) {
      console.error('Failed to save user:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این کاربر اطمینان دارید؟')) return;
    try {
      saveLocalUsers(getLocalUsers().filter(u => u.id !== id));
      loadUsers();
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="space-y-4">
      {/* Header with search and filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="جستجوی نام، ایمیل، تلفن..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pr-9"
            />
          </div>
          <Select value={roleFilter} onValueChange={(v) => { setRoleFilter(v === 'ALL' ? '' : v); setPage(1); }}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="نقش" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه نقش‌ها</SelectItem>
              {roleOptions.map(r => (
                <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAddDialog} className="bg-amber-600 hover:bg-amber-700 gap-2">
          <Plus className="w-4 h-4" />
          افزودن کاربر
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
                  <TableHead className="text-right">نام</TableHead>
                  <TableHead className="text-right">ایمیل</TableHead>
                  <TableHead className="text-right">تلفن</TableHead>
                  <TableHead className="text-right">نقش</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">تاریخ عضویت</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                      {search || roleFilter
                        ? 'کاربری با این فیلترها یافت نشد. فیلترها را تغییر دهید.'
                        : 'هنوز کاربری ثبت نشده است. با افزودن استاد یا کارآموز، کاربران ساخته می‌شوند.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="text-sm text-gray-600" dir="ltr">{user.email}</TableCell>
                      <TableCell dir="ltr">{user.phone || '—'}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(user.role)}>
                          {getStatusLabel(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {user.isActive ? 'فعال' : 'غیرفعال'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">{formatDate(user.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(user)}>
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDelete(user.id)}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {formatNumber(count)} کاربر — صفحه {formatNumber(page)} از {formatNumber(totalPages)}
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
              قبلی
            </Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
              بعدی
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>نام و نام خانوادگی</Label>
              <Input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="نام کامل" />
            </div>
            <div className="space-y-2">
              <Label>ایمیل</Label>
              <Input type="email" dir="ltr" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@example.com" />
            </div>
            <div className="space-y-2">
              <Label>تلفن</Label>
              <Input dir="ltr" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="09123456789" />
            </div>
            <div className="space-y-2">
              <Label>نقش</Label>
              <Select value={form.role} onValueChange={(v) => setForm(f => ({ ...f, role: v }))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map(r => (
                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{editingUser ? 'رمز عبور جدید (خالی = بدون تغییر)' : 'رمز عبور'}</Label>
              <Input type="password" dir="ltr" value={form.password} onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-amber-600 hover:bg-amber-700">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingUser ? 'ذخیره تغییرات' : 'افزودن'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
