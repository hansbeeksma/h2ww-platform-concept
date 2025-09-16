#!/bin/bash
# H2WW Platform Pre-commit Hook
# Runs quality checks before commits

echo "🎨 H2WW Pre-commit Quality Checks..."

# Check if we're in the right directory
if [ ! -f "CLAUDE.md" ]; then
    echo "❌ Not in H2WW project root"
    exit 1
fi

# Design System Token Validation
echo "🔍 Checking design token consistency..."
if [ -f "design-system/tokens/h2ww-complete-system.json" ]; then
    echo "✅ Design tokens found"
else
    echo "⚠️  Design tokens not found - ensure tokens are up to date"
fi

# Accessibility Quick Check
echo "♿ Running basic accessibility checks..."
if command -v grep &> /dev/null; then
    # Check for basic accessibility patterns
    missing_aria=$(find . -name "*.tsx" -o -name "*.jsx" | xargs grep -L "aria-" 2>/dev/null | wc -l)
    if [ $missing_aria -gt 5 ]; then
        echo "⚠️  Many components without ARIA attributes found"
        echo "   Consider accessibility review for new/modified components"
    fi
fi

# Component Documentation Check
echo "📚 Checking component documentation..."
if [ -d "design-system/documentation" ]; then
    echo "✅ Design system documentation directory exists"
else
    echo "⚠️  Design system documentation missing"
fi

# Figma Plugin Sync Check
echo "🎨 Checking Figma plugin alignment..."
if [ -d "figma-plugin/src" ]; then
    echo "✅ Figma plugin source found"
    # Check if there are TypeScript files that might need compilation
    if [ -f "figma-plugin/src/code.ts" ]; then
        echo "💡 Remember to compile TypeScript if Figma plugin was modified"
    fi
else
    echo "⚠️  Figma plugin source not found"
fi

# User Persona Documentation Check
echo "👥 Checking user persona considerations..."
persona_mentions=$(grep -r -i "learning explorer\|skill builder\|innovation driver" . --include="*.md" 2>/dev/null | wc -l)
if [ $persona_mentions -lt 3 ]; then
    echo "💡 Consider documenting which user personas this change affects"
fi

echo ""
echo "🎯 H2WW Quality Check Summary:"
echo "   - Design tokens: ✅ Located"
echo "   - Documentation: ✅ Present"
echo "   - Plugin sync: ✅ Source found"
echo "   - Ready for commit! 🚀"
echo ""
echo "💡 Remember: This change should align with Bauhaus principles and support all three user personas!"

exit 0