import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "چرتکه دهگانی ویرا | آموزش چرتکه و حساب ذهنی",
  description:
    "آموزشگاه تخصصی چرتکه دهگانی ویرا — آموزش چرتکه و حساب ذهنی برای کودکان و نوجوانان با جدیدترین روش‌های آموزشی و اساتید مجرب.",
  keywords: [
    "چرتکه",
    "چرتکه دهگانی",
    "آموزش چرتکه",
    "حساب ذهنی",
    "محاسبه ذهنی",
    "چرتکه برای کودکان",
    "آموزشگاه چرتکه",
    "ویرا",
  ],
  authors: [{ name: "چرتکه دهگانی ویرا" }],
  openGraph: {
    title: "چرتکه دهگانی ویرا | آموزش چرتکه و حساب ذهنی",
    description: "آموزش تخصصی چرتکه دهگانی و حساب ذهنی برای کودکان و نوجوانان",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazir.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}