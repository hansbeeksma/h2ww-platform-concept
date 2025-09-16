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

  useEffect(() => {
    // Listen for messages from main thread
    window.onmessage = (event) => {
      const { type, data } = event.data.pluginMessage || {};

      switch (type) {
        case 'plugin-ready':
          console.log('Plugin ready');
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
      pluginMessage: { type: 'analyze-selection' }
    }, '*');
  };

  const renderLibraryView = () => (
    <div>
      <div className="anxiety-aware-notice">
        💡 <strong>Anxiety-Aware Design:</strong> These components are specifically designed to reduce user anxiety and build confidence through thoughtful interaction patterns.
      </div>

      <div className="section">
        <div className="section-title">🔹 Atoms (Basic Components)</div>
        <div className="component-grid">
          {anxietyAwareComponents.filter(c => c.category === 'atom').map(component => (
            <div
              key={component.id}
              className={`component-card ${selectedComponent?.id === component.id ? 'selected' : ''}`}
              onClick={() => setSelectedComponent(component)}
            >
              <div style={{ fontSize: '12px', fontWeight: '600' }}>{component.name}</div>
              <div className={`anxiety-level ${component.variants[0].anxietyLevel.replace('-', '')}`}>
                {component.variants[0].anxietyLevel} anxiety
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-title">🔸 Molecules (Combined Components)</div>
        <div className="component-grid">
          {anxietyAwareComponents.filter(c => c.category === 'molecule').map(component => (
            <div
              key={component.id}
              className={`component-card ${selectedComponent?.id === component.id ? 'selected' : ''}`}
              onClick={() => setSelectedComponent(component)}
            >
              <div style={{ fontSize: '12px', fontWeight: '600' }}>{component.name}</div>
              <div className={`anxiety-level ${component.variants[0].anxietyLevel.replace('-', '')}`}>
                {component.variants[0].anxietyLevel} anxiety
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedComponent && (
        <div className="section">
          <div className="section-title">📋 Component Details</div>
          <div style={{ background: 'white', padding: '12px', borderRadius: '6px', border: '1px solid #D8D8D8' }}>
            <div style={{ fontWeight: '600', marginBottom: '8px' }}>{selectedComponent.name}</div>
            <div style={{ fontSize: '13px', color: '#4A4A4A', marginBottom: '8px' }}>
              {selectedComponent.usageGuidelines}
            </div>

            <div style={{ marginBottom: '8px' }}>
              <strong>Anxiety Reduction:</strong>
              <ul style={{ marginLeft: '16px', fontSize: '12px' }}>
                {selectedComponent.anxietyReduction.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <strong>Accessibility:</strong>
              <ul style={{ marginLeft: '16px', fontSize: '12px' }}>
                {selectedComponent.accessibilityFeatures.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
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

  const renderAIAssistantView = () => (
    <div>
      <div className="anxiety-aware-notice">
        🤖 <strong>AI Assistant:</strong> Get anxiety-aware design recommendations and accessibility improvements for your selected elements.
      </div>

      <div className="section">
        <button
          className="button"
          onClick={analyzeSelection}
          disabled={isLoading || !hasSelection}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Selection'}
        </button>

        {!hasSelection && (
          <div style={{ textAlign: 'center', color: '#9B9B9B', fontSize: '13px', marginTop: '8px' }}>
            Select elements in Figma to get AI recommendations
          </div>
        )}
      </div>

      {aiAnalysis && (
        <div className="section">
          <div className="section-title">📊 Analysis Results</div>

          <div style={{ background: 'white', padding: '12px', borderRadius: '6px', border: '1px solid #D8D8D8', marginBottom: '12px' }}>
            <div style={{ fontWeight: '600', marginBottom: '8px' }}>Cognitive Load Score</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '100px',
                height: '8px',
                background: '#EAF3FB',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(10 - aiAnalysis.cognitiveLoad) * 10}%`,
                  height: '100%',
                  background: aiAnalysis.cognitiveLoad > 7 ? '#E85D75' : '#7ED321',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <span style={{ fontSize: '12px' }}>
                {aiAnalysis.cognitiveLoad}/10 {aiAnalysis.cognitiveLoad > 7 ? '(High - Reduce complexity)' : '(Good)'}
              </span>
            </div>
          </div>

          {aiAnalysis.anxietyPatterns.length > 0 && (
            <div style={{ background: '#FDF2F4', padding: '12px', borderRadius: '6px', marginBottom: '12px' }}>
              <div style={{ fontWeight: '600', marginBottom: '8px', color: '#E85D75' }}>⚠️ Anxiety Patterns Found</div>
              {aiAnalysis.anxietyPatterns.map((pattern, index) => (
                <div key={index} style={{ fontSize: '12px', marginBottom: '4px' }}>• {pattern}</div>
              ))}
            </div>
          )}

          {aiAnalysis.recommendations.length > 0 && (
            <div style={{ background: '#F0F9E8', padding: '12px', borderRadius: '6px' }}>
              <div style={{ fontWeight: '600', marginBottom: '8px', color: '#7ED321' }}>💡 AI Recommendations</div>
              {aiAnalysis.recommendations.map((rec, index) => (
                <div key={index} style={{ fontSize: '12px', marginBottom: '8px', borderLeft: '2px solid #7ED321', paddingLeft: '8px' }}>
                  <div style={{ fontWeight: '500' }}>{rec.description}</div>
                  <div style={{ color: '#4A4A4A' }}>Solution: {rec.solution}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderTokensView = () => (
    <div>
      <div className="section-title">🎨 Calm Confidence Design Tokens</div>

      <div className="section">
        <div style={{ fontWeight: '500', marginBottom: '8px' }}>Primary Colors</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
          {Object.entries(calmConfidenceTokens.colors.primary).map(([name, color]) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: color,
                borderRadius: '6px',
                margin: '0 auto 4px',
                border: '1px solid #D8D8D8'
              }} />
              <div style={{ fontSize: '11px', fontWeight: '500' }}>{name}</div>
              <div style={{ fontSize: '10px', color: '#9B9B9B' }}>{color}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div style={{ fontWeight: '500', marginBottom: '8px' }}>Semantic Colors</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
          {Object.entries(calmConfidenceTokens.colors.semantic).map(([name, color]) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: color,
                borderRadius: '6px',
                margin: '0 auto 4px',
                border: '1px solid #D8D8D8'
              }} />
              <div style={{ fontSize: '11px', fontWeight: '500' }}>{name}</div>
              <div style={{ fontSize: '10px', color: '#9B9B9B' }}>{color}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div style={{ fontWeight: '500', marginBottom: '8px' }}>Typography Scale</div>
        {Object.entries(calmConfidenceTokens.typography.scale).map(([name, size]) => (
          <div key={name} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid #F0F0F0'
          }}>
            <span style={{ fontSize: size, fontWeight: '500' }}>Aa</span>
            <span style={{ fontSize: '12px' }}>{name}</span>
            <span style={{ fontSize: '11px', color: '#9B9B9B' }}>{size}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAccessibilityView = () => (
    <div>
      <div className="anxiety-aware-notice">
        ♿ <strong>Accessibility First:</strong> Check and improve the accessibility of your designs with WCAG AA+ compliance.
      </div>

      <div className="section">
        <button className="button" disabled={!hasSelection}>
          Check Accessibility
        </button>
        <button className="button secondary">
          Auto-Fix Issues
        </button>
      </div>

      <div className="section">
        <div className="section-title">✅ Accessibility Checklist</div>
        <div style={{ background: 'white', padding: '12px', borderRadius: '6px', border: '1px solid #D8D8D8' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: '#7ED321', marginRight: '8px' }}>✓</span>
            Color contrast 4.5:1 minimum
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: '#7ED321', marginRight: '8px' }}>✓</span>
            Touch targets 44px minimum
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: '#F5A623', marginRight: '8px' }}>⚠</span>
            Alt text for images
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#7ED321', marginRight: '8px' }}>✓</span>
            Keyboard navigation
          </div>
        </div>
      </div>
    </div>
  );

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
        borderBottom: '1px solid #D8D8D8',
        fontSize: '12px'
      }}>
        {[
          { key: 'library', label: '📚 Library', view: 'library' },
          { key: 'tokens', label: '🎨 Tokens', view: 'tokens' },
          { key: 'ai', label: '🤖 AI', view: 'ai-assistant' },
          { key: 'a11y', label: '♿ A11y', view: 'accessibility' }
        ].map(({ key, label, view }) => (
          <button
            key={key}
            style={{
              flex: 1,
              padding: '8px 4px',
              border: 'none',
              background: currentView === view ? '#EAF3FB' : 'transparent',
              color: currentView === view ? '#4A90E2' : '#4A4A4A',
              cursor: 'pointer',
              borderBottom: currentView === view ? '2px solid #4A90E2' : 'none'
            }}
            onClick={() => setCurrentView(view as any)}
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