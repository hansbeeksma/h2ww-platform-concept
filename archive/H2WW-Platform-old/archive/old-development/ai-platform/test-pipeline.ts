// Quick test to verify pipeline works
import { Orchestrator } from './src/pipeline/core/orchestrator';

async function test() {
  const orchestrator = new Orchestrator();
  
  try {
    const result = await orchestrator.run('Test idea: Todo app with AI');
    console.log('✅ Pipeline test successful:', result);
  } catch (error) {
    console.error('❌ Pipeline test failed:', error);
  }
}

test();