'use client';

import { useState } from 'react';
import { Calendar, Clock, ChevronRight, ChevronLeft, Plus, X, Save, Check, AlertCircle, Trash2 } from 'lucide-react';

interface ScheduleItem {
  id: number;
  time: string;
  class: string;
  instructor: string;
  students: number;
  day: number;
}

interface CalendarEvent {
  id: number;
  day: number;
  month: number;
  class: string;
  time: string;
  instructor: string;
  students: number;
}

const initialEvents: CalendarEvent[] = [
  { id: 1, day: 3, month: 3, class: 'حساب ذهنی ۱', time: '۱۵:۰۰', instructor: 'مستر محمدی', students: 20 },
  { id: 2, day: 5, month: 3, class: 'چرتکه مبتدی - گروه الف', time: '۱۶:۰۰', instructor: 'مستر رضایی', students: 18 },
  { id: 3, day: 7, month: 3, class: 'چرتکه متوسط', time: '۱۷:۰۰', instructor: 'مستر کریمی', students: 12 },
  { id: 4, day: 8, month: 3, class: 'حساب ذهنی ۲', time: '۱۰:۰۰', instructor: 'مستر احمدی', students: 15 },
  { id: 5, day: 10, month: 3, class: 'چرتکه پیشرفته', time: '۱۴:۰۰', instructor: 'مستر نوری', students: 10 },
];

const persianDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
const daysInMonths = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

