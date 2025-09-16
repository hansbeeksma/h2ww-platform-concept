import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * H2WW Container Component
 * Responsive container with consistent max-widths
 */
const containerVariants = cva(
  'mx-auto w-full',
  {
    variants: {
      size: {
        sm: 'max-w-screen-sm', // 640px
        md: 'max-w-screen-md', // 768px
        lg: 'max-w-screen-lg', // 1024px
        xl: 'max-w-screen-xl', // 1280px
        '2xl': 'max-w-screen-2xl', // 1536px
        full: 'max-w-full',
      },
      padding: {
        none: '',
        sm: 'px-4',
        md: 'px-6',
        lg: 'px-8',
      },
    },
    defaultVariants: {
      size: 'xl',
      padding: 'md',
    },
  }
)

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ size, padding }), className)}
      {...props}
    />
  )
)
Container.displayName = 'Container'

/**
 * H2WW Grid Component
 * CSS Grid layout with responsive columns
 */
const gridVariants = cva(
  'grid gap-4',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
        6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
        12: 'grid-cols-12',
      },
      gap: {
        none: 'gap-0',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
    },
    defaultVariants: {
      cols: 1,
      gap: 'md',
    },
  }
)

interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(gridVariants({ cols, gap }), className)}
      {...props}
    />
  )
)
Grid.displayName = 'Grid'

/**
 * H2WW Flex Component
 * Flexbox layout with common patterns
 */
const flexVariants = cva(
  'flex',
  {
    variants: {
      direction: {
        row: 'flex-row',
        'row-reverse': 'flex-row-reverse',
        col: 'flex-col',
        'col-reverse': 'flex-col-reverse',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      wrap: {
        nowrap: 'flex-nowrap',
        wrap: 'flex-wrap',
        'wrap-reverse': 'flex-wrap-reverse',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
    },
    defaultVariants: {
      direction: 'row',
      align: 'stretch',
      justify: 'start',
      wrap: 'nowrap',
      gap: 'none',
    },
  }
)

interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction, align, justify, wrap, gap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        flexVariants({ direction, align, justify, wrap, gap }),
        className
      )}
      {...props}
    />
  )
)
Flex.displayName = 'Flex'

/**
 * H2WW Stack Component
 * Vertical or horizontal stack with consistent spacing
 */
interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  direction?: 'vertical' | 'horizontal'
  align?: 'start' | 'center' | 'end' | 'stretch'
  divider?: React.ReactNode
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({
    className,
    spacing = 'md',
    direction = 'vertical',
    align = 'stretch',
    divider,
    children,
    ...props
  }, ref) => {
    const getSpacing = () => {
      const spacingMap = {
        xs: direction === 'vertical' ? 'space-y-1' : 'space-x-1',
        sm: direction === 'vertical' ? 'space-y-2' : 'space-x-2',
        md: direction === 'vertical' ? 'space-y-4' : 'space-x-4',
        lg: direction === 'vertical' ? 'space-y-6' : 'space-x-6',
        xl: direction === 'vertical' ? 'space-y-8' : 'space-x-8',
      }
      return spacingMap[spacing]
    }

    const getAlignment = () => {
      if (direction === 'vertical') {
        switch (align) {
          case 'start': return 'items-start'
          case 'center': return 'items-center'
          case 'end': return 'items-end'
          case 'stretch': return 'items-stretch'
          default: return 'items-stretch'
        }
      } else {
        switch (align) {
          case 'start': return 'items-start'
          case 'center': return 'items-center'
          case 'end': return 'items-end'
          case 'stretch': return 'items-stretch'
          default: return 'items-center'
        }
      }
    }

    const flexDirection = direction === 'vertical' ? 'flex-col' : 'flex-row'

    if (divider) {
      const childrenArray = React.Children.toArray(children)
      return (
        <div
          ref={ref}
          className={cn(
            'flex',
            flexDirection,
            getAlignment(),
            className
          )}
          {...props}
        >
          {childrenArray.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < childrenArray.length - 1 && divider}
            </React.Fragment>
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          flexDirection,
          getSpacing(),
          getAlignment(),
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Stack.displayName = 'Stack'

/**
 * H2WW Spacer Component
 * Flexible spacer for layouts
 */
interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
  axis?: 'horizontal' | 'vertical' | 'both'
}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = 'md', axis = 'both', style, ...props }, ref) => {
    const getSize = () => {
      if (typeof size === 'number') {
        return `${size}px`
      }

      const sizeMap = {
        xs: '0.25rem', // 4px
        sm: '0.5rem',  // 8px
        md: '1rem',    // 16px
        lg: '1.5rem',  // 24px
        xl: '2rem',    // 32px
      }
      return sizeMap[size]
    }

    const computedStyle = {
      ...style,
      ...(axis === 'horizontal' || axis === 'both' ? { width: getSize() } : {}),
      ...(axis === 'vertical' || axis === 'both' ? { height: getSize() } : {}),
    }

    return (
      <div
        ref={ref}
        className={cn('flex-shrink-0', className)}
        style={computedStyle}
        aria-hidden="true"
        {...props}
      />
    )
  }
)
Spacer.displayName = 'Spacer'

