/**
 * H2WW Performance Testing for Large Design Files
 * Tests the system's ability to handle large Figma files and component libraries
 */

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');
const H2WWJSONValidator = require('../validation/json-validator');

class PerformanceTester {
  constructor() {
    this.validator = new H2WWJSONValidator();
    this.results = {
      fileProcessing: [],
      validation: [],
      memory: [],
      transformations: []
    };
  }

  /**
   * Test processing of large component libraries
   */
  async testLargeComponentLibrary() {
    console.log('🚀 Testing large component library processing...');

    // Generate test data with varying sizes
    const testSizes = [10, 50, 100, 500, 1000];

    for (const size of testSizes) {
      const startTime = performance.now();
      const startMemory = process.memoryUsage();

      // Generate large component library
      const components = this.generateLargeComponentSet(size);

      // Test JSON generation
      const jsonGenTime = await this.testJSONGeneration(components, size);

      // Test validation
      const validationTime = await this.testValidationPerformance(components, size);

      const endTime = performance.now();
      const endMemory = process.memoryUsage();

      const result = {
        componentCount: size,
        totalTime: endTime - startTime,
        jsonGenerationTime: jsonGenTime,
        validationTime: validationTime,
        memoryUsage: {
          before: startMemory,
          after: endMemory,
          peak: endMemory.heapUsed - startMemory.heapUsed
        }
      };

      this.results.fileProcessing.push(result);

      console.log(`✓ Processed ${size} components in ${(result.totalTime).toFixed(2)}ms`);
      console.log(`  Memory peak: ${(result.memoryUsage.peak / 1024 / 1024).toFixed(2)}MB`);
    }
  }

  /**
   * Test JSON generation performance
   */
  async testJSONGeneration(components, size) {
    const startTime = performance.now();

    const jsonOutput = {
      version: '2.0.0',
      generated: new Date().toISOString(),
      componentCount: size,
      components: components
    };

    // Simulate writing to file
    const jsonString = JSON.stringify(jsonOutput, null, 2);
    const fileSize = Buffer.byteLength(jsonString, 'utf8');

    const endTime = performance.now();

    this.results.transformations.push({
      size,
      generationTime: endTime - startTime,
      fileSize,
      throughput: fileSize / ((endTime - startTime) / 1000) // bytes per second
    });

    return endTime - startTime;
  }

  /**
   * Test validation performance
   */
  async testValidationPerformance(components, size) {
    const startTime = performance.now();

    // Validate each component
    const validationResults = components.map(component => {
      return this.validator.validateData(component, 'component-schema', `test-component-${size}`);
    });

    const endTime = performance.now();
    const validationTime = endTime - startTime;

    // Calculate validation metrics
    const validComponents = validationResults.filter(r => r.valid).length;
    const avgValidationTime = validationTime / components.length;

    this.results.validation.push({
      size,
      totalValidationTime: validationTime,
      averagePerComponent: avgValidationTime,
      validComponents,
      validationThroughput: components.length / (validationTime / 1000) // components per second
    });

    return validationTime;
  }

  /**
   * Test memory usage patterns
   */
  async testMemoryUsage() {
    console.log('🧠 Testing memory usage patterns...');

    const testSizes = [100, 500, 1000, 2000];

    for (const size of testSizes) {
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const initialMemory = process.memoryUsage();
      const memorySnapshots = [initialMemory];

      // Create large dataset
      const components = this.generateLargeComponentSet(size);
      memorySnapshots.push(process.memoryUsage());

      // Process data
      const jsonString = JSON.stringify(components, null, 2);
      memorySnapshots.push(process.memoryUsage());

      // Validate data
      components.forEach(component => {
        this.validator.validateData(component, 'component-schema');
      });
      memorySnapshots.push(process.memoryUsage());

      // Calculate memory growth
      const memoryGrowth = memorySnapshots.map((snapshot, index) => ({
        phase: ['initial', 'after-generation', 'after-json', 'after-validation'][index],
        heapUsed: snapshot.heapUsed,
        heapTotal: snapshot.heapTotal,
        external: snapshot.external
      }));

      this.results.memory.push({
        size,
        memoryGrowth,
        peakMemory: Math.max(...memorySnapshots.map(s => s.heapUsed)),
        memoryEfficiency: size / (Math.max(...memorySnapshots.map(s => s.heapUsed)) / 1024 / 1024) // components per MB
      });

      console.log(`✓ Memory test for ${size} components completed`);
      console.log(`  Peak memory: ${(Math.max(...memorySnapshots.map(s => s.heapUsed)) / 1024 / 1024).toFixed(2)}MB`);
    }
  }

