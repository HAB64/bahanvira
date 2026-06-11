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
};

export const getStatusBadgeClass = (status: string): string => {
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

export const getStatusLabel = (status: string): string => {
  return statusLabels[status] || status;
};
