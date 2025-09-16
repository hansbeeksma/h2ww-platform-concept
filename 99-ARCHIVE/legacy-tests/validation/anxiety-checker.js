/**
 * H2WW Anxiety-Aware Design Validation
 * Validates components against anxiety-reducing design principles
 */

const fs = require('fs');
const chalk = require('chalk');

class AnxietyAwareValidator {
  constructor() {
    this.anxietyPrinciples = {
      'reduced-cognitive-load': {
        description: 'Minimize mental effort required to understand and use',
        validators: [
          this.checkCognitiveComplexity.bind(this),
          this.checkInformationDensity.bind(this)
        ]
      },
      'clear-visual-hierarchy': {
        description: 'Organize information in a clear, scannable hierarchy',
        validators: [
          this.checkVisualHierarchy.bind(this),
          this.checkContentStructure.bind(this)
        ]
      },
      'predictable-interactions': {
        description: 'Ensure interactions behave as users expect',
        validators: [
          this.checkConsistentPatterns.bind(this),
          this.checkFeedbackMechanisms.bind(this)
        ]
      },
      'progress-indicators': {
        description: 'Show progress and system status clearly',
        validators: [
          this.checkProgressFeedback.bind(this),
          this.checkLoadingStates.bind(this)
        ]
      },
      'error-prevention': {
        description: 'Prevent errors before they occur',
        validators: [
          this.checkInputValidation.bind(this),
          this.checkErrorRecovery.bind(this)
        ]
      },
      'graceful-degradation': {
        description: 'Maintain functionality when features are unavailable',
        validators: [
          this.checkFallbackStates.bind(this),
          this.checkAccessibilityFallbacks.bind(this)
        ]
      },
      'calm-color-palette': {
        description: 'Use colors that promote calm and reduce stress',
        validators: [
          this.checkColorPsychology.bind(this),
          this.checkContrastRatios.bind(this)
        ]
      },
      'consistent-spacing': {
        description: 'Use consistent spacing to create visual rhythm',
        validators: [
          this.checkSpacingConsistency.bind(this),
          this.checkLayoutBalance.bind(this)
        ]
      },
      'familiar-patterns': {
        description: 'Use established UI patterns users recognize',
        validators: [
          this.checkPatternCompliance.bind(this),
          this.checkAffordances.bind(this)
        ]
      }
    };

    this.anxietyTriggers = [
      'flashing-animations',
      'auto-playing-media',
      'time-pressure',
      'unclear-progress',
      'destructive-actions-without-confirmation',
      'overwhelming-choices',
      'inconsistent-navigation',
      'poor-error-messages',
      'forced-registration',
      'aggressive-notifications'
    ];
  }

  /**
   * Validate a component against anxiety-aware design principles
   * @param {string} filePath - Path to the component JSON file
   * @returns {object} Validation result
   */
  validateComponent(filePath) {
    try {
      const componentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return this.validateComponentData(componentData, filePath);
    } catch (error) {
      return {
        valid: false,
        filePath,
        errors: [{
          type: 'parsing-error',
          message: `Failed to parse component file: ${error.message}`,
          severity: 'error'
        }]
      };
    }
  }

