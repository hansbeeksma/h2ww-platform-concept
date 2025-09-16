/**
 * Chromatic Configuration for H2WW Visual Regression Testing
 * Automated visual testing for anxiety-aware components
 */

module.exports = {
  projectToken: process.env.CHROMATIC_PROJECT_TOKEN,

  // Build configuration
  buildScriptName: 'build-storybook',
  storybookBuildDir: 'storybook-static',

  // Visual regression settings
  exitZeroOnChanges: false, // Exit with error code if visual changes detected
  exitOnceUploaded: false, // Wait for build to complete

  // Anxiety-aware testing configurations
  threshold: 0.2, // Stricter threshold for design system consistency

  // Component testing strategy
  onlyChanged: process.env.CI === 'true', // Only test changed components in CI

  // Cross-platform testing
  browsers: [
    'chrome',
    'firefox',
    'safari',
    'edge'
  ],

  // Viewport configurations for anxiety testing
  viewports: [
    // Mobile viewports - critical for anxiety-inducing cramped layouts
    {
      name: 'Mobile Small',
      width: 320,
      height: 568,
      deviceScaleFactor: 2
    },
    {
      name: 'Mobile Medium',
      width: 375,
      height: 667,
      deviceScaleFactor: 2
    },
    {
      name: 'Mobile Large',
      width: 414,
      height: 896,
      deviceScaleFactor: 3
    },

    // Tablet viewports
    {
      name: 'Tablet Portrait',
      width: 768,
      height: 1024,
      deviceScaleFactor: 2
    },
    {
      name: 'Tablet Landscape',
      width: 1024,
      height: 768,
      deviceScaleFactor: 2
    },

    // Desktop viewports
    {
      name: 'Desktop Small',
      width: 1280,
      height: 720,
      deviceScaleFactor: 1
    },
    {
      name: 'Desktop Medium',
      width: 1440,
      height: 900,
      deviceScaleFactor: 1
    },
    {
      name: 'Desktop Large',
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    },

    // Accessibility viewports
    {
      name: 'High DPI',
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2
    }
  ],

  // Anxiety-specific testing scenarios
  modes: {
    // Standard modes
    'light': {
      theme: 'light',
      background: '#ffffff'
    },
    'dark': {
      theme: 'dark',
      background: '#1a1a1a'
    },

    // High contrast mode for accessibility
    'high-contrast': {
      theme: 'high-contrast',
      background: '#000000',
      className: 'high-contrast-mode'
    },

    // Reduced motion for anxiety-sensitive users
    'reduced-motion': {
      theme: 'light',
      className: 'reduced-motion',
      prefersReducedMotion: true
    },

    // Anxiety-inducing scenarios to avoid
    'stress-test': {
      theme: 'light',
      className: 'stress-test-mode',
      // Test components under stressful conditions
    },

    // Focus testing for keyboard navigation
    'focus-visible': {
      theme: 'light',
      className: 'focus-visible-mode'
    }
  },

  // Ignore patterns for files that shouldn't trigger visual tests
  ignore: [
    'node_modules/**',
    'dist/**',
    'coverage/**',
    '**/*.test.js',
    '**/*.spec.js'
  ],

  // Auto-accept changes for specific scenarios
  autoAcceptChanges: process.env.NODE_ENV === 'development' ? 'false' : 'true',

  // Debugging options
  debug: process.env.DEBUG_CHROMATIC === 'true',
  diagnostics: true,

  // Performance optimization
  zip: true, // Compress uploads
  uploadMetadata: true,

  // Collaboration features
  assignReviewers: ['design-team', 'frontend-team'],

  // Custom configuration for anxiety-aware testing
  anxietyAwareConfig: {
    // Animation testing
    captureAnimations: true,
    animationPauseThreshold: 0.5, // Pause after 500ms to capture mid-animation

    // Color contrast validation
    contrastThreshold: 4.5, // WCAG AA standard

    // Focus indicator testing
    focusTestingEnabled: true,

    // Motion sensitivity
    motionSensitivityTest: true,

    // Cognitive load assessment
    cognitiveLoadMetrics: true,

    // Accessibility overlay testing
    a11yOverlayTest: true
  }
};