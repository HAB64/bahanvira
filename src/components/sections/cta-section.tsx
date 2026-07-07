import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="abacus-gradient py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
          اولین قدم برای آینده درخشان فرزندتان
        </h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8" asChild>
            <a href="tel:01144746441">
              <Phone className="ml-2 h-5 w-5" />
              تماس تلفنی
            </a>
          </Button>
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl px-8" asChild>
            <a href="https://wa.me/989111277194" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="ml-2 h-5 w-5" />
              پیام در واتساپ
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}