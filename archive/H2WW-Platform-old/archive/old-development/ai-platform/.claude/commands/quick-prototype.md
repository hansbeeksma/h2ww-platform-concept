# /quick-prototype - Rapid visual prototype from idea to Figma

Execute the complete visual pipeline from concept to interactive prototype:

1. Ask user for the idea/concept description
2. Run Concept Agent to generate design brief with:
   - User flows and journey mapping
   - Visual requirements and style direction
   - Component inventory and hierarchy
   - Interaction patterns and behaviors
3. Show brief to user for approval (y/n)
4. If approved, run Design Agent to:
   - Create Figma file with design system
   - Build interactive prototype with proper flows
   - Generate component library
   - Set up design tokens
5. Run Review Agent for:
   - Design consistency validation
   - Usability heuristic evaluation
   - Accessibility compliance check
6. Publish prototype to Figma for testing
7. Show prototype URL and testing instructions to user
8. Ask if should create additional variations or iterations

Use flags:
- --skip-review: Skip manual design reviews
- --template=[name]: Use specific Figma template
- --style=[modern|minimal|corporate]: Apply style preset
