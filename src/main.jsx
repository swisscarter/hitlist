import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// #region agent log - Debug helper for Vercel
window.__DEBUG_LOGS__ = [];
window.__addDebugLog__ = (msg, data) => {
  const entry = { time: Date.now(), msg, data };
  window.__DEBUG_LOGS__.push(entry);
  console.log('[DEBUG]', msg, data);
  // Also show on page
  let debugEl = document.getElementById('__debug_output__');
  if (!debugEl) {
    debugEl = document.createElement('div');
    debugEl.id = '__debug_output__';
    debugEl.style.cssText = 'position:fixed;top:0;left:0;right:0;background:yellow;color:black;padding:10px;font-family:monospace;font-size:12px;z-index:99999;max-height:200px;overflow:auto;';
    document.body.appendChild(debugEl);
  }
  debugEl.innerHTML += `<div>[${entry.msg}] ${JSON.stringify(entry.data)}</div>`;
};
// #endregion

// #region agent log
window.__addDebugLog__('main.jsx:START', { rootExists: !!document.getElementById('root') });
// #endregion

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  // #region agent log
  window.__addDebugLog__('main.jsx:createRoot OK', {});
  // #endregion
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  // #region agent log
  window.__addDebugLog__('main.jsx:render called', {});
  // #endregion
} catch (err) {
  // #region agent log
  window.__addDebugLog__('main.jsx:FATAL ERROR', { error: err.message, stack: err.stack });
  // #endregion
  console.error('React mount failed:', err);
}

