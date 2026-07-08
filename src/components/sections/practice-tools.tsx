"use client";

import { Brain, Timer, BarChart3, Gamepad2, Headphones, MonitorSmartphone, ArrowLeft } from "lucide-react";

const tools = [
  { icon: Timer, title: "تایمر تمرین هوشمند", description: "تایمر قابل تنظیم برای تمرین‌های روزانه با قابلیت تنظیم فاصله استراحت و نمایش آمار عملکرد هر جلسه تمرین.", color: "#2F80ED", bgColor: "bg-blue-500/10" },
  { icon: Brain, title: "آزمون‌های ذهنی", description: "مجموعه‌ای از آزمون‌های محاسباتی با سطح‌بندی خودکار. سوالات بر اساس عملکرد شما تطبیق پیدا می‌کنند.", color: "#8B5CF6", bgColor: "bg-purple-500/10" },
  { icon: BarChart3, title: "داشبورد پیشرفت", description: "نمودارهای دقیق از پیشرفت شما در طول زمان. رصد سرعت، دقت و نقاط قوت و ضعف به صورت بصری و جذاب.", color: "#6366F1", bgColor: "bg-indigo-500/10" },
  { icon: Gamepad2, title: "بازی‌های آموزشی", description: "گیمیفیکیشن فرآیند یادگیری با بازی‌های جذاب. کسب امتیاز، باز کردن مراحل جدید و رقابت با دوستان.", color: "#F2994A", bgColor: "bg-orange-500/10" },
  { icon: Headphones, title: "تمرین شنیداری", description: "تمرین محاسبات با روش شنیداری مشابه مسابقات واقعی. اعداد به صورت صوتی پخش و پاسخ ثبت می‌شود.", color: "#A855F7", bgColor: "bg-fuchsia-500/10" },
  { icon: MonitorSmartphone, title: "اپلیکیشن موبایل", description: "تمرین در هر زمان و مکان با اپلیکیشن اختصاصی. همگام‌سازی خودکار پیشرفت بین تمام دستگاه‌ها.", color: "#2F80ED", bgColor: "bg-sky-500/10" },
];

export default function PracticeTools() {
  return (
    <section className="section-creative relative overflow-hidden py-20 sm:py-24" dir="rtl">
      <div className="pointer-events-none absolute -top-24 right-[5%] h-[400px] w-[400px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-24 left-[10%] h-[350px] w-[350px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #2F80ED 0%, transparent 70%)" }} />
      <div className="animate-float pointer-events-none absolute top-20 left-[12%] h-4 w-4 rounded-full bg-[#8B5CF6]/25" />
      <div className="animate-float-slow pointer-events-none absolute top-36 right-[8%] h-5 w-5 rounded-lg bg-[#2F80ED]/20 rotate-12" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 sm:mb-16 text-center">
          <span className="section-badge">ابزارهای تمرین</span>
          <h2 className="section-heading">تمرین هوشمند، پیشرفت سریع‌تر</h2>
          <p className="section-subheading mx-auto max-w-2xl">ابزارهای دیجیتال متنوع برای تمرین روزانه و پیگیری پیشرفت. یادگیری چرتکه هرگز این‌قدر جذاب نبوده است.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div key={index} className="premium-card group relative overflow-hidden p-7">
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `linear-gradient(135deg, ${tool.color}08 0%, transparent 60%)` }} />
                <div className="relative">
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${tool.bgColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon size={26} style={{ color: tool.color }} />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-[#102A43]">{tool.title}</h3>
                  <p className="mb-5 text-sm leading-7 text-[#718096]">{tool.description}</p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ color: tool.color, transform: "translateX(-8px)" }}>
                    <span>کشف کنید</span>
                    <ArrowLeft size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-14 flex flex-col items-center text-center">
          <p className="mb-4 text-sm text-[#718096]">و تمامی این ابزارها به‌صورت رایگان در اختیار دانش‌آموزان ما قرار دارد</p>
          <a href="#register" className="btn-purple">شروع تمرین رایگان</a>
        </div>
      </div>
    </section>
  );
}