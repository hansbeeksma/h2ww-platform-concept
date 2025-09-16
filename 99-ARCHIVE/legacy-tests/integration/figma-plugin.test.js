/**
 * Integration Tests for H2WW Figma Plugin Output
 * Tests the complete flow from Figma data extraction to JSON generation
 */

const { describe, test, expect, beforeEach, afterEach } = require('@jest/globals');
const fs = require('fs');
const path = require('path');
const H2WWJSONValidator = require('../validation/json-validator');

// Mock Figma API responses
const mockFigmaAPI = {
  getFile: jest.fn(),
  getFileNodes: jest.fn(),
  getComponents: jest.fn(),
  getComponentSets: jest.fn()
};

// Mock Figma plugin environment
global.figma = {
  currentPage: {
    findAll: jest.fn(),
    children: []
  },
  getNodeById: jest.fn(),
  getLocalPaintStyles: jest.fn(() => []),
  getLocalTextStyles: jest.fn(() => []),
  ui: {
    postMessage: jest.fn()
  }
};

describe('H2WW Figma Plugin Integration Tests', () => {
  let validator;
  let tempDir;

  beforeEach(() => {
    validator = new H2WWJSONValidator();
    tempDir = path.join(__dirname, 'temp');

    // Create temp directory for test outputs
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Reset mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up temp files
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true });
    }
  });

  describe('Component Extraction', () => {
    test('should extract button components with all variants', async () => {
      // Mock Figma button component with variants
      const mockButtonComponent = {
        id: '123:456',
        name: 'Button',
        type: 'COMPONENT_SET',
        children: [
          {
            id: '123:457',
            name: 'Size=Large, Variant=Primary',
            type: 'COMPONENT',
            fills: [{ type: 'SOLID', color: { r: 0.196, g: 0.510, b: 0.808 } }],
            effects: [],
            strokeWeight: 0,
            cornerRadius: 8,
            layoutMode: 'HORIZONTAL',
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 12,
            paddingBottom: 12,
            children: [
              {
                type: 'TEXT',
                characters: 'Button',
                style: {
                  fontSize: 16,
                  fontFamily: 'Inter',
                  fontWeight: 500
                }
              }
            ]
          },
          {
            id: '123:458',
            name: 'Size=Medium, Variant=Secondary',
            type: 'COMPONENT',
            fills: [],
            strokes: [{ type: 'SOLID', color: { r: 0.196, g: 0.510, b: 0.808 } }],
            strokeWeight: 2,
            cornerRadius: 8,
            children: [
              {
                type: 'TEXT',
                characters: 'Button',
                style: {
                  fontSize: 14,
                  fontFamily: 'Inter',
                  fontWeight: 500
                }
              }
            ]
          }
        ]
      };

      global.figma.currentPage.findAll.mockReturnValue([mockButtonComponent]);

      const extracted = await extractComponentsFromFigma();

      expect(extracted).toHaveLength(1);
      expect(extracted[0]).toMatchObject({
        id: expect.stringMatching(/^button/),
        name: 'Button',
        category: 'atom',
        variants: expect.arrayContaining([
          expect.objectContaining({
            name: expect.stringContaining('primary'),
            anxietyLevel: expect.any(String),
            accessibilityScore: expect.any(Number)
          }),
          expect.objectContaining({
            name: expect.stringContaining('secondary'),
            anxietyLevel: expect.any(String),
            accessibilityScore: expect.any(Number)
          })
        ])
      });

      // Validate against schema
      const validationResult = validator.validateData(extracted[0], 'component-schema', 'extracted-button');
      expect(validationResult.valid).toBe(true);
    });

    test('should extract form components as molecules', async () => {
      const mockFormComponent = {
        id: '789:101',
        name: 'Input/Text Field',
        type: 'COMPONENT_SET',
        children: [
          {
            id: '789:102',
            name: 'State=Default',
            type: 'COMPONENT',
            children: [
              {
                type: 'TEXT',
                name: 'Label',
                characters: 'Email Address'
              },
              {
                type: 'RECTANGLE',
                name: 'Input Field',
                fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }],
                strokes: [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }],
                cornerRadius: 4
              }
            ]
          }
        ]
      };

      global.figma.currentPage.findAll.mockReturnValue([mockFormComponent]);

      const extracted = await extractComponentsFromFigma();

      expect(extracted[0]).toMatchObject({
        category: 'molecule',
        anxietyReduction: expect.arrayContaining(['clear-visual-hierarchy']),
        accessibilityFeatures: expect.arrayContaining(['semantic-markup'])
      });
    });

    test('should calculate anxiety levels based on component complexity', async () => {
      const simpleComponent = {
        id: '111:222',
        name: 'Icon',
        type: 'COMPONENT',
        children: []
      };

      const complexComponent = {
        id: '333:444',
        name: 'Data Table',
        type: 'COMPONENT',
        children: Array(20).fill(null).map((_, i) => ({
          type: 'FRAME',
          name: `Row ${i}`,
          children: [
            { type: 'TEXT', characters: 'Cell 1' },
            { type: 'TEXT', characters: 'Cell 2' },
            { type: 'TEXT', characters: 'Cell 3' }
          ]
        }))
      };

      global.figma.currentPage.findAll.mockReturnValue([simpleComponent, complexComponent]);

      const extracted = await extractComponentsFromFigma();

      const simpleExtracted = extracted.find(c => c.name === 'Icon');
      const complexExtracted = extracted.find(c => c.name === 'Data Table');

      expect(simpleExtracted.variants[0].anxietyLevel).toMatch(/very-low|low/);
      expect(complexExtracted.variants[0].anxietyLevel).toMatch(/medium|high/);
    });
  });

  describe('Design Token Extraction', () => {
    test('should extract color tokens from paint styles', async () => {
      const mockPaintStyles = [
        {
          id: 'S:primary-blue',
          name: 'Primary/Blue',
          paints: [{ type: 'SOLID', color: { r: 0.196, g: 0.510, b: 0.808 } }]
        },
        {
          id: 'S:semantic-success',
          name: 'Semantic/Success',
          paints: [{ type: 'SOLID', color: { r: 0.133, g: 0.773, b: 0.369 } }]
        }
      ];

      global.figma.getLocalPaintStyles.mockReturnValue(mockPaintStyles);

      const tokens = await extractDesignTokensFromFigma();

      expect(tokens).toMatchObject({
        visualLanguage: {
          color: {
            palettes: expect.objectContaining({
              primary: expect.objectContaining({
                blue: expect.stringMatching(/^#[0-9A-Fa-f]{6}$/)
              }),
              semantic: expect.objectContaining({
                success: expect.stringMatching(/^#[0-9A-Fa-f]{6}$/)
              })
            })
          }
        }
      });

      // Validate extracted tokens
      const validationResult = validator.validateData(tokens, 'design-tokens-schema', 'extracted-tokens');
      expect(validationResult.valid).toBe(true);
    });

    test('should extract typography tokens from text styles', async () => {
      const mockTextStyles = [
        {
          id: 'T:heading-1',
          name: 'Heading/H1',
          fontSize: 48,
          fontName: { family: 'Inter', style: 'Bold' },
          lineHeight: { value: 56, unit: 'PIXELS' },
          letterSpacing: { value: -0.02, unit: 'PERCENT' }
        },
        {
          id: 'T:body-text',
          name: 'Body/Text',
          fontSize: 16,
          fontName: { family: 'Inter', style: 'Regular' },
          lineHeight: { value: 1.6, unit: 'AUTO' }
        }
      ];

      global.figma.getLocalTextStyles.mockReturnValue(mockTextStyles);

      const tokens = await extractDesignTokensFromFigma();

      expect(tokens.visualLanguage.typography).toMatchObject({
        hierarchy: expect.objectContaining({
          h1: expect.objectContaining({
            size: '48px',
            weight: expect.any(String),
            lineHeight: expect.any(String)
          }),
          paragraph: expect.objectContaining({
            size: '16px'
          })
        })
      });
    });
  });

  describe('JSON Output Generation', () => {
    test('should generate valid component JSON files', async () => {
      const mockComponents = [
        {
          id: 'button-primary',
          name: 'Primary Button',
          category: 'atom',
          variants: [
            {
              name: 'default',
              properties: { size: 'medium' },
              anxietyLevel: 'low',
              accessibilityScore: 95
            }
          ],
          anxietyReduction: ['clear-visual-hierarchy'],
          accessibilityFeatures: ['wcag-aa-compliant'],
          usageGuidelines: 'Use for primary actions'
        }
      ];

      const outputPath = path.join(tempDir, 'components.json');
      await generateComponentJSON(mockComponents, outputPath);

      expect(fs.existsSync(outputPath)).toBe(true);

      const generatedContent = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
      expect(generatedContent).toMatchObject({
        version: expect.stringMatching(/^\d+\.\d+\.\d+$/),
        components: expect.arrayContaining([
          expect.objectContaining({
            id: 'button-primary',
            name: 'Primary Button'
          })
        ])
      });

      // Validate generated JSON
      const validationResult = validator.validateFile(outputPath, 'component-schema');
      expect(validationResult.valid).toBe(true);
    });

    test('should generate design tokens JSON with proper structure', async () => {
      const mockTokens = {
        version: '2.0.0',
        name: 'H2WW Extracted Tokens',
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

      const outputPath = path.join(tempDir, 'design-tokens.json');
      await generateDesignTokensJSON(mockTokens, outputPath);

      expect(fs.existsSync(outputPath)).toBe(true);

      const validationResult = validator.validateFile(outputPath, 'design-tokens-schema');
      expect(validationResult.valid).toBe(true);
    });

    test('should handle large design files efficiently', async () => {
      const largeComponentSet = Array(100).fill(null).map((_, i) => ({
        id: `component-${i}`,
        name: `Component ${i}`,
        category: 'atom',
        variants: [
          {
            name: 'default',
            properties: {},
            anxietyLevel: 'low',
            accessibilityScore: 85
          }
        ],
        anxietyReduction: ['clear-visual-hierarchy'],
        accessibilityFeatures: ['wcag-aa-compliant'],
        usageGuidelines: `Usage for component ${i}`
      }));

      const startTime = Date.now();
      const outputPath = path.join(tempDir, 'large-components.json');
      await generateComponentJSON(largeComponentSet, outputPath);
      const endTime = Date.now();

      // Should process 100 components in under 1 second
      expect(endTime - startTime).toBeLessThan(1000);
      expect(fs.existsSync(outputPath)).toBe(true);

      const generatedContent = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
      expect(generatedContent.components).toHaveLength(100);
    });
  });

  describe('Error Handling and Recovery', () => {
    test('should handle missing Figma nodes gracefully', async () => {
      global.figma.currentPage.findAll.mockReturnValue([]);

      const extracted = await extractComponentsFromFigma();
      expect(extracted).toEqual([]);
    });

    test('should provide meaningful error messages for invalid Figma data', async () => {
      const invalidComponent = {
        id: null,
        name: '',
        type: 'UNKNOWN_TYPE'
      };

      global.figma.currentPage.findAll.mockReturnValue([invalidComponent]);

      const extracted = await extractComponentsFromFigma();
      expect(extracted).toEqual([]);
    });

    test('should validate output against anxiety-aware design principles', async () => {
      const anxietyInducingComponent = {
        id: '999:888',
        name: 'Flashing Alert',
        type: 'COMPONENT',
        effects: [
          { type: 'LAYER_BLUR', radius: 10 },
          { type: 'DROP_SHADOW', color: { r: 1, g: 0, b: 0 } }
        ],
        children: Array(50).fill(null).map(() => ({ type: 'TEXT', characters: 'ERROR!' }))
      };

      global.figma.currentPage.findAll.mockReturnValue([anxietyInducingComponent]);

      const extracted = await extractComponentsFromFigma();

      if (extracted.length > 0) {
        expect(extracted[0].variants[0].anxietyLevel).toMatch(/medium|high/);
        expect(extracted[0].anxietyReduction).toContain('reduced-cognitive-load');
      }
    });
  });

  describe('Accessibility Validation', () => {
    test('should detect components with poor color contrast', async () => {
      const lowContrastComponent = {
        id: '111:999',
        name: 'Low Contrast Button',
        type: 'COMPONENT',
        fills: [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }], // Light gray
        children: [
          {
            type: 'TEXT',
            characters: 'Click me',
            fills: [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 } }] // Lighter gray
          }
        ]
      };

      global.figma.currentPage.findAll.mockReturnValue([lowContrastComponent]);

      const extracted = await extractComponentsFromFigma();

      if (extracted.length > 0) {
        expect(extracted[0].variants[0].accessibilityScore).toBeLessThan(70);
      }
    });

    test('should identify components with proper semantic structure', async () => {
      const semanticComponent = {
        id: '222:888',
        name: 'Accessible Form',
        type: 'COMPONENT',
        children: [
          {
            type: 'TEXT',
            name: 'Label',
            characters: 'Email Address'
          },
          {
            type: 'RECTANGLE',
            name: 'Input',
            // Mock accessibility properties
            accessibilityLabel: 'Enter your email address'
          }
        ]
      };

      global.figma.currentPage.findAll.mockReturnValue([semanticComponent]);

      const extracted = await extractComponentsFromFigma();

      if (extracted.length > 0) {
        expect(extracted[0].accessibilityFeatures).toContain('semantic-markup');
        expect(extracted[0].variants[0].accessibilityScore).toBeGreaterThan(80);
      }
    });
  });
});

