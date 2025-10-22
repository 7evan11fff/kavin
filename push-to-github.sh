#!/bin/bash

# SkyShield Website - Auto Push to GitHub Script
# This script automatically commits and pushes changes to GitHub

echo "🚀 SkyShield Website - Auto Push to GitHub"
echo "=========================================="

# Navigate to the website directory
cd "$(dirname "$0")"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Initializing..."
    git init
fi

# Add all changes
echo "📁 Adding all changes..."
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit."
    exit 0
fi

# Create commit with timestamp
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
COMMIT_MSG="Update SkyShield website - $TIMESTAMP

- Updated website content and styling
- Enhanced user experience
- Maintained brand consistency"

echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG"

# Push to GitHub
echo "🌐 Pushing to GitHub..."
if git push origin main; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🔗 Repository: https://github.com/7evan11fff/kavin"
else
    echo "❌ Failed to push to GitHub."
    echo "💡 You may need to set up authentication:"
    echo "   1. Create a Personal Access Token on GitHub"
    echo "   2. Run: git config --global credential.helper store"
    echo "   3. Try pushing again"
    exit 1
fi

echo "🎉 Website update complete!"
