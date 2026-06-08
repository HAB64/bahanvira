import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'چرتکه دهگانی ویرا | آموزش چرتکه و حساب ذهنی',
  description:
    'آموزش تخصصی چرتکه دهگانی و حساب ذهنی برای کودکان و نوجوانان. تقویت هوش ریاضی، تمرکز و اعتماد به نفس با روش نوین ویرا',
  keywords: [
    'چرتکه دهگانی',
    'حساب ذهنی',
    'آموزش چرتکه',
    'ویرا',
    'ریاضی کودکان',
    'چرتکه ویرا',
  ],
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'چرتکه دهگانی ویرا | آموزش چرتکه و حساب ذهنی',
    description:
      'آموزش تخصصی چرتکه دهگانی و حساب ذهنی برای کودکان و نوجوانان',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.variable} font-[family-name:var(--font-vazirmatn)] antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
