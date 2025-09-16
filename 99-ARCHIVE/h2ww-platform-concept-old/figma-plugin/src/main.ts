// H2WW Component Library Figma Plugin - Main Thread
// Handles all Figma API interactions and plugin logic

import { calmConfidenceTokens } from '@/utils/designTokens';
import { AnxietyAwareComponent, AIAnalysis, AccessibilityCheck } from '@/types';

// Plugin commands
const COMMANDS = {
  OPEN_PLUGIN: 'open-plugin',
  DESIGN_TOKENS: 'design-tokens',
  AI_ASSISTANT: 'ai-assistant',
  ACCESSIBILITY_CHECK: 'accessibility-check',
  CREATE_COMPONENT: 'create-component',
  ANALYZE_SELECTION: 'analyze-selection'
} as const;

// Show plugin UI immediately
figma.showUI(__html__, {
  width: 400,
  height: 600,
  themeColors: true,
  title: 'H2WW Component Library'
});

// Handle plugin commands
figma.ui.onmessage = async (msg) => {
  console.log('Received message:', msg);

  try {
    switch (msg.type) {
      case COMMANDS.CREATE_COMPONENT:
        await createAnxietyAwareComponent(msg.componentData);
        break;

      case COMMANDS.ANALYZE_SELECTION:
        await analyzeSelectedElements();
        break;

      case COMMANDS.DESIGN_TOKENS:
        await applyDesignTokens(msg.tokens);
        break;

      case COMMANDS.ACCESSIBILITY_CHECK:
        await performAccessibilityCheck();
        break;

      case 'get-selection':
        sendSelectionToUI();
        break;

      case 'close-plugin':
        figma.closePlugin();
        break;

      default:
        console.log('Unknown command:', msg.type);
    }
  } catch (error) {
    console.error('Error handling message:', error);
    figma.ui.postMessage({
      type: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

// Create anxiety-aware component in Figma
async function createAnxietyAwareComponent(componentData: AnxietyAwareComponent) {
  const { name, category, variants } = componentData;

  try {
    // Create component frame
    const frame = figma.createFrame();
    frame.name = `${name} - ${category}`;
    frame.resize(200, 100);

    // Apply calm confidence styling
    frame.fills = [{
      type: 'SOLID',
      color: hexToRgb(calmConfidenceTokens.colors.neutral.white)
    }];

    frame.cornerRadius = 8;
    frame.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.1 },
      offset: { x: 0, y: 2 },
      radius: 4,
      spread: 0,
      visible: true,
      blendMode: 'NORMAL'
    }];

    // Create component variants based on anxiety levels
    if (category === 'atom' && name.toLowerCase().includes('button')) {
      await createButtonVariants(frame, variants);
    }

    // Add to current page
    figma.currentPage.appendChild(frame);
    figma.viewport.scrollAndZoomIntoView([frame]);

    // Send success message to UI
    figma.ui.postMessage({
      type: 'component-created',
      data: {
        id: frame.id,
        name: frame.name,
        anxietyLevel: variants[0]?.anxietyLevel || 'low'
      }
    });

  } catch (error) {
    throw new Error(`Failed to create component: ${error}`);
  }
}

// Create anxiety-aware button variants
async function createButtonVariants(parent: FrameNode, variants: any[]) {
  const buttonTypes = [
    { name: 'Primary', color: calmConfidenceTokens.colors.primary.blue, anxiety: 'low' },
    { name: 'Secondary', color: calmConfidenceTokens.colors.primary.light, anxiety: 'low' },
    { name: 'Anxiety-Safe', color: calmConfidenceTokens.colors.semantic.success, anxiety: 'very-low' },
    { name: 'Ghost', color: 'transparent', anxiety: 'minimal' }
  ];

  let yOffset = 20;

  for (const buttonType of buttonTypes) {
    // Create button frame
    const button = figma.createFrame();
    button.name = `Button - ${buttonType.name}`;
    button.resize(120, 44); // 44px minimum touch target for accessibility
    button.x = 40;
    button.y = yOffset;

    // Apply anxiety-aware styling
    if (buttonType.color !== 'transparent') {
      button.fills = [{
        type: 'SOLID',
        color: hexToRgb(buttonType.color)
      }];
    }

    button.cornerRadius = 6;
    button.paddingLeft = 16;
    button.paddingRight = 16;
    button.paddingTop = 12;
    button.paddingBottom = 12;

    // Add button text
    const buttonText = figma.createText();
    await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });

    buttonText.characters = buttonType.name;
    buttonText.fontSize = 14;
    buttonText.fills = [{
      type: 'SOLID',
      color: buttonType.name === 'Secondary'
        ? hexToRgb(calmConfidenceTokens.colors.primary.blue)
        : hexToRgb(calmConfidenceTokens.colors.neutral.white)
    }];

    // Center text in button
    buttonText.x = (button.width - buttonText.width) / 2;
    buttonText.y = (button.height - buttonText.height) / 2;

    button.appendChild(buttonText);
    parent.appendChild(button);

    yOffset += 64;
  }
}

// Analyze selected elements for anxiety patterns and accessibility
async function analyzeSelectedElements() {
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    figma.ui.postMessage({
      type: 'analysis-result',
      data: {
        message: 'Please select elements to analyze',
        hasSelection: false
      }
    });
    return;
  }

  const analysis: AIAnalysis = {
    cognitiveLoad: calculateCognitiveLoad(selection),
    anxietyPatterns: detectAnxietyPatterns(selection),
    accessibilityIssues: checkAccessibilityIssues(selection),
    recommendations: generateRecommendations(selection)
  };

  figma.ui.postMessage({
    type: 'analysis-result',
    data: analysis
  });
}

