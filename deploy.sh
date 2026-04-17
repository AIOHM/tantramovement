#!/usr/bin/env bash

# Simple deployment script for ttc.tantramovement.com.local
# Deploys the built Vite app to /var/www/ttc.tantramovement.com/dist

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEV_DIR="${DEV_DIR:-$SCRIPT_DIR}"
PROD_DIR="${PROD_DIR:-/var/www/ttc.tantramovement.com}"
BACKUP_DIR="${BACKUP_DIR:-/root/backups/ttc.tantramovement.com}"
DIST_DIR="$DEV_DIR/dist"

echo "🚀 Deploying ttc.tantramovement.com.local"
echo "📁 Dev directory: $DEV_DIR"
echo "📦 Production directory: $PROD_DIR"

test -d "$DEV_DIR" || { echo "❌ Dev directory not found: $DEV_DIR"; exit 1; }

cd "$DEV_DIR"

if command -v npm >/dev/null 2>&1; then
  echo "📦 Installing dependencies..."
  if [[ -f package-lock.json ]]; then
    npm ci
  else
    npm install
  fi
else
  echo "❌ npm is not installed. Install Node.js and npm first."
  exit 1
fi

BUILD_ORIGIN="${VITE_AFFILIATE_ORIGIN:-https://tantramovement.com}"
echo "🌐 Building with VITE_AFFILIATE_ORIGIN=$BUILD_ORIGIN"
VITE_AFFILIATE_ORIGIN="$BUILD_ORIGIN" npm run build

if [[ ! -d "$DIST_DIR" ]]; then
  echo "❌ Build failed: $DIST_DIR not found"
  exit 1
fi

mkdir -p "$BACKUP_DIR"
if [[ -d "$PROD_DIR/dist" ]]; then
  TIMESTAMP="$(date -u +%Y%m%d_%H%M%S)"
  BACKUP_FILE="$BACKUP_DIR/ttc_backup_$TIMESTAMP.tar.gz"
  echo "💾 Backing up current production dist to $BACKUP_FILE"
  tar -czf "$BACKUP_FILE" -C "$PROD_DIR" dist
  ls -t "$BACKUP_DIR"/ttc_backup_*.tar.gz 2>/dev/null | tail -n +6 | xargs -r rm
fi

mkdir -p "$PROD_DIR/dist"
echo "🚢 Syncing dist to production"
rsync -a --delete "$DIST_DIR/" "$PROD_DIR/dist/"

if id -u www-data >/dev/null 2>&1; then
  echo "🔒 Updating ownership and permissions"
  chown -R www-data:www-data "$PROD_DIR/dist"
fi
find "$PROD_DIR/dist" -type d -exec chmod 755 {} +
find "$PROD_DIR/dist" -type f -exec chmod 644 {} +

cat <<EOF
✅ Deployment complete!

Production assets are now available in:
  $PROD_DIR/dist

Notes:
- Ensure the web server serves or proxies the root-domain affiliate path to this directory.
- If needed, override the deploy target with:
    PROD_DIR=/var/www/your-folder ./deploy.sh
- To build with a different affiliate origin:
    VITE_AFFILIATE_ORIGIN=https://tantramovement.com ./deploy.sh
EOF
