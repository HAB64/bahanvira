'use client';

import { useState, useMemo } from 'react';
import { Building2, MapPin, Phone, Users, Plus, Eye, Edit3, Trash2, Star, TrendingUp, Globe, X, Save, AlertCircle, Check } from 'lucide-react';

interface Agency {
  id: number;
  name: string;
  city: string;
  manager: string;
  phone: string;
  students: number;
  status: 'فعال' | 'در انتظار تایید' | 'غیرفعال';
}

const initialAgencies: Agency[] = [
  { id: 1, name: 'نمایندگی مشهد', city: 'مشهد', manager: 'مستر نوری', phone: '۰۵۱-۳۷۶۵۴۳۲۱', students: 65, status: 'فعال' },
  { id: 2, name: 'نمایندگی اصفهان', city: 'اصفهان', manager: 'مستر رحیمی', phone: '۰۳۱-۳۴۵۶۷۸۹۰', students: 48, status: 'فعال' },
  { id: 3, name: 'نمایندگی شیراز', city: 'شیراز', manager: 'مستر صادقی', phone: '۰۷۱-۳۲۳۴۵۶۷', students: 35, status: 'فعال' },
  { id: 4, name: 'نمایندگی تبریز', city: 'تبریز', manager: 'مستر قاسمی', phone: '۰۴۱-۳۳۴۵۶۷۸۹', students: 22, status: 'در انتظار تایید' },
  { id: 5, name: 'نمایندگی کرج', city: 'کرج', manager: 'مستر عباسی', phone: '۰۲۶-۳۳۴۵۶۷۸', students: 18, status: 'غیرفعال' },
];

const statusColorMap: Record<string, string> = {
  'فعال': 'bg-emerald-100 text-emerald-600 border-emerald-200',
  'در انتظار تایید': 'bg-amber-100 text-amber-600 border-amber-200',
  'غیرفعال': 'bg-slate-100 text-slate-500 border-slate-200',
};

