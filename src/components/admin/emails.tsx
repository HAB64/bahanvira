'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Plus, Eye, Edit3, Send, Search, X, Save, Check, AlertCircle, Trash2 } from 'lucide-react';

type TemplateType = 'ایمیل' | 'پیامک';

interface Template {
  id: number;
  name: string;
  type: TemplateType;
  usage: number;
  lastUsed: string;
  content?: string;
}

const initialTemplates: Template[] = [
  { id: 1, name: 'خوش‌آمدگویی ثبت‌نام', type: 'ایمیل', usage: 45, lastUsed: '۱۴۰۴/۰۳/۲۰', content: 'سلام {name} عزیز، به خانواده چرتکه دهگانی ویرا خوش آمدید!' },
  { id: 2, name: 'یادآوری پرداخت', type: 'پیامک', usage: 23, lastUsed: '۱۴۰۴/۰۳/۱۹', content: 'با سلام، یادآوری می‌شود شهریه ماهانه شما سررسید شده است.' },
  { id: 3, name: 'اطلاع‌رسانی کلاس', type: 'ایمیل', usage: 67, lastUsed: '۱۴۰۴/۰۳/۲۱', content: 'کلاس {class} فردا ساعت {time} برگزار می‌شود.' },
  { id: 4, name: 'نتیجه آزمون', type: 'ایمیل', usage: 38, lastUsed: '۱۴۰۴/۰۳/۱۸', content: 'نتیجه آزمون {exam} شما: نمره {score}' },
  { id: 5, name: 'تبریک فارغ‌التحصیلی', type: 'ایمیل', usage: 12, lastUsed: '۱۴۰۴/۰۳/۱۵', content: 'تبریک! شما با موفقیت دوره {course} را با نمره {score} گذراندید.' },
  { id: 6, name: 'یادآوری جلسه', type: 'پیامک', usage: 89, lastUsed: '۱۴۰۴/۰۳/۲۲', content: 'یادآوری: جلسه {class} فردا ساعت {time} برگزار می‌شود.' },
];

const typeColors: Record<TemplateType, { color: string; bg: string; iconBg: string }> = {
  'ایمیل': { color: 'border-blue-200 text-blue-700 bg-blue-50', bg: 'bg-blue-50', iconBg: 'bg-blue-500' },
  'پیامک': { color: 'border-emerald-200 text-emerald-700 bg-emerald-50', bg: 'bg-emerald-50', iconBg: 'bg-emerald-500' },
};

