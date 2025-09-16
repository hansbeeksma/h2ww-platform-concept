// H2WW Complete Design System Importer - Extended Version
// Implements all checklist components and patterns

figma.showUI(__html__, {
  width: 520,
  height: 800,
  title: "H2WW Complete Design System"
});

// Enhanced Token Resolver with full system support
class TokenResolver {
  private tokens: any = {};

  loadTokens(tokenData: any): void {
    this.tokens = tokenData;
  }

  resolve(tokenPath: string): any {
    if (!tokenPath || typeof tokenPath !== 'string') return tokenPath;

    // Handle token references {token.path}
    if (tokenPath.startsWith('{') && tokenPath.endsWith('}')) {
      const path = tokenPath.slice(1, -1);
      const parts = path.split('.');
      let current = this.tokens;

      for (const part of parts) {
        if (current && current[part] !== undefined) {
          current = current[part];
        } else {
          console.warn(`Token not found: ${tokenPath}`);
          return tokenPath;
        }
      }

      // Resolve nested tokens recursively
      if (typeof current === 'string' && current.startsWith('{')) {
        return this.resolve(current);
      }

      return current?.$value || current;
    }

    return tokenPath;
  }

  resolveColor(colorToken: string): RGB {
    const resolved = this.resolve(colorToken);
    if (typeof resolved === 'string') {
      return this.hexToRgb(resolved);
    }
    return { r: 0.5, g: 0.5, b: 0.5 };
  }

  resolveDimension(dimensionToken: string): number {
    const resolved = this.resolve(dimensionToken);
    if (typeof resolved === 'string') {
      return parseInt(resolved.replace(/[^0-9]/g, ''));
    }
    if (typeof resolved === 'number') {
      return resolved;
    }
    return 16;
  }

  private hexToRgb(hex: string): RGB {
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

// Component Factory for creating all UI elements
class ComponentFactory {
  private tokenResolver: TokenResolver;

  constructor(tokenResolver: TokenResolver) {
    this.tokenResolver = tokenResolver;
  }

  // Visual Language Elements
  async createColorPalette(system: any): Promise<FrameNode> {
    const frame = figma.createFrame();
    frame.name = "Color Palette";
    frame.layoutMode = "VERTICAL";
    frame.layoutAlign = "STRETCH";
    frame.itemSpacing = 16;
    frame.paddingLeft = frame.paddingRight = frame.paddingTop = frame.paddingBottom = 24;
    frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

    // Create color sections
    for (const [category, colors] of Object.entries(system.visualLanguage.color.palettes)) {
      const section = await this.createColorSection(category as string, colors as any);
      frame.appendChild(section);
    }

    return frame;
  }

  private async createColorSection(name: string, colors: any): Promise<FrameNode> {
    const section = figma.createFrame();
    section.name = `Color - ${name}`;
    section.layoutMode = "VERTICAL";
    section.layoutAlign = "STRETCH";
    section.itemSpacing = 8;

    // Add section title
    const title = figma.createText();
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    title.characters = name.toUpperCase();
    title.fontSize = 14;
    title.fontName = { family: "Inter", style: "Bold" };
    section.appendChild(title);

    // Add color swatches
    const swatchRow = figma.createFrame();
    swatchRow.layoutMode = "HORIZONTAL";
    swatchRow.itemSpacing = 8;

    for (const [colorName, colorValue] of Object.entries(colors)) {
      if (typeof colorValue === 'object' && colorValue !== null) {
        const swatch = this.createColorSwatch(
          colorName as string,
          (colorValue as any).hex || (colorValue as any).$value || '#000000'
        );
        swatchRow.appendChild(swatch);
      }
    }

    section.appendChild(swatchRow);
    return section;
  }

  private createColorSwatch(name: string, hex: string): FrameNode {
    const swatch = figma.createFrame();
    swatch.name = `Swatch - ${name}`;
    swatch.resize(80, 80);
    swatch.cornerRadius = 8;

    const color = this.tokenResolver.resolveColor(hex);
    swatch.fills = [{ type: 'SOLID', color }];

    return swatch;
  }

  // Typography System
  async createTypographySystem(system: any): Promise<FrameNode> {
    const frame = figma.createFrame();
    frame.name = "Typography System";
    frame.layoutMode = "VERTICAL";
    frame.layoutAlign = "STRETCH";
    frame.itemSpacing = 24;
    frame.paddingLeft = frame.paddingRight = frame.paddingTop = frame.paddingBottom = 32;
    frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });

    // Create hierarchy examples
    for (const [level, styles] of Object.entries(system.visualLanguage.typography.hierarchy)) {
      const text = figma.createText();
      text.characters = `${level.toUpperCase()}: The quick brown fox jumps over the lazy dog`;
      text.fontSize = parseInt((styles as any).size);
      text.fontName = {
        family: "Inter",
        style: parseInt((styles as any).weight) >= 600 ? "Bold" : "Regular"
      };
      frame.appendChild(text);
    }

    return frame;
  }

