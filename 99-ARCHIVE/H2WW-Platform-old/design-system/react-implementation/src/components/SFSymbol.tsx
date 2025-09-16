/**
 * SF Symbol Component for H2WW Design System
 * Apple HIG compliant icon system with learning state support
 */

import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { SFSymbols, type SFSymbolName, type SFSymbolProps, iconSizes, symbolWeights } from '../lib/sf-symbols'
import { iconLabels } from '../lib/accessibility-labels'

// SF Symbol Variants
const sfSymbolVariants = cva(
  [
    'inline-flex items-center justify-center',
    'select-none',
    'transition-colors duration-200'
  ],
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl'
      },

      weight: {
        thin: 'font-thin',
        light: 'font-light',
        regular: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        heavy: 'font-extrabold',
        black: 'font-black'
      },

      variant: {
        monochrome: 'text-current',
        hierarchical: 'text-current opacity-90',
        palette: 'text-current',
        multicolor: 'text-current'
      },

      learningState: {
        discovery: 'text-discovery-primary',
        fundamentals: 'text-fundamentals-primary',
        mastery: 'text-mastery-primary'
      }
    },

    defaultVariants: {
      size: 'base',
      weight: 'regular',
      variant: 'monochrome'
    }
  }
)

// Extended SF Symbol Props
interface ExtendedSFSymbolProps extends SFSymbolProps {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  'aria-hidden'?: boolean
}

// SF Symbol Component
export const SFSymbol = forwardRef<HTMLSpanElement, ExtendedSFSymbolProps>(
  ({
    name,
    size = 'base',
    weight = 'regular',
    variant = 'monochrome',
    learningState,
    className,
    style,
    onClick,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...props
  }, ref) => {

    // Get the Unicode symbol
    const symbol = SFSymbols[name]

    // Generate accessibility labels
    const accessibilityLabels = iconLabels.sfSymbol(name, { learningState })

    // Custom styles for Apple HIG compliance
    const customStyles: React.CSSProperties = {
      fontSize: iconSizes[size],
      fontWeight: symbolWeights[weight],
      ...style
    }

    // Determine if clickable
    const isClickable = !!onClick

    const Component = isClickable ? 'button' : 'span'

    return (
      <Component
        ref={ref as any}
        className={cn(
          sfSymbolVariants({
            size,
            weight,
            variant,
            learningState
          }),
          isClickable && [
            'cursor-pointer',
            'hover:opacity-80',
            'active:scale-95',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-offset-1',
            'focus:ring-current',
            'transition-all duration-200'
          ],
          className
        )}
        style={customStyles}
        onClick={isClickable ? onClick : undefined}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        aria-label={!ariaHidden ? (ariaLabel || accessibilityLabels.label) : undefined}
        aria-hidden={ariaHidden}
        {...(isClickable && {
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onClick?.()
            }
          }
        })}
        {...props}
      >
        {symbol}
      </Component>
    )
  }
)

SFSymbol.displayName = 'SFSymbol'

// Specialized SF Symbol Components

// Learning State Symbols
export const DiscoverySymbol = forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'learningState'>>(
  (props, ref) => <SFSymbol ref={ref} learningState="discovery" {...props} />
)
DiscoverySymbol.displayName = 'DiscoverySymbol'

export const FundamentalsSymbol = forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'learningState'>>(
  (props, ref) => <SFSymbol ref={ref} learningState="fundamentals" {...props} />
)
FundamentalsSymbol.displayName = 'FundamentalsSymbol'

export const MasterySymbol = forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'learningState'>>(
  (props, ref) => <SFSymbol ref={ref} learningState="mastery" {...props} />
)
MasterySymbol.displayName = 'MasterySymbol'

// Navigation Symbols
export const NavigationSymbols = {
  ChevronLeft: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="chevronLeft" aria-label="Navigate back" {...props} />
  ),
  ChevronRight: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="chevronRight" aria-label="Navigate forward" {...props} />
  ),
  Home: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="house" aria-label="Home" {...props} />
  ),
  Search: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="magnifyingGlass" aria-label="Search" {...props} />
  )
}

// Action Symbols
export const ActionSymbols = {
  Add: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="plus" aria-label="Add" {...props} />
  ),
  Remove: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="minus" aria-label="Remove" {...props} />
  ),
  Close: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="xmark" aria-label="Close" {...props} />
  ),
  Check: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="checkmark" aria-label="Complete" {...props} />
  )
}

// Learning Symbols
export const LearningSymbols = {
  Discovery: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="lightbulb" learningState="discovery" aria-label="Discovery phase" {...props} />
  ),
  Fundamentals: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="book" learningState="fundamentals" aria-label="Fundamentals phase" {...props} />
  ),
  Mastery: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="graduationcap" learningState="mastery" aria-label="Mastery phase" {...props} />
  ),
  Progress: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="chart" aria-label="Progress chart" {...props} />
  ),
  Achievement: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="trophy" aria-label="Achievement" {...props} />
  )
}

// Media Control Symbols
export const MediaSymbols = {
  Play: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="play" aria-label="Play" {...props} />
  ),
  Pause: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="pause" aria-label="Pause" {...props} />
  ),
  Stop: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="stop" aria-label="Stop" {...props} />
  ),
  Next: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="forward" aria-label="Next" {...props} />
  ),
  Previous: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="backward" aria-label="Previous" {...props} />
  )
}

// System Symbols
export const SystemSymbols = {
  Settings: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="gear" aria-label="Settings" {...props} />
  ),
  Info: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="info" aria-label="Information" {...props} />
  ),
  Warning: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="exclamationmark" aria-label="Warning" {...props} />
  ),
  Help: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="questionmark" aria-label="Help" {...props} />
  ),
  Notifications: forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name="bell" aria-label="Notifications" {...props} />
  )
}

// Utility function to create custom symbol components
export const createSymbolComponent = (
  name: SFSymbolName,
  defaultProps?: Partial<ExtendedSFSymbolProps>
) => {
  const CustomSymbol = forwardRef<HTMLSpanElement, Omit<ExtendedSFSymbolProps, 'name'>>(
    (props, ref) => <SFSymbol ref={ref} name={name} {...defaultProps} {...props} />
  )

  CustomSymbol.displayName = `${name.charAt(0).toUpperCase()}${name.slice(1)}Symbol`

  return CustomSymbol
}

export default SFSymbol