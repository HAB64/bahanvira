// ═══════════════════════════════════════════════════════════
//  پیکربندی سایت چرتکه دهگانی ویرا
//  Vira Decimal Abacus - Site Configuration
// ═══════════════════════════════════════════════════════════

export const siteConfig = {
  name: {
    fa: 'ویرا',
    fullName: 'آموزشگاه چرتکه دهگانی ویرا',
    fullEn: 'Vira Decimal Abacus Training Institute',
    en: 'Vira Abacus',
  },

  description: 'آموزش تخصصی چرتکه دهگانی و حساب ذهنی برای کودکان و نوجوانان. تقویت هوش ریاضی، تمرکز و اعتماد به نفس با روش نوین ویرا',

  location: {
    latitude: 36.6504,
    longitude: 52.0652,
    address: 'مازندران، محمودآباد، خیابان امام، نسیم ۴',
  },

  contact: {
    phone1: '۰۱۱-۴۴۷۴۶۴۴۱',
    phone1Href: 'tel:01144746441',
    phone1Raw: '01144746441',
    phone2: '۰۹۱۱-۱۲۷۷۱۹۴',
    phone2Href: 'tel:09111277194',
    phone2Raw: '09111277194',
    phone: '۰۱۱-۴۴۷۴۶۴۴۱',
    phoneHref: 'tel:01144746441',
    phoneRaw: '01144746441',
    whatsappRaw: '989111277194',
    whatsappUrl: 'https://wa.me/989111277194',
    email: 'info@vira-abacus.ir',
  },

  categories: [
    {
      slug: 'beginner-abacus',
      name: 'چرتکه مقدماتی',
      nameEn: 'Beginner Abacus',
      icon: 'Calculator',
    },
    {
      slug: 'mental-math',
      name: 'حساب ذهنی',
      nameEn: 'Mental Math',
      icon: 'Brain',
    },
    {
      slug: 'advanced-abacus',
      name: 'چرتکه پیشرفته',
      nameEn: 'Advanced Abacus',
      icon: 'Trophy',
    },
    {
      slug: 'competition-prep',
      name: 'آمادگی مسابقات',
      nameEn: 'Competition Prep',
      icon: 'Medal',
    },
  ],

  seo: {
    defaultTitle: 'چرتکه دهگانی ویرا | آموزش چرتکه و حساب ذهنی',
    titleTemplate: '%s | چرتکه دهگانی ویرا',
    description: 'آموزش تخصصی چرتکه دهگانی و حساب ذهنی برای کودکان و نوجوانان. تقویت هوش ریاضی، تمرکز و اعتماد به نفس با روش نوین ویرا',
    keywords: ['چرتکه دهگانی', 'حساب ذهنی', 'آموزش چرتکه', 'ویرا', 'ریاضی کودکان', 'چرتکه ویرا', 'چرتکه ایرانی'],
  },

  social: {
    instagram: 'https://instagram.com/vira_abacus',
    telegram: 'https://t.me/vira_abacus',
  },
};

export type SiteConfig = typeof siteConfig;
