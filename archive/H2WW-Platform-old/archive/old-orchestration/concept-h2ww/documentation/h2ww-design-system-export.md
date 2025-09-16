# 🎨 H2WW Design System - Complete Export

## 📋 Design System Overview

**Project**: H2WW (HowToWorkWith)  
**Type**: AI Learning Platform Design System  
**Basis**: Bauhaus principes + Johannes Itten's kleurenleer  
**Status**: Complete Design System  

---

## 🎯 Brand Foundation

### **Brand Identity**
- **Name**: H2WW (HowToWorkWith)
- **Tagline**: "Wij maken AI begrijpelijk, toepasbaar en menselijk"
- **Mission**: Architectuur van vertrouwen voor AI samenwerking
- **Vision**: All-in-one AI learning platform voor gebruikers en bedrijven

### **Brand Values**
- **Vertrouwen**: AI als betrouwbare partner
- **Toegankelijkheid**: AI begrijpelijk maken voor iedereen
- **Innovatie**: Vooruitstrevend maar praktisch
- **Menselijkheid**: AI versterkt menselijke capaciteiten
- **Transparantie**: Open en eerlijke communicatie

---

## 🎨 Visual Language System

### **1. Color System (Itten's Kleurenleer)**

#### **Primary Colors**
```css
/* H2WW Primary Colors */
--h2ww-red: #E53E3E;        /* AI Fundamentals */
--h2ww-yellow: #F6E05E;     /* Learning & Discovery */
--h2ww-blue: #3182CE;       /* Trust & Reliability */
```

#### **Secondary Colors**
```css
/* H2WW Secondary Colors */
--h2ww-orange: #DD6B20;     /* Creative Applications */
--h2ww-green: #38A169;      /* Safe Practices */
--h2ww-purple: #805AD5;     /* Advanced Techniques */
```

#### **Neutral Colors**
```css
/* H2WW Neutral Colors */
--h2ww-black: #1A202C;      /* Headers & Primary Text */
--h2ww-gray: #4A5568;       /* Secondary Text */
--h2ww-light-gray: #E2E8F0; /* Backgrounds */
--h2ww-white: #FFFFFF;      /* Clean Backgrounds */
```

#### **Semantic Colors**
```css
/* H2WW Semantic Colors */
--h2ww-success: #38A169;    /* Success States */
--h2ww-warning: #F6E05E;    /* Warning States */
--h2ww-error: #E53E3E;      /* Error States */
--h2ww-info: #3182CE;       /* Info States */
```

### **2. Typography System**

#### **Font Families**
```css
/* H2WW Typography */
--font-primary: 'Inter', sans-serif;
--font-secondary: 'Source Sans Pro', sans-serif;
```

#### **Typography Scale**
```css
/* H2WW Typography Scale */
--text-h1: 48px / 3rem / Inter Bold / 1.2 line-height;
--text-h2: 36px / 2.25rem / Inter SemiBold / 1.3 line-height;
--text-h3: 24px / 1.5rem / Inter Medium / 1.4 line-height;
--text-h4: 20px / 1.25rem / Inter Medium / 1.4 line-height;
--text-body: 16px / 1rem / Inter Regular / 1.5 line-height;
--text-small: 14px / 0.875rem / Inter Regular / 1.5 line-height;
--text-caption: 12px / 0.75rem / Inter Regular / 1.4 line-height;
```

### **3. Spacing System (8px Grid)**
```css
/* H2WW Spacing System */
--space-xs: 4px / 0.25rem;
--space-sm: 8px / 0.5rem;
--space-md: 16px / 1rem;
--space-lg: 24px / 1.5rem;
--space-xl: 32px / 2rem;
--space-2xl: 48px / 3rem;
--space-3xl: 64px / 4rem;
```

### **4. Border Radius**
```css
/* H2WW Border Radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 50%;
```

### **5. Shadows & Elevation**
```css
/* H2WW Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
```

---

## 🧩 Component Library

### **1. Buttons**

