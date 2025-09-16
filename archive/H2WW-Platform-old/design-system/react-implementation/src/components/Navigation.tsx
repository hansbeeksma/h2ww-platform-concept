/**
 * Apple HIG Compliant Navigation Component for H2WW Design System
 * Full React implementation with learning states and accessibility
 */

import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { hapticFeedback } from '../lib/apple-hig-utils'
import { navigationLabels, focusManagement } from '../lib/accessibility-labels'
import { SFSymbol } from './SFSymbol'
import { type SFSymbolName } from '../lib/sf-symbols'
import { globalVoiceControl } from '../lib/voice-control'

// Apple HIG Navigation Variants
const navigationVariants = cva(
  [
    'flex items-center',
    'bg-background border-b border-border',
    'transition-all duration-200 ease-out'
  ],
  {
    variants: {
      variant: {
        primary: 'bg-background border-border',
        secondary: 'bg-muted border-muted-foreground/20',
        transparent: 'bg-transparent border-transparent',
        floating: 'bg-background/95 backdrop-blur-md border-border/50 rounded-lg shadow-lg m-4'
      },

      size: {
        sm: 'h-12 px-4',
        default: 'h-16 px-6',
        lg: 'h-20 px-8'
      },

      learningState: {
        discovery: 'border-discovery-primary/20 bg-discovery-background/30',
        fundamentals: 'border-fundamentals-primary/20 bg-fundamentals-background/30',
        mastery: 'border-mastery-primary/20 bg-mastery-background/30'
      }
    },

    defaultVariants: {
      variant: 'primary',
      size: 'default'
    }
  }
)

