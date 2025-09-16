/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // H2WW Learning Triad - Apple HIG Enhanced Colors
        'ai-fundamentals': {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#007AFF', // Apple System Blue - Enhanced for fundamentals
          600: '#0056CC',
          700: '#004399',
          800: '#003366',
          900: '#002233',
          DEFAULT: '#007AFF',
        },
        'discovery': {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#FFCC00', // Apple System Yellow - Enhanced for discovery
          600: '#CC9900',
          700: '#996600',
          800: '#664400',
          900: '#332200',
          DEFAULT: '#FFCC00',
        },
        'mastery': {
          50: '#FAF5FF',
          100: '#E9D5FF',
          200: '#D8B4FE',
          300: '#C084FC',
          400: '#A855F7',
          500: '#AF52DE', // Apple System Purple - Enhanced for mastery
          600: '#8C42B8',
          700: '#693292',
          800: '#46226C',
          900: '#231146',
          DEFAULT: '#AF52DE',
        },

        // Secondary Colors - Combined AI Applications
        'creativity': {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // Orange - Enthusiasm and creativity
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          DEFAULT: '#F97316',
        },
        'growth': {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#34C759', // Apple System Green - Enhanced for growth
          600: '#2AA347',
          700: '#207F35',
          800: '#165B23',
          900: '#0C3711',
          DEFAULT: '#34C759',
        },
        'innovation': {
          50: '#FAF5FF',
          100: '#E9D5FF',
          200: '#D8B4FE',
          300: '#C084FC',
          400: '#A855F7',
          500: '#8B5CF6', // Purple - Innovation and depth
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          DEFAULT: '#8B5CF6',
        },

        // Shadcn/ui compatible colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'mono': ['SF Mono', 'Monaco', 'monospace'],
      },
      fontSize: {
        // Apple HIG Typography Scale (pt converted to px)
        'caption-2': ['11px', { lineHeight: '1.2' }],  // 11pt Apple minimum
        'caption-1': ['12px', { lineHeight: '1.3' }],  // 12pt
        'footnote': ['13px', { lineHeight: '1.4' }],   // 13pt
        'subhead': ['15px', { lineHeight: '1.4' }],    // 15pt
        'callout': ['16px', { lineHeight: '1.4' }],    // 16pt
        'body': ['17px', { lineHeight: '1.4' }],       // 17pt Apple body
        'headline': ['17px', { lineHeight: '1.4', fontWeight: '600' }], // 17pt semibold
        'title-3': ['20px', { lineHeight: '1.3' }],    // 20pt
        'title-2': ['22px', { lineHeight: '1.3' }],    // 22pt
        'title-1': ['28px', { lineHeight: '1.2' }],    // 28pt
        'large-title': ['34px', { lineHeight: '1.1' }], // 34pt

        // Legacy sizes for compatibility
        'xs': ['11px', { lineHeight: '1.2' }],
        'sm': ['13px', { lineHeight: '1.4' }],
        'base': ['17px', { lineHeight: '1.4' }],
        'lg': ['20px', { lineHeight: '1.3' }],
        'xl': ['22px', { lineHeight: '1.3' }],
        '2xl': ['28px', { lineHeight: '1.2' }],
        '3xl': ['34px', { lineHeight: '1.1' }],
        '4xl': ['40px', { lineHeight: '1.1' }],
        '5xl': ['48px', { lineHeight: '1.0' }],
      },
      spacing: {
        // Apple HIG Touch Target Spacing
        'touch-min': '44px',      // Apple minimum touch target
        'touch-comfortable': '48px', // Comfortable touch target
        'touch-large': '56px',    // Large touch target

        // H2WW Spacing Scale (Enhanced)
        'xxs': '4px',
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
        'xxxl': '64px',
      },
      animation: {
        // Apple HIG Motion System
        'apple-fade-in': 'fadeIn 200ms var(--apple-ease-out)',
        'apple-slide-in': 'slideIn 300ms var(--apple-ease-out)',
        'apple-scale-in': 'scaleIn 200ms var(--apple-ease-out)',
        'apple-bounce': 'bounce 300ms var(--apple-spring)',
        'apple-press': 'press 100ms var(--apple-ease-in-out)',

        // Legacy animations
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-in': 'slideIn 300ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        press: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.98)' },
        },
      },
      boxShadow: {
        // Apple HIG Elevation System
        'apple-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'apple-2': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        'apple-3': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
        'apple-4': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
        'apple-5': '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)',

        // Legacy shadows
        'soft': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'strong': '0 10px 40px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}