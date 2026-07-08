"use client";

import Image from "next/image";

export default function AdBanner() {
  return (
    <section dir="rtl" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-[#F0F4FF]/40 to-white/80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl animate-fade-in">
            {/* Glow effect behind the ad */}
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#2F80ED]/[0.08] via-[#8B5CF6]/[0.06] to-[#27AE60]/[0.08] blur-2xl pointer-events-none" />

            {/* Ad card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#102A43]/[0.12] border border-white/60 bg-white/40 backdrop-blur-sm p-3 sm:p-4">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/ad-banner.jpg"
                  alt="آگهی"
                  width={1026}
                  height={1280}
                  className="w-full h-auto object-contain"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}