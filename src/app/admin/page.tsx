'use client';

import { useState } from 'react';
import {
  Users, GraduationCap, Lock, LogOut, BarChart3, BookOpen, Settings,
  ChevronDown, Bell, Home, FolderOpen, Shield, PieChart, CreditCard,
  ClipboardList, UserCheck, UserPlus, TrendingUp, MessageSquare, Phone,
  CalendarDays, FileText, Megaphone, Building2, Gift, Send,
  HelpCircle as SupportIcon, Play, X, Plus, Search, Eye, Edit3, Trash2,
  Calendar as CalendarIcon, Save, Check, AlertCircle,
} from 'lucide-react';

import MarketersTab from '@/components/admin/marketers';
import AgenciesTab from '@/components/admin/agencies';
import LMSTab from '@/components/admin/lms';
import CalendarTab from '@/components/admin/calendar';
import ReportsTab from '@/components/admin/reports';
import SupportTab from '@/components/admin/support';
import FilesTab from '@/components/admin/files';
import PaymentsTab from '@/components/admin/payments';
import MarketingTab from '@/components/admin/marketing';
import EmailsTab from '@/components/admin/emails';

type TabKey =
  | 'dashboard' | 'students' | 'classes' | 'exams' | 'crm'
  | 'financial' | 'users' | 'settings' | 'marketers' | 'agencies'
  | 'lms' | 'calendar' | 'reports' | 'support' | 'files'
  | 'payments' | 'marketing' | 'emails';

interface MenuItem { key: TabKey; label: string; icon: React.ElementType; }