  // UI Elements
  async createButton(spec: any): Promise<FrameNode> {
    const button = figma.createFrame();
    button.name = spec.name || "Button";
    button.resize(200, 48);
    button.cornerRadius = 8;
    button.layoutMode = "HORIZONTAL";
    button.primaryAxisAlignItems = "CENTER";
    button.counterAxisAlignItems = "CENTER";

    // Apply button style
    if (spec.variant === 'primary') {
      button.fills = [{
        type: 'SOLID',
        color: this.tokenResolver.resolveColor(spec.background || '#E53E3E')
      }];
    } else if (spec.variant === 'secondary') {
      button.fills = [];
      button.strokes = [{
        type: 'SOLID',
        color: this.tokenResolver.resolveColor(spec.borderColor || '#3182CE')
      }];
      button.strokeWeight = 2;
    }

    // Add button text
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    const text = figma.createText();
    text.characters = spec.label || "Button";
    text.fontSize = 16;
    text.fontName = { family: "Inter", style: "Medium" };
    text.fills = [{
      type: 'SOLID',
      color: spec.variant === 'primary'
        ? { r: 1, g: 1, b: 1 }
        : this.tokenResolver.resolveColor('#3182CE')
    }];

    button.appendChild(text);
    return button;
  }

  async createFormField(type: string, spec: any): Promise<FrameNode> {
    const field = figma.createFrame();
    field.name = `Form Field - ${type}`;
    field.layoutMode = "VERTICAL";
    field.layoutAlign = "STRETCH";
    field.itemSpacing = 8;

    // Create label
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    const label = figma.createText();
    label.characters = spec.label || "Label";
    label.fontSize = 14;
    label.fontName = { family: "Inter", style: "Medium" };
    field.appendChild(label);

    // Create input
    const input = figma.createFrame();
    input.resize(300, 44);
    input.cornerRadius = 8;
    input.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    input.strokes = [{
      type: 'SOLID',
      color: this.tokenResolver.resolveColor('#D1D5DB')
    }];
    input.strokeWeight = 1;
    input.layoutMode = "HORIZONTAL";
    input.paddingLeft = input.paddingRight = 12;
    input.primaryAxisAlignItems = "CENTER";

    // Add placeholder text
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    const placeholder = figma.createText();
    placeholder.characters = spec.placeholder || `Enter ${type}...`;
    placeholder.fontSize = 14;
    placeholder.fontName = { family: "Inter", style: "Regular" };
    placeholder.fills = [{
      type: 'SOLID',
      color: this.tokenResolver.resolveColor('#9CA3AF')
    }];

    input.appendChild(placeholder);
    field.appendChild(input);

    // Add helper text if specified
    if (spec.helper) {
      const helper = figma.createText();
      helper.characters = spec.helper;
      helper.fontSize = 12;
      helper.fontName = { family: "Inter", style: "Regular" };
      helper.fills = [{
        type: 'SOLID',
        color: this.tokenResolver.resolveColor('#6B7280')
      }];
      field.appendChild(helper);
    }

    return field;
  }

