'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Gift,
  Lock,
  LogOut,
  ArrowRight,
  Shield,
} from 'lucide-react';
import DashboardStats from '@/components/admin/DashboardStats';
import LeadTable from '@/components/admin/LeadTable';
import StudentTable from '@/components/admin/StudentTable';
import ReferralTable from '@/components/admin/ReferralTable';
import {
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
  getLeads,
  getStudents,
  getReferrals,
  calculateDashboardStats,
} from '@/lib/storage';
import { initializeSampleData } from '@/lib/sample-data';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  // Data states
  const [leads, setLeads] = useState<ReturnType<typeof getLeads>>([]);
  const [students, setStudents] = useState<ReturnType<typeof getStudents>>([]);
  const [referrals, setReferrals] = useState<ReturnType<typeof getReferrals>>([]);
  const [stats, setStats] = useState<ReturnType<typeof calculateDashboardStats> | null>(null);

  const refreshData = () => {
    setLeads(getLeads());
    setStudents(getStudents());
    setReferrals(getReferrals());
    setStats(calculateDashboardStats());
  };

  useEffect(() => {
    // Initialize sample data on first load
    initializeSampleData();

    // Check auth - localStorage only available client-side
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuthenticated(isAdminAuthenticated());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      refreshData();
    }
  }, [isAuthenticated, refreshKey]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('رمز عبور اشتباه است');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-bl from-amber-50 via-orange-50 to-teal-50 flex items-center justify-center p-4" dir="rtl">
        <Card className="w-full max-w-md border-2 border-amber-200 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {/* Logo */}
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
                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
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

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-amber-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.webp"
                alt={siteConfig.name.fullName}
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h1 className="font-bold text-amber-700">پنل مدیریت ویرا</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="/">
                <Button variant="outline" size="sm" className="text-xs">
                  بازگشت به سایت
                </Button>
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-500 border-red-200 hover:bg-red-50 text-xs"
              >
                <LogOut className="w-4 h-4 ml-1" />
                خروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="dashboard" className="gap-2 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">داشبورد</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="gap-2 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">سرنخ‌ها</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
              <UserCheck className="w-4 h-4" />
              <span className="hidden sm:inline">کارآموزان</span>
            </TabsTrigger>
            <TabsTrigger value="referrals" className="gap-2 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
              <Gift className="w-4 h-4" />
              <span className="hidden sm:inline">معرف‌ها</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {stats && <DashboardStats stats={stats} />}

            {/* Quick overview cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-600" />
                    آخرین سرنخ‌ها
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {leads.slice(0, 5).map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-sm">{lead.name}</p>
                          <p className="text-xs text-gray-500">{lead.childName && `فرزند: ${lead.childName}`}</p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {lead.source === 'website_form' ? 'وبسایت' : lead.source === 'whatsapp' ? 'واتساپ' : 'سایر'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-teal-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-teal-600" />
                    آخرین کارآموزان
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {students.slice(0, 5).map((student) => (
                      <div key={student.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.age} ساله • {student.parentName}</p>
                        </div>
                        <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                          {student.level === 'beginner' ? 'مقدماتی' : student.level === 'intermediate' ? 'متوسط' : student.level === 'advanced' ? 'پیشرفته' : 'مسابقات'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-600" />
                  مدیریت سرنخ‌ها
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeadTable
                  leads={leads}
                  onUpdate={() => setRefreshKey(k => k + 1)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card className="border-teal-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-teal-600" />
                  مدیریت کارآموزان
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StudentTable
                  students={students}
                  onUpdate={() => setRefreshKey(k => k + 1)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-orange-600" />
                  پیگیری معرف‌ها
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ReferralTable
                  referrals={referrals}
                  onUpdate={() => setRefreshKey(k => k + 1)}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
