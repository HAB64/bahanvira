'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import ChildFriendlyBackground from './ChildFriendlyBackground';

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-l from-[#EF476F] via-[#9B59B6] to-[#6C3CE1] rounded-[2rem] overflow-hidden relative shadow-2xl">
          {/* Decorative child-friendly elements */}
          <ChildFriendlyBackground variant="hero" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-20 w-64 h-64 bg-[#7B4FD4] rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-20 w-48 h-48 bg-[#7B4FD4] rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-yellow-200 rounded-full blur-2xl" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center relative z-10">
            {/* Promo Image */}
            <div className="relative h-64 lg:h-full min-h-[300px]">
              <Image
                src="/images/abacus-promo.jpg"
                alt="چرتکه دهگانی ویرا"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-amber-700/30" />
              {/* Floating decorative elements */}
              <div className="absolute top-6 right-6 w-8 h-8 bg-[#7B4FD4]/30 rounded-full backdrop-blur-sm animate-bounce-gentle" />
              <div className="absolute bottom-10 left-10 w-6 h-6 bg-yellow-300/40 rounded-full backdrop-blur-sm animate-float" style={{ animationDuration: '7s' }} />
            </div>

            {/* CTA Content */}
            <div className="p-8 md:p-12 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 bg-[#7B4FD4]/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="text-base">🌟</span>
                فرصت ویژه
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-6">
                اولین قدم برای آینده درخشان فرزندتان
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-8 mb-8">
                همین حالا برای مشاوره رایگان و ثبت‌نام در دوره‌های چرتکه دهگانی ویرا اقدام کنید.
                تیم مشاوران ما آماده پاسخگویی به تمام سؤالات شما هستند.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href={siteConfig.contact.phone1Href}
                  className="flex items-center gap-2 bg-[#7B4FD4] text-[#FFD166] font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span>تماس تلفنی</span>
                </a>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 text-white font-bold px-8 py-4 rounded-2xl hover:bg-green-600 transition-all shadow-lg hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>پیام در واتساپ</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
