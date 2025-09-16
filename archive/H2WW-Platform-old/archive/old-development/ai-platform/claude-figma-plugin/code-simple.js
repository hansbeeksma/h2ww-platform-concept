// Simple Claude Design Importer
console.log('Plugin loading...');

// Show UI
figma.showUI(__html__, { 
  width: 400, 
  height: 600,
  title: "Claude Design Importer"
});

console.log('UI shown');

// Simple message handler
figma.ui.onmessage = async (msg) => {
  console.log('Received message:', msg);
  
  if (msg.type === 'create-design') {
    try {
      console.log('Creating design from spec:', msg.design);
      
      // Simple frame creation
      const frame = figma.createFrame();
      frame.name = msg.design.name || 'Claude Design';
      frame.resize(msg.design.width || 800, msg.design.height || 600);
      
      if (msg.design.backgroundColor) {
        const hex = msg.design.backgroundColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16) / 255;
        const g = parseInt(hex.substr(2, 2), 16) / 255;
        const b = parseInt(hex.substr(4, 2), 16) / 255;
        
        frame.fills = [{
          type: 'SOLID',
          color: { r, g, b }
        }];
      }
      
      // Add to page
      figma.currentPage.appendChild(frame);
      figma.viewport.scrollAndZoomIntoView([frame]);
      figma.currentPage.selection = [frame];
      
      figma.notify('✅ Design created!');
      figma.ui.postMessage({ type: 'success', message: 'Design created successfully!' });
      
    } catch (error) {
      console.error('Error creating design:', error);
      figma.notify('❌ Error: ' + error.message);
      figma.ui.postMessage({ type: 'error', message: error.message });
    }
  }
};

figma.on("close", () => {
  figma.closePlugin();
});

console.log('Plugin initialized');