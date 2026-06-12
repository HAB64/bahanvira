#!/bin/bash
# ============================================
# اسکریپت بازگشت به نسخه قبلی سایت
# ============================================
# استفاده:
#   ./rollback.sh                  → بازگشت به آخرین نسخه پایدار برچسب‌خورده
#   ./rollback.sh v-stable-2026-06-12  → بازگشت به برچسب خاص
#   ./rollback.sh HEAD~1           → بازگشت به یک commit قبل
#   ./rollback.sh abc1234          → بازگشت به commit خاص

set -e

PROJECT_DIR="/home/z/my-project"
cd "$PROJECT_DIR"

# اگر برچسب مشخص نشده، آخرین نسخه پایدار را پیدا کن
TARGET="${1:-stable-latest}"

if [ "$TARGET" = "stable-latest" ]; then
  # آخرین تگ v-stable را پیدا کن
  TARGET=$(git tag -l "v-stable*" --sort=-version:refname | head -1)
  if [ -z "$TARGET" ]; then
    echo "❌ هیچ نسخه پایدار برچسب‌خورده‌ای پیدا نشد!"
    exit 1
  fi
fi

echo "⚠️  هشدار: این عمل تغییرات فعلی بازنشده را از بین می‌برد!"
echo "📌 هدف بازگشت: $TARGET"
echo ""
read -p "آیا مطمئن هستید؟ (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ عملیات لغو شد."
  exit 0
fi

# ذخیره تغییرات فعلی در یک شاخه موقت (در صورت نیاز)
BACKUP_BRANCH="backup-$(date +%Y%m%d-%H%M%S)"
echo "💾 ذخیره وضعیت فعلی در شاخه $BACKUP_BRANCH..."
git branch "$BACKUP_BRANCH" 2>/dev/null || true

# بازگشت به نسخه هدف
echo "🔄 بازگشت به $TARGET..."
git checkout "$TARGET" -- .
git checkout main 2>/dev/null || true

echo ""
echo "✅ بازگشت انجام شد!"
echo ""
echo "سپس برای بیلد و دیپلوی اجرا کنید:"
echo "  GITHUB_TOKEN=your_token ./deploy.sh"
echo ""
echo "💡 شاخه پشتیبان: $BACKUP_BRANCH"
