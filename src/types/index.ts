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

// ─── CRM — مدیریت مشتریان ───────────────────────────────

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  childName?: string;
  childAge?: number;
  interestedCourse?: string;
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

// ─── آزمون و ارزیابی ────────────────────────────────────

export interface Exam {
  id: string;
  title: string;
  description: string;
  type: ExamType;
  level: StudentLevel;
  questions: ExamQuestion[];
  duration: number; // minutes
  totalScore: number;
  passingScore: number;
}

export type ExamType =
  | 'placement'
  | 'lesson_quiz'
  | 'midterm'
  | 'final'
  | 'competition'
  | 'practice';

export interface ExamQuestion {
  id: string;
  type: QuestionType;
  question: string;
  image?: string;
  options?: ExamOption[];
  correctAnswer?: string | number;
  points: number;
  explanation?: string;
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
}

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

// ─── داشبورد و گزارش‌ها ─────────────────────────────────

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  totalLeads: number;
  newLeadsThisMonth: number;
  conversionRate: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingReferrals: number;
}

// ─── دستاورد ────────────────────────────────────────────

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
