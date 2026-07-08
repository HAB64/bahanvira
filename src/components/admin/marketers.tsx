'use client';

import { useState } from 'react';
import {
  UserPlus, DollarSign, TrendingUp, Phone, Eye, Edit3, Trash2,
  Gift, BarChart3, Users, Filter, X, Save, Check, AlertCircle,
} from 'lucide-react';

interface Marketer {
  id: number;
  name: string;
  phone: string;
  code: string;
  referrals: number;
  commission: string;
  status: string;
}

interface CommissionRecord {
  id: number;
  marketer: string;
  student: string;
  amount: string;
  date: string;
  paid: string;
}

const initialMarketers: Marketer[] = [
  { id: 1, name: 'مریم احمدی', phone: '۰۹۱۲۱۱۱۱۲۲۲', code: 'VIRA-001', referrals: 8, commission: '۲,۰۰۰,۰۰۰', status: 'فعال' },
  { id: 2, name: 'حسین رضایی', phone: '۰۹۳۵۲۲۲۳۳۳۴', code: 'VIRA-002', referrals: 5, commission: '۱,۲۵۰,۰۰۰', status: 'فعال' },
  { id: 3, name: 'زهرا کریمی', phone: '۰۹۱۰۳۳۳۴۴۴۵', code: 'VIRA-003', referrals: 12, commission: '۳,۰۰۰,۰۰۰', status: 'فعال' },
  { id: 4, name: 'علی حسینی', phone: '۰۹۲۱۴۴۴۵۵۵۶', code: 'VIRA-004', referrals: 3, commission: '۷۵۰,۰۰۰', status: 'غیرفعال' },
  { id: 5, name: 'نازنین محمدی', phone: '۰۹۳۸۵۵۵۶۶۶۷', code: 'VIRA-005', referrals: 7, commission: '۱,۷۵۰,۰۰۰', status: 'فعال' },
  { id: 6, name: 'رضا موسوی', phone: '۰۹۱۹۶۶۶۷۷۷۸', code: 'VIRA-006', referrals: 2, commission: '۵۰۰,۰۰۰', status: 'غیرفعال' },
  { id: 7, name: 'فاطمه جعفری', phone: '۰۹۳۳۷۷۷۸۸۸۹', code: 'VIRA-007', referrals: 9, commission: '۲,۲۵۰,۰۰۰', status: 'فعال' },
  { id: 8, name: 'امیر صادقی', phone: '۰۹۱۲۸۸۸۹۹۹۰', code: 'VIRA-008', referrals: 4, commission: '۱,۰۰۰,۰۰۰', status: 'فعال' },
];

const initialCommissions: CommissionRecord[] = [
  { id: 1, marketer: 'مریم احمدی', student: 'سارا نوری', amount: '۲۵۰,۰۰۰', date: '۱۴۰۴/۰۳/۲۰', paid: 'پرداخت شده' },
  { id: 2, marketer: 'حسین رضایی', student: 'امیر کریمی', amount: '۲۵۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۹', paid: 'در انتظار' },
  { id: 3, marketer: 'زهرا کریمی', student: 'نرگس رحمانی', amount: '۲۵۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۸', paid: 'پرداخت شده' },
  { id: 4, marketer: 'مریم احمدی', student: 'دانیال قاسمی', amount: '۲۵۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۷', paid: 'پرداخت شده' },
  { id: 5, marketer: 'نازنین محمدی', student: 'یاسمن عباسی', amount: '۲۵۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۶', paid: 'در انتظار' },
  { id: 6, marketer: 'فاطمه جعفری', student: 'محمد تقوی', amount: '۲۵۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۵', paid: 'پرداخت شده' },
];

