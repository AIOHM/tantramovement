#!/bin/bash
# Production deployment script for TTC Backend API
# This installs dependencies, builds nothing (Node.js), and starts with PM2

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🚀 Deploying TTC Backend API"

# Install dependencies
if [ -f package-lock.json ]; then
  echo "📦 Installing dependencies..."
  npm ci --only=production
else
  echo "❌ package-lock.json not found. Run npm install first."
  exit 1
fi

# Ensure .env exists
if [ ! -f .env ]; then
  echo "❌ .env file not found. Copy .env.example to .env and configure it."
  exit 1
fi

# Check if PM2 is installed, install if missing
if ! command -v pm2 &> /dev/null; then
  echo "📦 Installing PM2 globally..."
  npm install -g pm2
fi

# Stop existing pm2 process if exists
PM2_NAME="ttc-backend"
if pm2 describe "$PM2_NAME" > /dev/null 2>&1; then
  echo "🛑 Stopping existing $PM2_NAME..."
  pm2 stop "$PM2_NAME"
  pm2 delete "$PM2_NAME"
fi

# Start with PM2
echo "▶️  Starting backend with PM2..."
pm2 start server.js --name "$PM2_NAME" --output /var/log/ttc-backend.log --error /var/log/ttc-backend-error.log --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd -u root --hp /root

echo "✅ Backend deployment complete!"
echo "📊 Status:"
pm2 list | grep ttc-backend || true
echo ""
echo "📝 Logs: pm2 logs ttc-backend"
echo "🔗 API should be reachable at: http://localhost:4000"
