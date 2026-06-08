'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-l from-amber-600 via-orange-600 to-teal-700 rounded-3xl overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-20 w-48 h-48 bg-white rounded-full blur-2xl" />
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
            </div>

            {/* CTA Content */}
            <div className="p-8 md:p-12 text-center lg:text-right">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-6">
                اولین قدم برای آینده درخشان فرزندتان
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-8 mb-8">
                همین حالا برای مشاوره رایگان و ثبت‌نام در دوره‌های چرتکه دهگانی ویرا اقدام کنید.
                تیم مشاوران ما آماده پاسخگویی به تمام سؤالات شما هستند.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href={siteConfig.contact.phoneHref}
                  className="flex items-center gap-2 bg-white text-amber-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  <span>تماس تلفنی</span>
                </a>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg"
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