export default function MarketersTab() {
  const [marketers, setMarketers] = useState<Marketer[]>(initialMarketers);
  const [commissions, setCommissions] = useState<CommissionRecord[]>(initialCommissions);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [modal, setModal] = useState<'add' | 'edit' | 'view' | 'delete' | null>(null);
  const [selected, setSelected] = useState<Marketer | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', code: '', referrals: 0, commission: '', status: 'فعال' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const filteredMarketers = marketers.filter((m) => {
    const ms = m.name.includes(search) || m.phone.includes(search) || m.code.toLowerCase().includes(search.toLowerCase());
    const mf = statusFilter === 'all' || (statusFilter === 'active' && m.status === 'فعال') || (statusFilter === 'inactive' && m.status === 'غیرفعال');
    return ms && mf;
  });

  const activeCount = marketers.filter(m => m.status === 'فعال').length;
  const totalPaid = commissions.filter(c => c.paid === 'پرداخت شده').length;
  const totalReferrals = marketers.reduce((s, m) => s + m.referrals, 0);

  const openAdd = () => {
    const nextId = Math.max(0, ...marketers.map(m => m.id)) + 1;
    const nextCode = 'VIRA-' + String(nextId).padStart(3, '0');
    setForm({ name: '', phone: '', code: nextCode, referrals: 0, commission: '۰', status: 'فعال' });
    setSelected(null);
    setModal('add');
  };
  const openEdit = (m: Marketer) => { setForm({ name: m.name, phone: m.phone, code: m.code, referrals: m.referrals, commission: m.commission, status: m.status }); setSelected(m); setModal('edit'); };
  const openView = (m: Marketer) => { setSelected(m); setModal('view'); };
  const openDelete = (m: Marketer) => { setSelected(m); setModal('delete'); };

  const handleSave = () => {
    if (!form.name.trim() || !form.phone.trim()) { showToast('لطفا نام و شماره تماس را وارد کنید'); return; }
    if (modal === 'add') {
      const newM: Marketer = { id: Math.max(0, ...marketers.map(m => m.id)) + 1, ...form };
      setMarketers(prev => [newM, ...prev]);
      showToast('بازاریاب جدید با موفقیت ثبت شد');
    } else if (modal === 'edit' && selected) {
      setMarketers(prev => prev.map(m => m.id === selected.id ? { ...m, ...form } : m));
      showToast('اطلاعات بازاریاب به‌روزرسانی شد');
    }
    setModal(null);
  };
  const handleDelete = () => {
    if (selected) { setMarketers(prev => prev.filter(m => m.id !== selected.id)); showToast('بازاریاب حذف شد'); }
    setModal(null);
  };
  const toggleCommissionPaid = (id: number) => {
    setCommissions(prev => prev.map(c => c.id === id ? { ...c, paid: c.paid === 'پرداخت شده' ? 'در انتظار' : 'پرداخت شده' } : c));
    showToast('وضعیت پورسانت تغییر کرد');
  };

  return (
    <div dir="rtl" className="space-y-6 p-6 relative">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] bg-slate-800 text-white px-5 py-3 rounded-xl text-sm font-medium shadow-xl flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { title: 'بازاریاب فعال', value: activeCount + ' نفر', icon: Users, color: 'from-teal-500 to-teal-600', iconBg: 'bg-teal-100', iconColor: 'text-teal-600' },
          { title: 'پورسانت پرداخت شده', value: totalPaid + ' مورد', icon: DollarSign, color: 'from-emerald-500 to-emerald-600', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
          { title: 'ثبت‌نام از طریق بازاریاب', value: totalReferrals + ' نفر', icon: TrendingUp, color: 'from-purple-500 to-purple-600', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center`}><Icon className={`w-6 h-6 ${card.iconColor}`} /></div>
              <div><p className="text-sm text-gray-500 mb-0.5">{card.title}</p><p className="text-lg font-bold text-gray-800">{card.value}</p></div>
            </div>
          );
        })}
      </div>

      {/* Marketers Section */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 border-b border-gray-100">
          <div className="flex items-center gap-2"><Gift className="w-5 h-5 text-orange-500" /><h2 className="text-lg font-bold text-gray-800">بازاریاب‌ها و پورسانت</h2></div>
          <button onClick={openAdd} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
            <UserPlus className="w-4 h-4" /> ثبت بازاریاب جدید
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="relative flex-1">
            <input type="text" placeholder="جستجو بر اساس نام، شماره تماس یا کد معرفی..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all cursor-pointer">
              <option value="all">همه وضعیت‌ها</option><option value="active">فعال</option><option value="inactive">غیرفعال</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100">
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">نام بازاریاب</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">شماره تماس</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">کد معرفی</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">تعداد ارجاع</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">پورسانت کل</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">وضعیت</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">عملیات</th>
            </tr></thead>
            <tbody>
              {filteredMarketers.map(m => (
                <tr key={m.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                  <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">{m.name.charAt(0)}</div><span className="font-medium text-gray-800">{m.name}</span></div></td>
                  <td className="px-5 py-4"><div className="flex items-center gap-1.5 text-gray-600"><Phone className="w-3.5 h-3.5" /><span className="text-xs tracking-wide" dir="ltr">{m.phone}</span></div></td>
                  <td className="px-5 py-4"><span className="bg-orange-50 text-orange-600 border border-orange-200 text-xs font-mono px-2.5 py-1 rounded-lg" dir="ltr">{m.code}</span></td>
                  <td className="px-5 py-4 text-gray-700 font-medium">{m.referrals}</td>
                  <td className="px-5 py-4"><span className="text-gray-800 font-medium">{m.commission}</span><span className="text-gray-400 text-xs mr-1">تومان</span></td>
                  <td className="px-5 py-4">
                    <button onClick={() => { const st = m.status === 'فعال' ? 'غیرفعال' : 'فعال'; setMarketers(prev => prev.map(x => x.id === m.id ? { ...x, status: st } : x)); showToast('وضعیت بازاریاب تغییر کرد'); }}
                      className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg border cursor-pointer transition-colors ${m.status === 'فعال' ? 'bg-emerald-100 text-emerald-600 border-emerald-200 hover:bg-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'}`}>
                      {m.status}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openView(m)} title="مشاهده" className="p-1.5 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => openEdit(m)} title="ویرایش" className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => openDelete(m)} title="حذف" className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMarketers.length === 0 && <tr><td colSpan={7} className="px-5 py-12 text-center text-gray-400 text-sm">بازاریابی با این مشخصات یافت نشد.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commission History */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center gap-2 p-5 border-b border-gray-100"><BarChart3 className="w-5 h-5 text-orange-500" /><h2 className="text-lg font-bold text-gray-800">تاریخچه پورسانت‌ها</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100">
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">بازاریاب</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">دانش‌آموز</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">مبلغ پورسانت</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">تاریخ</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500">وضعیت پرداخت</th>
            </tr></thead>
            <tbody>
              {commissions.map(r => (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                  <td className="px-5 py-4 font-medium text-gray-800">{r.marketer}</td>
                  <td className="px-5 py-4 text-gray-600">{r.student}</td>
                  <td className="px-5 py-4"><span className="text-gray-800 font-medium">{r.amount}</span><span className="text-gray-400 text-xs mr-1">تومان</span></td>
                  <td className="px-5 py-4 text-gray-500 text-xs" dir="ltr">{r.date}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleCommissionPaid(r.id)}
                      className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg border cursor-pointer transition-colors ${r.paid === 'پرداخت شده' ? 'bg-emerald-100 text-emerald-600 border-emerald-200 hover:bg-emerald-200' : 'bg-amber-100 text-amber-600 border-amber-200 hover:bg-amber-200'}`}>
                      {r.paid}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      {modal && <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setModal(null)}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()} dir="rtl">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
            <h3 className="text-base font-bold text-slate-900">{modal === 'add' ? 'ثبت بازاریاب جدید' : modal === 'edit' ? 'ویرایش بازاریاب' : modal === 'view' ? 'مشاهده بازاریاب' : 'تایید حذف'}</h3>
            <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-5">
            {modal === 'view' && selected && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">نام</div><div className="text-sm font-bold">{selected.name}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">تلفن</div><div className="text-sm font-bold" dir="ltr">{selected.phone}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">کد معرفی</div><div className="text-sm font-bold">{selected.code}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">تعداد ارجاع</div><div className="text-sm font-bold">{selected.referrals} نفر</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">پورسانت</div><div className="text-sm font-bold">{selected.commission} تومان</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">وضعیت</div><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${selected.status === 'فعال' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>{selected.status}</span></div>
              </div>
            )}
            {modal === 'delete' && selected && (
              <div className="text-center py-4">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-base font-bold text-slate-800 mb-2">آیا از حذف بازاریاب مطمئن هستید؟</p>
                <p className="text-sm text-slate-500">{selected.name} ({selected.code})</p>
                <div className="flex gap-3 mt-6 justify-center">
                  <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">بله، حذف شود</button>
                  <button onClick={() => setModal(null)} className="bg-gray-100 hover:bg-gray-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">انصراف</button>
                </div>
              </div>
            )}
            {(modal === 'add' || modal === 'edit') && (
              <div className="space-y-4">
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نام بازاریاب</label><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="نام و نام خانوادگی" /></div>
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">شماره تماس</label><input type="text" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="۰۹۱۲۰۰۰۰۰۰۰" dir="ltr" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">کد معرفی</label><input type="text" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" dir="ltr" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">وضعیت</label><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer"><option value="فعال">فعال</option><option value="غیرفعال">غیرفعال</option></select></div>
                </div>
                <button onClick={handleSave} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"><Save className="w-4 h-4" /> {modal === 'add' ? 'ثبت بازاریاب' : 'به‌روزرسانی'}</button>
              </div>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
}