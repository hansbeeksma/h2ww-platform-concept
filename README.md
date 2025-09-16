# 🤖💙 H2WW Platform - How to Work With AI

> An anxiety-aware design system and platform that transforms AI anxiety into confidence through empathetic, inclusive design.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Design System](https://img.shields.io/badge/Design%20System-Anxiety%20Aware-green.svg)]()
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%20AA+-purple.svg)]()

## 🎯 Mission

**Transform AI anxiety into confidence** through empathetic design that adapts to human emotional needs, creating calm and supportive digital experiences.

---

## 📁 Repository Structure

This repository is semantically organized for clarity and ease of navigation:

### 📚 [01-DOCUMENTATION](./01-DOCUMENTATION/)
Complete project documentation organized by domain
- **[Business](./01-DOCUMENTATION/business/)** - Strategy, market analysis, stakeholders
- **[Product](./01-DOCUMENTATION/product/)** - UX design, validation, product specs
- **[Technical](./01-DOCUMENTATION/technical/)** - Architecture, APIs, implementation
- **[Specifications](./01-DOCUMENTATION/specifications/)** - Component and feature specs

### 🏗️ [02-IMPLEMENTATION](./02-IMPLEMENTATION/)
All executable code organized by component
- **[Figma Plugin](./02-IMPLEMENTATION/figma-plugin/)** - Design token extraction plugin
- **[Design System](./02-IMPLEMENTATION/design-system/)** - React component library
- **[Platform Core](./02-IMPLEMENTATION/platform-core/)** - Core platform implementation *(Future)*

### 🎨 [03-DESIGN-SYSTEM](./03-DESIGN-SYSTEM/)
Complete anxiety-aware design system
- **[Tokens](./03-DESIGN-SYSTEM/tokens/)** - Colors, typography, spacing, shadows
- **[Components](./03-DESIGN-SYSTEM/components/)** - Primitives, components, patterns
- **[Guidelines](./03-DESIGN-SYSTEM/guidelines/)** - Accessibility and design principles
- **[Documentation](./03-DESIGN-SYSTEM/documentation/)** - Usage guides and examples

### 💡 [04-EXAMPLES](./04-EXAMPLES/)
Practical examples and integration guides
- **[Integrations](./04-EXAMPLES/integrations/)** - Framework integration examples
- **[Use Cases](./04-EXAMPLES/use-cases/)** - Real-world implementation scenarios
- **[Tutorials](./04-EXAMPLES/tutorials/)** - Step-by-step learning guides

---

## ✨ Key Features

### 🧠 Anxiety-Aware Design
- **Cognitive Load Assessment** - Measure and minimize mental effort
- **Gentle Interactions** - No jarring transitions or overwhelming feedback
- **Error Forgiveness** - Supportive error handling and recovery options
- **Progressive Disclosure** - Information revealed at user's comfort level

### ♿ Accessibility by Default
- **WCAG AA+ Compliance** - Exceeds standard accessibility requirements
- **Keyboard Navigation** - Full keyboard accessibility across all components
- **Screen Reader Optimized** - Semantic markup and comprehensive ARIA support
- **Color Contrast** - 4.5:1 minimum ratio with anxiety-optimized palette

### 🔧 Developer Experience
- **TypeScript First** - Type-safe development with comprehensive interfaces
- **Design Token System** - JSON-based tokens for consistent styling
- **Component Library** - React components with anxiety-aware props
- **Figma Integration** - Seamless design-to-code workflow

### 🎨 Figma Plugin
- **Token Extraction** - Automatic design token export from Figma
- **Component Analysis** - Anxiety impact assessment for designs
- **Real-time Preview** - Live JSON preview of component definitions
- **Batch Export** - Efficient processing of large design files

---

## 🚀 Quick Start

### Using the Design System
```bash
npm install @h2ww/design-system
```

```jsx
import { Button, Card, Theme } from '@h2ww/design-system'

function App() {
  return (
    <Theme anxietyLevel="low">
      <Card>
        <Button
          variant="gentle"
          loadingBehavior="supportive"
          errorRecovery="forgiving"
        >
          Start Learning
        </Button>
      </Card>
    </Theme>
  )
}
```

### Figma Plugin Development
```bash
cd 02-IMPLEMENTATION/figma-plugin
npm install
npm run build
```

Import `manifest.json` in Figma Desktop → Development → Import plugin from manifest

### Exploring Documentation
Start with [01-DOCUMENTATION](./01-DOCUMENTATION/) for comprehensive project information, or jump to specific areas:
- [Product Overview](./01-DOCUMENTATION/product/product-design-document.md)
- [Figma Plugin Guide](./01-DOCUMENTATION/specifications/figma-plugin-specs.md)
- [Design System Guidelines](./03-DESIGN-SYSTEM/guidelines/)

---

## 🧠 Design Philosophy

### Anxiety-First Approach
Every design decision considers emotional impact:
1. **Calm Before Function** - Emotional comfort takes precedence
2. **Gentle Progression** - Users advance at their own pace
3. **Safety Nets** - Multiple recovery options for every action
4. **Celebrate Success** - Acknowledge user achievements supportively

### Inclusive by Design
Built for everyone, optimized for anxiety:
- **Multiple Learning Styles** - Visual, auditory, kinesthetic support
- **Diverse Anxiety Levels** - From high-functioning to severe anxiety
- **Cultural Sensitivity** - Respectful of different backgrounds and experiences
- **Technology Comfort** - From beginners to advanced users

---

## 📊 Project Status

| Component | Status | Version | Coverage |
|-----------|--------|---------|----------|
| Design System | ✅ Active | v1.0.0 | 90%+ |
| Figma Plugin | ✅ Active | v0.8.0 | 85%+ |
| Documentation | ✅ Complete | v1.0.0 | 100% |
| Platform Core | 🚧 Planning | v0.1.0 | 10% |

---

## 🤝 Contributing

We welcome contributions that align with our anxiety-aware design principles. Please read our contributing guidelines and ensure all contributions:

- Consider emotional impact on users with anxiety
- Meet WCAG AA+ accessibility standards
- Include comprehensive testing
- Follow our semantic commit conventions

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details.

---

## 🔗 Links

- **Design System Documentation**: [03-DESIGN-SYSTEM](./03-DESIGN-SYSTEM/)
- **Figma Plugin**: [02-IMPLEMENTATION/figma-plugin](./02-IMPLEMENTATION/figma-plugin/)
- **Business Strategy**: [01-DOCUMENTATION/business](./01-DOCUMENTATION/business/)
- **Technical Specs**: [01-DOCUMENTATION/technical](./01-DOCUMENTATION/technical/)

---

**Last Updated:** January 2025 | **Maintained by:** H2WW Team

*Building technology that understands and supports human emotional needs.*