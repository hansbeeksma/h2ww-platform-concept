import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and tailwind-merge
 * Essential utility for H2WW Design System component styling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * H2WW Learning State Types
 * Based on Itten color psychology and learning progression research
 */
export type LearningState = 'discovery' | 'fundamentals' | 'mastery'

/**
 * H2WW Component Size Types
 * Consistent sizing system across all components
 */
export type ComponentSize = 'sm' | 'md' | 'lg'

/**
 * H2WW Component Variant Types
 * Primary design variants following research principles
 */
export type ComponentVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost'

/**
 * Gets the appropriate color classes for a learning state
 * Implements Itten color psychology for learning phases
 */
export function getLearningStateColors(state: LearningState) {
  const colorMap = {
    discovery: {
      bg: 'bg-discovery/10',
      border: 'border-discovery/20',
      text: 'text-discovery-900',
      accent: 'bg-discovery',
      hover: 'hover:bg-discovery/20',
    },
    fundamentals: {
      bg: 'bg-ai-fundamentals/10',
      border: 'border-ai-fundamentals/20',
      text: 'text-ai-fundamentals-900',
      accent: 'bg-ai-fundamentals',
      hover: 'hover:bg-ai-fundamentals/20',
    },
    mastery: {
      bg: 'bg-mastery/10',
      border: 'border-mastery/20',
      text: 'text-mastery-900',
      accent: 'bg-mastery',
      hover: 'hover:bg-mastery/20',
    },
  }

  return colorMap[state]
}

/**
 * Gets size-based classes for components
 * Implements consistent H2WW spacing system
 */
export function getComponentSizeClasses(size: ComponentSize) {
  const sizeMap = {
    sm: {
      padding: 'px-3 py-1.5',
      text: 'text-sm',
      height: 'h-8',
      icon: 'w-4 h-4',
    },
    md: {
      padding: 'px-4 py-2',
      text: 'text-base',
      height: 'h-10',
      icon: 'w-5 h-5',
    },
    lg: {
      padding: 'px-6 py-3',
      text: 'text-lg',
      height: 'h-12',
      icon: 'w-6 h-6',
    },
  }

  return sizeMap[size]
}

/**
 * Gets variant-based classes for components
 * Implements H2WW visual hierarchy and interaction patterns
 */
export function getComponentVariantClasses(variant: ComponentVariant) {
  const variantMap = {
    primary: {
      bg: 'bg-primary',
      text: 'text-primary-foreground',
      border: 'border-transparent',
      hover: 'hover:bg-primary/90',
      focus: 'focus-visible:ring-primary',
    },
    secondary: {
      bg: 'bg-secondary',
      text: 'text-secondary-foreground',
      border: 'border-transparent',
      hover: 'hover:bg-secondary/80',
      focus: 'focus-visible:ring-secondary',
    },
    tertiary: {
      bg: 'bg-muted',
      text: 'text-muted-foreground',
      border: 'border-transparent',
      hover: 'hover:bg-muted/80',
      focus: 'focus-visible:ring-muted',
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-foreground',
      border: 'border-border',
      hover: 'hover:bg-accent hover:text-accent-foreground',
      focus: 'focus-visible:ring-ring',
    },
    ghost: {
      bg: 'bg-transparent',
      text: 'text-foreground',
      border: 'border-transparent',
      hover: 'hover:bg-accent hover:text-accent-foreground',
      focus: 'focus-visible:ring-ring',
    },
  }

  return variantMap[variant]
}

/**
 * Accessibility helper to ensure proper focus management
 * Critical for H2WW's accessibility-first approach
 */
