# H2WW Platform: Comprehensive Figma Component Specifications
*Anxiety-First AI Learning Platform Component Library*

## Table of Contents
1. [Design System Foundation](#design-system-foundation)
2. [Core Component Library](#core-component-library)
3. [Complex Component Systems](#complex-component-systems)
4. [Anxiety-Aware Interaction Patterns](#anxiety-aware-interaction-patterns)
5. [Micro-interaction Specifications](#micro-interaction-specifications)
6. [Responsive Component Behavior](#responsive-component-behavior)
7. [Content Strategy Integration](#content-strategy-integration)
8. [Component API Design](#component-api-design)
9. [Implementation Guidelines](#implementation-guidelines)

---

## Design System Foundation

### 1.1 Design Tokens

**Color System - "Trust & Calm Palette"**
```
Primary Colors:
- Primary Blue: #4A90E2 (Trust, main CTAs)
- Primary Dark: #357ABD (Hover states)
- Primary Light: #EAF3FB (Backgrounds)

Secondary Colors:
- Success Green: #7ED321 (Achievements, progress)
- Growth Teal: #50C3C6 (Learning indicators)
- Warning Amber: #F5A623 (Gentle alerts)
- Error Coral: #E85D75 (Critical feedback)

Neutral Palette:
- Text Primary: #343A40
- Text Secondary: #6C757D
- Text Light: #ADB5BD
- Background: #FFFFFF
- Surface: #F8F9FA
- Border: #DEE2E6
- Border Light: #F1F3F4
```

**Typography Scale**
```
Font Family: Inter (primary), system-ui (fallback)
Scale Ratio: 1.25 (Major Third)

Sizes:
- Display Large: 39px / 44px (Hero headings)
- Display Medium: 31px / 36px (Page titles)
- Heading 1: 25px / 32px (Section headers)
- Heading 2: 20px / 28px (Subsections)
- Body Large: 16px / 24px (Primary content)
- Body Medium: 14px / 20px (Secondary content)
- Body Small: 12px / 16px (Captions, labels)

Font Weights:
- Regular: 400
- Medium: 500
- Semibold: 600
```

**Spacing System - 8px Grid**
```
Scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px

Usage:
- xs: 4px (tight spacing)
- sm: 8px (default spacing)
- md: 16px (medium spacing)
- lg: 24px (section spacing)
- xl: 32px (component spacing)
- 2xl: 48px (large spacing)
- 3xl: 64px (page spacing)
- 4xl: 96px (hero spacing)
```

**Border Radius Scale**
```
- xs: 4px (small elements)
- sm: 6px (buttons, inputs)
- md: 8px (cards, containers)
- lg: 12px (large cards)
- xl: 16px (modals)
- full: 9999px (pills, avatars)
```

**Shadow System**
```
Elevation Levels:
- xs: 0 1px 2px rgba(0, 0, 0, 0.05)
- sm: 0 2px 4px rgba(0, 0, 0, 0.06)
- md: 0 4px 8px rgba(0, 0, 0, 0.08)
- lg: 0 8px 16px rgba(0, 0, 0, 0.12)
- xl: 0 16px 32px rgba(0, 0, 0, 0.16)

Interactive Shadows:
- Button Hover: 0 4px 12px rgba(74, 144, 226, 0.3)
- Card Hover: 0 8px 24px rgba(0, 0, 0, 0.15)
- Focus Ring: 0 0 0 3px rgba(74, 144, 226, 0.1)
```

---

## Core Component Library

### 2.1 Button Components

#### Primary Button
**Component Name:** `Button/Primary`

**Visual Specifications:**
- Height: 44px (mobile), 40px (desktop)
- Padding: 12px 24px
- Border Radius: 6px
- Background: #4A90E2
- Text Color: #FFFFFF
- Font Weight: 600
- Font Size: 14px

**States & Variants:**
```
Default State:
- Background: #4A90E2
- Shadow: 0 2px 4px rgba(74, 144, 226, 0.2)

Hover State:
- Background: #357ABD
- Transform: translateY(-1px)
- Shadow: 0 4px 12px rgba(74, 144, 226, 0.3)
- Transition: all 200ms ease-out

Active State:
- Background: #2E6A99
- Transform: translateY(0)
- Shadow: 0 2px 4px rgba(74, 144, 226, 0.2)

Disabled State:
- Background: #ADB5BD
- Color: #6C757D
- Cursor: not-allowed
- Shadow: none

Loading State:
- Spinner animation (16px, white)
- Text: opacity 0.6
- Cursor: default
```

**Accessibility:**
- Min contrast ratio: 4.5:1
- Focus indicator: 3px outline ring
- Keyboard accessible
- Screen reader compatible
- ARIA labels for loading state

**Usage Guidelines:**
- Primary action per screen/section
- Use for main CTAs only
- Maximum 1-2 per view
- Include action-oriented text ("Get Started", "Continue Learning")

#### Secondary Button
**Component Name:** `Button/Secondary`

**Visual Specifications:**
- Height: 44px (mobile), 40px (desktop)
- Padding: 12px 24px
- Border Radius: 6px
- Background: transparent
- Border: 2px solid #4A90E2
- Text Color: #4A90E2
- Font Weight: 600

**States & Variants:**
```
Default State:
- Border: 2px solid #4A90E2
- Color: #4A90E2

Hover State:
- Background: #EAF3FB
- Border: 2px solid #357ABD
- Color: #357ABD

Active State:
- Background: #D6E8F5
- Border: 2px solid #2E6A99
- Color: #2E6A99
```

#### Ghost Button
**Component Name:** `Button/Ghost`

**Visual Specifications:**
- Height: 40px
- Padding: 8px 16px
- Border Radius: 6px
- Background: transparent
- Text Color: #4A90E2
- Font Weight: 500

**States & Variants:**
```
Default State:
- Background: transparent
- Color: #4A90E2

Hover State:
- Background: #F8F9FA
- Color: #357ABD

Active State:
- Background: #E9ECEF
```

#### Icon Button
**Component Name:** `Button/Icon`

**Visual Specifications:**
- Size: 40x40px (desktop), 44x44px (mobile)
- Border Radius: 6px
- Icon Size: 20px
- Background: transparent

**Variants:**
- Default (ghost style)
- Filled (with background)
- Outline (with border)

### 2.2 Form Components

#### Input Field
**Component Name:** `Form/Input`

**Visual Specifications:**
- Height: 44px
- Padding: 12px 16px
- Border Radius: 6px
- Border: 1px solid #DEE2E6
- Background: #FFFFFF
- Font Size: 16px (prevents zoom on iOS)

**States & Variants:**
```
Default State:
- Border: 1px solid #DEE2E6
- Background: #FFFFFF

Focus State:
- Border: 1px solid #4A90E2
- Shadow: 0 0 0 3px rgba(74, 144, 226, 0.1)
- Outline: none

Error State:
- Border: 1px solid #F5A623
- Background: #FFF9E6
- Icon: Warning (16px)

Success State:
- Border: 1px solid #7ED321
- Background: #F8FFF4
- Icon: Check (16px)

Disabled State:
- Background: #F8F9FA
- Border: 1px solid #E9ECEF
- Color: #6C757D
- Cursor: not-allowed
```

**Label Component:**
```
Position: Above input
Font Size: 14px
Font Weight: 600
Color: #343A40
Margin Bottom: 8px
Required indicator: * (red)
```

**Help Text Component:**
```
Font Size: 12px
Color: #6C757D
Margin Top: 4px
Line Height: 16px
```

**Error Message Component:**
```
Font Size: 12px
Color: #E85D75
Margin Top: 4px
Icon: Alert triangle (12px)
Display: Only when error state active
```

#### Textarea
**Component Name:** `Form/Textarea`

**Visual Specifications:**
- Min Height: 120px
- Padding: 12px 16px
- Border Radius: 6px
- Resize: vertical only
- Same states as Input Field

#### Select Dropdown
**Component Name:** `Form/Select`

**Visual Specifications:**
- Height: 44px
- Padding: 12px 16px 12px 40px
- Chevron icon: 16px, right-aligned
- Dropdown max-height: 200px
- Option padding: 12px 16px

**Dropdown Container:**
```
Background: #FFFFFF
Border: 1px solid #DEE2E6
Border Radius: 6px
Shadow: 0 4px 16px rgba(0, 0, 0, 0.12)
Z-index: 1000
```

**Option States:**
```
Default: Background transparent
Hover: Background #F8F9FA
Selected: Background #EAF3FB, Color #4A90E2
```

#### Checkbox
**Component Name:** `Form/Checkbox`

**Visual Specifications:**
- Size: 20x20px
- Border Radius: 4px
- Border: 2px solid #DEE2E6

**States:**
```
Unchecked:
- Background: #FFFFFF
- Border: 2px solid #DEE2E6

Checked:
- Background: #4A90E2
- Border: 2px solid #4A90E2
- Checkmark: White, 12px

Indeterminate:
- Background: #4A90E2
- Border: 2px solid #4A90E2
- Line: White, 8px horizontal

Focus:
- Outline: 2px solid #4A90E2
- Outline offset: 2px
```

#### Radio Button
**Component Name:** `Form/Radio`

**Visual Specifications:**
- Size: 20x20px
- Border Radius: 50%
- Border: 2px solid #DEE2E6

**States:**
```
Unselected:
- Background: #FFFFFF
- Border: 2px solid #DEE2E6

Selected:
- Background: #FFFFFF
- Border: 2px solid #4A90E2
- Inner dot: 8px, #4A90E2

Focus:
- Outline: 2px solid #4A90E2
- Outline offset: 2px
```

### 2.3 Card Components

#### Learning Card
**Component Name:** `Card/Learning`

**Visual Specifications:**
- Border Radius: 12px
- Padding: 24px
- Background: #FFFFFF
- Border: 1px solid #F1F3F4
- Shadow: 0 2px 8px rgba(0, 0, 0, 0.08)

**Layout Structure:**
```
Header Section:
- Title: 20px, semibold, #343A40
- Subtitle: 14px, regular, #6C757D
- Duration badge: 12px, #4A90E2 background

Content Section:
- Description: 16px, regular, #343A40
- Progress bar: Full width, 8px height
- Meta info: Tags, difficulty level

Footer Section:
- Action button: Primary or Secondary
- Additional links: Ghost buttons
```

**States:**
```
Default:
- Shadow: 0 2px 8px rgba(0, 0, 0, 0.08)

Hover:
- Shadow: 0 4px 16px rgba(0, 0, 0, 0.12)
- Border: 1px solid #4A90E2
- Transform: translateY(-2px)
- Transition: all 200ms ease-out

Active/Selected:
- Border: 2px solid #4A90E2
- Background: #FDFDFF
```

**Accessibility:**
- Focus indicator: 3px outline
- Keyboard navigation support
- Screen reader optimized structure
- Color-independent status indicators

#### Achievement Card
**Component Name:** `Card/Achievement`

**Visual Specifications:**
- Border Radius: 12px
- Padding: 20px
- Background: Gradient or solid based on achievement type
- Min Height: 160px

**Achievement Types:**
```
Milestone:
- Background: Linear gradient (#7ED321 to #5BB318)
- Icon: Trophy, 32px, white
- Text: White

Progress:
- Background: Linear gradient (#50C3C6 to #3A9699)
- Icon: Target, 32px, white
- Text: White

Community:
- Background: Linear gradient (#4A90E2 to #357ABD)
- Icon: Users, 32px, white
- Text: White
```

**Animation States:**
```
Unlock Animation:
- Scale: 0.8 to 1.05 to 1.0
- Opacity: 0 to 1
- Glow effect: 0 0 20px achievement-color
- Duration: 800ms
- Easing: ease-out
```

#### Community Card
**Component Name:** `Card/Community`

**Visual Specifications:**
- Border Radius: 8px
- Padding: 16px
- Background: #FFFFFF
- Border: 1px solid #DEE2E6

**Layout Structure:**
```
Header:
- Avatar: 32px, circular
- Name: 14px, semibold
- Timestamp: 12px, #6C757D
- Status indicator: Online/offline dot

Content:
- Title: 16px, semibold (if applicable)
- Body text: 14px, line-height 20px
- Media: Images, videos (if applicable)

Footer:
- Interaction buttons: Like, reply, share
- Engagement metrics: Views, likes, replies
```

#### Stats Card
**Component Name:** `Card/Stats`

**Visual Specifications:**
- Border Radius: 8px
- Padding: 20px
- Background: #FFFFFF
- Border: 1px solid #F1F3F4
- Min Height: 120px

**Layout Structure:**
```
Metric Value:
- Font Size: 31px
- Font Weight: 600
- Color: #343A40

Metric Label:
- Font Size: 14px
- Font Weight: 500
- Color: #6C757D

Change Indicator:
- Font Size: 12px
- Positive: #7ED321
- Negative: #F5A623
- Neutral: #6C757D
- Include trend arrow icon
```

### 2.4 Navigation Components

#### Top Navigation
**Component Name:** `Navigation/TopNav`

**Visual Specifications:**
- Height: 64px (desktop), 56px (mobile)
- Background: #FFFFFF
- Border Bottom: 1px solid #F1F3F4
- Padding: 0 24px (desktop), 0 16px (mobile)

**Layout Structure:**
```
Left Section:
- Logo: 32px height
- Brand text: 20px, semibold

Center Section (Desktop only):
- Primary navigation links
- Search bar (expandable)

Right Section:
- User avatar: 32px
- Notifications: Icon button
- Settings: Icon button
```

**Navigation Link States:**
```
Default:
- Color: #6C757D
- Font Weight: 500
- Padding: 8px 16px

Hover:
- Color: #4A90E2
- Background: #F8F9FA
- Border Radius: 6px

Active:
- Color: #4A90E2
- Background: #EAF3FB
- Font Weight: 600
```

#### Side Navigation
**Component Name:** `Navigation/SideNav`

**Visual Specifications:**
- Width: 280px (expanded), 60px (collapsed)
- Background: #FFFFFF
- Border Right: 1px solid #F1F3F4
- Padding: 16px

**Navigation Item:**
```
Height: 44px
Padding: 12px 16px
Border Radius: 6px
Icon: 20px
Text: 14px, medium

States:
- Default: Transparent background
- Hover: Background #F8F9FA
- Active: Background #EAF3FB, Color #4A90E2
```

**Collapse Toggle:**
- Position: Top right of sidebar
- Icon: Chevron left/right
- Size: 24px
- Background: #F8F9FA on hover

#### Breadcrumbs
**Component Name:** `Navigation/Breadcrumbs`

**Visual Specifications:**
- Font Size: 14px
- Color: #6C757D
- Spacing: 8px between items
- Separator: "/" or chevron right (12px)

**Breadcrumb Item:**
```
Default Link:
- Color: #6C757D
- Text Decoration: none
- Hover: Color #4A90E2, underline

Current Page:
- Color: #343A40
- Font Weight: 600
- Not clickable
```

#### Tab Navigation
**Component Name:** `Navigation/Tabs`

**Visual Specifications:**
- Height: 48px
- Border Bottom: 1px solid #DEE2E6
- Padding: 0 (full width)

**Tab Item:**
```
Padding: 12px 24px
Font Size: 14px
Font Weight: 500
Border Bottom: 2px solid transparent

Default State:
- Color: #6C757D
- Background: transparent

Hover State:
- Color: #4A90E2
- Background: #F8F9FA

Active State:
- Color: #4A90E2
- Border Bottom: 2px solid #4A90E2
- Font Weight: 600
```

### 2.5 Feedback Components

#### Toast Notification
**Component Name:** `Feedback/Toast`

**Visual Specifications:**
- Width: 400px (desktop), 100vw-32px (mobile)
- Border Radius: 8px
- Padding: 16px
- Shadow: 0 8px 24px rgba(0, 0, 0, 0.15)

**Toast Types:**
```
Success:
- Background: #D4EDDA
- Border: 1px solid #C3E6CB
- Color: #155724
- Icon: Check circle (20px)

Info:
- Background: #E7F3FF
- Border: 1px solid #B3D9FF
- Color: #0B5394
- Icon: Info circle (20px)

Warning:
- Background: #FFF8E1
- Border: 1px solid #FFE0B2
- Color: #E65100
- Icon: Alert triangle (20px)

Error:
- Background: #F8D7DA
- Border: 1px solid #F5C6CB
- Color: #721C24
- Icon: X circle (20px)
```

**Animation:**
```
Enter: Slide in from top + fade in (300ms ease-out)
Exit: Slide up + fade out (200ms ease-in)
Auto-dismiss: 5 seconds for success/info, 8 seconds for warning/error
```

#### Alert Banner
**Component Name:** `Feedback/Alert`

**Visual Specifications:**
- Full width container
- Border Radius: 8px
- Padding: 16px 20px
- Margin Bottom: 16px

**Alert Structure:**
```
Icon Section:
- Icon: 20px
- Position: Left aligned

Content Section:
- Title: 14px, semibold
- Description: 14px, regular
- Action link: 14px, underlined (optional)

Dismiss Section:
- Close button: 20px icon button
- Position: Right aligned
```

#### Modal Dialog
**Component Name:** `Feedback/Modal`

**Visual Specifications:**
- Overlay: rgba(0, 0, 0, 0.5)
- Container: Centered, max-width 500px
- Background: #FFFFFF
- Border Radius: 12px
- Shadow: 0 16px 48px rgba(0, 0, 0, 0.2)

**Modal Structure:**
```
Header:
- Title: 20px, semibold
- Close button: 24px icon button
- Padding: 24px 24px 0

Body:
- Content area: Flexible
- Padding: 24px

Footer:
- Action buttons: Right aligned
- Cancel + Primary action
- Padding: 0 24px 24px
```

**Animation:**
```
Overlay: Fade in (200ms)
Modal: Scale from 0.95 to 1.0 + fade in (300ms ease-out)
Exit: Reverse animation (200ms ease-in)
```

#### Progress Bar
**Component Name:** `Feedback/Progress`

**Visual Specifications:**
- Height: 8px (default), 12px (large), 4px (small)
- Border Radius: 4px
- Background: #F1F3F4

**Progress Fill:**
```
Background: Linear gradient(90deg, #4A90E2, #50C3C6)
Border Radius: 4px
Transition: width 300ms ease-out

Indeterminate Animation:
- Shimmer effect from left to right
- Duration: 1.5s infinite
```

**Progress Types:**
```
Linear: Standard horizontal bar
Circular: 40px diameter, 3px stroke
Ring: 60px diameter, 4px stroke
Step: Segmented progress (for multi-step flows)
```

### 2.6 Data Display Components

#### Table
**Component Name:** `Data/Table`

**Visual Specifications:**
- Background: #FFFFFF
- Border: 1px solid #DEE2E6
- Border Radius: 8px

**Table Header:**
```
Background: #F8F9FA
Border Bottom: 1px solid #DEE2E6
Padding: 12px 16px
Font Weight: 600
Font Size: 14px
Color: #343A40
```

**Table Row:**
```
Padding: 16px
Border Bottom: 1px solid #F1F3F4
Font Size: 14px

Hover State:
- Background: #F8F9FA

Selected State:
- Background: #EAF3FB
- Border Left: 3px solid #4A90E2
```

**Table Cell:**
```
Vertical Align: middle
Text Align: left (default)
Overflow: hidden
Text Overflow: ellipsis
```

#### List
**Component Name:** `Data/List`

**Visual Specifications:**
- Background: #FFFFFF
- Border Radius: 8px

**List Item:**
```
Padding: 16px
Border Bottom: 1px solid #F1F3F4
Display: flex
Align Items: center

Structure:
- Leading icon/avatar: 24px
- Content: Title + subtitle
- Trailing: Action button or status
```

**List Item States:**
```
Default: Background transparent
Hover: Background #F8F9FA
Active: Background #EAF3FB
```

#### Chart Container
**Component Name:** `Data/Chart`

**Visual Specifications:**
- Background: #FFFFFF
- Border: 1px solid #F1F3F4
- Border Radius: 8px
- Padding: 24px

**Chart Header:**
```
Title: 20px, semibold
Subtitle: 14px, #6C757D
Time Range Selector: Segmented control
Margin Bottom: 24px
```

**Chart Area:**
```
Min Height: 300px
Grid Lines: #F1F3F4
Axis Labels: 12px, #6C757D
Data Colors: Brand color palette
```

---

## Complex Component Systems

### 3.1 AI Chat Interface

#### Chat Container
**Component Name:** `AI/ChatContainer`

**Visual Specifications:**
- Background: #FFFFFF
- Border: 1px solid #DEE2E6
- Border Radius: 12px
- Min Height: 400px
- Max Height: 600px
- Padding: 0

**Layout Structure:**
```
Header Section (60px):
- AI Avatar: 32px
- AI Name/Status: "H2WW Assistant"
- Connection indicator: Green dot
- Settings button: 24px icon

Messages Area:
- Padding: 16px
- Scroll: auto
- Max Height: 480px

Input Area (80px):
- Input field with send button
- Attachment options
- Voice input toggle
```

#### Chat Message
**Component Name:** `AI/ChatMessage`

**Visual Specifications:**
- Max Width: 80% of container
- Border Radius: 16px
- Padding: 12px 16px
- Margin: 8px 0

**User Message:**
```
Background: #4A90E2
Color: #FFFFFF
Align: right
Border Radius: 16px 16px 4px 16px
```

**AI Message:**
```
Background: #F8F9FA
Color: #343A40
Align: left
Border Radius: 16px 16px 16px 4px
Border: 1px solid #F1F3F4
```

**Message Components:**
```
Avatar: 28px circular (AI messages only)
Timestamp: 12px, #6C757D, positioned below message
Typing Indicator: Animated dots, AI messages
Action Buttons: Copy, thumbs up/down, regenerate
```

**Special Message Types:**
```
Thinking State:
- Animated typing dots
- Background: #F8F9FA
- Text: "H2WW is thinking..."

Error State:
- Background: #FFF5F5
- Border: 1px solid #FED7D7
- Retry button included

Code Block:
- Background: #F8F9FA
- Border: 1px solid #E2E8F0
- Font: monospace
- Copy button overlay
```

#### Chat Input
**Component Name:** `AI/ChatInput`

**Visual Specifications:**
- Background: #FFFFFF
- Border: 1px solid #DEE2E6
- Border Radius: 24px
- Padding: 12px 16px 12px 48px
- Min Height: 44px
- Max Height: 120px (multiline)

**Input Features:**
```
Placeholder: "Ask H2WW anything about AI..."
Send Button: 32px circular, #4A90E2
Voice Button: 32px, toggle state
Attachment Button: 32px, file upload
Character Count: 500 max, shows at 400+
```

**Input States:**
```
Focus:
- Border: 1px solid #4A90E2
- Shadow: 0 0 0 3px rgba(74, 144, 226, 0.1)

Loading:
- Send button shows spinner
- Input disabled
- Placeholder: "H2WW is responding..."
```

### 3.2 Progress Dashboard

#### Progress Overview
**Component Name:** `Progress/Overview`

**Visual Specifications:**
- Grid Layout: 2x2 (desktop), 1x4 (mobile)
- Gap: 24px
- Padding: 24px

**Dashboard Cards:**
```
Confidence Score:
- Large metric: Current score (1-10)
- Trend indicator: +/- change
- Progress bar: Visual representation
- Color: Based on score level

Learning Streak:
- Days counter: Large number
- Streak calendar: Last 30 days
- Encouragement message
- Color: #7ED321 (success)

Skills Mastered:
- Skill count: Large number
- Skill badges: Visual grid
- Next skill preview
- Color: #50C3C6 (growth)

Community Rank:
- Rank position: Large number
- Progress to next level
- Peer comparison chart
- Color: #4A90E2 (primary)
```

#### Learning Journey Map
**Component Name:** `Progress/JourneyMap`

**Visual Specifications:**
- Background: #FFFFFF
- Border: 1px solid #F1F3F4
- Border Radius: 12px
- Padding: 32px
- Min Height: 400px

**Journey Path:**
```
Path Line:
- Stroke: 4px
- Color: #DEE2E6 (incomplete), #4A90E2 (complete)
- Style: Curved connecting line

Stage Nodes:
- Size: 48px diameter
- Border: 3px solid
- Background: #FFFFFF

Node States:
- Completed: Border #7ED321, checkmark icon
- Current: Border #4A90E2, pulse animation
- Locked: Border #DEE2E6, lock icon
- Available: Border #50C3C6, play icon
```

**Stage Details Panel:**
```
Title: 20px, semibold
Description: 16px, line-height 24px
Duration: Estimated time
Prerequisites: Linked stages
Progress: Completion percentage
CTA Button: Context-appropriate action
```

#### Skills Matrix
**Component Name:** `Progress/SkillsMatrix`

**Visual Specifications:**
- Grid Layout: Responsive masonry
- Card Size: 280x180px (desktop), full-width (mobile)
- Gap: 16px

**Skill Card:**
```
Background: Gradient based on skill category
Border Radius: 12px
Padding: 20px
Color: White text

Header:
- Skill Icon: 32px
- Skill Name: 18px, semibold
- Level: Beginner/Intermediate/Advanced

Progress:
- Visual progress ring: 60px diameter
- Percentage: Large number
- XP Points: Current/required

Actions:
- Practice Button: Secondary style
- Learn More: Ghost button
```

### 3.3 Practice Playground

#### Playground Container
**Component Name:** `Practice/Playground`

**Visual Specifications:**
- Full viewport layout
- Background: #F8F9FA
- Header: 60px fixed
- Sidebar: 320px (collapsible)
- Main Area: Flexible

**Layout Sections:**
```
Tool Selector Sidebar:
- Background: #FFFFFF
- Border Right: 1px solid #DEE2E6
- Padding: 16px

Main Workspace:
- Background: #FFFFFF
- Border Radius: 8px
- Margin: 16px
- Padding: 24px

Result Panel:
- Background: #FFFFFF
- Border: 1px solid #DEE2E6
- Border Radius: 8px
- Max Height: 50vh
```

#### AI Tool Card
**Component Name:** `Practice/ToolCard`

**Visual Specifications:**
- Width: 288px (sidebar), 320px (grid)
- Height: 200px
- Border Radius: 12px
- Background: #FFFFFF
- Border: 1px solid #F1F3F4

**Card Structure:**
```
Header:
- Tool Icon: 48px
- Tool Name: 18px, semibold
- Provider Badge: Small chip

Content:
- Description: 14px, 3 lines max
- Difficulty Level: Visual indicator
- Time Estimate: With clock icon

Footer:
- Try Now Button: Primary
- Info Button: Ghost
- Bookmark Toggle: Icon button
```

**Card States:**
```
Default: Standard styling
Hover: Elevation increase, border color change
Selected: Border #4A90E2, background tint
Bookmarked: Star icon filled
Recently Used: "Recent" badge
```

#### Workspace Area
**Component Name:** `Practice/Workspace`

**Visual Specifications:**
- Background: #FFFFFF
- Border Radius: 8px
- Padding: 24px
- Min Height: 400px

**Workspace Components:**
```
Tool Interface:
- Input Area: Contextual to tool type
- Parameter Controls: Sliders, toggles, dropdowns
- Execute Button: Large, prominent
- Reset Button: Secondary

Output Display:
- Result Container: Formatted based on output type
- Download Options: For applicable results
- Share Button: Copy link functionality
- Save to Portfolio: Bookmark for later
```

**Safety Features:**
```
Undo/Redo: Always available
Auto-save: Every 30 seconds
Reset Confirmation: "Are you sure?" modal
Help Context: Tool-specific guidance
Exit Safety: Unsaved changes warning
```

### 3.4 Community Forum

#### Forum Layout
**Component Name:** `Community/ForumLayout`

**Visual Specifications:**
- Grid Layout: Sidebar + Main content
- Sidebar Width: 280px (desktop), overlay (mobile)
- Gap: 24px
- Background: #F8F9FA

**Layout Structure:**
```
Navigation Sidebar:
- Categories list
- My Groups
- Trending Topics
- Quick Actions

Main Content Area:
- Post Feed
- Filtering Controls
- Pagination

Activity Panel (desktop only):
- Recent Activity
- Online Members
- Upcoming Events
```

#### Forum Post
**Component Name:** `Community/ForumPost`

**Visual Specifications:**
- Background: #FFFFFF
- Border: 1px solid #DEE2E6
- Border Radius: 8px
- Padding: 20px
- Margin Bottom: 16px

**Post Structure:**
```
Header:
- Author Avatar: 40px
- Author Name: 16px, semibold
- Author Badge: Expertise level
- Timestamp: 14px, #6C757D
- Options Menu: 3-dot menu

Content:
- Title: 18px, semibold (if applicable)
- Body Text: 16px, line-height 24px
- Media: Images, videos, links
- Tags: Skill/topic tags

Footer:
- Engagement: Likes, replies, views
- Action Buttons: Like, reply, share, bookmark
- Quick Reply: Expandable input
```

**Post Types:**
```
Question:
- Question mark icon
- Answered/Unanswered status
- Best Answer highlight

Discussion:
- Chat bubble icon
- Trending indicator
- Pin status

Resource:
- Link icon
- Resource type badge
- Download/external link

Achievement:
- Trophy icon
- Celebration styling
- Congratulations from community
```

#### Reply Thread
**Component Name:** `Community/ReplyThread`

**Visual Specifications:**
- Nested Structure: Max 3 levels deep
- Indentation: 32px per level
- Background: #FAFBFC (nested)
- Border Left: 3px solid #E2E8F0

**Reply Structure:**
```
Compact Header:
- Avatar: 32px
- Name + timestamp: Single line
- Nested level indicator

Content:
- Text: 14px, line-height 20px
- Quote: Reference to parent post
- Reactions: Emoji responses

Actions:
- Like: Heart icon + count
- Reply: Reply icon
- More: Options menu
```

### 3.5 Learning Module Template

#### Module Container
**Component Name:** `Learning/ModuleContainer`

**Visual Specifications:**
- Full viewport: Fixed header, scrollable content
- Background: #FFFFFF
- Progress Bar: Fixed top, full-width
- Navigation: Fixed bottom (mobile), sidebar (desktop)

**Module Sections:**
```
Header Section:
- Module Title: 24px, semibold
- Progress Indicator: X of Y lessons
- Module Description: 16px, 2-3 lines
- Estimated Time: Clock icon + duration

Content Area:
- Lesson Content: Rich text, media
- Interactive Elements: Embedded exercises
- Note Taking: Collapsible sidebar
- Bookmarks: In-content markers

Navigation:
- Previous/Next: Large buttons
- Lesson List: Expandable outline
- Jump to Section: Quick navigation
```

#### Lesson Component
**Component Name:** `Learning/Lesson`

**Visual Specifications:**
- Max Width: 800px
- Padding: 40px 24px
- Background: #FFFFFF
- Typography: Optimized for reading

**Content Types:**
```
Text Content:
- Headings: Clear hierarchy
- Paragraphs: 16px, line-height 28px
- Lists: Proper spacing and bullets
- Quotes: Highlighted blocks

Media Content:
- Images: Responsive, captioned
- Videos: 16:9 aspect ratio, controls
- Audio: Custom player interface
- Interactive: Embedded exercises

Code Examples:
- Syntax highlighting
- Copy button
- Line numbers (optional)
- Expandable/collapsible
```

#### Assessment Component
**Component Name:** `Learning/Assessment`

**Visual Specifications:**
- Background: #F8F9FA
- Border: 1px solid #DEE2E6
- Border Radius: 12px
- Padding: 24px

**Question Types:**
```
Multiple Choice:
- Question: 18px, semibold
- Options: Radio buttons, 16px text
- Explanation: Expandable after answer
- Progress: Question X of Y

True/False:
- Statement: 18px, clear formatting
- Large buttons: True/False
- Feedback: Immediate, color-coded

Fill in the Blank:
- Context paragraph: 16px
- Input fields: Inline with text
- Hints: Available on request
- Validation: Real-time feedback

Scenario-Based:
- Scenario description: Rich text
- Multiple sub-questions
- Progressive disclosure
- Branching logic support
```

---

## Anxiety-Aware Interaction Patterns

### 4.1 Loading States That Reduce Anxiety

#### Progressive Loading
**Pattern Name:** `Anxiety/ProgressiveLoading`

**Design Principles:**
- Never show blank screens
- Provide clear progress indicators
- Offer meaningful status messages
- Include estimated time remaining

**Visual Implementation:**
```
Skeleton Loading:
- Content shape placeholders
- Subtle shimmer animation
- Maintain layout structure
- 200ms fade-in for real content

Progress Indicators:
- Percentage completion when known
- Friendly messages: "Preparing your content..."
- Cancel option for long operations
- Helpful tips during wait times

Chunked Loading:
- Load critical content first
- Progressive enhancement approach
- Smooth transitions between states
- No jarring content shifts
```

#### Optimistic UI Updates
**Pattern Name:** `Anxiety/OptimisticUI`

**Implementation:**
```
Immediate Feedback:
- Show expected result immediately
- Subtle indicator of pending state
- Graceful error recovery
- Rollback capability

Visual Cues:
- Slightly reduced opacity (0.8)
- Subtle loading spinner (12px)
- Disable editing during sync
- Success confirmation on completion

Error Recovery:
- Clear error messaging
- Retry options with explanation
- Rollback to previous state
- No data loss guarantees
```

### 4.2 Error Handling That Doesn't Intimidate

#### Gentle Error Messages
**Component Name:** `Anxiety/GentleError`

**Visual Specifications:**
- Background: #FFF9E6 (warm, non-threatening)
- Border: 1px solid #FFE0B2
- Border Radius: 8px
- Padding: 16px
- Icon: Helpful illustration, not warning triangle

**Message Structure:**
```
Friendly Tone:
- "Oops, something didn't work as expected"
- Avoid technical jargon
- Explain what happened in plain language
- Focus on next steps, not blame

Helpful Actions:
- Primary: "Try again" button
- Secondary: "Get help" link
- Tertiary: "Skip for now" option
- Context: Link to relevant help article

Recovery Guidance:
- Step-by-step instructions
- Alternative approaches
- Contact support option
- Progress preservation assurance
```

#### Progressive Error Disclosure
**Pattern Name:** `Anxiety/ProgressiveErrorDisclosure`

**Implementation Levels:**
```
Level 1 - Simple Message:
- Basic user-friendly explanation
- Single retry action
- Visual: Gentle warning color

Level 2 - Detailed Explanation:
- More context about the issue
- Multiple resolution options
- Visual: Expandable details section

Level 3 - Technical Details:
- Error codes and technical info
- Advanced troubleshooting steps
- Visual: Collapsible technical section
- Audience: Power users or support requests
```

### 4.3 Success Celebrations That Build Confidence

#### Achievement Celebrations
**Component Name:** `Anxiety/AchievementCelebration`

**Visual Specifications:**
- Modal overlay with celebration animation
- Background: Semi-transparent with blur
- Content: Centered achievement card
- Animation: Confetti, sparkles, or gentle pulse

**Celebration Elements:**
```
Achievement Icon:
- Size: 80px
- Style: Colorful, friendly illustration
- Animation: Bounce-in effect

Success Message:
- Congratulatory headline: 24px, bold
- Achievement description: 16px
- Personal progress note: "You've completed 5 modules!"

Call to Action:
- Continue learning button: Primary style
- Share achievement: Secondary
- View progress: Ghost button

Animation Sequence:
1. Fade in overlay (200ms)
2. Scale in achievement icon (400ms, bounce)
3. Fade in text content (300ms, staggered)
4. Show confetti effect (800ms)
5. Enable interactions
```

#### Micro-Celebrations
**Pattern Name:** `Anxiety/MicroCelebrations`

**Implementation:**
```
Completed Tasks:
- Checkmark animation: Scale + color change
- Gentle positive sound (optional)
- Haptic feedback on mobile
- Brief success message

Progress Milestones:
- Progress bar celebration: Brief glow effect
- Percentage achievement animation
- Encouraging micro-copy updates
- Level-up indicators

Learning Streaks:
- Streak counter animation
- Fire/energy visual metaphors
- Encouraging messages
- Calendar day highlighting
```

### 4.4 Progressive Disclosure Patterns

#### Complexity Introduction
**Pattern Name:** `Anxiety/ComplexityIntroduction`

**Implementation Strategy:**
```
Basic View (Entry Level):
- Essential information only
- Simple language and concepts
- Large, clear interactive elements
- Minimal cognitive load

Intermediate View:
- Additional context and options
- More detailed explanations
- Progressive feature introduction
- Optional advanced settings

Advanced View:
- Full feature set available
- Technical details and customization
- Power-user shortcuts
- Expert-level content

Transition Triggers:
- User-initiated (view mode toggle)
- Progress-based (automatic unlock)
- Confidence-based (assessment driven)
- Time-based (gradual introduction)
```

#### Content Layering
**Component Name:** `Anxiety/ContentLayering`

**Visual Implementation:**
```
Layer 1 - Overview:
- Key concepts summary
- Visual learning aids
- Simple examples
- Continue/explore options

Layer 2 - Detail:
- In-depth explanations
- Interactive examples
- Practice opportunities
- Related resources

Layer 3 - Mastery:
- Advanced concepts
- Real-world applications
- Complex scenarios
- Assessment opportunities

Navigation:
- Breadcrumb showing depth level
- Easy back navigation
- Skip ahead options
- Progress saving at each level
```

### 4.5 Safety Net Interactions

#### Undo/Redo System
**Component Name:** `Anxiety/UndoSystem`

**Visual Specifications:**
- Keyboard shortcuts: Cmd/Ctrl+Z, Cmd/Ctrl+Y
- Toolbar buttons: Always visible
- Toast notification: "Undoing..." feedback
- Action history: Expandable list view

**Implementation:**
```
Action Tracking:
- All user actions logged
- Non-destructive operations preferred
- Auto-save every 30 seconds
- Session persistence

Visual Feedback:
- Undo button highlight after actions
- Action description in tooltip
- Batch undo for related actions
- Clear action history

Limitations:
- 50 action history limit
- Some actions non-undoable (clearly marked)
- Confirmation for data deletion
- Auto-cleanup of old history
```

#### Confirmation Patterns
**Pattern Name:** `Anxiety/SafeConfirmations`

**Design Approach:**
```
Low-Risk Actions:
- No confirmation needed
- Immediate execution
- Undo option available
- Toast notification feedback

Medium-Risk Actions:
- Gentle confirmation dialog
- Clear action description
- Cancel option prominent
- Consequences explained

High-Risk Actions:
- Strong confirmation required
- Type action name to confirm
- Clear warning about consequences
- Multiple step confirmation
- Cooling-off period for major changes
```

---

## Micro-interaction Specifications

### 5.1 Button Hover and Click Animations

#### Primary Button Interactions
**Animation Specifications:**
```
Hover State:
- Transform: translateY(-1px)
- Box Shadow: 0 4px 12px rgba(74, 144, 226, 0.3)
- Background: Linear color transition
- Duration: 200ms
- Easing: ease-out

Active State:
- Transform: translateY(0px)
- Box Shadow: 0 2px 4px rgba(74, 144, 226, 0.2)
- Scale: 0.98
- Duration: 100ms
- Easing: ease-in

Focus State:
- Outline: 3px solid rgba(74, 144, 226, 0.3)
- Outline Offset: 2px
- No transform (accessibility)
- Maintains hover effects
```

#### Loading State Animation
**Implementation:**
```
Button Content:
- Text: Fade to 60% opacity
- Spinner: 16px, fade in from center
- Width: Maintain original width
- Cursor: default (not pointer)

Spinner Animation:
- Rotation: 360deg continuous
- Duration: 1000ms
- Timing: linear
- Border: 2px solid current color
- Border Top: transparent for spin effect
```

### 5.2 Form Validation Feedback

#### Real-time Validation
**Animation Sequence:**
```
Valid Input:
- Border Color: Smooth transition to green
- Checkmark Icon: Scale in from 0 to 1
- Duration: 200ms
- Easing: ease-out

Invalid Input:
- Border Color: Transition to orange (not red)
- Shake Animation: Subtle 2px horizontal movement
- Error Message: Slide down from input
- Duration: 300ms for shake, 200ms for color

Focus Recovery:
- Border: Return to focus color
- Error Message: Remain visible
- No shake on re-focus
- Encouraging micro-copy
```

#### Error Message Animations
**Implementation:**
```
Error Appearance:
- Slide Down: From 0 to natural height
- Fade In: From 0 to 1 opacity
- Duration: 200ms
- Easing: ease-out

Error Dismissal:
- Fade Out: To 0 opacity
- Slide Up: To 0 height
- Duration: 150ms
- Easing: ease-in

Error Icon:
- Warning Triangle: Soft orange color
- Scale In: From 0.8 to 1.0
- Bounce: Subtle spring effect
- Duration: 300ms
```

### 5.3 Progress Update Animations

#### Progress Bar Fill
**Animation Specifications:**
```
Progress Update:
- Width Transition: Smooth fill animation
- Duration: 500ms for significant changes
- Easing: ease-out
- Gradient: Moving highlight effect

Milestone Celebrations:
- Pulse Effect: Brief scale increase
- Glow: Temporary shadow enhancement
- Color Change: Highlight achievement
- Duration: 800ms celebration

Indeterminate Loading:
- Shimmer: Left-to-right moving highlight
- Width: 30% of container
- Duration: 1.5s infinite
- Easing: ease-in-out
```

#### Step Progress Animation
**Implementation:**
```
Step Completion:
- Checkmark: Draw-in animation
- Background: Color transition
- Scale: Brief 1.1x scale pulse
- Duration: 400ms

Next Step Activation:
- Outline: Fade in focus ring
- Pulse: Gentle breathing animation
- Icon: Fade in step indicator
- Duration: 300ms

Connection Lines:
- Draw: SVG path animation
- Duration: 600ms
- Easing: ease-in-out
- Color: Match step states
```

### 5.4 Achievement Unlock Celebrations

#### Achievement Modal Animation
**Sequence:**
```
1. Overlay Entrance (200ms):
   - Background: Fade in blur overlay
   - Opacity: 0 to 0.8

2. Achievement Card (400ms):
   - Scale: 0.8 to 1.05 to 1.0
   - Opacity: 0 to 1
   - Rotation: Slight wobble effect

3. Confetti Effect (800ms):
   - Particles: 50-100 colored shapes
   - Physics: Gravity and bounce
   - Colors: Match achievement theme

4. Text Animation (300ms, staggered):
   - Title: Fade in + slide up
   - Description: Fade in + slide up (100ms delay)
   - Buttons: Fade in + slide up (200ms delay)
```

#### Badge Collection Animation
**Implementation:**
```
Badge Appearance:
- Position: Start from notification area
- Path: Curved trajectory to collection
- Scale: Grow during flight
- Duration: 1200ms
- Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)

Collection Integration:
- Slot Highlight: Glow effect on target position
- Badge Landing: Gentle bounce settle
- Collection Counter: Number increment animation
- Sound: Positive achievement chime (optional)
```

### 5.5 Transition Timing and Easing Functions

#### Standard Easing Curves
**CSS Custom Properties:**
```css
:root {
  /* Standard Transitions */
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in-quad: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);

  /* Bouncy Effects */
  --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-in-back: cubic-bezier(0.6, -0.28, 0.735, 0.045);

  /* Smooth Effects */
  --ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);
  --ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335);
}
```

#### Duration Guidelines
**Animation Timing:**
```
Micro-interactions: 100-200ms
- Button states
- Input focus
- Hover effects

Standard Transitions: 200-500ms
- Modal appearances
- Panel slides
- Content reveals

Complex Animations: 500-1000ms
- Page transitions
- Achievement celebrations
- Multi-step sequences

Background Processes: 1000ms+
- Loading states
- Data synchronization
- Background updates
```

---

## Responsive Component Behavior

### 6.1 Mobile Adaptations

#### Touch-Optimized Interactions
**Specifications:**
```
Touch Targets:
- Minimum Size: 44x44px (iOS), 48x48px (Android)
- Spacing: 8px minimum between targets
- Visual Area: May be smaller than touch area
- Feedback: Immediate visual response

Button Adaptations:
- Height: 44px minimum
- Padding: Increased for better touch
- Spacing: More generous between elements
- States: Touch down, touch up feedback

Form Elements:
- Input Height: 44px minimum
- Font Size: 16px (prevents zoom on iOS)
- Labels: Always visible, not placeholder-only
- Validation: Immediate, gentle feedback
```

#### Mobile Navigation Patterns
**Bottom Navigation:**
```
Component: Navigation/BottomNav
Height: 60px + safe area
Background: #FFFFFF
Border Top: 1px solid #F1F3F4

Tab Structure:
- Width: Equal distribution (5 tabs max)
- Icon: 24px, centered
- Label: 12px, below icon
- Badge: Notification indicator
- Active State: Color + icon fill change
```

**Mobile Header:**
```
Component: Navigation/MobileHeader
Height: 56px
Background: #FFFFFF
Elements:
- Back Button: 44x44px touch target
- Title: Centered, truncated
- Action: Right-aligned (1-2 max)
- Search: Expandable overlay
```

#### Gesture Support
**Implementation:**
```
Swipe Gestures:
- Back Navigation: Right swipe
- Forward Navigation: Left swipe (if applicable)
- Refresh: Pull down on lists
- Actions: Swipe left/right on list items

Pinch Gestures:
- Zoom: Text size, images
- Scale: Charts and diagrams
- Reset: Double tap to original size

Long Press:
- Context Menus: 500ms delay
- Quick Actions: Preview and act
- Selection Mode: Multi-select lists
```

### 6.2 Tablet-Specific Interactions

#### Adaptive Layout System
**Breakpoint Behavior:**
```
768px - 1024px (Tablet Range):
- Sidebar: Overlay or push (user preference)
- Grid: 2-3 columns for cards
- Navigation: Tab bar or side panel
- Modals: Centered with max-width

Split View Support:
- Dual panel layout for content browsing
- Master-detail patterns
- Drag-and-drop between panels
- Resizable panel dividers
```

#### Enhanced Touch Interactions
**Tablet-Specific Features:**
```
Hover States:
- Support for external mouse/trackpad
- Keyboard navigation compatibility
- Focus indicators for accessibility

Drag and Drop:
- Course reordering
- Bookmark organization
- File uploads
- Visual feedback during drag

Multi-Touch:
- Two-finger scrolling
- Pinch to zoom
- Rotation gestures (where applicable)
- Palm rejection
```

### 6.3 Desktop Enhancements

#### Mouse and Keyboard Optimization
**Desktop-Specific Features:**
```
Hover States:
- Rich tooltips and previews
- Smooth transitions and effects
- Information overlays
- Quick action buttons

Keyboard Shortcuts:
- Command palette (Cmd/Ctrl + K)
- Navigation shortcuts (Tab, Arrow keys)
- Action shortcuts (Cmd/Ctrl + Enter)
- Accessibility focus management

Context Menus:
- Right-click actions
- Contextual options
- Keyboard accessible
- Position aware (screen edges)
```

#### Advanced Interaction Patterns
**Desktop Enhancements:**
```
Multi-Window Support:
- Learning content in separate window
- Chat in sidebar or popup
- Progress tracking in overlay
- Cross-window state synchronization

Drag and Drop:
- File uploads from desktop
- Content organization
- Multi-select operations
- Visual drop zones and feedback

Advanced Navigation:
- Breadcrumb trails
- Multiple simultaneous views
- Quick switching between contexts
- History navigation (back/forward)
```

### 6.4 Cross-Device Continuity Patterns

#### State Synchronization
**Implementation:**
```
Learning Progress:
- Real-time sync across devices
- Offline capability with sync on reconnect
- Conflict resolution strategies
- Progress preservation guarantees

User Preferences:
- Settings sync
- UI state preservation
- Device-specific adaptations
- Privacy-conscious syncing

Content State:
- Reading position
- Form data preservation
- Draft content
- Bookmark synchronization
```

#### Device Handoff Features
**Continuity Features:**
```
Session Continuity:
- Resume on different device
- QR code handoff
- Deep link generation
- Context preservation

Adaptive Content:
- Device-appropriate format delivery
- Responsive media serving
- Bandwidth-conscious loading
- Offline content caching

Cross-Device Notifications:
- Achievement sharing
- Progress updates
- Study reminders
- Community activity
```

---

## Content Strategy Integration

### 7.1 Placeholder Text That Reduces Anxiety

#### Form Placeholders
**Anxiety-Reducing Examples:**
```
Email Input:
❌ "Enter email"
✅ "your.email@example.com (we'll keep this private)"

Password Input:
❌ "Password"
✅ "Choose a secure password (we'll help you create one)"

Search Input:
❌ "Search"
✅ "Try searching for 'ChatGPT basics' or 'prompt writing'"

Feedback Input:
❌ "Comments"
✅ "Share what's working well or what could be better"
```

#### Empty State Messages
**Encouraging Empty States:**
```
Learning Dashboard:
"Your learning journey starts here! 🌟
Ready to explore your first AI tool? Let's begin with something fun and easy."

Bookmarks:
"No bookmarks yet - that's okay!
As you discover helpful resources, save them here for quick access later."

Community Posts:
"Be the first to start a conversation!
Your question might be exactly what someone else is wondering about too."

Practice History:
"Your practice experiments will appear here.
Each attempt is a step forward - there's no such thing as a failed experiment!"
```

### 7.2 Instructional Copy Patterns

#### Step-by-Step Guidance
**Progressive Instruction Format:**
```
Introduction Pattern:
"In this section, you'll [specific outcome].
We'll break this down into [X] simple steps, and you can go at your own pace."

Step Format:
"Step [X] of [Total]: [Action Verb] [Simple Description]
💡 Pro tip: [Helpful context or encouragement]
🤔 Wondering why? [Brief explanation of purpose]"

Completion Pattern:
"Great work! You've successfully [achievement].
What you just learned: [key takeaway]
Next up: [preview of what's coming]"
```

#### Contextual Help Text
**Help Text Strategy:**
```
Beginner Level:
- Explain every term
- Provide context for why it matters
- Include reassurance about making mistakes
- Offer multiple ways to succeed

Intermediate Level:
- Quick reminders of key concepts
- Links to deeper explanations
- Efficiency tips and shortcuts
- Common pitfall warnings

Advanced Level:
- Concise reference information
- Power user features
- Customization options
- Expert community resources
```

### 7.3 Error Message Tone and Content

#### Error Message Framework
**Tone Guidelines:**
```
Apologetic but Not Alarming:
❌ "ERROR: Failed to process request"
✅ "Oops! Something didn't work quite right. Let's try a different approach."

Specific and Actionable:
❌ "Invalid input"
✅ "The email address needs an @ symbol. Try something like name@email.com"

Forward-Looking:
❌ "Process failed"
✅ "We couldn't save your progress this time. Don't worry - we can try again!"

Empowering:
❌ "You entered the wrong information"
✅ "Let's double-check this information together"
```

#### Error Recovery Guidance
**Recovery Pattern:**
```
1. Acknowledge (without blame):
"It looks like [specific issue description]"

2. Reassure:
"This happens sometimes, and it's totally fixable"

3. Guide:
"Here's what we can do: [specific steps]"

4. Support:
"Still having trouble? [help option] - we're here to help!"

5. Prevent:
"To avoid this next time: [prevention tip]"
```

### 7.4 Success Message Celebrations

#### Achievement Messaging
**Celebration Levels:**
```
Micro-Achievements:
"Nice! ✓ [specific action completed]"
"You're getting the hang of this!"
"One step closer to mastery!"

Milestone Achievements:
"Incredible! 🎉 You've [specific milestone]
This is a big deal - [why it matters]
You should feel proud of this progress!"

Major Achievements:
"🚀 Amazing work! You've [major accomplishment]
When you started: [where they began]
Now you can: [new capabilities unlocked]
Ready for your next challenge?"
```

#### Progress Reinforcement
**Encouragement Patterns:**
```
Daily Progress:
"Day [X] of your learning journey"
"You've been consistent [X] days this week"
"Your confidence score increased by [X] today"

Weekly Summary:
"This week you: [bullet list of accomplishments]"
"That's [X]% more than last week!"
"Keep up this momentum!"

Monthly Reflection:
"A month ago, you [starting point]"
"Today, you can [current capabilities]"
"Imagine where you'll be next month!"
```

### 7.5 Help Text and Guidance Patterns

#### Progressive Help System
**Help Layers:**
```
Layer 1 - Inline Help:
- Tooltips: Hover/tap for quick explanations
- Info icons: "ⓘ" next to complex terms
- Placeholder examples: Show expected format
- Character counters: Help with limits

Layer 2 - Contextual Help:
- Help panels: Expandable sections
- Video tutorials: Embedded or linked
- Step-by-step guides: Interactive walkthroughs
- FAQ sections: Common questions addressed

Layer 3 - Comprehensive Help:
- Help center: Full documentation
- Community forums: Peer-to-peer support
- Live chat: Human assistance
- Video calls: Screen sharing for complex issues
```

#### Help Content Strategy
**Content Types:**
```
Quick Tips:
"💡 Tip: [brief, actionable advice]"
"🎯 Try this: [specific suggestion]"
"⚡ Speed tip: [efficiency hack]"

Explanatory Content:
"🤔 Why this matters: [context and importance]"
"📖 Background: [relevant theory or history]"
"🔗 Related concepts: [connected topics]"

Troubleshooting:
"🔧 If this doesn't work: [alternative approaches]"
"🚨 Common issue: [frequent problem + solution]"
"🆘 Need more help? [escalation options]"
```

---

## Component API Design

### 8.1 Props Interface Design

#### Component Props Philosophy
**Design Principles:**
```
Consistent Naming:
- Use descriptive, unambiguous names
- Follow established conventions (isLoading, not loading)
- Use positive boolean names (isVisible, not isHidden)
- Group related props with consistent prefixes

Type Safety:
- Strong TypeScript interfaces
- Required vs optional props clearly defined
- Union types for variant options
- Generic types where appropriate

Composability:
- Props that work well together
- Minimal prop dependencies
- Clear prop hierarchy and override behavior
- Extensible design for future needs
```

#### Core Component Interfaces

**Button Component API:**
```typescript
interface ButtonProps {
  // Content
  children: React.ReactNode
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode

  // Variants
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'small' | 'medium' | 'large'

  // States
  isLoading?: boolean
  isDisabled?: boolean

  // Behavior
  onClick?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void

  // HTML attributes
  type?: 'button' | 'submit' | 'reset'
  form?: string
  autoFocus?: boolean

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string

  // Styling
  className?: string
  style?: CSSProperties

  // Advanced
  as?: React.ElementType
  fullWidth?: boolean
  loadingText?: string
}
```

**Input Component API:**
```typescript
interface InputProps {
  // Core
  id?: string
  name?: string
  value?: string
  defaultValue?: string
  placeholder?: string

  // Types
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel'

  // Validation
  isRequired?: boolean
  isInvalid?: boolean
  errorMessage?: string
  pattern?: string
  minLength?: number
  maxLength?: number

  // Behavior
  onChange?: (value: string, event: ChangeEvent) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
  onKeyDown?: (event: KeyboardEvent) => void

  // States
  isDisabled?: boolean
  isReadOnly?: boolean

  // Styling
  size?: 'small' | 'medium' | 'large'
  variant?: 'outline' | 'filled' | 'flushed'

  // Enhancement
  autoComplete?: string
  autoFocus?: boolean
  spellCheck?: boolean

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-labelledby'?: string
}
```

**Card Component API:**
```typescript
interface CardProps {
  // Content
  children: React.ReactNode
  title?: string
  subtitle?: string
  image?: string | React.ReactNode

  // Variants
  variant?: 'learning' | 'achievement' | 'community' | 'stats'
  elevation?: 'none' | 'small' | 'medium' | 'large'

  // Behavior
  isClickable?: boolean
  isSelected?: boolean
  onClick?: (event: MouseEvent) => void

  // Layout
  orientation?: 'vertical' | 'horizontal'
  aspectRatio?: string
  maxWidth?: string

  // Actions
  primaryAction?: {
    label: string
    onClick: () => void
    variant?: ButtonProps['variant']
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }

  // Metadata
  tags?: string[]
  progress?: number
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  duration?: string

  // Accessibility
  'aria-label'?: string
  role?: string
}
```

### 8.2 Default Values and Configurations

#### Global Default Configuration
**Design System Defaults:**
```typescript
// config/defaults.ts
export const componentDefaults = {
  button: {
    variant: 'primary' as const,
    size: 'medium' as const,
    type: 'button' as const,
  },

  input: {
    size: 'medium' as const,
    variant: 'outline' as const,
    autoComplete: 'off' as const,
  },

  card: {
    variant: 'learning' as const,
    elevation: 'small' as const,
    orientation: 'vertical' as const,
  },

  modal: {
    size: 'medium' as const,
    closeOnOverlayClick: true,
    closeOnEscape: true,
    trapFocus: true,
  },
} as const
```

#### Component-Specific Defaults
**Anxiety-First Default Behaviors:**
```typescript
// Gentle, non-threatening defaults
export const anxietyAwareDefaults = {
  // Forms auto-save to prevent data loss
  form: {
    autoSave: true,
    autoSaveInterval: 30000, // 30 seconds
    validateOnChange: false, // Only on blur to reduce anxiety
    showRequiredIndicator: true,
  },

  // Loading states are informative and patient
  loading: {
    showProgress: true,
    showEstimatedTime: true,
    allowCancel: true,
    friendlyMessages: true,
  },

  // Errors are gentle and helpful
  error: {
    tone: 'gentle' as const,
    showRecoveryOptions: true,
    offerSupport: true,
    preserveUserInput: true,
  },

  // Success celebrations are encouraging
  success: {
    showCelebration: true,
    duration: 3000, // Show longer for positive reinforcement
    enableSharing: true,
    suggestNextSteps: true,
  },
}
```

### 8.3 Composition Patterns

#### Compound Components
**Implementation Example:**
```typescript
// Card compound component pattern
const Card = ({
  children,
  ...props
}: CardProps) => {
  return (
    <CardProvider value={props}>
      <div className={cardStyles(props)}>
        {children}
      </div>
    </CardProvider>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter
Card.Image = CardImage
Card.Actions = CardActions

// Usage:
<Card variant="learning">
  <Card.Header>
    <Card.Image src="/course-image.jpg" alt="Course preview" />
  </Card.Header>
  <Card.Body>
    <h3>Introduction to AI</h3>
    <p>Learn the fundamentals...</p>
  </Card.Body>
  <Card.Footer>
    <Card.Actions primary="Start Learning" secondary="Preview" />
  </Card.Footer>
</Card>
```

#### Render Props Pattern
**Flexible Content Rendering:**
```typescript
interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  renderRow?: (item: T, index: number) => React.ReactNode
  renderEmpty?: () => React.ReactNode
  renderLoading?: () => React.ReactNode
  renderError?: (error: Error) => React.ReactNode
}

// Usage with anxiety-aware messaging:
<DataTable
  data={learningModules}
  columns={moduleColumns}
  renderEmpty={() => (
    <EmptyState
      title="Ready to start learning?"
      description="Choose your first module below to begin your AI journey!"
      action="Browse Modules"
    />
  )}
  renderError={(error) => (
    <GentleError
      message="We couldn't load your modules right now"
      recovery="Try refreshing the page"
      support="Contact support if this continues"
    />
  )}
/>
```

#### Hook-Based Composition
**Custom Hooks for Behavior:**
```typescript
// useAnxietyAwareForm hook
export function useAnxietyAwareForm<T>(options: FormOptions<T>) {
  const [isDirty, setIsDirty] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  // Auto-save functionality
  useEffect(() => {
    if (isDirty && options.autoSave) {
      const timer = setTimeout(() => {
        setAutoSaveStatus('saving')
        // Save logic here
        setAutoSaveStatus('saved')
        setIsDirty(false)
      }, options.autoSaveDelay || 30000)

      return () => clearTimeout(timer)
    }
  }, [isDirty, options.autoSave, options.autoSaveDelay])

  // Gentle validation
  const validate = useCallback((field: keyof T, value: any) => {
    // Only validate on blur, not on change
    // Provide helpful, not critical feedback
  }, [])

  return {
    isDirty,
    autoSaveStatus,
    validate,
    // ... other form utilities
  }
}
```

### 8.4 Extension Points for Customization

#### Theme Customization
**CSS Custom Properties System:**
```css
/* Base theme tokens */
:root {
  /* Colors - customizable by themes */
  --h2ww-color-primary: #4A90E2;
  --h2ww-color-success: #7ED321;
  --h2ww-color-warning: #F5A623;
  --h2ww-color-error: #E85D75;

  /* Typography - customizable for accessibility */
  --h2ww-font-family: 'Inter', sans-serif;
  --h2ww-font-scale: 1.25;
  --h2ww-line-height-base: 1.5;

  /* Spacing - consistent but customizable */
  --h2ww-space-unit: 8px;
  --h2ww-border-radius-base: 6px;

  /* Animation - respects prefers-reduced-motion */
  --h2ww-transition-fast: 150ms;
  --h2ww-transition-normal: 250ms;
  --h2ww-transition-slow: 400ms;
}

/* High contrast theme variant */
[data-theme="high-contrast"] {
  --h2ww-color-primary: #000000;
  --h2ww-color-success: #008000;
  --h2ww-color-warning: #FF8C00;
  --h2ww-color-error: #DC143C;
}

/* Calm theme variant for high anxiety users */
[data-theme="calm"] {
  --h2ww-color-primary: #6B73FF;
  --h2ww-color-success: #00D4AA;
  --h2ww-border-radius-base: 12px;
  --h2ww-transition-normal: 400ms;
}
```

#### Plugin Architecture
**Component Extension System:**
```typescript
// Plugin interface for extending components
interface ComponentPlugin {
  name: string
  version: string
  extend: (component: any) => any
}

// Example: Analytics plugin
const analyticsPlugin: ComponentPlugin = {
  name: 'analytics',
  version: '1.0.0',
  extend: (Component) => {
    return function AnalyticsEnhanced(props) {
      const handleClick = (originalHandler) => (event) => {
        // Track analytics
        analytics.track('component_interaction', {
          component: Component.displayName,
          action: 'click'
        })

        // Call original handler
        originalHandler?.(event)
      }

      return <Component {...props} onClick={handleClick(props.onClick)} />
    }
  }
}

// Plugin registration
const withPlugins = (Component, plugins = []) => {
  return plugins.reduce((EnhancedComponent, plugin) => {
    return plugin.extend(EnhancedComponent)
  }, Component)
}
```

#### Custom Variant System
**Extensible Variant Framework:**
```typescript
// Base variant system
type VariantConfig<T> = {
  [K in keyof T]: {
    [variant: string]: string | ((props: any) => string)
  }
}

const buttonVariants: VariantConfig<ButtonProps> = {
  variant: {
    primary: 'bg-primary text-white',
    secondary: 'bg-transparent border-primary text-primary',
    ghost: 'bg-transparent text-primary',
    // Custom variants can be added
    'anxiety-safe': 'bg-gentle-blue text-soft-blue border-gentle-blue',
    'success-celebration': 'bg-gradient-success text-white animate-gentle-pulse',
  },
  size: {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2.5 text-base',
    large: 'px-6 py-3 text-lg',
  }
}

// Organizations can extend with custom variants
const customButtonVariants = {
  ...buttonVariants,
  variant: {
    ...buttonVariants.variant,
    'brand-primary': 'bg-brand-500 text-white hover:bg-brand-600',
    'brand-gentle': 'bg-brand-50 text-brand-700 hover:bg-brand-100',
  }
}
```

---

## Implementation Guidelines

### 9.1 Development Workflow

#### Component Development Process
**Step-by-Step Workflow:**
```
1. Design System Review:
   - Check existing tokens and patterns
   - Identify reusable elements
   - Plan component variants and states

2. Component Specification:
   - Define TypeScript interfaces
   - Document all props and behaviors
   - Specify accessibility requirements
   - Plan responsive behaviors

3. Implementation:
   - Build component with TypeScript
   - Implement all variants and states
   - Add accessibility features
   - Write comprehensive tests

4. Documentation:
   - Storybook stories for all variants
   - Usage guidelines and examples
   - Accessibility notes
   - Performance considerations

5. Review and Testing:
   - Code review checklist
   - Accessibility audit
   - Performance testing
   - Cross-browser validation

6. Integration:
   - Update design system documentation
   - Version control and changelog
   - Team communication and training
```

#### Code Quality Standards
**Quality Checklist:**
```typescript
// ✅ Example of well-structured component
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  isLoading?: boolean
  isDisabled?: boolean
  onClick?: (event: React.MouseEvent) => void
  'aria-label'?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'medium',
    isLoading = false,
    isDisabled = false,
    onClick,
    'aria-label': ariaLabel,
    ...rest
  }, ref) => {
    // Compute classes based on props
    const classes = cn(
      'inline-flex items-center justify-center',
      'font-medium rounded-md transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      {
        // Variant styles
        'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500': variant === 'primary',
        'bg-transparent border-2 border-primary-500 text-primary-500': variant === 'secondary',
        'bg-transparent text-primary-500 hover:bg-primary-50': variant === 'ghost',

        // Size styles
        'px-3 py-2 text-sm': size === 'small',
        'px-4 py-2.5 text-base': size === 'medium',
        'px-6 py-3 text-lg': size === 'large',

        // State styles
        'opacity-50 cursor-not-allowed': isDisabled,
        'cursor-wait': isLoading,
      }
    )

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isDisabled || isLoading}
        onClick={onClick}
        aria-label={ariaLabel}
        {...rest}
      >
        {isLoading && (
          <LoadingSpinner
            size={size === 'small' ? 'sm' : 'md'}
            className="mr-2"
          />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

### 9.2 Accessibility Implementation

#### WCAG 2.1 AA Compliance Checklist
**Component Accessibility Requirements:**
```
✅ Color and Contrast:
- 4.5:1 contrast ratio for normal text
- 3:1 contrast ratio for large text (18pt+)
- Color not the only means of conveying information
- High contrast mode support

✅ Keyboard Navigation:
- All interactive elements keyboard accessible
- Logical tab order
- Visible focus indicators
- Escape key handling for modals/dropdowns

✅ Screen Reader Support:
- Semantic HTML structure
- ARIA labels and descriptions
- Role attributes where appropriate
- Live regions for dynamic content

✅ Motor Accessibility:
- Minimum 44px touch targets on mobile
- No timing-dependent interactions
- Drag operations have keyboard alternatives
- Click targets not too close together

✅ Cognitive Accessibility:
- Clear, simple language
- Consistent navigation patterns
- Error prevention and correction
- Multiple ways to find content
```

#### ARIA Implementation Patterns
**Common ARIA Patterns:**
```typescript
// Button with loading state
<button
  aria-label={isLoading ? 'Loading...' : 'Submit form'}
  aria-disabled={isLoading}
  disabled={isLoading}
>
  {isLoading ? 'Loading...' : 'Submit'}
</button>

// Expandable content
<button
  aria-expanded={isOpen}
  aria-controls="content-panel"
  onClick={() => setIsOpen(!isOpen)}
>
  Toggle Content
</button>
<div id="content-panel" hidden={!isOpen}>
  Content here...
</div>

// Form with validation
<div>
  <label htmlFor="email-input">Email Address</label>
  <input
    id="email-input"
    type="email"
    aria-describedby={hasError ? 'email-error' : 'email-help'}
    aria-invalid={hasError}
  />
  <div id="email-help">We'll use this to send you learning updates</div>
  {hasError && (
    <div id="email-error" role="alert">
      Please enter a valid email address
    </div>
  )}
</div>

// Progress indicator
<div
  role="progressbar"
  aria-valuenow={progress}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Learning progress"
>
  <div style={{ width: `${progress}%` }} />
</div>
```

### 9.3 Performance Optimization

#### Bundle Size Optimization
**Code Splitting Strategy:**
```typescript
// Lazy load complex components
const ChatInterface = React.lazy(() => import('./ChatInterface'))
const ProgressDashboard = React.lazy(() => import('./ProgressDashboard'))

// Tree-shaking friendly exports
export { Button } from './Button'
export { Input } from './Input'
export { Card } from './Card'
// Don't export * from './index' to enable tree-shaking

// Conditional loading for device-specific features
const EnhancedTooltip = React.lazy(() =>
  window.matchMedia('(hover: hover)').matches
    ? import('./EnhancedTooltip')
    : import('./SimpleTooltip')
)
```

#### Rendering Performance
**Optimization Techniques:**
```typescript
// Memoization for expensive components
const LearningCard = React.memo(({ module, progress }) => {
  const progressPercentage = useMemo(() =>
    Math.round((progress.completed / progress.total) * 100),
    [progress.completed, progress.total]
  )

  return (
    <Card>
      <Card.Header title={module.title} />
      <Card.Body>
        <ProgressBar value={progressPercentage} />
      </Card.Body>
    </Card>
  )
})

// Virtualization for large lists
const LearningModuleList = ({ modules }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <LearningCard module={modules[index]} />
    </div>
  )

  return (
    <FixedSizeList
      height={600}
      itemCount={modules.length}
      itemSize={280}
    >
      {Row}
    </FixedSizeList>
  )
}

// Debounced search to reduce API calls
const useSearchModules = (query) => {
  const [results, setResults] = useState([])
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery) {
      searchModules(debouncedQuery).then(setResults)
    }
  }, [debouncedQuery])

  return results
}
```

### 9.4 Testing Strategy

#### Component Testing Approach
**Testing Pyramid:**
```typescript
// Unit Tests - Component behavior
describe('Button', () => {
  test('renders with correct variant classes', () => {
    render(<Button variant="primary">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-primary-500')
  })

  test('handles loading state correctly', () => {
    render(<Button isLoading>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  })

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})

// Integration Tests - Component interactions
describe('Form with validation', () => {
  test('shows gentle error messages', async () => {
    render(<LoginForm />)

    const emailInput = screen.getByLabelText(/email/i)
    fireEvent.blur(emailInput) // Validate on blur, not change

    await waitFor(() => {
      expect(screen.getByText(/please enter your email/i)).toBeInTheDocument()
    })

    // Error should be gentle, not alarming
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
  })
})

// Accessibility Tests
describe('Button accessibility', () => {
  test('has proper keyboard navigation', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button')

    button.focus()
    expect(button).toHaveFocus()

    fireEvent.keyDown(button, { key: 'Enter' })
    // Should trigger click handler
  })

  test('has sufficient color contrast', () => {
    render(<Button variant="primary">Click me</Button>)
    const button = screen.getByRole('button')

    // Use jest-axe or similar for automated a11y testing
    expect(button).toHaveNoViolations()
  })
})
```

#### Visual Regression Testing
**Storybook Integration:**
```typescript
// .storybook/main.js
module.exports = {
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    'chromatic/storybook-addon'
  ]
}

// Button.stories.tsx
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'focus-order', enabled: true }
        ]
      }
    }
  }
}

