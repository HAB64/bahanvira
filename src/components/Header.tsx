'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, Shield, User, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'صفحه اصلی', href: '#hero' },
  { label: 'دوره‌ها', href: '#courses' },
  { label: 'همکاری و نمایندگی', href: '#partners' },
  { label: 'درباره ما', href: '#about' },
  { label: 'نظرات', href: '#testimonials' },
  { label: 'سؤالات متداول', href: '#faq' },
  { label: 'تماس با ما', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-amber-50/95 backdrop-blur-lg shadow-lg shadow-amber-200/50 border-b border-amber-200'
          : 'bg-amber-50/60 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/logo.webp"
                alt={siteConfig.name.fullName}
                width={48}
                height={48}
                className="rounded-xl group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg bg-gradient-to-l from-amber-600 to-orange-600 bg-clip-text text-transparent leading-tight">
                {siteConfig.name.fa}
              </span>
              <span className="text-[10px] text-amber-500/80 leading-tight hidden sm:block">
                چرتکه دهگانی
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
              >
                {link.label}
              </button>
            ))}
            <div className="w-px h-6 bg-amber-200 mx-1" />
            <Link
              href="/exam"
              className="px-3 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-all flex items-center gap-1.5"
            >
              <ClipboardList className="w-4 h-4" />
              آزمون آنلاین
            </Link>
          </nav>

          {/* CTA + Phone + Portal/Admin */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/portal">
              <Button
                variant="outline"
                size="sm"
                className="border-teal-200 text-teal-600 hover:bg-teal-50 rounded-xl text-xs gap-1.5 hover:scale-105 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                پورتال کارآموز
              </Button>
            </Link>
            <Link href="/admin">
              <Button
                variant="outline"
                size="sm"
                className="border-amber-200 text-amber-600 hover:bg-amber-50 rounded-xl text-xs gap-1.5 hover:scale-105 transition-all"
              >
                <Shield className="w-3.5 h-3.5" />
                پنل مدیریت
              </Button>
            </Link>
            <div className="w-px h-6 bg-amber-200" />
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.contact.phone1Href}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-amber-600 transition-colors"
                dir="ltr"
              >
                <Phone className="w-4 h-4" />
                <span>{siteConfig.contact.phone1Raw}</span>
              </a>
              <span className="text-amber-300">|</span>
              <a
                href={siteConfig.contact.phone2Href}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-amber-600 transition-colors"
                dir="ltr"
              >
                <span>{siteConfig.contact.phone2Raw}</span>
              </a>
            </div>
            <Button
              onClick={() => handleNavClick('#contact')}
              className="bg-gradient-to-l from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl px-5 shadow-md shadow-amber-200/50 hover:scale-105 transition-all"
            >
              مشاوره رایگان
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'بستن منو' : 'باز کردن منو'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-amber-50/95 backdrop-blur-lg border-t border-amber-200 shadow-xl">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-right px-4 py-3 text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-amber-100 space-y-2">
              <Link
                href="/exam"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
              >
                <ClipboardList className="w-4 h-4" />
                آزمون آنلاین
              </Link>
              <Link
                href="/portal"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
              >
                <User className="w-4 h-4" />
                پورتال کارآموز
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
              >
                <Shield className="w-4 h-4" />
                پنل مدیریت
              </Link>
            </div>
            <div className="pt-3 border-t border-amber-100">
              <Button
                onClick={() => handleNavClick('#contact')}
                className="w-full bg-gradient-to-l from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl shadow-md"
              >
                مشاوره رایگان
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
