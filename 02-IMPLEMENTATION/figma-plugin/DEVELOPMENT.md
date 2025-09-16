# H2WW Component Library - Development Guide

Complete guide for developing, testing, and deploying the H2WW Figma Plugin.

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (required)
- **npm** or **yarn**
- **Figma Desktop App** (for testing)
- **TypeScript** knowledge (recommended)
- **React** experience (helpful)

### Installation
```bash
# Clone the repository
git clone https://github.com/hansbeeksma/h2ww-platform-concept.git
cd h2ww-platform-concept/figma-plugin

# Install dependencies
npm install

# Start development server
npm run dev
```

### First Test
1. Open **Figma Desktop**
2. Go to **Plugins → Development → Import plugin from manifest**
3. Select `manifest.json` from the plugin folder
4. Find "H2WW Component Library" in your plugins
5. Run it! 🎉

## 🏗️ Development Workflow

### Development Commands
```bash
# Development mode (watch for changes)
npm run dev

# Production build
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Clean build
rm -rf dist && npm run build
```

### Hot Reload Development
1. Run `npm run dev` in terminal
2. Make changes to source files
3. In Figma: **Plugins → Development → Hot reload plugin**
4. Changes appear immediately! ⚡

## 📁 Project Structure

```
figma-plugin/
├── src/
│   ├── main.ts              # Plugin main thread (Figma API)
│   ├── ui.tsx               # React UI interface
│   ├── ui.html              # HTML template
│   ├── components/          # UI components
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   │   ├── designTokens.ts  # Design system tokens
│   │   └── errorHandler.ts  # Error handling
│   └── types/               # TypeScript definitions
├── dist/                    # Build output (auto-generated)
├── node_modules/           # Dependencies (gitignored)
├── manifest.json           # Plugin configuration
├── package.json            # Project configuration
├── tsconfig.json           # TypeScript config
├── webpack.config.js       # Build configuration
└── README.md               # Plugin documentation
```

## 🎨 Adding New Components

### Step 1: Define Component Data
Add your component to `src/ui.tsx`:

```typescript
const newComponent: AnxietyAwareComponent = {
  id: 'my-new-component',
  name: 'My New Component',
  category: 'atom', // or 'molecule', 'organism'
  variants: [
    {
      name: 'Default',
      properties: { variant: 'default' },
      anxietyLevel: 'low',
      accessibilityScore: 95
    }
  ],
  anxietyReduction: [
    'Clear visual hierarchy',
    'Adequate white space',
    'Gentle color transitions'
  ],
  accessibilityFeatures: [
    'WCAG AA compliant contrast',
    'Keyboard navigation support',
    'Screen reader optimized'
  ],
  usageGuidelines: 'Use for...'
};
```

### Step 2: Add Creation Logic
Extend `src/main.ts` with component creation:

```typescript
async function createMyNewComponent(parent: FrameNode, variants: any[]) {
  // Create component frame
  const component = figma.createFrame();
  component.name = 'My New Component';

  // Apply anxiety-aware styling
  component.fills = [{
    type: 'SOLID',
    color: hexToRgb(calmConfidenceTokens.colors.primary.light)
  }];

  // Add accessibility features
  component.cornerRadius = 6;
  // ... more component logic

  parent.appendChild(component);
}
```

### Step 3: Test Your Component
1. Build: `npm run build`
2. Reload plugin in Figma
3. Test component creation
4. Verify anxiety-reducing features
5. Check accessibility compliance

## 🤖 AI Features Development

### Adding New AI Analysis
Extend the analysis engine in `src/main.ts`:

```typescript
function analyzeForMyFeature(nodes: readonly SceneNode[]): string[] {
  const issues: string[] = [];

  nodes.forEach(node => {
    // Your analysis logic here
    if (/* some condition */) {
      issues.push('Your issue description');
    }
  });

  return issues;
}
```

### AI Recommendation System
Add recommendations in `generateRecommendations()`:

```typescript
function generateRecommendations(nodes: readonly SceneNode[]): AIRecommendation[] {
  const recommendations = [];

  // Your recommendation logic
  recommendations.push({
    type: 'anxiety',
    severity: 'medium',
    description: 'Consider using calmer colors',
    solution: 'Apply primary blue (#4A90E2) for trust-building',
    confidence: 0.8
  });

  return recommendations;
}
```

## ♿ Accessibility Features

### Adding New Accessibility Checks
Extend `checkAccessibilityIssues()` in `src/main.ts`:

```typescript
function checkMyAccessibilityFeature(nodes: readonly SceneNode[]): string[] {
  const issues: string[] = [];

  nodes.forEach(node => {
    // Your accessibility check logic
    if (/* fails accessibility requirement */) {
      issues.push('Accessibility issue description');
    }
  });

  return issues;
}
```

### Color Contrast Validation
```typescript
function checkColorContrast(foreground: RGB, background: RGB): number {
  // Calculate relative luminance
  const getLuminance = (color: RGB): number => {
    const sRGB = [color.r, color.g, color.b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);

  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
```

## 🎯 Design Tokens

### Adding New Design Tokens
Extend `src/utils/designTokens.ts`:

```typescript
export const calmConfidenceTokens: DesignTokens = {
  colors: {
    // Add new color categories
    myNewColors: {
      primary: '#YOUR_COLOR',
      secondary: '#YOUR_COLOR'
    },
    // ... existing colors
  },
  // Add new token categories
  myNewTokens: {
    value1: 'token-value',
    value2: 'token-value'
  }
};
```