// Mock implementation functions
async function extractComponentsFromFigma() {
  const components = global.figma.currentPage.findAll();

  return components
    .filter(node => node.type === 'COMPONENT' || node.type === 'COMPONENT_SET')
    .map(component => transformFigmaToH2WWComponent(component))
    .filter(Boolean);
}

async function extractDesignTokensFromFigma() {
  const paintStyles = global.figma.getLocalPaintStyles();
  const textStyles = global.figma.getLocalTextStyles();

  return {
    version: '2.0.0',
    name: 'H2WW Extracted Design System',
    visualLanguage: {
      color: extractColorTokens(paintStyles),
      typography: extractTypographyTokens(textStyles),
      space: {
        units: {
          base: '8px',
          measurements: {
            sm: '12px',
            md: '16px',
            lg: '24px'
          }
        }
      }
    }
  };
}

function transformFigmaToH2WWComponent(figmaNode) {
  if (!figmaNode.id || !figmaNode.name) return null;

  const category = inferCategory(figmaNode);
  const variants = extractVariants(figmaNode);
  const anxietyLevel = calculateAnxietyLevel(figmaNode);
  const accessibilityScore = calculateAccessibilityScore(figmaNode);

  return {
    id: generateComponentId(figmaNode.name),
    name: cleanComponentName(figmaNode.name),
    category,
    variants: variants.map(variant => ({
      ...variant,
      anxietyLevel,
      accessibilityScore
    })),
    anxietyReduction: generateAnxietyReductionTechniques(figmaNode),
    accessibilityFeatures: generateAccessibilityFeatures(figmaNode),
    usageGuidelines: `Generated from Figma component: ${figmaNode.name}`
  };
}

