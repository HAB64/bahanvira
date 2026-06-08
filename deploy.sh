#!/bin/bash
# دیپلوی سایت ویرا به GitHub Pages
# Deployment script for Vira Abacus website

set -e

echo "🔨 در حال بیلد..."
npm run build

echo "📦 در حال آماده‌سازی فایل‌های دیپلوی..."
# Create temp dir
rm -rf /tmp/vira-deploy
mkdir -p /tmp/vira-deploy
cp -r out/* /tmp/vira-deploy/
cp out/.nojekyll /tmp/vira-deploy/ 2>/dev/null || true

echo "🚀 در حال پوش به شاخه gh-pages..."
cd /tmp/vira-deploy
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy: $(date +%Y-%m-%d-%H:%M)"
git remote add origin https://github.com/HAB64/bahanvira.git
git push origin gh-pages --force

echo "✅ دیپلوی با موفقیت انجام شد!"
echo "🌐 آدرس سایت: https://hab64.github.io/bahanvira/"
