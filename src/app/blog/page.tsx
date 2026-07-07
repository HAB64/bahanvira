'use client'

import { BookOpen, Clock, ArrowLeft, Calendar, Tag } from 'lucide-react'
import Header from '@/components/sections/header'
import Footer from '@/components/sections/footer'

const gradients = [
  'from-amber-600/30 to-orange-800/20',
  'from-emerald-600/30 to-teal-800/20',
  'from-rose-600/30 to-pink-800/20',
  'from-violet-600/30 to-purple-800/20',
  'from-sky-600/30 to-cyan-800/20',
  'from-lime-600/30 to-green-800/20',
]

const featuredGradient = 'from-amber-500/25 via-orange-600/20 to-red-700/15'

const blogPosts = [
  {
    title: 'چرتکه دهگانی چیست و چرا بهتر از چرتکه معمولی است؟',
    date: '۱۰ خرداد ۱۴۰۴',
    readTime: '۵ دقیقه مطالعه',
    category: 'آموزشی',
    gradient: gradients[0],
  },
  {
    title: 'نکاتی برای انتخاب بهترین آموزشگاه چرتکه',
    date: '۵ خرداد ۱۴۰۴',
    readTime: '۴ دقیقه مطالعه',
    category: 'راهنما',
    gradient: gradients[1],
  },
  {
    title: 'چگونه در مسابقات چرتکه موفق شویم؟',
    date: '۲۸ اردیبهشت ۱۴۰۴',
    readTime: '۶ دقیقه مطالعه',
    category: 'مسابقات',
    gradient: gradients[2],
  },
  {
    title: 'ترکیب چرتکه و بازی برای آموزش کودکان',
    date: '۲۰ اردیبهشت ۱۴۰۴',
    readTime: '۵ دقیقه مطالعه',
    category: 'آموزشی',
    gradient: gradients[3],
  },
  {
    title: 'گزارش مسابقات ملی چرتکه ۱۴۰۴',
    date: '۱۵ اردیبهشت ۱۴۰۴',
    readTime: '۳ دقیقه مطالعه',
    category: 'اخبار',
    gradient: gradients[4],
  },
  {
    title: 'آشنایی با روش‌های نوین آموزش حساب ذهنی',
    date: '۱۰ اردیبهشت ۱۴۰۴',
    readTime: '۷ دقیقه مطالعه',
    category: 'آموزشی',
    gradient: gradients[5],
  },
]

export default function BlogPage() {
  return (
    <div dir="rtl" className="pt-24 pb-16 bg-[#f9fafb] min-h-screen text-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 bg-gradient-to-l from-amber-400 to-orange-300 bg-clip-text text-transparent">
            وبلاگ ویرا
          </h1>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
            مقالات آموزشی و اخبار چرتکه و حساب ذهنی
          </p>
        </section>

        {/* Featured Post */}
        <section className="mb-12">
          <article className="glass-card rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:border-amber-500/30">
            <div
              className={`h-64 bg-gradient-to-br ${featuredGradient} relative flex items-center justify-center`}
            >
              <BookOpen className="w-16 h-16 text-amber-400/40 group-hover:text-amber-400/60 transition-colors duration-300" />
              <span className="absolute top-4 right-4 bg-orange-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                ویژه
              </span>
            </div>
            <div className="p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-relaxed group-hover:text-amber-200 transition-colors duration-300">
                ۱۰ فایده شگفت‌انگیز آموزش چرتکه برای کودکان
              </h2>
              <p className="text-slate-500 text-sm leading-7 mb-4">
                تحقیقات علمی نشان می‌دهد که آموزش چرتکه تأثیرات عمیقی بر رشد شناختی کودکان دارد. در این مقاله به ۱۰ فایده اصلی...
              </p>
              <div className="flex items-center gap-4 text-slate-500 text-xs">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  ۱۵ خرداد ۱۴۰۴
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  ۸ دقیقه مطالعه
                </span>
              </div>
            </div>
          </article>
        </section>

        {/* Blog Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-amber-500/25"
            >
              <div
                className={`h-44 bg-gradient-to-br ${post.gradient} relative flex items-center justify-center`}
              >
                <BookOpen className="w-12 h-12 text-slate-900/25 group-hover:text-slate-900/40 transition-colors duration-300" />
                <span className="absolute top-3 right-3 bg-teal-500/80 text-slate-900 text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-slate-900 mb-3 leading-7 group-hover:text-amber-200 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-3 text-slate-500 text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Pagination */}
        <nav className="flex items-center justify-center gap-2" aria-label="صفحه‌بندی">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                page === 1
                  ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/25'
                  : 'glass-card text-slate-500 hover:text-slate-900 hover:border-amber-500/30'
              }`}
              aria-current={page === 1 ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
          <button
            className="h-10 px-4 rounded-xl text-sm font-semibold glass-card text-slate-500 hover:text-slate-900 hover:border-amber-500/30 transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
            aria-label="صفحه بعدی"
          >
            بعدی
            <ArrowLeft className="w-4 h-4" />
          </button>
        </nav>
      </main>

      <Footer />
    </div>
  )
}