export default function EmailsTab() {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('همه');
  const [modal, setModal] = useState<'add' | 'view' | 'edit' | 'delete' | 'preview' | null>(null);
  const [selected, setSelected] = useState<Template | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', type: 'ایمیل' as TemplateType, content: '' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const filteredTemplates = templates.filter(t => {
    const ms = t.name.includes(searchQuery);
    const mf = activeFilter === 'همه' || t.type === activeFilter;
    return ms && mf;
  });

  const openAdd = () => { setForm({ name: '', type: 'ایمیل', content: '' }); setSelected(null); setModal('add'); };
  const openEdit = (t: Template) => { setForm({ name: t.name, type: t.type, content: t.content || '' }); setSelected(t); setModal('edit'); };
  const openView = (t: Template) => { setSelected(t); setModal('view'); };
  const openPreview = (t: Template) => { setSelected(t); setModal('preview'); };
  const openDelete = (t: Template) => { setSelected(t); setModal('delete'); };

  const handleSave = () => {
    if (!form.name.trim()) { showToast('لطفا نام قالب را وارد کنید'); return; }
    if (modal === 'add') {
      setTemplates(prev => [...prev, { id: Date.now(), name: form.name, type: form.type, usage: 0, lastUsed: '۱۴۰۴/۰۳/۲۲', content: form.content }]);
      showToast('قالب جدید ثبت شد');
    } else if (modal === 'edit' && selected) {
      setTemplates(prev => prev.map(t => t.id === selected.id ? { ...t, ...form } : t));
      showToast('قالب به‌روزرسانی شد');
    }
    setModal(null);
  };
  const handleDelete = () => { if (selected) { setTemplates(prev => prev.filter(t => t.id !== selected.id)); showToast('قالب حذف شد'); } setModal(null); };

  return (
    <div dir="rtl" className="space-y-6 relative">
      {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] bg-slate-800 text-white px-5 py-3 rounded-xl text-sm font-medium shadow-xl flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> {toast}</div>}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">مدیریت قالب‌های پیام</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200"><Plus className="w-4 h-4" /> قالب جدید</button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="جستجوی قالب..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-white rounded-xl border border-gray-100 pr-11 pl-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all" />
        </div>
        <div className="flex items-center gap-2">
          {['همه', 'ایمیل', 'پیامک'].map(option => (
            <button key={option} onClick={() => setActiveFilter(option)} className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${activeFilter === option ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200' : 'bg-white border border-gray-100 text-slate-500 hover:bg-gray-50'}`}>{option}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map(template => {
          const config = typeColors[template.type];
          return (
            <div key={template.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${config.bg} rounded-xl flex items-center justify-center`}>
                    {template.type === 'ایمیل' ? <Mail className="w-5 h-5 text-blue-500" /> : <MessageSquare className="w-5 h-5 text-emerald-500" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{template.name}</h4>
                    <span className={`inline-block text-[10px] font-bold border rounded-full px-2 py-0.5 mt-1 ${config.color}`}>{template.type}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50/80 rounded-xl p-2.5 text-center"><p className="text-sm font-bold text-slate-800">{template.usage}</p><p className="text-[10px] text-slate-400 mt-0.5">دفعات استفاده</p></div>
                <div className="bg-gray-50/80 rounded-xl p-2.5 text-center"><p className="text-xs font-bold text-slate-800">{template.lastUsed}</p><p className="text-[10px] text-slate-400 mt-0.5">آخرین استفاده</p></div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-50">
                <button onClick={() => openPreview(template)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-slate-500 hover:text-slate-700 text-xs font-medium transition-colors"><Eye className="w-3.5 h-3.5" /> پیش‌نمایش</button>
                <button onClick={() => openEdit(template)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-orange-50 text-slate-500 hover:text-orange-600 text-xs font-medium transition-colors"><Edit3 className="w-3.5 h-3.5" /> ویرایش</button>
                <button onClick={() => { showToast('قالب ارسال شد: ' + template.name); }} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors"><Send className="w-4 h-4" /></button>
                <button onClick={() => openDelete(template)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
      {filteredTemplates.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4"><Search className="w-7 h-7 text-slate-300" /></div>
          <p className="text-sm font-medium text-slate-500">قالبی یافت نشد</p>
        </div>
      )}

      {/* MODAL */}
      {modal && <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setModal(null)}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()} dir="rtl">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
            <h3 className="text-base font-bold text-slate-900">{modal === 'add' ? 'قالب جدید' : modal === 'edit' ? 'ویرایش قالب' : modal === 'view' ? 'مشاهده قالب' : modal === 'preview' ? 'پیش‌نمایش' : 'تایید حذف'}</h3>
            <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-5">
            {(modal === 'view' || modal === 'preview') && selected && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">نام</div><div className="text-sm font-bold">{selected.name}</div></div>
                  <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">نوع</div><span className={`inline-block text-xs font-bold border rounded-full px-2.5 py-0.5 ${typeColors[selected.type].color}`}>{selected.type}</span></div>
                  <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">دفعات استفاده</div><div className="text-sm font-bold">{selected.usage}</div></div>
                  <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">آخرین استفاده</div><div className="text-sm font-bold">{selected.lastUsed}</div></div>
                </div>
                {selected.content && (
                  <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-2">محتوای قالب</div><div className="bg-white rounded-lg p-3 border border-gray-100 text-sm text-slate-700 leading-relaxed">{selected.content}</div></div>
                )}
              </div>
            )}
            {modal === 'delete' && selected && (
              <div className="text-center py-4">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-base font-bold text-slate-800 mb-2">آیا از حذف قالب مطمئن هستید؟</p>
                <p className="text-sm text-slate-500">{selected.name}</p>
                <div className="flex gap-3 mt-6 justify-center">
                  <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">بله، حذف شود</button>
                  <button onClick={() => setModal(null)} className="bg-gray-100 hover:bg-gray-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">انصراف</button>
                </div>
              </div>
            )}
            {(modal === 'add' || modal === 'edit') && (
              <div className="space-y-4">
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نام قالب</label><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="نام قالب" /></div>
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نوع</label><select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as TemplateType }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer"><option value="ایمیل">ایمیل</option><option value="پیامک">پیامک</option></select></div>
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">محتوا</label><textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 h-32 resize-none" placeholder="متن قالب..." /></div>
                <button onClick={handleSave} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"><Save className="w-4 h-4" /> {modal === 'add' ? 'ثبت قالب' : 'به‌روزرسانی'}</button>
              </div>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
}