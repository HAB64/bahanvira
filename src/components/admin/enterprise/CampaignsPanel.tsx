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
import { Megaphone, Plus, Search, Pencil, Trash2, TrendingUp, DollarSign, Users, BarChart3, Loader2 } from 'lucide-react';
import { getCampaigns, addCampaign, updateCampaign, deleteCampaign } from '@/lib/storage';
import type { Campaign, CampaignType, CampaignStatus, CampaignChannel } from '@/types';
import { campaignTypeLabels, campaignStatusLabels, campaignChannelLabels } from '@/types';
import { formatNumber, formatDate, formatCurrency, formatCurrencyFull, getStatusBadgeClass, getStatusLabel } from './utils';

const typeOptions: { value: CampaignType; label: string }[] = [
  { value: 'social_media', label: campaignTypeLabels.social_media },
  { value: 'email', label: campaignTypeLabels.email },
  { value: 'sms', label: campaignTypeLabels.sms },
  { value: 'referral_boost', label: campaignTypeLabels.referral_boost },
  { value: 'discount', label: campaignTypeLabels.discount },
  { value: 'event', label: campaignTypeLabels.event },
  { value: 'seo', label: campaignTypeLabels.seo },
];

const statusOptions: { value: CampaignStatus; label: string }[] = [
  { value: 'draft', label: campaignStatusLabels.draft },
  { value: 'active', label: campaignStatusLabels.active },
  { value: 'paused', label: campaignStatusLabels.paused },
  { value: 'completed', label: campaignStatusLabels.completed },
  { value: 'cancelled', label: campaignStatusLabels.cancelled },
];

const channelOptions: { value: CampaignChannel; label: string }[] = [
  { value: 'instagram', label: campaignChannelLabels.instagram },
  { value: 'telegram', label: campaignChannelLabels.telegram },
  { value: 'whatsapp', label: campaignChannelLabels.whatsapp },
  { value: 'sms', label: campaignChannelLabels.sms },
  { value: 'email', label: campaignChannelLabels.email },
  { value: 'website', label: campaignChannelLabels.website },
  { value: 'offline', label: campaignChannelLabels.offline },
];

const campaignTypeKeyMap: Record<CampaignType, string> = {
  social_media: 'SOCIAL_MEDIA',
  email: 'EMAIL_CAMPAIGN',
  sms: 'SMS',
  referral_boost: 'REFERRAL_BOOST',
  discount: 'DISCOUNT',
  event: 'EVENT',
  seo: 'SEO',
};

const campaignStatusKeyMap: Record<CampaignStatus, string> = {
  draft: 'DRAFT_CAMPAIGN',
  active: 'ACTIVE_CAMPAIGN',
  paused: 'PAUSED_CAMPAIGN',
  completed: 'COMPLETED_CAMPAIGN',
  cancelled: 'CANCELLED_CAMPAIGN',
};

