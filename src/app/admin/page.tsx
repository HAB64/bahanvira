'use client';

import { useState, useMemo } from 'react';
import {
  Users,
  GraduationCap,
  DollarSign,
  Lock,
  LogOut,
  Search,
  Plus,
  BarChart3,
  BookOpen,
  Settings,
  ChevronDown,
  ChevronLeft,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  UserCheck,
  UserPlus,
  TrendingUp,
  Award,
  FileText,
  Bell,
  Home,
  FolderOpen,
  Shield,
  PieChart,
  CreditCard,
  ClipboardList,
  Star,
  Filter,
  Eye,
  Edit3,
  Trash2,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════ */

type TabKey =
  | 'dashboard'
  | 'students'
  | 'classes'
  | 'exams'
  | 'crm'
  | 'financial'
  | 'users'
  | 'settings';

type CRMStatus = 'جدید' | 'تماس گرفته شد' | 'جلسه مشاوره' | 'ثبت‌نام شده' | 'غیرفعال';

interface CRMLead {
  id: number;
  name: string;
  phone: string;
  source: string;
  status: CRMStatus;
  course: string;
  date: string;
  lastFollowUp: string;
  notes: string;
  assignee: string;
}

/* ═══════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════ */

const dashboardStats = [
  { label: 'دانش‌آموز فعال', value: '۱۲۳', icon: Users, color: 'text-orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  { label: 'مربی', value: '۸', icon: GraduationCap, color: 'text-teal-500', bgColor: 'bg-teal-50', borderColor: 'border-teal-200' },
  { label: 'کلاس فعال', value: '۱۵', icon: BookOpen, color: 'text-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  { label: 'درآمد ماهانه', value: '۲۵M', icon: TrendingUp, color: 'text-emerald-500', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
  { label: 'سرنخ CRM', value: '۴۷', icon: UserPlus, color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  { label: 'نرخ تبدیل', value: '۶۸٪', icon: PieChart, color: 'text-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  { label: 'آزمون فعال', value: '۵', icon: ClipboardList, color: 'text-rose-500', bgColor: 'bg-rose-50', borderColor: 'border-rose-200' },
  { label: 'گواهینامه صادر شده', value: '۸۹', icon: Award, color: 'text-indigo-500', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
];

const quickModules = [
  { title: 'مدیریت CRM', desc: 'مدیریت ارتباط با مشتریان و پیگیری سرنخ‌ها', icon: Users, color: 'from-orange-400 to-orange-600', count: 4 },
  { title: 'مدیریت دوره‌ها', desc: 'ایجاد و مدیریت دوره‌های آموزشی', icon: BookOpen, color: 'from-teal-400 to-teal-600', count: 3 },
  { title: 'گزارشات پیشرفته', desc: 'تحلیل داده‌ها و نمودارهای عملکرد', icon: BarChart3, color: 'from-purple-400 to-purple-600', count: 2 },
  { title: 'مدیریت مالی', desc: 'پیگیری پرداخت‌ها و صورت‌حساب‌ها', icon: CreditCard, color: 'from-emerald-400 to-emerald-600', count: 1 },
];

const recentRegistrations = [
  { name: 'سارا احمدی', phone: '۰۹۱۲۱۲۳۴۵۶۷', date: '۱۴۰۴/۰۳/۲۰', course: 'چرتکه مبتدی', status: 'فعال' },
  { name: 'محمد رضایی', phone: '۰۹۳۵۶۷۸۹۰۱۲', date: '۱۴۰۴/۰۳/۱۹', course: 'حساب ذهنی ۱', status: 'در انتظار' },
  { name: 'فاطمه حسینی', phone: '۰۹۱۰۳۴۵۶۷۸۹', date: '۱۴۰۴/۰۳/۱۸', course: 'چرتکه متوسط', status: 'فعال' },
  { name: 'امیر کریمی', phone: '۰۹۲۱۲۳۴۵۶۷۸', date: '۱۴۰۴/۰۳/۱۷', course: 'چرتکه مبتدی', status: 'فعال' },
  { name: 'نازنین عباسی', phone: '۰۹۳۸۹۰۱۲۳۴۵', date: '۱۴۰۴/۰۳/۱۶', course: 'آمادگی مسابقات', status: 'غیرفعال' },
];

const recentExamResults = [
  { student: 'سارا احمدی', exam: 'آزمون جمع و تفریق', score: '۹/۱۰', date: '۱۴۰۴/۰۳/۲۰' },
  { student: 'محمد رضایی', exam: 'آزمون ضرب', score: '۷/۱۰', date: '۱۴۰۴/۰۳/۱۹' },
  { student: 'فاطمه حسینی', exam: 'آزمون سرعت', score: '۱۸/۲۰', date: '۱۴۰۴/۰۳/۱۸' },
  { student: 'امیر کریمی', exam: 'آزمون جامع', score: '۲۲/۳۰', date: '۱۴۰۴/۰۳/۱۷' },
  { student: 'نازنین عباسی', exam: 'آزمون سطح ۳', score: '۸/۱۰', date: '۱۴۰۴/۰۳/۱۶' },
];

const allStudents = [
  { name: 'سارا احمدی', phone: '۰۹۱۲۱۲۳۴۵۶۷', level: 'سطح ۳', date: '۱۴۰۴/۰۱/۱۵', status: 'فعال', paid: 'تسویه شده' },
  { name: 'محمد رضایی', phone: '۰۹۳۵۶۷۸۹۰۱۲', level: 'سطح ۲', date: '۱۴۰۴/۰۲/۰۵', status: 'فعال', paid: 'تسویه شده' },
  { name: 'فاطمه حسینی', phone: '۰۹۱۰۳۴۵۶۷۸۹', level: 'سطح ۵', date: '۱۴۰۳/۱۲/۲۰', status: 'فعال', paid: 'تسویه شده' },
  { name: 'امیر کریمی', phone: '۰۹۲۱۲۳۴۵۶۷۸', level: 'سطح ۱', date: '۱۴۰۴/۰۳/۰۱', status: 'در انتظار', paid: 'پرداخت نشده' },
  { name: 'نازنین عباسی', phone: '۰۹۳۸۹۰۱۲۳۴۵', level: 'سطح ۴', date: '۱۴۰۴/۰۱/۱۰', status: 'غیرفعال', paid: 'بدهکار' },
  { name: 'رضا طاهری', phone: '۰۹۱۵۶۷۸۱۲۳۴', level: 'سطح ۲', date: '۱۴۰۴/۰۲/۲۰', status: 'فعال', paid: 'تسویه شده' },
  { name: 'مینا کاظمی', phone: '۰۹۳۳۴۵۶۷۸۹۰', level: 'سطح ۶', date: '۱۴۰۳/۱۱/۰۵', status: 'فعال', paid: 'تسویه شده' },
  { name: 'علی محمدی', phone: '۰۹۲۰۱۲۳۴۵۶۷', level: 'سطح ۴', date: '۱۴۰۴/۰۱/۲۵', status: 'فعال', paid: 'قسطی' },
];

const classData = [
  { name: 'چرتکه مبتدی - گروه الف', instructor: 'استاد رضایی', students: 18, schedule: 'شنبه و دوشنبه - ۱۶:۰۰' },
  { name: 'چرتکه مبتدی - گروه ب', instructor: 'استاد احمدی', students: 15, schedule: 'یکشنبه و سه‌شنبه - ۱۵:۰۰' },
  { name: 'چرتکه متوسط', instructor: 'استاد کریمی', students: 12, schedule: 'شنبه و چهارشنبه - ۱۷:۰۰' },
  { name: 'چرتکه پیشرفته', instructor: 'استاد حسینی', students: 8, schedule: 'دوشنبه و پنجشنبه - ۱۴:۰۰' },
  { name: 'حساب ذهنی ۱', instructor: 'استاد محمدی', students: 20, schedule: 'سه‌شنبه و پنجشنبه - ۱۶:۰۰' },
  { name: 'آمادگی مسابقات', instructor: 'استاد رضایی', students: 6, schedule: 'پنجشنبه - ۱۰:۰۰' },
];

const examData = [
  { name: 'آزمون سطح ۱', students: 35, avgScore: '۸۵٪', date: '۱۴۰۴/۰۳/۱۵', status: 'بسته شده' },
  { name: 'آزمون سطح ۳', students: 28, avgScore: '۷۸٪', date: '۱۴۰۴/۰۳/۱۰', status: 'بسته شده' },
  { name: 'آزمون سرعت', students: 42, avgScore: '۷۲٪', date: '۱۴۰۴/۰۲/۲۸', status: 'بسته شده' },
  { name: 'آزمون جامع', students: 15, avgScore: '۸۰٪', date: '۱۴۰۴/۰۳/۲۲', status: 'فعال' },
  { name: 'آزمون ضرب', students: 30, avgScore: '۸۲٪', date: '۱۴۰۴/۰۳/۲۵', status: 'فعال' },
];

/* CRM Data */
const crmLeads: CRMLead[] = [
  { id: 1, name: 'زهرا محمدی', phone: '۰۹۱۲۳۴۵۶۷۸۹', source: 'اینستاگرام', status: 'ثبت‌نام شده', course: 'چرتکه مبتدی', date: '۱۴۰۴/۰۳/۲۰', lastFollowUp: '۱۴۰۴/۰۳/۲۱', notes: 'علاقه‌مند به کلاس حضوری', assignee: 'مستر رضایی' },
  { id: 2, name: 'علی حسینی', phone: '۰۹۳۵۶۷۸۹۰۱۲', source: 'وبسایت', status: 'تماس گرفته شد', course: 'حساب ذهنی ۱', date: '۱۴۰۴/۰۳/۱۹', lastFollowUp: '۱۴۰۴/۰۳/۲۰', notes: 'نیاز به مشاوره بیشتر', assignee: 'مستر احمدی' },
  { id: 3, name: 'مینا رضایی', phone: '۰۹۱۰۱۲۳۴۵۶۷', source: 'معرفی', status: 'جلسه مشاوره', course: 'چرتکه متوسط', date: '۱۴۰۴/۰۳/۱۸', lastFollowUp: '۱۴۰۴/۰۳/۱۹', notes: 'جلسه مشاوره فردا ساعت ۴', assignee: 'مستر کریمی' },
  { id: 4, name: 'امیر کریمی', phone: '۰۹۲۱۲۳۴۵۶۷۸', source: 'تلگرام', status: 'جدید', course: 'چرتکه مبتدی', date: '۱۴۰۴/۰۳/۲۲', lastFollowUp: '-', notes: '', assignee: '-' },
  { id: 5, name: 'سارا نوری', phone: '۰۹۳۸۹۰۱۲۳۴۵', source: 'WhatsApp', status: 'جدید', course: 'آمادگی مسابقات', date: '۱۴۰۴/۰۳/۲۲', lastFollowUp: '-', notes: 'از طرف دوستشان معرفی شده', assignee: '-' },
  { id: 6, name: 'فاطمه عباسی', phone: '۰۹۱۵۶۷۸۱۲۳۴', source: 'اینستاگرام', status: 'غیرفعال', course: 'چرتکه پیشرفته', date: '۱۴۰۴/۰۲/۱۰', lastFollowUp: '۱۴۰۴/۰۲/۲۵', notes: 'عدم تمایل به ادامه', assignee: 'مستر رضایی' },
  { id: 7, name: 'رضا طاهری', phone: '۰۹۳۳۴۵۶۷۸۹۰', source: 'وبسایت', status: 'ثبت‌نام شده', course: 'چرتکه مبتدی', date: '۱۴۰۴/۰۳/۱۵', lastFollowUp: '۱۴۰۴/۰۳/۱۶', notes: 'پرداخت انجام شد', assignee: 'مستر احمدی' },
  { id: 8, name: 'نرگس کاظمی', phone: '۰۹۲۰۱۲۳۴۵۶۷', source: 'معرفی', status: 'تماس گرفته شد', course: 'حساب ذهنی ۱', date: '۱۴۰۴/۰۳/۲۱', lastFollowUp: '۱۴۰۴/۰۳/۲۲', notes: 'منتظر پاسخ والدین', assignee: 'مستر کریمی' },
];

const crmStatusColors: Record<CRMStatus, string> = {
  'جدید': 'bg-blue-100 text-blue-600 border-blue-200',
  'تماس گرفته شد': 'bg-amber-100 text-amber-600 border-amber-200',
  'جلسه مشاوره': 'bg-purple-100 text-purple-600 border-purple-200',
  'ثبت‌نام شده': 'bg-emerald-100 text-emerald-600 border-emerald-200',
  'غیرفعال': 'bg-slate-100 text-slate-500 border-slate-200',
};

const financialData = [
  { description: 'شهریه چرتکه مبتدی - سارا احمدی', amount: '+۲,۵۰۰,۰۰۰', date: '۱۴۰۴/۰۳/۲۰', type: 'درآمد', status: 'تسویه' },
  { description: 'حقوق مربی رضایی - اردیبهشت', amount: '-۸,۰۰۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۵', type: 'هزینه', status: 'پرداخت شده' },
  { description: 'شهریه حساب ذهنی - محمد رضایی', amount: '+۲,۰۰۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۹', type: 'درآمد', status: 'تسویه' },
  { description: 'اجاره محل آموزشگاه', amount: '-۱۵,۰۰۰,۰۰۰', date: '۱۴۰۴/۰۳/۰۱', type: 'هزینه', status: 'پرداخت شده' },
  { description: 'شهریه چرتکه متوسط - فاطمه حسینی', amount: '+۳,۰۰۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۸', type: 'درآمد', status: 'تسویه' },
  { description: 'تبلیغات اینستاگرام', amount: '-۱,۵۰۰,۰۰۰', date: '۱۴۰۴/۰۳/۱۰', type: 'هزینه', status: 'پرداخت شده' },
];

const usersData = [
  { name: 'مستر رضایی', role: 'مدیر', phone: '۰۹۱۲۱۱۱۱۱۱۱۱', lastLogin: '۱۴۰۴/۰۳/۲۲ ۰۹:۳۰', status: 'آنلاین' },
  { name: 'مستر احمدی', role: 'مربی', phone: '۰۹۳۵۲۲۲۲۲۲۲', lastLogin: '۱۴۰۴/۰۳/۲۲ ۱۰:۱۵', status: 'آنلاین' },
  { name: 'مستر کریمی', role: 'مربی', phone: '۰۹۱۰۳۳۳۳۳۳۳', lastLogin: '۱۴۰۴/۰۳/۲۱ ۱۶:۴۵', status: 'آفلاین' },
  { name: 'مستر حسینی', role: 'مربی', phone: '۰۹۲۱۴۴۴۴۴۴۴', lastLogin: '۱۴۰۴/۰۳/۲۰ ۱۱:۰۰', status: 'آفلاین' },
  { name: 'مستر محمدی', role: 'مربی', phone: '۰۹۳۸۵۵۵۵۵۵۵', lastLogin: '۱۴۰۴/۰۳/۲۲ ۰۸:۰۰', status: 'آنلاین' },
];

/* ═══════════════════════════════════════════════════
   Sidebar Menu Config
   ═══════════════════════════════════════════════════ */

interface MenuItem {
  key: TabKey;
  label: string;
  icon: React.ElementType;
}

interface MenuCategory {
  title: string;
  icon: React.ElementType;
  items: MenuItem[];
}

const sidebarCategories: MenuCategory[] = [
  {
    title: 'داشبورد و گزارشات',
    icon: BarChart3,
    items: [
      { key: 'dashboard', label: 'داشبورد', icon: Home },
      { key: 'students', label: 'دانش‌آموزان', icon: Users },
      { key: 'classes', label: 'کلاس‌ها', icon: BookOpen },
      { key: 'exams', label: 'آزمون‌ها', icon: ClipboardList },
    ],
  },
  {
    title: 'مدیریت و پیکربندی',
    icon: Settings,
    items: [
      { key: 'users', label: 'کاربران و نقش‌ها', icon: Shield },
      { key: 'financial', label: 'مدیریت مالی', icon: CreditCard },
      { key: 'settings', label: 'تنظیمات', icon: Settings },
    ],
  },
  {
    title: 'پشتیبانی و CRM',
    icon: Users,
    items: [
      { key: 'crm', label: 'مدیریت CRM', icon: UserCheck },
    ],
  },
];

const statusColors: Record<string, string> = {
  'فعال': 'bg-emerald-100 text-emerald-600 border-emerald-200',
  'در انتظار': 'bg-amber-100 text-amber-600 border-amber-200',
  'غیرفعال': 'bg-slate-100 text-slate-500 border-slate-200',
  'بسته شده': 'bg-slate-100 text-slate-500 border-slate-200',
  'تسویه شده': 'bg-emerald-100 text-emerald-600 border-emerald-200',
  'پرداخت نشده': 'bg-rose-100 text-rose-600 border-rose-200',
  'بدهکار': 'bg-red-100 text-red-600 border-red-200',
  'قسطی': 'bg-amber-100 text-amber-600 border-amber-200',
  'آنلاین': 'bg-emerald-100 text-emerald-600 border-emerald-200',
  'آفلاین': 'bg-slate-100 text-slate-500 border-slate-200',
  'درآمد': 'bg-emerald-100 text-emerald-600 border-emerald-200',
  'هزینه': 'bg-rose-100 text-rose-600 border-rose-200',
  'تسویه': 'bg-emerald-100 text-emerald-600 border-emerald-200',
  'پرداخت شده': 'bg-slate-100 text-slate-500 border-slate-200',
};

/* ═══════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════ */

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [studentSearch, setStudentSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'داشبورد و گزارشات': true,
    'مدیریت و پیکربندی': true,
    'پشتیبانی و CRM': true,
  });
  const [crmSearch, setCrmSearch] = useState('');
  const [crmStatusFilter, setCrmStatusFilter] = useState<CRMStatus | 'همه'>('همه');
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);

  const handleLogin = () => {
    if (password === 'vira2024') {
      setIsLoggedIn(true);
      setPasswordError('');
    } else {
      setPasswordError('رمز عبور اشتباه است');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const filteredStudents = useMemo(
    () => allStudents.filter((s) => s.name.includes(studentSearch) || s.phone.includes(studentSearch)),
    [studentSearch]
  );

  const filteredLeads = useMemo(
    () =>
      crmLeads.filter((l) => {
        const matchSearch = l.name.includes(crmSearch) || l.phone.includes(crmSearch);
        const matchStatus = crmStatusFilter === 'همه' || l.status === crmStatusFilter;
        return matchSearch && matchStatus;
      }),
    [crmSearch, crmStatusFilter]
  );

  const crmPipelineCounts = useMemo(() => {
    const counts: Record<CRMStatus, number> = { 'جدید': 0, 'تماس گرفته شد': 0, 'جلسه مشاوره': 0, 'ثبت‌نام شده': 0, 'غیرفعال': 0 };
    crmLeads.forEach((l) => { counts[l.status]++; });
    return counts;
  }, []);

  const navigateTo = (key: TabKey) => {
    setActiveTab(key);
    setMobileSidebarOpen(false);
  };

  /* ─── Login Screen ─── */
  if (!isLoggedIn) {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50/30 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl shadow-black/[0.06] p-8 w-full max-w-sm border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">ورود به پنل مدیریت</h1>
          <p className="text-sm text-slate-500 text-center mb-8">آموزگاه چرتکه دهگانی ویرا</p>
          <div className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                onKeyDown={handleKeyDown}
                placeholder="رمز عبور"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
                autoFocus
              />
              {passwordError && <p className="text-red-500 text-xs mt-2 text-center">{passwordError}</p>}
            </div>
            <button onClick={handleLogin} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3.5 rounded-xl transition-all shadow-md shadow-orange-500/20 hover:shadow-lg">
              ورود
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════
     Render Helpers
     ═══════════════════════════════════════════════════ */

  /* ─── Dashboard Tab ─── */
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4">
              <div className={`shrink-0 w-12 h-12 rounded-xl ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-slate-900 truncate">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Modules - like bahanrayaneh packages */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">ماژول‌های پیشنهادی</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.title}
                onClick={() => {
                  if (mod.title.includes('CRM')) setActiveTab('crm');
                  else if (mod.title.includes('دوره')) setActiveTab('classes');
                  else if (mod.title.includes('گزارش')) setActiveTab('financial');
                  else if (mod.title.includes('مالی')) setActiveTab('financial');
                }}
                className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all text-right group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{mod.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{mod.desc}</p>
                <span className="text-xs text-orange-500 font-medium">{mod.count} آیتم فعال</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-slate-900">آخرین ثبت‌نام‌ها</h3>
            <Plus className="w-5 h-5 text-slate-400 cursor-pointer hover:text-orange-500 transition-colors" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-xs border-b border-gray-100">
                  <th className="text-right pb-3 font-medium">نام</th>
                  <th className="text-right pb-3 font-medium hidden sm:table-cell">دوره</th>
                  <th className="text-right pb-3 font-medium">وضعیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentRegistrations.map((r, idx) => (
                  <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                    <td className="py-3 text-slate-900 font-medium">{r.name}</td>
                    <td className="py-3 text-slate-500 hidden sm:table-cell">{r.course}</td>
                    <td className="py-3">
                      <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[r.status] || ''}`}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Exams */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-slate-900">آزمون‌های اخیر</h3>
            <GraduationCap className="w-5 h-5 text-slate-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-xs border-b border-gray-100">
                  <th className="text-right pb-3 font-medium">دانش‌آموز</th>
                  <th className="text-right pb-3 font-medium hidden sm:table-cell">آزمون</th>
                  <th className="text-right pb-3 font-medium">نمره</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentExamResults.map((r, idx) => (
                  <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                    <td className="py-3 text-slate-900 font-medium">{r.student}</td>
                    <td className="py-3 text-slate-500 hidden sm:table-cell">{r.exam}</td>
                    <td className="py-3 text-emerald-600 font-bold">{r.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── Students Tab ─── */
  const renderStudents = () => (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-bold text-slate-900">لیست دانش‌آموزان</h3>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              placeholder="جستجوی نام یا تلفن..."
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
            />
          </div>
          <button className="shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md shadow-orange-500/20 flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            افزودن
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50">
              <th className="text-right py-3 px-4 font-medium">نام</th>
              <th className="text-right py-3 px-4 font-medium hidden md:table-cell">تلفن</th>
              <th className="text-right py-3 px-4 font-medium">سطح</th>
              <th className="text-right py-3 px-4 font-medium hidden sm:table-cell">تاریخ</th>
              <th className="text-right py-3 px-4 font-medium hidden lg:table-cell">پرداخت</th>
              <th className="text-right py-3 px-4 font-medium">وضعیت</th>
              <th className="text-right py-3 px-4 font-medium">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredStudents.map((s, idx) => (
              <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                <td className="py-3 px-4 text-slate-900 font-medium">{s.name}</td>
                <td className="py-3 px-4 text-slate-500 hidden md:table-cell" dir="ltr">{s.phone}</td>
                <td className="py-3 px-4 text-slate-600">{s.level}</td>
                <td className="py-3 px-4 text-slate-500 hidden sm:table-cell">{s.date}</td>
                <td className="py-3 px-4 hidden lg:table-cell">
                  <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[s.paid] || ''}`}>{s.paid}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[s.status] || ''}`}>{s.status}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors"><Eye className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-orange-50 text-slate-400 hover:text-orange-500 transition-colors"><Edit3 className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr><td colSpan={7} className="py-12 text-center text-slate-400">نتیجه‌ای یافت نشد</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ─── Classes Tab ─── */
  const renderClasses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">لیست کلاس‌ها</h3>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md shadow-orange-500/20 flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          ایجاد کلاس
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classData.map((cls, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900 leading-6">{cls.name}</h4>
              <Settings className="w-4 h-4 text-slate-400 cursor-pointer hover:text-orange-500 transition-colors shrink-0" />
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" />مربی</span>
                <span className="text-slate-900 font-medium">{cls.instructor}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />دانش‌آموز</span>
                <span className="text-slate-900 font-medium">{cls.students} نفر</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />برنامه</span>
                <span className="text-slate-900 font-medium text-xs">{cls.schedule}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── Exams Tab ─── */
  const renderExams = () => (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">لیست آزمون‌ها</h3>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md shadow-orange-500/20 flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          ایجاد آزمون
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50">
              <th className="text-right py-3 px-4 font-medium">نام آزمون</th>
              <th className="text-right py-3 px-4 font-medium">شرکت‌کننده</th>
              <th className="text-right py-3 px-4 font-medium hidden sm:table-cell">میانگین</th>
              <th className="text-right py-3 px-4 font-medium">تاریخ</th>
              <th className="text-right py-3 px-4 font-medium">وضعیت</th>
              <th className="text-right py-3 px-4 font-medium">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {examData.map((exam, idx) => (
              <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                <td className="py-3 px-4 text-slate-900 font-medium">{exam.name}</td>
                <td className="py-3 px-4 text-slate-600">{exam.students} نفر</td>
                <td className="py-3 px-4 text-emerald-600 font-bold hidden sm:table-cell">{exam.avgScore}</td>
                <td className="py-3 px-4 text-slate-500">{exam.date}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[exam.status] || ''}`}>{exam.status}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors"><Eye className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-orange-50 text-slate-400 hover:text-orange-500 transition-colors"><Edit3 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ─── CRM Tab ─── */
  const renderCRM = () => (
    <div className="space-y-6">
      {/* Pipeline Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {(['جدید', 'تماس گرفته شد', 'جلسه مشاوره', 'ثبت‌نام شده', 'غیرفعال'] as CRMStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => setCrmStatusFilter(crmStatusFilter === status ? 'همه' : status)}
            className={`p-4 rounded-2xl border text-center transition-all hover:shadow-md ${
              crmStatusFilter === status ? 'ring-2 ring-orange-400 shadow-md' : ''
            } ${crmStatusColors[status]}`}
          >
            <div className="text-2xl font-bold">{crmPipelineCounts[status]}</div>
            <div className="text-xs font-medium mt-1">{status}</div>
          </button>
        ))}
      </div>

      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={crmSearch}
            onChange={(e) => setCrmSearch(e.target.value)}
            placeholder="جستجوی نام یا شماره سرنخ..."
            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
          />
        </div>
        <button
          onClick={() => setShowAddLeadModal(true)}
          className="shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md shadow-orange-500/20 flex items-center gap-1.5"
        >
          <UserPlus className="w-4 h-4" />
          سرنخ جدید
        </button>
        {crmStatusFilter !== 'همه' && (
          <button
            onClick={() => setCrmStatusFilter('همه')}
            className="shrink-0 flex items-center gap-1.5 text-xs font-medium px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-slate-600 hover:bg-gray-50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            حذف فیلتر
          </button>
        )}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50">
                <th className="text-right py-3 px-4 font-medium">نام</th>
                <th className="text-right py-3 px-4 font-medium hidden md:table-cell">تلفن</th>
                <th className="text-right py-3 px-4 font-medium hidden lg:table-cell">منبع</th>
                <th className="text-right py-3 px-4 font-medium">دوره</th>
                <th className="text-right py-3 px-4 font-medium">وضعیت</th>
                <th className="text-right py-3 px-4 font-medium hidden sm:table-cell">آخرین پیگیری</th>
                <th className="text-right py-3 px-4 font-medium hidden lg:table-cell">مسئول</th>
                <th className="text-right py-3 px-4 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="py-3 px-4 text-slate-900 font-medium">{lead.name}</td>
                  <td className="py-3 px-4 text-slate-500 hidden md:table-cell" dir="ltr">{lead.phone}</td>
                  <td className="py-3 px-4 hidden lg:table-cell text-slate-600">{lead.source}</td>
                  <td className="py-3 px-4 text-slate-600">{lead.course}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${crmStatusColors[lead.status]}`}>{lead.status}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 hidden sm:table-cell">{lead.lastFollowUp}</td>
                  <td className="py-3 px-4 text-slate-600 hidden lg:table-cell">{lead.assignee}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedLead(lead)} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-green-50 text-slate-400 hover:text-green-500 transition-colors"><Phone className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-purple-50 text-slate-400 hover:text-purple-500 transition-colors"><MessageSquare className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr><td colSpan={8} className="py-12 text-center text-slate-400">سرنخی یافت نشد</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" dir="rtl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">جزئیات سرنخ</h3>
              <button onClick={() => setSelectedLead(null)} className="p-2 rounded-xl hover:bg-gray-100 text-slate-400 hover:text-slate-600 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-orange-500/20">
                  {selectedLead.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{selectedLead.name}</h4>
                  <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${crmStatusColors[selectedLead.status]}`}>{selectedLead.status}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-slate-400 mb-1">تلفن</div>
                  <div className="text-sm font-medium text-slate-900" dir="ltr">{selectedLead.phone}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-slate-400 mb-1">منبع</div>
                  <div className="text-sm font-medium text-slate-900">{selectedLead.source}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-slate-400 mb-1">دوره مورد نظر</div>
                  <div className="text-sm font-medium text-slate-900">{selectedLead.course}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-slate-400 mb-1">مسئول پیگیری</div>
                  <div className="text-sm font-medium text-slate-900">{selectedLead.assignee}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-slate-400 mb-1">تاریخ ثبت</div>
                  <div className="text-sm font-medium text-slate-900">{selectedLead.date}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-slate-400 mb-1">آخرین پیگیری</div>
                  <div className="text-sm font-medium text-slate-900">{selectedLead.lastFollowUp}</div>
                </div>
              </div>
              {selectedLead.notes && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <div className="text-xs text-amber-600 font-medium mb-1 flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />یادداشت</div>
                  <div className="text-sm text-slate-700">{selectedLead.notes}</div>
                </div>
              )}
              <div className="flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium py-2.5 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  تماس
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium py-2.5 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  پیام
                </button>
                <button className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium py-2.5 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all flex items-center justify-center gap-1.5">
                  <Edit3 className="w-4 h-4" />
                  ویرایش
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowAddLeadModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md" dir="rtl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">افزودن سرنخ جدید</h3>
              <button onClick={() => setShowAddLeadModal(false)} className="p-2 rounded-xl hover:bg-gray-100 text-slate-400 hover:text-slate-600 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">نام و نام خانوادگی</label>
                <input type="text" placeholder="نام کامل" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">شماره تماس</label>
                <input type="tel" placeholder="۰۹۱۲..." dir="ltr" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-left" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">منبع</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400">
                  <option>اینستاگرام</option>
                  <option>تلگرام</option>
                  <option>WhatsApp</option>
                  <option>وبسایت</option>
                  <option>معرفی</option>
                  <option>سایر</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">دوره مورد نظر</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400">
                  <option>چرتکه مبتدی</option>
                  <option>چرتکه متوسط</option>
                  <option>چرتکه پیشرفته</option>
                  <option>حساب ذهنی ۱</option>
                  <option>آمادگی مسابقات</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">یادداشت</label>
                <textarea placeholder="توضیحات..." rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 resize-none" />
              </div>
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md shadow-orange-500/20">
                <UserPlus className="w-4 h-4 inline ml-1.5" />
                ثبت سرنخ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  /* ─── Financial Tab ─── */
  const renderFinancial = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="text-xs text-slate-400 mb-1">کل درآمد</div>
          <div className="text-2xl font-bold text-emerald-600">۷,۵۰۰,۰۰۰</div>
          <div className="text-xs text-slate-400 mt-1">تومان (این ماه)</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="text-xs text-slate-400 mb-1">کل هزینه</div>
          <div className="text-2xl font-bold text-rose-600">۲۴,۵۰۰,۰۰۰</div>
          <div className="text-xs text-slate-400 mt-1">تومان (این ماه)</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="text-xs text-slate-400 mb-1">مانده حساب</div>
          <div className="text-2xl font-bold text-slate-900">-۱۷,۰۰۰,۰۰۰</div>
          <div className="text-xs text-slate-400 mt-1">تومان</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">تراکنش‌های اخیر</h3>
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md shadow-orange-500/20 flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            ثبت تراکنش
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50">
                <th className="text-right py-3 px-4 font-medium">توضیحات</th>
                <th className="text-right py-3 px-4 font-medium">مبلغ</th>
                <th className="text-right py-3 px-4 font-medium hidden sm:table-cell">نوع</th>
                <th className="text-right py-3 px-4 font-medium">تاریخ</th>
                <th className="text-right py-3 px-4 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {financialData.map((tx, idx) => (
                <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                  <td className="py-3 px-4 text-slate-900 font-medium">{tx.description}</td>
                  <td className={`py-3 px-4 font-bold ${tx.type === 'درآمد' ? 'text-emerald-600' : 'text-rose-600'}`}>{tx.amount}</td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[tx.type]}`}>{tx.type}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{tx.date}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[tx.status]}`}>{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  /* ─── Users Tab ─── */
  const renderUsers = () => (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">کاربران و نقش‌ها</h3>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md shadow-orange-500/20 flex items-center gap-1.5">
          <UserPlus className="w-4 h-4" />
          افزودن کاربر
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-gray-100 bg-gray-50/50">
              <th className="text-right py-3 px-4 font-medium">نام</th>
              <th className="text-right py-3 px-4 font-medium">نقش</th>
              <th className="text-right py-3 px-4 font-medium hidden sm:table-cell">تلفن</th>
              <th className="text-right py-3 px-4 font-medium hidden md:table-cell">آخرین ورود</th>
              <th className="text-right py-3 px-4 font-medium">وضعیت</th>
              <th className="text-right py-3 px-4 font-medium">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {usersData.map((u, idx) => (
              <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                <td className="py-3 px-4 text-slate-900 font-medium flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold shrink-0">{u.name.charAt(0)}</div>
                  {u.name}
                </td>
                <td className="py-3 px-4">
                  <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${u.role === 'مدیر' ? 'bg-purple-100 text-purple-600 border-purple-200' : 'bg-blue-100 text-blue-600 border-blue-200'}`}>{u.role}</span>
                </td>
                <td className="py-3 px-4 text-slate-500 hidden sm:table-cell" dir="ltr">{u.phone}</td>
                <td className="py-3 px-4 text-slate-500 hidden md:table-cell">{u.lastLogin}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs font-bold border rounded-full px-2.5 py-0.5 ${statusColors[u.status]}`}>{u.status}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-orange-50 text-slate-400 hover:text-orange-500 transition-colors"><Edit3 className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ─── Settings Tab ─── */
  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">تنظیمات عمومی</h3>
        <div className="space-y-5 max-w-lg">
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1.5 block">نام آموزشگاه</label>
            <input type="text" defaultValue="چرتکه دهگانی ویرا" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1.5 block">شماره تماس</label>
            <input type="tel" defaultValue="۰۲۱-۹۱۳۰۲۵۸۴" dir="ltr" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-left" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1.5 block">ایمیل</label>
            <input type="email" defaultValue="info@bahanvira.ir" dir="ltr" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-left" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1.5 block">آدرس</label>
            <textarea defaultValue="تهران، خیابان انقلاب، پلاک ۱۲۳" rows={2} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 resize-none" />
          </div>
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md shadow-orange-500/20">
            ذخیره تنظیمات
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">تنظیمات ارتباطی</h3>
        <div className="space-y-5 max-w-lg">
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1.5 block">لینک اینستاگرام</label>
            <input type="url" defaultValue="https://instagram.com/bahanvira" dir="ltr" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-left" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1.5 block">لینک تلگرام</label>
            <input type="url" defaultValue="https://t.me/bahanvira" dir="ltr" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-left" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1.5 block">شماره WhatsApp</label>
            <input type="tel" defaultValue="۰۹۱۲۱۲۳۴۵۶۷" dir="ltr" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-left" />
          </div>
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md shadow-orange-500/20">
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'students': return renderStudents();
      case 'classes': return renderClasses();
      case 'exams': return renderExams();
      case 'crm': return renderCRM();
      case 'financial': return renderFinancial();
      case 'users': return renderUsers();
      case 'settings': return renderSettings();
    }
  };

  /* ═══════════════════════════════════════════════════
     Main Layout (After Login)
     ═══════════════════════════════════════════════════ */
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50/80 flex" style={{ fontFamily: 'Vazirmatn, sans-serif' }}>
      {/* ─── Mobile Sidebar Overlay ─── */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* ─── Sidebar ─── */}
      <aside className={`
        fixed lg:sticky top-0 right-0 z-50 lg:z-10 h-screen w-72 bg-white border-l border-gray-100
        flex flex-col transition-transform duration-300 ease-out
        ${mobileSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        shadow-xl lg:shadow-none
      `}>
        {/* Sidebar Header */}
        <div className="p-5 border-b border-gray-100 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-slate-900 truncate">ویرا | چرتکه دهگانی</h2>
            <p className="text-[11px] text-slate-400">پنل مدیریت</p>
          </div>
          <button onClick={() => setMobileSidebarOpen(false)} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-slate-400"><X className="w-5 h-5" /></button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {sidebarCategories.map((cat) => (
            <div key={cat.title} className="mb-2">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(cat.title)}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-gray-50"
              >
                <FolderOpen className="w-4 h-4 text-orange-400" />
                <span className="flex-1 text-right">{cat.title}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedCategories[cat.title] ? 'rotate-180' : ''}`} />
              </button>

              {/* Category Items */}
              <div className={`overflow-hidden transition-all duration-200 ${expandedCategories[cat.title] ? 'max-h-96' : 'max-h-0'}`}>
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      onClick={() => navigateTo(item.key)}
                      className={`
                        flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mb-0.5
                        ${activeTab === item.key
                          ? 'bg-orange-50 text-orange-600 shadow-sm border border-orange-100'
                          : 'text-slate-600 hover:bg-gray-50 hover:text-slate-900'
                        }
                      `}
                    >
                      <Icon className={`w-4 h-4 ${activeTab === item.key ? 'text-orange-500' : 'text-slate-400'}`} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100 shrink-0">
          <button
            onClick={() => { setIsLoggedIn(false); setPassword(''); }}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            خروج از پنل
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-slate-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h1 className="text-base sm:text-lg font-bold text-slate-900">
              {sidebarCategories.flatMap((c) => c.items).find((i) => i.key === activeTab)?.label || 'داشبورد'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">م</div>
              <span className="text-sm font-medium text-slate-700 hidden sm:block">مدیر</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}