/* ── Shared UI Components ── */
function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()} dir="rtl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
function Fld({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">{label}</label>{children}</div>;
}
function Inp(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" />;
}
function Sel(props: React.SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[] }) {
  const { options, ...rest } = props;
  return <select {...rest} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400">{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>;
}
function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return <div className={"fixed top-4 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg text-sm font-medium " + (type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white')}>{type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}{message}</div>;
}
function useToast() {
  const [t, setT] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const show = (m: string, type: 'success' | 'error' = 'success') => { setT({ message: m, type }); setTimeout(() => setT(null), 2500); };
  return { toast: t, show };
}

/* ── Sidebar Config ── */
const sidebarCategories: { title: string; icon: React.ElementType; items: MenuItem[] }[] = [
  { title: 'خلاصه عملکرد', icon: Home, items: [{ key: 'dashboard', label: 'داشبورد', icon: BarChart3 }] },
  { title: 'مدیریت آموزشی', icon: BookOpen, items: [
    { key: 'students', label: 'دانش\u200cآموزان', icon: Users }, { key: 'classes', label: 'کلاس\u200cها', icon: BookOpen },
    { key: 'exams', label: 'آزمون\u200cها', icon: ClipboardList }, { key: 'lms', label: 'مدیریت محتوا (LMS)', icon: Play },
    { key: 'calendar', label: 'تقویم و برنامه\u200cریزی', icon: CalendarDays },
  ]},
  { title: 'مدیریت و پیکربندی', icon: Settings, items: [
    { key: 'users', label: 'کاربران و نقش\u200cها', icon: Shield }, { key: 'payments', label: 'پرداخت و فاکتورها', icon: CreditCard },
    { key: 'financial', label: 'مدیریت مالی', icon: TrendingUp }, { key: 'files', label: 'مدیریت فایل\u200cها', icon: FileText },
    { key: 'settings', label: 'تنظیمات', icon: Settings },
  ]},
  { title: 'پشتیبانی و CRM', icon: UserCheck, items: [
    { key: 'crm', label: 'مدیریت CRM', icon: UserCheck }, { key: 'support', label: 'پشتیبانی (تیکت)', icon: SupportIcon },
  ]},
  { title: 'بازاریابی و فروش', icon: Megaphone, items: [
    { key: 'marketers', label: 'بازاریاب\u200cها و پورسانت', icon: Gift }, { key: 'agencies', label: 'نمایندگی\u200cها', icon: Building2 },
    { key: 'marketing', label: 'کمپین\u200cها و بازاریابی', icon: Megaphone }, { key: 'emails', label: 'قالب ایمیل و پیامک', icon: Send },
  ]},
];


const dashStats = [
  { label: 'دانش\u200cآموز فعال', value: '۱۲۳', icon: Users, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
  { label: 'مربی', value: '۸', icon: GraduationCap, color: 'text-teal-500', bg: 'bg-teal-50', border: 'border-teal-200' },
  { label: 'کلاس فعال', value: '۱۵', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
  { label: 'درآمد ماهانه', value: '۲۵M', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { label: 'سرنخ CRM', value: '۴۷', icon: UserPlus, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
  { label: 'نرخ تبدیل', value: '۶۸٪', icon: PieChart, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
  { label: 'بازاریاب فعال', value: '۱۲', icon: Gift, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200' },
  { label: 'نمایندگی', value: '۸', icon: Building2, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-200' },
];
const quickMods = [
  { title: 'مدیریت CRM', desc: 'مدیریت ارتباط با مشتریان', icon: UserCheck, color: 'from-orange-400 to-orange-600', count: 4, target: 'crm' as TabKey },
  { title: 'بازاریاب\u200cها', desc: 'مدیریت بازاریاب\u200cها و پورسانت', icon: Gift, color: 'from-rose-400 to-rose-600', count: 2, target: 'marketers' as TabKey },
  { title: 'نمایندگی\u200cها', desc: 'مدیریت شعب و نمایندگی\u200cها', icon: Building2, color: 'from-indigo-400 to-indigo-600', count: 3, target: 'agencies' as TabKey },
  { title: 'مدیریت محتوا', desc: 'LMS و مدیریت جلسات آموزشی', icon: Play, color: 'from-teal-400 to-teal-600', count: 5, target: 'lms' as TabKey },
  { title: 'گزارشات پیشرفته', desc: 'تحلیل داده\u200cها و نمودارها', icon: BarChart3, color: 'from-purple-400 to-purple-600', count: 2, target: 'reports' as TabKey },
  { title: 'پرداخت و فاکتور', desc: 'صدور فاکتور و پیگیری پرداخت\u200cها', icon: CreditCard, color: 'from-emerald-400 to-emerald-600', count: 8, target: 'payments' as TabKey },
  { title: 'پشتیبانی', desc: 'مدیریت تیکت\u200cها و پشتیبانی آنلاین', icon: SupportIcon, color: 'from-blue-400 to-blue-600', count: 5, target: 'support' as TabKey },
  { title: 'بازاریابی', desc: 'کمپین\u200cها، ایمیل و پیامک', icon: Megaphone, color: 'from-amber-400 to-amber-600', count: 3, target: 'marketing' as TabKey },
];

function DashboardTab({ nav }: { nav: (k: TabKey) => void }) {
  const recentReg = [
    { name: 'سارا احمدی', course: 'چرتکه مبتدی', status: 'فعال' }, { name: 'محمد رضایی', course: 'حساب ذهنی ۱', status: 'در انتظار' },
    { name: 'فاطمه حسینی', course: 'چرتکه متوسط', status: 'فعال' }, { name: 'امیر کریمی', course: 'چرتکه مبتدی', status: 'فعال' },
    { name: 'نازنین عباسی', course: 'آمادگی مسابقات', status: 'غیرفعال' },
  ];
  const recentEx = [
    { student: 'سارا احمدی', exam: 'آزمون جمع و تفریق', score: '۹/۱۰' }, { student: 'محمد رضایی', exam: 'آزمون ضرب', score: '۷/۱۰' },
    { student: 'فاطمه حسینی', exam: 'آزمون سرعت', score: '۱۸/۲۰' }, { student: 'امیر کریمی', exam: 'آزمون جامع', score: '۲۲/۳۰' },
  ];
  const sc: Record<string, string> = { 'فعال': 'bg-emerald-100 text-emerald-600 border-emerald-200', 'در انتظار': 'bg-amber-100 text-amber-600 border-amber-200', 'غیرفعال': 'bg-slate-100 text-slate-500 border-slate-200' };
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{dashStats.map(s => { const I = s.icon; return (
        <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className={"shrink-0 w-12 h-12 rounded-xl " + s.bg + " border " + s.border + " flex items-center justify-center"}><I className={"w-6 h-6 " + s.color} /></div>
          <div className="min-w-0"><p className="text-xl font-bold text-slate-900 truncate">{s.value}</p><p className="text-xs text-slate-500 mt-0.5">{s.label}</p></div>
        </div>); })}</div>
      <div><h3 className="text-lg font-bold text-slate-900 mb-4">ماژول\u200cهای پیشنهادی</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{quickMods.map(m => { const I = m.icon; return (
          <div key={m.title} onClick={() => nav(m.target)} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all text-right group cursor-pointer">
            <div className={"w-12 h-12 rounded-xl bg-gradient-to-br " + m.color + " flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg"}><I className="w-6 h-6 text-white" /></div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">{m.title}</h4><p className="text-xs text-slate-500 leading-relaxed mb-3">{m.desc}</p>
            <span className="text-xs text-orange-500 font-medium">{m.count} آیتم فعال</span>
          </div>); })}</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100"><h3 className="text-base font-bold text-slate-900 mb-5">آخرین ثبت\u200cنام\u200cها</h3>
          <table className="w-full text-sm"><thead><tr className="text-slate-400 text-xs border-b border-gray-100"><th className="text-right pb-3 font-medium">نام</th><th className="text-right pb-3 font-medium hidden sm:table-cell">دوره</th><th className="text-right pb-3 font-medium">وضعیت</th></tr></thead>
          <tbody className="divide-y divide-gray-50">{recentReg.map((r, i) => <tr key={i} className="hover:bg-orange-50/30"><td className="py-3 text-slate-900 font-medium">{r.name}</td><td className="py-3 text-slate-500 hidden sm:table-cell">{r.course}</td><td className="py-3"><span className={"text-xs font-bold border rounded-full px-2.5 py-0.5 " + (sc[r.status] || '')}>{r.status}</span></td></tr>)}</tbody></table>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100"><h3 className="text-base font-bold text-slate-900 mb-5">آزمون\u200cهای اخیر</h3>
          <table className="w-full text-sm"><thead><tr className="text-slate-400 text-xs border-b border-gray-100"><th className="text-right pb-3 font-medium">دانش\u200cآموز</th><th className="text-right pb-3 font-medium hidden sm:table-cell">آزمون</th><th className="text-right pb-3 font-medium">نمره</th></tr></thead>
          <tbody className="divide-y divide-gray-50">{recentEx.map((r, i) => <tr key={i} className="hover:bg-orange-50/30"><td className="py-3 text-slate-900 font-medium">{r.student}</td><td className="py-3 text-slate-500 hidden sm:table-cell">{r.exam}</td><td className="py-3 text-emerald-600 font-bold">{r.score}</td></tr>)}</tbody></table>
        </div>
      </div>
    </div>
  );
}


function StudentsTab() {
  const [data, setData] = useState([
    { id: 1, name: 'سارا احمدی', phone: '۰۹۱۲۱۲۳۴۵۶۷', level: 'سطح ۳', date: '۱۴۰۴/۰۱/۱۵', status: 'فعال', paid: 'تسویه شده' },
    { id: 2, name: 'محمد رضایی', phone: '۰۹۳۵۶۷۸۹۰۱۲', level: 'سطح ۲', date: '۱۴۰۴/۰۲/۰۵', status: 'فعال', paid: 'تسویه شده' },
    { id: 3, name: 'فاطمه حسینی', phone: '۰۹۱۰۳۴۵۶۷۸۹', level: 'سطح ۵', date: '۱۴۰۳/۱۲/۲۰', status: 'فعال', paid: 'تسویه شده' },
    { id: 4, name: 'امیر کریمی', phone: '۰۹۲۱۲۳۴۵۶۷۸', level: 'سطح ۱', date: '۱۴۰۴/۰۳/۰۱', status: 'در انتظار', paid: 'پرداخت نشده' },
    { id: 5, name: 'نازنین عباسی', phone: '۰۹۳۸۹۰۱۲۳۴۵', level: 'سطح ۴', date: '۱۴۰۴/۰۱/۱۰', status: 'غیرفعال', paid: 'بدهکار' },
  ]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'add' | 'edit' | 'view' | null>(null);
  const [sel, setSel] = useState<typeof data[0] | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', level: 'سطح ۱', status: 'فعال' });
  const { toast, show } = useToast();
  const filtered = data.filter(s => s.name.includes(search) || s.phone.includes(search));
  const sc: Record<string, string> = { 'فعال': 'bg-emerald-100 text-emerald-600 border-emerald-200', 'در انتظار': 'bg-amber-100 text-amber-600 border-amber-200', 'غیرفعال': 'bg-slate-100 text-slate-500 border-slate-200' };

  const openAdd = () => { setForm({ name: '', phone: '', level: 'سطح ۱', status: 'فعال' }); setSel(null); setModal('add'); };
  const openEdit = (s: typeof data[0]) => { setForm({ name: s.name, phone: s.phone, level: s.level, status: s.status }); setSel(s); setModal('edit'); };

  const save = () => {
    if (!form.name.trim() || !form.phone.trim()) { show('نام و تلفن الزامی است', 'error'); return; }
    if (modal === 'edit' && sel) {
      setData(prev => prev.map(s => s.id === sel.id ? { ...s, ...form } : s)); show('دانش\u200cآموز ویرایش شد');
    } else {
      const nid = Math.max(0, ...data.map(s => s.id)) + 1;
      setData(prev => [...prev, { id: nid, ...form, date: '۱۴۰۴/۰۳/۲۵', paid: 'پرداخت نشده' }]); show('دانش\u200cآموز اضافه شد');
    }
    setModal(null);
  };
  const del = (id: number) => { if (confirm('حذف شود؟')) { setData(p => p.filter(s => s.id !== id)); show('حذف شد'); } };

  return (<div dir="rtl">{toast && <Toast {...toast} />}
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-bold text-slate-900">لیست دانش\u200cآموزان ({data.length})</h3>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64"><Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو..." className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" /></div>
          <button onClick={openAdd} className="shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:shadow-lg hover:shadow-orange-500/20 transition-all"><Plus className="w-4 h-4" />افزودن</button>
        </div>
      </div>
      <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50"><th className="text-right py-3 px-4 font-medium">نام</th><th className="text-right py-3 px-4 font-medium hidden md:table-cell">تلفن</th><th className="text-right py-3 px-4 font-medium">سطح</th><th className="text-right py-3 px-4 font-medium hidden sm:table-cell">تاریخ</th><th className="text-right py-3 px-4 font-medium">وضعیت</th><th className="text-right py-3 px-4 font-medium">عملیات</th></tr></thead>
        <tbody className="divide-y divide-gray-50">{filtered.map(s => (<tr key={s.id} className="hover:bg-orange-50/30"><td className="py-3 px-4 text-slate-900 font-medium">{s.name}</td><td className="py-3 px-4 text-slate-500 hidden md:table-cell" dir="ltr">{s.phone}</td><td className="py-3 px-4 text-slate-600">{s.level}</td><td className="py-3 px-4 text-slate-500 hidden sm:table-cell">{s.date}</td><td className="py-3 px-4"><span className={"text-xs font-bold border rounded-full px-2.5 py-0.5 " + sc[s.status]}>{s.status}</span></td>
          <td className="py-3 px-4"><div className="flex gap-1"><button onClick={() => { setSel(s); setModal('view'); }} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500"><Eye className="w-4 h-4" /></button><button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-orange-50 text-slate-400 hover:text-orange-500"><Edit3 className="w-4 h-4" /></button><button onClick={() => del(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div></td></tr>))}
          {filtered.length === 0 && <tr><td colSpan={6} className="py-12 text-center text-slate-400">نتیجه\u200cای یافت نشد</td></tr>}
        </tbody></table></div>
    </div>
    <Modal open={modal === 'add' || modal === 'edit'} onClose={() => setModal(null)} title={modal === 'edit' ? 'ویرایش دانش\u200cآموز' : 'افزودن دانش\u200cآموز جدید'}>
      <div className="space-y-4"><Fld label="نام و نام خانوادگی"><Inp value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="نام دانش\u200cآموز" /></Fld><Fld label="شماره تلفن"><Inp value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr" /></Fld><Fld label="سطح"><Sel value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} options={['سطح ۱','سطح ۲','سطح ۳','سطح ۴','سطح ۵','حرفه\u200cای'].map(l => ({ value: l, label: l }))} /></Fld><Fld label="وضعیت"><Sel value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} options={['فعال','در انتظار','غیرفعال'].map(s => ({ value: s, label: s }))} /></Fld>
        <button onClick={save} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2"><Save className="w-4 h-4" />{modal === 'edit' ? 'ذخیره تغییرات' : 'ثبت دانش\u200cآموز'}</button></div>
    </Modal>
    <Modal open={modal === 'view'} onClose={() => setModal(null)} title="جزئیات دانش\u200cآموز">
      {sel && (<div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">نام</div><div className="text-sm font-bold">{sel.name}</div></div>
        <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">تلفن</div><div className="text-sm font-bold" dir="ltr">{sel.phone}</div></div>
        <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">سطح</div><div className="text-sm font-bold">{sel.level}</div></div>
        <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">تاریخ</div><div className="text-sm font-bold">{sel.date}</div></div>
        <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">وضعیت</div><span className={"text-xs font-bold border rounded-full px-2.5 py-0.5 " + sc[sel.status]}>{sel.status}</span></div>
        <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">پرداخت</div><div className="text-sm font-bold">{sel.paid}</div></div>
      </div>)}
    </Modal>
  </div>);
}


function ClassesTab() {
  const [data, setData] = useState([
    { id: 1, name: 'چرتکه مبتدی - گروه الف', instructor: 'استاد رضایی', students: 18, schedule: 'شنبه و دوشنبه - ۱۶:۰۰' },
    { id: 2, name: 'چرتکه مبتدی - گروه ب', instructor: 'استاد احمدی', students: 15, schedule: 'یکشنبه و سه\u200cشنبه - ۱۵:۰۰' },
    { id: 3, name: 'چرتکه متوسط', instructor: 'استاد کریمی', students: 12, schedule: 'شنبه و چهارشنبه - ۱۷:۰۰' },
    { id: 4, name: 'چرتکه پیشرفته', instructor: 'استاد حسینی', students: 8, schedule: 'دوشنبه و پنجشنبه - ۱۴:۰۰' },
    { id: 5, name: 'حساب ذهنی ۱', instructor: 'استاد محمدی', students: 20, schedule: 'سه\u200cشنبه و پنجشنبه - ۱۶:۰۰' },
  ]);
  const [modal, setModal] = useState(false); const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', instructor: '', students: '', schedule: '' });
  const { toast, show } = useToast();
  const openAdd = () => { setForm({ name: '', instructor: '', students: '', schedule: '' }); setEditId(null); setModal(true); };
  const openEdit = (c: typeof data[0]) => { setForm({ name: c.name, instructor: c.instructor, students: String(c.students), schedule: c.schedule }); setEditId(c.id); setModal(true); };
  const save = () => {
    if (!form.name.trim()) { show('نام کلاس الزامی است', 'error'); return; }
    if (editId) { setData(p => p.map(c => c.id === editId ? { ...c, name: form.name, instructor: form.instructor, students: parseInt(form.students) || 0, schedule: form.schedule } : c)); show('کلاس ویرایش شد'); }
    else { setData(p => [...p, { id: Math.max(0, ...p.map(c => c.id)) + 1, name: form.name, instructor: form.instructor, students: parseInt(form.students) || 0, schedule: form.schedule }]); show('کلاس ایجاد شد'); }
    setModal(false);
  };
  const del = (id: number) => { if (confirm('حذف شود؟')) { setData(p => p.filter(c => c.id !== id)); show('حذف شد'); } };

  return (<div className="space-y-6" dir="rtl">{toast && <Toast {...toast} />}
    <div className="flex items-center justify-between"><h3 className="text-lg font-bold text-slate-900">کلاس\u200cها ({data.length})</h3>
      <button onClick={openAdd} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:shadow-lg hover:shadow-orange-500/20 transition-all"><Plus className="w-4 h-4" />ایجاد کلاس</button></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{data.map(c => (
      <div key={c.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow relative group">
        <div className="absolute top-3 left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-orange-50 text-slate-400 hover:text-orange-500 shadow-sm"><Edit3 className="w-3.5 h-3.5" /></button>
          <button onClick={() => del(c.id)} className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-red-50 text-slate-400 hover:text-red-500 shadow-sm"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
        <h4 className="text-sm font-bold text-slate-900 leading-6 mb-4">{c.name}</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-slate-500 flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" />مربی</span><span className="text-slate-900 font-medium">{c.instructor}</span></div>
          <div className="flex justify-between"><span className="text-slate-500 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />دانش\u200cآموز</span><span className="text-slate-900 font-medium">{c.students} نفر</span></div>
          <div className="flex justify-between"><span className="text-slate-500 flex items-center gap-1.5"><CalendarIcon className="w-3.5 h-3.5" />برنامه</span><span className="text-slate-900 font-medium text-xs">{c.schedule}</span></div>
        </div>
      </div>))}</div>
    <Modal open={modal} onClose={() => setModal(false)} title={editId ? 'ویرایش کلاس' : 'ایجاد کلاس جدید'}>
      <div className="space-y-4"><Fld label="نام کلاس"><Inp value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></Fld><Fld label="مربی"><Inp value={form.instructor} onChange={e => setForm({ ...form, instructor: e.target.value })} /></Fld><Fld label="تعداد دانش\u200cآموز"><Inp type="number" value={form.students} onChange={e => setForm({ ...form, students: e.target.value })} /></Fld><Fld label="برنامه زمانی"><Inp value={form.schedule} onChange={e => setForm({ ...form, schedule: e.target.value })} /></Fld>
        <button onClick={save} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2"><Save className="w-4 h-4" />{editId ? 'ذخیره' : 'ایجاد'}</button></div>
    </Modal>
  </div>);
}

function ExamsTab() {
  const [data, setData] = useState([
    { id: 1, name: 'آزمون سطح ۱', students: 35, avg: '۸۵٪', date: '۱۴۰۴/۰۳/۱۵', status: 'بسته شده' }, { id: 2, name: 'آزمون سطح ۳', students: 28, avg: '۷۸٪', date: '۱۴۰۴/۰۳/۱۰', status: 'بسته شده' },
    { id: 3, name: 'آزمون سرعت', students: 42, avg: '۷۲٪', date: '۱۴۰۴/۰۲/۲۸', status: 'بسته شده' }, { id: 4, name: 'آزمون جامع', students: 15, avg: '۸۰٪', date: '۱۴۰۴/۰۳/۲۲', status: 'فعال' },
  ]);
  const [modal, setModal] = useState(false); const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', students: '', date: '', status: 'فعال' });
  const { toast, show } = useToast();
  const sc: Record<string, string> = { 'فعال': 'bg-emerald-100 text-emerald-600 border-emerald-200', 'بسته شده': 'bg-slate-100 text-slate-500 border-slate-200' };
  const toggle = (id: number) => { setData(p => p.map(e => e.id === id ? { ...e, status: e.status === 'فعال' ? 'بسته شده' : 'فعال' } : e)); show('وضعیت تغییر کرد'); };
  const openAdd = () => { setForm({ name: '', students: '', date: '', status: 'فعال' }); setEditId(null); setModal(true); };
  const openEdit = (e: typeof data[0]) => { setForm({ name: e.name, students: String(e.students), date: e.date, status: e.status }); setEditId(e.id); setModal(true); };
  const save = () => {
    if (!form.name.trim()) { show('نام الزامی', 'error'); return; }
    if (editId) { setData(p => p.map(e => e.id === editId ? { ...e, name: form.name, students: parseInt(form.students) || 0, date: form.date, status: form.status } : e)); show('ویرایش شد'); }
    else { setData(p => [...p, { id: Math.max(0, ...p.map(e => e.id)) + 1, name: form.name, students: parseInt(form.students) || 0, avg: '۰٪', date: form.date, status: form.status }]); show('ایجاد شد'); }
    setModal(false);
  };
  return (<div dir="rtl">{toast && <Toast {...toast} />}
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between"><h3 className="text-lg font-bold text-slate-900">آزمون\u200cها ({data.length})</h3>
        <button onClick={openAdd} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:shadow-lg hover:shadow-orange-500/20 transition-all"><Plus className="w-4 h-4" />ایجاد آزمون</button></div>
      <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50"><th className="text-right py-3 px-4 font-medium">نام</th><th className="text-right py-3 px-4 font-medium">شرکت\u200cکننده</th><th className="text-right py-3 px-4 font-medium hidden sm:table-cell">میانگین</th><th className="text-right py-3 px-4 font-medium">وضعیت</th><th className="text-right py-3 px-4 font-medium">عملیات</th></tr></thead>
        <tbody className="divide-y divide-gray-50">{data.map(e => (<tr key={e.id} className="hover:bg-orange-50/30"><td className="py-3 px-4 text-slate-900 font-medium">{e.name}</td><td className="py-3 px-4 text-slate-600">{e.students} نفر</td><td className="py-3 px-4 text-emerald-600 font-bold hidden sm:table-cell">{e.avg}</td>
          <td className="py-3 px-4"><button onClick={() => toggle(e.id)} className={"text-xs font-bold border rounded-full px-2.5 py-0.5 cursor-pointer hover:opacity-80 " + sc[e.status]}>{e.status}</button></td>
          <td className="py-3 px-4"><button onClick={() => openEdit(e)} className="p-1.5 rounded-lg hover:bg-orange-50 text-slate-400 hover:text-orange-500"><Edit3 className="w-4 h-4" /></button></td></tr>))}</tbody></table></div>
    </div>
    <Modal open={modal} onClose={() => setModal(false)} title={editId ? 'ویرایش آزمون' : 'ایجاد آزمون'}>
      <div className="space-y-4"><Fld label="نام"><Inp value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></Fld><Fld label="تعداد"><Inp type="number" value={form.students} onChange={e => setForm({ ...form, students: e.target.value })} /></Fld><Fld label="تاریخ"><Inp value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></Fld>
        <Fld label="وضعیت"><Sel value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} options={[{ value: 'فعال', label: 'فعال' }, { value: 'بسته شده', label: 'بسته شده' }]} /></Fld>
        <button onClick={save} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2"><Save className="w-4 h-4" />ذخیره</button></div>
    </Modal>
  </div>);
}


function CRMInlineTab() {
  const [data, setData] = useState([
    { id: 1, name: 'زهرا محمدی', phone: '۰۹۱۲۳۴۵۶۷۸۹', source: 'اینستاگرام', status: 'ثبت\u200cنام شده', course: 'چرتکه مبتدی', date: '۱۴۰۴/۰۳/۲۰', assignee: 'مستر رضایی' },
    { id: 2, name: 'علی حسینی', phone: '۰۹۳۵۶۷۸۹۰۱۲', source: 'وبسایت', status: 'تماس گرفته شد', course: 'حساب ذهنی ۱', date: '۱۴۰۴/۰۳/۱۹', assignee: 'مستر احمدی' },
    { id: 3, name: 'مینا رضایی', phone: '۰۹۱۰۱۲۳۴۵۶۷', source: 'معرفی', status: 'جلسه مشاوره', course: 'چرتکه متوسط', date: '۱۴۰۴/۰۳/۱۸', assignee: 'مستر کریمی' },
    { id: 4, name: 'امیر کریمی', phone: '۰۹۲۱۲۳۴۵۶۷۸', source: 'تلگرام', status: 'جدید', course: 'چرتکه مبتدی', date: '۱۴۰۴/۰۳/۲۲', assignee: '-' },
  ]);
  const [search, setSearch] = useState(''); const [modal, setModal] = useState(false); const [viewId, setViewId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', source: 'وبسایت', course: '', assignee: '' });
  const { toast, show } = useToast();
  const statuses = ['جدید', 'تماس گرفته شد', 'جلسه مشاوره', 'ثبت\u200cنام شده', 'غیرفعال'];
  const sc: Record<string, string> = { 'جدید': 'bg-blue-100 text-blue-600 border-blue-200', 'تماس گرفته شد': 'bg-amber-100 text-amber-600 border-amber-200', 'جلسه مشاوره': 'bg-purple-100 text-purple-600 border-purple-200', 'ثبت\u200cنام شده': 'bg-emerald-100 text-emerald-600 border-emerald-200', 'غیرفعال': 'bg-slate-100 text-slate-500 border-slate-200' };
  const filtered = data.filter(l => l.name.includes(search) || l.phone.includes(search));
  const cycle = (id: number) => { setData(p => p.map(l => { if (l.id !== id) return l; const i = statuses.indexOf(l.status); return { ...l, status: statuses[(i + 1) % statuses.length] }; })); show('وضعیت تغییر کرد'); };
  const addLead = () => {
    if (!form.name.trim() || !form.phone.trim()) { show('نام و تلفن الزامی', 'error'); return; }
    setData(p => [...p, { id: Math.max(0, ...p.map(l => l.id)) + 1, ...form, status: 'جدید', date: '۱۴۰۴/۰۳/۲۵' }]); show('سرنخ اضافه شد'); setModal(false); setForm({ name: '', phone: '', source: 'وبسایت', course: '', assignee: '' });
  };
  const del = (id: number) => { if (confirm('حذف شود؟')) { setData(p => p.filter(l => l.id !== id)); show('حذف شد'); } };
  const vl = data.find(l => l.id === viewId);

  return (<div className="space-y-6" dir="rtl">{toast && <Toast {...toast} />}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">{statuses.map(s => (
      <div key={s} className={"p-4 rounded-2xl border text-center cursor-pointer hover:shadow-md transition-shadow " + sc[s]} onClick={() => setSearch(s === 'جدید' ? '' : s)}>
        <div className="text-2xl font-bold">{data.filter(l => l.status === s).length}</div><div className="text-xs font-medium mt-1">{s}</div></div>))}</div>
    <div className="flex gap-3"><div className="relative flex-1"><Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو..." className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" /></div>
      <button onClick={() => setModal(true)} className="shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:shadow-lg hover:shadow-orange-500/20 transition-all"><UserPlus className="w-4 h-4" />سرنخ جدید</button></div>
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50"><th className="text-right py-3 px-4 font-medium">نام</th><th className="text-right py-3 px-4 font-medium hidden md:table-cell">تلفن</th><th className="text-right py-3 px-4 font-medium">دوره</th><th className="text-right py-3 px-4 font-medium">وضعیت</th><th className="text-right py-3 px-4 font-medium hidden sm:table-cell">مسئول</th><th className="text-right py-3 px-4 font-medium">عملیات</th></tr></thead>
        <tbody className="divide-y divide-gray-50">{filtered.map(l => (<tr key={l.id} className="hover:bg-orange-50/30"><td className="py-3 px-4 text-slate-900 font-medium">{l.name}</td><td className="py-3 px-4 text-slate-500 hidden md:table-cell" dir="ltr">{l.phone}</td><td className="py-3 px-4 text-slate-600">{l.course}</td>
          <td className="py-3 px-4"><button onClick={() => cycle(l.id)} className={"text-xs font-bold border rounded-full px-2.5 py-0.5 cursor-pointer hover:opacity-80 " + sc[l.status]}>{l.status}</button></td>
          <td className="py-3 px-4 text-slate-600 hidden sm:table-cell">{l.assignee}</td>
          <td className="py-3 px-4"><div className="flex gap-1"><button onClick={() => setViewId(l.id)} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500"><Eye className="w-4 h-4" /></button><a href={"tel:" + l.phone.replace(/[^0-9]/g, '')} className="p-1.5 rounded-lg hover:bg-green-50 text-slate-400 hover:text-green-500"><Phone className="w-4 h-4" /></a><button onClick={() => del(l.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div></td></tr>))}</tbody></table></div></div>
    <Modal open={modal} onClose={() => setModal(false)} title="سرنخ جدید"><div className="space-y-4">
      <Fld label="نام"><Inp value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></Fld><Fld label="تلفن"><Inp value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} dir="ltr" /></Fld>
      <Fld label="منبع"><Sel value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} options={[{ value: 'وبسایت', label: 'وبسایت' }, { value: 'اینستاگرام', label: 'اینستاگرام' }, { value: 'تلگرام', label: 'تلگرام' }, { value: 'معرفی', label: 'معرفی' }, { value: 'واتساپ', label: 'واتساپ' }]} /></Fld>
      <Fld label="دوره"><Inp value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} /></Fld><Fld label="مسئول"><Inp value={form.assignee} onChange={e => setForm({ ...form, assignee: e.target.value })} /></Fld>
      <button onClick={addLead} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2"><UserPlus className="w-4 h-4" />ثبت</button></div></Modal>
    <Modal open={viewId !== null} onClose={() => setViewId(null)} title="جزئیات سرنخ">{vl && (<div className="space-y-4">
      <div className="grid grid-cols-2 gap-4"><div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">نام</div><div className="text-sm font-bold">{vl.name}</div></div><div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">تلفن</div><div className="text-sm font-bold" dir="ltr">{vl.phone}</div></div><div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">منبع</div><div className="text-sm font-bold">{vl.source}</div></div><div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">دوره</div><div className="text-sm font-bold">{vl.course}</div></div></div>
      <div className="flex gap-2 pt-2"><a href={"tel:" + vl.phone.replace(/[^0-9]/g, '')} className="flex-1 bg-emerald-500 text-white text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-600"><Phone className="w-4 h-4" />تماس</a><a href={"https://wa.me/" + vl.phone.replace(/[^0-9]/g, '')} target="_blank" className="flex-1 bg-green-600 text-white text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-green-700"><MessageSquare className="w-4 h-4" />پیام</a></div>
    </div>)}</Modal>
  </div>);
}

function FinancialTab() {
  const [data, setData] = useState([
    { id: 1, desc: 'شهریه چرتکه مبتدی - سارا احمدی', raw: 2500000, date: '۱۴۰۴/۰۳/۲۰', type: 'درآمد' }, { id: 2, desc: 'حقوق مربی رضایی', raw: 8000000, date: '۱۴۰۴/۰۳/۱۵', type: 'هزینه' },
    { id: 3, desc: 'شهریه حساب ذهنی - محمد رضایی', raw: 2000000, date: '۱۴۰۴/۰۳/۱۹', type: 'درآمد' }, { id: 4, desc: 'اجاره محل آموزشگاه', raw: 15000000, date: '۱۴۰۴/۰۳/۰۱', type: 'هزینه' },
  ]);
  const [modal, setModal] = useState(false); const [form, setForm] = useState({ desc: '', amount: '', type: 'درآمد' });
  const { toast, show } = useToast();
  const toP = (n: number) => n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const inc = data.filter(t => t.type === 'درآمد').reduce((s, t) => s + t.raw, 0);
  const exp = data.filter(t => t.type === 'هزینه').reduce((s, t) => s + t.raw, 0);
  const add = () => {
    if (!form.desc.trim() || !form.amount.trim()) { show('فیلدها الزامی', 'error'); return; }
    const raw = parseInt(form.amount.replace(/[^0-9]/g, '')) || 0;
    setData(p => [...p, { id: Math.max(0, ...p.map(t => t.id)) + 1, desc: form.desc, raw, date: '۱۴۰۴/۰۳/۲۵', type: form.type }]); show('ثبت شد'); setModal(false); setForm({ desc: '', amount: '', type: 'درآمد' });
  };
  const del = (id: number) => { if (confirm('حذف شود؟')) { setData(p => p.filter(t => t.id !== id)); show('حذف شد'); } };

  return (<div className="space-y-6" dir="rtl">{toast && <Toast {...toast} />}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl p-5 border border-gray-100"><div className="text-xs text-slate-400 mb-1">کل درآمد</div><div className="text-2xl font-bold text-emerald-600">{toP(inc)}</div><div className="text-xs text-slate-400 mt-1">تومان</div></div>
      <div className="bg-white rounded-2xl p-5 border border-gray-100"><div className="text-xs text-slate-400 mb-1">کل هزینه</div><div className="text-2xl font-bold text-rose-600">{toP(exp)}</div><div className="text-xs text-slate-400 mt-1">تومان</div></div>
      <div className="bg-white rounded-2xl p-5 border border-gray-100"><div className="text-xs text-slate-400 mb-1">سود خالص</div><div className="text-2xl font-bold text-slate-900">{toP(inc - exp)}</div><div className="text-xs text-slate-400 mt-1">تومان</div></div>
    </div>
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between"><h3 className="text-lg font-bold text-slate-900">تراکنش\u200cها ({data.length})</h3>
        <button onClick={() => setModal(true)} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:shadow-lg hover:shadow-orange-500/20 transition-all"><Plus className="w-4 h-4" />ثبت تراکنش</button></div>
      <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50"><th className="text-right py-3 px-4 font-medium">توضیحات</th><th className="text-right py-3 px-4 font-medium">مبلغ</th><th className="text-right py-3 px-4 font-medium hidden sm:table-cell">نوع</th><th className="text-right py-3 px-4 font-medium">عملیات</th></tr></thead>
        <tbody className="divide-y divide-gray-50">{data.map(t => (<tr key={t.id} className="hover:bg-orange-50/30"><td className="py-3 px-4 text-slate-900 font-medium">{t.desc}</td>
          <td className={"py-3 px-4 font-bold " + (t.type === 'درآمد' ? 'text-emerald-600' : 'text-rose-600')}>{t.type === 'درآمد' ? '+' : '-'}{toP(t.raw)}</td>
          <td className="py-3 px-4 hidden sm:table-cell"><span className={"text-xs font-bold border rounded-full px-2.5 py-0.5 " + (t.type === 'درآمد' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' : 'bg-rose-100 text-rose-600 border-rose-200')}>{t.type}</span></td>
          <td className="py-3 px-4"><button onClick={() => del(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></td></tr>))}</tbody></table></div>
    </div>
    <Modal open={modal} onClose={() => setModal(false)} title="ثبت تراکنش"><div className="space-y-4">
      <Fld label="توضیحات"><Inp value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} /></Fld><Fld label="مبلغ (تومان)"><Inp type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} dir="ltr" /></Fld>
      <Fld label="نوع"><Sel value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} options={[{ value: 'درآمد', label: 'درآمد' }, { value: 'هزینه', label: 'هزینه' }]} /></Fld>
      <button onClick={add} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2"><Save className="w-4 h-4" />ثبت</button></div></Modal>
  </div>);
}

function UsersTab() {
  const [data, setData] = useState([
    { id: 1, name: 'مستر رضایی', role: 'مدیر', phone: '۰۹۱۲۱۱۱۱۱۱', status: 'آنلاین' }, { id: 2, name: 'مستر احمدی', role: 'مربی', phone: '۰۹۳۵۲۲۲۲۲', status: 'آنلاین' }, { id: 3, name: 'مستر کریمی', role: 'مربی', phone: '۰۹۱۰۳۳۳۳', status: 'آفلاین' },
  ]);
  const [modal, setModal] = useState(false); const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', role: 'مربی', phone: '' });
  const { toast, show } = useToast();
  const openAdd = () => { setForm({ name: '', role: 'مربی', phone: '' }); setEditId(null); setModal(true); };
  const openEdit = (u: typeof data[0]) => { setForm({ name: u.name, role: u.role, phone: u.phone }); setEditId(u.id); setModal(true); };
  const save = () => {
    if (!form.name.trim()) { show('نام الزامی', 'error'); return; }
    if (editId) { setData(p => p.map(u => u.id === editId ? { ...u, name: form.name, role: form.role, phone: form.phone } : u)); show('ویرایش شد'); }
    else { setData(p => [...p, { id: Math.max(0, ...p.map(u => u.id)) + 1, ...form, status: 'آفلاین' }]); show('اضافه شد'); }
    setModal(false);
  };
  const del = (id: number) => { if (confirm('حذف شود؟')) { setData(p => p.filter(u => u.id !== id)); show('حذف شد'); } };

  return (<div dir="rtl">{toast && <Toast {...toast} />}
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between"><h3 className="text-lg font-bold text-slate-900">کاربران ({data.length})</h3>
        <button onClick={openAdd} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:shadow-lg hover:shadow-orange-500/20 transition-all"><UserPlus className="w-4 h-4" />افزودن</button></div>
      <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50"><th className="text-right py-3 px-4 font-medium">نام</th><th className="text-right py-3 px-4 font-medium">نقش</th><th className="text-right py-3 px-4 font-medium">وضعیت</th><th className="text-right py-3 px-4 font-medium">عملیات</th></tr></thead>
        <tbody className="divide-y divide-gray-50">{data.map(u => (<tr key={u.id} className="hover:bg-orange-50/30"><td className="py-3 px-4 text-slate-900 font-medium flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold shrink-0">{u.name.charAt(0)}</div>{u.name}</td>
          <td className="py-3 px-4"><span className={"text-xs font-bold border rounded-full px-2.5 py-0.5 " + (u.role === 'مدیر' ? 'bg-purple-100 text-purple-600 border-purple-200' : 'bg-blue-100 text-blue-600 border-blue-200')}>{u.role}</span></td>
          <td className="py-3 px-4"><span className={"text-xs font-bold border rounded-full px-2.5 py-0.5 " + (u.status === 'آنلاین' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200')}>{u.status}</span></td>
          <td className="py-3 px-4"><div className="flex gap-1"><button onClick={() => openEdit(u)} className="p-1.5 rounded-lg hover:bg-orange-50 text-slate-400 hover:text-orange-500"><Edit3 className="w-4 h-4" /></button><button onClick={() => del(u.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div></td></tr>))}</tbody></table></div>
    </div>
    <Modal open={modal} onClose={() => setModal(false)} title={editId ? 'ویرایش کاربر' : 'افزودن کاربر'}><div className="space-y-4">
      <Fld label="نام"><Inp value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></Fld>
      <Fld label="نقش"><Sel value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} options={[{ value: 'مدیر', label: 'مدیر' }, { value: 'مربی', label: 'مربی' }, { value: 'کارشناس', label: 'کارشناس' }, { value: 'بازاریاب', label: 'بازاریاب' }]} /></Fld>
      <Fld label="تلفن"><Inp value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} dir="ltr" /></Fld>
      <button onClick={save} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2"><Save className="w-4 h-4" />ذخیره</button></div></Modal>
  </div>);
}

function SettingsTab() {
  const [saved, setSaved] = useState(false);
  const [g, setG] = useState({ name: 'چرتکه دهگانی ویرا', phone: '۰۲۱-۹۱۳۰۲۵۸۴', email: 'info@bahanvira.ir', address: 'مازندران، محمودآباد، خیابان امام، نسیم ۴' });
  const [s, setS] = useState({ instagram: 'https://instagram.com/bahanvira', telegram: 'https://t.me/bahanvira' });
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
  return (<div className="space-y-6" dir="rtl">{saved && <Toast message="تنظیمات ذخیره شد" type="success" />}
    <div className="bg-white rounded-2xl border border-gray-100 p-6"><h3 className="text-lg font-bold text-slate-900 mb-6">تنظیمات عمومی</h3><div className="space-y-5 max-w-lg">
      <Fld label="نام آموزشگاه"><Inp value={g.name} onChange={e => setG({ ...g, name: e.target.value })} /></Fld>
      <Fld label="شماره تماس"><Inp value={g.phone} onChange={e => setG({ ...g, phone: e.target.value })} dir="ltr" className="text-left" /></Fld>
      <Fld label="ایمیل"><Inp type="email" value={g.email} onChange={e => setG({ ...g, email: e.target.value })} dir="ltr" className="text-left" /></Fld>
      <Fld label="آدرس"><textarea value={g.address} onChange={e => setG({ ...g, address: e.target.value })} rows={2} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 resize-none" /></Fld>
      <button onClick={save} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center gap-2"><Save className="w-4 h-4" />ذخیره تنظیمات</button></div></div>
    <div className="bg-white rounded-2xl border border-gray-100 p-6"><h3 className="text-lg font-bold text-slate-900 mb-6">تنظیمات ارتباطی</h3><div className="space-y-5 max-w-lg">
      <Fld label="لینک اینستاگرام"><Inp value={s.instagram} onChange={e => setS({ ...s, instagram: e.target.value })} dir="ltr" className="text-left" /></Fld>
      <Fld label="لینک تلگرام"><Inp value={s.telegram} onChange={e => setS({ ...s, telegram: e.target.value })} dir="ltr" className="text-left" /></Fld>
      <button onClick={save} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center gap-2"><Save className="w-4 h-4" />ذخیره</button></div></div>
  </div>);
}


export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(sidebarCategories.map(c => [c.title, true]))
  );

  // Check session on mount
  useState(() => {
    fetch('/api/admin/me').then(r => {
      if (r.ok) setIsLoggedIn(true);
    }).catch(() => {});
  });

  const handleLogin = async () => {
    setLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        setLoginError(data.error || 'خطا در ورود');
      }
    } catch {
      setLoginError('خطای شبکه. دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try { await fetch('/api/admin/logout', { method: 'POST' }); } catch {}
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const navigateTo = (key: TabKey) => { setActiveTab(key); setMobileSidebarOpen(false); };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab nav={navigateTo} />;
      case 'students': return <StudentsTab />;
      case 'classes': return <ClassesTab />;
      case 'exams': return <ExamsTab />;
      case 'crm': return <CRMInlineTab />;
      case 'financial': return <FinancialTab />;
      case 'users': return <UsersTab />;
      case 'settings': return <SettingsTab />;
      case 'marketers': return <MarketersTab />;
      case 'agencies': return <AgenciesTab />;
      case 'lms': return <LMSTab />;
      case 'calendar': return <CalendarTab />;
      case 'reports': return <ReportsTab />;
      case 'support': return <SupportTab />;
      case 'files': return <FilesTab />;
      case 'payments': return <PaymentsTab />;
      case 'marketing': return <MarketingTab />;
      case 'emails': return <EmailsTab />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div dir="rtl" className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">
        <div className="bg-[#1a1d2e] rounded-3xl shadow-2xl shadow-black/30 p-8 w-full max-w-sm border border-white/[0.06]">
          <div className="flex justify-center mb-6"><div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30"><Lock className="w-8 h-8 text-white" /></div></div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">ورود به پنل مدیریت</h1>
          <p className="text-sm text-slate-400 text-center mb-8">آموزگاه چرتکه دهگانی ویرا</p>
          <div className="space-y-4"><div>
            <input type="text" value={username} onChange={e => { setUsername(e.target.value); setLoginError(''); }} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="نام کاربری" className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.06] text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/50 text-white placeholder:text-slate-500 transition-all" autoFocus />
          </div><div>
            <input type="password" value={password} onChange={e => { setPassword(e.target.value); setLoginError(''); }} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="رمز عبور" className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.06] text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/50 text-white placeholder:text-slate-500 transition-all" />
            {loginError && <p className="text-red-400 text-xs mt-2 text-center">{loginError}</p>}
          </div>
          <button onClick={handleLogin} disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed">{loading ? 'در حال ورود...' : 'ورود'}</button></div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#f8f9fb] flex">
      {mobileSidebarOpen && <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden" onClick={() => setMobileSidebarOpen(false)} />}
      <aside className={"fixed lg:sticky top-0 right-0 z-50 lg:z-10 h-screen w-72 bg-[#0f1117] border-l border-white/[0.06] flex flex-col transition-transform duration-300 ease-out " + (mobileSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0') + " shadow-2xl lg:shadow-none"}>
        <div className="p-5 border-b border-white/[0.06] flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30"><GraduationCap className="w-5 h-5 text-white" /></div>
          <div className="flex-1 min-w-0"><h2 className="text-sm font-bold text-white truncate">ویرا | چرتکه دهگانی</h2><p className="text-[11px] text-slate-500">پنل مدیریت جامع</p></div>
          <button onClick={() => setMobileSidebarOpen(false)} className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-slate-400"><X className="w-5 h-5" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-3">{sidebarCategories.map(cat => (
          <div key={cat.title} className="mb-2">
            <button onClick={() => setExpandedCategories(p => ({ ...p, [cat.title]: !p[cat.title] }))} className="flex items-center gap-2 w-full px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors rounded-lg hover:bg-white/[0.04]">
              <FolderOpen className="w-4 h-4 text-orange-400/80" /><span className="flex-1 text-right">{cat.title}</span>
              <ChevronDown className={"w-3.5 h-3.5 transition-transform duration-200 " + (expandedCategories[cat.title] ? 'rotate-180' : '')} />
            </button>
            <div className={"overflow-hidden transition-all duration-200 " + (expandedCategories[cat.title] ? 'max-h-96' : 'max-h-0')}>
              {cat.items.map(item => { const I = item.icon; return (
                <button key={item.key} onClick={() => navigateTo(item.key)} className={"flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mb-0.5 " + (activeTab === item.key ? 'bg-orange-500/15 text-orange-400 shadow-sm border border-orange-500/20' : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200')}>
                  <I className={"w-4 h-4 " + (activeTab === item.key ? 'text-orange-400' : 'text-slate-500')} />{item.label}
                </button>); })}
            </div>
          </div>
        ))}</nav>
        <div className="p-4 border-t border-white/[0.06] shrink-0"><button onClick={handleLogout} className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"><LogOut className="w-4 h-4" />خروج از پنل</button></div>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-slate-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
            <h1 className="text-base sm:text-lg font-bold text-slate-800">{sidebarCategories.flatMap(c => c.items).find(i => i.key === activeTab)?.label || 'داشبورد'}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative"><button onClick={() => setShowNotif(!showNotif)} className="relative p-2 rounded-xl hover:bg-orange-50 text-slate-400 hover:text-orange-500 transition-colors"><Bell className="w-5 h-5" /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span></button>{showNotif && (<><div className="fixed inset-0 z-40" onClick={() => setShowNotif(false)} /><div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-2xl border border-gray-100 shadow-2xl z-50 overflow-hidden"><div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between"><span className="text-sm font-bold text-slate-800">اعلان‌ها</span><button onClick={() => setShowNotif(false)} className="text-xs text-orange-500 hover:text-orange-600 font-medium">خواندن همه</button></div><div className="max-h-64 overflow-y-auto divide-y divide-gray-50"><div className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer bg-orange-50/30"><p className="text-xs text-slate-800 font-medium">ثبت‌نام جدید: سارا احمدی</p><p className="text-[10px] text-slate-400 mt-1">۵ دقیقه پیش</p></div><div className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer bg-orange-50/30"><p className="text-xs text-slate-800 font-medium">پرداخت موفق: ۲,۵۰۰,۰۰۰ تومان</p><p className="text-[10px] text-slate-400 mt-1">۳۰ دقیقه پیش</p></div><div className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"><p className="text-xs text-slate-500">تیکت جدید از محمد رضایی</p><p className="text-[10px] text-slate-400 mt-1">۱ ساعت پیش</p></div><div className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"><p className="text-xs text-slate-500">آزمون حساب ذهنی فردا برگزار می‌شود</p><p className="text-[10px] text-slate-400 mt-1">۲ ساعت پیش</p></div></div></div></>)}</div>
            <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">م</div><span className="text-sm font-medium text-slate-700 hidden sm:block">مدیر</span></div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{renderContent()}</main>
      </div>
    </div>
  );
}