  /**
   * Test concurrent processing
   */
  async testConcurrentProcessing() {
    console.log('⚡ Testing concurrent processing...');

    const componentSets = [
      this.generateLargeComponentSet(100),
      this.generateLargeComponentSet(150),
      this.generateLargeComponentSet(200)
    ];

    const startTime = performance.now();

    // Process all sets concurrently
    const promises = componentSets.map(async (components, index) => {
      const setStartTime = performance.now();

      // Simulate concurrent validation
      const validationPromises = components.map(component =>
        Promise.resolve(this.validator.validateData(component, 'component-schema'))
      );

      const results = await Promise.all(validationPromises);
      const setEndTime = performance.now();

      return {
        setIndex: index,
        componentCount: components.length,
        processingTime: setEndTime - setStartTime,
        validResults: results.filter(r => r.valid).length
      };
    });

    const concurrentResults = await Promise.all(promises);
    const endTime = performance.now();

    const totalComponents = componentSets.reduce((sum, set) => sum + set.length, 0);
    const totalTime = endTime - startTime;

    console.log(`✓ Processed ${totalComponents} components concurrently in ${totalTime.toFixed(2)}ms`);

    return {
      totalComponents,
      totalTime,
      concurrentResults,
      throughput: totalComponents / (totalTime / 1000)
    };
  }

  /**
   * Test design token processing performance
   */
  async testDesignTokenPerformance() {
    console.log('🎨 Testing design token processing...');

    const tokenSizes = [100, 500, 1000, 2000];

    for (const size of tokenSizes) {
      const startTime = performance.now();

      // Generate large token set
      const tokens = this.generateLargeTokenSet(size);

      // Test token validation
      const validationResult = this.validator.validateData(tokens, 'design-tokens-schema', `tokens-${size}`);

      const endTime = performance.now();

      console.log(`✓ Processed ${size} design tokens in ${(endTime - startTime).toFixed(2)}ms`);
      console.log(`  Validation result: ${validationResult.valid ? 'PASS' : 'FAIL'}`);
    }
  }

  /**
   * Test real-world Figma file simulation
   */
  async testFigmaFileSimulation() {
    console.log('📐 Testing Figma file simulation...');

    // Simulate various Figma file sizes
    const fileSizes = [
      { name: 'Small Project', components: 50, pages: 5, artboards: 20 },
      { name: 'Medium Project', components: 200, pages: 15, artboards: 100 },
      { name: 'Large Project', components: 500, pages: 30, artboards: 300 },
      { name: 'Enterprise Project', components: 1000, pages: 50, artboards: 500 }
    ];

    for (const fileSize of fileSizes) {
      const startTime = performance.now();

      // Simulate Figma file processing
      const components = this.generateLargeComponentSet(fileSize.components);
      const pages = this.generatePages(fileSize.pages, fileSize.artboards);

      // Process components
      const componentResults = components.map(component =>
        this.validator.validateData(component, 'component-schema')
      );

      // Generate design tokens from components
      const tokens = this.extractTokensFromComponents(components);
      const tokenValidation = this.validator.validateData(tokens, 'design-tokens-schema');

      const endTime = performance.now();

      const result = {
        fileName: fileSize.name,
        components: fileSize.components,
        pages: fileSize.pages,
        artboards: fileSize.artboards,
        processingTime: endTime - startTime,
        validComponents: componentResults.filter(r => r.valid).length,
        tokensValid: tokenValidation.valid
      };

      console.log(`✓ ${fileSize.name}: ${(result.processingTime).toFixed(2)}ms`);
      console.log(`  Valid components: ${result.validComponents}/${fileSize.components}`);
    }
  }