  /**
   * Validate component data against anxiety principles
   * @param {object} component - Component data
   * @param {string} source - Source identifier
   * @returns {object} Validation result
   */
  validateComponentData(component, source = 'unknown') {
    const issues = [];

    // Check if component claims anxiety reduction techniques
    const claimedTechniques = component.anxietyReduction || [];

    // Validate each claimed technique
    claimedTechniques.forEach(technique => {
      if (this.anxietyPrinciples[technique]) {
        const principle = this.anxietyPrinciples[technique];
        const validationResults = principle.validators.map(validator =>
          validator(component, technique)
        );

        validationResults.forEach(result => {
          if (!result.valid) {
            issues.push({
              type: 'anxiety-principle-violation',
              technique,
              message: result.message,
              severity: result.severity || 'warning',
              suggestion: result.suggestion
            });
          }
        });
      } else {
        issues.push({
          type: 'unknown-anxiety-technique',
          technique,
          message: `Unknown anxiety reduction technique: ${technique}`,
          severity: 'warning'
        });
      }
    });

    // Check for anxiety-inducing patterns
    const anxietyIssues = this.checkForAnxietyTriggers(component);
    issues.push(...anxietyIssues);

    // Check anxiety level consistency
    const anxietyLevelIssues = this.validateAnxietyLevels(component);
    issues.push(...anxietyLevelIssues);

    return {
      valid: issues.filter(i => i.severity === 'error').length === 0,
      source,
      issues,
      anxietyScore: this.calculateAnxietyScore(component, issues)
    };
  }

  /**
   * Check cognitive complexity of component
   */
  checkCognitiveComplexity(component, technique) {
    const variants = component.variants || [];
    const maxVariants = 5; // Threshold for cognitive overload

    if (variants.length > maxVariants) {
      return {
        valid: false,
        message: `Component has ${variants.length} variants, which may increase cognitive load`,
        severity: 'warning',
        suggestion: 'Consider grouping variants or splitting into multiple components'
      };
    }

    // Check for complex property combinations
    const complexVariants = variants.filter(variant => {
      const properties = Object.keys(variant.properties || {});
      return properties.length > 4; // More than 4 properties might be complex
    });

    if (complexVariants.length > 0) {
      return {
        valid: false,
        message: 'Some variants have complex property combinations',
        severity: 'info',
        suggestion: 'Simplify variant properties or provide clear documentation'
      };
    }

    return { valid: true };
  }

  /**
   * Check information density
   */
  checkInformationDensity(component, technique) {
    const usageGuidelines = component.usageGuidelines || '';

    if (usageGuidelines.length > 500) {
      return {
        valid: false,
        message: 'Usage guidelines are very long, may contribute to cognitive load',
        severity: 'info',
        suggestion: 'Break down guidelines into smaller, digestible sections'
      };
    }

    return { valid: true };
  }

  /**
   * Check visual hierarchy
   */
  checkVisualHierarchy(component, technique) {
    const variants = component.variants || [];

    // Check if component has clear size variations
    const hasSizeVariations = variants.some(variant =>
      variant.properties && (
        variant.properties.size ||
        variant.properties.scale ||
        variant.properties.fontSize
      )
    );

    if (!hasSizeVariations && component.category === 'atom') {
      return {
        valid: false,
        message: 'Atomic components should have size variations for hierarchy',
        severity: 'warning',
        suggestion: 'Add size variants (small, medium, large) to support visual hierarchy'
      };
    }

    return { valid: true };
  }

  /**
   * Check content structure
   */
  checkContentStructure(component, technique) {
    // This would be more meaningful with actual component structure data
    // For now, check if component has proper categorization

    const validCategories = ['atom', 'molecule', 'organism', 'template'];
    if (!validCategories.includes(component.category)) {
      return {
        valid: false,
        message: 'Component category is not properly defined',
        severity: 'error',
        suggestion: 'Use atomic design principles: atom, molecule, organism, or template'
      };
    }

    return { valid: true };
  }

  /**
   * Check for consistent interaction patterns
   */
  checkConsistentPatterns(component, technique) {
    const variants = component.variants || [];

    // Check if all variants follow consistent naming
    const inconsistentNaming = variants.some(variant =>
      !variant.name || variant.name.includes(' ') || variant.name.includes('_')
    );

    if (inconsistentNaming) {
      return {
        valid: false,
        message: 'Variant naming is inconsistent, use kebab-case consistently',
        severity: 'warning',
        suggestion: 'Use consistent kebab-case naming for all variants'
      };
    }

    return { valid: true };
  }

