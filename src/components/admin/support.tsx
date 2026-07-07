'use client'

import { MessageSquare, Clock, CheckCircle, AlertCircle, Plus, Eye } from 'lucide-react'

const summaryCards = [
  {
    title: 'تیکت‌های باز',
    value: '۵',
    icon: AlertCircle,
    bg: 'bg-orange-50',
    text: 'text-orange-600',
  },
  {
    title: 'حل شده امروز',
    value: '۳',
    icon: CheckCircle,
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
  },
  {
    title: 'میانگین پاسخ‌دهی',
    value: '۲ ساعت',
    icon: Clock,
    bg: 'bg-blue-50',
    text: 'text-blue-600',
  },
  {
    title: 'رضایت مشتری',
    value: '۹۲٪',
    icon: MessageSquare,
    bg: 'bg-purple-50',
    text: 'text-purple-600',
  },
]

const tickets = [
  { id: '#۱۰۲۳', title: 'مشکل در ورود به پنل', customer: 'سارا احمدی', priority: 'بالا', status: 'در حال بررسی', date: '۱۴۰۴/۰۳/۲۲' },
  { id: '#۱۰۲۲', title: 'درخواست تغییر کلاس', customer: 'محمد رضایی', priority: 'متوسط', status: 'باز', date: '۱۴۰۴/۰۳/۲۱' },
  { id: '#۱۰۲۱', title: 'خطا در پرداخت آنلاین', customer: 'زهرا محمدی', priority: 'بالا', status: 'باز', date: '۱۴۰۴/۰۳/۲۱' },
  { id: '#۱۰۲۰', title: 'درخواست مدرک پایان دوره', customer: 'علی کریمی', priority: 'پایین', status: 'بسته شده', date: '۱۴۰۴/۰۳/۲۰' },
  { id: '#۱۰۱۹', title: 'سوال درباره برنامه کلاس‌ها', customer: 'فاطمه حسینی', priority: 'پایین', status: 'در حال بررسی', date: '۱۴۰۴/۰۳/۲۰' },
  { id: '#۱۰۱۸', title: 'مشکل در دریافت ویدیو آموزشی', customer: 'حسین احمدی', priority: 'متوسط', status: 'بسته شده', date: '۱۴۰۴/۰۳/۱۹' },
]

const priorityColors: Record<string, string> = {
  'بالا': 'border-red-200 text-red-700 bg-red-50',
  'متوسط': 'border-amber-200 text-amber-700 bg-amber-50',
  'پایین': 'border-blue-200 text-blue-700 bg-blue-50',
}

const statusColors: Record<string, string> = {
  'باز': 'border-blue-200 text-blue-700 bg-blue-50',
  'در حال بررسی': 'border-amber-200 text-amber-700 bg-amber-50',
  'بسته شده': 'border-emerald-200 text-emerald-700 bg-emerald-50',
}

export default function SupportTab() {
  return (
    <div dir="rtl" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">پشتیبانی و تیکت‌ها</h2>
        <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200">
          <Plus className="w-4 h-4" />
          تیکت جدید
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-400 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-slate-800">{card.value}</p>
              </div>
              <div className={`${card.bg} p-2.5 rounded-xl`}>
                <card.icon className={`w-5 h-5 ${card.text}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-500" />
            <h3 className="text-sm font-bold text-slate-800">لیست تیکت‌ها</h3>
          </div>
          <span className="text-xs text-slate-400">۶ تیکت</span>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50">
              <th className="text-right py-3 px-6 font-medium">شماره تیکت</th>
              <th className="text-right py-3 px-6 font-medium">عنوان</th>
              <th className="text-right py-3 px-6 font-medium">مشتری</th>
              <th className="text-right py-3 px-6 font-medium">اولویت</th>
              <th className="text-right py-3 px-6 font-medium">وضعیت</th>
              <th className="text-right py-3 px-6 font-medium">تاریخ</th>
              <th className="text-right py-3 px-6 font-medium">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-3.5 px-6 text-sm font-medium text-orange-600">{ticket.id}</td>
                <td className="py-3.5 px-6 text-sm font-medium text-slate-800">{ticket.title}</td>
                <td className="py-3.5 px-6 text-sm text-slate-500">{ticket.customer}</td>
                <td className="py-3.5 px-6">
                  <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${priorityColors[ticket.priority]}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="py-3.5 px-6">
                  <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[ticket.status]}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="py-3.5 px-6 text-sm text-slate-400">{ticket.date}</td>
                <td className="py-3.5 px-6">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-slate-400 hover:text-slate-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}