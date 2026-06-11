// ═══════════════════════════════════════════════════════════
//  تایپ‌های آموزشگاه چرتکه دهگانی ویرا
//  Vira Decimal Abacus - Type Definitions
// ═══════════════════════════════════════════════════════════

// ─── کاربر و احراز هویت ─────────────────────────────────

export type UserRole = 'admin' | 'instructor' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Admin extends User {
  role: 'admin';
  permissions: AdminPermission[];
}

export type AdminPermission =
  | 'manage_users'
  | 'manage_courses'
  | 'manage_exams'
  | 'manage_finance'
  | 'manage_referrals'
  | 'view_reports'
  | 'manage_settings';

export interface Instructor extends User {
  role: 'instructor';
  specialties: string[];
  courses: string[]; // course IDs
  bio?: string;
}

export interface Parent extends User {
  role: 'parent';
  children: Student[]; // linked student profiles
  referralCode?: string;
}

export interface Student extends User {
  role: 'student';
  parentId?: string;
  parentName?: string;
  age: number;
  level: StudentLevel;
  enrolledCourses: string[];
  referralCode?: string;
  referredBy?: string;
}

export type StudentLevel = 'beginner' | 'intermediate' | 'advanced' | 'competition';

// ─── دوره‌های آموزشی ────────────────────────────────────

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: 'مقدماتی' | 'متوسط' | 'پیشرفته';
  ageRange: string;
  duration: string;
  sessions: number;
  sessionsPerWeek: number;
  sessionDuration: number; // minutes
  price: number;
  priceFormatted: string; // e.g. '۲,۸۰۰,۰۰۰'
  features: string[];
  icon: string;
  color: string;
  instructor?: string; // instructor ID
  schedule: ClassSchedule[];
  syllabus: SyllabusItem[];
  status: CourseStatus;
  capacity: number;
  enrolledCount: number;
  startDate?: string;
  endDate?: string;
}

export type CourseStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';

export interface ClassSchedule {
  dayOfWeek: DayOfWeek;
  startTime: string; // '16:00'
  endTime: string;   // '17:30'
  location?: string;
  isOnline: boolean;
}

export type DayOfWeek = 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export interface SyllabusItem {
  sessionNumber: number;
  title: string;
  topics: string[];
  homework?: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  paymentStatus: PaymentStatus;
  paymentAmount: number;
  discountCode?: string;
  referralCode?: string;
  notes?: string;
}

export type EnrollmentStatus = 'pending' | 'active' | 'paused' | 'completed' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'partial' | 'paid' | 'refunded';

// ─── CRM — مدیریت مشتریان ───────────────────────────────

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  childName?: string;
  childAge?: number;
  interestedCourse?: string;
  province?: string;
  city?: string;
  source: LeadSource;
  status: LeadStatus;
  priority: LeadPriority;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  referralCode?: string;
}

export type LeadSource =
  | 'website_form'
  | 'whatsapp'
  | 'phone_call'
  | 'instagram'
  | 'telegram'
  | 'referral'
  | 'walk_in'
  | 'advertisement'
  | 'other';

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'consultation_scheduled'
  | 'consultation_done'
  | 'trial_class_scheduled'
  | 'trial_class_done'
  | 'enrollment_offered'
  | 'enrolled'
  | 'lost'
  | 'not_interested';

export type LeadPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface LeadNote {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
  type: 'general' | 'call' | 'whatsapp' | 'meeting' | 'system';
}

export interface FollowUp {
  id: string;
  scheduledAt: string;
  type: 'call' | 'whatsapp' | 'meeting' | 'email';
  note?: string;
  completed: boolean;
  completedAt?: string;
}

// ─── آزمون و ارزیابی ────────────────────────────────────

export interface Exam {
  id: string;
  title: string;
  description: string;
  type: ExamType;
  level: StudentLevel;
  courseId?: string;
  questions: ExamQuestion[];
  duration: number; // minutes
  totalScore: number;
  passingScore: number;
  status?: ExamStatus;
  availableFrom?: string;
  availableTo?: string;
  createdAt?: string;
  createdBy?: string;
}

export type ExamType =
  | 'placement'
  | 'lesson_quiz'
  | 'midterm'
  | 'final'
  | 'competition'
  | 'practice';

export type ExamStatus = 'draft' | 'published' | 'active' | 'closed' | 'archived';

export interface ExamQuestion {
  id: string;
  type: QuestionType;
  question: string;
  image?: string;
  options?: ExamOption[];
  correctAnswer?: string | number;
  points: number;
  explanation?: string;
  timeLimit?: number; // seconds
  difficulty: QuestionDifficulty;
  category?: string;
}

export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'fill_blank'
  | 'mental_calculation'
  | 'abacus_reading'
  | 'number_sequence';

