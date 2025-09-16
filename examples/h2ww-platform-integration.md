# 🔗 H2WW Platform Integration Guide

Dit document toont hoe je de H2WW Design System React componenten integreert in jullie bestaande platform met React 18, Vite, Tailwind CSS, en shadcn/ui.

## 🚀 Stap-voor-stap Integratie

### 1. Design System Installatie

```bash
# In jullie hoofdproject
cd /path/to/h2ww-platform
npm install @h2ww/design-system
```

### 2. Tailwind CSS Configuratie Update

```js
// tailwind.config.js - Update jullie bestaande config
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    // Voeg H2WW Design System toe
    './node_modules/@h2ww/design-system/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // Merge H2WW colors met jullie bestaande kleuren
      colors: {
        // Behoud jullie bestaande shadcn/ui kleuren
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        // Voeg H2WW Learning Colors toe
        'ai-fundamentals': {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#E53E3E', // Base red
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
          DEFAULT: '#E53E3E',
        },
        'discovery': {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F6E05E', // Base yellow
          600: '#D69E2E',
          700: '#B7791F',
          800: '#975A16',
          900: '#744210',
          DEFAULT: '#F6E05E',
        },
        'mastery': {
          50: '#EBF8FF',
          100: '#BEE3F8',
          200: '#90CDF4',
          300: '#63B3ED',
          400: '#4299E1',
          500: '#3182CE', // Base blue
          600: '#2B77CB',
          700: '#2C5AA0',
          800: '#2A4365',
          900: '#1A365D',
          DEFAULT: '#3182CE',
        },
        // H2WW Secondary Colors
        'creativity': {
          DEFAULT: '#F97316',
          // ... add full scale
        },
        'growth': {
          DEFAULT: '#22C55E',
          // ... add full scale
        },
        'innovation': {
          DEFAULT: '#8B5CF6',
          // ... add full scale
        },
      },
      // H2WW Typography
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'mono': ['SF Mono', 'Monaco', 'monospace'],
      },
      // H2WW Spacing System
      spacing: {
        'xxs': '4px',
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
        'xxxl': '64px',
      },
      // H2WW Animation System
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-in': 'slideIn 300ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

### 3. CSS Import Update

```css
/* src/globals.css - Voeg H2WW styles toe */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Import H2WW Design System styles */
@import '@h2ww/design-system/styles/globals.css';

/* Jullie bestaande custom styles... */
```

### 4. Component Alias Setup (Optioneel)

```tsx
// src/components/ui/index.ts - Gecombineerde export
// Behoud jullie bestaande shadcn/ui componenten
export * from './shadcn-components'

// Voeg H2WW componenten toe met aliasing
export {
  Button as H2WWButton,
  Card as H2WWCard,
  Input as H2WWInput,
  LearningProgressCard,
  AIToolCard,
} from '@h2ww/design-system'

// Of gebruik direct zonder aliasing
export * from '@h2ww/design-system'
```

## 🎯 Praktische Implementatie Voorbeelden

### 1. Dashboard Met Learning Components

```tsx
// src/pages/Dashboard.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LearningProgressCard,
  AIToolCard,
  Button,
  getLearningStateFromProgress
} from '@h2ww/design-system'

export function Dashboard() {
  const userProgress = 45 // Van jullie backend
  const learningState = getLearningStateFromProgress(userProgress)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">
        Welcome to H2WW Platform
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Learning Progress */}
        <LearningProgressCard
          progress={userProgress}
          title="AI Fundamentals Course"
          description="Building your foundation in artificial intelligence"
          currentStep="Understanding Machine Learning Basics"
          totalSteps={12}
          completedSteps={5}
          learningState={learningState}
        />

        {/* AI Tools Integration */}
        <AIToolCard
          toolName="ChatGPT"
          status="connected"
          usageCount={23}
          lastUsed={new Date()}
          toolIcon={<ChatGPTIcon />}
          onDisconnect={() => handleDisconnect('chatgpt')}
        />

        <AIToolCard
          toolName="Claude"
          status="disconnected"
          toolIcon={<ClaudeIcon />}
          onConnect={() => handleConnect('claude')}
        />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button variant="discovery" size="lg">
          Explore New AI Tools
        </Button>
        <Button variant="default" size="lg">
          Continue Learning
        </Button>
        <Button variant="mastery" size="lg">
          View Certificates
        </Button>
      </div>
    </div>
  )
}
```

### 2. Learning Path Page

```tsx
// src/pages/LearningPath.tsx
import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Progress,
  Badge
} from '@h2ww/design-system'

