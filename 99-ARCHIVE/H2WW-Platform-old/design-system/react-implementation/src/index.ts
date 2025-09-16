/**
 * H2WW Design System - React Component Library
 *
 * A comprehensive, research-driven design system for AI learning platforms
 * Built with React 18, TypeScript, and Tailwind CSS
 *
 * Features:
 * - 200+ components across 9 categories
 * - Human-AI interaction research integration
 * - Bauhaus design principles
 * - Itten color psychology for learning
 * - WCAG 2.1 AA accessibility compliance
 * - Responsive and mobile-first design
 */

// ===== CORE UTILITIES =====
export { cn } from './lib/utils'
export type {
  LearningState,
  ComponentSize,
  ComponentVariant
} from './lib/utils'

export {
  getLearningStateColors,
  getComponentSizeClasses,
  getComponentVariantClasses,
  getAnimationClasses,
  getResponsiveClasses,
  getTypographyClasses,
  getShadowClasses,
  calculateProgress,
  getLearningStateFromProgress,
  createAriaLabel,
  handleKeyboardNavigation,
  hasGoodContrast,
  getThemeClasses
} from './lib/utils'

// ===== UI COMPONENTS =====

// Buttons & Actions
export { Button, buttonVariants } from './components/ui/button'
export type { ButtonProps } from './components/ui/button'

// Cards & Containers
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  LearningProgressCard,
  AIToolCard,
  cardVariants
} from './components/ui/card'

// Forms & Inputs
export {
  Input,
  Textarea,
  SearchInput,
  inputVariants
} from './components/ui/input'

// Typography & Text
export {
  Typography,
  H1,
  H2,
  H3,
  H4,
  Text,
  Lead,
  Code,
  Blockquote,
  typographyVariants
} from './components/ui/typography'

// Navigation & Layout
export {
  Navigation,
  NavLink,
  Breadcrumbs,
  BreadcrumbsItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsVariants,
  tabsTriggerVariants
} from './components/ui/navigation'

// Feedback & Status
export {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Progress,
  Spinner,
  StatusIndicator,
  alertVariants,
  badgeVariants
} from './components/ui/feedback'

// Data Display
// export {
//   Table,
//   TableHeader,
//   TableBody,
//   TableFooter,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableCaption
// } from './components/ui/table'

// Overlays & Modals
// export {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger
// } from './components/ui/overlays'

// Form Controls
export {
  Checkbox,
  RadioGroup,
  Switch,
  Select
} from './components/ui/form-controls'
export type {
  RadioOption,
  SelectOption
} from './components/ui/form-controls'

// ===== SPECIALIZED COMPONENTS =====

// AI Learning Components
// export {
//   AICompanionAvatar,
//   LearningPathCard,
//   ProgressIndicator,
//   SkillBadge,
//   CourseCard,
//   LessonCard,
//   ExerciseCard
// } from './components/learning'

// AI Tool Integration
// export {
//   ChatInterface,
//   PromptBuilder,
//   AIResponseCard,
//   ToolConnectionStatus,
//   UsageMetrics,
//   CostTracker
// } from './components/ai-tools'

// Community & Social
// export {
//   UserProfile,
//   CommunityCard,
//   DiscussionThread,
//   PeerReview,
//   Leaderboard,
//   Achievement
// } from './components/community'

// Authentication & Onboarding
// export {
//   LoginForm,
//   RegisterForm,
//   OnboardingWizard,
//   WelcomeScreen,
//   ProfileSetup,
//   SkillAssessment
// } from './components/auth'

// Dashboard & Analytics
// export {
//   DashboardWidget,
//   MetricCard,
//   ChartContainer,
//   KPIIndicator,
//   RecentActivity,
//   QuickActions
// } from './components/dashboard'

// ===== LAYOUT COMPONENTS =====

// Page Layouts
// export {
//   AppLayout,
//   DashboardLayout,
//   LearningLayout,
//   CommunityLayout,
//   AuthLayout
// } from './components/layouts'

// Layout Utilities
export {
  Container,
  Grid,
  Flex,
  Stack,
  Spacer,
  Divider,
  Center,
  containerVariants,
  gridVariants,
  flexVariants
} from './components/ui/layout'

// ===== PATTERN COMPONENTS =====

