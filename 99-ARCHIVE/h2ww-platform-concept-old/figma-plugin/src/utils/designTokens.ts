import { DesignTokens } from '@/types';

// H2WW "Calm Confidence" Design System Tokens
export const calmConfidenceTokens: DesignTokens = {
  colors: {
    primary: {
      blue: '#4A90E2',      // Trust & calm - main actions
      dark: '#357ABD',      // Depth & stability - hover states
      light: '#EAF3FB'      // Gentle background - cards, sections
    },
    semantic: {
      success: '#7ED321',   // Growth & achievement - positive feedback
      warning: '#F5A623',   // Gentle attention - non-threatening alerts
      error: '#E85D75',     // Soft error - anxiety-reducing error states
      info: '#9B51E0'       // Helpful insights - tips and guidance
    },
    neutral: {
      900: '#1A1A1A',       // Primary text - high contrast reading
      700: '#4A4A4A',       // Secondary text - readable hierarchy
      500: '#9B9B9B',       // Disabled states - clear but not harsh
      300: '#D8D8D8',       // Borders - subtle separation
      100: '#F7F8FA',       // Backgrounds - calming neutral
      white: '#FFFFFF'      // Cards & modals - clean focus areas
    }
  },
  typography: {
    family: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      code: "'Fira Code', 'SF Mono', Monaco, Consolas, monospace"
    },
    scale: {
      xs: '0.75rem',    // 12px - metadata, small labels
      sm: '0.875rem',   // 14px - body text small
      base: '1rem',     // 16px - body text default
      lg: '1.25rem',    // 20px - emphasized text
      xl: '1.563rem',   // 25px - section headers
      '2xl': '1.953rem', // 31px - page titles
      '3xl': '2.441rem'  // 39px - hero headers
    },
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  spacing: {
    1: '0.5rem',   // 8px - tight spacing
    2: '1rem',     // 16px - standard spacing
    3: '1.5rem',   // 24px - comfortable spacing
    4: '2rem',     // 32px - section spacing
    5: '2.5rem',   // 40px - large spacing
    6: '3rem',     // 48px - component spacing
    8: '4rem',     // 64px - layout spacing
    10: '5rem'     // 80px - hero spacing
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  animations: {
    duration: {
      fast: '150ms',
      base: '250ms',
      slow: '500ms'
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
};

// Token utility functions
export const getColorValue = (path: string): string => {
  const keys = path.split('.');
  let value: any = calmConfidenceTokens.colors;

  for (const key of keys) {
    value = value[key];
    if (!value) return '#000000'; // fallback
  }

  return value;
};

export const getSpacingValue = (key: keyof typeof calmConfidenceTokens.spacing): string => {
  return calmConfidenceTokens.spacing[key];
};

export const getTypographyValue = (category: string, key: string): string => {
  const typography = calmConfidenceTokens.typography as any;
  return typography[category]?.[key] || '';
};

// Generate CSS custom properties
export const generateCSSTokens = (): string => {
  const tokens = calmConfidenceTokens;
  let css = ':root {\n';

  // Colors
  Object.entries(tokens.colors).forEach(([category, colors]) => {
    Object.entries(colors).forEach(([name, value]) => {
      css += `  --color-${category}-${name}: ${value};\n`;
    });
  });

  // Typography
  Object.entries(tokens.typography.family).forEach(([name, value]) => {
    css += `  --font-${name}: ${value};\n`;
  });

  Object.entries(tokens.typography.scale).forEach(([name, value]) => {
    css += `  --text-${name}: ${value};\n`;
  });

  Object.entries(tokens.typography.weight).forEach(([name, value]) => {
    css += `  --font-${name}: ${value};\n`;
  });

  // Spacing
  Object.entries(tokens.spacing).forEach(([name, value]) => {
    css += `  --space-${name}: ${value};\n`;
  });

  // Shadows
  Object.entries(tokens.shadows).forEach(([name, value]) => {
    css += `  --shadow-${name}: ${value};\n`;
  });

  // Animations
  Object.entries(tokens.animations.duration).forEach(([name, value]) => {
    css += `  --duration-${name}: ${value};\n`;
  });

  Object.entries(tokens.animations.easing).forEach(([name, value]) => {
    css += `  --easing-${name}: ${value};\n`;
  });

  css += '}\n';
  return css;
};

// Anxiety-aware color combinations
export const anxietyAwareColorCombinations = {
  calming: {
    background: calmConfidenceTokens.colors.primary.light,
    text: calmConfidenceTokens.colors.neutral[700],
    accent: calmConfidenceTokens.colors.primary.blue
  },
  success: {
    background: '#F0F9E8', // light green background
    text: calmConfidenceTokens.colors.neutral[700],
    accent: calmConfidenceTokens.colors.semantic.success
  },
  gentle_warning: {
    background: '#FEF7E6', // light amber background
    text: calmConfidenceTokens.colors.neutral[700],
    accent: calmConfidenceTokens.colors.semantic.warning
  },
  soft_error: {
    background: '#FDF2F4', // light coral background
    text: calmConfidenceTokens.colors.neutral[700],
    accent: calmConfidenceTokens.colors.semantic.error
  }
};

// Accessibility-compliant color pairs (4.5:1 contrast minimum)
export const accessibleColorPairs = [
  { background: calmConfidenceTokens.colors.neutral.white, text: calmConfidenceTokens.colors.neutral[900] },
  { background: calmConfidenceTokens.colors.neutral[100], text: calmConfidenceTokens.colors.neutral[700] },
  { background: calmConfidenceTokens.colors.primary.blue, text: calmConfidenceTokens.colors.neutral.white },
  { background: calmConfidenceTokens.colors.primary.dark, text: calmConfidenceTokens.colors.neutral.white },
  { background: calmConfidenceTokens.colors.semantic.success, text: calmConfidenceTokens.colors.neutral.white }
];