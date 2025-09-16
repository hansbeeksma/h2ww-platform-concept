// Design Token Types
export interface DesignTokens {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  shadows: ShadowTokens;
  animations: AnimationTokens;
}

export interface ColorTokens {
  primary: {
    blue: string;
    dark: string;
    light: string;
  };
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  neutral: {
    900: string;
    700: string;
    500: string;
    300: string;
    100: string;
    white: string;
  };
}

export interface TypographyTokens {
  family: {
    primary: string;
    code: string;
  };
  scale: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  weight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface SpacingTokens {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
}

export interface ShadowTokens {
  sm: string;
  base: string;
  lg: string;
  xl: string;
}

export interface AnimationTokens {
  duration: {
    fast: string;
    base: string;
    slow: string;
  };
  easing: {
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

// Component Types
export interface ComponentVariant {
  name: string;
  properties: Record<string, any>;
  anxietyLevel: 'very-low' | 'low' | 'medium' | 'high';
  accessibilityScore: number;
}

export interface AnxietyAwareComponent {
  id: string;
  name: string;
  category: 'atom' | 'molecule' | 'organism' | 'template';
  variants: ComponentVariant[];
  anxietyReduction: string[];
  accessibilityFeatures: string[];
  usageGuidelines: string;
}

// AI Assistant Types
export interface AIAnalysis {
  cognitiveLoad: number; // 1-10 scale
  anxietyPatterns: string[];
  accessibilityIssues: string[];
  recommendations: AIRecommendation[];
}

export interface AIRecommendation {
  type: 'anxiety' | 'accessibility' | 'consistency' | 'performance';
  severity: 'low' | 'medium' | 'high';
  description: string;
  solution: string;
  confidence: number; // 0-1
}

// Plugin State Types
export interface PluginState {
  currentView: 'library' | 'tokens' | 'ai-assistant' | 'accessibility';
  selectedComponent: AnxietyAwareComponent | null;
  designTokens: DesignTokens;
  aiAnalysis: AIAnalysis | null;
  isLoading: boolean;
  error: string | null;
}

// Figma Integration Types
export interface FigmaComponentData {
  id: string;
  name: string;
  type: string;
  properties: Record<string, any>;
  children?: FigmaComponentData[];
}

export interface AccessibilityCheck {
  colorContrast: boolean;
  touchTargetSize: boolean;
  textReadability: boolean;
  keyboardNavigation: boolean;
  screenReaderOptimized: boolean;
  score: number; // 0-100
}