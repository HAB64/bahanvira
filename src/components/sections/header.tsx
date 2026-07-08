"use client";

import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  User,
  LogIn,
  ChevronDown,
  GraduationCap,
  Sparkles,
  Zap,
} from "lucide-react";

const navLinks = [
  { label: "صفحه اصلی", href: "/" },
  { label: "دوره‌ها", href: "/courses", hasDropdown: true },
  { label: "چرتکه دهگانی", href: "/abacus" },
  { label: "آزمون آنلاین", href: "/exam" },
  { label: "پنل دانش‌آموز", href: "/portal" },
  { label: "وبلاگ", href: "/blog", comingSoon: true },
  { label: "تماس با ما", href: "/#contact" },
];

const courseDropdownItems = [
  { label: "دوره‌های چرتکه", href: "/courses?type=abacus", emoji: "🧮" },
  { label: "دوره‌های حساب ذهنی", href: "/courses?type=mental", emoji: "🧠" },
  { label: "آمادگی مسابقات", href: "/courses?type=competition", emoji: "🏆" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        dir="rtl"
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          scrolled ? "glass-header shadow-sm" : "bg-transparent"
        }`}
      >
        {/* Gradient bottom border */}
        <div
          className={`absolute bottom-0 right-0 left-0 h-px transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(47,128,237,0.25) 20%, rgba(139,92,246,0.2) 50%, rgba(39,174,96,0.2) 80%, transparent 100%)" }}
        />

        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Logo ────────────────────────────────── */}
          <a href="/" className="flex items-center gap-3 shrink-0 group">
            <div className={`relative flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-lg transition-all duration-500 ${scrolled ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/25" : "bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/20 group-hover:shadow-blue-500/30"}`}>
              <GraduationCap className="h-5 w-5" strokeWidth={2} />
              <div className="absolute -top-0.5 -left-0.5 h-3 w-3 rounded-full bg-[#27AE60] border-2 border-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className={`text-[15px] font-extrabold leading-tight tracking-tight transition-colors duration-500 ${scrolled ? "text-[#102A43]" : "text-[#102A43]"}`}>
                ویرا | چرتکه دهگانی
              </span>
              <span className={`text-[11px] leading-tight font-medium transition-colors duration-500 ${scrolled ? "text-[#718096]" : "text-[#718096]/80"}`}>
                آموزش چرتکه و حساب ذهنی
              </span>
            </div>
          </a>

          {/* ── Desktop Navigation ─────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.href} className="relative" onMouseEnter={handleDropdownEnter} onMouseLeave={handleDropdownLeave}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="relative text-[13.5px] font-semibold rounded-xl transition-all duration-300 px-4 py-2.5 flex items-center gap-1.5 text-[#4A5568] hover:text-[#2F80ED] hover:bg-[#2F80ED]/[0.06]"
                  >
                    {link.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown */}
                  <div className={`absolute top-full right-0 mt-2 w-60 rounded-2xl border border-[#E8EDF3]/80 bg-white/95 backdrop-blur-2xl shadow-xl shadow-[#102A43]/[0.08] py-2 transition-all duration-300 origin-top-right ${dropdownOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-1.5 pointer-events-none"}`}>
                    <div className="px-4 pb-2 mb-1 border-b border-[#E8EDF3]/60">
                      <p className="text-[11px] font-bold text-[#A0AEC0] uppercase tracking-wider">دسته‌بندی دوره‌ها</p>
                    </div>
                    {courseDropdownItems.map((item) => (
                      <a key={item.href} href={item.href} className="flex items-center gap-3 text-sm font-medium text-[#4A5568] hover:text-[#2F80ED] hover:bg-[#2F80ED]/[0.04] px-4 py-2.5 transition-all duration-200">
                        <span className="text-base">{item.emoji}</span>
                        <span>{item.label}</span>
                      </a>
                    ))}
                    <div className="mt-1 mx-3 pt-2 border-t border-[#E8EDF3]/60">
                      <a href="/courses" className="flex items-center justify-center gap-2 text-xs font-bold text-[#2F80ED] py-2 hover:text-[#1A6DD1] transition-colors">
                        <Sparkles size={13} />
                        مشاهده همه دوره‌ها
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <a key={link.href} href={link.href} className="relative text-[13.5px] font-semibold rounded-xl transition-all duration-300 px-4 py-2.5 flex items-center gap-1.5 text-[#4A5568] hover:text-[#2F80ED] hover:bg-[#2F80ED]/[0.06]">
                  {link.label}
                  {link.comingSoon && (
                    <span className="text-[10px] font-bold bg-[#8B5CF6]/[0.08] text-[#8B5CF6] rounded-full px-2.5 py-0.5 leading-none border border-[#8B5CF6]/[0.12] flex items-center gap-1">
                      <Zap size={9} />
                      به‌زودی
                    </span>
                  )}
                </a>
              )
            )}
          </nav>

          {/* ── Desktop Actions ────────────────────── */}
          <div className="hidden lg:flex items-center gap-2">
            <a href="tel:02191302584" className="flex items-center gap-1.5 text-[12px] font-medium text-[#A0AEC0] hover:text-[#2F80ED] transition-colors duration-300 px-2.5 py-2 rounded-lg" dir="ltr">
              <Phone className="h-3.5 w-3.5" />
              ۰۲۱-۹۱۳۰۲۵۸۴
            </a>

            <div className="h-5 w-px bg-[#E8EDF3] mx-1" />

            <a href="/portal" className="flex items-center gap-1.5 text-[13px] font-semibold text-[#4A5568] hover:text-[#2F80ED] transition-all duration-300 px-4 py-2.5 rounded-xl hover:bg-[#2F80ED]/[0.06]">
              <LogIn className="h-4 w-4" />
              ورود
            </a>

            <a href="/portal?tab=register" className="inline-flex items-center justify-center gap-2 font-bold text-[13px] px-6 py-2.5 rounded-xl text-white transition-all duration-300 bg-gradient-to-l from-blue-500 to-blue-600 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 hover:from-blue-600 hover:to-blue-700 hover:-translate-y-0.5">
              <User className="h-4 w-4" />
              ثبت‌نام
            </a>
          </div>

          {/* ── Mobile Hamburger ──────────────────── */}
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl text-[#4A5568] hover:bg-[#2F80ED]/[0.06] transition-all duration-300" aria-label="باز کردن منو">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* ═══ MOBILE MENU ═══ */}
      <div className={`fixed inset-0 z-[60] bg-[#102A43]/[0.3] backdrop-blur-md transition-all duration-500 lg:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setMobileMenuOpen(false)} />

      <div dir="rtl" className={`fixed top-0 right-0 z-[70] h-full w-[300px] bg-[#F8FBFF]/[0.97] backdrop-blur-2xl shadow-2xl shadow-[#102A43]/[0.12] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden flex flex-col ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Panel Header */}
        <div className="flex items-center justify-between px-5 h-[68px] border-b border-[#E8EDF3]/60">
          <a href="/" className="flex items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/25">
              <GraduationCap className="h-4.5 w-4.5" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-[#102A43] leading-tight">ویرا | چرتکه دهگانی</span>
              <span className="text-[10px] font-medium text-[#718096] leading-tight">آموزش چرتکه و حساب ذهنی</span>
            </div>
          </a>
          <button type="button" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center h-9 w-9 rounded-xl text-[#718096] hover:bg-[#2F80ED]/[0.06] hover:text-[#2F80ED] transition-all duration-300" aria-label="بستن منو">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Panel Nav */}
        <nav className="flex-1 overflow-y-auto py-3">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.href}>
                <button type="button" onClick={() => setMobileDropdownOpen((prev) => !prev)} className="flex items-center justify-between w-full text-[14px] font-semibold text-[#4A5568] hover:text-[#2F80ED] hover:bg-[#2F80ED]/[0.04] px-5 py-3.5 transition-all duration-300">
                  <span>{link.label}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 text-[#A0AEC0] ${mobileDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${mobileDropdownOpen ? "max-h-36" : "max-h-0"}`}>
                  {courseDropdownItems.map((item) => (
                    <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 text-[13px] font-medium text-[#718096] hover:text-[#2F80ED] hover:bg-[#2F80ED]/[0.04] pr-9 pl-5 py-3 transition-all duration-300">
                      <span className="text-sm">{item.emoji}</span>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-[14px] font-semibold text-[#4A5568] hover:text-[#2F80ED] hover:bg-[#2F80ED]/[0.04] px-5 py-3.5 transition-all duration-300">
                <span>{link.label}</span>
                {link.comingSoon && (
                  <span className="text-[10px] font-bold bg-[#8B5CF6]/[0.08] text-[#8B5CF6] rounded-full px-2.5 py-0.5 leading-none border border-[#8B5CF6]/[0.12] flex items-center gap-1">
                    <Zap size={9} />
                    به‌زودی
                  </span>
                )}
              </a>
            )
          )}
        </nav>

        {/* Panel Footer */}
        <div className="border-t border-[#E8EDF3]/60 p-5 bg-white/50 backdrop-blur-sm">
          <a href="tel:02191302584" className="flex items-center gap-2.5 text-[12px] font-medium text-[#A0AEC0] hover:text-[#2F80ED] mb-4 transition-colors duration-300">
            <Phone className="h-3.5 w-3.5" />
            <span dir="ltr">۰۲۱-۹۱۳۰۲۵۸۴</span>
          </a>
          <div className="flex gap-2.5">
            <a href="/portal" onClick={() => setMobileMenuOpen(false)} className="flex-1 flex items-center justify-center gap-2 text-[13px] font-semibold text-[#4A5568] border border-[#E8EDF3] rounded-xl py-3 hover:bg-[#2F80ED]/[0.04] hover:border-[#2F80ED]/20 hover:text-[#2F80ED] transition-all duration-300 bg-white/60 backdrop-blur-sm">
              <LogIn className="h-4 w-4" />
              ورود
            </a>
            <a href="/portal?tab=register" onClick={() => setMobileMenuOpen(false)} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-l from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-[13px] rounded-xl py-3 transition-all duration-300 shadow-md shadow-blue-500/25">
              <User className="h-4 w-4" />
              ثبت‌نام
            </a>
          </div>
        </div>
      </div>
    </>
  );
}