export type QuestionDifficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface ExamOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  answers: ExamAnswer[];
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  startedAt: string;
  completedAt?: string;
  duration: number; // seconds
  status?: AttemptStatus;
}

export type AttemptStatus = 'in_progress' | 'completed' | 'timeout' | 'abandoned';

export interface ExamAnswer {
  questionId: string;
  answer: string | number;
  isCorrect?: boolean;
  timeSpent?: number;
}

export interface ExamResult {
  examId: string;
  examTitle: string;
  examType: ExamType;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
  rank?: number;
  totalParticipants?: number;
  duration: number;
}

// ─── سیستم معرف ─────────────────────────────────────────

export interface Referral {
  id: string;
  referrerCode: string;
  referrerId: string;
  referrerName: string;
  referredId: string;
  referredName: string;
  referredPhone: string;
  status: ReferralStatus;
  reward: ReferralReward;
  courseEnrolled?: string;
  createdAt: string;
  convertedAt?: string;
  rewardClaimedAt?: string;
}

export type ReferralStatus =
  | 'registered'
  | 'consultation'
  | 'trial_done'
  | 'enrolled'
  | 'reward_pending'
  | 'reward_claimed'
  | 'expired';

export interface ReferralReward {
  type: ReferralRewardType;
  referrerValue: number;
  referredValue: number;
  referrerDescription: string;
  referredDescription: string;
}

export type ReferralRewardType =
  | 'discount_percentage'
  | 'discount_fixed'
  | 'free_session'
  | 'cash_bonus';

export interface ReferralStats {
  totalReferrals: number;
  successfulReferrals: number;
  pendingRewards: number;
  claimedRewards: number;
  totalEarnings: number;
  referralCode: string;
  referralLink: string;
}

// ─── فرم مشاوره ─────────────────────────────────────────

export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  childName?: string;
  childAge?: string;
  interestedCourse?: string;
  province?: string;
  city?: string;
  message?: string;
  source: 'website' | 'whatsapp' | 'instagram' | 'referral';
  referralCode?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'converted' | 'lost';
  createdAt: string;
  leadId?: string; // linked CRM lead
}

// ─── داشبورد و گزارش‌ها ─────────────────────────────────

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  totalLeads: number;
  newLeadsThisMonth: number;
  conversionRate: number;
  totalRevenue: number;
  monthlyRevenue: number;
  upcomingClasses: number;
  activeExams: number;
  pendingReferrals: number;
  studentGrowth: MonthlyData[];
  revenueGrowth: MonthlyData[];
  leadSources: LeadSourceData[];
}

export interface MonthlyData {
  month: string; // 'فروردین', 'اردیبهشت', ...
  value: number;
}

export interface LeadSourceData {
  source: LeadSource;
  count: number;
  percentage: number;
}

// ─── دستاورد و گواهینامه ───────────────────────────────

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'course_completion' | 'exam_passed' | 'competition_rank' | 'streak' | 'referral';
  earnedAt: string;
  courseId?: string;
  examId?: string;
}

export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  level: StudentLevel;
  completedAt: string;
  issuedAt: string;
  certificateNumber: string;
  verificationUrl: string;
}

// ─── نوتیفیکیشن ────────────────────────────────────────

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export type NotificationType =
  | 'new_lead'
  | 'new_enrollment'
  | 'exam_result'
  | 'follow_up_reminder'
  | 'referral_reward'
  | 'class_reminder'
  | 'payment'
  | 'system';

// ─── کمپین بازاریابی ────────────────────────────────────

export interface Campaign {
  id: string;
  title: string;
  description: string;
  type: CampaignType;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  targetAudience: string;
  channels: CampaignChannel[];
  leadsGenerated: number;
  conversions: number;
  createdAt: string;
  updatedAt: string;
}

export type CampaignType = 'social_media' | 'email' | 'sms' | 'referral_boost' | 'discount' | 'event' | 'seo';
export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
export type CampaignChannel = 'instagram' | 'telegram' | 'whatsapp' | 'sms' | 'email' | 'website' | 'offline';

// ─── نظرسنجی رضایت ─────────────────────────────────────

export interface SatisfactionSurvey {
  id: string;
  title: string;
  type: 'course' | 'instructor' | 'general' | 'facility';
  questions: SurveyQuestion[];
  status: 'draft' | 'active' | 'closed';
  responses: SurveyResponse[];
  createdAt: string;
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'rating' | 'text' | 'multiple_choice';
  options?: string[];
  required: boolean;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  respondentName: string;
  respondentPhone: string;
  answers: SurveyAnswer[];
  submittedAt: string;
}

export interface SurveyAnswer {
  questionId: string;
  rating?: number;
  text?: string;
  selectedOption?: string;
}

