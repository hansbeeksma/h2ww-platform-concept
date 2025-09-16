# 🎨 H2WW Design System - React Implementation

A comprehensive, research-driven React component library for AI learning platforms, built with TypeScript, Tailwind CSS, and accessibility-first principles.

## 🎯 Overview

The H2WW Design System React implementation provides 200+ components based on:
- **Human-AI Interaction Research**: Solving the 5 major AI interface problems
- **Apple Human Interface Guidelines**: Industry-leading accessibility and usability standards
- **Bauhaus Design Principles**: Geometric clarity and functional aesthetics
- **Itten Color Psychology**: Learning-optimized color system with Apple system colors
- **WCAG 2.1 AAA Accessibility**: Enhanced inclusive design beyond minimum requirements
- **Research-Driven UX**: Evidence-based interaction patterns with Apple HIG validation

## 🚀 Quick Start

### Installation

```bash
npm install @h2ww/design-system
# or
yarn add @h2ww/design-system
# or
pnpm add @h2ww/design-system
```

### Setup

1. **Install peer dependencies:**
```bash
npm install react react-dom tailwindcss
```

2. **Configure Tailwind CSS:**
```js
// tailwind.config.js
module.exports = {
  // ... your existing config
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@h2ww/design-system/**/*.{js,ts,jsx,tsx}', // Add this line
  ],
  // ... rest of config
}
```

3. **Import the CSS:**
```css
/* In your main CSS file */
@import '@h2ww/design-system/styles/globals.css';
```

### Basic Usage

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from '@h2ww/design-system'

function App() {
  return (
    <Card learningState="discovery">
      <CardHeader>
        <CardTitle>Welcome to AI Learning</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Start your journey with artificial intelligence</p>
        <Button variant="discovery" size="lg">
          Begin Learning
        </Button>
      </CardContent>
    </Card>
  )
}
```

## 🧩 Component Categories

### 1. **Visual Language** 🎨
Foundation elements for consistent design:
- Color system with learning psychology mapping
- Typography hierarchy optimized for learning content
- Spacing system based on 8px grid
- Motion principles respecting accessibility

### 2. **UI Elements** 🧱
Basic building blocks:
- **Buttons**: Primary, secondary, learning state variants
- **Inputs**: Text, email, search with validation
- **Forms**: Complete form components with accessibility
- **Typography**: Headings, body text, code blocks

### 3. **UI Components** 🔧
Functional component units:
- **Cards**: Learning cards, AI tool cards, progress cards
- **Navigation**: Headers, breadcrumbs, tabs
- **Feedback**: Alerts, progress indicators, badges
- **Data Display**: Tables, lists, statistics

### 4. **Learning Components** 🎓
Specialized for AI education:
- **Progress Tracking**: Visual learning progression
- **AI Tool Integration**: Connection status and usage
- **Skill Assessment**: Progress indicators and badges
- **Course Structure**: Organized learning paths

## 🎨 Design Tokens

### Learning State Colors

Based on Johannes Itten's color psychology research enhanced with Apple System Colors:

```tsx
// Discovery Phase - Apple System Yellow (Curiosity & Exploration)
<Button variant="discovery">Explore AI</Button>

// Fundamentals Phase - Apple System Blue (Energy & Attention)
<Button variant="fundamentals">Learn Fundamentals</Button>

// Mastery Phase - Apple System Purple (Trust & Expertise)
<Button variant="mastery">Advanced Techniques</Button>
```

### Component Sizes (Apple HIG Compliant)

All components meet Apple's 44pt minimum touch target requirement:

```tsx
<Button size="sm">Small (44px min)</Button>
<Button size="default">Default (48px comfortable)</Button>
<Button size="lg">Large (56px prominent)</Button>
```

### Learning State Integration

```tsx
<Card learningState="discovery">
  <LearningProgressCard
    progress={25}
    learningState="discovery"
    title="AI Fundamentals"
    currentStep="Understanding Machine Learning"
  />
</Card>
```

## ♿ Accessibility Features

### Apple HIG + WCAG 2.1 AAA Compliance
- ✅ Enhanced color contrast ratios 7:1 (AAA level)
- ✅ 44px minimum touch targets (Apple HIG standard)
- ✅ Full keyboard navigation support with Apple interaction patterns
- ✅ VoiceOver and screen reader optimized
- ✅ Advanced focus management with trap/restore
- ✅ Enhanced ARIA labels with learning context
- ✅ Haptic feedback integration (where supported)
- ✅ Dynamic Type support
- ✅ Reduced motion preferences respected

### Built-in Accessibility
```tsx
// Enhanced ARIA labels with learning context
<Button
  learningState="fundamentals"
  progress={65}
  onHapticFeedback={true}
>
  Continue Learning
</Button>
// Generates: "Continue Learning, in fundamentals learning phase, 65% complete"

