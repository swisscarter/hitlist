import React, { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import VideoFeed from './components/VideoFeed'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <div className="app-container">
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <VideoFeed />
    </div>
  )
}

export default App
