#!/bin/bash

echo "🚀 Starting Altroway deployment..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found!"
    echo "Please create .env.local with your environment variables first."
    echo "See DEPLOYMENT_GUIDE.md for details."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Your project is ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Push your code to GitHub/GitLab"
    echo "2. Connect your repository to Netlify"
    echo "3. Set build command: npm run build"
    echo "4. Set publish directory: .next"
    echo "5. Add environment variables in Netlify dashboard"
    echo ""
    echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
