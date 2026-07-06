import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import LearningPath from "@/components/sections/learning-path";
import Courses from "@/components/sections/courses";
import WhyVira from "@/components/sections/why-vira";
import Cooperation from "@/components/sections/cooperation";
import Testimonials from "@/components/sections/testimonials";
import FAQ from "@/components/sections/faq";
import ConsultForm from "@/components/sections/consult-form";
import CTASection from "@/components/sections/cta-section";
import Footer from "@/components/sections/footer";
import WhatsAppButton from "@/components/sections/whatsapp-button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <LearningPath />
        <Courses />
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