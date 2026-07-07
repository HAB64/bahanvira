'use client'

import { TrendingUp, Send, Mail, Globe, Plus, Eye, Edit3 } from 'lucide-react'

type CampaignStatus = 'فعال' | 'متوقف' | 'تکمیل شده'

interface Campaign {
  name: string
  type: string
  status: CampaignStatus
  reach: string
  impression: string
  budget: string
}

const campaigns: Campaign[] = [
  { name: 'کمپین تابستانه چرتکه', type: 'اینستاگرام', status: 'فعال', reach: '۱۲,۵۰۰', impression: '۳۵,۰۰۰', budget: '۲,۰۰۰,۰۰۰' },
  { name: 'جشنواره ثبت‌نام', type: 'تلگرام', status: 'فعال', reach: '۸,۳۰۰', impression: '۲۲,۰۰۰', budget: '۱,۰۰۰,۰۰۰' },
  { name: 'محتوای آموزشی وبسایت', type: 'وبسایت', status: 'فعال', reach: '۱۵,۲۰۰', impression: '۴۵,۰۰۰', budget: '۱,۵۰۰,۰۰۰' },
  { name: 'کارگاه حضوری مسابقات', type: 'حضوری', status: 'متوقف', reach: '۳,۸۰۰', impression: '۸,۰۰۰', budget: '۸۰۰,۰۰۰' },
  { name: 'کمپین نوروزی', type: 'اینستاگرام', status: 'تکمیل شده', reach: '۱۸,۰۰۰', impression: '۵۲,۰۰۰', budget: '۲,۵۰۰,۰۰۰' },
]

const statusColors: Record<CampaignStatus, string> = {
  'فعال': 'border-emerald-200 text-emerald-700 bg-emerald-50',
  'متوقف': 'border-amber-200 text-amber-700 bg-amber-50',
  'تکمیل شده': 'border-slate-200 text-slate-600 bg-slate-50',
}

const typeIcons: Record<string, { icon: typeof Globe; color: string; bg: string }> = {
  'اینستاگرام': { icon: Globe, color: 'text-pink-500', bg: 'bg-pink-50' },
  'تلگرام': { icon: Send, color: 'text-blue-500', bg: 'bg-blue-50' },
  'وبسایت': { icon: Globe, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  'حضوری': { icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
}

const templates = [
  { name: 'ثبت‌نام جدید', type: 'ایمیل', usage: 45 },
  { name: 'یادآوری پرداخت', type: 'پیامک', usage: 89 },
  { name: 'اطلاع‌رسانی کلاس', type: 'ایمیل', usage: 67 },
]

export default function MarketingTab() {
  return (
    <div dir="rtl" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">بازاریابی و کمپین‌ها</h2>
        <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200">
          <Plus className="w-4 h-4" />
          کمپین جدید
        </button>
      </div>

      {/* Campaigns Grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          <h3 className="text-sm font-bold text-slate-800">کمپین‌های فعال</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {campaigns.map((campaign, index) => {
            const iconConfig = typeIcons[campaign.type] || typeIcons['وبسایت']
            const TypeIcon = iconConfig.icon

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all group"
              >
                {/* Top */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${iconConfig.bg} rounded-xl flex items-center justify-center`}>
                      <TypeIcon className={`w-5 h-5 ${iconConfig.color}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{campaign.name}</h4>
                      <span className="text-xs text-slate-400">{campaign.type}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[campaign.status]}`}>
                    {campaign.status}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-gray-50/80 rounded-xl p-2.5 text-center">
                    <p className="text-sm font-bold text-slate-800">{campaign.reach}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">بازدید</p>
                  </div>
                  <div className="bg-gray-50/80 rounded-xl p-2.5 text-center">
                    <p className="text-sm font-bold text-slate-800">{campaign.impression}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">نمایش</p>
                  </div>
                  <div className="bg-gray-50/80 rounded-xl p-2.5 text-center">
                    <p className="text-sm font-bold text-slate-800">{campaign.budget}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">بودجه</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-1 pt-3 border-t border-gray-50">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-orange-500 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* SMS/Email Templates */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-orange-500" />
            <h3 className="text-sm font-bold text-slate-800">قالب‌های پیام</h3>
          </div>
          <button className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors">
            <Plus className="w-4 h-4" />
            قالب جدید
          </button>
        </div>

        <div className="space-y-3">
          {templates.map((template, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${template.type === 'ایمیل' ? 'bg-blue-50' : 'bg-emerald-50'}`}>
                  {template.type === 'ایمیل' ? (
                    <Mail className="w-4 h-4 text-blue-500" />
                  ) : (
                    <Send className="w-4 h-4 text-emerald-500" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-800">{template.name}</h4>
                  <span className="text-xs text-slate-400">
                    {template.type} • {template.usage} ارسال
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-slate-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-orange-500 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}