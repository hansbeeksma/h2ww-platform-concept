# 🏗️ Implementation

All executable code organized by component and functionality.

## 📁 Implementation Structure

### 🔌 [Figma Plugin](./figma-plugin/)
Complete Figma plugin implementation for anxiety-aware design token extraction and component generation.

**Key Features:**
- Design token extraction from Figma variables
- Component detection and analysis
- Anxiety-aware validation
- Real-time JSON preview
- Batch export capabilities

### 🎨 [Design System](./design-system/)
Implementation of the H2WW anxiety-aware design system including tokens, components, and React implementation.

**Components:**
- Design tokens (colors, typography, spacing)
- React component library
- Component documentation
- Usage examples

### 🌐 [Platform Core](./platform-core/) *(Future)*
Core platform implementation for the H2WW learning and community platform.

---

## 🚀 Quick Start

### Figma Plugin Development
```bash
cd figma-plugin
npm install
npm run build
npm run dev
```

### Design System Development
```bash
cd design-system
npm install
npm run build
npm run storybook
```

## 🔧 Development Standards

- **TypeScript** for all new code
- **ESLint + Prettier** for code formatting
- **Jest** for unit testing
- **Semantic versioning** for releases
- **Conventional commits** for git messages

## 📦 Build & Deployment

Each implementation has its own build process:
- **Figma Plugin**: Webpack bundle for Figma
- **Design System**: NPM package distribution
- **Platform Core**: Docker containerization

---

## 🧪 Testing Strategy

- **Unit Tests**: Jest + Testing Library
- **Integration Tests**: Component interaction testing
- **Visual Tests**: Chromatic visual regression
- **Accessibility Tests**: Jest-axe + manual testing
- **Anxiety Impact Tests**: User testing validation

---

[← Back to Root](../README.md)