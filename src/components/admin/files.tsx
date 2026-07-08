'use client';

import { useState } from 'react';
import { Upload, FileText, Play, Image, Download, Trash2, Search, Plus, X, Save, Check, Eye } from 'lucide-react';

type FileType = 'pdf' | 'video' | 'image';

interface FileItem {
  id: number;
  name: string;
  type: FileType;
  size: string;
  date: string;
  uploader: string;
}

const initialFiles: FileItem[] = [
  { id: 1, name: 'جزوه سطح ۱.pdf', type: 'pdf', size: '2.5 MB', date: '۱۴۰۴/۰۳/۲۰', uploader: 'مستر رضایی' },
  { id: 2, name: 'ویدیو آموزش جمع.mp4', type: 'video', size: '125 MB', date: '۱۴۰۴/۰۳/۱۹', uploader: 'مستر احمدی' },
  { id: 3, name: 'نمونه سوالات آزمون.pdf', type: 'pdf', size: '1.8 MB', date: '۱۴۰۴/۰۳/۱۸', uploader: 'مستر کریمی' },
  { id: 4, name: 'تصویر تمرین چرتکه.jpg', type: 'image', size: '800 KB', date: '۱۴۰۴/۰۳/۱۷', uploader: 'مستر محمدی' },
  { id: 5, name: 'ویدیو آموزش ضرب.mp4', type: 'video', size: '98 MB', date: '۱۴۰۴/۰۳/۱۶', uploader: 'مستر رضایی' },
  { id: 6, name: 'راهنمای ثبت‌نام.pdf', type: 'pdf', size: '3.2 MB', date: '۱۴۰۴/۰۳/۱۵', uploader: 'مدیر سیستم' },
];

const typeIcons: Record<FileType, { icon: typeof FileText; color: string; bg: string }> = {
  pdf: { icon: FileText, color: 'text-red-500', bg: 'bg-red-50' },
  video: { icon: Play, color: 'text-blue-500', bg: 'bg-blue-50' },
  image: { icon: Image, color: 'text-emerald-500', bg: 'bg-emerald-50' },
};

const typeLabels: Record<FileType, string> = { pdf: 'PDF', video: 'ویدیو', image: 'تصویر' };

