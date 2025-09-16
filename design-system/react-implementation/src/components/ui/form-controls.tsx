import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * H2WW Checkbox Component
 * Accessible checkbox with learning state theming
 */
interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  error?: boolean | string
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    className,
    label,
    description,
    error,
    learningState,
    id,
    disabled,
    ...props
  }, ref) => {
    const checkboxId = id || React.useId()
    const descriptionId = `${checkboxId}-description`
    const errorId = `${checkboxId}-error`

    const getCheckboxColor = () => {
      switch (learningState) {
        case 'discovery':
          return 'accent-discovery'
        case 'fundamentals':
          return 'accent-ai-fundamentals'
        case 'mastery':
          return 'accent-mastery'
        default:
          return 'accent-primary'
      }
    }

    const checkboxElement = (
      <input
        type="checkbox"
        ref={ref}
        id={checkboxId}
        className={cn(
          'h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-offset-2',
          'focus:ring-ring transition-colors',
          getCheckboxColor(),
          error && 'border-destructive focus:ring-destructive',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={disabled}
        aria-describedby={
          description || error
            ? `${descriptionId} ${errorId}`.trim()
            : undefined
        }
        aria-invalid={!!error}
        {...props}
      />
    )

    if (!label && !description && !error) {
      return checkboxElement
    }

    return (
      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          {checkboxElement}
          {label && (
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={checkboxId}
                className={cn(
                  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {label}
              </label>
              {description && (
                <p
                  id={descriptionId}
                  className="text-xs text-muted-foreground"
                >
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
        {error && typeof error === 'string' && (
          <p
            id={errorId}
            className="text-xs text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

/**
 * H2WW Radio Group Component
 * Accessible radio button group with learning state theming
 */
interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  name: string
  label?: string
  description?: string
  error?: boolean | string
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
  orientation?: 'horizontal' | 'vertical'
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({
    className,
    options,
    value,
    defaultValue,
    onChange,
    name,
    label,
    description,
    error,
    learningState,
    orientation = 'vertical',
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '')
    const currentValue = value !== undefined ? value : internalValue
    const groupId = React.useId()
    const descriptionId = `${groupId}-description`
    const errorId = `${groupId}-error`

    const handleChange = (optionValue: string) => {
      if (value === undefined) {
        setInternalValue(optionValue)
      }
      onChange?.(optionValue)
    }

    const getRadioColor = () => {
      switch (learningState) {
        case 'discovery':
          return 'accent-discovery'
        case 'fundamentals':
          return 'accent-ai-fundamentals'
        case 'mastery':
          return 'accent-mastery'
        default:
          return 'accent-primary'
      }
    }

    return (
      <div ref={ref} className={cn('space-y-3', className)} {...props}>
        {label && (
          <div className="space-y-1">
            <div className="text-sm font-medium leading-none">{label}</div>
            {description && (
              <p id={descriptionId} className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}

        <div
          role="radiogroup"
          aria-describedby={
            description || error
              ? `${descriptionId} ${errorId}`.trim()
              : undefined
          }
          aria-invalid={!!error}
          className={cn(
            'space-y-2',
            orientation === 'horizontal' && 'flex space-x-4 space-y-0'
          )}
        >
          {options.map((option) => {
            const optionId = `${groupId}-${option.value}`
            const isSelected = currentValue === option.value

            return (
              <div key={option.value} className="flex items-start space-x-3">
                <input
                  type="radio"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => handleChange(option.value)}
                  disabled={option.disabled}
                  className={cn(
                    'h-4 w-4 border-gray-300 focus:ring-2 focus:ring-offset-2',
                    'focus:ring-ring transition-colors',
                    getRadioColor(),
                    error && 'border-destructive focus:ring-destructive',
                    option.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={optionId}
                    className={cn(
                      'text-sm font-medium leading-none cursor-pointer',
                      option.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {option.label}
                  </label>
                  {option.description && (
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {error && typeof error === 'string' && (
          <p
            id={errorId}
            className="text-xs text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)
RadioGroup.displayName = 'RadioGroup'

/**
 * H2WW Switch Component
 * Toggle switch with learning state theming
 */
interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
  size?: 'sm' | 'default' | 'lg'
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({
    className,
    label,
    description,
    learningState,
    size = 'default',
    id,
    disabled,
    ...props
  }, ref) => {
    const switchId = id || React.useId()
    const descriptionId = `${switchId}-description`

    const getSwitchSize = () => {
      switch (size) {
        case 'sm':
          return {
            container: 'w-8 h-4',
            thumb: 'w-3 h-3 data-[state=checked]:translate-x-4'
          }
        case 'lg':
          return {
            container: 'w-12 h-6',
            thumb: 'w-5 h-5 data-[state=checked]:translate-x-6'
          }
        default:
          return {
            container: 'w-10 h-5',
            thumb: 'w-4 h-4 data-[state=checked]:translate-x-5'
          }
      }
    }

    const getSwitchColor = () => {
      switch (learningState) {
        case 'discovery':
          return 'data-[state=checked]:bg-discovery'
        case 'fundamentals':
          return 'data-[state=checked]:bg-ai-fundamentals'
        case 'mastery':
          return 'data-[state=checked]:bg-mastery'
        default:
          return 'data-[state=checked]:bg-primary'
      }
    }

    const sizes = getSwitchSize()

    const switchElement = (
      <label
        htmlFor={switchId}
        className={cn(
          'relative inline-flex items-center cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          type="checkbox"
          ref={ref}
          id={switchId}
          className="sr-only peer"
          disabled={disabled}
          aria-describedby={description ? descriptionId : undefined}
          {...props}
        />
        <div
          className={cn(
            'relative rounded-full bg-muted transition-colors duration-200 ease-in-out',
            'peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2',
            'peer-checked:bg-primary',
            getSwitchColor(),
            sizes.container,
            className
          )}
        >
          <div
            className={cn(
              'absolute top-0.5 left-0.5 rounded-full bg-background transition-transform duration-200 ease-in-out',
              'peer-checked:translate-x-full',
              sizes.thumb.replace('data-[state=checked]:translate-x-', 'peer-checked:translate-x-')
            )}
          />
        </div>
      </label>
    )

    if (!label && !description) {
      return switchElement
    }

    return (
      <div className="flex items-center justify-between space-x-3">
        <div className="space-y-1">
          {label && (
            <label
              htmlFor={switchId}
              className={cn(
                'text-sm font-medium leading-none cursor-pointer',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p id={descriptionId} className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {switchElement}
      </div>
    )
  }
)
Switch.displayName = 'Switch'

/**
 * H2WW Select Component
 * Dropdown select with learning state theming
 */
interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[]
  label?: string
  description?: string
  error?: boolean | string
  learningState?: 'discovery' | 'fundamentals' | 'mastery'
  placeholder?: string
  size?: 'sm' | 'default' | 'lg'
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({
    className,
    options,
    label,
    description,
    error,
    learningState,
    placeholder,
    size = 'default',
    id,
    ...props
  }, ref) => {
    const selectId = id || React.useId()
    const descriptionId = `${selectId}-description`
    const errorId = `${selectId}-error`

    const getSelectSize = () => {
      switch (size) {
        case 'sm':
          return 'h-8 px-2 text-xs'
        case 'lg':
          return 'h-12 px-4 text-base'
        default:
          return 'h-10 px-3'
      }
    }

    const getSelectColor = () => {
      if (error) return 'border-destructive focus:ring-destructive'

      switch (learningState) {
        case 'discovery':
          return 'focus:ring-discovery focus:border-discovery'
        case 'fundamentals':
          return 'focus:ring-ai-fundamentals focus:border-ai-fundamentals'
        case 'mastery':
          return 'focus:ring-mastery focus:border-mastery'
        default:
          return 'focus:ring-ring focus:border-ring'
      }
    }

    const selectElement = (
      <select
        ref={ref}
        id={selectId}
        className={cn(
          'flex w-full rounded-md border border-input bg-background text-sm ring-offset-background',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          getSelectSize(),
          getSelectColor(),
          className
        )}
        aria-describedby={
          description || error
            ? `${descriptionId} ${errorId}`.trim()
            : undefined
        }
        aria-invalid={!!error}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    )

    if (!label && !description && !error) {
      return selectElement
    }

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}

        {selectElement}

        {description && (
          <p id={descriptionId} className="text-xs text-muted-foreground">
            {description}
          </p>
        )}

        {error && typeof error === 'string' && (
          <p
            id={errorId}
            className="text-xs text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

export {
  Checkbox,
  RadioGroup,
  Switch,
  Select,
  type RadioOption,
  type SelectOption
}