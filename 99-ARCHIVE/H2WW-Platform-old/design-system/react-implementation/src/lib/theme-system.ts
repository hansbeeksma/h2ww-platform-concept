/**
 * Apple HIG Theme System for H2WW Design System
 * Complete dark mode, high contrast, and accessibility theme support
 */

// Apple HIG Color System with Dark Mode Support
export const appleColorSystem = {
  // Light Mode Colors
  light: {
    // System Colors
    systemBlue: '#007AFF',
    systemGreen: '#34C759',
    systemIndigo: '#5856D6',
    systemOrange: '#FF9500',
    systemPink: '#FF2D92',
    systemPurple: '#AF52DE',
    systemRed: '#FF3B30',
    systemTeal: '#30B0C7',
    systemYellow: '#FFCC00',

    // Gray Colors
    systemGray: '#8E8E93',
    systemGray2: '#AEAEB2',
    systemGray3: '#C7C7CC',
    systemGray4: '#D1D1D6',
    systemGray5: '#E5E5EA',
    systemGray6: '#F2F2F7',

    // Label Colors
    label: '#000000',
    secondaryLabel: '#3C3C434D',
    tertiaryLabel: '#3C3C4330',
    quaternaryLabel: '#3C3C4318',

    // Fill Colors
    systemFill: '#78788033',
    secondarySystemFill: '#78788028',
    tertiarySystemFill: '#7676801E',
    quaternarySystemFill: '#74748014',

    // Background Colors
    systemBackground: '#FFFFFF',
    secondarySystemBackground: '#F2F2F7',
    tertiarySystemBackground: '#FFFFFF',

    // Grouped Background Colors
    systemGroupedBackground: '#F2F2F7',
    secondarySystemGroupedBackground: '#FFFFFF',
    tertiarySystemGroupedBackground: '#F2F2F7',

    // Separator Colors
    separator: '#3C3C4349',
    opaqueSeparator: '#C6C6C8'
  },

  // Dark Mode Colors
  dark: {
    // System Colors
    systemBlue: '#0A84FF',
    systemGreen: '#30D158',
    systemIndigo: '#5E5CE6',
    systemOrange: '#FF9F0A',
    systemPink: '#FF375F',
    systemPurple: '#BF5AF2',
    systemRed: '#FF453A',
    systemTeal: '#40C8E0',
    systemYellow: '#FFD60A',

    // Gray Colors
    systemGray: '#8E8E93',
    systemGray2: '#636366',
    systemGray3: '#48484A',
    systemGray4: '#3A3A3C',
    systemGray5: '#2C2C2E',
    systemGray6: '#1C1C1E',

    // Label Colors
    label: '#FFFFFF',
    secondaryLabel: '#EBEBF599',
    tertiaryLabel: '#EBEBF54D',
    quaternaryLabel: '#EBEBF52E',

    // Fill Colors
    systemFill: '#78788033',
    secondarySystemFill: '#78788028',
    tertiarySystemFill: '#7676801E',
    quaternarySystemFill: '#74748014',

    // Background Colors
    systemBackground: '#000000',
    secondarySystemBackground: '#1C1C1E',
    tertiarySystemBackground: '#2C2C2E',

    // Grouped Background Colors
    systemGroupedBackground: '#000000',
    secondarySystemGroupedBackground: '#1C1C1E',
    tertiarySystemGroupedBackground: '#2C2C2E',

    // Separator Colors
    separator: '#54545899',
    opaqueSeparator: '#38383A'
  },

  // High Contrast Mode (Light)
  highContrastLight: {
    systemBlue: '#0040DD',
    systemGreen: '#248A3D',
    systemIndigo: '#3634A3',
    systemOrange: '#C93400',
    systemPink: '#D30F45',
    systemPurple: '#8944AB',
    systemRed: '#D70015',
    systemTeal: '#0071A4',
    systemYellow: '#B25000',

    label: '#000000',
    secondaryLabel: '#000000',
    separator: '#000000',
    systemBackground: '#FFFFFF'
  },

  // High Contrast Mode (Dark)
  highContrastDark: {
    systemBlue: '#409CFF',
    systemGreen: '#3BD267',
    systemIndigo: '#7D7AFF',
    systemOrange: '#FFAF33',
    systemPink: '#FF6482',
    systemPurple: '#DA8FFF',
    systemRed: '#FF6961',
    systemTeal: '#5AC8F5',
    systemYellow: '#FFE038',

    label: '#FFFFFF',
    secondaryLabel: '#FFFFFF',
    separator: '#FFFFFF',
    systemBackground: '#000000'
  }
} as const

