#!/bin/bash
# Quick setup & test script untuk login
# Run: bash setup_and_test.sh

echo "🚀 SETUP & TEST LOGIN"
echo "===================="

echo ""
echo "1️⃣ Checking dependencies..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js"
    exit 1
fi
echo "✅ npm found"

echo ""
echo "2️⃣ Installing packages..."
npm install

echo ""
echo "3️⃣ Building project..."
npm run build

echo ""
echo "4️⃣ Starting dev server..."
echo "✅ Dev server started on http://localhost:3000"
echo ""
echo "📝 Next steps:"
echo "1. Open http://localhost:3000 in browser"
echo "2. Try login with:"
echo "   Email: budi@example.com"
echo "   Password: password123"
echo ""
echo "3. If input not working:"
echo "   - Clear browser cache (Ctrl+Shift+Delete)"
echo "   - Disable browser extensions"
echo "   - Try different browser"
echo ""
echo "4. If login error:"
echo "   - Open DevTools (F12)"
echo "   - Check Console tab for error messages"
echo "   - Check Network tab for API response"
echo "   - Copy-paste code from console_test_login.js to test"
echo ""
echo "📚 Documentation:"
echo "   - Read: LOGIN_TROUBLESHOOTING.md"
echo "   - Read: SOLUSI_LOGIN_ERROR.md"
echo "   - Read: TESTING_CHECKLIST.md"
echo ""

npm run dev
