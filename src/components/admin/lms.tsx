'use client';

import { useState } from 'react';
import { BookOpen, Play, FileText, Download, Upload, Plus, Eye, Edit3, Trash2, Clock, Users, CheckCircle, Video, Image, File, X, Save, Check } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  type: string;
  duration: string;
  status: string;
}

interface Course {
  id: number;
  name: string;
  lessons: Lesson[];
}

const initialCourses: Course[] = [
  { id: 1, name: 'چرتکه مبتدی (سطح ۱-۳)', lessons: [
    { id: 1, title: 'آشنایی با چرتکه دهگانی', type: 'ویدیو', duration: '۱۵:۳۰', status: 'فعال' },
    { id: 2, title: 'نحوه حرکت مهره‌ها - جمع', type: 'ویدیو', duration: '۲۲:۰۰', status: 'فعال' },
    { id: 3, title: 'تمرین جمع ساده', type: 'تمرین', duration: '۱۰:۰۰', status: 'فعال' },
    { id: 4, title: 'جزوه سطح ۱', type: 'فایل PDF', duration: '-', status: 'فعال' },
    { id: 5, title: 'نحوه حرکت مهره‌ها - تفریق', type: 'ویدیو', duration: '۲۵:۰۰', status: 'پیش‌نویس' },
  ]},
  { id: 2, name: 'حساب ذهنی ۱', lessons: [
    { id: 6, title: 'تصویرسازی ذهنی چرتکه', type: 'ویدیو', duration: '۱۸:۰۰', status: 'فعال' },
    { id: 7, title: 'تمرین تصویرسازی', type: 'تمرین', duration: '۱۲:۰۰', status: 'فعال' },
    { id: 8, title: 'جمع ذهنی دو رقم', type: 'ویدیو', duration: '۲۰:۰۰', status: 'فعال' },
  ]},
  { id: 3, name: 'چرتکه متوسط (سطح ۴-۶)', lessons: [
    { id: 9, title: 'ضرب مهره‌ای', type: 'ویدیو', duration: '۲۸:۰۰', status: 'فعال' },
    { id: 10, title: 'تقسیم مقدماتی', type: 'ویدیو', duration: '۳۰:۰۰', status: 'پیش‌نویس' },
  ]},
];

function getTypeIcon(type: string) { switch (type) { case 'ویدیو': return <Play className="w-4 h-4" />; case 'فایل PDF': return <FileText className="w-4 h-4" />; case 'تمرین': return <File className="w-4 h-4" />; default: return <File className="w-4 h-4" />; } }
function getTypeBadgeClasses(type: string) { switch (type) { case 'ویدیو': return 'bg-blue-100 text-blue-500'; case 'فایل PDF': return 'bg-rose-100 text-rose-500'; case 'تمرین': return 'bg-amber-100 text-amber-500'; default: return 'bg-gray-100 text-gray-500'; } }
function getStatusClasses(status: string) { switch (status) { case 'فعال': return 'bg-emerald-100 text-emerald-600 border-emerald-200'; case 'پیش‌نویس': return 'bg-amber-100 text-amber-600 border-amber-200'; default: return 'bg-gray-100 text-gray-600 border-gray-200'; } }