export const AllVariants = () => (
  <div className="space-y-4">
    <Button variant="primary">Primary Button</Button>
    <Button variant="secondary">Secondary Button</Button>
    <Button variant="ghost">Ghost Button</Button>
    <Button isLoading>Loading Button</Button>
    <Button isDisabled>Disabled Button</Button>
  </div>
)

export const ResponsiveBehavior = () => (
  <Button fullWidth>Full Width Button</Button>
)

ResponsiveBehavior.parameters = {
  viewport: {
    viewports: {
      mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
      tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
      desktop: { name: 'Desktop', styles: { width: '1024px', height: '768px' } }
    }
  }
}
```

### 9.5 Documentation Standards

#### Component Documentation Template
**Standard Documentation Format:**
```markdown
# Button Component

## Overview
The Button component is a fundamental interactive element that triggers actions when clicked. It supports multiple variants, sizes, and states to accommodate different use cases while maintaining accessibility and anxiety-aware design principles.

## Usage

### Basic Example
```tsx
import { Button } from '@h2ww/components'

function MyComponent() {
  return (
    <Button onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  )
}
```

### With Icons
```tsx
<Button startIcon={<PlusIcon />} variant="primary">
  Add Module
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Button content |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `isLoading` | `boolean` | `false` | Shows loading state |
| `isDisabled` | `boolean` | `false` | Disables interaction |

## Accessibility

- ✅ Keyboard navigation support
- ✅ Screen reader compatible
- ✅ WCAG 2.1 AA compliant
- ✅ Focus management
- ✅ Color contrast tested

## Design Guidelines

### When to Use
- Primary actions (submit, save, continue)
- Secondary actions (cancel, back, reset)
- Tertiary actions (help, learn more)

### When Not to Use
- Navigation (use links instead)
- Toggles (use switch or checkbox)
- Multiple selection (use checkboxes)

### Anxiety-Aware Considerations
- Loading states prevent user uncertainty
- Disabled states clearly communicate unavailability
- Error states provide helpful recovery options
- Success feedback celebrates user progress

## Examples

### Loading State
```tsx
<Button isLoading loadingText="Saving your progress...">
  Save Progress
