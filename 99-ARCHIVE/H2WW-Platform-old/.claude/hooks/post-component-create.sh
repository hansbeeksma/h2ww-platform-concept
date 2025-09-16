#!/bin/bash
# H2WW Platform Post Component Creation Hook
# Runs after new components are created

echo "🎨 H2WW Post-Component Creation Tasks..."

COMPONENT_NAME=$1
COMPONENT_PATH=$2

if [ -z "$COMPONENT_NAME" ]; then
    echo "❌ Component name not provided"
    exit 1
fi

echo "✨ Processing new component: $COMPONENT_NAME"

# Create component documentation template
echo "📚 Creating component documentation..."
if [ ! -d "design-system/documentation/components" ]; then
    mkdir -p "design-system/documentation/components"
fi

DOC_FILE="design-system/documentation/components/${COMPONENT_NAME}.md"
if [ ! -f "$DOC_FILE" ]; then
    cat > "$DOC_FILE" << EOF
# ${COMPONENT_NAME} Component

## Overview
[Brief description of the component and its purpose in the H2WW design system]

## User Personas
- **Learning Explorers**: [How this component serves novice users]
- **Skill Builders**: [How this component serves intermediate users]
- **Innovation Drivers**: [How this component serves expert users]

## Design Principles
- **Bauhaus Influence**: [How geometric principles apply]
- **Itten Color Theory**: [Color psychology considerations]
- **Accessibility**: WCAG 2.1 AA compliant

## Usage Examples
\`\`\`tsx
// Basic usage example
\`\`\`

## Props & API
[Component props documentation]

## Design Tokens Used
- Colors: [List relevant color tokens]
- Typography: [List typography tokens]
- Spacing: [List spacing tokens]

## Research Considerations
[Any Human-AI interaction research that influenced design decisions]

## Testing Notes
- [ ] Keyboard navigation tested
- [ ] Screen reader compatibility verified
- [ ] Color contrast meets standards
- [ ] Works across all three user personas
EOF
    echo "✅ Created documentation template: $DOC_FILE"
fi

# Update component index if it exists
echo "📋 Updating component registry..."
if [ -f "design-system/components/index.ts" ]; then
    echo "💡 Remember to add $COMPONENT_NAME to component index"
fi

# Check Figma plugin alignment
echo "🎨 Checking Figma plugin alignment..."
if [ -d "figma-plugin/src" ]; then
    echo "💡 Consider adding $COMPONENT_NAME to Figma plugin component factory"
fi

# Accessibility reminder
echo "♿ Accessibility checklist for $COMPONENT_NAME:"
echo "   - [ ] Focus management implemented"
echo "   - [ ] ARIA labels added where appropriate"
echo "   - [ ] Color contrast verified"
echo "   - [ ] Keyboard navigation functional"
echo "   - [ ] Screen reader compatible"

# User persona reminder
echo "👥 User persona considerations:"
echo "   - [ ] Novice users can understand and use safely"
echo "   - [ ] Intermediate users can practice and improve"
echo "   - [ ] Expert users have efficient workflows"

echo ""
echo "🎯 Next steps for $COMPONENT_NAME:"
echo "   1. Complete component documentation"
echo "   2. Run accessibility tests"
echo "   3. Test with all three user personas"
echo "   4. Consider Figma plugin integration"
echo "   5. Update design system registry"
echo ""
echo "🚀 Component creation workflow complete!"

exit 0