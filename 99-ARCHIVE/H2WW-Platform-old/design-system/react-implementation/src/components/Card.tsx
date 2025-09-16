/**
 * Apple HIG Compliant Card Component for H2WW Design System
 * Full React implementation with learning states and accessibility
 */

import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { hapticFeedback } from '../lib/apple-hig-utils'
import { createAccessibilityLabel } from '../lib/accessibility-labels'
import { SFSymbol } from './SFSymbol'
import { type SFSymbolName } from '../lib/sf-symbols'

// Apple HIG Card Variants
const cardVariants = cva(
  [
    'rounded-lg border bg-card text-card-foreground shadow-sm',
    'transition-all duration-200 ease-out'
  ],
  {
    variants: {
      variant: {
        default: 'border-border',
        elevated: 'border-border shadow-md hover:shadow-lg',
        filled: 'bg-muted border-transparent',
        outlined: 'border-2 border-border bg-background',
        ghost: 'border-transparent shadow-none bg-transparent'
      },

      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
        xl: 'p-10'
      },

      interactive: {
        true: [
          'cursor-pointer',
          'hover:shadow-md hover:scale-[1.02]',
          'active:scale-[0.98]',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
          'transition-all duration-200'
        ],
        false: ''
      },

      learningState: {
        discovery: [
          'border-discovery-primary/20',
          'bg-discovery-background',
          'hover:border-discovery-primary/30',
          'focus:ring-discovery-primary/20'
        ],
        fundamentals: [
          'border-fundamentals-primary/20',
          'bg-fundamentals-background',
          'hover:border-fundamentals-primary/30',
          'focus:ring-fundamentals-primary/20'
        ],
        mastery: [
          'border-mastery-primary/20',
          'bg-mastery-background',
          'hover:border-mastery-primary/30',
          'focus:ring-mastery-primary/20'
        ]
      }
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
      interactive: false
    }
  }
)

// Card Props Interface
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {

  // Apple HIG & Learning State Props
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
  progress?: number

  // Interaction Props
  onHapticFeedback?: boolean
  clickable?: boolean
  href?: string
  external?: boolean

  // Content Props
  header?: React.ReactNode
  footer?: React.ReactNode
  icon?: SFSymbolName | React.ReactNode

  // Accessibility Props
  'aria-label'?: string
  'aria-describedby'?: string

  // Advanced Props
  asChild?: boolean
}