</Button>
```

### Error Recovery
```tsx
<Button
  variant="secondary"
  onClick={handleRetry}
  startIcon={<RefreshIcon />}
>
  Try Again
</Button>
```

## Related Components
- [Link](./Link.md) - For navigation
- [IconButton](./IconButton.md) - Icon-only actions
- [ButtonGroup](./ButtonGroup.md) - Multiple related actions
```

#### Figma Integration Documentation
**Design-Development Handoff:**
```markdown
# Figma Component Mapping

## Button Component Sync

### Figma Component: `Button/Primary`
- **React Component**: `<Button variant="primary" />`
- **Figma Instance**: Auto-layout, 40px height
- **Properties**: Variant, Size, State, Icon
- **Overrides**: Text content, icon selection

### Design Tokens Mapping
```typescript
// Figma -> CSS Custom Properties
const tokenMapping = {
  'Primary/Blue': 'var(--h2ww-color-primary)',
  'Success/Green': 'var(--h2ww-color-success)',
  'Spacing/MD': 'var(--h2ww-space-md)',
  'Border Radius/Base': 'var(--h2ww-border-radius-base)'
}
```

### Component States in Figma
- Default: Base component
- Hover: Interactive component variant
- Active: Interactive component variant
- Disabled: Property override
- Loading: Component variant with spinner

### Responsive Behavior
- Desktop: 40px height, hover states
- Tablet: 44px height, touch targets
- Mobile: 44px height, full-width option

### Accessibility Notes for Designers
- Minimum contrast ratios maintained
- Focus states clearly visible
- Touch targets meet minimum size
- Color coding supplemented with icons/text
```

---

This comprehensive Figma component specification provides a complete foundation for implementing the H2WW platform's anxiety-first design system. Each component is designed with careful attention to reducing user anxiety while maintaining functionality and accessibility standards.

The specifications can be directly implemented in Figma using:
1. **Design Tokens** as Figma variables
2. **Component Variants** for different states
3. **Auto-Layout** for responsive behavior
4. **Interactive Components** for prototyping
5. **Component Properties** for easy customization

This documentation serves as both a design reference and development guide, ensuring consistency across the entire H2WW platform while supporting the core mission of transforming AI anxiety into confidence through thoughtful, user-centered design.