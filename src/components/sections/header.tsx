"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, User, LogIn, ChevronDown, GraduationCap } from "lucide-react";

const navLinks = [
  { label: "صفحه اصلی", href: "/" },
  { label: "دوره‌ها", href: "/courses", hasDropdown: true },
  { label: "چرتکه دهگانی ویرا", href: "/abacus" },
  { label: "آزمون آنلاین", href: "/exam" },
  { label: "پنل دانش‌آموز", href: "/portal" },
  { label: "وبلاگ", href: "/blog", comingSoon: true },
  { label: "تماس با ما", href: "/#contact" },
];

const courseDropdownItems = [
  { label: "دوره‌های چرتکه", href: "/courses?type=abacus" },
  { label: "دوره‌های حساب ذهنی", href: "/courses?type=mental" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
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
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/92 backdrop-blur-xl shadow-md shadow-black/[0.04] border-b border-gray-100"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-md shadow-orange-500/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className={`text-sm font-bold leading-tight transition-colors duration-300 ${scrolled ? "text-slate-900" : "text-slate-800"}`}>
              ویرا | چرتکه دهگانی
            </span>
            <span className={`text-[10px] leading-tight transition-colors duration-300 ${scrolled ? "text-slate-400" : "text-slate-500"}`}>
              آموزش چرتکه و حساب ذهنی
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className={`text-sm font-medium rounded-lg transition-all duration-200 px-4 py-2 flex items-center gap-1 ${
                    scrolled
                      ? "text-slate-600 hover:text-orange-600 hover:bg-orange-50"
                      : "text-slate-600 hover:text-orange-600 hover:bg-orange-50/70"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {/* Dropdown */}
                <div
                  className={`absolute top-full right-0 mt-1 w-52 rounded-xl border border-gray-100 bg-white shadow-xl shadow-black/[0.06] py-2 transition-all duration-200 ${
                    dropdownOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {courseDropdownItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block text-sm font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 px-4 py-2.5 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium rounded-lg transition-all duration-200 px-4 py-2 flex items-center gap-1.5 ${
                  scrolled
                    ? "text-slate-600 hover:text-orange-600 hover:bg-orange-50"
                    : "text-slate-600 hover:text-orange-600 hover:bg-orange-50/70"
                }`}
              >
                {link.label}
                {link.comingSoon && (
                  <span className="text-[10px] font-medium bg-purple-100 text-purple-600 rounded-full px-2 py-0.5 leading-none">
                    به‌زودی
                  </span>
                )}
              </a>
            )
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:02191302584"
            className={`flex items-center gap-1.5 text-sm transition-colors ${
              scrolled ? "text-slate-500 hover:text-orange-600" : "text-slate-500 hover:text-orange-600"
            }`}
            dir="ltr"
          >
            <Phone className="h-3.5 w-3.5" />
            ۰۲۱-۹۱۳۰۲۵۸۴
          </a>

          <div className="h-5 w-px bg-gray-200" />

          <a
            href="/portal"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
              scrolled ? "text-slate-600 hover:text-orange-600" : "text-slate-600 hover:text-orange-600"
            }`}
          >
            <LogIn className="h-4 w-4" />
            ورود
          </a>

          <a
            href="/portal?tab=register"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium text-sm rounded-lg px-4 py-2 transition-all shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30"
          >
            ثبت‌نام
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className={`lg:hidden flex items-center justify-center h-10 w-10 rounded-lg transition-colors ${
            scrolled ? "text-slate-700 hover:bg-gray-100" : "text-slate-700 hover:bg-gray-100/70"
          }`}
          aria-label="باز کردن منو"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl shadow-black/[0.08] transition-transform duration-300 ease-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
          <a href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 text-white">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-slate-900">ویرا</span>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center h-9 w-9 rounded-lg text-slate-500 hover:bg-gray-100 transition-colors"
            aria-label="بستن منو"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Menu Nav */}
        <nav className="flex flex-col py-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 64px - 140px)" }}>
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.href}>
                <button
                  type="button"
                  onClick={() => setMobileDropdownOpen((prev) => !prev)}
                  className="flex items-center justify-between w-full text-sm font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 px-4 py-3 transition-colors"
                >
                  {link.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      mobileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    mobileDropdownOpen ? "max-h-24" : "max-h-0"
                  }`}
                >
                  {courseDropdownItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm text-slate-400 hover:text-orange-600 hover:bg-orange-50 pr-8 pl-4 py-2.5 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 px-4 py-3 transition-colors"
              >
                {link.label}
                {link.comingSoon && (
                  <span className="text-[10px] font-medium bg-purple-100 text-purple-600 rounded-full px-2 py-0.5 leading-none">
                    به‌زودی
                  </span>
                )}
              </a>
            )
          )}
        </nav>

        {/* Mobile Menu Footer */}
        <div className="absolute bottom-0 right-0 left-0 border-t border-gray-100 p-4 bg-white">
          <a
            href="tel:02191302584"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-orange-600 mb-3 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span dir="ltr">۰۲۱-۹۱۳۰۲۵۸۴</span>
          </a>
          <div className="flex gap-2">
            <a
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 transition-colors"
            >
              <User className="h-4 w-4" />
              ورود
            </a>
            <a
              href="/portal?tab=register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium text-sm rounded-lg py-2.5 transition-all"
            >
              ثبت‌نام
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}