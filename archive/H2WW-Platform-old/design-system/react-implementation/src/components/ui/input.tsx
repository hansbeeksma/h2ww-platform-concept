import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * H2WW Input Component Variants
 * Research-driven form input design with accessibility focus
 */
const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        filled: 'bg-muted border-transparent focus-visible:bg-background',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-growth focus-visible:ring-growth',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-10 px-3',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: boolean
  success?: boolean
  helperText?: string
  label?: string
  required?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

/**
 * H2WW Input Component
 *
 * A comprehensive form input component that implements:
 * - WCAG 2.1 AA accessibility standards
 * - Clear error and success states
 * - Consistent H2WW visual design
 * - Support for icons and helper text
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Input placeholder="Enter your email" />
 *
 * // With label and helper text
 * <Input
 *   label="Email Address"
 *   type="email"
 *   placeholder="your@email.com"
 *   helperText="We'll never share your email"
 *   required
 * />
 *
 * // With error state
 * <Input
 *   label="Password"
 *   type="password"
 *   error
 *   helperText="Password must be at least 8 characters"
 * />
 *
 * // With icons
 * <Input
 *   placeholder="Search..."
 *   startIcon={<SearchIcon />}
 *   endIcon={<ClearIcon />}
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type,
    variant,
    size,
    error,
    success,
    helperText,
    label,
    required,
    startIcon,
    endIcon,
    id,
    ...props
  }, ref) => {
    const inputId = id || React.useId()
    const helperTextId = `${inputId}-helper`
    const errorId = `${inputId}-error`

    // Determine variant based on state
    const computedVariant = error ? 'error' : success ? 'success' : variant

    const inputElement = (
      <div className="relative">
        {/* Start icon */}
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {startIcon}
          </div>
        )}

        {/* Input element */}
        <input
          type={type}
          className={cn(
            inputVariants({ variant: computedVariant, size }),
            startIcon && 'pl-10',
            endIcon && 'pr-10',
            className
          )}
          ref={ref}
          id={inputId}
          aria-describedby={
            helperText || error ? `${helperTextId} ${errorId}` : undefined
          }
          aria-invalid={error}
          aria-required={required}
          {...props}
        />

        {/* End icon */}
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {endIcon}
          </div>
        )}
      </div>
    )

    // If no label or helper text, return just the input
    if (!label && !helperText && !error) {
      return inputElement
    }

    return (
      <div className="space-y-2">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && (
              <span className="text-destructive ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {/* Input */}
        {inputElement}

        {/* Helper text or error message */}
        {(helperText || error) && (
          <div
            id={helperTextId}
            className={cn(
              'text-sm',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
            role={error ? 'alert' : undefined}
            aria-live={error ? 'polite' : undefined}
          >
            {error && typeof error === 'string' ? error : helperText}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

/**
 * H2WW Textarea Component
 * Extended textarea with consistent styling and accessibility
 */
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {
  error?: boolean | string
  success?: boolean
  helperText?: string
  label?: string
  resize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    variant,
    size,
    error,
    success,
    helperText,
    label,
    required,
    resize = true,
    id,
    ...props
  }, ref) => {
    const textareaId = id || React.useId()
    const helperTextId = `${textareaId}-helper`

    // Determine variant based on state
    const computedVariant = error ? 'error' : success ? 'success' : variant

    const textareaElement = (
      <textarea
        className={cn(
          inputVariants({ variant: computedVariant, size }),
          'min-h-[80px]',
          !resize && 'resize-none',
          className
        )}
        ref={ref}
        id={textareaId}
        aria-describedby={helperText || error ? helperTextId : undefined}
        aria-invalid={!!error}
        aria-required={required}
        {...props}
      />
    )

    // If no label or helper text, return just the textarea
    if (!label && !helperText && !error) {
      return textareaElement
    }

    return (
      <div className="space-y-2">
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && (
              <span className="text-destructive ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {/* Textarea */}
        {textareaElement}

        {/* Helper text or error message */}
        {(helperText || error) && (
          <div
            id={helperTextId}
            className={cn(
              'text-sm',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
            role={error ? 'alert' : undefined}
            aria-live={error ? 'polite' : undefined}
          >
            {error && typeof error === 'string' ? error : helperText}
          </div>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

/**
 * H2WW Search Input Component
 * Specialized input for search functionality with AI assistance
 */
interface SearchInputProps extends Omit<InputProps, 'type'> {
  onSearch?: (query: string) => void
  onClear?: () => void
  suggestions?: string[]
  loading?: boolean
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({
    onSearch,
    onClear,
    suggestions = [],
    loading = false,
    placeholder = 'Search...',
    className,
    ...props
  }, ref) => {
    const [query, setQuery] = React.useState('')
    const [showSuggestions, setShowSuggestions] = React.useState(false)

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSearch?.(query)
      setShowSuggestions(false)
    }

    const handleClear = () => {
      setQuery('')
      onClear?.()
    }

    const handleSuggestionClick = (suggestion: string) => {
      setQuery(suggestion)
      onSearch?.(suggestion)
      setShowSuggestions(false)
    }

    return (
      <div className="relative">
        <form onSubmit={handleSubmit}>
          <Input
            ref={ref}
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowSuggestions(e.target.value.length > 0 && suggestions.length > 0)
            }}
            onFocus={() => setShowSuggestions(query.length > 0 && suggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            startIcon={
              loading ? (
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-muted border-t-primary" />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )
            }
            endIcon={
              query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )
            }
            className={className}
            {...props}
          />
        </form>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-md z-50 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'

export { Input, Textarea, SearchInput, inputVariants }