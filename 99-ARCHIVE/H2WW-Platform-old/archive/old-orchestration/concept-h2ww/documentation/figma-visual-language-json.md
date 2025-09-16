# 🎨 Figma Visual Language JSON Structure

## 📋 VISUAL LANGUAGE Components voor Figma Plugin

Hier is de complete JSON structuur voor alle VISUAL LANGUAGE onderdelen die je in je Figma plugin kunt plakken:

```json
{
  "VISUAL_LANGUAGE_COMPONENTS": {
    "COLOR": [
      "Color",
      "Palettes, by category",
      "Contrast",
      "Meaning",
      "Swatches"
    ],
    "TYPOGRAPHY": [
      "Typography",
      "Hierarchy",
      "Weights / types",
      "Web fonts",
      "Baseline grid"
    ],
    "ICONOGRAPHY": [
      "Iconography",
      "Pictograms",
      "Illustration",
      "Icon fonts",
      "Alignment"
    ],
    "MOTION": [
      "Motion",
      "Principles",
      "Timing",
      "Types",
      "Transitions"
    ],
    "SPACE": [
      "Space",
      "Units / measurements",
      "Metrics and keylines",
      "Structure",
      "Photography"
    ]
  }
}
```

## 🎯 H2WW-Specifieke Visual Language JSON

Voor het H2WW project, hier is de aangepaste JSON structuur gebaseerd op Bauhaus principes en Itten's kleurenleer:

