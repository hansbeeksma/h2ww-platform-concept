/**
 * Apple HIG Compliant Input Component for H2WW Design System
 * Full React implementation with learning states and accessibility
 */

import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { hapticFeedback } from '../lib/apple-hig-utils'
import { inputLabels, announcements } from '../lib/accessibility-labels'
import { SFSymbol } from './SFSymbol'
import { type SFSymbolName } from '../lib/sf-symbols'
import { globalVoiceControl } from '../lib/voice-control'

// Apple HIG Input Variants
const inputVariants = cva(
  [
    'flex w-full rounded-lg border bg-background px-4 py-3 text-base',
    'transition-all duration-200 ease-out',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'min-h-[44px]' // Apple HIG minimum touch target
  ],
  {
    variants: {
      variant: {
        default: [
          'border-input',
          'hover:border-primary/50',
          'focus:border-primary focus:ring-primary/20'
        ],

        filled: [
          'bg-muted border-transparent',
          'hover:bg-muted/80',
          'focus:bg-background focus:border-primary focus:ring-primary/20'
        ],

        underlined: [
          'border-0 border-b-2 border-input rounded-none bg-transparent px-0',
          'hover:border-primary/50',
          'focus:border-primary focus:ring-0'
        ]
      },

      size: {
        sm: 'h-10 px-3 py-2 text-sm min-h-[44px]',  // Still Apple compliant
        default: 'h-12 px-4 py-3 text-base min-h-[44px]',
        lg: 'h-14 px-6 py-4 text-lg min-h-[44px]'
      },

      state: {
        default: '',
        error: 'border-destructive focus:border-destructive focus:ring-destructive/20',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
        warning: 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500/20'
      },

      learningState: {
        discovery: 'focus:border-discovery-primary focus:ring-discovery-primary/20',
        fundamentals: 'focus:border-fundamentals-primary focus:ring-fundamentals-primary/20',
        mastery: 'focus:border-mastery-primary focus:ring-mastery-primary/20'
      }
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default'
    }
  }
)

