// Error handling utilities for H2WW Figma Plugin

export interface PluginError {
  code: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
  timestamp: Date;
}

export class H2WWPluginError extends Error {
  public readonly code: string;
  public readonly severity: 'low' | 'medium' | 'high' | 'critical';
  public readonly context?: Record<string, any>;
  public readonly timestamp: Date;

  constructor(
    code: string,
    message: string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium',
    context?: Record<string, any>
  ) {
    super(message);
    this.name = 'H2WWPluginError';
    this.code = code;
    this.severity = severity;
    this.context = context;
    this.timestamp = new Date();
  }
}

// Error codes for different scenarios
export const ERROR_CODES = {
  // Figma API Errors
  FIGMA_API_ERROR: 'FIGMA_API_ERROR',
  SELECTION_REQUIRED: 'SELECTION_REQUIRED',
  INVALID_NODE_TYPE: 'INVALID_NODE_TYPE',
  COMPONENT_CREATION_FAILED: 'COMPONENT_CREATION_FAILED',

  // AI Assistant Errors
  AI_SERVICE_UNAVAILABLE: 'AI_SERVICE_UNAVAILABLE',
  ANALYSIS_FAILED: 'ANALYSIS_FAILED',
  RECOMMENDATION_ERROR: 'RECOMMENDATION_ERROR',

  // Accessibility Errors
  ACCESSIBILITY_CHECK_FAILED: 'ACCESSIBILITY_CHECK_FAILED',
  CONTRAST_CALCULATION_ERROR: 'CONTRAST_CALCULATION_ERROR',

  // Design System Errors
  TOKEN_LOAD_FAILED: 'TOKEN_LOAD_FAILED',
  COMPONENT_NOT_FOUND: 'COMPONENT_NOT_FOUND',

  // Network Errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  API_RATE_LIMITED: 'API_RATE_LIMITED',

  // General Errors
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR'
} as const;

// Anxiety-aware error messages (gentle and helpful)
const ERROR_MESSAGES = {
  [ERROR_CODES.FIGMA_API_ERROR]: {
    user: 'Something went wrong with Figma. Let\'s try that again! 😊',
    technical: 'Figma API error occurred'
  },
  [ERROR_CODES.SELECTION_REQUIRED]: {
    user: 'Please select some elements first, then we can help improve them! ✨',
    technical: 'No elements selected for operation'
  },
  [ERROR_CODES.INVALID_NODE_TYPE]: {
    user: 'This works better with different types of elements. Try selecting text, shapes, or frames! 🎯',
    technical: 'Invalid node type for requested operation'
  },
  [ERROR_CODES.AI_SERVICE_UNAVAILABLE]: {
    user: 'Our AI assistant is taking a quick break. The other features still work perfectly! 🤖',
    technical: 'AI service endpoint unavailable'
  },
  [ERROR_CODES.NETWORK_ERROR]: {
    user: 'Having trouble connecting. Check your internet and we\'ll try again! 🌐',
    technical: 'Network connection failed'
  },
  [ERROR_CODES.ACCESSIBILITY_CHECK_FAILED]: {
    user: 'The accessibility check had a hiccup. Your design still looks great! ♿',
    technical: 'Accessibility validation process failed'
  }
};

