'use client'

import { useState } from 'react'
import { Calendar, Clock, ChevronRight, ChevronLeft, Plus } from 'lucide-react'

const persianDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']

const scheduleItems = [
  { time: '۱۵:۰۰', class: 'حساب ذهنی ۱', instructor: 'مستر محمدی', students: 20 },
  { time: '۱۶:۰۰', class: 'چرتکه مبتدی - گروه الف', instructor: 'مستر رضایی', students: 18 },
  { time: '۱۷:۰۰', class: 'چرتکه متوسط', instructor: 'مستر کریمی', students: 12 },
]

const scheduledDays = [3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 21, 22, 24, 25, 26, 28, 29]

const monthNames = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
]

export default function CalendarTab() {
  const [currentMonth, setCurrentMonth] = useState(3) // تیر

  const daysInMonth = 31
  const firstDayOffset = 4 // Start from Thursday (index 4 in week)

  const prevMonth = () => setCurrentMonth((m) => (m === 0 ? 11 : m - 1))
  const nextMonth = () => setCurrentMonth((m) => (m === 11 ? 0 : m + 1))

  const hasClass = (day: number) => scheduledDays.includes(day)
  const isToday = (day: number) => day === 22

  return (
    <div dir="rtl" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">تقویم کلاس‌ها</h2>
        <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200">
          <Plus className="w-4 h-4" />
          افزودن کلاس جدید
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={nextMonth}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-slate-400 hover:text-slate-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-bold text-slate-800">
                {monthNames[currentMonth]} ۱۴۰۴
              </h3>
            </div>
            <button
              onClick={prevMonth}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-slate-400 hover:text-slate-600"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {persianDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-slate-400 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for offset */}
            {Array.from({ length: firstDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const hasClassToday = hasClass(day)
              const today = isToday(day)

              return (
                <button
                  key={day}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all relative
                    ${today
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200'
                      : 'hover:bg-gray-50 text-slate-700'
                    }
                  `}
                >
                  {day}
                  {hasClassToday && !today && (
                    <span className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600" />
              امروز
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              کلاس برنامه‌ریزی شده
            </div>
          </div>
        </div>

        {/* Today's Schedule Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-bold text-slate-800">برنامه امروز</h3>
            <span className="text-xs text-slate-400 mr-auto">۲۲ تیر ۱۴۰۴</span>
          </div>

          <div className="space-y-4">
            {scheduleItems.map((item, index) => (
              <div
                key={index}
                className="relative pr-6 pb-4 border-r-2 border-orange-200 last:pb-0 last:border-0"
              >
                {/* Time dot */}
                <div className="absolute -right-[7px] top-0 w-3 h-3 rounded-full bg-orange-500 border-2 border-white" />

                <div className="bg-gray-50/80 rounded-xl p-3.5 hover:bg-orange-50/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <span className="text-xs font-bold text-orange-600">{item.time}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1.5">{item.class}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{item.instructor}</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                      {item.students} نفر
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-orange-600">۳</p>
              <p className="text-xs text-slate-500 mt-1">کلاس امروز</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">۵۰</p>
              <p className="text-xs text-slate-500 mt-1">دانش‌آموز کل</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}