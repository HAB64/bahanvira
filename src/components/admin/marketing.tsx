'use client';

import { useState } from 'react';
import { TrendingUp, Send, Mail, Globe, Plus, Eye, Edit3, Trash2, X, Save, Check, AlertCircle } from 'lucide-react';

type CampaignStatus = 'فعال' | 'متوقف' | 'تکمیل شده';

interface Campaign {
  id: number;
  name: string;
  type: string;
  status: CampaignStatus;
  reach: string;
  impression: string;
  budget: string;
}

interface Template {
  id: number;
  name: string;
  type: string;
  usage: number;
}

const initialCampaigns: Campaign[] = [
  { id: 1, name: 'کمپین تابستانه چرتکه', type: 'اینستاگرام', status: 'فعال', reach: '۱۲,۵۰۰', impression: '۳۵,۰۰۰', budget: '۲,۰۰۰,۰۰۰' },
  { id: 2, name: 'جشنواره ثبت‌نام', type: 'تلگرام', status: 'فعال', reach: '۸,۳۰۰', impression: '۲۲,۰۰۰', budget: '۱,۰۰۰,۰۰۰' },
  { id: 3, name: 'محتوای آموزشی وبسایت', type: 'وبسایت', status: 'فعال', reach: '۱۵,۲۰۰', impression: '۴۵,۰۰۰', budget: '۱,۵۰۰,۰۰۰' },
  { id: 4, name: 'کارگاه حضوری مسابقات', type: 'حضوری', status: 'متوقف', reach: '۳,۸۰۰', impression: '۸,۰۰۰', budget: '۸۰۰,۰۰۰' },
  { id: 5, name: 'کمپین نوروزی', type: 'اینستاگرام', status: 'تکمیل شده', reach: '۱۸,۰۰۰', impression: '۵۲,۰۰۰', budget: '۲,۵۰۰,۰۰۰' },
];

const initialTemplates: Template[] = [
  { id: 1, name: 'ثبت‌نام جدید', type: 'ایمیل', usage: 45 },
  { id: 2, name: 'یادآوری پرداخت', type: 'پیامک', usage: 89 },
  { id: 3, name: 'اطلاع‌رسانی کلاس', type: 'ایمیل', usage: 67 },
];