#### **Primary Button**
```css
.h2ww-btn-primary {
  background: var(--h2ww-blue);
  color: var(--h2ww-white);
  border: none;
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-size: var(--text-body);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.h2ww-btn-primary:hover {
  background: #2c6bb8;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

#### **Secondary Button**
```css
.h2ww-btn-secondary {
  background: transparent;
  color: var(--h2ww-blue);
  border: 2px solid var(--h2ww-blue);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-size: var(--text-body);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.h2ww-btn-secondary:hover {
  background: var(--h2ww-blue);
  color: var(--h2ww-white);
}
```

#### **Ghost Button**
```css
.h2ww-btn-ghost {
  background: transparent;
  color: var(--h2ww-gray);
  border: none;
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-size: var(--text-body);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.h2ww-btn-ghost:hover {
  background: var(--h2ww-light-gray);
}
```

### **2. Form Elements**

#### **Text Input**
```css
.h2ww-input {
  background: var(--h2ww-white);
  border: 2px solid var(--h2ww-light-gray);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-primary);
  font-size: var(--text-body);
  transition: all 0.2s ease;
}

.h2ww-input:focus {
  border-color: var(--h2ww-blue);
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  outline: none;
}

.h2ww-input.error {
  border-color: var(--h2ww-error);
}
```

#### **Textarea**
```css
.h2ww-textarea {
  background: var(--h2ww-white);
  border: 2px solid var(--h2ww-light-gray);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-primary);
  font-size: var(--text-body);
  min-height: 120px;
  resize: vertical;
  transition: all 0.2s ease;
}

