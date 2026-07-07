import { Instagram, Send, Phone, MapPin, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="rounded-2xl bg-slate-800/50 p-6 border border-slate-700/30">
            <h3 className="text-white text-lg font-extrabold tracking-tight mb-1">
              ویرا | چرتکه دهگانی
            </h3>
            <p className="text-slate-400 text-sm leading-7 mt-4">
              آموزشگاه تخصصی چرتکه دهگانی و حساب ذهنی برای کودکان و نوجوانان
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-5">
              <a
                href="https://instagram.com/bahanvira"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="اینستاگرام"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-700/50 text-slate-400 transition-colors hover:bg-pink-500/20 hover:text-pink-400"
              >
                <Instagram className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://t.me/bahanvira"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تلگرام"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-700/50 text-slate-400 transition-colors hover:bg-sky-500/20 hover:text-sky-400"
              >
                <Send className="h-[18px] w-[18px]" />
              </a>
              <a
                href="tel:09121234567"
                aria-label="تماس تلفنی"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-700/50 text-slate-400 transition-colors hover:bg-emerald-500/20 hover:text-emerald-400"
              >
                <Phone className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="rounded-2xl bg-slate-800/50 p-6 border border-slate-700/30">
            <h4 className="text-white text-sm font-bold mb-5">دسترسی سریع</h4>
            <nav className="space-y-3">
              {[
                { label: "صفحه اصلی", href: "#hero" },
                { label: "دوره‌های آموزشی", href: "#courses" },
                { label: "چرتکه دهگانی ویرا", href: "/abacus" },
                { label: "آزمون آنلاین", href: "/exam" },
                { label: "پنل دانش‌آموز", href: "/portal" },
                { label: "بلاگ", href: "/blog" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-slate-400 hover:text-orange-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Courses */}
          <div className="rounded-2xl bg-slate-800/50 p-6 border border-slate-700/30">
            <h4 className="text-white text-sm font-bold mb-5">دوره‌های آموزشی</h4>
            <nav className="space-y-3">
              {[
                "چرتکه مبتدی (سطح ۱-۳)",
                "چرتکه متوسط (سطح ۴-۶)",
                "چرتکه پیشرفته (سطح ۷-۹)",
                "حساب ذهنی",
                "آمادگی مسابقات",
              ].map((course) => (
                <a
                  key={course}
                  href="#courses"
                  className="block text-sm text-slate-400 hover:text-orange-400 transition-colors"
                >
                  {course}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 4: Contact */}
          <div className="rounded-2xl bg-slate-800/50 p-6 border border-slate-700/30">
            <h4 className="text-white text-sm font-bold mb-5">تماس با ما</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-slate-500" />
                <span className="text-sm text-slate-400 leading-6">
                  تهران، خیابان انقلاب، پلاک ۱۲۳
                </span>
              </div>

              <a
                href="tel:02191302584"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0 text-slate-500" />
                <span dir="ltr">۰۲۱-۹۱۳۰۲۵۸۴</span>
              </a>

              <a
                href="tel:09121234567"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0 text-slate-500" />
                <span dir="ltr">۰۹۱۲۱۲۳۴۵۶۷</span>
              </a>

              <a
                href="mailto:info@bahanvira.ir"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0 text-slate-500" />
                <span dir="ltr">info@bahanvira.ir</span>
              </a>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-slate-500" />
                <span className="text-sm text-slate-400 leading-6">
                  شنبه تا پنجشنبه ۸:۰۰ - ۱۸:۰۰
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            ۱۴۰۵ چرتکه دهگانی ویرا. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <a href="#" className="hover:text-orange-400 transition-colors">
              حریم خصوصی
            </a>
            <span className="text-slate-600">|</span>
            <a href="#" className="hover:text-orange-400 transition-colors">
              قوانین و مقررات
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}