```json
{
  "H2WW_VISUAL_LANGUAGE": {
    "COLOR_SYSTEM": {
      "PRIMARY_COLORS": [
        "H2WW Red (#E53E3E) - AI Fundamentals",
        "H2WW Yellow (#F6E05E) - Learning & Discovery",
        "H2WW Blue (#3182CE) - Trust & Reliability"
      ],
      "SECONDARY_COLORS": [
        "H2WW Orange (#DD6B20) - Creative Applications",
        "H2WW Green (#38A169) - Safe Practices",
        "H2WW Purple (#805AD5) - Advanced Techniques"
      ],
      "NEUTRAL_COLORS": [
        "H2WW Black (#1A202C) - Headers & Primary Text",
        "H2WW Gray (#4A5568) - Secondary Text",
        "H2WW Light Gray (#E2E8F0) - Backgrounds",
        "H2WW White (#FFFFFF) - Clean Backgrounds"
      ],
      "SEMANTIC_COLORS": [
        "Success (#38A169)",
        "Warning (#F6E05E)",
        "Error (#E53E3E)",
        "Info (#3182CE)"
      ],
      "COLOR_PALETTES": [
        "Itten Primary Palette",
        "Itten Secondary Palette",
        "Itten Complementary Palette",
        "Bauhaus Geometric Palette"
      ],
      "CONTRAST_RATIOS": [
        "WCAG AA Compliance",
        "Text Contrast Standards",
        "Interactive Element Contrast",
        "Accessibility Guidelines"
      ],
      "COLOR_MEANING": [
        "Geometric Form Associations",
        "Learning Level Color Coding",
        "Trust Architecture Colors",
        "Progress Indicator Colors"
      ],
      "COLOR_SWATCHES": [
        "Primary Color Swatches",
        "Secondary Color Swatches",
        "Neutral Color Swatches",
        "Semantic Color Swatches"
      ]
    },
    "TYPOGRAPHY_SYSTEM": {
      "FONT_FAMILIES": [
        "Inter (Primary) - Headers, Body Text, UI",
        "Source Sans Pro (Secondary) - Accent Text, Quotes"
      ],
      "TYPOGRAPHY_HIERARCHY": [
        "H1 (48px/3rem) - Main Headers",
        "H2 (36px/2.25rem) - Section Headers",
        "H3 (24px/1.5rem) - Subsection Headers",
        "H4 (20px/1.25rem) - Card Headers",
        "Body (16px/1rem) - Main Content",
        "Small (14px/0.875rem) - Secondary Text",
        "Caption (12px/0.75rem) - Labels, Captions"
      ],
      "FONT_WEIGHTS": [
        "Inter Regular (400)",
        "Inter Medium (500)",
        "Inter SemiBold (600)",
        "Inter Bold (700)"
      ],
      "WEB_FONTS": [
        "Inter Variable Font",
        "Source Sans Pro Web Font",
        "Font Loading Strategy",
        "Fallback Fonts"
      ],
      "BASELINE_GRID": [
        "8px Grid System",
        "Line Height Standards",
        "Vertical Rhythm",
        "Spacing Consistency"
      ]
    },
    "ICONOGRAPHY_SYSTEM": {
      "GEOMETRIC_ICONS": [
        "Circle Icons - Continuity, Flow",
        "Square Icons - Stability, Structure",
        "Triangle Icons - Progress, Growth",
        "Geometric Compositions"
      ],
      "FUNCTIONAL_ICONS": [
        "Learning Icons",
        "Community Icons",
        "Tool Icons",
        "Navigation Icons",
        "Status Icons"
      ],
      "ILLUSTRATION_STYLE": [
        "Bauhaus-Inspired Illustrations",
        "Geometric Pattern Library",
        "Educational Illustrations",
        "AI Concept Illustrations"
      ],
      "ICON_FONTS": [
        "Custom Icon Font",
        "Icon Font Loading",
        "Icon Font Fallbacks",
        "Icon Font Optimization"
      ],
      "ICON_ALIGNMENT": [
        "Icon Grid System",
        "Icon Sizing Standards",
        "Icon Spacing Rules",
        "Icon Consistency Guidelines"
      ]
    },
    "MOTION_SYSTEM": {
      "MOTION_PRINCIPLES": [
        "Bauhaus Functional Motion",
        "Purposeful Animations",
        "Performance-First Approach",
        "Accessibility Considerations"
      ],
      "TIMING_FUNCTIONS": [
        "Ease-in-out (0.3s)",
        "Ease-out (0.2s)",
        "Ease-in (0.4s)",
        "Linear (0.1s)"
      ],
      "ANIMATION_TYPES": [
        "Micro-interactions",
        "Page Transitions",
        "Loading States",
        "Progress Animations",
        "Hover Effects"
      ],
      "TRANSITIONS": [
        "Button State Transitions",
        "Form Input Transitions",
        "Navigation Transitions",
        "Modal Transitions",
        "Card Hover Transitions"
      ]
    },
    "SPACE_SYSTEM": {
      "SPACING_UNITS": [
        "xs (4px/0.25rem)",
        "sm (8px/0.5rem)",
        "md (16px/1rem)",
        "lg (24px/1.5rem)",
        "xl (32px/2rem)",
        "2xl (48px/3rem)",
        "3xl (64px/4rem)"
      ],
      "MEASUREMENTS": [
        "Component Padding",
        "Component Margins",
        "Grid Gutters",
        "Content Widths",
        "Container Max-widths"
      ],
      "KEYLINES": [
        "Content Keylines",
        "Component Keylines",
        "Grid Keylines",
        "Alignment Keylines"
      ],
      "STRUCTURE": [
        "8px Grid System",
        "Component Spacing",
        "Layout Spacing",
        "Responsive Spacing"
      ],
      "PHOTOGRAPHY": [
        "Image Aspect Ratios",
        "Image Sizing Standards",
        "Image Quality Guidelines",
        "Image Optimization Rules"
      ]
    }
  }
}
```

## 🎯 Complete Figma Plugin JSON

Hier is de complete JSON die je direct in je Figma plugin kunt plakken:

