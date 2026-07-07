const instructors = [
  {
    name: "استاد بهنام ویرا",
    role: "مدیر آموزشگاه و مدرس ارشد",
    bio: "بیش از ۱۵ سال سابقه تدریس چرتکه دهگانی و حساب ذهنی. موسس آموزشگاه ویرا و مربی تیم ملی مسابقات چرتکه ایران.",
    initials: "ب.و",
    color: "bg-primary",
  },
  {
    name: "استاد فرزانه رحیمی",
    role: "مدرس چرتکه و حساب ذهنی",
    bio: "کارشناسی ارشد آموزش ریاضی و دارای گواهینامه بین‌المللی تدریس چرتکه. تخصص ویژه در آموزش کودکان سنین ۵ تا ۱۰ سال.",
    initials: "ف.ر",
    color: "bg-accent",
  },
  {
    name: "استاد مهدی احمدی",
    role: "مدرس مسابقات و تمرینات فشرده",
    bio: "قهرمان سابق مسابقات کشوری چرتکه و مربی رسمی تیم مسابقات ویرا. تمرکز بر آماده‌سازی کارآموزان برای رقابت‌های ملی.",
    initials: "م.ا",
    color: "bg-emerald-600",
  },
];

export default function Instructors() {
  return (
    <section id="instructors" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">
            اساتید مجرب ویرا
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            تیم آموزشی ویرا از بهترین و باتجربه‌ترین مدرسان چرتکه دهگانی تشکیل شده
            که با تعهد و تخصص بالا، مسیر یادگیری فرزند شما را هموار می‌کنند.
          </p>
        </div>

        {/* Instructor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {instructors.map((instructor) => (
            <div
              key={instructor.name}
              className="group border border-border rounded-2xl p-6 bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
            >
              {/* Avatar */}
              <div
                className={`${instructor.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 text-white text-xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300`}
              >
                {instructor.initials}
              </div>

              {/* Name */}
              <h3 className="text-lg font-bold text-foreground mb-1">
                {instructor.name}
              </h3>

              {/* Role */}
              <p className="text-sm font-medium text-primary mb-4">
                {instructor.role}
              </p>

              {/* Bio */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {instructor.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}