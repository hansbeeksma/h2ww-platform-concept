// Stable Claude Design Importer
console.log('Plugin starting...');

// Show UI
figma.showUI(__html__, { 
  width: 400, 
  height: 600,
  title: "Claude Design Importer"
});

// Main creation function
async function createDesign(spec) {
  try {
    console.log('Creating design:', spec);
    
    // Load Inter font first to avoid issues
    try {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    } catch (fontError) {
      console.log('Font loading warning:', fontError);
    }
    
    // Create main frame
    const mainFrame = figma.createFrame();
    mainFrame.name = spec.name || 'Design';
    mainFrame.resize(spec.width || 800, spec.height || 600);
    
    // Set background color
    if (spec.backgroundColor) {
      mainFrame.fills = [createSolidFill(spec.backgroundColor)];
    }
    
    // Set corner radius
    if (spec.cornerRadius) {
      mainFrame.cornerRadius = spec.cornerRadius;
    }
    
    // Handle auto layout
    if (spec.layout) {
      mainFrame.layoutMode = spec.direction === 'horizontal' ? 'HORIZONTAL' : 'VERTICAL';
      mainFrame.itemSpacing = spec.spacing || 16;
      
      if (spec.padding) {
        const padding = typeof spec.padding === 'number' ? spec.padding : 16;
        mainFrame.paddingLeft = padding;
        mainFrame.paddingRight = padding;
        mainFrame.paddingTop = padding;
        mainFrame.paddingBottom = padding;
      }
      
      // Set alignment
      mainFrame.primaryAxisAlignItems = 'MIN';
      mainFrame.counterAxisAlignItems = 'MIN';
    }
    
    // Create children
    if (spec.children && Array.isArray(spec.children)) {
      for (let i = 0; i < spec.children.length; i++) {
        const childSpec = spec.children[i];
        try {
          const child = await createElement(childSpec);
          if (child) {
            mainFrame.appendChild(child);
            console.log('Successfully added child:', childSpec.type, childSpec.name || childSpec.content);
          }
        } catch (childError) {
          console.log('Error creating child:', childError);
          // Continue with other children
        }
      }
    }
    
    // Add to page
    figma.currentPage.appendChild(mainFrame);
    figma.viewport.scrollAndZoomIntoView([mainFrame]);
    figma.currentPage.selection = [mainFrame];
    
    figma.notify('✅ Design created successfully!');
    figma.ui.postMessage({ type: 'success', message: 'Design created!' });
    
  } catch (error) {
    console.error('Error:', error);
    figma.notify('❌ Error: ' + error.message);
    figma.ui.postMessage({ type: 'error', message: error.message });
  }
}

// Create individual elements
async function createElement(spec) {
  if (!spec || !spec.type) {
    return null;
  }
  
  console.log('Creating element:', spec.type, spec.name);
  
  switch (spec.type.toLowerCase()) {
    case 'frame':
      return await createFrameWithChildren(spec);
    case 'text':
      return await createText(spec);
    case 'rectangle':
    case 'rect':
      return createRectangle(spec);
    default:
      console.log('Unknown type:', spec.type);
      return null;
  }
}

// Create frame with children
async function createFrameWithChildren(spec) {
  const frame = figma.createFrame();
  frame.name = spec.name || 'Frame';
  frame.resize(spec.width || 200, spec.height || 100);
  
  console.log('Setting frame properties:', spec.name, spec.backgroundColor);
  
  // Position
  if (spec.x !== undefined) frame.x = spec.x;
  if (spec.y !== undefined) frame.y = spec.y;
  
  // Background color
  if (spec.backgroundColor) {
    console.log('Setting background color:', spec.backgroundColor);
    frame.fills = [createSolidFill(spec.backgroundColor)];
  }
  
  // Corner radius
  if (spec.cornerRadius) {
    frame.cornerRadius = spec.cornerRadius;
  }
  
  // Stroke
  if (spec.stroke) {
    frame.strokes = [createSolidFill(spec.stroke)];
    frame.strokeWeight = spec.strokeWeight || 1;
  }
  
  // Auto layout setup
  if (spec.layout || spec.children) {
    frame.layoutMode = spec.direction === 'horizontal' ? 'HORIZONTAL' : 'VERTICAL';
    frame.itemSpacing = spec.spacing || 16;
    
    if (spec.padding) {
      const padding = typeof spec.padding === 'number' ? spec.padding : 16;
      frame.paddingLeft = padding;
      frame.paddingRight = padding;
      frame.paddingTop = padding;
      frame.paddingBottom = padding;
    }
    
    // Alignment
    frame.primaryAxisAlignItems = 'MIN';
    frame.counterAxisAlignItems = 'MIN';
  }
  
  // Handle children
  if (spec.children && Array.isArray(spec.children)) {
    console.log('Creating', spec.children.length, 'children for', spec.name);
    for (let i = 0; i < spec.children.length; i++) {
      const childSpec = spec.children[i];
      try {
        const child = await createElement(childSpec);
        if (child) {
          frame.appendChild(child);
          console.log('Added child:', childSpec.type, childSpec.name || childSpec.content);
        }
      } catch (childError) {
        console.log('Error creating child:', childError);
      }
    }
  }
  
  return frame;
}