```json
{
  "FIGMA_VISUAL_LANGUAGE_PLUGIN": {
    "PAGES": [
      "VISUAL LANGUAGE - Color",
      "VISUAL LANGUAGE - Typography", 
      "VISUAL LANGUAGE - Iconography",
      "VISUAL LANGUAGE - Motion",
      "VISUAL LANGUAGE - Space"
    ],
    "COLOR_PAGE_COMPONENTS": [
      "Color",
      "Palettes, by category",
      "Contrast",
      "Meaning",
      "Swatches",
      "H2WW Primary Colors",
      "H2WW Secondary Colors",
      "H2WW Neutral Colors",
      "H2WW Semantic Colors",
      "Itten Color Theory",
      "Bauhaus Color Palette",
      "Accessibility Contrast",
      "Color Usage Guidelines"
    ],
    "TYPOGRAPHY_PAGE_COMPONENTS": [
      "Typography",
      "Hierarchy",
      "Weights / types",
      "Web fonts",
      "Baseline grid",
      "Inter Font Family",
      "Source Sans Pro Font Family",
      "Typography Scale",
      "Font Weights",
      "Line Heights",
      "8px Grid System",
      "Vertical Rhythm",
      "Responsive Typography"
    ],
    "ICONOGRAPHY_PAGE_COMPONENTS": [
      "Iconography",
      "Pictograms",
      "Illustration",
      "Icon fonts",
      "Alignment",
      "Geometric Icons",
      "Circle Icons",
      "Square Icons",
      "Triangle Icons",
      "Functional Icons",
      "Learning Icons",
      "Community Icons",
      "Tool Icons",
      "Bauhaus Illustrations",
      "Icon Grid System"
    ],
    "MOTION_PAGE_COMPONENTS": [
      "Motion",
      "Principles",
      "Timing",
      "Types",
      "Transitions",
      "Micro-interactions",
      "Button Animations",
      "Page Transitions",
      "Loading States",
      "Hover Effects",
      "Progress Animations",
      "Accessibility Motion",
      "Performance Guidelines"
    ],
    "SPACE_PAGE_COMPONENTS": [
      "Space",
      "Units / measurements",
      "Metrics and keylines",
      "Structure",
      "Photography",
      "8px Spacing System",
      "Component Padding",
      "Component Margins",
      "Grid Gutters",
      "Content Keylines",
      "Layout Spacing",
      "Responsive Spacing",
      "Image Guidelines"
    ]
  }
}
```

## 🎯 H2WW-Specifieke Componenten

Voor het H2WW project, hier zijn de specifieke componenten die je kunt toevoegen:

```json
{
  "H2WW_SPECIFIC_COMPONENTS": {
    "GEOMETRIC_ELEMENTS": [
      "Circle Progress Indicators",
      "Square Content Cards",
      "Triangle Next Steps",
      "Geometric Logo Variations",
      "Bauhaus Pattern Library"
    ],
    "AI_WIZARD_COMPONENTS": [
      "Chat Interface Elements",
      "Wizard Progress Steps",
      "AI Companion Avatar",
      "Conversation Bubbles",
      "Learning Path Visualizations"
    ],
    "LEARNING_COMPONENTS": [
      "Module Cards",
      "Progress Bars",
      "Achievement Badges",
      "Certificate Templates",
      "Learning Path Icons"
    ],
    "COMMUNITY_COMPONENTS": [
      "User Profile Elements",
      "Post Creation Interface",
      "Community Feed Cards",
      "Social Interaction Buttons",
      "Discussion Thread Elements"
    ],
    "TOOL_INTEGRATION_COMPONENTS": [
      "Tool Status Indicators",
      "AI Tool Cards",
      "Integration Badges",
      "Tool Comparison Elements",
      "API Connection Status"
    ]
  }
}
```

## 🎯 Implementatie Instructies

### **Stap 1: Figma Plugin Setup**
1. Kopieer de JSON structuur
2. Plak in je Figma plugin
3. Genereer automatisch de pages en components

### **Stap 2: H2WW Customization**
1. Voeg H2WW-specifieke kleuren toe
2. Implementeer geometrische elementen
3. Maak AI wizard components
4. Voeg learning path visualizations toe

### **Stap 3: Organization**
1. Organiseer components per page
2. Gebruik consistente naming
3. Maak component variants
4. Documenteer usage guidelines

---

**Deze JSON structuur geeft je een complete basis voor je Figma design system met alle VISUAL LANGUAGE onderdelen!** 🎨✨