export default function FilesTab() {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModal] = useState<'add' | 'view' | 'delete' | null>(null);
  const [selected, setSelected] = useState<FileItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', type: 'pdf' as FileType, size: '', uploader: '' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const filteredFiles = files.filter(f => f.name.includes(searchQuery));

  const openAdd = () => { setForm({ name: '', type: 'pdf', size: '', uploader: '' }); setModal('add'); };
  const openView = (f: FileItem) => { setSelected(f); setModal('view'); };
  const openDelete = (f: FileItem) => { setSelected(f); setModal('delete'); };

  const handleSave = () => {
    if (!form.name.trim()) { showToast('لطفا نام فایل را وارد کنید'); return; }
    const newFile: FileItem = { id: Date.now(), name: form.name, type: form.type, size: form.size || 'نامشخص', date: '۱۴۰۴/۰۳/۲۲', uploader: form.uploader || 'مدیر سیستم' };
    setFiles(prev => [newFile, ...prev]);
    showToast('فایل جدید اضافه شد');
    setModal(null);
  };
  const handleDelete = () => { if (selected) { setFiles(prev => prev.filter(f => f.id !== selected.id)); showToast('فایل حذف شد'); } setModal(null); };

  const handleSimulatedDownload = (f: FileItem) => { showToast('دانلود فایل ' + f.name + ' شروع شد'); };

  return (
    <div dir="rtl" className="space-y-6 relative">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] bg-slate-800 text-white px-5 py-3 rounded-xl text-sm font-medium shadow-xl flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> {toast}</div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">مدیریت فایل‌ها</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200"><Plus className="w-4 h-4" /> آپلود فایل جدید</button>
      </div>

      <div onClick={openAdd} className="bg-white rounded-2xl border-2 border-dashed border-orange-200 p-10 text-center hover:border-orange-400 hover:bg-orange-50/30 transition-all cursor-pointer group">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-100 transition-colors"><Upload className="w-7 h-7 text-orange-500" /></div>
          <div><p className="text-sm font-medium text-slate-700">فایل‌ها را اینجا بکشید و رها کنید</p><p className="text-xs text-slate-400 mt-1">یا <span className="text-orange-500 font-medium">انتخاب فایل</span> را بزنید</p></div>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder="جستجوی فایل..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-white rounded-xl border border-gray-100 pr-11 pl-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map(file => {
          const typeConfig = typeIcons[file.type]; const TypeIcon = typeConfig.icon;
          return (
            <div key={file.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all group">
              <div className="flex items-start gap-3.5">
                <div className={`w-11 h-11 ${typeConfig.bg} rounded-xl flex items-center justify-center shrink-0`}><TypeIcon className={`w-5 h-5 ${typeConfig.color}`} /></div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-slate-800 truncate">{file.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-bold border rounded-full px-2 py-0.5 ${typeConfig.color} ${typeConfig.bg}`}>{typeLabels[file.type]}</span>
                    <span className="text-xs text-slate-400">{file.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                <div className="text-xs text-slate-400"><span>{file.uploader}</span><span className="mx-1.5">•</span><span>{file.date}</span></div>
                <div className="flex items-center gap-1 opacity-100 transition-opacity">
                  <button onClick={() => openView(file)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-blue-500 transition-colors"><Eye className="w-4 h-4" /></button>
                  <button onClick={() => handleSimulatedDownload(file)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-blue-500 transition-colors"><Download className="w-4 h-4" /></button>
                  <button onClick={() => openDelete(file)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {filteredFiles.length === 0 && <div className="text-center py-16"><FileText className="w-14 h-14 text-gray-300 mx-auto mb-4" /><p className="text-gray-500 font-medium">فایلی یافت نشد</p></div>}

      {/* MODAL */}
      {modal && <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setModal(null)}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()} dir="rtl">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
            <h3 className="text-base font-bold text-slate-900">{modal === 'add' ? 'آپلود فایل جدید' : modal === 'view' ? 'مشاهده فایل' : 'تایید حذف'}</h3>
            <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-5">
            {modal === 'view' && selected && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">نام فایل</div><div className="text-sm font-bold">{selected.name}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">نوع</div><span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${typeIcons[selected.type].color} ${typeIcons[selected.type].bg}`}>{typeLabels[selected.type]}</span></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">حجم</div><div className="text-sm font-bold">{selected.size}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">تاریخ</div><div className="text-sm font-bold">{selected.date}</div></div>
                <div className="bg-gray-50 rounded-xl p-4 col-span-2"><div className="text-xs text-slate-400 mb-1">آپلودکننده</div><div className="text-sm font-bold">{selected.uploader}</div></div>
              </div>
            )}
            {modal === 'delete' && selected && (
              <div className="text-center py-4">
                <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-base font-bold text-slate-800 mb-2">آیا از حذف فایل مطمئن هستید؟</p>
                <p className="text-sm text-slate-500">{selected.name}</p>
                <div className="flex gap-3 mt-6 justify-center">
                  <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">بله، حذف شود</button>
                  <button onClick={() => setModal(null)} className="bg-gray-100 hover:bg-gray-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">انصراف</button>
                </div>
              </div>
            )}
            {modal === 'add' && (
              <div className="space-y-4">
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نام فایل</label><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="نام فایل" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نوع</label><select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as FileType }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer"><option value="pdf">PDF</option><option value="video">ویدیو</option><option value="image">تصویر</option></select></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">حجم</label><input type="text" value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="مثلا: 5 MB" dir="ltr" /></div>
                </div>
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">آپلودکننده</label><input type="text" value={form.uploader} onChange={e => setForm(f => ({ ...f, uploader: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="نام" /></div>
                <button onClick={handleSave} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"><Save className="w-4 h-4" /> ذخیره فایل</button>
              </div>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
}