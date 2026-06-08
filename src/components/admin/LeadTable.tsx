'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import type { Lead, LeadStatus, LeadSource, LeadPriority } from '@/types';
import { leadSourceLabels, leadStatusLabels, leadPriorityLabels } from '@/types';
import { addLead, updateLead, deleteLead } from '@/lib/storage';

interface LeadTableProps {
  leads: Lead[];
  onUpdate: () => void;
}

const statusColors: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-amber-100 text-amber-800',
  consultation_scheduled: 'bg-purple-100 text-purple-800',
  consultation_done: 'bg-indigo-100 text-indigo-800',
  trial_class_scheduled: 'bg-cyan-100 text-cyan-800',
  trial_class_done: 'bg-teal-100 text-teal-800',
  enrollment_offered: 'bg-orange-100 text-orange-800',
  enrolled: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
  not_interested: 'bg-gray-100 text-gray-800',
};

const priorityColors: Record<LeadPriority, string> = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};

export default function LeadTable({ leads, onUpdate }: LeadTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formChildName, setFormChildName] = useState('');
  const [formChildAge, setFormChildAge] = useState('');
  const [formCourse, setFormCourse] = useState('');
  const [formSource, setFormSource] = useState<LeadSource>('website_form');
  const [formStatus, setFormStatus] = useState<LeadStatus>('new');
  const [formPriority, setFormPriority] = useState<LeadPriority>('medium');
  const [formNotes, setFormNotes] = useState('');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.includes(search) ||
      lead.phone.includes(search) ||
      (lead.childName && lead.childName.includes(search));
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const resetForm = () => {
    setFormName('');
    setFormPhone('');
    setFormChildName('');
    setFormChildAge('');
    setFormCourse('');
    setFormSource('website_form');
    setFormStatus('new');
    setFormPriority('medium');
    setFormNotes('');
    setEditingLead(null);
  };

  const openEditDialog = (lead: Lead) => {
    setEditingLead(lead);
    setFormName(lead.name);
    setFormPhone(lead.phone);
    setFormChildName(lead.childName || '');
    setFormChildAge(lead.childAge?.toString() || '');
    setFormCourse(lead.interestedCourse || '');
    setFormSource(lead.source);
    setFormStatus(lead.status);
    setFormPriority(lead.priority);
    setFormNotes(lead.notes || '');
    setShowAddDialog(true);
  };

  const handleSave = () => {
    if (!formName.trim() || !formPhone.trim()) return;

    if (editingLead) {
      updateLead(editingLead.id, {
        name: formName,
        phone: formPhone,
        childName: formChildName || undefined,
        childAge: formChildAge ? parseInt(formChildAge) : undefined,
        interestedCourse: formCourse || undefined,
        source: formSource,
        status: formStatus,
        priority: formPriority,
        notes: formNotes,
      });
    } else {
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        name: formName,
        phone: formPhone,
        childName: formChildName || undefined,
        childAge: formChildAge ? parseInt(formChildAge) : undefined,
        interestedCourse: formCourse || undefined,
        source: formSource,
        status: formStatus,
        priority: formPriority,
        notes: formNotes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addLead(newLead);
    }

    setShowAddDialog(false);
    resetForm();
    onUpdate();
  };

  const handleDelete = (id: string) => {
    deleteLead(id);
    onUpdate();
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('fa-IR');
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="جستجوی نام، شماره تماس..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="وضعیت" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه وضعیت‌ها</SelectItem>
            {Object.entries(leadStatusLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="منبع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه منابع</SelectItem>
            {Object.entries(leadSourceLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            resetForm();
            setShowAddDialog(true);
          }}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          <Plus className="w-4 h-4 ml-2" />
          افزودن سرنخ
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-right">نام</TableHead>
                <TableHead className="text-right">شماره تماس</TableHead>
                <TableHead className="text-right hidden md:table-cell">نام فرزند</TableHead>
                <TableHead className="text-right hidden lg:table-cell">دوره مورد نظر</TableHead>
                <TableHead className="text-right hidden sm:table-cell">منبع</TableHead>
                <TableHead className="text-right">وضعیت</TableHead>
                <TableHead className="text-right hidden md:table-cell">اولویت</TableHead>
                <TableHead className="text-right hidden lg:table-cell">تاریخ</TableHead>
                <TableHead className="text-right">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    سرنخی یافت نشد
                  </TableCell>
                </TableRow>
              ) : (
                filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-amber-50/50">
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell dir="ltr" className="text-sm">{lead.phone}</TableCell>
                    <TableCell className="hidden md:table-cell">{lead.childName || '—'}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">{lead.interestedCourse || '—'}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className="text-xs">
                        {leadSourceLabels[lead.source]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                        {leadStatusLabels[lead.status]}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${priorityColors[lead.priority]}`}>
                        {leadPriorityLabels[lead.priority]}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-gray-500">
                      {formatDate(lead.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(lead)}
                          className="text-amber-600 hover:text-amber-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(lead.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog} onOpenChange={(open) => {
        if (!open) resetForm();
        setShowAddDialog(open);
      }}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle>
              {editingLead ? 'ویرایش سرنخ' : 'افزودن سرنخ جدید'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">نام والدین *</label>
                <Input value={formName} onChange={(e) => setFormName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">شماره تماس *</label>
                <Input value={formPhone} onChange={(e) => setFormPhone(e.target.value)} dir="ltr" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">نام فرزند</label>
                <Input value={formChildName} onChange={(e) => setFormChildName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">سن فرزند</label>
                <Input value={formChildAge} onChange={(e) => setFormChildAge(e.target.value)} type="number" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">دوره مورد نظر</label>
              <Select value={formCourse} onValueChange={setFormCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب دوره" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="دوره چرتکه مقدماتی">دوره چرتکه مقدماتی</SelectItem>
                  <SelectItem value="دوره حساب ذهنی متوسط">دوره حساب ذهنی متوسط</SelectItem>
                  <SelectItem value="دوره چرتکه پیشرفته">دوره چرتکه پیشرفته</SelectItem>
                  <SelectItem value="دوره آمادگی مسابقات">دوره آمادگی مسابقات</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">منبع</label>
                <Select value={formSource} onValueChange={(v) => setFormSource(v as LeadSource)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(leadSourceLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">وضعیت</label>
                <Select value={formStatus} onValueChange={(v) => setFormStatus(v as LeadStatus)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(leadStatusLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">اولویت</label>
                <Select value={formPriority} onValueChange={(v) => setFormPriority(v as LeadPriority)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(leadPriorityLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">یادداشت</label>
              <Input value={formNotes} onChange={(e) => setFormNotes(e.target.value)} />
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={!formName.trim() || !formPhone.trim()}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {editingLead ? 'ذخیره تغییرات' : 'افزودن'}
            </Button>
            <Button variant="outline" onClick={() => {
              setShowAddDialog(false);
              resetForm();
            }}>
              انصراف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
