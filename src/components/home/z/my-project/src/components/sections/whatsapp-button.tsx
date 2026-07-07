"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickActions = [
  { label: "ثبت‌نام", icon: "✍️" },
  { label: "سطوح آموزشی", icon: "📊" },
  { label: "هزینه دوره‌ها", icon: "💰" },
  { label: "ساعات کلاس", icon: "🕐" },
  { label: "آدرس و تماس", icon: "📍" },
];

export default function WhatsAppButton() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-24 left-4 z-[100] w-72 rounded-2xl border border-border bg-card shadow-2xl sm:left-6 sm:w-80">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-primary px-4 py-3 text-primary-foreground">
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

          {/* Body */}
          <div className="p-4 space-y-3">
            <p className="text-sm text-muted-foreground text-center">
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
                  className="flex w-full items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-primary/5 hover:border-primary/30"
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
            >
              <Button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold">
                <MessageCircle className="ml-1.5 h-4 w-4" />
                چت در واتساپ
              </Button>
            </a>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 left-4 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-all hover:bg-emerald-400 hover:scale-105 active:scale-95 sm:left-6 animate-pulse-glow"
        aria-label="چت واتساپ"
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