.h2ww-textarea:focus {
  border-color: var(--h2ww-blue);
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  outline: none;
}
```

### **3. Cards**

#### **Content Card**
```css
.h2ww-card {
  background: var(--h2ww-white);
  border: 1px solid var(--h2ww-light-gray);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.h2ww-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

#### **Feature Card**
```css
.h2ww-feature-card {
  background: var(--h2ww-white);
  border: 2px solid var(--h2ww-light-gray);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease;
}

.h2ww-feature-card:hover {
  border-color: var(--h2ww-blue);
  box-shadow: var(--shadow-lg);
}
```

### **4. Navigation Elements**

#### **Main Navigation**
```css
.h2ww-nav {
  background: var(--h2ww-white);
  border-bottom: 1px solid var(--h2ww-light-gray);
  padding: var(--space-md) var(--space-lg);
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.h2ww-nav-item {
  color: var(--h2ww-gray);
  text-decoration: none;
  font-family: var(--font-primary);
  font-size: var(--text-body);
  font-weight: 500;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.h2ww-nav-item:hover {
  color: var(--h2ww-blue);
  background: rgba(49, 130, 206, 0.1);
}
```

---

## 🎯 AI-Specific Components

### **1. AI Companion Wizard**

#### **Wizard Chat Interface**
```css
.h2ww-wizard-chat {
  background: var(--h2ww-white);
  border: 1px solid var(--h2ww-light-gray);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  max-width: 600px;
  margin: 0 auto;
}

.h2ww-wizard-message {
  background: var(--h2ww-blue);
  color: var(--h2ww-white);
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-md);
  max-width: 80%;
}

.h2ww-user-message {
  background: var(--h2ww-light-gray);
  color: var(--h2ww-black);
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-md);
  margin-left: 20%;
  max-width: 80%;
}
```

#### **Wizard Progress Indicator**
```css
.h2ww-wizard-progress {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-lg);
}

.h2ww-progress-step {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--h2ww-light-gray);
  color: var(--h2ww-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin: 0 var(--space-sm);
  transition: all 0.2s ease;
}

.h2ww-progress-step.active {
  background: var(--h2ww-blue);
  color: var(--h2ww-white);
}

.h2ww-progress-step.completed {
  background: var(--h2ww-green);
  color: var(--h2ww-white);
}
```

### **2. Learning Path Components**

#### **Learning Path Card**
```css
.h2ww-learning-card {
  background: var(--h2ww-white);
  border: 2px solid var(--h2ww-light-gray);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  position: relative;
  transition: all 0.2s ease;
}

.h2ww-learning-card:hover {
  border-color: var(--h2ww-blue);
  box-shadow: var(--shadow-lg);
}

.h2ww-learning-progress {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: conic-gradient(var(--h2ww-blue) 0deg, var(--h2ww-light-gray) 0deg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--h2ww-blue);
}
```

#### **Module Progress Bar**
```css
.h2ww-module-progress {
  background: var(--h2ww-light-gray);
  height: 8px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin: var(--space-md) 0;
}

.h2ww-module-progress-bar {
  background: var(--h2ww-blue);
  height: 100%;
  border-radius: var(--radius-sm);
  transition: width 0.3s ease;
}
```

### **3. Community Components**

#### **Community Post Card**
```css
.h2ww-community-post {
  background: var(--h2ww-white);
  border: 1px solid var(--h2ww-light-gray);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
}

.h2ww-post-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-md);
}

.h2ww-user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--h2ww-blue);
  color: var(--h2ww-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: var(--space-md);
}

.h2ww-post-actions {
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-md);
}

.h2ww-post-action {
  background: none;
  border: none;
  color: var(--h2ww-gray);
  font-family: var(--font-primary);
  font-size: var(--text-small);
  cursor: pointer;
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.h2ww-post-action:hover {
  background: var(--h2ww-light-gray);
  color: var(--h2ww-blue);
}
```

---

## 🎯 Geometric Elements (Bauhaus-Inspired)

### **1. Geometric Shapes**
```css
/* Circle - Continuity, Flow */
.h2ww-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--h2ww-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h2ww-white);
  font-weight: 600;
}

/* Square - Stability, Structure */
.h2ww-square {
  width: 60px;
  height: 60px;
  background: var(--h2ww-green);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h2ww-white);
  font-weight: 600;
}

/* Triangle - Progress, Growth */
.h2ww-triangle {
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 52px solid var(--h2ww-yellow);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h2ww-black);
  font-weight: 600;
}
```

### **2. Geometric Compositions**
```css
.h2ww-geometric-composition {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.h2ww-logo-composition {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.h2ww-logo-composition .h2ww-circle {
  width: 24px;
  height: 24px;
  background: var(--h2ww-blue);
}

.h2ww-logo-composition .h2ww-square {
  width: 24px;
  height: 24px;
  background: var(--h2ww-green);
}

.h2ww-logo-composition .h2ww-triangle {
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 21px solid var(--h2ww-yellow);
}
```

---

## 📱 Responsive Design System

### **1. Breakpoints**
```css
/* H2WW Responsive Breakpoints */
@media (max-width: 768px) {
  /* Mobile styles */
  .h2ww-container {
    padding: var(--space-md);
  }
  
  .h2ww-nav {
    flex-direction: column;
    height: auto;
    padding: var(--space-md);
  }
  
  .h2ww-feature-card {
    padding: var(--space-lg);
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  /* Tablet styles */
  .h2ww-container {
    padding: var(--space-lg);
  }
}

@media (min-width: 1025px) {
  /* Desktop styles */
  .h2ww-container {
    padding: var(--space-xl);
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### **2. Grid System**
```css
.h2ww-grid {
  display: grid;
  gap: var(--space-lg);
}

.h2ww-grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.h2ww-grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.h2ww-grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
  .h2ww-grid-2,
  .h2ww-grid-3,
  .h2ww-grid-4 {
    grid-template-columns: 1fr;
  }
}
```

---

## 🎯 Utility Classes

### **1. Spacing Utilities**
```css
/* Margin utilities */
.h2ww-m-xs { margin: var(--space-xs); }
.h2ww-m-sm { margin: var(--space-sm); }
.h2ww-m-md { margin: var(--space-md); }
.h2ww-m-lg { margin: var(--space-lg); }
.h2ww-m-xl { margin: var(--space-xl); }

/* Padding utilities */
.h2ww-p-xs { padding: var(--space-xs); }
.h2ww-p-sm { padding: var(--space-sm); }
.h2ww-p-md { padding: var(--space-md); }
.h2ww-p-lg { padding: var(--space-lg); }
.h2ww-p-xl { padding: var(--space-xl); }
```

### **2. Color Utilities**
```css
/* Text color utilities */
.h2ww-text-red { color: var(--h2ww-red); }
.h2ww-text-yellow { color: var(--h2ww-yellow); }
.h2ww-text-blue { color: var(--h2ww-blue); }
.h2ww-text-green { color: var(--h2ww-green); }
.h2ww-text-purple { color: var(--h2ww-purple); }

/* Background color utilities */
.h2ww-bg-red { background-color: var(--h2ww-red); }
.h2ww-bg-yellow { background-color: var(--h2ww-yellow); }
.h2ww-bg-blue { background-color: var(--h2ww-blue); }
.h2ww-bg-green { background-color: var(--h2ww-green); }
.h2ww-bg-purple { background-color: var(--h2ww-purple); }
```

### **3. Typography Utilities**
```css
/* Font weight utilities */
.h2ww-font-light { font-weight: 300; }
.h2ww-font-regular { font-weight: 400; }
.h2ww-font-medium { font-weight: 500; }
.h2ww-font-semibold { font-weight: 600; }
.h2ww-font-bold { font-weight: 700; }

