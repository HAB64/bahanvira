"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";

const navLinks = [
  { label: "صفحه اصلی", href: "#hero" },
  { label: "دوره‌ها", href: "#courses" },
  { label: "همکاری و نمایندگی", href: "#cooperation" },
  { label: "درباره ما", href: "#why" },
  { label: "نظرات", href: "#testimonials" },
  { label: "سوالات متداول", href: "#faq" },
  { label: "تماس با ما", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground text-lg font-bold">
            و
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-foreground">
              چرتکه دهگانی ویرا
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight">
              آموزش چرتکه و حساب ذهنی
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground border border-border hover:bg-primary/5 hover:text-primary transition-colors"
          >
            آزمون آنلاین
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground border border-border hover:bg-primary/5 hover:text-primary transition-colors"
          >
            پورتال کارآموز
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground border border-border hover:bg-primary/5 hover:text-primary transition-colors"
          >
            پنل مدیریت
          </a>
          <span className="text-sm text-muted-foreground" dir="ltr">
            01144746441 | 09111277194
          </span>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            asChild
          >
            <a href="#register">مشاوره رایگان</a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 pt-12">
            <SheetTitle className="text-right">منو</SheetTitle>
            <nav className="flex flex-col gap-1 mt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <hr className="my-2 border-border" />
              <a href="#" className="rounded-md px-4 py-2 text-sm text-muted-foreground hover:text-primary">آزمون آنلاین</a>
              <a href="#" className="rounded-md px-4 py-2 text-sm text-muted-foreground hover:text-primary">پورتال کارآموز</a>
              <a href="#" className="rounded-md px-4 py-2 text-sm text-muted-foreground hover:text-primary">پنل مدیریت</a>
              <a href="tel:01144746441" className="flex items-center gap-2 rounded-md px-4 py-2 text-sm text-muted-foreground hover:text-primary">
                <Phone className="h-4 w-4" />
                <span dir="ltr">01144746441</span>
              </a>
              <Button className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <a href="#register" onClick={() => setOpen(false)}>مشاوره رایگان</a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}