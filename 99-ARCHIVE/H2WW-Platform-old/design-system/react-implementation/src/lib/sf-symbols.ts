/**
 * SF Symbols Integration for H2WW Design System
 * Apple HIG compliant icon system with learning state support
 */

// SF Symbols mapping for web (using Unicode and CSS)
export const SFSymbols = {
  // Navigation
  chevronLeft: '􀆉',
  chevronRight: '􀆊',
  chevronUp: '􀆈',
  chevronDown: '􀆇',
  arrowLeft: '􀄪',
  arrowRight: '􀄫',
  house: '􀎟',
  magnifyingGlass: '􀊫',

  // Actions
  plus: '􀅼',
  minus: '􀅽',
  multiply: '􀅾',
  checkmark: '􀆅',
  xmark: '􀆄',
  heart: '􀊵',
  star: '􀋃',
  bookmark: '􀉃',

  // Learning States
  lightbulb: '􀛭', // Discovery
  book: '􀉚',      // Fundamentals
  graduationcap: '􀸎', // Mastery
  brain: '􁓂',     // AI Learning
  person: '􀉭',    // User

  // UI Elements
  gear: '􀍟',      // Settings
  info: '􀅴',      // Information
  exclamationmark: '􀇿', // Warning
  questionmark: '􀅉',    // Help
  bell: '􀋚',      // Notifications

  // Media
  play: '􀊃',
  pause: '􀊅',
  stop: '􀛶',
  forward: '􀊇',
  backward: '􀊉',

  // Communication
  envelope: '􀍕',
  phone: '􀌾',
  message: '􀌪',

  // System
  wifi: '􀙇',
  battery: '􀛨',
  lock: '􀎠',
  unlock: '􀎡',

  // Learning Progress
  chart: '􀐾',
  progress: '􀖇',
  target: '􀶅',
  trophy: '􀠀'
} as const

export type SFSymbolName = keyof typeof SFSymbols

// SF Symbols component props
export interface SFSymbolProps {
  name: SFSymbolName
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
  weight?: 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'heavy' | 'black'
  variant?: 'monochrome' | 'hierarchical' | 'palette' | 'multicolor'
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
  className?: string
  'aria-label'?: string
}

// Apple HIG icon sizes (converted to pixels)
export const iconSizes = {
  xs: '12px',   // 12pt
  sm: '14px',   // 14pt
  base: '17px', // 17pt (body)
  lg: '20px',   // 20pt (title3)
  xl: '22px',   // 22pt (title2)
  '2xl': '28px', // 28pt (title1)
  '3xl': '34px'  // 34pt (largeTitle)
} as const

// Apple HIG font weights for SF Symbols
export const symbolWeights = {
  thin: 100,
  light: 200,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  heavy: 800,
  black: 900
} as const

// Learning state colors for symbols
export const symbolColors = {
  discovery: {
    primary: '#FFCC00',    // Apple System Yellow
    secondary: '#FFE566',
    monochrome: '#F6E05E'
  },
  fundamentals: {
    primary: '#007AFF',    // Apple System Blue
    secondary: '#4DA3FF',
    monochrome: '#3182CE'
  },
  mastery: {
    primary: '#AF52DE',    // Apple System Purple
    secondary: '#C785EA',
    monochrome: '#8B5CF6'
  }
} as const

// SF Symbol utility functions
export const symbolUtils = {
  /**
   * Get appropriate symbol for learning state
   */
  getSymbolForLearningState: (state: 'discovery' | 'fundamentals' | 'mastery'): SFSymbolName => {
    const stateSymbols = {
      discovery: 'lightbulb' as const,
      fundamentals: 'book' as const,
      mastery: 'graduationcap' as const
    }
    return stateSymbols[state]
  },

  /**
   * Get progress symbol based on completion percentage
   */
  getProgressSymbol: (progress: number): SFSymbolName => {
    if (progress === 0) return 'progress'
    if (progress < 50) return 'chart'
    if (progress < 100) return 'target'
    return 'trophy'
  },

  /**
   * Get semantic color for symbol variant
   */
  getSymbolColor: (
    learningState?: 'discovery' | 'fundamentals' | 'mastery',
    variant: 'primary' | 'secondary' | 'monochrome' = 'primary'
  ): string => {
    if (!learningState) return 'currentColor'
    return symbolColors[learningState][variant]
  },

  /**
   * Create accessibility label for symbol
   */
  createSymbolAriaLabel: (
    symbolName: SFSymbolName,
    context?: string,
    learningState?: 'discovery' | 'fundamentals' | 'mastery'
  ): string => {
    const baseLabels: Record<SFSymbolName, string> = {
      // Navigation
      chevronLeft: 'Navigate back',
      chevronRight: 'Navigate forward',
      chevronUp: 'Navigate up',
      chevronDown: 'Navigate down',
      arrowLeft: 'Go back',
      arrowRight: 'Go forward',
      house: 'Home',
      magnifyingGlass: 'Search',

      // Actions
      plus: 'Add',
      minus: 'Remove',
      multiply: 'Close',
      checkmark: 'Complete',
      xmark: 'Cancel',
      heart: 'Favorite',
      star: 'Rate',
      bookmark: 'Save',

      // Learning States
      lightbulb: 'Discovery phase',
      book: 'Fundamentals phase',
      graduationcap: 'Mastery phase',
      brain: 'AI Learning',
      person: 'User profile',

      // UI Elements
      gear: 'Settings',
      info: 'Information',
      exclamationmark: 'Warning',
      questionmark: 'Help',
      bell: 'Notifications',

      // Media
      play: 'Play',
      pause: 'Pause',
      stop: 'Stop',
      forward: 'Next',
      backward: 'Previous',

      // Communication
      envelope: 'Email',
      phone: 'Phone',
      message: 'Message',

      // System
      wifi: 'WiFi',
      battery: 'Battery',
      lock: 'Locked',
      unlock: 'Unlocked',

      // Learning Progress
      chart: 'Progress chart',
      progress: 'In progress',
      target: 'Learning goal',
      trophy: 'Achievement'
    }

    const baseLabel = baseLabels[symbolName]
    const contextLabel = context ? ` ${context}` : ''
    const stateLabel = learningState ? ` in ${learningState} learning phase` : ''

    return `${baseLabel}${contextLabel}${stateLabel}`
  }
}

// Apple HIG Dark Mode support for symbols
export const symbolDarkMode = {
  discovery: {
    primary: '#FFD60A',    // Apple System Yellow (Dark)
    secondary: '#FFEC8C',
    monochrome: '#F6E05E'
  },
  fundamentals: {
    primary: '#0A84FF',    // Apple System Blue (Dark)
    secondary: '#64A7FF',
    monochrome: '#3182CE'
  },
  mastery: {
    primary: '#BF5AF2',    // Apple System Purple (Dark)
    secondary: '#D394F5',
    monochrome: '#8B5CF6'
  }
} as const

// High Contrast mode support
export const symbolHighContrast = {
  discovery: {
    primary: '#FFFF00',    // High contrast yellow
    secondary: '#FFFF99',
    monochrome: '#000000'
  },
  fundamentals: {
    primary: '#0099FF',    // High contrast blue
    secondary: '#66BBFF',
    monochrome: '#000000'
  },
  mastery: {
    primary: '#CC00FF',    // High contrast purple
    secondary: '#E066FF',
    monochrome: '#000000'
  }
} as const

export { SFSymbols as default }