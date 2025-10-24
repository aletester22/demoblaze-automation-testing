#!/bin/bash

echo "🚀 Demoblaze Automation Testing - Test Execution Script"
echo "========================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🧪 Running Cypress tests..."
echo "============================"

# Run all tests
npx cypress run

echo ""
echo "📊 Test execution completed!"
echo "============================"

# Check if screenshots exist
if [ -d "cypress/screenshots" ] && [ "$(ls -A cypress/screenshots)" ]; then
    echo "📸 Screenshots generated: cypress/screenshots/"
    echo "   - These show any test failures for debugging"
fi

# Check if videos exist
if [ -d "cypress/videos" ] && [ "$(ls -A cypress/videos)" ]; then
    echo "🎥 Videos generated: cypress/videos/"
    echo "   - These show complete test execution recordings"
fi

# Try to generate Allure reports if Java is available
if command -v java &> /dev/null; then
    echo ""
    echo "📈 Generating Allure reports..."
    echo "==============================="
    
    if [ -d "allure-results" ] && [ "$(ls -A allure-results)" ]; then
        npm run allure:generate
        echo "✅ Allure report generated: allure-report/"
        echo "   - Open with: npm run allure:open"
    else
        echo "⚠️  No Allure results found. Run tests first to generate results."
    fi
else
    echo ""
    echo "⚠️  Java not found. Allure reports require Java."
    echo "   - Install Java to generate detailed reports"
    echo "   - Or use: brew install openjdk"
fi

echo ""
echo "📁 Generated Files:"
echo "==================="
echo "📄 Test Results: TEST_RESULTS.md"
echo "📄 Presentation Guide: PRESENTATION_GUIDE.md"
echo "📄 Setup Instructions: README.md"

if [ -d "cypress/screenshots" ] && [ "$(ls -A cypress/screenshots)" ]; then
    echo "📸 Screenshots: cypress/screenshots/"
fi

if [ -d "cypress/videos" ] && [ "$(ls -A cypress/videos)" ]; then
    echo "🎥 Videos: cypress/videos/"
fi

if [ -d "allure-report" ]; then
    echo "📊 Allure Report: allure-report/"
fi

echo ""
echo "🎯 Next Steps:"
echo "=============="
echo "1. Review test results in the files above"
echo "2. Check screenshots for any failures"
echo "3. Watch videos to see test execution"
echo "4. Open Allure report for detailed analysis (if Java installed)"
echo "5. Commit all files to Git for presentation"

echo ""
echo "✅ Script completed successfully!"
