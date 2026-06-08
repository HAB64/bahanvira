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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
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
