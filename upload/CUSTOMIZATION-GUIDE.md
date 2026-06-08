# ═══════════════════════════════════════════════════════════
#  راهنمای شخصی‌سازی قالب آموزشگاه
#  Institute Template Customization Guide
# ═══════════════════════════════════════════════════════════

## ۱. مراحل سریع راه‌اندازی

### گام ۱: فایل پیکربندی اصلی
```bash
# کپی فایل قالب و تغییر نام
cp src/config/site.template.ts src/config/site.ts
```

### گام ۲: ویرایش فایل site.ts
فایل `src/config/site.ts` را باز کنید و تمام مقادیر `TODO` را با اطلاعات آموزشگاه خود جایگزین کنید.

### گام ۳: تصاویر
فایل‌های زیر را در پوشه `public` قرار دهید:
- `logo.png` — لوگوی آموزشگاه (پیشنهاد: ۲۰۰×۶۰ پیکسل)
- `tvto-logo.png` — لوگوی سازمان فنی و حرفه‌ای (اختیاری)
- `og-image.jpg` — تصویر اشتراک‌گذاری (۱۲۰۰×۶۳۰ پیکسل)
- `images/hero-bg.png` — تصویر پس‌زمینه بخش اصلی

### گام ۴: نصب و اجرا
```bash
npm install
npx prisma generate
npm run dev
```

---

## ۲. توضیحات کامل هر بخش

### 🔹 نام آموزشگاه (name)
| فیلد | توضیح | مثال |
|------|--------|-------|
| `fa` | نام فارسی کوتاه | 'بهان رایانه' |
| `fullName` | نام کامل فارسی — برای گواهینامه | 'آموزشگاه فنی و حرفه‌ای بهان رایانه' |
| `fullEn` | نام کامل انگلیسی — برای گواهینامه | 'Bahan Rayaneh Technical & Vocational...' |
| `en` | نام انگلیسی کوتاه — برای UI | 'Bahan Rayaneh' |

### 🔹 موقعیت مکانی (location)
| فیلد | توضیح | نحوه دریافت |
|------|--------|-------------|
| `latitude` | عرض جغرافیایی | Google Maps → راست‌کلیک → عدد اول |
| `longitude` | طول جغرافیایی | Google Maps → راست‌کلیک → عدد دوم |

**نحوه دریافت مختصات از Google Maps:**
1. به maps.google.com بروید
2. آدرس آموزشگاه را جستجو کنید
3. روی نقشه راست‌کلیک کنید
4. عدد اول = latitude، عدد دوم = longitude

### 🔹 اطلاعات تماس (contact)
| فیلد | توضیح | مثال |
|------|--------|-------|
| `phone` | تلفن ثابت فارسی | '۰۱۱-۴۴۷۴۶۶۶۵' |
| `phoneHref` | لینک تلفن | 'tel:01144746665' |
| `phoneRaw` | شماره خام | '01144746665' |
| `whatsappRaw` | شماره واتساپ با کد کشور (بدون + و بدون 0 اول) | '989111277194' |
| `whatsappUrl` | لینک واتساپ | 'https://wa.me/989111277194' |

**⚠️ نکته مهم واتساپ:** شماره باید با کد کشور شروع شود و 0 اول حذف شود:
- ❌ اشتباه: '+989111277194' یا '09111277194'
- ✅ درست: '989111277194'

### 🔹 دسته‌بندی‌ها (categories)
هر دسته‌بندی شامل:
- `slug` — شناسه انگلیسی بدون فاصله (مثال: 'tech-ai')
- `name` — نام فارسی (مثال: 'فناوری و هوش مصنوعی')
- `nameEn` — نام انگلیسی (مثال: 'Technology & AI')
- `icon` — نام آیکون از کتابخانه Lucide

**آیکون‌های پرکاربرد Lucide:**
| آیکون | نام | مناسب برای |
|--------|------|------------|
| 🖥️ | Cpu | فناوری و کامپیوتر |
| 📈 | TrendingUp | بازارهای مالی |
| 💼 | Briefcase | مدیریت و کارآفرینی |
| 🎨 | Palette | هنر و طراحی |
| 🎓 | GraduationCap | آموزش عمومی |
| 💻 | Code | برنامه‌نویسی |
| 🌐 | Globe | زبان‌های خارجی |
| 📊 | BarChart3 | حسابداری |
| 🎵 | Music | موسیقی |
| 🔬 | FlaskConical | علوم آزمایشگاهی |

### 🔹 الگوهای پیامک (smsPatterns)
اگر از **ملی‌پیامک** استفاده می‌کنید:
1. در پنل ملی‌پیامک الگوهای پیامک را ثبت کنید
2. کد الگو را در فایل وارد کنید

اگر از ملی‌پیامک استفاده **نمی‌کنید**، مقادیر را خالی بگذارید یا بخش‌های مرتبط با پیامک را غیرفعال کنید.

