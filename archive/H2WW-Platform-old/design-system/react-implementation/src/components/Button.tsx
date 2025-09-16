/**
 * Apple HIG Compliant Button Component for H2WW Design System
 * Full React implementation with learning states and accessibility
 */

import React, { forwardRef, useCallback, useRef, useImperativeHandle } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { hapticFeedback } from '../lib/apple-hig-utils'
import { createAccessibilityLabel, buttonLabels } from '../lib/accessibility-labels'
import { SFSymbol } from './SFSymbol'
import { type SFSymbolName } from '../lib/sf-symbols'
import { globalVoiceControl } from '../lib/voice-control'

// Apple HIG Button Variants
const buttonVariants = cva(
  // Base styles - Apple HIG compliant
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-98 active:transition-duration-100',
    'hover:scale-102 hover:shadow-md',
    'touch-manipulation' // iOS optimization
  ],
  {
    variants: {
      variant: {
        // Apple HIG Filled Button
        filled: [
          'bg-primary text-primary-foreground shadow-sm',
          'hover:bg-primary/90 hover:shadow-md',
          'focus:ring-primary/20',
          'dark:bg-primary dark:text-primary-foreground'
        ],

        // Apple HIG Tinted Button
        tinted: [
          'bg-primary/10 text-primary border border-primary/20',
          'hover:bg-primary/20 hover:border-primary/30',
          'focus:ring-primary/20',
          'dark:bg-primary/20 dark:text-primary dark:border-primary/30'
        ],

        // Apple HIG Plain Button
        plain: [
          'text-primary bg-transparent',
          'hover:bg-primary/10',
          'focus:ring-primary/20',
          'dark:text-primary dark:hover:bg-primary/20'
        ],

        // Destructive Actions
        destructive: [
          'bg-destructive text-destructive-foreground shadow-sm',
          'hover:bg-destructive/90 hover:shadow-md',
          'focus:ring-destructive/20',
          'dark:bg-destructive dark:text-destructive-foreground'
        ],

        // Learning State Variants
        discovery: [
          'bg-discovery-primary text-discovery-text shadow-sm',
          'hover:bg-discovery-secondary hover:shadow-md',
          'focus:ring-discovery-primary/20'
        ],

        fundamentals: [
          'bg-fundamentals-primary text-white shadow-sm',
          'hover:bg-fundamentals-secondary hover:shadow-md',
          'focus:ring-fundamentals-primary/20'
        ],

        mastery: [
          'bg-mastery-primary text-white shadow-sm',
          'hover:bg-mastery-secondary hover:shadow-md',
          'focus:ring-mastery-primary/20'
        ]
      },

      size: {
        // Apple HIG Touch Target Compliance
        sm: 'h-11 px-4 text-sm min-w-[44px]',        // 44pt minimum
        default: 'h-12 px-6 text-base min-w-[48px]', // 48pt comfortable
        lg: 'h-14 px-8 text-lg min-w-[56px]',        // 56pt prominent
        icon: 'h-11 w-11 p-0',                       // Square icon button
        'icon-lg': 'h-14 w-14 p-0'                   // Large icon button
      },

      fullWidth: {
        true: 'w-full',
        false: 'w-auto'
      }
    },

    defaultVariants: {
      variant: 'filled',
      size: 'default',
      fullWidth: false
    }
  }
)

// Button Props Interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {

  // Apple HIG & Learning State Props
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
  progress?: number

  // Icon Support
  leftIcon?: SFSymbolName | React.ReactNode
  rightIcon?: SFSymbolName | React.ReactNode
  iconOnly?: boolean

  // Interaction Props
  onHapticFeedback?: boolean
  loading?: boolean
  loadingText?: string

  // Voice Control Props
  voiceCommands?: string[]

  // Accessibility Props
  'aria-label'?: string
  'aria-describedby'?: string

  // Advanced Props
  href?: string
  external?: boolean
  asChild?: boolean
}