export default function LMSTab() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [expandedCourse, setExpandedCourse] = useState<number | null>(0);
  const [modal, setModal] = useState<'addCourse' | 'addLesson' | 'editLesson' | 'viewLesson' | 'deleteLesson' | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', type: 'ویدیو', duration: '', status: 'پیش‌نویس' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const totalLessons = courses.reduce((s, c) => s + c.lessons.length, 0);
  const activeLessons = courses.reduce((s, c) => s + c.lessons.filter(l => l.status === 'فعال').length, 0);

  const toggleCourse = (index: number) => { setExpandedCourse(prev => prev === index ? null : index); };

  const openAddCourse = () => { setForm({ name: '', type: 'ویدیو', duration: '', status: 'پیش‌نویس' }); setModal('addCourse'); };
  const openAddLesson = (courseId: number) => { setSelectedCourseId(courseId); setForm({ name: '', type: 'ویدیو', duration: '', status: 'پیش‌نویس' }); setModal('addLesson'); };
  const openEditLesson = (courseId: number, lesson: Lesson) => { setSelectedCourseId(courseId); setSelectedLesson(lesson); setForm({ name: lesson.title, type: lesson.type, duration: lesson.duration, status: lesson.status }); setModal('editLesson'); };
  const openViewLesson = (lesson: Lesson) => { setSelectedLesson(lesson); setModal('viewLesson'); };
  const openDeleteLesson = (courseId: number, lesson: Lesson) => { setSelectedCourseId(courseId); setSelectedLesson(lesson); setModal('deleteLesson'); };

  const handleSaveCourse = () => {
    if (!form.name.trim()) { showToast('لطفا نام دوره را وارد کنید'); return; }
    const newCourse: Course = { id: Math.max(0, ...courses.map(c => c.id)) + 1, name: form.name, lessons: [] };
    setCourses(prev => [...prev, newCourse]);
    showToast('دوره جدید اضافه شد');
    setModal(null);
  };

  const handleSaveLesson = () => {
    if (!form.name.trim()) { showToast('لطفا عنوان درس را وارد کنید'); return; }
    if (modal === 'addLesson' && selectedCourseId !== null) {
      const newLesson: Lesson = { id: Date.now(), title: form.name, type: form.type, duration: form.duration || '-', status: form.status };
      setCourses(prev => prev.map(c => c.id === selectedCourseId ? { ...c, lessons: [...c.lessons, newLesson] } : c));
      showToast('درس جدید اضافه شد');
    } else if (modal === 'editLesson' && selectedCourseId !== null && selectedLesson) {
      setCourses(prev => prev.map(c => c.id === selectedCourseId ? { ...c, lessons: c.lessons.map(l => l.id === selectedLesson.id ? { ...l, title: form.name, type: form.type, duration: form.duration || '-', status: form.status } : l) } : c));
      showToast('درس به‌روزرسانی شد');
    }
    setModal(null);
  };

  const handleDeleteLesson = () => {
    if (selectedCourseId !== null && selectedLesson) {
      setCourses(prev => prev.map(c => c.id === selectedCourseId ? { ...c, lessons: c.lessons.filter(l => l.id !== selectedLesson.id) } : c));
      showToast('درس حذف شد');
    }
    setModal(null);
  };

  const toggleLessonStatus = (courseId: number, lessonId: number) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, lessons: c.lessons.map(l => l.id === lessonId ? { ...l, status: l.status === 'فعال' ? 'پیش‌نویس' : 'فعال' } : l) } : c));
    showToast('وضعیت درس تغییر کرد');
  };

  return (
    <div dir="rtl" className="space-y-6 relative">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] bg-slate-800 text-white px-5 py-3 rounded-xl text-sm font-medium shadow-xl flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> {toast}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'دوره فعال', value: String(courses.length), icon: BookOpen, bgClass: 'bg-orange-50', iconBgClass: 'bg-orange-100', iconTextClass: 'text-orange-500', valueClass: 'text-orange-600' },
          { label: 'جلسه آموزشی', value: String(totalLessons), icon: Play, bgClass: 'bg-teal-50', iconBgClass: 'bg-teal-100', iconTextClass: 'text-teal-500', valueClass: 'text-teal-600' },
          { label: 'درس فعال', value: String(activeLessons), icon: FileText, bgClass: 'bg-purple-50', iconBgClass: 'bg-purple-100', iconTextClass: 'text-purple-500', valueClass: 'text-purple-600' },
          { label: 'نرخ تکمیل', value: totalLessons > 0 ? Math.round((activeLessons / totalLessons) * 100) + '٪' : '۰٪', icon: CheckCircle, bgClass: 'bg-emerald-50', iconBgClass: 'bg-emerald-100', iconTextClass: 'text-emerald-500', valueClass: 'text-emerald-600' },
        ].map(card => {
          const IconComponent = card.icon;
          return (
            <div key={card.label} className={`${card.bgClass} rounded-2xl border border-gray-100 p-5 flex items-center gap-4 transition-shadow hover:shadow-md`}>
              <div className={`${card.iconBgClass} ${card.iconTextClass} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}><IconComponent className="w-6 h-6" /></div>
              <div><p className="text-sm text-gray-500 mb-0.5">{card.label}</p><p className={`text-2xl font-bold ${card.valueClass}`}>{card.value}</p></div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">مدیریت محتوای دوره‌ها</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">{courses.length} دوره · {totalLessons} درس</span>
            <button onClick={openAddCourse} className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-xl text-xs font-medium transition-colors"><Plus className="w-3.5 h-3.5" /> دوره جدید</button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {courses.map((course, courseIndex) => {
            const isExpanded = expandedCourse === courseIndex;
            return (
              <div key={course.id}>
                <button onClick={() => toggleCourse(courseIndex)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0"><BookOpen className="w-5 h-5 text-white" /></div>
                    <div className="text-right"><h3 className="font-semibold text-gray-800 text-sm">{course.name}</h3><p className="text-xs text-gray-400 mt-0.5">{course.lessons.length} درس</p></div>
                  </div>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-4">
                    <div className="flex justify-end mb-3">
                      <button onClick={() => openAddLesson(course.id)} className="flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-medium bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors"><Plus className="w-3.5 h-3.5" /> افزودن درس</button>
                    </div>
                    <div className="bg-gray-50/70 rounded-xl overflow-hidden border border-gray-100">
                      <table className="w-full text-sm">
                        <thead><tr className="text-gray-500 text-xs border-b border-gray-100">
                          <th className="text-right font-medium px-4 py-3">عنوان</th><th className="text-right font-medium px-4 py-3">نوع</th><th className="text-right font-medium px-4 py-3">مدت</th><th className="text-right font-medium px-4 py-3">وضعیت</th><th className="text-center font-medium px-4 py-3">عملیات</th>
                        </tr></thead>
                        <tbody>
                          {course.lessons.map(lesson => (
                            <tr key={lesson.id} className="border-b border-gray-100 last:border-b-0 hover:bg-white transition-colors">
                              <td className="px-4 py-3 font-medium text-gray-700"><div className="flex items-center gap-2.5"><span className="text-xs text-gray-400 w-5 shrink-0">{course.lessons.indexOf(lesson) + 1}</span>{lesson.title}</div></td>
                              <td className="px-4 py-3"><span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${getTypeBadgeClasses(lesson.type)}`}>{getTypeIcon(lesson.type)}{lesson.type}</span></td>
                              <td className="px-4 py-3"><span className="inline-flex items-center gap-1 text-gray-500 text-xs"><Clock className="w-3.5 h-3.5" />{lesson.duration}</span></td>
                              <td className="px-4 py-3">
                                <button onClick={() => toggleLessonStatus(course.id, lesson.id)} className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${getStatusClasses(lesson.status)}`}>{lesson.status}</button>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center justify-center gap-1">
                                  <button onClick={() => openViewLesson(lesson)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"><Eye className="w-4 h-4" /></button>
                                  <button onClick={() => openEditLesson(course.id, lesson)} className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"><Edit3 className="w-4 h-4" /></button>
                                  <button onClick={() => openDeleteLesson(course.id, lesson)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {course.lessons.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-xs">هنوز درسی اضافه نشده</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div><h3 className="font-bold text-gray-800 mb-1">بارگذاری محتوا</h3><p className="text-sm text-gray-400">ویدیو، فایل PDF یا تمرین جدید به دوره‌ها اضافه کنید</p></div>
          <button onClick={() => { if (courses.length > 0) openAddLesson(courses[0].id); else showToast('ابتدا یک دوره ایجاد کنید'); }} className="inline-flex items-center gap-2 bg-gradient-to-l from-indigo-500 to-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-[0.97]"><Upload className="w-4 h-4" /> بارگذاری محتوای جدید</button>
        </div>
      </div>

      {/* MODAL */}
      {modal && <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setModal(null)}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()} dir="rtl">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
            <h3 className="text-base font-bold text-slate-900">{modal === 'addCourse' ? 'دوره جدید' : modal === 'addLesson' ? 'افزودن درس' : modal === 'editLesson' ? 'ویرایش درس' : modal === 'viewLesson' ? 'مشاهده درس' : 'تایید حذف'}</h3>
            <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-5">
            {modal === 'viewLesson' && selectedLesson && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">عنوان</div><div className="text-sm font-bold">{selectedLesson.title}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">نوع</div><span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${getTypeBadgeClasses(selectedLesson.type)}`}>{getTypeIcon(selectedLesson.type)}{selectedLesson.type}</span></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">مدت</div><div className="text-sm font-bold">{selectedLesson.duration}</div></div>
                <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">وضعیت</div><span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusClasses(selectedLesson.status)}`}>{selectedLesson.status}</span></div>
              </div>
            )}
            {modal === 'deleteLesson' && selectedLesson && (
              <div className="text-center py-4">
                <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-base font-bold text-slate-800 mb-2">آیا از حذف درس مطمئن هستید؟</p>
                <p className="text-sm text-slate-500">{selectedLesson.title}</p>
                <div className="flex gap-3 mt-6 justify-center">
                  <button onClick={handleDeleteLesson} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">بله، حذف شود</button>
                  <button onClick={() => setModal(null)} className="bg-gray-100 hover:bg-gray-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">انصراف</button>
                </div>
              </div>
            )}
            {modal === 'addCourse' && (
              <div className="space-y-4">
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نام دوره</label><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="مثلا: حساب ذهنی ۲" /></div>
                <button onClick={handleSaveCourse} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"><Save className="w-4 h-4" /> ثبت دوره</button>
              </div>
            )}
            {(modal === 'addLesson' || modal === 'editLesson') && (
              <div className="space-y-4">
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">عنوان درس</label><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="عنوان درس" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نوع</label><select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer"><option value="ویدیو">ویدیو</option><option value="فایل PDF">فایل PDF</option><option value="تمرین">تمرین</option></select></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">مدت</label><input type="text" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="مثلا: ۲۰:۰۰" dir="ltr" /></div>
                </div>
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">وضعیت</label><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer"><option value="فعال">فعال</option><option value="پیش‌نویس">پیش‌نویس</option></select></div>
                <button onClick={handleSaveLesson} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"><Save className="w-4 h-4" /> {modal === 'addLesson' ? 'افزودن درس' : 'به‌روزرسانی'}</button>
              </div>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
}