// H2WW Learning State Colors with Theme Support
export const learningStateColors = {
  light: {
    discovery: {
      primary: appleColorSystem.light.systemYellow,
      secondary: '#FFE566',
      tertiary: '#FFF2B3',
      background: '#FFFBEB',
      text: '#92400E'
    },
    fundamentals: {
      primary: appleColorSystem.light.systemBlue,
      secondary: '#4DA3FF',
      tertiary: '#B3D9FF',
      background: '#EFF6FF',
      text: '#1E40AF'
    },
    mastery: {
      primary: appleColorSystem.light.systemPurple,
      secondary: '#C785EA',
      tertiary: '#E3C2F4',
      background: '#F3E8FF',
      text: '#7C3AED'
    }
  },

  dark: {
    discovery: {
      primary: appleColorSystem.dark.systemYellow,
      secondary: '#FFEC8C',
      tertiary: '#FFF2B3',
      background: '#1F1611',
      text: '#F59E0B'
    },
    fundamentals: {
      primary: appleColorSystem.dark.systemBlue,
      secondary: '#64A7FF',
      tertiary: '#B3D9FF',
      background: '#0C1633',
      text: '#3B82F6'
    },
    mastery: {
      primary: appleColorSystem.dark.systemPurple,
      secondary: '#D394F5',
      tertiary: '#E3C2F4',
      background: '#1A1625',
      text: '#A855F7'
    }
  },

  highContrast: {
    discovery: {
      primary: '#FFFF00',
      secondary: '#FFFF99',
      tertiary: '#FFFFCC',
      background: '#FFFFFF',
      text: '#000000'
    },
    fundamentals: {
      primary: '#0099FF',
      secondary: '#66BBFF',
      tertiary: '#B3DDFF',
      background: '#FFFFFF',
      text: '#000000'
    },
    mastery: {
      primary: '#CC00FF',
      secondary: '#E066FF',
      tertiary: '#F0B3FF',
      background: '#FFFFFF',
      text: '#000000'
    }
  }
} as const

// Theme Detection and Management
export const themeUtils = {
  /**
   * Detect user's preferred color scheme
   */
  getPreferredColorScheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  },

  /**
   * Detect if user prefers high contrast
   */
  prefersHighContrast(): boolean {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-contrast: high)').matches
  },

  /**
   * Detect if user prefers reduced motion
   */
  prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },

  /**
   * Get theme mode based on preferences
   */
  getThemeMode(): 'light' | 'dark' | 'highContrastLight' | 'highContrastDark' {
    const prefersDark = this.getPreferredColorScheme() === 'dark'
    const prefersHighContrast = this.prefersHighContrast()

    if (prefersHighContrast) {
      return prefersDark ? 'highContrastDark' : 'highContrastLight'
    }

    return prefersDark ? 'dark' : 'light'
  },

  /**
   * Listen for theme changes
   */
  onThemeChange(callback: (theme: string) => void): () => void {
    if (typeof window === 'undefined') return () => {}

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)')

    const updateTheme = () => {
      callback(this.getThemeMode())
    }

    darkModeQuery.addEventListener('change', updateTheme)
    highContrastQuery.addEventListener('change', updateTheme)

    return () => {
      darkModeQuery.removeEventListener('change', updateTheme)
      highContrastQuery.removeEventListener('change', updateTheme)
    }
  },

  /**
   * Get colors for current theme
   */
  getColorsForTheme(theme: 'light' | 'dark' | 'highContrastLight' | 'highContrastDark') {
    switch (theme) {
      case 'light':
        return appleColorSystem.light
      case 'dark':
        return appleColorSystem.dark
      case 'highContrastLight':
        return { ...appleColorSystem.light, ...appleColorSystem.highContrastLight }
      case 'highContrastDark':
        return { ...appleColorSystem.dark, ...appleColorSystem.highContrastDark }
      default:
        return appleColorSystem.light
    }
  },

  /**
   * Get learning state colors for theme
   */
  getLearningStateColors(theme: 'light' | 'dark' | 'highContrast') {
    if (theme === 'highContrast') return learningStateColors.highContrast
    return learningStateColors[theme as 'light' | 'dark']
  }
}