// Error handler class
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: PluginError[] = [];

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  // Handle different types of errors
  handleError(error: unknown, context?: Record<string, any>): PluginError {
    let pluginError: PluginError;

    if (error instanceof H2WWPluginError) {
      pluginError = {
        code: error.code,
        message: error.message,
        severity: error.severity,
        context: { ...error.context, ...context },
        timestamp: error.timestamp
      };
    } else if (error instanceof Error) {
      pluginError = {
        code: ERROR_CODES.UNKNOWN_ERROR,
        message: error.message,
        severity: 'medium',
        context,
        timestamp: new Date()
      };
    } else {
      pluginError = {
        code: ERROR_CODES.UNKNOWN_ERROR,
        message: 'An unexpected error occurred',
        severity: 'medium',
        context,
        timestamp: new Date()
      };
    }

    // Log error
    this.logError(pluginError);

    return pluginError;
  }

  // Log error for debugging
  private logError(error: PluginError): void {
    this.errorLog.push(error);

    // Keep only last 50 errors to prevent memory issues
    if (this.errorLog.length > 50) {
      this.errorLog = this.errorLog.slice(-50);
    }

    // Console logging for development
    const logLevel = this.getLogLevel(error.severity);
    console[logLevel](`[H2WW Plugin] ${error.code}: ${error.message}`, {
      context: error.context,
      timestamp: error.timestamp
    });
  }

  private getLogLevel(severity: string): 'log' | 'warn' | 'error' {
    switch (severity) {
      case 'critical':
      case 'high':
        return 'error';
      case 'medium':
        return 'warn';
      default:
        return 'log';
    }
  }

  // Get user-friendly error message
  getUserMessage(errorCode: string): string {
    const messageConfig = ERROR_MESSAGES[errorCode as keyof typeof ERROR_MESSAGES];
    return messageConfig?.user || 'Something unexpected happened, but don\'t worry - we\'re here to help! 💝';
  }

  // Get technical error message
  getTechnicalMessage(errorCode: string): string {
    const messageConfig = ERROR_MESSAGES[errorCode as keyof typeof ERROR_MESSAGES];
    return messageConfig?.technical || 'Unknown error occurred';
  }

  // Get error log (for debugging)
  getErrorLog(): PluginError[] {
    return [...this.errorLog];
  }

  // Clear error log
  clearErrorLog(): void {
    this.errorLog = [];
  }

  // Send error to UI with anxiety-aware messaging
  notifyUser(error: PluginError, showTechnical: boolean = false): void {
    const userMessage = this.getUserMessage(error.code);
    const technicalMessage = showTechnical ? this.getTechnicalMessage(error.code) : undefined;

    // Send to Figma UI
    if (typeof figma !== 'undefined') {
      figma.ui.postMessage({
        type: 'error-notification',
        data: {
          message: userMessage,
          technicalMessage,
          severity: error.severity,
          code: error.code,
          timestamp: error.timestamp
        }
      });
    }
  }
}

// Convenience functions for common error scenarios
export const createSelectionRequiredError = (context?: Record<string, any>) => {
  return new H2WWPluginError(
    ERROR_CODES.SELECTION_REQUIRED,
    'Please select elements to perform this action',
    'low',
    context
  );
};

export const createComponentCreationError = (componentType: string, reason?: string) => {
  return new H2WWPluginError(
    ERROR_CODES.COMPONENT_CREATION_FAILED,
    `Failed to create ${componentType} component${reason ? ': ' + reason : ''}`,
    'medium',
    { componentType, reason }
  );
};

export const createAccessibilityError = (checkType: string, details?: Record<string, any>) => {
  return new H2WWPluginError(
    ERROR_CODES.ACCESSIBILITY_CHECK_FAILED,
    `Accessibility check failed for ${checkType}`,
    'low',
    { checkType, ...details }
  );
};

export const createAIServiceError = (service: string, statusCode?: number) => {
  return new H2WWPluginError(
    ERROR_CODES.AI_SERVICE_UNAVAILABLE,
    `AI service ${service} is currently unavailable`,
    'medium',
    { service, statusCode }
  );
};

// Utility for wrapping async operations with error handling
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  errorContext?: Record<string, any>
): Promise<T> {
  const errorHandler = ErrorHandler.getInstance();

  try {
    return await operation();
  } catch (error) {
    const pluginError = errorHandler.handleError(error, errorContext);
    errorHandler.notifyUser(pluginError);
    throw pluginError;
  }
}

// Utility for wrapping sync operations with error handling
export function withSyncErrorHandling<T>(
  operation: () => T,
  errorContext?: Record<string, any>
): T {
  const errorHandler = ErrorHandler.getInstance();

  try {
    return operation();
  } catch (error) {
    const pluginError = errorHandler.handleError(error, errorContext);
    errorHandler.notifyUser(pluginError);
    throw pluginError;
  }
}