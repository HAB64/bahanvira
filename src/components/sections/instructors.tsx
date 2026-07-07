'use client';

const instructors = [
  {
    name: 'استاد فاطمه محمدی',
    role: 'مدیر آموزشگاه و سرمربی',
    exp: '۱۵ سال سابقه',
    bio: 'فارغ‌التحصیل کارشناسی ارشد ریاضی و دارای گواهینامه بین‌المللی مربی‌گری چرتکه',
    initials: 'ف.م',
    gradient: 'from-teal-400 to-cyan-500',
  },
  {
    name: 'استاد علی حسینی',
    role: 'مربی پیشرفته و مسابقات',
    exp: '۱۰ سال سابقه',
    bio: 'قهرمان مسابقات ملی چرتکه و مربی تیم ملی',
    initials: 'ا.ح',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'استاد مریم رضایی',
    role: 'مربی مبتدی و کودک',
    exp: '۸ سال سابقه',
    bio: 'متخصص آموزش چرتکه به کودکان سنین ۵ تا ۱۰ سال با روش‌های بازی‌محور',
    initials: 'م.ر',
    gradient: 'from-cyan-400 to-teal-500',
  },
];

export default function Instructors() {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-heading">مربیان مجرب ما</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            با بهترین مربیان چرتکه کشور، فرزندتان بهترین آموزش را دریافت می‌کند
          </p>
        </div>

        {/* Instructor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {instructors.map((instructor) => (
            <div
              key={instructor.name}
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1"
            >
              {/* Avatar */}
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${instructor.gradient} flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300`}
              >
                {instructor.initials}
              </div>

              {/* Name */}
              <h3 className="text-lg font-bold text-white mt-5 mb-1">
                {instructor.name}
              </h3>

              {/* Role Badge */}
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-teal-500/15 text-teal-400 mb-1">
                {instructor.role}
              </span>

              {/* Experience */}
              <span className="inline-block text-xs text-slate-500 mb-4">
                {instructor.exp}
              </span>

              {/* Bio */}
              <p className="text-sm leading-relaxed text-slate-400">
                {instructor.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}