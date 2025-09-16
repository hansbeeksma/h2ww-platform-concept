/**
 * Apple HIG Compliant Progress Component for H2WW Design System
 * Full React implementation with learning states and accessibility
 */

import React, { forwardRef, useEffect, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { progressLabels, announcements } from '../lib/accessibility-labels'
import { SFSymbol } from './SFSymbol'
import { type SFSymbolName } from '../lib/sf-symbols'

// Apple HIG Progress Variants
const progressVariants = cva(
  [
    'relative overflow-hidden rounded-full',
    'transition-all duration-300 ease-out'
  ],
  {
    variants: {
      variant: {
        default: 'bg-muted',
        outlined: 'bg-transparent border-2 border-muted',
        subtle: 'bg-muted/50'
      },

      size: {
        sm: 'h-2',
        default: 'h-3',
        lg: 'h-4',
        xl: 'h-6'
      },

      learningState: {
        discovery: 'bg-discovery-background/50',
        fundamentals: 'bg-fundamentals-background/50',
        mastery: 'bg-mastery-background/50'
      }
    },

    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

// Progress Bar Fill Variants
const progressFillVariants = cva(
  [
    'h-full rounded-full transition-all duration-500 ease-out',
    'relative overflow-hidden'
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary',
        gradient: 'bg-gradient-to-r from-primary to-primary/80',
        animated: 'bg-primary animate-pulse'
      },

      learningState: {
        discovery: 'bg-discovery-primary',
        fundamentals: 'bg-fundamentals-primary',
        mastery: 'bg-mastery-primary'
      }
    },

    defaultVariants: {
      variant: 'default'
    }
  }
)

// Progress Props Interface
export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value'>,
    VariantProps<typeof progressVariants> {

  // Core Progress Props
  value: number
  max?: number
  min?: number

  // Apple HIG & Learning State Props
  learningState?: 'discovery' | 'fundamentals' | 'mastery'

  // Visual Props
  showValue?: boolean
  showLabel?: boolean
  label?: string
  animated?: boolean
  striped?: boolean
  gradient?: boolean

  // Accessibility Props
  'aria-label'?: string
  'aria-describedby'?: string

  // Advanced Props
  threshold?: { value: number; color: string }[]
  onComplete?: () => void
  onThresholdReached?: (threshold: number) => void
}

// Circular Progress Props Interface
export interface CircularProgressProps
  extends Omit<ProgressProps, 'size' | 'variant'> {
  size?: number
  strokeWidth?: number
  variant?: 'default' | 'minimal' | 'detailed'
}

// Step Progress Props Interface
export interface StepProgressProps
  extends Omit<ProgressProps, 'value' | 'max'> {
  steps: Array<{
    label: string
    description?: string
    icon?: SFSymbolName
    completed?: boolean
    active?: boolean
    disabled?: boolean
  }>
  currentStep: number
  orientation?: 'horizontal' | 'vertical'
}

// Linear Progress Component
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({
    className,
    variant = 'default',
    size = 'default',
    learningState,
    value,
    max = 100,
    min = 0,
    showValue = false,
    showLabel = false,
    label,
    animated = false,
    striped = false,
    gradient = false,
    threshold,
    onComplete,
    onThresholdReached,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    ...props
  }, ref) => {

    const [previousValue, setPreviousValue] = useState(value)
    const [animatedValue, setAnimatedValue] = useState(0)

    // Normalize value within bounds
    const normalizedValue = Math.min(max, Math.max(min, value))
    const percentage = ((normalizedValue - min) / (max - min)) * 100

    // Generate accessibility labels
    const accessibilityLabels = progressLabels.create(
      'linear',
      normalizedValue,
      { learningState }
    )

    // Animate progress changes
    useEffect(() => {
      const timer = setTimeout(() => {
        setAnimatedValue(percentage)
      }, 100)

      return () => clearTimeout(timer)
    }, [percentage])

    // Handle completion
    useEffect(() => {
      if (normalizedValue >= max && previousValue < max) {
        onComplete?.()
        announcements.announce(
          `Progress completed: ${label || 'Task'} finished`,
          'polite'
        )
      }
      setPreviousValue(normalizedValue)
    }, [normalizedValue, max, previousValue, onComplete, label])

    // Handle threshold notifications
    useEffect(() => {
      if (threshold && Array.isArray(threshold)) {
        threshold.forEach(({ value: thresholdValue }) => {
          if (normalizedValue >= thresholdValue && previousValue < thresholdValue) {
            onThresholdReached?.(thresholdValue)
            announcements.announce(
              `Milestone reached: ${thresholdValue}% complete`,
              'polite'
            )
          }
        })
      }
    }, [normalizedValue, previousValue, threshold, onThresholdReached])

    // Determine fill variant
    const fillVariant = animated ? 'animated' : gradient ? 'gradient' : 'default'

    // Determine current color based on thresholds
    const getCurrentColor = () => {
      if (threshold && Array.isArray(threshold)) {
        const activeThreshold = threshold
          .sort((a, b) => b.value - a.value)
          .find(t => normalizedValue >= t.value)

        if (activeThreshold) {
          return activeThreshold.color
        }
      }
      return undefined
    }

    const currentColor = getCurrentColor()

    return (
      <div className="space-y-2">
        {/* Label Section */}
        {(showLabel || label) && (
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-foreground">
              {label || 'Progress'}
            </span>
            {showValue && (
              <span className="text-muted-foreground">
                {Math.round(normalizedValue)}/{max}
              </span>
            )}
          </div>
        )}

        {/* Progress Bar */}
        <div
          ref={ref}
          className={cn(
            progressVariants({ variant, size, learningState }),
            className
          )}
          role="progressbar"
          aria-valuenow={normalizedValue}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={ariaLabel || accessibilityLabels.label}
          aria-describedby={ariaDescribedby}
          {...props}
        >
          {/* Progress Fill */}
          <div
            className={cn(
              progressFillVariants({ variant: fillVariant, learningState }),
              striped && 'bg-stripes',
              currentColor && `bg-[${currentColor}]`
            )}
            style={{
              width: `${animatedValue}%`,
              ...(currentColor && { backgroundColor: currentColor })
            }}
          >
            {/* Shimmer Effect for Animated Variant */}
            {animated && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
          </div>

          {/* Threshold Markers */}
          {threshold && Array.isArray(threshold) && (
            <>
              {threshold.map(({ value: thresholdValue }, index) => {
                const thresholdPercentage = ((thresholdValue - min) / (max - min)) * 100
                return (
                  <div
                    key={index}
                    className="absolute top-0 bottom-0 w-0.5 bg-background"
                    style={{ left: `${thresholdPercentage}%` }}
                    aria-hidden="true"
                  />
                )
              })}
            </>
          )}
        </div>

        {/* Percentage Display */}
        {showValue && !showLabel && (
          <div className="text-center text-sm text-muted-foreground">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    )
  }
)

Progress.displayName = 'Progress'

// Circular Progress Component
export const CircularProgress = forwardRef<SVGSVGElement, CircularProgressProps>(
  ({
    value,
    max = 100,
    min = 0,
    size = 120,
    strokeWidth = 8,
    variant = 'default',
    learningState,
    showValue = true,
    showLabel = false,
    label,
    className,
    'aria-label': ariaLabel,
    ...props
  }, ref) => {

    const normalizedValue = Math.min(max, Math.max(min, value))
    const percentage = ((normalizedValue - min) / (max - min)) * 100

    // Calculate circle properties
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    // Generate accessibility labels
    const accessibilityLabels = progressLabels.create(
      'circular',
      normalizedValue,
      { learningState }
    )

    // Get learning state colors
    const getStrokeColor = () => {
      switch (learningState) {
        case 'discovery': return 'var(--color-discovery-primary)'
        case 'fundamentals': return 'var(--color-fundamentals-primary)'
        case 'mastery': return 'var(--color-mastery-primary)'
        default: return 'var(--color-primary)'
      }
    }

    return (
      <div className={cn('relative inline-flex items-center justify-center', className)}>
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
          role="progressbar"
          aria-valuenow={normalizedValue}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={ariaLabel || accessibilityLabels.label}
          {...props}
        >
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-muted opacity-20"
          />

          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getStrokeColor()}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-out"
            style={{
              stroke: getStrokeColor()
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showValue && (
            <span className="text-2xl font-bold text-foreground">
              {Math.round(percentage)}%
            </span>
          )}
          {showLabel && label && (
            <span className="text-sm text-muted-foreground mt-1">
              {label}
            </span>
          )}

          {/* Learning State Icon */}
          {learningState && variant === 'detailed' && (
            <SFSymbol
              name={
                learningState === 'discovery' ? 'lightbulb' :
                learningState === 'fundamentals' ? 'book' :
                'graduationcap'
              }
              size="base"
              learningState={learningState}
              className="mt-2"
            />
          )}
        </div>
      </div>
    )
  }
)

CircularProgress.displayName = 'CircularProgress'

// Step Progress Component
export const StepProgress = forwardRef<HTMLDivElement, StepProgressProps>(
  ({
    steps,
    currentStep,
    orientation = 'horizontal',
    learningState,
    className,
    'aria-label': ariaLabel,
    ...props
  }, ref) => {

    // Generate accessibility labels
    const accessibilityLabels = progressLabels.create(
      'step',
      (currentStep / steps.length) * 100,
      { learningState, currentStep: currentStep + 1, totalSteps: steps.length }
    )

    const isHorizontal = orientation === 'horizontal'

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          isHorizontal ? 'items-center' : 'flex-col space-y-4',
          className
        )}
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-label={ariaLabel || accessibilityLabels.label}
        {...props}
      >
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = step.completed || index < currentStep
          const isDisabled = step.disabled
          const showConnector = index < steps.length - 1

          return (
            <React.Fragment key={index}>
              {/* Step Item */}
              <div
                className={cn(
                  'flex items-center gap-3',
                  !isHorizontal && 'w-full'
                )}
              >
                {/* Step Indicator */}
                <div
                  className={cn(
                    'flex items-center justify-center rounded-full transition-all duration-200',
                    'min-h-[44px] min-w-[44px]', // Apple HIG touch target

                    // State styles
                    isCompleted && [
                      'bg-primary text-primary-foreground',
                      learningState === 'discovery' && 'bg-discovery-primary',
                      learningState === 'fundamentals' && 'bg-fundamentals-primary',
                      learningState === 'mastery' && 'bg-mastery-primary'
                    ],

                    isActive && !isCompleted && [
                      'bg-primary/10 border-2 border-primary text-primary',
                      learningState === 'discovery' && 'border-discovery-primary bg-discovery-background text-discovery-text',
                      learningState === 'fundamentals' && 'border-fundamentals-primary bg-fundamentals-background text-fundamentals-text',
                      learningState === 'mastery' && 'border-mastery-primary bg-mastery-background text-mastery-text'
                    ],

                    !isActive && !isCompleted && 'bg-muted text-muted-foreground',
                    isDisabled && 'opacity-50 cursor-not-allowed'
                  )}
                  aria-current={isActive ? 'step' : undefined}
                  aria-disabled={isDisabled}
                >
                  {isCompleted ? (
                    <SFSymbol
                      name="checkmark"
                      size="base"
                      className="text-current"
                      aria-hidden="true"
                    />
                  ) : step.icon ? (
                    <SFSymbol
                      name={step.icon}
                      size="base"
                      learningState={isActive ? learningState : undefined}
                      className="text-current"
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="text-sm font-medium">
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Step Content */}
                <div className={cn(
                  'flex-1 min-w-0',
                  isHorizontal && 'text-center'
                )}>
                  <div
                    className={cn(
                      'font-medium text-sm',
                      isCompleted || isActive ? 'text-foreground' : 'text-muted-foreground',
                      isDisabled && 'opacity-50'
                    )}
                  >
                    {step.label}
                  </div>
                  {step.description && (
                    <div
                      className={cn(
                        'text-xs text-muted-foreground mt-1',
                        isDisabled && 'opacity-50'
                      )}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {showConnector && (
                <div
                  className={cn(
                    'bg-border transition-colors duration-200',
                    isHorizontal ? 'flex-1 h-px mx-4' : 'w-px h-8 ml-6',
                    isCompleted && [
                      'bg-primary',
                      learningState === 'discovery' && 'bg-discovery-primary',
                      learningState === 'fundamentals' && 'bg-fundamentals-primary',
                      learningState === 'mastery' && 'bg-mastery-primary'
                    ]
                  )}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    )
  }
)

StepProgress.displayName = 'StepProgress'

// Learning Progress Specialized Component
export const LearningProgress = forwardRef<HTMLDivElement,
  Omit<ProgressProps, 'learningState'> & {
    learningState: 'discovery' | 'fundamentals' | 'mastery'
    skill?: string
    timeSpent?: string
    estimatedTime?: string
  }
>(({ learningState, skill, timeSpent, estimatedTime, label, ...props }, ref) => {

  const phaseLabels = {
    discovery: 'Exploring',
    fundamentals: 'Building Foundation',
    mastery: 'Mastering Skills'
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SFSymbol
            name={
              learningState === 'discovery' ? 'lightbulb' :
              learningState === 'fundamentals' ? 'book' :
              'graduationcap'
            }
            size="base"
            learningState={learningState}
          />
          <div>
            <h4 className="font-medium text-foreground">
              {skill || label || phaseLabels[learningState]}
            </h4>
            {(timeSpent || estimatedTime) && (
              <div className="text-sm text-muted-foreground">
                {timeSpent && <span>Time spent: {timeSpent}</span>}
                {timeSpent && estimatedTime && <span> • </span>}
                {estimatedTime && <span>Est. time: {estimatedTime}</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress */}
      <Progress
        ref={ref}
        learningState={learningState}
        showValue
        {...props}
      />
    </div>
  )
})

LearningProgress.displayName = 'LearningProgress'

export default Progress