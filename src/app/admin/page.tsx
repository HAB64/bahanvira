'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Users,
  Building2,
  GraduationCap,
  UserCog,
  UserCheck,
  BookOpen,
  Calendar,
  FileText,
  Target,
  Phone,
  MessageSquare,
  Megaphone,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Receipt,
  ClipboardList,
  HelpCircle,
  BarChart3,
  Gift,
  Bell,
  ClipboardCheck,
  PenTool,
  Landmark,
  Settings,
  Shield,
  LogOut,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

// Panel imports
import DashboardPanel from '@/components/admin/enterprise/DashboardPanel';
import UsersPanel from '@/components/admin/enterprise/UsersPanel';
import BranchesPanel from '@/components/admin/enterprise/BranchesPanel';
import InstructorsPanel from '@/components/admin/enterprise/InstructorsPanel';
import StudentsPanel from '@/components/admin/enterprise/StudentsPanel';
import CoursesPanel from '@/components/admin/enterprise/CoursesPanel';
import ClassesPanel from '@/components/admin/enterprise/ClassesPanel';
import LeadsPanel from '@/components/admin/enterprise/LeadsPanel';
import ExamsPanel from '@/components/admin/enterprise/ExamsPanel';
import QuestionsPanel from '@/components/admin/enterprise/QuestionsPanel';
import RevenuePanel from '@/components/admin/enterprise/RevenuePanel';
import ExpensesPanel from '@/components/admin/enterprise/ExpensesPanel';
import TuitionPanel from '@/components/admin/enterprise/TuitionPanel';
import FollowUpsPanel from '@/components/admin/enterprise/FollowUpsPanel';
import ConsultationsPanel from '@/components/admin/enterprise/ConsultationsPanel';
import CampaignsPanel from '@/components/admin/enterprise/CampaignsPanel';
import ContentPanel from '@/components/admin/enterprise/ContentPanel';
import AssignmentsPanel from '@/components/admin/enterprise/AssignmentsPanel';
import AttendancePanel from '@/components/admin/enterprise/AttendancePanel';
import InvoicesPanel from '@/components/admin/enterprise/InvoicesPanel';
import InstallmentsPanel from '@/components/admin/enterprise/InstallmentsPanel';
import ResultsPanel from '@/components/admin/enterprise/ResultsPanel';
import StaffPanel from '@/components/admin/enterprise/StaffPanel';
import ReferralsPanel from '@/components/admin/enterprise/ReferralsPanel';
import NotificationsPanel from '@/components/admin/enterprise/NotificationsPanel';
import SettingsPanel from '@/components/admin/enterprise/SettingsPanel';

// Types
type PanelKey =
  | 'dashboard' | 'users' | 'branches' | 'instructors' | 'staff' | 'students'
  | 'courses' | 'classes' | 'content' | 'assignments' | 'attendance'
  | 'leads' | 'followups' | 'consultations' | 'campaigns'
  | 'revenue' | 'expenses' | 'tuition' | 'invoices' | 'installments'
  | 'exams' | 'questions' | 'results'
  | 'referrals' | 'notifications' | 'settings';

interface MenuItem {
  key: PanelKey;
  label: string;
  icon: React.ElementType;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    title: 'هسته مرکزی',
    items: [
      { key: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
      { key: 'users', label: 'کاربران', icon: Users },
      { key: 'branches', label: 'شعب', icon: Building2 },
      { key: 'instructors', label: 'اساتید', icon: GraduationCap },
      { key: 'students', label: 'کارآموزان', icon: UserCheck },
      { key: 'staff', label: 'کارکنان', icon: UserCog },
    ],
  },
  {
    title: 'آموزش',
    items: [
      { key: 'courses', label: 'دوره‌ها', icon: BookOpen },
      { key: 'classes', label: 'کلاس‌ها', icon: Calendar },
      { key: 'content', label: 'محتوا', icon: FileText },
      { key: 'assignments', label: 'تکالیف', icon: PenTool },
      { key: 'attendance', label: 'حضور و غیاب', icon: ClipboardCheck },
    ],
  },
  {
    title: 'CRM',
    items: [
      { key: 'leads', label: 'سرنخ‌ها', icon: Target },
      { key: 'followups', label: 'پیگیری‌ها', icon: Phone },
      { key: 'consultations', label: 'مشاوره‌ها', icon: MessageSquare },
      { key: 'campaigns', label: 'کمپین‌ها', icon: Megaphone },
    ],
  },
  {
    title: 'مالی',
    items: [
      { key: 'revenue', label: 'درآمدها', icon: TrendingUp },
      { key: 'expenses', label: 'هزینه‌ها', icon: TrendingDown },
      { key: 'tuition', label: 'شهریه‌ها', icon: CreditCard },
      { key: 'invoices', label: 'فاکتورها', icon: Receipt },
      { key: 'installments', label: 'اقساط', icon: Landmark },
    ],
  },
  {
    title: 'آزمون',
    items: [
      { key: 'exams', label: 'آزمون‌ها', icon: ClipboardList },
      { key: 'questions', label: 'بانک سوالات', icon: HelpCircle },
      { key: 'results', label: 'نتایج', icon: BarChart3 },
    ],
  },
  {
    title: 'سیستم',
    items: [
      { key: 'referrals', label: 'معرف‌ها', icon: Gift },
      { key: 'notifications', label: 'اعلان‌ها', icon: Bell },
      { key: 'settings', label: 'تنظیمات', icon: Settings },
    ],
  },
];

