// ═══════════════════════════════════════════════════════════
//  مدیریت ذخیره‌سازی محلی (localStorage)
//  Vira Decimal Abacus - Local Storage Helpers
// ═══════════════════════════════════════════════════════════

import type {
  Lead, Student, Referral, ExamAttempt, ExamResult, ConsultationRequest, LeadSourceData,
  Campaign, FollowUp, CourseContent, Assignment, AttendanceRecord, CalendarEvent,
  Invoice, InstallmentPlan, SalaryRecord, Staff, Notification, AuditLogEntry, SystemSettings
} from '@/types';
import { leadSourceLabels, type LeadSource } from '@/types';

const STORAGE_KEYS = {
  ADMIN_AUTH: 'vira_admin_auth',
  PORTAL_AUTH: 'vira_portal_auth',
  LEADS: 'vira_leads',
  STUDENTS: 'vira_students',
  REFERRALS: 'vira_referrals',
  EXAM_ATTEMPTS: 'vira_exam_attempts',
  STUDENT_RESULTS: 'vira_student_results',
  STUDENT_ACHIEVEMENTS: 'vira_student_achievements',
  CONSULTATION_REQUESTS: 'vira_consultation_requests',
  CAMPAIGNS: 'vira_campaigns',
  FOLLOWUPS: 'vira_followups',
  COURSE_CONTENT: 'vira_course_content',
  ASSIGNMENTS: 'vira_assignments',
  ATTENDANCE: 'vira_attendance',
  CALENDAR_EVENTS: 'vira_calendar_events',
  INVOICES: 'vira_invoices',
  INSTALLMENT_PLANS: 'vira_installment_plans',
  SALARY_RECORDS: 'vira_salary_records',
  STAFF: 'vira_staff',
  NOTIFICATIONS: 'vira_notifications',
  AUDIT_LOG: 'vira_audit_log',
  SYSTEM_SETTINGS: 'vira_system_settings',
  DATA_INITIALIZED: 'vira_data_initialized',
} as const;

// ─── Helper Functions ─────────────────────────────────────

function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('localStorage write error:', e);
  }
}

// ─── Admin Auth ───────────────────────────────────────────

export function isAdminAuthenticated(): boolean {
  return getItem(STORAGE_KEYS.ADMIN_AUTH, false);
}

export function loginAdmin(password: string): boolean {
  if (password === 'vira2024') {
    setItem(STORAGE_KEYS.ADMIN_AUTH, true);
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  setItem(STORAGE_KEYS.ADMIN_AUTH, false);
}

// ─── Portal Auth ──────────────────────────────────────────

export interface PortalUser {
  phone: string;
  name: string;
  studentId: string;
  isLoggedIn: boolean;
}

export function getPortalUser(): PortalUser | null {
  return getItem<PortalUser | null>(STORAGE_KEYS.PORTAL_AUTH, null);
}

export function loginPortal(phone: string): PortalUser | null {
  const students = getStudents();
  const student = students.find(s => s.phone === phone);
  if (student) {
    const portalUser: PortalUser = {
      phone: student.phone,
      name: student.name,
      studentId: student.id,
      isLoggedIn: true,
    };
    setItem(STORAGE_KEYS.PORTAL_AUTH, portalUser);
    return portalUser;
  }
  return null;
}

export function logoutPortal(): void {
  setItem(STORAGE_KEYS.PORTAL_AUTH, null);
}

// ─── Leads ────────────────────────────────────────────────

export function getLeads(): Lead[] {
  return getItem<Lead[]>(STORAGE_KEYS.LEADS, []);
}

export function saveLeads(leads: Lead[]): void {
  setItem(STORAGE_KEYS.LEADS, leads);
}

export function addLead(lead: Lead): void {
  const leads = getLeads();
  leads.unshift(lead);
  saveLeads(leads);
}

export function updateLead(id: string, updates: Partial<Lead>): void {
  const leads = getLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index !== -1) {
    leads[index] = { ...leads[index], ...updates, updatedAt: new Date().toISOString() };
    saveLeads(leads);
  }
}

