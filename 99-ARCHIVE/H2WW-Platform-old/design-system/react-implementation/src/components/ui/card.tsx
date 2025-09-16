import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, type LearningState, getLearningStateColors } from '@/lib/utils'

/**
 * H2WW Card Component Variants
 * Learning-focused card designs based on research principles
 */
const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-soft transition-shadow',
  {
    variants: {
      variant: {
        default: '',
        elevated: 'shadow-medium hover:shadow-strong',
        flat: 'shadow-none border-2',
        interactive: 'cursor-pointer hover:shadow-medium transition-all duration-200',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
      learningState: {
        none: '',
        discovery: 'border-discovery/20 bg-discovery/5',
        fundamentals: 'border-ai-fundamentals/20 bg-ai-fundamentals/5',
        mastery: 'border-mastery/20 bg-mastery/5',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
      learningState: 'none',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  learningState?: LearningState
  interactive?: boolean
}

/**
 * H2WW Card Root Component
 *
 * A flexible container component that implements:
 * - Learning state visual indicators
 * - Consistent spacing and elevation
 * - Interactive states for engagement
 * - Accessibility-first design
 *
 * @example
 * ```tsx
 * <Card learningState="discovery" variant="interactive">
 *   <CardHeader>
 *     <CardTitle>Explore AI Basics</CardTitle>
 *     <CardDescription>Start your AI learning journey</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Discover the fundamentals of artificial intelligence...</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button variant="discovery">Begin Learning</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, learningState, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({
          variant: interactive ? 'interactive' : variant,
          padding,
          learningState: learningState || 'none'
        }),
        className
      )}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    />
  )
)
Card.displayName = 'Card'

/**
 * Card Header Component
 * Contains title and description with proper spacing
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

/**
 * Card Title Component
 * Implements H2WW typography hierarchy
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    level?: 1 | 2 | 3 | 4 | 5 | 6
  }
>(({ className, level = 3, ...props }, ref) => {
  const Heading = `h${level}` as const

  return (
    <Heading
      ref={ref}
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight font-display',
        className
      )}
      {...props}
    />
  )
})
CardTitle.displayName = 'CardTitle'

/**
 * Card Description Component
 * Provides contextual information with muted styling
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground leading-relaxed', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

/**
 * Card Content Component
 * Main content area with consistent padding
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

/**
 * Card Footer Component
 * Action area with proper spacing and alignment
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

/**
 * Learning Progress Card
 * Specialized card for displaying learning progress with visual indicators
 */
interface LearningProgressCardProps extends CardProps {
  progress: number
  title: string
  description?: string
  currentStep?: string
  totalSteps?: number
  completedSteps?: number
}

const LearningProgressCard = React.forwardRef<HTMLDivElement, LearningProgressCardProps>(
  ({
    progress,
    title,
    description,
    currentStep,
    totalSteps,
    completedSteps,
    learningState,
    className,
    ...props
  }, ref) => {
    // Determine learning state from progress if not provided
    const computedLearningState = learningState ||
      (progress < 33 ? 'discovery' : progress < 67 ? 'fundamentals' : 'mastery')

    const stateColors = getLearningStateColors(computedLearningState)

    return (
      <Card
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        learningState={computedLearningState}
        {...props}
      >
        {/* Progress accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
          <div
            className={cn('h-full transition-all duration-500', stateColors.accent)}
            style={{ width: `${progress}%` }}
          />
        </div>

        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{title}</CardTitle>
            <span className={cn('text-sm font-medium px-2 py-1 rounded-full', stateColors.bg, stateColors.text)}>
              {progress}%
            </span>
          </div>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </CardHeader>

        <CardContent>
          {currentStep && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Current Step:</p>
              <p className="text-sm text-muted-foreground">{currentStep}</p>
            </div>
          )}

          {totalSteps && completedSteps !== undefined && (
            <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
              <span>Steps completed:</span>
              <span>{completedSteps} of {totalSteps}</span>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)
LearningProgressCard.displayName = 'LearningProgressCard'

/**
 * AI Tool Integration Card
 * Specialized card for displaying AI tool connections and usage
 */
interface AIToolCardProps extends CardProps {
  toolName: string
  toolIcon?: React.ReactNode
  status: 'connected' | 'disconnected' | 'error'
  usageCount?: number
  lastUsed?: Date
  onConnect?: () => void
  onDisconnect?: () => void
}

const AIToolCard = React.forwardRef<HTMLDivElement, AIToolCardProps>(
  ({
    toolName,
    toolIcon,
    status,
    usageCount,
    lastUsed,
    onConnect,
    onDisconnect,
    className,
    ...props
  }, ref) => {
    const statusColors = {
      connected: 'bg-growth/10 text-growth-900 border-growth/20',
      disconnected: 'bg-muted text-muted-foreground border-muted',
      error: 'bg-destructive/10 text-destructive-900 border-destructive/20',
    }

    return (
      <Card
        ref={ref}
        className={cn('transition-all duration-200', className)}
        variant="interactive"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            {toolIcon && (
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                {toolIcon}
              </div>
            )}
            <div className="flex-1">
              <CardTitle className="text-base">{toolName}</CardTitle>
              <div className={cn('inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', statusColors[status])}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {usageCount !== undefined && (
            <div className="text-sm text-muted-foreground">
              Used {usageCount} times
            </div>
          )}

          {lastUsed && (
            <div className="text-sm text-muted-foreground">
              Last used: {lastUsed.toLocaleDateString()}
            </div>
          )}
        </CardContent>

        <CardFooter>
          {status === 'connected' ? (
            <button
              onClick={onDisconnect}
              className="text-sm text-destructive hover:text-destructive/80"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={onConnect}
              className="text-sm text-primary hover:text-primary/80"
            >
              Connect
            </button>
          )}
        </CardFooter>
      </Card>
    )
  }
)
AIToolCard.displayName = 'AIToolCard'

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  LearningProgressCard,
  AIToolCard,
  cardVariants
}