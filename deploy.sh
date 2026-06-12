#!/bin/bash
# ============================================
# اسکریپت بیلد و دیپلوی سایت بهان رایانه
# ============================================

set -e

PROJECT_DIR="/home/z/my-project"
OUT_DIR="$PROJECT_DIR/out"
DEPLOY_DIR="$PROJECT_DIR/out-deploy"
# توکن از متغیر محیطی خوانده می‌شود - هرگز توکن را مستقیم ننویسید
REPO_URL="https://${GITHUB_TOKEN}@github.com/HAB64/bahanvira.git"
BASE_PATH="bahanvira"

echo "🚀 شروع فرآیند بیلد و دیپلوی..."

# مرحله ۱: بیلد
echo ""
echo "📦 مرحله ۱/۵: بیلد پروژه..."
cd "$PROJECT_DIR"
npm run build

# مرحله ۲: اصلاح مسیر تصاویر
echo ""
echo "🔧 مرحله ۲/۵: اصلاح مسیر تصاویر (اضافه کردن /$BASE_PATH/)..."
cd "$OUT_DIR"
find . -name "*.html" -exec sed -i "s|src=\"/$BASE_PATH/images/|src=\"/$BASE_PATH/images/|g" {} \; 2>/dev/null || true
find . -name "*.html" -exec sed -i "s|src=\"/images/|src=\"/$BASE_PATH/images/|g" {} \;
find . -name "*.html" -exec sed -i "s|src=\"/logo|src=\"/$BASE_PATH/logo|g" {} \;
find ./_next -name "*.js" -exec sed -i "s|\"/images/|\"/$BASE_PATH/images/|g" {} \;
find ./_next -name "*.js" -exec sed -i "s|\"/logo|\"/$BASE_PATH/logo|g" {} \;

# مرحله ۳: اضافه کردن .nojekyll
echo ""
echo "📁 مرحله ۳/۵: اضافه کردن .nojekyll..."
touch "$OUT_DIR/.nojekyll"

# مرحله ۴: آماده‌سازی دیپلوی
echo ""
echo "📋 مرحله ۴/۵: آماده‌سازی پوشه دیپلوی..."
rm -rf "$DEPLOY_DIR"
cp -r "$OUT_DIR" "$DEPLOY_DIR"
cd "$DEPLOY_DIR"
git init
git add -A

# مرحله ۵: دیپلوی
COMMIT_MSG="${1:-سایت به‌روزرسانی شد}"
echo ""
echo "🚀 مرحله ۵/۵: دیپلوی به GitHub Pages..."
git commit -m "$COMMIT_MSG"
git push -f "$REPO_URL" HEAD:gh-pages

echo ""
echo "✅ دیپلوی با موفقیت انجام شد!"
echo "🌐 آدرس سایت: https://hab64.github.io/$BASE_PATH/"
