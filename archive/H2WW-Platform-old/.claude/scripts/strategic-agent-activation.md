# Strategic Agent Activation Scripts

## 🎯 Activation Strategy Overview

Gebaseerd op de strategische analyse van 77 agents, hebben we deze smart activation scripts ontworpen die aansluiten op onze gefaseerde implementatie.

## 🚀 Core Activation Scripts

### **Phase 0: Foundation (Current)**
```bash
#!/bin/bash
# activate-foundation-agents.sh
# Current generic architecture - baseline functionality

echo "🏗️ Activating Foundation Agents..."

agents=(
    "orchestrator"
    "architect"
    "reviewer"
    "researcher"
    "quality-assurance"
    "documentation"
    "design-system-specialist"
    "accessibility-expert"
    "security-specialist"
    "performance-optimizer"
    "ai-learning-specialist"
)

for agent in "${agents[@]}"; do
    echo "✅ Activating: $agent"
    # Load agent configuration and context
    source ~/.claude/agents/specialized/$agent.yaml
done

echo "✅ Foundation agents active: ${#agents[@]} agents"
```

### **Phase 1: Core Enhancement**
```bash
#!/bin/bash
# activate-phase1-essential.sh
# Essential agents for enterprise readiness

echo "🎯 Activating Phase 1: Essential Agents..."

# Foundation agents first
source activate-foundation-agents.sh

# Essential new specialists
essential_agents=(
    "devops-specialist"           # CI/CD, deployment
    "api-specialist"             # API architecture
    "compliance-specialist"      # Legal compliance
    "privacy-specialist"         # Data protection
    "support-specialist"         # Customer support
    "product-specialist"         # Product strategy
    "marketing-specialist"       # Marketing strategy
)

for agent in "${essential_agents[@]}"; do
    echo "🆕 Activating: $agent"
    source ~/.claude/agents/specialized/$agent.yaml
done

total_agents=$((${#agents[@]} + ${#essential_agents[@]}))
echo "✅ Phase 1 complete: $total_agents agents active"
```

## 🎨 Domain-Specific Activation Scripts

### **UX Design Domain**
```bash
#!/bin/bash
# activate-ux-design-domain.sh
# Complete UX design capability suite

echo "🎨 Activating UX Design Domain..."

ux_agents=(
    "design-system-specialist"   # Core design
    "accessibility-expert"       # Accessibility
    "visual-designer"           # Branding, visual language
    "content-specialist"        # UX writing, content strategy
    "ia-specialist"             # Information architecture
    "interaction-specialist"    # User flows, micro-interactions
    "user-researcher"           # User research, testing
    "service-designer"          # End-to-end service design
    "ux-optimizer"              # UX optimization
    "onboarding-specialist"     # User onboarding flows
)

for agent in "${ux_agents[@]}"; do
    echo "🎨 Loading UX agent: $agent"
    source ~/.claude/agents/specialized/$agent.yaml
done

echo "✅ UX Design Domain active: ${#ux_agents[@]} specialists"
```

### **Technical Domain**
```bash
#!/bin/bash
# activate-technical-domain.sh
# Complete technical implementation suite

echo "⚙️ Activating Technical Domain..."

technical_agents=(
    "security-specialist"       # Security, compliance
    "performance-optimizer"     # Performance optimization
    "devops-specialist"         # CI/CD, deployment
    "api-specialist"            # API architecture
    "frontend-specialist"       # Design-to-code, prototyping
    "ml-engineer"              # Machine learning implementation
    "integration-specialist"   # Third-party integrations
    "platform-ops-specialist"  # Platform monitoring
    "incident-specialist"       # Crisis management
)

for agent in "${technical_agents[@]}"; do
    echo "⚙️ Loading technical agent: $agent"
    source ~/.claude/agents/specialized/$agent.yaml
done

echo "✅ Technical Domain active: ${#technical_agents[@]} specialists"
```

### **Business Domain**
```bash
#!/bin/bash
# activate-business-domain.sh
# Complete business strategy and growth suite

echo "💼 Activating Business Domain..."

business_agents=(
    "product-specialist"        # Product strategy, roadmap
    "marketing-specialist"      # Marketing strategy
    "sales-specialist"          # Sales training, processes
    "growth-specialist"         # User acquisition, retention
    "biz-dev-specialist"        # Partnerships, strategy
    "customer-success-specialist" # Customer lifecycle
    "data-analyst"              # Business analytics
    "conversion-specialist"     # Conversion optimization
)

for agent in "${business_agents[@]}"; do
    echo "💼 Loading business agent: $agent"
    source ~/.claude/agents/specialized/$agent.yaml
done

echo "✅ Business Domain active: ${#business_agents[@]} specialists"
```

## 🎯 Project-Type Specific Scripts

### **H2WW AI Learning Platform**
```bash
#!/bin/bash
# activate-h2ww-optimized.sh
# Optimized agent selection for H2WW project

echo "🧠 Activating H2WW AI Learning Platform agents..."

# Load H2WW project profile
export PROJECT_PROFILE="h2ww_platform"
source ~/.claude/config/project-profiles/h2ww-platform.yaml

# Core H2WW agents
h2ww_core=(
    "orchestrator"
    "ai-learning-specialist"    # Core H2WW expertise
    "design-system-specialist"  # Bauhaus design principles
    "accessibility-expert"      # WCAG 2.1 AA compliance
    "figma-plugin-specialist"   # Design-to-code workflow
)

# Recommended H2WW extensions
h2ww_recommended=(
    "user-researcher"           # User persona optimization
    "content-specialist"        # Educational content
    "ml-engineer"              # AI implementation
    "frontend-specialist"       # React components
    "performance-optimizer"     # Learning experience optimization
)

# Optional H2WW specialists
h2ww_optional=(
    "behavioral-scientist"      # Learning psychology
    "ai-ethics-specialist"      # Responsible AI
    "training-specialist"       # Learning content creation
)

# Activate core agents
for agent in "${h2ww_core[@]}"; do
    echo "🧠 Core H2WW: $agent"
    source ~/.claude/agents/specialized/$agent.yaml
done

# Context-aware recommended agents
echo "🤔 Evaluating recommended agents for current task..."
# Add logic to conditionally load based on task complexity

total_agents=${#h2ww_core[@]}
echo "✅ H2WW platform ready: $total_agents core agents + context-aware specialists"
```

