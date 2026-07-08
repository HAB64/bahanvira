'use client';

import { useState } from 'react';
import { CreditCard, DollarSign, FileText, Plus, Eye, Download, Filter, X, Save, Check, AlertCircle, Trash2, Edit3 } from 'lucide-react';

interface Invoice {
  id: string;
  student: string;
  amount: string;
  type: string;
  status: string;
  date: string;
  description?: string;
}

const initialInvoices: Invoice[] = [
  { id: 'INV-001', student: 'سارا احمدی', amount: '۲,۵۰۰,۰۰۰', type: 'شهریه', status: 'پرداخت شده', date: '۱۴۰۴/۰۳/۲۰', description: 'شهریه دوره چرتکه مبتدی' },
  { id: 'INV-002', student: 'محمد رضایی', amount: '۲,۰۰۰,۰۰۰', type: 'شهریه', status: 'در انتظار', date: '۱۴۰۴/۰۳/۲۱', description: 'شهریه حساب ذهنی ۱' },
  { id: 'INV-003', student: 'مریم احمدی', amount: '۲۵۰,۰۰۰', type: 'پورسانت', status: 'پرداخت شده', date: '۱۴۰۴/۰۳/۲۰', description: 'پورسانت معرفی دانش‌آموز' },
  { id: 'INV-004', student: 'علی کریمی', amount: '۱,۸۰۰,۰۰۰', type: 'شهریه', status: 'سررسید گذشته', date: '۱۴۰۴/۰۳/۱۵', description: 'شهریه چرتکه متوسط' },
  { id: 'INV-005', student: 'فاطمه حسینی', amount: '۳۰۰,۰۰۰', type: 'پورسانت', status: 'پرداخت شده', date: '۱۴۰۴/۰۳/۱۹', description: 'پورسانت دوره تابستانه' },
  { id: 'INV-006', student: 'حسین محمدی', amount: '۵۰۰,۰۰۰', type: 'هزینه', status: 'پرداخت شده', date: '۱۴۰۴/۰۳/۱۸', description: 'هزینه تجهیزات کلاس' },
  { id: 'INV-007', student: 'زهرا رضایی', amount: '۲,۲۰۰,۰۰۰', type: 'شهریه', status: 'در انتظار', date: '۱۴۰۴/۰۳/۲۲', description: 'شهریه چرتکه پیشرفته' },
  { id: 'INV-008', student: 'امیر حسینی', amount: '۱,۵۰۰,۰۰۰', type: 'شهریه', status: 'پرداخت شده', date: '۱۴۰۴/۰۳/۱۷', description: 'شهریه حساب ذهنی ۲' },
];

const statusColors: Record<string, string> = { 'پرداخت شده': 'border-emerald-200 text-emerald-700 bg-emerald-50', 'در انتظار': 'border-amber-200 text-amber-700 bg-amber-50', 'سررسید گذشته': 'border-red-200 text-red-700 bg-red-50' };
const typeColors: Record<string, string> = { 'شهریه': 'border-blue-200 text-blue-700 bg-blue-50', 'پورسانت': 'border-purple-200 text-purple-700 bg-purple-50', 'هزینه': 'border-rose-200 text-rose-700 bg-rose-50' };
const statusCycle: Record<string, string> = { 'در انتظار': 'پرداخت شده', 'پرداخت شده': 'در انتظار', 'سررسید گذشته': 'پرداخت شده' };