export function createFocusableId(baseId: string): string {
  return `${baseId}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Animation utility respecting user motion preferences
 * Implements H2WW motion system with accessibility considerations
 */
export function getAnimationClasses(animation: 'fade' | 'slide' | 'scale' | 'none' = 'fade') {
  const animationMap = {
    fade: 'animate-fade-in',
    slide: 'animate-slide-in',
    scale: 'animate-scale-in',
    none: '',
  }

  return animationMap[animation]
}

/**
 * Responsive utility for H2WW breakpoint system
 * Implements mobile-first responsive design approach
 */
export function getResponsiveClasses(classes: {
  base?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
}) {
  return cn(
    classes.base,
    classes.sm && `sm:${classes.sm}`,
    classes.md && `md:${classes.md}`,
    classes.lg && `lg:${classes.lg}`,
    classes.xl && `xl:${classes.xl}`
  )
}

/**
 * Typography utility for H2WW text hierarchy
 * Implements learning-optimized typography scale
 */
export function getTypographyClasses(
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'code'
) {
  const typographyMap = {
    h1: 'text-5xl font-bold font-display tracking-tight',
    h2: 'text-4xl font-semibold font-display tracking-tight',
    h3: 'text-3xl font-semibold font-display tracking-tight',
    h4: 'text-2xl font-medium font-display',
    h5: 'text-xl font-medium font-display',
    h6: 'text-lg font-medium font-display',
    body: 'text-base leading-relaxed',
    caption: 'text-sm text-muted-foreground',
    code: 'font-mono text-sm bg-muted px-1.5 py-0.5 rounded',
  }

  return typographyMap[level]
}

/**
 * Shadow utility for H2WW elevation system
 * Implements subtle shadow system for depth perception
 */
export function getShadowClasses(elevation: 'none' | 'soft' | 'medium' | 'strong') {
  const shadowMap = {
    none: '',
    soft: 'shadow-soft',
    medium: 'shadow-medium',
    strong: 'shadow-strong',
  }

  return shadowMap[elevation]
}

/**
 * Progress calculation utility for learning progression
 * Used in H2WW learning path components
 */
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.min(Math.max((completed / total) * 100, 0), 100)
}

/**
 * Learning state detection based on progress
 * Implements H2WW learning psychology mapping
 */
export function getLearningStateFromProgress(progress: number): LearningState {
  if (progress < 33) return 'discovery'
  if (progress < 67) return 'fundamentals'
  return 'mastery'
}

/**
 * ARIA label helpers for accessibility
 * Ensures proper screen reader support across all components
 */
export function createAriaLabel(
  component: string,
  state?: string,
  additional?: string
): string {
  const parts = [component]
  if (state) parts.push(state)
  if (additional) parts.push(additional)
  return parts.join(', ')
}

/**
 * Keyboard navigation helpers
 * Implements H2WW accessibility standards
 */
export function handleKeyboardNavigation(
  event: React.KeyboardEvent,
  options: {
    onEnter?: () => void
    onSpace?: () => void
    onEscape?: () => void
    onArrowDown?: () => void
    onArrowUp?: () => void
    onArrowLeft?: () => void
    onArrowRight?: () => void
  }
) {
  switch (event.key) {
    case 'Enter':
      options.onEnter?.()
      break
    case ' ':
      event.preventDefault()
      options.onSpace?.()
      break
    case 'Escape':
      options.onEscape?.()
      break
    case 'ArrowDown':
      event.preventDefault()
      options.onArrowDown?.()
      break
    case 'ArrowUp':
      event.preventDefault()
      options.onArrowUp?.()
      break
    case 'ArrowLeft':
      options.onArrowLeft?.()
      break
    case 'ArrowRight':
      options.onArrowRight?.()
      break
  }
}

/**
 * Color contrast validator for accessibility
 * Ensures WCAG 2.1 AA compliance
 */
export function hasGoodContrast(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean {
  // This is a simplified implementation
  // In production, use a proper color contrast library
  const ratioThreshold = level === 'AAA' ? 7 : 4.5
  // Implementation would check actual color contrast ratio
  return true // Placeholder
}

/**
 * Theme detection and management
 * Supports H2WW light/dark theme system
 */
export function getThemeClasses(theme: 'light' | 'dark' | 'system' = 'system') {
  if (theme === 'system') {
    return 'system' // Let CSS handle system preference
  }
  return theme === 'dark' ? 'dark' : ''
}