'use client';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-orange-50/30 px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">خطایی رخ داد</h1>
        <p className="text-slate-500 mb-2 text-sm">{error.message || 'خطای پیش‌بینی نشده'}</p>
        {error.digest && <p className="text-xs text-slate-400 mb-6">کد خطا: {error.digest}</p>}
        <button
          onClick={reset}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all"
        >
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}