const learningPaths = [
  {
    id: 1,
    title: 'AI Fundamentals',
    description: 'Essential concepts and practical applications',
    progress: 75,
    state: 'fundamentals',
    lessons: 12,
    completedLessons: 9,
    estimatedTime: '4 hours',
  },
  {
    id: 2,
    title: 'Prompt Engineering',
    description: 'Master the art of AI communication',
    progress: 30,
    state: 'discovery',
    lessons: 8,
    completedLessons: 2,
    estimatedTime: '3 hours',
  },
  {
    id: 3,
    title: 'AI Ethics & Safety',
    description: 'Responsible AI development and deployment',
    progress: 90,
    state: 'mastery',
    lessons: 6,
    completedLessons: 5,
    estimatedTime: '2 hours',
  },
]

export function LearningPath() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-display mb-4">
          Your Learning Journey
        </h1>
        <p className="text-lg text-muted-foreground">
          Progress through expertly designed AI courses
        </p>
      </div>

      <div className="grid gap-6">
        {learningPaths.map((path) => (
          <Card key={path.id} learningState={path.state} variant="interactive">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
                  <p className="text-muted-foreground">{path.description}</p>
                </div>
                <Badge variant={path.state} className="ml-4">
                  {path.progress}% Complete
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>{path.completedLessons}/{path.lessons} lessons</span>
                  </div>
                  <Progress
                    value={path.progress}
                    learningState={path.state}
                    className="h-2"
                  />
                </div>

                {/* Metadata */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {path.estimatedTime} remaining
                  </span>
                  <Button
                    learningState={path.state}
                    size="sm"
                  >
                    {path.progress > 0 ? 'Continue' : 'Start'} Learning
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

### 3. AI Tools Integration Page

```tsx
// src/pages/AITools.tsx
import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  SearchInput,
  Badge,
  Toast
} from '@h2ww/design-system'

const aiTools = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Conversational AI for general tasks',
    category: 'Conversational AI',
    status: 'connected',
    usageThisMonth: 156,
    costThisMonth: 23.40,
    capabilities: ['text-generation', 'conversation', 'coding-help'],
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Advanced reasoning and analysis',
    category: 'Analysis',
    status: 'connected',
    usageThisMonth: 89,
    costThisMonth: 15.20,
    capabilities: ['analysis', 'reasoning', 'document-review'],
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'AI-powered image generation',
    category: 'Creative',
    status: 'disconnected',
    usageThisMonth: 0,
    costThisMonth: 0,
    capabilities: ['image-generation', 'creative-design', 'concept-art'],
  },
]

export function AITools() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('all')

  const filteredTools = aiTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'all' || tool.category === selectedCategory)
  )

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-display mb-4">
          AI Tools Integration
        </h1>
        <p className="text-lg text-muted-foreground">
          Connect and manage your AI tool ecosystem
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <SearchInput
          placeholder="Search AI tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
        />

        <div className="flex gap-2">
          {['all', 'Conversational AI', 'Analysis', 'Creative'].map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Tools' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <Card key={tool.id} variant="interactive">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {tool.description}
                  </p>
                </div>
                <Badge
                  variant={tool.status === 'connected' ? 'success' : 'secondary'}
                >
                  {tool.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {/* Usage Stats */}
                {tool.status === 'connected' && (
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {tool.usageThisMonth}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Uses this month
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        ${tool.costThisMonth}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Cost this month
                      </div>
                    </div>
                  </div>
                )}

                {/* Capabilities */}
                <div>
                  <div className="text-sm font-medium mb-2">Capabilities:</div>
                  <div className="flex flex-wrap gap-1">
                    {tool.capabilities.map(capability => (
                      <Badge key={capability} variant="outline" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  variant={tool.status === 'connected' ? 'outline' : 'default'}
                  className="w-full"
                  onClick={() => {
                    if (tool.status === 'connected') {
                      // Handle disconnect
                      console.log(`Disconnecting ${tool.name}`)
                    } else {
                      // Handle connect
                      console.log(`Connecting ${tool.name}`)
                    }
                  }}
                >
                  {tool.status === 'connected' ? 'Manage' : 'Connect'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

### 4. Context API Integration

```tsx
// src/contexts/LearningContext.tsx
import React, { createContext, useContext, useReducer } from 'react'
import { getLearningStateFromProgress } from '@h2ww/design-system'

interface LearningState {
  currentCourse: string | null
  overallProgress: number
  completedCourses: string[]
  currentLearningState: 'discovery' | 'fundamentals' | 'mastery'
  aiToolsConnected: string[]
}

interface LearningContextType extends LearningState {
  updateProgress: (courseId: string, progress: number) => void
  completeCourse: (courseId: string) => void
  connectAITool: (toolId: string) => void
  disconnectAITool: (toolId: string) => void
}

const LearningContext = createContext<LearningContextType | undefined>(undefined)

// Learning reducer
function learningReducer(state: LearningState, action: any): LearningState {
  switch (action.type) {
    case 'UPDATE_PROGRESS':
      const newProgress = action.payload.progress
      return {
        ...state,
        overallProgress: newProgress,
        currentLearningState: getLearningStateFromProgress(newProgress),
      }
    case 'COMPLETE_COURSE':
      return {
        ...state,
        completedCourses: [...state.completedCourses, action.payload.courseId],
      }
    case 'CONNECT_AI_TOOL':
      return {
        ...state,
        aiToolsConnected: [...state.aiToolsConnected, action.payload.toolId],
      }
    case 'DISCONNECT_AI_TOOL':
      return {
        ...state,
        aiToolsConnected: state.aiToolsConnected.filter(
          id => id !== action.payload.toolId
        ),
      }
    default:
      return state
  }
}

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(learningReducer, {
    currentCourse: null,
    overallProgress: 0,
    completedCourses: [],
    currentLearningState: 'discovery',
    aiToolsConnected: [],
  })

  const updateProgress = (courseId: string, progress: number) => {
    dispatch({ type: 'UPDATE_PROGRESS', payload: { courseId, progress } })
  }

  const completeCourse = (courseId: string) => {
    dispatch({ type: 'COMPLETE_COURSE', payload: { courseId } })
  }

  const connectAITool = (toolId: string) => {
    dispatch({ type: 'CONNECT_AI_TOOL', payload: { toolId } })
  }

  const disconnectAITool = (toolId: string) => {
    dispatch({ type: 'DISCONNECT_AI_TOOL', payload: { toolId } })
  }

  return (
    <LearningContext.Provider value={{
      ...state,
      updateProgress,
      completeCourse,
      connectAITool,
      disconnectAITool,
    }}>
      {children}
    </LearningContext.Provider>
  )
}

export function useLearning() {
  const context = useContext(LearningContext)
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider')
  }
  return context
}
```

### 5. API Integration Met Express Backend

```tsx
// src/services/learningService.ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// JWT interceptor (jullie bestaande implementatie)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export interface LearningProgress {
  userId: string
  courseId: string
  progress: number
  currentLesson: number
  completedLessons: number[]
  learningState: 'discovery' | 'fundamentals' | 'mastery'
}

export interface AIToolConnection {
  userId: string
  toolId: string
  status: 'connected' | 'disconnected' | 'error'
  apiKey?: string
  usageCount: number
  lastUsed?: Date
}

// Learning Progress API
export const learningService = {
  async getUserProgress(userId: string): Promise<LearningProgress[]> {
    const response = await api.get(`/learning/progress/${userId}`)
    return response.data
  },

  async updateProgress(
    userId: string,
    courseId: string,
    progress: number
  ): Promise<void> {
    await api.put(`/learning/progress/${userId}/${courseId}`, { progress })
  },

  async completeCourse(userId: string, courseId: string): Promise<void> {
    await api.post(`/learning/complete/${userId}/${courseId}`)
  },
}

// AI Tools API
export const aiToolsService = {
  async getConnectedTools(userId: string): Promise<AIToolConnection[]> {
    const response = await api.get(`/ai-tools/connections/${userId}`)
    return response.data
  },

  async connectTool(
    userId: string,
    toolId: string,
    apiKey: string
  ): Promise<void> {
    await api.post(`/ai-tools/connect/${userId}/${toolId}`, { apiKey })
  },

  async disconnectTool(userId: string, toolId: string): Promise<void> {
    await api.delete(`/ai-tools/disconnect/${userId}/${toolId}`)
  },

  async trackUsage(
    userId: string,
    toolId: string,
    usageData: any
  ): Promise<void> {
    await api.post(`/ai-tools/usage/${userId}/${toolId}`, usageData)
  },
}
```

### 6. Express.js Backend Routes

```javascript
// routes/learning.js
const express = require('express')
const { Learning, Course, UserProgress } = require('../models')
const { authenticateToken } = require('../middleware/auth')
const router = express.Router()

// Get user learning progress
router.get('/progress/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params

    const progress = await UserProgress.findAll({
      where: { userId },
      include: [Course],
    })

    // Map to H2WW learning states
    const progressWithStates = progress.map(p => ({
      ...p.toJSON(),
      learningState:
        p.progress < 33 ? 'discovery' :
        p.progress < 67 ? 'fundamentals' : 'mastery'
    }))

    res.json(progressWithStates)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update learning progress
router.put('/progress/:userId/:courseId', authenticateToken, async (req, res) => {
  try {
    const { userId, courseId } = req.params
    const { progress } = req.body

    await UserProgress.upsert({
      userId,
      courseId,
      progress,
      updatedAt: new Date(),
    })

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router

// routes/ai-tools.js
const express = require('express')
const { AIToolConnection } = require('../models')
const { authenticateToken } = require('../middleware/auth')
const router = express.Router()

// Get connected AI tools
router.get('/connections/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params

    const connections = await AIToolConnection.findAll({
      where: { userId },
      attributes: { exclude: ['apiKey'] }, // Don't send API keys
    })

    res.json(connections)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Connect AI tool
router.post('/connect/:userId/:toolId', authenticateToken, async (req, res) => {
  try {
    const { userId, toolId } = req.params
    const { apiKey } = req.body

    // Encrypt API key before storing
    const encryptedApiKey = encrypt(apiKey)

    await AIToolConnection.upsert({
      userId,
      toolId,
      status: 'connected',
      apiKey: encryptedApiKey,
      connectedAt: new Date(),
    })

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
```

## 🎯 Migratie Strategie

### Geleidelijke Migratie
1. **Fase 1**: Voeg H2WW Design System toe naast bestaande shadcn/ui
2. **Fase 2**: Begin nieuwe features met H2WW componenten
3. **Fase 3**: Migreer bestaande componenten waar voordelig
4. **Fase 4**: Volledige H2WW Design System implementatie

### Component Mapping
```tsx
// Bestaande shadcn/ui → H2WW Design System
import { Button as ShadcnButton } from '@/components/ui/button'
import { Button as H2WWButton } from '@h2ww/design-system'

// Geleidelijk vervangen:
// <ShadcnButton>Click me</ShadcnButton>
// ↓
// <H2WWButton learningState="discovery">Explore AI</H2WWButton>
```

## 📊 Performance Overwegingen

### Bundle Size Optimalisatie
```tsx
// Tree shaking - import specifieke componenten
import { Button } from '@h2ww/design-system/button'
import { Card } from '@h2ww/design-system/card'

// In plaats van:
// import { Button, Card } from '@h2ww/design-system'
```

### Lazy Loading
```tsx
// Lazy load zware componenten
const AIToolsDashboard = React.lazy(() =>
  import('@h2ww/design-system/ai-tools-dashboard')
)

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AIToolsDashboard />
    </Suspense>
  )
}
```

## 🔧 Development Workflow

### Local Development
```bash
# Start jullie platform
npm run dev

# In parallel, start design system development
cd design-system/react-implementation
npm run storybook
```

### Testing Integratie
```tsx
// src/__tests__/integration.test.tsx
import { render, screen } from '@testing-library/react'
import { LearningProgressCard } from '@h2ww/design-system'

test('learning progress card integrates correctly', () => {
  render(
    <LearningProgressCard
      progress={45}
      title="Test Course"
      learningState="fundamentals"
    />
  )

  expect(screen.getByText('Test Course')).toBeInTheDocument()
  expect(screen.getByText('45%')).toBeInTheDocument()
})
```

Deze integratie zorgt ervoor dat jullie bestaande platform geleidelijk kan evolueren naar een volledig research-driven AI learning experience met de H2WW Design System! 🎉