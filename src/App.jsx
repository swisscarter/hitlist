import React from 'react'
import VideoPlayer from './components/VideoPlayer'

function App() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000'
    }}>
      <VideoPlayer />
    </div>
  )
}

export default App
