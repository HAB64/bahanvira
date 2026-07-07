'use client'

import { useState } from 'react'
import { Mail, MessageSquare, Plus, Eye, Edit3, Send, Search } from 'lucide-react'

type TemplateType = 'ایمیل' | 'پیامک'

interface Template {
  name: string
  type: TemplateType
  usage: number
  lastUsed: string
}

const templates: Template[] = [
  { name: 'خوش‌آمدگویی ثبت‌نام', type: 'ایمیل', usage: 45, lastUsed: '۱۴۰۴/۰۳/۲۰' },
  { name: 'یادآوری پرداخت', type: 'پیامک', usage: 23, lastUsed: '۱۴۰۴/۰۳/۱۹' },
  { name: 'اطلاع‌رسانی کلاس', type: 'ایمیل', usage: 67, lastUsed: '۱۴۰۴/۰۳/۲۱' },
  { name: 'نتیجه آزمون', type: 'ایمیل', usage: 38, lastUsed: '۱۴۰۴/۰۳/۱۸' },
  { name: 'تبریک فارغ‌التحصیلی', type: 'ایمیل', usage: 12, lastUsed: '۱۴۰۴/۰۳/۱۵' },
  { name: 'یادآوری جلسه', type: 'پیامک', usage: 89, lastUsed: '۱۴۰۴/۰۳/۲۲' },
]

const typeColors: Record<TemplateType, { color: string; bg: string; iconBg: string }> = {
  'ایمیل': { color: 'border-blue-200 text-blue-700 bg-blue-50', bg: 'bg-blue-50', iconBg: 'bg-blue-500' },
  'پیامک': { color: 'border-emerald-200 text-emerald-700 bg-emerald-50', bg: 'bg-emerald-50', iconBg: 'bg-emerald-500' },
}

const filterOptions = ['همه', 'ایمیل', 'پیامک'] as const

export default function EmailsTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<string>('همه')

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = t.name.includes(searchQuery)
    const matchesFilter = activeFilter === 'همه' || t.type === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div dir="rtl" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">مدیریت قالب‌های پیام</h2>
        <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200">
          <Plus className="w-4 h-4" />
          قالب جدید
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="جستجوی قالب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-xl border border-gray-100 pr-11 pl-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setActiveFilter(option)}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all
                ${activeFilter === option
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200'
                  : 'bg-white border border-gray-100 text-slate-500 hover:bg-gray-50'
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template, index) => {
          const config = typeColors[template.type]

          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all group"
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${config.bg} rounded-xl flex items-center justify-center`}>
                    {template.type === 'ایمیل' ? (
                      <Mail className="w-5 h-5 text-blue-500" />
                    ) : (
                      <MessageSquare className="w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{template.name}</h4>
                    <span className={`inline-block text-[10px] font-bold border rounded-full px-2 py-0.5 mt-1 ${config.color}`}>
                      {template.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50/80 rounded-xl p-2.5 text-center">
                  <p className="text-sm font-bold text-slate-800">{template.usage}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">دفعات استفاده</p>
                </div>
                <div className="bg-gray-50/80 rounded-xl p-2.5 text-center">
                  <p className="text-xs font-bold text-slate-800">{template.lastUsed}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">آخرین استفاده</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-50">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-slate-500 hover:text-slate-700 text-xs font-medium transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  پیش‌نمایش
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-orange-50 text-slate-500 hover:text-orange-600 text-xs font-medium transition-colors">
                  <Edit3 className="w-3.5 h-3.5" />
                  ویرایش
                </button>
                <button className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State (when filtered results are empty) */}
      {filteredTemplates.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search className="w-7 h-7 text-slate-300" />
          </div>
          <p className="text-sm font-medium text-slate-500">قالبی یافت نشد</p>
          <p className="text-xs text-slate-400 mt-1">عبارت جستجو یا فیلتر را تغییر دهید</p>
        </div>
      )}
    </div>
  )
}