/* Text size utilities */
.h2ww-text-xs { font-size: var(--text-caption); }
.h2ww-text-sm { font-size: var(--text-small); }
.h2ww-text-base { font-size: var(--text-body); }
.h2ww-text-lg { font-size: var(--text-h4); }
.h2ww-text-xl { font-size: var(--text-h3); }
.h2ww-text-2xl { font-size: var(--text-h2); }
.h2ww-text-3xl { font-size: var(--text-h1); }
```

---

## 🎯 Animation & Motion

### **1. Transitions**
```css
.h2ww-transition {
  transition: all 0.2s ease;
}

.h2ww-transition-slow {
  transition: all 0.4s ease;
}

.h2ww-transition-fast {
  transition: all 0.1s ease;
}
```

### **2. Hover Effects**
```css
.h2ww-hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.h2ww-hover-scale:hover {
  transform: scale(1.05);
}

.h2ww-hover-glow:hover {
  box-shadow: 0 0 20px rgba(49, 130, 206, 0.3);
}
```

---

## 🎯 Accessibility Features

### **1. Focus States**
```css
.h2ww-focus {
  outline: 2px solid var(--h2ww-blue);
  outline-offset: 2px;
}

.h2ww-focus-visible:focus-visible {
  outline: 2px solid var(--h2ww-blue);
  outline-offset: 2px;
}
```

### **2. Screen Reader Support**
```css
.h2ww-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## 🎯 Complete CSS File

Hier is de complete CSS file die je kunt gebruiken:

```css
/* H2WW Design System - Complete CSS */

/* CSS Custom Properties */
:root {
  /* Colors */
  --h2ww-red: #E53E3E;
  --h2ww-yellow: #F6E05E;
  --h2ww-blue: #3182CE;
  --h2ww-orange: #DD6B20;
  --h2ww-green: #38A169;
  --h2ww-purple: #805AD5;
  --h2ww-black: #1A202C;
  --h2ww-gray: #4A5568;
  --h2ww-light-gray: #E2E8F0;
  --h2ww-white: #FFFFFF;
  
  /* Typography */
  --font-primary: 'Inter', sans-serif;
  --font-secondary: 'Source Sans Pro', sans-serif;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 50%;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
}

/* Reset and Base Styles */
* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-primary);
  font-size: 16px;
  line-height: 1.5;
  color: var(--h2ww-black);
  background-color: var(--h2ww-white);
  margin: 0;
  padding: 0;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-primary);
  font-weight: 600;
  line-height: 1.2;
  margin: 0 0 var(--space-md) 0;
}

h1 { font-size: 48px; }
h2 { font-size: 36px; }
h3 { font-size: 24px; }
h4 { font-size: 20px; }
h5 { font-size: 18px; }
h6 { font-size: 16px; }

p {
  margin: 0 0 var(--space-md) 0;
}

/* Buttons */
.h2ww-btn-primary {
  background: var(--h2ww-blue);
  color: var(--h2ww-white);
  border: none;
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.h2ww-btn-primary:hover {
  background: #2c6bb8;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.h2ww-btn-secondary {
  background: transparent;
  color: var(--h2ww-blue);
  border: 2px solid var(--h2ww-blue);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.h2ww-btn-secondary:hover {
  background: var(--h2ww-blue);
  color: var(--h2ww-white);
}

/* Form Elements */
.h2ww-input {
  background: var(--h2ww-white);
  border: 2px solid var(--h2ww-light-gray);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-primary);
  font-size: 16px;
  transition: all 0.2s ease;
}

.h2ww-input:focus {
  border-color: var(--h2ww-blue);
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  outline: none;
}

/* Cards */
.h2ww-card {
  background: var(--h2ww-white);
  border: 1px solid var(--h2ww-light-gray);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.h2ww-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Navigation */
.h2ww-nav {
  background: var(--h2ww-white);
  border-bottom: 1px solid var(--h2ww-light-gray);
  padding: var(--space-md) var(--space-lg);
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.h2ww-nav-item {
  color: var(--h2ww-gray);
  text-decoration: none;
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 500;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.h2ww-nav-item:hover {
  color: var(--h2ww-blue);
  background: rgba(49, 130, 206, 0.1);
}

/* Geometric Elements */
.h2ww-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--h2ww-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h2ww-white);
  font-weight: 600;
}

.h2ww-square {
  width: 60px;
  height: 60px;
  background: var(--h2ww-green);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h2ww-white);
  font-weight: 600;
}

.h2ww-triangle {
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 52px solid var(--h2ww-yellow);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h2ww-black);
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .h2ww-container {
    padding: var(--space-md);
  }
  
  .h2ww-nav {
    flex-direction: column;
    height: auto;
    padding: var(--space-md);
  }
  
  h1 { font-size: 36px; }
  h2 { font-size: 28px; }
  h3 { font-size: 20px; }
}

/* Utility Classes */
.h2ww-text-center { text-align: center; }
.h2ww-text-left { text-align: left; }
.h2ww-text-right { text-align: right; }

.h2ww-flex { display: flex; }
.h2ww-flex-col { flex-direction: column; }
.h2ww-items-center { align-items: center; }
.h2ww-justify-center { justify-content: center; }
.h2ww-justify-between { justify-content: space-between; }

.h2ww-hidden { display: none; }
.h2ww-block { display: block; }
.h2ww-inline-block { display: inline-block; }

/* Focus States */
.h2ww-focus-visible:focus-visible {
  outline: 2px solid var(--h2ww-blue);
  outline-offset: 2px;
}
```