  /**
   * Generate large component set for testing
   */
  generateLargeComponentSet(count) {
    const categories = ['atom', 'molecule', 'organism', 'template'];
    const anxietyLevels = ['very-low', 'low', 'medium', 'high'];
    const componentTypes = ['button', 'input', 'card', 'modal', 'navigation', 'form', 'table', 'chart'];

    return Array.from({ length: count }, (_, index) => {
      const type = componentTypes[index % componentTypes.length];
      const category = categories[index % categories.length];

      return {
        id: `${type}-${index}`,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${index}`,
        category,
        variants: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, vIndex) => ({
          name: `variant-${vIndex}`,
          properties: {
            size: ['small', 'medium', 'large'][vIndex % 3],
            variant: ['primary', 'secondary', 'tertiary'][vIndex % 3]
          },
          anxietyLevel: anxietyLevels[Math.floor(Math.random() * anxietyLevels.length)],
          accessibilityScore: Math.floor(Math.random() * 30) + 70, // 70-100
          cognitiveLoadScore: Math.floor(Math.random() * 5) + 1 // 1-5
        })),
        anxietyReduction: this.getRandomAnxietyReduction(),
        accessibilityFeatures: this.getRandomAccessibilityFeatures(),
        usageGuidelines: `Usage guidelines for ${type} component ${index}. This component should be used when ${type} functionality is needed. Ensure proper spacing and follow design system guidelines.`
      };
    });
  }

  /**
   * Generate large design token set
   */
  generateLargeTokenSet(count) {
    const colors = {};
    const typography = {};
    const spacing = {};

    // Generate color tokens
    for (let i = 0; i < count; i++) {
      colors[`color-${i}`] = {
        hex: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
        name: `Color ${i}`
      };
    }

    // Generate typography tokens
    for (let i = 0; i < Math.floor(count / 10); i++) {
      typography[`text-${i}`] = {
        size: `${12 + i * 2}px`,
        weight: '400',
        lineHeight: '1.5'
      };
    }

    // Generate spacing tokens
    for (let i = 0; i < Math.floor(count / 20); i++) {
      spacing[`space-${i}`] = `${4 + i * 4}px`;
    }

    return {
      version: '2.0.0',
      name: `Large Token Set ${count}`,
      visualLanguage: {
        color: { palettes: { generated: colors } },
        typography: { hierarchy: typography },
        space: { units: { measurements: spacing } }
      }
    };
  }

  /**
   * Generate pages for Figma simulation
   */
  generatePages(pageCount, artboardCount) {
    return Array.from({ length: pageCount }, (_, pageIndex) => ({
      id: `page-${pageIndex}`,
      name: `Page ${pageIndex}`,
      artboards: Array.from({ length: Math.floor(artboardCount / pageCount) }, (_, artboardIndex) => ({
        id: `artboard-${pageIndex}-${artboardIndex}`,
        name: `Artboard ${pageIndex}-${artboardIndex}`,
        width: 1440,
        height: 1024
      }))
    }));
  }

  /**
   * Extract tokens from components (simulation)
   */
  extractTokensFromComponents(components) {
    return {
      version: '2.0.0',
      name: 'Extracted Tokens',
      visualLanguage: {
        color: {
          palettes: {
            primary: { blue: '#3182CE' },
            neutral: { white: '#FFFFFF' }
          }
        },
        typography: {
          fonts: { primary: 'Inter' },
          hierarchy: {
            h1: { size: '48px', weight: '700', lineHeight: '1.2' }
          }
        },
        space: {
          units: {
            base: '8px',
            measurements: { md: '16px' }
          }
        }
      }
    };
  }

  /**
   * Get random anxiety reduction techniques
   */
  getRandomAnxietyReduction() {
    const techniques = [
      'reduced-cognitive-load',
      'clear-visual-hierarchy',
      'predictable-interactions',
      'progress-indicators',
      'error-prevention',
      'graceful-degradation',
      'calm-color-palette',
      'consistent-spacing',
      'familiar-patterns'
    ];

    const count = Math.floor(Math.random() * 4) + 1;
    return techniques.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  /**
   * Get random accessibility features
   */
  getRandomAccessibilityFeatures() {
    const features = [
      'wcag-aa-compliant',
      'keyboard-navigable',
      'screen-reader-optimized',
      'high-contrast-support',
      'focus-indicators',
      'semantic-markup',
      'aria-labels',
      'color-blind-friendly',
      'touch-target-size'
    ];

    const count = Math.floor(Math.random() * 5) + 2;
    return features.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  /**
   * Generate performance report
   */
  generateReport() {
    console.log('\n📊 Performance Test Report');
    console.log('═'.repeat(50));

    // File processing summary
    if (this.results.fileProcessing.length > 0) {
      console.log('\n📁 File Processing Performance:');
      this.results.fileProcessing.forEach(result => {
        console.log(`  ${result.componentCount} components: ${result.totalTime.toFixed(2)}ms`);
        console.log(`    Throughput: ${(result.componentCount / (result.totalTime / 1000)).toFixed(1)} components/sec`);
        console.log(`    Memory peak: ${(result.memoryUsage.peak / 1024 / 1024).toFixed(2)}MB`);
      });
    }

    // Validation performance
    if (this.results.validation.length > 0) {
      console.log('\n✅ Validation Performance:');
      this.results.validation.forEach(result => {
        console.log(`  ${result.size} components: ${result.totalValidationTime.toFixed(2)}ms`);
        console.log(`    Avg per component: ${result.averagePerComponent.toFixed(2)}ms`);
        console.log(`    Throughput: ${result.validationThroughput.toFixed(1)} validations/sec`);
      });
    }

    // Performance recommendations
    console.log('\n💡 Performance Recommendations:');

    const largestTest = this.results.fileProcessing[this.results.fileProcessing.length - 1];
    if (largestTest) {
      const throughput = largestTest.componentCount / (largestTest.totalTime / 1000);

      if (throughput < 10) {
        console.log('  ⚠️  Low throughput detected. Consider optimizing validation algorithms.');
      } else {
        console.log('  ✅ Good throughput performance.');
      }

      const memoryEfficiency = largestTest.componentCount / (largestTest.memoryUsage.peak / 1024 / 1024);
      if (memoryEfficiency < 50) {
        console.log('  ⚠️  High memory usage. Consider streaming or batch processing.');
      } else {
        console.log('  ✅ Good memory efficiency.');
      }
    }

    console.log('\n');
  }

  /**
   * Run all performance tests
   */
  async runAllTests() {
    console.log('🚀 Starting H2WW Performance Tests\n');

    const overallStartTime = performance.now();

    try {
      await this.testLargeComponentLibrary();
      await this.testMemoryUsage();
      await this.testConcurrentProcessing();
      await this.testDesignTokenPerformance();
      await this.testFigmaFileSimulation();

      const overallEndTime = performance.now();

      console.log(`\n✅ All performance tests completed in ${(overallEndTime - overallStartTime).toFixed(2)}ms`);

      this.generateReport();

      return {
        success: true,
        totalTime: overallEndTime - overallStartTime,
        results: this.results
      };
    } catch (error) {
      console.error('❌ Performance tests failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// CLI execution
if (require.main === module) {
  const tester = new PerformanceTester();

  tester.runAllTests().then(result => {
    process.exit(result.success ? 0 : 1);
  }).catch(error => {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = PerformanceTester;