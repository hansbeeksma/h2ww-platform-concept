"use strict";
// H2WW Design System Importer - Creates Bauhaus-inspired learning interfaces from optimized JSON tokens
// Show UI
figma.showUI(__html__, {
    width: 480,
    height: 720,
    title: "H2WW Design System Importer"
});
// Design token resolver for H2WW system
class TokenResolver {
    constructor() {
        this.tokens = {};
    }
    loadTokens(tokenData) {
        this.tokens = tokenData;
    }
    resolve(tokenPath) {
        if (!tokenPath || !tokenPath.startsWith('{') || !tokenPath.endsWith('}')) {
            return tokenPath;
        }
        const path = tokenPath.slice(1, -1);
        const parts = path.split('.');
        let current = this.tokens;
        for (const part of parts) {
            if (current && current[part] !== undefined) {
                current = current[part];
            }
            else {
                console.warn(`Token not found: ${tokenPath}`);
                return tokenPath;
            }
        }
        if (current && current.$value !== undefined) {
            return current.$value;
        }
        return current;
    }
    resolveColor(colorToken) {
        const resolved = this.resolve(colorToken);
        if (typeof resolved === 'string') {
            return this.hexToRgb(resolved);
        }
        return { r: 0.5, g: 0.5, b: 0.5 };
    }
    resolveDimension(dimensionToken) {
        const resolved = this.resolve(dimensionToken);
        if (typeof resolved === 'string') {
            return parseInt(resolved.replace('px', ''));
        }
        if (typeof resolved === 'number') {
            return resolved;
        }
        return 16;
    }
    hexToRgb(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }
        const bigint = parseInt(hex, 16);
        return {
            r: ((bigint >> 16) & 255) / 255,
            g: ((bigint >> 8) & 255) / 255,
            b: (bigint & 255) / 255
        };
    }
}
// H2WW Design creation engine with token support
class DesignCreator {
    constructor() {
        this.createdNodes = [];
        this.tokenResolver = new TokenResolver();
    }
    async createFromSpec(spec, tokens) {
        try {
            // Load tokens if provided
            if (tokens) {
                this.tokenResolver.loadTokens(tokens);
            }
            // Start creation
            figma.notify('Creating H2WW design...', { timeout: 500 });
            // Create the design based on type
            const node = await this.createElement(spec);
            if (node) {
                // Add to page
                figma.currentPage.appendChild(node);
                // Center in viewport
                figma.viewport.scrollAndZoomIntoView([node]);
                // Select the created node
                figma.currentPage.selection = [node];
                // Success message
                figma.notify('✅ Design created successfully!', { timeout: 2000 });
                // Send success to UI
                figma.ui.postMessage({
                    type: 'success',
                    message: `Created ${spec.name || 'design'} successfully!`
                });
            }
        }
        catch (error) {
            // Error handling
            const errorMsg = `Failed to create design: ${error.message}`;
            figma.notify(errorMsg, { timeout: 3000, error: true });
            figma.ui.postMessage({
                type: 'error',
                message: errorMsg
            });
            // Clean up any created nodes
            this.cleanup();
        }
    }
    async createElement(spec) {
        if (!spec || !spec.type) {
            throw new Error('Invalid spec: missing type');
        }
        switch (spec.type.toLowerCase()) {
            case 'frame':
                return await this.createFrame(spec);
            case 'text':
                return await this.createText(spec);
            case 'rectangle':
            case 'rect':
                return await this.createRectangle(spec);
            case 'ellipse':
            case 'circle':
                return await this.createEllipse(spec);
            case 'component':
                return await this.createComponent(spec);
            case 'group':
                return await this.createGroup(spec);
            default:
                throw new Error(`Unknown element type: ${spec.type}`);
        }
    }
    async createFrame(spec) {
        const frame = figma.createFrame();
        // Basic properties
        frame.name = spec.name || 'Frame';
        frame.resize(spec.width || 800, spec.height || 600);
        // Position
        if (spec.x !== undefined)
            frame.x = spec.x;
        if (spec.y !== undefined)
            frame.y = spec.y;
        // Background with token support
        if (spec.backgroundColor || spec.fill) {
            const colorValue = spec.backgroundColor || spec.fill;
            const resolvedColor = this.tokenResolver.resolveColor(colorValue);
            frame.fills = [{
                    type: 'SOLID',
                    color: resolvedColor
                }];
        }
        // Corner radius with token support
        if (spec.cornerRadius) {
            const radiusValue = this.tokenResolver.resolveDimension(spec.cornerRadius);
            frame.cornerRadius = radiusValue;
        }
        // Auto layout
        if (spec.layout || spec.autoLayout) {
            const layoutMode = spec.direction === 'horizontal' ? 'HORIZONTAL' : 'VERTICAL';
            frame.layoutMode = layoutMode;
            const spacing = this.tokenResolver.resolveDimension(spec.spacing || spec.gap || '{core.spacing.scale.md}');
            frame.itemSpacing = spacing;
            if (spec.padding) {
                const paddingValue = this.tokenResolver.resolveDimension(spec.padding);
                if (typeof spec.padding === 'object') {
                    frame.paddingLeft = this.tokenResolver.resolveDimension(spec.padding.horizontal || spec.padding.left || '{core.spacing.scale.md}');
                    frame.paddingRight = this.tokenResolver.resolveDimension(spec.padding.horizontal || spec.padding.right || '{core.spacing.scale.md}');
                    frame.paddingTop = this.tokenResolver.resolveDimension(spec.padding.vertical || spec.padding.top || '{core.spacing.scale.md}');
                    frame.paddingBottom = this.tokenResolver.resolveDimension(spec.padding.vertical || spec.padding.bottom || '{core.spacing.scale.md}');
                }
                else {
                    frame.paddingLeft = frame.paddingRight = paddingValue;
                    frame.paddingTop = frame.paddingBottom = paddingValue;
                }
            }
            if (spec.primaryAxisAlignItems) {
                frame.primaryAxisAlignItems = spec.primaryAxisAlignItems;
            }
            if (spec.counterAxisAlignItems) {
                frame.counterAxisAlignItems = spec.counterAxisAlignItems;
            }
        }
        // Effects (shadows, etc)
        if (spec.effects) {
            frame.effects = this.processEffects(spec.effects);
        }
        // Children
        if (spec.children && Array.isArray(spec.children)) {
            for (const childSpec of spec.children) {
                const child = await this.createElement(childSpec);
                if (child) {
                    frame.appendChild(child);
                }
            }
        }
        this.createdNodes.push(frame);
        return frame;
    }
    async createText(spec) {
        const text = figma.createText();
        // Load font with token support
        const fontFamily = this.tokenResolver.resolve(spec.fontFamily || '{core.typography.body}');
        const fontName = {
            family: fontFamily || "Inter",
            style: this.getFontStyle(spec.fontWeight)
        };
        try {
            await figma.loadFontAsync(fontName);
        }
        catch (error) {
            // Fallback to Inter Regular
            await figma.loadFontAsync({ family: "Inter", style: "Regular" });
            text.fontName = { family: "Inter", style: "Regular" };
        }
        // Set text content
        text.characters = spec.content || spec.text || 'Text';
        // Text properties with token support
        if (spec.fontSize) {
            const fontSize = this.tokenResolver.resolveDimension(spec.fontSize);
            text.fontSize = fontSize;
        }
        if (spec.fontWeight) {
            text.fontName = fontName;
        }
        // Position
        if (spec.x !== undefined)
            text.x = spec.x;
        if (spec.y !== undefined)
            text.y = spec.y;
        // Color with token support
        if (spec.color) {
            const resolvedColor = this.tokenResolver.resolveColor(spec.color);
            text.fills = [{
                    type: 'SOLID',
                    color: resolvedColor
                }];
        }
        // Opacity
        if (spec.opacity !== undefined) {
            text.opacity = spec.opacity;
        }
        // Text align
        if (spec.textAlign) {
            text.textAlignHorizontal = spec.textAlign.toUpperCase();
        }
        this.createdNodes.push(text);
        return text;
    }
    async createRectangle(spec) {
        const rect = figma.createRectangle();
        // Basic properties
        rect.name = spec.name || 'Rectangle';
        rect.resize(spec.width || 100, spec.height || 100);
        // Position
        if (spec.x !== undefined)
            rect.x = spec.x;
        if (spec.y !== undefined)
            rect.y = spec.y;
        // Fill with token support
        if (spec.backgroundColor || spec.fill) {
            const color = spec.backgroundColor || spec.fill;
            const resolvedColor = this.tokenResolver.resolveColor(color);
            rect.fills = [{
                    type: 'SOLID',
                    color: resolvedColor
                }];
        }
        // Stroke with token support
        if (spec.stroke || spec.borderColor) {
            const strokeColor = this.tokenResolver.resolveColor(spec.stroke || spec.borderColor);
            rect.strokes = [{
                    type: 'SOLID',
                    color: strokeColor
                }];
            rect.strokeWeight = this.tokenResolver.resolveDimension(spec.strokeWeight || spec.borderWidth || '1px');
        }
        // Corner radius with token support
        if (spec.cornerRadius) {
            const radiusValue = this.tokenResolver.resolveDimension(spec.cornerRadius);
            rect.cornerRadius = radiusValue;
        }
        // Effects
        if (spec.effects) {
            rect.effects = this.processEffects(spec.effects);
        }
        // Children (for nested elements)
        if (spec.children && Array.isArray(spec.children)) {
            // Convert rectangle to frame to support children
            const frame = figma.createFrame();
            frame.name = rect.name;
            frame.resize(rect.width, rect.height);
            frame.x = rect.x;
            frame.y = rect.y;
            frame.fills = rect.fills;
            frame.cornerRadius = rect.cornerRadius;
            for (const childSpec of spec.children) {
                const child = await this.createElement(childSpec);
                if (child) {
                    frame.appendChild(child);
                }
            }
            rect.remove();
            this.createdNodes.push(frame);
            return frame;
        }
        this.createdNodes.push(rect);
        return rect;
    }
    async createEllipse(spec) {
        const ellipse = figma.createEllipse();
        ellipse.name = spec.name || 'Ellipse';
        ellipse.resize(spec.width || 100, spec.height || 100);
        if (spec.x !== undefined)
            ellipse.x = spec.x;
        if (spec.y !== undefined)
            ellipse.y = spec.y;
        if (spec.backgroundColor || spec.fill) {
            const resolvedColor = this.tokenResolver.resolveColor(spec.backgroundColor || spec.fill);
            ellipse.fills = [{
                    type: 'SOLID',
                    color: resolvedColor
                }];
        }
        this.createdNodes.push(ellipse);
        return ellipse;
    }
    async createComponent(spec) {
        const component = figma.createComponent();
        component.name = spec.name || 'Component';
        component.resize(spec.width || 200, spec.height || 100);
        if (spec.x !== undefined)
            component.x = spec.x;
        if (spec.y !== undefined)
            component.y = spec.y;
        // Add children to component
        if (spec.children && Array.isArray(spec.children)) {
            for (const childSpec of spec.children) {
                const child = await this.createElement(childSpec);
                if (child) {
                    component.appendChild(child);
                }
            }
        }
        this.createdNodes.push(component);
        return component;
    }
    async createGroup(spec) {
        const nodes = [];
        // Create all children first
        if (spec.children && Array.isArray(spec.children)) {
            for (const childSpec of spec.children) {
                const child = await this.createElement(childSpec);
                if (child) {
                    nodes.push(child);
                }
            }
        }
        // Group them
        if (nodes.length > 0) {
            const group = figma.group(nodes, figma.currentPage);
            group.name = spec.name || 'Group';
            if (spec.x !== undefined)
                group.x = spec.x;
            if (spec.y !== undefined)
                group.y = spec.y;
            this.createdNodes.push(group);
            return group;
        }
        throw new Error('Group must have children');
    }
    processEffects(effects) {
        const figmaEffects = [];
        for (const effect of effects) {
            if (effect.type === 'dropShadow' || effect.type === 'DROP_SHADOW') {
                figmaEffects.push({
                    type: 'DROP_SHADOW',
                    color: typeof effect.color === 'string'
                        ? this.hexToRgbWithAlpha(effect.color)
                        : effect.color,
                    offset: {
                        x: effect.x || 0,
                        y: effect.y || 4
                    },
                    radius: effect.blur || effect.radius || 8,
                    spread: effect.spread || 0,
                    visible: true,
                    blendMode: 'NORMAL'
                });
            }
        }
        return figmaEffects;
    }
    hexToRgb(hex) {
        // Remove # if present
        hex = hex.replace('#', '');
        // Handle 3-digit hex
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }
        const bigint = parseInt(hex, 16);
        return {
            r: ((bigint >> 16) & 255) / 255,
            g: ((bigint >> 8) & 255) / 255,
            b: (bigint & 255) / 255
        };
    }
    hexToRgbWithAlpha(input) {
        // Handle rgba() format
        if (input.startsWith('rgba')) {
            const matches = input.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
            if (matches) {
                return {
                    r: parseInt(matches[1]) / 255,
                    g: parseInt(matches[2]) / 255,
                    b: parseInt(matches[3]) / 255,
                    a: parseFloat(matches[4])
                };
            }
        }
        const rgb = this.hexToRgb(input);
        return { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 };
    }
    getFontStyle(weight) {
        if (!weight)
            return "Regular";
        const weightNum = typeof weight === 'string' ? parseInt(weight) : weight;
        if (weightNum >= 700)
            return "Bold";
        if (weightNum >= 600)
            return "Semi Bold";
        if (weightNum >= 500)
            return "Medium";
        return "Regular";
    }
    cleanup() {
        // Remove any created nodes in case of error
        for (const node of this.createdNodes) {
            try {
                node.remove();
            }
            catch (error) { }
        }
        this.createdNodes = [];
    }
}
// Enhanced message handler for H2WW design system
figma.ui.onmessage = async (msg) => {
    const creator = new DesignCreator();
    switch (msg.type) {
        case 'create-design':
            await creator.createFromSpec(msg.design, msg.tokens);
            break;
        case 'import-tokens':
            // Import design tokens as Figma variables
            await importTokensAsVariables(msg.tokens);
            break;
        case 'import-components':
            // Import component library
            await importComponentLibrary(msg.components, msg.tokens);
            break;
        case 'import-all':
            // Import complete H2WW design system
            await importCompleteSystem(msg.tokens, msg.components);
            break;
    }
};
// Import design tokens as Figma variables
async function importTokensAsVariables(tokens) {
    try {
        figma.notify('Importing H2WW design tokens...', { timeout: 1000 });
        // Create color variables
        if (tokens.core?.color) {
            await createColorVariables(tokens.core.color, 'H2WW/Colors');
        }
        // Create spacing variables 
        if (tokens.core?.spacing) {
            await createDimensionVariables(tokens.core.spacing, 'H2WW/Spacing');
        }
        // Create typography variables
        if (tokens.core?.typography) {
            await createStringVariables(tokens.core.typography, 'H2WW/Typography');
        }
        figma.notify('✅ H2WW tokens imported successfully!', { timeout: 2000 });
    }
    catch (error) {
        figma.notify(`Failed to import tokens: ${error.message}`, { timeout: 3000, error: true });
    }
}
// Create color variables from tokens
async function createColorVariables(colorTokens, collectionName) {
    const collection = figma.variables.createVariableCollection(collectionName);
    function processColorObject(obj, prefix = '') {
        for (const [key, value] of Object.entries(obj)) {
            if (value && typeof value === 'object') {
                if (value.$value && typeof value.$value === 'string') {
                    // This is a token with a value
                    const variable = figma.variables.createVariable(`${prefix}${key}`, collection, 'COLOR');
                    const rgb = hexToRgb(value.$value);
                    variable.setValueForMode(collection.defaultModeId, rgb);
                }
                else {
                    // This is a nested object
                    processColorObject(value, `${prefix}${key}/`);
                }
            }
        }
    }
    processColorObject(colorTokens);
}
// Create dimension variables from tokens
async function createDimensionVariables(spacingTokens, collectionName) {
    const collection = figma.variables.createVariableCollection(collectionName);
    function processSpacingObject(obj, prefix = '') {
        for (const [key, value] of Object.entries(obj)) {
            if (value && typeof value === 'object') {
                if (value.$value) {
                    const variable = figma.variables.createVariable(`${prefix}${key}`, collection, 'FLOAT');
                    const numValue = parseInt(value.$value.toString().replace('px', ''));
                    variable.setValueForMode(collection.defaultModeId, numValue);
                }
                else {
                    processSpacingObject(value, `${prefix}${key}/`);
                }
            }
        }
    }
    processSpacingObject(spacingTokens);
}
// Create string variables from tokens
async function createStringVariables(typographyTokens, collectionName) {
    const collection = figma.variables.createVariableCollection(collectionName);
    for (const [key, value] of Object.entries(typographyTokens)) {
        if (value && typeof value === 'object' && value.$value) {
            const variable = figma.variables.createVariable(key, collection, 'STRING');
            variable.setValueForMode(collection.defaultModeId, value.$value);
        }
    }
}
// Import component library
async function importComponentLibrary(components, tokens) {
    figma.notify('Importing H2WW component library...', { timeout: 1000 });
    const creator = new DesignCreator();
    const componentsFrame = figma.createFrame();
    componentsFrame.name = 'H2WW Component Library';
    componentsFrame.resize(1200, 800);
    let yOffset = 0;
    for (const [componentName, componentSpec] of Object.entries(components.components || {})) {
        try {
            // Load tokens if provided
            if (tokens) {
                creator.tokenResolver.loadTokens(tokens);
            }
            const componentNode = await creator.createElement({
                type: 'component',
                name: componentName,
                width: 300,
                height: 200,
                x: 0,
                y: yOffset,
                ...componentSpec
            });
            if (componentNode !== null) {
                componentsFrame.appendChild(componentNode);
                yOffset += 220;
            }
        }
        catch (error) {
            console.error(`Failed to create component ${componentName}:`, error);
        }
    }
    figma.currentPage.appendChild(componentsFrame);
    figma.viewport.scrollAndZoomIntoView([componentsFrame]);
    figma.notify('✅ H2WW components imported!', { timeout: 2000 });
}
// Import complete design system
async function importCompleteSystem(tokens, components) {
    figma.notify('Importing complete H2WW design system...', { timeout: 1500 });
    // Import tokens first
    await importTokensAsVariables(tokens);
    // Then import components
    if (components) {
        await importComponentLibrary(components, tokens);
    }
    figma.notify('🎨 Complete H2WW system imported successfully!', { timeout: 3000 });
}
// Helper function for color conversion
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    const bigint = parseInt(hex, 16);
    return {
        r: ((bigint >> 16) & 255) / 255,
        g: ((bigint >> 8) & 255) / 255,
        b: (bigint & 255) / 255
    };
}
// Close plugin handler
figma.on("close", () => {
    figma.closePlugin();
});