export function deleteLead(id: string): void {
  const leads = getLeads().filter(l => l.id !== id);
  saveLeads(leads);
}

// ─── Students ─────────────────────────────────────────────

export function getStudents(): Student[] {
  return getItem<Student[]>(STORAGE_KEYS.STUDENTS, []);
}

export function saveStudents(students: Student[]): void {
  setItem(STORAGE_KEYS.STUDENTS, students);
}

export function addStudent(student: Student): void {
  const students = getStudents();
  students.unshift(student);
  saveStudents(students);
}

export function updateStudent(id: string, updates: Partial<Student>): void {
  const students = getStudents();
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students[index] = { ...students[index], ...updates, updatedAt: new Date().toISOString() };
    saveStudents(students);
  }
}

// ─── Referrals ────────────────────────────────────────────

export function getReferrals(): Referral[] {
  return getItem<Referral[]>(STORAGE_KEYS.REFERRALS, []);
}

export function saveReferrals(referrals: Referral[]): void {
  setItem(STORAGE_KEYS.REFERRALS, referrals);
}

export function addReferral(referral: Referral): void {
  const referrals = getReferrals();
  referrals.unshift(referral);
  saveReferrals(referrals);
}

export function updateReferral(id: string, updates: Partial<Referral>): void {
  const referrals = getReferrals();
  const index = referrals.findIndex(r => r.id === id);
  if (index !== -1) {
    referrals[index] = { ...referrals[index], ...updates };
    saveReferrals(referrals);
  }
}

// ─── Consultation Requests ────────────────────────────────

export function getConsultationRequests(): ConsultationRequest[] {
  return getItem<ConsultationRequest[]>(STORAGE_KEYS.CONSULTATION_REQUESTS, []);
}

export function addConsultationRequest(request: ConsultationRequest): void {
  const requests = getConsultationRequests();
  requests.unshift(request);
  setItem(STORAGE_KEYS.CONSULTATION_REQUESTS, requests);
}

export function updateConsultationRequest(id: string, updates: Partial<ConsultationRequest>): void {
  const requests = getConsultationRequests();
  const index = requests.findIndex(r => r.id === id);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...updates };
    setItem(STORAGE_KEYS.CONSULTATION_REQUESTS, requests);
  }
}

// ─── Exam Attempts ────────────────────────────────────────

export function getExamAttempts(): ExamAttempt[] {
  return getItem<ExamAttempt[]>(STORAGE_KEYS.EXAM_ATTEMPTS, []);
}

export function saveExamAttempts(attempts: ExamAttempt[]): void {
  setItem(STORAGE_KEYS.EXAM_ATTEMPTS, attempts);
}

export function addExamAttempt(attempt: ExamAttempt): void {
  const attempts = getExamAttempts();
  attempts.unshift(attempt);
  saveExamAttempts(attempts);
}

// ─── Student Results (by student ID) ─────────────────────

export function getStudentResults(studentId?: string): ExamResult[] {
  const allResults = getItem<ExamResult[]>(STORAGE_KEYS.STUDENT_RESULTS, []);
  if (studentId) {
    // We store results keyed by student, but for simplicity store all
    return allResults;
  }
  return allResults;
}

export function addStudentResult(result: ExamResult): void {
  const results = getStudentResults();
  results.unshift(result);
  setItem(STORAGE_KEYS.STUDENT_RESULTS, results);
}

// ─── Data Initialization Check ────────────────────────────

export function isDataInitialized(): boolean {
  return getItem(STORAGE_KEYS.DATA_INITIALIZED, false);
}

export function markDataInitialized(): void {
  setItem(STORAGE_KEYS.DATA_INITIALIZED, true);
}

// ─── Dashboard Stats Calculator ──────────────────────────

