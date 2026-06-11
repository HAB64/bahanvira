// Shared utility functions for Enterprise Admin Panel

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('fa-IR').format(num);
};

export const formatDate = (dateStr: string | Date): string => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('fa-IR');
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) {
    return `${formatNumber(Math.round(amount / 1000000))} میلیون`;
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)} میلیون`;
  }
  if (amount >= 1000) {
    return `${formatNumber(Math.round(amount / 1000))} هزار`;
  }
  return formatNumber(amount);
};

export const formatCurrencyFull = (amount: number): string => {
  return `${formatNumber(amount)} ریال`;
};

// Status badge color mapping
export const statusColors: Record<string, string> = {
  // Lead statuses
  NEW: 'bg-blue-100 text-blue-800',
  CONTACTED: 'bg-cyan-100 text-cyan-800',
  CONSULTATION_SCHEDULED: 'bg-purple-100 text-purple-800',
  CONSULTATION_DONE: 'bg-violet-100 text-violet-800',
  TRIAL_CLASS_SCHEDULED: 'bg-indigo-100 text-indigo-800',
  TRIAL_CLASS_DONE: 'bg-teal-100 text-teal-800',
  ENROLLMENT_OFFERED: 'bg-amber-100 text-amber-800',
  ENROLLED: 'bg-green-100 text-green-800',
  LOST: 'bg-red-100 text-red-800',
  NOT_INTERESTED: 'bg-gray-100 text-gray-800',
  // Course statuses
  UPCOMING: 'bg-blue-100 text-blue-800',
  ACTIVE: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-gray-100 text-gray-800',
  CANCELLED: 'bg-red-100 text-red-800',
  // Class statuses
  SCHEDULED: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-amber-100 text-amber-800',
  // Exam statuses
  DRAFT: 'bg-gray-100 text-gray-800',
  PUBLISHED: 'bg-blue-100 text-blue-800',
  CLOSED: 'bg-red-100 text-red-800',
  ARCHIVED: 'bg-gray-200 text-gray-600',
  // Tuition statuses
  PENDING: 'bg-amber-100 text-amber-800',
  PARTIAL: 'bg-orange-100 text-orange-800',
  PAID: 'bg-green-100 text-green-800',
  OVERDUE: 'bg-red-100 text-red-800',
  // Enrollment statuses
  PAUSED: 'bg-yellow-100 text-yellow-800',
  // Priority
  LOW: 'bg-gray-100 text-gray-700',
  MEDIUM: 'bg-blue-100 text-blue-700',
  HIGH: 'bg-orange-100 text-orange-700',
  URGENT: 'bg-red-100 text-red-700',
  // Question difficulty
  EASY: 'bg-green-100 text-green-800',
  MEDIUM: 'bg-amber-100 text-amber-800',
  HARD: 'bg-orange-100 text-orange-800',
  EXPERT: 'bg-red-100 text-red-800',
  // Follow-up types
  CALL: 'bg-blue-100 text-blue-800',
  WHATSAPP: 'bg-green-100 text-green-800',
  MEETING: 'bg-purple-100 text-purple-800',
  EMAIL: 'bg-amber-100 text-amber-800',
  // Follow-up completion
  COMPLETED_FOLLOWUP: 'bg-green-100 text-green-800',
  PENDING_FOLLOWUP: 'bg-amber-100 text-amber-800',
  // Consultation statuses
  NEW_CONSULTATION: 'bg-blue-100 text-blue-800',
  CONTACTED_CONSULTATION: 'bg-cyan-100 text-cyan-800',
  SCHEDULED_CONSULTATION: 'bg-purple-100 text-purple-800',
  CONVERTED_CONSULTATION: 'bg-green-100 text-green-800',
  LOST_CONSULTATION: 'bg-red-100 text-red-800',
  // Campaign statuses
  DRAFT_CAMPAIGN: 'bg-gray-100 text-gray-800',
  ACTIVE_CAMPAIGN: 'bg-green-100 text-green-800',
  PAUSED_CAMPAIGN: 'bg-amber-100 text-amber-800',
  COMPLETED_CAMPAIGN: 'bg-blue-100 text-blue-800',
  CANCELLED_CAMPAIGN: 'bg-red-100 text-red-800',
  // Campaign types
  SOCIAL_MEDIA: 'bg-pink-100 text-pink-800',
  EMAIL_CAMPAIGN: 'bg-amber-100 text-amber-800',
  SMS: 'bg-blue-100 text-blue-800',
  REFERRAL_BOOST: 'bg-green-100 text-green-800',
  DISCOUNT: 'bg-orange-100 text-orange-800',
  EVENT: 'bg-purple-100 text-purple-800',
  SEO: 'bg-teal-100 text-teal-800',
  // Content types
  VIDEO: 'bg-red-100 text-red-800',
  DOCUMENT: 'bg-blue-100 text-blue-800',
  AUDIO: 'bg-purple-100 text-purple-800',
  IMAGE: 'bg-cyan-100 text-cyan-800',
  LINK: 'bg-teal-100 text-teal-800',
  PRESENTATION: 'bg-orange-100 text-orange-800',
  WORKSHEET: 'bg-green-100 text-green-800',
  // Assignment types
  HOMEWORK: 'bg-blue-100 text-blue-800',
  PROJECT: 'bg-purple-100 text-purple-800',
  PRACTICE: 'bg-green-100 text-green-800',
  RESEARCH: 'bg-amber-100 text-amber-800',
  // Submission statuses
  SUBMITTED: 'bg-blue-100 text-blue-800',
  LATE: 'bg-red-100 text-red-800',
  RETURNED: 'bg-amber-100 text-amber-800',
  // Attendance statuses
  PRESENT: 'bg-green-100 text-green-800',
  ABSENT: 'bg-red-100 text-red-800',
  EXCUSED: 'bg-purple-100 text-purple-800',
  // Invoice statuses
  SENT: 'bg-blue-100 text-blue-800',
};

// Status Persian translations
export const statusLabels: Record<string, string> = {
  // Lead statuses
  NEW: 'جدید',
  CONTACTED: 'تماس گرفته شده',
  CONSULTATION_SCHEDULED: 'مشاوره زمان‌بندی شده',
  CONSULTATION_DONE: 'مشاوره انجام شده',
  TRIAL_CLASS_SCHEDULED: 'کلاس آزمایشی',
  TRIAL_CLASS_DONE: 'کلاس آزمایشی انجام شده',
  ENROLLMENT_OFFERED: 'پیشنهاد ثبت‌نام',
  ENROLLED: 'ثبت‌نام شده',
  LOST: 'از دست رفته',
  NOT_INTERESTED: 'بدون علاقه',
  // Lead sources
  WEBSITE_FORM: 'فرم وبسایت',
  WHATSAPP: 'واتساپ',
  PHONE_CALL: 'تماس تلفنی',
  INSTAGRAM: 'اینستاگرام',
  TELEGRAM: 'تلگرام',
  REFERRAL: 'معرفی',
  WALK_IN: 'مراجعه حضوری',
  ADVERTISEMENT: 'تبلیغات',
  CAMPAIGN: 'کمپین',
  OTHER: 'سایر',
  // Course statuses
  UPCOMING: 'پیش‌رو',
  ACTIVE: 'فعال',
  COMPLETED: 'تکمیل شده',
  CANCELLED: 'لغو شده',
  // Class statuses
  SCHEDULED: 'برنامه‌ریزی شده',
  IN_PROGRESS: 'در حال برگزاری',
  // Course levels
  BEGINNER: 'مقدماتی',
  INTERMEDIATE: 'متوسط',
  ADVANCED: 'پیشرفته',
  COMPETITION: 'مسابقات',
  // Exam types
  PLACEMENT: 'سنجش',
  LESSON_QUIZ: 'آزمون درس',
  MIDTERM: 'میان‌ترم',
  FINAL: 'پایان‌ترم',
  COMPETITION: 'مسابقات',
  PRACTICE: 'تمرینی',
  // Exam statuses
  DRAFT: 'پیش‌نویس',
  PUBLISHED: 'منتشر شده',
  CLOSED: 'بسته شده',
  ARCHIVED: 'بایگانی',
  // Tuition statuses
  PENDING: 'در انتظار',
  PARTIAL: 'پرداخت جزئی',
  PAID: 'پرداخت شده',
  OVERDUE: 'سررسید گذشته',
  // Enrollment statuses
  PAUSED: 'مکث',
  // Payment types
  CASH: 'نقدی',
  INSTALLMENT: 'اقساطی',
  ONLINE: 'آنلاین',
  TRANSFER: 'انتقال',
  // Priority
  LOW: 'کم',
  MEDIUM: 'متوسط',
  HIGH: 'زیاد',
  URGENT: 'فوری',
  // Question difficulty
  EASY: 'آسان',
  HARD: 'سخت',
  EXPERT: 'حرفه‌ای',
  // Question types
  MULTIPLE_CHOICE: 'چندگزینه‌ای',
  TRUE_FALSE: 'صحیح/غلط',
  FILL_BLANK: 'جای خالی',
  MENTAL_CALCULATION: 'حساب ذهنی',
  ABACUS_READING: 'خواندن چرتکه',
  NUMBER_SEQUENCE: 'دنباله اعداد',
  // Days of week
  SATURDAY: 'شنبه',
  SUNDAY: 'یکشنبه',
  MONDAY: 'دوشنبه',
  TUESDAY: 'سه‌شنبه',
  WEDNESDAY: 'چهارشنبه',
  THURSDARY: 'پنج‌شنبه',
  FRIDAY: 'جمعه',
  // Revenue categories
  TUITION: 'شهریه',
  EXAM_FEE: 'هزینه آزمون',
  CERTIFICATE_FEE: 'هزینه گواهینامه',
  CONSULTATION_FEE: 'هزینه مشاوره',
  MATERIAL_SALE: 'فروش مواد',
  OTHER: 'سایر',
  // Expense categories
  OPERATIONAL: 'عملیاتی',
  SALARY: 'حقوق',
  RENT: 'اجاره',
  UTILITIES: 'قبوض',
  MARKETING: 'بازاریابی',
  EQUIPMENT: 'تجهیزات',
  MATERIALS: 'مواد اولیه',
  // User roles
  SUPER_ADMIN: 'مدیر ارشد',
  ADMIN: 'مدیر',
  BRANCH_MANAGER: 'مدیر شعبه',
  INSTRUCTOR: 'استاد',
  STAFF: 'کارمند',
  STUDENT: 'کارآموز',
  PARENT: 'ولی',
  // Follow-up types
  CALL: 'تماس تلفنی',
  WHATSAPP: 'واتساپ',
  MEETING: 'جلسه حضوری',
  EMAIL: 'ایمیل',
  // Follow-up completion
  COMPLETED_FOLLOWUP: 'انجام شده',
  PENDING_FOLLOWUP: 'در انتظار',
  // Consultation statuses
  NEW_CONSULTATION: 'جدید',
  CONTACTED_CONSULTATION: 'تماس گرفته شده',
  SCHEDULED_CONSULTATION: 'برنامه‌ریزی شده',
  CONVERTED_CONSULTATION: 'تبدیل شده',
  LOST_CONSULTATION: 'از دست رفته',
  // Campaign statuses
  DRAFT_CAMPAIGN: 'پیش‌نویس',
  ACTIVE_CAMPAIGN: 'فعال',
  PAUSED_CAMPAIGN: 'متوقف شده',
  COMPLETED_CAMPAIGN: 'تکمیل شده',
  CANCELLED_CAMPAIGN: 'لغو شده',
  // Campaign types
  SOCIAL_MEDIA: 'شبکه اجتماعی',
  EMAIL_CAMPAIGN: 'ایمیل',
  SMS_CAMPAIGN: 'پیامک',
  REFERRAL_BOOST: 'تقویت معرف',
  DISCOUNT: 'تخفیف',
  EVENT: 'رویداد',
  SEO: 'سئو',
  // Campaign channels
  INSTAGRAM_CHANNEL: 'اینستاگرام',
  TELEGRAM_CHANNEL: 'تلگرام',
  WHATSAPP_CHANNEL: 'واتساپ',
  SMS_CHANNEL: 'پیامک',
  EMAIL_CHANNEL: 'ایمیل',
  WEBSITE_CHANNEL: 'وبسایت',
  OFFLINE_CHANNEL: 'حضوری',
  // Content types
  VIDEO: 'ویدیو',
  DOCUMENT: 'سند',
  AUDIO: 'صوتی',
  IMAGE: 'تصویر',
  LINK: 'لینک',
  PRESENTATION: 'ارائه',
  WORKSHEET: 'کاربرگ',
  // Assignment types
  HOMEWORK: 'تکلیف',
  PROJECT: 'پروژه',
  PRACTICE: 'تمرین',
  RESEARCH: 'تحقیق',
  // Assignment statuses
  GRADED: 'نمره‌گذاری شده',
  // Submission statuses
  SUBMITTED: 'ارسال شده',
  LATE: 'دیرتر از موعد',
  RETURNED: 'بازگشت داده شده',
  // Attendance statuses
  PRESENT: 'حاضر',
  ABSENT: 'غایب',
  EXCUSED: 'مرخصی',
  // Invoice statuses
  SENT: 'ارسال شده',
};

export const getStatusBadgeClass = (status: string): string => {
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

export const getStatusLabel = (status: string): string => {
  return statusLabels[status] || status;
};
