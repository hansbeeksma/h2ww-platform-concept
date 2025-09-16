import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * H2WW Breadcrumbs Component
 * Accessible navigation breadcrumbs with learning state support
 */
interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
}

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbsItemProps extends React.HTMLAttributes<HTMLElement> {
  href?: string
  current?: boolean
  children: React.ReactNode
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, separator = '/', learningState, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('flex items-center space-x-1', className)}
        {...props}
      >
        <ol className="flex items-center space-x-1">
          {children}
        </ol>
      </nav>
    )
  }
)
Breadcrumbs.displayName = 'Breadcrumbs'

const BreadcrumbsItem = React.forwardRef<HTMLLIElement, BreadcrumbsItemProps>(
  ({ className, href, current, children, ...props }, ref) => {
    const Component = href ? 'a' : 'span'

    return (
      <li ref={ref} className={cn('flex items-center', className)} {...props}>
        <Component
          href={href}
          aria-current={current ? 'page' : undefined}
          className={cn(
            'text-sm transition-colors hover:text-foreground',
            current
              ? 'text-foreground font-medium'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {children}
        </Component>
        {!current && (
          <span className="mx-2 text-muted-foreground">/</span>
        )}
      </li>
    )
  }
)
BreadcrumbsItem.displayName = 'BreadcrumbsItem'

/**
 * H2WW Tabs Component
 * Accessible tabs with learning state theming
 */
const tabsVariants = cva(
  'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
  {
    variants: {
      learningState: {
        default: '',
        discovery: 'bg-discovery/10',
        fundamentals: 'bg-ai-fundamentals/10',
        mastery: 'bg-mastery/10',
      }
    },
    defaultVariants: {
      learningState: 'default',
    },
  }
)

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
  {
    variants: {
      learningState: {
        default: '',
        discovery: 'data-[state=active]:bg-discovery data-[state=active]:text-discovery-900',
        fundamentals: 'data-[state=active]:bg-ai-fundamentals data-[state=active]:text-white',
        mastery: 'data-[state=active]:bg-mastery data-[state=active]:text-white',
      }
    },
    defaultVariants: {
      learningState: 'default',
    },
  }
)

interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsVariants> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsVariants> {}

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
  value: string
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const TabsContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
}>({})

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value, onValueChange, learningState, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '')
    const currentValue = value !== undefined ? value : internalValue

    const handleValueChange = React.useCallback((newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }, [value, onValueChange])

    return (
      <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, learningState }}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)
Tabs.displayName = 'Tabs'

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, learningState, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    const computedLearningState = learningState || context.learningState

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          tabsVariants({ learningState: computedLearningState }),
          className
        )}
        {...props}
      />
    )
  }
)
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, learningState, children, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    const isSelected = context.value === value
    const computedLearningState = learningState || context.learningState

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isSelected}
        data-state={isSelected ? 'active' : 'inactive'}
        onClick={() => context.onValueChange?.(value)}
        className={cn(
          tabsTriggerVariants({ learningState: computedLearningState }),
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    const isSelected = context.value === value

    if (!isSelected) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn(
          'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsContent.displayName = 'TabsContent'

/**
 * H2WW Navigation Header Component
 * Main navigation header with learning state theming
 */
interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
  brand?: React.ReactNode
  actions?: React.ReactNode
}

const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ className, learningState = 'default', brand, actions, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          learningState === 'discovery' && 'border-discovery/20',
          learningState === 'fundamentals' && 'border-ai-fundamentals/20',
          learningState === 'mastery' && 'border-mastery/20',
          className
        )}
        {...props}
      >
        <div className="container flex h-14 items-center">
          {brand && (
            <div className="mr-4 flex items-center space-x-2">
              {brand}
            </div>
          )}

          <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
            {children}
          </nav>

          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      </header>
    )
  }
)
Navigation.displayName = 'Navigation'

/**
 * Navigation Link Component
 */
interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, active, learningState, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          'transition-colors hover:text-foreground/80',
          active ? 'text-foreground' : 'text-foreground/60',
          learningState === 'discovery' && active && 'text-discovery-700',
          learningState === 'fundamentals' && active && 'text-ai-fundamentals-700',
          learningState === 'mastery' && active && 'text-mastery-700',
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }
)
NavLink.displayName = 'NavLink'

export {
  Navigation,
  NavLink,
  Breadcrumbs,
  BreadcrumbsItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsVariants,
  tabsTriggerVariants
}