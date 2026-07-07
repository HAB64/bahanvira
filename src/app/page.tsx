'use client';

import { useState } from "react";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Benefits from "@/components/sections/benefits";
import PracticeTools from "@/components/sections/practice-tools";
import LearningPath from "@/components/sections/learning-path";
import Courses from "@/components/sections/courses";
import Instructors from "@/components/sections/instructors";
import About from "@/components/sections/about";
import WhyVira from "@/components/sections/why-vira";
import Cooperation from "@/components/sections/cooperation";
import Testimonials from "@/components/sections/testimonials";
import FAQ from "@/components/sections/faq";
import ConsultForm from "@/components/sections/consult-form";
import CTASection from "@/components/sections/cta-section";
import Footer from "@/components/sections/footer";
import WhatsAppButton from "@/components/sections/whatsapp-button";
import { getReferralCodeFromURL } from "@/lib/referral";
import { X, Gift } from "lucide-react";

function getInitialRefCode(): string | null {
  if (typeof window === 'undefined') return null;
  return getReferralCodeFromURL();
}

export default function Home() {
  const [refCode, setRefCode] = useState<string | null>(getInitialRefCode);

  return (
    <div className="min-h-screen flex flex-col">
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
        <Hero />
        <Benefits />
        <PracticeTools />
        <LearningPath />
        <Courses />
        <Instructors />
        <About />
        <WhyVira />
        <Cooperation />
        <Testimonials />
        <FAQ />
        <ConsultForm />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}