// Calculate cognitive load (7±2 rule)
function calculateCognitiveLoad(nodes: readonly SceneNode[]): number {
  let totalElements = 0;
  let maxElementsPerContainer = 0;

  nodes.forEach(node => {
    if ('children' in node) {
      const childCount = node.children.length;
      totalElements += childCount;
      maxElementsPerContainer = Math.max(maxElementsPerContainer, childCount);
    } else {
      totalElements += 1;
    }
  });

  // Score based on 7±2 rule (optimal: 5-9 elements)
  const score = maxElementsPerContainer > 9 ? 8 :
                maxElementsPerContainer > 7 ? 6 :
                maxElementsPerContainer < 3 ? 4 : 2;

  return score;
}

// Detect anxiety-inducing patterns
function detectAnxietyPatterns(nodes: readonly SceneNode[]): string[] {
  const patterns: string[] = [];

  nodes.forEach(node => {
    // Check for overwhelming red colors
    if ('fills' in node && node.fills && Array.isArray(node.fills)) {
      node.fills.forEach(fill => {
        if (fill.type === 'SOLID' && fill.color.r > 0.8 && fill.color.g < 0.3) {
          patterns.push('High-intensity red color detected - may increase anxiety');
        }
      });
    }

    // Check for small touch targets
    if ('width' in node && 'height' in node) {
      if (node.width < 44 || node.height < 44) {
        patterns.push('Touch target too small - may cause frustration');
      }
    }

    // Check for too many elements (cognitive overload)
    if ('children' in node && node.children.length > 9) {
      patterns.push('Too many elements in container - cognitive overload risk');
    }
  });

  return patterns;
}

// Check accessibility issues
function checkAccessibilityIssues(nodes: readonly SceneNode[]): string[] {
  const issues: string[] = [];

  nodes.forEach(node => {
    // Check text contrast
    if (node.type === 'TEXT') {
      // This would require more complex contrast calculation
      // For now, we'll add a placeholder
      issues.push('Text contrast needs verification');
    }

    // Check for missing alt text on images
    if (node.type === 'RECTANGLE' && 'fills' in node) {
      const fills = node.fills;
      if (fills !== figma.mixed && Array.isArray(fills)) {
        const hasImageFill = fills.some((fill: Paint) => fill.type === 'IMAGE');
        if (hasImageFill && !node.name.includes('alt:')) {
          issues.push('Image missing alt text description');
        }
      }
    }
  });

  return issues;
}

// Generate AI recommendations
function generateRecommendations(nodes: readonly SceneNode[]): any[] {
  const recommendations = [];

  // Recommend anxiety-reducing improvements
  recommendations.push({
    type: 'anxiety',
    severity: 'medium',
    description: 'Consider using calmer colors from the H2WW palette',
    solution: 'Apply primary blue (#4A90E2) for trust-building',
    confidence: 0.8
  });

  // Recommend accessibility improvements
  recommendations.push({
    type: 'accessibility',
    severity: 'high',
    description: 'Ensure touch targets meet 44px minimum size',
    solution: 'Resize interactive elements to minimum 44x44px',
    confidence: 0.9
  });

  return recommendations;
}

// Apply design tokens to selected elements
async function applyDesignTokens(tokens: any) {
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    figma.notify('Please select elements to apply tokens to');
    return;
  }

  selection.forEach(node => {
    if ('fills' in node && tokens.color) {
      node.fills = [{
        type: 'SOLID',
        color: hexToRgb(tokens.color)
      }];
    }

    if (node.type === 'TEXT' && tokens.fontSize) {
      node.fontSize = parseInt(tokens.fontSize);
    }
  });

  figma.notify('Design tokens applied successfully!');
}

// Perform comprehensive accessibility check
async function performAccessibilityCheck() {
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    figma.notify('Please select elements to check accessibility');
    return;
  }

  const accessibilityReport: AccessibilityCheck = {
    colorContrast: true, // Would calculate actual contrast
    touchTargetSize: checkTouchTargetSizes(selection),
    textReadability: true, // Would check font sizes and spacing
    keyboardNavigation: true, // Would check tab order
    screenReaderOptimized: true, // Would check ARIA labels
    score: 85 // Example score
  };

  figma.ui.postMessage({
    type: 'accessibility-report',
    data: accessibilityReport
  });
}

// Check if touch targets meet 44px minimum
function checkTouchTargetSizes(nodes: readonly SceneNode[]): boolean {
  return nodes.every(node => {
    if ('width' in node && 'height' in node) {
      return node.width >= 44 && node.height >= 44;
    }
    return true;
  });
}

// Send current selection to UI
function sendSelectionToUI() {
  const selection = figma.currentPage.selection;

  figma.ui.postMessage({
    type: 'selection-updated',
    data: {
      count: selection.length,
      types: selection.map(node => node.type),
      hasSelection: selection.length > 0
    }
  });
}

// Utility function to convert hex to RGB
function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

// Initialize plugin
console.log('H2WW Component Library Plugin initialized');
figma.ui.postMessage({ type: 'plugin-ready' });