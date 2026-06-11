import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 seeding database...');

  // ─── Clean all data in proper order (respect foreign keys) ───
  console.log('🗑️  cleaning existing data...');

  await prisma.ticketMessage.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.examAttempt.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.referral.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.tuition.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.revenue.deleteMany();
  await prisma.consultation.deleteMany();
  await prisma.leadNote.deleteMany();
  await prisma.followUp.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.assignmentSubmission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.courseContent.deleteMany();
  await prisma.class.deleteMany();
  await prisma.syllabusItem.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.questionBank.deleteMany();
  await prisma.student.deleteMany();
  await prisma.instructor.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.course.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.document.deleteMany();
  await prisma.user.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.salaryRecord.deleteMany();
  await prisma.invoice.deleteMany();

  console.log('✅ existing data cleaned');

  // ─── 1. Settings ───
  console.log('⚙️  creating settings...');
  const settings = await Promise.all([
    prisma.setting.create({
      data: { key: 'admin_password', value: 'vira2024', label: 'رمز عبور ادمین' },
    }),
    prisma.setting.create({
      data: { key: 'site_name', value: 'باهن رایانه', label: 'نام سایت' },
    }),
    prisma.setting.create({
      data: { key: 'site_description', value: 'مرکز آموزش چرتکه و حساب ذهنی', label: 'توضیحات سایت' },
    }),
    prisma.setting.create({
      data: { key: 'site_phone', value: '011-33123456', label: 'تلفن تماس' },
    }),
    prisma.setting.create({
      data: { key: 'site_email', value: 'info@bahanrayaneh.ir', label: 'ایمیل' },
    }),
    prisma.setting.create({
      data: { key: 'site_address', value: 'ساری، خیابان انقلاب، پلاک ۴۵', label: 'آدرس' },
    }),
    prisma.setting.create({
      data: { key: 'currency', value: 'IRR', label: 'واحد پول' },
    }),
    prisma.setting.create({
      data: { key: 'registration_open', value: 'true', label: 'ثبت‌نام باز است' },
    }),
    prisma.setting.create({
      data: { key: 'max_class_capacity', value: '15', label: 'حداکثر ظرفیت کلاس' },
    }),
    prisma.setting.create({
      data: { key: 'trial_class_enabled', value: 'true', label: 'کلاس آزمایشی فعال' },
    }),
  ]);

  // ─── 2. Branches ───
  console.log('🏢 creating branches...');
  const branchSari = await prisma.branch.create({
    data: {
      name: 'شعبه ساری',
      code: 'SARI',
      province: 'مازندران',
      city: 'ساری',
      address: 'ساری، خیابان انقلاب، پلاک ۴۵',
      phone: '011-33123456',
      managerName: 'زهرا محمدی',
      isActive: true,
    },
  });

  const branchTehran = await prisma.branch.create({
    data: {
      name: 'شعبه تهران',
      code: 'TEH',
      province: 'تهران',
      city: 'تهران',
      address: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲۰',
      phone: '021-88765432',
      managerName: 'مهدی احمدی',
      isActive: true,
    },
  });

  const branchMashhad = await prisma.branch.create({
    data: {
      name: 'شعبه مشهد',
      code: 'MSH',
      province: 'خراسان رضوی',
      city: 'مشهد',
      address: 'مشهد، بلوار وکیل‌آباد، نبش خیابان هنرستان، پلاک ۷۸',
      phone: '051-38654321',
      managerName: 'فاطمه حسینی',
      isActive: true,
    },
  });

  // ─── 3. Users ───
  console.log('👤 creating users...');

  // Super Admin
  const userSuperAdmin = await prisma.user.create({
    data: {
      email: 'admin@bahanrayaneh.ir',
      phone: '09111234567',
      name: 'علی رضایی',
      passwordHash: 'vira2024',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  // Admins
  const userAdmin1 = await prisma.user.create({
    data: {
      email: 'admin1@bahanrayaneh.ir',
      phone: '09122345678',
      name: 'مریم کریمی',
      passwordHash: 'vira2024',
      role: 'ADMIN',
      isActive: true,
    },
  });

  const userAdmin2 = await prisma.user.create({
    data: {
      email: 'admin2@bahanrayaneh.ir',
      phone: '09133456789',
      name: 'حسین نوری',
      passwordHash: 'vira2024',
      role: 'ADMIN',
      isActive: true,
    },
  });

  // Branch Managers
  const userBranchManager1 = await prisma.user.create({
    data: {
      email: 'bm-sari@bahanrayaneh.ir',
      phone: '09144567890',
      name: 'زهرا محمدی',
      passwordHash: 'vira2024',
      role: 'BRANCH_MANAGER',
      isActive: true,
    },
  });

  const userBranchManager2 = await prisma.user.create({
    data: {
      email: 'bm-tehran@bahanrayaneh.ir',
      phone: '09155678901',
      name: 'مهدی احمدی',
      passwordHash: 'vira2024',
      role: 'BRANCH_MANAGER',
      isActive: true,
    },
  });

  const userBranchManager3 = await prisma.user.create({
    data: {
      email: 'bm-mashhad@bahanrayaneh.ir',
      phone: '09166789012',
      name: 'فاطمه حسینی',
      passwordHash: 'vira2024',
      role: 'BRANCH_MANAGER',
      isActive: true,
    },
  });

  // Instructors
  const userInstructor1 = await prisma.user.create({
    data: {
      email: 'instructor1@bahanrayaneh.ir',
      phone: '09177890123',
      name: 'سارا صادقی',
      passwordHash: 'vira2024',
      role: 'INSTRUCTOR',
      isActive: true,
    },
  });

  const userInstructor2 = await prisma.user.create({
    data: {
      email: 'instructor2@bahanrayaneh.ir',
      phone: '09188901234',
      name: 'امیر طاهری',
      passwordHash: 'vira2024',
      role: 'INSTRUCTOR',
      isActive: true,
    },
  });

  const userInstructor3 = await prisma.user.create({
    data: {
      email: 'instructor3@bahanrayaneh.ir',
      phone: '09199012345',
      name: 'نازنین رحیمی',
      passwordHash: 'vira2024',
      role: 'INSTRUCTOR',
      isActive: true,
    },
  });

  const userInstructor4 = await prisma.user.create({
    data: {
      email: 'instructor4@bahanrayaneh.ir',
      phone: '09200123456',
      name: 'محمد جعفری',
      passwordHash: 'vira2024',
      role: 'INSTRUCTOR',
      isActive: true,
    },
  });

  const userInstructor5 = await prisma.user.create({
    data: {
      email: 'instructor5@bahanrayaneh.ir',
      phone: '09211234567',
      name: 'لیلا موسوی',
      passwordHash: 'vira2024',
      role: 'INSTRUCTOR',
      isActive: true,
    },
  });

  // Staff
  const userStaff1 = await prisma.user.create({
    data: {
      email: 'staff1@bahanrayaneh.ir',
      phone: '09222345678',
      name: 'رضا عباسی',
      passwordHash: 'vira2024',
      role: 'STAFF',
      isActive: true,
    },
  });

  const userStaff2 = await prisma.user.create({
    data: {
      email: 'staff2@bahanrayaneh.ir',
      phone: '09233456789',
      name: 'شیما خانی',
      passwordHash: 'vira2024',
      role: 'STAFF',
      isActive: true,
    },
  });

  const userStaff3 = await prisma.user.create({
    data: {
      email: 'staff3@bahanrayaneh.ir',
      phone: '09244567890',
      name: 'پویا مرادی',
      passwordHash: 'vira2024',
      role: 'STAFF',
      isActive: true,
    },
  });

  const userStaff4 = await prisma.user.create({
    data: {
      email: 'staff4@bahanrayaneh.ir',
      phone: '09255678901',
      name: 'نگار یوسفی',
      passwordHash: 'vira2024',
      role: 'STAFF',
      isActive: true,
    },
  });

  // ─── 4. Instructors ───
  console.log('👩‍🏫 creating instructors...');
  const instructor1 = await prisma.instructor.create({
    data: {
      userId: userInstructor1.id,
      specialties: '["چرتکه","حساب ذهنی"]',
      bio: 'مدرس حرفه‌ای چرتکه با ۸ سال سابقه تدریس',
      rating: 4.8,
      totalClasses: 45,
      hireDate: new Date('2022-06-01'),
      salaryBase: 15000000,
      isActive: true,
      branchId: branchSari.id,
    },
  });

  const instructor2 = await prisma.instructor.create({
    data: {
      userId: userInstructor2.id,
      specialties: '["حساب ذهنی","ریاضی خلاق"]',
      bio: 'متخصص حساب ذهنی و مربی مسابقات کشوری',
      rating: 4.9,
      totalClasses: 62,
      hireDate: new Date('2021-03-15'),
      salaryBase: 18000000,
      isActive: true,
      branchId: branchTehran.id,
    },
  });

  const instructor3 = await prisma.instructor.create({
    data: {
      userId: userInstructor3.id,
      specialties: '["چرتکه پیشرفته","آمادگی مسابقات"]',
      bio: 'مربی تیم‌های مسابقات ملی و بین‌المللی چرتکه',
      rating: 4.7,
      totalClasses: 38,
      hireDate: new Date('2023-01-10'),
      salaryBase: 16000000,
      isActive: true,
      branchId: branchMashhad.id,
    },
  });

  const instructor4 = await prisma.instructor.create({
    data: {
      userId: userInstructor4.id,
      specialties: '["چرتکه مقدماتی","تمرکز و حافظه"]',
      bio: 'مدرس دوره‌های مقدماتی و تقویت تمرکز',
      rating: 4.5,
      totalClasses: 28,
      hireDate: new Date('2023-09-01'),
      salaryBase: 12000000,
      isActive: true,
      branchId: branchSari.id,
    },
  });

  const instructor5 = await prisma.instructor.create({
    data: {
      userId: userInstructor5.id,
      specialties: '["ریاضی خلاق","حساب ذهنی","چرتکه"]',
      bio: 'مدرس ریاضیات خلاق با رویکرد بازی‌محور',
      rating: 4.6,
      totalClasses: 33,
      hireDate: new Date('2022-12-01'),
      salaryBase: 14000000,
      isActive: true,
      branchId: branchTehran.id,
    },
  });

  // ─── 5. Staff ───
  console.log('👔 creating staff...');
  const staff1 = await prisma.staff.create({
    data: {
      userId: userStaff1.id,
      position: 'مسئول پذیرش',
      department: 'پذیرش',
      branchId: branchSari.id,
      hireDate: new Date('2022-08-15'),
      isActive: true,
    },
  });

  const staff2 = await prisma.staff.create({
    data: {
      userId: userStaff2.id,
      position: 'مسئول مالی',
      department: 'مالی',
      branchId: branchTehran.id,
      hireDate: new Date('2023-02-01'),
      isActive: true,
    },
  });

  const staff3 = await prisma.staff.create({
    data: {
      userId: userStaff3.id,
      position: 'پشتیبان فنی',
      department: 'فناوری اطلاعات',
      branchId: branchMashhad.id,
      hireDate: new Date('2023-06-20'),
      isActive: true,
    },
  });

  const staff4 = await prisma.staff.create({
    data: {
      userId: userStaff4.id,
      position: 'مسئول بازاریابی',
      department: 'بازاریابی',
      branchId: branchSari.id,
      hireDate: new Date('2024-01-05'),
      isActive: true,
    },
  });

  // ─── 7. Courses ───
  console.log('📚 creating courses...');
  const course1 = await prisma.course.create({
    data: {
      slug: 'abacus-beginner',
      title: 'چرتکه مقدماتی',
      description: 'آموزش پایه کار با چرتکه برای کودکان ۵ تا ۸ سال. در این دوره اصول اولیه چرتکه، شناخت میله‌ها و مهره‌ها و انجام عملیات ساده آموزش داده می‌شود.',
      level: 'BEGINNER',
      ageRange: '۵ تا ۸ سال',
      duration: '۳ ماه',
      sessions: 12,
      sessionsPerWeek: 2,
      sessionDuration: 60,
      price: 3500000,
      features: '["آموزش تعاملی","کلاس حضوری","ارائه چرتکه رایگان"]',
      icon: 'calculator',
      color: '#10B981',
      status: 'ACTIVE',
      capacity: 15,
      enrolledCount: 8,
      startDate: new Date('2025-01-15'),
      endDate: new Date('2025-04-15'),
      createdById: userSuperAdmin.id,
      branchId: branchSari.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      slug: 'mental-math-intermediate',
      title: 'حساب ذهنی متوسط',
      description: 'دوره تقویت مهارت‌های حساب ذهنی برای کودکان ۸ تا ۱۱ سال. محاسبات ذهنی دو رقمی و سه رقمی با سرعت بالا.',
      level: 'INTERMEDIATE',
      ageRange: '۸ تا ۱۱ سال',
      duration: '۴ ماه',
      sessions: 16,
      sessionsPerWeek: 2,
      sessionDuration: 75,
      price: 4500000,
      features: '["تمرینات سرعتی","مسابقات هفتگی","گزارش پیشرفت"]',
      icon: 'brain',
      color: '#8B5CF6',
      status: 'ACTIVE',
      capacity: 12,
      enrolledCount: 6,
      startDate: new Date('2025-02-01'),
      endDate: new Date('2025-06-01'),
      createdById: userAdmin1.id,
      branchId: branchTehran.id,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      slug: 'abacus-advanced',
      title: 'چرتکه پیشرفته',
      description: 'دوره پیشرفته چرتکه برای دانش‌آموزان سطح بالا. عملیات پیچیده شامل ضرب و تقسیم چند رقمی.',
      level: 'ADVANCED',
      ageRange: '۹ تا ۱۳ سال',
      duration: '۵ ماه',
      sessions: 20,
      sessionsPerWeek: 2,
      sessionDuration: 90,
      price: 5500000,
      features: '["عملیات پیشرفته","آمادگی مسابقات","جلسه خصوصی ماهانه"]',
      icon: 'trophy',
      color: '#F59E0B',
      status: 'ACTIVE',
      capacity: 10,
      enrolledCount: 5,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-06-01'),
      createdById: userAdmin2.id,
      branchId: branchMashhad.id,
    },
  });

  const course4 = await prisma.course.create({
    data: {
      slug: 'competition-prep',
      title: 'آمادگی مسابقات',
      description: 'آمادگی تخصصی برای مسابقات کشوری و بین‌المللی چرتکه و حساب ذهنی. تمرینات شبیه‌سازی مسابقه.',
      level: 'COMPETITION',
      ageRange: '۸ تا ۱۵ سال',
      duration: '۳ ماه',
      sessions: 24,
      sessionsPerWeek: 3,
      sessionDuration: 90,
      price: 7000000,
      features: '["شبیه‌سازی مسابقه","مربی اختصاصی","تمرینات فشرده"]',
      icon: 'award',
      color: '#EF4444',
      status: 'ACTIVE',
      capacity: 8,
      enrolledCount: 4,
      startDate: new Date('2025-03-01'),
      endDate: new Date('2025-06-01'),
      createdById: userAdmin1.id,
      branchId: branchTehran.id,
    },
  });

  const course5 = await prisma.course.create({
    data: {
      slug: 'creative-math',
      title: 'ریاضی خلاق',
      description: 'آموزش ریاضیات با رویکرد خلاقانه و بازی‌محور. تقویت تفکر منطقی و حل مسئله.',
      level: 'BEGINNER',
      ageRange: '۶ تا ۱۰ سال',
      duration: '۳ ماه',
      sessions: 12,
      sessionsPerWeek: 2,
      sessionDuration: 60,
      price: 3000000,
      features: '["یادگیری بازی‌محور","پروژه‌های عملی","کارگاه خلاقیت"]',
      icon: 'sparkles',
      color: '#EC4899',
      status: 'ACTIVE',
      capacity: 15,
      enrolledCount: 7,
      startDate: new Date('2025-02-15'),
      endDate: new Date('2025-05-15'),
      createdById: userAdmin2.id,
      branchId: branchSari.id,
    },
  });

  const course6 = await prisma.course.create({
    data: {
      slug: 'focus-memory',
      title: 'تمرکز و حافظه',
      description: 'دوره تقویت تمرکز و حافظه کودکان با تکنیک‌های علمی و تمرینات عملی.',
      level: 'BEGINNER',
      ageRange: '۶ تا ۱۲ سال',
      duration: '۲ ماه',
      sessions: 8,
      sessionsPerWeek: 2,
      sessionDuration: 45,
      price: 2500000,
      features: '["تکنیک‌های تمرکز","تمرینات حافظه","گزارش هفتگی"]',
      icon: 'target',
      color: '#06B6D4',
      status: 'UPCOMING',
      capacity: 20,
      enrolledCount: 3,
      startDate: new Date('2025-04-01'),
      endDate: new Date('2025-06-01'),
      createdById: userSuperAdmin.id,
      branchId: branchMashhad.id,
    },
  });

  // ─── 8. SyllabusItems ───
  console.log('📋 creating syllabus items...');
  const syllabusItems = await Promise.all([
    // Course 1: چرتکه مقدماتی
    prisma.syllabusItem.create({ data: { courseId: course1.id, sessionNumber: 1, title: 'آشنایی با چرتکه و مهره‌ها', topics: '["شناخت چرتکه","نام میله‌ها","حرکت مهره‌ها"]', homework: 'تمرین حرکت مهره‌ها', duration: 60 } }),
    prisma.syllabusItem.create({ data: { courseId: course1.id, sessionNumber: 2, title: 'اعداد ۱ تا ۹ روی چرتکه', topics: '["نمایش اعداد تک رقمی","جمع ساده","تفریق ساده"]', homework: 'نمایش اعداد روی چرتکه', duration: 60 } }),
    prisma.syllabusItem.create({ data: { courseId: course1.id, sessionNumber: 3, title: 'اعداد دو رقمی', topics: '["نمایش اعداد دو رقمی","جمع اعداد دو رقمی","تمرین عملی"]', homework: 'جمع و تفریق دو رقمی', duration: 60 } }),
    prisma.syllabusItem.create({ data: { courseId: course1.id, sessionNumber: 4, title: 'مرور و آزمون میان‌دوره', topics: '["مرور مطالب","آزمون عملی","ارزیابی پیشرفت"]', homework: 'مرور کلی', duration: 60 } }),

    // Course 2: حساب ذهنی متوسط
    prisma.syllabusItem.create({ data: { courseId: course2.id, sessionNumber: 1, title: 'مفاهیم پایه حساب ذهنی', topics: '["تصویرسازی ذهنی","جمع ذهنی تک رقمی","تمرینات سرعتی"]', homework: 'تمرینات تصویرسازی', duration: 75 } }),
    prisma.syllabusItem.create({ data: { courseId: course2.id, sessionNumber: 2, title: 'جمع ذهنی دو رقمی', topics: '["تکنیک‌های جمع ذهنی","سرعت بخشی","تمرینات زمان‌دار"]', homework: 'جمع ذهنی روزانه', duration: 75 } }),
    prisma.syllabusItem.create({ data: { courseId: course2.id, sessionNumber: 3, title: 'تفریق ذهنی', topics: '["تفریق ذهنی تک رقمی","تفریق ذهنی دو رقمی","ترکیب جمع و تفریق"]', homework: 'تفریق ذهنی', duration: 75 } }),
    prisma.syllabusItem.create({ data: { courseId: course2.id, sessionNumber: 4, title: 'ضرب ذهنی مقدماتی', topics: '["ضرب در اعداد تک رقمی","الگوهای ضرب","تمرینات ترکیبی"]', homework: 'ضرب ذهنی', duration: 75 } }),

    // Course 3: چرتکه پیشرفته
    prisma.syllabusItem.create({ data: { courseId: course3.id, sessionNumber: 1, title: 'ضرب چند رقمی روی چرتکه', topics: '["ضرب دو رقمی در تک رقمی","تکنیک‌های سریع","تمرین عملی"]', homework: 'تمرین ضرب', duration: 90 } }),
    prisma.syllabusItem.create({ data: { courseId: course3.id, sessionNumber: 2, title: 'تقسیم روی چرتکه', topics: '["تقسیم ساده","تقسیم با باقیمانده","تمرینات پیشرفته"]', homework: 'تمرین تقسیم', duration: 90 } }),
    prisma.syllabusItem.create({ data: { courseId: course3.id, sessionNumber: 3, title: 'عملیات ترکیبی', topics: '["ترکیب چهار عمل اصلی","مسائل ترکیبی","سرعت و دقت"]', homework: 'مسائل ترکیبی', duration: 90 } }),
    prisma.syllabusItem.create({ data: { courseId: course3.id, sessionNumber: 4, title: 'آمادگی مسابقات پیشرفته', topics: '["شبیه‌سازی مسابقه","مدیریت زمان","تکنیک‌های رقابتی"]', homework: 'تمرین شبیه‌سازی', duration: 90 } }),

    // Course 4: آمادگی مسابقات
    prisma.syllabusItem.create({ data: { courseId: course4.id, sessionNumber: 1, title: 'شناخت فرمت مسابقات', topics: '["قوانین مسابقات","مدیریت زمان","استراتژی‌های رقابت"]', homework: 'مطالعه قوانین مسابقات', duration: 90 } }),
    prisma.syllabusItem.create({ data: { courseId: course4.id, sessionNumber: 2, title: 'تمرینات سرعتی فشرده', topics: '["حساب ذهنی سرعتی","چرتکه سرعتی","تمرینات زمان‌دار"]', homework: 'تمرینات سرعتی روزانه', duration: 90 } }),
    prisma.syllabusItem.create({ data: { courseId: course4.id, sessionNumber: 3, title: 'شبیه‌سازی مسابقه اول', topics: '["آزمون شبیه‌سازی","تحلیل عملکرد","رفع نقاط ضعف"]', homework: 'مرور و تحلیل', duration: 90 } }),
    prisma.syllabusItem.create({ data: { courseId: course4.id, sessionNumber: 4, title: 'شبیه‌سازی مسابقه نهایی', topics: '["آزمون نهایی شبیه‌سازی","آمادگی روانی","مشاوره مسابقه"]', homework: 'استراحت و آمادگی', duration: 90 } }),

    // Course 5: ریاضی خلاق
    prisma.syllabusItem.create({ data: { courseId: course5.id, sessionNumber: 1, title: 'تفکر منطقی و الگوها', topics: '["شناسایی الگوها","استدلال منطقی","معماها"]', homework: 'حل معماها', duration: 60 } }),
    prisma.syllabusItem.create({ data: { courseId: course5.id, sessionNumber: 2, title: 'هندسه خلاق', topics: '["اشکال هنددی","تقارن","ترکیب اشکال"]', homework: 'پروژه هندسی', duration: 60 } }),
    prisma.syllabusItem.create({ data: { courseId: course5.id, sessionNumber: 3, title: 'حل مسئله خلاق', topics: '["استراتژی‌های حل مسئله","مسائل چالشی","کار گروهی"]', homework: 'مسائل چالشی', duration: 60 } }),

    // Course 6: تمرکز و حافظه
    prisma.syllabusItem.create({ data: { courseId: course6.id, sessionNumber: 1, title: 'تکنیک‌های تمرکز', topics: '["تنفس آگاهانه","تمرکز حواس","حذف عوامل حواس‌پرتی"]', homework: 'تمرین روزانه تمرکز', duration: 45 } }),
    prisma.syllabusItem.create({ data: { courseId: course6.id, sessionNumber: 2, title: 'تقویت حافظه کوتاه‌مدت', topics: '["تکنیک‌های حافظه","تمرینات حافظه فعال","بازی‌های حافظه"]', homework: 'بازی‌های حافظه', duration: 45 } }),
    prisma.syllabusItem.create({ data: { courseId: course6.id, sessionNumber: 3, title: 'حافظه بلندمدت و مرور', topics: '["تکنیک فاصله‌دار مرور","نقشه ذهنی","خلاصه‌سازی"]', homework: 'نقشه ذهنی', duration: 45 } }),
  ]);

  // ─── 6. Students ───
  console.log('🎓 creating students...');
  const students = await Promise.all([
    prisma.student.create({ data: { name: 'آرمین رضایی', phone: '09351234567', email: 'armin@example.com', age: 8, parentName: 'احمد رضایی', parentPhone: '09121234567', level: 'BEGINNER', province: 'مازندران', city: 'ساری', referralCode: 'REF-ARM001', isActive: true, branchId: branchSari.id } }),
    prisma.student.create({ data: { name: 'سینا کریمی', phone: '09362345678', email: 'sina@example.com', age: 9, parentName: 'محمد کریمی', parentPhone: '09132345678', level: 'INTERMEDIATE', province: 'تهران', city: 'تهران', referralCode: 'REF-SIN002', isActive: true, branchId: branchTehran.id } }),
    prisma.student.create({ data: { name: 'یاسمن نوری', phone: '09373456789', email: 'yasmin@example.com', age: 7, parentName: 'علی نوری', parentPhone: '09143456789', level: 'BEGINNER', province: 'مازندران', city: 'ساری', referralCode: 'REF-YAS003', isActive: true, branchId: branchSari.id } }),
    prisma.student.create({ data: { name: 'کیان احمدی', phone: '09384567890', email: 'kian@example.com', age: 10, parentName: 'رضا احمدی', parentPhone: '09154567890', level: 'ADVANCED', province: 'خراسان رضوی', city: 'مشهد', referralCode: 'REF-KIA004', isActive: true, branchId: branchMashhad.id } }),
    prisma.student.create({ data: { name: 'هانیه صادقی', phone: '09395678901', email: 'hanieh@example.com', age: 11, parentName: 'حسن صادقی', parentPhone: '09165678901', level: 'COMPETITION', province: 'تهران', city: 'تهران', referralCode: 'REF-HAN005', isActive: true, branchId: branchTehran.id } }),
    prisma.student.create({ data: { name: 'مهدیا طاهری', phone: '09306789012', email: 'mehdia@example.com', age: 8, parentName: 'حسین طاهری', parentPhone: '09177890123', level: 'BEGINNER', province: 'مازندران', city: 'ساری', referralCode: 'REF-MEH006', isActive: true, branchId: branchSari.id } }),
    prisma.student.create({ data: { name: 'فاطمه رحیمی', phone: '09317890123', email: 'fatemeh@example.com', age: 9, parentName: 'مجید رحیمی', parentPhone: '09188901234', level: 'INTERMEDIATE', province: 'خراسان رضوی', city: 'مشهد', referralCode: 'REF-FAT007', isActive: true, branchId: branchMashhad.id } }),
    prisma.student.create({ data: { name: 'عرفان جعفری', phone: '09328901234', email: 'erfan@example.com', age: 12, parentName: 'کاظم جعفری', parentPhone: '09199012345', level: 'ADVANCED', province: 'تهران', city: 'تهران', referralCode: 'REF-ERF008', isActive: true, branchId: branchTehran.id } }),
    prisma.student.create({ data: { name: 'نیلوفر عباسی', phone: '09339012345', email: 'niloofar@example.com', age: 7, parentName: 'رضا عباسی', parentPhone: '09200123456', level: 'BEGINNER', province: 'مازندران', city: 'ساری', referralCode: 'REF-NIL009', isActive: true, branchId: branchSari.id } }),
    prisma.student.create({ data: { name: 'بهار خانی', phone: '09340123456', email: 'bahar@example.com', age: 10, parentName: 'مهدی خانی', parentPhone: '09211234567', level: 'INTERMEDIATE', province: 'خراسان رضوی', city: 'مشهد', referralCode: 'REF-BAH010', isActive: true, branchId: branchMashhad.id } }),
    prisma.student.create({ data: { name: 'سپهر مرادی', phone: '09351234500', email: 'sepehr@example.com', age: 6, parentName: 'پویا مرادی', parentPhone: '09222345678', level: 'BEGINNER', province: 'مازندران', city: 'ساری', referralCode: 'REF-SEP011', isActive: true, branchId: branchSari.id } }),
    prisma.student.create({ data: { name: 'زهرا یوسفی', phone: '09362345600', email: 'zahra@example.com', age: 11, parentName: 'محمد یوسفی', parentPhone: '09233456789', level: 'COMPETITION', province: 'تهران', city: 'تهران', referralCode: 'REF-ZAH012', isActive: true, branchId: branchTehran.id } }),
    prisma.student.create({ data: { name: 'آریا موسوی', phone: '09373456700', email: 'aria@example.com', age: 9, parentName: 'سعید موسوی', parentPhone: '09244567890', level: 'INTERMEDIATE', province: 'خراسان رضوی', city: 'مشهد', referralCode: 'REF-ARI013', isActive: true, branchId: branchMashhad.id } }),
    prisma.student.create({ data: { name: 'درسا حسینی', phone: '09384567800', email: 'dorsa@example.com', age: 8, parentName: 'امیر حسینی', parentPhone: '09255678901', level: 'BEGINNER', province: 'مازندران', city: 'ساری', referralCode: 'REF-DOR014', isActive: true, branchId: branchSari.id } }),
    prisma.student.create({ data: { name: 'پارسا شریفی', phone: '09395678900', email: 'parsa@example.com', age: 13, parentName: 'حامد شریفی', parentPhone: '09111234599', level: 'ADVANCED', province: 'تهران', city: 'تهران', referralCode: 'REF-PAR015', isActive: true, branchId: branchTehran.id } }),
  ]);

  // ─── 9. Classes ───
  console.log('🏫 creating classes...');
  const classes = await Promise.all([
    prisma.class.create({ data: { courseId: course1.id, instructorId: instructor1.id, branchId: branchSari.id, dayOfWeek: 'SATURDAY', startTime: '16:00', endTime: '17:00', location: 'کلاس شماره ۱ - ساری', status: 'IN_PROGRESS', classDate: new Date('2025-03-08T16:00:00') } }),
    prisma.class.create({ data: { courseId: course1.id, instructorId: instructor4.id, branchId: branchSari.id, dayOfWeek: 'TUESDAY', startTime: '15:00', endTime: '16:00', location: 'کلاس شماره ۲ - ساری', status: 'IN_PROGRESS', classDate: new Date('2025-03-11T15:00:00') } }),
    prisma.class.create({ data: { courseId: course2.id, instructorId: instructor2.id, branchId: branchTehran.id, dayOfWeek: 'SUNDAY', startTime: '16:00', endTime: '17:15', location: 'کلاس شماره ۱ - تهران', status: 'IN_PROGRESS', classDate: new Date('2025-03-09T16:00:00') } }),
    prisma.class.create({ data: { courseId: course2.id, instructorId: instructor5.id, branchId: branchTehran.id, dayOfWeek: 'WEDNESDAY', startTime: '17:00', endTime: '18:15', location: 'کلاس شماره ۲ - تهران', status: 'IN_PROGRESS', classDate: new Date('2025-03-12T17:00:00') } }),
    prisma.class.create({ data: { courseId: course3.id, instructorId: instructor3.id, branchId: branchMashhad.id, dayOfWeek: 'MONDAY', startTime: '16:00', endTime: '17:30', location: 'کلاس ویژه - مشهد', status: 'IN_PROGRESS', classDate: new Date('2025-03-10T16:00:00') } }),
    prisma.class.create({ data: { courseId: course4.id, instructorId: instructor2.id, branchId: branchTehran.id, dayOfWeek: 'THURSDAY', startTime: '15:00', endTime: '16:30', location: 'کلاس مسابقات - تهران', status: 'IN_PROGRESS', classDate: new Date('2025-03-13T15:00:00') } }),
    prisma.class.create({ data: { courseId: course5.id, instructorId: instructor4.id, branchId: branchSari.id, dayOfWeek: 'WEDNESDAY', startTime: '16:00', endTime: '17:00', location: 'کلاس خلاق - ساری', status: 'IN_PROGRESS', classDate: new Date('2025-03-12T16:00:00') } }),
    prisma.class.create({ data: { courseId: course6.id, instructorId: instructor3.id, branchId: branchMashhad.id, dayOfWeek: 'FRIDAY', startTime: '10:00', endTime: '10:45', location: 'کلاس تمرکز - مشهد', status: 'SCHEDULED', classDate: new Date('2025-04-04T10:00:00') } }),
  ]);

  // ─── 10. Enrollments ───
  console.log('📝 creating enrollments...');
  const enrollments = await Promise.all([
    prisma.enrollment.create({ data: { studentId: students[0].id, courseId: course1.id, branchId: branchSari.id, status: 'ACTIVE', progress: 35, enrolledAt: new Date('2025-01-15') } }),
    prisma.enrollment.create({ data: { studentId: students[1].id, courseId: course2.id, branchId: branchTehran.id, status: 'ACTIVE', progress: 50, enrolledAt: new Date('2025-02-01') } }),
    prisma.enrollment.create({ data: { studentId: students[2].id, courseId: course1.id, branchId: branchSari.id, status: 'ACTIVE', progress: 40, enrolledAt: new Date('2025-01-15') } }),
    prisma.enrollment.create({ data: { studentId: students[3].id, courseId: course3.id, branchId: branchMashhad.id, status: 'ACTIVE', progress: 60, enrolledAt: new Date('2025-01-01') } }),
    prisma.enrollment.create({ data: { studentId: students[4].id, courseId: course4.id, branchId: branchTehran.id, status: 'ACTIVE', progress: 25, enrolledAt: new Date('2025-03-01') } }),
    prisma.enrollment.create({ data: { studentId: students[5].id, courseId: course5.id, branchId: branchSari.id, status: 'ACTIVE', progress: 30, enrolledAt: new Date('2025-02-15') } }),
    prisma.enrollment.create({ data: { studentId: students[6].id, courseId: course3.id, branchId: branchMashhad.id, status: 'ACTIVE', progress: 45, enrolledAt: new Date('2025-01-10') } }),
    prisma.enrollment.create({ data: { studentId: students[7].id, courseId: course4.id, branchId: branchTehran.id, status: 'ACTIVE', progress: 20, enrolledAt: new Date('2025-03-01') } }),
    prisma.enrollment.create({ data: { studentId: students[8].id, courseId: course1.id, branchId: branchSari.id, status: 'ACTIVE', progress: 30, enrolledAt: new Date('2025-01-20') } }),
    prisma.enrollment.create({ data: { studentId: students[9].id, courseId: course2.id, branchId: branchMashhad.id, status: 'PAUSED', progress: 55, notes: 'به دلیل بیماری متوقف شده', enrolledAt: new Date('2025-02-01') } }),
    prisma.enrollment.create({ data: { studentId: students[10].id, courseId: course5.id, branchId: branchSari.id, status: 'ACTIVE', progress: 15, enrolledAt: new Date('2025-02-20') } }),
    prisma.enrollment.create({ data: { studentId: students[11].id, courseId: course4.id, branchId: branchTehran.id, status: 'ACTIVE', progress: 40, enrolledAt: new Date('2025-03-01') } }),
    prisma.enrollment.create({ data: { studentId: students[12].id, courseId: course2.id, branchId: branchMashhad.id, status: 'ACTIVE', progress: 50, enrolledAt: new Date('2025-02-05') } }),
    prisma.enrollment.create({ data: { studentId: students[13].id, courseId: course1.id, branchId: branchSari.id, status: 'ACTIVE', progress: 25, enrolledAt: new Date('2025-01-25') } }),
    prisma.enrollment.create({ data: { studentId: students[14].id, courseId: course3.id, branchId: branchTehran.id, status: 'ACTIVE', progress: 70, enrolledAt: new Date('2024-12-01') } }),
    prisma.enrollment.create({ data: { studentId: students[0].id, courseId: course5.id, branchId: branchSari.id, status: 'ACTIVE', progress: 20, enrolledAt: new Date('2025-02-15') } }),
    prisma.enrollment.create({ data: { studentId: students[4].id, courseId: course2.id, branchId: branchTehran.id, status: 'COMPLETED', progress: 100, enrolledAt: new Date('2024-09-01'), completedAt: new Date('2025-01-01') } }),
  ]);

  // ─── 11. Leads ───
  console.log('📊 creating leads...');
  const leads = await Promise.all([
    prisma.lead.create({ data: { name: 'مینا کاظمی', phone: '09351234001', email: 'mina@example.com', childName: 'رویا', childAge: 7, interestedCourse: 'چرتکه مقدماتی', province: 'مازندران', city: 'ساری', source: 'WEBSITE_FORM', status: 'NEW', priority: 'MEDIUM', notes: 'از طریق سایت ثبت‌نام کرده', branchId: branchSari.id } }),
    prisma.lead.create({ data: { name: 'سحر باقری', phone: '09362345002', email: 'sahar@example.com', childName: 'نیما', childAge: 9, interestedCourse: 'حساب ذهنی متوسط', province: 'تهران', city: 'تهران', source: 'INSTAGRAM', status: 'CONTACTED', priority: 'HIGH', notes: 'از اینستاگرام مراجعه کرده', branchId: branchTehran.id, assignedToId: userStaff1.id } }),
    prisma.lead.create({ data: { name: 'فرزاد شیرازی', phone: '09373456003', childName: 'الناز', childAge: 8, interestedCourse: 'چرتکه مقدماتی', province: 'مازندران', city: 'ساری', source: 'PHONE_CALL', status: 'CONSULTATION_SCHEDULED', priority: 'MEDIUM', branchId: branchSari.id, assignedToId: userStaff1.id } }),
    prisma.lead.create({ data: { name: 'ندا اکبری', phone: '09384567004', email: 'neda@example.com', childName: 'آرتین', childAge: 10, interestedCourse: 'آمادگی مسابقات', province: 'خراسان رضوی', city: 'مشهد', source: 'REFERRAL', status: 'CONSULTATION_DONE', priority: 'HIGH', notes: 'معرفی شده توسط خانم رضایی', branchId: branchMashhad.id, assignedToId: userStaff3.id } }),
    prisma.lead.create({ data: { name: 'پگاه حیدری', phone: '09395678005', childName: 'سام', childAge: 6, interestedCourse: 'ریاضی خلاق', province: 'مازندران', city: 'ساری', source: 'WALK_IN', status: 'TRIAL_CLASS_SCHEDULED', priority: 'MEDIUM', branchId: branchSari.id, assignedToId: userStaff1.id } }),
    prisma.lead.create({ data: { name: 'شایان رستمی', phone: '09306789006', childName: 'تینا', childAge: 11, interestedCourse: 'حساب ذهنی متوسط', province: 'تهران', city: 'تهران', source: 'WHATSAPP', status: 'TRIAL_CLASS_DONE', priority: 'HIGH', branchId: branchTehran.id, assignedToId: userStaff2.id } }),
    prisma.lead.create({ data: { name: 'آزاده محمودی', phone: '09317890007', email: 'azadeh@example.com', childName: 'کامران', childAge: 8, interestedCourse: 'چرتکه پیشرفته', province: 'خراسان رضوی', city: 'مشهد', source: 'TELEGRAM', status: 'ENROLLMENT_OFFERED', priority: 'URGENT', branchId: branchMashhad.id, assignedToId: userStaff3.id } }),
    prisma.lead.create({ data: { name: 'کامبیز فرهادی', phone: '09328901008', childName: 'شادی', childAge: 7, interestedCourse: 'چرتکه مقدماتی', province: 'مازندران', city: 'ساری', source: 'ADVERTISEMENT', status: 'ENROLLED', priority: 'MEDIUM', branchId: branchSari.id, assignedToId: userStaff4.id } }),
    prisma.lead.create({ data: { name: 'لوrena صالحی', phone: '09339012009', childName: 'دانیال', childAge: 12, interestedCourse: 'آمادگی مسابقات', province: 'تهران', city: 'تهران', source: 'WEBSITE_FORM', status: 'LOST', priority: 'LOW', notes: 'بدون پاسخ بعد از ۳ تماس', branchId: branchTehran.id } }),
    prisma.lead.create({ data: { name: 'مهناز قاسمی', phone: '09340123010', email: 'mahnaz@example.com', childName: 'سارینا', childAge: 9, interestedCourse: 'حساب ذهنی متوسط', province: 'خراسان رضوی', city: 'مشهد', source: 'CAMPAIGN', status: 'NEW', priority: 'MEDIUM', branchId: branchMashhad.id } }),
    prisma.lead.create({ data: { name: 'رامین توکلی', phone: '09351234011', childName: 'باران', childAge: 6, interestedCourse: 'تمرکز و حافظه', province: 'مازندران', city: 'ساری', source: 'WEBSITE_FORM', status: 'NEW', priority: 'LOW', branchId: branchSari.id } }),
    prisma.lead.create({ data: { name: 'شیوا مرتضوی', phone: '09362345012', email: 'shiva@example.com', childName: 'آرمیتا', childAge: 10, interestedCourse: 'چرتکه پیشرفته', province: 'تهران', city: 'تهران', source: 'INSTAGRAM', status: 'CONTACTED', priority: 'HIGH', branchId: branchTehran.id, assignedToId: userStaff2.id } }),
    prisma.lead.create({ data: { name: 'بهرام نجفی', phone: '09373456013', childName: 'کوروش', childAge: 8, interestedCourse: 'چرتکه مقدماتی', province: 'خراسان رضوی', city: 'مشهد', source: 'PHONE_CALL', status: 'CONSULTATION_SCHEDULED', priority: 'MEDIUM', branchId: branchMashhad.id, assignedToId: userStaff3.id } }),
    prisma.lead.create({ data: { name: 'گلناز ابراهیمی', phone: '09384567014', childName: 'ترانه', childAge: 11, interestedCourse: 'ریاضی خلاق', province: 'مازندران', city: 'ساری', source: 'REFERRAL', status: 'NOT_INTERESTED', priority: 'LOW', notes: 'قیمت بالا اعلام کرده', branchId: branchSari.id } }),
    prisma.lead.create({ data: { name: 'داریوش پورمند', phone: '09395678015', email: 'dariush@example.com', childName: 'پرنیان', childAge: 7, interestedCourse: 'چرتکه مقدماتی', province: 'تهران', city: 'تهران', source: 'WALK_IN', status: 'NEW', priority: 'MEDIUM', branchId: branchTehran.id } }),
    prisma.lead.create({ data: { name: 'شبنم هاشمی', phone: '09306789016', childName: 'رادین', childAge: 9, interestedCourse: 'حساب ذهنی متوسط', province: 'خراسان رضوی', city: 'مشهد', source: 'WHATSAPP', status: 'CONTACTED', priority: 'HIGH', branchId: branchMashhad.id, assignedToId: userStaff3.id } }),
    prisma.lead.create({ data: { name: 'نوید زارعی', phone: '09317890017', childName: 'گلستان', childAge: 6, interestedCourse: 'تمرکز و حافظه', province: 'مازندران', city: 'ساری', source: 'ADVERTISEMENT', status: 'NEW', priority: 'LOW', branchId: branchSari.id } }),
    prisma.lead.create({ data: { name: 'الهام شفاعی', phone: '09328901018', email: 'elahm@example.com', childName: 'بردیا', childAge: 13, interestedCourse: 'آمادگی مسابقات', province: 'تهران', city: 'تهران', source: 'WEBSITE_FORM', status: 'NEW', priority: 'MEDIUM', branchId: branchTehran.id } }),
    prisma.lead.create({ data: { name: 'کوروش رحمانی', phone: '09339012019', childName: 'آناهیتا', childAge: 8, interestedCourse: 'چرتکه مقدماتی', province: 'خراسان رضوی', city: 'مشهد', source: 'INSTAGRAM', status: 'CONTACTED', priority: 'MEDIUM', branchId: branchMashhad.id, assignedToId: userStaff3.id } }),
    prisma.lead.create({ data: { name: 'پرستو لطفی', phone: '09340123020', childName: 'مازیار', childAge: 10, interestedCourse: 'چرتکه پیشرفته', province: 'مازندران', city: 'ساری', source: 'PHONE_CALL', status: 'CONSULTATION_DONE', priority: 'HIGH', branchId: branchSari.id, assignedToId: userStaff1.id } }),
  ]);

  // ─── 12. FollowUps ───
  console.log('📞 creating follow-ups...');
  const followUps = await Promise.all([
    prisma.followUp.create({ data: { leadId: leads[1].id, type: 'CALL', note: 'تماس اول - والدین علاقه‌مند هستند', scheduledAt: new Date('2025-03-01T10:00:00'), completed: true, completedAt: new Date('2025-03-01T10:15:00') } }),
    prisma.followUp.create({ data: { leadId: leads[1].id, type: 'WHATSAPP', note: 'ارسال بروشور دوره‌ها', scheduledAt: new Date('2025-03-03T14:00:00'), completed: true, completedAt: new Date('2025-03-03T14:05:00') } }),
    prisma.followUp.create({ data: { leadId: leads[2].id, type: 'CALL', note: 'برنامه‌ریزی مشاوره', scheduledAt: new Date('2025-03-05T11:00:00'), completed: true, completedAt: new Date('2025-03-05T11:20:00') } }),
    prisma.followUp.create({ data: { leadId: leads[3].id, type: 'MEETING', note: 'مشاوره حضوری انجام شد', scheduledAt: new Date('2025-03-02T16:00:00'), completed: true, completedAt: new Date('2025-03-02T17:00:00') } }),
    prisma.followUp.create({ data: { leadId: leads[4].id, type: 'SMS', note: 'یادآوری کلاس آزمایشی', scheduledAt: new Date('2025-03-08T09:00:00'), completed: false } }),
    prisma.followUp.create({ data: { leadId: leads[5].id, type: 'CALL', note: 'بازخورد کلاس آزمایشی', scheduledAt: new Date('2025-03-06T15:00:00'), completed: true, completedAt: new Date('2025-03-06T15:10:00') } }),
    prisma.followUp.create({ data: { leadId: leads[6].id, type: 'CALL', note: 'پیگیری پیشنهاد ثبت‌نام', scheduledAt: new Date('2025-03-10T10:00:00'), completed: false } }),
    prisma.followUp.create({ data: { leadId: leads[11].id, type: 'WHATSAPP', note: 'ارسال اطلاعات دوره‌ها', scheduledAt: new Date('2025-03-07T13:00:00'), completed: true, completedAt: new Date('2025-03-07T13:10:00') } }),
    prisma.followUp.create({ data: { leadId: leads[15].id, type: 'CALL', note: 'تماس اول', scheduledAt: new Date('2025-03-09T11:00:00'), completed: false } }),
    prisma.followUp.create({ data: { leadId: leads[18].id, type: 'WHATSAPP', note: 'ارسال کاتالوگ', scheduledAt: new Date('2025-03-08T16:00:00'), completed: false } }),
  ]);

  // ─── 13. LeadNotes ───
  console.log('🗒️ creating lead notes...');
  const leadNotes = await Promise.all([
    prisma.leadNote.create({ data: { leadId: leads[0].id, content: 'از طریق فرم سایت ثبت‌نام کرده، تماس اول فردا انجام شود', type: 'general', createdBy: userStaff1.id } }),
    prisma.leadNote.create({ data: { leadId: leads[1].id, content: 'والدین به دوره حساب ذهنی علاقه‌مند هستند، قیمت مناسب نیست', type: 'important', createdBy: userStaff2.id } }),
    prisma.leadNote.create({ data: { leadId: leads[3].id, content: 'مشاوره انجام شد - پیشنهاد دوره مسابقات', type: 'consultation', createdBy: userStaff3.id } }),
    prisma.leadNote.create({ data: { leadId: leads[7].id, content: 'ثبت‌نام نهایی انجام شد - دوره چرتکه مقدماتی', type: 'enrollment', createdBy: userStaff4.id } }),
    prisma.leadNote.create({ data: { leadId: leads[8].id, content: 'بعد از ۳ تماس بدون پاسخ، لید از دست رفته', type: 'lost', createdBy: userStaff2.id } }),
    prisma.leadNote.create({ data: { leadId: leads[13].id, content: 'قیمت برای خانواده بالا بوده، تخفیف پیشنهاد شد اما رد کردند', type: 'general', createdBy: userStaff1.id } }),
    prisma.leadNote.create({ data: { leadId: leads[19].id, content: 'مشاوره تلفنی انجام شد، مشتاق شروع دوره', type: 'consultation', createdBy: userStaff1.id } }),
  ]);

  // ─── 14. Consultations ───
  console.log('💼 creating consultations...');
  const consultations = await Promise.all([
    prisma.consultation.create({ data: { leadId: leads[2].id, consultantId: userStaff1.id, scheduledAt: new Date('2025-03-06T16:00:00'), completedAt: new Date('2025-03-06T16:45:00'), result: 'مشاوره موفق - توصیه دوره چرتکه مقدماتی', recommendedCourse: 'چرتکه مقدماتی', notes: 'کودک ۸ ساله، علاقه‌مند به چرتکه' } }),
    prisma.consultation.create({ data: { leadId: leads[3].id, consultantId: userStaff3.id, scheduledAt: new Date('2025-03-04T15:00:00'), completedAt: new Date('2025-03-04T15:50:00'), result: 'توصیه دوره آمادگی مسابقات', recommendedCourse: 'آمادگی مسابقات', notes: 'سابقه شرکت در مسابقات محلی' } }),
    prisma.consultation.create({ data: { leadId: leads[5].id, consultantId: userStaff2.id, scheduledAt: new Date('2025-03-07T14:00:00'), completedAt: new Date('2025-03-07T14:40:00'), result: 'پیشنهاد ثبت‌نام در حساب ذهنی متوسط', recommendedCourse: 'حساب ذهنی متوسط', notes: 'سطح متوسط - نیاز به تقویت سرعت' } }),
    prisma.consultation.create({ data: { leadId: leads[19].id, consultantId: userStaff1.id, scheduledAt: new Date('2025-03-10T11:00:00'), completedAt: new Date('2025-03-10T11:30:00'), result: 'توصیه دوره چرتکه پیشرفته', recommendedCourse: 'چرتکه پیشرفته', notes: 'سابقه یادگیری چرتکه مقدماتی' } }),
  ]);

  // ─── 15. Revenues ───
  console.log('💰 creating revenues...');
  const revenues = await Promise.all([
    prisma.revenue.create({ data: { amount: 3500000, category: 'TUITION', description: 'شهریه آرمین رضایی - چرتکه مقدماتی', branchId: branchSari.id, receivedAt: new Date('2025-01-15') } }),
    prisma.revenue.create({ data: { amount: 4500000, category: 'TUITION', description: 'شهریه سینا کریمی - حساب ذهنی متوسط', branchId: branchTehran.id, receivedAt: new Date('2025-02-01') } }),
    prisma.revenue.create({ data: { amount: 5500000, category: 'TUITION', description: 'شهریه کیان احمدی - چرتکه پیشرفته', branchId: branchMashhad.id, receivedAt: new Date('2025-01-05') } }),
    prisma.revenue.create({ data: { amount: 7000000, category: 'TUITION', description: 'شهریه هانیه صادقی - آمادگی مسابقات', branchId: branchTehran.id, receivedAt: new Date('2025-03-01') } }),
    prisma.revenue.create({ data: { amount: 3000000, category: 'TUITION', description: 'شهریه مهدیا طاهری - ریاضی خلاق', branchId: branchSari.id, receivedAt: new Date('2025-02-15') } }),
    prisma.revenue.create({ data: { amount: 500000, category: 'EXAM_FEE', description: 'هزینه آزمون سطح‌سنجی - ۳ نفر', branchId: branchSari.id, receivedAt: new Date('2025-02-20') } }),
    prisma.revenue.create({ data: { amount: 800000, category: 'CERTIFICATE_FEE', description: 'هزینه صدور گواهینامه - ۴ نفر', branchId: branchTehran.id, receivedAt: new Date('2025-03-05') } }),
    prisma.revenue.create({ data: { amount: 1200000, category: 'MATERIAL_SALE', description: 'فروش چرتکه و لوازم آموزشی', branchId: branchMashhad.id, receivedAt: new Date('2025-02-28') } }),
    prisma.revenue.create({ data: { amount: 4500000, category: 'TUITION', description: 'شهریه عرفان جعفری - آمادگی مسابقات', branchId: branchTehran.id, receivedAt: new Date('2025-03-02') } }),
    prisma.revenue.create({ data: { amount: 3500000, category: 'TUITION', description: 'شهریه فاطمه رحیمی - چرتکه پیشرفته', branchId: branchMashhad.id, receivedAt: new Date('2025-01-12') } }),
  ]);

  // ─── 16. Expenses ───
  console.log('💸 creating expenses...');
  const expenses = await Promise.all([
    prisma.expense.create({ data: { amount: 25000000, category: 'RENT', description: 'اجاره شعبه ساری - اسفند ۱۴۰۳', branchId: branchSari.id, payee: 'شرکت مسکن ساری', paidAt: new Date('2025-03-01') } }),
    prisma.expense.create({ data: { amount: 45000000, category: 'RENT', description: 'اجاره شعبه تهران - اسفند ۱۴۰۳', branchId: branchTehran.id, payee: 'املاک ولیعصر', paidAt: new Date('2025-03-01') } }),
    prisma.expense.create({ data: { amount: 30000000, category: 'RENT', description: 'اجاره شعبه مشهد - اسفند ۱۴۰۳', branchId: branchMashhad.id, payee: 'املاک وکیل‌آباد', paidAt: new Date('2025-03-01') } }),
    prisma.expense.create({ data: { amount: 35000000, category: 'SALARY', description: 'حقوق اساتید - اسفند ۱۴۰۳', branchId: branchSari.id, payee: 'اساتید شعبه ساری', paidAt: new Date('2025-03-05') } }),
    prisma.expense.create({ data: { amount: 5000000, category: 'UTILITIES', description: 'قبض برق و گاز - اسفند ۱۴۰۳', branchId: branchSari.id, paidAt: new Date('2025-03-03') } }),
    prisma.expense.create({ data: { amount: 8000000, category: 'MARKETING', description: 'تبلیغات اینستاگرامی - اسفند ۱۴۰۳', branchId: branchTehran.id, paidAt: new Date('2025-03-02') } }),
    prisma.expense.create({ data: { amount: 12000000, category: 'EQUIPMENT', description: 'خرید ۲۰ عدد چرتکه آموزشی', branchId: branchMashhad.id, payee: 'فروشگاه چرتکه ایرانیان', paidAt: new Date('2025-02-20') } }),
    prisma.expense.create({ data: { amount: 3000000, category: 'MATERIALS', description: 'خرید لوازم‌التحریر و کاربرگ آموزشی', branchId: branchSari.id, payee: 'چاپخانه نور', paidAt: new Date('2025-02-25') } }),
  ]);

  // ─── 17. Tuitions ───
  console.log('💳 creating tuitions...');
  const tuitions = await Promise.all([
    prisma.tuition.create({ data: { studentId: students[0].id, courseId: course1.id, totalAmount: 3500000, paidAmount: 3500000, discount: 0, paymentType: 'CASH', installments: 1, status: 'PAID', dueDate: new Date('2025-01-20') } }),
    prisma.tuition.create({ data: { studentId: students[1].id, courseId: course2.id, totalAmount: 4500000, paidAmount: 2250000, discount: 500000, paymentType: 'INSTALLMENT', installments: 2, status: 'PARTIAL', dueDate: new Date('2025-04-01') } }),
    prisma.tuition.create({ data: { studentId: students[3].id, courseId: course3.id, totalAmount: 5500000, paidAmount: 5500000, discount: 0, paymentType: 'TRANSFER', installments: 1, status: 'PAID', dueDate: new Date('2025-01-10') } }),
    prisma.tuition.create({ data: { studentId: students[4].id, courseId: course4.id, totalAmount: 7000000, paidAmount: 3500000, discount: 1000000, paymentType: 'INSTALLMENT', installments: 3, status: 'PARTIAL', dueDate: new Date('2025-04-01') } }),
    prisma.tuition.create({ data: { studentId: students[5].id, courseId: course5.id, totalAmount: 3000000, paidAmount: 3000000, discount: 0, paymentType: 'ONLINE', installments: 1, status: 'PAID', dueDate: new Date('2025-02-20') } }),
    prisma.tuition.create({ data: { studentId: students[7].id, courseId: course4.id, totalAmount: 7000000, paidAmount: 0, discount: 0, paymentType: 'CASH', installments: 1, status: 'PENDING', dueDate: new Date('2025-03-15') } }),
    prisma.tuition.create({ data: { studentId: students[9].id, courseId: course2.id, totalAmount: 4500000, paidAmount: 4500000, discount: 500000, paymentType: 'CASH', installments: 1, status: 'PAID', dueDate: new Date('2025-02-05') } }),
    prisma.tuition.create({ data: { studentId: students[11].id, courseId: course4.id, totalAmount: 7000000, paidAmount: 2333000, discount: 0, paymentType: 'INSTALLMENT', installments: 3, status: 'PARTIAL', dueDate: new Date('2025-06-01') } }),
    prisma.tuition.create({ data: { studentId: students[14].id, courseId: course3.id, totalAmount: 5500000, paidAmount: 0, discount: 0, paymentType: 'INSTALLMENT', installments: 2, status: 'OVERDUE', dueDate: new Date('2025-02-01') } }),
    prisma.tuition.create({ data: { studentId: students[6].id, courseId: course3.id, totalAmount: 5500000, paidAmount: 2750000, discount: 0, paymentType: 'INSTALLMENT', installments: 2, status: 'PARTIAL', dueDate: new Date('2025-04-01') } }),
  ]);

  // ─── 18. Payments ───
  console.log('🏦 creating payments...');
  const payments = await Promise.all([
    prisma.payment.create({ data: { tuitionId: tuitions[0].id, amount: 3500000, method: 'CASH', reference: 'REC-001', paidAt: new Date('2025-01-15') } }),
    prisma.payment.create({ data: { tuitionId: tuitions[1].id, amount: 2250000, method: 'CARD', reference: 'REC-002', paidAt: new Date('2025-02-01') } }),
    prisma.payment.create({ data: { tuitionId: tuitions[2].id, amount: 5500000, method: 'TRANSFER', reference: 'REC-003', paidAt: new Date('2025-01-05') } }),
    prisma.payment.create({ data: { tuitionId: tuitions[3].id, amount: 3500000, method: 'ONLINE', reference: 'REC-004', paidAt: new Date('2025-03-01') } }),
    prisma.payment.create({ data: { tuitionId: tuitions[4].id, amount: 3000000, method: 'ONLINE', reference: 'REC-005', paidAt: new Date('2025-02-15') } }),
    prisma.payment.create({ data: { tuitionId: tuitions[6].id, amount: 4500000, method: 'CASH', reference: 'REC-006', paidAt: new Date('2025-02-05') } }),
    prisma.payment.create({ data: { tuitionId: tuitions[7].id, amount: 2333000, method: 'CARD', reference: 'REC-007', paidAt: new Date('2025-03-01') } }),
    prisma.payment.create({ data: { tuitionId: tuitions[9].id, amount: 2750000, method: 'TRANSFER', reference: 'REC-008', paidAt: new Date('2025-01-12') } }),
  ]);

  // ─── 19. Exams ───
  console.log('📝 creating exams...');
  const exams = await Promise.all([
    prisma.exam.create({ data: { title: 'آزمون سطح‌سنجی چرتکه', description: 'آزمون تعیین سطح برای ثبت‌نام جدید', type: 'PLACEMENT', level: 'BEGINNER', courseId: course1.id, duration: 20, totalScore: 100, passingScore: 50, status: 'PUBLISHED', questions: '[]', availableFrom: new Date('2025-03-01'), availableTo: new Date('2025-06-01'), creatorId: instructor1.id } }),
    prisma.exam.create({ data: { title: 'آزمون میان‌دوره حساب ذهنی', description: 'آزمون میان‌دوره سطح متوسط', type: 'MIDTERM', level: 'INTERMEDIATE', courseId: course2.id, duration: 30, totalScore: 100, passingScore: 60, status: 'ACTIVE', questions: '[]', availableFrom: new Date('2025-03-15'), availableTo: new Date('2025-03-22'), creatorId: instructor2.id } }),
    prisma.exam.create({ data: { title: 'آزمون نهایی چرتکه پیشرفته', description: 'آزمون پایان دوره پیشرفته', type: 'FINAL', level: 'ADVANCED', courseId: course3.id, duration: 45, totalScore: 100, passingScore: 70, status: 'PUBLISHED', questions: '[]', availableFrom: new Date('2025-05-01'), availableTo: new Date('2025-05-15'), creatorId: instructor3.id } }),
    prisma.exam.create({ data: { title: 'آزمون آزمایشی مسابقات', description: 'شبیه‌سازی آزمون مسابقات کشوری', type: 'COMPETITION', level: 'COMPETITION', courseId: course4.id, duration: 60, totalScore: 150, passingScore: 100, status: 'PUBLISHED', questions: '[]', availableFrom: new Date('2025-04-01'), availableTo: new Date('2025-05-30'), creatorId: instructor2.id } }),
  ]);

  // ─── 20. QuestionBank ───
  console.log('❓ creating question bank...');
  const questions = await Promise.all([
    // EASY - MULTIPLE_CHOICE
    prisma.questionBank.create({ data: { question: 'عدد نمایش داده شده روی میله یکان چرتکه وقتی ۳ مهره بالا باشد چقدر است؟', type: 'MULTIPLE_CHOICE', options: '["۱","۲","۳","۴"]', correctAnswer: '3', points: 5, difficulty: 'EASY', category: 'چرتکه', subject: 'مبتدی', explanation: 'وقتی ۳ مهره پایینی روی میله یکان بالا باشند، عدد ۳ نمایش داده می‌شود.' } }),
    prisma.questionBank.create({ data: { question: 'حاصل ۵ + ۳ چقدر است؟', type: 'MULTIPLE_CHOICE', options: '["۶","۷","۸","۹"]', correctAnswer: '8', points: 5, difficulty: 'EASY', category: 'حساب ذهنی', subject: 'جمع', explanation: '۵ بعلاوه ۳ برابر ۸ است.' } }),
    prisma.questionBank.create({ data: { question: 'کدام عدد روی چرتکه با ۱ مهره پایینی و ۱ مهره بالایی روی میله یکان نشان داده می‌شود؟', type: 'MULTIPLE_CHOICE', options: '["۵","۶","۷","۸"]', correctAnswer: '6', points: 5, difficulty: 'EASY', category: 'چرتکه', subject: 'مبتدی', explanation: 'مهره بالایی ارزش ۵ و مهره پایینی ارزش ۱ دارد. ۵ + ۱ = ۶' } }),
    prisma.questionBank.create({ data: { question: 'حاصل ۹ - ۴ چقدر است؟', type: 'MULTIPLE_CHOICE', options: '["۳","۴","۵","۶"]', correctAnswer: '5', points: 5, difficulty: 'EASY', category: 'حساب ذهنی', subject: 'تفریق', explanation: '۹ منهای ۴ برابر ۵ است.' } }),
    prisma.questionBank.create({ data: { question: 'چند مهره پایینی روی میله یکان باید بالا باشند تا عدد ۷ نمایش داده شود؟', type: 'MULTIPLE_CHOICE', options: '["۵","۲","۷","۱"]', correctAnswer: '2', points: 5, difficulty: 'EASY', category: 'چرتکه', subject: 'مبتدی', explanation: 'عدد ۷ = ۵ (مهره بالایی) + ۲ (مهره پایینی). پس ۲ مهره پایینی باید بالا باشند.' } }),
    prisma.questionBank.create({ data: { question: 'حاصل ۴ + ۲ چقدر است؟', type: 'MENTAL_CALCULATION', points: 5, difficulty: 'EASY', category: 'حساب ذهنی', subject: 'جمع', explanation: '۴ بعلاوه ۲ برابر ۶ است.' } }),

    // EASY - TRUE_FALSE
    prisma.questionBank.create({ data: { question: 'مهره بالایی میله یکان ارزش آن ۵ است.', type: 'TRUE_FALSE', options: '["صحیح","غلط"]', correctAnswer: 'صحیح', points: 5, difficulty: 'EASY', category: 'چرتکه', subject: 'مبتدی', explanation: 'مهره بالایی هر میله ارزش ۵ برابر مهره پایینی آن میله دارد.' } }),
    prisma.questionBank.create({ data: { question: 'حاصل ۱۰ - ۳ برابر ۶ است.', type: 'TRUE_FALSE', options: '["صحیح","غلط"]', correctAnswer: 'غلط', points: 5, difficulty: 'EASY', category: 'حساب ذهنی', subject: 'تفریق', explanation: 'حاصل ۱۰ - ۳ = ۷ است نه ۶.' } }),
    prisma.questionBank.create({ data: { question: 'چرتکه استاندارد معمولاً ۱۳ میله دارد.', type: 'TRUE_FALSE', options: '["صحیح","غلط"]', correctAnswer: 'صحیح', points: 5, difficulty: 'EASY', category: 'چرتکه', subject: 'مبتدی', explanation: 'چرتکه استاندارد ژاپنی (سوروبان) معمولاً ۱۳ میله دارد.' } }),

    // EASY - FILL_BLANK
    prisma.questionBank.create({ data: { question: 'حاصل ۸ + ___ = ۱۲ را پیدا کنید.', type: 'FILL_BLANK', correctAnswer: '4', points: 5, difficulty: 'EASY', category: 'حساب ذهنی', subject: 'جمع', explanation: '۱۲ - ۸ = ۴، پس ۸ + ۴ = ۱۲' } }),
    prisma.questionBank.create({ data: { question: 'عدد ___ روی میله دهگان با ۱ مهره پایینی بالا نشان داده می‌شود.', type: 'FILL_BLANK', correctAnswer: '10', points: 5, difficulty: 'EASY', category: 'چرتکه', subject: 'مبتدی', explanation: '۱ مهره پایینی روی میله دهگان = ۱۰' } }),

    // MEDIUM - MULTIPLE_CHOICE
    prisma.questionBank.create({ data: { question: 'حاصل ۲۵ + ۳۸ به صورت ذهنی چقدر است؟', type: 'MULTIPLE_CHOICE', options: '["۵۳","۶۳","۶۲","۷۳"]', correctAnswer: '63', points: 10, difficulty: 'MEDIUM', category: 'حساب ذهنی', subject: 'جمع', explanation: '۲۵ + ۳۸ = ۶۳. ابتدا ۲۰ + ۳۰ = ۵۰، سپس ۵ + ۸ = ۱۳، مجموع ۶۳.' } }),
    prisma.questionBank.create({ data: { question: 'حاصل ۴۷ - ۲۹ چقدر است؟', type: 'MULTIPLE_CHOICE', options: '["۱۸","۲۲","۱۹","۲۸"]', correctAnswer: '18', points: 10, difficulty: 'MEDIUM', category: 'حساب ذهنی', subject: 'تفریق', explanation: '۴۷ - ۲۹ = ۱۸. ابتدا ۴۷ - ۳۰ = ۱۷، سپس ۱۷ + ۱ = ۱۸.' } }),
    prisma.questionBank.create({ data: { question: 'عدد ۴۵ روی چرتکه چگونه نمایش داده می‌شود؟', type: 'MULTIPLE_CHOICE', options: '["۴ مهره دهگان بالا، ۱ مهره یکان بالایی", "۴ مهره دهگان پایینی بالا، ۱ مهره بالایی یکان", "۴ مهره یکان، ۵ مهره دهگان", "۵ مهره دهگان بالا"]', correctAnswer: '4 مهره دهگان پایینی بالا، ۱ مهره بالایی یکان', points: 10, difficulty: 'MEDIUM', category: 'چرتکه', subject: 'متوسط', explanation: '۴ دهگان = ۴۰ (۴ مهره پایینی دهگان بالا) و ۵ یکان = مهره بالایی یکان.' } }),
    prisma.questionBank.create({ data: { question: 'حاصل ۶ × ۷ چقدر است؟', type: 'MULTIPLE_CHOICE', options: '["۳۶","۴۲","۴۸","۵۶"]', correctAnswer: '42', points: 10, difficulty: 'MEDIUM', category: 'حساب ذهنی', subject: 'ضرب', explanation: '۶ × ۷ = ۴۲' } }),
    prisma.questionBank.create({ data: { question: 'کدام عدد در الگوی ۲، ۵، ۸، ۱۱، ___ قرار دارد؟', type: 'NUMBER_SEQUENCE', points: 10, difficulty: 'MEDIUM', category: 'حساب ذهنی', subject: 'الگو', explanation: 'الگوی جمع ۳: ۲+۳=۵، ۵+۳=۸، ۸+۳=۱۱، ۱۱+۳=۱۴' } }),

    // MEDIUM - TRUE_FALSE
    prisma.questionBank.create({ data: { question: 'حاصل ۱۵ × ۴ برابر ۶۰ است.', type: 'TRUE_FALSE', options: '["صحیح","غلط"]', correctAnswer: 'صحیح', points: 10, difficulty: 'MEDIUM', category: 'حساب ذهنی', subject: 'ضرب', explanation: '۱۵ × ۴ = ۶۰. (۱۵ × ۲ = ۳۰، ۳۰ × ۲ = ۶۰)' } }),
    prisma.questionBank.create({ data: { question: 'عدد ۹۰ روی چرتکه با ۹ مهره دهگان پایینی بالا نشان داده می‌شود.', type: 'TRUE_FALSE', options: '["صحیح","غلط"]', correctAnswer: 'غلط', points: 10, difficulty: 'MEDIUM', category: 'چرتکه', subject: 'متوسط', explanation: 'هر میله حداکثر ۴ مهره پایینی دارد. عدد ۹۰ با مهره بالایی دهگان (۵۰) + ۴ مهره پایینی دهگان (۴۰) نمایش داده می‌شود.' } }),

    // MEDIUM - FILL_BLANK
    prisma.questionBank.create({ data: { question: 'حاصل ۳۶ ÷ ___ = ۶ را پیدا کنید.', type: 'FILL_BLANK', correctAnswer: '6', points: 10, difficulty: 'MEDIUM', category: 'حساب ذهنی', subject: 'تقسیم', explanation: '۳۶ ÷ ۶ = ۶' } }),
    prisma.questionBank.create({ data: { question: 'حاصل ذهنی ۱۳ + ۲۸ + ۱۹ را بنویسید.', type: 'MENTAL_CALCULATION', correctAnswer: '60', points: 10, difficulty: 'MEDIUM', category: 'حساب ذهنی', subject: 'جمل', explanation: '۱۳ + ۲۸ = ۴۱، ۴۱ + ۱۹ = ۶۰' } }),

    // MEDIUM - ABACUS_READING
    prisma.questionBank.create({ data: { question: 'اگر روی میله دهگان ۳ مهره پایینی بالا و مهره بالایی پایین باشد و روی میله یکان ۲ مهره پایینی بالا باشد، چه عددی نمایش داده شده؟', type: 'ABACUS_READING', correctAnswer: '32', points: 10, difficulty: 'MEDIUM', category: 'چرتکه', subject: 'خواندن چرتکه', explanation: 'میله دهگان: مهره بالایی پایین (۰) + ۳ مهره پایینی بالا = ۳۰. میله یکان: ۲ مهره پایینی بالا = ۲. عدد = ۳۲' } }),
    prisma.questionBank.create({ data: { question: 'عدد نمایش داده شده: میله صدگان = ۱ مهره پایینی بالا، میله دهگان = مهره بالایی بالا + ۱ مهره پایینی بالا، میله یکان = ۳ مهره پایینی بالا. عدد چیست؟', type: 'ABACUS_READING', correctAnswer: '163', points: 10, difficulty: 'MEDIUM', category: 'چرتکه', subject: 'خواندن چرتکه', explanation: 'صدگان = ۱۰۰، دهگان = ۵۰+۱۰ = ۶۰، یکان = ۳. عدد = ۱۶۳' } }),

    // HARD - MULTIPLE_CHOICE
    prisma.questionBank.create({ data: { question: 'حاصل ۱۲۳ + ۴۵۶ + ۷۸۹ به صورت ذهنی چقدر است؟', type: 'MULTIPLE_CHOICE', options: '["۱۳۵۸","۱۳۶۸","۱۴۶۸","۱۲۶۸"]', correctAnswer: '1368', points: 15, difficulty: 'HARD', category: 'حساب ذهنی', subject: 'جمع پیشرفته', explanation: '۱۲۳ + ۴۵۶ = ۵۷۹، ۵۷۹ + ۷۸۹ = ۱۳۶۸' } }),
    prisma.questionBank.create({ data: { question: 'حاصل ۲۵ × ۱۳ چقدر است؟', type: 'MULTIPLE_CHOICE', options: '["۳۱۵","۳۲۵","۳۳۵","۳۴۵"]', correctAnswer: '325', points: 15, difficulty: 'HARD', category: 'حساب ذهنی', subject: 'ضرب پیشرفته', explanation: '۲۵ × ۱۳ = ۲۵ × ۱۰ + ۲۵ × ۳ = ۲۵۰ + ۷۵ = ۳۲۵' } }),
    prisma.questionBank.create({ data: { question: 'حاصل ۱۴۴ ÷ ۱۲ چقدر است؟', type: 'MULTIPLE_CHOICE', options: '["۱۰","۱۱","۱۲","۱۳"]', correctAnswer: '12', points: 15, difficulty: 'HARD', category: 'حساب ذهنی', subject: 'تقسیم پیشرفته', explanation: '۱۴۴ ÷ ۱۲ = ۱۲' } }),

    // HARD - MENTAL_CALCULATION
    prisma.questionBank.create({ data: { question: 'حاصل ذهنی ۴۷ × ۳ را بنویسید.', type: 'MENTAL_CALCULATION', correctAnswer: '141', points: 15, difficulty: 'HARD', category: 'حساب ذهنی', subject: 'ضرب ذهنی', explanation: '۴۷ × ۳ = (۴۰ × ۳) + (۷ × ۳) = ۱۲۰ + ۲۱ = ۱۴۱' } }),
    prisma.questionBank.create({ data: { question: 'حاصل ذهنی ۹۹ + ۹۸ + ۹۷ را بنویسید.', type: 'MENTAL_CALCULATION', correctAnswer: '294', points: 15, difficulty: 'HARD', category: 'حساب ذهنی', subject: 'جمع پیشرفته', explanation: '۹۹ + ۹۸ + ۹۷ = (۱۰۰-۱) + (۱۰۰-۲) + (۱۰۰-۳) = ۳۰۰ - ۶ = ۲۹۴' } }),

    // HARD - ABACUS_READING
    prisma.questionBank.create({ data: { question: 'عدد نمایش داده شده: هزارگان = ۲ مهره پایینی بالا، صدگان = مهره بالایی بالا + ۳ مهره پایینی بالا، دهگان = مهره بالایی بالا، یکان = ۴ مهره پایینی بالا. عدد چیست؟', type: 'ABACUS_READING', correctAnswer: '2854', points: 15, difficulty: 'HARD', category: 'چرتکه', subject: 'خواندن چرتکه پیشرفته', explanation: 'هزارگان = ۲۰۰۰، صدگان = ۵۰۰+۳۰۰ = ۸۰۰، دهگان = ۵۰، یکان = ۴. عدد = ۲۸۵۴' } }),

    // HARD - NUMBER_SEQUENCE
    prisma.questionBank.create({ data: { question: 'عدد بعدی الگوی ۱، ۴، ۹، ۱۶، ۲۵، ___ چیست؟', type: 'NUMBER_SEQUENCE', correctAnswer: '36', points: 15, difficulty: 'HARD', category: 'حساب ذهنی', subject: 'الگوی پیشرفته', explanation: 'مربع‌های کامل: ۱²، ۲²، ۳²، ۴²، ۵²، ۶² = ۳۶' } }),

    // EXPERT - MULTIPLE_CHOICE
    prisma.questionBank.create({ data: { question: 'حاصل ۳۴۷ × ۲۹ چقدر است؟', type: 'MULTIPLE_CHOICE', options: '["۹۸۶۳","۱۰۰۶۳","۱۰۲۶۳","۹۶۶۳"]', correctAnswer: '10063', points: 20, difficulty: 'EXPERT', category: 'حساب ذهنی', subject: 'ضرب مسابقاتی', explanation: '۳۴۷ × ۲۹ = ۳۴۷ × ۳۰ - ۳۴۷ = ۱۰۴۱۰ - ۳۴۷ = ۱۰۰۶۳' } }),
    prisma.questionBank.create({ data: { question: 'حاصل ۲۴۵۶ - ۱۷۸۹ چقدر است؟', type: 'MULTIPLE_CHOICE', options: '["۵۶۷","۶۶۷","۶۷۷","۷۷۷"]', correctAnswer: '667', points: 20, difficulty: 'EXPERT', category: 'حساب ذهنی', subject: 'تفریق مسابقاتی', explanation: '۲۴۵۶ - ۱۷۸۹ = ۶۶۷' } }),

    // EXPERT - MENTAL_CALCULATION
    prisma.questionBank.create({ data: { question: 'حاصل ذهنی ۱۲۵ × ۸ را بنویسید.', type: 'MENTAL_CALCULATION', correctAnswer: '1000', points: 20, difficulty: 'EXPERT', category: 'حساب ذهنی', subject: 'ضرب مسابقاتی', explanation: '۱۲۵ × ۸ = ۱۰۰۰. یک ترفند مفید: ۱۲۵ × ۸ همیشه ۱۰۰۰ است.' } }),
    prisma.questionBank.create({ data: { question: 'حاصل ذهنی ۹۹۹ × ۹ را بنویسید.', type: 'MENTAL_CALCULATION', correctAnswer: '8991', points: 20, difficulty: 'EXPERT', category: 'حساب ذهنی', subject: 'ضرب مسابقاتی', explanation: '۹۹۹ × ۹ = (۱۰۰۰-۱) × ۹ = ۹۰۰۰ - ۹ = ۸۹۹۱' } }),

    // EXPERT - ABACUS_READING
    prisma.questionBank.create({ data: { question: 'عدد روی چرتکه: هزارگان = مهره بالایی بالا + ۳ مهره پایینی بالا، صدگان = مهره بالایی بالا + ۲ مهره پایینی بالا، دهگان = مهره بالایی بالا + ۴ مهره پایینی بالا، یکان = ۱ مهره پایینی بالا. عدد چیست؟', type: 'ABACUS_READING', correctAnswer: '8741', points: 20, difficulty: 'EXPERT', category: 'چرتکه', subject: 'خواندن چرتکه مسابقاتی', explanation: 'هزارگان = ۵۰۰۰+۳۰۰۰ = ۸۰۰۰، صدگان = ۵۰۰+۲۰۰ = ۷۰۰، دهگان = ۵۰+۴۰ = ۹۰... تصحیح: دهگان = ۵۰+۴۰ = ۹۰، یکان = ۱. عدد = ۸۷۹۱. اما ۴ مهره پایینی دهگان = ۴۰. پس ۸۰۰۰+۷۰۰+۹۰+۱ = ۸۷۹۱' } }),

    // EXPERT - NUMBER_SEQUENCE
    prisma.questionBank.create({ data: { question: 'عدد بعدی الگوی ۲، ۶، ۱۲، ۲۰، ۳۰، ___ چیست؟', type: 'NUMBER_SEQUENCE', correctAnswer: '42', points: 20, difficulty: 'EXPERT', category: 'حساب ذهنی', subject: 'الگوی مسابقاتی', explanation: 'تفاضل‌ها: ۴، ۶، ۸، ۱۰، ۱۲. عدد بعدی = ۳۰ + ۱۲ = ۴۲. الگو: n(n+1) برای n=1,2,3...' } }),
  ]);

  // ─── 21. ExamAttempts ───
  console.log('✏️ creating exam attempts...');
  const examAttempts = await Promise.all([
    prisma.examAttempt.create({ data: { examId: exams[0].id, studentId: students[0].id, userId: userInstructor1.id, answers: '["3","8","6","5","2"]', score: 85, maxScore: 100, percentage: 85.0, passed: true, startedAt: new Date('2025-03-02T10:00:00'), completedAt: new Date('2025-03-02T10:18:00'), duration: 1080, status: 'COMPLETED' } }),
    prisma.examAttempt.create({ data: { examId: exams[0].id, studentId: students[2].id, userId: userInstructor1.id, answers: '["3","7","6","5","2"]', score: 75, maxScore: 100, percentage: 75.0, passed: true, startedAt: new Date('2025-03-02T11:00:00'), completedAt: new Date('2025-03-02T11:16:00'), duration: 960, status: 'COMPLETED' } }),
    prisma.examAttempt.create({ data: { examId: exams[1].id, studentId: students[1].id, userId: userInstructor2.id, answers: '["63","18","42","صحیح","6"]', score: 90, maxScore: 100, percentage: 90.0, passed: true, startedAt: new Date('2025-03-16T14:00:00'), completedAt: new Date('2025-03-16T14:25:00'), duration: 1500, status: 'COMPLETED' } }),
    prisma.examAttempt.create({ data: { examId: exams[1].id, studentId: students[12].id, userId: userInstructor2.id, answers: '["63","22","48","صحیح","6"]', score: 60, maxScore: 100, percentage: 60.0, passed: true, startedAt: new Date('2025-03-16T15:00:00'), completedAt: new Date('2025-03-16T15:30:00'), duration: 1800, status: 'COMPLETED' } }),
    prisma.examAttempt.create({ data: { examId: exams[0].id, studentId: students[5].id, userId: userInstructor1.id, answers: '["3","8","7","5","2"]', score: 80, maxScore: 100, percentage: 80.0, passed: true, startedAt: new Date('2025-03-03T10:00:00'), completedAt: new Date('2025-03-03T10:19:00'), duration: 1140, status: 'COMPLETED' } }),
    prisma.examAttempt.create({ data: { examId: exams[0].id, studentId: students[8].id, userId: userInstructor4.id, answers: '["2","8","6","4","2"]', score: 55, maxScore: 100, percentage: 55.0, passed: true, startedAt: new Date('2025-03-03T11:00:00'), completedAt: new Date('2025-03-03T11:20:00'), duration: 1200, status: 'COMPLETED' } }),
    prisma.examAttempt.create({ data: { examId: exams[2].id, studentId: students[3].id, userId: userInstructor3.id, answers: '[]', score: 0, maxScore: 100, percentage: 0, passed: false, startedAt: new Date('2025-05-02T10:00:00'), duration: 0, status: 'IN_PROGRESS' } }),
    prisma.examAttempt.create({ data: { examId: exams[3].id, studentId: students[4].id, userId: userInstructor2.id, answers: '["10063","667","1000","8991","42"]', score: 80, maxScore: 150, percentage: 53.3, passed: false, startedAt: new Date('2025-04-05T09:00:00'), completedAt: new Date('2025-04-05T09:55:00'), duration: 3300, status: 'COMPLETED' } }),
    prisma.examAttempt.create({ data: { examId: exams[3].id, studentId: students[11].id, userId: userInstructor2.id, answers: '["10063","667","1000","8991","42"]', score: 120, maxScore: 150, percentage: 80.0, passed: true, startedAt: new Date('2025-04-05T11:00:00'), completedAt: new Date('2025-04-05T11:50:00'), duration: 3000, status: 'COMPLETED' } }),
    prisma.examAttempt.create({ data: { examId: exams[1].id, studentId: students[9].id, userId: userInstructor5.id, answers: '["53","18","42","صحیح","6"]', score: 40, maxScore: 100, percentage: 40.0, passed: false, startedAt: new Date('2025-03-17T10:00:00'), completedAt: new Date('2025-03-17T10:30:00'), duration: 1800, status: 'COMPLETED' } }),
  ]);

  // ─── 22. Certificates ───
  console.log('🏅 creating certificates...');
  const certificates = await Promise.all([
    prisma.certificate.create({ data: { studentId: students[4].id, courseId: course2.id, studentName: 'هانیه صادقی', courseName: 'حساب ذهنی متوسط', level: 'INTERMEDIATE', completedAt: new Date('2025-01-01'), issuedAt: new Date('2025-01-05'), certificateNumber: 'CERT-2025-001', verificationUrl: 'https://bahanrayaneh.ir/verify/CERT-2025-001' } }),
    prisma.certificate.create({ data: { studentId: students[14].id, courseId: course3.id, studentName: 'پارسا شریفی', courseName: 'چرتکه پیشرفته', level: 'ADVANCED', completedAt: new Date('2025-02-20'), issuedAt: new Date('2025-02-25'), certificateNumber: 'CERT-2025-002', verificationUrl: 'https://bahanrayaneh.ir/verify/CERT-2025-002' } }),
    prisma.certificate.create({ data: { studentId: students[3].id, courseId: course1.id, studentName: 'کیان احمدی', courseName: 'چرتکه مقدماتی', level: 'BEGINNER', completedAt: new Date('2025-03-01'), issuedAt: new Date('2025-03-05'), certificateNumber: 'CERT-2025-003', verificationUrl: 'https://bahanrayaneh.ir/verify/CERT-2025-003' } }),
  ]);

  // ─── 23. Referrals ───
  console.log('🤝 creating referrals...');
  const referrals = await Promise.all([
    prisma.referral.create({ data: { referrerCode: 'REF-ARM001', referrerId: students[0].id, referrerName: 'آرمین رضایی', referredId: students[5].id, referredName: 'مهدیا طاهری', referredPhone: '09306789012', status: 'ENROLLED', reward: '{"type":"discount","value":500000}', courseEnrolled: 'چرتکه مقدماتی', createdAt: new Date('2025-01-20'), convertedAt: new Date('2025-01-25'), rewardClaimedAt: new Date('2025-02-01') } }),
    prisma.referral.create({ data: { referrerCode: 'REF-SIN002', referrerId: students[1].id, referrerName: 'سینا کریمی', referredId: students[7].id, referredName: 'عرفان جعفری', referredPhone: '09328901234', status: 'ENROLLED', reward: '{"type":"discount","value":500000}', courseEnrolled: 'آمادگی مسابقات', createdAt: new Date('2025-02-05'), convertedAt: new Date('2025-02-10') } }),
    prisma.referral.create({ data: { referrerCode: 'REF-KIA004', referrerId: students[3].id, referrerName: 'کیان احمدی', referredName: 'آریا موسوی', referredPhone: '09373456700', status: 'TRIAL_DONE', reward: '{"type":"discount","value":300000}', createdAt: new Date('2025-02-15') } }),
    prisma.referral.create({ data: { referrerCode: 'REF-YAS003', referrerId: students[2].id, referrerName: 'یاسمن نوری', referredName: 'درسا حسینی', referredPhone: '09384567800', status: 'CONSULTATION', createdAt: new Date('2025-02-20') } }),
    prisma.referral.create({ data: { referrerCode: 'REF-HAN005', referrerId: students[4].id, referrerName: 'هانیه صادقی', referredId: students[11].id, referredName: 'زهرا یوسفی', referredPhone: '09362345600', status: 'ENROLLED', reward: '{"type":"free_session","value":2}', courseEnrolled: 'آمادگی مسابقات', createdAt: new Date('2025-02-25'), convertedAt: new Date('2025-03-01'), rewardClaimedAt: new Date('2025-03-10') } }),
  ]);

  // ─── 24. Campaigns ───
  console.log('📢 creating campaigns...');
  const campaigns = await Promise.all([
    prisma.campaign.create({ data: { title: 'کمپین ثبت‌نام بهاره ۱۴۰۴', type: 'sms', status: 'sent', targetGroup: 'leads', message: 'سلام! ثبت‌نام بهاره مرکز بهان رایانه آغاز شد. با تخفیف ویژه بهاره ثبت‌نام کنید. ۰۱۱-۳۳۱۲۳۴۵۶', scheduledAt: new Date('2025-03-01T09:00:00'), sentAt: new Date('2025-03-01T09:05:00'), totalSent: 150, totalOpened: 0, totalClicked: 0 } }),
    prisma.campaign.create({ data: { title: 'کمپین معرفی به دوست - اسفند ۱۴۰۳', type: 'whatsapp', status: 'active', targetGroup: 'students', message: 'دوست داری دوستت هم مثل تو چرتکه یاد بگیره؟ معرفی کن و تخفیف ویژه بگیر! 🎁', scheduledAt: new Date('2025-02-15T10:00:00'), sentAt: new Date('2025-02-15T10:10:00'), totalSent: 85, totalOpened: 0, totalClicked: 0 } }),
  ]);

  // ─── 25. Notifications ───
  console.log('🔔 creating notifications...');
  const notifications = await Promise.all([
    prisma.notification.create({ data: { userId: userSuperAdmin.id, title: 'ثبت‌نام جدید', message: 'یک ثبت‌نام جدید در شعبه ساری انجام شده است.', type: 'info', isRead: true, actionUrl: '/admin/students', createdAt: new Date('2025-03-01T10:30:00') } }),
    prisma.notification.create({ data: { userId: userBranchManager1.id, title: 'کلاس آزمایشی', message: 'کلاس آزمایشی فردا ساعت ۱۶:۰۰ برگزار می‌شود.', type: 'reminder', isRead: false, actionUrl: '/admin/classes', createdAt: new Date('2025-03-07T09:00:00') } }),
    prisma.notification.create({ data: { userId: userInstructor2.id, title: 'شهریه معوقه', message: '۳ دانش‌آموز شما شهریه معوقه دارند.', type: 'warning', isRead: false, actionUrl: '/admin/tuitions', createdAt: new Date('2025-03-05T14:00:00') } }),
    prisma.notification.create({ data: { userId: userStaff2.id, title: 'گزارش مالی ماهانه', message: 'گزارش مالی اسفند ۱۴۰۳ آماده بررسی است.', type: 'info', isRead: true, actionUrl: '/admin/finance', createdAt: new Date('2025-03-06T08:00:00') } }),
    prisma.notification.create({ data: { userId: userSuperAdmin.id, title: 'لید جدید', message: 'یک لید جدید از طریق فرم سایت ثبت شده است.', type: 'info', isRead: false, actionUrl: '/admin/leads', createdAt: new Date('2025-03-07T16:00:00') } }),
  ]);

  // ─── 26. Tickets + TicketMessages ───
  console.log('🎫 creating tickets...');
  const ticket1 = await prisma.ticket.create({
    data: {
      title: 'مشکل در دسترسی به حساب کاربری',
      category: 'technical',
      status: 'IN_PROGRESS',
      priority: 'high',
      creatorId: userStaff3.id,
      assignedToId: userAdmin1.id,
      createdAt: new Date('2025-03-03T11:00:00'),
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      title: 'درخواست تغییر برنامه کلاسی',
      category: 'academic',
      status: 'OPEN',
      priority: 'medium',
      creatorId: userInstructor4.id,
      createdAt: new Date('2025-03-05T14:00:00'),
    },
  });

  const ticket3 = await prisma.ticket.create({
    data: {
      title: 'سوال درباره شهریه و تخفیف',
      category: 'financial',
      status: 'RESOLVED',
      priority: 'low',
      creatorId: userStaff1.id,
      assignedToId: userStaff2.id,
      createdAt: new Date('2025-02-28T09:00:00'),
      closedAt: new Date('2025-03-04T16:00:00'),
    },
  });

  const ticketMessages = await Promise.all([
    prisma.ticketMessage.create({ data: { ticketId: ticket1.id, senderId: userStaff3.id, content: 'سلام، من نمی‌توانم به پنل مدیریت شعبه مشهد دسترسی پیدا کنم. خطای ۴۰۳ دریافت می‌کنم.', createdAt: new Date('2025-03-03T11:05:00') } }),
    prisma.ticketMessage.create({ data: { ticketId: ticket1.id, senderId: userAdmin1.id, content: 'سلام، بررسی می‌کنم. به نظر می‌رسد دسترسی‌ها تنظیم نشده. الان اصلاح می‌کنم.', createdAt: new Date('2025-03-03T14:00:00') } }),
    prisma.ticketMessage.create({ data: { ticketId: ticket1.id, senderId: userStaff3.id, content: 'ممنون، منتظر هستم.', createdAt: new Date('2025-03-03T14:30:00') } }),
    prisma.ticketMessage.create({ data: { ticketId: ticket2.id, senderId: userInstructor4.id, content: 'سلام، کلاس سه‌شنبه ساعت ۱۵ با برنامه شخصی من تداخل دارد. آیا امکان تغییر به ساعت ۱۶ وجود دارد؟', createdAt: new Date('2025-03-05T14:10:00') } }),
    prisma.ticketMessage.create({ data: { ticketId: ticket3.id, senderId: userStaff1.id, content: 'سلام، خانواده دانش‌آموز آرمین رضایی درخواست تخفیف بیشتر دارند. آیا امکان تخفیف ۲۰ درصدی وجود دارد؟', createdAt: new Date('2025-02-28T09:10:00') } }),
    prisma.ticketMessage.create({ data: { ticketId: ticket3.id, senderId: userStaff2.id, content: 'با توجه به سابقه خوب خانواده، تخفیف ۱۵ درصدی تایید شد. لطفاً اقدام کنید.', createdAt: new Date('2025-03-01T10:00:00') } }),
    prisma.ticketMessage.create({ data: { ticketId: ticket3.id, senderId: userStaff1.id, content: 'تخفیف اعمال شد. ممنون!', createdAt: new Date('2025-03-01T11:00:00') } }),
  ]);

  // ─── Summary ───
  console.log('\n📊 seed summary:');
  console.log('='.repeat(50));
  console.log(`⚙️  Settings: ${settings.length}`);
  console.log(`🏢 Branches: 3 (ساری، تهران، مشهد)`);
  console.log(`👤 Users: 15 (1 super_admin, 2 admins, 3 branch_managers, 5 instructors, 4 staff)`);
  console.log(`👩‍🏫 Instructors: 5`);
  console.log(`👔 Staff: 4`);
  console.log(`🎓 Students: ${students.length}`);
  console.log(`📚 Courses: 6`);
  console.log(`📋 Syllabus Items: ${syllabusItems.length}`);
  console.log(`🏫 Classes: ${classes.length}`);
  console.log(`📝 Enrollments: ${enrollments.length}`);
  console.log(`📊 Leads: ${leads.length}`);
  console.log(`📞 Follow-ups: ${followUps.length}`);
  console.log(`🗒️  Lead Notes: ${leadNotes.length}`);
  console.log(`💼 Consultations: ${consultations.length}`);
  console.log(`💰 Revenues: ${revenues.length}`);
  console.log(`💸 Expenses: ${expenses.length}`);
  console.log(`💳 Tuitions: ${tuitions.length}`);
  console.log(`🏦 Payments: ${payments.length}`);
  console.log(`📝 Exams: ${exams.length}`);
  console.log(`❓ Question Bank: ${questions.length}`);
  console.log(`✏️  Exam Attempts: ${examAttempts.length}`);
  console.log(`🏅 Certificates: ${certificates.length}`);
  console.log(`🤝 Referrals: ${referrals.length}`);
  console.log(`📢 Campaigns: ${campaigns.length}`);
  console.log(`🔔 Notifications: ${notifications.length}`);
  console.log(`🎫 Tickets: 3`);
  console.log(`💬 Ticket Messages: ${ticketMessages.length}`);
  console.log('='.repeat(50));
  console.log('✅ seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default main;