### 🔹 SEO
| فیلد | توضیح | نکته |
|------|--------|-------|
| `defaultTitle` | عنوان پیش‌فرض | شامل نام آموزشگاه + شهر + استان |
| `titleTemplate` | الگوی عنوان | %s = عنوان هر صفحه |
| `description` | توضیحات متا | حداکثر ۱۶۰ کاراکتر |
| `keywords` | کلمات کلیدی | ۵-۱۰ کلمه مهم |

---

## ۳. متغیرهای محیطی (.env)

فایل `.env.local` را در ریشه پروژه ایجاد کنید:

```env
# ─── دیتابیس ────────────────────────────────
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"

# ─── احراز هویت ادمین ──────────────────────
ADMIN_PASSWORD="your-secure-password"

# ─── ملی‌پیامک (اختیاری) ───────────────────
MELLI_PAYAMAK_API_KEY=""
MELLI_PAYAMAK_USERNAME=""
MELLI_PAYAMAK_PASSWORD=""

# ─── ایمیل SMTP (اختیاری) ──────────────────
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""

# ─── n8n (اختیاری) ─────────────────────────
N8N_WEBHOOK_URL=""
N8N_SECRET=""

# ─── Firebase (اختیاری) ────────────────────
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
```

---

## ۴. ساختار فایل‌های مهم

```
src/
├── config/
│   ├── site.ts          ← پیکربندی اصلی (شما اینجا را تغییر می‌دهید)
│   ├── site.template.ts ← فایل قالب (تغییر ندهید)
│   └── types.ts         ← تایپ‌ها (تغییر ندهید)
├── components/
│   ├── Header.tsx       ← هدر سایت (لوگو و منو)
│   ├── Footer.tsx       ← فوتر سایت
│   ├── WhatsAppButton.tsx ← دکمه شناور واتساپ
│   ├── FAQSection.tsx   ← بخش سؤالات متداول
│   ├── SchemaMarkup.tsx ← داده‌های ساختاریافته SEO
│   └── home/
│       ├── HeroSection.tsx        ← بخش اصلی صفحه
│       ├── FeaturedCourses.tsx    ← دوره‌های ویژه
│       ├── TrustSection.tsx       ← نشان‌های اعتماد
│       ├── TestimonialsSection.tsx ← نظرات کارآموزان
│       ├── CTASection.tsx         ← دعوت به اقدام
│       ├── QuickLeadForm.tsx      ← فرم مشاوره
│       ├── CompetencyClusters.tsx ← دسته‌بندی‌ها
│       └── FAQSection.tsx         ← سؤالات متداول
├── data/
│   ├── courses.ts       ← اطلاعات دوره‌ها
│   └── blog.ts          ← مقالات وبلاگ
└── app/
    ├── page.tsx         ← صفحه اصلی
    ├── courses/         ← صفحات دوره‌ها
    ├── blog/            ← وبلاگ
    ├── about/           ← درباره ما
    ├── contact/         ← تماس با ما
    ├── consulting/      ← مشاوره
    ├── admin/           ← پنل مدیریت
    ├── portal/          ← پورتال کارآموز
    └── api/             ← API routes
```

---

## ۵. رنگ‌بندی و تم

برای تغییر رنگ‌بندی، فایل `tailwind.config.ts` را ویرایش کنید:

```typescript
// بخش colors در tailwind.config.ts
colors: {
  primary: {
    DEFAULT: 'رنگ اصلی هگز',     // مثال: '#1e40af' (آبی)
    foreground: 'رنگ متن روی اصلی', // مثال: '#ffffff'
  },
  accent: {
    DEFAULT: 'رنگ تأکیدی',       // مثال: '#f59e0b' (طلایی)
  },
}
```

---

## ۶. استقرار روی Vercel

```bash
# نصب Vercel CLI
npm i -g vercel

# استقرار
vercel --prod
```

### تنظیمات محیطی در Vercel:
1. به Settings → Environment Variables بروید
2. تمام متغیرهای `.env.local` را اضافه کنید
3. دوباره استقرار دهید

---

## ۷. چک‌لیست راه‌اندازی

- [ ] فایل `site.ts` از روی `site.template.ts` کپی شد
- [ ] تمام مقادیر TODO در `site.ts` پر شد
- [ ] تصاویر (لوگو، OG، هیرو) در پوشه `public` قرار گرفت
- [ ] فایل `.env.local` با مقادیر واقعی ایجاد شد
- [ ] دیتابیس PostgreSQL تنظیم شد (Neon، Supabase یا...)
- [ ] `npx prisma generate` و `npx prisma db push` اجرا شد
- [ ] `npm run dev` اجرا شد و سایت بدون خطا نمایش داده شد
- [ ] رنگ‌بندی و تم در `tailwind.config.ts` تنظیم شد
- [ ] دوره‌ها در `src/data/courses.ts` اضافه شد
- [ ] سؤالات متداول ویرایش شد
- [ ] سایت روی Vercel استقرار یافت
- [ ] Google Search Console ثبت شد
