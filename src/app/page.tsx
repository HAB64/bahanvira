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
    <div className="min-h-screen flex flex-col">
      {refCode && (
        <div className="bg-gradient-to-l from-amber-500 to-orange-500 text-white py-2 px-4 text-center text-sm">
          <div className="container mx-auto flex items-center justify-center gap-2">
            <Gift className="w-4 h-4" />
            <span>شما با کد معرف <strong>{refCode}</strong> وارد شده‌اید. تخفیف ویژه برای شما!</span>
            <button onClick={() => setRefCode(null)} className="mr-4 hover:bg-white/20 rounded p-1">
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
