# 🎨 H2WW Design System

The complete anxiety-aware design system for the H2WW Platform.

## 📁 Design System Structure

### 🎯 [Tokens](./tokens/)
Core design tokens defining the visual language
- **Colors**: Anxiety-optimized color palette
- **Typography**: Readable and calm typography scale
- **Spacing**: Consistent spatial relationships
- **Shadows**: Gentle elevation system
- **Border Radius**: Soft, approachable corners

### 🧩 [Components](./components/)
Reusable UI components organized by complexity
- **Primitives**: Basic building blocks (Typography, Layout)
- **Components**: Interactive elements (Button, Input, Card)
- **Patterns**: Complex compositions (Dashboard, Forms)

### 📖 [Guidelines](./guidelines/)
Design principles and implementation standards
- **Accessibility Guidelines**: WCAG AA+ compliance
- **Anxiety-Aware Design Principles**: Emotional impact considerations
- **Implementation Standards**: Code and design consistency

### 📚 [Documentation](./documentation/)
Comprehensive design system documentation
- **Component Library**: Usage examples and props
- **Design Principles**: Core design philosophy
- **Migration Guides**: Version update instructions

---

## 🎯 Design Philosophy

### Anxiety-First Design
Every design decision considers emotional impact:
- **Gentle Interactions**: No jarring transitions or feedback
- **Progressive Disclosure**: Information revealed at user's pace
- **Error Forgiveness**: Supportive error handling and recovery
- **Calm Aesthetics**: Soothing colors and typography

### Accessibility by Default
Built-in accessibility features:
- **Color Contrast**: 4.5:1 minimum ratio across all combinations
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Semantic markup and ARIA labels
- **Touch Targets**: 44px minimum for mobile interactions

### Scalable Architecture
Design for growth and maintainability:
- **Token-Based**: All styles derive from design tokens
- **Component Composition**: Build complex UIs from simple parts
- **Consistent API**: Predictable props and behaviors
- **Platform Agnostic**: Works across web, mobile, and desktop

---

## 🔧 Usage

### Installation
```bash
npm install @h2ww/design-system
```

### Basic Usage
```jsx
import { Button, Card, Theme } from '@h2ww/design-system'

function App() {
  return (
    <Theme>
      <Card>
        <Button variant="gentle">Anxiety-Safe Button</Button>
      </Card>
    </Theme>
  )
}
```

### Design Tokens
```css
/* CSS Custom Properties */
:root {
  --h2ww-color-primary: #4A90E2;
  --h2ww-color-calm: #E8F4FD;
  --h2ww-space-gentle: 16px;
  --h2ww-border-radius-soft: 8px;
}
```

---

## 📊 Design Metrics

- **Cognitive Load Score**: Target ≤ 6/10
- **Accessibility Score**: WCAG AA (≥ 95%)
- **Anxiety Impact**: Measured via user testing
- **Performance**: < 50KB bundle size

---

[← Back to Root](../README.md)