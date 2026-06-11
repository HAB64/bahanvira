'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Building2, Wallet, MessageSquare, Gift, Settings, Save, RotateCcw, Loader2, CheckCircle } from 'lucide-react';
import { getSystemSettings, saveSystemSettings } from '@/lib/storage';
import type { SystemSettings } from '@/types';
import { paymentMethodLabels } from '@/types';
import type { PaymentMethod, ReferralRewardType } from '@/types';

const referralRewardTypeLabels: Record<ReferralRewardType, string> = {
  discount_percentage: 'تخفیف درصدی',
  discount_fixed: 'تخفیف ثابت',
  free_session: 'جلسه رایگان',
  cash_bonus: 'پاداش نقدی',
};

const referralRewardTypeOptions = (Object.keys(referralRewardTypeLabels) as ReferralRewardType[]).map((key) => ({
  value: key,
  label: referralRewardTypeLabels[key],
}));

const paymentMethodOptions = (Object.keys(paymentMethodLabels) as PaymentMethod[]).map((key) => ({
  value: key,
  label: paymentMethodLabels[key],
}));

export default function SettingsPanel() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      setLoading(true);
      const data = getSystemSettings();
      setSettings(data);
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!settings) return;
    try {
      setSaving(true);
      saveSystemSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!confirm('آیا از بازنشانی تنظیمات به حالت پیش‌فرض اطمینان دارید؟')) return;
    localStorage.removeItem('vira_system_settings');
    loadData();
  };

  const updateField = <K extends keyof SystemSettings>(key: K, value: SystemSettings[K]) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-amber-600" /></div>
    );
  }

  if (!settings) {
    return <div className="text-center py-12 text-gray-500">خطا در بارگذاری تنظیمات</div>;
  }

  return (
    <div className="space-y-6">
      {/* بخش اطلاعات مؤسسه */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-100"><Building2 className="w-4 h-4 text-blue-600" /></div>
            اطلاعات مؤسسه
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>نام مؤسسه (فارسی)</Label>
              <Input value={settings.instituteName} onChange={(e) => updateField('instituteName', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>نام مؤسسه (انگلیسی)</Label>
              <Input dir="ltr" value={settings.instituteNameEn} onChange={(e) => updateField('instituteNameEn', e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>آدرس</Label>
            <Input value={settings.address} onChange={(e) => updateField('address', e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>تلفن ۱</Label>
              <Input dir="ltr" value={settings.phone1} onChange={(e) => updateField('phone1', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>تلفن ۲</Label>
              <Input dir="ltr" value={settings.phone2} onChange={(e) => updateField('phone2', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ایمیل</Label>
              <Input type="email" dir="ltr" value={settings.email} onChange={(e) => updateField('email', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>وبسایت</Label>
              <Input dir="ltr" value={settings.website} onChange={(e) => updateField('website', e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* بخش تنظیمات مالی */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-green-100"><Wallet className="w-4 h-4 text-green-600" /></div>
            تنظیمات مالی
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>شروع سال مالی</Label>
              <Input dir="ltr" value={settings.fiscalYearStart} onChange={(e) => updateField('fiscalYearStart', e.target.value)} placeholder="1403-01-01" />
            </div>
            <div className="space-y-2">
              <Label>واحد پول</Label>
              <Input value={settings.currency} onChange={(e) => updateField('currency', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>روش پرداخت پیش‌فرض</Label>
              <Select value={settings.defaultPaymentMethod} onValueChange={(v) => updateField('defaultPaymentMethod', v as PaymentMethod)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {paymentMethodOptions.map((p) => (
                    <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* بخش تنظیمات ارتباط */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-100"><MessageSquare className="w-4 h-4 text-purple-600" /></div>
            تنظیمات ارتباط
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-sm">پیامک (SMS)</p>
              <p className="text-xs text-gray-500">فعال‌سازی ارسال پیامک</p>
            </div>
            <Switch
              checked={settings.smsEnabled}
              onCheckedChange={(checked) => updateField('smsEnabled', checked)}
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-sm">ایمیل</p>
              <p className="text-xs text-gray-500">فعال‌سازی ارسال ایمیل</p>
            </div>
            <Switch
              checked={settings.emailEnabled}
              onCheckedChange={(checked) => updateField('emailEnabled', checked)}
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-sm">واتساپ</p>
              <p className="text-xs text-gray-500">فعال‌سازی ارسال پیام واتساپ</p>
            </div>
            <Switch
              checked={settings.whatsappEnabled}
              onCheckedChange={(checked) => updateField('whatsappEnabled', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* بخش تنظیمات معرف */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-100"><Gift className="w-4 h-4 text-amber-600" /></div>
            تنظیمات معرف
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>نوع جایزه معرف</Label>
              <Select value={settings.referralRewardType} onValueChange={(v) => updateField('referralRewardType', v as ReferralRewardType)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {referralRewardTypeOptions.map((r) => (
                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>مقدار جایزه</Label>
              <Input
                type="number"
                dir="ltr"
                value={settings.referralRewardValue}
                onChange={(e) => updateField('referralRewardValue', Number(e.target.value))}
              />
              <p className="text-xs text-gray-500">
                {settings.referralRewardType === 'discount_percentage' ? 'درصد تخفیف' :
                 settings.referralRewardType === 'discount_fixed' ? 'مبلغ تخفیف (ریال)' :
                 settings.referralRewardType === 'free_session' ? 'تعداد جلسه رایگان' :
                 'مبلغ پاداش (ریال)'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* بخش تنظیمات سیستم */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gray-200"><Settings className="w-4 h-4 text-gray-600" /></div>
            تنظیمات سیستم
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-sm">پشتیبان‌گیری خودکار</p>
              <p className="text-xs text-gray-500">فعال‌سازی پشتیبان‌گیری خودکار از داده‌ها</p>
            </div>
            <Switch
              checked={settings.autoBackup}
              onCheckedChange={(checked) => updateField('autoBackup', checked)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>فاصله پشتیبان‌گیری (ساعت)</Label>
              <Input
                type="number"
                dir="ltr"
                value={settings.backupInterval}
                onChange={(e) => updateField('backupInterval', Number(e.target.value))}
                disabled={!settings.autoBackup}
              />
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
            <div>
              <p className="font-medium text-sm text-red-700">حالت نگهداری</p>
              <p className="text-xs text-red-500">فعال‌سازی حالت نگهداری سیستم. کاربران قادر به دسترسی نخواهند بود.</p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => updateField('maintenanceMode', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button onClick={handleReset} variant="outline" className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
          <RotateCcw className="w-4 h-4" />
          بازنشانی پیش‌فرض
        </Button>
        <Button onClick={handleSave} disabled={saving} className="bg-green-600 hover:bg-green-700 gap-2 min-w-[140px]">
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <>
              <CheckCircle className="w-4 h-4" />
              ذخیره شد
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              ذخیره تنظیمات
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
