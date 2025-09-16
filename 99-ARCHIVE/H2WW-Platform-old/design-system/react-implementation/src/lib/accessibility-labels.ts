/**
 * Apple HIG Enhanced Accessibility Labels for H2WW Design System
 * Comprehensive ARIA labels with learning context and voice control support
 */

import { SFSymbolName } from './sf-symbols'

// Accessibility Label Types
export interface AccessibilityContext {
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
  progress?: number
  isLoading?: boolean
  hasError?: boolean
  isRequired?: boolean
  currentStep?: number
  totalSteps?: number
  additionalContext?: string
}

export interface ComponentLabels {
  label: string
  description?: string
  instructions?: string
  error?: string
  success?: string
}

// Apple HIG Accessibility Standards
export const APPLE_A11Y_STANDARDS = {
  touchTarget: {
    minimum: 44,      // Apple HIG minimum touch target (44pt)
    recommended: 48,  // Comfortable touch target
    large: 56        // Large touch target for important actions
  },
  textContrast: {
    normal: 7.0,     // Enhanced WCAG AAA (7:1 ratio)
    large: 4.5,      // Large text minimum
    enhanced: 7.0    // Apple enhanced standard
  },
  timing: {
    shortDelay: 1000,    // Brief announcements
    mediumDelay: 3000,   // Standard announcements
    longDelay: 5000      // Important announcements
  }
} as const

// Learning State Label Generators
export const learningStateLabels = {
  discovery: {
    phase: 'discovery learning phase',
    description: 'Exploring new concepts and building understanding',
    instructions: 'Take your time to explore and ask questions',
    motivation: 'Every expert was once a beginner'
  },
  fundamentals: {
    phase: 'fundamentals learning phase',
    description: 'Building core skills and knowledge',
    instructions: 'Practice consistently to strengthen your foundation',
    motivation: 'Strong fundamentals lead to mastery'
  },
  mastery: {
    phase: 'mastery learning phase',
    description: 'Applying advanced knowledge and teaching others',
    instructions: 'Challenge yourself and share your expertise',
    motivation: 'True mastery comes from teaching and innovation'
  }
} as const

/**
 * Generate comprehensive ARIA label with learning context
 */
export const createAccessibilityLabel = (
  baseComponent: string,
  context: AccessibilityContext = {}
): ComponentLabels => {
  const {
    learningState,
    progress,
    isLoading,
    hasError,
    isRequired,
    currentStep,
    totalSteps,
    additionalContext
  } = context

  // Base component label
  const parts = [baseComponent]

  // Add learning state context
  if (learningState) {
    parts.push(`in ${learningStateLabels[learningState].phase}`)
  }

  // Add progress information
  if (progress !== undefined) {
    parts.push(`${progress}% complete`)
  }

  // Add step information
  if (currentStep !== undefined && totalSteps !== undefined) {
    parts.push(`step ${currentStep} of ${totalSteps}`)
  }

  // Add state information
  if (isLoading) {
    parts.push('loading')
  }

  if (hasError) {
    parts.push('has error')
  }

  if (isRequired) {
    parts.push('required')
  }

  // Add additional context
  if (additionalContext) {
    parts.push(additionalContext)
  }

  const mainLabel = parts.join(', ')

  // Generate comprehensive labels
  const labels: ComponentLabels = {
    label: mainLabel,
    description: learningState ? learningStateLabels[learningState].description : undefined,
    instructions: learningState ? learningStateLabels[learningState].instructions : undefined
  }

  // Add error/success messages
  if (hasError) {
    labels.error = generateErrorMessage(baseComponent, learningState)
  }

  return labels
}

/**
 * Generate context-aware error messages
 */
const generateErrorMessage = (
  component: string,
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
): string => {
  const baseMessage = `Error with ${component}`

  if (!learningState) return baseMessage

  const contextualMessages = {
    discovery: `${baseMessage}. Don't worry, errors are part of learning. Try again or ask for help.`,
    fundamentals: `${baseMessage}. Review the fundamentals and try a different approach.`,
    mastery: `${baseMessage}. Analyze the issue systematically and apply advanced troubleshooting.`
  }

  return contextualMessages[learningState]
}

// Specific Component Label Generators
export const buttonLabels = {
  /**
   * Generate accessible button labels
   */
  create: (
    text: string,
    variant: 'primary' | 'secondary' | 'destructive' | 'ghost' = 'primary',
    context: AccessibilityContext = {}
  ): ComponentLabels => {
    const actionContext = variant === 'destructive' ? 'destructive action' : 'action'
    return createAccessibilityLabel(`${text} button, ${actionContext}`, context)
  },

  /**
   * Generate learning action button labels
   */
  learningAction: (
    action: 'start' | 'continue' | 'complete' | 'review' | 'practice',
    context: AccessibilityContext = {}
  ): ComponentLabels => {
    const actionLabels = {
      start: 'Start learning',
      continue: 'Continue learning',
      complete: 'Complete lesson',
      review: 'Review content',
      practice: 'Practice skills'
    }

    return createAccessibilityLabel(`${actionLabels[action]} button`, context)
  }
}