// Navigation Link Variants
const navLinkVariants = cva(
  [
    'inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
    'min-h-[44px] min-w-[44px]', // Apple HIG touch targets
    'hover:scale-102 active:scale-98'
  ],
  {
    variants: {
      variant: {
        default: [
          'text-muted-foreground hover:text-foreground',
          'hover:bg-muted focus:ring-primary/20'
        ],
        active: [
          'text-foreground bg-muted',
          'hover:bg-muted/80 focus:ring-primary/20'
        ],
        ghost: [
          'text-muted-foreground hover:text-foreground',
          'hover:bg-transparent focus:ring-primary/20'
        ]
      },

      size: {
        sm: 'text-sm px-2 py-1',
        default: 'text-base px-3 py-2',
        lg: 'text-lg px-4 py-3'
      },

      learningState: {
        discovery: [
          'text-discovery-text hover:bg-discovery-secondary/20',
          'focus:ring-discovery-primary/20'
        ],
        fundamentals: [
          'text-fundamentals-text hover:bg-fundamentals-secondary/20',
          'focus:ring-fundamentals-primary/20'
        ],
        mastery: [
          'text-mastery-text hover:bg-mastery-secondary/20',
          'focus:ring-mastery-primary/20'
        ]
      }
    },

    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

// Navigation Props Interface
export interface NavigationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navigationVariants> {

  // Apple HIG & Learning State Props
  learningState?: 'discovery' | 'fundamentals' | 'mastery'

  // Brand/Logo Props
  brand?: React.ReactNode
  brandHref?: string

  // Action Props
  actions?: React.ReactNode

  // Accessibility Props
  'aria-label'?: string

  // Advanced Props
  sticky?: boolean
  collapsible?: boolean
  defaultCollapsed?: boolean
}

// Navigation Link Props Interface
export interface NavigationLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navLinkVariants> {

  // Apple HIG & Learning State Props
  learningState?: 'discovery' | 'fundamentals' | 'mastery'

  // Navigation Props
  active?: boolean
  disabled?: boolean

  // Icon Support
  icon?: SFSymbolName | React.ReactNode
  badge?: string | number

  // Interaction Props
  onHapticFeedback?: boolean

  // Voice Control Props
  voiceCommands?: string[]

  // Advanced Props
  external?: boolean
  asChild?: boolean
}

// Navigation Component
export const Navigation = forwardRef<HTMLElement, NavigationProps>(
  ({
    className,
    variant = 'primary',
    size = 'default',
    learningState,
    brand,
    brandHref = '/',
    actions,
    children,
    sticky = false,
    collapsible = false,
    defaultCollapsed = false,
    'aria-label': ariaLabel,
    ...props
  }, ref) => {

    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

    // Generate accessibility labels
    const accessibilityLabels = navigationLabels.create(
      'Main navigation',
      false,
      { learningState }
    )

    // Handle mobile menu toggle
    const handleToggle = useCallback(() => {
      setIsCollapsed(!isCollapsed)
      hapticFeedback.light()
    }, [isCollapsed])

    // Voice control setup
    useEffect(() => {
      globalVoiceControl.addCommand(['open menu', 'show menu'], () => {
        if (collapsible) {
          setIsCollapsed(false)
        }
      })

      globalVoiceControl.addCommand(['close menu', 'hide menu'], () => {
        if (collapsible) {
          setIsCollapsed(true)
        }
      })

      return () => {
        globalVoiceControl.removeCommand(['open menu', 'show menu'])
        globalVoiceControl.removeCommand(['close menu', 'hide menu'])
      }
    }, [collapsible])

    return (
      <nav
        ref={ref}
        className={cn(
          navigationVariants({ variant, size, learningState }),
          sticky && 'sticky top-0 z-50',
          className
        )}
        aria-label={ariaLabel || accessibilityLabels.label}
        role="navigation"
        {...props}
      >
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Brand Section */}
          {brand && (
            <div className="flex items-center gap-4">
              {typeof brand === 'string' ? (
                <a
                  href={brandHref}
                  className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity"
                  aria-label="Go to homepage"
                >
                  {brand}
                </a>
              ) : (
                brand
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          {collapsible && (
            <button
              type="button"
              onClick={handleToggle}
              className={cn(
                'md:hidden inline-flex items-center justify-center',
                'p-2 rounded-lg hover:bg-muted',
                'focus:outline-none focus:ring-2 focus:ring-primary/20',
                'min-h-[44px] min-w-[44px]'
              )}
              aria-expanded={!isCollapsed}
              aria-controls="main-navigation"
              aria-label="Toggle navigation menu"
            >
              <SFSymbol
                name={isCollapsed ? 'plus' : 'multiply'}
                size="base"
                className="transition-transform duration-200"
              />
            </button>
          )}

          {/* Navigation Items */}
          <div
            id="main-navigation"
            className={cn(
              'flex items-center gap-1',
              collapsible && [
                'md:flex',
                isCollapsed ? 'hidden' : 'flex absolute top-full left-0 right-0 bg-background border-t border-border p-4 flex-col items-start gap-2'
              ]
            )}
          >
            {children}
          </div>

          {/* Actions Section */}
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </nav>
    )
  }
)

Navigation.displayName = 'Navigation'

// Navigation Link Component
export const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  ({
    className,
    variant = 'default',
    size = 'default',
    learningState,
    active = false,
    disabled = false,
    icon,
    badge,
    children,
    href,
    onClick,
    onHapticFeedback = true,
    voiceCommands,
    external = false,
    'aria-label': ariaLabel,
    ...props
  }, ref) => {

    // Determine effective variant
    const effectiveVariant = active ? 'active' : variant

    // Generate accessibility labels
    const accessibilityLabels = navigationLabels.create(
      ariaLabel || (typeof children === 'string' ? children : 'Navigation link'),
      active,
      { learningState }
    )

    // Handle click with haptic feedback
    const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault()
        return
      }

      if (onHapticFeedback) {
        hapticFeedback.light()
      }

      onClick?.(event)
    }, [disabled, onClick, onHapticFeedback])

    // Voice control setup
    useEffect(() => {
      if (voiceCommands && children && href) {
        voiceCommands.forEach(command => {
          globalVoiceControl.addCommand([command], () => {
            if (href.startsWith('http')) {
              window.open(href, external ? '_blank' : '_self')
            } else {
              window.location.href = href
            }
          })
        })

        return () => {
          voiceCommands.forEach(command => {
            globalVoiceControl.removeCommand([command])
          })
        }
      }
    }, [voiceCommands, children, href, external])

    // Render icon helper
    const renderIcon = (icon: SFSymbolName | React.ReactNode) => {
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
      return <span aria-hidden="true">{icon}</span>
    }

    const linkContent = (
      <>
        {icon && renderIcon(icon)}
        <span className={disabled ? 'opacity-50' : ''}>{children}</span>
        {badge && (
          <span
            className={cn(
              'ml-1 px-2 py-1 text-xs font-medium rounded-full',
              'bg-primary text-primary-foreground',
              learningState === 'discovery' && 'bg-discovery-primary text-white',
              learningState === 'fundamentals' && 'bg-fundamentals-primary text-white',
              learningState === 'mastery' && 'bg-mastery-primary text-white'
            )}
            aria-label={`${badge} items`}
          >
            {badge}
          </span>
        )}
      </>
    )

    if (!href) {
      return (
        <span
          ref={ref as any}
          className={cn(
            navLinkVariants({ variant: effectiveVariant, size, learningState }),
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
          aria-label={accessibilityLabels.label}
          {...(voiceCommands && { 'data-voice-commands': voiceCommands.join(',') })}
        >
          {linkContent}
        </span>
      )
    }

    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          navLinkVariants({ variant: effectiveVariant, size, learningState }),
          disabled && 'cursor-not-allowed opacity-50 pointer-events-none',
          className
        )}
        onClick={handleClick}
        aria-label={accessibilityLabels.label}
        aria-current={active ? 'page' : undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        {...(voiceCommands && { 'data-voice-commands': voiceCommands.join(',') })}
        {...props}
      >
        {linkContent}
      </a>
    )
  }
)

NavigationLink.displayName = 'NavigationLink'

// Breadcrumb Navigation Component
export const Breadcrumb = forwardRef<HTMLElement, {
  items: Array<{ label: string; href?: string; icon?: SFSymbolName }>
  separator?: SFSymbolName | React.ReactNode
  className?: string
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
}>(({ items, separator = 'chevronRight', className, learningState }, ref) => {

  // Setup roving tabindex for keyboard navigation
  const breadcrumbRef = React.useRef<HTMLElement>(null)
  React.useImperativeHandle(ref, () => breadcrumbRef.current!, [])

  React.useEffect(() => {
    if (breadcrumbRef.current) {
      const links = Array.from(breadcrumbRef.current.querySelectorAll('a')) as HTMLElement[]
      if (links.length > 0) {
        return focusManagement.createRovingTabindex(breadcrumbRef.current, links)
      }
    }
  }, [items])

  const renderSeparator = () => {
    if (typeof separator === 'string') {
      return (
        <SFSymbol
          name={separator}
          size="sm"
          className="text-muted-foreground"
          aria-hidden="true"
        />
      )
    }
    return <span aria-hidden="true">{separator}</span>
  }

  return (
    <nav
      ref={breadcrumbRef}
      className={cn('flex items-center space-x-1 text-sm', className)}
      aria-label="Breadcrumb navigation"
      role="navigation"
    >
      <ol className="flex items-center space-x-1" role="list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const accessibilityLabels = navigationLabels.breadcrumb(
            items.map(i => i.label),
            index,
            { learningState }
          )

          return (
            <li key={index} className="flex items-center space-x-1" role="listitem">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 hover:text-foreground transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1 py-0.5',
                    'text-muted-foreground',
                    learningState && `hover:text-${learningState}-primary`
                  )}
                  aria-label={accessibilityLabels.label}
                  tabIndex={index === 0 ? 0 : -1}
                >
                  {item.icon && (
                    <SFSymbol
                      name={item.icon}
                      size="xs"
                      learningState={learningState}
                      aria-hidden="true"
                    />
                  )}
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    'flex items-center gap-1',
                    isLast ? 'text-foreground font-medium' : 'text-muted-foreground'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon && (
                    <SFSymbol
                      name={item.icon}
                      size="xs"
                      learningState={learningState}
                      aria-hidden="true"
                    />
                  )}
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="flex items-center">
                  {renderSeparator()}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
})