// Apple HIG compliant form accessibility
<Input
  label="Email Address"
  required
  error="Please enter a valid email"
  helperText="We'll never share your email"
  className="touch-target-min" // 44px minimum
/>

// Full keyboard navigation with Apple patterns
<Tabs defaultValue="overview" learningState="discovery">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="lessons">Lessons</TabsTrigger>
  </TabsList>
</Tabs>
```

## 🔧 Advanced Usage

### Custom Styling with Apple HIG Utilities

```tsx
import { cn } from '@h2ww/design-system'

<Button
  className={cn(
    'apple-button-style', // Apple HIG interactions
    'transition-apple',   // Apple easing curves
    'touch-target-comfortable', // 48px touch target
    condition && 'shadow-apple-2'
  )}
>
  Apple-styled button
</Button>

// Using Apple HIG utilities directly
import { hapticFeedback, createEnhancedAriaLabel } from '@h2ww/design-system'

const handleClick = () => {
  hapticFeedback.success()
  // Handle action
}
```

### Theme Customization

```tsx
// Override design tokens in your Tailwind config
module.exports = {
  theme: {
    extend: {
      colors: {
        'ai-fundamentals': {
          500: '#E53E3E', // Your custom red
        }
      }
    }
  }
}
```

### Learning State Detection

```tsx
import { getLearningStateFromProgress } from '@h2ww/design-system'

const progress = 45
const learningState = getLearningStateFromProgress(progress) // 'fundamentals'

<Card learningState={learningState}>
  Content adapts to learning progress
</Card>
```

## 📱 Responsive Design

All components are mobile-first and responsive:

```tsx
<Card className="w-full md:w-1/2 lg:w-1/3">
  Responsive card
</Card>

<Button className="w-full sm:w-auto">
  Mobile-first button
</Button>
```

## 🧪 Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/h2ww/design-system
cd design-system/react-implementation

# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run tests
npm test

# Build the library
npm run build
```

### Component Development Guidelines

1. **Follow H2WW Principles**: Every component should address learning needs
2. **Accessibility First**: WCAG 2.1 AA compliance is mandatory
3. **Research-Based**: Decisions should be backed by Human-AI interaction research
4. **Token-Driven**: Use design tokens, not hardcoded values
5. **Testing**: Include unit tests and accessibility tests

### Adding New Components

```tsx
// Template for new components
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const componentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'default-styles',
        // Add variants
      },
      size: {
        default: 'default-size',
        // Add sizes
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

interface ComponentProps extends VariantProps<typeof componentVariants> {
  // Add props
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Component.displayName = 'Component'

export { Component, componentVariants }
```

## 📊 Performance

### Bundle Size
- **Core**: ~50KB gzipped
- **Full Library**: ~150KB gzipped
- **Tree Shaking**: Import only what you need

### Optimization Tips
```tsx
// Tree shaking - import specific components
import { Button } from '@h2ww/design-system/button'

// Lazy loading
const HeavyComponent = React.lazy(() =>
  import('@h2ww/design-system/heavy-component')
)
```

## 🔄 Migration Guide

### From v1.x to v2.x

```tsx
// v1.x
<Button color="primary">Click me</Button>

// v2.x
<Button variant="default">Click me</Button>
<Button learningState="fundamentals">Click me</Button>
```

## 🤝 Contributing

1. **Design Proposals**: RFC process for new components
2. **Research Integration**: Regular research review cycles
3. **Accessibility Testing**: Required for all changes
4. **Documentation**: Update docs with examples

### Contribution Guidelines
- Follow TypeScript strict mode
- Include comprehensive tests
- Document accessibility considerations
- Use semantic commit messages
- Add Storybook stories for visual components

## 📚 Resources

### Documentation
- [Design System Overview](../documentation/design-system-overview.md)
- [Research Foundation](../../concept/h2ww-concept-complete.md)
- [Accessibility Guidelines](../documentation/accessibility.md)
- [Figma Plugin](../../figma-plugin/docs/plugin-guide.md)

### Tools
- [Storybook](http://localhost:6006) (when running locally)
- [Component Testing](./src/components/__tests__)
- [Visual Regression Tests](./tests/visual)

### External Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Tailwind CSS](https://tailwindcss.com)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

## 📝 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🎯 Roadmap

### Current (v2.0)
- ✅ Core components with learning states
- ✅ Research-based design tokens
- ✅ Accessibility compliance
- ✅ TypeScript support

### Next (v2.1)
- 🔄 AI Tool Integration components
- 🔄 Advanced animation system
- 🔄 Enhanced theming support
- 🔄 Performance optimizations

### Future (v3.0)
- 📋 Real-time collaboration components
- 📋 Advanced learning analytics
- 📋 Voice and gesture interactions
- 📋 AR/VR learning interfaces

---

*Built with ❤️ for optimal human-AI learning experiences*

**Version**: 2.0.0
**Last Updated**: September 2025
**Compatibility**: React 18+, Node.js 18+