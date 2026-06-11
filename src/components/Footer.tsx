'use client';

import { Phone, Mail, MapPin, Instagram, Send } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" dir="rtl">
      {/* Warm gradient background instead of flat dark */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950" />
      {/* Subtle decorative orbs */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-40 w-64 h-64 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-40 w-48 h-48 bg-teal-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.webp"
                alt={siteConfig.name.fullName}
                width={48}
                height={48}
                className="rounded-xl"
              />
              <h3 className="text-xl font-bold bg-gradient-to-l from-amber-400 to-orange-400 bg-clip-text text-transparent">{siteConfig.name.fa}</h3>
            </div>
            <p className="text-sm leading-7 text-gray-400">
              آموزش تخصصی چرتکه دهگانی و حساب ذهنی برای کودکان و نوجوانان با بهره‌گیری از
              جدیدترین روش‌های آموزشی و اساتید مجرب. هدف ما پرورش نسل توانمند و خلاق در
              زمینه ریاضیات است.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm">
              {['صفحه اصلی', 'دوره‌ها', 'درباره ما', 'سؤالات متداول', 'تماس با ما'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item === 'صفحه اصلی' ? 'hero' : item === 'دوره‌ها' ? 'courses' : item === 'درباره ما' ? 'about' : item === 'سؤالات متداول' ? 'faq' : 'contact'}`}
                      className="hover:text-amber-400 transition-colors text-gray-400"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">دوره‌های آموزشی</h4>
            <ul className="space-y-2 text-sm">
              {['چرتکه مقدماتی', 'حساب ذهنی متوسط', 'چرتکه پیشرفته', 'آمادگی مسابقات'].map(
                (item) => (
                  <li key={item}>
                    <a href="#courses" className="hover:text-amber-400 transition-colors text-gray-400">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">تماس با ما</h4>
            <div className="space-y-3 text-sm">
              <a
                href={siteConfig.contact.phone1Href}
                className="flex items-center gap-3 hover:text-amber-400 transition-colors text-gray-400"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span dir="ltr">{siteConfig.contact.phone1Raw}</span>
              </a>
              <a
                href={siteConfig.contact.phone2Href}
                className="flex items-center gap-3 hover:text-amber-400 transition-colors text-gray-400"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span dir="ltr">{siteConfig.contact.phone2Raw}</span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 hover:text-amber-400 transition-colors text-gray-400"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span dir="ltr">{siteConfig.contact.email}</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{siteConfig.location.address}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800/80 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 transition-all hover:scale-110"
                aria-label="اینستاگرام"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800/80 hover:bg-blue-500 transition-all hover:scale-110"
                aria-label="تلگرام"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800/80 hover:bg-green-500 transition-all hover:scale-110"
                aria-label="واتساپ"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            تمامی حقوق مادی و معنوی این وبسایت متعلق به {siteConfig.name.fullName} می‌باشد.
          </p>
          <p dir="ltr">© {currentYear} {siteConfig.name.en}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
