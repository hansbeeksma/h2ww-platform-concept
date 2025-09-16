// H2WW Component Library - Complete Platform Implementation
figma.showUI(__html__, {
  width: 450,
  height: 700,
  title: "H2WW Component Library"
});

// Design tokens for anxiety-aware components
const H2WW_TOKENS = {
  colors: {
    trustBlue: { r: 0.29, g: 0.56, b: 0.89 },
    calmSuccess: { r: 0.49, g: 0.83, b: 0.13 },
    gentleWarning: { r: 0.96, g: 0.65, b: 0.14 },
    softError: { r: 0.92, g: 0.34, b: 0.34 },
    calmLight: { r: 0.92, g: 0.95, b: 0.98 },
    neutralGray: { r: 0.4, g: 0.4, b: 0.4 },
    darkText: { r: 0.1, g: 0.1, b: 0.1 }
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  borderRadius: { sm: 4, md: 8, lg: 12, xl: 16 },
  shadows: {
    subtle: [{ type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.05 }, offset: { x: 0, y: 2 }, radius: 4, spread: 0 }],
    medium: [{ type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 4 }, radius: 8, spread: 0 }]
  }
};

// Send ready message to UI
figma.ui.postMessage({ type: 'plugin-ready' });

// Anxiety analysis functions
function analyzeAnxietyLevel(node) {
  let score = 0;
  const recommendations = [];

  if (node.type === 'FRAME' || node.type === 'COMPONENT') {
    // Check size for touch targets
    if (node.width < 44 || node.height < 44) {
      score += 2;
      recommendations.push('Increase touch target size to minimum 44px');
    }

    // Check corner radius for friendliness
    if ('cornerRadius' in node && node.cornerRadius < 4) {
      score += 1;
      recommendations.push('Add corner radius for friendlier appearance');
    }

    // Check for high contrast colors
    if ('fills' in node && Array.isArray(node.fills) && node.fills.length > 0) {
      const fill = node.fills[0];
      if (fill.type === 'SOLID') {
        const brightness = (fill.color.r + fill.color.g + fill.color.b) / 3;
        if (brightness < 0.1 || brightness > 0.9) {
          score += 1;
          recommendations.push('Consider using softer contrast colors');
        }
      }
    }
  }

  const level = score === 0 ? 'Very Low' : score <= 2 ? 'Low' : score <= 4 ? 'Medium' : 'High';
  return { level, score, recommendations };
}

