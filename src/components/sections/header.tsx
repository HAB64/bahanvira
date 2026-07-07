"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, User, LogIn, ChevronDown, GraduationCap } from "lucide-react";

const navLinks = [
  { label: "صفحه اصلی", href: "/" },
  { label: "دوره‌ها", href: "/courses", hasDropdown: true },
  { label: "آباکوس مجازی", href: "/abacus" },
  { label: "آزمون آنلاین", href: "/exam" },
  { label: "پنل دانش‌آموز", href: "/portal" },
  { label: "وبلاگ", href: "/blog", comingSoon: true },
  { label: "تماس با ما", href: "/#contact" },
];

const courseDropdownItems = [
  { label: "دوره‌های آباکوس", href: "/courses?type=abacus" },
  { label: "دوره‌های حساب ذهنی", href: "/courses?type=mental" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Lock body scroll when mobile menu is open
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
    <header className="glass-header sticky top-0 z-50 w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0d9488] text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-white">
              ویرا | چرتکه دهگانی
            </span>
            <span className="text-[10px] text-gray-400 leading-tight">
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
                  className="text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 px-4 py-2 flex items-center gap-1"
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
                  className={`absolute top-full right-0 mt-1 w-52 rounded-xl border border-white/10 bg-[#0f1d32]/95 backdrop-blur-xl shadow-2xl py-2 transition-all duration-200 ${
                    dropdownOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {courseDropdownItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2.5 transition-colors"
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
                className="text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 px-4 py-2 flex items-center gap-1.5"
              >
                {link.label}
                {link.comingSoon && (
                  <span className="text-[10px] font-medium bg-[#0d9488]/20 text-[#0d9488] rounded-full px-2 py-0.5 leading-none">
                    به‌زودی
                  </span>
                )}
              </a>
            )
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Phone */}
          <a
            href="tel:02191302584"
            className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
            dir="ltr"
          >
            <Phone className="h-3.5 w-3.5" />
            ۰۲۱-۹۱۳۰۲۵۸۴
          </a>

          <div className="h-5 w-px bg-white/10" />

          {/* Login */}
          <a
            href="/portal"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            <LogIn className="h-4 w-4" />
            ورود
          </a>

          {/* Register */}
          <a
            href="/portal?tab=register"
            className="bg-[#0d9488] hover:bg-[#0f766e] text-white font-medium text-sm rounded-lg px-4 py-2 transition-colors"
          >
            ثبت‌نام
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="باز کردن منو"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-[#0a1628]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
          <a href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d9488] text-white">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-white">ویرا</span>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center h-9 w-9 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
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
                  className="flex items-center justify-between w-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 transition-colors"
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
                      className="block text-sm text-gray-400 hover:text-white hover:bg-white/5 pr-8 pl-4 py-2.5 transition-colors"
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
                className="flex items-center justify-between text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 transition-colors"
              >
                {link.label}
                {link.comingSoon && (
                  <span className="text-[10px] font-medium bg-[#0d9488]/20 text-[#0d9488] rounded-full px-2 py-0.5 leading-none">
                    به‌زودی
                  </span>
                )}
              </a>
            )
          )}
        </nav>

        {/* Mobile Menu Footer */}
        <div className="absolute bottom-0 right-0 left-0 border-t border-white/10 p-4 bg-[#0a1628]/95">
          {/* Phone */}
          <a
            href="tel:02191302584"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-3 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span dir="ltr">۰۲۱-۹۱۳۰۲۵۸۴</span>
          </a>
          {/* Actions */}
          <div className="flex gap-2">
            <a
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-300 border border-white/10 rounded-lg py-2.5 hover:bg-white/5 hover:text-white transition-colors"
            >
              <User className="h-4 w-4" />
              ورود
            </a>
            <a
              href="/portal?tab=register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center bg-[#0d9488] hover:bg-[#0f766e] text-white font-medium text-sm rounded-lg py-2.5 transition-colors"
            >
              ثبت‌نام
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}