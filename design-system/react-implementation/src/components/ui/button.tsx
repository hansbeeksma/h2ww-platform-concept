import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { hapticFeedback, createEnhancedAriaLabel } from '@/lib/apple-hig-utils'

/**
 * H2WW Button Component Variants
 * Research-driven button design based on Human-AI interaction principles
 * Implements Itten color psychology for learning states
 */
const buttonVariants = cva(
  // Apple HIG Base: 44px minimum touch target, rounded corners, accessibility-first
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-apple transform-gpu apple-focus disabled:pointer-events-none disabled:opacity-50 apple-button-style [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Apple HIG Filled Style - Primary actions with system colors
        default: 'bg-ai-fundamentals text-white hover:bg-ai-fundamentals/90 shadow-apple-1 hover:shadow-apple-2 active:shadow-apple-1',

        // Learning State Variants using Apple System Colors
        discovery: 'bg-discovery text-discovery-900 hover:bg-discovery/90 shadow-apple-1 hover:shadow-apple-2 active:shadow-apple-1',
        fundamentals: 'bg-ai-fundamentals text-white hover:bg-ai-fundamentals/90 shadow-apple-1 hover:shadow-apple-2 active:shadow-apple-1',
        mastery: 'bg-mastery text-white hover:bg-mastery/90 shadow-apple-1 hover:shadow-apple-2 active:shadow-apple-1',

        // Apple HIG Tinted Style - Secondary actions
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-apple-1',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-apple-1',

        // Apple HIG Plain Style - Tertiary actions
        ghost: 'hover:bg-accent hover:text-accent-foreground transition-apple',
        link: 'text-primary underline-offset-4 hover:underline transition-apple',

        // System colors for critical actions
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-apple-1 hover:shadow-apple-2',
      },
      size: {
        // Apple HIG Touch Target Compliance
        sm: 'h-touch-min px-4 text-callout min-w-touch-min', // 44px minimum
        default: 'h-touch-comfortable px-6 text-body min-w-touch-comfortable', // 48px comfortable
        lg: 'h-touch-large px-8 text-headline min-w-touch-large', // 56px large
        icon: 'h-touch-min w-touch-min', // 44px square minimum
      },
      // Learning state modifier for context-aware styling
      learningState: {
        discovery: '',
        fundamentals: '',
        mastery: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
  ariaLabel?: string
  onHapticFeedback?: boolean
  progress?: number
}

/**
 * H2WW Button Component
 *
 * A research-driven button component that implements:
 * - Itten color psychology for learning states
 * - WCAG 2.1 AA accessibility compliance
 * - Human-AI interaction design principles
 * - Bauhaus-inspired geometric clarity
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 *
 * // Learning state variants
 * <Button variant="discovery">Explore AI</Button>
 * <Button variant="mastery">Complete Course</Button>
 *
 * // With loading state
 * <Button loading>Processing...</Button>
 *
 * // Different sizes
 * <Button size="lg">Large Action</Button>
 * <Button size="icon"><Icon /></Button>
 * ```
 */
// Using Apple HIG utilities from centralized module

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    asChild = false,
    loading = false,
    learningState,
    ariaLabel,
    onHapticFeedback = true,
    progress,
    children,
    disabled,
    onClick,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : 'button'

    // Apple HIG Click Handler with Haptic Feedback
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onHapticFeedback && !disabled && !loading) {
        hapticFeedback.light()
      }
      onClick?.(e)
    }

    // Enhanced ARIA label using Apple HIG standards
    const enhancedAriaLabel = ariaLabel || createEnhancedAriaLabel(
      typeof children === 'string' ? children : 'button',
      learningState,
      progress,
      loading
    )

    // Apply learning state styling if provided
    const learningStateClasses = learningState ? {
      discovery: variant === 'default' ? 'bg-discovery text-discovery-900 hover:bg-discovery/90' : '',
      fundamentals: variant === 'default' ? 'bg-ai-fundamentals text-white hover:bg-ai-fundamentals/90' : '',
      mastery: variant === 'default' ? 'bg-mastery text-white hover:bg-mastery/90' : '',
    }[learningState] : ''

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          learningStateClasses,
          loading && 'cursor-wait'
        )}
        ref={ref}
        disabled={disabled || loading}
        aria-label={enhancedAriaLabel}
        aria-busy={loading}
        aria-describedby={progress !== undefined ? `${enhancedAriaLabel}-progress` : undefined}
        onClick={handleClick}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-apple-scale-in"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
        {progress !== undefined && (
          <span
            id={`${enhancedAriaLabel}-progress`}
            className="sr-only"
            aria-live="polite"
          >
            Progress: {progress}% complete
          </span>
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }