# H2WW Platform - Claude Code Configuration

## 🎯 Project Overview

**Project**: H2WW (HowToWorkWith) - AI Learning Platform
**Type**: Design System & AI Platform Development
**Status**: Active Development - Phase 1 Complete
**Repository**: https://github.com/hansbeeksma/H2WW-Platform
**Location**: `/Users/samswaab/Development/projects/active/H2WW-Platform`

---

## 🎨 Core Mission & Philosophy

### Vision Statement
"Wij maken AI begrijpelijk, toepasbaar en menselijk"

### Design Philosophy
- **Bauhaus-Inspired**: Geometric forms as conceptual metaphors
- **Itten Color Theory**: Functional color psychology for AI learning
- **Research-Driven**: Based on Human-AI Interaction Research
- **Accessibility First**: WCAG 2.1 AA compliance throughout

### Target Users
1. **Learning Explorers** (Novice) - Need guidance, examples, safety
2. **Skill Builders** (Intermediate) - Need practice, feedback, challenges
3. **Innovation Drivers** (Expert) - Need efficiency, customization, advanced tools

---

## 📁 Project Structure & Standards

### Key Directories
```
H2WW-Platform/
├── concept/                    # Core concept documentation
├── design-system/              # Complete design system (200+ components)
│   ├── tokens/                 # Design tokens & variables
│   ├── react-implementation/   # Apple HIG React component library
│   │   ├── src/
│   │   │   ├── components/     # Button, Input, Card, Navigation, Progress
│   │   │   └── lib/           # voice-control.ts, accessibility-labels.ts
│   │   └── index.ts           # Component exports
│   └── documentation/          # Design guidelines
├── figma-plugin/               # Apple HIG Figma plugin implementation
│   ├── src/
│   │   ├── code.ts            # Apple HIG component factory
│   │   ├── code.js            # Compiled plugin code
│   │   ├── ui.html            # Learning state selector interface
│   │   └── manifest.json      # Plugin configuration
│   └── docs/                   # Plugin documentation
├── documentation/              # General project documentation
└── archive/                    # Historical materials
```

### Code Standards
- **Component-driven development** - Everything is a reusable component
- **Token-based styling** - Use design tokens consistently
- **Accessibility by default** - All components WCAG 2.1 AA compliant
- **Performance-optimized** - Consider loading, rendering, bundle size
- **TypeScript preferred** - Type safety for complex systems

---

## 🎨 Design System Knowledge

### Apple HIG Enhanced Component Categories (200+ total)
1. **Visual Language** - Apple HIG colors, Typography, SF Symbols, Motion, Space
2. **UI Elements** - Apple compliant buttons (44px+ touch targets), Forms, Layout
3. **UI Components** - Navigation, Content, Data, Media, Social, Status
4. **UI Patterns** - Authentication, Database operations, Form structures
5. **Page Templates** - Home, Dashboard, Article, Gallery templates
6. **Layout Systems** - Responsive grids, Breakpoints, Paneling
7. **Editorial Guidelines** - Voice & tone, Writing standards
8. **Branding** - Identity, Logo usage, Partnership guidelines
9. **Practices & Standards** - Apple HIG accessibility, Performance, SEO

### Apple HIG Compliance Features
- **Touch Targets**: Minimum 44px (Apple HIG requirement)
- **Color Contrast**: 7:1 ratio (WCAG AAA enhanced)
- **SF Symbols**: Complete icon system integration
- **Voice Control**: Web Speech API implementation
- **Haptic Feedback**: Vibration API for interactions
- **Focus Management**: Comprehensive keyboard navigation
- **Screen Reader**: VoiceOver optimized ARIA labels

### Color System (Apple HIG + Itten-based)
**Apple System Colors for Learning States**:
- **Discovery**: #FFCC00 (Apple System Yellow) - Curiosity, exploration
- **Fundamentals**: #007AFF (Apple System Blue) - Trust, learning foundation
- **Mastery**: #AF52DE (Apple System Purple) - Advanced expertise, innovation

**Dark Mode Adaptive Colors**:
- **Discovery Dark**: #FFD60A (Apple System Yellow Dark)
- **Fundamentals Dark**: #0A84FF (Apple System Blue Dark)
- **Mastery Dark**: #BF5AF2 (Apple System Purple Dark)

**High Contrast Support**:
- Enhanced contrast ratios for accessibility
- Automatic color adaptation based on user preferences

---

## 🛠 Development Workflows

### When Working on Components
1. **Follow Apple HIG standards** - 44px minimum touch targets, proper contrast
2. **Check existing patterns** - Review design-system/ directory first
3. **Follow token system** - Use Apple system colors and predefined tokens
4. **Consider all user levels** - Novice, Intermediate, Expert experience
5. **Include enhanced accessibility** - VoiceOver, keyboard navigation, ARIA labels
6. **Test across devices** - Ensure Apple HIG compliance on all platforms
7. **Document decisions** - Update relevant docs with rationale

