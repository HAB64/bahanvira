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
import { HelpCircle, Plus, Search, Pencil, Trash2, Loader2 } from 'lucide-react';
import { formatNumber, getStatusBadgeClass, getStatusLabel } from './utils';

interface Question {
  id: string;
  question: string;
  type: string;
  options: string | null;
  correctAnswer: string | null;
  points: number;
  difficulty: string;
  category: string | null;
  subject: string | null;
  explanation: string | null;
  usageCount: number;
  createdAt: string;
}

const typeOptions = [
  { value: 'MULTIPLE_CHOICE', label: 'چندگزینه‌ای' },
  { value: 'TRUE_FALSE', label: 'صحیح/غلط' },
  { value: 'FILL_BLANK', label: 'جای خالی' },
  { value: 'MENTAL_CALCULATION', label: 'حساب ذهنی' },
  { value: 'ABACUS_READING', label: 'خواندن چرتکه' },
  { value: 'NUMBER_SEQUENCE', label: 'دنباله اعداد' },
];

const difficultyOptions = [
  { value: 'EASY', label: 'آسان' },
  { value: 'MEDIUM', label: 'متوسط' },
  { value: 'HARD', label: 'سخت' },
  { value: 'EXPERT', label: 'حرفه‌ای' },
];

export default function QuestionsPanel() {
  const [items, setItems] = useState<Question[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Question | null>(null);
  const [saving, setSaving] = useState(false);
  const pageSize = 10;

  const [form, setForm] = useState({
    question: '', type: 'MULTIPLE_CHOICE', options: '', correctAnswer: '',
    points: '10', difficulty: 'MEDIUM', category: '', subject: '', explanation: '',
  });

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: String(page), limit: String(pageSize) });
      if (search) params.set('search', search);
      if (typeFilter) params.set('type', typeFilter);
      if (difficultyFilter) params.set('difficulty', difficultyFilter);
      const res = await fetch(`/api/questions?${params}`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.data || []);
        setCount(json.count || 0);
      }
    } catch (err) {
      console.error('Failed to fetch questions:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search, typeFilter, difficultyFilter]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  const openAddDialog = () => {
    setEditingItem(null);
    setForm({ question: '', type: 'MULTIPLE_CHOICE', options: '', correctAnswer: '', points: '10', difficulty: 'MEDIUM', category: '', subject: '', explanation: '' });
    setDialogOpen(true);
  };

  const openEditDialog = (item: Question) => {
    setEditingItem(item);
    setForm({
      question: item.question, type: item.type, options: item.options || '',
      correctAnswer: item.correctAnswer || '', points: String(item.points),
      difficulty: item.difficulty, category: item.category || '', subject: item.subject || '',
      explanation: item.explanation || '',
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const body = {
        question: form.question, type: form.type, options: form.options || null,
        correctAnswer: form.correctAnswer || null, points: parseInt(form.points) || 10,
        difficulty: form.difficulty, category: form.category || null,
        subject: form.subject || null, explanation: form.explanation || null,
      };
      if (editingItem) {
        await fetch(`/api/questions/${editingItem.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        });
      } else {
        await fetch('/api/questions', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        });
      }
      setDialogOpen(false);
      fetchQuestions();
    } catch (err) {
      console.error('Failed to save question:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این سوال اطمینان دارید؟')) return;
    try {
      await fetch(`/api/questions/${id}`, { method: 'DELETE' });
      fetchQuestions();
    } catch (err) {
      console.error('Failed to delete question:', err);
    }
  };

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="جستجوی متن سوال..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pr-9" />
          </div>
          <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v === 'ALL' ? '' : v); setPage(1); }}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="نوع" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه</SelectItem>
              {typeOptions.map(t => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
            </SelectContent>
          </Select>
          <Select value={difficultyFilter} onValueChange={(v) => { setDifficultyFilter(v === 'ALL' ? '' : v); setPage(1); }}>
            <SelectTrigger className="w-[120px]"><SelectValue placeholder="سختی" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه</SelectItem>
              {difficultyOptions.map(d => (<SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAddDialog} className="bg-amber-600 hover:bg-amber-700 gap-2">
          <Plus className="w-4 h-4" />
          افزودن سوال
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
                  <TableHead className="text-right">سوال</TableHead>
                  <TableHead className="text-right">نوع</TableHead>
                  <TableHead className="text-right">سختی</TableHead>
                  <TableHead className="text-right">دسته‌بندی</TableHead>
                  <TableHead className="text-right">نمره</TableHead>
                  <TableHead className="text-right">استفاده</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-gray-400">سوالی یافت نشد</TableCell></TableRow>
                ) : items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium max-w-[250px] truncate">{item.question}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{getStatusLabel(item.type)}</Badge></TableCell>
                    <TableCell><Badge className={getStatusBadgeClass(item.difficulty)}>{getStatusLabel(item.difficulty)}</Badge></TableCell>
                    <TableCell className="text-sm">{item.category || '—'}</TableCell>
                    <TableCell>{formatNumber(item.points)}</TableCell>
                    <TableCell>{formatNumber(item.usageCount)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(item)}><Pencil className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDelete(item.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
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
          <span className="text-gray-500">{formatNumber(count)} سوال — صفحه {formatNumber(page)} از {formatNumber(totalPages)}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>قبلی</Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>بعدی</Button>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader><DialogTitle>{editingItem ? 'ویرایش سوال' : 'افزودن سوال جدید'}</DialogTitle></DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2"><Label>متن سوال</Label><Textarea value={form.question} onChange={(e) => setForm(f => ({ ...f, question: e.target.value }))} rows={3} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نوع</Label>
                <Select value={form.type} onValueChange={(v) => setForm(f => ({ ...f, type: v }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{typeOptions.map(t => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>سختی</Label>
                <Select value={form.difficulty} onValueChange={(v) => setForm(f => ({ ...f, difficulty: v }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{difficultyOptions.map(d => (<SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>))}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2"><Label>گزینه‌ها (JSON)</Label><Input dir="ltr" value={form.options} onChange={(e) => setForm(f => ({ ...f, options: e.target.value }))} placeholder='["گزینه ۱","گزینه ۲","گزینه ۳","گزینه ۴"]' /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>پاسخ صحیح</Label><Input value={form.correctAnswer} onChange={(e) => setForm(f => ({ ...f, correctAnswer: e.target.value }))} /></div>
              <div className="space-y-2"><Label>نمره</Label><Input type="number" dir="ltr" value={form.points} onChange={(e) => setForm(f => ({ ...f, points: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>دسته‌بندی</Label><Input value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))} /></div>
              <div className="space-y-2"><Label>موضوع</Label><Input value={form.subject} onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))} /></div>
            </div>
            <div className="space-y-2"><Label>توضیح پاسخ</Label><Textarea value={form.explanation} onChange={(e) => setForm(f => ({ ...f, explanation: e.target.value }))} rows={2} /></div>
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