// Panel titles mapping
const panelTitles: Record<PanelKey, string> = {
  dashboard: 'داشبورد',
  users: 'مدیریت کاربران',
  branches: 'مدیریت شعب',
  instructors: 'مدیریت اساتید',
  staff: 'مدیریت کارکنان',
  students: 'مدیریت کارآموزان',
  courses: 'مدیریت دوره‌ها',
  classes: 'مدیریت کلاس‌ها',
  content: 'مدیریت محتوا',
  assignments: 'تکالیف',
  attendance: 'حضور و غیاب',
  leads: 'مدیریت سرنخ‌ها',
  followups: 'پیگیری‌ها',
  consultations: 'مشاوره‌ها',
  campaigns: 'کمپین‌ها',
  revenue: 'مدیریت درآمدها',
  expenses: 'مدیریت هزینه‌ها',
  tuition: 'مدیریت شهریه‌ها',
  invoices: 'فاکتورها',
  installments: 'اقساط',
  exams: 'مدیریت آزمون‌ها',
  questions: 'بانک سوالات',
  results: 'نتایج آزمون‌ها',
  referrals: 'معرف‌ها',
  notifications: 'اعلان‌ها',
  settings: 'تنظیمات',
};

// Placeholder Panel Component (defined outside render)
function PlaceholderPanel({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="p-4 bg-gray-100 rounded-full w-fit mx-auto mb-4">
            <Settings className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
          <p className="text-gray-400 text-xs mt-4">این بخش به زودی فعال خواهد شد</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Sidebar Component (defined outside render)
interface SidebarProps {
  sidebarCollapsed: boolean;
  activePanel: PanelKey;
  onPanelChange: (panel: PanelKey) => void;
  onLogout: () => void;
  onCloseMobile?: () => void;
}

function SidebarContent({ sidebarCollapsed, activePanel, onPanelChange, onLogout, onCloseMobile }: SidebarProps) {
  const handleItemClick = (key: PanelKey) => {
    onPanelChange(key);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.webp"
            alt="ویرا"
            width={36}
            height={36}
            className="rounded-lg flex-shrink-0"
          />
          {!sidebarCollapsed && (
            <div className="overflow-hidden">
              <h2 className="font-bold text-amber-400 text-sm">پنل مدیریت ویرا</h2>
              <p className="text-[10px] text-slate-400">Enterprise Admin</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-2">
        <div className="space-y-1 px-2">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx}>
              {!sidebarCollapsed && (
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-2 mt-2 first:mt-0">
                  {group.title}
                </p>
              )}
              {sidebarCollapsed && gIdx > 0 && (
                <Separator className="bg-slate-700/50 my-2" />
              )}
              {group.items.map((item) => {
                const isActive = activePanel === item.key;
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleItemClick(item.key)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-400 font-medium'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Section */}
      <div className="border-t border-slate-700/50 p-3 space-y-1">
        <Link href="/">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
            {!sidebarCollapsed && <span>بازگشت به سایت</span>}
          </button>
        </Link>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!sidebarCollapsed && <span>خروج</span>}
        </button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authState, setAuthState] = useState<{ checked: boolean; authenticated: boolean }>({
    checked: false,
    authenticated: false,
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activePanel, setActivePanel] = useState<PanelKey>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Reading from localStorage on mount is legitimate
    setAuthState({ checked: true, authenticated: auth === 'vira2024' });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'vira2024') {
      localStorage.setItem('admin_auth', 'vira2024');
      setAuthState({ checked: true, authenticated: true });
      setError('');
    } else {
      setError('رمز عبور اشتباه است');
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('admin_auth');
    setAuthState({ checked: true, authenticated: false });
  }, []);

  const handlePanelChange = useCallback((panel: PanelKey) => {
    setActivePanel(panel);
  }, []);

  // Wait for auth check to complete
  if (!authState.checked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="animate-pulse flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-200 rounded-full" />
        </div>
      </div>
    );
  }

  // Login Screen
  if (!authState.authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-bl from-amber-50 via-orange-50 to-teal-50 flex items-center justify-center p-4" dir="rtl">
        <Card className="w-full max-w-md border-2 border-amber-200 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <Image
                  src="/logo.webp"
                  alt={siteConfig.name.fullName}
                  width={72}
                  height={72}
                  className="rounded-xl"
                />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">پنل مدیریت</h1>
                <p className="text-gray-500 mt-1">{siteConfig.name.fullName}</p>
              </div>
              <div className="flex justify-center">
                <div className="p-4 bg-amber-100 rounded-full">
                  <Shield className="w-8 h-8 text-amber-600" />
                </div>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">رمز عبور</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="رمز عبور مدیریت را وارد کنید"
                    className="text-center"
                    dir="ltr"
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl py-6"
                >
                  ورود به پنل مدیریت
                  <ArrowRight className="w-4 h-4 mr-2" />
                </Button>
              </form>
              <p className="text-xs text-gray-400">
                فقط مدیران مجاز می‌توانند وارد شوند
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderPanel = () => {
    switch (activePanel) {
      case 'dashboard': return <DashboardPanel />;
      case 'users': return <UsersPanel />;
      case 'branches': return <BranchesPanel />;
      case 'instructors': return <InstructorsPanel />;
      case 'students': return <StudentsPanel />;
      case 'courses': return <CoursesPanel />;
      case 'classes': return <ClassesPanel />;
      case 'leads': return <LeadsPanel />;
      case 'exams': return <ExamsPanel />;
      case 'questions': return <QuestionsPanel />;
      case 'revenue': return <RevenuePanel />;
      case 'expenses': return <ExpensesPanel />;
      case 'tuition': return <TuitionPanel />;
      case 'followups': return <FollowUpsPanel />;
      case 'consultations': return <ConsultationsPanel />;
      case 'campaigns': return <CampaignsPanel />;
      case 'content': return <ContentPanel />;
      case 'assignments': return <AssignmentsPanel />;
      case 'attendance': return <AttendancePanel />;
      case 'invoices': return <InvoicesPanel />;
      case 'installments': return <InstallmentsPanel />;
      case 'results': return <ResultsPanel />;
      case 'staff': return <StaffPanel />;
      case 'referrals': return <ReferralsPanel />;
      case 'notifications': return <NotificationsPanel />;
      case 'settings': return <SettingsPanel />;
      default: return <DashboardPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-slate-900 border-l border-slate-700/50 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-60'
        }`}
      >
        <SidebarContent
          sidebarCollapsed={sidebarCollapsed}
          activePanel={activePanel}
          onPanelChange={handlePanelChange}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed right-0 top-0 h-full w-64 bg-slate-900 z-50 shadow-xl">
            <div className="absolute left-2 top-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <SidebarContent
              sidebarCollapsed={false}
              activePanel={activePanel}
              onPanelChange={handlePanelChange}
              onLogout={handleLogout}
              onCloseMobile={() => setMobileMenuOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between h-14 px-4">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>

              {/* Desktop Sidebar Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </Button>

              {/* Panel Title */}
              <div>
                <h1 className="font-bold text-gray-800 text-lg">
                  {panelTitles[activePanel]}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-4 h-4 text-gray-500" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
              </Button>
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-amber-700 font-bold text-xs">ادمین</span>
              </div>
            </div>
          </div>
        </header>

        {/* Panel Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {renderPanel()}
        </main>
      </div>
    </div>
  );
}
