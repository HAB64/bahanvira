// ═══════════════════════════════════════════════════════════
//  robots.txt — Vira Abacus
// ═══════════════════════════════════════════════════════════

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/portal/', '/ref'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/api/', '/portal/', '/ref'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin', '/api/', '/portal/', '/ref'],
        crawlDelay: 2,
      },
    ],
    sitemap: 'https://bahanvira.ir/sitemap.xml',
  };
}