  // UI Components
  async createCard(spec: any): Promise<FrameNode> {
    const card = figma.createFrame();
    card.name = spec.name || "Card";
    card.resize(spec.width || 320, spec.height || 400);
    card.cornerRadius = 12;
    card.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    card.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.1 },
      offset: { x: 0, y: 2 },
      radius: 8,
      visible: true,
      blendMode: 'NORMAL'
    }];
    card.layoutMode = "VERTICAL";
    card.paddingLeft = card.paddingRight = card.paddingTop = card.paddingBottom = 24;
    card.itemSpacing = 16;

    // Add card content based on spec
    if (spec.title) {
      await figma.loadFontAsync({ family: "Inter", style: "Bold" });
      const title = figma.createText();
      title.characters = spec.title;
      title.fontSize = 20;
      title.fontName = { family: "Inter", style: "Bold" };
      card.appendChild(title);
    }

    if (spec.description) {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      const desc = figma.createText();
      desc.characters = spec.description;
      desc.fontSize = 14;
      desc.fontName = { family: "Inter", style: "Regular" };
      desc.fills = [{
        type: 'SOLID',
        color: this.tokenResolver.resolveColor('#6B7280')
      }];
      card.appendChild(desc);
    }

    return card;
  }

  async createModal(spec: any): Promise<FrameNode> {
    const modal = figma.createFrame();
    modal.name = "Modal";
    modal.resize(500, 400);
    modal.cornerRadius = 16;
    modal.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    modal.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.25 },
      offset: { x: 0, y: 10 },
      radius: 40,
      visible: true,
      blendMode: 'NORMAL'
    }];
    modal.layoutMode = "VERTICAL";
    modal.paddingLeft = modal.paddingRight = modal.paddingTop = modal.paddingBottom = 32;
    modal.itemSpacing = 24;

    // Modal header
    const header = figma.createFrame();
    header.layoutMode = "HORIZONTAL";
    header.layoutAlign = "STRETCH";
    header.counterAxisAlignItems = "CENTER";

    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    const title = figma.createText();
    title.characters = spec.title || "Modal Title";
    title.fontSize = 24;
    title.fontName = { family: "Inter", style: "Bold" };
    title.layoutGrow = 1;
    header.appendChild(title);

    // Close button
    const closeBtn = figma.createFrame();
    closeBtn.resize(32, 32);
    closeBtn.cornerRadius = 16;
    closeBtn.fills = [{
      type: 'SOLID',
      color: this.tokenResolver.resolveColor('#F3F4F6')
    }];
    header.appendChild(closeBtn);

    modal.appendChild(header);

    // Modal content
    if (spec.content) {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      const content = figma.createText();
      content.characters = spec.content;
      content.fontSize = 14;
      content.fontName = { family: "Inter", style: "Regular" };
      content.layoutGrow = 1;
      modal.appendChild(content);
    }

    // Modal actions
    const actions = figma.createFrame();
    actions.layoutMode = "HORIZONTAL";
    actions.layoutAlign = "STRETCH";
    actions.primaryAxisAlignItems = "MAX";
    actions.itemSpacing = 12;

    // Cancel button
    const cancelBtn = await this.createButton({
      variant: 'secondary',
      label: 'Cancel'
    });
    actions.appendChild(cancelBtn);

    // Confirm button
    const confirmBtn = await this.createButton({
      variant: 'primary',
      label: spec.confirmLabel || 'Confirm'
    });
    actions.appendChild(confirmBtn);

    modal.appendChild(actions);

    return modal;
  }

  async createNavigation(spec: any): Promise<FrameNode> {
    const nav = figma.createFrame();
    nav.name = "Navigation";
    nav.resize(1440, 64);
    nav.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    nav.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.05 },
      offset: { x: 0, y: 1 },
      radius: 3,
      visible: true,
      blendMode: 'NORMAL'
    }];
    nav.layoutMode = "HORIZONTAL";
    nav.paddingLeft = nav.paddingRight = 24;
    nav.primaryAxisAlignItems = "CENTER";
    nav.counterAxisAlignItems = "CENTER";
    nav.itemSpacing = 32;

    // Logo area
    const logo = figma.createFrame();
    logo.resize(120, 32);
    logo.cornerRadius = 4;
    logo.fills = [{
      type: 'SOLID',
      color: this.tokenResolver.resolveColor('#E53E3E')
    }];
    nav.appendChild(logo);

    // Navigation items
    const navItems = figma.createFrame();
    navItems.layoutMode = "HORIZONTAL";
    navItems.itemSpacing = 24;
    navItems.layoutGrow = 1;

    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    const items = spec.items || ['Home', 'Features', 'Pricing', 'About'];
    for (const item of items) {
      const navItem = figma.createText();
      navItem.characters = item;
      navItem.fontSize = 14;
      navItem.fontName = { family: "Inter", style: "Medium" };
      navItems.appendChild(navItem);
    }

    nav.appendChild(navItems);

    // User menu
    const userMenu = figma.createFrame();
    userMenu.resize(40, 40);
    userMenu.cornerRadius = 20;
    userMenu.fills = [{
      type: 'SOLID',
      color: this.tokenResolver.resolveColor('#F3F4F6')
    }];
    nav.appendChild(userMenu);

    return nav;
  }

  // Patterns
  async createAuthenticationForm(spec: any): Promise<FrameNode> {
    const form = figma.createFrame();
    form.name = "Authentication Form";
    form.resize(400, 500);
    form.cornerRadius = 16;
    form.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    form.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.1 },
      offset: { x: 0, y: 4 },
      radius: 20,
      visible: true,
      blendMode: 'NORMAL'
    }];
    form.layoutMode = "VERTICAL";
    form.paddingLeft = form.paddingRight = form.paddingTop = form.paddingBottom = 32;
    form.itemSpacing = 24;

    // Title
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    const title = figma.createText();
    title.characters = spec.type === 'register' ? "Create Account" : "Sign In";
    title.fontSize = 28;
    title.fontName = { family: "Inter", style: "Bold" };
    title.textAlignHorizontal = "CENTER";
    title.layoutAlign = "STRETCH";
    form.appendChild(title);

    // Form fields
    const emailField = await this.createFormField('email', {
      label: 'Email',
      placeholder: 'Enter your email'
    });
    form.appendChild(emailField);

    const passwordField = await this.createFormField('password', {
      label: 'Password',
      placeholder: 'Enter your password'
    });
    form.appendChild(passwordField);

    if (spec.type === 'register') {
      const confirmField = await this.createFormField('password', {
        label: 'Confirm Password',
        placeholder: 'Confirm your password'
      });
      form.appendChild(confirmField);
    }

    // Submit button
    const submitBtn = await this.createButton({
      variant: 'primary',
      label: spec.type === 'register' ? 'Create Account' : 'Sign In'
    });
    submitBtn.layoutAlign = "STRETCH";
    form.appendChild(submitBtn);

    // Social login
    const socialSection = figma.createFrame();
    socialSection.layoutMode = "VERTICAL";
    socialSection.layoutAlign = "STRETCH";
    socialSection.itemSpacing = 12;

    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    const orText = figma.createText();
    orText.characters = "Or continue with";
    orText.fontSize = 12;
    orText.fontName = { family: "Inter", style: "Regular" };
    orText.textAlignHorizontal = "CENTER";
    orText.layoutAlign = "STRETCH";
    orText.fills = [{
      type: 'SOLID',
      color: this.tokenResolver.resolveColor('#6B7280')
    }];
    socialSection.appendChild(orText);

    const socialButtons = figma.createFrame();
    socialButtons.layoutMode = "HORIZONTAL";
    socialButtons.layoutAlign = "STRETCH";
    socialButtons.itemSpacing = 12;

    const googleBtn = await this.createButton({
      variant: 'secondary',
      label: 'Google'
    });
    googleBtn.layoutGrow = 1;
    socialButtons.appendChild(googleBtn);

    const githubBtn = await this.createButton({
      variant: 'secondary',
      label: 'GitHub'
    });
    githubBtn.layoutGrow = 1;
    socialButtons.appendChild(githubBtn);

    socialSection.appendChild(socialButtons);
    form.appendChild(socialSection);

    return form;
  }

  // Page Templates
  async createDashboard(spec: any): Promise<FrameNode> {
    const dashboard = figma.createFrame();
    dashboard.name = "Dashboard Template";
    dashboard.resize(1440, 900);
    dashboard.fills = [{
      type: 'SOLID',
      color: this.tokenResolver.resolveColor('#F9FAFB')
    }];
    dashboard.layoutMode = "VERTICAL";

    // Add navigation
    const nav = await this.createNavigation({
      items: ['Dashboard', 'Analytics', 'Reports', 'Settings']
    });
    dashboard.appendChild(nav);

    // Main content area
    const content = figma.createFrame();
    content.layoutMode = "HORIZONTAL";
    content.layoutGrow = 1;

    // Sidebar
    const sidebar = figma.createFrame();
    sidebar.resize(240, 836);
    sidebar.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    sidebar.layoutMode = "VERTICAL";
    sidebar.paddingLeft = sidebar.paddingRight = sidebar.paddingTop = sidebar.paddingBottom = 16;
    sidebar.itemSpacing = 8;
    content.appendChild(sidebar);

    // Main area
    const main = figma.createFrame();
    main.layoutGrow = 1;
    main.layoutMode = "VERTICAL";
    main.paddingLeft = main.paddingRight = main.paddingTop = main.paddingBottom = 32;
    main.itemSpacing = 24;

    // Dashboard widgets
    const widgetRow = figma.createFrame();
    widgetRow.layoutMode = "HORIZONTAL";
    widgetRow.layoutAlign = "STRETCH";
    widgetRow.itemSpacing = 24;

    for (let i = 0; i < 3; i++) {
      const widget = await this.createCard({
        title: `Metric ${i + 1}`,
        description: 'Widget description',
        width: 320,
        height: 200
      });
      widget.layoutGrow = 1;
      widgetRow.appendChild(widget);
    }

    main.appendChild(widgetRow);
    content.appendChild(main);
    dashboard.appendChild(content);

    return dashboard;
  }
}