// CSS Custom Properties Generator
export const generateCSSCustomProperties = (theme: 'light' | 'dark' | 'highContrastLight' | 'highContrastDark') => {
  const colors = themeUtils.getColorsForTheme(theme)
  const isHighContrast = theme.includes('highContrast')
  const isDark = theme.includes('dark')

  const learningStateTheme = isHighContrast ? 'highContrast' : (isDark ? 'dark' : 'light')
  const learningColors = themeUtils.getLearningStateColors(learningStateTheme)

  return {
    // Apple System Colors
    '--color-system-blue': colors.systemBlue,
    '--color-system-green': colors.systemGreen,
    '--color-system-purple': colors.systemPurple,
    '--color-system-red': colors.systemRed,
    '--color-system-yellow': colors.systemYellow,
    '--color-system-orange': colors.systemOrange,

    // Gray Scale
    '--color-system-gray': colors.systemGray,
    '--color-system-gray-2': colors.systemGray2,
    '--color-system-gray-3': colors.systemGray3,
    '--color-system-gray-4': colors.systemGray4,
    '--color-system-gray-5': colors.systemGray5,
    '--color-system-gray-6': colors.systemGray6,

    // Labels
    '--color-label': colors.label,
    '--color-secondary-label': colors.secondaryLabel,
    '--color-tertiary-label': colors.tertiaryLabel || colors.secondaryLabel,
    '--color-quaternary-label': colors.quaternaryLabel || colors.secondaryLabel,

    // Backgrounds
    '--color-system-background': colors.systemBackground,
    '--color-secondary-system-background': colors.secondarySystemBackground,
    '--color-tertiary-system-background': colors.tertiarySystemBackground,

    // Separators
    '--color-separator': colors.separator,
    '--color-opaque-separator': colors.opaqueSeparator,

    // Learning States
    '--color-discovery-primary': learningColors.discovery.primary,
    '--color-discovery-secondary': learningColors.discovery.secondary,
    '--color-discovery-background': learningColors.discovery.background,
    '--color-discovery-text': learningColors.discovery.text,

    '--color-fundamentals-primary': learningColors.fundamentals.primary,
    '--color-fundamentals-secondary': learningColors.fundamentals.secondary,
    '--color-fundamentals-background': learningColors.fundamentals.background,
    '--color-fundamentals-text': learningColors.fundamentals.text,

    '--color-mastery-primary': learningColors.mastery.primary,
    '--color-mastery-secondary': learningColors.mastery.secondary,
    '--color-mastery-background': learningColors.mastery.background,
    '--color-mastery-text': learningColors.mastery.text,

    // Accessibility
    '--motion-reduce': themeUtils.prefersReducedMotion() ? '1' : '0',
    '--high-contrast': isHighContrast ? '1' : '0'
  }
}

// Theme Context Type
export interface ThemeContextType {
  theme: 'light' | 'dark' | 'highContrastLight' | 'highContrastDark'
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
  colors: ReturnType<typeof themeUtils.getColorsForTheme>
  learningColors: ReturnType<typeof themeUtils.getLearningStateColors>
  prefersReducedMotion: boolean
  prefersHighContrast: boolean
  toggleTheme: () => void
  setLearningState: (state: 'discovery' | 'fundamentals' | 'mastery') => void
}

export { appleColorSystem as default }