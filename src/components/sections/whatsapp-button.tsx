"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const quickActions = [
  { label: "ثبت‌نام", icon: "📝" },
  { label: "سطوح آموزشی", icon: "📊" },
  { label: "هزینه دوره‌ها", icon: "💰" },
  { label: "ساعات کلاس", icon: "🕐" },
  { label: "آدرس و تماس", icon: "📍" },
];

export default function WhatsAppButton() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {chatOpen && (
        <div className="fixed bottom-24 left-4 z-[100] w-72 rounded-2xl border border-white/10 bg-[#0f1d32] shadow-2xl sm:left-6 sm:w-80">
          <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-l from-[#0d9488] to-[#0f766e] px-4 py-3 text-white">
            <div>
              <p className="text-sm font-bold">مشاوره ویرا</p>
              <p className="text-xs opacity-80">آنلاین هستیم</p>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="rounded-full p-1 hover:bg-white/20 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-sm text-slate-400 text-center">
              سلام! چطور می‌تونم کمکتون کنم؟
            </p>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() =>
                    window.open(
                      `https://wa.me/989111277194?text=${encodeURIComponent(action.label)}`,
                      "_blank"
                    )
                  }
                  className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-200 transition-colors hover:bg-white/10 hover:border-white/20"
                >
                  <span>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
            <a
              href="https://wa.me/989111277194"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-3 text-center transition-colors"
            >
              <MessageCircle className="inline ml-1.5 h-4 w-4" />
              چت در واتساپ
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 left-4 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-all hover:bg-emerald-400 hover:scale-105 active:scale-95 sm:left-6"
        aria-label="چت واتساپ"
        style={{ boxShadow: "0 4px 20px rgba(16, 185, 129, 0.4)" }}
      >
        {chatOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </>
  );
}