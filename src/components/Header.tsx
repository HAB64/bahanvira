'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import Image from 'next/image';

const navLinks = [
  { label: 'صفحه اصلی', href: '#hero' },
  { label: 'دوره‌ها', href: '#courses' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-amber-100'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt={siteConfig.name.fullName}
              width={48}
              height={48}
              className="rounded-lg"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-amber-700 leading-tight">
                {siteConfig.name.fa}
              </span>
              <span className="text-[10px] text-amber-600/70 leading-tight hidden sm:block">
                چرتکه دهگانی
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-700 transition-colors"
              dir="ltr"
            >
              <Phone className="w-4 h-4" />
              <span>{siteConfig.contact.phoneRaw}</span>
            </a>
            <Button
              onClick={() => handleNavClick('#contact')}
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl px-5"
            >
              مشاوره رایگان
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-amber-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'بستن منو' : 'باز کردن منو'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-amber-100 shadow-xl">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-right px-4 py-3 text-sm font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-gray-100">
              <Button
                onClick={() => handleNavClick('#contact')}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl"
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