  /**
   * Check feedback mechanisms
   */
  checkFeedbackMechanisms(component, technique) {
    const variants = component.variants || [];

    // Check if interactive components have state variations
    const interactiveTypes = ['button', 'input', 'link', 'toggle'];
    const isInteractive = interactiveTypes.some(type =>
      component.name.toLowerCase().includes(type)
    );

    if (isInteractive) {
      const hasStates = variants.some(variant =>
        variant.name && (
          variant.name.includes('hover') ||
          variant.name.includes('active') ||
          variant.name.includes('disabled') ||
          variant.name.includes('focus')
        )
      );

      if (!hasStates) {
        return {
          valid: false,
          message: 'Interactive components should have state variations (hover, active, disabled)',
          severity: 'warning',
          suggestion: 'Add state variants to provide clear interaction feedback'
        };
      }
    }

    return { valid: true };
  }

  /**
   * Check progress feedback
   */
  checkProgressFeedback(component, technique) {
    // Check if form or process components have progress indicators
    const processTypes = ['form', 'wizard', 'stepper', 'progress'];
    const isProcessComponent = processTypes.some(type =>
      component.name.toLowerCase().includes(type)
    );

    if (isProcessComponent) {
      const hasProgressIndicator = component.accessibilityFeatures?.includes('progress-indicators') ||
        component.anxietyReduction?.includes('progress-indicators');

      if (!hasProgressIndicator) {
        return {
          valid: false,
          message: 'Process components should include progress indicators',
          severity: 'warning',
          suggestion: 'Add progress indicators to reduce user anxiety about process completion'
        };
      }
    }

    return { valid: true };
  }

  /**
   * Check loading states
   */
  checkLoadingStates(component, technique) {
    // Check if data-loading components have loading states
    const dataComponents = ['table', 'list', 'card', 'dashboard'];
    const isDataComponent = dataComponents.some(type =>
      component.name.toLowerCase().includes(type)
    );

    if (isDataComponent) {
      const hasLoadingState = component.variants?.some(variant =>
        variant.name.includes('loading') || variant.name.includes('skeleton')
      );

      if (!hasLoadingState) {
        return {
          valid: false,
          message: 'Data components should have loading states',
          severity: 'info',
          suggestion: 'Add loading or skeleton variants to manage user expectations'
        };
      }
    }

    return { valid: true };
  }

  /**
   * Check input validation patterns
   */
  checkInputValidation(component, technique) {
    const isInputComponent = component.name.toLowerCase().includes('input') ||
      component.name.toLowerCase().includes('form');

    if (isInputComponent) {
      const hasValidationStates = component.variants?.some(variant =>
        variant.name.includes('error') || variant.name.includes('success') || variant.name.includes('warning')
      );

      if (!hasValidationStates) {
        return {
          valid: false,
          message: 'Input components should have validation state variants',
          severity: 'warning',
          suggestion: 'Add error, success, and warning variants for input validation'
        };
      }
    }

    return { valid: true };
  }

  /**
   * Check error recovery mechanisms
   */
  checkErrorRecovery(component, technique) {
    const hasErrorStates = component.variants?.some(variant =>
      variant.name.includes('error')
    );

    if (hasErrorStates) {
      // Check if error states provide recovery actions
      const usageGuidelines = component.usageGuidelines || '';
      const hasRecoveryGuidance = usageGuidelines.includes('recover') ||
        usageGuidelines.includes('retry') ||
        usageGuidelines.includes('help');

      if (!hasRecoveryGuidance) {
        return {
          valid: false,
          message: 'Error states should include recovery guidance',
          severity: 'info',
          suggestion: 'Add usage guidelines for error recovery actions'
        };
      }
    }

    return { valid: true };
  }

