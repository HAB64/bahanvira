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
  createdAt: Date;
  updatedAt: Date;
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
  enrolledCourses: string[]; // course IDs
  examHistory: ExamResult[];
  achievements: Achievement[];
  referralCode?: string;
  referredBy?: string; // referral code of who referred them
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
  startDate?: Date;
  endDate?: Date;
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
  enrolledAt: Date;
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
  source: LeadSource;
  status: LeadStatus;
  priority: LeadPriority;
  notes: LeadNote[];
  followUps: FollowUp[];
  assignedTo?: string; // admin/instructor ID
  createdAt: Date;
  updatedAt: Date;
  firstContactAt: Date;
  lastContactAt?: Date;
  convertedToStudentId?: string;
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
  createdAt: Date;
  type: 'general' | 'call' | 'whatsapp' | 'meeting' | 'system';
}

export interface FollowUp {
  id: string;
  scheduledAt: Date;
  type: 'call' | 'whatsapp' | 'meeting' | 'email';
  note?: string;
  completed: boolean;
  completedAt?: Date;
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
  status: ExamStatus;
  availableFrom?: Date;
  availableTo?: Date;
  createdAt: Date;
  createdBy: string;
}

export type ExamType =
  | 'placement'      // آزمون تعیین سطح
  | 'lesson_quiz'    // آزمون درس
  | 'midterm'        // میان‌ترم
  | 'final'          // پایان‌ترم
  | 'competition'    // مسابقه‌ای
  | 'practice';      // تمرینی

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
  category?: string; // e.g. 'addition', 'subtraction', 'mental_math'
}

export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'fill_blank'
  | 'mental_calculation'
  | 'abacus_reading'
  | 'number_sequence'
  | 'matching'
  | 'descriptive';

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
  answers: ExamAnswer[];
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  startedAt: Date;
  completedAt?: Date;
  duration: number; // seconds
  status: AttemptStatus;
}

export type AttemptStatus = 'in_progress' | 'completed' | 'timeout' | 'abandoned';

export interface ExamAnswer {
  questionId: string;
  answer: string | number;
  isCorrect?: boolean;
  timeSpent?: number; // seconds
}

export interface ExamResult {
  examId: string;
  examTitle: string;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  completedAt: Date;
  rank?: number;
  totalParticipants?: number;
}

// ─── سیستم معرف ─────────────────────────────────────────

export interface Referral {
  id: string;
  referrerCode: string;      // کد معرف
  referrerId: string;        // آیدی معرف
  referrerName: string;      // نام معرف
  referredId: string;        // آیدی معرفی‌شده
  referredName: string;      // نام معرفی‌شده
  referredPhone: string;     // شماره معرفی‌شده
  status: ReferralStatus;
  reward: ReferralReward;
  courseEnrolled?: string;   // course ID if enrolled
  createdAt: Date;
  convertedAt?: Date;
  rewardClaimedAt?: Date;
}

export type ReferralStatus =
  | 'registered'     // ثبت‌نام شده با کد معرف
  | 'consultation'   // مشاوره انجام شده
  | 'trial_done'     // کلاس آزمایشی رفته
  | 'enrolled'       // ثبت‌نام قطعی
  | 'reward_pending' // جایزه در انتظار
  | 'reward_claimed' // جایزه دریافت شده
  | 'expired';       // منقضی شده

export interface ReferralReward {
  type: ReferralRewardType;
  referrerValue: number;     // مبلغ تخفیف برای معرف
  referredValue: number;     // مبلغ تخفیف برای معرفی‌شده
  referrerDescription: string;
  referredDescription: string;
}

export type ReferralRewardType =
  | 'discount_percentage'    // درصد تخفیف
  | 'discount_fixed'         // مبلغ ثابت تخفیف
  | 'free_session'           // جلسه رایگان
  | 'cash_bonus';            // پاداش نقدی

export interface ReferralStats {
  totalReferrals: number;
  successfulReferrals: number;
  pendingRewards: number;
  claimedRewards: number;
  totalEarnings: number;
  referralCode: string;
  referralLink: string;
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

// ─── فرم مشاوره ─────────────────────────────────────────

export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  childName?: string;
  childAge?: string;
  interestedCourse?: string;
  message?: string;
  source: 'website' | 'whatsapp' | 'instagram' | 'referral';
  referralCode?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'converted' | 'lost';
  createdAt: Date;
  leadId?: string; // linked CRM lead
}

// ─── دستاورد و گواهینامه ───────────────────────────────

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'course_completion' | 'exam_passed' | 'competition_rank' | 'streak' | 'referral';
  earnedAt: Date;
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
  completedAt: Date;
  issuedAt: Date;
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
  createdAt: Date;
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