// ─── محتوای آموزشی ─────────────────────────────────────

export interface CourseContent {
  id: string;
  courseId: string;
  sessionId: number;
  title: string;
  type: ContentType;
  url?: string;
  description: string;
  fileSize?: number;
  duration?: number;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ContentType = 'video' | 'document' | 'audio' | 'image' | 'link' | 'presentation' | 'worksheet';

// ─── تکلیف و پروژه ─────────────────────────────────────

export interface Assignment {
  id: string;
  courseId: string;
  sessionId?: number;
  title: string;
  description: string;
  type: 'homework' | 'project' | 'practice' | 'research';
  dueDate: string;
  maxScore: number;
  submissions: AssignmentSubmission[];
  status: 'active' | 'closed' | 'graded';
  createdAt: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  content: string;
  fileUrl?: string;
  score?: number;
  feedback?: string;
  submittedAt: string;
  gradedAt?: string;
  status: 'submitted' | 'late' | 'graded' | 'returned';
}

// ─── حضور و غیاب ───────────────────────────────────────

export interface AttendanceRecord {
  id: string;
  classId: string;
  courseId: string;
  sessionId: number;
  date: string;
  records: StudentAttendance[];
  instructorId: string;
  createdAt: string;
}

export interface StudentAttendance {
  studentId: string;
  studentName: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

// ─── تقویم آموزشی ───────────────────────────────────────

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  type: 'class' | 'exam' | 'holiday' | 'event' | 'deadline' | 'meeting';
  startDate: string;
  endDate: string;
  courseId?: string;
  branchId?: string;
  isAllDay: boolean;
  color: string;
  createdAt: string;
}

// ─── فاکتور ────────────────────────────────────────────

export interface Invoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  dueDate: string;
  paidAmount: number;
  paidAt?: string;
  paymentMethod?: PaymentMethod;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'partial' | 'overdue' | 'cancelled';
export type PaymentMethod = 'cash' | 'card' | 'transfer' | 'online' | 'cheque';

// ─── اقساط ─────────────────────────────────────────────

export interface InstallmentPlan {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  installments: Installment[];
  status: 'active' | 'completed' | 'overdue' | 'cancelled';
  createdAt: string;
}

export interface Installment {
  id: string;
  planId: string;
  amount: number;
  dueDate: string;
  paidAt?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod?: PaymentMethod;
  notes?: string;
}

// ─── حقوق و دستمزد ─────────────────────────────────────

export interface SalaryRecord {
  id: string;
  staffId: string;
  staffName: string;
  staffRole: string;
  baseSalary: number;
  bonuses: number;
  deductions: number;
  netSalary: number;
  month: string;
  year: number;
  status: 'pending' | 'paid';
  paidAt?: string;
  paymentMethod?: PaymentMethod;
  notes?: string;
  createdAt: string;
}

// ─── کارکنان ────────────────────────────────────────────

export interface Staff {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: StaffRole;
  branchId?: string;
  branchName?: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive';
  nationalId?: string;
  address?: string;
  emergencyContact?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type StaffRole = 'manager' | 'receptionist' | 'accountant' | 'marketing' | 'support' | 'it' | 'cleaner' | 'other';

// ─── لاگ حسابرسی ────────────────────────────────────────

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  timestamp: string;
}

// ─── تنظیمات سیستم ─────────────────────────────────────

export interface SystemSettings {
  instituteName: string;
  instituteNameEn: string;
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  website: string;
  logo: string;
  fiscalYearStart: string;
  currency: string;
  defaultPaymentMethod: PaymentMethod;
  smsEnabled: boolean;
  emailEnabled: boolean;
  whatsappEnabled: boolean;
  referralRewardType: ReferralRewardType;
  referralRewardValue: number;
  autoBackup: boolean;
  backupInterval: number;
  maintenanceMode: boolean;
}

// ─── فارسی‌سازی برچسب‌ها ─────────────────────────────────

export const leadSourceLabels: Record<LeadSource, string> = {
  website_form: 'فرم وبسایت',
  whatsapp: 'واتساپ',
  phone_call: 'تماس تلفنی',
  instagram: 'اینستاگرام',
  telegram: 'تلگرام',
  referral: 'معرفی',
  walk_in: 'مراجعه حضوری',
  advertisement: 'تبلیغات',
  other: 'سایر',
};

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: 'جدید',
  contacted: 'تماس گرفته شد',
  consultation_scheduled: 'مشاوره برنامه‌ریزی شده',
  consultation_done: 'مشاوره انجام شد',
  trial_class_scheduled: 'کلاس آزمایشی برنامه‌ریزی شده',
  trial_class_done: 'کلاس آزمایشی انجام شد',
  enrollment_offered: 'ثبت‌نام پیشنهاد شده',
  enrolled: 'ثبت‌نام شده',
  lost: 'از دست رفته',
  not_interested: 'علاقه‌مند نیست',
};

