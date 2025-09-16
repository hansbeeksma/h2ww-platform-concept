/**
 * Apple HIG Voice Control Support for H2WW Design System
 * Web Speech API integration for hands-free navigation and learning
 */

// Voice Control Command Types
export type VoiceCommand =
  | 'navigate'
  | 'select'
  | 'activate'
  | 'scroll'
  | 'search'
  | 'help'
  | 'back'
  | 'forward'
  | 'home'
  | 'pause'
  | 'play'
  | 'next'
  | 'previous'

// Learning State Voice Commands
export type LearningVoiceCommand =
  | 'start-discovery'
  | 'continue-fundamentals'
  | 'advance-mastery'
  | 'show-progress'
  | 'review-lesson'
  | 'take-quiz'
  | 'bookmark'
  | 'share'

export interface VoiceControlOptions {
  language?: string
  continuous?: boolean
  interimResults?: boolean
  maxAlternatives?: number
  serviceURI?: string
  onCommand?: (command: string, confidence: number) => void
  onError?: (error: SpeechRecognitionErrorEvent) => void
}

// Apple HIG Voice Control Implementation
export class AppleVoiceControl {
  private recognition: SpeechRecognition | null = null
  private isListening = false
  private options: VoiceControlOptions
  private commandMap: Map<string, () => void>
  private learningState: 'discovery' | 'fundamentals' | 'mastery' | null = null

  constructor(options: VoiceControlOptions = {}) {
    this.options = {
      language: 'en-US',
      continuous: true,
      interimResults: false,
      maxAlternatives: 3,
      ...options
    }

    this.commandMap = new Map()
    this.initializeVoiceRecognition()
    this.setupDefaultCommands()
  }

  /**
   * Initialize Web Speech API recognition
   */
  private initializeVoiceRecognition(): void {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    this.recognition = new SpeechRecognition()

    this.recognition.continuous = this.options.continuous || true
    this.recognition.interimResults = this.options.interimResults || false
    this.recognition.maxAlternatives = this.options.maxAlternatives || 3
    this.recognition.lang = this.options.language || 'en-US'

    this.recognition.onresult = this.handleVoiceResult.bind(this)
    this.recognition.onerror = this.handleVoiceError.bind(this)
    this.recognition.onstart = () => {
      this.isListening = true
      this.announceToScreenReader('Voice control activated', 'polite')
    }
    this.recognition.onend = () => {
      this.isListening = false
      this.announceToScreenReader('Voice control deactivated', 'polite')
    }
  }

  /**
   * Setup default Apple HIG voice commands
   */
  private setupDefaultCommands(): void {
    // Navigation Commands
    this.addCommand(['go home', 'navigate home', 'home'], () => {
      this.navigateToHome()
    })

    this.addCommand(['go back', 'navigate back', 'back'], () => {
      this.navigateBack()
    })

    this.addCommand(['go forward', 'navigate forward', 'forward'], () => {
      this.navigateForward()
    })

    // Learning State Commands
    this.addCommand(['start discovery', 'begin discovery', 'discovery mode'], () => {
      this.setLearningState('discovery')
    })

    this.addCommand(['continue fundamentals', 'fundamentals mode'], () => {
      this.setLearningState('fundamentals')
    })

    this.addCommand(['advance mastery', 'mastery mode'], () => {
      this.setLearningState('mastery')
    })

    // Interaction Commands
    this.addCommand(['select', 'choose', 'activate'], () => {
      this.activateCurrentFocus()
    })

    this.addCommand(['scroll up', 'scroll top'], () => {
      this.scrollPage('up')
    })

    this.addCommand(['scroll down', 'scroll bottom'], () => {
      this.scrollPage('down')
    })

    // Learning Commands
    this.addCommand(['show progress', 'check progress'], () => {
      this.showProgress()
    })

    this.addCommand(['help', 'show help', 'voice help'], () => {
      this.showVoiceHelp()
    })
  }

  /**
   * Handle voice recognition results
   */
  private handleVoiceResult(event: SpeechRecognitionEvent): void {
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim()
    const confidence = event.results[event.results.length - 1][0].confidence

    // Find matching command
    for (const [commands, callback] of this.commandMap.entries()) {
      const commandList = commands.split(',').map(cmd => cmd.trim())

      if (commandList.some(cmd => transcript.includes(cmd))) {
        callback()
        this.announceToScreenReader(`Voice command executed: ${transcript}`, 'polite')

        if (this.options.onCommand) {
          this.options.onCommand(transcript, confidence)
        }
        return
      }
    }

    // No command found - provide feedback
    this.announceToScreenReader('Voice command not recognized. Say "help" for available commands.', 'polite')
  }

  /**
   * Handle voice recognition errors
   */
  private handleVoiceError(event: SpeechRecognitionErrorEvent): void {
    let errorMessage = 'Voice recognition error'

    switch (event.error) {
      case 'network':
        errorMessage = 'Network error during voice recognition'
        break
      case 'not-allowed':
        errorMessage = 'Microphone access denied'
        break
      case 'no-speech':
        errorMessage = 'No speech detected'
        break
      case 'audio-capture':
        errorMessage = 'Audio capture failed'
        break
      default:
        errorMessage = `Voice recognition error: ${event.error}`
    }

    this.announceToScreenReader(errorMessage, 'assertive')

    if (this.options.onError) {
      this.options.onError(event)
    }
  }

  /**
   * Start voice control
   */
  public start(): void {
    if (!this.recognition) {
      console.warn('Voice recognition not available')
      return
    }

    if (this.isListening) {
      return
    }

    try {
      this.recognition.start()
    } catch (error) {
      console.error('Failed to start voice recognition:', error)
    }
  }