Breadcrumb.displayName = 'Breadcrumb'

// Tab Navigation Component
export interface TabProps {
  value: string
  label: string
  disabled?: boolean
  icon?: SFSymbolName
  badge?: string | number
}

export const TabNavigation = forwardRef<HTMLDivElement, {
  tabs: TabProps[]
  value: string
  onValueChange: (value: string) => void
  className?: string
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
  variant?: 'default' | 'pills' | 'underline'
}>(({ tabs, value, onValueChange, className, learningState, variant = 'default' }, ref) => {

  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  // Setup roving tabindex
  React.useEffect(() => {
    const validRefs = tabRefs.current.filter(Boolean) as HTMLElement[]
    if (validRefs.length > 0 && ref && 'current' in ref && ref.current) {
      return focusManagement.createRovingTabindex(ref.current, validRefs)
    }
  }, [tabs, ref])

  const handleTabClick = (tabValue: string, index: number) => {
    onValueChange(tabValue)
    hapticFeedback.light()

    // Focus the clicked tab
    tabRefs.current[index]?.focus()
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center',
        variant === 'pills' && 'gap-1 p-1 bg-muted rounded-lg',
        variant === 'underline' && 'border-b border-border',
        className
      )}
      role="tablist"
      aria-label="Tab navigation"
    >
      {tabs.map((tab, index) => {
        const isActive = tab.value === value
        const isDisabled = tab.disabled

        return (
          <button
            key={tab.value}
            ref={(el) => { tabRefs.current[index] = el }}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.value}`}
            aria-disabled={isDisabled}
            tabIndex={index === 0 ? 0 : -1}
            disabled={isDisabled}
            onClick={() => !isDisabled && handleTabClick(tab.value, index)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 font-medium text-sm',
              'transition-all duration-200 ease-out',
              'focus:outline-none focus:ring-2 focus:ring-primary/20',
              'min-h-[44px]', // Apple HIG compliance

              // Variant styles
              variant === 'default' && [
                'border-b-2 border-transparent',
                isActive ? 'border-primary text-primary' : 'text-muted-foreground hover:text-foreground'
              ],

              variant === 'pills' && [
                'rounded-md',
                isActive ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              ],

              variant === 'underline' && [
                'border-b-2 border-transparent',
                isActive ? 'border-primary text-primary' : 'text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              ],

              // Learning state styles
              learningState && isActive && [
                learningState === 'discovery' && 'text-discovery-primary border-discovery-primary',
                learningState === 'fundamentals' && 'text-fundamentals-primary border-fundamentals-primary',
                learningState === 'mastery' && 'text-mastery-primary border-mastery-primary'
              ],

              // Disabled styles
              isDisabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {tab.icon && (
              <SFSymbol
                name={tab.icon}
                size="sm"
                learningState={isActive ? learningState : undefined}
                aria-hidden="true"
              />
            )}
            {tab.label}
            {tab.badge && (
              <span
                className={cn(
                  'ml-1 px-2 py-1 text-xs font-medium rounded-full',
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}
                aria-label={`${tab.badge} items`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
})

TabNavigation.displayName = 'TabNavigation'

export default Navigation