export const leadPriorityLabels: Record<LeadPriority, string> = {
  low: 'پایین',
  medium: 'متوسط',
  high: 'بالا',
  urgent: 'فوری',
};

export const studentLevelLabels: Record<StudentLevel, string> = {
  beginner: 'مقدماتی',
  intermediate: 'متوسط',
  advanced: 'پیشرفته',
  competition: 'مسابقات',
};

export const referralStatusLabels: Record<ReferralStatus, string> = {
  registered: 'ثبت‌نام شده',
  consultation: 'مشاوره انجام شده',
  trial_done: 'کلاس آزمایشی رفته',
  enrolled: 'ثبت‌نام قطعی',
  reward_pending: 'جایزه در انتظار',
  reward_claimed: 'جایزه دریافت شده',
  expired: 'منقضی شده',
};

export const examTypeLabels: Record<ExamType, string> = {
  placement: 'آزمون تعیین سطح',
  lesson_quiz: 'آزمون درس',
  midterm: 'میان‌ترم',
  final: 'پایان‌ترم',
  competition: 'مسابقه‌ای',
  practice: 'تمرینی',
};

export const examStatusLabels: Record<ExamStatus, string> = {
  draft: 'پیش‌نویس',
  published: 'منتشر شده',
  active: 'فعال',
  closed: 'بسته شده',
  archived: 'بایگانی شده',
};

export const courseStatusLabels: Record<CourseStatus, string> = {
  upcoming: 'آینده',
  active: 'فعال',
  completed: 'تکمیل شده',
  cancelled: 'لغو شده',
};

// ─── فارسی‌سازی برچسب‌های فاز ۱ ─────────────────────────

export const campaignTypeLabels: Record<CampaignType, string> = {
  social_media: 'شبکه اجتماعی',
  email: 'ایمیل',
  sms: 'پیامک',
  referral_boost: 'تقویت معرف',
  discount: 'تخفیف',
  event: 'رویداد',
  seo: 'سئو',
};

export const campaignStatusLabels: Record<CampaignStatus, string> = {
  draft: 'پیش‌نویس',
  active: 'فعال',
  paused: 'متوقف شده',
  completed: 'تکمیل شده',
  cancelled: 'لغو شده',
};

export const campaignChannelLabels: Record<CampaignChannel, string> = {
  instagram: 'اینستاگرام',
  telegram: 'تلگرام',
  whatsapp: 'واتساپ',
  sms: 'پیامک',
  email: 'ایمیل',
  website: 'وبسایت',
  offline: 'حضوری',
};

export const contentTypeLabels: Record<ContentType, string> = {
  video: 'ویدیو',
  document: 'سند',
  audio: 'صوتی',
  image: 'تصویر',
  link: 'لینک',
  presentation: 'ارائه',
  worksheet: 'کاربرگ',
};

export const invoiceStatusLabels: Record<InvoiceStatus, string> = {
  draft: 'پیش‌نویس',
  sent: 'ارسال شده',
  paid: 'پرداخت شده',
  partial: 'پرداخت جزئی',
  overdue: 'سررسید گذشته',
  cancelled: 'لغو شده',
};

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  cash: 'نقدی',
  card: 'کارت',
  transfer: 'انتقال',
  online: 'آنلاین',
  cheque: 'چک',
};

export const staffRoleLabels: Record<StaffRole, string> = {
  manager: 'مدیر',
  receptionist: 'پذیرش',
  accountant: 'حسابدار',
  marketing: 'بازاریابی',
  support: 'پشتیبانی',
  it: 'فناوری اطلاعات',
  cleaner: 'نظافت',
  other: 'سایر',
};

export const attendanceStatusLabels: Record<'present' | 'absent' | 'late' | 'excused', string> = {
  present: 'حاضر',
  absent: 'غایب',
  late: 'تأخیر',
  excused: 'مرخصی',
};

export const calendarEventTypeLabels: Record<CalendarEvent['type'], string> = {
  class: 'کلاس',
  exam: 'آزمون',
  holiday: 'تعطیلی',
  event: 'رویداد',
  deadline: 'مهلت',
  meeting: 'جلسه',
};

export const assignmentTypeLabels: Record<Assignment['type'], string> = {
  homework: 'تکلیف',
  project: 'پروژه',
  practice: 'تمرین',
  research: 'تحقیق',
};

export const installmentStatusLabels: Record<Installment['status'], string> = {
  pending: 'در انتظار',
  paid: 'پرداخت شده',
  overdue: 'سررسید گذشته',
  cancelled: 'لغو شده',
};