// Card Component
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'default',
    size = 'default',
    interactive = false,
    learningState,
    progress,
    onHapticFeedback = true,
    clickable = false,
    href,
    external = false,
    header,
    footer,
    icon,
    children,
    onClick,
    onKeyDown,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    asChild = false,
    ...props
  }, ref) => {

    // Determine if card is interactive
    const isInteractive = interactive || clickable || !!href || !!onClick

    // Generate accessibility labels
    const accessibilityLabels = createAccessibilityLabel(
      ariaLabel || 'Card',
      { learningState, progress }
    )

    // Handle click with haptic feedback
    const handleClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
      if (onHapticFeedback) {
        hapticFeedback.light()
      }
      onClick?.(event)
    }, [onClick, onHapticFeedback])

    // Handle keyboard navigation
    const handleKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isInteractive && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault()
        if (onHapticFeedback) {
          hapticFeedback.light()
        }
        onClick?.(event as any)
      }
      onKeyDown?.(event)
    }, [isInteractive, onClick, onKeyDown, onHapticFeedback])

    // Render icon helper
    const renderIcon = (icon: SFSymbolName | React.ReactNode) => {
      if (typeof icon === 'string') {
        return (
          <SFSymbol
            name={icon}
            size={size === 'sm' ? 'base' : size === 'lg' ? 'xl' : 'lg'}
            learningState={learningState}
            className="text-muted-foreground"
          />
        )
      }
      return icon
    }

    // Common props for all variants
    const commonProps = {
      ref,
      className: cn(
        cardVariants({
          variant: learningState || variant,
          size,
          interactive: isInteractive,
          learningState
        }),
        className
      ),
      onClick: isInteractive ? handleClick : undefined,
      onKeyDown: isInteractive ? handleKeyDown : undefined,
      tabIndex: isInteractive ? 0 : undefined,
      role: isInteractive ? 'button' : undefined,
      'aria-label': isInteractive ? accessibilityLabels.label : undefined,
      'aria-describedby': ariaDescribedby,
      ...props
    }

    // Card content
    const cardContent = (
      <>
        {/* Header Section */}
        {(header || icon) && (
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {icon && renderIcon(icon)}
              {header && (
                <div className="flex-1">
                  {header}
                </div>
              )}
            </div>

            {/* Learning State Indicator */}
            {learningState && (
              <div className={cn(
                'px-2 py-1 rounded-full text-xs font-medium',
                learningState === 'discovery' && 'bg-discovery-secondary/20 text-discovery-text',
                learningState === 'fundamentals' && 'bg-fundamentals-secondary/20 text-fundamentals-text',
                learningState === 'mastery' && 'bg-mastery-secondary/20 text-mastery-text'
              )}>
                {learningState.charAt(0).toUpperCase() + learningState.slice(1)}
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        {children && (
          <div className="flex-1">
            {children}
          </div>
        )}

        {/* Progress Indicator */}
        {progress !== undefined && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-300',
                  learningState === 'discovery' && 'bg-discovery-primary',
                  learningState === 'fundamentals' && 'bg-fundamentals-primary',
                  learningState === 'mastery' && 'bg-mastery-primary',
                  !learningState && 'bg-primary'
                )}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Progress: ${progress}%`}
              />
            </div>
          </div>
        )}

        {/* Footer Section */}
        {footer && (
          <div className="mt-4 pt-4 border-t border-border">
            {footer}
          </div>
        )}
      </>
    )

    // Render as link if href provided
    if (href) {
      const linkProps = {
        href,
        ...(external && { target: '_blank', rel: 'noopener noreferrer' }),
        ...commonProps
      }

      return (
        <a {...linkProps}>
          {cardContent}
        </a>
      )
    }

    // Render as div
    return (
      <div {...commonProps}>
        {cardContent}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card Sub-components
export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

// Specialized Card Components

// Learning Progress Card
export const LearningCard = forwardRef<HTMLDivElement,
  Omit<CardProps, 'learningState'> & {
    learningState: 'discovery' | 'fundamentals' | 'mastery'
    skill?: string
    timeRemaining?: string
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
  }
>(({ learningState, skill, timeRemaining, difficulty, children, ...props }, ref) => {
  const difficultyColors = {
    beginner: 'text-green-600 bg-green-100',
    intermediate: 'text-yellow-600 bg-yellow-100',
    advanced: 'text-red-600 bg-red-100'
  }

  return (
    <Card
      ref={ref}
      learningState={learningState}
      header={
        <div className="space-y-2">
          {skill && (
            <h4 className="font-semibold text-lg">{skill}</h4>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {timeRemaining && (
              <span>{timeRemaining}</span>
            )}
            {difficulty && (
              <span
                className={cn(
                  'px-2 py-1 rounded text-xs font-medium',
                  difficultyColors[difficulty]
                )}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            )}
          </div>
        </div>
      }
      {...props}
    >
      {children}
    </Card>
  )
})
LearningCard.displayName = 'LearningCard'

// Interactive Action Card
export const ActionCard = forwardRef<HTMLDivElement,
  CardProps & {
    actionLabel?: string
    actionIcon?: SFSymbolName
  }
>(({ actionLabel, actionIcon, children, onClick, ...props }, ref) => (
  <Card
    ref={ref}
    interactive
    clickable
    onClick={onClick}
    footer={
      actionLabel && (
        <div className="flex items-center justify-between w-full">
          <span className="font-medium">{actionLabel}</span>
          {actionIcon && (
            <SFSymbol
              name={actionIcon}
              size="sm"
              className="text-muted-foreground"
            />
          )}
        </div>
      )
    }
    {...props}
  >
    {children}
  </Card>
))
ActionCard.displayName = 'ActionCard'

// Stat Card for displaying metrics
export const StatCard = forwardRef<HTMLDivElement,
  Omit<CardProps, 'children'> & {
    title: string
    value: string | number
    subtitle?: string
    trend?: 'up' | 'down' | 'neutral'
    trendValue?: string
  }
>(({ title, value, subtitle, trend, trendValue, ...props }, ref) => {
  const trendIcon: SFSymbolName = trend === 'up' ? 'chevronUp' :
                                  trend === 'down' ? 'chevronDown' : 'minus'

  const trendColor = trend === 'up' ? 'text-green-600' :
                     trend === 'down' ? 'text-red-600' : 'text-muted-foreground'

  return (
    <Card ref={ref} size="sm" {...props}>
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {trend && trendValue && (
            <div className={cn('flex items-center gap-1 text-sm', trendColor)}>
              <SFSymbol name={trendIcon} size="xs" />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
})
StatCard.displayName = 'StatCard'

export default Card