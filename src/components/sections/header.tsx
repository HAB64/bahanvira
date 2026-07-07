"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";

const navLinks = [
  { label: "خانه", href: "/" },
  { label: "دوره‌ها", href: "/courses" },
  { label: "تمرین آنلاین", href: "#practice-tools" },
  { label: "چرتکه مجازی", href: "/abacus" },
  { label: "اساتید", href: "#instructors" },
  { label: "درباره ما", href: "#about" },
  { label: "تماس با ما", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg font-bold shadow-sm">
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Phone Numbers */}
          <a
            href="tel:01144746441"
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            dir="ltr"
          >
            <Phone className="h-3.5 w-3.5" />
            01144746441 | 09111277194
          </a>

          <div className="h-5 w-px bg-border" />

          {/* Student Login */}
          <a
            href="/portal"
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground border border-border hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all"
          >
            ورود دانش‌آموز
          </a>

          {/* Online Exam */}
          <a
            href="/exam"
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground border border-border hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all"
          >
            آزمون آنلاین
          </a>

          {/* Register CTA */}
          <Button
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-lg px-5 shadow-sm hover:shadow-md transition-all"
            asChild
          >
            <a href="#register">ثبت‌نام</a>
          </Button>
        </div>

        {/* Mobile Menu */}
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
                  className="rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <hr className="my-3 border-border" />
              <a
                href="/portal"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground border border-border hover:border-primary/30 hover:text-primary transition-all"
              >
                ورود دانش‌آموز
              </a>
              <a
                href="/exam"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground border border-border hover:border-primary/30 hover:text-primary transition-all"
              >
                آزمون آنلاین
              </a>
              <a
                href="tel:01144746441"
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span dir="ltr">01144746441 | 09111277194</span>
              </a>
              <Button
                className="mt-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-lg shadow-sm"
                asChild
              >
                <a href="#register" onClick={() => setOpen(false)}>
                  ثبت‌نام
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}