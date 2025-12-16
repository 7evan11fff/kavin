#!/bin/bash

# SkyShield Website - GitHub Setup Script
# This script helps set up GitHub authentication

echo "🔧 SkyShield Website - GitHub Setup"
echo "==================================="

# Navigate to the website directory
cd "$(dirname "$0")"

echo "📋 Current Git Configuration:"
echo "Repository: $(git remote get-url origin 2>/dev/null || echo 'Not configured')"
echo "User: $(git config user.name)"
echo "Email: $(git config user.email)"
echo ""

echo "🔑 To set up GitHub authentication, you have a few options:"
echo ""
echo "Option 1: Personal Access Token (Recommended)"
echo "1. Go to https://github.com/settings/tokens"
echo "2. Generate a new token with 'repo' permissions"
echo "3. Run: git config --global credential.helper store"
echo "4. Try pushing - it will ask for your username and token"
echo ""
echo "Option 2: SSH Key (More secure)"
echo "1. Generate SSH key: ssh-keygen -t ed25519 -C 'kavin.lingham@alpha.school'"
echo "2. Add to GitHub: https://github.com/settings/ssh/new"
echo "3. Change remote URL: git remote set-url origin git@github.com:7evan11fff/kavin.git"
echo ""
echo "Option 3: GitHub CLI"
echo "1. Install GitHub CLI: brew install gh"
echo "2. Authenticate: gh auth login"
echo ""

echo "🚀 After setting up authentication, run:"
echo "   ./push-to-github.sh"
echo ""
echo "📝 For automatic pushes on file changes, you can set up a file watcher:"
echo "   fswatch -o . | xargs -n1 -I{} ./push-to-github.sh"
