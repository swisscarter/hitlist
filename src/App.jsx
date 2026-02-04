import React from 'react'
import BrowserFrame from './components/BrowserFrame'

function App() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#121212',
      padding: '20px'
    }}>
      <BrowserFrame>
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
  )
}

export default App
