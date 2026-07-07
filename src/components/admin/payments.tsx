'use client'

import { CreditCard, DollarSign, FileText, Plus, Eye, Download, Filter } from 'lucide-react'

const summaryCards = [
  {
    title: 'کل درآمد',
    value: '۴۵,۰۰۰,۰۰۰',
    unit: 'تومان',
    icon: DollarSign,
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
  },
  {
    title: 'کل هزینه‌ها',
    value: '۲۴,۵۰۰,۰۰۰',
    unit: 'تومان',
    icon: CreditCard,
    bg: 'bg-red-50',
    text: 'text-red-600',
  },
  {
    title: 'در انتظار پرداخت',
    value: '۵,۰۰۰,۰۰۰',
    unit: 'تومان',
    icon: FileText,
    bg: 'bg-amber-50',
    text: 'text-amber-600',
  },
  {
    title: 'تعداد فاکتورها',
    value: '۳۸',
    unit: 'فاکتور',
    icon: CreditCard,
    bg: 'bg-blue-50',
    text: 'text-blue-600',
  },
]

const invoices = [
  { id: 'INV-001', student: 'سارا احمدی', amount: '۲,۵۰۰,۰۰۰', type: 'شهریه', status: 'پرداخت شده', date: '۱۴۰۴/۰۳/۲۰' },
  { id: 'INV-002', student: 'محمد رضایی', amount: '۲,۰۰۰,۰۰۰', type: 'شهریه', status: 'در انتظار', date: '۱۴۰۴/۰۳/۲۱' },
  { id: 'INV-003', student: 'مریم احمدی', amount: '۲۵۰,۰۰۰', type: 'پورسانت', status: 'پرداخت شده', date: '۱۴۰۴/۰۳/۲۰' },
  { id: 'INV-004', student: 'علی کریمی', amount: '۱,۸۰۰,۰۰۰', type: 'شهریه', status: 'سررسید گذشته', date: '۱۴۰۴/۰۳/۱۵' },
  { id: 'INV-005', student: 'فاطمه حسینی', amount: '۳۰۰,۰۰۰', type: 'پورسانت', status: 'پرداخت شده', date: '۱۴۰۴/۰۳/۱۹' },
  { id: 'INV-006', student: 'حسین محمدی', amount: '۵۰۰,۰۰۰', type: 'هزینه', status: 'پرداخت شده', date: '۱۴۰۴/۰۳/۱۸' },
  { id: 'INV-007', student: 'زهرا رضایی', amount: '۲,۲۰۰,۰۰۰', type: 'شهریه', status: 'در انتظار', date: '۱۴۰۴/۰۳/۲۲' },
  { id: 'INV-008', student: 'امیر حسینی', amount: '۱,۵۰۰,۰۰۰', type: 'شهریه', status: 'پرداخت شده', date: '۱۴۰۴/۰۳/۱۷' },
]

const statusColors: Record<string, string> = {
  'پرداخت شده': 'border-emerald-200 text-emerald-700 bg-emerald-50',
  'در انتظار': 'border-amber-200 text-amber-700 bg-amber-50',
  'سررسید گذشته': 'border-red-200 text-red-700 bg-red-50',
}

const typeColors: Record<string, string> = {
  'شهریه': 'border-blue-200 text-blue-700 bg-blue-50',
  'پورسانت': 'border-purple-200 text-purple-700 bg-purple-50',
  'هزینه': 'border-rose-200 text-rose-700 bg-rose-50',
}

export default function PaymentsTab() {
  return (
    <div dir="rtl" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">پرداخت‌ها و فاکتورها</h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-slate-500 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            فیلتر
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200">
            <Plus className="w-4 h-4" />
            فاکتور جدید
          </button>
        </div>
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
                <p className="text-xs text-slate-400 mt-0.5">{card.unit}</p>
              </div>
              <div className={`${card.bg} p-2.5 rounded-xl`}>
                <card.icon className={`w-5 h-5 ${card.text}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-orange-500" />
            <h3 className="text-sm font-bold text-slate-800">لیست فاکتورها</h3>
          </div>
          <span className="text-xs text-slate-400">۸ فاکتور</span>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50">
              <th className="text-right py-3 px-5 font-medium">شماره فاکتور</th>
              <th className="text-right py-3 px-5 font-medium">دانش‌آموز</th>
              <th className="text-right py-3 px-5 font-medium">مبلغ (تومان)</th>
              <th className="text-right py-3 px-5 font-medium">نوع</th>
              <th className="text-right py-3 px-5 font-medium">وضعیت</th>
              <th className="text-right py-3 px-5 font-medium">تاریخ</th>
              <th className="text-right py-3 px-5 font-medium">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-3.5 px-5 text-sm font-medium text-orange-600">{invoice.id}</td>
                <td className="py-3.5 px-5 text-sm font-medium text-slate-800">{invoice.student}</td>
                <td className="py-3.5 px-5 text-sm font-bold text-slate-800">{invoice.amount}</td>
                <td className="py-3.5 px-5">
                  <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${typeColors[invoice.type]}`}>
                    {invoice.type}
                  </span>
                </td>
                <td className="py-3.5 px-5">
                  <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[invoice.status]}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-sm text-slate-400">{invoice.date}</td>
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-blue-500 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}