// Main Design System Creator
class H2WWDesignSystemCreator {
  private componentFactory: ComponentFactory;
  private tokenResolver: TokenResolver;

  constructor() {
    this.tokenResolver = new TokenResolver();
    this.componentFactory = new ComponentFactory(this.tokenResolver);
  }

  async createCompleteSystem(systemData: any): Promise<void> {
    try {
      // Load tokens
      this.tokenResolver.loadTokens(systemData);

      // Create main frame for the entire system
      const systemFrame = figma.createFrame();
      systemFrame.name = "H2WW Complete Design System";
      systemFrame.resize(4000, 3000);
      systemFrame.fills = [{
        type: 'SOLID',
        color: { r: 0.98, g: 0.98, b: 0.98 }
      }];
      systemFrame.layoutMode = "VERTICAL";
      systemFrame.itemSpacing = 100;
      systemFrame.paddingLeft = systemFrame.paddingRight = systemFrame.paddingTop = systemFrame.paddingBottom = 100;

      // Section 1: Visual Language
      const visualSection = figma.createFrame();
      visualSection.name = "Visual Language";
      visualSection.layoutMode = "HORIZONTAL";
      visualSection.itemSpacing = 50;
      visualSection.layoutAlign = "STRETCH";

      const colorPalette = await this.componentFactory.createColorPalette(systemData);
      visualSection.appendChild(colorPalette);

      const typography = await this.componentFactory.createTypographySystem(systemData);
      visualSection.appendChild(typography);

      systemFrame.appendChild(visualSection);

      // Section 2: UI Elements
      const elementsSection = figma.createFrame();
      elementsSection.name = "UI Elements";
      elementsSection.layoutMode = "HORIZONTAL";
      elementsSection.itemSpacing = 30;
      elementsSection.layoutAlign = "STRETCH";
      elementsSection.layoutWrap = "WRAP";

      // Create buttons
      const primaryBtn = await this.componentFactory.createButton({
        variant: 'primary',
        label: 'Primary Button'
      });
      elementsSection.appendChild(primaryBtn);

      const secondaryBtn = await this.componentFactory.createButton({
        variant: 'secondary',
        label: 'Secondary Button'
      });
      elementsSection.appendChild(secondaryBtn);

      // Create form fields
      const textField = await this.componentFactory.createFormField('text', {
        label: 'Text Input',
        placeholder: 'Enter text...',
        helper: 'This is helper text'
      });
      elementsSection.appendChild(textField);

      const emailField = await this.componentFactory.createFormField('email', {
        label: 'Email Input',
        placeholder: 'Enter email...'
      });
      elementsSection.appendChild(emailField);

      systemFrame.appendChild(elementsSection);

      // Section 3: Components
      const componentsSection = figma.createFrame();
      componentsSection.name = "UI Components";
      componentsSection.layoutMode = "HORIZONTAL";
      componentsSection.itemSpacing = 30;
      componentsSection.layoutAlign = "STRETCH";
      componentsSection.layoutWrap = "WRAP";

      const card = await this.componentFactory.createCard({
        title: 'Card Component',
        description: 'This is a card component with various content options'
      });
      componentsSection.appendChild(card);

      const modal = await this.componentFactory.createModal({
        title: 'Modal Dialog',
        content: 'This is the modal content. It can contain any information or form fields.',
        confirmLabel: 'Confirm'
      });
      componentsSection.appendChild(modal);

      systemFrame.appendChild(componentsSection);

      // Section 4: Patterns
      const patternsSection = figma.createFrame();
      patternsSection.name = "UI Patterns";
      patternsSection.layoutMode = "HORIZONTAL";
      patternsSection.itemSpacing = 50;
      patternsSection.layoutAlign = "STRETCH";

      const loginForm = await this.componentFactory.createAuthenticationForm({
        type: 'login'
      });
      patternsSection.appendChild(loginForm);

      const registerForm = await this.componentFactory.createAuthenticationForm({
        type: 'register'
      });
      patternsSection.appendChild(registerForm);

      systemFrame.appendChild(patternsSection);

      // Section 5: Page Templates
      const templatesSection = figma.createFrame();
      templatesSection.name = "Page Templates";
      templatesSection.layoutMode = "VERTICAL";
      templatesSection.itemSpacing = 50;
      templatesSection.layoutAlign = "STRETCH";

      const dashboard = await this.componentFactory.createDashboard({});
      templatesSection.appendChild(dashboard);

      systemFrame.appendChild(templatesSection);

      // Add to page
      figma.currentPage.appendChild(systemFrame);

      // Center in viewport
      figma.viewport.scrollAndZoomIntoView([systemFrame]);

      // Success notification
      figma.notify('✅ H2WW Complete Design System created successfully!', { timeout: 3000 });

    } catch (error) {
      console.error('Error creating design system:', error);
      figma.notify('❌ Error creating design system', { timeout: 3000 });
    }
  }
}