export function calculateDashboardStats() {
  const students = getStudents();
  const leads = getLeads();
  const referrals = getReferrals();

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const newLeadsThisMonth = leads.filter(l => {
    const d = new Date(l.createdAt);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  }).length;

  const enrolledLeads = leads.filter(l => l.status === 'enrolled').length;
  const conversionRate = leads.length > 0 ? Math.round((enrolledLeads / leads.length) * 100) : 0;

  const totalRevenue = students.length * 3500000; // Average revenue per student
  const monthlyRevenue = newLeadsThisMonth * 3500000;

  const pendingReferrals = referrals.filter(r =>
    r.status === 'registered' || r.status === 'reward_pending'
  ).length;

  // Calculate lead sources breakdown
  const sourceCounts: Record<string, number> = {};
  leads.forEach(l => {
    sourceCounts[l.source] = (sourceCounts[l.source] || 0) + 1;
  });

  const leadSources: LeadSourceData[] = Object.entries(sourceCounts).map(([source, count]) => ({
    source: source as LeadSource,
    count,
    percentage: leads.length > 0 ? Math.round((count / leads.length) * 100) : 0,
  })).sort((a, b) => b.count - a.count);

  return {
    totalStudents: students.length,
    activeStudents: students.length,
    totalLeads: leads.length,
    newLeadsThisMonth,
    conversionRate,
    totalRevenue,
    monthlyRevenue,
    upcomingClasses: 4, // From scheduled classes
    activeExams: 2, // From sampleExams
    pendingReferrals,
    studentGrowth: [] as { month: string; value: number }[],
    revenueGrowth: [] as { month: string; value: number }[],
    leadSources,
  };
}

// ─── Campaigns ────────────────────────────────────────────

export function getCampaigns(): Campaign[] {
  return getItem<Campaign[]>(STORAGE_KEYS.CAMPAIGNS, []);
}

export function saveCampaigns(campaigns: Campaign[]): void {
  setItem(STORAGE_KEYS.CAMPAIGNS, campaigns);
}

export function addCampaign(campaign: Campaign): void {
  const campaigns = getCampaigns();
  campaigns.unshift(campaign);
  saveCampaigns(campaigns);
}

export function updateCampaign(id: string, updates: Partial<Campaign>): void {
  const campaigns = getCampaigns();
  const index = campaigns.findIndex(c => c.id === id);
  if (index !== -1) {
    campaigns[index] = { ...campaigns[index], ...updates, updatedAt: new Date().toISOString() };
    saveCampaigns(campaigns);
  }
}

export function deleteCampaign(id: string): void {
  saveCampaigns(getCampaigns().filter(c => c.id !== id));
}

// ─── Follow-ups ───────────────────────────────────────────

export function getFollowUps(): FollowUp[] {
  return getItem<FollowUp[]>(STORAGE_KEYS.FOLLOWUPS, []);
}

export function saveFollowUps(followups: FollowUp[]): void {
  setItem(STORAGE_KEYS.FOLLOWUPS, followups);
}

export function addFollowUp(followup: FollowUp): void {
  const followups = getFollowUps();
  followups.unshift(followup);
  saveFollowUps(followups);
}

export function updateFollowUp(id: string, updates: Partial<FollowUp>): void {
  const followups = getFollowUps();
  const index = followups.findIndex(f => f.id === id);
  if (index !== -1) {
    followups[index] = { ...followups[index], ...updates };
    saveFollowUps(followups);
  }
}

// ─── Course Content ───────────────────────────────────────

export function getCourseContent(): CourseContent[] {
  return getItem<CourseContent[]>(STORAGE_KEYS.COURSE_CONTENT, []);
}

export function saveCourseContent(content: CourseContent[]): void {
  setItem(STORAGE_KEYS.COURSE_CONTENT, content);
}

export function addCourseContent(content: CourseContent): void {
  const items = getCourseContent();
  items.unshift(content);
  saveCourseContent(items);
}

export function updateCourseContent(id: string, updates: Partial<CourseContent>): void {
  const items = getCourseContent();
  const index = items.findIndex(c => c.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
    saveCourseContent(items);
  }
}

export function deleteCourseContent(id: string): void {
  saveCourseContent(getCourseContent().filter(c => c.id !== id));
}

// ─── Assignments ──────────────────────────────────────────

export function getAssignments(): Assignment[] {
  return getItem<Assignment[]>(STORAGE_KEYS.ASSIGNMENTS, []);
}