export const inputLabels = {
  /**
   * Generate accessible input labels
   */
  create: (
    fieldName: string,
    inputType: 'text' | 'email' | 'password' | 'search' | 'number' = 'text',
    context: AccessibilityContext = {}
  ): ComponentLabels => {
    const typeContext = inputType === 'search' ? 'search field' : `${inputType} input field`
    return createAccessibilityLabel(`${fieldName} ${typeContext}`, context)
  },

  /**
   * Generate form validation labels
   */
  validation: (
    fieldName: string,
    validationState: 'valid' | 'invalid' | 'validating',
    message?: string
  ): ComponentLabels => {
    const baseLabels = inputLabels.create(fieldName)

    if (validationState === 'invalid' && message) {
      baseLabels.error = `${fieldName} is invalid: ${message}`
    } else if (validationState === 'valid') {
      baseLabels.success = `${fieldName} is valid`
    } else if (validationState === 'validating') {
      baseLabels.description = `Validating ${fieldName}...`
    }

    return baseLabels
  }
}

export const navigationLabels = {
  /**
   * Generate navigation labels
   */
  create: (
    destination: string,
    isCurrent: boolean = false,
    context: AccessibilityContext = {}
  ): ComponentLabels => {
    const navContext = isCurrent ? 'current page' : 'navigation link'
    return createAccessibilityLabel(`${destination}, ${navContext}`, context)
  },

  /**
   * Generate breadcrumb labels
   */
  breadcrumb: (
    items: string[],
    currentIndex: number,
    context: AccessibilityContext = {}
  ): ComponentLabels => {
    const currentItem = items[currentIndex]
    const breadcrumbContext = `breadcrumb navigation, ${currentIndex + 1} of ${items.length}`

    return createAccessibilityLabel(`${currentItem}, ${breadcrumbContext}`, {
      ...context,
      currentStep: currentIndex + 1,
      totalSteps: items.length
    })
  }
}

export const progressLabels = {
  /**
   * Generate progress indicator labels
   */
  create: (
    type: 'linear' | 'circular' | 'step',
    progress: number,
    context: AccessibilityContext = {}
  ): ComponentLabels => {
    const progressType = type === 'step' ? 'step progress indicator' : `${type} progress indicator`
    return createAccessibilityLabel(progressType, { ...context, progress })
  },

  /**
   * Generate learning progress labels
   */
  learning: (
    skill: string,
    progress: number,
    context: AccessibilityContext = {}
  ): ComponentLabels => {
    return createAccessibilityLabel(`${skill} learning progress`, { ...context, progress })
  }
}

export const mediaLabels = {
  /**
   * Generate media control labels
   */
  control: (
    action: 'play' | 'pause' | 'stop' | 'next' | 'previous' | 'mute' | 'unmute',
    mediaType: 'video' | 'audio' = 'video',
    context: AccessibilityContext = {}
  ): ComponentLabels => {
    const controlContext = `${action} ${mediaType}`
    return createAccessibilityLabel(`${controlContext} button`, context)
  },

  /**
   * Generate video player labels
   */
  player: (
    title: string,
    currentTime: number,
    duration: number,
    context: AccessibilityContext = {}
  ): ComponentLabels => {
    const timeContext = `${Math.floor(currentTime / 60)}:${(currentTime % 60).toFixed(0).padStart(2, '0')} of ${Math.floor(duration / 60)}:${(duration % 60).toFixed(0).padStart(2, '0')}`
    return createAccessibilityLabel(`${title} video player, ${timeContext}`, context)
  }
}

