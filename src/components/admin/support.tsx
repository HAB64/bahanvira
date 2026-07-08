'use client';

import { useState } from 'react';
import { MessageSquare, Clock, CheckCircle, AlertCircle, Plus, Eye, X, Save, Check, Trash2, Edit3 } from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  customer: string;
  priority: string;
  status: string;
  date: string;
  description: string;
}

const initialTickets: Ticket[] = [
  { id: '#۱۰۲۳', title: 'مشکل در ورود به پنل', customer: 'سارا احمدی', priority: 'بالا', status: 'در حال بررسی', date: '۱۴۰۴/۰۳/۲۲', description: 'هنگام ورود به پنل کاربری با خطای ۴۰۳ مواجه می‌شوم.' },
  { id: '#۱۰۲۲', title: 'درخواست تغییر کلاس', customer: 'محمد رضایی', priority: 'متوسط', status: 'باز', date: '۱۴۰۴/۰۳/۲۱', description: 'می‌خواهم کلاسم را از گروه الف به گروه ب منتقل کنم.' },
  { id: '#۱۰۲۱', title: 'خطا در پرداخت آنلاین', customer: 'زهرا محمدی', priority: 'بالا', status: 'باز', date: '۱۴۰۴/۰۳/۲۱', description: 'پرداخت آنلاین با موفقیت انجام شد اما ثبت‌نام من فعال نشده است.' },
  { id: '#۱۰۲۰', title: 'درخواست مدرک پایان دوره', customer: 'علی کریمی', priority: 'پایین', status: 'بسته شده', date: '۱۴۰۴/۰۳/۲۰', description: 'دوره چرتکه مبتدی را تمام کرده‌ام و نیاز به مدرک دارم.' },
  { id: '#۱۰۱۹', title: 'سوال درباره برنامه کلاس‌ها', customer: 'فاطمه حسینی', priority: 'پایین', status: 'در حال بررسی', date: '۱۴۰۴/۰۳/۲۰', description: 'برنامه کلاس‌های تابستانه را می‌خواهم.' },
  { id: '#۱۰۱۸', title: 'مشکل در دریافت ویدیو آموزشی', customer: 'حسین احمدی', priority: 'متوسط', status: 'بسته شده', date: '۱۴۰۴/۰۳/۱۹', description: 'ویدیوهای آموزشی لود نمی‌شوند.' },
];

const priorityColors: Record<string, string> = { 'بالا': 'border-red-200 text-red-700 bg-red-50', 'متوسط': 'border-amber-200 text-amber-700 bg-amber-50', 'پایین': 'border-blue-200 text-blue-700 bg-blue-50' };
const statusColors: Record<string, string> = { 'باز': 'border-blue-200 text-blue-700 bg-blue-50', 'در حال بررسی': 'border-amber-200 text-amber-700 bg-amber-50', 'بسته شده': 'border-emerald-200 text-emerald-700 bg-emerald-50' };
const statusCycle: Record<string, string> = { 'باز': 'در حال بررسی', 'در حال بررسی': 'بسته شده', 'بسته شده': 'باز' };