export function saveAssignments(assignments: Assignment[]): void {
  setItem(STORAGE_KEYS.ASSIGNMENTS, assignments);
}

export function addAssignment(assignment: Assignment): void {
  const items = getAssignments();
  items.unshift(assignment);
  saveAssignments(items);
}

export function updateAssignment(id: string, updates: Partial<Assignment>): void {
  const items = getAssignments();
  const index = items.findIndex(a => a.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates };
    saveAssignments(items);
  }
}

export function deleteAssignment(id: string): void {
  saveAssignments(getAssignments().filter(a => a.id !== id));
}

// ─── Attendance ───────────────────────────────────────────

export function getAttendanceRecords(): AttendanceRecord[] {
  return getItem<AttendanceRecord[]>(STORAGE_KEYS.ATTENDANCE, []);
}

export function saveAttendanceRecords(records: AttendanceRecord[]): void {
  setItem(STORAGE_KEYS.ATTENDANCE, records);
}

export function addAttendanceRecord(record: AttendanceRecord): void {
  const records = getAttendanceRecords();
  records.unshift(record);
  saveAttendanceRecords(records);
}

export function updateAttendanceRecord(id: string, updates: Partial<AttendanceRecord>): void {
  const records = getAttendanceRecords();
  const index = records.findIndex(r => r.id === id);
  if (index !== -1) {
    records[index] = { ...records[index], ...updates };
    saveAttendanceRecords(records);
  }
}

// ─── Calendar Events ──────────────────────────────────────

export function getCalendarEvents(): CalendarEvent[] {
  return getItem<CalendarEvent[]>(STORAGE_KEYS.CALENDAR_EVENTS, []);
}

export function saveCalendarEvents(events: CalendarEvent[]): void {
  setItem(STORAGE_KEYS.CALENDAR_EVENTS, events);
}

export function addCalendarEvent(event: CalendarEvent): void {
  const events = getCalendarEvents();
  events.unshift(event);
  saveCalendarEvents(events);
}

export function updateCalendarEvent(id: string, updates: Partial<CalendarEvent>): void {
  const events = getCalendarEvents();
  const index = events.findIndex(e => e.id === id);
  if (index !== -1) {
    events[index] = { ...events[index], ...updates };
    saveCalendarEvents(events);
  }
}

export function deleteCalendarEvent(id: string): void {
  saveCalendarEvents(getCalendarEvents().filter(e => e.id !== id));
}

// ─── Invoices ─────────────────────────────────────────────

export function getInvoices(): Invoice[] {
  return getItem<Invoice[]>(STORAGE_KEYS.INVOICES, []);
}

export function saveInvoices(invoices: Invoice[]): void {
  setItem(STORAGE_KEYS.INVOICES, invoices);
}

export function addInvoice(invoice: Invoice): void {
  const invoices = getInvoices();
  invoices.unshift(invoice);
  saveInvoices(invoices);
}

export function updateInvoice(id: string, updates: Partial<Invoice>): void {
  const invoices = getInvoices();
  const index = invoices.findIndex(i => i.id === id);
  if (index !== -1) {
    invoices[index] = { ...invoices[index], ...updates, updatedAt: new Date().toISOString() };
    saveInvoices(invoices);
  }
}

export function deleteInvoice(id: string): void {
  saveInvoices(getInvoices().filter(i => i.id !== id));
}

// ─── Installment Plans ────────────────────────────────────

export function getInstallmentPlans(): InstallmentPlan[] {
  return getItem<InstallmentPlan[]>(STORAGE_KEYS.INSTALLMENT_PLANS, []);
}

export function saveInstallmentPlans(plans: InstallmentPlan[]): void {
  setItem(STORAGE_KEYS.INSTALLMENT_PLANS, plans);
}

export function addInstallmentPlan(plan: InstallmentPlan): void {
  const plans = getInstallmentPlans();
  plans.unshift(plan);
  saveInstallmentPlans(plans);
}