---

## 🎯 JavaScript Components (Optional)

### **1. Interactive Elements**
```javascript
// H2WW Interactive Components
class H2WWComponents {
  constructor() {
    this.init();
  }
  
  init() {
    this.initButtons();
    this.initForms();
    this.initNavigation();
  }
  
  initButtons() {
    const buttons = document.querySelectorAll('.h2ww-btn-primary, .h2ww-btn-secondary');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.handleButtonClick(e);
      });
    });
  }
  
  initForms() {
    const inputs = document.querySelectorAll('.h2ww-input');
    inputs.forEach(input => {
      input.addEventListener('focus', (e) => {
        this.handleInputFocus(e);
      });
      
      input.addEventListener('blur', (e) => {
        this.handleInputBlur(e);
      });
    });
  }
  
  initNavigation() {
    const navItems = document.querySelectorAll('.h2ww-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        this.handleNavigation(e);
      });
    });
  }
  
  handleButtonClick(e) {
    const button = e.target;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  }
  
  handleInputFocus(e) {
    const input = e.target;
    input.parentElement.classList.add('h2ww-focused');
  }
  
  handleInputBlur(e) {
    const input = e.target;
    input.parentElement.classList.remove('h2ww-focused');
  }
  
  handleNavigation(e) {
    const item = e.target;
    // Add navigation logic here
    console.log('Navigation clicked:', item.textContent);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new H2WWComponents();
});
```

---

## 🎯 Usage Instructions

### **1. HTML Structure**
```html
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>H2WW Platform</title>
    <link rel="stylesheet" href="h2ww-design-system.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Sans+Pro:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Your H2WW content here -->
</body>
</html>
```

### **2. Component Usage**
```html
<!-- Button Examples -->
<button class="h2ww-btn-primary">Start Learning</button>
<button class="h2ww-btn-secondary">Learn More</button>

<!-- Card Example -->
<div class="h2ww-card">
    <h3>AI Fundamentals</h3>
    <p>Learn the basics of artificial intelligence</p>
    <button class="h2ww-btn-primary">Start Course</button>
</div>

<!-- Form Example -->
<form>
    <input type="email" class="h2ww-input" placeholder="Enter your email">
    <button type="submit" class="h2ww-btn-primary">Subscribe</button>
</form>

<!-- Geometric Elements -->
<div class="h2ww-geometric-composition">
    <div class="h2ww-circle">🔵</div>
    <div class="h2ww-square">⬜</div>
    <div class="h2ww-triangle">🔺</div>
</div>
```

---

**Dit is het complete H2WW Design System dat je direct in Claude Code kunt plakken en gebruiken!** 🎨✨

**Alle componenten zijn gebaseerd op Bauhaus principes en Itten's kleurenleer, specifiek ontworpen voor het H2WW AI learning platform.** 🚀