  /**
   * Check fallback states
   */
  checkFallbackStates(component, technique) {
    // Components should have graceful degradation plans
    const criticalComponents = ['navigation', 'search', 'auth'];
    const isCritical = criticalComponents.some(type =>
      component.name.toLowerCase().includes(type)
    );

    if (isCritical) {
      const hasFallback = component.variants?.some(variant =>
        variant.name.includes('fallback') || variant.name.includes('minimal')
      );

      if (!hasFallback) {
        return {
          valid: false,
          message: 'Critical components should have fallback variants',
          severity: 'warning',
          suggestion: 'Add fallback variants for when features are unavailable'
        };
      }
    }

    return { valid: true };
  }

  /**
   * Check accessibility fallbacks
   */
  checkAccessibilityFallbacks(component, technique) {
    const accessibilityFeatures = component.accessibilityFeatures || [];

    if (accessibilityFeatures.includes('screen-reader-optimized')) {
      // Should also have text alternatives
      const hasTextAlternatives = accessibilityFeatures.includes('aria-labels') ||
        accessibilityFeatures.includes('semantic-markup');

      if (!hasTextAlternatives) {
        return {
          valid: false,
          message: 'Screen reader optimized components need text alternatives',
          severity: 'error',
          suggestion: 'Add aria-labels or semantic-markup to accessibility features'
        };
      }
    }

    return { valid: true };
  }

  /**
   * Check color psychology principles
   */
  checkColorPsychology(component, technique) {
    // This would require actual color data from design tokens
    // For now, check if component mentions color-related anxiety reduction

    const name = component.name.toLowerCase();
    const hasColorSensitivity = name.includes('error') || name.includes('warning') || name.includes('danger');

    if (hasColorSensitivity) {
      const hasColorBlindSupport = component.accessibilityFeatures?.includes('color-blind-friendly');

      if (!hasColorBlindSupport) {
        return {
          valid: false,
          message: 'Components with color semantics should be color-blind friendly',
          severity: 'warning',
          suggestion: 'Add color-blind-friendly to accessibility features'
        };
      }
    }

    return { valid: true };
  }

  /**
   * Check contrast ratios
   */
  checkContrastRatios(component, technique) {
    // This would require actual color values to calculate
    // For now, check if accessibility score is adequate

    const variants = component.variants || [];
    const lowContrastVariants = variants.filter(variant =>
      variant.accessibilityScore < 70
    );

    if (lowContrastVariants.length > 0) {
      return {
        valid: false,
        message: 'Some variants may have contrast ratio issues',
        severity: 'warning',
        suggestion: 'Review color choices to ensure WCAG AA compliance'
      };
    }

    return { valid: true };
  }

  /**
   * Check spacing consistency
   */
  checkSpacingConsistency(component, technique) {
    // This would require actual spacing values
    // For now, check if component follows atomic design principles

    if (component.category === 'molecule' || component.category === 'organism') {
      const hasSpacingGuidelines = component.usageGuidelines?.includes('spacing') ||
        component.usageGuidelines?.includes('padding') ||
        component.usageGuidelines?.includes('margin');

      if (!hasSpacingGuidelines) {
        return {
          valid: false,
          message: 'Complex components should have spacing guidelines',
          severity: 'info',
          suggestion: 'Add spacing guidelines to usage documentation'
        };
      }
    }

    return { valid: true };
  }

  /**
   * Check layout balance
   */
  checkLayoutBalance(component, technique) {
    const variants = component.variants || [];

    // Check if variants have consistent property structure
    const propertyKeys = variants.map(variant =>
      Object.keys(variant.properties || {}).sort().join(',')
    );

    const uniquePropertySets = [...new Set(propertyKeys)];

    if (uniquePropertySets.length > 1 && variants.length > 1) {
      return {
        valid: false,
        message: 'Variants have inconsistent property structures',
        severity: 'info',
        suggestion: 'Ensure all variants have consistent property sets for layout balance'
      };
    }

    return { valid: true };
  }