// Button Component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'filled',
    size = 'default',
    fullWidth = false,
    learningState,
    progress,
    leftIcon,
    rightIcon,
    iconOnly,
    onHapticFeedback = true,
    loading = false,
    loadingText = 'Loading...',
    voiceCommands,
    children,
    disabled,
    onClick,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    href,
    external = false,
    asChild = false,
    ...props
  }, ref) => {

    const buttonRef = useRef<HTMLButtonElement>(null)
    useImperativeHandle(ref, () => buttonRef.current!, [])

    // Determine effective variant based on learning state
    const effectiveVariant = learningState || variant

    // Generate accessibility labels
    const accessibilityLabels = buttonLabels.create(
      ariaLabel || (typeof children === 'string' ? children : 'Button'),
      variant,
      { learningState, progress, isLoading: loading }
    )

    // Handle click with haptic feedback
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return

      // Haptic feedback
      if (onHapticFeedback) {
        if (variant === 'destructive') {
          hapticFeedback.warning()
        } else {
          hapticFeedback.light()
        }
      }

      onClick?.(event)
    }, [disabled, loading, onHapticFeedback, onClick, variant])

    // Setup voice control
    React.useEffect(() => {
      if (voiceCommands && buttonRef.current) {
        voiceCommands.forEach(command => {
          globalVoiceControl.addCommand([command], () => {
            buttonRef.current?.click()
          })
        })

        return () => {
          voiceCommands.forEach(command => {
            globalVoiceControl.removeCommand([command])
          })
        }
      }
    }, [voiceCommands])

    // Render icon helper
    const renderIcon = (icon: SFSymbolName | React.ReactNode, position: 'left' | 'right') => {
      if (typeof icon === 'string') {
        return (
          <SFSymbol
            name={icon}
            size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'base'}
            learningState={learningState}
            aria-hidden="true"
          />
        )
      }
      return icon
    }

    // Component content
    const buttonContent = (
      <>
        {loading && (
          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        )}

        {!loading && leftIcon && renderIcon(leftIcon, 'left')}

        {!iconOnly && (
          <span className={cn(loading && 'opacity-0')}>
            {loading ? loadingText : children}
          </span>
        )}

        {!loading && rightIcon && renderIcon(rightIcon, 'right')}
      </>
    )

    // Render as link if href provided
    if (href) {
      const linkProps = {
        href,
        ...(external && { target: '_blank', rel: 'noopener noreferrer' }),
        className: cn(buttonVariants({ variant: effectiveVariant, size, fullWidth }), className),
        'aria-label': accessibilityLabels.label,
        'aria-describedby': ariaDescribedby,
        ...(voiceCommands && { 'data-voice-commands': voiceCommands.join(',') })
      }

      return (
        <a {...linkProps}>
          {buttonContent}
        </a>
      )
    }

    // Render as button
    return (
      <button
        ref={buttonRef}
        className={cn(buttonVariants({ variant: effectiveVariant, size, fullWidth }), className)}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-label={accessibilityLabels.label}
        aria-describedby={ariaDescribedby || (accessibilityLabels.description ? 'button-description' : undefined)}
        {...(voiceCommands && { 'data-voice-commands': voiceCommands.join(',') })}
        {...props}
      >
        {buttonContent}

        {/* Hidden description for screen readers */}
        {accessibilityLabels.description && (
          <span id="button-description" className="sr-only">
            {accessibilityLabels.description}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

// Specialized Button Variants
export const PrimaryButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="filled" {...props} />
)
PrimaryButton.displayName = 'PrimaryButton'

export const SecondaryButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="tinted" {...props} />
)
SecondaryButton.displayName = 'SecondaryButton'

export const DestructiveButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="destructive" {...props} />
)
DestructiveButton.displayName = 'DestructiveButton'

export const LearningButton = forwardRef<HTMLButtonElement,
  Omit<ButtonProps, 'variant'> & { learningState: 'discovery' | 'fundamentals' | 'mastery' }
>(({ learningState, ...props }, ref) => (
  <Button ref={ref} variant={learningState} learningState={learningState} {...props} />
))
LearningButton.displayName = 'LearningButton'

// Icon Button Variants
export const IconButton = forwardRef<HTMLButtonElement,
  Omit<ButtonProps, 'iconOnly'> & { icon: SFSymbolName | React.ReactNode }
>(({ icon, children, ...props }, ref) => (
  <Button
    ref={ref}
    size="icon"
    iconOnly
    leftIcon={icon}
    aria-label={typeof children === 'string' ? children : props['aria-label']}
    {...props}
  >
    {children}
  </Button>
))
IconButton.displayName = 'IconButton'

export default Button