export default function SupportTab() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [modal, setModal] = useState<'add' | 'view' | 'delete' | null>(null);
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', customer: '', priority: 'متوسط', description: '' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const openCount = tickets.filter(t => t.status === 'باز').length;
  const solvedToday = tickets.filter(t => t.status === 'بسته شده').length;

  const openAdd = () => { setForm({ title: '', customer: '', priority: 'متوسط', description: '' }); setModal('add'); };
  const openView = (t: Ticket) => { setSelected(t); setModal('view'); };
  const openDelete = (t: Ticket) => { setSelected(t); setModal('delete'); };

  const handleSave = () => {
    if (!form.title.trim() || !form.customer.trim()) { showToast('لطفا عنوان و نام مشتری را وارد کنید'); return; }
    const nextNum = 1024 + tickets.length;
    const newTicket: Ticket = { id: '#' + nextNum, ...form, status: 'باز', date: '۱۴۰۴/۰۳/۲۲' };
    setTickets(prev => [newTicket, ...prev]);
    showToast('تیکت جدید ثبت شد');
    setModal(null);
  };
  const handleDelete = () => { if (selected) { setTickets(prev => prev.filter(t => t.id !== selected.id)); showToast('تیکت حذف شد'); } setModal(null); };
  const cycleStatus = (t: Ticket) => { setTickets(prev => prev.map(x => x.id === t.id ? { ...x, status: statusCycle[x.status] } : x)); showToast('وضعیت تیکت تغییر کرد'); };

  return (
    <div dir="rtl" className="space-y-6 relative">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] bg-slate-800 text-white px-5 py-3 rounded-xl text-sm font-medium shadow-xl flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> {toast}</div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">پشتیبانی و تیکت‌ها</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200"><Plus className="w-4 h-4" /> تیکت جدید</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'تیکت‌های باز', value: String(openCount), icon: AlertCircle, bg: 'bg-orange-50', text: 'text-orange-600' },
          { title: 'حل شده', value: String(solvedToday), icon: CheckCircle, bg: 'bg-emerald-50', text: 'text-emerald-600' },
          { title: 'کل تیکت‌ها', value: String(tickets.length), icon: MessageSquare, bg: 'bg-purple-50', text: 'text-purple-600' },
          { title: 'در حال بررسی', value: String(tickets.filter(t => t.status === 'در حال بررسی').length), icon: Clock, bg: 'bg-blue-50', text: 'text-blue-600' },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between"><div><p className="text-xs text-slate-400 mb-1">{card.title}</p><p className="text-2xl font-bold text-slate-800">{card.value}</p></div><div className={`${card.bg} p-2.5 rounded-xl`}><card.icon className={`w-5 h-5 ${card.text}`} /></div></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-2"><MessageSquare className="w-5 h-5 text-orange-500" /><h3 className="text-sm font-bold text-slate-800">لیست تیکت‌ها</h3></div>
          <span className="text-xs text-slate-400">{tickets.length} تیکت</span>
        </div>
        <table className="w-full">
          <thead><tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50">
            <th className="text-right py-3 px-6 font-medium">شماره</th><th className="text-right py-3 px-6 font-medium">عنوان</th><th className="text-right py-3 px-6 font-medium">مشتری</th><th className="text-right py-3 px-6 font-medium">اولویت</th><th className="text-right py-3 px-6 font-medium">وضعیت</th><th className="text-right py-3 px-6 font-medium">تاریخ</th><th className="text-right py-3 px-6 font-medium">عملیات</th>
          </tr></thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-3.5 px-6 text-sm font-medium text-orange-600">{ticket.id}</td>
                <td className="py-3.5 px-6 text-sm font-medium text-slate-800">{ticket.title}</td>
                <td className="py-3.5 px-6 text-sm text-slate-500">{ticket.customer}</td>
                <td className="py-3.5 px-6"><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${priorityColors[ticket.priority]}`}>{ticket.priority}</span></td>
                <td className="py-3.5 px-6">
                  <button onClick={() => cycleStatus(ticket)} className={`text-xs font-bold border rounded-full px-2.5 py-0.5 cursor-pointer transition-colors ${statusColors[ticket.status]} hover:opacity-80`}>{ticket.status}</button>
                </td>
                <td className="py-3.5 px-6 text-sm text-slate-400">{ticket.date}</td>
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-1">
                    <button onClick={() => openView(ticket)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-slate-400 hover:text-slate-600"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => openDelete(ticket)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {tickets.length === 0 && <tr><td colSpan={7} className="py-12 text-center text-gray-400 text-sm">تیکتی وجود ندارد</td></tr>}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modal && <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setModal(null)}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()} dir="rtl">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
            <h3 className="text-base font-bold text-slate-900">{modal === 'add' ? 'تیکت جدید' : modal === 'view' ? 'مشاهده تیکت' : 'تایید حذف'}</h3>
            <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-5">
            {modal === 'view' && selected && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">شماره تیکت</div><div className="text-sm font-bold text-orange-600">{selected.id}</div></div>
                  <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">مشتری</div><div className="text-sm font-bold">{selected.customer}</div></div>
                  <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">اولویت</div><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${priorityColors[selected.priority]}`}>{selected.priority}</span></div>
                  <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">وضعیت</div><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[selected.status]}`}>{selected.status}</span></div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">عنوان</div><div className="text-sm font-bold">{selected.title}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">توضیحات</div><div className="text-sm text-slate-700">{selected.description}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">تاریخ</div><div className="text-sm font-bold">{selected.date}</div></div>
              </div>
            )}
            {modal === 'delete' && selected && (
              <div className="text-center py-4">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-base font-bold text-slate-800 mb-2">آیا از حذف تیکت مطمئن هستید؟</p>
                <p className="text-sm text-slate-500">{selected.id} - {selected.title}</p>
                <div className="flex gap-3 mt-6 justify-center">
                  <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">بله، حذف شود</button>
                  <button onClick={() => setModal(null)} className="bg-gray-100 hover:bg-gray-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">انصراف</button>
                </div>
              </div>
            )}
            {modal === 'add' && (
              <div className="space-y-4">
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">عنوان تیکت</label><input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="موضوع تیکت" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">مشتری</label><input type="text" value={form.customer} onChange={e => setForm(f => ({ ...f, customer: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="نام مشتری" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">اولویت</label><select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer"><option value="بالا">بالا</option><option value="متوسط">متوسط</option><option value="پایین">پایین</option></select></div>
                </div>
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">توضیحات</label><textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 h-24 resize-none" placeholder="شرح مشکل..." /></div>
                <button onClick={handleSave} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"><Save className="w-4 h-4" /> ثبت تیکت</button>
              </div>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
}