export default function CampaignsPanel() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Campaign | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'social_media' as CampaignType,
    status: 'draft' as CampaignStatus,
    startDate: '',
    endDate: '',
    budget: '',
    targetAudience: '',
    channels: [] as CampaignChannel[],
    leadsGenerated: '',
    conversions: '',
    spent: '',
  });

  const loadData = () => {
    try {
      setLoading(true);
      const data = getCampaigns();
      setCampaigns(data);
    } catch (err) {
      console.error('Failed to load campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // Stats
  const totalCount = campaigns.length;
  const activeCount = campaigns.filter(c => c.status === 'active').length;
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalLeadsGenerated = campaigns.reduce((sum, c) => sum + c.leadsGenerated, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const overallConversionRate = totalLeadsGenerated > 0
    ? Math.round((totalConversions / totalLeadsGenerated) * 100)
    : 0;

  // Filtering
  const filtered = campaigns.filter(c => {
    const matchesSearch = !search ||
      c.title.includes(search) ||
      c.description.includes(search) ||
      c.targetAudience.includes(search);
    const matchesType = !typeFilter || c.type === typeFilter;
    const matchesStatus = !statusFilter || c.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const openAddDialog = () => {
    setEditingItem(null);
    setForm({
      title: '',
      description: '',
      type: 'social_media',
      status: 'draft',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      budget: '',
      targetAudience: '',
      channels: [],
      leadsGenerated: '0',
      conversions: '0',
      spent: '0',
    });
    setDialogOpen(true);
  };

  const openEditDialog = (item: Campaign) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      description: item.description,
      type: item.type,
      status: item.status,
      startDate: item.startDate ? new Date(item.startDate).toISOString().split('T')[0] : '',
      endDate: item.endDate ? new Date(item.endDate).toISOString().split('T')[0] : '',
      budget: String(item.budget),
      targetAudience: item.targetAudience,
      channels: [...item.channels],
      leadsGenerated: String(item.leadsGenerated),
      conversions: String(item.conversions),
      spent: String(item.spent),
    });
    setDialogOpen(true);
  };

  const handleChannelToggle = (channel: CampaignChannel) => {
    setForm(f => ({
      ...f,
      channels: f.channels.includes(channel)
        ? f.channels.filter(c => c !== channel)
        : [...f.channels, channel],
    }));
  };

  const handleSave = () => {
    try {
      setSaving(true);
      const body = {
        title: form.title,
        description: form.description,
        type: form.type,
        status: form.status,
        startDate: form.startDate ? new Date(form.startDate).toISOString() : new Date().toISOString(),
        endDate: form.endDate ? new Date(form.endDate).toISOString() : new Date().toISOString(),
        budget: parseInt(form.budget) || 0,
        targetAudience: form.targetAudience,
        channels: form.channels,
        leadsGenerated: parseInt(form.leadsGenerated) || 0,
        conversions: parseInt(form.conversions) || 0,
        spent: parseInt(form.spent) || 0,
      };
      if (editingItem) {
        updateCampaign(editingItem.id, body);
      } else {
        const newCampaign: Campaign = {
          id: crypto.randomUUID(),
          ...body,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        addCampaign(newCampaign);
      }
      setDialogOpen(false);
      loadData();
    } catch (err) {
      console.error('Failed to save campaign:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('آیا از حذف این کمپین اطمینان دارید؟')) return;
    try {
      deleteCampaign(id);
      loadData();
    } catch (err) {
      console.error('Failed to delete campaign:', err);
    }
  };

  const getRoi = (item: Campaign) => {
    if (item.spent === 0) return 0;
    return Math.round((item.conversions / item.spent) * 100);
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <Megaphone className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-amber-700">کل کمپین‌ها</p>
                <p className="text-lg font-bold text-amber-700">{formatNumber(totalCount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-green-700">فعال</p>
                <p className="text-lg font-bold text-green-700">{formatNumber(activeCount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <DollarSign className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-blue-700">بودجه کل</p>
                <p className="text-lg font-bold text-blue-700">{formatCurrency(totalBudget)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-purple-700">سرنخ تولیدی</p>
                <p className="text-lg font-bold text-purple-700">{formatNumber(totalLeadsGenerated)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-teal-200 bg-teal-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-100">
                <BarChart3 className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-teal-700">نرخ تبدیل</p>
                <p className="text-lg font-bold text-teal-700">{formatNumber(overallConversionRate)}٪</p>
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
              placeholder="جستجوی عنوان، توضیحات..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v === 'all' ? '' : v)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="نوع کمپین" />
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
              <SelectItem value="all">همه</SelectItem>
              {statusOptions.map(s => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAddDialog} className="bg-amber-600 hover:bg-amber-700 gap-2">
          <Plus className="w-4 h-4" />
          افزودن کمپین
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
                  <TableHead className="text-right">عنوان</TableHead>
                  <TableHead className="text-right">نوع</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">بودجه</TableHead>
                  <TableHead className="text-right">هزینه شده</TableHead>
                  <TableHead className="text-right">سرنخ</TableHead>
                  <TableHead className="text-right">تبدیل</TableHead>
                  <TableHead className="text-right">ROI</TableHead>
                  <TableHead className="text-right">کانال‌ها</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-gray-400">
                      کمپینی یافت نشد
                    </TableCell>
                  </TableRow>
                ) : filtered.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-gray-500 max-w-[180px] truncate">{item.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-[10px] ${getStatusBadgeClass(campaignTypeKeyMap[item.type])}`}>
                        {campaignTypeLabels[item.type]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-[10px] ${getStatusBadgeClass(campaignStatusKeyMap[item.status])}`}>
                        {campaignStatusLabels[item.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{formatCurrency(item.budget)}</TableCell>
                    <TableCell className="text-sm">{formatCurrency(item.spent)}</TableCell>
                    <TableCell className="text-sm">{formatNumber(item.leadsGenerated)}</TableCell>
                    <TableCell className="text-sm">{formatNumber(item.conversions)}</TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${getRoi(item) > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                        {getRoi(item) > 0 ? `${formatNumber(getRoi(item))}٪` : '—'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {item.channels.slice(0, 3).map(ch => (
                          <Badge key={ch} variant="outline" className="text-[9px] px-1.5 py-0">
                            {campaignChannelLabels[ch]}
                          </Badge>
                        ))}
                        {item.channels.length > 3 && (
                          <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                            +{item.channels.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
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
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'ویرایش کمپین' : 'افزودن کمپین جدید'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[65vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>عنوان</Label>
                <Input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>مخاطب هدف</Label>
                <Input value={form.targetAudience} onChange={(e) => setForm(f => ({ ...f, targetAudience: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>توضیحات</Label>
              <Textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نوع کمپین</Label>
                <Select value={form.type} onValueChange={(v) => setForm(f => ({ ...f, type: v as CampaignType }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {typeOptions.map(t => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>وضعیت</Label>
                <Select value={form.status} onValueChange={(v) => setForm(f => ({ ...f, status: v as CampaignStatus }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(s => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>تاریخ شروع</Label>
                <Input type="date" dir="ltr" value={form.startDate} onChange={(e) => setForm(f => ({ ...f, startDate: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>تاریخ پایان</Label>
                <Input type="date" dir="ltr" value={form.endDate} onChange={(e) => setForm(f => ({ ...f, endDate: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>بودجه (ریال)</Label>
                <Input type="number" dir="ltr" value={form.budget} onChange={(e) => setForm(f => ({ ...f, budget: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>هزینه شده (ریال)</Label>
                <Input type="number" dir="ltr" value={form.spent} onChange={(e) => setForm(f => ({ ...f, spent: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>سرنخ تولیدی</Label>
                <Input type="number" dir="ltr" value={form.leadsGenerated} onChange={(e) => setForm(f => ({ ...f, leadsGenerated: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>تبدیل‌ها</Label>
              <Input type="number" dir="ltr" value={form.conversions} onChange={(e) => setForm(f => ({ ...f, conversions: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>کانال‌های انتشار</Label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-3 bg-gray-50 rounded-lg border">
                {channelOptions.map(ch => (
                  <label key={ch.value} className="flex items-center gap-2 cursor-pointer text-sm">
                    <Checkbox
                      checked={form.channels.includes(ch.value)}
                      onCheckedChange={() => handleChannelToggle(ch.value)}
                    />
                    <span>{ch.label}</span>
                  </label>
                ))}
              </div>
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