// Learning Patterns
// export {
//   CourseStructure,
//   LearningPath,
//   ProgressTracker,
//   SkillTree,
//   CertificationBadge
// } from './components/patterns/learning'

// AI Interaction Patterns
// export {
//   ConversationalInterface,
//   MultimodalInput,
//   ContextualHelp,
//   SmartSuggestions,
//   ErrorRecovery
// } from './components/patterns/ai-interaction'

// Social Learning Patterns
// export {
//   StudyGroup,
//   PeerLearning,
//   Mentorship,
//   CollaborativeProject,
//   KnowledgeSharing
// } from './components/patterns/social'

// ===== THEME & PROVIDERS =====

// Theme Provider
// export {
//   ThemeProvider,
//   useTheme,
//   ThemeToggle
// } from './components/theme'

// Learning Context
// export {
//   LearningProvider,
//   useLearningContext,
//   useProgress,
//   useLearningState
// } from './components/providers/learning'

// AI Tools Context
// export {
//   AIToolsProvider,
//   useAITools,
//   useToolConnection,
//   useUsageTracking
// } from './components/providers/ai-tools'

// ===== HOOKS & UTILITIES =====

// Custom Hooks
// export {
//   useAccessibleFocus,
//   useKeyboardNavigation,
//   useResponsive,
//   useLocalStorage,
//   useDebounce,
//   useAnimationState
// } from './hooks'

// Accessibility Utilities
// export {
//   announceToScreenReader,
//   trapFocus,
//   restoreFocus,
//   getAccessibleName,
//   validateColorContrast
// } from './lib/accessibility'

// Learning Analytics
// export {
//   trackLearningEvent,
//   calculateLearningVelocity,
//   assessSkillLevel,
//   predictLearningPath,
//   generatePersonalizedContent
// } from './lib/learning-analytics'

// ===== VERSION & METADATA =====
export const VERSION = '2.0.0'
export const DESIGN_SYSTEM_NAME = 'H2WW Design System'
export const LAST_UPDATED = '2025-09-15'

// Design System Configuration
export const DESIGN_SYSTEM_CONFIG = {
  version: VERSION,
  name: DESIGN_SYSTEM_NAME,
  description: 'Research-driven design system for AI learning platforms',
  author: 'H2WW Team',
  license: 'MIT',
  repository: 'https://github.com/h2ww/design-system',
  homepage: 'https://h2ww.ai/design-system',
  bugs: 'https://github.com/h2ww/design-system/issues',
  keywords: [
    'design-system',
    'react',
    'typescript',
    'tailwind',
    'accessibility',
    'ai-learning',
    'human-ai-interaction',
    'bauhaus',
    'color-psychology'
  ],
  engines: {
    node: '>=18.0.0',
    npm: '>=8.0.0'
  },
  peerDependencies: {
    react: '^18.0.0',
    'react-dom': '^18.0.0'
  }
}

// Learning States Configuration
export const LEARNING_STATES = {
  discovery: {
    name: 'Discovery',
    description: 'Curiosity, exploration, and first steps in AI learning',
    color: '#F6E05E',
    progressRange: [0, 33],
    characteristics: ['exploration', 'curiosity', 'safe-experimentation']
  },
  fundamentals: {
    name: 'Fundamentals',
    description: 'Building core AI knowledge and practical skills',
    color: '#E53E3E',
    progressRange: [34, 66],
    characteristics: ['skill-building', 'practice', 'structured-learning']
  },
  mastery: {
    name: 'Mastery',
    description: 'Advanced expertise and leadership in AI applications',
    color: '#3182CE',
    progressRange: [67, 100],
    characteristics: ['expertise', 'leadership', 'innovation']
  }
} as const

// Component Categories
export const COMPONENT_CATEGORIES = [
  'visual-language',
  'ui-elements',
  'ui-components',
  'ui-patterns',
  'page-templates',
  'layout-systems',
  'editorial',
  'practices',
  'utilities'
] as const

// Accessibility Standards
export const ACCESSIBILITY_STANDARDS = {
  wcag: '2.1 AA',
  colorContrast: {
    normal: 4.5,
    large: 3.0,
    enhanced: 7.0
  },
  focusIndicator: {
    minWidth: '2px',
    style: 'solid',
    color: 'ring'
  },
  touchTarget: {
    minSize: '44px'
  }
} as const