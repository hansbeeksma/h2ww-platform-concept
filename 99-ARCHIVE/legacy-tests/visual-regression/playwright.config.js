/**
 * Playwright Configuration for H2WW Visual Testing
 * Cross-browser visual regression testing with anxiety-aware scenarios
 */

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/visual-regression/specs',

  // Global test configuration
  timeout: 30000,
  expect: {
    timeout: 10000,
    // Stricter visual comparison for design system consistency
    threshold: 0.15,
    // Animation handling for anxiety-aware testing
    animations: 'disabled' // Disable animations by default to reduce anxiety triggers
  },

  // Test execution
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporting
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'junit-results.xml' }]
  ],

  // Global setup and teardown
  globalSetup: require.resolve('./global-setup.js'),
  globalTeardown: require.resolve('./global-teardown.js'),

  use: {
    // Base URL for testing
    baseURL: process.env.BASE_URL || 'http://localhost:6006',

    // Visual testing settings
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Anxiety-aware testing defaults
    reducedMotion: 'reduce', // Default to reduced motion
    colorScheme: 'light',

    // Viewport for desktop testing
    viewport: { width: 1280, height: 720 }
  },

  // Test projects for different browsers and scenarios
  projects: [
    // Desktop browsers
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        // Custom anxiety-aware settings
        colorScheme: 'light',
        reducedMotion: 'reduce'
      }
    },
    {
      name: 'firefox-desktop',
      use: {
        ...devices['Desktop Firefox'],
        colorScheme: 'light',
        reducedMotion: 'reduce'
      }
    },
    {
      name: 'webkit-desktop',
      use: {
        ...devices['Desktop Safari'],
        colorScheme: 'light',
        reducedMotion: 'reduce'
      }
    },

    // Mobile devices - critical for anxiety testing
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        colorScheme: 'light',
        reducedMotion: 'reduce'
      }
    },
    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 12'],
        colorScheme: 'light',
        reducedMotion: 'reduce'
      }
    },

    // Tablet testing
    {
      name: 'tablet-chrome',
      use: {
        ...devices['iPad Pro'],
        colorScheme: 'light',
        reducedMotion: 'reduce'
      }
    },

    // Accessibility-focused testing
    {
      name: 'high-contrast',
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'dark',
        extraHTTPHeaders: {
          'prefers-contrast': 'high'
        }
      }
    },

    // Motion-sensitive testing
    {
      name: 'reduced-motion',
      use: {
        ...devices['Desktop Chrome'],
        reducedMotion: 'reduce',
        extraHTTPHeaders: {
          'prefers-reduced-motion': 'reduce'
        }
      }
    },

    // Dark mode testing
    {
      name: 'dark-mode',
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'dark'
      }
    },

    // Stress testing for anxiety scenarios
    {
      name: 'stress-test',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 320, height: 568 }, // Cramped viewport
        deviceScaleFactor: 3, // High DPI stress
        hasTouch: true
      }
    }
  ],

  // Local dev server
  webServer: process.env.CI ? undefined : {
    command: 'npm run storybook',
    port: 6006,
    reuseExistingServer: !process.env.CI
  },

  // Anxiety-aware testing configuration
  anxietyAwareConfig: {
    // Animation testing settings
    animationSettings: {
      // Disable auto-playing animations
      disableAutoplay: true,
      // Maximum animation duration before flagging as anxiety-inducing
      maxAnimationDuration: 500,
      // Test animation pause/play controls
      testAnimationControls: true
    },

    // Color and contrast settings
    colorSettings: {
      // Minimum contrast ratios to test
      contrastRatios: {
        normal: 4.5, // WCAG AA
        large: 3.0   // WCAG AA Large text
      },
      // Test color-blind friendly palettes
      colorBlindnessTest: true,
      // Avoid seizure-inducing patterns
      seizureProtection: true
    },

    // Cognitive load testing
    cognitiveLoadSettings: {
      // Maximum elements per viewport before flagging complexity
      maxElementsPerView: 15,
      // Test information hierarchy clarity
      testHierarchy: true,
      // Measure visual noise
      visualNoiseThreshold: 0.3
    },

    // Interaction testing
    interactionSettings: {
      // Test focus indicators
      focusIndicatorTest: true,
      // Test touch target sizes
      touchTargetMinSize: 44, // 44px minimum for accessibility
      // Test hover states
      hoverStateTest: true,
      // Test keyboard navigation
      keyboardNavigationTest: true
    },

    // Performance impact on anxiety
    performanceSettings: {
      // Maximum load time before anxiety impact
      maxLoadTime: 3000,
      // Test progressive loading
      progressiveLoadingTest: true,
      // Skeleton loading states
      skeletonLoadingTest: true
    }
  }
});