  /**
   * Stop voice control
   */
  public stop(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
    }
  }

  /**
   * Add custom voice command
   */
  public addCommand(commands: string | string[], callback: () => void): void {
    const commandKey = Array.isArray(commands) ? commands.join(',') : commands
    this.commandMap.set(commandKey.toLowerCase(), callback)
  }

  /**
   * Remove voice command
   */
  public removeCommand(commands: string | string[]): void {
    const commandKey = Array.isArray(commands) ? commands.join(',') : commands
    this.commandMap.delete(commandKey.toLowerCase())
  }

  /**
   * Set learning state for context-aware commands
   */
  public setLearningState(state: 'discovery' | 'fundamentals' | 'mastery'): void {
    this.learningState = state
    this.announceToScreenReader(`Learning state set to ${state}`, 'polite')

    // Trigger learning state change event
    const event = new CustomEvent('learningStateChange', {
      detail: { state }
    })
    document.dispatchEvent(event)
  }

  /**
   * Get available voice commands
   */
  public getAvailableCommands(): string[] {
    const commands: string[] = []

    for (const commandKey of this.commandMap.keys()) {
      const commandList = commandKey.split(',')
      commands.push(...commandList)
    }

    return commands.sort()
  }

  /**
   * Check if voice control is supported
   */
  public static isSupported(): boolean {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
  }

  /**
   * Navigation methods
   */
  private navigateToHome(): void {
    window.location.href = '/'
  }

  private navigateBack(): void {
    window.history.back()
  }

  private navigateForward(): void {
    window.history.forward()
  }

  /**
   * Interaction methods
   */
  private activateCurrentFocus(): void {
    const focusedElement = document.activeElement as HTMLElement

    if (focusedElement && focusedElement.click) {
      focusedElement.click()
    }
  }

  private scrollPage(direction: 'up' | 'down'): void {
    const scrollAmount = direction === 'up' ? -window.innerHeight / 2 : window.innerHeight / 2
    window.scrollBy({ top: scrollAmount, behavior: 'smooth' })
  }

  /**
   * Learning methods
   */
  private showProgress(): void {
    // Trigger progress display
    const event = new CustomEvent('showProgress')
    document.dispatchEvent(event)
  }

  private showVoiceHelp(): void {
    const commands = this.getAvailableCommands()
    const helpMessage = `Available voice commands: ${commands.slice(0, 5).join(', ')} and ${commands.length - 5} more. Visit help page for complete list.`

    this.announceToScreenReader(helpMessage, 'polite')
  }

  /**
   * Accessibility helper
   */
  private announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.style.position = 'absolute'
    announcement.style.left = '-10000px'
    announcement.style.width = '1px'
    announcement.style.height = '1px'
    announcement.style.overflow = 'hidden'
    announcement.textContent = message

    document.body.appendChild(announcement)

    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement)
      }
    }, 1000)
  }
}

// Voice Control Utilities
export const voiceControlUtils = {
  /**
   * Create voice-enabled component wrapper
   */
  createVoiceEnabledComponent: (
    element: HTMLElement,
    commands: string[],
    action: () => void
  ): void => {
    element.setAttribute('data-voice-commands', commands.join(','))
    element.setAttribute('aria-describedby', 'voice-control-description')

    // Add voice control description
    const description = document.createElement('span')
    description.id = 'voice-control-description'
    description.className = 'sr-only'
    description.textContent = `Voice commands: ${commands.join(', ')}`
    element.appendChild(description)
  },

  /**
   * Generate voice command labels for components
   */
  generateVoiceLabel: (
    componentType: string,
    learningState?: 'discovery' | 'fundamentals' | 'mastery',
    context?: string
  ): string => {
    const base = `${componentType}`
    const state = learningState ? ` in ${learningState} phase` : ''
    const contextLabel = context ? ` - ${context}` : ''

    return `${base}${state}${contextLabel}. Voice activated.`
  },

  /**
   * Setup voice control for learning components
   */
  setupLearningVoiceControl: (
    voiceControl: AppleVoiceControl,
    learningState: 'discovery' | 'fundamentals' | 'mastery'
  ): void => {
    switch (learningState) {
      case 'discovery':
        voiceControl.addCommand(['explore topic', 'learn more', 'show examples'], () => {
          const event = new CustomEvent('voiceExplore')
          document.dispatchEvent(event)
        })
        break

      case 'fundamentals':
        voiceControl.addCommand(['practice', 'take exercise', 'test knowledge'], () => {
          const event = new CustomEvent('voicePractice')
          document.dispatchEvent(event)
        })
        break

      case 'mastery':
        voiceControl.addCommand(['advanced options', 'customize', 'share knowledge'], () => {
          const event = new CustomEvent('voiceAdvanced')
          document.dispatchEvent(event)
        })
        break
    }
  }
}

// Global Voice Control Instance
export const globalVoiceControl = new AppleVoiceControl({
  language: 'en-US',
  continuous: true,
  interimResults: false,
  maxAlternatives: 3
})

// Auto-start voice control when supported
if (AppleVoiceControl.isSupported()) {
  document.addEventListener('DOMContentLoaded', () => {
    // Only auto-start if user prefers voice control
    const preferVoiceControl = localStorage.getItem('h2ww-voice-control-enabled') === 'true'

    if (preferVoiceControl) {
      globalVoiceControl.start()
    }
  })
}

export { AppleVoiceControl as default }