export default function AgenciesTab() {
  const [agencies, setAgencies] = useState<Agency[]>(initialAgencies);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('همه');
  const [modal, setModal] = useState<'add' | 'edit' | 'view' | 'delete' | null>(null);
  const [selected, setSelected] = useState<Agency | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', city: '', manager: '', phone: '', students: 0, status: 'در انتظار تایید' as Agency['status'] });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const filteredAgencies = useMemo(() => {
    return agencies.filter(a => {
      const ms = search.trim() === '' || a.name.includes(search.trim()) || a.city.includes(search.trim());
      const mf = statusFilter === 'همه' || a.status === statusFilter;
      return ms && mf;
    });
  }, [search, statusFilter, agencies]);

  const topAgencies = useMemo(() => [...agencies].sort((a, b) => b.students - a.students).slice(0, 3), [agencies]);
  const activeCount = agencies.filter(a => a.status === 'فعال').length;
  const cities = [...new Set(agencies.map(a => a.city))].length;
  const totalStudents = agencies.reduce((s, a) => s + a.students, 0);

  const openAdd = () => { setForm({ name: '', city: '', manager: '', phone: '', students: 0, status: 'در انتظار تایید' }); setSelected(null); setModal('add'); };
  const openEdit = (a: Agency) => { setForm({ name: a.name, city: a.city, manager: a.manager, phone: a.phone, students: a.students, status: a.status }); setSelected(a); setModal('edit'); };
  const openView = (a: Agency) => { setSelected(a); setModal('view'); };
  const openDelete = (a: Agency) => { setSelected(a); setModal('delete'); };

  const handleSave = () => {
    if (!form.name.trim() || !form.city.trim()) { showToast('لطفا نام و شهر را وارد کنید'); return; }
    if (modal === 'add') {
      const newA: Agency = { id: Math.max(0, ...agencies.map(a => a.id)) + 1, ...form };
      setAgencies(prev => [newA, ...prev]);
      showToast('نمایندگی جدید ثبت شد');
    } else if (modal === 'edit' && selected) {
      setAgencies(prev => prev.map(a => a.id === selected.id ? { ...a, ...form } : a));
      showToast('نمایندگی به‌روزرسانی شد');
    }
    setModal(null);
  };
  const handleDelete = () => { if (selected) { setAgencies(prev => prev.filter(a => a.id !== selected.id)); showToast('نمایندگی حذف شد'); } setModal(null); };

  const topRankColors = [
    { star: 'text-yellow-500', ring: 'ring-yellow-400', label: 'رتبه اول' },
    { star: 'text-gray-400', ring: 'ring-gray-300', label: 'رتبه دوم' },
    { star: 'text-amber-700', ring: 'ring-amber-600', label: 'رتبه سوم' },
  ];

  const cardColorClasses: Record<string, { bg: string; icon: string; text: string }> = {
    orange: { bg: 'bg-orange-50', icon: 'bg-orange-100 text-orange-500', text: 'text-orange-600' },
    teal: { bg: 'bg-teal-50', icon: 'bg-teal-100 text-teal-500', text: 'text-teal-600' },
    purple: { bg: 'bg-purple-50', icon: 'bg-purple-100 text-purple-500', text: 'text-purple-600' },
    emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-100 text-emerald-500', text: 'text-emerald-600' },
  };

  return (
    <div dir="rtl" className="space-y-8 p-2 md:p-4 relative">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] bg-slate-800 text-white px-5 py-3 rounded-xl text-sm font-medium shadow-xl flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> {toast}</div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'نمایندگی فعال', value: String(activeCount), icon: Building2, color: 'orange' },
          { label: 'شهر تحت پوشش', value: String(cities), icon: MapPin, color: 'teal' },
          { label: 'دانش‌آموز نمایندگی', value: String(totalStudents), icon: Users, color: 'purple' },
          { label: 'میانگین ثبت‌نام', value: agencies.length > 0 ? String(Math.round(totalStudents / agencies.length)) : '۰', icon: TrendingUp, color: 'emerald' },
        ].map(card => {
          const colors = cardColorClasses[card.color]; const Icon = card.icon;
          return (
            <div key={card.label} className={`rounded-2xl border border-gray-100 ${colors.bg} p-5 flex items-center gap-4 shadow-sm`}>
              <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center shrink-0`}><Icon className="w-6 h-6" /></div>
              <div><p className="text-sm text-gray-500">{card.label}</p><p className={`text-2xl font-bold ${colors.text} mt-0.5`}>{card.value}</p></div>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <button onClick={openAdd} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm shrink-0"><Plus className="w-5 h-5" /> ثبت نمایندگی جدید</button>
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input type="text" placeholder="جستجو بر اساس نام یا شهر..." value={search} onChange={e => setSearch(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pe-4 ps-11 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition" />
            <Globe className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition appearance-none cursor-pointer min-w-[160px]">
            <option value="همه">همه وضعیت‌ها</option><option value="فعال">فعال</option><option value="در انتظار تایید">در انتظار تایید</option><option value="غیرفعال">غیرفعال</option>
          </select>
        </div>
      </div>

      {/* Agencies Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredAgencies.map(agency => (
          <div key={agency.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center shrink-0"><Building2 className="w-5 h-5" /></div>
                <div><h3 className="font-bold text-gray-800 text-base leading-tight">{agency.name}</h3><span className="flex items-center gap-1 text-xs text-gray-400 mt-1"><MapPin className="w-3.5 h-3.5" />{agency.city}</span></div>
              </div>
              <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg border cursor-pointer ${statusColorMap[agency.status]}`} onClick={() => { const next = agency.status === 'فعال' ? 'غیرفعال' : 'فعال'; setAgencies(p => p.map(a => a.id === agency.id ? { ...a, status: next as Agency['status'] } : a)); showToast('وضعیت تغییر کرد'); }}>{agency.status}</span>
            </div>
            <div className="space-y-2.5 mb-5 flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-600"><Users className="w-4 h-4 text-gray-400 shrink-0" /><span>مدیر: {agency.manager}</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><Phone className="w-4 h-4 text-gray-400 shrink-0" /><span dir="ltr" className="text-left w-full">{agency.phone}</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><Users className="w-4 h-4 text-gray-400 shrink-0" /><span>دانش‌آموز: <span className="font-semibold text-gray-800">{agency.students}</span> نفر</span></div>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <button onClick={() => openView(agency)} className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-500 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors"><Eye className="w-4 h-4" /> مشاهده</button>
              <button onClick={() => openEdit(agency)} className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"><Edit3 className="w-4 h-4" /> ویرایش</button>
              <button onClick={() => openDelete(agency)} className="inline-flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors mr-auto"><Trash2 className="w-4 h-4" /> حذف</button>
            </div>
          </div>
        ))}
      </div>
      {filteredAgencies.length === 0 && (
        <div className="text-center py-16"><Building2 className="w-14 h-14 text-gray-300 mx-auto mb-4" /><p className="text-gray-500 font-medium">نمایندگی‌ای یافت نشد</p></div>
      )}

      {/* Top Agencies */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2"><Star className="w-5 h-5 text-orange-400" /> برترین نمایندگی‌ها</h2>
        <div className="space-y-4">
          {topAgencies.map((agency, index) => {
            const rank = topRankColors[index];
            return (
              <div key={agency.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${index === 0 ? 'border-yellow-200 bg-yellow-50/60' : index === 1 ? 'border-gray-200 bg-gray-50/60' : 'border-amber-200 bg-amber-50/40'}`}>
                <div className={`w-10 h-10 rounded-full ${rank.ring} ring-2 flex items-center justify-center shrink-0 bg-white`}><Star className={`w-5 h-5 ${rank.star} fill-current`} /></div>
                <div className="flex-1 min-w-0"><p className="font-bold text-gray-800 text-sm">{agency.name}</p><p className="text-xs text-gray-400 mt-0.5">{agency.city}</p></div>
                <div className="text-left shrink-0"><p className="text-lg font-bold text-gray-800">{agency.students}</p><p className="text-xs text-gray-400">{rank.label}</p></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      {modal && <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setModal(null)}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()} dir="rtl">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
            <h3 className="text-base font-bold text-slate-900">{modal === 'add' ? 'ثبت نمایندگی جدید' : modal === 'edit' ? 'ویرایش نمایندگی' : modal === 'view' ? 'مشاهده نمایندگی' : 'تایید حذف'}</h3>
            <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-5">
            {modal === 'view' && selected && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">نام</div><div className="text-sm font-bold">{selected.name}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">شهر</div><div className="text-sm font-bold">{selected.city}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">مدیر</div><div className="text-sm font-bold">{selected.manager}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">تلفن</div><div className="text-sm font-bold" dir="ltr">{selected.phone}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">دانش‌آموز</div><div className="text-sm font-bold">{selected.students} نفر</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">وضعیت</div><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColorMap[selected.status]}`}>{selected.status}</span></div>
              </div>
            )}
            {modal === 'delete' && selected && (
              <div className="text-center py-4">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-base font-bold text-slate-800 mb-2">آیا از حذف نمایندگی مطمئن هستید؟</p>
                <p className="text-sm text-slate-500">{selected.name} - {selected.city}</p>
                <div className="flex gap-3 mt-6 justify-center">
                  <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">بله، حذف شود</button>
                  <button onClick={() => setModal(null)} className="bg-gray-100 hover:bg-gray-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">انصراف</button>
                </div>
              </div>
            )}
            {(modal === 'add' || modal === 'edit') && (
              <div className="space-y-4">
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نام نمایندگی</label><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="مثلا: نمایندگی تهران" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">شهر</label><input type="text" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="شهر" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">مدیر</label><input type="text" value={form.manager} onChange={e => setForm(f => ({ ...f, manager: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="نام مدیر" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">تلفن</label><input type="text" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" dir="ltr" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">وضعیت</label><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Agency['status'] }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer"><option value="فعال">فعال</option><option value="در انتظار تایید">در انتظار تایید</option><option value="غیرفعال">غیرفعال</option></select></div>
                </div>
                <button onClick={handleSave} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"><Save className="w-4 h-4" /> {modal === 'add' ? 'ثبت نمایندگی' : 'به‌روزرسانی'}</button>
              </div>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
}