export default function PaymentsTab() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [modal, setModal] = useState<'add' | 'view' | 'edit' | 'delete' | null>(null);
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ student: '', amount: '', type: 'شهریه', status: 'در انتظار', description: '' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const filteredInvoices = invoices.filter(inv => {
    const ms = statusFilter === 'all' || inv.status === statusFilter;
    const mt = typeFilter === 'all' || inv.type === typeFilter;
    return ms && mt;
  });

  const totalIncome = invoices.filter(i => i.type === 'شهریه' && i.status === 'پرداخت شده').length;
  const totalPending = invoices.filter(i => i.status === 'در انتظار').length;
  const totalOverdue = invoices.filter(i => i.status === 'سررسید گذشته').length;

  const openAdd = () => {
    const nextNum = 9 + invoices.length;
    setForm({ student: '', amount: '', type: 'شهریه', status: 'در انتظار', description: '' });
    setSelected(null);
    setModal('add');
  };
  const openEdit = (inv: Invoice) => { setForm({ student: inv.student, amount: inv.amount, type: inv.type, status: inv.status, description: inv.description || '' }); setSelected(inv); setModal('edit'); };
  const openView = (inv: Invoice) => { setSelected(inv); setModal('view'); };
  const openDelete = (inv: Invoice) => { setSelected(inv); setModal('delete'); };

  const handleSave = () => {
    if (!form.student.trim() || !form.amount.trim()) { showToast('لطفا نام دانش‌آموز و مبلغ را وارد کنید'); return; }
    if (modal === 'add') {
      const nextNum = String(9 + invoices.length).padStart(3, '0');
      const newInv: Invoice = { id: 'INV-' + nextNum, ...form, date: '۱۴۰۴/۰۳/۲۲' };
      setInvoices(prev => [newInv, ...prev]);
      showToast('فاکتور جدید ثبت شد');
    } else if (modal === 'edit' && selected) {
      setInvoices(prev => prev.map(i => i.id === selected.id ? { ...i, ...form } : i));
      showToast('فاکتور به‌روزرسانی شد');
    }
    setModal(null);
  };
  const handleDelete = () => { if (selected) { setInvoices(prev => prev.filter(i => i.id !== selected.id)); showToast('فاکتور حذف شد'); } setModal(null); };
  const cycleStatus = (inv: Invoice) => { setInvoices(prev => prev.map(i => i.id === inv.id ? { ...i, status: statusCycle[i.status] } : i)); showToast('وضعیت فاکتور تغییر کرد'); };

  return (
    <div dir="rtl" className="space-y-6 relative">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] bg-slate-800 text-white px-5 py-3 rounded-xl text-sm font-medium shadow-xl flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> {toast}</div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">پرداخت‌ها و فاکتورها</h2>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition-colors ${showFilters ? 'bg-orange-50 text-orange-600 border border-orange-200' : 'bg-white border border-gray-100 text-slate-500 hover:bg-gray-50'}`}><Filter className="w-4 h-4" /> فیلتر</button>
          <button onClick={openAdd} className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200"><Plus className="w-4 h-4" /> فاکتور جدید</button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-3 items-center">
          <span className="text-xs text-slate-500 font-medium">وضعیت:</span>
          {['all', 'پرداخت شده', 'در انتظار', 'سررسید گذشته'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${statusFilter === s ? 'bg-orange-500 text-white' : 'bg-gray-50 text-slate-500 hover:bg-gray-100'}`}>
              {s === 'all' ? 'همه' : s}
            </button>
          ))}
          <span className="text-xs text-slate-500 font-medium mr-4">نوع:</span>
          {['all', 'شهریه', 'پورسانت', 'هزینه'].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${typeFilter === t ? 'bg-orange-500 text-white' : 'bg-gray-50 text-slate-500 hover:bg-gray-100'}`}>
              {t === 'all' ? 'همه' : t}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'پرداخت شده', value: String(totalIncome), unit: 'فاکتور', icon: DollarSign, bg: 'bg-emerald-50', text: 'text-emerald-600' },
          { title: 'در انتظار', value: String(totalPending), unit: 'فاکتور', icon: FileText, bg: 'bg-amber-50', text: 'text-amber-600' },
          { title: 'سررسید گذشته', value: String(totalOverdue), unit: 'فاکتور', icon: CreditCard, bg: 'bg-red-50', text: 'text-red-600' },
          { title: 'کل فاکتورها', value: String(invoices.length), unit: 'فاکتور', icon: CreditCard, bg: 'bg-blue-50', text: 'text-blue-600' },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between"><div><p className="text-xs text-slate-400 mb-1">{card.title}</p><p className="text-2xl font-bold text-slate-800">{card.value}</p><p className="text-xs text-slate-400 mt-0.5">{card.unit}</p></div><div className={`${card.bg} p-2.5 rounded-xl`}><card.icon className={`w-5 h-5 ${card.text}`} /></div></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-orange-500" /><h3 className="text-sm font-bold text-slate-800">لیست فاکتورها</h3></div>
          <span className="text-xs text-slate-400">{filteredInvoices.length} فاکتور</span>
        </div>
        <table className="w-full">
          <thead><tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50">
            <th className="text-right py-3 px-5 font-medium">شماره</th><th className="text-right py-3 px-5 font-medium">دانش‌آموز</th><th className="text-right py-3 px-5 font-medium">مبلغ</th><th className="text-right py-3 px-5 font-medium">نوع</th><th className="text-right py-3 px-5 font-medium">وضعیت</th><th className="text-right py-3 px-5 font-medium">تاریخ</th><th className="text-right py-3 px-5 font-medium">عملیات</th>
          </tr></thead>
          <tbody>
            {filteredInvoices.map(inv => (
              <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-3.5 px-5 text-sm font-medium text-orange-600">{inv.id}</td>
                <td className="py-3.5 px-5 text-sm font-medium text-slate-800">{inv.student}</td>
                <td className="py-3.5 px-5 text-sm font-bold text-slate-800">{inv.amount} <span className="text-xs font-normal text-slate-400">تومان</span></td>
                <td className="py-3.5 px-5"><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${typeColors[inv.type]}`}>{inv.type}</span></td>
                <td className="py-3.5 px-5">
                  <button onClick={() => cycleStatus(inv)} className={`text-xs font-bold border rounded-full px-2.5 py-0.5 cursor-pointer transition-colors hover:opacity-80 ${statusColors[inv.status]}`}>{inv.status}</button>
                </td>
                <td className="py-3.5 px-5 text-sm text-slate-400">{inv.date}</td>
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-1">
                    <button onClick={() => openView(inv)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-600 transition-colors"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => openEdit(inv)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-blue-500 transition-colors"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => showToast('دانلود فاکتور ' + inv.id)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-blue-500 transition-colors"><Download className="w-4 h-4" /></button>
                    <button onClick={() => openDelete(inv)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredInvoices.length === 0 && <tr><td colSpan={7} className="py-12 text-center text-gray-400 text-sm">فاکتوری یافت نشد</td></tr>}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modal && <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setModal(null)}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()} dir="rtl">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
            <h3 className="text-base font-bold text-slate-900">{modal === 'add' ? 'فاکتور جدید' : modal === 'edit' ? 'ویرایش فاکتور' : modal === 'view' ? 'مشاهده فاکتور' : 'تایید حذف'}</h3>
            <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-5">
            {modal === 'view' && selected && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">شماره فاکتور</div><div className="text-sm font-bold text-orange-600">{selected.id}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">دانش‌آموز</div><div className="text-sm font-bold">{selected.student}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">مبلغ</div><div className="text-sm font-bold">{selected.amount} تومان</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">نوع</div><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${typeColors[selected.type]}`}>{selected.type}</span></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">وضعیت</div><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[selected.status]}`}>{selected.status}</span></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">تاریخ</div><div className="text-sm font-bold">{selected.date}</div></div>
                {selected.description && <div className="bg-gray-50 rounded-xl p-4 col-span-2"><div className="text-xs text-slate-400 mb-1">توضیحات</div><div className="text-sm">{selected.description}</div></div>}
              </div>
            )}
            {modal === 'delete' && selected && (
              <div className="text-center py-4">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-base font-bold text-slate-800 mb-2">آیا از حذف فاکتور مطمئن هستید؟</p>
                <p className="text-sm text-slate-500">{selected.id} - {selected.student}</p>
                <div className="flex gap-3 mt-6 justify-center">
                  <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">بله، حذف شود</button>
                  <button onClick={() => setModal(null)} className="bg-gray-100 hover:bg-gray-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">انصراف</button>
                </div>
              </div>
            )}
            {(modal === 'add' || modal === 'edit') && (
              <div className="space-y-4">
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نام دانش‌آموز</label><input type="text" value={form.student} onChange={e => setForm(f => ({ ...f, student: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="نام دانش‌آموز" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">مبلغ (تومان)</label><input type="text" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="۲,۵۰۰,۰۰۰" dir="ltr" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نوع</label><select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer"><option value="شهریه">شهریه</option><option value="پورسانت">پورسانت</option><option value="هزینه">هزینه</option></select></div>
                </div>
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">وضعیت</label><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer"><option value="در انتظار">در انتظار</option><option value="پرداخت شده">پرداخت شده</option><option value="سررسید گذشته">سررسید گذشته</option></select></div>
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">توضیحات</label><textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 h-20 resize-none" placeholder="توضیحات اختیاری" /></div>
                <button onClick={handleSave} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"><Save className="w-4 h-4" /> {modal === 'add' ? 'ثبت فاکتور' : 'به‌روزرسانی'}</button>
              </div>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
}