export function updateInstallmentPlan(id: string, updates: Partial<InstallmentPlan>): void {
  const plans = getInstallmentPlans();
  const index = plans.findIndex(p => p.id === id);
  if (index !== -1) {
    plans[index] = { ...plans[index], ...updates };
    saveInstallmentPlans(plans);
  }
}

// ─── Salary Records ───────────────────────────────────────

export function getSalaryRecords(): SalaryRecord[] {
  return getItem<SalaryRecord[]>(STORAGE_KEYS.SALARY_RECORDS, []);
}

export function saveSalaryRecords(records: SalaryRecord[]): void {
  setItem(STORAGE_KEYS.SALARY_RECORDS, records);
}

export function addSalaryRecord(record: SalaryRecord): void {
  const records = getSalaryRecords();
  records.unshift(record);
  saveSalaryRecords(records);
}

export function updateSalaryRecord(id: string, updates: Partial<SalaryRecord>): void {
  const records = getSalaryRecords();
  const index = records.findIndex(r => r.id === id);
  if (index !== -1) {
    records[index] = { ...records[index], ...updates };
    saveSalaryRecords(records);
  }
}

// ─── Staff ────────────────────────────────────────────────

export function getStaff(): Staff[] {
  return getItem<Staff[]>(STORAGE_KEYS.STAFF, []);
}

export function saveStaff(staff: Staff[]): void {
  setItem(STORAGE_KEYS.STAFF, staff);
}

export function addStaff(staff: Staff): void {
  const items = getStaff();
  items.unshift(staff);
  saveStaff(items);
}

export function updateStaff(id: string, updates: Partial<Staff>): void {
  const items = getStaff();
  const index = items.findIndex(s => s.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
    saveStaff(items);
  }
}

export function deleteStaff(id: string): void {
  saveStaff(getStaff().filter(s => s.id !== id));
}

// ─── Notifications ────────────────────────────────────────

export function getNotifications(): Notification[] {
  return getItem<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
}

export function saveNotifications(notifications: Notification[]): void {
  setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
}

export function addNotification(notification: Notification): void {
  const notifications = getNotifications();
  notifications.unshift(notification);
  saveNotifications(notifications);
}

export function markNotificationRead(id: string): void {
  const notifications = getNotifications();
  const index = notifications.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications[index].read = true;
    saveNotifications(notifications);
  }
}

export function markAllNotificationsRead(): void {
  const notifications = getNotifications().map(n => ({ ...n, read: true }));
  saveNotifications(notifications);
}

export function deleteNotification(id: string): void {
  saveNotifications(getNotifications().filter(n => n.id !== id));
}

// ─── Audit Log ────────────────────────────────────────────

export function getAuditLog(): AuditLogEntry[] {
  return getItem<AuditLogEntry[]>(STORAGE_KEYS.AUDIT_LOG, []);
}

export function addAuditLog(entry: AuditLogEntry): void {
  const log = getAuditLog();
  log.unshift(entry);
  // Keep only last 500 entries
  if (log.length > 500) log.length = 500;
  setItem(STORAGE_KEYS.AUDIT_LOG, log);
}

// ─── System Settings ──────────────────────────────────────

const defaultSettings: SystemSettings = {
  instituteName: 'بهان رایانه',
  instituteNameEn: 'Bahan Rayaneh',
  address: 'ایران',
  phone1: '01144746441',
  phone2: '09111277194',
  email: 'info@vira-abacus.ir',
  website: 'https://hab64.github.io/bahanvira/',
  logo: '/logo.webp',
  fiscalYearStart: '1403-01-01',
  currency: 'ریال',
  defaultPaymentMethod: 'cash',
  smsEnabled: false,
  emailEnabled: false,
  whatsappEnabled: true,
  referralRewardType: 'discount_percentage',
  referralRewardValue: 10,
  autoBackup: true,
  backupInterval: 24,
  maintenanceMode: false,
};

export function getSystemSettings(): SystemSettings {
  return getItem<SystemSettings>(STORAGE_KEYS.SYSTEM_SETTINGS, defaultSettings);
}

export function saveSystemSettings(settings: SystemSettings): void {
  setItem(STORAGE_KEYS.SYSTEM_SETTINGS, settings);
}
