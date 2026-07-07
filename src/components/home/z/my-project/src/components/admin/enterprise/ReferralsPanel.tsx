'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Gift, Search, Eye, Trophy, TrendingUp, Users, Clock } from 'lucide-react';
import { getReferrals, updateReferral, saveReferrals } from '@/lib/storage';
import type { Referral, ReferralStatus } from '@/types';
import { referralStatusLabels } from '@/types';
import { formatNumber, formatDate, formatCurrency, getStatusBadgeClass } from './utils';

const referralStatusColors: Record<ReferralStatus, string> = {
  registered: 'bg-blue-100 text-blue-800',
  consultation: 'bg-cyan-100 text-cyan-800',
  trial_done: 'bg-teal-100 text-teal-800',
  enrolled: 'bg-green-100 text-green-800',
  reward_pending: 'bg-amber-100 text-amber-800',
  reward_claimed: 'bg-emerald-100 text-emerald-800',
  expired: 'bg-red-100 text-red-800',
};

const referralTimelineSteps: { key: ReferralStatus; label: string }[] = [
  { key: 'registered', label: 'ثبت‌نام' },
  { key: 'consultation', label: 'مشاوره' },
  { key: 'trial_done', label: 'کلاس آزمایشی' },
  { key: 'enrolled', label: 'ثبت‌نام قطعی' },
  { key: 'reward_pending', label: 'جایزه در انتظار' },
  { key: 'reward_claimed', label: 'جایزه دریافت شده' },
];

const statusOrder: Record<ReferralStatus, number> = {
  registered: 0,
  consultation: 1,
  trial_done: 2,
  enrolled: 3,
  reward_pending: 4,
  reward_claimed: 5,
  expired: -1,
};