function createAnxietyAwareComponent(type, variant) {
  const frame = figma.createFrame();

  switch (type) {
    // FASE 1: Essentiële Interface Componenten
    case 'select':
      frame.name = 'Gentle Select Dropdown';
      frame.resize(200, 48);
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      frame.strokes = [{ type: 'SOLID', color: H2WW_TOKENS.colors.calmLight }];
      frame.strokeWeight = 2;
      frame.cornerRadius = H2WW_TOKENS.borderRadius.md;

      // Add dropdown arrow
      const arrow = figma.createVector();
      arrow.name = 'Dropdown Arrow';
      arrow.resize(12, 8);
      arrow.x = frame.width - 24;
      arrow.y = (frame.height - 8) / 2;
      frame.appendChild(arrow);

      // Add placeholder text
      const selectText = figma.createText();
      selectText.characters = 'Choose an option...';
      selectText.fontSize = 14;
      selectText.fills = [{ type: 'SOLID', color: H2WW_TOKENS.colors.neutralGray }];
      selectText.x = H2WW_TOKENS.spacing.md;
      selectText.y = (frame.height - selectText.height) / 2;
      frame.appendChild(selectText);
      break;

    case 'checkbox':
      frame.name = 'Anxiety-Friendly Checkbox';
      frame.resize(20, 20);
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      frame.strokes = [{ type: 'SOLID', color: H2WW_TOKENS.colors.trustBlue }];
      frame.strokeWeight = 2;
      frame.cornerRadius = H2WW_TOKENS.borderRadius.sm;

      // Add checkmark (if checked variant)
      if (variant === 'checked') {
        const checkmark = figma.createVector();
        checkmark.name = 'Checkmark';
        checkmark.resize(12, 10);
        checkmark.x = 4;
        checkmark.y = 5;
        checkmark.fills = [{ type: 'SOLID', color: H2WW_TOKENS.colors.trustBlue }];
        frame.appendChild(checkmark);
      }
      break;

    case 'radio':
      frame.name = 'Calm Radio Button';
      frame.resize(20, 20);
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      frame.strokes = [{ type: 'SOLID', color: H2WW_TOKENS.colors.trustBlue }];
      frame.strokeWeight = 2;
      frame.cornerRadius = 10; // Circular

      // Add inner dot (if selected variant)
      if (variant === 'selected') {
        const dot = figma.createEllipse();
        dot.name = 'Selection Dot';
        dot.resize(8, 8);
        dot.x = 6;
        dot.y = 6;
        dot.fills = [{ type: 'SOLID', color: H2WW_TOKENS.colors.trustBlue }];
        frame.appendChild(dot);
      }
      break;

    case 'toggle':
      frame.name = 'Gentle Toggle Switch';
      frame.resize(50, 24);
      frame.fills = [{ type: 'SOLID', color: variant === 'on' ? H2WW_TOKENS.colors.calmSuccess : H2WW_TOKENS.colors.calmLight }];
      frame.cornerRadius = 12;

      // Add toggle handle
      const handle = figma.createEllipse();
      handle.name = 'Toggle Handle';
      handle.resize(20, 20);
      handle.x = variant === 'on' ? 28 : 2;
      handle.y = 2;
      handle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      handle.effects = H2WW_TOKENS.shadows.subtle;
      frame.appendChild(handle);
      break;

    case 'modal':
      frame.name = 'Calm Modal Dialog';
      frame.resize(400, 300);
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      frame.cornerRadius = H2WW_TOKENS.borderRadius.lg;
      frame.effects = H2WW_TOKENS.shadows.medium;

      // Add header
      const modalHeader = figma.createFrame();
      modalHeader.name = 'Modal Header';
      modalHeader.resize(400, 60);
      modalHeader.fills = [{ type: 'SOLID', color: H2WW_TOKENS.colors.calmLight }];
      modalHeader.y = 0;

      const modalTitle = figma.createText();
      modalTitle.characters = 'Modal Title';
      modalTitle.fontSize = 18;
      modalTitle.fontName = { family: 'Inter', style: 'Medium' };
      modalTitle.fills = [{ type: 'SOLID', color: H2WW_TOKENS.colors.darkText }];
      modalTitle.x = H2WW_TOKENS.spacing.lg;
      modalTitle.y = 18;
      modalHeader.appendChild(modalTitle);
      frame.appendChild(modalHeader);
      break;

    case 'toast':
      frame.name = 'Gentle Toast Notification';
      frame.resize(350, 60);
      const toastColor = variant === 'success' ? H2WW_TOKENS.colors.calmSuccess :
                        variant === 'warning' ? H2WW_TOKENS.colors.gentleWarning :
                        variant === 'error' ? H2WW_TOKENS.colors.softError :
                        H2WW_TOKENS.colors.trustBlue;

      frame.fills = [{ type: 'SOLID', color: { r: toastColor.r + 0.1, g: toastColor.g + 0.1, b: toastColor.b + 0.1 } }];
      frame.strokes = [{ type: 'SOLID', color: toastColor }];
      frame.strokeWeight = 1;
      frame.cornerRadius = H2WW_TOKENS.borderRadius.md;
      frame.effects = H2WW_TOKENS.shadows.medium;

      const toastText = figma.createText();
      toastText.characters = 'Notification message appears here';
      toastText.fontSize = 14;
      toastText.fills = [{ type: 'SOLID', color: H2WW_TOKENS.colors.darkText }];
      toastText.x = H2WW_TOKENS.spacing.md;
      toastText.y = (frame.height - toastText.height) / 2;
      frame.appendChild(toastText);
      break;

    case 'loading':
      frame.name = 'Calm Loading Indicator';
      frame.resize(40, 40);
      frame.fills = [];

      // Create loading spinner
      const spinner = figma.createEllipse();
      spinner.name = 'Loading Spinner';
      spinner.resize(36, 36);
      spinner.x = 2;
      spinner.y = 2;
      spinner.strokes = [{ type: 'SOLID', color: H2WW_TOKENS.colors.calmLight }];
      spinner.strokeWeight = 3;

      // Add accent arc
      const accent = figma.createEllipse();
      accent.name = 'Loading Accent';
      accent.resize(36, 36);
      accent.x = 2;
      accent.y = 2;
      accent.strokes = [{ type: 'SOLID', color: H2WW_TOKENS.colors.trustBlue }];
      accent.strokeWeight = 3;

      frame.appendChild(spinner);
      frame.appendChild(accent);
      break;

    case 'navigation':
      frame.name = 'Anxiety-Aware Navigation Bar';
      frame.resize(800, 64);
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      frame.effects = H2WW_TOKENS.shadows.subtle;

      // Add logo/brand area
      const brand = figma.createFrame();
      brand.name = 'Brand';
      brand.resize(120, 32);
      brand.fills = [{ type: 'SOLID', color: H2WW_TOKENS.colors.trustBlue }];
      brand.cornerRadius = 4;
      brand.x = H2WW_TOKENS.spacing.lg;
      brand.y = 16;

      const brandText = figma.createText();
      brandText.characters = 'H2WW';
      brandText.fontSize = 16;
      brandText.fontName = { family: 'Inter', style: 'Bold' };
      brandText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      brandText.textAlignHorizontal = 'CENTER';
      brandText.textAlignVertical = 'CENTER';
      brandText.resize(brand.width, brand.height);
      brand.appendChild(brandText);
      frame.appendChild(brand);
      break;

    case 'breadcrumbs':
      frame.name = 'Calm Breadcrumb Navigation';
      frame.resize(400, 32);
      frame.fills = [];

      // Create breadcrumb items
      let xPos = 0;
      const items = ['Home', 'Learning', 'Course'];
      items.forEach((item, index) => {
        const breadcrumbItem = figma.createText();
        breadcrumbItem.characters = item;
        breadcrumbItem.fontSize = 14;
        breadcrumbItem.fills = [{ type: 'SOLID', color: index === items.length - 1 ? H2WW_TOKENS.colors.darkText : H2WW_TOKENS.colors.neutralGray }];
        breadcrumbItem.x = xPos;
        breadcrumbItem.y = 8;
        frame.appendChild(breadcrumbItem);
        xPos += breadcrumbItem.width + 8;

        // Add separator (except for last item)
        if (index < items.length - 1) {
          const separator = figma.createText();
          separator.characters = '/';
          separator.fontSize = 14;
          separator.fills = [{ type: 'SOLID', color: H2WW_TOKENS.colors.neutralGray }];
          separator.x = xPos;
          separator.y = 8;
          frame.appendChild(separator);
          xPos += separator.width + 8;
        }
      });
      break;
    // BESTAANDE COMPONENTEN
    case 'button':
      frame.name = variant === 'safe' ? 'Safe Button' : 'Primary Button';
      frame.resize(120, 44);
      frame.fills = [{ type: 'SOLID', color: variant === 'safe' ? H2WW_TOKENS.colors.calmLight : H2WW_TOKENS.colors.trustBlue }];
      frame.cornerRadius = H2WW_TOKENS.borderRadius.md;
      frame.effects = H2WW_TOKENS.shadows.subtle;

      // Add text
      const buttonText = figma.createText();
      buttonText.characters = variant === 'safe' ? 'Continue' : 'Get Started';
      buttonText.fontSize = 14;
      buttonText.fills = [{ type: 'SOLID', color: variant === 'safe' ? H2WW_TOKENS.colors.trustBlue : { r: 1, g: 1, b: 1 } }];
      buttonText.textAlignHorizontal = 'CENTER';
      buttonText.textAlignVertical = 'CENTER';
      buttonText.resize(frame.width, frame.height);
      frame.appendChild(buttonText);
      break;

    case 'input':
      frame.name = 'Gentle Input Field';
      frame.resize(200, 48);
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      frame.strokes = [{ type: 'SOLID', color: H2WW_TOKENS.colors.calmLight }];
      frame.strokeWeight = 2;
      frame.cornerRadius = H2WW_TOKENS.borderRadius.md;

      // Add placeholder text
      const placeholder = figma.createText();
      placeholder.characters = 'Enter your information...';
      placeholder.fontSize = 14;
      placeholder.fills = [{ type: 'SOLID', color: H2WW_TOKENS.colors.neutralGray }];
      placeholder.x = H2WW_TOKENS.spacing.md;
      placeholder.y = (frame.height - placeholder.height) / 2;
      frame.appendChild(placeholder);
      break;

    case 'progress':
      frame.name = 'Confidence Progress Bar';
      frame.resize(200, 8);
      frame.fills = [{ type: 'SOLID', color: H2WW_TOKENS.colors.calmLight }];
      frame.cornerRadius = 4;

      // Add progress fill
      const progress = figma.createFrame();
      progress.name = 'Progress Fill';
      progress.resize(120, 8);
      progress.fills = [{ type: 'SOLID', color: H2WW_TOKENS.colors.calmSuccess }];
      progress.cornerRadius = 4;
      frame.appendChild(progress);
      break;

    case 'card':
      frame.name = 'Calm Card Component';
      frame.resize(300, 200);
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      frame.cornerRadius = H2WW_TOKENS.borderRadius.lg;
      frame.effects = H2WW_TOKENS.shadows.medium;
      frame.paddingLeft = frame.paddingRight = H2WW_TOKENS.spacing.lg;
      frame.paddingTop = frame.paddingBottom = H2WW_TOKENS.spacing.lg;
      break;

    case 'alert':
      frame.name = 'Gentle Alert';
      frame.resize(300, 60);
      frame.fills = [{ type: 'SOLID', color: variant === 'warning' ? { r: 1, g: 0.95, b: 0.8 } : { r: 0.9, g: 0.98, b: 0.9 } }];
      frame.cornerRadius = H2WW_TOKENS.borderRadius.md;
      frame.paddingLeft = frame.paddingRight = H2WW_TOKENS.spacing.md;
      frame.paddingTop = frame.paddingBottom = H2WW_TOKENS.spacing.md;
      break;

    default:
      frame.name = 'H2WW Component';
      frame.resize(200, 100);
      frame.fills = [{ type: 'SOLID', color: H2WW_TOKENS.colors.trustBlue }];
      frame.cornerRadius = H2WW_TOKENS.borderRadius.md;
  }

  return frame;
}

