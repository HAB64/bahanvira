import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Send,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground text-lg font-bold">
                و
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight text-foreground">ویرا</span>
                <span className="text-[10px] text-muted-foreground leading-tight">چرتکه دهگانی ویرا</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              آموزش تخصصی چرتکه دهگانی و حساب ذهنی برای کودکان و نوجوانان با بهره‌گیری از جدیدترین روش‌های آموزشی و اساتید مجرب. هدف ما پرورش نسل توانمند و خلاق در زمینه ریاضیات است.
            </p>
            <div className="mt-4 flex gap-2">
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-pink-500 hover:text-white">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-sky-500 hover:text-white">
                <Send className="h-4 w-4" />
              </a>
              <a href="https://wa.me/989111277194" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-emerald-500 hover:text-white">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4">دسترسی سریع</h4>
            <nav className="space-y-2.5">
              {[
                { label: "صفحه اصلی", href: "#hero" },
                { label: "دوره‌ها", href: "#courses" },
                { label: "درباره ما", href: "#why" },
                { label: "سوالات متداول", href: "#faq" },
                { label: "تماس با ما", href: "#contact" },
              ].map((link) => (
                <a key={link.href} href={link.href} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Course Links */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4">دوره‌های آموزشی</h4>
            <nav className="space-y-2.5">
              {["چرتکه مقدماتی","حساب ذهنی متوسط","چرتکه پیشرفته","آمادگی مسابقات"].map((c) => (
                <a key={c} href="#courses" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {c}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4">تماس با ما</h4>
            <div className="space-y-3">
              <a href="tel:01144746441" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span dir="ltr">01144746441</span>
              </a>
              <a href="tel:09111277194" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span dir="ltr">09111277194</span>
              </a>
              <a href="mailto:info@vira-abacus.ir" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4 flex-shrink-0" />
                info@vira-abacus.ir
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>مازندران، محمودآباد، خیابان امام، کوچه آسیاب (نسیم ۴)، انتهای کوچه</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}