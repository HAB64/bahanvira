// ═══════════════════════════════════════════════════════════
//  مدیریت ذخیره‌سازی محلی (localStorage)
//  Vira Decimal Abacus - Local Storage Helpers
// ═══════════════════════════════════════════════════════════

import type { Lead, Student, Referral, ExamAttempt, ExamResult } from '@/types';

const STORAGE_KEYS = {
  ADMIN_AUTH: 'vira_admin_auth',
  PORTAL_AUTH: 'vira_portal_auth',
  LEADS: 'vira_leads',
  STUDENTS: 'vira_students',
  REFERRALS: 'vira_referrals',
  EXAM_ATTEMPTS: 'vira_exam_attempts',
  STUDENT_RESULTS: 'vira_student_results',
  STUDENT_ACHIEVEMENTS: 'vira_student_achievements',
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

  return {
    totalStudents: students.length,
    activeStudents: students.length,
    totalLeads: leads.length,
    newLeadsThisMonth,
    conversionRate,
    totalRevenue,
    monthlyRevenue,
    pendingReferrals,
  };
}
