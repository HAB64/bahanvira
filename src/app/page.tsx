'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import CompetencyClusters from '@/components/home/CompetencyClusters';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import TrustSection from '@/components/home/TrustSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import PartnersSection from '@/components/home/PartnersSection';
import QuickLeadForm from '@/components/home/QuickLeadForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getReferralCodeFromURL } from '@/lib/referral';
import { X, Gift } from 'lucide-react';

function getInitialRefCode(): string | null {
  if (typeof window === 'undefined') return null;
  return getReferralCodeFromURL();
}

export default function Home() {
  const [refCode, setRefCode] = useState<string | null>(getInitialRefCode);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-100/60 via-orange-50/40 to-teal-100/50">
      {refCode && (
        <div className="bg-gradient-to-l from-amber-500 via-orange-500 to-amber-500 text-white py-2.5 px-4 text-center text-sm relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white rounded-full blur-2xl" />
          </div>
          <div className="container mx-auto flex items-center justify-center gap-2 relative z-10">
            <Gift className="w-4 h-4" />
            <span>شما با کد معرف <strong>{refCode}</strong> وارد شده‌اید. تخفیف ویژه برای شما!</span>
            <button onClick={() => setRefCode(null)} className="mr-4 hover:bg-white/20 rounded-lg p-1 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CompetencyClusters />
        <FeaturedCourses />
        <TrustSection />
        <PartnersSection />
        <TestimonialsSection />
        <FAQSection />
        <QuickLeadForm />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
