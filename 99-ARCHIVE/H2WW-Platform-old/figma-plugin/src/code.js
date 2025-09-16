"use strict";
// H2WW Component Library - Real Interface Components
// Individual components from H2WW admin interface
figma.showUI(__html__, {
    width: 400,
    height: 600,
    title: "H2WW Component Library"
});
// H2WW Design Tokens from Admin Interface
var H2WW_DESIGN_TOKENS = {
    colors: {
        white: { r: 1, g: 1, b: 1 },
        gray50: { r: 0.98, g: 0.98, b: 0.98 },
        gray100: { r: 0.95, g: 0.96, b: 0.97 },
        gray200: { r: 0.90, g: 0.91, b: 0.92 },
        gray300: { r: 0.82, g: 0.84, b: 0.85 },
        gray400: { r: 0.61, g: 0.64, b: 0.67 },
        gray500: { r: 0.42, g: 0.45, b: 0.49 },
        gray600: { r: 0.37, g: 0.41, b: 0.45 },
        gray700: { r: 0.24, g: 0.28, b: 0.32 },
        gray800: { r: 0.16, g: 0.19, b: 0.22 },
        gray900: { r: 0.06, g: 0.09, b: 0.12 },
        blue500: { r: 0.23, g: 0.51, b: 0.96 },
        blue600: { r: 0.15, g: 0.42, b: 0.88 }
    },
    typography: {
        fontFamily: "Inter",
        sizes: {
            xs: 10,
            sm: 12,
            base: 13,
            lg: 14,
            xl: 16,
            "2xl": 18,
            "3xl": 20,
            "4xl": 24
        }
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        "2xl": 24
    },
    borderRadius: {
        sm: 6,
        md: 8,
        lg: 12
    }
};
// Component Factory Functions
var H2WWComponentFactory = /** @class */ (function () {
    function H2WWComponentFactory() {
    }
    // Navigation Components
    H2WWComponentFactory.prototype.createSidebarNav = function () {
        var sidebar = figma.createFrame();
        sidebar.name = "Sidebar Navigation";
        sidebar.resize(256, 600);
        sidebar.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.white }];
        sidebar.cornerRadius = 0;
        sidebar.strokeAlign = "INSIDE";
        sidebar.strokes = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray200 }];
        sidebar.strokeWeight = 1;
        // Add brand header
        var brandHeader = this.createBrandHeader();
        brandHeader.x = 0;
        brandHeader.y = 0;
        sidebar.appendChild(brandHeader);
        return sidebar;
    };
    H2WWComponentFactory.prototype.createNavLink = function () {
        var navLink = figma.createFrame();
        navLink.name = "Navigation Link";
        navLink.resize(208, 48);
        navLink.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.white }];
        navLink.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.md;
        // Icon placeholder
        var icon = figma.createFrame();
        icon.name = "Icon";
        icon.resize(20, 20);
        icon.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray500 }];
        icon.cornerRadius = 2;
        icon.x = 12;
        icon.y = 14;
        navLink.appendChild(icon);
        // Text
        var text = figma.createText();
        text.characters = "Navigation Item";
        text.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.sm;
        text.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray600 }];
        text.x = 44;
        text.y = 16;
        navLink.appendChild(text);
        return navLink;
    };
    H2WWComponentFactory.prototype.createBrandHeader = function () {
        var header = figma.createFrame();
        header.name = "Brand Header";
        header.resize(256, 64);
        header.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.white }];
        header.strokeAlign = "INSIDE";
        header.strokes = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray100 }];
        header.strokeWeight = 1;
        // Logo placeholder
        var logo = figma.createFrame();
        logo.name = "Logo";
        logo.resize(40, 40);
        logo.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray900 }];
        logo.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.lg;
        logo.x = 24;
        logo.y = 12;
        header.appendChild(logo);
        // App name
        var appName = figma.createText();
        appName.characters = "HowToWorkWith.AI";
        appName.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.lg;
        appName.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray900 }];
        appName.x = 76;
        appName.y = 16;
        header.appendChild(appName);
        // Subtitle
        var subtitle = figma.createText();
        subtitle.characters = "E-Learning Platform";
        subtitle.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.xs;
        subtitle.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray500 }];
        subtitle.x = 76;
        subtitle.y = 36;
        header.appendChild(subtitle);
        return header;
    };
    H2WWComponentFactory.prototype.createTabNavigation = function () {
        var tabNav = figma.createFrame();
        tabNav.name = "Tab Navigation";
        tabNav.resize(600, 40);
        tabNav.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray100 }];
        tabNav.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.md;
        var tabs = ["Companies", "Global Courses", "Prompt Library", "User Management", "System & Analytics"];
        var tabWidth = 600 / tabs.length;
        tabs.forEach(function (tabText, index) {
            var tab = figma.createFrame();
            tab.name = "Tab ".concat(tabText);
            tab.resize(tabWidth, 32);
            tab.fills = index === 0 ?
                [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.white }] :
                [];
            tab.cornerRadius = 6;
            tab.x = index * tabWidth + 4;
            tab.y = 4;
            var text = figma.createText();
            text.characters = tabText;
            text.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.sm;
            text.fills = index === 0 ?
                [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray900 }] :
                [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray600 }];
            text.textAlignHorizontal = "CENTER";
            text.x = 12;
            text.y = 8;
            tab.appendChild(text);
            tabNav.appendChild(tab);
        });
        return tabNav;
    };
    // Header Components
    H2WWComponentFactory.prototype.createTopHeader = function () {
        var header = figma.createFrame();
        header.name = "Top Header Bar";
        header.resize(800, 64);
        header.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.white, opacity: 0.95 }];
        header.strokeAlign = "INSIDE";
        header.strokes = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray200 }];
        header.strokeWeight = 1;
        return header;
    };
    H2WWComponentFactory.prototype.createSearchField = function () {
        var searchField = figma.createFrame();
        searchField.name = "Search Input";
        searchField.resize(320, 40);
        searchField.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray100 }];
        searchField.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.md;
        searchField.strokes = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray300 }];
        searchField.strokeWeight = 1;
        // Search icon
        var icon = figma.createFrame();
        icon.name = "Search Icon";
        icon.resize(16, 16);
        icon.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray400 }];
        icon.x = 12;
        icon.y = 12;
        searchField.appendChild(icon);
        // Placeholder text
        var placeholder = figma.createText();
        placeholder.characters = "Search courses, lessons...";
        placeholder.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.sm;
        placeholder.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray500 }];
        placeholder.x = 36;
        placeholder.y = 12;
        searchField.appendChild(placeholder);
        return searchField;
    };
    H2WWComponentFactory.prototype.createPageHeader = function () {
        var header = figma.createFrame();
        header.name = "Page Header";
        header.resize(600, 80);
        header.fills = [];
        // Title
        var title = figma.createText();
        title.characters = "Platform Admin";
        title.fontSize = H2WW_DESIGN_TOKENS.typography.sizes["4xl"];
        title.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray900 }];
        title.y = 0;
        header.appendChild(title);
        // Description
        var desc = figma.createText();
        desc.characters = "Comprehensive platform management and analytics center";
        desc.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.base;
        desc.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray600 }];
        desc.y = 40;
        header.appendChild(desc);
        return header;
    };
    H2WWComponentFactory.prototype.createUserDropdown = function () {
        var dropdown = figma.createFrame();
        dropdown.name = "User Profile Dropdown";
        dropdown.resize(200, 40);
        dropdown.fills = [];
        // Avatar
        var avatar = figma.createFrame();
        avatar.name = "Avatar";
        avatar.resize(32, 32);
        avatar.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.blue500 }];
        avatar.cornerRadius = 16;
        avatar.x = 0;
        avatar.y = 4;
        // Avatar text
        var avatarText = figma.createText();
        avatarText.characters = "S";
        avatarText.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.sm;
        avatarText.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.white }];
        avatarText.textAlignHorizontal = "CENTER";
        avatarText.x = 12;
        avatarText.y = 8;
        avatar.appendChild(avatarText);
        dropdown.appendChild(avatar);
        // Name
        var name = figma.createText();
        name.characters = "Super Administrator";
        name.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.sm;
        name.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray900 }];
        name.x = 44;
        name.y = 8;
        dropdown.appendChild(name);
        // Role
        var role = figma.createText();
        role.characters = "super_admin";
        role.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.xs;
        role.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray500 }];
        role.x = 44;
        role.y = 24;
        dropdown.appendChild(role);
        return dropdown;
    };
    // Card Components
    H2WWComponentFactory.prototype.createMetricCard = function () {
        var card = figma.createFrame();
        card.name = "Metric Card";
        card.resize(240, 120);
        card.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.white }];
        card.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.lg;
        card.strokes = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray200 }];
        card.strokeWeight = 1;
        card.effects = [{
                type: "DROP_SHADOW",
                color: { r: 0, g: 0, b: 0, a: 0.1 },
                offset: { x: 0, y: 2 },
                radius: 4,
                spread: 0,
                visible: true,
                blendMode: "NORMAL"
            }];
        // Icon
        var icon = figma.createFrame();
        icon.name = "Icon";
        icon.resize(48, 48);
        icon.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray100 }];
        icon.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.lg;
        icon.x = 180;
        icon.y = 20;
        card.appendChild(icon);
        // Label
        var label = figma.createText();
        label.characters = "Total Companies";
        label.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.sm;
        label.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray600 }];
        label.x = 24;
        label.y = 24;
        card.appendChild(label);
        // Number
        var number = figma.createText();
        number.characters = "1";
        number.fontSize = 32;
        number.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray900 }];
        number.x = 24;
        number.y = 48;
        card.appendChild(number);
        // Description
        var desc = figma.createText();
        desc.characters = "Platform wide";
        desc.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.xs;
        desc.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray500 }];
        desc.x = 24;
        desc.y = 88;
        card.appendChild(desc);
        return card;
    };
    H2WWComponentFactory.prototype.createActionCard = function () {
        var card = figma.createFrame();
        card.name = "Action Card";
        card.resize(280, 200);
        card.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.white }];
        card.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.lg;
        card.strokes = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray200 }];
        card.strokeWeight = 1;
        card.effects = [{
                type: "DROP_SHADOW",
                color: { r: 0, g: 0, b: 0, a: 0.1 },
                offset: { x: 0, y: 2 },
                radius: 8,
                spread: 0,
                visible: true,
                blendMode: "NORMAL"
            }];
        // Icon
        var icon = figma.createFrame();
        icon.name = "Icon";
        icon.resize(48, 48);
        icon.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray600 }];
        icon.cornerRadius = 6;
        icon.x = 116;
        icon.y = 32;
        card.appendChild(icon);
        // Title
        var title = figma.createText();
        title.characters = "Create Company";
        title.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.lg;
        title.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray900 }];
        title.textAlignHorizontal = "CENTER";
        title.x = 24;
        title.y = 96;
        card.appendChild(title);
        // Description
        var desc = figma.createText();
        desc.characters = "Set up a new company account with admin user";
        desc.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.sm;
        desc.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray600 }];
        desc.textAlignHorizontal = "CENTER";
        desc.x = 24;
        desc.y = 120;
        card.appendChild(desc);
        // Button
        var button = this.createSecondaryButton();
        button.x = 24;
        button.y = 152;
        card.appendChild(button);
        return card;
    };
    H2WWComponentFactory.prototype.createCreateCard = function () {
        var card = figma.createFrame();
        card.name = "Create Card";
        card.resize(280, 200);
        card.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.white }];
        card.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.lg;
        card.strokes = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray300 }];
        card.strokeWeight = 2;
        card.dashPattern = [5, 5];
        // Plus icon
        var icon = figma.createFrame();
        icon.name = "Plus Icon";
        icon.resize(48, 48);
        icon.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray400 }];
        icon.cornerRadius = 6;
        icon.x = 116;
        icon.y = 32;
        card.appendChild(icon);
        // Title
        var title = figma.createText();
        title.characters = "Create Company";
        title.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.lg;
        title.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray900 }];
        title.textAlignHorizontal = "CENTER";
        title.x = 24;
        title.y = 96;
        card.appendChild(title);
        return card;
    };
    H2WWComponentFactory.prototype.createActivityCard = function () {
        var _this = this;
        var card = figma.createFrame();
        card.name = "Activity Feed Card";
        card.resize(400, 300);
        card.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.white }];
        card.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.lg;
        card.strokes = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray200 }];
        card.strokeWeight = 1;
        // Header
        var header = figma.createText();
        header.characters = "Recent Company Activity";
        header.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.xl;
        header.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray900 }];
        header.x = 24;
        header.y = 24;
        card.appendChild(header);
        // Activity items
        var activities = [
            "Test User joined company",
            "John Heitinga joined company"
        ];
        activities.forEach(function (activity, index) {
            var item = _this.createActivityItem();
            item.x = 24;
            item.y = 80 + (index * 60);
            card.appendChild(item);
        });
        return card;
    };
    // Button Components
    H2WWComponentFactory.prototype.createPrimaryButton = function () {
        var button = figma.createFrame();
        button.name = "Primary Button";
        button.resize(140, 40);
        button.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray900 }];
        button.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.lg;
        var text = figma.createText();
        text.characters = "Primary Action";
        text.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.sm;
        text.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.white }];
        text.textAlignHorizontal = "CENTER";
        text.x = 20;
        text.y = 12;
        button.appendChild(text);
        return button;
    };
    H2WWComponentFactory.prototype.createSecondaryButton = function () {
        var button = figma.createFrame();
        button.name = "Secondary Button";
        button.resize(232, 40);
        button.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.white }];
        button.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.lg;
        button.strokes = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray300 }];
        button.strokeWeight = 1;
        var text = figma.createText();
        text.characters = "Create New";
        text.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.sm;
        text.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray900 }];
        text.textAlignHorizontal = "CENTER";
        text.x = 20;
        text.y = 12;
        button.appendChild(text);
        return button;
    };
    H2WWComponentFactory.prototype.createIconButton = function () {
        var button = figma.createFrame();
        button.name = "Icon Button";
        button.resize(40, 40);
        button.fills = [];
        button.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.lg;
        // Icon placeholder
        var icon = figma.createFrame();
        icon.name = "Icon";
        icon.resize(20, 20);
        icon.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray600 }];
        icon.cornerRadius = 2;
        icon.x = 10;
        icon.y = 10;
        button.appendChild(icon);
        return button;
    };
    H2WWComponentFactory.prototype.createNotificationButton = function () {
        var button = figma.createFrame();
        button.name = "Notification Button";
        button.resize(40, 40);
        button.fills = [];
        button.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.lg;
        // Bell icon placeholder
        var icon = figma.createFrame();
        icon.name = "Bell Icon";
        icon.resize(20, 20);
        icon.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray600 }];
        icon.cornerRadius = 2;
        icon.x = 10;
        icon.y = 10;
        button.appendChild(icon);
        // Badge
        var badge = figma.createFrame();
        badge.name = "Badge";
        badge.resize(8, 8);
        badge.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray600 }];
        badge.cornerRadius = 4;
        badge.x = 28;
        badge.y = 8;
        button.appendChild(badge);
        return button;
    };
    // Form Components
    H2WWComponentFactory.prototype.createTextInput = function () {
        var input = figma.createFrame();
        input.name = "Text Input";
        input.resize(280, 40);
        input.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.white }];
        input.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.md;
        input.strokes = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray300 }];
        input.strokeWeight = 1;
        var placeholder = figma.createText();
        placeholder.characters = "Enter text...";
        placeholder.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.sm;
        placeholder.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray500 }];
        placeholder.x = 12;
        placeholder.y = 12;
        input.appendChild(placeholder);
        return input;
    };
    H2WWComponentFactory.prototype.createSearchInput = function () {
        return this.createSearchField(); // Reuse the search field component
    };
    // Content Components
    H2WWComponentFactory.prototype.createActivityItem = function () {
        var item = figma.createFrame();
        item.name = "Activity Item";
        item.resize(320, 48);
        item.fills = [];
        // Icon
        var icon = figma.createFrame();
        icon.name = "Activity Icon";
        icon.resize(20, 20);
        icon.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray500 }];
        icon.cornerRadius = 2;
        icon.x = 0;
        icon.y = 14;
        item.appendChild(icon);
        // Text
        var text = figma.createText();
        text.characters = "Test User joined company";
        text.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.sm;
        text.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray900 }];
        text.x = 32;
        text.y = 8;
        item.appendChild(text);
        // Timestamp
        var timestamp = figma.createText();
        timestamp.characters = "Sep 15, 11:11 AM";
        timestamp.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.xs;
        timestamp.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray500 }];
        timestamp.x = 32;
        timestamp.y = 28;
        item.appendChild(timestamp);
        return item;
    };
    H2WWComponentFactory.prototype.createHelpSection = function () {
        var help = figma.createFrame();
        help.name = "Help Section";
        help.resize(208, 160);
        help.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray100 }];
        help.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.lg;
        help.strokes = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray200 }];
        help.strokeWeight = 1;
        // Icon
        var icon = figma.createFrame();
        icon.name = "Help Icon";
        icon.resize(24, 24);
        icon.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray500 }];
        icon.cornerRadius = 12;
        icon.x = 16;
        icon.y = 16;
        help.appendChild(icon);
        // Title
        var title = figma.createText();
        title.characters = "Need Help?";
        title.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.lg;
        title.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray900 }];
        title.x = 16;
        title.y = 48;
        help.appendChild(title);
        // Description
        var desc = figma.createText();
        desc.characters = "Check our documentation or contact support";
        desc.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.xs;
        desc.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray600 }];
        desc.x = 16;
        desc.y = 76;
        help.appendChild(desc);
        // Button
        var button = figma.createFrame();
        button.name = "Get Help Button";
        button.resize(176, 32);
        button.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray100 }];
        button.cornerRadius = H2WW_DESIGN_TOKENS.borderRadius.lg;
        button.x = 16;
        button.y = 112;
        var buttonText = figma.createText();
        buttonText.characters = "Get Help";
        buttonText.fontSize = H2WW_DESIGN_TOKENS.typography.sizes.xs;
        buttonText.fills = [{ type: 'SOLID', color: H2WW_DESIGN_TOKENS.colors.gray900 }];
        buttonText.textAlignHorizontal = "CENTER";
        buttonText.x = 20;
        buttonText.y = 8;
        button.appendChild(buttonText);
        help.appendChild(button);
        return help;
    };
    return H2WWComponentFactory;
}());
// Message handler
figma.ui.onmessage = function (msg) {
    if (msg.type === 'insert-component') {
        var factory = new H2WWComponentFactory();
        var component = void 0;
        switch (msg.componentType) {
            case 'sidebar-nav':
                component = factory.createSidebarNav();
                break;
            case 'nav-link':
                component = factory.createNavLink();
                break;
            case 'brand-header':
                component = factory.createBrandHeader();
                break;
            case 'tab-navigation':
                component = factory.createTabNavigation();
                break;
            case 'top-header':
                component = factory.createTopHeader();
                break;
            case 'search-field':
                component = factory.createSearchField();
                break;
            case 'page-header':
                component = factory.createPageHeader();
                break;
            case 'user-dropdown':
                component = factory.createUserDropdown();
                break;
            case 'metric-card':
                component = factory.createMetricCard();
                break;
            case 'action-card':
                component = factory.createActionCard();
                break;
            case 'create-card':
                component = factory.createCreateCard();
                break;
            case 'activity-card':
                component = factory.createActivityCard();
                break;
            case 'primary-button':
                component = factory.createPrimaryButton();
                break;
            case 'secondary-button':
                component = factory.createSecondaryButton();
                break;
            case 'icon-button':
                component = factory.createIconButton();
                break;
            case 'notification-button':
                component = factory.createNotificationButton();
                break;
            case 'text-input':
                component = factory.createTextInput();
                break;
            case 'search-input':
                component = factory.createSearchInput();
                break;
            case 'activity-item':
                component = factory.createActivityItem();
                break;
            case 'help-section':
                component = factory.createHelpSection();
                break;
            default:
                return; // Unknown component type
        }
        // Position component at center of viewport
        var viewport = figma.viewport.center;
        component.x = viewport.x - component.width / 2;
        component.y = viewport.y - component.height / 2;
        // Add to current page
        figma.currentPage.appendChild(component);
        // Select the new component
        figma.currentPage.selection = [component];
        // Zoom to fit
        figma.viewport.scrollAndZoomIntoView([component]);
    }
};
// Load fonts
figma.loadFontAsync({ family: "Inter", style: "Regular" }).then(function () {
    // Font loaded, ready to create text
}).catch(function () {
    console.log("Inter font not available, using default");
});
