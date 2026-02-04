import React, { useEffect } from 'react'
import BrowserFrame from './components/BrowserFrame'
import './App.css'

function App() {
  // #region agent log
  if (window.__addDebugLog__) window.__addDebugLog__('App.jsx:render', {});
  // #endregion

  useEffect(() => {
    // #region agent log
    if (window.__addDebugLog__) window.__addDebugLog__('App.jsx:mounted', { 
      appEl: !!document.querySelector('.app'), 
      testContainer: !!document.querySelector('.test-container'),
      browserFrame: !!document.querySelector('.browser-frame')
    });
    // #endregion
  }, []);

  return (
    <div className="app">
      <div className="test-container">
        <BrowserFrame>
          {/* Test content inside the frame */}
          <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
            padding: '24px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)'
          }}>
            <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
              Browser Frame
            </h1>
            <p style={{ fontSize: '14px', opacity: 0.6 }}>
              Base container for mobile screens
            </p>
          </div>
        </BrowserFrame>
      </div>
    </div>
  )
}

export default App