  /**
   * Check pattern compliance
   */
  checkPatternCompliance(component, technique) {
    // Check if component follows established naming patterns
    const name = component.name.toLowerCase();
    const commonPatterns = ['button', 'input', 'card', 'modal', 'nav', 'header', 'footer'];

    const followsPattern = commonPatterns.some(pattern => name.includes(pattern));

    if (!followsPattern && component.category === 'atom') {
      return {
        valid: false,
        message: 'Atomic components should follow familiar naming patterns',
        severity: 'info',
        suggestion: 'Use recognizable component names that match user expectations'
      };
    }

    return { valid: true };
  }

  /**
   * Check affordances
   */
  checkAffordances(component, technique) {
    // Interactive components should have clear affordances
    const interactiveTypes = ['button', 'link', 'input', 'select'];
    const isInteractive = interactiveTypes.some(type =>
      component.name.toLowerCase().includes(type)
    );

    if (isInteractive) {
      const hasInteractiveFeatures = component.accessibilityFeatures?.includes('keyboard-navigable') ||
        component.accessibilityFeatures?.includes('focus-indicators');

      if (!hasInteractiveFeatures) {
        return {
          valid: false,
          message: 'Interactive components should have clear affordances',
          severity: 'warning',
          suggestion: 'Add keyboard navigation and focus indicators'
        };
      }
    }

    return { valid: true };
  }

  /**
   * Check for anxiety-inducing patterns
   */
  checkForAnxietyTriggers(component) {
    const issues = [];
    const name = component.name.toLowerCase();
    const guidelines = component.usageGuidelines?.toLowerCase() || '';

    // Check for flashing or auto-playing content
    if (name.includes('flash') || name.includes('blink') || guidelines.includes('auto-play')) {
      issues.push({
        type: 'anxiety-trigger',
        trigger: 'flashing-animations',
        message: 'Flashing or auto-playing content can trigger anxiety',
        severity: 'error',
        suggestion: 'Remove auto-playing features or provide user controls'
      });
    }

    // Check for time pressure
    if (name.includes('countdown') || name.includes('timer') || guidelines.includes('timeout')) {
      issues.push({
        type: 'anxiety-trigger',
        trigger: 'time-pressure',
        message: 'Time pressure elements can increase user anxiety',
        severity: 'warning',
        suggestion: 'Provide clear time expectations and easy extensions'
      });
    }

    // Check for aggressive notifications
    if (name.includes('alert') || name.includes('notification')) {
      const hasControls = guidelines.includes('dismiss') || guidelines.includes('control');

      if (!hasControls) {
        issues.push({
          type: 'anxiety-trigger',
          trigger: 'aggressive-notifications',
          message: 'Alerts should be dismissible to reduce anxiety',
          severity: 'warning',
          suggestion: 'Add dismissal controls and user preferences for notifications'
        });
      }
    }

    return issues;
  }

  /**
   * Validate anxiety level consistency
   */
  validateAnxietyLevels(component) {
    const issues = [];
    const variants = component.variants || [];

    variants.forEach((variant, index) => {
      if (!variant.anxietyLevel) {
        issues.push({
          type: 'missing-anxiety-level',
          message: `Variant ${variant.name} missing anxiety level`,
          severity: 'error'
        });
      } else if (!['very-low', 'low', 'medium', 'high'].includes(variant.anxietyLevel)) {
        issues.push({
          type: 'invalid-anxiety-level',
          message: `Invalid anxiety level: ${variant.anxietyLevel}`,
          severity: 'error'
        });
      }

      // Check consistency between anxiety level and reduction techniques
      if (variant.anxietyLevel === 'high' && (!component.anxietyReduction || component.anxietyReduction.length < 2)) {
        issues.push({
          type: 'anxiety-level-inconsistency',
          message: 'High anxiety components should implement multiple reduction techniques',
          severity: 'warning',
          suggestion: 'Add more anxiety reduction techniques for high anxiety components'
        });
      }
    });

    return issues;
  }

