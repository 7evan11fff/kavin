#!/bin/bash

# SkyShield Website - Auto Push File Watcher
# This script watches for file changes and automatically pushes to GitHub

echo "👀 SkyShield Website - Auto Push File Watcher"
echo "============================================="
echo "Watching for file changes..."
echo "Press Ctrl+C to stop"
echo ""

# Navigate to the website directory
cd "$(dirname "$0")"

# Check if fswatch is installed
if ! command -v fswatch &> /dev/null; then
    echo "❌ fswatch is not installed."
    echo "💡 Install it with: brew install fswatch"
    echo "   Or use: port install fswatch"
    exit 1
fi

# Start watching for changes
echo "🔍 Monitoring files for changes..."
fswatch -o . --exclude='.git' --exclude='*.log' | while read; do
    echo ""
    echo "📝 File change detected at $(date '+%H:%M:%S')"
    echo "🚀 Auto-pushing to GitHub..."
    
    # Run the push script
    ./push-to-github.sh
    
    echo "⏳ Waiting for next change..."
done