// Handle messages from UI
figma.ui.onmessage = (msg) => {
  console.log('Received from UI:', msg);

  if (msg.type === 'create-component') {
    const component = createAnxietyAwareComponent(msg.componentType, msg.variant);

    // Add to canvas
    figma.currentPage.appendChild(component);
    figma.viewport.scrollAndZoomIntoView([component]);

    figma.notify(`${component.name} created with anxiety-aware design!`);
  }

  if (msg.type === 'analyze-selection') {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      figma.notify('Please select elements to analyze for anxiety patterns');
      return;
    }

    let totalScore = 0;
    let allRecommendations = [];

    selection.forEach(node => {
      const analysis = analyzeAnxietyLevel(node);
      totalScore += analysis.score;
      allRecommendations = [...allRecommendations, ...analysis.recommendations];
    });

    const avgLevel = totalScore === 0 ? 'Very Low' : totalScore <= selection.length * 2 ? 'Low' : 'Medium';

    figma.ui.postMessage({
      type: 'analysis-result',
      data: {
        level: avgLevel,
        score: totalScore,
        elementCount: selection.length,
        recommendations: [...new Set(allRecommendations)].slice(0, 5)
      }
    });

    figma.notify(`Analysis complete: ${avgLevel} anxiety level detected`);
  }

  if (msg.type === 'create-design-system') {
    // Create a comprehensive design system frame
    const systemFrame = figma.createFrame();
    systemFrame.name = 'H2WW Design System';
    systemFrame.resize(1200, 800);
    systemFrame.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];

    // Create color palette
    let xPos = 50;
    Object.entries(H2WW_TOKENS.colors).forEach(([name, color]) => {
      const colorSwatch = figma.createFrame();
      colorSwatch.name = name;
      colorSwatch.resize(80, 80);
      colorSwatch.fills = [{ type: 'SOLID', color }];
      colorSwatch.cornerRadius = 8;
      colorSwatch.x = xPos;
      colorSwatch.y = 50;
      systemFrame.appendChild(colorSwatch);
      xPos += 100;
    });

    figma.currentPage.appendChild(systemFrame);
    figma.viewport.scrollAndZoomIntoView([systemFrame]);
    figma.notify('Complete H2WW Design System created!');
  }

  if (msg.type === 'generate-persona-components') {
    const personas = [
      { name: 'Anxious User', components: ['safe-button', 'gentle-input'] },
      { name: 'Confident User', components: ['button', 'card'] },
      { name: 'New User', components: ['progress', 'alert'] }
    ];

    let yPos = 0;
    personas.forEach(persona => {
      const personaFrame = figma.createFrame();
      personaFrame.name = `${persona.name} Components`;
      personaFrame.resize(400, 150);
      personaFrame.fills = [{ type: 'SOLID', color: H2WW_TOKENS.colors.calmLight }];
      personaFrame.cornerRadius = 12;
      personaFrame.y = yPos;

      let xPos = 20;
      persona.components.forEach(compType => {
        const comp = createAnxietyAwareComponent(compType.includes('-') ? compType.split('-')[0] : compType, compType.includes('safe') ? 'safe' : undefined);
        comp.x = xPos;
        comp.y = 20;
        comp.resize(comp.width * 0.7, comp.height * 0.7);
        personaFrame.appendChild(comp);
        xPos += comp.width + 10;
      });

      figma.currentPage.appendChild(personaFrame);
      yPos += 170;
    });

    figma.notify('Persona-based components generated!');
  }

  if (msg.type === 'close') {
    figma.closePlugin();
  }
};