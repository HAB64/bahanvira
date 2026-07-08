'use client';

import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Benefits from "@/components/sections/benefits";
import Courses from "@/components/sections/courses";
import LearningPath from "@/components/sections/learning-path";
import PracticeTools from "@/components/sections/practice-tools";
import Instructors from "@/components/sections/instructors";
import About from "@/components/sections/about";
import WhyVira from "@/components/sections/why-vira";
import Cooperation from "@/components/sections/cooperation";
import FAQ from "@/components/sections/faq";
import ConsultForm from "@/components/sections/consult-form";
import CTASection from "@/components/sections/cta-section";
import Footer from "@/components/sections/footer";
import WhatsAppButton from "@/components/sections/whatsapp-button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FBFF]">
      <Header />
      <main className="flex-1">
        <Hero />
        <Benefits />
        <Courses />
        <LearningPath />
        <PracticeTools />
        <Instructors />
        <About />
        <WhyVira />
        <Cooperation />
        <FAQ />
        <ConsultForm />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}