### Using Tokens in Components
```typescript
// In component creation
component.fills = [{
  type: 'SOLID',
  color: hexToRgb(calmConfidenceTokens.colors.myNewColors.primary)
}];
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Plugin loads without errors
- [ ] All tabs (Library, Tokens, AI, A11y) work
- [ ] Components create successfully
- [ ] AI analysis provides helpful feedback
- [ ] Accessibility checks pass
- [ ] Error handling works gracefully
- [ ] No console errors in dev tools

### Testing AI Features
```typescript
// Test cognitive load analysis
const testNodes = figma.currentPage.findAll(node =>
  node.type === 'FRAME' && node.children.length > 7
);

const analysis = calculateCognitiveLoad(testNodes);
console.log('Cognitive load score:', analysis);
```

### Testing Accessibility
```typescript
// Test color contrast
const foreground = { r: 0.1, g: 0.1, b: 0.1 }; // Dark text
const background = { r: 1, g: 1, b: 1 };       // White background
const contrast = checkColorContrast(foreground, background);
console.log('Contrast ratio:', contrast); // Should be > 4.5
```

## 🚨 Error Handling

### Using Error Handler
```typescript
import { withErrorHandling, createSelectionRequiredError } from '@/utils/errorHandler';

// Async operations
await withErrorHandling(async () => {
  // Your async code here
  if (!figma.currentPage.selection.length) {
    throw createSelectionRequiredError();
  }
}, { operation: 'create-component' });

// Sync operations
import { withSyncErrorHandling } from '@/utils/errorHandler';

withSyncErrorHandling(() => {
  // Your sync code here
}, { operation: 'token-application' });
```

### Custom Error Types
```typescript
import { H2WWPluginError, ERROR_CODES } from '@/utils/errorHandler';

throw new H2WWPluginError(
  ERROR_CODES.COMPONENT_CREATION_FAILED,
  'Failed to create button component',
  'medium',
  { componentType: 'button', reason: 'Invalid parameters' }
);
```

## 📦 Building & Deployment

### Production Build
```bash
# Clean build
rm -rf dist
npm run build

# Verify build
ls -la dist/
# Should show: main.js, ui.js, ui.html
```

### Plugin Submission Preparation
```bash
# 1. Update version in package.json
npm version patch  # or minor/major

# 2. Build production version
npm run build

# 3. Test thoroughly
# 4. Create submission package
zip -r h2ww-plugin.zip manifest.json dist/ README.md

# 5. Submit to Figma Community
```

### Version Management
```json
{
  "name": "h2ww-component-library",
  "version": "1.0.0",  // Update this for releases
  // ... rest of package.json
}
```

## 🔧 Troubleshooting

### Common Issues

#### Plugin Won't Load
- Check `manifest.json` syntax
- Verify `dist/` folder exists and contains built files
- Check console for TypeScript errors
- Ensure all required files are present

#### TypeScript Errors
```bash
# Check types
npm run type-check

# Common fixes
npm install @figma/plugin-typings --save-dev
```

#### Build Failures
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

#### Plugin Crashes
- Check browser dev tools (F12) for errors
- Look for unhandled promises
- Verify Figma API usage patterns
- Check error handler logs

### Debug Mode
Enable detailed logging:

```typescript
// In main.ts
const DEBUG = true;

if (DEBUG) {
  console.log('Plugin state:', { selection, analysis, tokens });
}
```

### Performance Issues
- Check for memory leaks in component creation
- Optimize large dataset processing
- Use `figma.ui.postMessage` efficiently
- Avoid blocking the main thread

## 📊 Analytics & Monitoring

### Usage Tracking
```typescript
// Track component usage
function trackComponentUsage(componentType: string) {
  console.log('Component used:', componentType, new Date());
  // Add your analytics logic here
}
```

### Error Monitoring
```typescript
// Monitor error patterns
const errorHandler = ErrorHandler.getInstance();
const recentErrors = errorHandler.getErrorLog();
console.log('Recent errors:', recentErrors);
```

## 🌟 Best Practices

### Anxiety-Aware Development
1. **Gentle Error Messages**: Always use encouraging, non-intimidating language
2. **Progressive Disclosure**: Don't overwhelm users with options
3. **Safety Nets**: Provide undo/cancel options
4. **Clear Feedback**: Show what's happening during operations
5. **Accessibility First**: Design for all users from the start

### Code Quality
1. **Type Safety**: Use TypeScript for everything
2. **Error Handling**: Wrap all operations in try-catch
3. **Performance**: Avoid blocking operations
4. **Testing**: Test all features thoroughly
5. **Documentation**: Comment complex logic

### Figma API Best Practices
1. **Selection Handling**: Always check for valid selection
2. **Node Types**: Verify node types before operations
3. **Memory Management**: Don't hold references to Figma nodes
4. **Async Operations**: Use promises properly
5. **UI Communication**: Use postMessage efficiently

---

## 📞 Getting Help

- **Figma Plugin API**: [https://www.figma.com/plugin-docs/](https://www.figma.com/plugin-docs/)
- **TypeScript**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- **React**: [https://react.dev/](https://react.dev/)
- **H2WW Documentation**: Check main repository docs/

---

*Happy coding! Remember: we're building tools that reduce anxiety and build confidence! 💝*