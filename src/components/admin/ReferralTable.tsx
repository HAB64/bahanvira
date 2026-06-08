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
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Gift, Copy, Check } from 'lucide-react';
import type { Referral, ReferralStatus } from '@/types';
import { referralStatusLabels } from '@/types';
import { updateReferral } from '@/lib/storage';

interface ReferralTableProps {
  referrals: Referral[];
  onUpdate: () => void;
}

const statusColors: Record<ReferralStatus, string> = {
  registered: 'bg-blue-100 text-blue-800',
  consultation: 'bg-purple-100 text-purple-800',
  trial_done: 'bg-cyan-100 text-cyan-800',
  enrolled: 'bg-green-100 text-green-800',
  reward_pending: 'bg-amber-100 text-amber-800',
  reward_claimed: 'bg-emerald-100 text-emerald-800',
  expired: 'bg-gray-100 text-gray-800',
};

const rewardTypeLabels: Record<string, string> = {
  discount_percentage: 'درصد تخفیف',
  discount_fixed: 'مبلغ ثابت',
  free_session: 'جلسه رایگان',
  cash_bonus: 'پاداش نقدی',
};

export default function ReferralTable({ referrals, onUpdate }: ReferralTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredReferrals = referrals.filter((referral) => {
    return statusFilter === 'all' || referral.status === statusFilter;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleStatusChange = (id: string, newStatus: ReferralStatus) => {
    updateReferral(id, { status: newStatus });
    onUpdate();
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('fa-IR');
    } catch {
      return dateStr;
    }
  };

  const stats = {
    total: referrals.length,
    successful: referrals.filter(r => r.status === 'enrolled' || r.status === 'reward_claimed').length,
    pending: referrals.filter(r => r.status === 'registered' || r.status === 'reward_pending').length,
    expired: referrals.filter(r => r.status === 'expired').length,
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-500">کل معرف‌ها</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-700">{stats.successful}</p>
          <p className="text-xs text-green-600">موفق</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
          <p className="text-xs text-amber-600">در انتظار</p>
        </div>
        <div className="bg-red-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-red-700">{stats.expired}</p>
          <p className="text-xs text-red-600">منقضی</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex justify-end">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="وضعیت" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه وضعیت‌ها</SelectItem>
            {Object.entries(referralStatusLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-right">کد معرف</TableHead>
                <TableHead className="text-right">نام معرف</TableHead>
                <TableHead className="text-right hidden md:table-cell">نام معرفی‌شده</TableHead>
                <TableHead className="text-right hidden lg:table-cell">جایزه</TableHead>
                <TableHead className="text-right">وضعیت</TableHead>
                <TableHead className="text-right hidden sm:table-cell">تاریخ</TableHead>
                <TableHead className="text-right">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReferrals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    معرفی‌ای یافت نشد
                  </TableCell>
                </TableRow>
              ) : (
                filteredReferrals.map((referral) => (
                  <TableRow key={referral.id} className="hover:bg-amber-50/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded font-mono" dir="ltr">
                          {referral.referrerCode}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyCode(referral.referrerCode)}
                          className="p-1 h-auto"
                        >
                          {copiedCode === referral.referrerCode ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{referral.referrerName}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>
                        <p>{referral.referredName}</p>
                        <p className="text-xs text-gray-500" dir="ltr">{referral.referredPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <Gift className="w-3 h-3 text-amber-500" />
                        <span className="text-xs">{rewardTypeLabels[referral.reward.type]}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        معرف: {referral.reward.referrerDescription}
                      </p>
                      <p className="text-xs text-gray-500">
                        معرفی‌شده: {referral.reward.referredDescription}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[referral.status]}`}>
                        {referralStatusLabels[referral.status]}
                      </span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-gray-500">
                      {formatDate(referral.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={referral.status}
                        onValueChange={(v) => handleStatusChange(referral.id, v as ReferralStatus)}
                      >
                        <SelectTrigger className="w-28 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(referralStatusLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key} className="text-xs">
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