// Create text (improved)
async function createText(spec) {
  const text = figma.createText();
  
  console.log('Creating text:', spec.content, 'color:', spec.color, 'fontSize:', spec.fontSize);
  
  // Set the text content first
  text.characters = spec.content || spec.text || 'Text';
  text.name = spec.name || text.characters;
  
  // Set font properties
  if (spec.fontSize && spec.fontSize > 0) {
    text.fontSize = spec.fontSize;
  } else {
    text.fontSize = 16; // Default size
  }
  
  // Set font weight if specified
  if (spec.fontWeight && spec.fontWeight >= 600) {
    try {
      await figma.loadFontAsync({ family: "Inter", style: "Bold" });
      text.fontName = { family: "Inter", style: "Bold" };
    } catch (e) {
      console.log('Bold font failed, using regular');
    }
  }
  
  // Set color - this is crucial
  if (spec.color) {
    console.log('Setting text color:', spec.color);
    const fill = createSolidFill(spec.color);
    text.fills = [fill];
    console.log('Text fill set to:', fill);
  } else {
    // Default to black if no color specified
    text.fills = [createSolidFill('#000000')];
  }
  
  // Position (for absolute positioning)
  if (spec.x !== undefined) text.x = spec.x;
  if (spec.y !== undefined) text.y = spec.y;
  
  // Opacity
  if (spec.opacity !== undefined) {
    text.opacity = spec.opacity;
  }
  
  // Text alignment
  if (spec.textAlign) {
    try {
      text.textAlignHorizontal = spec.textAlign.toUpperCase();
    } catch (e) {
      console.log('Text align error:', e);
    }
  }
  
  console.log('Text element created:', text.characters, text.fontSize, text.fills);
  return text;
}

// Create rectangle
function createRectangle(spec) {
  const rect = figma.createRectangle();
  rect.name = spec.name || 'Rectangle';
  rect.resize(spec.width || 100, spec.height || 100);
  
  if (spec.x !== undefined) rect.x = spec.x;
  if (spec.y !== undefined) rect.y = spec.y;
  
  if (spec.backgroundColor || spec.fill) {
    rect.fills = [createSolidFill(spec.backgroundColor || spec.fill)];
  }
  
  if (spec.cornerRadius) {
    rect.cornerRadius = spec.cornerRadius;
  }
  
  return rect;
}

// Helper function to create solid fill
function createSolidFill(hexColor) {
  if (!hexColor || typeof hexColor !== 'string') {
    console.log('Invalid color:', hexColor);
    return {
      type: 'SOLID',
      color: { r: 0.5, g: 0.5, b: 0.5 } // Default gray
    };
  }
  
  const hex = hexColor.replace('#', '');
  
  // Handle 3-digit hex
  let fullHex = hex;
  if (hex.length === 3) {
    fullHex = hex.split('').map(char => char + char).join('');
  }
  
  if (fullHex.length !== 6) {
    console.log('Invalid hex length:', fullHex);
    return {
      type: 'SOLID',
      color: { r: 0.5, g: 0.5, b: 0.5 } // Default gray
    };
  }
  
  const r = parseInt(fullHex.substring(0, 2), 16) / 255;
  const g = parseInt(fullHex.substring(2, 4), 16) / 255;
  const b = parseInt(fullHex.substring(4, 6), 16) / 255;
  
  // Validate numbers
  const rVal = isNaN(r) ? 0.5 : r;
  const gVal = isNaN(g) ? 0.5 : g;
  const bVal = isNaN(b) ? 0.5 : b;
  
  console.log('Color conversion:', hexColor, '->', { r: rVal, g: gVal, b: bVal });
  
  return {
    type: 'SOLID',
    color: { r: rVal, g: gVal, b: bVal }
  };
}

// Message handler
figma.ui.onmessage = async (msg) => {
  console.log('Message received:', msg);
  
  if (msg.type === 'create-design') {
    await createDesign(msg.design);
  }
};

// Close handler
figma.on("close", () => {
  figma.closePlugin();
});

console.log('Plugin ready');