export const iconLabels = {
  /**
   * Generate SF Symbol labels
   */
  sfSymbol: (
    symbolName: SFSymbolName,
    context: AccessibilityContext = {}
  ): ComponentLabels => {
    const symbolMeanings: Record<SFSymbolName, string> = {
      // Learning states
      lightbulb: 'discovery phase indicator',
      book: 'fundamentals phase indicator',
      graduationcap: 'mastery phase indicator',
      brain: 'AI learning indicator',

      // Navigation
      chevronLeft: 'navigate back',
      chevronRight: 'navigate forward',
      chevronUp: 'navigate up',
      chevronDown: 'navigate down',
      arrowLeft: 'go back',
      arrowRight: 'go forward',
      house: 'home',
      magnifyingGlass: 'search',

      // Actions
      plus: 'add',
      minus: 'remove',
      multiply: 'close',
      checkmark: 'complete',
      xmark: 'cancel',
      heart: 'favorite',
      star: 'rate',
      bookmark: 'save',

      // UI Elements
      gear: 'settings',
      info: 'information',
      exclamationmark: 'warning',
      questionmark: 'help',
      bell: 'notifications',

      // System
      person: 'user profile',
      wifi: 'wifi status',
      battery: 'battery level',
      lock: 'locked',
      unlock: 'unlocked',

      // Media
      play: 'play',
      pause: 'pause',
      stop: 'stop',
      forward: 'next',
      backward: 'previous',

      // Communication
      envelope: 'email',
      phone: 'phone',
      message: 'message',

      // Learning Progress
      chart: 'progress chart',
      progress: 'in progress',
      target: 'learning goal',
      trophy: 'achievement'
    }

    const symbolMeaning = symbolMeanings[symbolName] || symbolName
    return createAccessibilityLabel(`${symbolMeaning} icon`, context)
  }
}

// Accessibility Announcement Utilities
export const announcements = {
  /**
   * Announce to screen readers
   */
  announce: (
    message: string,
    priority: 'polite' | 'assertive' = 'polite',
    delay: number = APPLE_A11Y_STANDARDS.timing.shortDelay
  ): void => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.style.position = 'absolute'
    announcement.style.left = '-10000px'
    announcement.style.width = '1px'
    announcement.style.height = '1px'
    announcement.style.overflow = 'hidden'
    announcement.textContent = message

    document.body.appendChild(announcement)

    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement)
      }
    }, delay)
  },

  /**
   * Announce learning state changes
   */
  learningStateChange: (
    newState: 'discovery' | 'fundamentals' | 'mastery',
    context?: string
  ): void => {
    const stateInfo = learningStateLabels[newState]
    const message = context
      ? `Switched to ${stateInfo.phase} for ${context}. ${stateInfo.motivation}`
      : `Switched to ${stateInfo.phase}. ${stateInfo.motivation}`

    announcements.announce(message, 'polite', APPLE_A11Y_STANDARDS.timing.mediumDelay)
  },

  /**
   * Announce progress updates
   */
  progressUpdate: (
    progress: number,
    skill?: string,
    learningState?: 'discovery' | 'fundamentals' | 'mastery'
  ): void => {
    const skillContext = skill ? ` in ${skill}` : ''
    const stateContext = learningState ? ` during ${learningState} phase` : ''
    const message = `Progress updated to ${progress}%${skillContext}${stateContext}`

    announcements.announce(message, 'polite')
  },

  /**
   * Announce achievement unlocked
   */
  achievementUnlocked: (
    achievement: string,
    learningState?: 'discovery' | 'fundamentals' | 'mastery'
  ): void => {
    const stateContext = learningState ? ` in ${learningState} phase` : ''
    const message = `Achievement unlocked: ${achievement}${stateContext}. Congratulations!`

    announcements.announce(message, 'assertive', APPLE_A11Y_STANDARDS.timing.longDelay)
  }
}

// Focus Management for Accessibility
export const focusManagement = {
  /**
   * Trap focus within a container (Apple HIG compliant)
   */
  trapFocus: (container: HTMLElement): () => void => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus()
            e.preventDefault()
          }
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  },

  /**
   * Create roving tabindex for widget navigation
   */
  createRovingTabindex: (container: HTMLElement, items: HTMLElement[]): () => void => {
    let currentIndex = 0

    const updateTabindex = (newIndex: number) => {
      items.forEach((item, index) => {
        item.setAttribute('tabindex', index === newIndex ? '0' : '-1')
      })
      currentIndex = newIndex
      items[currentIndex]?.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault()
          updateTabindex((currentIndex + 1) % items.length)
          break
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault()
          updateTabindex(currentIndex === 0 ? items.length - 1 : currentIndex - 1)
          break
        case 'Home':
          e.preventDefault()
          updateTabindex(0)
          break
        case 'End':
          e.preventDefault()
          updateTabindex(items.length - 1)
          break
      }
    }

    // Initialize
    updateTabindex(0)
    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }
}

// Export utilities for easy access
export const a11yUtils = {
  createAccessibilityLabel,
  buttonLabels,
  inputLabels,
  navigationLabels,
  progressLabels,
  mediaLabels,
  iconLabels,
  announcements,
  focusManagement,
  APPLE_A11Y_STANDARDS
}

export {
  createAccessibilityLabel as default,
  APPLE_A11Y_STANDARDS,
  learningStateLabels
}