  /**
   * Calculate overall anxiety score for component
   */
  calculateAnxietyScore(component, issues) {
    let score = 100; // Start with perfect score

    issues.forEach(issue => {
      switch (issue.severity) {
        case 'error':
          score -= 20;
          break;
        case 'warning':
          score -= 10;
          break;
        case 'info':
          score -= 5;
          break;
      }
    });

    // Bonus for implemented anxiety reduction techniques
    const techniques = component.anxietyReduction || [];
    score += techniques.length * 2;

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Generate detailed report
   */
  generateReport(results) {
    const report = {
      summary: {
        totalComponents: results.length,
        passedComponents: results.filter(r => r.valid).length,
        averageAnxietyScore: 0,
        commonIssues: {}
      },
      details: results
    };

    // Calculate average anxiety score
    const scores = results.map(r => r.anxietyScore || 0);
    report.summary.averageAnxietyScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    // Identify common issues
    results.forEach(result => {
      result.issues?.forEach(issue => {
        const key = issue.type;
        report.summary.commonIssues[key] = (report.summary.commonIssues[key] || 0) + 1;
      });
    });

    return report;
  }

  /**
   * Print report to console
   */
  printReport(report) {
    console.log(chalk.bold('\n🧠 H2WW Anxiety-Aware Design Validation Report'));
    console.log('═'.repeat(60));

    // Summary
    console.log(chalk.bold('\nSummary:'));
    console.log(`Total components: ${report.summary.totalComponents}`);
    console.log(chalk.green(`✓ Passed: ${report.summary.passedComponents}`));
    console.log(chalk.red(`✗ Issues: ${report.summary.totalComponents - report.summary.passedComponents}`));
    console.log(`Average anxiety score: ${report.summary.averageAnxietyScore.toFixed(1)}/100`);

    // Common issues
    if (Object.keys(report.summary.commonIssues).length > 0) {
      console.log(chalk.bold('\nMost Common Issues:'));
      Object.entries(report.summary.commonIssues)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .forEach(([issue, count]) => {
          console.log(`  ${chalk.yellow('•')} ${issue}: ${count} occurrences`);
        });
    }

    // Detailed issues
    report.details.forEach(result => {
      if (result.issues && result.issues.length > 0) {
        console.log(`\n${chalk.red('✗')} ${result.source}`);
        console.log(`  Anxiety score: ${result.anxietyScore}/100`);

        result.issues.forEach(issue => {
          const icon = issue.severity === 'error' ? '❌' : issue.severity === 'warning' ? '⚠️' : 'ℹ️';
          const color = issue.severity === 'error' ? chalk.red : issue.severity === 'warning' ? chalk.yellow : chalk.blue;

          console.log(`  ${icon} ${color(issue.message)}`);
          if (issue.suggestion) {
            console.log(`     💡 ${chalk.dim(issue.suggestion)}`);
          }
        });
      } else {
        console.log(`${chalk.green('✓')} ${result.source} (score: ${result.anxietyScore}/100)`);
      }
    });

    console.log('\n');
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node anxiety-checker.js <file_or_directory>');
    process.exit(1);
  }

  const validator = new AnxietyAwareValidator();
  const target = args[0];
  const results = [];

  if (fs.statSync(target).isDirectory()) {
    // Validate all JSON files in directory
    const files = fs.readdirSync(target)
      .filter(file => file.endsWith('.json'))
      .map(file => `${target}/${file}`);

    files.forEach(file => {
      const result = validator.validateComponent(file);
      results.push(result);
    });
  } else {
    // Validate single file
    const result = validator.validateComponent(target);
    results.push(result);
  }

  const report = validator.generateReport(results);
  validator.printReport(report);

  // Exit with error code if validation failed
  const hasErrors = results.some(r => !r.valid);
  process.exit(hasErrors ? 1 : 0);
}

module.exports = AnxietyAwareValidator;