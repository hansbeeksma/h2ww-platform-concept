import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AnxietyAwareComponent, PluginState, AIAnalysis } from '@/types';
import { calmConfidenceTokens } from '@/utils/designTokens';

// Component data for H2WW anxiety-aware design system
const anxietyAwareComponents: AnxietyAwareComponent[] = [
  {
    id: 'button-primary',
    name: 'Primary Button',
    category: 'atom',
    variants: [
      { name: 'Default', properties: { variant: 'primary' }, anxietyLevel: 'low', accessibilityScore: 95 },
      { name: 'Hover', properties: { variant: 'primary-hover' }, anxietyLevel: 'low', accessibilityScore: 95 }
    ],
    anxietyReduction: ['Clear action indication', 'Sufficient contrast', 'Adequate touch target'],
    accessibilityFeatures: ['44px minimum size', 'ARIA labels', 'Keyboard navigation'],
    usageGuidelines: 'Use for primary actions that build user confidence'
  },
  {
    id: 'button-anxiety-safe',
    name: 'Anxiety-Safe Button',
    category: 'atom',
    variants: [
      { name: 'Default', properties: { variant: 'anxiety-safe' }, anxietyLevel: 'very-low', accessibilityScore: 98 }
    ],
    anxietyReduction: ['Non-threatening color', 'Gentle interaction', 'Reversible action'],
    accessibilityFeatures: ['High contrast', 'Clear focus states', 'Screen reader optimized'],
    usageGuidelines: 'Use for actions that might cause user hesitation'
  },
  {
    id: 'input-gentle',
    name: 'Gentle Input',
    category: 'atom',
    variants: [
      { name: 'Default', properties: { variant: 'gentle' }, anxietyLevel: 'low', accessibilityScore: 92 },
      { name: 'Focus', properties: { variant: 'gentle-focus' }, anxietyLevel: 'low', accessibilityScore: 92 }
    ],
    anxietyReduction: ['Soft borders', 'Helpful placeholder text', 'Encouraging validation'],
    accessibilityFeatures: ['Clear labels', 'Error descriptions', 'Focus indicators'],
    usageGuidelines: 'Use for form inputs with supportive validation'
  },
  {
    id: 'progress-confidence',
    name: 'Confidence Progress',
    category: 'molecule',
    variants: [
      { name: 'Default', properties: { variant: 'confidence' }, anxietyLevel: 'low', accessibilityScore: 90 }
    ],
    anxietyReduction: ['Positive reinforcement', 'Clear progress indication', 'Achievement celebration'],
    accessibilityFeatures: ['Progress announcements', 'Percentage indicators', 'Milestone markers'],
    usageGuidelines: 'Use to show learning progress and build confidence'
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'library' | 'tokens' | 'ai-assistant' | 'accessibility'>('library');
  const [selectedComponent, setSelectedComponent] = useState<AnxietyAwareComponent | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set ready after a short delay as fallback
    const readyTimeout = setTimeout(() => {
      console.log('Plugin ready (timeout fallback)');
      setIsReady(true);
    }, 1000);

    // Listen for messages from main thread
    window.onmessage = (event) => {
      const { type, data } = event.data.pluginMessage || {};

      switch (type) {
        case 'plugin-ready':
          console.log('Plugin ready');
          setIsReady(true);
          clearTimeout(readyTimeout);
          // Request current selection
          parent.postMessage({ pluginMessage: { type: 'get-selection' } }, '*');
          break;

        case 'selection-updated':
          setHasSelection(data.hasSelection);
          break;

        case 'analysis-result':
          setAiAnalysis(data);
          setIsLoading(false);
          break;

        case 'component-created':
          setIsLoading(false);
          // Show success message
          break;

        case 'error':
          console.error('Plugin error:', data.message);
          setIsLoading(false);
          break;

        default:
          console.log('Unknown message type:', type);
      }
    };

    return () => clearTimeout(readyTimeout);
  }, []);

  const createComponent = (component: AnxietyAwareComponent) => {
    setIsLoading(true);
    parent.postMessage({
      pluginMessage: {
        type: 'create-component',
        componentData: component
      }
    }, '*');
  };

  const analyzeSelection = () => {
    setIsLoading(true);
    parent.postMessage({
      pluginMessage: {
        type: 'analyze-selection'
      }
    }, '*');
  };

  const applyDesignTokens = (tokens: any) => {
    parent.postMessage({
      pluginMessage: {
        type: 'design-tokens',
        tokens
      }
    }, '*');
  };

  const runAccessibilityCheck = () => {
    parent.postMessage({
      pluginMessage: {
        type: 'accessibility-check'
      }
    }, '*');
  };

  const renderLibraryView = () => (
    <div>
      <div className="anxiety-aware-notice">
        🧠 H2WW Anxiety-Aware Components - Designed to reduce user stress and build confidence
      </div>

      <div className="section">
        <div className="section-title">Component Library</div>
        <div className="component-grid">
          {anxietyAwareComponents.map((component) => (
            <div
              key={component.id}
              className={`component-card ${selectedComponent?.id === component.id ? 'selected' : ''}`}
              onClick={() => setSelectedComponent(component)}
            >
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                {component.name}
              </div>
              <div style={{ fontSize: '11px', color: '#666', marginBottom: '4px' }}>
                {component.category}
              </div>
              <div className={`anxiety-level ${component.variants[0].anxietyLevel.replace('-', ' ')}`}>
                {component.variants[0].anxietyLevel} anxiety
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedComponent && (
        <div className="section">
          <div className="section-title">Component Details</div>
          <div style={{ background: 'white', padding: '12px', borderRadius: '6px', border: '1px solid #D8D8D8' }}>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>{selectedComponent.name}</div>

            <div style={{ marginBottom: '8px' }}>
              <strong>Anxiety Reduction Features:</strong>
              <ul style={{ margin: '4px 0', paddingLeft: '16px', fontSize: '13px' }}>
                {selectedComponent.anxietyReduction.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <strong>Accessibility Features:</strong>
              <ul style={{ margin: '4px 0', paddingLeft: '16px', fontSize: '13px' }}>
                {selectedComponent.accessibilityFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '12px', fontSize: '13px', fontStyle: 'italic', color: '#666' }}>
              {selectedComponent.usageGuidelines}
            </div>

            <button
              className="button"
              onClick={() => createComponent(selectedComponent)}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Component'}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderTokensView = () => (
    <div>
      <div className="section">
        <div className="section-title">Calm Confidence Design Tokens</div>

        <div style={{ marginBottom: '16px' }}>
          <strong>Primary Colors</strong>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: calmConfidenceTokens.colors.primary.blue,
                borderRadius: '4px',
                marginRight: '8px'
              }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Trust Blue</div>
                <div style={{ fontSize: '11px', color: '#666' }}>{calmConfidenceTokens.colors.primary.blue}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: calmConfidenceTokens.colors.primary.light,
                borderRadius: '4px',
                marginRight: '8px'
              }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Calm Light</div>
                <div style={{ fontSize: '11px', color: '#666' }}>{calmConfidenceTokens.colors.primary.light}</div>
              </div>
            </div>
          </div>
        </div>

        <button
          className="button secondary"
          onClick={() => applyDesignTokens({ color: calmConfidenceTokens.colors.primary.blue })}
        >
          Apply Trust Blue
        </button>
        <button
          className="button secondary"
          onClick={() => applyDesignTokens({ color: calmConfidenceTokens.colors.semantic.success })}
        >
          Apply Success Green
        </button>
      </div>
    </div>
  );

  const renderAIAssistantView = () => (
    <div>
      <div className="section">
        <div className="section-title">AI-Powered Analysis</div>

        <div className="anxiety-aware-notice">
          🤖 Select elements on your canvas to analyze cognitive load and anxiety patterns
        </div>

        <button
          className="button"
          onClick={analyzeSelection}
          disabled={!hasSelection || isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Selection'}
        </button>

        {!hasSelection && (
          <div style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
            Please select elements in Figma to enable analysis
          </div>
        )}

        {aiAnalysis && (
          <div style={{ marginTop: '16px', background: 'white', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>Analysis Results</div>

            <div style={{ marginBottom: '8px' }}>
              <strong>Cognitive Load Score:</strong> {aiAnalysis.cognitiveLoad}/10
              {aiAnalysis.cognitiveLoad > 7 && (
                <div style={{ color: '#E85D75', fontSize: '12px' }}>⚠️ High cognitive load detected</div>
              )}
            </div>

            {aiAnalysis.anxietyPatterns.length > 0 && (
              <div style={{ marginBottom: '8px' }}>
                <strong>Anxiety Patterns:</strong>
                <ul style={{ margin: '4px 0', paddingLeft: '16px', fontSize: '12px' }}>
                  {aiAnalysis.anxietyPatterns.map((pattern, index) => (
                    <li key={index} style={{ color: '#E85D75' }}>{pattern}</li>
                  ))}
                </ul>
              </div>
            )}

            {aiAnalysis.recommendations.length > 0 && (
              <div>
                <strong>Recommendations:</strong>
                <ul style={{ margin: '4px 0', paddingLeft: '16px', fontSize: '12px' }}>
                  {aiAnalysis.recommendations.map((rec, index) => (
                    <li key={index} style={{ color: calmConfidenceTokens.colors.primary.blue }}>
                      {rec.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderAccessibilityView = () => (
    <div>
      <div className="section">
        <div className="section-title">Accessibility Validator</div>

        <div className="anxiety-aware-notice">
          ♿ WCAG AA+ compliance checking with anxiety-aware enhancements
        </div>

        <button
          className="button"
          onClick={runAccessibilityCheck}
          disabled={!hasSelection}
        >
          Run Accessibility Check
        </button>

        {!hasSelection && (
          <div style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
            Please select elements in Figma to check accessibility
          </div>
        )}

        <div style={{ marginTop: '16px', background: 'white', padding: '12px', borderRadius: '6px' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>Quick Guidelines</div>
          <ul style={{ fontSize: '13px', paddingLeft: '16px' }}>
            <li>Touch targets: minimum 44x44px</li>
            <li>Color contrast: 4.5:1 (AA) or 7:1 (AAA)</li>
            <li>Text size: minimum 16px for body text</li>
            <li>Focus indicators: visible and high contrast</li>
            <li>Screen reader labels: descriptive and complete</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Show loading state until ready
  if (!isReady) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#F7F8FA'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: '3px solid #EAF3FB',
          borderTop: '3px solid #4A90E2',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="plugin-header">
        H2WW Component Library
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        background: 'white',
        borderBottom: '1px solid #D8D8D8'
      }}>
        {[
          { key: 'library', label: 'Library' },
          { key: 'tokens', label: 'Tokens' },
          { key: 'ai-assistant', label: 'AI Assistant' },
          { key: 'accessibility', label: 'A11y' }
        ].map(({ key, label }) => (
          <button
            key={key}
            style={{
              flex: 1,
              padding: '12px 8px',
              fontSize: '13px',
              fontWeight: 500,
              border: 'none',
              background: currentView === key ? '#EAF3FB' : 'transparent',
              color: currentView === key ? '#4A90E2' : '#4A4A4A',
              cursor: 'pointer',
              borderBottom: currentView === key ? '2px solid #4A90E2' : 'none'
            }}
            onClick={() => setCurrentView(key as any)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="plugin-content">
        {currentView === 'library' && renderLibraryView()}
        {currentView === 'tokens' && renderTokensView()}
        {currentView === 'ai-assistant' && renderAIAssistantView()}
        {currentView === 'accessibility' && renderAccessibilityView()}
      </div>
    </div>
  );
};

// Initialize React app
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}