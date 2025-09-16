import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * H2WW Alert Component
 * Accessible alert component with learning state theming
 */
const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success: 'border-growth/50 text-growth dark:border-growth [&>svg]:text-growth',
        warning: 'border-warning/50 text-warning dark:border-warning [&>svg]:text-warning',
        discovery: 'border-discovery/50 bg-discovery/10 text-discovery-900 [&>svg]:text-discovery-700',
        fundamentals: 'border-ai-fundamentals/50 bg-ai-fundamentals/10 text-ai-fundamentals-900 [&>svg]:text-ai-fundamentals-700',
        mastery: 'border-mastery/50 bg-mastery/10 text-mastery-900 [&>svg]:text-mastery-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {icon}
      {children}
    </div>
  )
)
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

/**
 * H2WW Badge Component
 * Compact status indicators with learning state support
 */
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        success: 'border-transparent bg-growth text-white hover:bg-growth/80',
        warning: 'border-transparent bg-warning text-warning-foreground hover:bg-warning/80',
        outline: 'text-foreground',
        discovery: 'border-transparent bg-discovery text-discovery-900 hover:bg-discovery/80',
        fundamentals: 'border-transparent bg-ai-fundamentals text-white hover:bg-ai-fundamentals/80',
        mastery: 'border-transparent bg-mastery text-white hover:bg-mastery/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  )
)
Badge.displayName = 'Badge'

/**
 * H2WW Progress Component
 * Accessible progress indicator with learning state theming
 */
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
  showLabel?: boolean
  label?: string
  size?: 'sm' | 'default' | 'lg'
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({
    className,
    value = 0,
    max = 100,
    learningState,
    showLabel = false,
    label,
    size = 'default',
    ...props
  }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    const getProgressColor = () => {
      switch (learningState) {
        case 'discovery':
          return 'bg-discovery'
        case 'fundamentals':
          return 'bg-ai-fundamentals'
        case 'mastery':
          return 'bg-mastery'
        default:
          return 'bg-primary'
      }
    }

    const getHeight = () => {
      switch (size) {
        case 'sm':
          return 'h-1'
        case 'lg':
          return 'h-3'
        default:
          return 'h-2'
      }
    }

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {(showLabel || label) && (
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">
              {label || 'Progress'}
            </span>
            <span className="text-foreground font-medium">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        <div
          className={cn(
            'w-full bg-secondary rounded-full overflow-hidden',
            getHeight()
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
        >
          <div
            className={cn(
              'h-full transition-all duration-300 ease-in-out',
              getProgressColor()
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)
Progress.displayName = 'Progress'

/**
 * H2WW Spinner Component
 * Loading indicator with learning state theming
 */
interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg'
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'default', learningState, ...props }, ref) => {
    const getSize = () => {
      switch (size) {
        case 'sm':
          return 'w-4 h-4'
        case 'lg':
          return 'w-8 h-8'
        default:
          return 'w-6 h-6'
      }
    }

    const getColor = () => {
      switch (learningState) {
        case 'discovery':
          return 'border-discovery border-t-transparent'
        case 'fundamentals':
          return 'border-ai-fundamentals border-t-transparent'
        case 'mastery':
          return 'border-mastery border-t-transparent'
        default:
          return 'border-primary border-t-transparent'
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          'animate-spin rounded-full border-2',
          getSize(),
          getColor(),
          className
        )}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
)
Spinner.displayName = 'Spinner'

/**
 * H2WW Status Indicator Component
 * Simple status indicator for connection states, etc.
 */
interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: 'online' | 'offline' | 'connecting' | 'error'
  size?: 'sm' | 'default' | 'lg'
  showLabel?: boolean
  label?: string
}

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ className, status, size = 'default', showLabel = false, label, ...props }, ref) => {
    const getSize = () => {
      switch (size) {
        case 'sm':
          return 'w-2 h-2'
        case 'lg':
          return 'w-4 h-4'
        default:
          return 'w-3 h-3'
      }
    }

    const getStatusColor = () => {
      switch (status) {
        case 'online':
          return 'bg-growth'
        case 'offline':
          return 'bg-muted-foreground'
        case 'connecting':
          return 'bg-warning animate-pulse'
        case 'error':
          return 'bg-destructive'
        default:
          return 'bg-muted-foreground'
      }
    }

    const getStatusLabel = () => {
      if (label) return label
      switch (status) {
        case 'online':
          return 'Online'
        case 'offline':
          return 'Offline'
        case 'connecting':
          return 'Connecting'
        case 'error':
          return 'Error'
        default:
          return 'Unknown'
      }
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        {...props}
      >
        <div
          className={cn(
            'rounded-full',
            getSize(),
            getStatusColor()
          )}
          aria-hidden="true"
        />
        {showLabel && (
          <span className="text-sm text-muted-foreground">
            {getStatusLabel()}
          </span>
        )}
        <span className="sr-only">{getStatusLabel()}</span>
      </div>
    )
  }
)
StatusIndicator.displayName = 'StatusIndicator'

export {
  Alert,
  AlertTitle,
  AlertDescription,
  Badge,
  Progress,
  Spinner,
  StatusIndicator,
  alertVariants,
  badgeVariants
}