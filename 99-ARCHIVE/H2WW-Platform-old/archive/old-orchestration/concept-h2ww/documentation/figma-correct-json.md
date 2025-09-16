# 🎨 Figma Correct JSON Structure

## 📋 Correcte JSON voor Figma Plugin

De fout "Invalid spec: missing type" betekent dat de JSON structuur niet correct is voor Figma. Hier is de juiste structuur:

```json
{
  "name": "H2WW Visual Language",
  "type": "design-system",
  "version": "1.0.0",
  "components": [
    {
      "name": "Color",
      "type": "color",
      "values": [
        {
          "name": "H2WW Red",
          "value": "#E53E3E",
          "type": "primary",
          "description": "AI Fundamentals"
        },
        {
          "name": "H2WW Yellow", 
          "value": "#F6E05E",
          "type": "primary",
          "description": "Learning & Discovery"
        },
        {
          "name": "H2WW Blue",
          "value": "#3182CE", 
          "type": "primary",
          "description": "Trust & Reliability"
        },
        {
          "name": "H2WW Orange",
          "value": "#DD6B20",
          "type": "secondary", 
          "description": "Creative Applications"
        },
        {
          "name": "H2WW Green",
          "value": "#38A169",
          "type": "secondary",
          "description": "Safe Practices"
        },
        {
          "name": "H2WW Purple",
          "value": "#805AD5",
          "type": "secondary",
          "description": "Advanced Techniques"
        }
      ]
    },
    {
      "name": "Typography",
      "type": "typography",
      "values": [
        {
          "name": "Inter",
          "type": "font-family",
          "value": "Inter, sans-serif",
          "description": "Primary font family"
        },
        {
          "name": "Source Sans Pro",
          "type": "font-family", 
          "value": "Source Sans Pro, sans-serif",
          "description": "Secondary font family"
        },
        {
          "name": "H1",
          "type": "text-style",
          "fontSize": 48,
          "fontWeight": 700,
          "lineHeight": 1.2,
          "fontFamily": "Inter"
        },
        {
          "name": "H2",
          "type": "text-style",
          "fontSize": 36,
          "fontWeight": 600,
          "lineHeight": 1.3,
          "fontFamily": "Inter"
        },
        {
          "name": "H3",
          "type": "text-style",
          "fontSize": 24,
          "fontWeight": 500,
          "lineHeight": 1.4,
          "fontFamily": "Inter"
        },
        {
          "name": "Body",
          "type": "text-style",
          "fontSize": 16,
          "fontWeight": 400,
          "lineHeight": 1.5,
          "fontFamily": "Inter"
        }
      ]
    },
    {
      "name": "Spacing",
      "type": "spacing",
      "values": [
        {
          "name": "xs",
          "value": 4,
          "type": "spacing"
        },
        {
          "name": "sm", 
          "value": 8,
          "type": "spacing"
        },
        {
          "name": "md",
          "value": 16,
          "type": "spacing"
        },
        {
          "name": "lg",
          "value": 24,
          "type": "spacing"
        },
        {
          "name": "xl",
          "value": 32,
          "type": "spacing"
        },
        {
          "name": "2xl",
          "value": 48,
          "type": "spacing"
        }
      ]
    },
    {
      "name": "Border Radius",
      "type": "border-radius",
      "values": [
        {
          "name": "sm",
          "value": 4,
          "type": "border-radius"
        },
        {
          "name": "md",
          "value": 8,
          "type": "border-radius"
        },
        {
          "name": "lg",
          "value": 12,
          "type": "border-radius"
        },
        {
          "name": "xl",
          "value": 16,
          "type": "border-radius"
        },
        {
          "name": "full",
          "value": 50,
          "type": "border-radius"
        }
      ]
    },
    {
      "name": "Shadows",
      "type": "shadow",
      "values": [
        {
          "name": "sm",
          "value": "0 1px 2px rgba(0, 0, 0, 0.05)",
          "type": "shadow"
        },
        {
          "name": "md",
          "value": "0 4px 6px rgba(0, 0, 0, 0.1)",
          "type": "shadow"
        },
        {
          "name": "lg",
          "value": "0 10px 15px rgba(0, 0, 0, 0.1)",
          "type": "shadow"
        },
        {
          "name": "xl",
          "value": "0 20px 25px rgba(0, 0, 0, 0.1)",
          "type": "shadow"
        }
      ]
    }
  ]
}
```

## 🎯 Alternatieve Simpele Structuur

Als de bovenstaande nog niet werkt, probeer deze simpelere structuur:

```json
{
  "colors": {
    "primary": {
      "red": "#E53E3E",
      "yellow": "#F6E05E", 
      "blue": "#3182CE"
    },
    "secondary": {
      "orange": "#DD6B20",
      "green": "#38A169",
      "purple": "#805AD5"
    },
    "neutral": {
      "black": "#1A202C",
      "gray": "#4A5568",
      "lightGray": "#E2E8F0",
      "white": "#FFFFFF"
    }
  },
  "typography": {
    "fontFamilies": {
      "primary": "Inter",
      "secondary": "Source Sans Pro"
    },
    "fontSizes": {
      "h1": 48,
      "h2": 36,
      "h3": 24,
      "h4": 20,
      "body": 16,
      "small": 14,
      "caption": 12
    },
    "fontWeights": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    }
  },
  "spacing": {
    "xs": 4,
    "sm": 8,
    "md": 16,
    "lg": 24,
    "xl": 32,
    "2xl": 48,
    "3xl": 64
  },
  "borderRadius": {
    "sm": 4,
    "md": 8,
    "lg": 12,
    "xl": 16,
    "full": 50
  }
}
```

## 🎯 Figma Plugin Specifieke Structuur

Voor Figma plugins, probeer deze structuur:

```json
{
  "figma": {
    "version": "1.0.0",
    "designSystem": {
      "name": "H2WW Design System",
      "colors": [
        {
          "name": "H2WW Red",
          "hex": "#E53E3E",
          "category": "primary"
        },
        {
          "name": "H2WW Yellow",
          "hex": "#F6E05E", 
          "category": "primary"
        },
        {
          "name": "H2WW Blue",
          "hex": "#3182CE",
          "category": "primary"
        }
      ],
      "typography": [
        {
          "name": "Inter",
          "family": "Inter",
          "weights": [400, 500, 600, 700]
        }
      ],
      "spacing": [
        {
          "name": "xs",
          "value": 4,
          "unit": "px"
        },
        {
          "name": "sm",
          "value": 8,
          "unit": "px"
        }
      ]
    }
  }
}
```

## 🎯 Troubleshooting Tips

### **1. Check Plugin Requirements**
- Welke Figma plugin gebruik je?
- Wat zijn de specifieke requirements?
- Is er documentatie voor de JSON format?

### **2. Validate JSON**
- Gebruik een JSON validator
- Controleer op syntax errors
- Zorg dat alle brackets en quotes correct zijn

### **3. Test Met Minimale Data**
Probeer eerst met alleen kleuren:

```json
{
  "colors": [
    "#E53E3E",
    "#F6E05E",
    "#3182CE"
  ]
}
```

### **4. Check Plugin Documentation**
- Welke plugin gebruik je precies?
- Is er een specifiek format vereist?
- Zijn er voorbeelden beschikbaar?

---

**Welke Figma plugin gebruik je precies? Dan kan ik de exacte JSON structuur maken die die plugin verwacht!** 🎨
