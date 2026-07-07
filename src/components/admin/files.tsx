'use client'

import { useState } from 'react'
import { Upload, FileText, Play, Image, Download, Trash2, Search, Plus } from 'lucide-react'

type FileType = 'pdf' | 'video' | 'image'

interface FileItem {
  name: string
  type: FileType
  size: string
  date: string
  uploader: string
}

const files: FileItem[] = [
  { name: 'جزوه سطح ۱.pdf', type: 'pdf', size: '2.5 MB', date: '۱۴۰۴/۰۳/۲۰', uploader: 'مستر رضایی' },
  { name: 'ویدیو آموزش جمع.mp4', type: 'video', size: '125 MB', date: '۱۴۰۴/۰۳/۱۹', uploader: 'مستر احمدی' },
  { name: 'نمونه سوالات آزمون.pdf', type: 'pdf', size: '1.8 MB', date: '۱۴۰۴/۰۳/۱۸', uploader: 'مستر کریمی' },
  { name: 'تصویر تمرین چرتکه.jpg', type: 'image', size: '800 KB', date: '۱۴۰۴/۰۳/۱۷', uploader: 'مستر محمدی' },
  { name: 'ویدیو آموزش ضرب.mp4', type: 'video', size: '98 MB', date: '۱۴۰۴/۰۳/۱۶', uploader: 'مستر رضایی' },
  { name: 'راهنمای ثبت‌نام.pdf', type: 'pdf', size: '3.2 MB', date: '۱۴۰۴/۰۳/۱۵', uploader: 'مدیر سیستم' },
]

const typeIcons: Record<FileType, { icon: typeof FileText; color: string; bg: string }> = {
  pdf: { icon: FileText, color: 'text-red-500', bg: 'bg-red-50' },
  video: { icon: Play, color: 'text-blue-500', bg: 'bg-blue-50' },
  image: { icon: Image, color: 'text-emerald-500', bg: 'bg-emerald-50' },
}

const typeLabels: Record<FileType, string> = {
  pdf: 'PDF',
  video: 'ویدیو',
  image: 'تصویر',
}

export default function FilesTab() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFiles = files.filter((f) => f.name.includes(searchQuery))

  return (
    <div dir="rtl" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">مدیریت فایل‌ها</h2>
        <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200">
          <Plus className="w-4 h-4" />
          آپلود فایل جدید
        </button>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-orange-200 p-10 text-center hover:border-orange-400 hover:bg-orange-50/30 transition-all cursor-pointer group">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
            <Upload className="w-7 h-7 text-orange-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">
              فایل‌ها را اینجا بکشید و رها کنید
            </p>
            <p className="text-xs text-slate-400 mt-1">
              یا <span className="text-orange-500 font-medium">انتخاب فایل</span> را بزنید
            </p>
          </div>
          <p className="text-xs text-slate-300">
            فرمت‌های مجاز: PDF, JPG, PNG, MP4 — حداکثر ۲۰۰ مگابایت
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="جستجوی فایل..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white rounded-xl border border-gray-100 pr-11 pl-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
        />
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file, index) => {
          const typeConfig = typeIcons[file.type]
          const TypeIcon = typeConfig.icon

          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-11 h-11 ${typeConfig.bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <TypeIcon className={`w-5 h-5 ${typeConfig.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-slate-800 truncate">{file.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-bold border rounded-full px-2 py-0.5 ${typeConfig.color} ${typeConfig.bg}`}>
                      {typeLabels[file.type]}
                    </span>
                    <span className="text-xs text-slate-400">{file.size}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                <div className="text-xs text-slate-400">
                  <span>{file.uploader}</span>
                  <span className="mx-1.5">•</span>
                  <span>{file.date}</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-blue-500 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}