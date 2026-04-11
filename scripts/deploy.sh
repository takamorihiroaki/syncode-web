#!/bin/bash

# ==========================================
# Syncode Blog Deployment Script (SSH Key)
# ==========================================

echo "🚀 Starting Deployment Process..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Build the project
echo "🏗️ Building the project..."
npm run build

# Step 3: Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting deployment."
    exit 1
fi

# Step 4: Upload to server via SSH Key
echo "📤 Uploading to Sakura Internet (SSH Key)..."
rsync -avz --delete -e "ssh -i ~/.ssh/id_ed25519_sakura" ./dist/ syncode@syncode.sakura.ne.jp:www/

if [ $? -eq 0 ]; then
    echo "✅ Deployment Complete!"
else
    echo "❌ Upload failed. Please check your SSH connection."
    exit 1
fi
