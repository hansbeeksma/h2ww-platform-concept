/**
 * H2WW Design System - Complete React Components Export
 * Apple HIG compliant components with learning state support
 */

// Core Components
export {
  Button,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  LearningButton,
  IconButton,
  type ButtonProps
} from './Button'

export {
  Input,
  SearchInput,
  PasswordInput,
  EmailInput,
  NumberInput,
  LearningInput,
  type InputProps
} from './Input'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  LearningCard,
  ActionCard,
  StatCard,
  type CardProps
} from './Card'

export {
  Navigation,
  NavigationLink,
  Breadcrumb,
  TabNavigation,
  type NavigationProps,
  type NavigationLinkProps,
  type TabProps
} from './Navigation'

export {
  Progress,
  CircularProgress,
  StepProgress,
  LearningProgress,
  type ProgressProps,
  type CircularProgressProps,
  type StepProgressProps
} from './Progress'

// Icon System
export {
  SFSymbol,
  DiscoverySymbol,
  FundamentalsSymbol,
  MasterySymbol,
  NavigationSymbols,
  ActionSymbols,
  LearningSymbols,
  MediaSymbols,
  SystemSymbols,
  createSymbolComponent
} from './SFSymbol'

// Re-export SF Symbols types
export type {
  SFSymbolName,
  SFSymbolProps
} from '../lib/sf-symbols'

// Re-export Apple HIG utilities
export {
  hapticFeedback,
  createEnhancedAriaLabel,
  validateTouchTarget,
  getDynamicTypeSize,
  validateColorContrast,
  respectsReducedMotion,
  getAppleEasing,
  manageFocus,
  keyboardNavigation,
  learningStateUtils,
  formValidation
} from '../lib/apple-hig-utils'

// Re-export accessibility utilities
export {
  createAccessibilityLabel,
  buttonLabels,
  inputLabels,
  navigationLabels,
  progressLabels,
  mediaLabels,
  iconLabels,
  announcements,
  focusManagement,
  APPLE_A11Y_STANDARDS,
  learningStateLabels
} from '../lib/accessibility-labels'

// Re-export voice control
export {
  AppleVoiceControl,
  voiceControlUtils,
  globalVoiceControl
} from '../lib/voice-control'

// Re-export theme system
export {
  appleColorSystem,
  learningStateColors,
  themeUtils,
  generateCSSCustomProperties,
  type ThemeContextType
} from '../lib/theme-system'

// Re-export utils
export {
  cn,
  getLearningStateColors,
  getComponentSizeClasses,
  getComponentVariantClasses,
  createFocusableId,
  getAnimationClasses,
  getResponsiveClasses,
  getTypographyClasses,
  getShadowClasses,
  calculateProgress,
  getLearningStateFromProgress,
  createAriaLabel,
  handleKeyboardNavigation,
  hasGoodContrast,
  getThemeClasses,
  appleHIG,
  learningUtils
} from '../lib/utils'

// Re-export types
export type {
  LearningState,
  ComponentSize,
  ComponentVariant
} from '../lib/utils'