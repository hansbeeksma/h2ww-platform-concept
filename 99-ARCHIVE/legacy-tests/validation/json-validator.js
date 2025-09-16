/**
 * H2WW JSON Validation Pipeline
 * Automated validation for component and design token JSON files
 */

const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class H2WWJSONValidator {
  constructor() {
    this.ajv = new Ajv({
      allErrors: true,
      verbose: true,
      strict: false
    });
    addFormats(this.ajv);

    this.schemas = {};
    this.loadSchemas();
  }

  /**
   * Load all JSON schemas from the schemas directory
   */
  loadSchemas() {
    const schemasDir = path.join(__dirname, '../schemas');
    const schemaFiles = fs.readdirSync(schemasDir).filter(file => file.endsWith('.json'));

    schemaFiles.forEach(file => {
      const schemaPath = path.join(schemasDir, file);
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
      const schemaName = file.replace('.json', '');

      this.schemas[schemaName] = schema;
      this.ajv.addSchema(schema, schemaName);
    });

    console.log(chalk.blue(`✓ Loaded ${schemaFiles.length} schemas`));
  }

  /**
   * Validate a JSON file against a specific schema
   * @param {string} filePath - Path to the JSON file
   * @param {string} schemaName - Name of the schema to validate against
   * @returns {object} Validation result
   */
  validateFile(filePath, schemaName) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContent);

      return this.validateData(jsonData, schemaName, filePath);
    } catch (error) {
      return {
        valid: false,
        filePath,
        schemaName,
        errors: [{
          message: `Failed to parse JSON: ${error.message}`,
          instancePath: '',
          severity: 'error'
        }]
      };
    }
  }

  /**
   * Validate JSON data against a schema
   * @param {object} data - JSON data to validate
   * @param {string} schemaName - Name of the schema
   * @param {string} source - Source identifier (file path or description)
   * @returns {object} Validation result
   */
  validateData(data, schemaName, source = 'unknown') {
    const validate = this.ajv.getSchema(schemaName);

    if (!validate) {
      return {
        valid: false,
        source,
        schemaName,
        errors: [{
          message: `Schema '${schemaName}' not found`,
          instancePath: '',
          severity: 'error'
        }]
      };
    }

    const valid = validate(data);

    const result = {
      valid,
      source,
      schemaName,
      errors: valid ? [] : this.formatErrors(validate.errors)
    };

    // Add custom H2WW specific validations
    if (valid) {
      const customValidation = this.runCustomValidations(data, schemaName);
      if (!customValidation.valid) {
        result.valid = false;
        result.errors.push(...customValidation.errors);
      }
    }

    return result;
  }

  /**
   * Format AJV errors for better readability
   * @param {array} errors - Array of AJV errors
   * @returns {array} Formatted errors
   */
  formatErrors(errors) {
    return errors.map(error => ({
      message: error.message,
      instancePath: error.instancePath,
      schemaPath: error.schemaPath,
      data: error.data,
      severity: this.getErrorSeverity(error)
    }));
  }

  /**
   * Determine error severity based on error type
   * @param {object} error - AJV error object
   * @returns {string} Severity level
   */
  getErrorSeverity(error) {
    const criticalKeywords = ['required', 'type', 'format'];
    const warningKeywords = ['pattern', 'minLength', 'maxLength'];

    if (criticalKeywords.includes(error.keyword)) {
      return 'error';
    } else if (warningKeywords.includes(error.keyword)) {
      return 'warning';
    }

    return 'info';
  }

  /**
   * Run custom H2WW-specific validations
   * @param {object} data - JSON data
   * @param {string} schemaName - Schema name
   * @returns {object} Custom validation result
   */
  runCustomValidations(data, schemaName) {
    const errors = [];

    if (schemaName === 'component-schema') {
      // Validate anxiety-aware component specific rules
      errors.push(...this.validateAnxietyAwareComponent(data));
    } else if (schemaName === 'design-tokens-schema') {
      // Validate design tokens specific rules
      errors.push(...this.validateDesignTokens(data));
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate anxiety-aware component specific rules
   * @param {object} component - Component data
   * @returns {array} Validation errors
   */
  validateAnxietyAwareComponent(component) {
    const errors = [];

    // Check that high anxiety components have anxiety reduction techniques
    component.variants?.forEach((variant, index) => {
      if (variant.anxietyLevel === 'high' && (!component.anxietyReduction || component.anxietyReduction.length === 0)) {
        errors.push({
          message: 'High anxiety components must implement anxiety reduction techniques',
          instancePath: `/variants/${index}`,
          severity: 'error'
        });
      }

      // Check accessibility score consistency
      if (variant.accessibilityScore < 70 && component.accessibilityFeatures?.length < 3) {
        errors.push({
          message: 'Components with low accessibility scores should implement more accessibility features',
          instancePath: `/variants/${index}/accessibilityScore`,
          severity: 'warning'
        });
      }
    });

    // Validate required anxiety reduction techniques for certain categories
    if (component.category === 'organism' && (!component.anxietyReduction || component.anxietyReduction.length < 2)) {
      errors.push({
        message: 'Organism components should implement at least 2 anxiety reduction techniques',
        instancePath: '/anxietyReduction',
        severity: 'warning'
      });
    }

    return errors;
  }

  /**
   * Validate design tokens specific rules
   * @param {object} tokens - Design tokens data
   * @returns {array} Validation errors
   */
  validateDesignTokens(tokens) {
    const errors = [];

    // Check color contrast requirements
    if (tokens.visualLanguage?.color?.palettes) {
      const colorValidation = this.validateColorContrast(tokens.visualLanguage.color.palettes);
      errors.push(...colorValidation);
    }

    // Check typography scale consistency
    if (tokens.visualLanguage?.typography?.hierarchy) {
      const typographyValidation = this.validateTypographyScale(tokens.visualLanguage.typography.hierarchy);
      errors.push(...typographyValidation);
    }

    return errors;
  }

  /**
   * Validate color contrast for anxiety-aware design
   * @param {object} palettes - Color palettes
   * @returns {array} Validation errors
   */
  validateColorContrast(palettes) {
    const errors = [];

    // This is a simplified check - in practice, you'd use a color contrast library
    if (palettes.primary && palettes.neutral) {
      // Check if primary colors have sufficient contrast with neutral backgrounds
      // This would require a proper color contrast calculation library
      console.log('Color contrast validation would be implemented here');
    }

    return errors;
  }

  /**
   * Validate typography scale for readability
   * @param {object} hierarchy - Typography hierarchy
   * @returns {array} Validation errors
   */
  validateTypographyScale(hierarchy) {
    const errors = [];

    // Check minimum font sizes for accessibility
    Object.entries(hierarchy).forEach(([level, styles]) => {
      if (styles.size) {
        const size = parseInt(styles.size.replace('px', ''));
        if (size < 12) {
          errors.push({
            message: `Font size ${styles.size} may be too small for accessibility`,
            instancePath: `/visualLanguage/typography/hierarchy/${level}/size`,
            severity: 'warning'
          });
        }
      }
    });

    return errors;
  }

  /**
   * Validate all JSON files in a directory
   * @param {string} directory - Directory to scan
   * @param {string} schemaName - Schema to validate against
   * @returns {array} Array of validation results
   */
  validateDirectory(directory, schemaName) {
    const results = [];
    const files = this.findJSONFiles(directory);

    files.forEach(file => {
      const result = this.validateFile(file, schemaName);
      results.push(result);
    });

    return results;
  }

  /**
   * Find all JSON files in a directory recursively
   * @param {string} directory - Directory to search
   * @returns {array} Array of file paths
   */
  findJSONFiles(directory) {
    const files = [];

    const scan = (dir) => {
      const items = fs.readdirSync(dir);

      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scan(fullPath);
        } else if (stat.isFile() && item.endsWith('.json')) {
          files.push(fullPath);
        }
      });
    };

    scan(directory);
    return files;
  }

  /**
   * Generate validation report
   * @param {array} results - Array of validation results
   * @returns {object} Formatted report
   */
  generateReport(results) {
    const report = {
      summary: {
        total: results.length,
        valid: results.filter(r => r.valid).length,
        invalid: results.filter(r => r.valid === false).length,
        errors: 0,
        warnings: 0
      },
      details: results
    };

    // Count errors and warnings
    results.forEach(result => {
      result.errors.forEach(error => {
        if (error.severity === 'error') {
          report.summary.errors++;
        } else if (error.severity === 'warning') {
          report.summary.warnings++;
        }
      });
    });

    return report;
  }

  /**
   * Print validation report to console
   * @param {object} report - Validation report
   */
  printReport(report) {
    console.log('\n' + chalk.bold('H2WW JSON Validation Report'));
    console.log('═'.repeat(50));

    // Summary
    console.log(chalk.bold('\nSummary:'));
    console.log(`Total files: ${report.summary.total}`);
    console.log(chalk.green(`✓ Valid: ${report.summary.valid}`));
    console.log(chalk.red(`✗ Invalid: ${report.summary.invalid}`));
    console.log(chalk.red(`Errors: ${report.summary.errors}`));
    console.log(chalk.yellow(`Warnings: ${report.summary.warnings}`));

    // Details
    if (report.summary.invalid > 0) {
      console.log(chalk.bold('\nValidation Issues:'));

      report.details.forEach(result => {
        if (!result.valid) {
          console.log(`\n${chalk.red('✗')} ${result.source || result.filePath}`);

          result.errors.forEach(error => {
            const icon = error.severity === 'error' ? '❌' : '⚠️';
            const color = error.severity === 'error' ? chalk.red : chalk.yellow;

            console.log(`  ${icon} ${color(error.message)}`);
            if (error.instancePath) {
              console.log(`     Path: ${error.instancePath}`);
            }
          });
        }
      });
    }

    console.log('\n');
  }
}

module.exports = H2WWJSONValidator;

// CLI usage
if (require.main === module) {
  const validator = new H2WWJSONValidator();
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: node json-validator.js <file_or_directory> <schema_name>');
    console.log('Available schemas:', Object.keys(validator.schemas).join(', '));
    process.exit(1);
  }

  const [target, schemaName] = args;
  let results;

  if (fs.statSync(target).isDirectory()) {
    results = validator.validateDirectory(target, schemaName);
  } else {
    results = [validator.validateFile(target, schemaName)];
  }

  const report = validator.generateReport(results);
  validator.printReport(report);

  // Exit with error code if validation failed
  process.exit(report.summary.invalid > 0 ? 1 : 0);
}