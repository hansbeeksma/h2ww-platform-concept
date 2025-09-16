# H2WW Design System - Component Examples

This document provides comprehensive examples of how to use the H2WW Design System React components in your AI learning platform.

## Table of Contents

1. [Typography Components](#typography-components)
2. [Form Components](#form-components)
3. [Navigation Components](#navigation-components)
4. [Feedback Components](#feedback-components)
5. [Layout Components](#layout-components)
6. [Learning State Integration](#learning-state-integration)
7. [Accessibility Features](#accessibility-features)

## Typography Components

### Basic Typography

```tsx
import { Typography, H1, H2, H3, Text, Lead, Code } from '@h2ww/design-system'

function TypographyExample() {
  return (
    <div className="space-y-6">
      {/* Headings with learning states */}
      <H1 learningState="discovery">
        Discover AI Fundamentals
      </H1>

      <H2 learningState="fundamentals">
        Core Machine Learning Concepts
      </H2>

      <H3 learningState="mastery">
        Advanced Neural Networks
      </H3>

      {/* Body text with emphasis */}
      <Lead>
        Master artificial intelligence through hands-on learning and real-world applications.
      </Lead>

      <Text emphasis="high">
        This is important information that learners should pay attention to.
      </Text>

      <Text emphasis="low">
        Additional context that provides helpful background information.
      </Text>

      {/* Code examples */}
      <Code>import tensorflow as tf</Code>

      {/* Custom elements */}
      <Typography as="span" variant="small" learningState="mastery">
        Advanced technique
      </Typography>
    </div>
  )
}
```

## Form Components

### Input Components

```tsx
import { Input, Textarea, SearchInput } from '@h2ww/design-system'

function FormExample() {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions] = useState(['Machine Learning', 'Deep Learning', 'Neural Networks'])

  return (
    <div className="space-y-6 max-w-md">
      {/* Basic input with label */}
      <Input
        label="Email Address"
        type="email"
        placeholder="your@email.com"
        helperText="We'll never share your email"
        required
      />

      {/* Input with error state */}
      <Input
        label="Password"
        type="password"
        error="Password must be at least 8 characters"
        variant="error"
      />

      {/* Input with success state */}
      <Input
        label="Confirm Password"
        type="password"
        success
        variant="success"
        helperText="Passwords match!"
      />

      {/* Textarea */}
      <Textarea
        label="Learning Goals"
        placeholder="Describe what you want to achieve..."
        helperText="Share your AI learning objectives"
        rows={4}
      />

      {/* Search input with suggestions */}
      <SearchInput
        placeholder="Search AI topics..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        suggestions={suggestions}
        onSearch={(query) => console.log('Searching:', query)}
        onClear={() => setSearchQuery('')}
      />
    </div>
  )
}
```

### Form Controls

```tsx
import { Checkbox, RadioGroup, Switch, Select } from '@h2ww/design-system'

function FormControlsExample() {
  const [preferences, setPreferences] = useState({
    notifications: true,
    difficulty: 'intermediate',
    darkMode: false,
    language: 'python'
  })

  const difficultyOptions = [
    { value: 'beginner', label: 'Beginner', description: 'New to AI and programming' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some programming experience' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced developer' }
  ]

  const languageOptions = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'r', label: 'R' },
    { value: 'julia', label: 'Julia' }
  ]

  return (
    <div className="space-y-8 max-w-md">
      {/* Checkboxes with learning states */}
      <div className="space-y-4">
        <Checkbox
          label="Receive learning notifications"
          description="Get notified about new courses and updates"
          learningState="discovery"
          checked={preferences.notifications}
          onChange={(e) => setPreferences(prev => ({
            ...prev,
            notifications: e.target.checked
          }))}
        />

        <Checkbox
          label="Join the AI community"
          description="Connect with other learners"
          learningState="fundamentals"
        />
      </div>

      {/* Radio group */}
      <RadioGroup
        label="Experience Level"
        description="Help us personalize your learning path"
        name="difficulty"
        options={difficultyOptions}
        value={preferences.difficulty}
        onChange={(value) => setPreferences(prev => ({
          ...prev,
          difficulty: value
        }))}
        learningState="fundamentals"
      />

      {/* Switches */}
      <Switch
        label="Dark Mode"
        description="Switch to dark theme"
        learningState="mastery"
        checked={preferences.darkMode}
        onChange={(e) => setPreferences(prev => ({
          ...prev,
          darkMode: e.target.checked
        }))}
      />

      {/* Select dropdown */}
      <Select
        label="Preferred Programming Language"
        description="Choose your primary language for examples"
        options={languageOptions}
        value={preferences.language}
        onChange={(e) => setPreferences(prev => ({
          ...prev,
          language: e.target.value
        }))}
        learningState="discovery"
      />
    </div>
  )
}
```

## Navigation Components

### Header Navigation

```tsx
import { Navigation, NavLink, Button } from '@h2ww/design-system'

function HeaderExample() {
  return (
    <Navigation
      learningState="fundamentals"
      brand={
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-ai-fundamentals rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">H2</span>
          </div>
          <span className="font-semibold">H2WW Platform</span>
        </div>
      }
      actions={
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Profile
          </Button>
          <Button variant="fundamentals" size="sm">
            Dashboard
          </Button>
        </div>
      }
    >
      <NavLink href="/courses" active learningState="fundamentals">
        Courses
      </NavLink>
      <NavLink href="/tools" learningState="fundamentals">
        AI Tools
      </NavLink>
      <NavLink href="/community" learningState="fundamentals">
        Community
      </NavLink>
      <NavLink href="/progress" learningState="fundamentals">
        Progress
      </NavLink>
    </Navigation>
  )
}
```

### Breadcrumbs

```tsx
import { Breadcrumbs, BreadcrumbsItem } from '@h2ww/design-system'

function BreadcrumbsExample() {
  return (
    <Breadcrumbs learningState="mastery">
      <BreadcrumbsItem href="/">Home</BreadcrumbsItem>
      <BreadcrumbsItem href="/courses">Courses</BreadcrumbsItem>
      <BreadcrumbsItem href="/courses/ml">Machine Learning</BreadcrumbsItem>
      <BreadcrumbsItem current>Neural Networks</BreadcrumbsItem>
    </Breadcrumbs>
  )
}
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@h2ww/design-system'

function TabsExample() {
  return (
    <Tabs defaultValue="overview" learningState="discovery">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="lessons">Lessons</TabsTrigger>
        <TabsTrigger value="exercises">Exercises</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Course Overview</h3>
          <p>Introduction to artificial intelligence and machine learning concepts.</p>
        </div>
      </TabsContent>

      <TabsContent value="lessons">
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Lessons</h3>
          <p>Interactive lessons with hands-on examples.</p>
        </div>
      </TabsContent>

      <TabsContent value="exercises">
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Exercises</h3>
          <p>Practice problems and coding challenges.</p>
        </div>
      </TabsContent>

      <TabsContent value="resources">
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Resources</h3>
          <p>Additional reading materials and references.</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
```

## Feedback Components

### Alerts

```tsx
import { Alert, AlertTitle, AlertDescription } from '@h2ww/design-system'

function AlertsExample() {
  return (
    <div className="space-y-4">
      {/* Learning state alerts */}
      <Alert variant="discovery" icon={<LightbulbIcon />}>
        <AlertTitle>New Discovery!</AlertTitle>
        <AlertDescription>
          You've unlocked a new concept: Neural Network Fundamentals
        </AlertDescription>
      </Alert>

      <Alert variant="fundamentals" icon={<BookIcon />}>
        <AlertTitle>Practice Opportunity</AlertTitle>
        <AlertDescription>
          Ready to practice? Try the hands-on coding exercise.
        </AlertDescription>
      </Alert>

      <Alert variant="mastery" icon={<TrophyIcon />}>
        <AlertTitle>Mastery Achieved!</AlertTitle>
        <AlertDescription>
          Congratulations! You've mastered linear regression concepts.
        </AlertDescription>
      </Alert>

      {/* Standard alerts */}
      <Alert variant="warning" icon={<WarningIcon />}>
        <AlertTitle>Connection Issue</AlertTitle>
        <AlertDescription>
          Unable to connect to AI service. Please check your internet connection.
        </AlertDescription>
      </Alert>

      <Alert variant="success" icon={<CheckIcon />}>
        <AlertTitle>Exercise Completed</AlertTitle>
        <AlertDescription>
          Great work! Your solution passed all test cases.
        </AlertDescription>
      </Alert>
    </div>
  )
}
```

### Badges and Progress

```tsx
import { Badge, Progress, Spinner, StatusIndicator } from '@h2ww/design-system'

function FeedbackExample() {
  return (
    <div className="space-y-6">
      {/* Learning state badges */}
      <div className="flex gap-2 flex-wrap">
        <Badge variant="discovery">Exploring</Badge>
        <Badge variant="fundamentals">Learning</Badge>
        <Badge variant="mastery">Expert</Badge>
        <Badge variant="success" icon={<CheckIcon />}>Completed</Badge>
      </div>

      {/* Progress indicators */}
      <div className="space-y-4">
        <Progress
          value={25}
          learningState="discovery"
          showLabel
          label="Discovery Phase"
        />

        <Progress
          value={60}
          learningState="fundamentals"
          showLabel
          label="Core Concepts"
          size="lg"
        />

        <Progress
          value={90}
          learningState="mastery"
          showLabel
          label="Advanced Topics"
        />
      </div>

      {/* Loading states */}
      <div className="flex items-center gap-4">
        <Spinner size="sm" learningState="discovery" />
        <span>Loading discovery content...</span>
      </div>

      {/* Status indicators */}
      <div className="space-y-2">
        <StatusIndicator status="online" showLabel label="AI Assistant" />
        <StatusIndicator status="connecting" showLabel label="GPT-4" />
        <StatusIndicator status="offline" showLabel label="Custom Model" />
      </div>
    </div>
  )
}
```

## Layout Components

### Grid and Flex Layouts

```tsx
import { Container, Grid, Flex, Stack, Spacer, Divider, Center } from '@h2ww/design-system'

function LayoutExample() {
  return (
    <Container size="xl" padding="lg">
      {/* Grid layout for course cards */}
      <Grid cols={3} gap="lg" className="mb-8">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="font-semibold mb-2">Machine Learning Basics</h3>
          <p className="text-muted-foreground">Learn the fundamentals</p>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="font-semibold mb-2">Deep Learning</h3>
          <p className="text-muted-foreground">Neural networks and more</p>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="font-semibold mb-2">AI Applications</h3>
          <p className="text-muted-foreground">Real-world implementations</p>
        </div>
      </Grid>

      {/* Flex layout for toolbar */}
      <Flex justify="between" align="center" className="mb-6 p-4 bg-muted rounded-lg">
        <div>
          <h2 className="font-semibold">Learning Dashboard</h2>
          <p className="text-sm text-muted-foreground">Track your progress</p>
        </div>
        <Flex gap="sm">
          <Button variant="outline">Export</Button>
          <Button variant="discovery">New Course</Button>
        </Flex>
      </Flex>

      {/* Stack layout for content */}
      <Stack spacing="lg" divider={<Divider learningState="fundamentals" />}>
        <div>
          <h3 className="font-semibold mb-2">Recent Activity</h3>
          <p>Completed Neural Networks course</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Upcoming Deadlines</h3>
          <p>AI Ethics assignment due tomorrow</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Recommendations</h3>
          <p>Based on your progress, try Advanced CNNs</p>
        </div>
      </Stack>

      <Spacer size="xl" />

      {/* Centered content */}
      <Center className="py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <Button size="lg" variant="fundamentals">
            Begin Your AI Journey
          </Button>
        </div>
      </Center>
    </Container>
  )
}
```

## Learning State Integration

### Dynamic Learning State Detection

```tsx
import { getLearningStateFromProgress, Button, Card, Progress } from '@h2ww/design-system'

function LearningStateExample() {
  const [userProgress, setUserProgress] = useState(45)
  const learningState = getLearningStateFromProgress(userProgress)

  return (
    <div className="space-y-6">
      {/* Progress indicator that determines learning state */}
      <Progress
        value={userProgress}
        learningState={learningState}
        showLabel
        label={`Current Progress (${learningState} phase)`}
      />

      {/* Components that adapt to learning state */}
      <Card learningState={learningState}>
        <CardHeader>
          <CardTitle learningState={learningState}>
            Your Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            You're currently in the <strong>{learningState}</strong> phase of your AI learning journey.
          </p>

          <Button variant={learningState} onClick={() => setUserProgress(prev => Math.min(100, prev + 10))}>
            Continue Learning
          </Button>
        </CardContent>
      </Card>

      {/* Adaptive content based on learning state */}
      {learningState === 'discovery' && (
        <Alert variant="discovery">
          <AlertTitle>Welcome to AI!</AlertTitle>
          <AlertDescription>
            Start with the basics and explore different AI concepts at your own pace.
          </AlertDescription>
        </Alert>
      )}

      {learningState === 'fundamentals' && (
        <Alert variant="fundamentals">
          <AlertTitle>Building Foundation</AlertTitle>
          <AlertDescription>
            Focus on core concepts and practice with hands-on exercises.
          </AlertDescription>
        </Alert>
      )}

      {learningState === 'mastery' && (
        <Alert variant="mastery">
          <AlertTitle>Advanced Learning</AlertTitle>
          <AlertDescription>
            Dive deep into specialized topics and work on real-world projects.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
```

## Accessibility Features

### Screen Reader Support

```tsx
import { Input, Button, Alert } from '@h2ww/design-system'

function AccessibilityExample() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  return (
    <form className="space-y-6 max-w-md">
      {/* Accessible form inputs */}
      <Input
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        error={errors.email}
        helperText="We'll use this to send you course updates"
        required
        aria-describedby="email-help email-error"
      />

      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
        error={errors.password}
        helperText="Must be at least 8 characters"
        required
        aria-describedby="password-help password-error"
      />

      {/* Accessible buttons with proper labeling */}
      <Button
        type="submit"
        variant="fundamentals"
        className="w-full"
        aria-label="Create account and start learning"
      >
        Create Account
      </Button>

      {/* Screen reader announcements */}
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive" role="alert" aria-live="polite">
          <AlertTitle>Form Errors</AlertTitle>
          <AlertDescription>
            Please correct the errors below and try again.
          </AlertDescription>
        </Alert>
      )}
    </form>
  )
}
```

### Keyboard Navigation

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent, Button } from '@h2ww/design-system'

function KeyboardNavigationExample() {
  const handleKeyDown = (event) => {
    // Custom keyboard handling
    if (event.key === 'Enter' || event.key === ' ') {
      // Handle activation
      event.preventDefault()
      // Trigger action
    }
  }

  return (
    <div className="space-y-6">
      {/* Tabs with full keyboard support */}
      <Tabs defaultValue="tab1" learningState="discovery">
        <TabsList aria-label="Course navigation">
          <TabsTrigger value="tab1">Introduction</TabsTrigger>
          <TabsTrigger value="tab2">Concepts</TabsTrigger>
          <TabsTrigger value="tab3">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="tab1" tabIndex={0}>
          <div className="p-4 focus:outline-none focus:ring-2 focus:ring-ring">
            <h3>Introduction to AI</h3>
            <p>Welcome to the world of artificial intelligence...</p>
          </div>
        </TabsContent>

        <TabsContent value="tab2" tabIndex={0}>
          <div className="p-4 focus:outline-none focus:ring-2 focus:ring-ring">
            <h3>Core Concepts</h3>
            <p>Understanding the fundamentals...</p>
          </div>
        </TabsContent>

        <TabsContent value="tab3" tabIndex={0}>
          <div className="p-4 focus:outline-none focus:ring-2 focus:ring-ring">
            <h3>Practice Exercises</h3>
            <p>Apply what you've learned...</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Interactive elements with keyboard support */}
      <div
        className="p-4 border rounded-lg cursor-pointer hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
        tabIndex={0}
        role="button"
        onKeyDown={handleKeyDown}
        aria-label="Start interactive lesson"
      >
        <h4 className="font-semibold">Interactive Lesson</h4>
        <p className="text-sm text-muted-foreground">
          Press Enter or Space to begin
        </p>
      </div>
    </div>
  )
}
```

## Integration with Existing Platform

### Usage in React Router Application

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigation, Container, Card } from '@h2ww/design-system'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Navigation
          learningState="fundamentals"
          brand={<Logo />}
          actions={<UserMenu />}
        >
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/tools">AI Tools</NavLink>
        </Navigation>

        <main>
          <Container>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/tools" element={<AITools />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  )
}
```

These examples demonstrate the full capabilities of the H2WW Design System, showing how to create accessible, learning-state-aware user interfaces that adapt to user progress and provide optimal experiences for AI education platforms.