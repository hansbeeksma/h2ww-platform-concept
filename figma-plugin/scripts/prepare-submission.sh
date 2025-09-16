#!/bin/bash

# H2WW Component Library Plugin - Submission Preparation Script
# This script prepares the plugin for Figma Community submission

set -e  # Exit on any error

echo "🚀 Preparing H2WW Component Library Plugin for submission..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "manifest.json" ]; then
    print_error "manifest.json not found. Please run this script from the plugin root directory."
    exit 1
fi

print_status "Validating environment..."

# Check Node.js version
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

NODE_VERSION=$(node --version | sed 's/v//')
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    print_error "Node.js version $NODE_VERSION is too old. Please install Node.js 18+ and try again."
    exit 1
fi

print_success "Node.js version $NODE_VERSION is compatible"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm and try again."
    exit 1
fi

print_success "npm is available"

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/.cache/
rm -f *.zip

# Install dependencies
print_status "Installing dependencies..."
npm ci --silent

# Run type checking
print_status "Running type checking..."
if ! npm run type-check --silent; then
    print_error "TypeScript type checking failed. Please fix type errors and try again."
    exit 1
fi
print_success "Type checking passed"

# Run linting
print_status "Running linting..."
if ! npm run lint --silent; then
    print_warning "Linting found issues. Please review and fix if necessary."
fi

# Build production version
print_status "Building production version..."
if ! npm run build --silent; then
    print_error "Build failed. Please check build errors and try again."
    exit 1
fi
print_success "Build completed successfully"

# Validate build output
print_status "Validating build output..."

REQUIRED_FILES=("dist/main.js" "dist/ui.js" "dist/ui.html")
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        print_error "Required file $file not found in build output."
        exit 1
    fi
    print_success "✓ $file"
done

# Check file sizes
print_status "Checking file sizes..."
MAIN_JS_SIZE=$(wc -c <"dist/main.js")
UI_JS_SIZE=$(wc -c <"dist/ui.js")
TOTAL_SIZE=$((MAIN_JS_SIZE + UI_JS_SIZE))

if [ $TOTAL_SIZE -gt 5242880 ]; then  # 5MB in bytes
    print_warning "Total bundle size is $(($TOTAL_SIZE / 1024 / 1024))MB. Consider optimizing for better performance."
else
    print_success "Bundle size is acceptable: $(($TOTAL_SIZE / 1024))KB"
fi

# Validate manifest.json
print_status "Validating manifest.json..."
if ! python3 -m json.tool manifest.json > /dev/null 2>&1; then
    if ! node -e "JSON.parse(require('fs').readFileSync('manifest.json', 'utf8'))" 2>/dev/null; then
        print_error "manifest.json is not valid JSON"
        exit 1
    fi
fi
print_success "manifest.json is valid JSON"

# Check for required manifest fields
MANIFEST_FIELDS=("name" "id" "api" "main" "ui")
for field in "${MANIFEST_FIELDS[@]}"; do
    if ! grep -q "\"$field\"" manifest.json; then
        print_error "Required field '$field' not found in manifest.json"
        exit 1
    fi
done
print_success "All required manifest fields present"

# Security check - ensure no secrets in code
print_status "Running security checks..."
if grep -r "API_KEY\|SECRET\|PASSWORD\|TOKEN" src/ --exclude-dir=node_modules 2>/dev/null | grep -v "your_" | grep -v "example" | grep -v "placeholder"; then
    print_warning "Potential secrets found in source code. Please review and remove."
fi

# Check for console.log statements (should be minimal in production)
LOG_COUNT=$(grep -r "console\.log" src/ 2>/dev/null | wc -l || echo 0)
if [ "$LOG_COUNT" -gt 5 ]; then
    print_warning "Found $LOG_COUNT console.log statements. Consider removing for production."
fi

# Create submission package
print_status "Creating submission package..."
SUBMISSION_DIR="h2ww-plugin-submission"
rm -rf "$SUBMISSION_DIR"
mkdir -p "$SUBMISSION_DIR"

# Copy required files
cp manifest.json "$SUBMISSION_DIR/"
cp -r dist/ "$SUBMISSION_DIR/"
cp README.md "$SUBMISSION_DIR/" 2>/dev/null || print_warning "README.md not found"
cp LICENSE "$SUBMISSION_DIR/" 2>/dev/null || print_warning "LICENSE file not found"

# Create zip file
PLUGIN_VERSION=$(grep '"version"' package.json | sed 's/.*"version": "\(.*\)".*/\1/')
ZIP_NAME="h2ww-plugin-v${PLUGIN_VERSION}.zip"

print_status "Creating submission package: $ZIP_NAME"
cd "$SUBMISSION_DIR"
zip -r "../$ZIP_NAME" . > /dev/null
cd ..

print_success "Submission package created: $ZIP_NAME"

# Validate submission package
print_status "Validating submission package..."
PACKAGE_SIZE=$(wc -c <"$ZIP_NAME")
if [ $PACKAGE_SIZE -gt 10485760 ]; then  # 10MB in bytes
    print_error "Submission package is too large ($(($PACKAGE_SIZE / 1024 / 1024))MB). Maximum allowed is 10MB."
    exit 1
fi

print_success "Submission package size is acceptable: $(($PACKAGE_SIZE / 1024))KB"

# Final checks summary
print_status "Running final validation..."

echo ""
echo "📋 Pre-submission Checklist:"
echo "✅ Dependencies installed"
echo "✅ TypeScript compilation successful"
echo "✅ Build completed without errors"
echo "✅ Required files present"
echo "✅ manifest.json is valid"
echo "✅ Bundle size acceptable"
echo "✅ Submission package created"
echo ""

# Test plugin load (if possible)
if command -v figma &> /dev/null; then
    print_status "Testing plugin load in Figma..."
    # This would require Figma CLI integration
else
    print_warning "Figma CLI not found. Please manually test plugin in Figma Desktop."
fi

# Display next steps
echo ""
print_success "🎉 Plugin is ready for submission!"
echo ""
echo "📦 Submission package: $ZIP_NAME"
echo ""
echo "Next steps:"
echo "1. Open Figma Desktop and test the plugin thoroughly"
echo "2. Import plugin from manifest: $PWD/manifest.json"
echo "3. Test all features (Component Library, AI Assistant, Accessibility, Design Tokens)"
echo "4. Go to https://www.figma.com/community and click 'Publish a plugin'"
echo "5. Upload the submission package: $ZIP_NAME"
echo "6. Fill out the submission form with description and screenshots"
echo ""
echo "📚 Documentation:"
echo "- Plugin documentation: README.md"
echo "- Development guide: DEVELOPMENT.md"
echo "- Submission guide: SUBMISSION.md"
echo ""
echo "🚀 Good luck with your submission! You're about to introduce the world to anxiety-aware design!"

# Clean up temporary directory
rm -rf "$SUBMISSION_DIR"

exit 0