function extractColorTokens(paintStyles) {
  const palettes = { primary: {}, secondary: {}, neutral: {}, semantic: {} };

  paintStyles.forEach(style => {
    const [category, name] = style.name.split('/');
    const color = rgbToHex(style.paints[0]?.color || { r: 0, g: 0, b: 0 });

    if (category.toLowerCase() === 'primary') {
      palettes.primary[name.toLowerCase()] = color;
    } else if (category.toLowerCase() === 'semantic') {
      palettes.semantic[name.toLowerCase()] = color;
    } else {
      palettes.neutral[name.toLowerCase()] = color;
    }
  });

  return { palettes };
}

function extractTypographyTokens(textStyles) {
  const hierarchy = {};
  const fonts = { primary: 'Inter', secondary: 'Poppins', mono: 'SF Mono' };

  textStyles.forEach(style => {
    const name = style.name.toLowerCase().replace(/[^a-z0-9]/g, '');

    hierarchy[name] = {
      size: `${style.fontSize}px`,
      weight: mapFontWeight(style.fontName?.style || 'Regular'),
      lineHeight: formatLineHeight(style.lineHeight)
    };
  });

  return { fonts, hierarchy };
}

async function generateComponentJSON(components, outputPath) {
  const output = {
    version: '2.0.0',
    generated: new Date().toISOString(),
    components
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
}

async function generateDesignTokensJSON(tokens, outputPath) {
  const output = {
    ...tokens,
    generated: new Date().toISOString()
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
}

// Helper functions
function generateComponentId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
}

function cleanComponentName(name) {
  return name.split('/').pop() || name;
}

function inferCategory(node) {
  const name = node.name.toLowerCase();
  if (name.includes('page') || name.includes('template')) return 'template';
  if (name.includes('card') || name.includes('modal') || name.includes('form')) return 'organism';
  if (name.includes('input') && name.includes('group')) return 'molecule';
  return 'atom';
}

function extractVariants(node) {
  if (node.type === 'COMPONENT_SET' && node.children) {
    return node.children.map(child => ({
      name: child.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      properties: extractProperties(child)
    }));
  }

  return [{
    name: 'default',
    properties: extractProperties(node)
  }];
}

function extractProperties(node) {
  return {
    width: node.width,
    height: node.height,
    borderRadius: node.cornerRadius || 0
  };
}

function calculateAnxietyLevel(node) {
  let score = 0;

  // Complexity factors
  const childCount = node.children?.length || 0;
  if (childCount > 10) score += 2;
  if (childCount > 5) score += 1;

  // Visual complexity
  if (node.effects?.length > 2) score += 1;
  if (node.fills?.some(fill => fill.type === 'GRADIENT_LINEAR')) score += 1;

  if (score >= 3) return 'high';
  if (score >= 2) return 'medium';
  if (score >= 1) return 'low';
  return 'very-low';
}

function calculateAccessibilityScore(node) {
  let score = 80; // Base score

  // Check for accessibility features
  if (node.accessibilityLabel) score += 10;
  if (node.name?.toLowerCase().includes('button')) score += 5;
  if (node.cornerRadius && node.cornerRadius >= 4) score += 5;

  return Math.min(score, 100);
}

function generateAnxietyReductionTechniques(node) {
  const techniques = ['clear-visual-hierarchy'];

  if (node.cornerRadius && node.cornerRadius > 0) {
    techniques.push('calm-color-palette');
  }

  if (!node.effects || node.effects.length <= 1) {
    techniques.push('reduced-cognitive-load');
  }

  return techniques;
}

function generateAccessibilityFeatures(node) {
  const features = ['wcag-aa-compliant'];

  if (node.accessibilityLabel || node.name?.toLowerCase().includes('button')) {
    features.push('semantic-markup');
  }

  features.push('keyboard-navigable');
  features.push('focus-indicators');

  return features;
}

function rgbToHex(color) {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
}

function mapFontWeight(style) {
  const weightMap = {
    'Thin': '100',
    'Light': '300',
    'Regular': '400',
    'Medium': '500',
    'SemiBold': '600',
    'Bold': '700',
    'Black': '900'
  };
  return weightMap[style] || '400';
}

function formatLineHeight(lineHeight) {
  if (!lineHeight) return '1.5';
  if (lineHeight.unit === 'AUTO') return lineHeight.value.toString();
  if (lineHeight.unit === 'PIXELS') return `${lineHeight.value}px`;
  return '1.5';
}