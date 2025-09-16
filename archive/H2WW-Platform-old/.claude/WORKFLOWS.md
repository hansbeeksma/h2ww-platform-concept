# H2WW Development Workflows

## 🎯 Claude Code Integration Guide

This document defines the complete "way of working" for the H2WW Platform using Claude Code's advanced features.

---

## 📋 Quick Reference

### Custom Agents Available
- `@design-system-agent` - Component design and token management
- `@figma-plugin-agent` - Plugin development and design-to-code workflows
- `@ai-learning-agent` - Human-AI interaction and learning experience design

### Custom Slash Commands
- `/new-component` - Create new design system components
- `/review-accessibility` - Comprehensive accessibility audits
- `/update-figma-plugin` - Plugin maintenance and updates

### Automation Hooks
- Pre-commit quality checks (design tokens, accessibility, documentation)
- Post-component creation (documentation templates, checklists)

---

## 🚀 Common Workflows

### 1. Creating New Components

#### Step 1: Use Custom Command
```
/new-component
```
Follow the guided workflow to specify component requirements.

#### Step 2: Agent Assistance
```
@design-system-agent Please help create [ComponentName] following H2WW standards
```

#### Step 3: Automatic Post-Processing
The post-component hook will:
- Create documentation template
- Generate accessibility checklist
- Remind about user persona considerations
- Suggest Figma plugin integration

### 2. Accessibility Reviews

#### Comprehensive Review
```
/review-accessibility
```
Specify the component or feature to review.

#### Agent-Assisted Review
```
@design-system-agent Please review [ComponentName] for WCAG 2.1 AA compliance
```

### 3. Figma Plugin Development

#### Plugin Updates
```
/update-figma-plugin
```
Follow guided workflow for plugin changes.

#### Agent Assistance
```
@figma-plugin-agent Help me add [ComponentName] to the plugin component factory
```

### 4. AI Learning Experience Design

#### Learning Workflow Design
```
@ai-learning-agent Design a learning workflow for [specific AI concept] supporting all three user personas
```

#### Research Application
```
@ai-learning-agent Apply Human-AI interaction research to improve [specific feature]
```

---

## 🎨 Design System Workflows

### Component Development Process

#### 1. Planning Phase
- Review existing components in design-system/
- Check design tokens in design-system/tokens/
- Consider user personas (Learning Explorers, Skill Builders, Innovation Drivers)
- Reference Bauhaus principles and Itten color theory

#### 2. Development Phase
- Use `/new-component` command for guided creation
- Apply design tokens consistently
- Implement accessibility from start (WCAG 2.1 AA)
- Test with all three user personas

#### 3. Integration Phase
- Update component documentation
- Add to Figma plugin if applicable
- Test design-to-code workflow
- Validate token application

#### 4. Quality Assurance
- Run `/review-accessibility` for comprehensive audit
- Test keyboard navigation and screen readers
- Verify color contrast and visual hierarchy
- Validate across different devices and contexts

### Token Management Workflow

#### Token Updates
1. Modify tokens in `design-system/tokens/h2ww-complete-system.json`
2. Test impact across existing components
3. Update Figma plugin token definitions
4. Validate accessibility impact (especially color contrast)
5. Document token changes and rationale

#### Color Psychology Application
- **Primary Colors** (AI Concepts):
  - Red (#E53E3E) - AI Fundamentals
  - Yellow (#F6E05E) - Discovery
  - Blue (#3182CE) - Mastery
- **Secondary Colors** (Combined Applications):
  - Orange (#F97316) - Creativity
  - Green (#22C55E) - Growth
  - Purple (#8B5CF6) - Innovation

---

## 🔧 Figma Plugin Workflows

### Plugin Development Lifecycle

#### 1. Component Factory Updates
- Add new components to appropriate category (9 categories total)
- Implement token-driven generation
- Test component creation and customization
- Validate output matches React implementation

#### 2. Plugin Testing
- Test all 9 component categories
- Verify design token application
- Test plugin performance with large libraries
- Validate accessibility of generated components

#### 3. Documentation Updates
- Update plugin docs in `figma-plugin/docs/`
- Create usage examples
- Document new features or changes
- Synchronize with design system documentation

### Design-to-Code Pipeline

#### 1. Figma Design
- Use H2WW design tokens
- Apply Bauhaus geometric principles
- Consider all three user personas
- Follow accessibility guidelines

#### 2. Plugin Generation
- Generate components using plugin
- Verify token application accuracy
- Test component variations
- Export for development handoff

#### 3. Code Implementation
- Use plugin output as starting point
- Enhance with React-specific optimizations
- Add comprehensive accessibility features
- Integrate with existing design system

---

## 🧠 AI Learning Platform Workflows

### Learning Experience Design

#### 1. User Persona Analysis
- **Learning Explorers**: Provide safety, guidance, examples
- **Skill Builders**: Enable practice, feedback, challenges
- **Innovation Drivers**: Support efficiency, customization, mentoring

#### 2. Progressive Complexity
- Start with basic concepts and clear examples
- Build to intermediate challenges and practice
- Enable advanced customization and exploration
- Support peer learning and knowledge sharing

#### 3. Research Application
- Reference Human-AI interaction principles
- Address 5 major AI interface problems
- Implement trust-building mechanisms
- Apply privacy protection frameworks

### Conversational AI Integration

#### 1. Interface Design
- Address blank page problem with starter prompts
- Enable iteration with clear feedback mechanisms
- Optimize input-output clarity
- Provide scoping assistance
- Support personalization

#### 2. Trust Mechanisms
- Clearly communicate AI capabilities and limitations
- Provide transparency in AI decision-making
- Enable user control and customization
- Respect privacy boundaries

---

## 🔄 Quality Assurance Workflows

### Automated Quality Checks

#### Pre-commit Hook Features
- Design token consistency validation
- Basic accessibility pattern checking
- Component documentation verification
- Figma plugin alignment confirmation
- User persona consideration reminders

#### Continuous Integration
- Accessibility testing (if tools available)
- Design token validation
- Component library consistency
- Documentation completeness
- Cross-platform compatibility

### Manual Review Process

#### Design Review
- Bauhaus principle adherence
- Itten color theory application
- User persona accommodation
- Accessibility compliance
- Design system consistency

#### Code Review
- TypeScript type safety
- Design token usage
- Component reusability
- Performance optimization
- Documentation quality

---

## 📚 Documentation Standards

### Component Documentation
- Purpose and user persona fit
- Design principle application
- Usage examples for all personas
- Props and API documentation
- Accessibility considerations
- Research backing (if applicable)

### Workflow Documentation
- Step-by-step processes
- Decision-making rationale
- Research references
- Quality assurance steps
- Integration requirements

### Knowledge Management
- Regular updates to CLAUDE.md
- Agent knowledge updates
- Workflow refinements
- Research integration
- Team onboarding materials

---

## 🎯 Success Metrics

### Design System Health
- Component consistency scores
- Design token compliance
- Accessibility audit results
- User persona coverage
- Documentation completeness

### Development Efficiency
- Component creation speed
- Design-to-code workflow time
- Quality assurance automation
- Developer onboarding time
- Knowledge transfer effectiveness

### Learning Platform Success
- User progression through personas
- AI interaction effectiveness
- Learning outcome achievement
- User satisfaction across levels
- Research principle application

---

*🎨 Generated for H2WW Design System - Complete Way of Working with Claude Code*