// Handle messages from UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-complete-system') {
    const creator = new H2WWDesignSystemCreator();
    await creator.createCompleteSystem(msg.systemData);
  } else if (msg.type === 'create-component') {
    const tokenResolver = new TokenResolver();
    tokenResolver.loadTokens(msg.tokens || {});
    const factory = new ComponentFactory(tokenResolver);

    let component;
    switch (msg.componentType) {
      case 'button':
        component = await factory.createButton(msg.spec);
        break;
      case 'card':
        component = await factory.createCard(msg.spec);
        break;
      case 'modal':
        component = await factory.createModal(msg.spec);
        break;
      case 'navigation':
        component = await factory.createNavigation(msg.spec);
        break;
      case 'form-field':
        component = await factory.createFormField(msg.fieldType, msg.spec);
        break;
      case 'auth-form':
        component = await factory.createAuthenticationForm(msg.spec);
        break;
      case 'dashboard':
        component = await factory.createDashboard(msg.spec);
        break;
      default:
        figma.notify('Unknown component type', { timeout: 2000 });
        return;
    }

    if (component) {
      figma.currentPage.appendChild(component);
      figma.viewport.scrollAndZoomIntoView([component]);
      figma.notify(`✅ ${msg.componentType} created!`, { timeout: 2000 });
    }
  } else if (msg.type === 'close') {
    figma.closePlugin();
  }
};

// Initialize plugin
figma.notify('🎨 H2WW Complete Design System ready!', { timeout: 2000 });