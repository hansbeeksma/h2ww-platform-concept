import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * H2WW Typography Component Variants
 * Research-driven typography system optimized for AI learning content
 */
const typographyVariants = cva(
  'text-foreground',
  {
    variants: {
      variant: {
        h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
        h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
        h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
        h6: 'scroll-m-20 text-base font-semibold tracking-tight',
        p: 'leading-7 [&:not(:first-child)]:mt-6',
        lead: 'text-xl text-muted-foreground',
        large: 'text-lg font-semibold',
        small: 'text-sm font-medium leading-none',
        muted: 'text-sm text-muted-foreground',
        code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        blockquote: 'mt-6 border-l-2 pl-6 italic',
      },
      learningState: {
        default: '',
        discovery: 'text-discovery-800 dark:text-discovery-200',
        fundamentals: 'text-ai-fundamentals-800 dark:text-ai-fundamentals-200',
        mastery: 'text-mastery-800 dark:text-mastery-200',
      },
      emphasis: {
        default: '',
        low: 'text-muted-foreground',
        medium: 'text-foreground',
        high: 'text-foreground font-semibold',
        critical: 'text-destructive font-semibold',
      }
    },
    defaultVariants: {
      variant: 'p',
      learningState: 'default',
      emphasis: 'default',
    },
  }
)

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
  children: React.ReactNode
}

/**
 * H2WW Typography Component
 *
 * A flexible typography component that implements:
 * - Semantic HTML structure
 * - Learning state color psychology
 * - Consistent spacing and hierarchy
 * - Accessibility-first design
 *
 * @example
 * ```tsx
 * // Headings with learning states
 * <Typography variant="h1" learningState="discovery">
 *   Discover AI Fundamentals
 * </Typography>
 *
 * // Emphasis levels
 * <Typography variant="p" emphasis="high">
 *   Important learning concept
 * </Typography>
 *
 * // Custom element
 * <Typography as="span" variant="small" learningState="mastery">
 *   Advanced technique
 * </Typography>
 * ```
 */
const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, learningState, emphasis, as, children, ...props }, ref) => {
    // Determine the appropriate HTML element
    const Component = as || getDefaultElement(variant)

    return (
      <Component
        ref={ref}
        className={cn(
          typographyVariants({ variant, learningState, emphasis }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Typography.displayName = 'Typography'

/**
 * Helper function to get default HTML element for each variant
 */
function getDefaultElement(variant: string | null | undefined): React.ElementType {
  switch (variant) {
    case 'h1':
      return 'h1'
    case 'h2':
      return 'h2'
    case 'h3':
      return 'h3'
    case 'h4':
      return 'h4'
    case 'h5':
      return 'h5'
    case 'h6':
      return 'h6'
    case 'lead':
    case 'p':
      return 'p'
    case 'code':
      return 'code'
    case 'blockquote':
      return 'blockquote'
    case 'small':
    case 'muted':
    case 'large':
    default:
      return 'span'
  }
}

/**
 * Heading Components
 * Pre-configured heading components for common use cases
 */
interface HeadingProps extends Omit<TypographyProps, 'variant' | 'as'> {}

const H1 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => (
    <Typography ref={ref} as="h1" variant="h1" {...props} />
  )
)
H1.displayName = 'H1'

const H2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => (
    <Typography ref={ref} as="h2" variant="h2" {...props} />
  )
)
H2.displayName = 'H2'

const H3 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => (
    <Typography ref={ref} as="h3" variant="h3" {...props} />
  )
)
H3.displayName = 'H3'

const H4 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => (
    <Typography ref={ref} as="h4" variant="h4" {...props} />
  )
)
H4.displayName = 'H4'

/**
 * Text Components
 * Pre-configured text components for common content
 */
const Text = React.forwardRef<HTMLParagraphElement, HeadingProps>(
  (props, ref) => (
    <Typography ref={ref} as="p" variant="p" {...props} />
  )
)
Text.displayName = 'Text'

const Lead = React.forwardRef<HTMLParagraphElement, HeadingProps>(
  (props, ref) => (
    <Typography ref={ref} as="p" variant="lead" {...props} />
  )
)
Lead.displayName = 'Lead'

const Code = React.forwardRef<HTMLElement, HeadingProps>(
  (props, ref) => (
    <Typography ref={ref} as="code" variant="code" {...props} />
  )
)
Code.displayName = 'Code'

const Blockquote = React.forwardRef<HTMLQuoteElement, HeadingProps>(
  (props, ref) => (
    <Typography ref={ref} as="blockquote" variant="blockquote" {...props} />
  )
)
Blockquote.displayName = 'Blockquote'

export {
  Typography,
  H1,
  H2,
  H3,
  H4,
  Text,
  Lead,
  Code,
  Blockquote,
  typographyVariants
}