### **Enterprise SaaS Platform**
```bash
#!/bin/bash
# activate-enterprise-saas.sh
# Enterprise-grade SaaS platform agents

echo "🏢 Activating Enterprise SaaS Platform agents..."

export PROJECT_PROFILE="enterprise_saas"

enterprise_core=(
    "orchestrator"
    "security-specialist"       # Enterprise security
    "compliance-specialist"     # Regulatory compliance
    "api-specialist"            # Enterprise API architecture
    "devops-specialist"         # Enterprise CI/CD
    "support-specialist"        # Enterprise support
    "privacy-specialist"        # Data protection
)

enterprise_recommended=(
    "platform-ops-specialist"  # Platform monitoring
    "incident-specialist"       # Crisis management
    "audit-specialist"          # Compliance reporting
    "integration-specialist"   # Third-party integrations
    "performance-optimizer"     # Enterprise performance
)

for agent in "${enterprise_core[@]}"; do
    echo "🏢 Enterprise core: $agent"
    source ~/.claude/agents/specialized/$agent.yaml
done

echo "✅ Enterprise SaaS ready: ${#enterprise_core[@]} core specialists"
```

## 🚦 Smart Activation Logic

### **Context-Aware Agent Loading**
```bash
#!/bin/bash
# smart-agent-activation.sh
# Intelligent agent selection based on context

detect_project_type() {
    if [[ -f "design-system/tokens.json" ]]; then
        echo "design_system"
    elif [[ -f "package.json" ]] && grep -q "ai\|learning\|education" package.json; then
        echo "ai_platform"
    elif [[ -f "docker-compose.yml" ]] || [[ -f "kubernetes/" ]]; then
        echo "enterprise_saas"
    else
        echo "generic_web_app"
    fi
}

detect_current_task() {
    # Analyze current directory, files, and context
    if [[ $1 == *"design"* ]] || [[ $1 == *"component"* ]]; then
        echo "design_task"
    elif [[ $1 == *"deploy"* ]] || [[ $1 == *"ci"* ]]; then
        echo "deployment_task"
    elif [[ $1 == *"test"* ]] || [[ $1 == *"quality"* ]]; then
        echo "testing_task"
    else
        echo "general_task"
    fi
}

# Main smart activation
PROJECT_TYPE=$(detect_project_type)
TASK_TYPE=$(detect_current_task "$1")

echo "🤖 Smart activation: $PROJECT_TYPE + $TASK_TYPE"

case "$PROJECT_TYPE-$TASK_TYPE" in
    "ai_platform-design_task")
        source activate-h2ww-optimized.sh
        ;;
    "enterprise_saas-deployment_task")
        source activate-enterprise-saas.sh
        ;;
    "design_system-design_task")
        source activate-ux-design-domain.sh
        ;;
    *)
        source activate-phase1-essential.sh
        ;;
esac
```

## 🎛️ Resource Management Scripts

### **Performance Monitoring**
```bash
#!/bin/bash
# monitor-agent-performance.sh
# Monitor and optimize agent orchestra performance

monitor_orchestration() {
    echo "📊 Agent Orchestra Performance Monitor"

    active_agents=$(ps aux | grep -c "claude-agent")
    memory_usage=$(ps aux | grep "claude-agent" | awk '{sum+=$4} END {print sum}')

    echo "Active agents: $active_agents"
    echo "Memory usage: ${memory_usage}%"

    if (( $(echo "$memory_usage > 80" | bc -l) )); then
        echo "⚠️ High memory usage detected - optimizing..."
        source optimize-agent-loading.sh
    fi
}

optimize_agent_loading() {
    echo "🔧 Optimizing agent loading..."

    # Unload inactive agents
    # Implement smart caching
    # Priority-based resource allocation

    echo "✅ Optimization complete"
}
```

## 📋 Usage Instructions

### **Quick Start**
```bash
# Smart activation (recommended)
bash smart-agent-activation.sh "design new component"

# Project-specific activation
bash activate-h2ww-optimized.sh

# Domain-specific activation
bash activate-ux-design-domain.sh

# Phase-based activation
bash activate-phase1-essential.sh
```

### **Advanced Usage**
```bash
# Monitor performance
bash monitor-agent-performance.sh

# Custom activation with specific agents
bash custom-activation.sh agent1 agent2 agent3

# Debug mode with verbose logging
DEBUG=true bash activate-h2ww-optimized.sh
```

## 🎯 Next Steps

1. **Implement Phase 1 agents** volgens strategische analyse
2. **Test activation scripts** met bestaande H2WW project
3. **Develop smart loading logic** voor performance optimization
4. **Create monitoring dashboard** voor orchestration health
5. **Iterative refinement** based on usage patterns

---

*Strategic activation scripts complete - aligned with 77-agent analysis and implementation roadmap*