### When Working on Figma Plugin
1. **Test with real design system** - Use actual H2WW components
2. **Validate token application** - Ensure automatic token usage works
3. **Consider component factory** - Extensible architecture for new components
4. **Update plugin documentation** - Keep docs/ folder current

### When Adding Features
1. **Research-first approach** - Reference Human-AI interaction principles
2. **User-centered design** - Consider all three user personas
3. **Progressive disclosure** - Support learning journey from novice to expert
4. **Maintain consistency** - Follow established patterns and conventions

---

## 🔧 Technical Configuration

### Git Workflow
- **Main branch**: `main` (production-ready)
- **Feature branches**: `feature/description` for new development
- **Commit messages**: Clear, descriptive, include design rationale
- **Always test before commit** - Run available tests and linting

### Build & Testing
- **Check for build scripts** in package.json files
- **Run linting** if available (npm run lint, npm run typecheck)
- **Test components** individually before integration
- **Validate accessibility** using available tools

### File Naming Conventions
- **Components**: PascalCase (Button.tsx, ColorPalette.tsx)
- **Utilities**: camelCase (designTokens.ts, colorUtils.ts)
- **Documentation**: kebab-case (design-system-overview.md)
- **Directories**: lowercase with hyphens (design-system/, figma-plugin/)

---

## 📚 Key References & Resources

### Research Foundation
- Human-AI Interaction Research principles
- Conversational Design Patterns
- Beyond Conversational AI frameworks
- Privacy harm prevention (18 privacy risks framework)

### Design References
- **Bauhaus Design Principles** - Geometric forms and functional design
- **Johannes Itten Color Theory** - Color psychology for learning states
- **Apple Human Interface Guidelines** - Industry-leading accessibility and interaction patterns
- **WCAG 2.1 AAA Standards** - Enhanced accessibility compliance (7:1 contrast ratio)
- **SF Symbols Integration** - Apple's comprehensive icon system

### External Documentation
- [Design System Documentation](./design-system/documentation/)
- [Figma Plugin Guide](./figma-plugin/docs/)
- [Research Foundation](./concept/h2ww-concept-export.md)

---

## 🎯 Current Development Focus

### Phase 1: Foundation ✅ (Completed)
- [x] Design system architecture
- [x] Core design tokens
- [x] Basic component library
- [x] Figma plugin MVP
- [x] GitHub repository setup

### Phase 2: Apple HIG Integration ✅ (Completed)
- [x] Apple HIG compliant component library
- [x] SF Symbols integration system
- [x] Voice control and accessibility features
- [x] Dark mode and high contrast support
- [x] Complete React component implementations
- [x] Figma plugin with Apple HIG components and learning states
- [x] Voice control toggle and haptic feedback integration
- [x] Learning state selector (Discovery, Fundamentals, Mastery)

### Phase 3: Enhancement 🟡 (In Progress)
- [ ] Advanced component variants
- [ ] Animation system implementation
- [ ] Developer handoff tools
- [ ] Documentation site creation

### Phase 4: Advanced Integration 🟡 (Planned)
- [ ] Vue component library development
- [ ] Advanced design-to-code automation
- [ ] Live design sync capabilities
- [ ] Multi-platform component generation

---

## 💡 AI Assistant Guidelines

### When I Ask for Help
- **Consider user personas** - Which user level am I designing for?
- **Reference design system** - Always check existing components first
- **Apply research principles** - Use Human-AI interaction best practices
- **Maintain consistency** - Follow established patterns and tokens
- **Document reasoning** - Explain design and technical decisions

### Preferred Communication Style
- **Research-backed suggestions** - Reference established HCI principles
- **Component-thinking** - Break down problems into reusable parts
- **Progressive complexity** - Start simple, build up to advanced features
- **Accessibility-minded** - Always consider inclusive design
- **Performance-conscious** - Consider impact on loading and user experience

### Project Context Reminders
- This is a **learning platform** - focus on educational experience
- This is a **design system** - consistency and reusability are key
- This is **Bauhaus-inspired** - geometric, functional, purposeful design
- This serves **three user levels** - novice, intermediate, expert
- This is **research-driven** - decisions should be evidence-based

---

## 🔄 Continuous Improvement

This CLAUDE.md file should be updated whenever:
- New components are added to the design system
- Development workflows are refined
- New research insights are incorporated
- Technical architecture evolves
- User feedback influences design decisions

---

*🎨 Generated for H2WW Design System - Where Humans and AI Unite in Learning*