const statusColors: Record<CampaignStatus, string> = { 'فعال': 'border-emerald-200 text-emerald-700 bg-emerald-50', 'متوقف': 'border-amber-200 text-amber-700 bg-amber-50', 'تکمیل شده': 'border-slate-200 text-slate-600 bg-slate-50' };
const typeIcons: Record<string, { icon: typeof Globe; color: string; bg: string }> = {
  'اینستاگرام': { icon: Globe, color: 'text-pink-500', bg: 'bg-pink-50' },
  'تلگرام': { icon: Send, color: 'text-blue-500', bg: 'bg-blue-50' },
  'وبسایت': { icon: Globe, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  'حضوری': { icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
};
const statusCycle: Record<CampaignStatus, CampaignStatus> = { 'فعال': 'متوقف', 'متوقف': 'فعال', 'تکمیل شده': 'فعال' };

export default function MarketingTab() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [modal, setModal] = useState<'addCampaign' | 'editCampaign' | 'viewCampaign' | 'deleteCampaign' | 'addTemplate' | 'editTemplate' | 'deleteTemplate' | null>(null);
  const [selected, setSelected] = useState<Campaign | Template | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [cForm, setCForm] = useState({ name: '', type: 'اینستاگرام', status: 'فعال' as CampaignStatus, reach: '۰', impression: '۰', budget: '' });
  const [tForm, setTForm] = useState({ name: '', type: 'ایمیل' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const openAddCampaign = () => { setCForm({ name: '', type: 'اینستاگرام', status: 'فعال', reach: '۰', impression: '۰', budget: '' }); setSelected(null); setModal('addCampaign'); };
  const openEditCampaign = (c: Campaign) => { setCForm({ name: c.name, type: c.type, status: c.status, reach: c.reach, impression: c.impression, budget: c.budget }); setSelected(c); setModal('editCampaign'); };
  const openViewCampaign = (c: Campaign) => { setSelected(c); setModal('viewCampaign'); };
  const openDeleteCampaign = (c: Campaign) => { setSelected(c); setModal('deleteCampaign'); };
  const openAddTemplate = () => { setTForm({ name: '', type: 'ایمیل' }); setModal('addTemplate'); };
  const openEditTemplate = (t: Template) => { setTForm({ name: t.name, type: t.type }); setSelected(t); setModal('editTemplate'); };
  const openDeleteTemplate = (t: Template) => { setSelected(t); setModal('deleteTemplate'); };

  const handleSaveCampaign = () => {
    if (!cForm.name.trim()) { showToast('لطفا نام کمپین را وارد کنید'); return; }
    if (modal === 'addCampaign') {
      setCampaigns(prev => [...prev, { id: Date.now(), ...cForm }]);
      showToast('کمپین جدید ثبت شد');
    } else if (modal === 'editCampaign' && selected) {
      setCampaigns(prev => prev.map(c => c.id === (selected as Campaign).id ? { ...c, ...cForm } : c));
      showToast('کمپین به‌روزرسانی شد');
    }
    setModal(null);
  };

  const handleDeleteCampaign = () => { if (selected) { setCampaigns(prev => prev.filter(c => c.id !== (selected as Campaign).id)); showToast('کمپین حذف شد'); } setModal(null); };
  const handleSaveTemplate = () => {
    if (!tForm.name.trim()) { showToast('لطفا نام قالب را وارد کنید'); return; }
    if (modal === 'addTemplate') {
      setTemplates(prev => [...prev, { id: Date.now(), name: tForm.name, type: tForm.type, usage: 0 }]);
      showToast('قالب جدید ثبت شد');
    } else if (modal === 'editTemplate' && selected) {
      setTemplates(prev => prev.map(t => t.id === (selected as Template).id ? { ...t, ...tForm } : t));
      showToast('قالب به‌روزرسانی شد');
    }
    setModal(null);
  };
  const handleDeleteTemplate = () => { if (selected) { setTemplates(prev => prev.filter(t => t.id !== (selected as Template).id)); showToast('قالب حذف شد'); } setModal(null); };
  const cycleCampaignStatus = (c: Campaign) => { setCampaigns(prev => prev.map(x => x.id === c.id ? { ...x, status: statusCycle[x.status] } : x)); showToast('وضعیت کمپین تغییر کرد'); };

  const isCampaignModal = modal === 'addCampaign' || modal === 'editCampaign' || modal === 'viewCampaign' || modal === 'deleteCampaign';
  const selCampaign = isCampaignModal ? selected as Campaign | null : null;

  return (
    <div dir="rtl" className="space-y-6 relative">
      {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] bg-slate-800 text-white px-5 py-3 rounded-xl text-sm font-medium shadow-xl flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> {toast}</div>}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">بازاریابی و کمپین‌ها</h2>
        <button onClick={openAddCampaign} className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200"><Plus className="w-4 h-4" /> کمپین جدید</button>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4"><TrendingUp className="w-5 h-5 text-orange-500" /><h3 className="text-sm font-bold text-slate-800">کمپین‌ها</h3></div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {campaigns.map(campaign => {
            const iconConfig = typeIcons[campaign.type] || typeIcons['وبسایت']; const TypeIcon = iconConfig.icon;
            return (
              <div key={campaign.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${iconConfig.bg} rounded-xl flex items-center justify-center`}><TypeIcon className={`w-5 h-5 ${iconConfig.color}`} /></div>
                    <div><h4 className="text-sm font-bold text-slate-800">{campaign.name}</h4><span className="text-xs text-slate-400">{campaign.type}</span></div>
                  </div>
                  <button onClick={() => cycleCampaignStatus(campaign)} className={`text-xs font-bold border rounded-full px-2.5 py-0.5 cursor-pointer transition-colors hover:opacity-80 ${statusColors[campaign.status]}`}>{campaign.status}</button>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-gray-50/80 rounded-xl p-2.5 text-center"><p className="text-sm font-bold text-slate-800">{campaign.reach}</p><p className="text-[10px] text-slate-400 mt-0.5">بازدید</p></div>
                  <div className="bg-gray-50/80 rounded-xl p-2.5 text-center"><p className="text-sm font-bold text-slate-800">{campaign.impression}</p><p className="text-[10px] text-slate-400 mt-0.5">نمایش</p></div>
                  <div className="bg-gray-50/80 rounded-xl p-2.5 text-center"><p className="text-sm font-bold text-slate-800">{campaign.budget}</p><p className="text-[10px] text-slate-400 mt-0.5">بودجه</p></div>
                </div>
                <div className="flex items-center justify-end gap-1 pt-3 border-t border-gray-50">
                  <button onClick={() => openViewCampaign(campaign)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-600 transition-colors"><Eye className="w-4 h-4" /></button>
                  <button onClick={() => openEditCampaign(campaign)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-orange-500 transition-colors"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => openDeleteCampaign(campaign)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2"><Mail className="w-5 h-5 text-orange-500" /><h3 className="text-sm font-bold text-slate-800">قالب‌های پیام</h3></div>
          <button onClick={openAddTemplate} className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"><Plus className="w-4 h-4" /> قالب جدید</button>
        </div>
        <div className="space-y-3">
          {templates.map(template => (
            <div key={template.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${template.type === 'ایمیل' ? 'bg-blue-50' : 'bg-emerald-50'}`}>
                  {template.type === 'ایمیل' ? <Mail className="w-4 h-4 text-blue-500" /> : <Send className="w-4 h-4 text-emerald-500" />}
                </div>
                <div><h4 className="text-sm font-medium text-slate-800">{template.name}</h4><span className="text-xs text-slate-400">{template.type} • {template.usage} ارسال</span></div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEditTemplate(template)} className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-orange-500 transition-colors"><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => showToast('قالب ارسال شد: ' + template.name)} className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-blue-500 transition-colors"><Send className="w-4 h-4" /></button>
                <button onClick={() => openDeleteTemplate(template)} className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {modal && <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setModal(null)}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()} dir="rtl">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
            <h3 className="text-base font-bold text-slate-900">{modal === 'addCampaign' ? 'کمپین جدید' : modal === 'editCampaign' ? 'ویرایش کمپین' : modal === 'viewCampaign' ? 'مشاهده کمپین' : modal === 'deleteCampaign' ? 'تایید حذف' : modal === 'addTemplate' ? 'قالب جدید' : modal === 'editTemplate' ? 'ویرایش قالب' : 'تایید حذف'}</h3>
            <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-5">
            {modal === 'viewCampaign' && selCampaign && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">نام</div><div className="text-sm font-bold">{selCampaign.name}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">نوع</div><div className="text-sm font-bold">{selCampaign.type}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">بازدید</div><div className="text-sm font-bold">{selCampaign.reach}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">نمایش</div><div className="text-sm font-bold">{selCampaign.impression}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">بودجه</div><div className="text-sm font-bold">{selCampaign.budget} تومان</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">وضعیت</div><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[selCampaign.status]}`}>{selCampaign.status}</span></div>
              </div>
            )}
            {(modal === 'deleteCampaign') && selCampaign && (
              <div className="text-center py-4"><AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" /><p className="text-base font-bold text-slate-800 mb-2">آیا از حذف کمپین مطمئن هستید؟</p><p className="text-sm text-slate-500">{selCampaign.name}</p><div className="flex gap-3 mt-6 justify-center"><button onClick={handleDeleteCampaign} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">بله</button><button onClick={() => setModal(null)} className="bg-gray-100 hover:bg-gray-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">انصراف</button></div></div>
            )}
            {(modal === 'deleteTemplate') && selected && (
              <div className="text-center py-4"><AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" /><p className="text-base font-bold text-slate-800 mb-2">آیا از حذف قالب مطمئن هستید؟</p><p className="text-sm text-slate-500">{(selected as Template).name}</p><div className="flex gap-3 mt-6 justify-center"><button onClick={handleDeleteTemplate} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">بله</button><button onClick={() => setModal(null)} className="bg-gray-100 hover:bg-gray-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">انصراف</button></div></div>
            )}
            {(modal === 'addCampaign' || modal === 'editCampaign') && (
              <div className="space-y-4">
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نام کمپین</label><input type="text" value={cForm.name} onChange={e => setCForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نوع</label><select value={cForm.type} onChange={e => setCForm(f => ({ ...f, type: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer"><option value="اینستاگرام">اینستاگرام</option><option value="تلگرام">تلگرام</option><option value="وبسایت">وبسایت</option><option value="حضوری">حضوری</option></select></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">وضعیت</label><select value={cForm.status} onChange={e => setCForm(f => ({ ...f, status: e.target.value as CampaignStatus }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer"><option value="فعال">فعال</option><option value="متوقف">متوقف</option><option value="تکمیل شده">تکمیل شده</option></select></div>
                </div>
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">بودجه (تومان)</label><input type="text" value={cForm.budget} onChange={e => setCForm(f => ({ ...f, budget: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" dir="ltr" /></div>
                <button onClick={handleSaveCampaign} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"><Save className="w-4 h-4" /> {modal === 'addCampaign' ? 'ثبت کمپین' : 'به‌روزرسانی'}</button>
              </div>
            )}
            {(modal === 'addTemplate' || modal === 'editTemplate') && (
              <div className="space-y-4">
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نام قالب</label><input type="text" value={tForm.name} onChange={e => setTForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="نام قالب" /></div>
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نوع</label><select value={tForm.type} onChange={e => setTForm(f => ({ ...f, type: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer"><option value="ایمیل">ایمیل</option><option value="پیامک">پیامک</option></select></div>
                <button onClick={handleSaveTemplate} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"><Save className="w-4 h-4" /> {modal === 'addTemplate' ? 'ثبت قالب' : 'به‌روزرسانی'}</button>
              </div>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
}