// Input Props Interface
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {

  // Apple HIG & Learning State Props
  learningState?: 'discovery' | 'fundamentals' | 'mastery'

  // Enhanced Form Props
  label?: string
  helperText?: string
  errorMessage?: string
  successMessage?: string

  // Icon Support
  leftIcon?: SFSymbolName | React.ReactNode
  rightIcon?: SFSymbolName | React.ReactNode

  // Interaction Props
  onHapticFeedback?: boolean
  clearable?: boolean
  onClear?: () => void

  // Validation Props
  validationState?: 'default' | 'validating' | 'valid' | 'invalid'
  showValidation?: boolean

  // Voice Control Props
  voiceCommands?: string[]

  // Container Props
  containerClassName?: string
  labelClassName?: string
  helperTextClassName?: string

  // Advanced Props
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

// Input Component
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    containerClassName,
    labelClassName,
    helperTextClassName,
    variant = 'default',
    size = 'default',
    state = 'default',
    learningState,
    type = 'text',
    label,
    helperText,
    errorMessage,
    successMessage,
    leftIcon,
    rightIcon,
    onHapticFeedback = true,
    clearable = false,
    onClear,
    validationState = 'default',
    showValidation = true,
    voiceCommands,
    disabled,
    value,
    onChange,
    onFocus,
    onBlur,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    startAdornment,
    endAdornment,
    id,
    ...props
  }, ref) => {

    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => inputRef.current!, [])

    const [isFocused, setIsFocused] = useState(false)
    const [internalValue, setInternalValue] = useState(value || '')

    // Generate unique IDs
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const labelId = `${inputId}-label`
    const helperId = `${inputId}-helper`
    const errorId = `${inputId}-error`

    // Determine effective state
    const effectiveState = validationState === 'invalid' ? 'error' :
                          validationState === 'valid' ? 'success' : state

    // Generate accessibility labels
    const accessibilityLabels = inputLabels.create(
      label || ariaLabel || 'Input',
      type as any,
      { learningState, isRequired: props.required }
    )

    // Handle focus
    const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)

      if (onHapticFeedback) {
        hapticFeedback.light()
      }

      onFocus?.(event)
    }, [onFocus, onHapticFeedback])

    // Handle blur
    const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      onBlur?.(event)
    }, [onBlur])

    // Handle change
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      setInternalValue(newValue)
      onChange?.(event)
    }, [onChange])

    // Handle clear
    const handleClear = useCallback(() => {
      if (inputRef.current) {
        inputRef.current.value = ''
        setInternalValue('')

        // Create synthetic change event
        const event = new Event('input', { bubbles: true })
        Object.defineProperty(event, 'target', {
          writable: false,
          value: inputRef.current
        })
        inputRef.current.dispatchEvent(event)

        if (onHapticFeedback) {
          hapticFeedback.light()
        }
      }

      onClear?.()
    }, [onClear, onHapticFeedback])

    // Setup voice control
    React.useEffect(() => {
      if (voiceCommands && inputRef.current) {
        voiceCommands.forEach(command => {
          globalVoiceControl.addCommand([command], () => {
            inputRef.current?.focus()
          })
        })

        return () => {
          voiceCommands.forEach(command => {
            globalVoiceControl.removeCommand([command])
          })
        }
      }
    }, [voiceCommands])

    // Announce validation state changes
    React.useEffect(() => {
      if (showValidation && validationState === 'invalid' && errorMessage) {
        announcements.announce(`Validation error: ${errorMessage}`, 'assertive')
      } else if (showValidation && validationState === 'valid' && successMessage) {
        announcements.announce(`Validation success: ${successMessage}`, 'polite')
      }
    }, [validationState, errorMessage, successMessage, showValidation])

    // Render icon helper
    const renderIcon = (icon: SFSymbolName | React.ReactNode, className?: string) => {
      if (typeof icon === 'string') {
        return (
          <SFSymbol
            name={icon}
            size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'base'}
            learningState={learningState}
            className={cn('text-muted-foreground', className)}
            aria-hidden="true"
          />
        )
      }
      return <span className={className} aria-hidden="true">{icon}</span>
    }

    // Determine if we should show clear button
    const showClearButton = clearable && (value || internalValue) && !disabled
    const currentValue = value !== undefined ? value : internalValue

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {/* Label */}
        {label && (
          <label
            id={labelId}
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium leading-none',
              'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              learningState && `text-${learningState}-text`,
              labelClassName
            )}
          >
            {label}
            {props.required && (
              <span className="ml-1 text-destructive" aria-label="required">*</span>
            )}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Start Adornment */}
          {startAdornment && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
              {startAdornment}
            </div>
          )}

          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
              {renderIcon(leftIcon)}
            </div>
          )}

          {/* Input */}
          <input
            ref={inputRef}
            id={inputId}
            type={type}
            className={cn(
              inputVariants({
                variant,
                size,
                state: effectiveState,
                learningState
              }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              (showClearButton || endAdornment) && 'pr-10',
              startAdornment && 'pl-10',
              className
            )}
            disabled={disabled}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-label={accessibilityLabels.label}
            aria-describedby={cn(
              ariaDescribedby,
              helperText && helperId,
              errorMessage && errorId
            )}
            aria-invalid={effectiveState === 'error'}
            aria-required={props.required}
            {...(voiceCommands && { 'data-voice-commands': voiceCommands.join(',') })}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && !showClearButton && !endAdornment && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {renderIcon(rightIcon)}
            </div>
          )}

          {/* Clear Button */}
          {showClearButton && (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2',
                'p-1 rounded-full hover:bg-muted',
                'focus:outline-none focus:ring-2 focus:ring-primary/20',
                'transition-colors duration-200'
              )}
              aria-label="Clear input"
              tabIndex={-1}
            >
              <SFSymbol
                name="xmark"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              />
            </button>
          )}

          {/* End Adornment */}
          {endAdornment && !showClearButton && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {endAdornment}
            </div>
          )}

          {/* Validation Indicator */}
          {showValidation && validationState !== 'default' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {validationState === 'validating' && (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              )}
              {validationState === 'valid' && (
                <SFSymbol name="checkmark" size="sm" className="text-green-500" />
              )}
              {validationState === 'invalid' && (
                <SFSymbol name="exclamationmark" size="sm" className="text-destructive" />
              )}
            </div>
          )}
        </div>

        {/* Helper Text / Error Message */}
        {(helperText || errorMessage || successMessage) && (
          <div className="space-y-1">
            {helperText && !errorMessage && !successMessage && (
              <p
                id={helperId}
                className={cn(
                  'text-sm text-muted-foreground',
                  helperTextClassName
                )}
              >
                {helperText}
              </p>
            )}

            {errorMessage && effectiveState === 'error' && (
              <p
                id={errorId}
                className="text-sm text-destructive flex items-center gap-2"
                role="alert"
              >
                <SFSymbol name="exclamationmark" size="xs" />
                {errorMessage}
              </p>
            )}

            {successMessage && effectiveState === 'success' && (
              <p
                className="text-sm text-green-600 flex items-center gap-2"
                role="status"
              >
                <SFSymbol name="checkmark" size="xs" />
                {successMessage}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// Specialized Input Components

// Search Input
export const SearchInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type' | 'leftIcon'>>(
  (props, ref) => (
    <Input
      ref={ref}
      type="search"
      leftIcon="magnifyingGlass"
      clearable
      placeholder="Search..."
      {...props}
    />
  )
)
SearchInput.displayName = 'SearchInput'

// Password Input
export const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type' | 'rightIcon'>>(
  ({ ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <Input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-1 hover:bg-muted rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            <SFSymbol
              name={showPassword ? 'unlock' : 'lock'}
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            />
          </button>
        }
        {...props}
      />
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

// Email Input
export const EmailInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  (props, ref) => (
    <Input
      ref={ref}
      type="email"
      leftIcon="envelope"
      placeholder="Enter email address"
      {...props}
    />
  )
)
EmailInput.displayName = 'EmailInput'

// Number Input
export const NumberInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  (props, ref) => (
    <Input
      ref={ref}
      type="number"
      {...props}
    />
  )
)
NumberInput.displayName = 'NumberInput'

// Learning State Inputs
export const LearningInput = forwardRef<HTMLInputElement,
  Omit<InputProps, 'learningState'> & { learningState: 'discovery' | 'fundamentals' | 'mastery' }
>(({ learningState, ...props }, ref) => (
  <Input ref={ref} learningState={learningState} {...props} />
))
LearningInput.displayName = 'LearningInput'

export default Input