/**
 * H2WW Divider Component
 * Visual separator with learning state theming
 */
interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical'
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
  variant?: 'solid' | 'dashed' | 'dotted'
  thickness?: 'thin' | 'medium' | 'thick'
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({
    className,
    orientation = 'horizontal',
    learningState,
    variant = 'solid',
    thickness = 'thin',
    ...props
  }, ref) => {
    const getOrientation = () => {
      return orientation === 'vertical'
        ? 'w-px h-full'
        : 'h-px w-full'
    }

    const getThickness = () => {
      if (orientation === 'vertical') {
        switch (thickness) {
          case 'medium': return 'w-0.5'
          case 'thick': return 'w-1'
          default: return 'w-px'
        }
      } else {
        switch (thickness) {
          case 'medium': return 'h-0.5'
          case 'thick': return 'h-1'
          default: return 'h-px'
        }
      }
    }

    const getColor = () => {
      switch (learningState) {
        case 'discovery':
          return 'bg-discovery/30 border-discovery/30'
        case 'fundamentals':
          return 'bg-ai-fundamentals/30 border-ai-fundamentals/30'
        case 'mastery':
          return 'bg-mastery/30 border-mastery/30'
        default:
          return 'bg-border border-border'
      }
    }

    const getVariant = () => {
      switch (variant) {
        case 'dashed':
          return 'border-dashed bg-transparent border-t'
        case 'dotted':
          return 'border-dotted bg-transparent border-t'
        default:
          return ''
      }
    }

    return (
      <hr
        ref={ref}
        className={cn(
          'border-none',
          getOrientation(),
          getThickness(),
          getColor(),
          getVariant(),
          className
        )}
        {...props}
      />
    )
  }
)
Divider.displayName = 'Divider'

/**
 * H2WW Center Component
 * Centers content horizontally and/or vertically
 */
interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  axis?: 'horizontal' | 'vertical' | 'both'
  inline?: boolean
}

const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  ({ className, axis = 'both', inline = false, ...props }, ref) => {
    const getAlignment = () => {
      const classes = []

      if (axis === 'horizontal' || axis === 'both') {
        classes.push('justify-center')
      }

      if (axis === 'vertical' || axis === 'both') {
        classes.push('items-center')
      }

      return classes.join(' ')
    }

    const displayClass = inline ? 'inline-flex' : 'flex'

    return (
      <div
        ref={ref}
        className={cn(
          displayClass,
          getAlignment(),
          className
        )}
        {...props}
      />
    )
  }
)
Center.displayName = 'Center'

export {
  Container,
  Grid,
  Flex,
  Stack,
  Spacer,
  Divider,
  Center,
  containerVariants,
  gridVariants,
  flexVariants
}