export default function CalendarTab() {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [currentMonth, setCurrentMonth] = useState(3);
  const [modal, setModal] = useState<'add' | 'view' | 'delete' | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ class: '', time: '', instructor: '', students: 0 });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const daysInMonth = daysInMonths[currentMonth];
  const firstDayOffset = (currentMonth * 2 + 3) % 7;
  const isToday = (day: number) => day === 22 && currentMonth === 3;

  const getEventsForDay = (day: number) => events.filter(e => e.day === day && e.month === currentMonth);
  const todayEvents = getEventsForDay(22);
  const monthEvents = events.filter(e => e.month === currentMonth);

  const prevMonth = () => setCurrentMonth(m => m === 0 ? 11 : m - 1);
  const nextMonth = () => setCurrentMonth(m => m === 11 ? 0 : m + 1);

  const openAdd = (day: number) => { setSelectedDay(day); setForm({ class: '', time: '', instructor: '', students: 0 }); setModal('add'); };
  const openView = (event: CalendarEvent) => { setSelectedEvent(event); setModal('view'); };
  const openDelete = (event: CalendarEvent) => { setSelectedEvent(event); setModal('delete'); };

  const handleSave = () => {
    if (!form.class.trim() || !form.time.trim()) { showToast('لطفا نام کلاس و ساعت را وارد کنید'); return; }
    if (selectedDay !== null) {
      const newEvent: CalendarEvent = { id: Date.now(), day: selectedDay, month: currentMonth, class: form.class, time: form.time, instructor: form.instructor, students: form.students };
      setEvents(prev => [...prev, newEvent]);
      showToast('کلاس جدید به تقویم اضافه شد');
    }
    setModal(null);
  };
  const handleDelete = () => {
    if (selectedEvent) { setEvents(prev => prev.filter(e => e.id !== selectedEvent.id)); showToast('کلاس از تقویم حذف شد'); }
    setModal(null);
  };

  const totalTodayStudents = todayEvents.reduce((s, e) => s + e.students, 0);

  return (
    <div dir="rtl" className="space-y-6 relative">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] bg-slate-800 text-white px-5 py-3 rounded-xl text-sm font-medium shadow-xl flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> {toast}</div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">تقویم کلاس‌ها</h2>
        <button onClick={() => openAdd(22)} className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200">
          <Plus className="w-4 h-4" /> افزودن کلاس جدید
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-slate-400 hover:text-slate-600"><ChevronLeft className="w-5 h-5" /></button>
            <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-orange-500" /><h3 className="text-lg font-bold text-slate-800">{monthNames[currentMonth]} ۱۴۰۴</h3></div>
            <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-slate-400 hover:text-slate-600"><ChevronRight className="w-5 h-5" /></button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">{persianDays.map(d => <div key={d} className="text-center text-xs font-medium text-slate-400 py-2">{d}</div>)}</div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOffset }).map((_, i) => <div key={`e-${i}`} className="aspect-square" />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              const today = isToday(day);
              return (
                <button key={day} onClick={() => dayEvents.length > 0 ? openView(dayEvents[0]) : openAdd(day)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all relative cursor-pointer
                    ${today ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200' : 'hover:bg-gray-50 text-slate-700'}`}>
                  {day}
                  {dayEvents.length > 0 && !today && <span className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />}
                  {dayEvents.length > 0 && today && <span className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-slate-500"><span className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600" /> امروز</div>
            <div className="flex items-center gap-2 text-xs text-slate-500"><span className="w-2 h-2 rounded-full bg-orange-500" /> کلاس برنامه‌ریزی شده</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-bold text-slate-800">برنامه امروز</h3>
            <span className="text-xs text-slate-400 mr-auto">۲۲ تیر ۱۴۰۴</span>
          </div>
          <div className="space-y-4">
            {todayEvents.map(event => (
              <div key={event.id} className="relative pr-6 pb-4 border-r-2 border-orange-200 last:pb-0 last:border-0">
                <div className="absolute -right-[7px] top-0 w-3 h-3 rounded-full bg-orange-500 border-2 border-white" />
                <div className="bg-gray-50/80 rounded-xl p-3.5 hover:bg-orange-50/50 transition-colors cursor-pointer" onClick={() => openView(event)}>
                  <div className="flex items-center gap-2 mb-2"><Clock className="w-3.5 h-3.5 text-orange-500" /><span className="text-xs font-bold text-orange-600">{event.time}</span></div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1.5">{event.class}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{event.instructor}</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">{event.students} نفر</span>
                  </div>
                </div>
              </div>
            ))}
            {todayEvents.length === 0 && <div className="text-center py-8 text-gray-400 text-sm">کلاسی برای امروز برنامه‌ریزی نشده</div>}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
            <div className="bg-orange-50 rounded-xl p-3 text-center"><p className="text-2xl font-bold text-orange-600">{todayEvents.length}</p><p className="text-xs text-slate-500 mt-1">کلاس امروز</p></div>
            <div className="bg-blue-50 rounded-xl p-3 text-center"><p className="text-2xl font-bold text-blue-600">{totalTodayStudents}</p><p className="text-xs text-slate-500 mt-1">دانش‌آموز کل</p></div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modal && <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setModal(null)}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()} dir="rtl">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
            <h3 className="text-base font-bold text-slate-900">{modal === 'add' ? 'افزودن کلاس جدید' : modal === 'view' ? 'مشاهده کلاس' : 'تایید حذف'}</h3>
            <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-5">
            {modal === 'view' && selectedEvent && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">نام کلاس</div><div className="text-sm font-bold">{selectedEvent.class}</div></div>
                  <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">ساعت</div><div className="text-sm font-bold">{selectedEvent.time}</div></div>
                  <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">مدرس</div><div className="text-sm font-bold">{selectedEvent.instructor}</div></div>
                  <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">دانش‌آموز</div><div className="text-sm font-bold">{selectedEvent.students} نفر</div></div>
                  <div className="bg-gray-50 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">تاریخ</div><div className="text-sm font-bold">{selectedEvent.day} {monthNames[selectedEvent.month]} ۱۴۰۴</div></div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => { setModal(null); openDelete(selectedEvent); }} className="flex-1 bg-red-50 text-red-600 py-2.5 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors">حذف کلاس</button>
                </div>
              </div>
            )}
            {modal === 'delete' && selectedEvent && (
              <div className="text-center py-4">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-base font-bold text-slate-800 mb-2">آیا از حذف این کلاس مطمئن هستید؟</p>
                <p className="text-sm text-slate-500">{selectedEvent.class} - {selectedEvent.time}</p>
                <div className="flex gap-3 mt-6 justify-center">
                  <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">بله، حذف شود</button>
                  <button onClick={() => setModal(null)} className="bg-gray-100 hover:bg-gray-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">انصراف</button>
                </div>
              </div>
            )}
            {modal === 'add' && (
              <div className="space-y-4">
                <div className="bg-orange-50 rounded-xl p-3 text-center text-sm text-orange-700 font-medium">تاریخ: {selectedDay} {monthNames[currentMonth]} ۱۴۰۴</div>
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">نام کلاس</label><input type="text" value={form.class} onChange={e => setForm(f => ({ ...f, class: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="مثلا: حساب ذهنی ۱" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">ساعت</label><input type="text" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="۱۵:۰۰" dir="ltr" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">تعداد دانش‌آموز</label><input type="number" value={form.students} onChange={e => setForm(f => ({ ...f, students: Number(e.target.value) }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" /></div>
                </div>
                <div><label className="text-xs font-medium text-slate-500 mb-1.5 block">مدرس</label><input type="text" value={form.instructor} onChange={e => setForm(f => ({ ...f, instructor: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" placeholder="نام مدرس" /></div>
                <button onClick={handleSave} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"><Save className="w-4 h-4" /> ثبت کلاس</button>
              </div>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
}