export default function ReferralsPanel() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [detailDialog, setDetailDialog] = useState<Referral | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      setLoading(true);
      const data = getReferrals();
      setReferrals(data);
    } catch (err) {
      console.error('Failed to load referrals:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter
  const filtered = referrals.filter((r) => {
    const matchSearch = !search || r.referrerName.includes(search) || r.referredName.includes(search) || r.referrerCode.includes(search);
    const matchStatus = !statusFilter || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Stats
  const totalReferrals = referrals.length;
  const successfulReferrals = referrals.filter((r) => r.status === 'enrolled' || r.status === 'reward_pending' || r.status === 'reward_claimed').length;
  const pendingRewards = referrals.filter((r) => r.status === 'reward_pending').length;
  const totalRewardsValue = referrals
    .filter((r) => r.status === 'reward_claimed' || r.status === 'reward_pending')
    .reduce((sum, r) => sum + r.reward.referrerValue, 0);
  const conversionRate = totalReferrals > 0 ? Math.round((successfulReferrals / totalReferrals) * 100) : 0;

  // Leaderboard
  const referrerMap: Record<string, { name: string; code: string; count: number }> = {};
  referrals.forEach((r) => {
    if (r.status === 'enrolled' || r.status === 'reward_pending' || r.status === 'reward_claimed') {
      if (!referrerMap[r.referrerId]) {
        referrerMap[r.referrerId] = { name: r.referrerName, code: r.referrerCode, count: 0 };
      }
      referrerMap[r.referrerId].count++;
    }
  });
  const leaderboard = Object.values(referrerMap).sort((a, b) => b.count - a.count).slice(0, 10);

  const handleStatusChange = (id: string, newStatus: ReferralStatus) => {
    try {
      const updates: Partial<Referral> = { status: newStatus };
      if (newStatus === 'enrolled') updates.convertedAt = new Date().toISOString();
      if (newStatus === 'reward_claimed') updates.rewardClaimedAt = new Date().toISOString();
      updateReferral(id, updates);
      loadData();
      if (detailDialog && detailDialog.id === id) {
        setDetailDialog({ ...detailDialog, ...updates } as Referral);
      }
    } catch (err) {
      console.error('Failed to update referral:', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">کل معرف‌ها</p>
                <p className="text-2xl font-bold text-blue-700">{formatNumber(totalReferrals)}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-100"><Users className="w-5 h-5 text-blue-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">ثبت‌نام موفق</p>
                <p className="text-2xl font-bold text-green-700">{formatNumber(successfulReferrals)}</p>
              </div>
              <div className="p-2 rounded-lg bg-green-100"><TrendingUp className="w-5 h-5 text-green-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">جایزه در انتظار</p>
                <p className="text-2xl font-bold text-amber-700">{formatNumber(pendingRewards)}</p>
              </div>
              <div className="p-2 rounded-lg bg-amber-100"><Clock className="w-5 h-5 text-amber-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600">ارزش جوایز</p>
                <p className="text-2xl font-bold text-emerald-700">{formatCurrency(totalRewardsValue)}</p>
              </div>
              <div className="p-2 rounded-lg bg-emerald-100"><Gift className="w-5 h-5 text-emerald-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">نرخ تبدیل</p>
                <p className="text-2xl font-bold text-purple-700">{conversionRate}%</p>
              </div>
              <div className="p-2 rounded-lg bg-purple-100"><Trophy className="w-5 h-5 text-purple-600" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="جستجوی نام معرف، معرفی‌شده..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v === 'ALL' ? '' : v)}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="وضعیت" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">همه</SelectItem>
              {(Object.keys(referralStatusLabels) as ReferralStatus[]).map((s) => (
                <SelectItem key={s} value={s}>{referralStatusLabels[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" /></div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">معرف</TableHead>
                      <TableHead className="text-right">کد معرف</TableHead>
                      <TableHead className="text-right">معرفی‌شده</TableHead>
                      <TableHead className="text-right">وضعیت</TableHead>
                      <TableHead className="text-right">تاریخ</TableHead>
                      <TableHead className="text-right">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-gray-400">معرفی‌ای یافت نشد</TableCell></TableRow>
                    ) : filtered.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.referrerName}</TableCell>
                        <TableCell><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{r.referrerCode}</code></TableCell>
                        <TableCell className="text-sm">{r.referredName}</TableCell>
                        <TableCell>
                          <Badge className={referralStatusColors[r.status]}>{referralStatusLabels[r.status]}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">{formatDate(r.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDetailDialog(r)}><Eye className="w-3.5 h-3.5" /></Button>
                            {r.status !== 'expired' && r.status !== 'reward_claimed' && (
                              <Select
                                value={r.status}
                                onValueChange={(v) => handleStatusChange(r.id, v as ReferralStatus)}
                              >
                                <SelectTrigger className="h-8 w-8 p-0 border-0">
                                  <span className="sr-only">تغییر وضعیت</span>
                                </SelectTrigger>
                                <SelectContent>
                                  {(Object.keys(referralStatusLabels) as ReferralStatus[]).map((s) => (
                                    <SelectItem key={s} value={s}>{referralStatusLabels[s]}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          <div className="text-sm text-gray-500 mt-2">{formatNumber(filtered.length)} معرفی</div>
        </div>

        {/* Leaderboard */}
        <Card className="border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-600" />
              جدول برترین معرف‌ها
            </CardTitle>
          </CardHeader>
          <CardContent>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">معرفی موفقی ثبت نشده</div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((entry, idx) => (
                  <div key={entry.code} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                        idx === 0 ? 'bg-amber-100 text-amber-700' :
                        idx === 1 ? 'bg-gray-100 text-gray-700' :
                        idx === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-50 text-gray-500'
                      }`}>
                        {formatNumber(idx + 1)}
                      </span>
                      <div>
                        <p className="font-medium text-sm">{entry.name}</p>
                        <p className="text-xs text-gray-500">{entry.code}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{formatNumber(entry.count)} ثبت‌نام</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!detailDialog} onOpenChange={() => setDetailDialog(null)}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader><DialogTitle>جزئیات معرف</DialogTitle></DialogHeader>
          {detailDialog && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">معرف</p>
                  <p className="font-medium">{detailDialog.referrerName}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">کد معرف</p>
                  <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">{detailDialog.referrerCode}</code>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">معرفی‌شده</p>
                  <p className="font-medium">{detailDialog.referredName}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">تلفن معرفی‌شده</p>
                  <p className="font-medium" dir="ltr">{detailDialog.referredPhone}</p>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-medium text-sm mb-3 border-b pb-2">مسیر تبدیل</h4>
                <div className="flex items-center gap-1 overflow-x-auto pb-2">
                  {referralTimelineSteps.map((step, idx) => {
                    const currentStep = statusOrder[detailDialog.status] ?? -1;
                    const isActive = statusOrder[step.key] <= currentStep && currentStep >= 0;
                    const isCurrent = step.key === detailDialog.status;
                    return (
                      <div key={step.key} className="flex items-center gap-1 min-w-0">
                        <div className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                          isCurrent ? 'bg-green-500 text-white font-bold' :
                          isActive ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {step.label}
                        </div>
                        {idx < referralTimelineSteps.length - 1 && (
                          <div className={`w-4 h-0.5 ${isActive && statusOrder[referralTimelineSteps[idx + 1].key] <= currentStep ? 'bg-green-400' : 'bg-gray-200'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
                {detailDialog.status === 'expired' && (
                  <Badge className="mt-2 bg-red-100 text-red-800">منقضی شده</Badge>
                )}
              </div>

              {/* Reward Info */}
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                <h4 className="font-medium text-sm mb-2 text-amber-800">اطلاعات جایزه</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">جایزه معرف</p>
                    <p className="font-medium">{detailDialog.reward.referrerDescription}</p>
                    <p className="text-amber-700">{formatCurrency(detailDialog.reward.referrerValue)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">جایزه معرفی‌شده</p>
                    <p className="font-medium">{detailDialog.reward.referredDescription}</p>
                    <p className="text-amber-700">{formatCurrency(detailDialog.reward.referredValue)}</p>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">تاریخ ثبت</p>
                  <p className="font-medium">{formatDate(detailDialog.createdAt)}</p>
                </div>
                {detailDialog.convertedAt && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">تاریخ تبدیل</p>
                    <p className="font-medium">{formatDate(detailDialog.convertedAt)}</p>
                  </div>
                )}
                {detailDialog.rewardClaimedAt && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">تاریخ دریافت جایزه</p>
                    <p className="font-medium">{formatDate(detailDialog.rewardClaimedAt)}</p>
                  </div>
                )}
                {detailDialog.courseEnrolled && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">دوره ثبت‌نامی</p>
                    <p className="font-medium">{detailDialog.courseEnrolled}</p>
                  </div>
                )}
              </div>

              {/* Status Change */}
              {detailDialog.status !== 'expired' && detailDialog.status !== 'reward_claimed' && (
                <div className="flex items-center gap-2 pt-2 border-t">
                  <span className="text-sm text-gray-500">تغییر وضعیت:</span>
                  <Select value={detailDialog.status} onValueChange={(v) => handleStatusChange(detailDialog.id, v as ReferralStatus)}>
                    <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(Object.keys(referralStatusLabels) as ReferralStatus[]).map((s) => (
                        <SelectItem key={s} value={s}>{referralStatusLabels[s]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
